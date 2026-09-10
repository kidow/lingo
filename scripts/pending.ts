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
 * **어느 줄에 적혀 있는지도 함께 낸다.** 넘긴 까닭은 목록이 아니라 그 문단에
 * 적혀 있어서, 고치려면 결국 문서를 연다. 처음에는 «문서를 읽으세요»라고만
 * 했는데 2026-09-09에 일곱을 처리하면서 일곱 번 다 손으로 찾아 열었다.
 * `docs/twins-pending.md:47` 꼴이면 그대로 열린다.
 *
 * 무엇을 일감으로 볼지는 `lib/pending.ts`가 정한다 — 표와 목록 줄만 보고,
 * 끝난 절과 헛것으로 판정한 줄은 건너뛴다. 그 판단만 떼어 두었으므로
 * `pnpm test`가 지킨다(`lib/pending.test.ts`).
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
import { pendingIn } from '../lib/pending.ts'
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
/*
 * **`also-recheck.md`는 안 읽는다.** 그 문서에는 slug 단위 일감이 없다 —
 * 통계와 판정뿐이고, 하나 뽑히던 `apartment`도 «이건 헛것이다»를 설명하는
 * 예였다. 그 문서의 결론 자체가 «목록을 다 끝낸다»가 아니라 «회차마다 자기가
 * 넣은 것을 본다»라서, 목록이 아니라 절차로 안내한다(아래 끝줄).
 */
const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('-pending.md'))
/** slug → «문서:줄» 자리. 한 문서에 여러 번 나오면 **처음 나온 줄**만 남긴다 */
const seen = new Map<string, Set<string>>()
for (const doc of docs) {
  const text = readFileSync(join(DOCS_DIR, doc), 'utf8')
  for (const { slug, line } of pendingIn(text, new Set(fileOf.keys()), files)) {
    const list = seen.get(slug) ?? new Set<string>()
    list.add(`${DOCS_DIR}/${doc}:${line}`)
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
      `  ${slug.padEnd(22)}${(meaningOf.get(slug) ?? '').padEnd(18)}${[...seen.get(slug)!].sort().join('  ')}`,
    )
}

console.log(
  `\n넘긴 개념 ${seen.size}개 — 지금 손댈 수 있는 것 ${free} · 남이 만지는 중 ${held}`,
)
if (free > 0 && !onlyFree) console.log('  --free 를 붙이면 손댈 수 있는 것만 봅니다')
console.log('  줄 번호가 붙은 자리를 여세요 — 왜 넘겼는지 그 문단에 적혀 있습니다')
console.log('  끝난 자리는 제목과 줄의 말로만 가릅니다. 더러 섞여 나오니 문단을 보고 정하세요')
console.log(
  '\n중국어 곁말은 여기 안 나옵니다 — 목록이 아니라 회차마다 도는 일입니다.' +
    '\n  자기가 넣은 파일에 pnpm also-audit --list <파일> 을 돌리세요 (docs/also-recheck.md)',
)
