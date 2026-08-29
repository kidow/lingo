/**
 * 사전 조회. (spec.md §7)
 *
 *   node scripts/define.ts anchor     한 단어를 사전에서 찾는다
 *   node scripts/define.ts            콘텐츠 전체의 meaning_ko를 사전과 대조한다
 *
 * 뜻을 기억으로 쓰지 않기 위한 도구다. 개념을 손으로 하나씩 넣는 워크플로에서
 * `meaning_ko`는 사람이 타이핑하는 유일한 의미 정보이고, 틀려도 아무것도
 * 깨지지 않는다 — 그래서 눈에 안 띈다.
 *
 * **네트워크를 쓰므로 `pnpm check`와 분리한다.** check는 CI에서도 돌고 오프라인
 * 이어야 하는데, 이 스크립트는 남의 서버에 의존한다. 콘텐츠를 넣을 때 사람이
 * 한 번 돌려보는 자리다.
 *
 * 출처:
 * - 영어 정의 — Free Dictionary (dictionaryapi.dev). 키 없음
 * - 한국어 번역 — 영어 위키낱말사전의 번역 절. CC BY-SA
 * - 일본어 — Jisho (JMdict). 읽기와 영어 뜻을 준다
 *
 * 네이버 사전은 쓰지 않는다. robots.txt가 ClaudeBot을 비롯한 자동 수집을
 * 명시적으로 막고 있고, 공개 API도 없다. 사람이 직접 보는 것은 별개다.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept } from '../lib/types.ts'

const UA = { 'User-Agent': 'lingo-content-tool/1.0 (+https://github.com/kidow/lingo)' }

type Lookup = {
  definitions: string[]
  /** 사전이 주는 한국어 번역 후보 */
  korean: string[]
  reading?: string
}

async function json(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { headers: UA })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** 영어 정의. 첫 뜻 두 개만 — 사전을 옮겨 적으려는 게 아니라 확인하려는 것이다 */
async function englishDefinitions(word: string): Promise<string[]> {
  const data = (await json(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
  )) as Array<{ meanings?: Array<{ partOfSpeech?: string; definitions?: Array<{ definition?: string }> }> }> | null

  return (data?.[0]?.meanings ?? [])
    .flatMap((meaning) =>
      (meaning.definitions ?? [])
        .slice(0, 2)
        .map((d) => `(${meaning.partOfSpeech ?? '?'}) ${d.definition ?? ''}`),
    )
    .slice(0, 4)
}

/**
 * 영어 위키낱말사전의 번역 절에서 한국어를 뽑는다.
 * `{{t+|ko|닻}}` 꼴이고 `tt`·`t-`도 같은 모양이다.
 */
async function koreanTranslations(word: string): Promise<string[]> {
  const data = (await json(
    `https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&formatversion=2`,
  )) as { parse?: { wikitext?: string } } | null

  const wikitext = data?.parse?.wikitext ?? ''
  const found = [...wikitext.matchAll(/\{\{tt?[+-]?\|ko\|([^}|]+)/g)].map((m) => m[1].trim())
  return [...new Set(found)]
}

/** 일본어는 JMdict를 본다. 읽기와 영어 뜻이 나온다 */
async function japanese(term: string): Promise<Lookup> {
  const data = (await json(
    `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(term)}`,
  )) as { data?: Array<{ japanese?: Array<{ reading?: string }>; senses?: Array<{ english_definitions?: string[] }> }> } | null

  const first = data?.data?.[0]
  return {
    reading: first?.japanese?.[0]?.reading,
    definitions: (first?.senses ?? []).slice(0, 2).flatMap((s) => s.english_definitions ?? []),
    korean: [],
  }
}

async function lookup(word: string, lang: string): Promise<Lookup> {
  if (lang === 'ja') return japanese(word)
  const [definitions, korean] = await Promise.all([
    englishDefinitions(word),
    koreanTranslations(word),
  ])
  return { definitions, korean }
}

function loadConcepts(): Concept[] {
  const dir = 'content'
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .flatMap((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')).concepts as Concept[])
}

const line = (n: number) => '─'.repeat(n)

async function one(word: string) {
  const lang = /^[\x20-\x7e]+$/.test(word) ? 'en' : 'ja'
  const result = await lookup(word, lang)

  console.log(`\n${word}  (${lang})`)
  console.log(line(40))
  if (result.reading) console.log(`읽기       ${result.reading}`)
  if (result.korean.length) console.log(`한국어     ${result.korean.join(' · ')}`)
  if (result.definitions.length) {
    console.log('뜻')
    for (const d of result.definitions) console.log(`  · ${d}`)
  }
  if (!result.definitions.length && !result.korean.length) {
    console.log('사전에서 찾지 못했습니다. 철자를 확인하세요.')
  }
  console.log()
}

/** 콘텐츠 전체 대조. 사전이 정답은 아니므로 어긋난 것을 '틀림'이라 하지 않는다 */
async function audit() {
  const concepts = loadConcepts()
  const mismatched: string[] = []
  let checked = 0

  console.log(`\n개념 ${concepts.length}개 — meaning_ko를 사전과 대조합니다\n${line(60)}`)

  for (const concept of concepts) {
    const word = concept.words.en?.term
    if (!word) continue // 한국어 번역을 주는 사전이 영어뿐이다
    checked += 1

    const korean = await koreanTranslations(word)
    const hit = korean.includes(concept.meaning_ko)
    const mark = hit ? '·' : '?'
    const shown = korean.length ? korean.slice(0, 5).join(', ') : '(번역 없음)'
    console.log(`${mark} ${word.padEnd(10)} ${concept.meaning_ko.padEnd(8)} ← ${shown}`)
    if (!hit) mismatched.push(word)
  }

  console.log(line(60))
  console.log(`대조 ${checked}개 · 사전 목록에 없는 뜻 ${mismatched.length}개`)
  if (mismatched.length) {
    console.log(`  ${mismatched.join(', ')}`)
    console.log(
      '\n어긋났다고 틀린 것은 아니다. 사전이 넓게 잡거나 표기가 다를 수 있다.\n' +
        '이미지가 가리키는 것과 맞는지 눈으로 보고 정한다.',
    )
  }
  console.log()
}

const [word] = process.argv.slice(2)
await (word ? one(word) : audit())
