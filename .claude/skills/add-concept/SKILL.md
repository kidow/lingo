---
name: add-concept
description: lingo 콘텐츠에 개념(단어)을 하나 추가한다. content/*.json 블록 작성부터 뜻 검증·이미지 생성·WebP 변환·발음·검수·커밋까지 spec.md §7의 절차를 끝까지 밟는다. Use when 단어를 추가·등록하거나, 개념을 새로 만들거나, "이 단어 넣어줘" 같은 요청을 받았을 때. 이미지만 다시 뽑거나 발음만 채우는 부분 작업에도 쓴다.
---

# 개념 추가

## 철칙

**목록은 쌓아도 되고, 그림은 하나씩 그린다.** (spec.md §7)

그림이 있는 개념만 출제되므로(§4) 목록이 앞서 쌓여도 무해하고 오히려 로드맵이 된다.
하지만 **그림은 하나씩** 그린다 — 이미지가 유일한 병목이고, 개념 정의가 옳은지는
그림을 그려봐야 드러난다. 한 장에 안 담기면 개념이 둘이라는 신호다.

## 시작 전 확인

- **그릴 수 있는가.** 추상어는 넣지 않는다. 카드 4종이 전부 이미지를 전제한다 (§4).
- **개념이 하나인가.** `水`(찬물)/`お湯`(더운물)처럼 그림이 갈리면 개념을 쪼갠다.
- **어느 트랙이 이 개념을 쓸 수 있는가.** 개념은 트랙이 공유한다. 일상 명사는 여섯 트랙이
  다 쓰지만 사무 어휘는 TOEIC만 쓴다. 쓸 트랙의 단어를 `words`에 나란히 넣는다.
- **교재를 복제하지 않는다.** 레포가 공개다. 목록은 직접 뽑고 `pnpm define`으로 대조한다.

## 절차

```bash
pnpm define <word>     # 1. 뜻을 사전에서 확인한다 (기억으로 쓰지 않는다)
# 2. content/{topic}.json 에 개념 블록을 쓴다 (everyday.json · office.json)
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
  "slug": "invoice",
  "meaning_ko": "청구서",
  "category": "noun",
  "image_prompt": "one printed invoice sheet lying flat, seen from above, ruled lines and a total box",
  "words": {
    "en": {
      "term": "invoice",
      "part_of_speech": "명사",
      "example": { "text": "Please send the invoice by Friday.", "ko": "금요일까지 청구서를 보내 주세요." }
    }
  }
}
```

JLPT는 `reading`·`romanization`과 `attributes.jlpt`(`N5`~`N1`)를 더 쓴다. 레벨은
카드 좌하단에 그대로 표시된다. TOEIC은 공식 등급이 없어 붙이지 않는다.

- `slug`는 `^[a-z0-9-]+$`. **파일명이 여기서 나온다** — 한 글자만 달라도 앱이 못 찾는다.
- `category`는 생략 불가. 오답 보기를 같은 category에서 뽑기 때문이다 (§4).
- `image_prompt`에 스타일 문구를 쓰지 않는다. `pnpm prompt`가 IMAGE_STYLE의
  STYLE_PROMPT를 앞에 붙인다. **여기에는 무엇을 그릴지만** 쓴다.
- 예문은 かな/영어 한 줄 + 한국어 한 줄. **그 단어가 문장에 들어가야 한다** — check가 경고한다.
- 일본어는 `reading`이 정답 필드다. 영어는 `term`이고 참고줄이 없다 (`lib/lang.ts`).
- 레벨은 `attributes`에 넣는다 — `jlpt`(N5~N1) · `hsk`(1~6) · `cefr`(A1~C2). 카드 좌하단에 그대로 나온다.
- 한자는 빈칸 카드를 만들지 않는다. 닮은 오답을 깔 풀이 없어서다 (spec.md §9).

## 자주 걸리는 것

| 증상 | 원인 |
|---|---|
| 발음 버튼이 계속 비활성 | 파일명이 slug가 아니라 읽기/로마자다 (`neko.mp3` ← `cat`). `pnpm check`가 잡는다 |
| 넣은 단어가 피드에 안 보인다 | 그림이 없으면 출제되지 않는다 (§4). /debug에서 목록을 본다 |
| 트랙이 통째로 비어 있다 | 그 트랙에 그림 있는 개념이 0개다. 목록이 빈 것과 다르다 |
| 잔 텍스처가 많고 파일이 무겁다 | `image_prompt`에 `dense`·`detailed` 류가 들어갔다. 그림이 아니라 **문구를 고친다** |
| 엉뚱한 그림이 나왔다 | 여러 장을 한 배치로 돌리면 **같은 결과가 두 경로에 쓰이는 일**이 있다. 아래 해시 검사로 잡는다 |
| `meaning_ko`가 사전과 다르다 | 실패가 아니다. 사전이 넓게 잡거나 표기가 다를 수 있다 — 이미지가 가리키는 것과 맞는지 보고 정한다 |

## 여러 장을 한 번에 돌렸다면

배치가 같은 결과를 두 파일에 쓰는 일이 있다. 눈으로는 잘 안 걸리므로 해시로 본다.

```bash
md5 -q public/concepts/*.webp | sort | uniq -d
```

출력이 있으면 그 해시를 가진 파일을 찾아 **하나를 다시 뽑는다.**

## 규칙의 출처

- 제품·데이터·절차 — [spec.md](../../../spec.md) §4 §5 §7
- 이미지 스타일과 검수 — [IMAGE_STYLE.md](../../../IMAGE_STYLE.md)
- 발음 규격과 목소리 — [AUDIO.md](../../../AUDIO.md)
