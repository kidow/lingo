/**
 * 그림 소품에 임자가 있는지 본다. (spec.md §7, IMAGE_STYLE.md)
 *
 *   node scripts/props.ts suitcase map ticket
 *   node scripts/props.ts "one folded paper map on a counter with a hand taking one"
 *   node scripts/props.ts --in borrow-book late-fee show-start
 *
 * `pnpm claim`이 **표기**의 임자를 보는 자리라면 여기는 **그림**의 임자를 본다.
 *
 * 상황 표현을 넣을 때마다 같은 자리에 걸렸다. `자막 있나요?`를 그리려면 자막을,
 * `유통기한이 언제예요?`를 그리려면 우유갑을 그리게 되는데 그 사물에는 대개 이미
 * 개념이 있다. 그대로 그리면 그림이 겹쳐 `pnpm twins`가 잡거나, 잡히지 않아도
 * 4지선다에서 두 카드가 같은 그림으로 나온다.
 *
 * 세 회차 동안 후보마다 `content/`를 손으로 뒤져 이걸 확인했다 — 한 회차에 여덟
 * 번이었다. 그 조회를 스크립트로 옮긴다.
 *
 * 두 가지를 갈라 찍는다.
 *
 *   개념이 있다   그 사물이 개념의 영어 표제다 (`map` → `map` 지도)
 *                 → 그리면 그 개념의 그림과 같아진다. 장면으로 돌리거나 후보를 뺀다
 *   그림에 나온다 표제는 아니지만 다른 개념의 `image_prompt`에 이미 그려져 있다
 *                 → 그 그림과 얼마나 닮는지 사람이 본다
 *
 * `--in <slug...>`은 **이미 넣은 개념의 프롬프트**를 그대로 질의로 쓴다. 배치를
 * 넣고 나서 무엇과 물렸는지 한 줄로 본다 — 자기 자신은 결과에서 뺀다. 슬러그를
 * 둘 이상 주면 **배치 안에서 겹치는 소품**도 따로 찍는다. 상황 표현 1회차에서
 * 문을 세 장 그려 놓고 그림이 다 나온 뒤에야 알아챈 자리다.
 *
 * **판정하지 않는다.** 겹치는지는 그림을 그려봐야 알고, 그건 twins와 눈이 한다.
 * 여기서는 어디를 피해야 하는지만 보여 준다.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { busyMark, dirtyFiles } from '../lib/busy.ts'
import type { Concept } from '../lib/types.ts'

const dirty = dirtyFiles(
  spawnSync('git', ['diff', '--name-only', 'HEAD', '--', 'content'], { encoding: 'utf8' }).stdout ?? '',
)

const fileOf = new Map<string, string>()
const concepts: Concept[] = readdirSync('content')
  .filter((f) => f.endsWith('.json'))
  .sort()
  .flatMap((f) => {
    const parsed = JSON.parse(readFileSync(join('content', f), 'utf8'))
    const list = (parsed.concepts as Concept[] | undefined) ?? []
    for (const c of list) fileOf.set(c.slug, f.replace('.json', ''))
    return list
  })

/** 그 개념이 든 파일이 지금 만져지고 있으면 표시를 붙인다 */
const busy = (slug: string) => busyMark(fileOf.get(slug), dirty)

/** 프롬프트를 낱말로 끊는다. 소품이 아닌 것은 여기서 떨어진다 */
const STOP = new Set(
  `a an the one two three four five and or of on in at to from with without into onto over under
   above below beside behind between across along around near next by for its their his her
   seen from front side above below back top bottom left right angle slight three-quarter
   plain blank empty small large tall short long wide narrow round square flat thick thin
   dark light pale soft hard bright muted no not facial features background surface simple
   single lying standing sitting hanging resting holding placed set laid propped tucked
   figure figures person people hand hands foot feet head body arm arms leg legs
   this that these those it is are was were be been being as if then than so such
   view close closed open opened upright downward upward forward back mid same other another
   each every all both few many some more most less least own`
    .split(/\s+/)
    .filter(Boolean),
)

const words = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))

const args = process.argv.slice(2)
const IN = args[0] === '--in'
const rest = IN ? args.slice(1) : args
if (rest.length === 0) {
  console.log(
    '소품이나 개념을 하나 이상 주세요.\n\n' +
      '  pnpm props suitcase map ticket\n' +
      '  pnpm props "one folded paper map on a counter with a hand taking one"\n' +
      '  pnpm props --in borrow-book late-fee',
  )
  process.exit(1)
}

