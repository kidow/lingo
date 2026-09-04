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
  /** JLPT 등급. Jisho(JMdict)가 주는 값이다 */
  jlpt?: string
}

/**
 * 실패를 두 가지로 나눈다.
 *
 *   404 — 사전에 그 낱말이 없다. `null`을 돌려준다
 *   그 외 — 네트워크나 429·502다. 여섯 번까지 물러서며 다시 걸고, 끝내 안 되면 **던진다**
 *
 * 여섯 번인 이유는 jisho가 몇십 초씩 502를 뱉는 날이 있어서다. 세 번(총 3초)으로는
 * 그 창을 못 넘겨 3천 개짜리 실행이 낱말 하나 때문에 통째로 죽었다.
 *
 * 던지는 이유가 있다. `pnpm levels`는 조회 결과가 비면 등급을 **지운다** —
 * 429 한 번을 "그 단어에 등급이 없다"로 읽으면 멀쩡한 N4가 소리 없이 사라진다.
 * 실제로 그렇게 사라졌다.
 */
async function json(url: string): Promise<unknown | null> {
  let last = ''
  for (let attempt = 0; attempt < 6; attempt += 1) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, Math.min(500 * 2 ** attempt, 8000)))
    try {
      const res = await fetch(url, { headers: UA })
      if (res.status === 404) return null
      if (!res.ok) {
        last = `HTTP ${res.status}`
        continue
      }
      return await res.json()
    } catch (error) {
      last = String(error)
    }
  }
  throw new Error(`조회 실패 (${last}): ${url}`)
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

/** 일본어는 JMdict를 본다. 읽기·영어 뜻·JLPT 등급이 나온다 */
async function japanese(term: string): Promise<Lookup> {
  const data = (await json(
    `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(term)}`,
  )) as {
    data?: Array<{
      japanese?: Array<{ word?: string; reading?: string }>
      senses?: Array<{ english_definitions?: string[] }>
      jlpt?: string[]
    }>
  } | null

  // 첫 결과를 그냥 쓰면 안 된다. `葉`을 검색하면 `葉っぱ`·`言葉`가 먼저 오고
  // 정작 `葉`(N4)은 뒤에 있어 등급이 통째로 빈다. 표기나 읽기가 정확히 같은
  // 항목을 먼저 찾고, 없을 때만 첫 결과로 돌아간다 — 표제어가 한자인데 우리가
  // 가나로 쓰는 낱말이 있다(`コップ`의 표제어는 `洋杯`다)
  const matches = (entry: { japanese?: Array<{ word?: string; reading?: string }> }) =>
    entry.japanese?.some((j) => j.word === term || j.reading === term) ?? false
  const first = data?.data?.find(matches) ?? data?.data?.[0]
  const japaneseForm = first?.japanese?.find((j) => j.word === term || j.reading === term)

  return {
    reading: (japaneseForm ?? first?.japanese?.[0])?.reading,
    definitions: (first?.senses ?? []).slice(0, 2).flatMap((s) => s.english_definitions ?? []),
    korean: [],
    // jlpt-n5 → N5. 구 출제기준 기반이라 공식은 아니지만 추정보다 낫다
    jlpt: first?.jlpt?.[0]?.replace(/^jlpt-n(\d)$/, 'N$1'),
  }
}

/**
 * 중국어 HSK 등급.
 *
 * 출처는 complete-hsk-vocabulary (MIT). HSK는 공식 어휘표가 공개되어 있고
 * 이 데이터셋이 그것을 정리해 둔 것이라 추정이 들어가지 않는다.
 *
 * `new-N`을 쓴다 — 2021년 개정된 **HSK 3.0**이 현행 표준이다. 같은 데이터에
 * `old-N`(HSK 2.0)도 있는데 등급이 다르다(`苹果`는 3.0에서 3급, 2.0에서 1급).
 */
const HSK_URL = 'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.min.json'
let hskTable: Map<string, number> | null = null

async function hskLevels(): Promise<Map<string, number>> {
  if (hskTable) return hskTable
  const table = new Map<string, number>()
  // min 판은 키가 축약돼 있다 — simplified→s, level→l, new-3→n3
  const data = (await json(HSK_URL)) as Array<{ s?: string; l?: string[] }> | null
  for (const entry of data ?? []) {
    const level = entry.l?.find((l) => /^n[1-9]$/.test(l))?.slice(1)
    if (entry.s && level) table.set(entry.s, Number(level))
  }
  hskTable = table
  return table
}

export async function hskOf(term: string): Promise<number | undefined> {
  const level = (await hskLevels()).get(term)
  // 7~9급은 HSK 3.0에서 **하나의 묶음**이다. 데이터셋이 n7로 주므로 7로 두고,
  // 화면에는 `HSK 7-9`로 적는다 (lib/level.ts). 8·9는 따로 존재하지 않는다.
  //
  // 한때 7 이상을 버렸는데, 그러면 枕头·地毯·抽屉 같은 생활 명사가 통째로
  // 등급 없음이 된다 — 목록에 없어서가 아니라 우리가 버려서였다.
  return level
}

/** 일본어 단어의 JLPT 등급만 조회한다. 없으면 undefined */
export async function jlptOf(term: string): Promise<string | undefined> {
  return (await japanese(term)).jlpt
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
    .flatMap((f) => (JSON.parse(readFileSync(join(dir, f), 'utf8')).concepts ?? []) as Concept[])
}

const line = (n: number) => '─'.repeat(n)

async function one(word: string) {
  const lang = /^[\x20-\x7e]+$/.test(word) ? 'en' : 'ja'
  const result = await lookup(word, lang)

  console.log(`\n${word}  (${lang})`)
  console.log(line(40))
  if (result.reading) console.log(`읽기       ${result.reading}`)
  if (result.jlpt) console.log(`JLPT       ${result.jlpt}`)
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

// 직접 실행할 때만 돈다. 다른 스크립트가 jlptOf만 쓰려고 import해도
// 사전 조회가 통째로 돌아버리면 안 된다
if (import.meta.main) {
  const [word] = process.argv.slice(2)
  await (word ? one(word) : audit())
}
