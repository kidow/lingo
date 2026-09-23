/**
 * 그림 빚을 **뽑을 순서대로** 잘라 준다. (IMAGE_STYLE.md, spec.md §7)
 *
 *   pnpm queue              다음 회차 셋을 낸다 (한 회차 12장)
 *   pnpm queue --size 20    회차 크기를 바꾼다
 *   pnpm queue --rounds 8   더 많이 낸다
 *   pnpm queue --file idea  한 축만
 *   pnpm queue --count      남은 것만 센다
 *
 * **왜 목록이 아니라 회차인가.** 안 그린 것이 천 장을 넘는다. 「안 그린 것」을
 * 다 찍으면 어디서 끊을지 매번 사람이 정해야 하고, 그 판단이 회차마다 다르면
 * 시트를 눈으로 볼 때 무엇과 무엇을 견줘야 하는지도 흐려진다. 그래서 **바로
 * 붙여 넣을 수 있는 `pnpm genimg` 한 줄**로 낸다.
 *
 * **순서는 등급이 정한다.** 시험 등급이 낮은 개념을 먼저 그린다 — 배우는
 * 사람이 먼저 만나는 카드다. 일곱 언어 가운데 **가장 이른 등급**을 쓴다
 * (HSK 1~7 · JLPT N5~N1 · CEFR A1~C2를 1~7로 편다). 등급이 하나도 없으면
 * 맨 뒤로 보낸다.
 *
 * **같은 축을 한 회차에 모은다.** 한 회차가 한 파일 안에서 끝나야 시트를 볼 때
 * 소품이 겹치는지 바로 보인다 — `pnpm props`가 잡는 것과 같은 자리다.
 *
 * **회차마다 소품 겹침도 함께 찍는다.** `pnpm props --in <회차>`가 하던 일을
 * 얇게 옮겼다 — 회차 안의 두 프롬프트가 **드문 낱말**을 같이 쓰면 시트에서
 * 무엇이 무엇인지 헷갈린다. 2026-09-23에 `shawl`이 `of-a-woman`과
 * `fallen-in-love`에, `shoes`가 `late-born-child`와 `keep-them-smiling`에
 * 몸통으로 겹쳐 있었다. **`props`를 대신하지는 않는다** — 그쪽은 콘텐츠 전체의
 * 임자와 짜임까지 본다. 여기서는 **한 시트 안**만 본다.
 *
 * **회차마다 글 겹침을 함께 찍는다.** `pnpm echoes`를 따로 돌리는 일은
 * 2026-09-23에 두 번 다 값을 했다 — 서른여섯 장에서 넷, 일흔둘에서 셋이 **이미
 * 그린 그림의 복사본**이었다. 뽑고 나면 `pnpm twins`가 잡지만 그때는 이미 장을
 * 버린 뒤다. 사람이 기억해야 하는 단계는 도구가 대신 찍는다.
 *
 * **남이 만지는 파일은 건너뛴다.** 커밋 안 된 수정이 있는 파일의 개념을 뽑으면
 * `pnpm genimg`이 아예 멈춘다 (docs/concurrent-sessions.md).
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { dirtyFiles } from '../lib/busy.ts'
import { type EchoRow, echoPairs } from '../lib/echo.ts'
import { COMMON, propWords } from '../lib/prop-words.ts'
import type { Concept } from '../lib/types.ts'

const CONTENT_DIR = 'content'
const OUT_DIR = join('public', 'concepts')

const argv = process.argv.slice(2)
const num = (flag: string, fallback: number) => {
  const at = argv.indexOf(flag)
  return at >= 0 ? Number(argv[at + 1]) : fallback
}
const SIZE = num('--size', 12)
const ROUNDS = num('--rounds', 3)
const onlyAt = argv.indexOf('--file')
const ONLY = onlyAt >= 0 ? argv[onlyAt + 1] : null
const COUNT = argv.includes('--count')

/** 시험 등급을 1~7 한 줄로 편다. 낮을수록 먼저 만나는 낱말 */
const JLPT: Record<string, number> = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 }
const CEFR: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 }
function level(concept: Concept): number {
  const seen: number[] = []
  for (const word of Object.values(concept.words ?? {})) {
    const attrs = (word as { attributes?: Record<string, string | number> }).attributes
    if (!attrs) continue
    if (typeof attrs.hsk === 'number') seen.push(attrs.hsk)
    if (typeof attrs.jlpt === 'string' && JLPT[attrs.jlpt]) seen.push(JLPT[attrs.jlpt])
    if (typeof attrs.cefr === 'string' && CEFR[attrs.cefr]) seen.push(CEFR[attrs.cefr])
  }
  return seen.length > 0 ? Math.min(...seen) : 9
}

const dirty = dirtyFiles(
  spawnSync('git', ['diff', '--name-only', 'HEAD', '--', CONTENT_DIR], { encoding: 'utf8' }).stdout ?? '',
)