/** 개념마다 그림에 쓴 낱말과 영어 표제 */
type Row = { slug: string; meaning: string; prompt: string; terms: Set<string>; drawn: Set<string> }
const rows: Row[] = concepts.map((c) => ({
  slug: c.slug,
  meaning: c.meaning_ko,
  prompt: c.image_prompt ?? '',
  terms: new Set([c.words?.en?.term, ...(c.words?.en?.also ?? [])].filter(Boolean).map((t) => String(t).toLowerCase())),
  drawn: new Set(words(c.image_prompt ?? '')),
}))

/** `--in`이면 그 개념의 프롬프트가 질의다. 없는 슬러그는 여기서 걸린다 */
const sources = IN
  ? rest.map((slug) => {
      const row = rows.find((r) => r.slug === slug)
      if (!row) {
        console.log(`그런 개념이 없습니다 — ${slug}`)
        process.exit(1)
      }
      return row
    })
  : []

/** 인자에 띄어쓰기가 있으면 프롬프트로 보고 낱말을 뽑는다 */
const fromPrompt = new Set(
  IN ? sources.flatMap((r) => [...r.drawn]) : rest.filter((a) => a.includes(' ')).flatMap(words),
)
const queries = IN
  ? [...fromPrompt]
  : [...new Set(rest.flatMap((arg) => (arg.includes(' ') ? words(arg) : [arg.toLowerCase()])))]

/** `--in`은 자기 자신을 결과에서 뺀다 */
const mine = new Set(sources.map((r) => r.slug))

/**
 * 프롬프트에서 뽑은 낱말 중 **너무 흔한 것**은 건너뛴다.
 *
 * 불용어 목록을 손으로 채워도 `pulling`·`out`처럼 프롬프트마다 나오는 낱말이
 * 남는다. 목록을 늘리는 대신 세어서 자른다 — 문턱을 넘게 나오는 낱말은 소품이
 * 아니라 장면을 받치는 바닥이다. 낱말을 직접 준 자리는 자르지 않는다.
 *
 * **문턱은 실측으로 잡았다.** 상황 표현 스물여덟 회차에서 `--in`이 짚은 낱말을
 * 모아 «고쳐야 했던 것»과 «헛일이었던 것»으로 갈라 빈도를 재 보니 깨끗하게
 * 나뉘었다(2026-09-09, 프롬프트 6,748장).
 *
 *   헛일   folded 4.5% · wall 4.0% · paper 3.2% · desk 2.2% · box 2.2% ·
 *          corner 1.1% · tray 1.1% · shelf 1.1% · bench 1.1% · slot 0.8% ·
 *          hook 0.7% · envelope 0.7%
 *   진짜   hair 0.50% · cord 0.47% · dial 0.41% · stool 0.33% · bicycle 0.28% ·
 *          dog 0.25% · fruit 0.25% · coffee 0.21% · beans 0.12% · garage 0.04%
 *
 * 0.50%와 0.70% 사이가 비어 있다. 예전 문턱 0.5%는 그 틈의 **아래쪽 끝**이라
 * `envelope`·`hook`·`slot`이 매번 걸렸다 — 회차마다 서넛씩 짚였는데 실제로
 * 그림을 고친 것은 하나둘이었다. 0.6%로 올려 틈 한가운데에 둔다.
 */
const COMMON = 0.006
const line = (n: number) => '─'.repeat(n)
const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

let free = 0
const skipped: string[] = []
/**
 * **다른 개념이 제 몸통으로 쓰는 낱말**만 따로 모은다.
 *
 * 목록에는 이미 `개념`과 `그림` 두 줄이 갈려 있는데, 소품을 열댓 개씩 물으면
 * 화면이 길어져 그 구별이 묻힌다. 29회차에서 `form`(서식)·`cape`(망토)·
 * `traffic cone`(라바콘)을 세 번 되짚었다 — 셋 다 목록에 `개념`으로 찍혀
 * 있었는데 요약이 `임자 있음 22`라고만 해서 어느 스물둘인지 다시 봐야 했다.
 *
 * 둘은 무게가 다르다. **그림에 나온 것은 겹쳐도 될 때가 있지만**(벽·쟁반은
 * 여러 장면을 받친다) **다른 개념의 몸통은 비켜야 한다** — 그 개념의 카드와
 * 내 카드가 같은 그림이 된다.
 *
 * **몸통일 때만 그렇다.** 29회차의 `gym-towel`(수건 주나요?)은 `towel`(수건)과
 * `basket`(바구니)을 둘 다 쓰는데, 선반과 바구니는 배경이라 그림이 멀리 떨어져
 * 있다(`twins --pair towel gym-towel` → 구조 108 · 색 1.02). 그래서 이 줄은
 * 막지 않고 **어디를 다시 볼지만** 알려 준다.
 */
