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
  /** 소개 카드 참고줄에 작게 붙이는 필드 */
  aside: ('term' | 'romanization')[]
}

export const LANG: Record<Language, LangStrategy> = {
  ja: { answer: 'reading', aside: ['term', 'romanization'] },
  // de: { answer: 'term', aside: [] },
  // zh: { answer: 'reading', aside: ['term'] },
}

export const DEFAULT_LANGUAGE: Language = 'ja'

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
