import type { Language, Word } from './types.ts'

/**
 * 언어별 학습 전략. (spec.md §1, §4)
 *
 * 일본어 단어에는 표시할 텍스트가 둘이다 — 표기 `猫`와 읽기 `ねこ`.
 * 둘 중 하나만 정답으로 쓴다. v1 일본어는 읽기다. 한자를 모르는 초급자에게
 * 표기를 보여주고 읽기를 묻는 건 순환 논리이기 때문이다.
 *
 * 언어마다 이 선택이 달라지므로 하드코딩하지 않고 여기 모아둔다.
 */
export type LangStrategy = {
  /** 보기·정답·빈칸에 쓰는 필드 */
  answer: 'reading' | 'term'
  /**
   * 소개 카드 참고줄에 작게 붙이는 필드.
   *
   * **첫 항목은 발음 보조로 취급한다** — 큰 글자가 이미 읽기라서 그 자리에
   * 오는 것은 로마자다. 소개 카드가 첫 항목만 대괄호로 감싼다. (spec.md §5)
   */
  aside: ('term' | 'romanization')[]
}

export const LANG: Record<Language, LangStrategy> = {
  en: { answer: 'term', aside: [] },
  ja: { answer: 'reading', aside: ['romanization', 'term'] },
  // de: { answer: 'term', aside: [] },
  // zh: { answer: 'reading', aside: ['term'] },
}

/**
 * 영어는 참고줄이 없다. 표기가 곧 읽기라서 일본어처럼 두 형태로 갈라지지
 * 않는다. 발음기호를 넣을 수도 있지만 IPA는 초급자에게 오히려 장벽이다.
 */

export const LANGUAGES = Object.keys(LANG) as Language[]

/** 그 언어에서 정답으로 쓰는 문자열. 없으면 출제할 수 없다. */
export function answerOf(word: Word, lang: Language): string | undefined {
  return word[LANG[lang].answer]
}

/** 소개 카드 참고줄. 정답과 같은 값은 중복이므로 뺀다 (`バナナ` 같은 경우). */
export function asideOf(word: Word, lang: Language): string[] {
  const answer = answerOf(word, lang)
  return LANG[lang].aside
    .map((field) => word[field])
    .filter((value): value is string => Boolean(value) && value !== answer)
}
