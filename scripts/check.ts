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
import { AUDIO_MISSING } from '../lib/audio-have.ts'
import { entriesForTrack } from '../lib/entries.ts'
import { LANG } from '../lib/lang.ts'
import { clozeAt } from '../lib/quiz.ts'
import { TRACKS } from '../lib/track.ts'
import type { Concept, Language } from '../lib/types.ts'

/** 굽은 아포스트로피. 곧은 '와 섞이면 표제어와 예문이 어긋난다 */
const CURLY_APOSTROPHE = '\u2019'

/** 언어별 `also` 표기 → 그것을 적은 개념. 다른 개념의 정답과 겹치는지 나중에 본다 */
const alsoTable = new Map<string, Map<string, string>>()
const alsoOf = (lang: string) => {
  if (!alsoTable.has(lang)) alsoTable.set(lang, new Map())
  return alsoTable.get(lang)!
}

const CONTENT_DIR = 'content'
const PUBLIC_DIR = 'public'
const SLUG_RE = /^[a-z0-9-]+$/
const CATEGORIES = ['noun', 'verb', 'adjective', 'scene']
/** 4지선다는 정답 1 + 오답 3이 필요하다 */
const MIN_PER_CATEGORY = 4

/**
 * 인물이 든 프롬프트는 `no facial features`를 달아야 한다. (IMAGE_STYLE)
 *
 * 전수 감사에서 세 장(crawl·lift·tutor)이 눈·입까지 그려진 채 들어와 있었는데,
 * 셋 다 프롬프트에 그 문구가 없었다. 그림을 눈으로 훑어 잡을 일이 아니라
 * **문구를 쓸 때 잡을 일**이라 여기서 경고한다. 손만 나오는 그림은 얼굴이
 * 없으므로 hand는 제외한다 — 그러면 대부분의 동작 카드가 헛경고를 낸다.
 */
const PERSON_RE = /\b(figure|figures|person|people|baby|child|children|adult|man|woman|worker|passenger|customer)\b/i
const NO_FACE_RE = /no facial features/i

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
/** 언어별 단어 수 */
const perLanguage: Record<string, number> = {}
/** 트랙별 출제 수를 세려면 개념이 통째로 있어야 한다 */
const all: Concept[] = []
let total = 0

/**
 * 빈칸 틀 — 예문에서 정답을 뚫고 남은 문장.
 *
 * 오답은 같은 주제 파일 · 같은 category에서 온다(`nearPool`). 그래서 그 안에서
 * 두 낱말이 **같은 틀**을 쓰면 어느 쪽을 뽑아도 답이 된다 — `The car is in the ___.`가
 * showroom과 garage 양쪽에 있으면 문항이 성립하지 않는다.
 *
 * 이건 겹치는 것만 세는 자리다. 겹치지 않아도 얇은 문장(`The ___ answered questions.`)은
 * 여전히 사람이 읽어야 걸러진다 — 기계로 정할 수 있는 데까지만 본다.
 */
