# IMAGE_STYLE

단어 이미지의 스타일 규칙. **이 파일이 이미지 스타일의 단일 진실 소스**다.

이미지는 장식이 아니라 학습 요소다. 목표는 예쁜 그림이 아니라
**80×80 픽셀로 줄여도 무엇인지 즉시 알아볼 수 있는 그림**이다.

프롬프트는 두 조각으로 나뉜다.

- **STYLE_PROMPT** — 모든 단어에 공통. 이 파일에만 있다
- **image_prompt** — 단어별 내용. `content/{lang}/*.json`에 있다

`pnpm prompts`가 `STYLE_PROMPT + image_prompt`를 합쳐 최종 문구를 출력한다.
스타일을 바꾸려면 이 파일만 고치면 된다.

---

## STYLE_PROMPT

ImageGen에 그대로 들어가는 영어 원문이다. 수정 시 아래 블록만 교체한다.

```text
Flat editorial illustration.

Square 1:1 canvas. Plain warm off-white background (#FAF6EF) — no pattern, no
gradient, no vignette, no frame, no border.

A single subject, centered, occupying 65-75% of the frame. Generous even margins.

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

## 단어 유형별 작성법

`image_prompt`에는 **내용만** 쓴다. 스타일 단어(flat, minimal, illustration, pastel 등)를
넣으면 STYLE_PROMPT와 충돌하므로 쓰지 않는다.

### 구체 명사 (사물 · 동물 · 음식)

단일 객체. 정면 또는 3/4 측면, 중립 자세. 배경 소품을 넣지 않는다.

```
りんご  → a single red apple with one green leaf on the stem, seen from the side
ねこ    → one sitting cat facing forward, tail curled around its front paws
かさ    → one open umbrella seen from the side, handle pointing down
```

### 동사

동작 한 컷. 인물은 최대한 단순화하고 **얼굴 이목구비는 넣지 않거나 점 두 개까지만**.
동작이 실루엣만으로 읽혀야 한다.

```
食べる  → one person lifting food to their mouth with chopsticks, seen from the side
走る    → one person mid-stride running to the right, both feet off the ground
寝る    → one person lying on their side asleep under a blanket, seen from the side
```

### 형용사 · 상태

한 프레임 안에서 대비로 보여주거나, 상태가 명확한 단일 객체로 표현한다.

```
大きい  → two identical boxes side by side, the left one much larger than the right
熱い    → one steaming cup with three wavy heat lines rising from it
```

### 상황 · 장면

요소는 **최대 3개**. 그 이상은 작게 줄였을 때 죽는다.

```
駅  → a train stopped at a simple platform with one waiting person, side view
```

### 추상어

**억지로 이미지를 만들지 않는다.** `image_prompt`를 비우고 `image_path`를 `null`로 둔다.

그 결과:
- Words 그리드에서 placeholder 타일로 나온다
- Image → Word 퀴즈에 출제되지 않는다 (정답으로도, 오답 보기로도)
- 플래시카드로만 학습된다

추상어는 나중에 mnemonic·예문·문맥으로 다룬다. v1에서는 이미지 없이 둔다.

---

## 출력 규격

| 항목 | 값 |
|---|---|
| 생성 | PNG 1024×1024 |
| 저장 | WebP 512×512, quality 80 |
| 경로 | `words/{language}/{slug}.webp` |
| 파일명 | seed의 `slug`와 정확히 일치 |

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
- [ ] 동사·장면에서 인물 얼굴이 과도하게 그려지지 않았다
- [ ] 그림자가 발밑 하나뿐이다

---

## 스타일을 바꿀 때

STYLE_PROMPT를 고치면 **기존 이미지와 새 이미지가 섞인다**. 같은 덱 안에서 스타일이
섞이면 학습 화면이 어수선해지므로, 스타일 변경은 덱 단위로 전체 재생성하는 것을 원칙으로 한다.

재생성 절차:
1. 대상 단어의 `image_path`를 `null`로 되돌린다
2. `pnpm prompts` — 새 STYLE_PROMPT로 프롬프트가 다시 나온다
3. 생성 → `.images/` → `pnpm images` (같은 경로에 덮어쓴다)
