# Lingo — 명세서

시각 중심 언어 학습 서비스. v1은 일본어 단어 학습.

이 문서는 **v1에서 무엇을 만들고 무엇을 만들지 않는지**를 확정한다.
이미지 스타일 규칙은 별도 문서 [IMAGE_STYLE.md](IMAGE_STYLE.md)에 있다.

---

## 1. 제품 정의

단어에 AI 생성 이미지를 1:1로 매칭하고, 이미지를 통해 의미를 기억시키는 학습 서비스.
이미지는 장식이 아니라 학습 요소이며, 이미지 스타일 자체를 디자인 시스템의 일부로 관리한다.

최종 지향은 단어장이 아니라 **단어를 허브로 문법·회화·예문이 연결되는 학습 시스템**이다.
다만 v1은 단어 학습 경험의 완성도만 다룬다.

### 대상 언어

- **v1 콘텐츠**: 일본어만
- **최종 목표**: 영어, 일본어, 중국어, 독일어, 러시아어, 프랑스어, 스페인어, 아랍어
- 따라서 **스키마와 라우팅은 처음부터 언어 중립**으로 설계한다. 콘텐츠만 일본어다.

### 사용자

- v1은 **로그인 없음**. 익명 사용.
- 학습 진도는 브라우저 `localStorage`에만 저장한다.
- 서버 쪽 쓰기 경로가 v1에는 존재하지 않는다. Supabase는 읽기 전용으로 쓴다.

---

## 2. 비범위 (v1에서 만들지 않는 것)

명시적으로 제외한다. 나중에 필요해지면 그때 추가한다.

| 항목 | 이유 |
|---|---|
| 인증 / 계정 / 서버 진도 동기화 | 익명 + localStorage로 시작 |
| `learning_records` 테이블 | 진도가 클라이언트에만 있으므로 v1에 불필요 |
| 관리자 웹 UI | 데이터 저작은 레포 내 seed 파일 + 스크립트로 한다 |
| 예문 · 문법 · 회화 | Word Detail은 이미지·표기·읽기·뜻까지만 |
| `word_senses` / 다의어 정규화 | `meaning_ko` 단일 텍스트로 시작 |
| `word_images` 1:N | 단어당 이미지 1장 |
| 학습 모드 4종(Word→Image, Word→Meaning, Meaning→Word, Image-only Recall) | v1은 2종만 |
| 스트릭 · 일일 목표 · 배지 | Leitner에서 계산되는 값만 보여준다 |
| 서비스워커 / 오프라인 학습 | PWA는 manifest + 아이콘까지만 |
| 다크모드 | warm paper 라이트 단일 |
| 앱 내 이미지 생성(OpenAI Images API) | 이미지는 수동 파이프라인 |
| TanStack Query | 서버 컴포넌트 + 정적 생성으로 충분 |

---

## 3. 정보 구조 · 라우팅

하단 탭 3개. 데스크톱에서는 좌측 사이드 내비게이션으로 전환한다.

```
/                      → /ja 로 리다이렉트
/ja                    Home
/ja/words              Words (그리드 ↔ 리스트 전환, 검색)
/ja/words/[slug]       Word Detail
/ja/learn              자유 연습 (덱·모드 선택)
/ja/session            학습 세션 (클라이언트)
```

- 언어는 **경로 접두사**(`app/[lang]/`). 언어 추가는 데이터 추가만으로 끝나고 공유 링크가 깨지지 않는다.
- `/ja/words`의 뷰 모드와 검색어는 URL 쿼리로 유지한다: `?view=list`, `?q=ねこ`
- 세션은 `/ja/session?deck=animals&mode=flashcard` 형태로 파라미터를 받는다. 파라미터가 없으면 기본 혼합 세션.
- 검색은 별도 탭이 아니라 Words 화면 내부에 둔다.

### 화면별 내용

**Home**
1. 인사말
2. 단일 CTA — `오늘 복습 12개 시작` / 부제 `새 단어 4개 포함 · 약 3분`
3. 덱 목록 (썸네일 · 제목 · `12 / 20` · 진행 바)

CTA 하나가 기본 동선이다. 덱과 모드를 묻지 않는다.

**Words**
- 기본은 **Visual Words Grid**: 모바일 2열, 정사각 이미지 + 표기 한 줄. 뜻·읽기는 넣지 않는다.
- 리스트 뷰 토글: 표기 · 읽기 · 뜻 한 줄씩, 작은 썸네일. 많은 단어를 빠르게 훑는 용도.
- 검색: 클라이언트 필터. `term` / `reading` / `romanization` / `meaning_ko` 를 모두 매칭한다.
- 이미지가 없는 단어는 그리드에서 placeholder 타일로 표시한다.

**Word Detail**

