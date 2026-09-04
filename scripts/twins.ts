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
 * 나오는 것은 **의심 목록**이지 판정이 아니다. 세로로 긴 물건끼리(방망이·체온계·
 * 리코더) 구조가 붙는 건 정상이라, 마지막 판단은 눈으로 한다. `--sheets`는 그
 * 눈품을 줄이려고 쌍을 한 장에 여섯씩 붙여 준다.
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
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
const numbers = args.filter((a) => !a.startsWith('--')).map(Number)
const hashLimit = Number.isFinite(numbers[0]) ? numbers[0]! : 40
const colourLimit = Number.isFinite(numbers[1]) ? numbers[1]! : 0.35

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

const slugs = readdirSync(DIR)
  .filter((f) => f.endsWith('.webp'))
  .map((f) => basename(f, '.webp'))
  .sort()

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
