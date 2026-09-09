/**
 * 서로 닮은 개념 그림을 찾아낸다. (spec.md §4 — 개념마다 다른 그림)
 *
 *   node scripts/twins.ts             기본값으로 훑는다
 *   node scripts/twins.ts 30 0.25     더 좁게 (구조 비트 · 색 거리)
 *   node scripts/twins.ts --sheets    의심 쌍을 붙인 대조표까지 만든다
 *
 * `md5`로 잡히는 것은 **바이트가 같은** 그림뿐이다. 실제로 문제가 되는 쪽은
 * 따로 만들어졌는데 사람 눈에는 같은 그림이다 — 한 배치에서 옆 개념의 그림이
 * 그대로 나오는 일이 실제로 일어났다 (builder에 friendship 그림, crisis에
 * revolution 그림). 바이트가 다르니 md5는 조용하다.
 *
 * 그래서 둘을 같이 본다.
 *
 *   구조  16×16 dHash 256비트 — 가로로 이웃한 밝기를 견준다
 *   색    4×4 칸 평균 RGB 48개 — 물건 색이 다르면 갈린다
 *
 * 8×8 dHash로는 안 된다. 우리 그림은 죄다 넓은 미색 바탕에 가운데 물건 하나라
 * 저해상도 해시가 한 덩이로 뭉친다 (`body`와 `thermos`가 거리 0으로 나왔다).
 * 둘 다 가까운 쌍만 남긴다 — 하나만 가까우면 남이다.
 *
 * 짚인 쌍이 **내가 만들지 않은 개념**이면 고치지 말고
 * [docs/twins-pending.md](../docs/twins-pending.md)에 적어 임자에게 넘긴다 —
 * 그 파일을 만지는 세션이 따로 있으면 그림과 프롬프트를 동시에 고치는 셈이다.
 *
 * 나오는 것은 **의심 목록**이지 판정이 아니다. 세로로 긴 물건끼리(방망이·체온계·
 * 리코더) 구조가 붙는 건 정상이라, 마지막 판단은 눈으로 한다. `--sheets`는 그
 * 눈품을 줄이려고 쌍을 한 장에 여섯씩 붙여 준다.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import sharp from 'sharp'

const DIR = join('public', 'concepts')
const SHEET_DIR = join('.images', 'twins')
const BITS = 16 // dHash 한 변
const GRID = 4 // 색 서명 격자
const CELL = 180 // 대조표 한 칸
const PER_SHEET = 6

const args = process.argv.slice(2)
const sheets = args.includes('--sheets')
const numbers = args
  .filter(
    (a, i) =>
      !a.startsWith('--') &&
      args[i - 1] !== '--file' &&
      args[i - 1] !== '--pair' &&
      args[i - 2] !== '--pair',
  )
  .map(Number)
/**
 * 기본값은 실측으로 잡았다 (2026-09-09, 그림 6,700장).
 *
 * 예전 값(구조 40 · 색 0.35)은 **한 쌍도 못 잡았다.** 둘 다 자리를 잘못 잡고
 * 있었다.
 *
 *   색   눈으로 확인한 닮은 쌍의 색 거리가 0.13~0.20이다. 팔레트가 하나라
 *        0.35는 아무것도 안 거르는 값이었다
 *   구조 같은 쌍이 45~49에 몰려 있다. 40은 그 아래라 전부 밖이었다
 *
 * **밖에서 잴 때는 `subject()`의 `trim`을 같이 해야 한다.** 테두리를 안 자르면
 * 눈금이 달라져 같은 쌍이 63과 35로 갈린다.
 *
 * 조합을 훑어 보니 구조 50 · 색 0.20에서 열 쌍이 나오고 그중 여섯이 진짜였다 —
 * 계기판 둘(`return-with-fuel`·`speedometer`), 해먹 둘, 달력 둘, 모래시계 둘,
 * 펼친 책 둘, 고개 숙인 자세 둘. 55로 올리면 열여섯 쌍인데 새로 드는 것은
 * 길쭉한 물건끼리라 값이 없다.
 *
 * **여전히 못 잡는 것이 있다.** 같은 물건을 다른 구도로 그린 자리는 구조가
 * 벌어진다 — `database`와 `server`가 둘 다 서버 랙인데 59이고,
 * `chip`과 `semiconductor`는 프롬프트가 거의 같은 문장인데 62다. 그건
 * `pnpm props`가 프롬프트로 잡는다.
 */
const hashLimit = Number.isFinite(numbers[0]) ? numbers[0]! : 50
const colourLimit = Number.isFinite(numbers[1]) ? numbers[1]! : 0.2

type Signature = { bits: bigint; colour: number[] }

