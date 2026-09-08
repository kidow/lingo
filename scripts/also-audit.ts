/**
 * 중국어 곁말이 정말 그 개념을 가리키는지 사전으로 훑는다. (spec.md §7)
 *
 *   node scripts/also-audit.ts              숫자만
 *   node scripts/also-audit.ts --list       의심스러운 것을 다 찍는다
 *   node scripts/also-audit.ts --list food  그 파일만
 *
 * **고치지 않는다. 목록만 낸다.** 중국어 곁말은 HSK 배치가 회차마다 수십·수백
 * 개씩 넣는 자리라, 훑는 세션과 넣는 세션이 같은 필드를 동시에 만지면 서로의
 * 판단을 덮는다(docs/concurrent-sessions.md). 넣는 쪽이 자기 배치 끝에 이걸
 * 돌리는 것이 맞다.
 *
 * ## 무엇을 보나
 *
 * 러시아어는 어미가 품사를 알려줘서 꼴만으로 걸렀다(`ruPos`). 중국어는 꼴이
 * 품사를 안 알려주므로 **뜻을 봐야 한다.**
 *
 * 곁말의 CC-CEDICT 뜻풀이에 **그 개념의 영어 표기가 들어 있는지**를 본다.
 * `open`의 곁말 `召开`는 뜻풀이가 "to convene (a conference)"라 open이 없다 —
 * 회의를 소집하는 것이지 문을 여는 것이 아니다.
 *
 * 중국어 표제어와 곁말을 서로 대 보는 방법은 **버렸다.** 단음절 표제어의 사전
 * 첫 뜻이 엉뚱한 자리가 많아서다 — `听`(듣다)의 첫 뜻은 "smile (archaic)"이고
 * `修`(고치다)는 "surname Xiu"다. 개념의 영어 표기를 기준으로 삼으면 그 잡음이
 * 사라진다.
 *
 * ## 정밀도는 절반쯤이다
 *
 * 걸린 것을 스물다섯 개 손으로 갈라 보니 열셋이 진짜였다.
 *
 *   진짜   举办(행사를 열다) · 扑灭(불을 끄다) · 筹措(돈을 마련하다) ·
 *          牢(감옥) · 赶紧(부사) · 楼道(복도) · 处于(어떤 상태에 있다)
 *   아님   亲属(친척) · 忠实(충실한) · 盛宴(연회) · 许(허락하다)
 *
 * 그러니 **이 목록은 후보이지 판정이 아니다.** 사람이 하나씩 보고 정한다.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const CEDICT = '.cache/cedict.txt'

/** 간체 표제어 → 영어 뜻풀이들. 같은 표제어가 여러 줄이면 다 합친다 */
function loadDict() {
  const dict = new Map<string, string[]>()
  for (const line of readFileSync(CEDICT, 'utf8').split('\n')) {
    if (line.startsWith('#') || !line.trim()) continue
    const space = line.indexOf(' ')
    const bracket = line.indexOf(' [')
    const slash = line.indexOf('] /')
    if (space < 0 || bracket < 0 || slash < 0) continue
    const simplified = line.slice(space + 1, bracket)
    const glosses = line
      .slice(slash + 3)
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean)
    const seen = dict.get(simplified)
    if (seen) seen.push(...glosses)
    else dict.set(simplified, glosses)
  }
  return dict
}

/** 뜻풀이를 낱말 집합으로. 괄호 주석과 to-부정사는 버린다 */
const stem = (word: string) => word.replace(/(ing|ed|es|s)$/, '')
function bag(text: string) {
  const out = new Set<string>()
  for (const word of text
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z ]/g, ' ')
    .split(/\s+/))
    if (word.length > 2) out.add(stem(word))
  return out
}

const argv = process.argv.slice(2)
const list = argv.includes('--list')
const only = argv.find((a) => !a.startsWith('--'))

const dict = loadDict()
type Row = { file: string; slug: string; meaning: string; en: string; term: string; also: string; gloss: string }
const suspect: Row[] = []
let total = 0
let missing = 0

for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
  if (only && !file.startsWith(only)) continue
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
  for (const concept of json.concepts ?? []) {
    const zh = concept.words.zh
    const en = concept.words.en
    if (!zh?.also || !en) continue
    for (const also of zh.also) {
      total += 1
      const glosses = dict.get(also)
      if (!glosses) {
        missing += 1
        continue
      }
      const want = [...bag(en.term)]
      if (want.length === 0) continue
      const pool = new Set<string>()
      for (const gloss of glosses) for (const word of bag(gloss)) pool.add(word)
      if (want.some((word) => pool.has(word))) continue
      suspect.push({
        file: file.replace('.json', ''),
        slug: concept.slug,
        meaning: concept.meaning_ko,
        en: en.term,
        term: zh.term,
        also,
        gloss: glosses.slice(0, 3).join('; '),
      })
    }
  }
}

console.log(
  `\n중국어 곁말 ${total} — 사전 뜻에 영어 표기가 안 보이는 것 ${suspect.length} · 사전에 없는 표기 ${missing}`,
)
console.log('표본으로 잰 정밀도는 절반쯤이다 — 후보이지 판정이 아니다\n')

if (!list) {
  const byFile = new Map<string, number>()
  for (const row of suspect) byFile.set(row.file, (byFile.get(row.file) ?? 0) + 1)
  for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1]))
    console.log(`  ${file.padEnd(12)} ${String(count).padStart(4)}`)
  console.log('\n  --list 를 붙이면 하나씩 찍습니다\n')
} else {
  for (const row of suspect)
    console.log(
      `  ${row.slug.padEnd(20)} ${row.meaning.padEnd(10)} ${row.en.padEnd(16)} ${row.term} / ${row.also} — ${row.gloss.slice(0, 60)}`,
    )
  console.log('')
}
