import { convertQwertyToHangul, disassemble, getChoseong } from 'es-hangul'
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
 *
 * **떼고 나서 NFC로 되돌린다.** NFD는 라틴만 푸는 것이 아니라 한글도 조합형
 * 자모로 풀어 놓는다(`커` → `커`). 그대로 두면 한글이 아닌 것처럼 보여서
 * 자모 대조가 통째로 꺼진다. 결합 문자를 이미 뗐으므로 되돌려도 악센트는
 * 다시 붙지 않는다.
 */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .trim()
}

/**
 * 한글 처리는 `es-hangul`에 맡긴다 (MIT, 의존성 없음).
 *
 * 초성만 뽑는 일은 열댓 줄로 짜지지만 나머지가 그렇지 않다 — 겹받침을 낱자로
 * 풀고(`ㄳ`→`ㄱㅅ`), 자판을 잘못 두고 친 글자를 되돌리는 일이 그렇다. 셋을
 * 직접 짜면 한글 라이브러리를 하나 쓰게 된다.
 *
 *   getChoseong           `커피` → `ㅋㅍ`
 *   disassemble           `커피` → `ㅋㅓㅍㅣ`
 *   convertQwertyToHangul `zjvl` → `커피`
 */
export const chosungOf = (text: string) => getChoseong(text)

/** 초성만으로 이루어진 검색어인가. 섞여 있으면 자모로 다룬다 */
const isChosungQuery = (query: string) => /^[ㄱ-ㅎ]+$/.test(query)

/** 한글이 한 글자라도 있는가. 자모 대조를 켤지 정한다 */
const hasHangul = (query: string) => /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(query)

/** 라틴 글자만으로 이루어졌는가. 자판을 잘못 두고 친 것인지 볼 자리다 */
const isLatinQuery = (query: string) => /^[a-z]+$/.test(query)

/* ── 기초도 ─────────────────────────────────────────────────────────
 *
 * 초성으로 찾으면 동점이 무더기로 나온다 — `ㅋㅍ` 하나에 쿠폰·카페·캠핑·킥판·
 * 커피가 전부 통째로 맞는다. 무엇을 먼저 세울지 정할 근거가 없으면 콘텐츠
 * 파일에 적힌 순서가 그대로 나오는데, 그건 사실상 임의다.
 *
 * 시험 등급이 그 근거가 된다. **여러 시험이 낮은 등급으로 올린 낱말일수록
 * 기초 어휘다.** 커피는 다섯 시험이 전부 최하단에 두고(N5·HSK3·準備2·A1·A1),
 * 킥판은 어느 시험에도 없다.
 */

/** 시험마다 눈금이 달라 0(가장 기초)~1로 맞춘다 */
const SCALES: Record<string, readonly string[]> = {
  jlpt: ['N5', 'N4', 'N3', 'N2', 'N1'],
  cefr: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  torfl: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  tocfl: ['準備1', '準備2', 'L1', 'L2', 'L3', 'L4', 'L5'],
}

function normalized(attributes: Word['attributes']): number[] {
  if (!attributes) return []
  const out: number[] = []
  for (const [key, value] of Object.entries(attributes)) {
    const scale = SCALES[key]
    if (scale) {
      const index = scale.indexOf(String(value))
      if (index >= 0) out.push(index / (scale.length - 1))
    } else if (key === 'hsk' && typeof value === 'number') {
      out.push((value - 1) / 6)
    } else if (key === 'tsl' && typeof value === 'number') {
      // 등급이 아니라 순위다. 1이 가장 흔하다 (lib/types.ts)
      out.push((value - 1) / 1249)
    }
  }
  return out
}

/**
 * 등급이 앉을 수 있는 자리 수. jlpt · hsk · tocfl · cefr 셋(de·fr·es) ·
 * tsl · torfl로 여덟이다.
 */
const LEVEL_SLOTS = 8

/**
 * 0(가장 기초)~1. **빈자리는 1로 채워 나눈다.**
 *
 * 있는 것만 평균 내면 표본이 적은 쪽이 극단값으로 이긴다 — 쿠폰은 TSL 75위
 * 하나뿐인데 그 값이 0.06이라, 다섯 시험이 최하단에 올린 커피(0.10)를
 * 밀어냈다. 등급이 없다는 것도 정보다: 어느 시험도 안 다룬 낱말은 그만큼
 * 덜 기초적이다.
 *
 * 빈자리를 벌점으로 세면 넓이와 낮이가 한 숫자에 같이 담긴다 —
 * 커피(.36) → 카페(.74) → 캠핑(.77) → 카펫(.80) → 쿠폰(.87) → 킥판(1).
 */
function basicnessOf(concept: Concept): number {
  const values = Object.values(concept.words).flatMap((word) => normalized(word.attributes))
  const total = values.reduce((sum, value) => sum + value, 0) + (LEVEL_SLOTS - values.length)
  return total / LEVEL_SLOTS
}

