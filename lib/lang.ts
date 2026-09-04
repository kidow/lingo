import type { TrackId } from './track.ts'
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
  answer: 'reading' | 'term' | 'traditional'
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

/**
 * 화면에 적는 언어 이름.
 *
 * 트랙 이름(JLPT·HSK)과 다른 자리다. 트랙은 **시험**이고 이건 **언어**라,
 * 트랙을 가리지 않고 훑는 자리에서만 쓴다 — 전역 검색이 그렇다
 * (components/search-sheet.tsx). 중국어는 트랙이 둘이지만 언어는 하나다.
 */
export const LANG_LABEL: Record<Language, string> = {
  en: '영어',
  ja: '일본어',
  zh: '중국어',
  es: '스페인어',
  fr: '프랑스어',
  de: '독일어',
  ru: '러시아어',
}

/**
 * 트랙이 언어의 기본 전략을 덮어쓰는 자리. HSK와 TOCFL이 `zh`를 나눠 쓰면서
 * 생겼다 — 언어는 하나인데 트랙마다 카드에 낼 표기가 다르다.
 *
 * TOCFL은 대만 시험이니 번체가 정답이다. 학습자는 한국 사용자이지 대만
 * 원어민이 아니라서 **병음은 그대로 둔다** — 빼면 발음 보조가 사라져
 * 소리 없이는 한자만 보고 읽어야 한다. 간체(`term`)는 곁다리로 얹는다.
 */
const TRACK_OVERRIDE: Partial<Record<TrackId, Partial<LangStrategy>>> = {
  tocfl: { answer: 'traditional', aside: ['romanization', 'term'] },
}

function strategyFor(lang: Language, track?: TrackId): LangStrategy {
  const override = track && TRACK_OVERRIDE[track]
  return override ? { ...LANG[lang], ...override } : LANG[lang]
}

/**
 * 그 언어(또는 트랙)에서 정답으로 쓰는 문자열. 없으면 출제할 수 없다.
 *
 * `track`을 생략하면 언어의 기본값이다 — 발음 생성처럼 트랙을 모르는
 * 자리(scripts/audio.ts)는 항상 이 기본값을 쓴다. 간체든 번체든 읽는
 * 소리가 같아서, 트랙별로 다시 녹음할 이유가 없다(scripts/tocfl.ts).
 */
export function answerOf(word: Word, lang: Language, track?: TrackId): string | undefined {
  return word[strategyFor(lang, track).answer]
}

/**
 * 소개 카드 참고줄. 정답과 같은 값은 중복이므로 뺀다 (`バナナ` 같은 경우).
 *
 * `sound`는 그 항목이 **발음 보조**인지다. 카드가 대괄호를 씌울지 정한다 —
 * 예전에는 첫 항목이면 무조건 씌웠는데, 로마자가 비면 표기가 첫 항목이 되어
 * `[計量カップ]`처럼 한자를 발음인 양 보여줬다.
 */
export function asideOf(
  word: Word,
  lang: Language,
  track?: TrackId,
): Array<{ value: string; sound: boolean }> {
  const strategy = strategyFor(lang, track)
  const answer = answerOf(word, lang, track)
  return strategy.aside
    .map((field) => ({ value: word[field], sound: field === 'romanization' }))
    .filter((item): item is { value: string; sound: boolean } =>
      Boolean(item.value) && item.value !== answer,
    )
}
