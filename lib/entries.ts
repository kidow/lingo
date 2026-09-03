import { answerOf } from './lang.ts'
import { trackOf, type TrackId } from './track.ts'
import type { Category, Concept, Example, Language, Word } from './types.ts'

/**
 * 개념을 다루는 순수 함수들.
 *
 * JSON을 import하지 않는다. 그래야 번들러 없이도(node --test) 돌릴 수 있다.
 * 실제 데이터 로딩은 lib/content.ts가 한다.
 */

/** 개념 + 그 언어의 단어. 카드가 실제로 다루는 단위다. */
export type Entry = {
  /**
   * 진도가 이 카드를 부르는 이름. 낱말은 `concept.slug`가 그대로 온다.
   *
   * 엔진은 카드가 무엇인지 모른다 — 키 하나만 안다(lib/engine.ts). 상식 문항이
   * 낱말과 같은 엔진을 타는 것도 이 필드 덕이다. 진도 키는 이미 저장된 값이라
   * 낱말 쪽은 **slug 그대로여야 한다** — 접두사를 붙이면 지금까지의 진도가
   * 전부 남남이 된다.
   */
  key: string
  concept: Concept
  word: Word
  /** 어느 언어로 출제되는가. 발음 파일 자리를 여기서 찾는다 */
  lang: Language
  /** 그 언어에서 정답으로 쓰는 문자열 */
  answer: string
}

/**
 * 그 언어로 **출제 가능한** 개념만 추린다.
 * 단어가 없거나 정답 필드가 비어 있으면 조용히 빠진다. (spec.md §4)
 *
 * `track`은 카드에 낼 표기를 정할 때만 쓴다(lib/lang.ts) — HSK와 TOCFL처럼
 * 트랙 둘이 언어 하나를 나눠 쓰는 자리가 있어서다. 생략하면 언어의 기본값이다.
 */
export function entriesFor(lang: Language, concepts: Concept[], track?: TrackId): Entry[] {
  const entries: Entry[] = []
  for (const concept of concepts) {
    const word = concept.words[lang]
    if (!word) continue
    const answer = answerOf(word, lang, track)
    if (!answer) continue
    entries.push({ key: concept.slug, concept, word, lang, answer })
  }
  return entries
}

/**
 * 그 **트랙**에서 출제 가능한 목록.
 *
 * 여섯 트랙은 언어만 보면 되는데 TOEIC과 TOCFL은 한 겹 더 거른다. TOEIC은
 * TOEIC Service List에 있는 단어만 낸다 — `cat`·`rice`는 JLPT N5·HSK 1급으로는
 * 제값을 하지만 TOEIC 시험에는 나오지 않는다. TOCFL도 같은 이유다 — 八千詞表에
 * 없는 그림 명사(체크인 카운터 같은)까지 다 내면 시험에 안 나오는 낱말로 채워진다.
 * 개념을 지우는 게 아니라 이 트랙에서만 빼는 것이다.
 *
 * 규칙이 여기 하나만 있어야 앱과 `pnpm check`와 `/debug`가 같은 수를 센다.
 */
export function entriesForTrack(track: TrackId, concepts: Concept[]): Entry[] {
  const entries = entriesFor(trackOf(track).language, concepts, track)
  const key = track === 'toeic' ? 'tsl' : track === 'tocfl' ? 'tocfl' : null
  if (!key) return entries
  return entries.filter((entry) => {
    const attributes = entry.word.attributes as Record<string, unknown> | undefined
    return Boolean(attributes && key in attributes && attributes[key])
  })
}

/**
 * 오답 보기를 뽑을 후보. 같은 category에서만 고른다. (spec.md §5)
 *
 * **정답과 글자가 같은 개념도 뺀다.** 개념이 달라도 그 언어에서 같은 낱말인
 * 경우가 있다 — 프랑스어 `glace`는 얼음이자 아이스크림이고, 일본어 정답은
 * 읽기라 歯와 葉이 둘 다 `は`다. 슬러그만 보고 거르면 보기 두 칸에 같은
 * 글자가 나란히 서고, 그중 하나만 정답 처리된다.
 */
export function distractorPool(entry: Entry, entries: Entry[]): Entry[] {
  const other = (candidate: Entry) =>
    candidate.concept.slug !== entry.concept.slug && candidate.answer !== entry.answer

  const sameCategory = entries.filter(
    (candidate) => other(candidate) && candidate.concept.category === entry.concept.category,
  )
  if (sameCategory.length >= 3) return sameCategory

  // 같은 category가 모자라면 전체 풀로 넓힌다
  return entries.filter(other)
}

/**
 * 문맥 카드의 오답 풀. 같은 주제 파일에서 먼저 찾는다.
 *
 * category만 보면 `The ___ is clean.`에 `downstairs`가 섞인다 — 문법으로는
 * 들어가지만 문맥으로는 어울리지 않아 **문장을 읽지 않고도** 걸러진다.
 * 같은 주제(집·음식·교통)에서 뽑으면 넷이 다 그럴듯해져 문장을 읽어야 풀린다.
 *
 * 주제가 없거나(구버전 데이터) 셋을 못 채우면 넓은 풀로 돌아간다 — 문항이
 * 안 만들어지는 것보다 오답이 헐거운 편이 낫다.
 */
