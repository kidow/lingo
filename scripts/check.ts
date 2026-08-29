/**
 * content/*.json 검증. (spec.md §7)
 *
 * DB가 없으므로 seed도 마이그레이션도 없다. 이 스크립트가 유일한 관문이다.
 * Node가 타입을 그대로 벗겨내며 실행하므로 빌드 단계가 필요 없다.
 *
 *   node scripts/check.ts
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { LANG } from '../lib/lang.ts'
import { TRACK_IDS, trackOf, type TrackId } from '../lib/track.ts'

const CONTENT_DIR = 'content'
const PUBLIC_DIR = 'public'
const SLUG_RE = /^[a-z0-9-]+$/
const CATEGORIES = ['noun', 'verb', 'adjective', 'scene']
/** 4지선다는 정답 1 + 오답 3이 필요하다 */
const MIN_PER_CATEGORY = 4

const errors: string[] = []
const warnings: string[] = []
const notes: string[] = []

const fail = (where: string, message: string) => errors.push(`${where} — ${message}`)
const warn = (message: string) => warnings.push(message)

if (!existsSync(CONTENT_DIR)) {
  console.error(`${CONTENT_DIR}/ 가 없습니다.`)
  process.exit(1)
}

const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()
if (files.length === 0) fail(CONTENT_DIR, '개념 파일이 하나도 없습니다')

/** lib/content.ts에 등록되지 않은 파일은 앱에 안 들어간다 */
const loaderSource = existsSync('lib/content.ts') ? readFileSync('lib/content.ts', 'utf8') : ''

const seen = new Map<string, string>()
const perCategory: Record<string, number> = { noun: 0, verb: 0, adjective: 0, scene: 0 }
let total = 0

for (const file of files) {
  const path = join(CONTENT_DIR, file)
  if (loaderSource && !loaderSource.includes(`${CONTENT_DIR}/${file}`)) {
    warn(`${path} 가 lib/content.ts에 등록되지 않았습니다 — 앱에 로드되지 않습니다`)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    fail(path, `JSON 파싱 실패: ${(e as Error).message}`)
    continue
  }

  // 파일명이 곧 트랙이다 (lib/content.ts). 이름이 트랙과 다르면 로더가 못 읽는다
  const track = file.replace(/\.json$/, '') as TrackId
  if (!TRACK_IDS.includes(track)) {
    fail(path, `파일명이 트랙이 아닙니다 — ${TRACK_IDS.join(' | ')} 중 하나여야 합니다`)
    continue
  }
  const trackLanguage = trackOf(track).language

  const concepts = (parsed as { concepts?: unknown }).concepts
  if (!Array.isArray(concepts)) {
    fail(path, '최상위에 concepts 배열이 없습니다')
    continue
  }

  concepts.forEach((raw, i) => {
    const c = raw as Record<string, unknown>
    const slug = typeof c.slug === 'string' ? c.slug : ''
    const where = `${path} [${slug || i}]`
    total += 1

    if (!slug) return fail(where, 'slug 누락')
    if (!SLUG_RE.test(slug)) fail(where, `slug가 ^[a-z0-9-]+$ 위반: "${slug}"`)
    if (seen.has(slug)) fail(where, `slug 중복 — ${seen.get(slug)} 에도 있습니다`)
    else seen.set(slug, path)

    if (!c.meaning_ko) fail(where, 'meaning_ko 누락')
    if (!c.image_prompt) fail(where, 'image_prompt 누락 — 이미지를 재생성할 수 없습니다')

    // category는 오답 보기를 뽑는 근거라 생략을 허용하지 않는다 (spec.md §4)
    if (!c.category) fail(where, 'category 누락')
    else if (!CATEGORIES.includes(c.category as string))
      fail(where, `category가 ${CATEGORIES.join(' | ')} 중 하나가 아닙니다: "${c.category}"`)
    else perCategory[c.category as string] += 1

    const words = c.words as Record<string, Record<string, unknown>> | undefined
    if (!words || Object.keys(words).length === 0) return fail(where, 'words 누락')

    if (!words[trackLanguage])
      fail(where, `${trackLanguage} 단어가 없습니다 — ${track} 트랙은 이 언어로 출제합니다`)

    for (const [lang, word] of Object.entries(words)) {
      const strategy = LANG[lang as keyof typeof LANG]
      if (!strategy) {
        warn(`${where} — 언어 "${lang}"이 lib/lang.ts에 없습니다. 출제되지 않습니다`)
        continue
      }
      if (!word.term) fail(where, `${lang}.term 누락`)
      // 정답으로 쓸 필드가 비면 그 언어에서 출제 불가다
      if (!word[strategy.answer])
        fail(where, `${lang}.${strategy.answer} 누락 — 이 언어의 정답 필드입니다`)

      // 예문은 선택이다. 있다면 두 줄이 다 있어야 하고, 그 단어가 실제로 들어 있어야 한다
      const example = word.example as Record<string, unknown> | undefined
      if (example) {
        if (!example.text || !example.ko) fail(where, `${lang}.example은 text와 ko가 모두 필요합니다`)
        const answer = word[strategy.answer]
        if (typeof example.text === 'string' && typeof answer === 'string' && !example.text.includes(answer))
          warn(`${where} — ${lang}.example에 "${answer}"가 없습니다. 예문이 그 단어를 보여주지 않습니다`)
      }
    }

    // 결과물 유무는 실패가 아니다. 이미지가 없으면 플레이스홀더로 나간다
    if (!existsSync(join(PUBLIC_DIR, 'concepts', `${slug}.webp`)))
      notes.push(`${slug} — 이미지 없음 (플레이스홀더로 출제됩니다)`)
    for (const lang of Object.keys(words ?? {})) {
      if (!existsSync(join(PUBLIC_DIR, 'audio', lang, `${slug}.mp3`)))
        notes.push(`${slug} — ${lang} 발음 없음 (버튼이 비활성입니다)`)
    }
  })
}