const frames: Record<string, Map<string, Set<string>>> = {}

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
    all.push(raw as Concept)

    if (!slug) return fail(where, 'slug 누락')
    if (!SLUG_RE.test(slug)) fail(where, `slug가 ^[a-z0-9-]+$ 위반: "${slug}"`)
    if (seen.has(slug)) fail(where, `slug 중복 — ${seen.get(slug)} 에도 있습니다`)
    else seen.set(slug, path)

    if (!c.meaning_ko) fail(where, 'meaning_ko 누락')
    if (!c.image_prompt) fail(where, 'image_prompt 누락 — 이미지를 재생성할 수 없습니다')
    else if (
      typeof c.image_prompt === 'string' &&
      PERSON_RE.test(c.image_prompt) &&
      !NO_FACE_RE.test(c.image_prompt)
    )
      warn(`${where} — 인물이 든 프롬프트인데 "no facial features"가 없습니다. 모델이 얼굴을 그립니다 (IMAGE_STYLE)`)

    // category는 오답 보기를 뽑는 근거라 생략을 허용하지 않는다 (spec.md §4)
    if (!c.category) fail(where, 'category 누락')
    else if (!CATEGORIES.includes(c.category as string))
      fail(where, `category가 ${CATEGORIES.join(' | ')} 중 하나가 아닙니다: "${c.category}"`)
    else perCategory[c.category as string] += 1

    const words = c.words as Record<string, Record<string, unknown>> | undefined
    if (!words || Object.keys(words).length === 0) return fail(where, 'words 누락')

    for (const [lang, word] of Object.entries(words)) {
      const strategy = LANG[lang as keyof typeof LANG]
      if (!strategy) {
        warn(`${where} — 언어 "${lang}"이 lib/lang.ts에 없습니다. 출제되지 않습니다`)
        continue
      }
      perLanguage[lang] = (perLanguage[lang] ?? 0) + 1
      if (!word.term) fail(where, `${lang}.term 누락`)
      // 아포스트로피는 곧은 것 하나로 쓴다. 두 모양이 섞이면 표제어와 예문이
      // 다른 글자를 쓰게 되어 문맥 카드가 낱말을 못 찾는다 (`aujourd'hui`)
      if (typeof word.term === 'string' && word.term.includes(CURLY_APOSTROPHE))
        fail(where, `${lang}.term에 굽은 아포스트로피(’)가 있습니다. 곧은 '를 쓰세요`)
      // 정답으로 쓸 필드가 비면 그 언어에서 출제 불가다
      if (!word[strategy.answer])
        fail(where, `${lang}.${strategy.answer} 누락 — 이 언어의 정답 필드입니다`)

      /**
       * 같은 뜻의 다른 표기. 표시 전용이라 규칙이 두 가지다 (lib/types.ts).
       *
       * 정답과 같으면 같은 말을 두 번 적은 것이고, 다른 개념의 정답과 같으면
       * 그 개념을 여기서 미리 알려주는 셈이다 — 4지선다에서 보기 하나가
       * 소개 카드에 이미 나온 말이 된다.
       */
      const also = word.also as unknown
      if (also !== undefined) {
        if (!Array.isArray(also) || also.some((x) => typeof x !== 'string' || !x.trim()))
          fail(where, `${lang}.also는 비어 있지 않은 문자열 배열이어야 합니다`)
        else {
          const list = also as string[]
          if (new Set(list).size !== list.length) fail(where, `${lang}.also에 같은 표기가 두 번 있습니다`)
          const answer = word[strategy.answer]
          if (list.includes(word.term as string) || list.includes(answer as string))
            fail(where, `${lang}.also에 표제어와 같은 표기가 있습니다`)
          for (const other of list) alsoOf(lang).set(other, slug)
        }
      }

      /**
       * 예문은 선택이다. 있다면 두 줄이 다 있어야 하고, 그 단어가 실제로
       * 들어 있어야 한다 — 문맥 카드가 그 자리를 뚫기 때문이다 (§5).
       *
       * 한 줄이면 `example`, 여럿이면 `examples`다. **둘 다 같은 규칙을 받는다** —
       * 두 번째 예문이 규칙을 비켜 가면 그 회차에만 문항이 안 만들어진다.
       */
      const single = word.example as Record<string, unknown> | undefined
      const many = word.examples as Record<string, unknown>[] | undefined
      if (single && many?.length) warn(`${where} — ${lang}에 example과 examples가 함께 있습니다. examples만 씁니다`)
      const sentences = many?.length ? many : single ? [single] : []
      sentences.forEach((example, i) => {
        const at = sentences.length > 1 ? `examples[${i}]` : 'example'
        if (!example.text || !example.ko) fail(where, `${lang}.${at}은 text와 ko가 모두 필요합니다`)
        const answer = word[strategy.answer]
        // 들어 있기만 해서는 안 되고 **온전한 낱말**이어야 한다. `hands` 속의
        // `hand`를 뚫으면 `___s`가 남아 정답 모양이 새고, 앞이 굴절형이면
        // 빈칸이 엉뚱한 데 뚫려 진짜 정답이 문장에 그대로 보인다 (lib/quiz.ts)
        if (typeof example.text === 'string' && typeof answer === 'string' && clozeAt(example.text, answer, lang as Language) < 0)
          warn(
            example.text.includes(answer)
              ? `${where} — ${lang}.${at}의 "${answer}"가 긴 낱말 안에만 있습니다. 빈칸이 낱말을 자릅니다`
              : `${where} — ${lang}.${at}에 "${answer}"가 없습니다. 예문이 그 단어를 보여주지 않습니다`,
          )
        if (typeof example.text === 'string' && example.text.includes(CURLY_APOSTROPHE))
          fail(where, `${lang}.${at}에 굽은 아포스트로피(’)가 있습니다. 곧은 '를 쓰세요`)
        // ja·zh·ru는 예문도 읽을 수 있어야 한다. pnpm romanize가 채운다
        if (typeof example.text === 'string' && typeof answer === 'string' && example.text.includes(answer)) {
          const key = `${file}|${c.category}|${example.text.split(answer).join('___')}`
          const seen = (frames[lang] ??= new Map())
          if (!seen.has(key)) seen.set(key, new Set())
          seen.get(key)?.add(slug)
        }
        if ((lang === 'ja' || lang === 'zh' || lang === 'ru') && !example.romanization)
          warn(`${where} — ${lang}.${at}에 로마자가 없습니다. pnpm romanize를 돌리세요`)
      })
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

/**
 * `also`가 다른 개념의 정답과 겹치는 자리.
 *
 * 처음에는 경고로 뒀다 — 소개 카드가 나중에 보기로 나올 말을 미리 흘린다고
 * 봤다. 그런데 걸린 것들이 하나같이 **진짜 다의어**였다. `apartment`의 `flat`,
 * `autumn`의 `fall`, `necktie`의 `tie`는 영어에서 실제로 두 뜻을 다 갖는다.
 * 그걸 막으면 사실을 안 가르치게 된다.
 *
 * 오답으로 만나지도 않는다. 오답은 같은 주제·같은 품사에서 오는데(`nearPool`)
 * 이 쌍들은 주제가 다르다 — `necktie`는 clothes의 명사, `tie`는 action의 동사다.
 *
 * 그래서 경고가 아니라 **참고**로 적는다. 지어낸 짝이 섞이면 여기서 보인다.
 */
for (const [lang, table] of alsoTable) {
  const answers = new Map<string, string>()
  for (const concept of all) {
    const word = concept.words[lang as Language]
    const answer = word && LANG[lang as Language] && word[LANG[lang as Language].answer]
    if (answer) answers.set(answer, concept.slug)
  }
  for (const [form, slug] of table) {
    const owner = answers.get(form)
    if (owner && owner !== slug)
      notes.push(`${slug} — ${lang}.also의 "${form}"은 ${owner}의 정답이기도 하다 (다의어)`)
  }
}

// 겹치는 빈칸 틀. 같은 주제·같은 품사에서 두 낱말이 같은 문장을 쓰면 답이 둘이다
for (const [lang, seen] of Object.entries(frames)) {
  const clashes = [...seen.values()].filter((slugs) => slugs.size > 1)
  if (clashes.length === 0) continue
  const sample = [...seen.entries()].find(([, slugs]) => slugs.size > 1)
  notes.push(
    `${lang} — 겹치는 빈칸 틀 ${clashes.length}개 (예: ${[...(sample?.[1] ?? [])].join(', ')})`,
  )
}

const line = (n: number) => '─'.repeat(n)


console.log(`\n개념 ${total}개 · 파일 ${files.length}개`)
console.log(
  Object.entries(perCategory)
    .filter(([, n]) => n > 0)
    .map(([c, n]) => `  ${c} ${n}`)
    .join('') || '  (없음)',
)

// 트랙별 출제 가능 개수. 개념 공유가 실제로 되고 있는지가 여기서 보인다.
// TOEIC은 언어 단어 수보다 적다 — TSL에 있는 것만 낸다 (lib/entries.ts)
console.log(
  '\n' +
    TRACKS.map(({ id, label, language }) => {
      const asked = entriesForTrack(id, all).length
      const words = perLanguage[language] ?? 0
      return `  ${label} ${asked}${asked === words ? '' : `/${words}`}`
    }).join(''),
)

if (notes.length) {
  console.log(`\n${line(4)} 아직 없는 결과물 ${notes.length}건`)
  for (const n of notes.slice(0, 10)) console.log(`  · ${n}`)
  if (notes.length > 10) console.log(`  … 외 ${notes.length - 10}건. 전체는 pnpm dev → /debug`)
}
/**
 * 듣기 카드는 발음이 없는 자리를 `lib/audio-have.ts`에서 읽는다. 정적
 * 내보내기라 도는 중에 파일을 못 물어보기 때문이다 — 그 목록이 낡으면
 * 소리 없는 문제가 나간다. 여기서 실물과 대조한다.
 */
{
  const gone: string[] = []
  for (const { language } of TRACKS)
    for (const concept of all) {
      const word = concept.words[language]
      if (!word || !word[LANG[language].answer]) continue
      if (!existsSync(join(PUBLIC_DIR, 'audio', language, `${concept.slug}.mp3`)))
        gone.push(`${language}/${concept.slug}`)
    }
  const stale =
    gone.length !== AUDIO_MISSING.size || gone.some((key) => !AUDIO_MISSING.has(key))
  if (stale)
    warn(
      `lib/audio-have.ts가 낡았습니다 — 발음 없는 자리 ${gone.length}건 vs 적힌 것 ${AUDIO_MISSING.size}건. node scripts/audio.ts manifest 를 돌리세요`,
    )
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
