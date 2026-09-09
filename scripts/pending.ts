/**
 * 넘겨 둔 것 가운데 **지금 손댈 수 있는 것**을 고른다. (docs/*-pending.md)
 *
 *   node scripts/pending.ts          파일별로 묶어서 보여준다
 *   node scripts/pending.ts --free   비어 있는 파일 것만
 *
 * 내가 만들지 않은 개념에서 문제를 찾으면 고치지 말고 적는다(docs/nets.md).
 * 그렇게 세 문서가 쌓였다 — 그림은 [twins-pending], 예문은 [examples-pending],
 * 중국어 곁말은 [also-recheck]다. 쌓이기만 하고 줄지 않는다.
 *
 * **줄지 않는 까닭은 «언제 손댈 수 있는지»를 몰라서다.** 문서에는 어느 파일이
 * 지금 만져지는지 적지 않는다 — 반나절이면 낡기 때문이다(twins-pending의
 * 머리말). 그래서 목록을 볼 때마다 파일을 하나씩 `pnpm dup`으로 찍어 봐야
 * 했다. 그 일을 여기서 한 번에 한다.
 *
 * 문서에서 backtick으로 감싼 낱말을 뽑아 **실제 slug와 맞는 것만** 남긴다.
 * `content/`의 개념 이름과 대조하므로 `abendlich`나 `evitar` 같은 표기는
 * 저절로 떨어진다. 문서 형식을 정해 두지 않아도 도는 편이 낫다 — 세 문서가
 * 표·목록·문단을 섞어 쓴다.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { busyMark, dirtyFiles } from '../lib/busy.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const DOCS_DIR = 'docs'
const onlyFree = process.argv.includes('--free')

/** slug → 어느 파일에 있는지, 뜻이 무엇인지 */
const fileOf = new Map<string, string>()
const meaningOf = new Map<string, string>()
const files = new Set<string>()
for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))) {
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as { concepts?: Concept[] }
  files.add(file.replace('.json', ''))
  for (const concept of json.concepts ?? []) {
    fileOf.set(concept.slug, file.replace('.json', ''))
    meaningOf.set(concept.slug, concept.meaning_ko)
  }
}

const dirty = dirtyFiles(
  spawnSync('git', ['diff', '--name-only', 'HEAD', '--', CONTENT_DIR], { encoding: 'utf8' })
    .stdout ?? '',
)

/** 어느 문서가 무엇을 넘겼는지 함께 보여준다 — 고치려면 그 문단을 읽어야 한다 */
const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('-pending.md') || f === 'also-recheck.md')
const seen = new Map<string, Set<string>>()
for (const doc of docs) {
  const text = readFileSync(join(DOCS_DIR, doc), 'utf8')
  for (const [, token] of text.matchAll(/`([a-z][a-z0-9-]*(?:\/[a-z0-9-]+)?)`/g)) {
    const slug = token.includes('/') ? token.slice(token.indexOf('/') + 1) : token
    if (!fileOf.has(slug)) continue
    /*
     * 파일 이름이 개념 이름이기도 하다 — `food`(먹을거리)·`nature`(자연)·
     * `city`(도시)·`number`(번호)가 그렇다. 문서는 그 낱말을 «food.json을
     * 훑었다»처럼 파일을 가리키는 데 더 자주 쓰므로, 슬래시 없이 홀로 선
     * 파일 이름은 건너뛴다. 개념을 가리킬 때는 `food/plate`처럼 적는다
     */
    if (!token.includes('/') && files.has(token)) continue
    const list = seen.get(slug) ?? new Set<string>()
    list.add(doc.replace('.md', ''))
    seen.set(slug, list)
  }
}

/** 파일별로 묶는다. 한 파일이 비면 그 파일 것을 몰아서 하는 편이 낫다 */
const byFile = new Map<string, string[]>()
for (const slug of seen.keys()) {
  const file = fileOf.get(slug)!
  byFile.set(file, [...(byFile.get(file) ?? []), slug])
}

const order = [...byFile.keys()].sort((a, b) => {
  const busyA = dirty.has(a) ? 1 : 0
  const busyB = dirty.has(b) ? 1 : 0
  return busyA - busyB || byFile.get(b)!.length - byFile.get(a)!.length
})

let free = 0
let held = 0
for (const file of order) {
  const slugs = byFile.get(file)!.sort()
  const busy = dirty.has(file)
  if (busy) held += slugs.length
  else free += slugs.length
  if (onlyFree && busy) continue
  console.log(`\n${file}${busyMark(file, dirty)}  ${'─'.repeat(Math.max(2, 34 - file.length))}`)
  for (const slug of slugs)
    console.log(
      `  ${slug.padEnd(22)}${(meaningOf.get(slug) ?? '').padEnd(18)}${[...seen.get(slug)!].sort().join(' · ')}`,
    )
}

console.log(
  `\n넘긴 개념 ${seen.size}개 — 지금 손댈 수 있는 것 ${free} · 남이 만지는 중 ${held}`,
)
if (free > 0 && !onlyFree) console.log('  --free 를 붙이면 손댈 수 있는 것만 봅니다')
console.log('  고치기 전에 그 문서의 문단을 읽으세요 — 왜 넘겼는지 거기 적혀 있습니다')
