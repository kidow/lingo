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
  // tocfl은 별개 시험이다 — 八千詞表는 준비급을 둘로 나눠 싣어서 하나로 접지 않는다 (scripts/tocfl.ts)
  | {
      hsk?: 1 | 2 | 3 | 4 | 5 | 6 | 7
      tocfl?: '準備1' | '準備2' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
      tones?: number[]
    } // zh
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
  /**
   * 번체 표기. zh만 갖는다 — `term`은 간체로 고정하고(§4) 이 자리에 대만 번체를
   * 따로 둔다. 발음은 같아서(자소만 다르다) 별도 음성이 없다 — 어휘 자체가
   * 兩岸에서 갈리는 자리만 예외다 (scripts/tocfl.ts).
   */
  traditional?: string
  /**
   * 같은 뜻의 다른 표기. 소개 카드에만 조용히 붙는다. (spec.md §5)
   *
   * 뜻이 하나인데 말이 여럿인 자리가 있다 — 호텔은 `отель`이자 `гостиница`고,
   * 신발은 `туфли`이자 `обувь`다. 그림이 같으므로 개념을 나눌 수 없고, 하나만
   * 적으면 나머지를 못 배운다.
   *
   * **정답으로도 오답으로도 쓰지 않는다.** 정답이 둘이 되면 4지선다에 답이 두
   * 개 깔리고, 빈칸은 어느 철자를 받아야 할지 정할 수 없다. 학습 대상은 `term`
   * 하나로 두고 이건 곁에 적어만 둔다 — 로마자와 같은 취급이다.
   *
   * 뜻이 **다른** 낱말은 여기 넣지 않는다. `bank`의 은행과 둑처럼 그림이 갈리면
   * 개념을 따로 만든다 (§4).
   */
  also?: string[]
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

/* ── 상식 ─────────────────────────────────────────────────────────── */

/**
 * 상식 문항 하나. (spec.md §4)
 *
 * 개념(`Concept`)과 **나란히 서는 별개의 단위**다. 개념은 일곱 트랙이 그림 한
 * 장을 같이 쓰지만, 상식은 그럴 수가 없다 — `は`가 わ로 읽히는 것은 일본어에만
 * 있는 사실이고 다른 언어로 번역되지 않는다. 그래서 언어가 파일을 가른다
 * (`content/trivia/{lang}.json`).
 *
 * 그림이 없다. 개념 카드는 그림이 곧 문제지만 여기서는 **질문 문장이 문제다** —
 * 없는 그림을 지어내면 문항과 무관한 삽화가 된다 (spec.md §5).
 *
 * 오답도 콘텐츠다. 낱말 카드는 같은 category에서 자동으로 뽑지만(`distractorPool`)
 * 상식은 문항마다 그럴듯한 오답이 다르다 — 기계가 정할 수 없어 손으로 적는다.
 */
export type Trivia = {
  /** 파일 안에서 유일한 식별자. ^[a-z0-9-]+$ */
  id: string
  /** 물음. 지시문이 아니라 문장 하나다 */
  question: string
  /** 정답 1 + 오답 3. 순서는 화면에서 섞인다 */
  choices: string[]
  /** `choices` 중 하나와 정확히 같아야 한다 */
  answer: string
  /** 답한 뒤 뜨는 한 줄. 왜 그런지를 적는다 */
  note: string
  /** 어느 노트에서 왔는가. 고칠 때 원문을 찾기 위한 자리다 */
  source?: string
}

/** content/trivia/{lang}.json 한 파일의 모양 */
export type TriviaFile = {
  lang: Language
  items: Trivia[]
}

/* ── 가나 표 ─────────────────────────────────────────────────────── */

/**
 * 오십음도 한 칸. 빈 칸은 `null`이다 — や행의 yi·ye처럼 음운 체계에서
 * 빠진 자리가 있어서, 5열을 채우려면 구멍을 자리로 남겨야 한다.
 */
export type KanaCell = {
  /** 글자. 요음·외래어 조합은 두 글자다 (きゃ · ファ) */
  kana: string
  /**
   * 글자 아래 작게 붙는 읽기. 가나는 헵번식 로마자를 두지만, 병음처럼
   * **글자 자체가 로마자인 문자에는 없다** — 그 자리에는 성모가 없을 때의
   * 표기(i → yi)나 음높이 설명이 대신 온다.
   */
  roman?: string
  /**
   * 곁들이는 글자. 가타카나 표에서 대응하는 히라가나를 여기 둔다 —
   * 두 문자를 나란히 보는 것이 가타카나를 익히는 가장 빠른 길이라
   * 표를 둘로 나누지 않고 한 칸에 겹쳐 싣는다.
   */
  pair?: string
  /** 그 칸에만 붙는 주석. ぢ·づ처럼 발음이 겹치는 자리에 쓴다 */
  note?: string
}

/** 표의 한 줄. `cells`는 열 수만큼이고 빈 칸은 null이다 */
export type KanaRow = {
  /** 줄 이름. あ행 · か행 k처럼 자음까지 적는다 */
  label: string
  cells: (KanaCell | null)[]
}

/** 표 하나. 청음·탁음·반탁음처럼 성격이 다른 묶음마다 하나씩 */
export type KanaTable = {
  title: string
  /** 표 아래 한 줄. 없으면 안 그린다 */
  caption?: string
  /** 열 이름. 오십음도는 a·i·u·e·o, 요음은 ゃ·ゅ·ょ다 */
  columns: string[]
  rows: KanaRow[]
}

/** 표로 그리기 어려운 규칙. 촉음·장음처럼 예시가 곧 설명인 것들 */
export type KanaRule = {
  title: string
  /** 규칙 한 줄 */
  body: string
  /** 예시. `text`가 글자, `gloss`가 읽기와 뜻이다 */
  examples: { text: string; gloss: string }[]
}

/**
 * 참고 글 하나. (spec.md §5)
 *
 * 히라가나 치트시트와 가타카나 치트시트가 각각 한 편이다. **가나 표만 들어올
 * 자리가 아니라서** 글로 두고 목록을 세운다 — 조사표든 활용표든 나중에 오는
 * 것도 같은 모양이면 목록에 한 줄이 늘 뿐이다.
 *
 * 지금은 본문이 표와 규칙뿐이라 필드가 둘이지만, 다른 글이 다른 모양을
 * 요구하면 그때 `body`를 유니온으로 넓힌다.
 */
export type Article = {
  /** 파일 안에서 유일한 식별자. ^[a-z0-9-]+$ */
  id: string
  /** 목록과 본문 머리에 서는 이름 */
  title: string
  /** 목록에서 제목 아래 한 줄. 무엇이 들어 있는지 말한다 */
  summary: string
  /** 어느 언어의 글인가. 그 언어 트랙에서만 목록에 선다 */
  lang: Language
  tables: KanaTable[]
  rules: KanaRule[]
}

/** content/articles.json 한 파일의 모양 */
export type ArticleFile = {
  articles: Article[]
}