export type Hit =
  | { kind: 'word'; key: string; concept: Concept; lang?: Language; text?: string }
  | { kind: 'trivia'; key: string; lang: Language; trivia: TriviaEntry['trivia'] }
  | { kind: 'article'; key: string; article: Article }

/** 대조 대상 한 조각. `lang`이 없으면 한국어 뜻처럼 언어에 안 매인 자리다 */
type Field = { folded: string; text: string; lang?: Language }

/**
 * `chosung`·`jamo`는 그 항목의 **한국어 제목**에서만 뽑는다 — 낱말은 뜻,
 * 상식은 물음, 참고 글은 제목이다. 해설까지 자모로 풀면 `ㅋㅍ`가 본문 어딘가에
 * 우연히 들어맞는 문장을 잔뜩 물어 온다.
 */
type Doc = {
  hit: Hit
  fields: Field[]
  chosung: string
  jamo: string
  basic: number
}

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
      jamo: disassemble(concept.meaning_ko),
      basic: basicnessOf(concept),
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
      jamo: disassemble(entry.trivia.question),
      // 상식·참고 글에는 등급이 없다. 어차피 낱말 뒤에 서므로(KIND_ORDER)
      // 이 값이 순서를 바꾸지 않는다
      basic: 1,
    })
  }

  for (const article of articles) {
    const fields = [article.title, article.summary].map((text) => ({ folded: fold(text), text }))
    docs.push({
      hit: { kind: 'article', key: article.id, article },
      fields,
      chosung: chosungOf(article.title),
      jamo: disassemble(article.title),
      basic: 1,
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
  const hits = run(index, fold(raw), limit)
  if (hits.length > 0) return hits

  /*
   * 아무것도 못 찾았고 라틴 글자만 쳤다면 **자판을 잘못 두고 친 것**일 수 있다.
   * `zjvl`은 영어가 아니라 `커피`다. 처음부터 같이 찾지 않는 이유는 멀쩡한
   * 영어 검색어도 한글로 뒤집히기 때문이다 — `cafe`는 `ㅊㅁ뮤`가 된다.
   */
  const latin = fold(raw)
  if (!isLatinQuery(latin)) return hits
  const hangul = convertQwertyToHangul(latin)
  return hangul && hangul !== latin ? run(index, hangul, limit) : hits
}

function run(index: SearchIndex, query: string, limit: number): Hit[] {
  if (!query) return []

  const chosung = isChosungQuery(query)
  // 한글이 섞였으면 자모로 푼다 — `커ㅍ`는 글자로는 어디에도 없지만
  // 자모로 풀면 `ㅋㅓㅍ`이라 `커피`(ㅋㅓㅍㅣ) 안에 그대로 들어 있다
  const jamo = !chosung && hasHangul(query) ? disassemble(query) : null
  const found: Array<{ hit: Hit; score: number; basic: number; order: number }> = []

  for (const [order, doc] of index.entries()) {
    if (chosung) {
      // 초성도 가운데서 걸리게 둔다 — `ㅋㅍ`는 `아이스커피`에서도 나와야 한다.
      // 다만 통째로 같은 `커피`가 그보다 먼저 선다
      const score = scoreOf(doc.chosung, query)
      if (score >= 0) found.push({ hit: doc.hit, score, basic: doc.basic, order })
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

    // 글자로 못 찾았으면 자모로 한 번 더 본다. 치다 만 글자(`커ㅍ`)가 여기서
    // 걸린다 — 다 친 글자는 위에서 이미 걸렸으므로 가운데 걸린 것으로 친다
    if (best < 0 && jamo) {
      const score = scoreOf(doc.jamo, jamo)
      if (score >= 0) {
        found.push({ hit: doc.hit, score: Math.max(score, 1), basic: doc.basic, order })
        continue
      }
    }
    if (best < 0 || !matched) continue

    // 어느 표기로 걸렸는지를 결과 줄에 적는다. 한국어 뜻으로 걸렸으면 제목이
    // 곧 그 표기라 따로 적지 않는다
    const hit: Hit =
      doc.hit.kind === 'word' && matched.lang
        ? { ...doc.hit, lang: matched.lang, text: matched.text }
        : doc.hit
    found.push({ hit, score: best, basic: doc.basic, order })
  }

  found.sort(
    (a, b) =>
      a.score - b.score ||
      KIND_ORDER[a.hit.kind] - KIND_ORDER[b.hit.kind] ||
      // 여기까지 같으면 기초 어휘가 먼저다. 없으면 파일에 적힌 순서가 그대로
      // 나오는데 그건 근거가 아니다
      a.basic - b.basic ||
      a.order - b.order,
  )
  return found.slice(0, limit).map((f) => f.hit)
}