const bodies: string[] = []
for (const q of queries) {
  const named = rows.filter((r) => !mine.has(r.slug) && r.terms.has(q))
  const drawn = rows.filter((r) => !mine.has(r.slug) && !r.terms.has(q) && r.drawn.has(q))

  if (fromPrompt.has(q) && named.length === 0 && drawn.length > rows.length * COMMON) {
    skipped.push(q)
    continue
  }

  if (named.length === 0 && drawn.length === 0) {
    free += 1
    continue
  }

  if (named.length > 0) bodies.push(q)
  console.log(`\n${q}  ${line(Math.max(2, 40 - q.length))}`)
  for (const r of named)
    console.log(`  개념   ${r.slug}(${r.meaning})${busy(r.slug)}  ${clip(r.prompt, 68)}`)
  for (const r of drawn.slice(0, 5))
    console.log(`  그림   ${r.slug}(${r.meaning})${busy(r.slug)}  ${clip(r.prompt, 68)}`)
  if (drawn.length > 5) console.log(`         … 그림에 나온 것 ${drawn.length}개 중 다섯만 찍었습니다`)
}

const clean = queries.filter(
  (q) => !rows.some((r) => !mine.has(r.slug) && (r.terms.has(q) || r.drawn.has(q))),
)
console.log(
  `\n소품 ${queries.length}개 — 임자 있음 ${queries.length - free - skipped.length}` +
    (clean.length > 0 ? ` · 빈자리 ${clean.length}\n  ${clean.join(' ')}` : ''),
)
if (bodies.length > 0)
  console.log(
    `\n다른 개념이 제 몸통으로 쓰는 낱말 ${bodies.length}개 — ${bodies.join(' · ')}` +
      '\n  내 그림의 몸통이 이 중 하나면 비킵니다 — 배경으로만 쓰는 것은 괜찮습니다',
  )
if (skipped.length > 0)
  console.log(`\n흔한 낱말이라 건너뛴 것 ${skipped.length}개 — ${skipped.join(' ')}`)

/**
 * 배치 안에서 겹치는 소품.
 *
 * 남의 그림만 보면 놓치는 자리가 있다 — 한 회차에 문을 세 장 그려 놓고 그림이
 * 다 나온 뒤에야 알아챘다. 준 슬러그끼리도 맞춰 본다.
 */
if (sources.length > 1) {
  /*
   * **여기서는 «개념 이름이라 남겨 둔다»가 통하지 않는다.**
   *
   * 위쪽 목록은 낱말이 다른 개념의 표기이면 흔하더라도 짚어 준다 — 그 개념과
   * 그림이 겹치는지 봐야 하기 때문이다. 그런데 배치 안에서 겹치는지는 그것과
   * 다른 물음이다. `wall`(벽)과 `tray`(쟁반)는 개념이면서 동시에 **장면을
   * 받치는 바닥**이라, 한 배치의 두 장면이 둘 다 벽을 쓴다고 해서 그림이
   * 닮지는 않는다.
   *
   * 그래서 여기서는 개념 여부를 보지 않고 빈도만 본다. 이 예외 때문에
   * 회차마다 서넛씩 짚였는데 실제로 고친 것은 하나둘이었다.
   */
  const floor = (q: string) =>
    fromPrompt.has(q) &&
    rows.filter((r) => !mine.has(r.slug) && r.drawn.has(q)).length > rows.length * COMMON

  const shared = new Map<string, string[]>()
  for (const q of queries) {
    if (skipped.includes(q) || floor(q)) continue
    const who = sources.filter((r) => r.drawn.has(q)).map((r) => r.slug)
    if (who.length > 1) shared.set(q, who)
  }
  console.log(`\n배치 안에서 겹치는 소품 ${shared.size}개`)
  for (const [q, who] of shared) console.log(`  ${q.padEnd(14)} ${who.join(' · ')}`)
  if (shared.size === 0) console.log('  (없습니다)')
}
