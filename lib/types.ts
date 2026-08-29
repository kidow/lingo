/**
 * 콘텐츠 타입. spec.md §4가 단일 진실 소스다.
 *
 * DB가 없으므로 이 타입이 곧 스키마다. 나중에 DB를 붙이면 그대로 테이블이 된다.
 */

/** v1은 일본어 하나. 언어를 추가하면 여기와 lib/lang.ts를 같이 고친다. */
export type Language = 'ja'

/** 오답 보기를 뽑는 근거다. 생략할 수 없다. (spec.md §4) */
export type Category = 'noun' | 'verb' | 'adjective' | 'scene'

/** 언어별 문법 속성. 필드를 언어마다 늘리지 않고 여기로 몰아넣는다. */
export type Attributes =
  | { jlpt?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'; pitchAccent?: number } // ja
  | { article?: 'der' | 'die' | 'das'; plural?: string } // de
  | { tones?: number[] } // zh

export type Word = {
  /** 표기.  ja: 猫 / de: Katze */
  term: string
  /** 읽기.  ja: ねこ */
  reading?: string
  /** 로마자. ja: neko — 참고 표시 전용. 보기나 정답으로 절대 쓰지 않는다 */
  romanization?: string
  part_of_speech?: string
  /**
   * 짧은 예문. 소개 카드 하단에만 나온다. (spec.md §5)
   *
   * 학습 대상이 읽기이므로 かな로 쓰고 띄어쓰기로 끊는다. 한자를 쓰지 않는
   * 이유는 소개 카드가 한자를 참고로만 다루기 때문이다 (§1).
   * 정답 단어가 문장에 그대로 들어 있어 퀴즈 카드에는 쓸 수 없다.
   */
  example?: { text: string; ko: string }
  attributes?: Attributes
}

export type Concept = {
  /** 파일명이자 식별자. ^[a-z0-9-]+$ */
  slug: string
  /** 학습 언어와 무관한 한국어 뜻 */
  meaning_ko: string
  category: Category
  /** 재생성용. IMAGE_STYLE.md의 STYLE_PROMPT는 포함하지 않는다 */
  image_prompt: string
  words: Partial<Record<Language, Word>>
}

/** content/*.json 한 파일의 모양 */
export type ContentFile = {
  concepts: Concept[]
}