정보 계층 순서:
```
이미지 → 표기 → 읽기 → 뜻 → (발음 재생 버튼)
```
- 발음 버튼은 항상 노출한다. `audio_path`가 있으면 재생하고, 없으면 토스트로 안내한다
  (`아직 발음이 준비되지 않았어요`).

**Learn**
- 덱 선택 → 모드 선택 → 세션. 특정 덱만 파거나 모드를 골라 연습하는 자유 연습장.
- 기본 학습은 Home CTA가 담당하므로 Learn은 보조 동선이다.

**Session**
- 상단: 진행률 바 (`3 / 12`), 닫기 버튼
- 본문: 모드별 카드
- 종료 시: 맞힌 개수 / 다음 복습 안내 / 홈으로

---

## 4. 데이터 모델

Supabase PostgreSQL. RLS는 `select`만 `anon`에게 허용한다.

```sql
create table decks (
  id          uuid primary key default gen_random_uuid(),
  language    text not null,
  slug        text not null,
  title       text not null,
  description text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  unique (language, slug)
);

create table words (
  id             uuid primary key default gen_random_uuid(),
  language       text not null,
  slug           text not null,
  term           text not null,          -- 표기.        ja: 食べる / de: Hund / ar: كتاب
  reading        text,                   -- 해당 언어 독자용 읽기. ja: たべる / zh: chī
  romanization   text,                   -- 로마자.      ja: taberu / ru: kniga
  meaning_ko     text not null,          -- 한국어 뜻. 다의어는 쉼표로 나열
  part_of_speech text,
  attributes     jsonb not null default '{}'::jsonb,
  image_path     text,                   -- Storage 경로. null이면 이미지 없음
  audio_path     text,                   -- Storage 경로. null이면 발음 없음
  created_at     timestamptz not null default now(),
  unique (language, slug)
);

create table deck_words (
  deck_id    uuid not null references decks(id) on delete cascade,
  word_id    uuid not null references words(id) on delete cascade,
  sort_order int  not null default 0,
  primary key (deck_id, word_id)
);

create index on words (language);
create index on deck_words (word_id);
```

### 언어별 속성은 `attributes` JSONB로

컬럼을 언어마다 늘리지 않는다. TypeScript에서 언어별 타입만 좁혀 안전성을 확보한다.

```ts
type Attributes =
  | { jlpt?: 'N5'|'N4'|'N3'|'N2'|'N1'; pitchAccent?: number; conjugation?: 'godan'|'ichidan'|'irregular' } // ja
  | { article?: 'der'|'die'|'das'; plural?: string }                                                       // de
  | { tones?: number[] }                                                                                   // zh
```

### 왜 `deck_words` M:N인가

덱 축이 둘이기 때문이다 — v1은 주제별(음식/동물/동작)이지만, JLPT 레벨별 덱을 나중에 붙이면
한 단어가 `동물`과 `N5`에 동시에 속한다. 지금 조인 테이블 하나를 두는 편이 나중 마이그레이션보다 싸다.

### slug 규칙

- seed에 사람이 직접 쓴다. 로마자 소문자 + 하이픈.
- 동음이의어는 접미사로 구분한다: `hashi-chopsticks`, `hashi-bridge`
- `(language, slug)`가 유니크. seed 스크립트가 중복을 검사해 **작성 시점에** 실패시킨다.
- 이미지·오디오 파일명, URL이 모두 이 slug를 따른다.

### Storage 경로

```
words/{language}/{slug}.webp      이미지
audio/{language}/{slug}.mp3       발음
```
버킷은 public read. 재생성 시 같은 경로에 덮어쓴다.

---

## 5. 콘텐츠 파이프라인

단어·프롬프트·이미지의 단일 진실 소스는 **레포 내 seed 파일**이다.

```
content/ja/food.json
content/ja/animals.json
content/ja/actions.json
```

```jsonc
{
  "deck": { "slug": "food", "title": "음식과 사물", "description": "매일 쓰는 먹을거리와 물건" },
  "words": [
    {
      "slug": "ringo",
      "term": "りんご",
      "reading": "りんご",
      "romanization": "ringo",
      "meaning_ko": "사과",
      "part_of_speech": "명사",
      "attributes": { "jlpt": "N5" },
      "image_prompt": "a single red apple with one green leaf on the stem, seen from the side"
    }
  ]
}
```

`image_prompt`는 **내용만** 쓴다. 스타일 문구는 절대 여기 쓰지 않는다 — `IMAGE_STYLE.md`의 `STYLE_PROMPT`가
빌드 시점에 앞에 붙는다. 스타일이 바뀌면 한 파일만 고친다.

### 스크립트

