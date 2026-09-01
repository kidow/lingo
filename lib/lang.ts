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
  /**
   * 낱말을 띄어쓰기로 가르는 언어인가.
   *
   * 문맥 빈칸이 예문에서 정답을 찾을 때 쓴다. 띄어쓰는 언어는 굴절된 긴 낱말
   * **안**을 파면 안 된다 — `hands`에서 `hand`만 뚫으면 `___s`가 남는다.
   * 일본어·중국어는 낱말 사이에 공백이 없어 그 규칙을 적용할 수 없다.
   */
  spaced: boolean
}

export const LANG: Record<Language, LangStrategy> = {
  // 영어는 적힌 대로 읽지 않는다 — `receipt`도 `colonel`도 그렇다. 참고줄에
  // 로마자가 아니라 **발음기호**를 둔다. CMU 사전에서 받아 온다 (scripts/ipa.ts)
  en: { answer: 'term', aside: ['romanization'], spaced: true },
  ja: { answer: 'reading', aside: ['romanization', 'term'], spaced: false },
  zh: { answer: 'term', aside: ['romanization'], spaced: false },
  es: { answer: 'term', aside: [], spaced: true },
  fr: { answer: 'term', aside: [], spaced: true },
  de: { answer: 'term', aside: [], spaced: true },
  // 러시아어는 키릴 문자라 표기를 그대로 읽을 수 없다. 로마자를 참고줄에 둔다 —
  // 규칙적인 문자라 scripts/romanize.ts가 표로 만든다 (§7)
  ru: { answer: 'term', aside: ['romanization'], spaced: true },
}

/**
 * 중국어만 일본어와 갈린다. 일본어는 읽기(かな)를 정답으로 쓰는데, 중국어는
 * **표기(汉字)를 정답으로 쓰고 병음을 참고줄로 내린다.** HSK는 한자를 읽는
 * 것 자체가 학습 목표이고, 병음은 발음 보조일 뿐 실제 표기가 아니기 때문이다.
 *
 * 유럽 언어 셋은 영어와 같다 — 표기가 곧 읽기다. 성·관사는 `attributes`에
 * 담아 두되 카드에는 아직 쓰지 않는다.
 */

/**
 * 영어만 유럽 언어 셋과 갈린다. 스페인어·프랑스어·독일어는 철자와 소리가
 * 규칙으로 이어져 표기를 보면 읽을 수 있지만, 영어는 그 규칙이 깨진 언어다.
 * 그래서 TOEIC 카드만 참고줄에 발음기호를 단다 — JLPT가 읽기를 다는 자리다.
 *
 * IPA가 초급자에게 장벽이라는 반론이 있었지만, 없는 편이 더 나쁘다. 소리를
 * 모른 채 외운 낱말은 들어도 못 알아듣는다. 사전에 없는 낱말은 비워 둔다.
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
