/**
 * 콘텐츠 타입. spec.md §4가 단일 진실 소스다.
 *
 * DB가 없으므로 이 타입이 곧 스키마다. 나중에 DB를 붙이면 그대로 테이블이 된다.
 */

/** 언어를 추가하면 여기와 lib/lang.ts, lib/track.ts를 같이 고친다. */
export type Language = 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'de' | 'ru'

/** 오답 보기를 뽑는 근거다. 생략할 수 없다. (spec.md §4) */
export type Category = 'noun' | 'verb' | 'adjective' | 'scene'

/** 언어별 문법 속성. 필드를 언어마다 늘리지 않고 여기로 몰아넣는다. */
/**
 * 언어별 문법 속성. 필드를 언어마다 늘리지 않고 여기로 몰아넣는다.
 *
 * 레벨 필드(`jlpt` · `hsk` · `cefr` · `tsl`)는 카드 좌하단에 그대로 표시된다 (spec.md §5).
 * 시험마다 등급 체계가 다르므로 하나로 합치지 않는다 — JLPT는 N5~N1,
 * HSK는 1~6, 유럽 시험은 CEFR A1~C2다.
 *
 * `tsl`만 등급이 아니라 **순위**다. TOEIC은 공식 어휘 등급이 없어 대신
 * TOEIC Service List의 빈도 순위(1~1250)를 쓴다. 작을수록 자주 나온다.
 */
export type Attributes =
  | { jlpt?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'; pitchAccent?: number } // ja
  // hsk 7은 HSK 3.0의 7~9급 묶음이다. 8·9는 따로 없다 (lib/level.ts가 편다)
  | { hsk?: 1 | 2 | 3 | 4 | 5 | 6 | 7; tones?: number[] } // zh
  | { cefr?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; article?: string; gender?: 'm' | 'f' | 'n' } // es · fr · de
  | { tsl?: number } // en
  // ru: TORFL(ТРКИ)은 공식 어휘 목록을 기계가 읽을 수 있게 내놓지 않는다.
  // 등급을 지어내지 않으므로 지금은 비어 있다 (spec.md §7)
  | { torfl?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' } // ru

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
  /**
   * 로마자 예문은 ja·zh만 갖는다. `pnpm romanize`가 규칙으로 채운다 —
   * 손으로 쓰지 않는다 (scripts/romanize.ts).
   */
  /**
   * 예문. 한 줄이면 `example`, 여럿이면 `examples`다.
   *
   * 배열로 갈아엎지 않고 **얹는다.** 이미 18,000줄이 `example`에 들어 있고
   * 로마자·검증·카드가 모두 그 필드를 본다 — 통째로 옮기는 마이그레이션이
   * 곧 위험이다. 읽는 쪽은 `examplesOf()` 하나로 둘을 합쳐 본다.
   */
  example?: Example
  examples?: Example[]
  attributes?: Attributes
}

export type Example = { text: string; ko: string; romanization?: string }

export type Concept = {
  /** 파일명이자 식별자. ^[a-z0-9-]+$ */
  slug: string
  /** 학습 언어와 무관한 한국어 뜻 */
  meaning_ko: string
  category: Category
  /** 재생성용. IMAGE_STYLE.md의 STYLE_PROMPT는 포함하지 않는다 */
  image_prompt: string
  words: Partial<Record<Language, Word>>
  /**
   * 어느 주제 파일에서 왔는가. **JSON에는 없다** — 로더가 파일 이름을 붙인다
   * (lib/content.ts). 파일은 학습자에게 보이는 구분이 아니라 이미지 작업을
   * 몰아서 하는 단위지만(§4), 문맥 카드의 오답을 고를 때는 쓸모가 있다 —
   * 같은 주제에서 뽑아야 문맥을 읽어야 풀린다.
   */
  topic?: string
}

/** content/*.json 한 파일의 모양 */
export type ContentFile = {
  concepts: Concept[]
}
