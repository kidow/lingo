# Lingo

그림을 보고 단어를 떠올리는 세로 피드. 열면 바로 시작한다.

세션도, 오늘의 목표도, 결과 화면도 없다. 카드가 떠 있고 위로 밀면 다음 카드가 온다.
숏폼을 빠르게 넘기는 습관을 그대로 학습 메커니즘으로 쓴다.

트랙은 **TOEIC · JLPT · HSK · DELE · DELF · telc** 여섯. 학습 대상은 언어마다 하나로
고정한다 — 일본어는 **읽기(かな)**, 나머지는 표기다. 상단 헤더의 드롭다운으로 트랙을
바꾸고 진도는 트랙별로 갈라진다.

**개념은 트랙이 공유한다.** `cat` 그림 한 장을 여섯 트랙이 같이 쓴다 — 트랙을 더해도
그려야 할 그림은 늘지 않는다.

단어 목록은 로드맵이라 그림보다 앞서 쌓인다. **그림이 있는 개념만 피드에 나온다.**

**모바일 전용이다.** 너비 `481px` 이상에서는 피드 대신 안내 화면이 뜬다 — 브라우저 창을 좁히면 그 자리에서 시작한다.

## 문서

| 파일 | 내용 |
|---|---|
| [spec.md](spec.md) | 제품 명세. 무엇을 만들고 무엇을 만들지 않는지 |
| [brand-spec.md](brand-spec.md) | 색·형태·타이포·상태 |
| [IMAGE_STYLE.md](IMAGE_STYLE.md) | 개념 이미지 생성 규칙 |
| [AUDIO.md](AUDIO.md) | 발음 오디오 제작 규칙 |

## 실행

```bash
pnpm install
pnpm dev
```

## 스크립트

```bash
pnpm check              # content/*.json 검증
pnpm test               # 학습 엔진 단위 테스트
pnpm typecheck
pnpm build              # 정적 내보내기 → out/

pnpm prompt [slug]      # 이미지 생성 프롬프트 출력
pnpm image  [slug]      # .images/*.png → public/concepts/*.webp
pnpm icons              # app/icon.svg → PWA·애플 아이콘
```

`slug`를 생략하면 아직 결과물이 없는 개념에 대해서만 돈다.

## 개념 하나 추가하기

단어 목록을 미리 만들지 않는다. 하나를 지명하고 끝까지 완성한 뒤 다음으로 넘어간다.
이미지가 유일한 병목이자 수작업이고, 개념 정의가 옳은지는 그림을 그려봐야 드러나기 때문이다.

1. `content/*.json`에 개념 블록을 쓴다
2. `pnpm check`
3. `pnpm prompt <slug>` 출력을 ImageGen에 넣어 1024 PNG를 만든다
4. `.images/{slug}.png`에 두고 `pnpm image <slug>`
5. **80×80으로 줄여도 알아볼 수 있는지 확인한다**
6. 발음을 만들어 `public/audio/ja/{slug}.mp3`에 넣는다 ([AUDIO.md](AUDIO.md))
7. 커밋

발음은 없어도 학습이 돌아간다. 버튼이 비활성으로 남을 뿐이다.

## 배포

**서버가 필요 없다.** 진도는 `localStorage`에 있고 콘텐츠는 빌드 시점에 번들되므로
런타임에 서버가 할 일이 없다. `output: 'export'`가 그 사실을 강제한다 — 서버 기능을
쓰는 순간 빌드가 깨진다.

```bash
pnpm build   # → out/  (약 900KB)
```

`out/`을 정적 호스트 아무 데나 올리면 된다. Vercel은 저장소를 임포트하면 프레임워크를
자동 감지하므로 별도 설정이 필요 없다.

환경변수도 API 키도 없다.

## 구조

```
app/           라우트 하나(/), 레이아웃, 토큰, manifest, 아이콘
components/    Feed · Card 3종 · ConceptImage · SayButton
lib/           types · lang · content · entries · quiz · engine · progress
content/       개념 JSON — 단일 진실 소스
public/        concepts/*.webp · audio/{lang}/*.mp3 · 아이콘
scripts/       check · prompt · image · icons
```

`lib/`은 JSON을 아는 모듈(`content.ts`)과 순수 로직(나머지)으로 갈라져 있다.
그래서 학습 엔진을 번들러 없이 `node --test`로 돌린다.

## 스택

`next` · `react` · `ts-fsrs` 셋이 런타임 의존성의 전부다. 캐러셀은 CSS `scroll-snap`,
DB는 없다.