| 명령 | 하는 일 |
|---|---|
| `pnpm seed` | `content/**/*.json` → 검증(slug 중복·필수 필드) → Supabase upsert |
| `pnpm prompts` | `image_path`가 없는 단어만 골라 `STYLE_PROMPT + image_prompt` 최종 문구를 출력 |
| `pnpm images` | `.images/{slug}.png` → 512×512 webp 변환 → Storage 업로드 → `image_path` 갱신 |
| `pnpm audio` | `.audio/{slug}.mp3` → Storage 업로드 → `audio_path` 갱신 |

### 사람이 하는 단계

1. seed 파일에 단어와 `image_prompt`를 쓴다
2. `pnpm seed`
3. `pnpm prompts` 출력을 ChatGPT / Codex ImageGen에 붙여넣어 이미지를 생성한다
4. 받은 PNG를 `.images/{slug}.png`로 저장한다
5. `pnpm images`

발음도 같은 흐름이다 (AI로 생성 → `.audio/{slug}.mp3` → `pnpm audio`).

`.images/`와 `.audio/`는 **gitignore**한다. 원본을 레포에 넣지 않아 clone이 가벼운 대신,
Storage가 사실상의 원본 저장소다. 이미지 재생성이 필요하면 `pnpm prompts`로 프롬프트를 다시 얻을 수 있다.

---

## 6. 학습 엔진

모든 상태는 클라이언트에 있다.

### 저장 형식

```ts
// localStorage key: `lingo.progress.ja`
type Progress = {
  version: 1
  cards: Record<string, {   // key = word.id
    box: 1 | 2 | 3 | 4 | 5
    dueAt: string           // 'YYYY-MM-DD'
    seenAt: string          // 'YYYY-MM-DD'
  }>
  newIntroduced: Record<string, number>  // 'YYYY-MM-DD' → 그날 처음 본 단어 수
}
```

### Leitner 5상자

| box | 다음 복습까지 |
|---|---|
| 1 | 1일 |
| 2 | 3일 |
| 3 | 7일 |
| 4 | 14일 |
| 5 | 30일 |

- 정답 → `box = min(box + 1, 5)`
- 오답 → `box = 1`
- 플래시카드에서 "알아요/몰라요"도 같은 규칙을 적용한다
- 새 단어는 첫 노출 후 `box = 1`

### 세션 구성

상수: `SESSION_SIZE = 12`, `NEW_PER_DAY = 5`

1. `dueAt <= 오늘`인 카드를 `dueAt` 오름차순으로 최대 12개 담는다
2. 12개가 안 차면 **아직 안 본 단어**로 채운다. 단 오늘 도입한 신규가 5개를 넘지 않게 제한한다
3. 그래도 12개가 안 되면 그 길이로 진행한다 (`오늘 복습 7개 시작`)
4. 세션 안에서 문항 순서는 섞는다

**신규 단어 처리**: 처음 보는 단어는 먼저 플래시카드로 소개하고, 같은 세션 뒤쪽에서 퀴즈로 한 번 더 낸다.
소개와 퀴즈는 합쳐서 1문항으로 센다.

### 모드

**Flashcard (reveal)**
- 앞면: 이미지 + 표기
- 탭 → 뒷면: 읽기 + 뜻 + 발음 버튼
- 하단: `몰라요` / `알아요`
- `image_path`가 없는 단어도 출제 가능하다 (표기만 크게 보여준다)

**Image → Word (4지선다)**
- 상단: 이미지
- 하단: 표기 4개
- **`image_path`가 있는 단어만 출제**한다. 없으면 플래시카드로만 노출된다
- 오답 3개는 **같은 덱**에서 `image_path`가 있는 단어 중 무작위. 같은 덱에 4개가 안 되면 같은 언어 전체 풀로 넓힌다
- 정답: 초록 테두리 → 400ms 후 자동으로 다음 문항
- 오답: 고른 것은 빨강, 정답은 초록으로 표시하고 탭해야 다음으로 넘어간다

### Home의 "오늘 복습 N개"

`Progress`에서 계산만 한다. 별도 상태를 저장하지 않는다.

- 오늘 복습 수 = `dueAt <= 오늘`인 카드 수 (최대 `SESSION_SIZE`로 표시)
- 덱 진행률 = 그 덱 단어 중 `cards`에 존재하는 것 / 전체

localStorage가 없거나 깨졌으면 빈 진도로 초기화한다. 마이그레이션은 `version` 필드로 처리한다.

---

## 7. 디자인

### 톤

**warm paper.** 생성 이미지의 배경(`#FAF6EF`)과 화면 배경을 가깝게 두어 이미지가 UI에 녹아들게 한다.
이미지가 화면의 주인공이므로 카드 경계보다 이미지가 앞선다.

### 토큰

