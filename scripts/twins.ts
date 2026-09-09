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
  .filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--file')
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
 * 벌어진다 — 석고 모형을 스탠드에 세운 것과 접시에 놓은 것이 75다. 그건
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
