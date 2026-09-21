# 닮은 그림 — 임자가 다시 그릴 자리

확인일: 2026-09-09. `pnpm twins`가 짚은 것 가운데 **눈으로 봐서 진짜 겹치는
것**만 남긴 목록이다. 손대지 않은 이유는 하나다 — **내가 만든
개념이 아니라서**다. 다른 세션이 그 파일을 만지는 중이면 그림과 프롬프트를
동시에 고치는 셈이 된다([concurrent-sessions.md](concurrent-sessions.md)).

이 문서는 **그 파일을 다음에 만지는 사람에게 남기는 쪽지**다. 고치고 나면 이
줄을 지운다.

**어느 파일을 지금 만지고 있는지는 여기 적지 않는다.** 반나절이면 낡는다 —
2026-09-09에 «진행 중» 표시를 박았다가 그날 안에 두 번 어긋났다. 도구가
그때그때 알려 준다.

    pnpm dup <slug>     걸린 개념 줄에 ⟨손대는 중⟩
    pnpm props <소품>    임자 줄에 ⟨손대는 중⟩
    pnpm genimg <slug>  다시 그리기면 아예 멈춘다

**표시가 붙은 개념은 건드리지 않는다.** 같은 날 그걸 모르고 여섯을 고쳤다가
임자의 미커밋 프롬프트를 잃었다([concurrent-sessions](concurrent-sessions.md)).

## 넷은 임자가 이미 고쳤다 (2026-09-09 저녁 재측정)

아래 표의 네 쌍은 그 뒤 임자 세션이 그림을 다시 그려 **문턱 밖으로 벌어졌다.**
남겨 두는 것은 판단의 기록이지 남은 일감이 아니다.

| 쌍 | 그때 | 지금 |
| --- | ---: | ---: |
| `hammock` ↔ `idle` | 46 | **122** |
| `hourglass-stand` ↔ `now` | 49 | **113** |
| `disappointed` ↔ `guilty` | 49 | **112** |
| `month` ↔ `monthly` | 48 | **105** |

유리잔도 저녁에 끝냈다. `transparent`를 빈 잔에서 **물에 반쯤 잠긴 유리막대**로
바꾸니 `empty`와 63에서 **121**로 벌어졌다 — 투명함이 잔이 아니라 굴절로 보인다.
`quality.json`이 그때 깨끗해(임자가 커밋을 끝냈다) 손댈 수 있었다.

**넘긴 다섯이 다 처리됐다.** 넷은 임자가, 하나는 파일이 빈 틈에 내가 했다.

`empty` ↔ `almost`는 **그냥 둔다.** 구조 58 · 색 0.201로 문턱(50 · 0.20) 코앞
이지만, 80×80으로 줄여 보면 물이 든 쪽에 색이 남아 갈린다. 잔이 같아도 **안에
든 것이 다르면 작은 그림에서도 보인다** — 잔 자체가 같다는 이유로 다시 그릴
자리는 아니다.

| 쌍 | 지금 프롬프트 | 왜 겹치나 | 갈래 낼 방법 |
| --- | --- | --- | --- |
| `travel/hammock`(해먹)<br>`action/idle`(빈둥거리다) | 둘 다 «두 기둥 사이에 걸린 해먹» | 물건이 같다. `idle`이 해먹을 빌려 썼는데 해먹 개념이 따로 있다 | `idle`을 사람 없는 물건이 아니라 **시간이 흐르는 자리**로 — 반쯤 마신 잔과 흐트러진 방석, 또는 멈춘 자전거 페달 |
| `time/month`(달)<br>`quality/monthly`(다달의) | 둘 다 «빈 칸이 격자로 있는 달력 한 장» | 달력 한 장으로 명사와 형용사를 다 그렸다 | `monthly`는 **되풀이**가 보여야 한다 — 같은 칸에 표시가 네 번 찍힌 낱장, 또는 뜯어 낸 장이 넷 쌓인 모양 |
| `time/hourglass-stand`(모래시계 받침)<br>`time/now`(지금) | 받침은 «기둥 셋이 받친 모래시계», 지금은 «모래가 떨어지는 모래시계» | 같은 파일 안에서 같은 물건이다. 받침을 그리려면 모래시계가 있어야 한다 | `now`에서 모래시계를 뺀다 — 한 점에 멈춘 바늘, 또는 방금 찍힌 도장 자국 하나 |
| `quality/disappointed`(실망한)<br>`quality/guilty`(죄책감의) | 둘 다 «고개 숙이고 어깨 처진 인물 + 바닥의 물건» | 자세가 같고 곁의 사물만 다르다. 80×80에서는 그 차이가 안 보인다 | 감정은 **자세와 거리**로 가른다(IMAGE_STYLE) — `guilty`는 등을 돌리거나 문틈으로 반쯤 물러선 자세로 |

## 파일 단위로 다시 훑었다 (2026-09-09) — 유리잔은 끝났다

`pnpm twins --file <이름>`은 그 파일 안에서만 본다. **오답이 실제로 붙는
자리**라 전체 훑기보다 값이 크다(`nearPool`은 같은 주제 파일에서 먼저 뽑는다).

| 파일 | 기본 문턱(50·0.20) | 늦춰서(65·0.30) |
| --- | ---: | --- |
| `scene` 802장 | 0쌍 | 넷 — 둘은 그 자리에서 고쳤다(펼친 책·서류철) |
| `action` 485장 | 0쌍 | 0쌍 |
| `idea` 361장 | 0쌍 | 0쌍 |
| `quality` 630장 | 1쌍 | 넷 |

**`quality`에 유리잔이 몰려 있다.** 셋이 같은 잔을 쓴다.

| 개념 | 지금 프롬프트 |
| --- | --- |
| `empty`(빈) | 아무것도 없는 잔 |
| `transparent`(투명한) | **빈 잔** 너머로 조약돌이 비친다 |
| `almost`(거의) | 물이 가장자리까지 찬 잔 |

`empty`↔`transparent`가 구조 63으로 붙는다 — 둘 다 빈 잔이고 차이가 조약돌
하나다. 80×80에서는 그 점이 안 보인다. **투명함은 빈 잔 말고 다른 데서
보여야 한다** — 유리창 너머로 겹쳐 보이는 두 물건, 또는 물속에서 굴절된 막대.

`almost`는 물이 차 있어 갈리고, `approximate`↔`clean`(삐뚤한 원 ↔ 흰 접시)은
구조만 닮았을 뿐 물건이 다르다.

## 스무 파일을 다 훑었다 (2026-09-09)

`--file`로 하나씩 봤다. 늦춘 문턱(65·0.30) 기준이다.

| 0쌍 | 걸린 파일 |
| --- | --- |
| `action` · `idea` · `city` · `clothes` · `everyday` · `family` · `food` · `home` · `job` · `nature` · `number` · `transport` · `travel` | `time` 7 · `office` 4 · `quality` 4 · `school` 3 · `scene` 4(둘은 고쳤다) · `body` 1 · `sport` 1 |

