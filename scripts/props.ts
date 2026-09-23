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
 * **소품 말고 짜임도 본다.** 소품은 낱말로 대조하므로 «쪼갠 부절»과 «깨진 패»를
 * 다른 것으로 본다 — 그런데 둘 다 «두 짝을 맞춰 본다»라는 한 그림이다. 算数를
 * 그렇게 그렸다가 두 회차 앞 认证과 겹쳤는데 md5도 twins도 props도 지나갔고
 * 시트에서 눈으로만 걸렸다(docs/nets.md). 그 빈칸을 메우려고 프롬프트에서
 * **관계 꼴**을 따로 뽑아 맞춘다.
 *
 * **판정하지 않는다.** 겹치는지는 그림을 그려봐야 알고, 그건 twins와 눈이 한다.
 * 여기서는 어디를 피해야 하는지만 보여 준다.
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { busyMark, dirtyFiles } from '../lib/busy.ts'
import { COMMON, propWords as words } from '../lib/prop-words.ts'
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

/**
 * **짜임** — 소품이 아니라 «무엇이 무엇과 어떤 사이인가»다.
 *
 * 소품 대조는 낱말로 하므로 `token`과 `stick`을 다른 것으로 본다. 그런데
 * 认证«맞다고 보증하다»의 «깨진 흙판 두 짝을 맞춘 것»과 算数«말한 것이 그대로
 * 선다»의 «쪼갠 대나무 부절 두 짝을 맞춘 것»은 카드에서 같은 그림이다.
 * 물건도 바이트도 구조도 달라 md5·twins·props가 셋 다 지나갔다.
 *
 * 문턱은 소품과 같은 자리에 떨어졌다. 9,393장에서 재 보니 이렇다.
 *
 *   드문 것   두 짝 맞춤 0.03% · 곁의 것과 견줌 0.02% · 위아래 두 자국 0.03% ·
 *             한쪽 끝만 0.09% · 여럿 속 하나 0.10% · 크기순 셋 0.18% ·
 *             한데 모임 0.24% · 한 번에 끊김 0.28% · 갈라 속 보임 0.15% ·
 *             반만 된 것 0.31% · 뚫고 나옴 0.07% · 닳음과 성함 0.36% ·
 *             빈 자리 0.49%
 *   바닥      넘쳐 흐름 0.73% · 줄 세우고 하나만 다름 1.16% ·
 *             한쪽으로 기움 2.33% · 자국만 남음 3.62%
 *
 * 0.49%와 0.73% 사이가 비어 있다 — 소품 문턱(0.6%)이 그대로 듣는다. 바닥에
 * 닿는 짜임은 이 레포의 기본 어법이라 짚어도 값이 없다.
 *
 * **정규식이라 다 잡지는 못한다.** 프롬프트를 내가 한 사람 어법으로 써 왔기에
 * 이만큼 듣는 것이고, 어법이 바뀌면 새 갈래를 손으로 더해야 한다. 놓친 자리는
 * 여전히 시트가 잡는다.
 *
 * **짜임이 겹친다고 그림이 겹치는 것은 아니다.** 이 검사를 처음 돌리자
 * hope·optimism·vitality-spark 셋이 다 «돌 틈으로 밀고 올라온 싹»으로 나왔는데,
 * `twins --pair`로 재 보니 셋 다 구조 106~112로 문턱(50) 밖이었다. 짜임은
 * **어디를 다시 볼지**만 말한다 — 소품 목록과 똑같다.
 *
 * **느슨하면 엉뚱한 것을 문다.** 처음에 「갈라서 속을 보인다」를
 * `(split|cut) (open|across|through)`로만 적었더니 纵横의 «들을 가로지르는
 * 물길»이 걸렸다 — 거기서 cut across는 «갈라서»가 아니라 «가로질러»다.
 * **속을 보이는 말(showing·inside)을 함께 걸어야** 짜임이 갈린다. 「뚫는다」도
 * 같은 이유로 미는 동작(pushing·driven)을 앞에 걸었다.
 */
