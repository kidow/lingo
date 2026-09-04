import type { TriviaEntry } from './trivia.ts'
import type { Article, Concept, Language, Word } from './types.ts'

/**
 * 전역 검색. (spec.md §3, §5)
 *
 * 트랙을 가리지 않는다. 지금 JLPT를 보고 있어도 `커피`를 치면 일곱 언어가
 * 한 줄에 서고, 상식과 참고 글까지 같이 걸린다 — 찾는 사람은 그것이 어느
 * 덱에 있는지를 모르기 때문이다.
 *
 * **서버가 없어도 된다.** 콘텐츠는 이미 번들에 통째로 구워져 있어서
 * (lib/content.ts) 검색은 그 배열을 훑는 일이다. 26,292개를 매 타이핑마다
 * 훑어도 밀리초 단위라 색인 라이브러리를 들이지 않는다.
 *
 * lib/entries.ts와 같은 이유로 JSON을 import하지 않는다 — 그래야 번들러
 * 없이도(node --test) 돌릴 수 있다.
 */

/**
 * 검색어와 대조하기 위해 접은 문자열.
 *
 * 결합 문자를 떼는 한 규칙이 세 가지를 한꺼번에 처리한다 — 프랑스어 악센트
 * (`café`), 독일어 움라우트(`für`), 병음 성조(`kāfēi`). 치는 사람은 부호를
 * 못 넣거나 안 넣는데 표기에는 붙어 있어서, 접지 않으면 영영 안 걸린다.
 *
 * `ß`만 예외다. NFD로 풀리지 않는 한 글자라 따로 `ss`로 편다.
 */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .trim()
}

const CHOSUNG = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'

/**
 * 한글을 첫소리만 남긴 꼴로 바꾼다. `커피` → `ㅋㅍ`
 *
 * 한국어 사용자는 아는 낱말을 찾을 때 초성부터 친다. 그 습관을 받지 않으면
 * `ㅋㅍ`가 아무것도 못 찾는 검색창이 된다.
 */
export function chosungOf(text: string): string {
  let out = ''
  for (const char of text) {
    const index = char.charCodeAt(0) - 0xac00
    out += index >= 0 && index <= 11171 ? CHOSUNG[Math.floor(index / 588)] : char
  }
  return out
}

/** 초성만으로 이루어진 검색어인가. 섞여 있으면 보통 검색으로 다룬다 */
const isChosungQuery = (query: string) => /^[ㄱ-ㅎ]+$/.test(query)

export type Hit =
  | { kind: 'word'; key: string; concept: Concept; lang?: Language; text?: string }
  | { kind: 'trivia'; key: string; lang: Language; trivia: TriviaEntry['trivia'] }
  | { kind: 'article'; key: string; article: Article }

/** 대조 대상 한 조각. `lang`이 없으면 한국어 뜻처럼 언어에 안 매인 자리다 */
type Field = { folded: string; text: string; lang?: Language }

type Doc = { hit: Hit; fields: Field[]; chosung: string }

export type SearchIndex = Doc[]

/** 한 낱말에서 검색에 걸릴 표기 전부. 없는 필드는 조용히 빠진다 */
function wordFields(lang: Language, word: Word): Field[] {
  const values = [word.term, word.reading, word.romanization, ...(word.also ?? [])]
  return values
    .filter((value): value is string => Boolean(value))
    .map((text) => ({ folded: fold(text), text, lang }))
}

/**
 * 훑을 것을 미리 접어 둔다.
 *
 * 접는 일이 26,292번이라 타이핑마다 하면 손이 느껴진다. 시트를 처음 열 때
 * 한 번만 만들고 그다음부터는 접힌 문자열끼리 비교한다.
 */
