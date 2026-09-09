/**
 * content/*.json 검증. (spec.md §7)
 *
 * DB가 없으므로 seed도 마이그레이션도 없다. 이 스크립트가 유일한 관문이다.
 * Node가 타입을 그대로 벗겨내며 실행하므로 빌드 단계가 필요 없다.
 *
 *   node scripts/check.ts
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { AUDIO_MISSING } from '../lib/audio-have.ts'
import { LEVELS_STAMP } from '../lib/levels-stamp.ts'
import { auditTrivia } from '../lib/trivia-audit.ts'
import { entriesForTrack, exampleAudioKey } from '../lib/entries.ts'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { LANG } from '../lib/lang.ts'
import { clozeAt } from '../lib/quiz.ts'
import { LANGUAGE_TRACKS as TRACKS } from '../lib/track.ts'
import { fingerprint } from './levels-stamp.ts'
import type { Concept, Language, Trivia } from '../lib/types.ts'

/** 굽은 아포스트로피. 곧은 '와 섞이면 표제어와 예문이 어긋난다 */
const CURLY_APOSTROPHE = '\u2019'

/**
 * 언어마다 **들어와서는 안 되는 글자**. 표제어를 손으로 적다 보면 다른 글자가
 * 섞여 든다 — 러시아어 표제어 하나에 한자 `管`이 붙어 나간 적이 있다
 * (`Можно обратиться в管 управляющую контору`).
 *
 * 예문 대조가 결국 잡기는 한다. 표제어가 예문에 글자 그대로 없다고 경고하기
 * 때문이다. 다만 그 경고는 «예문이 단어를 안 보여준다»라고만 말해서 **원인이
 * 오타라는 것을 안 알려 준다** — 예문을 고치러 가게 된다. 그래서 글자 자체를
 * 먼저 본다.
 *
 * 막는 것은 **다른 문자 체계**뿐이다. 한글은 어느 언어에도 안 들어가고
 * (한국어는 `ko` 줄에 따로 적는다), 키릴은 러시아어에만, 가나는 일본어에만,
 * 한자는 중국어와 일본어에만 선다. 라틴 문자는 막지 않는다 — 중국어·일본어
 * 예문에 `wifi`처럼 섞이는 자리가 실제로 있다.
 */
const SCRIPTS = {
  한글: /[\uac00-\ud7a3]/u,
  키릴: /[\u0400-\u04ff]/u,
  가나: /[\u3040-\u30ff]/u,
  한자: /[\u4e00-\u9fff]/u,
} as const

/** 언어별로 금지된 문자 체계. 나머지는 그 언어가 실제로 쓴다 */
const FORBIDDEN: Record<string, (keyof typeof SCRIPTS)[]> = {
  en: ['한글', '키릴', '가나', '한자'],
  es: ['한글', '키릴', '가나', '한자'],
  fr: ['한글', '키릴', '가나', '한자'],
  de: ['한글', '키릴', '가나', '한자'],
  ru: ['한글', '가나', '한자'],
  ja: ['한글', '키릴'],
  zh: ['한글', '키릴', '가나'],
}

/** 섞여 든 문자 체계의 이름. 없으면 빈 배열 */
function strayScripts(lang: string, text: string) {
  return (FORBIDDEN[lang] ?? []).filter((name) => SCRIPTS[name].test(text))
}

/**
 * 러시아어에서 **어근이 같고 `-ся` 하나로 갈리는 짝**인지 본다.
 *
 * `открыть`(열다)와 `открываться`(열리다)는 주어가 다른 낱말이라 곁말이 아니다
 * (spec.md §7). 사전은 둘 다 open으로 적어서 뜻만 보면 안 갈린다 — 그래서
 * 2026-09-08 재검에서 이런 짝 스물둘이 곁말로 들어가 있었다.
 *
 * `ссориться`(다투다)처럼 짝이 되는 비재귀 동사가 아예 없는 낱말은 걸리지
 * 않는다. 어근이 실제로 겹칠 때만 본다.
 */
function voicePair(term: string, other: string) {
  const stem = (w: string) => w.replace(/(ся|сь)$/u, '').replace(/(ать|ять|ить|еть|уть|ти|чь)$/u, '')
  if (/ся$/u.test(term) === /ся$/u.test(other)) return false
  const a = stem(term)
  const b = stem(other)
  const short = Math.min(a.length, b.length)
  if (short < 3) return false
  let shared = 0
  while (shared < short && a[shared] === b[shared]) shared += 1
  return shared >= short - 1
}

/**
 * 러시아어 낱말의 품사를 **꼴로 짐작한다.** 모르겠으면 `null`이다.
 *
 * 곁말에는 품사를 적는 자리가 없다(lib/types.ts). 그런데 «같은 품사끼리만
 * 붙인다»는 규칙은 품사를 봐야 지킬 수 있다 — 2026-09-08 재검에서 명사에 관계
 * 형용사를 붙인 것(`культура`에 `культурный`)과 명사에 동사를 붙인 것
 * (`попытка`에 `пытаться`)이 서른둘 나왔다.
 *
 * **곁말에 품사 칸을 새로 두지 않았다.** 3,883개를 개념의 품사로 자동으로
 * 채우면 검사하려던 주장을 그대로 베껴 넣는 꼴이고, 손으로 채우려면 낱말마다
 * 사전을 봐야 한다. 러시아어는 어미가 품사를 거의 다 알려주므로 **꼴에서
 * 끌어내는 편이 싸고 정직하다.**
 *
 * 애매한 자리는 아예 판정하지 않는다 — `есть`·`красть`(동사)와 `новость`(명사)가
 * 다 `-сть`로 끝나고, `ведущий`(사회자)는 형용사 꼴의 명사다.
 */