/*
 * 고아 오디오 — 어느 slug와도 맞지 않는 파일.
 *
 * 경로가 slug에서 계산되므로 파일명이 한 글자만 달라도 앱은 조용히 못 찾는다.
 * 읽기나 로마자로 저장하기 쉬운데(`cat` 개념을 `neko.mp3`로), 그러면 발음이
 * 있는데도 버튼이 비활성으로 남는다. 눈에 안 띄는 실패라 여기서 잡는다.
 */
const audioRoot = join(PUBLIC_DIR, 'audio')
if (existsSync(audioRoot)) {
  for (const lang of readdirSync(audioRoot, { withFileTypes: true })) {
    if (!lang.isDirectory()) continue
    for (const file of readdirSync(join(audioRoot, lang.name))) {
      if (!file.endsWith('.mp3')) continue
      const slug = file.slice(0, -'.mp3'.length)
      if (seen.has(slug)) continue
      const guess = [...seen.keys()].find((s) => s.startsWith(slug) || slug.startsWith(s))
      fail(
        join(audioRoot, lang.name, file),
        `어느 개념 slug와도 맞지 않습니다 — 이 발음은 앱에 연결되지 않습니다${
          guess ? `. "${guess}.mp3" 를 의도했나요?` : ''
        }`,
      )
    }
  }
}

// 4지선다는 같은 category에서 오답 3개를 뽑는다. 모자라면 전체 풀로 넓혀야 한다
for (const [category, count] of Object.entries(perCategory)) {
  if (count > 0 && count < MIN_PER_CATEGORY)
    warn(`category "${category}" 개념이 ${count}개뿐입니다 — 오답 보기를 전체 풀에서 뽑게 됩니다`)
}

const line = (n: number) => '─'.repeat(n)
console.log(`\n개념 ${total}개 · 파일 ${files.length}개`)
console.log(
  Object.entries(perCategory)
    .filter(([, n]) => n > 0)
    .map(([c, n]) => `  ${c} ${n}`)
    .join('') || '  (없음)',
)

if (notes.length) {
  console.log(`\n${line(4)} 아직 없는 결과물 ${notes.length}건`)
  for (const n of notes.slice(0, 10)) console.log(`  · ${n}`)
  if (notes.length > 10) console.log(`  … 외 ${notes.length - 10}건. 전체는 pnpm dev → /debug`)
}
if (warnings.length) {
  console.log(`\n${line(4)} 경고 ${warnings.length}건`)
  for (const w of warnings) console.log(`  ! ${w}`)
}
if (errors.length) {
  console.log(`\n${line(4)} 오류 ${errors.length}건`)
  for (const e of errors) console.log(`  ✗ ${e}`)
  console.log()
  process.exit(1)
}

console.log('\n통과\n')
