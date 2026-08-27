/**
 * app/icon.svg 하나에서 PWA·애플 아이콘을 만든다.
 *
 *   node scripts/icons.ts
 *
 * SVG가 원본이다. 색을 바꾸려면 그 파일만 고치고 다시 돌린다.
 * app/icon.svg 자체는 Next가 파비콘으로 그대로 쓴다.
 */
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const SRC = join('app', 'icon.svg')
const PUBLIC = 'public'

/** manifest가 가리키는 두 크기 + 애플 홈 화면용 */
const OUTPUTS = [
  { file: join(PUBLIC, 'icon-192.png'), size: 192 },
  { file: join(PUBLIC, 'icon-512.png'), size: 512 },
  { file: join('app', 'apple-icon.png'), size: 180 },
]

mkdirSync(PUBLIC, { recursive: true })

for (const { file, size } of OUTPUTS) {
  await sharp(SRC, { density: 384 }).resize(size, size).png().toFile(file)
  console.log(`  ${file.padEnd(26)} ${size}×${size}  ${(statSync(file).size / 1024).toFixed(1)} KB`)
}

/**
 * 안드로이드 적응형 아이콘은 바깥을 잘라낸다. 안전 영역이 가운데 80%뿐이라
 * 그대로 넣으면 Iris 사각형 모서리가 깎인다. 70%로 줄여 여백을 준다.
 * 배경색이 SVG와 같아 이어붙인 티가 나지 않는다.
 */
const MASKABLE = join(PUBLIC, 'icon-maskable-512.png')
const inner = Math.round(512 * 0.7)
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#F4F1EC' } })
  .composite([
    {
      input: await sharp(SRC, { density: 384 }).resize(inner, inner).png().toBuffer(),
      left: Math.round((512 - inner) / 2),
      top: Math.round((512 - inner) / 2),
    },
  ])
  .png()
  .toFile(MASKABLE)
console.log(`  ${MASKABLE.padEnd(26)} 512×512  ${(statSync(MASKABLE).size / 1024).toFixed(1)} KB  (maskable)`)

console.log(`\n아이콘 ${OUTPUTS.length + 1}개\n`)
