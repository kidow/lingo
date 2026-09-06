/**
 * 프랑스어 명사의 성을 채운다. (spec.md §7)
 *
 *   node scripts/gender.ts            비어 있는 것만 채운다
 *   node scripts/gender.ts --dry      쓰지 않고 세기만 한다
 *
 * `attributes.gender`는 카드에 관사를 적는 자리다. 그런데 **빈칸을 뚫는 데도
 * 쓰인다.** 프랑스어는 모음으로 시작하는 낱말 앞에서 관사가 축약돼 붙으므로
 * (`l'opposition`) 그 자리를 못 뚫는다 (lib/quiz.ts의 `GLUED`). 고치려면
 * `cet`·`cette`처럼 성을 아는 한정사로 예문을 다시 써야 하는데, 성이 비어 있으면
 * 어느 쪽인지 알 수 없다. 콘텐츠 전체에서 그런 낱말이 248개였다.
 *
 * 출처는 프랑스어 위키낱말사전이다. `{{S|nom|fr}}` 절의 굵은 표제어 줄에
 * `{{m}}`·`{{f}}`가 붙는다.
 *
 *   '''hôpital''' {{pron|ɔ.pi.tal|fr}} {{m}}
 *
 * **애매하면 비운다.** `adversaire`처럼 남녀 같은 꼴(`mf`)이거나 절을 못 찾으면
 * 적지 않는다 — 틀린 관사를 카드에 내보내느니 빈칸이 낫다 (§7).
 *
 * 조회는 한 낱말에 0.7초를 쉬고 `.cache/fr-gender.json`에 적어 둔다. 같은 낱말을
 * 두 번 묻지 않는다.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { readJson, writeJson } from './cache.ts'
import type { Concept } from '../lib/types.ts'

const CACHE = 'fr-gender.json'
const DRY = process.argv.includes('--dry')
const PAUSE = 250

const cache = (readJson<Record<string, string | null>>(CACHE) ?? {}) as Record<string, string | null>

const sleep = (ms: number) => new Promise((done) => setTimeout(done, ms))

/** 위키낱말사전에서 성 하나. 못 고르면 null */
async function lookup(word: string): Promise<string | null> {
  if (word in cache) return cache[word]
  const url =
    `https://fr.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}` +
    `&prop=wikitext&format=json&formatversion=2`
  let text = ''
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'lingo-content-tool/1.0 (+https://github.com/kidow/lingo)' } })
    if (res.status === 429) {
      // 너무 빨리 물었다. 한 번 더 쉬고 다시 묻는다
      await sleep(5000)
      const retry = await fetch(url, { headers: { 'User-Agent': 'lingo-content-tool/1.0' } })
      text = ((await retry.json()) as { parse?: { wikitext?: string } })?.parse?.wikitext ?? ''
    } else {
      text = ((await res.json()) as { parse?: { wikitext?: string } })?.parse?.wikitext ?? ''
    }
  } catch {
    text = ''
  }

  let gender: string | null = null
  if (text.includes('{{langue|fr}}')) {
    const fr = text.split('{{langue|fr}}')[1] ?? ''
    const section = /\{\{S\|nom\|fr[^}]*\}\}([\s\S]*?)(?=\n===|$)/.exec(fr)?.[1] ?? ''
    const head = /^'''.*$/m.exec(section)?.[0] ?? ''
    // 남녀 같은 꼴은 관사를 하나로 못 정한다
    if (!/\{\{mf\b/.test(head) && !section.includes('mf=oui')) {
      if (/\{\{f\b/.test(head)) gender = 'f'
      else if (/\{\{m\b/.test(head)) gender = 'm'
    }
  }
  cache[word] = gender
  writeJson(CACHE, cache)
  await sleep(PAUSE)
  return gender
}

const files = readdirSync('content').filter((f) => f.endsWith('.json')).sort()
const wanted: Array<{ file: string; slug: string; term: string }> = []
for (const file of files) {
  const data = JSON.parse(readFileSync(join('content', file), 'utf8')) as { concepts?: Concept[] }
  for (const concept of data.concepts ?? []) {
    const word = concept.words?.fr
    if (!word?.term) continue
    // 성은 명사에만 적는다. 동사·형용사·표현은 관사를 안 받는다
    if (concept.category !== 'noun') continue
    if ((word.attributes as { gender?: string } | undefined)?.gender) continue
    // 여러 낱말짜리는 표제어가 구라서 사전에 없다
    if (word.term.includes(' ')) continue
    wanted.push({ file, slug: concept.slug, term: word.term })
  }
}

console.log(`성이 빈 프랑스어 명사 ${wanted.length}개`)

const found = new Map<string, string>()
let asked = 0
for (const row of wanted) {
  const gender = await lookup(row.term)
  asked += 1
  if (gender) found.set(row.term, gender)
  if (asked % 25 === 0) process.stdout.write(`\r  ${asked}/${wanted.length} 조회…`)
}
console.log(`\r  조회 ${asked}개 · 성을 찾은 낱말 ${found.size}개`)

if (DRY) process.exit(0)

let written = 0
for (const file of files) {
  const path = join('content', file)
  const data = JSON.parse(readFileSync(path, 'utf8')) as { concepts?: Concept[] }
  let touched = false
  for (const concept of data.concepts ?? []) {
    const word = concept.words?.fr
    if (!word?.term || concept.category !== 'noun') continue
    if ((word.attributes as { gender?: string } | undefined)?.gender) continue
    const gender = found.get(word.term)
    if (!gender) continue
    word.attributes = { ...(word.attributes ?? {}), gender } as typeof word.attributes
    touched = true
    written += 1
  }
  if (touched) writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}
console.log(`${written}개에 성을 적었습니다`)