function ruPos(word: string) {
  if (word.includes(' ')) return null
  if (/(ость|есть)$/u.test(word)) return '명사'
  if (/(сть|чь|шь|щий|щая)$/u.test(word)) return null
  if (/(ание|ение|тие|ствие|ие|ье)$/u.test(word)) return '명사'
  if (/[аяиеуо]ться$/u.test(word) || /[аяиеуо]ть$/u.test(word)) return '동사'
  if (/(ый|ий|ой|ая|яя|ое|ые)$/u.test(word)) return '형용사'
  if (/(ция|сия|ство|ка|ик|ок|ец|тель|ор|арь|изм|ура|ота)$/u.test(word)) return '명사'
  return null
}

/** 받침이 있으면 «이», 없으면 «가». 이름이 넷뿐이라 규칙 하나면 된다 */
const subject = (word: string) =>
  ((word.charCodeAt(word.length - 1) - 0xac00) % 28 ? '이' : '가')

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
 *
 * **`baby`·`child`·`adult`는 머리낱말일 때만 센다.** 이 넷은 사람만큼이나
 * 수식어로 쓰인다 — `baby bottle`(젖병) · `child safety seat`(카시트) ·
 * `adult shoe`(어른 신발)에는 사람이 없다. 그대로 세면 2026-09-09에 걸린 여섯
 * 중 셋이 헛경고였다(`nap-blanket`·`adult-entry`·`brushing-tips`).
 *
 * 머리낱말인지는 **뒤에 오는 것**으로 가른다. 사람이면 쉼표로 끊기거나
 * 전치사·`and`·`-ing`가 따라온다(`baby on hands` · `child sitting among` ·
 * `adult and one teacher`). 수식어면 곧바로 다른 명사가 온다(`child blanket`).
 * `adult hand at`처럼 몸의 한 부분만 나오는 자리도 이 잣대로 빠지는데, 손에는
 * 얼굴이 없으니 맞는 결과다.
 *
 * 쉰셋을 이 잣대로 갈라 보니 사람 39 · 수식 14였고, 수식으로 빠진 열넷은
 * 전부 물건 프롬프트였다 — 놓친 사람이 없다.
 *
 * 나머지(`person`·`figure`·`worker`…)는 조건 없이 센다. 수식어로 쓰인 자리가
 * 레포에 없다.
 */
const PERSON_HEAD =
  /(?=\s*[,.]|\s+(?:and\b|[a-z]+ing\b|(?:on|in|at|with|beside|near|behind|from|to|under|over|by|against)\b))/
    .source
const PERSON_RE = new RegExp(
  '\\b(?:figure|figures|person|people|man|woman|worker|passenger|customer)\\b' +
    `|\\b(?:baby|child|children|adult)\\b${PERSON_HEAD}`,
  'i',
)
const NO_FACE_RE = /no facial features/i

/**
 * **사물이 얼굴을 품는 자리.** 프롬프트에 사람이 하나도 없어도 신분증·여권·
 * 사진틀을 그리라고 하면 모델이 그 안에 초상을 넣는다 — 28회차의
 * `id-for-claim`이 그랬다. 인물 규칙은 사람 낱말만 보므로 이 자리를 못 잡는다.
 *
 * 막는 것이 아니라 **알려만 준다.** 닫힌 여권이나 이름 없는 명찰처럼 초상이
 * 안 들어가는 자리가 더 많고, 들어갔는지는 결국 시트를 봐야 안다.
 */
const PORTRAIT_OBJECT_RE =
  /\b(id card|identity card|passport|licence|license|badge|photo frame|portrait|headshot|id photo|visa)\b/i
const NO_PORTRAIT_RE = /(no portrait|blank|closed|silhouette|shaped gap|no readable letters|no facial features)/i

const errors: string[] = []
const warnings: string[] = []
const notes: string[] = []

const fail = (where: string, message: string) => errors.push(`${where} — ${message}`)
const warn = (message: string) => warnings.push(message)

if (!existsSync(CONTENT_DIR)) {
  console.error(`${CONTENT_DIR}/ 가 없습니다.`)
  process.exit(1)
}

/** 개념이 아닌 콘텐츠. 모양이 달라 아래 개념 검사를 지나가면 안 된다 */
const NOT_CONCEPTS = new Set(['articles.json'])

const files = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith('.json') && !NOT_CONCEPTS.has(f))
  .sort()
if (files.length === 0) fail(CONTENT_DIR, '개념 파일이 하나도 없습니다')

/** lib/content.ts에 등록되지 않은 파일은 앱에 안 들어간다 */
const loaderSource = existsSync('lib/content.ts') ? readFileSync('lib/content.ts', 'utf8') : ''

const seen = new Map<string, string>()
const perCategory: Record<string, number> = { noun: 0, verb: 0, adjective: 0, scene: 0 }
/** 언어별 단어 수 */
const perLanguage: Record<string, number> = {}
/** 트랙별 출제 수를 세려면 개념이 통째로 있어야 한다 */
const all: Concept[] = []
/** 파일별 개념. 등급 지문을 파일 단위로 대조한다 */
const byFile = new Map<string, Concept[]>()
/** slug가 어느 파일에 있는지. 같은 파일 안의 뜻줄 중복을 볼 때 쓴다 */
const fileOf = new Map<string, string>()
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

