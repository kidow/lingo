---
name: add-concept
description: lingo 콘텐츠에 개념(단어)을 하나 추가한다. content/*.json 블록 작성부터 뜻 검증·이미지 생성·WebP 변환·발음·검수·커밋까지 spec.md §7의 절차를 끝까지 밟는다. Use when 단어를 추가·등록하거나, 개념을 새로 만들거나, "이 단어 넣어줘" 같은 요청을 받았을 때. 이미지만 다시 뽑거나 발음만 채우는 부분 작업에도 쓴다.
---

# 개념 추가

## 철칙

**한 번에 하나씩, 끝까지.** 목록을 미리 쌓지 않는다 (spec.md §7). 이미지가 유일한
병목이고 수작업이라, 미리 써두면 그림 없는 개념만 쌓인다. 개념 정의가 옳은지는
**그림을 그려봐야 드러난다** — 한 장에 안 담기면 개념이 둘이라는 신호다.

## 시작 전 확인

- **그릴 수 있는가.** 추상어는 넣지 않는다. 카드 3종이 전부 이미지를 전제한다 (§4).
- **개념이 하나인가.** `水`(찬물)/`お湯`(더운물)처럼 그림이 갈리면 개념을 쪼갠다.
- **그 언어에서 배울 값이 있는가.** 일본어 입문 어휘가 영어에서는 너무 쉬울 수 있다.
  언어마다 개념 집합이 달라도 된다 — `words`가 부분 맵이다.

## 절차

```bash
pnpm define <word>     # 1. 뜻을 사전에서 확인한다 (기억으로 쓰지 않는다)
# 2. content/*.json 에 개념 블록을 쓴다
pnpm check             # 3. 검증
pnpm prompt <slug>     # 4. 최종 이미지 프롬프트 출력 → 그대로 생성 (한 글자도 고치지 않는다)
# 5. 받은 PNG를 .images/{slug}.png 에 둔다
pnpm image <slug>      # 6. 512×512 WebP q80 → public/concepts/
# 7. 80×80으로 줄여도 알아볼 수 있는지 눈으로 확인
# 8. 발음을 public/audio/{lang}/{slug}.mp3 에 넣는다 (AUDIO.md)
pnpm check             # 9. 다시 검증하고 커밋
```

이미지는 4~7단계를 붙여서 한다. **발음은 없어도 학습이 돌아가므로** 나중에 몰아서 해도 된다.

## 개념 블록

```json
{
  "slug": "faucet",
  "meaning_ko": "수도꼭지",
  "category": "noun",
  "image_prompt": "one wall-mounted faucet seen from the side, curved spout with a single lever handle",
  "words": {
    "en": {
      "term": "faucet",
      "part_of_speech": "명사",
      "example": { "text": "Turn off the faucet.", "ko": "수도꼭지를 잠그세요." }
    }
  }
}
```

- `slug`는 `^[a-z0-9-]+$`. **파일명이 여기서 나온다** — 한 글자만 달라도 앱이 못 찾는다.
- `category`는 생략 불가. 오답 보기를 같은 category에서 뽑기 때문이다 (§4).
- `image_prompt`에 스타일 문구를 쓰지 않는다. `pnpm prompt`가 IMAGE_STYLE의
  STYLE_PROMPT를 앞에 붙인다. **여기에는 무엇을 그릴지만** 쓴다.
- 예문은 かな/영어 한 줄 + 한국어 한 줄. **그 단어가 문장에 들어가야 한다** — check가 경고한다.
- 일본어는 `reading`이 정답 필드다. 영어는 `term`이고 참고줄이 없다 (`lib/lang.ts`).

## 자주 걸리는 것

| 증상 | 원인 |
|---|---|
| 발음 버튼이 계속 비활성 | 파일명이 slug가 아니라 읽기/로마자다 (`neko.mp3` ← `cat`). `pnpm check`가 잡는다 |
| 이미지가 플레이스홀더로 나온다 | 아직 생성 전이라는 뜻이다. 실패가 아니다 (§4) |
| 잔 텍스처가 많고 파일이 무겁다 | `image_prompt`에 `dense`·`detailed` 류가 들어갔다. 그림이 아니라 **문구를 고친다** |
| `meaning_ko`가 사전과 다르다 | 실패가 아니다. 사전이 넓게 잡거나 표기가 다를 수 있다 — 이미지가 가리키는 것과 맞는지 보고 정한다 |

## 규칙의 출처

- 제품·데이터·절차 — [spec.md](../../../spec.md) §4 §5 §7
- 이미지 스타일과 검수 — [IMAGE_STYLE.md](../../../IMAGE_STYLE.md)
- 발음 규격과 목소리 — [AUDIO.md](../../../AUDIO.md)
