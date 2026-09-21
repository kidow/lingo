/**
 * 이미지 생성 프롬프트를 출력한다. (spec.md §7, IMAGE_STYLE.md)
 *
 *   node scripts/prompt.ts          아직 이미지가 없는 개념만
 *   node scripts/prompt.ts cat      하나만
 *   node scripts/prompt.ts --all    전부
 *   node scripts/prompt.ts --glyphs 글자·숫자를 부르는 프롬프트만 찍는다
 *
 * STYLE_PROMPT를 여기 복사하지 않는다. IMAGE_STYLE.md에서 읽는다 —
 * 스타일을 바꾸려면 그 파일 하나만 고치면 되어야 한다.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const STYLE_FILE = 'IMAGE_STYLE.md'
const CONTENT_DIR = 'content'
const OUT_DIR = join('public', 'concepts')

const args = process.argv.slice(2)
const all = args.includes('--all')
const only = args.filter((a) => !a.startsWith('--'))

/** `## STYLE_PROMPT` 아래 첫 번째 ```text 블록 */
function readStylePrompt(): string {
  if (!existsSync(STYLE_FILE)) {
    console.error(`${STYLE_FILE}이 없습니다.`)
    process.exit(1)
  }
  const source = readFileSync(STYLE_FILE, 'utf8')
  const heading = source.indexOf('## STYLE_PROMPT')
  if (heading === -1) {
    console.error(`${STYLE_FILE}에 "## STYLE_PROMPT" 절이 없습니다.`)
    process.exit(1)
  }
  const match = /```text\n([\s\S]*?)```/.exec(source.slice(heading))
  if (!match) {
    console.error(`${STYLE_FILE}의 STYLE_PROMPT 절에서 \`\`\`text 블록을 못 찾았습니다.`)
    process.exit(1)
  }
  return match[1].trimEnd()
}

type Target = { slug: string; imagePrompt: string; meaning: string }

function readTargets(): Target[] {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`${CONTENT_DIR}/ 가 없습니다.`)
    process.exit(1)
  }

  const targets: Target[] = []
  for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()) {
    const parsed = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8')) as {
      concepts?: { slug?: string; image_prompt?: string; meaning_ko?: string }[]
    }
    for (const concept of parsed.concepts ?? []) {
      if (!concept.slug) continue
      targets.push({
        slug: concept.slug,
        imagePrompt: concept.image_prompt ?? '',
        meaning: concept.meaning_ko ?? '',
      })
    }
  }
  return targets
}

/**
 * **글자·숫자를 부르는 프롬프트.** IMAGE_STYLE의 검수 규칙은 「이미지 안에
 * 글자·숫자·로고가 없다」인데, 프롬프트가 `a scoreboard showing two to nil`
 * 처럼 숫자를 시키면 모델은 숫자를 그린다. **그리고 그 숫자는 맞을 이유가
 * 없다** — 2026-09-21에 `carry-a-digit`이 「7 + 24 = 36」으로 나왔다.
 *
 * 규칙을 어긴 프롬프트가 틀린 그림을 부른 것이지 모델이 헛나간 것이 아니다.
 * 그런데 이 흠은 `pnpm check`가 안 보고 md5도 `twins`도 못 본다 — **시트를
 * 눈으로 볼 때만** 걸린다. 여기서 미리 찍어 두면 뽑기 전에 고칠 수 있다.
 *
 * 이미 «no letters»라고 막아 둔 프롬프트는 뺀다 — 전체의 36%가 그렇게 끝난다.
 */
const GLYPH_WORD =
  /\b(numeral|digit|digits|number|numbered|printed|written|writing|label|labelled|labeled|letters|word|words|text|price|date|score|fraction)\b/i
const GLYPH_GUARD = /no (?:other )?letters|no readable letters|no text|no writing|no numbers/i

/**
 * **글자가 곧 개념인 자리는 뺀다.** `digit`(숫자 하나)·`barcode`(바코드)·
 * `dollar`(달러)를 「글자 없이」 그리라는 것은 그리지 말라는 말이다. 이
 * 목록은 2026-09-21에 108장을 여섯 시트로 붙여 눈으로 보고 골랐다 — 그리는
 * 것이 글자 자체인 여덟이다.
 */
const GLYPH_IS_THE_POINT = new Set([
  'six-hundred', 'digit', 'number-card', 'dollar', 'barcode',
  'multiplication-sign', 'infinity-symbol', 'carry-digit',
])

if (args.includes('--glyphs')) {
  const rows = readTargets().filter(
    (t) =>
      !GLYPH_IS_THE_POINT.has(t.slug) &&
      !GLYPH_GUARD.test(t.imagePrompt) &&
      GLYPH_WORD.test(t.imagePrompt) &&
      // 이미 그린 것은 시트에서 눈으로 본다 — `--all`로 다시 볼 수 있다
      (all || !existsSync(join(OUT_DIR, `${t.slug}.webp`))),
  )
  for (const row of rows) console.log(`  ${row.slug.padEnd(30)} ${row.imagePrompt}`)
  const where = all ? '' : ' (아직 안 그린 것만 — 다 보려면 --all)'
  console.log(`\n글자·숫자를 부르는 프롬프트 ${rows.length}개${where} — «no letters»로 막거나 다른 것을 그리게 하세요`)
  process.exit(0)
}

const style = readStylePrompt()
let targets = readTargets()

if (only.length > 0) {
  const missing = only.filter((slug) => !targets.some((t) => t.slug === slug))
  if (missing.length > 0) {
    console.error(`${CONTENT_DIR}/ 에 없는 개념입니다: ${missing.join(', ')}`)
    process.exit(1)
  }
  targets = targets.filter((t) => only.includes(t.slug))
} else if (!all) {
  // 기본은 아직 결과물이 없는 것만. 이미 그린 걸 다시 뽑을 이유가 없다
  targets = targets.filter((t) => !existsSync(join(OUT_DIR, `${t.slug}.webp`)))
}

const withoutPrompt = targets.filter((t) => !t.imagePrompt)
if (withoutPrompt.length > 0) {
  console.error(`image_prompt가 비었습니다: ${withoutPrompt.map((t) => t.slug).join(', ')}`)
  process.exit(1)
}

if (targets.length === 0) {
  console.log(
    only.length || all
      ? '해당하는 개념이 없습니다.'
      : '이미지가 없는 개념이 없습니다. 전부 다시 뽑으려면 --all.',
  )
  process.exit(0)
}

const rule = '─'.repeat(72)
for (const target of targets) {
  console.log(`\n${rule}\n${target.slug}  ·  ${target.meaning}\n${rule}\n`)
  console.log(`${style}\n\n${target.imagePrompt}\n`)
}

console.log(rule)
console.log(`\n${targets.length}개. 생성한 PNG는 .images/{slug}.png 에 두고 pnpm image 를 돌린다.\n`)
