# IMAGE_STYLE

단어 이미지의 스타일 규칙. **이 파일이 이미지 스타일의 단일 진실 소스**다.

이미지는 장식이 아니라 학습 요소다. 목표는 예쁜 그림이 아니라
**80×80 픽셀로 줄여도 무엇인지 즉시 알아볼 수 있는 그림**이다.

프롬프트는 두 조각으로 나뉜다.

- **STYLE_PROMPT** — 모든 개념에 공통. 이 파일에만 있다
- **image_prompt** — 개념별 내용. `content/*.json`의 각 개념에 있다

이미지는 **개념**에 속한다. 언어에 속하지 않는다. 바나나 그림 한 장을 모든 언어가 공유한다.

`pnpm prompts`가 `STYLE_PROMPT + image_prompt`를 합쳐 최종 문구를 출력한다.
스타일을 바꾸려면 이 파일만 고치면 된다.

---

## STYLE_PROMPT

ImageGen에 그대로 들어가는 영어 원문이다. 수정 시 아래 블록만 교체한다.

```text
Flat editorial illustration.

Square 1:1 canvas. Plain warm off-white background (#FAF6EF) — no pattern, no
gradient, no vignette, no frame, no border.

One subject, centered, occupying 65-75% of the frame. Generous even margins. The
subject may be a single object, or a small scene of at most three related elements
that read as one thing.

Limited palette of 4-6 muted earthy colors. Low to medium detail built from simple
geometric shapes. The silhouette must stay clear and recognizable when the image is
scaled down to 80x80 pixels.

No outlines, except a minimal one only where two similar tones meet. One small soft
contact shadow directly beneath the subject; no cast shadows, no ambient occlusion,
no texture noise, no grain.

Even diffuse lighting with no visible light source.

No text, no letters, no numbers, no logos, no watermark, no speech bubbles, no UI
elements, no captions.
```

---

## 개념 유형별 작성법

`image_prompt`에는 **내용만** 쓴다. 스타일 단어(flat, minimal, illustration, pastel 등)를
넣으면 STYLE_PROMPT와 충돌하므로 쓰지 않는다.

**사물 한 개로 그려야 하는 것은 아니다.** 단어가 요구하면 장면으로 간다 —
`cafeteria`를 쟁반 하나로 그리면 쟁반이 된다. 대신 공통 규격(배경·팔레트·글자
없음·80×80 판독)은 어떤 유형이든 그대로다. 유형별로 달라지는 것은 **무엇을
프레임에 담느냐**뿐이다.

### 구체 명사 (사물 · 동물 · 음식)

단일 객체. 정면 또는 3/4 측면, 중립 자세. 배경 소품을 넣지 않는다.

```
apple     → a single red apple with one green leaf on the stem, seen from the side
cat       → one sitting cat facing forward, tail curled around its front paws
umbrella  → one open umbrella seen from the side, handle pointing down
```

### 동사

동작 한 컷. 인물은 최대한 단순화하고 **얼굴 이목구비는 넣지 않거나 점 두 개까지만**.
동작이 실루엣만으로 읽혀야 한다.

```
eat   → one person lifting food to their mouth with chopsticks, seen from the side
run   → one person mid-stride running to the right, both feet off the ground
sleep → one person lying on their side asleep under a blanket, seen from the side
```

### 형용사 · 상태

한 프레임 안에서 대비로 보여주거나, 상태가 명확한 단일 객체로 표현한다.

```
big → two identical boxes side by side, the left one much larger than the right
hot → one steaming cup with three wavy heat lines rising from it
```

### 상황 · 장면

요소는 **최대 3개**. 그 이상은 작게 줄였을 때 죽는다.

```
station → a train stopped at a simple platform with one waiting person, side view
```

### 장소 · 시설

건물은 정면 한 채로, 실내는 **그 공간을 그 공간으로 만드는 요소 두셋**으로 그린다.
사물 하나로는 못 그리는 단어가 있다 — `cafeteria`를 쟁반 하나로 그리면 쟁반이 된다.

```
supermarket → one shop front with a wide window and two shopping carts outside, seen from the front
cafeteria   → two long tables with bench seats and a counter behind them, seen from the front
aisle       → two tall shelf units facing each other with a walkway between them, seen straight down the walkway
stadium     → one oval stadium bowl with tiered seating and a green field, seen slightly from above
```

요소를 늘릴수록 80×80에서 죽는다. **셋을 넘기지 않는다**는 규칙이 여기서도 그대로다.

### 추상어

**억지로 이미지를 만들지 않는다.** `image_prompt`를 비우고 `image_path`를 `null`로 둔다.

그 결과:
- Words 그리드에서 placeholder 타일로 나온다
- Image → Word 퀴즈에 출제되지 않는다 (정답으로도, 오답 보기로도)
- 플래시카드로만 학습된다

추상어는 나중에 mnemonic·예문·문맥으로 다룬다. v1에서는 이미지 없이 둔다.

### 이미지가 하나로 안 그려지면 개념이 둘이다

`水`(찬물)와 `お湯`(더운물)을 한 장에 담으려 하지 말 것. 개념을 `cold-water`와
`hot-water`로 쪼갠다. 이것이 개념을 나누는 실무 기준이다 — 개념은 사전 표제어가 아니라
**시각화 가능한 지시체** 단위다.

---

## 출력 규격

| 항목 | 값 |
|---|---|
| 생성 | PNG 1024×1024 |
| 저장 | WebP 512×512, quality 80 |
| 경로 | `concepts/{concept_slug}.webp` — 언어 구분 없음 |
| 파일명 | seed의 개념 `slug`와 정확히 일치 |

생성한 PNG는 `.images/{slug}.png`에 두고 `pnpm images`를 실행한다.
`.images/`는 gitignore 대상이다. 변환·업로드·`image_path` 갱신은 스크립트가 한다.

---

## 검수 체크리스트

업로드 전 확인한다. 하나라도 걸리면 다시 생성한다.

- [ ] 이미지 안에 글자·숫자·로고가 없다
- [ ] 배경이 단색 warm off-white다 (테두리·그림자·그라디언트 없음)
- [ ] 피사체가 하나이고 중앙에 있다
- [ ] **80×80으로 축소해도 무엇인지 알아볼 수 있다** — 가장 중요한 항목
- [ ] 같은 덱의 다른 이미지들과 채도·선 두께가 비슷하다
- [ ] 특정 언어권 문화에만 통하는 표현이 아니다 — 모든 언어가 이 그림을 공유한다
- [ ] 동사·장면에서 인물 얼굴이 과도하게 그려지지 않았다
- [ ] 그림자가 발밑 하나뿐이다

---

## 스타일을 바꿀 때

STYLE_PROMPT를 고치면 **기존 이미지와 새 이미지가 섞인다**. 같은 덱 안에서 스타일이
섞이면 학습 화면이 어수선해지므로, 스타일 변경은 덱 단위로 전체 재생성하는 것을 원칙으로 한다.

재생성 절차:
1. 대상 개념의 `image_path`를 `null`로 되돌린다
2. `pnpm prompts` — 새 STYLE_PROMPT로 프롬프트가 다시 나온다
3. 생성 → `.images/` → `pnpm images` (같은 경로에 덮어쓴다)
