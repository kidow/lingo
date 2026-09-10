# Lingo

그림을 보고 단어를 떠올리는 세로 피드. 열면 바로 시작한다.

세션도, 오늘의 목표도, 결과 화면도 없다. 카드가 떠 있고 위로 밀면 다음 카드가 온다.
숏폼을 빠르게 넘기는 습관을 그대로 학습 메커니즘으로 쓴다.

트랙은 **TOEIC · JLPT · HSK · DELE · DELF · TELC · TORFL** 일곱. 학습 대상은 언어마다
하나로 고정한다 — 일본어는 **읽기(かな)**, 나머지는 표기다. 상단 헤더의 드롭다운으로
트랙을 바꾸고 진도는 트랙별로 갈라진다.

**개념은 트랙이 공유한다.** `cat` 그림 한 장을 일곱 트랙이 같이 쓴다 — 트랙을 더해도
그려야 할 그림은 늘지 않는다.

카드는 다섯 종이다 — 소개 · 재인(그림→낱말) · 듣기(소리→그림) · 문맥(예문 빈칸) ·
단서 회상(철자 빈칸). 전부 객관적으로 채점된다.

헤더의 `단어 | 표현 | 상식` 탭이 한 트랙 안에서 볼 것을 가른다. **상식**은 그 언어
자체를 묻는 4지선다다 — 조사 `は`를 わ로 읽는 이유, 관사 a와 the가 나뉘는 기준 같은
것들. 그림이 없어 물음 문장이 곧 문제이고, **일곱 트랙 전부에 있다**(1,029문항).

단어 목록은 로드맵이라 그림보다 앞서 쌓인다. **그림이 있는 개념만 피드에 나온다.**

**모바일 전용이다.** 너비 `481px` 이상에서는 피드 대신 안내 화면이 뜬다 — 브라우저 창을 좁히면 그 자리에서 시작한다.

## 문서

| 파일 | 내용 |
|---|---|
| [spec.md](spec.md) | 제품 명세. 무엇을 만들고 무엇을 만들지 않는지 |
| [brand-spec.md](brand-spec.md) | 색·형태·타이포·상태 |
| [IMAGE_STYLE.md](IMAGE_STYLE.md) | 개념 이미지 생성 규칙 |
| [AUDIO.md](AUDIO.md) | 발음 오디오 제작 규칙 |
| [AGENTS.md](AGENTS.md) | 개념을 넣을 때의 작업 순서 |
| [docs/nets.md](docs/nets.md) | 어느 검사가 무엇을 잡고 무엇을 놓치는지 |
| [docs/concurrent-sessions.md](docs/concurrent-sessions.md) | 한 워크트리를 세션 둘이 쓸 때의 규칙 |
| [docs/twins-pending.md](docs/twins-pending.md) · [examples-pending](docs/examples-pending.md) | 남의 파일에서 찾은 문제를 임자에게 넘기는 목록. `pnpm pending`이 읽는다 |
| [docs/also-recheck.md](docs/also-recheck.md) | 중국어 곁말. 목록이 아니라 **회차마다 도는 일**이라 `pnpm also-audit`으로 그때그때 본다 |

## 실행

```bash
pnpm install
pnpm dev      # http://localhost:5757
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

pnpm dup <slug|뜻…>      # 그 개념이 이미 있는지 content/ 전체에 대고 본다
pnpm claim <표기…>       # 그 표기에 임자가 있는지
pnpm props <소품...>     # 그림 소품에 임자가 있는지 본다 (프롬프트를 통째로 줘도 된다)
pnpm props --in <slug...> # 이미 넣은 개념의 프롬프트로 조회. 배치끼리 겹치는 소품도 찍는다
pnpm pending [--free]   # 남에게 넘겨 둔 일감. --free면 지금 열린 파일 것만

pnpm batch <slug...>    # 넣은 직후에 늘 함께 도는 다섯을 한 번에
pnpm genimg <slug...>   # 그림을 뽑고 끝에 대조 시트를 붙인다
pnpm sheet <slug...>    # 그림 여러 장을 한 장으로
pnpm twins [구조] [색]   # 서로 닮은 그림. 바탕 그림과 몸통 빌린 쌍도 따로 낸다
pnpm split              # 화면이 읽는 public/content/를 굽는다
pnpm guards             # 동시 세션 막이가 실제로 도는지

pnpm coverage           # 시험 목록 대비 우리 위치
pnpm levels [파일]       # JLPT·HSK·CEFR·TSL·TORFL 등급을 출처에서 채운다
pnpm romanize [파일]     # ja·zh·ru 로마자
pnpm ipa [파일]          # 영어 발음기호(IPA)
pnpm audio              # 발음 현황. make/list/place/manifest
```

`slug`를 생략하면 아직 결과물이 없는 개념에 대해서만 돈다.

## 개념 하나 추가하기

단어 목록을 미리 만들지 않는다. 하나를 지명하고 끝까지 완성한 뒤 다음으로 넘어간다.
그림이 유일한 병목이고, 개념 정의가 옳은지는 그려 봐야 드러나기 때문이다.
**그리는 일은 스크립트가 하지만 마지막 확인은 여전히 눈이다** — 뒤바뀐 그림과
낱말 오독은 어떤 검사도 못 잡는다 ([docs/nets.md](docs/nets.md)).

0. `pnpm pending --free` — 남에게 넘겨 둔 것 중 지금 열린 파일이 있는지 본다
1. `pnpm dup <slug|뜻…>` — 그 개념이 이미 있는지
2. `content/*.json`에 개념 블록을 쓴다
3. `pnpm batch <slug…>` — 소품 겹침·로마자·발음기호·굽기·검증을 한 번에
4. `pnpm genimg <slug…>` — 그림을 뽑는다. 끝에 대조 시트를 붙여 준다
5. **시트를 눈으로 본다.** 80×80으로 줄여도 알아볼 수 있는지, 그림이 서로 뒤바뀌지 않았는지, 낱말이 엉뚱한 뜻으로 그려지지 않았는지 — **기계가 못 잡는 자리다**
6. `pnpm image <slug…>` — 512 WebP로 변환
7. 커밋

발음은 나중이다. `pnpm audio make <lang> <n>`으로 만들고 `pnpm audio manifest`로
목록을 다시 적는다 ([AUDIO.md](AUDIO.md)).

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
scripts/       check · dup · batch · genimg · image · twins · props · pending · …
```

`lib/`은 JSON을 아는 모듈(`content.ts`)과 순수 로직(나머지)으로 갈라져 있다.
그래서 학습 엔진을 번들러 없이 `node --test`로 돌린다.

## 스택

`next` · `react` · `ts-fsrs` 셋이 런타임 의존성의 전부다. 캐러셀은 CSS `scroll-snap`,
DB는 없다.