**열셋이 0쌍이다.** 사물 갈래(음식·옷·집·자연)는 그림이 서로 다르게 서 있다.
걸린 자리는 **재는 물건과 화면**에 몰려 있다 — 시계·모래시계·달력, 서버 랙,
브라우저 창, 종이 서식이다.

### 시간 — 일곱 쌍

같은 물건을 여러 개념이 나눠 쓴다.

| 무리 | 개념 |
| --- | --- |
| ~~모래시계~~ | ~~`hourglass` · `hourglass-stand` · `now`~~ — **끝났다**, 임자가 `now`를 다시 그렸다 |
| 시계 얼굴 | ~~`hour`~~ **끝냈다** — `clock` · `quarter-to` · `tide-clock`이 남았다 |
| ~~달력 한 장~~ | ~~`date` · `holiday`~~ — **끝냈다**, `holiday`를 셔터로 옮겼다 |

받침과 모래시계처럼 **한쪽이 다른 쪽을 품는 자리**는 개념이 옳으므로 그림에서
갈라야 한다. 모래시계 무리는 그렇게 끝났다 — 임자가 `now`에서 모래시계를 뺐다.

**`hour`는 2026-09-09에 뺐다.** 시계 얼굴 대신 **반쯤 타 내려온 향 코일**로
갔다 — 아래에 재가 한 줄 떨어져 있다. 57 → **116**이고, 둥근 판을 쓰는 다른
개념과도 다 멀다(`minute` 120 · `quarter-to` 125 · `tide-clock` 120 ·
`gauge`(계량기) 121 · `hourglass` 125 · `sundial`(해시계) 106).

**둥근 판 갈래는 생각보다 넓다.** 시계 넷 말고도 `minute`(분)이 시계 얼굴을
쓰고, `gauge`(계량기)와 `sundial`(해시계)도 둥근 판이다. 문턱에 걸린 것만
세면 넷이지만 실제로는 일곱이 같은 꼴을 나눠 쓴다.

**`tide-clock`도 2026-09-10에 뺐다.** 얼굴을 버리지 않고 **테를 반원으로**
바꿨다 — 낡은 널빤지에 박힌 반원 눈금판에 바늘 하나, 아래에 물결 표시다.
조석 시계는 여전히 시계인데 윤곽이 온 원이 아니라 붙지 않는다. 53 → **108**
이고 나머지와도 다 멀다(`clock` 119 · `minute` 121 · `gauge` 116 · `hour` 115
· `sundial` 123).

**남은 것은 하나뿐이고 그건 옳은 자리다.**

`clock`↔`quarter-to` 59 — 십오 분 전은 **시계가 가리키는 시각**이라 얼굴을
버릴 수 없다. 그림이 아니라 뜻이 이웃한 자리라 그냥 둔다.

셋 다 `time.json`이라 그 파일을 만지는 사람이 한 번에 볼 일이다.

### 사무 — 넉 쌍. 개념은 셋 다 둘일 만하다 (2026-09-09 판정)

`database`↔`server` 59 · `homepage`↔`web-page` 60 · `chip`↔`semiconductor` 62.
«그림보다 먼저 개념이 둘일 이유를 봐야 한다»고 적어 뒀던 자리를 들여다봤다.
**셋 다 개념은 옳다.** 문제는 하나같이 **한 물건을 두 번 그린 것**이다.

| 쌍 | 개념이 둘일 이유 | 옮길 쪽과 갈래 |
| --- | --- | --- |
| ~~`chip`<br>`semiconductor`~~ 62 → **116** | **끝냈다.** `chip`은 **부품 하나**, `semiconductor`는 그 부품을 만드는 **재료이자 갈래**다. 영어로도 다른 낱말을 배워야 한다 | `semiconductor`를 **실리콘 웨이퍼**로 옮겼다 — 거울처럼 반짝이는 둥근 원판에 격자, 한쪽이 직선으로 잘렸다. `chip`은 그대로 뒀다 |
| `database`(데이터베이스)<br>`server`(서버) | `server`는 **기계**, `database`는 그 안에 **담긴 것**이다. 랙은 서버의 몸이지 데이터베이스의 몸이 아니다 | **끝냈다** — 물건이 아니라 **구조**로 그렸다. 줄 쳐진 판 셋이 가는 선으로 이어지고 맨 윗줄만 진하다. 59 → **115**이고 이웃 일곱과 97~123이다 |
| ~~`homepage`<br>`web-page`~~ 60 → **106** | **끝냈다.** `web-page`는 **한 장**, `homepage`는 거기서 **뻗어 나가는 첫 장**이다 | `homepage`를 **창 하나에서 화살표 셋이 작은 창 셋으로 뻗는 모양**으로 옮겼다. `website`와도 119다 |

**물건 자리가 다 차 있을 수도 있다.** `database`를 「카드 목록장」으로 옮기려다
막혔다 — `index-card`(색인)가 이미 «서랍을 연 카드함»이고, `archive`는 «상자
쌓인 서가», `catalogue`·`ledger`·`binder`·`spreadsheet`·`hard-drive`·`floppy-disk`
·`cylinder`까지 다 임자가 있다. **«모아 둔 것»과 «표»를 그리는 자리가 이미
빽빽하다.**

그래서 물건을 포기하고 **구조**로 갔다 — 줄 쳐진 판 셋이 선으로 이어진 모양이다.
빈 물건을 찾다 막히면 **그 개념이 물건이 아닐 수도 있다**는 신호다.

**브라우저 창은 사실 셋이다.** `website`(웹사이트)도 창을 쓰는데 빈 페이지에
커서 하나라 이미 갈려 있다 — `web-page`와 87, `homepage`와 83이다. 셋째가
갈린 방식이 힌트다. **창 틀을 버릴 필요는 없고 창 안을 다르게 채우면 된다.**

초록 기판은 `circuit`(회로)도 쓰는데 넉넉히 멀다 — `chip`과 132, `semiconductor`와
124다. 웨이퍼로 옮겨도 그쪽과 부딪히지 않는다.

**고치지 않았다.** `office.json`이 만져지는 중이다.

### 학교 · 몸 · 운동 — 판정 (2026-09-10)

다시 재 보니 **종이 셋 가운데 둘은 이미 갈려 있다.** `permission-slip`
(가정통신문)이 세 겹으로 접혀 가방 주머니에 꽂힌 모양으로 바뀌면서
`paperclip`과 106, `exam-paper`와 94가 됐다. 「셋이 서로 붙는다」는 낡은 말이다.

남은 셋을 판정한다. **개념은 셋 다 옳다.** 문제는 저마다 다르다.