const SHAPES: [name: string, rx: RegExp][] = [
  ['두 짝을 맞춰 본다', /two halves[^.]*(fitted|matching|match|lines? up|together)/],
  ['곁의 것과 견준다', /\b(beside|next to|side by side|against) (a|an|one|another)\b[^.]*\b(while|with the (other|rest)|and the (other|rest))/],
  ['위아래로 두 자국', /\bone[^.]{0,24}above the other\b/],
  ['한쪽 끝만 다르다', /\bone end\b[^.]*\b(other|nothing|bare|free)\b/],
  ['여럿 속에 하나만', /\b(one|single)\b[^.]*\b(among|amid) (a |the )?(many|crowd|row|rest|others)/],
  ['같은 것을 크기순으로', /\b(three|five)\b[^.]*\b(sizes?|of one shape|of the same shape)\b/],
  ['한데로 모여든다', /\b(gathered|running together|joining|converges?|converging)\b/],
  ['한 번에 끊겼다', /\b(in|at) (a|one) single (stroke|blow|cut|pull)\b/],
  ['갈라서 속을 보인다', /\b(split|cut|sawn|broken) (open|across|through)\b[^.]*\b(showing|revealing|inside|to show)\b/],
  ['반만 되어 있다', /\bhalf (taken down|finished|built|gone|sunk|open|buried)\b/],
  ['하나가 다른 것을 뚫는다', /\b(pushing|running|driven|punched|growing|forced)\b[^.]*\b(through|out of|into)\b[^.]*\b(wall|gap|crack|fence|joint|seam|plank)\b/],
  ['닳은 것과 성한 것', /\bworn\b[^.]*\b(while|and the|beside|among)\b/],
  ['자리는 있는데 비었다', /\b(empty|bare|blank)\b[^.]*\b(peg|hook|socket|outline|place|seat|shelf|slot)\b/],
  ['넘쳐 흘렀다', /\b(spill|spilled|spilling|overflow|overflowed|heaped)\b/],
  ['줄 세우고 하나만 다르다', /\b(row|line|rack|set|crowd|stack|circle|ring) of\b[^.]*\b(one|single)\b/],
  ['한쪽으로 기울었다', /\b(tilted|leaning|listing|low on one side|one side)\b/],
  ['자국만 남았다', /\b(footprints?|print|tracks?|marks?|stain|ash|dust|cobweb|ripples?)\b/],
]

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

/**
 * 짜임 대조.
 *
 * 소품 목록과 같은 꼴로 읽는다 — 드문 짜임은 임자를 찍고, 바닥에 닿는 짜임은
 * 이름만 세어 준다. 배치 안에서 같은 짜임을 나눠 쓰는 자리는 따로 찍는다.
 * 프롬프트를 통째로 준 자리(`pnpm props "one …"`)에서도 돈다.
 */
const shapesOf = (prompt: string) => SHAPES.filter(([, rx]) => rx.test(prompt.toLowerCase())).map(([n]) => n)
const queryPrompts = IN ? sources.map((r) => r.prompt) : rest.filter((a) => a.includes(' '))

if (queryPrompts.length > 0) {
  /** 짜임마다 이 레포에서 몇 장이 쓰는지 (내 것은 뺀다) */
  const holders = new Map<string, Row[]>()
  for (const [name] of SHAPES) {
    holders.set(
      name,
      rows.filter((r) => !mine.has(r.slug) && shapesOf(r.prompt).includes(name)),
    )
  }

  const asked = [...new Set(queryPrompts.flatMap(shapesOf))]
  const floorShapes = asked.filter((n) => (holders.get(n)?.length ?? 0) > rows.length * COMMON)
  const rare = asked.filter((n) => !floorShapes.includes(n))

  console.log(`\n짜임 ${asked.length}갈래 — 드문 것 ${rare.length} · 바닥 ${floorShapes.length}`)
  for (const name of rare) {
    const who = holders.get(name) ?? []
    console.log(`\n  「${name}」  ${line(Math.max(2, 34 - name.length * 2))} 이미 ${who.length}장`)
    for (const r of who.slice(0, 5))
      console.log(`    ${r.slug}(${r.meaning})${busy(r.slug)}  ${clip(r.prompt, 62)}`)
    if (who.length > 5) console.log(`    … ${who.length}장 가운데 다섯만 찍었습니다`)
  }
  if (floorShapes.length > 0)
    console.log(`\n  바닥이라 건너뛴 짜임 — ${floorShapes.map((n) => `「${n}」`).join(' ')}`)

  if (sources.length > 1) {
    const both = new Map<string, string[]>()
    for (const name of rare) {
      const who = sources.filter((r) => shapesOf(r.prompt).includes(name)).map((r) => r.slug)
      if (who.length > 1) both.set(name, who)
    }
    console.log(`\n배치 안에서 겹치는 짜임 ${both.size}갈래`)
    for (const [name, who] of both) console.log(`  「${name}」  ${who.join(' · ')}`)
    if (both.size === 0) console.log('  (없습니다)')
  }
}
