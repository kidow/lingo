/**
 * 생성한 PNG를 배포용 WebP로 변환한다. (spec.md §7, IMAGE_STYLE.md 출력 규격)
 *
 *   node scripts/image.ts            아직 결과물이 없는 것만
 *   node scripts/image.ts cat        하나만
 *   node scripts/image.ts --force    전부 다시
 *
 * 입력  .images/{slug}.png          gitignore. 재생성 가능하므로 레포에 안 넣는다
 * 출력  public/concepts/{slug}.webp  512×512 q80. 개당 5KB 안팎
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import sharp from 'sharp'

const SRC_DIR = '.images'
const OUT_DIR = join('public', 'concepts')
const SIZE = 512
const QUALITY = 80

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.filter((a) => !a.startsWith('--'))

if (!existsSync(SRC_DIR)) {
  console.error(`${SRC_DIR}/ 가 없습니다. 생성한 PNG를 여기에 두세요.`)
  process.exit(1)
}
mkdirSync(OUT_DIR, { recursive: true })

const sources = readdirSync(SRC_DIR)
  .filter((f) => f.endsWith('.png'))
  .map((f) => basename(f, '.png'))
  .filter((slug) => (only.length ? only.includes(slug) : true))
  .sort()

if (only.length) {
  const missing = only.filter((slug) => !sources.includes(slug))
  if (missing.length) {
    console.error(`${SRC_DIR}/ 에 없습니다: ${missing.join(', ')}`)
    process.exit(1)
  }
}

if (sources.length === 0) {
  console.log(`${SRC_DIR}/ 에 변환할 PNG가 없습니다.`)
  process.exit(0)
}

let converted = 0
let skipped = 0

for (const slug of sources) {
  const src = join(SRC_DIR, `${slug}.png`)
  const out = join(OUT_DIR, `${slug}.webp`)

  if (!force && existsSync(out)) {
    skipped += 1
    continue
  }

  await sharp(src).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: QUALITY }).toFile(out)

  const before = statSync(src).size
  const after = statSync(out).size
  console.log(
    `  ${slug.padEnd(14)} ${(before / 1024).toFixed(0).padStart(5)} KB → ${(after / 1024)
      .toFixed(1)
      .padStart(5)} KB`,
  )
  converted += 1
}

console.log(
  `\n변환 ${converted}개${skipped ? ` · 건너뜀 ${skipped}개 (--force로 덮어쓰기)` : ''}\n`,
)
