/**
 * 이미지 생성 프롬프트를 출력한다. (spec.md §7, IMAGE_STYLE.md)
 *
 *   node scripts/prompt.ts          아직 이미지가 없는 개념만
 *   node scripts/prompt.ts cat      하나만
 *   node scripts/prompt.ts --all    전부
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