export function buildIndex(
  concepts: Concept[],
  trivia: TriviaEntry[],
  articles: Article[],
): SearchIndex {
  const docs: SearchIndex = []

  for (const concept of concepts) {
    const fields: Field[] = [{ folded: fold(concept.meaning_ko), text: concept.meaning_ko }]
    for (const [lang, word] of Object.entries(concept.words)) {
      fields.push(...wordFields(lang as Language, word))
    }
    docs.push({
      hit: { kind: 'word', key: concept.slug, concept },
      fields,
      chosung: chosungOf(concept.meaning_ko),
    })
  }

  for (const entry of trivia) {
    // 물음과 해설이 전부 한국어라 한글 검색에 잘 걸린다. 보기는 넣지 않는다 —
    // 오답까지 걸리면 찾는 사람이 틀린 문장을 정답으로 읽는다
    const fields = [entry.trivia.question, entry.trivia.answer, entry.trivia.note].map((text) => ({
      folded: fold(text),
      text,
    }))
    docs.push({
      hit: { kind: 'trivia', key: entry.key, lang: entry.lang, trivia: entry.trivia },
      fields,
      chosung: chosungOf(entry.trivia.question),
    })
  }

  for (const article of articles) {
    const fields = [article.title, article.summary].map((text) => ({ folded: fold(text), text }))
    docs.push({
      hit: { kind: 'article', key: article.id, article },
      fields,
      chosung: chosungOf(article.title),
    })
  }

  return docs
}

/**
 * 통째로 같은 것 → 앞에서 걸린 것 → 가운데서 걸린 것 순.
 *
 * 세 단계여야 한다. 앞뒤만 가르면 `cafe`를 쳤을 때 `cafeteria`가 `cafe`보다
 * 먼저 서고(둘 다 앞에서 걸린다), 초성 `ㅋㅍ`에 `쿠폰`이 `커피`를 밀어낸다.
 * 정확히 친 것이 맨 위에 없으면 검색을 믿을 수 없다.
 */
const scoreOf = (folded: string, query: string) =>
  folded === query ? 0 : folded.startsWith(query) ? 1 : folded.includes(query) ? 2 : -1

const KIND_ORDER = { word: 0, trivia: 1, article: 2 } as const

/**
 * 접힌 색인에서 찾는다. 같은 점수면 낱말이 먼저다.
 *
 * `limit`을 두는 이유는 성능이 아니라 화면이다 — `a`를 치면 수천 개가 걸리는데
 * 그걸 다 그리면 스크롤이 끝나지 않고, 그 목록에서 고를 수 있는 사람도 없다.
 */
export function search(index: SearchIndex, raw: string, limit = 40): Hit[] {
  const query = fold(raw)
  if (!query) return []

  const chosung = isChosungQuery(query)
  const found: Array<{ hit: Hit; score: number; order: number }> = []

  for (const [order, doc] of index.entries()) {
    if (chosung) {
      // 초성도 가운데서 걸리게 둔다 — `ㅋㅍ`는 `아이스커피`에서도 나와야 한다.
      // 다만 통째로 같은 `커피`가 그보다 먼저 선다
      const score = scoreOf(doc.chosung, query)
      if (score >= 0) found.push({ hit: doc.hit, score, order })
      continue
    }

    let best = -1
    let matched: Field | null = null
    for (const field of doc.fields) {
      const score = scoreOf(field.folded, query)
      if (score < 0) continue
      if (best < 0 || score < best) {
        best = score
        matched = field
      }
      if (best === 0) break
    }
    if (best < 0 || !matched) continue

    // 어느 표기로 걸렸는지를 결과 줄에 적는다. 한국어 뜻으로 걸렸으면 제목이
    // 곧 그 표기라 따로 적지 않는다
    const hit: Hit =
      doc.hit.kind === 'word' && matched.lang
        ? { ...doc.hit, lang: matched.lang, text: matched.text }
        : doc.hit
    found.push({ hit, score: best, order })
  }

  found.sort(
    (a, b) =>
      a.score - b.score ||
      KIND_ORDER[a.hit.kind] - KIND_ORDER[b.hit.kind] ||
      a.order - b.order,
  )
  return found.slice(0, limit).map((f) => f.hit)
}
