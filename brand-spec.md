# Lingo 브랜드 명세

Quizlet의 학습 구조와 단일 강조색 원칙을 Lingo의 개인용 일본어 단어장에 맞게 적용한다. 화면은 빠르게 훑고 바로 복습할 수 있어야 하며, 친근하지만 유아적으로 보이지 않아야 한다.

## 기반 원칙

- 모바일 우선. 콘텐츠 레일은 모든 화면에서 최대 `560px`로 중앙 고정한다.
- 공통 상단 헤더를 두지 않는다. 주요 화면 탐색은 하단 탭 3개로 유지한다.
- 페이지 캔버스, 흰 학습 표면, 단일 Iris 강조색의 3단 위계를 사용한다.
- 파스텔은 오늘의 학습이나 학습 모드처럼 큰 기능 영역에만 쓴다. 버튼·입력·일반 본문에는 확장하지 않는다.
- 이미지 스프라이트의 따뜻한 배경은 학습 대상 자체의 시각적 구분을 위해 유지한다.

## 핵심 토큰

```css
:root {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --surface-tint: #edefff;
  --surface-accent: #dbdfff;

  --fg: #282e3e;
  --fg-secondary: #2e3856;
  --muted: #586380;
  --placeholder: #6f7892;
  --border: #d9dde8;

  --accent: #4255ff;
  --accent-hover: #3347e8;
  --accent-active: #2638c9;
  --focus: #1f33d4;
  --accent-fg: #ffffff;

  --ok: #168b64;
  --ok-soft: #e8f7f1;
  --err: #c83b4c;
  --err-soft: #fff0f2;

  --img-bg: #fbf7ef;
  --gap-xs: 8px;
  --gap-sm: 12px;
  --gap-md: 16px;
  --gap-lg: 24px;
  --gap-xl: 40px;

  --radius-control: 8px;
  --radius-card: 12px;
  --radius-feature: 24px;
  --radius-pill: 200px;

  --shadow-sm: 0 2px 4px rgba(40, 46, 62, .08);
  --shadow-md: 0 8px 24px rgba(40, 46, 62, .09);
}
```

## 글꼴

- 한국어/UI: `"Avenir Next", Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`
- 일본어: `"Avenir Next", "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`
- 단일 산세리프 체계에서 400·600·700 굵기만 사용한다.
- 기본 본문은 16px 이상, 줄높이 1.5 전후를 유지한다.
- 일본어 단어는 가장 크게 두되 한글·가나에 강한 음수 자간을 적용하지 않는다.
- 학습 수치와 진행 번호에는 `font-variant-numeric: tabular-nums`를 사용한다.

## 표면과 형태

- AppShell: `width: min(100%, 560px)`. 데스크톱에서는 바깥 캔버스와 얕은 그림자로 레일을 구분한다.
- 일반 카드: 흰 표면, 1px Mist 경계, 12px 반경.
- 기능 카드: Lilac Wash 또는 Feature Pastel, 24px 반경. 화면당 한두 개로 제한한다.
- 검색창과 주요 버튼: 200px pill. 일반 선택지와 답안은 8px 반경을 사용한다.
- 카드 내부 간격은 16–24px, 주요 섹션 간격은 모바일 40px을 기본으로 한다.
- 그림자는 목록 전체가 아니라 클릭 가능한 핵심 카드와 학습 카드에만 사용한다.

## 색상 역할

- `#4255ff`: 화면당 단일 주요 행동, 현재 위치, 진행률, 선택 상태.
- `#282e3e`: 제목과 본문.
- `#586380`: 보조 설명과 메타데이터. 핵심 정보에는 쓰지 않는다.
- `#d9dde8`: 구조 경계. 선택이나 focus를 이 색만으로 표현하지 않는다.
- 성공과 오류는 색상과 함께 문구·아이콘·정답 노출을 병행한다.

## 상태 규칙

- Hover: fine pointer에서만 배경 또는 경계를 짧게 변화시킨다.
- Focus: `#1f33d4` 3px 외곽선과 2–3px 간격을 사용한다.
- Active: 버튼은 `#2638c9`와 `scale(.98)`로 즉시 반응한다.
- Selected: Iris 경계, 연한 Lilac 배경, 라디오 점을 함께 사용한다.
- Disabled: 투명도만 낮추지 않고 포인터를 제거하며 기존 문맥은 읽을 수 있게 유지한다.
- Correct / Wrong: 녹색·빨강 배경과 경계, 정답 자동 노출을 함께 사용한다.
- 모든 터치 대상은 최소 44×44px을 확보한다.

## 컴포넌트 규칙

- BottomNav: 홈·단어·연습 3개. 현재 항목은 Iris 색, 굵기, 상단 3px 표식으로 구분한다.
- ReviewCTA: 복습량·새 단어·예상 시간과 단일 시작 버튼을 Lilac 기능 카드에 묶는다.
- DeckCard: 대표 이미지, 제목, 학습 수치, Iris 진행률을 한 표면에 담는다.
- WordTile / WordRow: 같은 데이터를 그리드와 목록으로 전환한다.
- SearchField / SegmentedControl: 단어 화면 안에서만 검색과 보기 방식을 바꾼다.
- PronunciationButton / Toast: 발음 행동은 항상 보이고, 준비되지 않은 상태를 한국어로 알린다.
- StudyCard / ChoiceButton / SessionProgress: 플래시카드와 4지선다를 같은 학습 셸에서 처리한다.
- Result: 기억한 단어와 다시 볼 단어를 숫자와 레이블로 나누고, 다음 복습 행동을 설명한다.

## 모션과 접근성

- 누름 피드백은 100–150ms, 화면 전환은 200–300ms로 제한한다.
- 이동은 transform과 opacity만 사용한다.
- `prefers-reduced-motion: reduce`에서 전환 시간을 사실상 제거한다.
- placeholder는 레이블 대체 수단으로 쓰지 않는다. 검색 입력에는 접근 가능한 이름을 제공한다.
- 색상만으로 현재 위치, 선택, 정오답을 전달하지 않는다.