/**
 * 그림마다 여백이 넓어서 그대로 해시하면 바탕끼리 견주게 된다. 바탕은 죄다
 * 같은 미색이라 비트가 잡음으로 뒤집히고, 방망이와 체온계가 붙어 버린다.
 * 테두리를 먼저 잘라 물건만 남긴다.
 */
async function subject(file: string): Promise<ReturnType<typeof sharp>> {
  const buffer = await sharp(file).toBuffer()
  try {
    return sharp(await sharp(buffer).trim({ threshold: 12 }).toBuffer())
  } catch {
    return sharp(buffer) // 잘릴 테두리가 없는 그림
  }
}

async function signature(file: string): Promise<Signature> {
  const image = await subject(file)

  const grey = await image
    .clone()
    .greyscale()
    .resize(BITS + 1, BITS, { fit: 'fill' })
    .raw()
    .toBuffer()
  let bits = 0n
  for (let row = 0; row < BITS; row += 1) {
    const base = row * (BITS + 1)
    for (let col = 0; col < BITS; col += 1)
      bits = (bits << 1n) | (grey[base + col]! > grey[base + col + 1]! ? 1n : 0n)
  }

  const small = await image.clone().resize(GRID, GRID, { fit: 'fill' }).raw().toBuffer()
  const colour = [...small].map((v) => v / 255)

  return { bits, colour }
}

/** 서로 다른 비트 수. 256비트라 하나씩 센다 */
function apart(a: bigint, b: bigint): number {
  let diff = a ^ b
  let count = 0
  while (diff > 0n) {
    count += Number(diff & 1n)
    diff >>= 1n
  }
  return count
}

function colourGap(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i += 1) sum += (a[i]! - b[i]!) ** 2
  return Math.sqrt(sum)
}