| 쌍 | 거리 | 무엇이 문제인가 | 옮길 쪽과 갈래 |
| --- | ---: | --- | --- |
| ~~`school/paperclip`(클립)<br>`school/exam-paper`(시험지)~~ | 54 → **122** | 클립 그림이 **종이 두 장을 물고 있어** 화면을 종이가 차지했다 | **끝냈다 (2026-09-21)** — 종이를 빼고 클립 하나만 비스듬히 두니 54가 122가 됐다 |
| ~~`body/cornea`<br>`body/retina`~~ | 57 → **115** | 둘 다 **안구 단면**이고 강조한 층만 다르다. 80×80에서는 강조가 안 보인다 | **끝냈다** — 눈 전체가 아니라 **앞쪽만 크게 잘라** 돔이 화면을 채운다. 배율을 바꾸니 구도부터 갈렸다 |
| ~~`sport/cycling`(사이클)<br>`sport/cyclist`(사이클 선수)~~ | 50 → **136** | 둘 다 경주 자전거에 탄 인물 하나를 옆에서 봤다 | **끝냈다** — `cycling`을 여섯이 정면으로 줄지어 오는 무리로. `bicycle` 113 · `marathon` 109 |

**셋 다 «개념이 이웃이라 어쩔 수 없다»가 아니다.** 각막과 망막은 배율로,
사이클과 사이클 선수는 사람 수로 갈린다. 그림에서 **무엇을 화면에 채우는지**를
바꾸면 되는 자리다.

`bicycle`(자전거)은 이미 갈려 있다 — 사람이 없는 물건이라 붙지 않는다.

**고치지 않았다.** `school`·`body`·`sport`가 모두 만져지는 중이다.

## 나머지 넷은 그냥 둔다

`paperclip`↔`permission-slip`, `exam-paper`↔`permission-slip`, `fork`↔`toothbrush`,
`clipboard`↔`name-list`는 짚였지만 물건이 다르다. 종이·손잡이처럼 **구조가
비슷한 갈래**라 걸린 것이고, 카드에서는 갈린다.

## 전체를 다시 훑었다 — 문턱 안 0쌍 (2026-09-09 밤)

그림 6,838장을 기본 문턱(구조 50 · 색 0.20)으로 훑어 **0쌍**이다. 넘겨 둔 넷을
임자가 다 다시 그렸고, 그 뒤로 문턱 안에 들어온 것이 없다.

훑기가 도는지는 넘긴 쌍을 직접 재서 확인했다 — `pnpm twins --pair`로 46→122,
49→125, 49→112, 48→105. **0쌍은 도구가 멈춘 것이 아니라 자리가 빈 것이다.**

**29회차를 넣고 다시 훑었다 (그림 6,895장).** 기본 문턱에서 여전히 0쌍이고,
늦춰도 79 → 80쌍으로 하나만 늘었다. 그 사이 그림이 쉰일곱 장 늘었는데
**새로 들어온 열다섯은 늦춘 문턱에서도 한 쌍에도 안 낀다.** 소품 겹침을
그림 뽑기 전에 일곱 자리 고친 값이다.

### 늦춰 보면 여든 쌍인데 거의 다 헛일 (허브는 그 뒤 고쳤다)

65 · 0.32까지 늦추면 여든 쌍이 나온다. 색까지 가까운 열여덟을 한 장에 붙여
눈으로 보니 **진짜는 다섯 안팎**이다. 문턱을 여기로 옮기지 않는 이유다.

걸리는 것은 닮은 쌍이라기보다 **허브 그림**이다. 한 slug가 여러 쌍에 거듭 나온다.

| slug | 짝 수 | 무엇이길래 |
| --- | ---: | --- |
| `exam-paper` | 7 | 줄 쳐진 종이 한 장 |
| `projector-screen` | 6 | 미색 바탕의 흰 직사각형 |
| `compass` | 5 | 초록 테 두른 둥근 판 |
| `blank-space` · `approximate` | 4 | 빈 네모 · 손그림 윤곽선 |

**바탕에 가까운 그림일수록 아무하고나 붙는다.** `projector-screen`은 구름·좌표축
·발찌·플루트와 짝지어 나오는데 그중 겹치는 것은 없다. 문턱을 늦추면 이런 줄이
불어나 진짜를 덮는다.

### 허브 넷을 눈으로 갈랐다 (2026-09-09) — 둘은 그 뒤 고쳤다

허브 아홉 중 시계 무리 다섯을 뺀 넷을 짝과 함께 한 장에 붙여 봤다.
**넷이 같은 병이 아니다.**

| 허브 | 왜 여러 쌍에 나오나 | 손댈 곳 |
| --- | --- | --- |
| `school/projector-screen`(스크린) 6쌍 | **바탕이다.** 미색 배경에 큰 흰 면 하나뿐이라 구름·좌표축·발찌·플루트와도 붙는다 | 화면 안을 비워 두지 않는다 — 어두운 방에 빔이 닿아 밝은 사다리꼴이 지는 모양으로 |
| `quality/approximate`(대략의) 4쌍 | **화법이다.** 연필로 한 줄 그은 윤곽선이라 `number/octagon`(팔각형)·`office/outline`(윤곽)과 붙는다. 물건은 다 다른데 선이 같다 | 어림을 선이 아닌 것으로 — 눈금 사이에 멈춘 바늘, 또는 대충 담아 봉우리가 흐트러진 되 |
| `idea/blank-space`(여백) 4쌍 | **너무 비었다.** 작은 빈 사각형 하나라 어떤 종이하고나 붙는다. 다만 개념이 「여백」이라 비어 있는 것이 옳다 | 그대로 두어도 된다. 여백을 **무엇의 여백인지** 보이게 하면 갈린다 |
| `school/exam-paper`(시험지) 7쌍 | **갈래가 크다.** 종이 개념이 많아서지 이 그림이 흐릿해서가 아니다. 체크 표시가 있어 클립·두루마리·유리판과는 눈으로 갈린다 | 손댈 것 없다. 다만 `idea/thesis-claim`(논지)과는 둘 다 세로 종이에 가로줄이라 경계다 |

**짝이 많다고 그 그림이 나쁜 것은 아니다.** 허브 보고는 **어디를 볼지**를
알려 줄 뿐 판정이 아니다.

#### 남은 둘을 다시 판정한다 — 앞의 판정이 틀렸다 (2026-09-10)

위에서 `exam-paper`를 «갈래가 크다, 손댈 것 없다»로, `blank-space`를 «비어
있는 것이 옳다»로 봤다. 넷이 빠지고 둘만 남은 뒤 짝을 다시 읽어 보니
**둘 다 바탕 쪽 병이다.**

무엇을 놓쳤나 — `exam-paper`의 짝 일곱에 **종이가 아닌 것이 둘** 있다.

    58 · 0.21  exam-paper ↔ glass(유리)          유리판 한 장
    59 · 0.19  exam-paper ↔ toilet-paper(휴지)   두루마리

종이끼리 붙는 것이면 유리판과 두루마리가 낄 자리가 없다. 공통점은 갈래가
아니라 **화면을 가득 채운 창백한 직사각형**이다. `projector-screen`과 같은
병이었는데 «종이 개념이 많아서»라는 그럴듯한 설명에 가려 못 봤다.