/**
 * 문맥 카드를 만들 수 있는 자리와, 예문이 있는데 한 줄도 못 뚫는 자리.
 *
 * 못 뚫는 이유는 대개 낱말에 무언가 **붙어 있어서**다 — 프랑스어 축약(`d'aider`)
 * 이나 합성어 하이픈(`___-Brot`). 뚫으면 그 부호가 정답의 첫 소리나 나머지
 * 반쪽을 알려줘 문장을 읽지 않고도 풀린다 (lib/quiz.ts의 `GLUED`).
 */
const clozable = new Set<string>()
const stuck = new Map<string, string>()

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

  byFile.set(file, concepts as Concept[])

  concepts.forEach((raw, i) => {
    const c = raw as Record<string, unknown>
    const slug = typeof c.slug === 'string' ? c.slug : ''
    const where = `${path} [${slug || i}]`
    total += 1
    all.push(raw as Concept)
    if (slug) fileOf.set(slug, path)

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
    if (
      typeof c.image_prompt === 'string' &&
      PORTRAIT_OBJECT_RE.test(c.image_prompt) &&
      !NO_PORTRAIT_RE.test(c.image_prompt)
    )
      warn(
        `${where} — 신분증·여권류가 든 프롬프트입니다. 사람을 안 적어도 모델이 초상을 그려 넣습니다 — "blank"나 "no portrait"를 적고 시트에서 확인하세요 (IMAGE_STYLE)`,
      )

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
      // 다른 문자 체계가 섞여 들었는지 본다. 예문 대조보다 먼저 원인을 말해 준다
      if (typeof word.term === 'string')
        for (const stray of strayScripts(lang, word.term))
          fail(where, `${lang}.term에 ${stray}${subject(stray)} 섞여 있습니다 — "${word.term}"`)
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
          // 러시아어는 어근이 같고 -ся 하나로 갈리는 짝을 곁말로 두지 않는다 (spec.md §7)
          if (lang === 'ru' && typeof word.term === 'string')
            for (const other of list) {
              if (voicePair(word.term, other))
                fail(
                  where,
                  `ru.also의 "${other}"는 "${word.term}"과 태가 다릅니다 — 곁말이 아니라 다른 개념입니다`,
                )
              // 품사가 갈리면 곁말이 아니다 (spec.md §7). 꼴로 짐작하고 애매하면 넘어간다
              const mine = ruPos(word.term)
              const theirs = ruPos(other)
              if (mine && theirs && mine !== theirs)
                fail(
                  where,
                  `ru.also의 "${other}"는 ${theirs}이고 "${word.term}"은 ${mine}입니다 — 곁말은 같은 품사끼리 붙습니다`,
                )
            }
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
        /*
         * 낱말이 들어 있기만 해서는 안 되고 **뚫을 수 있어야** 한다 (`clozeAt`).
         *
         * 아예 없는 것은 예문이 그 낱말을 안 보여주는 것이라 곧바로 경고한다.
         * 있는데 못 뚫는 것은 회차마다 갈리는 문제라 낱말 단위로 모아 뒀다가
         * **예문이 하나도 못 뚫을 때만** 말한다 — 예문 둘 중 하나만 되면 문맥
         * 카드는 만들어지고, 줄마다 경고하면 764줄이 되어 아무도 안 읽는다.
         */
        if (typeof example.text === 'string' && typeof answer === 'string') {
          if (!example.text.includes(answer))
            warn(`${where} — ${lang}.${at}에 "${answer}"가 없습니다. 예문이 그 단어를 보여주지 않습니다`)
          else if (clozeAt(example.text, answer, lang as Language) >= 0) clozable.add(`${slug}|${lang}`)
          else stuck.set(`${slug}|${lang}`, `${where} — ${lang}의 예문에서 "${answer}"를 뚫을 자리가 없습니다`)
        }
        if (typeof example.text === 'string' && example.text.includes(CURLY_APOSTROPHE))
          fail(where, `${lang}.${at}에 굽은 아포스트로피(’)가 있습니다. 곧은 '를 쓰세요`)
        if (typeof example.text === 'string')
          for (const stray of strayScripts(lang, example.text))
            fail(where, `${lang}.${at}에 ${stray}${subject(stray)} 섞여 있습니다 — "${example.text}"`)
        // ja·zh·ru는 예문도 읽을 수 있어야 한다. pnpm romanize가 채운다
        if (typeof example.text === 'string' && typeof answer === 'string' && example.text.includes(answer)) {
          const key = `${file}|${c.category}|${example.text.split(answer).join('___')}`
          const seen = (frames[lang] ??= new Map())
          if (!seen.has(key)) seen.set(key, new Set())
          seen.get(key)?.add(slug)
        }
        if ((lang === 'ja' || lang === 'zh' || lang === 'ru') && !example.romanization)
          warn(`${where} — ${lang}.${at}에 로마자가 없습니다. pnpm romanize를 돌리세요`)

        /*
         * TOCFL은 정답이 번체라 예문도 번체 쪽을 본다 (lib/entries.ts).
         * 없거나 정답이 그 안에 없으면 **그 낱말만 조용히 문맥 카드를 잃는다** —
         * 트랙 하나가 44.3%까지 내려갔던 자리다 (docs/tocfl-cloze-gap.md).
         */
        if (lang === 'zh' && (word.attributes as Record<string, unknown> | undefined)?.tocfl) {
          const traditional = (example as { traditional?: string }).traditional
          if (!traditional) warn(`${where} — zh.${at}에 번체가 없습니다. pnpm tocfl 을 돌리세요`)
          else if (typeof word.traditional === 'string' && !traditional.includes(word.traditional))
            warn(`${where} — zh.${at}의 번체에 "${word.traditional}"가 없습니다. 문맥 카드가 안 만들어집니다`)
        }
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
/** 지금 예문에서 나오는 소리 이름표 전부. 낡은 파일을 가려내는 데 쓴다 */
const exampleKeys = new Set<string>()
for (const concept of all)
  for (const word of Object.values(concept.words)) {
    const list = word.examples ?? (word.example ? [word.example] : [])
    list.forEach((example, index) => {
      if (example?.text) exampleKeys.add(exampleAudioKey(concept.slug, index, example.text))
    })
  }

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

    /*
     * 낡은 예문 소리 — 예문을 고쳐 이름이 달라진 파일.
     *
     * 이름에 문장 해시가 들어 있어(lib/entries.ts) 예문을 고치면 열쇠가 바뀐다.
     * 앱은 새 열쇠로 찾으니 옛 파일은 조용히 버려지는데, 지우지 않으면 저장소에
     * 쌓이고 무엇이 살아 있는 파일인지 알 수 없게 된다.
     */
    const exDir = join(audioRoot, lang.name, 'ex')
    if (existsSync(exDir)) {
      for (const file of readdirSync(exDir)) {
        if (!file.endsWith('.mp3')) continue
        if (exampleKeys.has(file.slice(0, -'.mp3'.length))) continue
        fail(
          join(exDir, file),
          '지금 예문과 맞지 않습니다 — 예문을 고친 뒤 남은 소리로 보입니다',
        )
      }
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

/**
 * 같은 것을 두 번 만든 자리.
 *
 * 뜻이 같은 개념은 널려 있고 그건 정상이다 — 한국어 한 낱말이 두 가지를
 * 가리키는 것뿐이라 `눈`은 snow와 eye, `배`는 ship과 pear다. 그림이 갈리므로
 * 개념도 갈린다 (§4).
 *
 * 문제는 **뜻도 같고 표기까지 겹치는** 자리다. `apartment`와 `condominium`이
 * 그랬다 — 뜻이 둘 다 "아파트"인데 중국어·스페인어·프랑스어 표기가 글자까지
 * 같았고 그림도 같은 아파트 건물이었다. 개념이 둘일 이유가 없다. `eyebrow`와
 * `eyebrows`도 단수·복수 차이뿐이었다.
 *
 * 동음이의어는 뜻(meaning_ko)이 다르니 여기 안 걸린다.
 */
{
  const sameMeaning = new Map<string, Concept[]>()
  for (const concept of all) {
    const list = sameMeaning.get(concept.meaning_ko) ?? []
    list.push(concept)
    sameMeaning.set(concept.meaning_ko, list)
  }
  for (const [meaning, group] of sameMeaning) {
    if (group.length < 2) continue
    for (let i = 0; i < group.length; i += 1)
      for (let j = i + 1; j < group.length; j += 1) {
        const shared = Object.keys(group[i]!.words).filter(
          (lang) =>
            group[i]!.words[lang as Language]?.term === group[j]!.words[lang as Language]?.term,
        )
        if (shared.length > 0) {
          warn(
            `${group[i]!.slug} 와 ${group[j]!.slug} — 뜻이 둘 다 "${meaning}"인데 ${shared.join('·')} 표기까지 같습니다. 개념이 둘일 이유가 있는지 보세요 (§4)`,
          )
          continue
        }
        /*
         * 표기는 갈리는데 뜻줄이 똑같은 자리.
         *
         * 개념으로는 옳을 수 있다 — `서리`(frost)와 `밤서리`(night frost)는 다른
         * 낱말이다. 다만 카드에 뜻줄이 그대로 나오므로(components/cards.tsx)
         * 학습자에게는 같은 한국어가 두 번 뜬다. 정답은 slug로 고르니 틀린
         * 문항이 되지는 않아, 막지 않고 **갈라 적을지 보라고만** 한다.
         *
         * **파일을 가리지 않는다.** 예전에는 같은 파일·같은 갈래만 봤다. 그때
         * 근거는 «파일이 다른 자리는 예순 짝인데 거의 다 진짜 동음이의어»
         * (`눈`=eye·snow, `배`=pear·ship)였는데, 그 예순을 갈라 적고 나서
         * 2026-09-09에 다시 세니 **뜻줄 6,838개가 전부 유일**하다. 겹치는 무리
         * 0, 괄호로 가른 뜻줄도 하나뿐이다 — 이 레포는 동음이의어를 괄호가
         * 아니라 **다른 낱말**로 피해 왔다(`눈썹`·`눈동자`·`함박눈`).
         *
         * 그러니 파일 제한은 지킬 것이 없는 예외였다. 걷어 내면 오늘 새로
         * 우는 자리는 없고, 앞으로 파일을 가로질러 겹치는 것만 걸린다 —
         * `pnpm dup`이 세 번 걸린 자리 중 하나가 그랬다.
         *
         * 같은 파일·같은 갈래는 한 줄 더 붙인다. 오답이 같은 파일에서 먼저
         * 뽑히므로(lib/quiz.ts의 `nearPool`) 그 둘이 **한 화면에 나란히 설 수**
         * 있어서다. 파일이 달라도 오답 풀이가 category로 넓어지는 자리가 있지만
         * (lib/entries.ts의 `distractorPool`) 그쪽은 확률이 낮다.
         */
        {
          const near =
            group[i]!.category === group[j]!.category &&
            fileOf.get(group[i]!.slug) === fileOf.get(group[j]!.slug)
          warn(
            `${group[i]!.slug} 와 ${group[j]!.slug} — 뜻줄이 둘 다 "${meaning}"입니다. 카드에 같은 한국어가 두 번 뜹니다 — 뜻줄을 갈라 적을지 보세요` +
              (near ? ' (같은 파일·같은 갈래라 오답으로 나란히 설 수 있습니다)' : ''),
          )
        }
      }
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
  // 한 언어에 트랙이 둘인 자리가 있다 — 중국어는 HSK와 TOCFL이다. 열쇠는
  // 언어로 짓지 트랙으로 짓지 않으므로 겹치는 것을 접는다. 접지 않으면 중국어
  // 발음이 빌 때마다 실물과 목록이 어긋난 것처럼 보인다
  const gone = new Set<string>()
  for (const { language } of TRACKS)
    for (const concept of all) {
      const word = concept.words[language]
      if (!word || !word[LANG[language].answer]) continue
      if (!existsSync(join(PUBLIC_DIR, 'audio', language, `${concept.slug}.mp3`)))
        gone.add(`${language}/${concept.slug}`)
    }
  const differing = [
    ...[...gone].filter((key) => !AUDIO_MISSING.has(key)),
    ...[...AUDIO_MISSING].filter((key) => !gone.has(key)),
  ]
  /*
   * **아직 커밋되지 않은 콘텐츠 때문인지 가린다.**
   *
   * 이 목록은 커밋되는 생성물이라 HEAD 콘텐츠로 굽는다. 그런데 검사는 작업
   * 트리를 보므로, 다른 세션이 개념을 넣어 두고 아직 커밋하지 않았으면 늘
   * 어긋난 것으로 보인다 — 내 일이 아닌데 매번 뜬다.
   *
   * 어긋난 열쇠가 **전부 아직 커밋되지 않은 파일에서 왔으면** 경고 대신 기록만
   * 남긴다. 그 콘텐츠를 커밋하는 사람이 그때 함께 구우면 되는 자리다.
   */
  if (differing.length > 0) {
    const dirty = new Set(
      spawnSync('git', ['diff', '--name-only', 'HEAD', '--', CONTENT_DIR], { encoding: 'utf8' })
        .stdout?.split('\n')
        .filter(Boolean) ?? [],
    )
    const fileFor = (key: string) => fileOf.get(key.slice(key.indexOf('/') + 1))
    const mine = differing.filter((key) => {
      const file = fileFor(key)
      return !file || !dirty.has(file)
    })
    if (mine.length > 0)
      warn(
        `lib/audio-have.ts가 낡았습니다 — ${mine.length}건 어긋납니다 (${mine.slice(0, 5).join(' ')}${mine.length > 5 ? ' …' : ''}). node scripts/audio.ts manifest 를 돌리세요`,
      )
    else
      // 기록 묶음은 이 자리보다 앞에서 이미 찍혔다. 그래서 바로 낸다
      console.log(
        `  · lib/audio-have.ts와 ${differing.length}건 어긋나지만 전부 아직 커밋되지 않은 콘텐츠입니다 — 그 콘텐츠를 커밋할 때 함께 굽습니다`,
      )
  }
}

/**
 * 화면이 읽는 것이 콘텐츠를 따라왔는지 본다. (scripts/split.ts)
 *
 * `public/content/`는 `content/*.json`에서 갈라 구운 파생물이라 저장소에 없다.
 * `pnpm dev`와 `pnpm build`가 먼저 굽지만 **dev 서버를 켜 둔 채 콘텐츠를
 * 고치면 낡는다** — 화면은 옛 낱말을 그대로 보여주고, 고친 사람은 왜 안
 * 바뀌는지 모른 채 파일을 다시 들여다본다.
 *
 * **원본 해시로 본다.** `pnpm split`이 구울 때 원본 파일의 해시를
 * `public/content/source.json`에 함께 적는다. 파일 시각만 보던 때는 내용이
 * 그대로여도 낡은 것이 됐다 — 다른 세션이 콘텐츠를 열었다 닫기만 해도, 브랜치를
 * 오갔다 와도 시각이 밀린다. 2026-09-09에 그 경고를 보고 다시 구웠는데 파일이
 * 하나도 안 바뀌었다.
 *
 * 해시를 적기 전에 구운 폴더가 있을 수 있으므로 `source.json`이 없으면 옛
 * 방식(시각)으로 돌아간다.
 */
{
  const packed = join(PUBLIC_DIR, 'content')
  const sourcePath = join(packed, 'source.json')
  if (!existsSync(packed)) {
    warn('public/content/ 가 없습니다 — 화면이 읽을 것이 없습니다. pnpm split 을 돌리세요')
  } else if (existsSync(sourcePath)) {
    const baked = JSON.parse(readFileSync(sourcePath, 'utf8')) as Record<string, string>
    const now: Record<string, string> = {}
    for (const name of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')))
      now[name] = createHash('sha1')
        .update(readFileSync(join(CONTENT_DIR, name)))
        .digest('hex')
        .slice(0, 12)
    for (const name of readdirSync(join(CONTENT_DIR, 'trivia')))
      now[`trivia/${name}`] = createHash('sha1')
        .update(readFileSync(join(CONTENT_DIR, 'trivia', name)))
        .digest('hex')
        .slice(0, 12)
    const changed = [...new Set([...Object.keys(now), ...Object.keys(baked)])].filter(
      (name) => now[name] !== baked[name],
    )
    if (changed.length > 0)
      warn(
        `public/content/ 가 낡았습니다 — ${changed.slice(0, 4).join(' · ')}${
          changed.length > 4 ? ` 외 ${changed.length - 4}개` : ''
        }가 구운 뒤에 바뀌었습니다. pnpm split 을 돌리세요`,
      )
  } else {
    const newest = Math.max(
      ...readdirSync(CONTENT_DIR)
        .filter((name) => name.endsWith('.json'))
        .map((name) => statSync(join(CONTENT_DIR, name)).mtimeMs),
      ...readdirSync(join(CONTENT_DIR, 'trivia')).map((name) =>
        statSync(join(CONTENT_DIR, 'trivia', name)).mtimeMs,
      ),
    )
    const oldest = Math.min(
      ...readdirSync(packed).map((name) => statSync(join(packed, name)).mtimeMs),
    )
    if (oldest < newest)
      warn('public/content/ 가 낡았습니다 — 콘텐츠를 고친 뒤 pnpm split 을 안 돌렸습니다')
  }
}

/**
 * 등급이 콘텐츠를 따라왔는지 본다. (spec.md §7, scripts/levels-stamp.ts)
 *
 * 등급 없는 낱말은 원래도 많다 — 시험 목록에 없으면 비우는 것이 맞다. 그래서
 * 빠뜨린 자리와 원래 없는 자리를 눈으로 가릴 수 없어 **조용히 어긋난다.**
 * 실제로 추상 축 160개가 등급 없이 들어간 적이 있다.
 */
{
  const stale: string[] = []
  for (const [file, concepts] of byFile)
    if (LEVELS_STAMP[file] !== fingerprint(concepts)) stale.push(file.replace('.json', ''))
  if (stale.length > 0)
    warn(
      `등급이 낡았습니다 — ${stale.join(' · ')}의 낱말이 바뀐 뒤 pnpm levels 를 안 돌렸습니다`,
    )
}

/**
 * 듣기 카드에 깔 파형이 실물 mp3를 따라왔는지 본다. (spec.md §5)
 *
 * 낡아도 카드는 성립한다 — 없는 낱말은 기본 모양으로 떨어진다(lib/peaks.ts).
 * 다만 발음을 새로 넣고 파형을 안 뽑으면 그 낱말만 남들과 다른 모양이라,
 * 조용히 어긋나는 자리다.
 */
{
  const behind: string[] = []
  const peaksRoot = join(PUBLIC_DIR, 'peaks')
  for (const lang of new Set(TRACKS.map(({ language }) => language))) {
    const path = join(peaksRoot, `${lang}.json`)
    const rows: Record<string, string> = existsSync(path)
      ? JSON.parse(readFileSync(path, 'utf8'))
      : {}
    let missing = 0
    for (const concept of all)
      if (
        existsSync(join(PUBLIC_DIR, 'audio', lang, `${concept.slug}.mp3`)) &&
        !rows[concept.slug]
      )
        missing += 1
    if (missing > 0) behind.push(`${lang} ${missing}건`)
  }
  if (behind.length > 0)
    warn(
      `public/peaks가 낡았습니다 — 파형 없는 발음 ${behind.join(' · ')}. node scripts/audio.ts peaks 를 돌리세요`,
    )
}

/**
 * 상식 파일 검증. (spec.md §4, §7)
 *
 * 낱말과 규칙이 다르다 — 그림도 발음도 예문도 없고, 대신 **오답이 콘텐츠 안에**
 * 있다. 자동으로 뽑지 않으므로 넷이 다 채워졌는지, 정답이 그중에 있는지를
 * 기계가 봐야 한다. 손으로 적는 자리라 오타 하나로 정답 없는 문항이 나간다.
 */
/**
 * 사람이 읽고 **넘기기로 한** 의심 문항 수. (lib/trivia-audit.ts)
 *
 * 남은 것은 전부 괄호가 표기의 일부라 뗄 수 없는 자리다 — `没(有)`·`母 (はは)`·
 * `ts (츠)`·`être (ét-)`. 괄호를 떼면 답이 부서지므로 고칠 것이 없다.
 *
 * **규칙으로는 못 가른다.** 좁힘 후보를 옛 문항에 돌려 재 봤다. "괄호가 끝에
 * 공백 두고 붙은 것만" 보면 진짜 표지 16건 중 4건을 놓치면서 헛경고는 6건이
 * 남고, "괄호 안에 원어가 든 것만" 보면 6건을 놓친다 — 원어 괄호가
 * `남성만 (der → den)`에서는 표지이고 `母 (はは)`에서는 표기라 같은 모양이다.
 *
 * 그래서 규칙 대신 **숫자를 박는다.** 늘면 새로 들어온 문항이 걸린 것이니
 * 경고하고, 줄면 여기를 낮추라고 알린다. 늘 켜져 있는 경고는 아무도 안 본다.
 */
const TRIVIA_SUSPECT_BASELINE: Record<Language, number> = {
  de: 0,
  en: 0,
  es: 0,
  fr: 0,
  // 母 (はは)·死人(시체) — 한자에 읽기와 뜻을 달아야 물음이 성립한다
  ja: 2,
  ru: 0,
  // 没(有)·V了没(有) — 괄호가 「있어도 되고 없어도 된다」는 표기 그 자체다
  zh: 2,
}

{
  const TRIVIA_DIR = join(CONTENT_DIR, 'trivia')
  const ID_RE = /^[a-z0-9-]+$/
  const loaderHasTrivia = readFileSync('lib/content.ts', 'utf8')
  let triviaTotal = 0
  let triviaSuspects = 0
  const perTrivia: string[] = []

  const triviaFiles = existsSync(TRIVIA_DIR)
    ? readdirSync(TRIVIA_DIR).filter((f) => f.endsWith('.json')).sort()
    : []

  for (const file of triviaFiles) {
    const where = `trivia/${file}`
    const lang = file.replace(/\.json$/, '')
    if (!loaderHasTrivia.includes(`content/trivia/${file}`))
      fail(where, 'lib/content.ts에 등록되지 않아 앱에 안 들어갑니다')

    const parsed = JSON.parse(readFileSync(join(TRIVIA_DIR, file), 'utf8')) as {
      lang?: string
      items?: Array<Record<string, unknown>>
    }
    if (parsed.lang !== lang) fail(where, `lang이 파일 이름과 다릅니다 — ${parsed.lang}`)
    if (!LANG[lang as Language]) fail(where, `모르는 언어입니다 — ${lang}`)

    const items = parsed.items ?? []
    const ids = new Set<string>()
    for (const item of items) {
      const id = String(item.id ?? '')
      const at = `${where}:${id || '(id 없음)'}`
      if (!ID_RE.test(id)) fail(at, 'id는 ^[a-z0-9-]+$ 여야 합니다')
      if (ids.has(id)) fail(at, 'id가 중복됩니다')
      ids.add(id)

      const question = String(item.question ?? '')
      if (!question.trim()) fail(at, '물음이 비었습니다')
      if (!String(item.note ?? '').trim()) fail(at, '해설(note)이 비었습니다 — 답한 뒤 배울 것이 없습니다')

      const choices = Array.isArray(item.choices) ? (item.choices as unknown[]).map(String) : []
      if (choices.length !== 4) fail(at, `보기가 4개여야 합니다 — ${choices.length}개`)
      if (new Set(choices).size !== choices.length) fail(at, '보기에 같은 것이 두 번 있습니다')
      if (choices.some((choice) => !choice.trim())) fail(at, '빈 보기가 있습니다')

      const answer = String(item.answer ?? '')
      if (!choices.includes(answer)) fail(at, `정답이 보기에 없습니다 — ${answer}`)
    }
    /**
     * 오답 품질은 **기준선을 넘을 때만** 경고한다 (lib/trivia-audit.ts).
     *
     * 위 검사들과 달리 이건 규칙 위반이 아니라 사람이 다시 읽어 볼 후보다 —
     * 정답이 길다고 틀린 문항이 아니다. 전체 목록은 `pnpm dev` → /debug의
     * 「의심 문항」 탭에서 본다.
     */
    // 위에서 모양을 이미 검증했으므로 여기서는 Trivia로 봐도 된다
    const suspects = auditTrivia(lang as Language, items as unknown as Trivia[])
    const baseline = TRIVIA_SUSPECT_BASELINE[lang as Language] ?? 0
    triviaSuspects += suspects.length
    if (suspects.length > baseline)
      warn(
        `${where} — 오답 품질 의심 ${suspects.length}건, 기준선 ${baseline}건보다 ${suspects.length - baseline}건 많습니다 (/debug의 「의심 문항」 탭에서 확인)`,
      )
    else if (suspects.length < baseline)
      warn(
        `${where} — 의심이 ${baseline}건에서 ${suspects.length}건으로 줄었습니다. scripts/check.ts의 TRIVIA_SUSPECT_BASELINE을 낮추세요`,
      )

    /**
     * **배열 순서가 곧 커리큘럼이다.** (spec.md §4)
     *
     * 상식은 새 카드를 목록 앞에서부터 낸다(lib/engine.ts의 `ordered`).
     * 그래서 문항을 파일 끝에 그냥 붙이면 히라가나를 지나기도 전에 접속법이
     * 나온다. brain의 학습 순서(`_data/notes_order.yml`)를 여기서 직접
     * 확인할 수는 없지만 — 그 폴더가 없어도 검사는 돌아야 한다 — **같은
     * 노트의 문항이 한 덩어리로 모여 있는지**는 파일만 보고 알 수 있고,
     * 순서가 깨지는 가장 흔한 경우가 바로 그것이다.
     */
    const seenSources = new Set<string>()
    let previous = ''
    for (const item of items) {
      const source = String(item.source ?? '')
      if (source === previous) continue
      if (seenSources.has(source))
        fail(
          `${where}:${String(item.id)}`,
          `노트 "${source}"의 문항이 앞뒤로 흩어져 있습니다 — 같은 노트끼리 모으고 brain의 학습 순서대로 두세요`,
        )
      seenSources.add(source)
      previous = source
    }

    triviaTotal += items.length
    perTrivia.push(`  ${lang} ${items.length}`)
  }

  if (triviaFiles.length)
    console.log(
      `\n상식 ${triviaTotal}문항 · 파일 ${triviaFiles.length}개` +
        (triviaSuspects > 0 ? ` · 의심 ${triviaSuspects}건` : '') +
        `\n` +
        perTrivia.join(''),
    )
}

/**
 * 참고 글 검증. (spec.md §5)
 *
 * 표는 **자리가 곧 뜻이다** — 오십음도에서 か행 세 번째 칸이 비면 く가
 * 사라진 것이 아니라 표가 어긋난 것이다. 그래서 줄마다 칸 수가 열 수와
 * 같은지를 본다. 빈 칸(`null`)은 정상이지만 **칸 자체가 모자라면** 뒤 글자가
 * 통째로 밀린다.
 */
{
  const ARTICLE_ID_RE = /^[a-z0-9-]+$/
  const ARTICLES_PATH = join(CONTENT_DIR, 'articles.json')
  if (!existsSync(ARTICLES_PATH)) fail('content/articles.json', '파일이 없습니다')
  else {
    if (!readFileSync('lib/content.ts', 'utf8').includes('content/articles.json'))
      fail('content/articles.json', 'lib/content.ts에 등록되지 않아 앱에 안 들어갑니다')

    const parsed = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8')) as {
      articles?: Array<Record<string, unknown>>
    }
    const list = parsed.articles ?? []
    if (list.length === 0) fail('content/articles.json', 'articles가 비었습니다')

    const ids = new Set<string>()
    let glyphs = 0
    const per: string[] = []
    for (const article of list) {
      const id = String(article.id ?? '')
      const where = `articles.json:${id || '(id 없음)'}`
      if (!ARTICLE_ID_RE.test(id)) fail(where, 'id는 ^[a-z0-9-]+$ 여야 합니다')
      if (ids.has(id)) fail(where, 'id가 중복됩니다')
      ids.add(id)
      if (!String(article.title ?? '').trim()) fail(where, '제목이 비었습니다')
      // 목록에서 제목만 보고는 열어 볼지 판단이 안 된다
      if (!String(article.summary ?? '').trim()) fail(where, '한 줄 설명이 비었습니다')
      const lang = String(article.lang ?? '')
      if (!LANG[lang as Language]) fail(where, `언어 "${lang}"이 lib/lang.ts에 없습니다`)

      const tables = Array.isArray(article.tables) ? article.tables : []
      let count = 0
      for (const table of tables as Array<Record<string, unknown>>) {
        const title = String(table.title ?? '')
        const at = `${where}/${title || '(제목 없음)'}`
        if (!title.trim()) fail(at, '표 제목이 비었습니다')

        const columns = Array.isArray(table.columns) ? table.columns : []
        const rows = Array.isArray(table.rows) ? table.rows : []
        if (rows.length === 0) fail(at, '줄이 없습니다')

        // 열 이름이 없는 표(외래어 조합)는 첫 줄의 칸 수를 기준으로 삼는다
        const width =
          columns.length > 0 ? columns.length : ((rows[0] as { cells?: unknown[] })?.cells?.length ?? 0)
        // 줄 이름은 화면에서 줄을 가리키는 열쇠라 표 안에서 겹치면 안 된다
        const labels = new Set<string>()
        for (const row of rows as Array<Record<string, unknown>>) {
          const label = String(row.label ?? '')
          const cells = Array.isArray(row.cells) ? row.cells : []
          if (!label.trim()) fail(at, '줄 이름이 비었습니다')
          if (labels.has(label)) fail(at, `줄 이름 "${label}"이 두 번 있습니다`)
          labels.add(label)
          if (cells.length !== width)
            fail(`${at}/${label}`, `칸이 ${width}개여야 하는데 ${cells.length}개입니다 — 빈 칸은 null로 둡니다`)
          for (const cell of cells) {
            if (cell === null) continue
            const c = cell as Record<string, unknown>
            // 읽기(roman)는 선택이다 — 병음처럼 글자가 곧 로마자인 문자도 있다
            if (!String(c.kana ?? '').trim()) fail(`${at}/${label}`, '글자가 비었습니다')
            count++
          }
        }
      }

      for (const rule of (Array.isArray(article.rules) ? article.rules : []) as Array<
        Record<string, unknown>
      >) {
        const title = String(rule.title ?? '')
        if (!title.trim()) fail(where, '규칙 제목이 비었습니다')
        if (!String(rule.body ?? '').trim()) fail(`${where}/${title}`, '규칙 설명이 비었습니다')
        const examples = Array.isArray(rule.examples) ? rule.examples : []
        if (examples.length === 0)
          fail(`${where}/${title}`, '예시가 없습니다 — 규칙만 있으면 읽을 것이 없습니다')
      }

      if (tables.length === 0 && !Array.isArray(article.rules))
        fail(where, '표도 규칙도 없습니다 — 열어도 볼 것이 없습니다')

      glyphs += count
      per.push(`  ${String(article.title)} ${count}자`)
    }
    console.log(`\n참고 글 ${list.length}편 · 글자 ${glyphs}개\n` + per.join(''))
  }
}

/**
 * 예문이 있는데 한 줄도 못 뚫는 낱말. 그 낱말은 재인·듣기 칸에 머문다.
 *
 * **어느 낱말인지 함께 찍는다.** 개수만 찍던 때는 고치려면 매번 같은 조회를
 * 손으로 다시 짜야 했다 — 경고는 셈이 아니라 할 일이어야 한다.
 */
{
  const blocked = [...stuck].filter(([key]) => !clozable.has(key))
  if (blocked.length > 0) {
    const byLang = new Map<string, number>()
    for (const [key] of blocked) {
      const lang = key.split('|')[1]
      byLang.set(lang, (byLang.get(lang) ?? 0) + 1)
    }
    const per = [...byLang].map(([lang, n]) => `${lang} ${n}`).join(' · ')
    const SHOWN = 12
    const names = blocked.slice(0, SHOWN).map(([key]) => key.replace('|', ' '))
    const rest = blocked.length > SHOWN ? ` 외 ${blocked.length - SHOWN}개` : ''
    warn(
      `문맥 카드를 못 만드는 낱말 ${blocked.length}개 (${per}) — 표제형이 예문에 그대로 서지 못합니다\n` +
        `      ${names.join(' · ')}${rest}`,
    )
  }
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