/** 의심 쌍을 여섯씩 한 장에 붙인다 — 왼쪽·오른쪽이 한 쌍 */
async function drawSheets(pairs: { a: string; b: string }[]): Promise<void> {
  mkdirSync(SHEET_DIR, { recursive: true })
  for (let start = 0, no = 1; start < pairs.length; start += PER_SHEET, no += 1) {
    const chunk = pairs.slice(start, start + PER_SHEET)
    const width = CELL * 2 + 24
    const height = chunk.length * (CELL + 8)
    const layers = []
    for (const [row, pair] of chunk.entries()) {
      for (const [col, slug] of [pair.a, pair.b].entries()) {
        layers.push({
          input: await sharp(join(DIR, `${slug}.webp`)).resize(CELL, CELL).png().toBuffer(),
          left: col * (CELL + 24),
          top: row * (CELL + 8),
        })
      }
    }
    const file = join(SHEET_DIR, `sheet${String(no).padStart(2, '0')}.png`)
    await sharp({
      create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .composite(layers)
      .png()
      .toFile(file)
    const names = chunk.map((p) => `${p.a} | ${p.b}`).join(', ')
    console.log(`  ${file}  —  ${names}`)
  }
}

/**
 * `--file <이름>`은 그 콘텐츠 파일의 개념만 본다.
 *
 * 전체를 훑으면 6,700장을 서로 대므로 한 회차에 몇 분 걸리고, 나오는 쌍도
 * 남의 갈래가 섞인다. 한 파일 안에서만 보면 **오답이 실제로 붙는 자리**를 본다 —
 * 오답 풀은 같은 주제 파일에서 먼저 뽑기 때문이다(lib/entries.ts의 `nearPool`).
 */
const fileArg = (() => {
  const at = args.indexOf('--file')
  return at >= 0 ? args[at + 1] : undefined
})()

let slugs = readdirSync(DIR)
  .filter((f) => f.endsWith('.webp'))
  .map((f) => basename(f, '.webp'))
  .sort()

if (fileArg) {
  const path = join('content', fileArg.endsWith('.json') ? fileArg : `${fileArg}.json`)
  const json = JSON.parse(readFileSync(path, 'utf8')) as { concepts?: Array<{ slug: string }> }
  const only = new Set((json.concepts ?? []).map((c) => c.slug))
  slugs = slugs.filter((slug) => only.has(slug))
  console.log(`\n${path} — 개념 ${only.size}개 중 그림 있는 ${slugs.length}장만 본다`)
}

/**
 * `--pair <a> <b>`는 **두 장의 거리만 잰다.**
 *
 * 문턱을 손볼 때 «이 쌍이 지금 얼마인가»를 알아야 하는데, 그때마다 임시
 * 스크립트를 써 왔다. 2026-09-09에 네 번 썼고 그중 한 번은 `subject()`의
 * `trim`을 빼먹어 눈금이 어긋난 값을 문서에 적었다 — 같은 쌍이 63과 35로
 * 갈렸다. 도구 안에서 재면 그 실수가 안 난다.
 */
const pairArg = (() => {
  const at = args.indexOf('--pair')
  if (at < 0) return undefined
  const a = args[at + 1]
  const b = args[at + 2]
  if (!a || !b) {
    console.log('두 slug를 주세요 — pnpm twins --pair empty transparent')
    process.exit(1)
  }
  return [a, b] as const
})()

if (pairArg) {
  const [a, b] = pairArg
  for (const slug of pairArg)
    if (!slugs.includes(slug)) {
      console.log(`그림이 없습니다: ${slug} (public/concepts/${slug}.webp)`)
      process.exit(1)
    }
  const first = await signature(join(DIR, `${a}.webp`))
  const second = await signature(join(DIR, `${b}.webp`))
  const bits = apart(first.bits, second.bits)
  const colour = colourGap(first.colour, second.colour)
  const verdict =
    bits <= hashLimit && colour <= colourLimit ? '문턱 안 — 닮았다' : '문턱 밖'
  console.log(`\n  구조 ${bits}  색 ${colour.toFixed(3)}   ${a} ↔ ${b}`)
  console.log(`  문턱 ${hashLimit} · ${colourLimit} → ${verdict}\n`)
  process.exit(0)
}

const signatures = new Map<string, Signature>()
for (const slug of slugs) signatures.set(slug, await signature(join(DIR, `${slug}.webp`)))
console.log(`\n그림 ${slugs.length}장 · 서명 완료`)

const found: { dist: number; gap: number; a: string; b: string }[] = []
for (let i = 0; i < slugs.length; i += 1) {
  for (let j = i + 1; j < slugs.length; j += 1) {
    const a = slugs[i]!
    const b = slugs[j]!
    const dist = apart(signatures.get(a)!.bits, signatures.get(b)!.bits)
    if (dist > hashLimit) continue
    const gap = colourGap(signatures.get(a)!.colour, signatures.get(b)!.colour)
    if (gap > colourLimit) continue
    found.push({ dist, gap, a, b })
  }
}
found.sort((x, y) => x.dist - y.dist || x.gap - y.gap)

console.log(`구조 ${hashLimit}비트 이하 · 색 ${colourLimit} 이하 — ${found.length}쌍\n`)
for (const { dist, gap, a, b } of found)
  console.log(`  구조${String(dist).padStart(3)} 색${gap.toFixed(2)}  ${a}  ↔  ${b}`)

if (found.length === 0) console.log('  닮은 쌍이 없습니다.')

/**
 * **한쪽이 다른 쪽의 몸통을 빌린 쌍**을 짚는다.
 *
 * `idea/conviction-belief`(신념)의 프롬프트가 `one compass with its needle …`
 * 였다. `travel/compass`(나침반)가 제 몸통으로 쓰는 물건을 통째로 빌린 자리라
 * 그림이 54·0.23으로 붙었다. 2026-09-09에 그걸 손으로 찾았다.
 *
 * **낱말만 보고는 못 잡는다.** 프롬프트의 몸통이 다른 개념의 영어 표기와 똑같은
 * 자리가 754장인데 거의 다 정당하다 — `fly`(날다)는 `bird`를 그려야 하고
 * `boil`(끓이다)은 `pot`을 그려야 한다. 그래서 `check`에 넣지 않았다.
 *
 * **닮음과 겹쳐야 좁아진다.** 그 754와 늦춘 문턱의 여든 쌍을 맞대니 **둘**만
 * 남았다 — `conviction-belief`↔`compass`와 `cracked`(금 간)↔`plate`(접시)다.
 * 손으로 찾은 것을 도구가 다시 찾았고, 하나를 더 찾았다.
 *
 * 몸통은 맨 앞 수량사 뒤부터 전치사·쉼표 앞까지로 본다. 뒤에 곧바로 다른 명사가
 * 붙으면(`folded towel`) 표기와 안 맞아 빠지는데, 그 자리는 대개 배경이라 맞는
 * 결과다.
 *
 * **`props`에 옮겨 그림 뽑기 전에 잡으려다 접었다.** 같은 잣대를 프롬프트에만
 * 대면 761장이 걸린다 — `scene`만 130장(16%)이고 `good-night`이 `bed`를,
 * `soup`이 `bowl`을 그리는 자리라 거의 다 정당하다. 프롬프트 낱말이 얼마나
 * 겹치는지(자카드)로 갈라 보려 했으나 진짜 둘이 0.20~0.22로 **헛것들보다
 * 아래**였다(`print`↔`printer` 0.67 · `surfing`↔`surfboard` 0.60).
 *
 * 가르는 것은 결국 **그림이 실제로 닮았는지**이고, 그건 뽑은 뒤에만 안다.
 * 그래서 이 판단은 여기 남는다.
 */
const HEAD_RE =
  /^\s*(?:one|two|three|four|a|an|the)\s+([a-z ]+?)(?=\s+(?:with|on|in|at|beside|near|behind|from|to|under|over|by|against|seen|and|for|of|standing|lying|hanging|resting|held|set|pinned|open|closed)\b|,|\.|$)/i
const concepts = new Map<string, { term: string; prompt: string }>()
const byTerm = new Map<string, string>()
for (const file of readdirSync('content').filter((f) => f.endsWith('.json'))) {
  const parsed = JSON.parse(readFileSync(join('content', file), 'utf8')) as {
    concepts?: { slug: string; image_prompt?: string; words?: { en?: { term?: string } } }[]
  }
  if (!Array.isArray(parsed.concepts)) continue
  for (const c of parsed.concepts) {
    const term = c.words?.en?.term?.toLowerCase() ?? ''
    concepts.set(c.slug, { term, prompt: c.image_prompt ?? '' })
    if (/^[a-z][a-z ]*$/.test(term)) byTerm.set(term, c.slug)
  }
}
/** a의 프롬프트 몸통이 b의 표기이면 그 낱말. 아니면 빈 문자열 */
function borrowed(a: string, b: string): string {
  const head = HEAD_RE.exec(concepts.get(a)?.prompt ?? '')?.[1]?.trim().toLowerCase()
  return head && byTerm.get(head) === b ? head : ''
}
const borrows = found
  .map(({ a, b, dist, gap }) => {
    const word = borrowed(a, b) || borrowed(b, a)
    return word ? { a, b, dist, gap, word, taker: borrowed(a, b) ? a : b } : undefined
  })
  .filter((x) => x !== undefined)
if (borrows.length > 0) {
  console.log(`\n남의 몸통을 빌린 쌍 ${borrows.length}개 — 빌린 쪽이 다른 물건으로 갑니다`)
  for (const { dist, gap, word, taker, a, b } of borrows)
    console.log(
      `  구조${String(dist).padStart(3)} 색${gap.toFixed(2)}  ${taker}가 «${word}»를 그립니다 — 임자 ${taker === a ? b : a}`,
    )
}

/**
 * **여러 쌍에 거듭 나오는 그림**을 따로 낸다.
 *
 * 문턱을 늦추면 걸리는 것이 닮은 쌍이라기보다 **바탕에 가까운 그림**이다.
 * 미색 바탕에 흰 직사각형 하나인 `projector-screen`은 구름·좌표축·발찌·플루트와
 * 짝지어 나오는데 그중 겹치는 것은 없다. 쌍으로만 읽으면 그런 줄이 불어나
 * 진짜를 덮는다 — 2026-09-09에 65·0.32로 훑은 일흔아홉 쌍이 그랬다.
 *
 * 그날 손으로 세던 것을 여기 옮긴다. 문턱은 그때 분포에서 잡았다.
 *
 *   1쌍 86 · 2쌍 17 · **3쌍 4 · 4쌍 이상 5**
 *
 * 2와 3 사이가 꺾인다. 셋부터는 그 그림 자체를 다시 볼 값이 있다.
 */
const HUB = 3
const appears = new Map<string, string[]>()
for (const { a, b } of found) {
  appears.set(a, [...(appears.get(a) ?? []), b])
  appears.set(b, [...(appears.get(b) ?? []), a])
}
const hubs = [...appears].filter(([, with_]) => with_.length >= HUB).sort((x, y) => y[1].length - x[1].length)
if (hubs.length > 0) {
  console.log(`\n바탕에 가까운 그림 ${hubs.length}장 — ${HUB}쌍 이상에 나옵니다. 짝이 아니라 이 그림을 보세요`)
  for (const [slug, with_] of hubs)
    console.log(`  ${String(with_.length).padStart(2)}쌍  ${slug.padEnd(20)} ${with_.join(' · ')}`)
}

if (sheets && found.length > 0) {
  console.log(`\n대조표 — ${SHEET_DIR}/`)
  await drawSheets(found)
}

if (found.length > 0) {
  mkdirSync(SHEET_DIR, { recursive: true })
  const file = join(SHEET_DIR, 'pairs.txt')
  writeFileSync(
    file,
    found.map(({ dist, gap, a, b }) => `${dist}\t${gap.toFixed(3)}\t${a}\t${b}`).join('\n') + '\n',
  )
  console.log(`\n목록: ${file}`)
}