| 허브 | 고쳐 잡은 까닭 | 갈래 낼 방법 |
| --- | --- | --- |
| `school/exam-paper`(시험지) 7쌍 | 맨 직사각형이 화면을 채운다. 안에 든 줄과 체크는 80×80에서 안 보인다 | **윤곽을 직사각형이 아니게** — 비스듬히 놓고 한 귀퉁이를 접는다. 스크린을 반쯤 내린 것과 같은 수법이다 |
| ~~`idea/blank-space`(여백) 4쌍~~ **끝냈다** | 가운데를 비워 두니 어떤 종이하고나 붙었다. 「여백」이라 비어 있는 것이 옳다고 했지만, **여백은 무엇의 가장자리일 때만 여백이다** | 가운데에 작은 글 덩이를 넣고 **가장자리를 넓게** 비웠다. 짝 넷이 63~105로 벌어졌다 — 처음엔 글이 종이를 가득 채워 여백이 안 보였고, 시트를 보고 다시 뽑았다 |

`exam-paper`↔`paperclip` 54는 [학교 · 몸 · 운동](#학교--몸--운동--판정-2026-09-10)에
적은 대로 **클립 쪽을 옮기면** 함께 풀린다 — 클립이 종이를 물고 있어서다.

**고치지 않았다.** `school`·`idea`가 모두 만져지는 중이다.

#### 넘김 표의 다섯이 다 끝났다 (2026-09-09 밤)

`compass`·`conviction-belief`(둥근 판 무리) · `projector-screen`·`approximate`
(허브) · `door`↔`shabby` · `date`↔`holiday`까지 처리했다.

`holiday`는 달력을 아예 버린 자리다. 「달력 한 장」을 여섯이 나눠 쓰고 있어
(`calendar`·`date`·`month`·`tomorrow`·`lunar-calendar`·`holiday`) 표시만
바꿔서는 또 붙는다. 셔터로 옮기니 달력 다섯과 101~141로 갈렸고, 회색 가로줄
직사각형이 새 바탕이 될까 싶어 흰 판들과도 재 봤다 — `whiteboard` 88 ·
`projector-screen` 122 · `exam-paper`는 구조 66이지만 색이 1.96이라 멀다.

`shabby`는 `wear-out`(닳다, 닳은 구두창)과 겹치지 않게 신발을 피했다 —
109다.

#### 허브 둘을 고쳤다 (2026-09-09 밤)

| 개념 | 전 | 후 |
| --- | --- | --- |
| `school/projector-screen`(스크린) | 벽에 걸린 흰 스크린 | **반쯤만 내려온 스크린** — 나머지는 통에 말린 채다. 통과 레일이 드러나 윤곽이 더는 맨 직사각형이 아니다 |
| `quality/approximate`(대략의) | 연필로 그린 삐뚤한 원 | **눈금 둘 사이에 물이 찬 계량컵** — 어림을 선이 아니라 «딱 안 맞는 높이»로 보인다 |

스크린은 어두운 방에 빔을 쏘는 쪽으로 갈 수 없었다. `city/screening`(상영)이
이미 «어두운 화면에 프로젝터 빔»이라 그쪽으로 가면 그 개념과 붙는다.

짝을 전부 다시 쟀다.

    projector-screen ↔ whiteboard 53 → 114 · cloud 88 · anklet 84 ·
                       coordinate-axes 89 · flute 88
    approximate      ↔ octagon 118 · outline 122 · clean 123 · empty 124 · almost 126

전체 훑기에서 늦춘 문턱의 쌍이 **73 → 63**, 허브가 **넷 → 둘**이 됐다. 남은
둘은 어제 「손댈 것 없음」으로 판정한 `exam-paper`와 `blank-space`다.

### 새로 넘기는 다섯 (전부 내 파일 밖)

**파일 단위 훑기가 못 보는 자리다** — 다섯 다 서로 다른 파일에 걸쳐 있다.
`--file`이 오답을 잘 잡는 것과 별개로, 전체 훑기에는 전체 훑기의 몫이 있다.

| 쌍 | 거리 | 왜 겹치나 | 갈래 낼 방법 |
| --- | ---: | --- | --- |
| 둥근 판 여섯 | 45~65 | 아래 「둥근 판 무리」에 따로 적었다 — 한 쌍이 아니라 **열 쌍으로 얽힌 무리**다 | |
| ~~`everyday/door`(문)<br>`quality/shabby`(허름한)~~ | 63 → **102** | 같은 초록 문이고 한쪽만 페인트가 벗겨졌었다 | **끝냈다** — `shabby`를 문에서 **테가 해지고 정수리에 구멍 난 밀짚모자**로 옮겼다 |
| ~~`office/outline`(윤곽)<br>`quality/approximate`(대략의)~~ | 61 → **122** | **끝냈다** — 둘 다 **한 줄로 그린 손그림 윤곽선**이다. 화법이 같아 물건이 달라도(꽃병·원) 붙는다 | `approximate`는 선이 아니라 **어림**이 보여야 한다 — 눈금 사이에 멈춘 바늘, 또는 물음표가 붙은 저울 |
| ~~`school/projector-screen`(스크린)<br>`office/whiteboard`(화이트보드)~~ | 53 → **114** | **끝냈다** — 둘 다 미색 바탕에 선 흰 직사각형이다. 카드에서는 말아 올리는 축과 마커 받침으로 갈리지만 80×80에서는 안 보인다 | 스크린은 **빛이 비치는 것**으로 — 어두운 방에 빔이 닿은 화면 |
| ~~`time/date`(날짜)<br>`time/holiday`(휴일)~~ | 54 → **101** | 같은 초록 달력이고 표시만 달랐다(동그라미 ↔ 빨간 깃발) | **끝냈다** — `holiday`를 달력에서 **끝까지 내린 가게 셔터**로 옮겼다 |

**내 파일(`scene`)에 든 것은 하나도 없어 손대지 않았다.** 확인한 그날
`content/`는 전부 깨끗했지만(만져지는 파일 0), 넘긴 것은 넘긴 채로 둔다
([nets.md](nets.md)).

### 둥근 판 무리 — 여섯이 열 쌍으로 얽힌다 (그 뒤 고쳤다)

`twins`의 허브 보고가 짚었다. 한 쌍씩 읽으면 «비슷한 물건이려니» 하고 넘어가는데,
모아 놓으면 **여섯이 같은 몸통을 나눠 쓰고 있다.**

| 거리 | 쌍 |
| ---: | --- |
| 45 · 0.31 | `compass` ↔ `steering-wheel` |
| 51 · 0.27 | `compass` ↔ `tide-clock` |
| 53 · 0.29 | `quarter-to` ↔ `tide-clock` |
| 54 · 0.23 | `compass` ↔ `conviction-belief` |
| 55 · 0.26 | `conviction-belief` ↔ `steering-wheel` |
| 57 · 0.27 | `clock` ↔ `hour` |
| 59 · 0.19 | `clock` ↔ `compass` |
| 59 · 0.25 | `clock` ↔ `quarter-to` |
| 64 · 0.16 | `compass` ↔ `quarter-to` |
| 65 · 0.31 | `conviction-belief` ↔ `tide-clock` |

프롬프트를 나란히 놓으면 **누가 끼어든 것인지 바로 보인다.**

| 개념 | 프롬프트 |
| --- | --- |
| `time/clock`(시계) | one round wall clock … two simple hands |
| `time/quarter-to`(십오 분 전) | one clock face with the hands set at forty-five minutes past |
| `time/hour`(시간) | one round clock face with a wide wedge … shaded in |
| `time/tide-clock`(조석 시계) | one round dial with a single hand and a wave symbol |
| `transport/steering-wheel`(운전대) | one round steering wheel with three spokes |
| `travel/compass`(나침반) | one round compass … single needle pointing up and four simple marks |
| `idea/conviction-belief`(신념) | **one compass** with its needle held firmly on one bearing |

**시계 넷이 서로 닮는 것은 그 파일의 설계 문제다.** `clock`·`quarter-to`·
`hour`·`tide-clock`은 전부 `time.json`에 있고 넷 다 시계 얼굴을 쓸 이유가
있다. 그건 그 파일을 만지는 사람이 한 번에 볼 일이다.

**먼저 비켜야 하는 것은 밖에서 끼어든 둘이다.**

- `idea/conviction-belief`(신념)이 프롬프트에 **`one compass`라고 그대로 적었다.**
  `travel/compass`의 몸통을 빌린 자리라 `pnpm props`가 잡았어야 했다. 신념은
  나침반 없이 그린다 — 폭풍에도 선 깃대, 또는 깊이 박혀 흔들리지 않는 말뚝.
- `travel/compass`(나침반)는 시계 얼굴과 갈려야 한다. 둥근 판에 바늘 하나면
  `clock`과 59다. 뚜껑을 젖힌 놋쇠 나침반을 손바닥 위에 놓거나, 판을 팔각으로
  깎아 시계와 윤곽부터 다르게 한다.

### 고쳤다 (2026-09-09 밤) — 무리가 풀렸다

`travel`과 `idea`가 동시에 빈 틈을 `pnpm pending --free`가 알려 줘서 둘을
고쳤다. 세 번 막혔던 자리다.

| 개념 | 전 | 후 |
| --- | --- | --- |
| `travel/compass`(나침반) | one round compass … single needle pointing up | **네모난 오리엔티어링 나침반 판** — 둥근 테를 버리니 시계 무리와 윤곽부터 갈린다 |
| `idea/conviction-belief`(신념) | **one compass** with its needle held firmly | **기운 벽 옆에 곧게 드리운 다림줄** — 나침반을 아예 뺐다 |

여덟 쌍을 다시 쟀다. 전부 **122~143**으로 늦춘 문턱(65) 밖이다.

    compass ↔ clock 138 · quarter-to 133 · tide-clock 142 · steering-wheel 128
    conviction-belief ↔ compass 143 · tide-clock 123 · steering-wheel 127 · pendulum 122

전체 훑기도 따라 움직였다 — 늦춘 문턱의 쌍이 **80 → 73**, 허브가 **아홉 →
넷**이 됐다. 시계 무리 다섯이 통째로 목록에서 빠졌다. 남은 것은 `time.json`
안쪽 셋뿐이다(`quarter-to`↔`tide-clock` 53 · `clock`↔`hour` 57 ·
`clock`↔`quarter-to` 59). **그건 그 파일의 몫이다** — 넷 다 시계 얼굴을 쓸
이유가 있고, 밖에서 끼어든 둘이 비키니 나머지는 서로만 남았다.

`cracked`(금 간)↔`plate`(접시)도 같은 날 끝냈다. `food`는 만져지는 중이었지만
**고칠 쪽은 빌린 쪽**이라 `quality`만 있으면 됐다 — 접시는 손대지 않았다.
`cracked`를 접시에서 **금 간 돌 보도블록**으로 옮기니 64 → **118**이 됐고,
이웃과도 다 멀다(`notice-spot` 117 · `drought` 120 · `broken` 108 · `tile`
113). 셋 다 금이 든 그림이라 함께 쟀다.

이로써 「남의 몸통을 빌린 쌍」이 **0**이 됐다.

**이 자리를 도구가 스스로 짚게 했다.** `pnpm twins`가 이제 「남의 몸통을 빌린
쌍」을 따로 낸다 — `conviction-belief가 «compass»를 그립니다 — 임자 compass`.
같은 잣대로 하나가 더 나왔다: `quality/cracked`(금 간)가 `food/plate`(접시)를
그린다(64 · 0.25).

`steering-wheel`(운전대)은 정당하다 — 살 셋이 뚜렷해 사람 눈으로는 갈린다.
나침반이 비키면 45와 55가 함께 풀린다.

**세 번 시도했고 세 번 다 막혔다.** 2026-09-09에 `travel`·`idea`·`transport`가
번갈아 ⟨손대는 중⟩이었다. 그래서 고치지 않고 여기 적어 둔다.

## 이 목록은 어떻게 다시 만드나

```bash
pnpm twins            # 구조 50 · 색 0.20 (실측값, scripts/twins.ts)
pnpm twins --sheets   # 쌍을 한 장에 여섯씩 붙여 준다
```

**twins가 못 잡는 자리도 있다.** 같은 물건을 다른 구도로 그리면 구조가 벌어진다 —
`database`와 `server`가 둘 다 서버 랙인데 59다. 그건 `pnpm props`가
프롬프트로 잡는다. 두 도구의 담당이 다르다.

## 배치가 남의 자리에 그림을 넣었다 — `session-count`

2026-09-13. `pnpm genimg`으로 요음용 일곱 장을 뽑는 동안 **다른 세션이 같은
`.images/`에서 동시에 그림을 뽑고 있었다.** 끝나고 중복 검사가 걸렸다.

```
경고 — 같은 그림이 여러 slug에 들어갔다: gap-disparity.png session-count.png
```

두 파일은 2초 차이로 찍혔고 바이트가 같다. 프롬프트는 전혀 다르다.

| slug | 프롬프트 | 파일에 든 그림 |
|---|---|---|
| `gap-disparity`(격차) | 높이가 다른 동전 더미 둘 | **동전 더미** — 맞다 |
| ~~`session-count`(회)~~ **임자가 끝냈다** | 벽에 걸린 같은 현수막 여러 장 | 그때는 **동전 더미** — 틀렸다 |

**틀린 쪽은 `session-count`다.** 내 그림이 그 자리에 들어갔다. 내가 만든
개념이 아니라 손대지 않았다 — `.images/session-count.png`를 지우고 다시
뽑으면 된다. `public/concepts/session-count.webp`는 아직 없어서 앱에는
새어 나가지 않았다.

**끝났다 (2026-09-17 확인).** 임자가 다시 뽑았다. 두 `.webp`가 다 있고
md5가 다르며 `twins --pair session-count gap-disparity`는 구조 133 · 색
1.715다 — 문턱에서 멀다.

**`pnpm genimg`을 동시에 돌리지 않는 것이 유일한 예방이다.** 스크립트가
slug마다 임시 디렉터리를 나눠 두는데도 이 사고는 난다고 그 파일 주석이
이미 적어 두었다(scripts/genimg.sh). 이번은 **프로세스가 아니라 세션이**
둘이었다.

## 저울이 스물둘이다 — 열다섯은 저울이 아니어야 한다 (2026-09-21)

새 그림 스물넷을 넣고 전체를 훑었다. 기본 문턱(구조 50 · 색 0.20)에서 잡힌
것은 **한 쌍뿐**이고(`calendar-august`↔`calendar-september`) 새 그림은 하나도
안 걸렸다. 문턱을 62 · 0.26으로 늦추니 서른여덟 쌍이 나왔는데 **거기서도 새
그림은 없었다.**

대신 **허브가 하나 새로 떴다.** `supply-and-demand`가 셋과 붙는다.

    supply-and-demand(수급) ↔ saying-it-as-it-is(있는 그대로 말하다) ·
                              worth-it(~할 만한) · whether(~인지)

넷을 붙여 보니 **넷 다 저울**이다. 짐만 다르다(낟알 · 사과 · 동전 · 꾸러미).
80×80에서는 그 차이가 사라진다.

`pnpm props balance`를 돌리니 **스물둘**이 나왔다. 그물은 있었고 아무도 이
낱말로 돌리지 않았을 뿐이다.

**일곱은 저울이 맞다.** 저울이 곧 그 물건이다.

    number/kitchen-scale · number/postal-scale · number/catty ·
    number/vernier-scale · travel/baggage-allowance · scene/weight-check ·
    food/calorie-content

**열다섯은 저울일 이유가 없다.** 뜻이 추상이라 프롬프트가 저울로 도망친 자리다.

| 파일 | 개념 | 뜻 |
| --- | --- | --- |
| idea | `supply-and-demand` · `value-worth` · `justice` · `worth-it` · `work-out-what-they-mean` · `as-the-money-goes` | 수급 · 가치 · 정의 · ~할 만한 · 미루어 헤아리다 · 돈 쪽으로 |
| quality | `whether` · `fair-and-just` · `fit-to-receive-it` · `dear-to-pay-for` | ~인지 · 공정한 · 받을 만한 · 값이 많이 드는 |
| office | `saying-it-as-it-is` · `weighty-enough-to-tip-the-scale` | 있는 그대로 말하다 · 한쪽으로 판가름하다 |
| city | `the-market-worth-of-it` · `a-wrong-that-was-done` | 저자에서 매겨진 값 · 부당함 |
| job | `lawyer` | 변호사 |

#### 여섯을 옮겼다 — 22 → 16 (2026-09-21)

파일이 다 열려 있어 그 자리에서 여섯을 줍었다.

| 개념 | 옮긴 그림 |
| --- | --- |
| ~~`idea/supply-and-demand`~~ | 문 연 곳간과 빈 수레 |
| ~~`idea/value-worth`~~ | 검은 천 위의 확대경과 돌 하나 |
| ~~`idea/worth-it`~~ | 모루 위의 망치와 다 된 편자 |
| ~~`idea/work-out-what-they-mean`~~ | 눈 위의 발자국이 닫힌 문으로 |
| ~~`quality/fair-and-just`~~ | 꼭 수평인 시소 |
| ~~`city/a-wrong-that-was-done`~~ | 상다리 하나에 박힌 쐐기 |

**몸통은 `pnpm props`로 고르고 썼다.** 처음 고른 열두 낱말 가운데 **아홉이
이미 남의 몸통**이었다(bowl · purse · envelope · medal · fish · signpost ·
cake · crate · hanger). 저울 무리를 만든 것과 똑같은 실수를 되풀이할 뻔했다 —
빈 낱말을 다시 찾아 granary · loupe · anvil · footprints · seesaw · wedge로
갔다.

**둘은 저울을 그대로 둔다.** `justice`(정의)는 저울이 그 개념의 표상이고,
`weighty-enough-to-tip-the-scale`(한쪽으로 판가름하다)은 저울이 곧 그
관용구다. `fair-and-just`는 `justice`와 「수평인 저울」로 겹쳐서 옮겼다.

#### 남은 일곱도 옮겼다 — 저울 22 → 10 (2026-09-21)

「자리를 못 찾았다」고 넘겨 둔 일곱을 `pnpm pending --free`가 열려 있다고
알려 줘 그 자리에서 끝냈다. **빈 낱말을 먼저 열둘 거르고 골랐다** — 후보
가운데 dice · receipt · lectern · auction · trophy · hourglass · funnel ·
cushion · wreath · dial · gauge · keyhole · basket · awning이 이미 남의
몸통이었고, 남은 것으로 갔다.

| 개념 | 뜻 | 옮긴 그림 |
| --- | --- | --- |
| `quality/whether` | ~인지 | 빈 상 위에서 아직 도는 팽이 |
| `quality/fit-to-receive-it` | 받을 만한 | 곁에 선 항아리 밑동 꼴로 파인 빈 주춧돌 |
| `quality/dear-to-pay-for` | 값이 많이 드는 | 놋 물꼭지에서 동전이 쏟아져 넘치는 들통 |
| `idea/as-the-money-goes` | 돈 쪽으로 | 화살이 동전 무더기 쪽으로 돌아간 바람개비 |
| `office/saying-it-as-it-is` | 있는 그대로 말하다 | 벽에 곧게 드리운 다림줄 |
| `city/the-market-worth-of-it` | 저자에서 매겨진 값 | 저자 광주리에 기댄 빈 석판과 동전 |
| `job/lawyer` | 변호사 | 걸개에 걸린 검은 법복과 끈으로 묶인 서류 뭉치 |

    pnpm props balance   그림에 나온 것 22 → 10

남은 열은 저울이 맞는 일곱에 `justice` · `sense-of-proportion` ·
`weighty-enough-to-tip-the-scale`가 더해진 것이다. 셋 다 저울이 곧 그
개념이라 그대로 둔다.

저울 허브와 맞대 재니 다 멀다 — `whether`↔`supply-and-demand` 133 ·
`lawyer`↔`justice` 113 · `as-the-money-goes`↔`justice` 125다.

**옮긴 여섯은 임자가 이미 다시 뽑아 두었다.** 곳간과 빈 수레 · 확대경과 돌 ·
모루와 편자 · 눈 위 발자국 · 수평인 시소 · 쐐기로 기운 상이 다 들어 있다.

내 파일이 아니라 넘긴다. 고칠 때는 [IMAGE_STYLE](../IMAGE_STYLE.md)의 「장면을
찾는 다섯 수」를 쓴다 — 저울은 「견주다」의 그림이지 「수급」의 그림이 아니다.

**달력 무리는 흠이 아니다 (판정).** `calendar-*` 열둘이 같은 판에 머리띠 색만
다르다. 늦춘 문턱에서 `4월`↔`5월`(58 · 0.08) · `2월`↔`3월`(59 · 0.24)도 나온다.
**갈래는 머리띠의 한글이 낸다** — 학습자는 「8월」과 「9월」을 글자로 읽는다.
다시 훑을 때 이 쌍들은 건너뛴다. 다만 8·9·10월이 다 붉은 계열이라 색을 벌리면
더 낫다.

## 한글로 가르는 무리 셋 — 재 보니 걸리는 것은 달력 한 쌍뿐이다 (2026-09-21)

나라 이름·주의자·달 이름처럼 **그릴 것이 없는 낱말**은 임자가 한글을 그림에
넣는 길을 골랐다(「글자를 뜻으로 삼는 낱말」, [IMAGE_STYLE](../IMAGE_STYLE.md)).
같은 판에 색과 한글만 다르므로 `pnpm twins`가 죄다 짚을 줄 알았다.

| 무리 | 수 | 생김새 | 그린 것 |
| --- | ---: | --- | ---: |
| 달력 | 12 | 머리띠에 「8월」 · 빈 날짜 칸 | 12 |
| 기 | 16 | 장대의 세모꼴 기에 「러시아」, 네모꼴에 「러시아 국민」 | 16 |
| 이름패 | 12 | 선 나무패에 「공산주의자」 | 4 |

**틀렸다. 다 그려 놓고 재니 걸리는 것은 달력 한 쌍뿐이다.**

    pnpm twins --file travel   기 열여섯을 포함해 340장 — 0쌍
    pnpm twins --file city     이름패 넷을 포함해 652장 — 0쌍
    pnpm twins                 9699장 — 1쌍 · calendar-august ↔ calendar-september

앞서 「다 그리면 이백쉰 쌍」이라고 적었는데 **틀린 계산이었다.** 문턱은
구조 50 **그리고** 색 0.20이고, 둘 다 가까워야 걸린다. 기와 이름패는 색이
넉넉히 벌어져 있다.

    of-china        ↔ of-spain        구조 33 · 색 0.346   색이 멀다
    of-russia       ↔ of-siberia      구조 43 · 색 0.397   색이 멀다
    of-moscow       ↔ of-the-soviets  구조 27 · 색 0.241   색이 멀다
    a-communist-person ↔ a-patriot-person 구조 93 · 색 0.358  둘 다 멀다
    calendar-august ↔ calendar-september 구조 31 · 색 0.15  **둘 다 가깝다**

**임자가 색을 벌려 둔 것이 실제로 듣는다.** 기는 열여섯을 서로 다른 색으로
주었다 — 자주·잿빛·감청·주황·황토·쑥·붉은흙·분홍·연하늘·올리브·고동·청록.
그 덕에 한 쌍도 안 걸린다. 달력만 8월 주황 · 9월 붉은흙 · 10월 고동으로 셋이
다 붉은 계열이라 8월과 9월이 붙었다.

**꼴을 바꾼 것도 듣는다.** 같은 색을 쓰는 `of-siberia`와 `a-man-of-siberia`가
82인데, 하나는 세모꼴 기이고 하나는 네모꼴이다.

### 8월 머리띠를 옮겼다 — 이제 9699장에 0쌍 (2026-09-21)

달력 8월만 고쳤다. **주황(terracotta orange) → 황금빛(deep amber gold).**

고르기 전에 8월이 구조로 누구와 가까운지 먼저 셌다. 50비트 이하는 넷뿐이다 —
1월 44(파랑) · 3월 33(쑥) · 4월 27(이끼) · 11월 48(자주). **노랑·황토 쪽은
6월 63 · 7월 61 · 10월 53으로 다 구조 50 밖이라 비어 있다.** 그래서 8월을
7월 쪽으로 밀어도 새 쌍이 안 생긴다. 반대로 붉은 쪽으로 밀면 구조 31인 9월에
더 붙는다.

    8월 ↔ 9월   구조 31 · 색 0.154   →   구조 60 · 색 0.252
    pnpm twins  9699장 — 1쌍          →   9699장 — 0쌍

**색바퀴는 그대로다.** 7월 겨자 → 8월 황금 → 9월 붉은흙 → 10월 고동으로
여름에서 가을로 가는 차례가 살아 있다.

**머리띠를 옅게 하는 길은 막혀 있다.** 달 이름이 흰빛(off-white)으로 띠 위에
얹히므로 띠가 옅어지면 글자가 사라진다(「같은 빛깔끼리 겹치면 그 물건은 없는
것이 된다」, IMAGE_STYLE). 밝기가 아니라 **빛깔로** 벌려야 한다.

다시 뽑으면 구조도 같이 흔들린다 — 8월과 다른 열하나의 구조가 27~66에서
59~104로 죄다 올랐다. 판이 같아도 새로 뽑은 그림은 스프링과 칸 선이 달라진다.
**색만 바꿀 셈이어도 구조는 덤으로 바뀐다고 보아야 한다.**

## 옷 아흔 장에서 뽑기 전에 걸러낸 다섯 (2026-09-21)

`clothes`의 그림 빚 90에서 열다섯을 뽑으려고 몸통을 먼저 셌다. **그림이 아직
없으니 `twins`로는 못 잰다** — 프롬프트를 나란히 놓고 읽어서만 보인다. 뽑고
나서 재면 이미 늦다(「몸통을 먼저 세면 되돌리지 않는다」, IMAGE_STYLE).

**내가 만든 개념이 아니라 고치지 않고 넘긴다.**

### 판이 아예 같은 둘

    worn-down-to-the-weave  옷이 해지다  an elbow patch of cloth gone thin enough
                                        to show the weave beneath, seen from above
    threadbare              해진        an elbow patch of cloth worn so thin the
                                        weave shows through

같은 팔꿈치, 같은 「올이 비쳐 보이는 천」, 같은 눈높이다. 낱말만 다르다.
하나는 움직씨(해지다)이고 하나는 그림씨(해진)라 개념은 둘일 만하지만 그림은
갈라야 한다 — 이를테면 하나는 해지는 중을, 하나는 다 해진 뒤를 보인다.

    bleach          표백제    a capped plastic bottle standing beside a white folded towel
    fabric-softener 섬유유연제  a squat bottle beside a folded towel with steam lines above

병 하나에 갠 수건 하나로 같다. 김 선 말고는 다른 것이 없다.

### 남이 이미 쓰는 몸통 셋

    put-thread-through-it  실을 꿰다  a needle held upright with a thread end just
                                     entering its eye
    needle(바늘) ← 이미 그렸다      one sewing needle standing upright with a short
                                     thread through its eye

바늘을 세우고 실이 귀에 걸린 그림이다. 「꿰는 중」과 「꿴 뒤」인데 판이 같다.

    lose-a-button  단추가 떨어지다  a single button lying on the floor beside a
                                  loose thread end

몸통 `button`은 개념 `button`(단추)과 `it-is`(이다)가 이미 쓴다. `it-is`는
「단추 하나가 제 구멍을 뚫고 나온 것」이라 낱개 단추로 맞선다.

    take-it-off-again       벗어 내리다  one coat taken down from a hook with the
                                       hook left bare
    on-the-peg-by-the-door  옷을 걸다   a coat settling onto a wooden peg by a door
                                       with an empty peg beside it

서로 거울상인 데다, **외투가 걸이 고리에 걸린 그림은 이미 열여덟이고,
옷걸이·봉까지 세면 스물둘이다** —
`hang` · `hang-suspended` · `someone-or-other` · `while-still-alive` ·
`coat-check` · `try-on` · `mind-about` · `holding-oneself-in-regard` 따위다.
2026-09-21의 `390ba387`이 바로 이 자리에서 한 번 겹쳐 옮긴 그림이다.
이 둘은 걸이를 몸통에서 빼야 한다.

### 옷에서 거울상을 일곱 더 골라냈다 (2026-09-21)

열다섯을 더 뽑으려고 남은 일흔다섯을 훑었다. **아직 그림이 없어 `twins`로는
못 잰다** — 프롬프트를 나란히 놓고 읽어서만 보인다. 앞의 다섯과 같은 까닭으로
고치지 않고 넘긴다.

    take-the-measurements  사이즈를 재다  a soft tape measure looped around the
                                        waist of a dress form
    chest-measurement      가슴둘레      a tape looped around the chest of a
                                        dress form

허리냐 가슴이냐만 다르다. 줄자를 두른 자리를 눈으로 가릴 수 있게 하거나,
하나는 줄자에 적힌 눈금을 몸통으로 삼아야 한다.

    fit-it-to-the-body  몸에 맞추다  a jacket on a dress form with pins along the
                                   side seam taking it in
    take-it-in          품을 줄이다  a shirt on a form with both side seams pinned
                                   inward

윗도리냐 셔츠냐만 다르고 둘 다 폼에 시침핀을 옆선에 꽂았다.

    how-it-sits-on-you  옷맵시     a jacket on a dress form with its shoulders and
                                 hem falling in a clean line
    smart-looking       맵시 있는   a jacket on a form with clean shoulder lines and
                                 a folded pocket square

주머니 수건 하나가 다르다.

    stretch-out-of-shape  옷이 늘어나다  a knitted jumper on a wire hanger with a
                                      sagging wide neckline
    stretched-at-the-neck 목이 늘어난   a t-shirt on a hanger with a wide slack collar

    put-clothes-on-them  입혀 주다   one small coat spread open over the back of a chair
    bedraggled           후줄근한    a rumpled damp overcoat draped over the back of
                                   a wooden chair

    fold-the-bottom-edge  단을 접다   a trouser leg with its lower edge turned up
                                    twice and pinned
    let-down-the-hem      단을 내리다  a trouser hem unpicked and folded open with a
                                    faint old crease line

접는 것과 내리는 것은 반대 움직임인데 그림은 같은 바짓단이다.

    pass-them-to-the-next-child  옷을 물려주다  three coats of the same cut in three
                                             sizes hanging in a row
    off-the-peg                  기성복       a rail of identical jackets in graded sizes

**옷에서 몸통이 포화된 자리 넷.** 다음 사람이 다시 셀 일이 없게 적어 둔다.

| 몸통 | 그린 것 | 비고 |
| --- | ---: | --- |
| 외투 + 걸이 고리 | 18 | 옷걸이·봉까지 세면 22 |
| 드레스폼 | 8 | 그 가운데 다섯이 윗도리다 |
| 줄자 | 5 | 넷이 폼과 같이 나온다 |
| 바지 | 5 | 단·무릎·밑위가 다 같은 판이다 |

이 넷에 새 그림을 얹으려면 몸통을 옮기고 시작한다.

### 탈것에서 거울상 여섯 무리를 골라냈다 (2026-09-21)

`transport`의 그림 빚 89에서 열다섯을 뽑으려고 몸통을 셌다. **아직 그림이
없어 `twins`로는 못 잰다** — 프롬프트를 나란히 놓고 읽어서만 보인다.
내가 만든 개념이 아니라 고치지 않고 넘긴다.

| 무리 | 개념 | 그림 |
| --- | --- | --- |
| 줄 선 차 | `the-road-is-choked`(길이 막히다) · `congested`(막히는) · `nose-to-tail`(차가 밀리는) · `crawl-along`(서행하다) | 넷 다 「줄지어 선 차」다. 둘은 위에서 본 것까지 같다 |
| 연료계 | `run-out-of-fuel`(기름이 떨어지다) · `economical-on-fuel`(연비가 좋은) | 바늘이 빈 눈금이냐 가득이냐만 다르다 |
| 계기판 화면 | `turn-on-the-sat-nav`(내비게이션을 켜다) · `route-guidance`(경로 안내) | 둘 다 계기판의 작은 화면에 길 선 하나다 |
| 좌석 패 | `seat-number`(좌석 번호) · `seat-reservation`(좌석 예약) | 둘 다 기차 좌석 위의 작은 패다 |
| 주차 칸 | `pull-in-and-park`(차를 대다) · `reverse-into-a-space`(후진 주차하다) | 둘 다 그은 두 줄 사이의 차다 |
| 노선 판 | `through-service`(직행) · `stopping-service`(완행의) · `service-interval`(배차 간격) | 셋 다 점과 선이 그려진 판이다 |
| 수레 | `let-them-out-here` · `bring-it-to-the-kerb` · `the-seat-behind` · `shift-the-cart-aside` | 넷 다 수레를 옆에서 봤다 |

**하나는 뽑기 전에 고쳤다.** `going-without-a-ticket`(무임승차)이 개념
`turnstile`(개찰구)과 같은 물건을 같은 눈높이로 봤다. 몸통을 개찰구에서
**표 넣는 홈**으로 옮기고 위에서 내려다보게 하니 구조 126이 나왔다.

#### 다섯 무리를 더 골라냈다 — 탈것의 거울상은 모두 스물넷이다 (2026-09-21)

열다섯을 더 뽑으려고 남은 일흔넷을 다시 훑었다. 앞의 여섯 무리에 다섯이 더
붙는다.

| 무리 | 개념 | 그림 |
| --- | --- | --- |
| 깜빡이 | `hazard-lights`(비상 깜빡이) · `put-the-indicator-on`(깜빡이를 켜다) | 둘 다 차 모서리에 켜진 주황 등이다 |
| 떠나는 차 | `miss-the-stop`(정류장을 지나치다) · `refusing-a-fare`(승차 거부) | 둘 다 「떠나 버리는 차」다 |
| 길바닥 표시 | `hard-shoulder`(갓길) · `centre-line`(중앙선) · `one-way-street`(일방통행) · `tow-away-zone`(견인 지역) · `icy-stretch`(결빙 구간) | 다섯 다 「선이 그어진 길바닥」이다 |
| 역 시계 | `it-comes-in-behind-time`(연착하다) · `last-service-time`(막차 시간) | 둘 다 승강장의 시계다 |
| 길 위의 지도 | `ask-which-way-to-go`(길을 묻다) · `reroute`(경로를 바꾸다) · `take-a-wrong-turn`(길을 잘못 들다) | 셋 다 「갈림길과 지도」다 |

**한 쌍은 파일 밖과 붙는다.** `waiting-queue`(대기 줄)가 개념 `queue`(줄을
서다)와 같은 「한 줄로 선 사람들」이다. 이번 회차에서 빼고 `refusing-a-fare`로
바꿨다.

**뽑아서 재 보니 가장 가까운 것이 89다.** `hoist-the-sail`(돛을 올리다)이
개념 `sail`(항해하다)과 구조 89 · 색 0.738인데, 둘 다 돛 올린 배다. 문턱
밖이지만 이 무리에서 제일 가깝다 — 임자가 갈라야 한다면 여기다.