export function nearPool(entry: Entry, entries: Entry[]): Entry[] {
  const topic = entry.concept.topic
  if (!topic) return distractorPool(entry, entries)

  const near = entries.filter(
    (candidate) =>
      candidate.concept.slug !== entry.concept.slug &&
      candidate.answer !== entry.answer &&
      candidate.concept.topic === topic &&
      candidate.concept.category === entry.concept.category,
  )
  return near.length >= 3 ? near : distractorPool(entry, entries)
}

/**
 * 그 낱말의 예문 전부. `example`과 `examples`를 한 줄로 합쳐 본다.
 *
 * 순서가 곧 우선순위다 — 소개 카드는 첫 줄만 보여주고, 문맥 카드는 회차로
 * 돌려 가며 쓴다.
 */
export function examplesOf(word: Word): Example[] {
  if (word.examples?.length) return word.examples
  return word.example ? [word.example] : []
}

export function countByCategory(entries: Entry[]): Record<Category, number> {
  const counts: Record<Category, number> = { noun: 0, verb: 0, adjective: 0, scene: 0 }
  for (const entry of entries) counts[entry.concept.category] += 1
  return counts
}

/** 이미지·오디오 경로는 slug에서 결정된다. 데이터에 경로 필드를 두지 않는 이유다. */
export function imagePath(slug: string): string {
  return `/concepts/${slug}.webp`
}

/**
 * 발음 파일의 앞자리. 비어 있으면 지금까지처럼 `public/audio/`를 그대로 쓴다.
 *
 * 발음은 개념당 7개(언어 수)라 개수가 콘텐츠의 7배로 늘어난다 — 14,448개
 * 170MB. 정적 호스팅은 대개 배포당 **파일 개수**에 한도가 있어서(이미지까지
 * 16,551개) 용량보다 개수가 먼저 걸린다. 그래서 발음만 밖으로 뺀다.
 *
 * 빌드 때 값이 박히므로 런타임 분기가 아니다. 로컬에서는 비워 두고 파일을
 * 그대로 보고, 배포에서만 채운다 — 둘 다 같은 코드가 돈다.
 */
const AUDIO_BASE = (process.env.NEXT_PUBLIC_AUDIO_BASE ?? '').replace(/\/$/, '')

export function audioPath(slug: string, lang: Language): string {
  return `${AUDIO_BASE}/audio/${lang}/${slug}.mp3`
}

/**
 * 예문 소리의 이름표. 문장 자체의 지문이다. (spec.md §5, AUDIO.md)
 *
 * 낱말 발음은 `{slug}.mp3`로 충분하다 — 표제어는 거의 안 바뀐다. 예문은 다르다.
 * 한 세션에 870개를 갈아 끼운 적이 있는데, 이름을 `{slug}-{i}`로 지었다면 파일은
 * 그대로 남아 **문장과 다른 소리**가 났을 것이다. 파일이 있으니 버튼은 켜지고
 * 학습자는 틀린 소리를 듣는다 — 눈에 안 띄는 실패다.
 *
 * 그래서 문장의 해시를 이름에 넣는다. 예문을 고치면 이름이 바뀌어 파일이
 * 사라지고, 버튼은 조용히 안 뜬다. 낡은 파일은 `pnpm check`가 고아로 잡는다.
 *
 * `slug-i`를 앞에 남기는 이유는 사람이 찾을 수 있어야 해서다. 해시만 쓰면
 * 손으로 넣을 때(`audio.ts place`) 무엇이 무엇인지 알 수 없다.
 */
export function exampleAudioKey(slug: string, index: number, text: string): string {
  return `${slug}-${index}-${textHash(text)}`
}

export function exampleAudioPath(
  lang: Language,
  slug: string,
  index: number,
  text: string,
): string {
  return `${AUDIO_BASE}/audio/${lang}/ex/${exampleAudioKey(slug, index, text)}.mp3`
}

/**
 * 문장 → 16진 열두 자리. FNV-1a 64비트에서 아래 48비트를 쓴다.
 *
 * 브라우저와 스크립트가 **같은 값**을 내야 해서 의존성 없이 손으로 짠다.
 * WebCrypto의 sha256은 비동기라 렌더 중에 쓸 수 없다.
 *
 * 48비트면 예문 4만 2천 개에서 충돌 확률이 백만분의 3이다. 충돌해도 잃는 것은
 * 소리 하나이지 데이터가 아니다.
 */
function textHash(text: string): string {
  let hash = 0xcbf29ce484222325n
  for (const char of text) {
    hash ^= BigInt(char.codePointAt(0) ?? 0)
    hash = (hash * 0x100000001b3n) & 0xffffffffffffffffn
  }
  return (hash & 0xffffffffffffn).toString(16).padStart(12, '0')
}

/**
 * 저장소 안의 실제 파일 자리. 화면이 보는 주소(`audioPath`)와 달리 CDN을
 * 타지 않는다 — 파일이 있나 없나를 fs로 보는 쪽은 이것을 쓴다.
 */
export function audioFile(slug: string, lang: Language): string {
  return `public/audio/${lang}/${slug}.mp3`
}
