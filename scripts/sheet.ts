/**
 * 그림 여러 장을 한 장으로 붙인다. (spec.md §7)
 *
 *   node scripts/sheet.ts glitter wilt bury …   →  .images/sheet.png
 *
 * 배치를 넣고 나면 새 그림을 **눈으로** 봐야 하는 자리가 둘 있다. 둘 다 기계가
 * 못 잡는다.
 *
 *   1. 그림이 서로 바뀐다. 동시에 여러 장을 뽑을 때 남의 slug 자리에 저장된
 *      적이 있다. 같은 그림이 두 자리에 들어가면 `md5`가 잡지만, **다른** 그림이
 *      엉뚱한 자리에 들어가면 바이트도 다르고 구조도 달라 아무것도 안 걸린다
 *   2. 프롬프트에 없던 사람이 들어온다. `pnpm check`의 인물 규칙은 프롬프트만
 *      본다 — 트로피만 적은 자리에 모델이 사람을 그려 넣으면 경고가 안 난다
 *      (`boast`가 그랬다). 얼굴이 그려졌는지는 그림을 봐야 안다
 *
 * 열여덟 장을 한 장씩 여는 것보다 붙여 놓고 훑는 편이 싸고, 그림이 뒤바뀐 것은
 * 나란히 놓아야 오히려 잘 보인다.
 *
 * 결과는 `.images/`에 둔다 — 레포에 들어가지 않는 작업물 자리다.
 *
 * **변환 전에도 붙인다.** 원본은 `.images/<slug>.png`이고 변환 결과는
 * `public/concepts/<slug>.webp`인데, 둘 중 있는 것을 쓴다. 그래야
 * `pnpm genimg`이 끝나자마자 — `pnpm image`를 돌리기 전에 — 시트를 만들 수 있다.
 */
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const CELL = 180
const COLS = 6

/**
 * `--out <경로>`로 붙일 자리를 바꾼다. 기본은 `.images/sheet.png`.
 *
 * 배치를 두 프로세스로 나눠 돌리면 둘 다 같은 파일에 쓴다 — 나중에 끝난 쪽이
 * 앞엣것을 덮어 앞 배치를 못 보게 된다. `pnpm genimg`은 첫 slug를 붙인
 * 이름으로 따로 쓴다.
 */
const argv = process.argv.slice(2)
const outAt = argv.indexOf('--out')
const out = outAt === -1 ? join('.images', 'sheet.png') : (argv[outAt + 1] ?? '')
const slugs = outAt === -1 ? argv : [...argv.slice(0, outAt), ...argv.slice(outAt + 2)]
if (!out) {
  console.error('--out 뒤에 경로를 주세요.')
  process.exit(1)
}
if (slugs.length === 0) {
  console.error('slug를 하나 이상 주세요.\n\n  node scripts/sheet.ts glitter wilt bury')
  process.exit(1)
}

/** 변환 결과가 있으면 그것을, 없으면 원본 PNG를 쓴다 */
function source(slug: string): string {
  const webp = join('public', 'concepts', `${slug}.webp`)
  if (existsSync(webp)) return webp
  const png = join('.images', `${slug}.png`)
  if (existsSync(png)) return png
  console.error(`그림이 없습니다: ${slug} (${webp} · ${png})`)
  process.exit(1)
}

const rows = Math.ceil(slugs.length / COLS)
const tiles = await Promise.all(
  slugs.map(async (slug, i) => ({
    input: await sharp(source(slug)).resize(CELL, CELL).png().toBuffer(),
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL,
  })),
)

mkdirSync('.images', { recursive: true })
await sharp({
  create: { width: COLS * CELL, height: rows * CELL, channels: 3, background: '#ffffff' },
})
  .composite(tiles)
  .png()
  .toFile(out)

// 어느 칸이 어느 개념인지 적어 둔다. 붙여 놓으면 순서로만 가려야 한다
console.log(`${out} — ${slugs.length}장 · ${COLS}칸씩`)
for (let i = 0; i < slugs.length; i += COLS) console.log(`  ${slugs.slice(i, i + COLS).join(' · ')}`)