type Row = EchoRow & { level: number }
const rows: Row[] = []
/** 글 겹침은 **그린 것까지** 봐야 한다 — 맞은편이 이미 그려져 있는 자리가 잦다 */
const every: EchoRow[] = []
let busy = 0
for (const name of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const file = name.replace('.json', '')
  const json = JSON.parse(readFileSync(join(CONTENT_DIR, name), 'utf8')) as { concepts?: Concept[] }
  for (const concept of json.concepts ?? []) {
    if (!concept.image_prompt) continue
    const drawn = existsSync(join(OUT_DIR, `${concept.slug}.webp`))
    every.push({ file, slug: concept.slug, meaning: concept.meaning_ko, prompt: concept.image_prompt, drawn })
    if (drawn) continue
    if (dirty.has(file)) {
      busy += 1
      continue
    }
    if (ONLY && file !== ONLY) continue
    rows.push({
      file,
      slug: concept.slug,
      meaning: concept.meaning_ko,
      prompt: concept.image_prompt,
      drawn: false,
      level: level(concept),
    })
  }
}

/** 등급이 먼저, 그 다음 축 — 한 회차가 한 파일 안에서 끝나도록 */
rows.sort((a, b) => a.level - b.level || a.file.localeCompare(b.file) || a.slug.localeCompare(b.slug))

const byFile = new Map<string, number>()
for (const row of rows) byFile.set(row.file, (byFile.get(row.file) ?? 0) + 1)

console.log(
  `\n안 그린 개념 ${rows.length}장${busy > 0 ? ` · 남이 만지는 파일이라 뺀 것 ${busy}장` : ''}`,
)
console.log(
  `  ${[...byFile.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f} ${n}`).join(' · ')}`,
)
if (COUNT) process.exit(0)

/** 문턱은 `pnpm echoes`와 같은 0.33 */
const pairs = echoPairs(every, 0.33)

/** 낱말이 몇 그림에 나오는지 — 흔한 소품을 자를 때 쓴다 */
const promptDf = new Map<string, number>()
for (const row of every)
  for (const word of new Set(propWords(row.prompt))) promptDf.set(word, (promptDf.get(word) ?? 0) + 1)

for (let round = 0; round < ROUNDS; round += 1) {
  const slice = rows.slice(round * SIZE, (round + 1) * SIZE)
  if (slice.length === 0) break
  const levels = slice.map((r) => r.level)
  const span = `등급 ${Math.min(...levels)}${Math.max(...levels) === Math.min(...levels) ? '' : `~${Math.max(...levels)}`}`
  const files = [...new Set(slice.map((r) => r.file))].join('·')
  console.log(`\n──── ${round + 1}회차  ${files}  ${span}`)
  console.log(`  ${slice.map((r) => `${r.slug}(${r.meaning})`).join(' · ')}`)
  const inRound = new Set(slice.map((r) => r.slug))
  /**
   * 회차 안에서 두 개념이 같이 쓰는 드문 낱말. 흔한 낱말(벽·쟁반)은 어느
   * 그림에나 나오므로 잘라 낸다 — 불용어도 문턱(0.6%)도 `pnpm props`와 같은
   * 것을 쓴다(`lib/prop-words.ts`). 두 도구가 같은 프롬프트를 달리 읽으면
   * 검수가 어긋난다.
   */
  const shared = new Map<string, string[]>()
  for (const row of slice)
    for (const word of new Set(propWords(row.prompt))) {
      if ((promptDf.get(word) ?? 0) / every.length > COMMON) continue
      const list = shared.get(word) ?? []
      list.push(row.slug)
      shared.set(word, list)
    }
  const props = [...shared.entries()].filter(([, slugs]) => slugs.length > 1)
  if (props.length > 0) {
    console.log('\n  소품이 한 시트에서 겹칩니다 — 몸통이면 한쪽을 다른 것으로 바꾸세요')
    for (const [word, slugs] of props.slice(0, 8)) console.log(`    ${word.padEnd(14)} ${slugs.join(' · ')}`)
    if (props.length > 8) console.log(`    … 외 ${props.length - 8}개`)
  }
  const echoes = pairs.filter(({ a, b }) => inRound.has(a.slug) || inRound.has(b.slug))
  if (echoes.length > 0) {
    console.log('\n  글이 겹칩니다 — 뽑기 전에 한쪽을 다른 장면으로 옮기세요')
    for (const { j, a, b } of echoes) {
      const mine = inRound.has(a.slug) ? a : b
      const other = mine === a ? b : a
      console.log(
        `    ${j.toFixed(2)} ${mine.slug}(${mine.meaning}) ↔ ${other.slug}(${other.meaning})` +
          `${other.drawn ? ' ·이미 그림' : ''}`,
      )
    }
  }
  console.log(`\n  pnpm genimg ${slice.map((r) => r.slug).join(' ')}`)
}
console.log('\n시트를 눈으로 본 뒤 pnpm image <slug…>로 WebP를 만듭니다')