```css
:root {
  --bg:        #F4F1EC;  /* 화면 배경 */
  --surface:   #FBF9F5;  /* 카드 */
  --img-bg:    #FAF6EF;  /* 이미지 캔버스 = 생성 이미지 배경과 동일 */
  --ink:       #1C1917;  /* 본문 */
  --sub:       #8A8177;  /* 보조 텍스트 */
  --line:      #E7E2DA;  /* 경계 */
  --accent:    #C2410C;  /* CTA · 활성 탭 · 진행 바 */
  --accent-fg: #FFF7ED;
  --ok:        #4B7A57;  /* 정답 */
  --err:       #B4472F;  /* 오답 */
}
```

- 라운드: 카드 `14px`, 버튼 `12px`, 이미지 타일 `14px`
- 그림자는 쓰지 않는다. 경계는 `--line` 1px로 표현한다
- 이미지 타일 배경은 반드시 `--img-bg`. 이미지 자체 배경과 이어져 사각형 경계가 사라진다

### 타이포

- 본문·UI: 시스템 스택 + Pretendard
- 일본어 표기: `system-ui` 폴백에 `"Hiragino Sans", "Noto Sans JP"` 추가
- 표기는 항상 가장 큰 글자. 읽기와 뜻은 `--sub`

---

## 8. 기술 스택

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js App Router | `app/[lang]/` |
| 언어 | TypeScript | |
| 스타일 | Tailwind CSS | 토큰은 CSS 변수로 정의하고 Tailwind에서 참조 |
| 컴포넌트 | shadcn/ui 최소 | `button` `card` `input` `tabs` `progress` `sonner` 만 |
| DB | Supabase PostgreSQL | anon `select`만 허용 |
| 스토리지 | Supabase Storage | public read 버킷 |
| 상태 | React 기본 | 진도는 `localStorage` 래퍼 훅 하나 |
| PWA | manifest + 아이콘 | 서비스워커 없음 |

### 렌더링

- 단어 데이터는 **서버 컴포넌트에서 `supabase-js`로 직접 조회**한다. 클라이언트 번들에 Supabase 클라이언트와 키가 들어가지 않는다
- `generateStaticParams`로 Word Detail을 미리 생성하고 `revalidate = 3600`
- 세션 화면만 클라이언트 컴포넌트다. 진입 시 대상 단어 전체를 서버에서 한 번 받아 메모리에서 굴린다 (60단어 = 수십 KB)
- 이미지는 `next/image` + Supabase Storage 도메인을 `remotePatterns`에 등록

---

## 9. 구현 순서

각 단계는 그 자체로 확인 가능해야 한다.

1. **셸** — Next.js·Tailwind·shadcn 최소 설치, 토큰 정의, `app/[lang]/` 레이아웃, 하단 탭 3개(데스크톱 사이드), 빈 화면 3개
2. **데이터** — Supabase 스키마 마이그레이션, `pnpm seed` 스크립트, 덱 3개 × 20단어 작성 (`image_prompt` 포함)
3. **이미지** — `IMAGE_STYLE.md` 확정, `pnpm prompts` / `pnpm images`, 이미지 60장 생성·업로드
4. **Words** — 그리드/리스트 전환, 검색, Word Detail, 발음 버튼(+없을 때 토스트)
5. **학습 엔진** — Leitner·세션 구성 로직과 그 단위 테스트, `localStorage` 훅
6. **세션 화면** — Flashcard, Image→Word, 결과 화면
7. **Home** — CTA, 덱 진행률
8. **Learn** — 덱·모드 선택 자유 연습
9. **마무리** — PWA manifest, 아이콘, 메타데이터, 배포

3단계까지 끝나면 콘텐츠가 확보되므로, 4단계부터는 실제 데이터로 개발한다.

---

## 10. 확장 경로

지금 만들지 않지만 구조가 막지 않아야 하는 것들.

| 시점 | 추가 | 영향 |
|---|---|---|
| 2번째 언어 | `content/en/*.json` + seed | 스키마 변경 없음. `/en/...` 경로가 그대로 생김 |
| 로그인 | Supabase Auth + `learning_records` | 기존 `localStorage` 진도를 최초 로그인 시 서버로 올리는 1회 마이그레이션 |
| 학습 모드 추가 | 세션 엔진의 (문제면, 정답면) 파라미터화 | 화면 컴포넌트만 추가 |
| 예문 | `sentences` 테이블 + `word_id` FK | Word Detail에 섹션 추가 |
| 문법·회화 | `grammar_points`, `conversations` + 단어 연결 테이블 | 단어가 허브가 되는 구조 |
| 다의어 | `word_senses` 분리 | `meaning_ko`를 백필 후 제거 |
| 앱 내 이미지 생성 | OpenAI Images API | 파이프라인이 이미 프롬프트를 분리 관리하므로 그대로 재사용 |
