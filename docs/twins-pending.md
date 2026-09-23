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

---

## 2026-09-21에 넘긴 백쉰일곱 — 고치는 법으로 갈랐다

여섯 축(`clothes` · `transport` · `city` · `quality` · `office` · `school`)에
그림을 백서른여섯 장 넣으면서, **뽑기 전에** 몸통을 세어 걸러 낸 것들이다.
**백쉰다섯이 아직 안 그려졌다** — 지금이 고치기 가장 싼 때다. 아래 문단들에
낱낱이 적혀 있고, 여기서는 **무엇을 해야 하는지로만** 묶는다.

### ① 몸통을 뺏겼다 — 옮겨야 산다 (**열일곱을 다 끝냈다, 2026-09-22**)

**2026-09-21에 여덟을 옮겼다.** 아래 표에서 취소선이 그것이다. 새 몸통은
`pnpm props`로 빈 낱말을 찾아 골랐고, 뺏겼던 임자와 다시 재서 확인했다.

    lose-a-button(단추가 떨어지다)   실밥만 남은 앞섶   ↔ button   구조 100
    set-on-being-free(자유를 좋아하는) 끊긴 고삐 말뚝    ↔ cage     구조 104
    drop-bombs-on-it(폭탄을 떨구다)   떨어지는 통 셋    ↔ crater   구조 119
    made-of-silk-cloth(비단의)      채반의 고치와 실   ↔ silk     구조 121
    all-told-together(통틀어)       세 곡식을 한 자루에 ↔ calculate 구조 117
    waiting-queue(대기 줄)          늘어선 빈 접의자   ↔ queue    구조 137
    put-them-low-before-all(업신여겨…) 바닥에 놓인 사발  ↔ cushion  구조 121
    the-gist-drawn-together(간추린 말) 검불 날린 키      ↔ funnel   구조 120

**한 번은 그물이 막았다.** `having-the-knack`(능숙함)을 「끊기지 않은 대팻밥」
으로 옮기려 했는데, `a-rare-skill-of-ones-own`(뛰어난 재주)이 **똑같이** 그
그림이었다. 뜻까지 이웃이라 옮기나 마나였다. `silk-cloth`(명주)도 두루마리로
가려다 `fabric-roll`(원단)이 이미 그 그림이라 그만두었다.

**남은 아홉은 아직 자리를 못 찾았다** — 빈 몸통 후보가 죄다 남의 것이다.



다른 개념이 **이미 그 물건의 임자**다. 그대로 뽑으면 카드 둘이 같은 그림이 된다.

| 개념 | 뺏긴 몸통 | 임자 |
| --- | --- | --- |
| `clothes/put-thread-through-it`(실을 꿰다) | 실 꿴 바늘 | 개념 `needle`(바늘) |
| ~~`clothes/lose-a-button`(단추가 떨어지다)~~ | 낱개 단추 | **끝냈다** — 실밥만 남은 앞섶 |
| `clothes/take-it-off-again`(벗어 내리다) · `on-the-peg-by-the-door`(옷을 걸다) | 걸이의 외투 | 이미 열여덟 장 |
| ~~`transport/waiting-queue`(대기 줄)~~ | 한 줄로 선 사람 | **끝냈다** — 늘어선 빈 접의자 |
| ~~`city/set-on-being-free`(자유를 좋아하는)~~ | 처마에 걸린 새장 | **끝냈다** — 끊긴 고삐 말뚝 |
| `city/from-up-top`(위쪽에서) | 지붕 끝 홈통 | 개념 `gutter`(빗물받이) |
| ~~`city/drop-bombs-on-it`(폭탄을 떨구다)~~ | 둥근 구덩이 | **끝냈다** — 떨어지는 통 셋 |
| ~~`city/put-them-low-before-all`(업신여겨 낮추다)~~ | 바닥의 방석 | **끝냈다** — 바닥에 놓인 사발 |
| ~~`city/made-of-silk-cloth`(비단의)~~ · `clothes/silk-cloth`(명주) | 윤나는 접힌 천 | 앞엣것 **끝냈다** — 채반의 고치와 실. 명주는 `fabric-roll`(원단)과 겹쳐 아직 |
| ~~`office/all-told-together`(통틀어)~~ | 한쪽으로 민 주판알 | **끝냈다** — 세 곡식을 한 자루에 |
| `office/pin-it-down-exactly`(잡아 정하다) | 도면 위 컴퍼스 | 개념 `dividers`(제도 컴퍼스) |
| `office/by-wire-and-current`(전자로) | 꽂힌 플러그 | `plug-in`(꽂다) · `unplug`(뽑다) |
| `school/having-the-knack`(능숙함) | 물레 위의 손 | 개념 `potter`(도예가) |
| `school/the-art-of-painting`(그림 그리는 일) | 이젤과 팔레트 | 개념 `easel`(이젤) · `artist`(화가) |
| ~~`school/the-gist-drawn-together`(간추린 말)~~ | 깔때기 | **끝냈다** — 검불 날린 키 |

**먼저 `pnpm props <낱말>`로 빈 몸통을 찾는다.** 목록의 `그림` 줄까지 봐야
한다 — 「다른 개념이 제 몸통으로 쓰는 낱말」 요약 줄만 보면 놓친다
([다림줄 자리](#다림줄은-이미-아홉이었다--내가-열을-만들었다-2026-09-21)).

### ② 같은 물건 집안 — 장치를 하나씩 달리 주면 된다 (쉰넷 → **끝났다, 2026-09-22**)

**②는 닫혔다.** 도장 여덟 · 땅에 박힌 기둥 여덟 · 장부 여섯 · 길바닥 다섯 ·
알림판 넷 · 바퀴 넷 · 열쇠 일곱 · 돌기둥 셋 · 활자 셋 · 노선 판 셋 · 안경 둘 ·
렌즈 둘 · 계기판 둘을 다 갈랐다. 아래 표는 **어떤 무리가 있었는지의 기록**이다.


물건은 같아도 **장치를 하나씩 달리 주면 갈린다.** `school`의 사전 여섯이
본보기다 — 갈피끈 둘 · 색인 탭 · 갈라진 책등 · 반쯤 벗겨진 갑 · 쇠걸쇠 ·
닳아 둥근 모서리.

| 무리 | 수 | 어디 |
| --- | ---: | --- |
| ~~도장·봉인~~ | 8 | `office` — 끝 |
| ~~땅에 박힌 기둥~~ | 8 | `city` — **끝냈다 (2026-09-22)** · 아래에 장치 여덟을 적었다 |
| ~~장부~~ | 6 | `office` — **끝냈다 (2026-09-22)** |
| ~~길바닥 표시~~ | 5 | `transport` — **끝냈다 (2026-09-22)** · 차선 쌍까지 일곱 |
| ~~알림판 · 바퀴~~ | 각 4 | `office` — **끝냈다 (2026-09-22)** |
| ~~열쇠~~ | 7 | `quality` 넷 · `city` 셋 — **끝냈다 (2026-09-22)** |
| ~~돌기둥 · 활자 · 노선 판~~ · 저울 | 각 3 | 앞의 셋 **끝냈다 (2026-09-22)** · 저울은 `justice` 둘만 남아 그대로 둔다 |
| ~~안경 · 렌즈 · 계기판 화면~~ · 연료계 · 좌석 패 · 깜빡이 · 상자 안팎 | 각 2 | 앞의 셋 **끝냈다 (2026-09-22)** · 나머지는 아직 |

### ③ 짜임이 같다 — 구도를 바꿔야 한다 (마흔여섯 → **끝났다, 2026-09-22**)

**③도 닫혔다.** 줄 세우고 하나만 다르다 열하나 · 견주기 넷 · 줄 선 차 넷 ·
수레 넷 · 두 장 나란히 넷 · 집 없는 셋 · 길 위의 지도 셋 · 손 줄 둘 · 투표함 둘 ·
연단 둘 · 모래시계 둘 · 문틈의 종이 둘 · 역 시계 둘을 다 갈랐다. 남은 것은
`the-least-of-all`·`by-a-wide-margin`과 옷 쌍 몇으로, 다음 회차에 붙인다.

물건을 바꿔도 80×80에서는 같은 그림이다. **화면에 무엇을 채우는지**를 바꾼다.

| 도식 | 수 | 어디 |
| --- | ---: | --- |
| ~~줄 세우고 하나만 다르다~~ | 11 | `quality` — **끝냈다 (2026-09-22)** |
| 둘을 견주어 크기 | 6 | `quality` — **넷 끝냈다 (2026-09-22)** · `the-least-of-all` · `by-a-wide-margin` 남음 |
| ~~줄 선 차 · 수레 · 두 장 나란히~~ | 각 4 | **끝냈다 (2026-09-22)** |
| ~~집 없는 · 길 위의 지도~~ | 각 3 | **끝냈다 (2026-09-22)** |
| ~~손 줄 · 투표함 · 연단 · 모래시계 · 문틈의 종이 · 역 시계 · 떠나는 차~~ | 각 2 | **끝냈다 (2026-09-22)** |
| ~~옷의 일곱 쌍(줄자 · 폼 · 바짓단 …)~~ | 7 | `clothes` — **끝냈다 (2026-09-22)** |

### ④ 품사가 다른 짝 — 낱말이 다르니 그림만 가르면 된다 (**끝났다, 2026-09-22**)

**처음에 「개념을 봐야 한다」고 적었는데 틀렸다.** 한국어 뜻만 보면 겹쳐
보이지만, 낱말을 열어 보니 셋 다 **일곱 언어에서 서로 다른 낱말**이다.
카드 둘이 맞다 — 고칠 것은 그림뿐이고, 그러면 ②·③과 같은 일이 된다.

    clothes/worn-down-to-the-weave(옷이 해지다)  wear thin · durchscheuern · протираться
            threadbare(해진)                    threadbare · abgetragen · потёртый
    school/touched-with-genius(천재적인)         touched with genius · genial begabt · гениальный
           a-mind-of-rare-gift(천재)             a mind of rare gift · das seltene Genie · гений
    city/rule-over-the-place(다스리다)           rule over it · herrschen über · править
         the-one-that-holds-power(다스리는)       the one that holds power · herrschend · правящий

**움직씨와 그림씨, 움직씨와 이름씨의 짝이다.** 한국어 뜻풀이가 「~하다」와
「~한」으로 갈라질 때 겹쳐 보이는 것이지 같은 낱말이 아니다.

**`city` 쌍은 이미 끝났다** — 열쇠 무리를 가르면서 `rule-over-the-place`는
**꺾쇠에 걸린 꾸러미**로, `the-one-that-holds-power`는 **받침에 세운 큰 열쇠**로
갈랐다(구조 127). 남은 둘도 같은 식으로 그림만 가르면 된다.

**배운 것.** 뜻이 겹쳐 보이면 **낱말을 먼저 연다.** 일곱 칸이 다 다르면 그것은
개념 문제가 아니라 그림 문제다.

### ⑤ 글이 겹친다 — 도구가 짚는다 (쉰여섯)

①~④는 여섯 축을 손으로 세어 찾은 것이다. 그 일을 회차마다 손으로 할 수 없어
[`pnpm echoes`](nets.md)를 만들었다. **아직 안 그린 쌍에는 `twins`가 못 가는데,
거기를 메운다.**

    pnpm echoes    56쌍 · 그 가운데 35쌍이 파일을 건너뛴다

**①~④를 그대로 짚는다** — 줄자 0.56 · 천재 0.56 · 해지다/해진 0.42 ·
바늘 0.40 · 연료계 0.33이다. 목록은 도구가 그때그때 낸다.

**혼자서는 모자란다.** `echoes`는 **문장이 닮은** 쌍을, `props`는 **낱말
하나를 같이 쓰는** 쌍을 짚는다. `idea` 열다섯을 고르며 `echoes`가 일곱을
걸렀는데 `props`가 다섯을 더 잡았다 — 망원경 둘은 글 겹침이 **0.06**이고,
나무 망치 셋은 겹친 낱말 넷 가운데 드문 것이 하나뿐이라 후보에서 떨어진다.
**뽑기 전에 둘 다 돈다**([AGENTS](../AGENTS.md)의 4번).

### 잘 갈린 본보기 둘

**한글을 그림에 넣는 무리 쉰**(기 16 · 달력 12 · 이름패 12 · 두루마리 6 ·
띠 2 · 배지 2)은 전부 그려졌고 **문턱 안 쌍이 하나도 없다.** 빛깔을 벌리고
꼴을 달리한 것이 실제로 듣는다. 다시 셀 일이 없다.

**사전 여섯**은 같은 책에 장치만 달리 주어 갈렸다. ②의 무리들이 갈 길이다.

---


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

**열다섯은 저울일 이유가 없었다. 열셋을 옮겼고 둘은 저울이 맞다** (2026-09-21 끝).

| 파일 | 개념 | 뜻 |
| --- | --- | --- |
| idea | ~~`supply-and-demand`~~ · ~~`value-worth`~~ · ~~`worth-it`~~ · ~~`work-out-what-they-mean`~~ · ~~`as-the-money-goes`~~ · **`justice`는 그대로 둔다** | 수급 · 가치 · ~할 만한 · 미루어 헤아리다 · 돈 쪽으로 · 정의 |
| quality | ~~`whether`~~ · ~~`fair-and-just`~~ · ~~`fit-to-receive-it`~~ · ~~`dear-to-pay-for`~~ | ~인지 · 공정한 · 받을 만한 · 값이 많이 드는 |
| office | ~~`saying-it-as-it-is`~~ · **`weighty-enough-to-tip-the-scale`는 그대로 둔다** | 있는 그대로 말하다 · 한쪽으로 판가름하다 |
| city | ~~`the-market-worth-of-it`~~ · ~~`a-wrong-that-was-done`~~ | 저자에서 매겨진 값 · 부당함 |
| job | ~~`lawyer`~~ | 변호사 |

`justice`(정의)와 `weighty-enough-to-tip-the-scale`(한쪽으로 판가름하다)은
저울이 곧 그 개념이라 옮기지 않는다. `pnpm props balance`는 22 → 10이다.

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
| ~~`quality/whether`~~ | ~인지 | 빈 상 위에서 아직 도는 팽이 |
| ~~`quality/fit-to-receive-it`~~ | 받을 만한 | 곁에 선 항아리 밑동 꼴로 파인 빈 주춧돌 |
| ~~`quality/dear-to-pay-for`~~ | 값이 많이 드는 | 놋 물꼭지에서 동전이 쏟아져 넘치는 들통 |
| ~~`idea/as-the-money-goes`~~ | 돈 쪽으로 | 화살이 동전 무더기 쪽으로 돌아간 바람개비 |
| ~~`office/saying-it-as-it-is`~~ | 있는 그대로 말하다 | 벽에 곧게 드리운 다림줄 |
| ~~`city/the-market-worth-of-it`~~ | 저자에서 매겨진 값 | 저자 광주리에 기댄 빈 석판과 동전 |
| ~~`job/lawyer`~~ | 변호사 | 걸개에 걸린 검은 법복과 끈으로 묶인 서류 뭉치 |

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

## 고장(city) 여든하나의 몸통을 세었다 — 거울상 열아홉 (2026-09-21)

`city`의 그림 빚 81에서 열다섯을 뽑으려고 몸통을 셌다. **아직 그림이 없어
`twins`로는 못 잰다** — 프롬프트를 나란히 놓고 읽어서만 보인다. 내가 만든
개념이 아니라 고치지 않고 넘긴다.

**파일 안에서 겹치는 무리 다섯.**

| 무리 | 개념 | 그림 |
| --- | --- | --- |
| 말뚝·경계석 | `be-at-feud-with-them`(원수로 지내다) · `lay-claim-to-it`(제 몫이라 내세우다) · `standing-on-its-own-right`(주권의) · `a-position-held`(버티는 자리) · `a-push-forward`(밀고 나감) · `the-best-mark-so-far`(최고 기록) · `holding-to-the-rule`(원칙을 지키는) · `of-that-place`(그 고장의) | **여덟이 다 「땅에 박힌 기둥」이다.** 이 파일에서 가장 큰 무리 |
| 열쇠 | `rule-over-the-place`(다스리다) · `the-one-that-holds-power`(다스리는) · `how-full-it-is`(들어차 있음) | 앞의 둘은 **뜻까지 거의 같다** — 하나는 열쇠 꾸러미, 하나는 큰 열쇠 한 개다 |
| 집 없는 | `one-with-no-roof-at-all`(노숙인) · `with-no-roof-of-ones-own`(집 없는) · `in-hard-straits`(어려운 형편의) | 앞의 둘이 「누운 자리와 개 놓은 담요」로 같다 |
| 손 줄 | `going-round-among-people`(돌아다님) · `send-it-round`(돌아다니게 하다) | 벌린 손이 줄지어 있고 넘어가는 것만 동전이냐 쪽지냐다 |
| 투표함 | `to-do-with-choosing`(뽑는) · `put-their-name-forward`(후보로 내세우다) | 둘 다 나무 상자에 난 좁은 틈이다 |

**파일 밖과 겹쳐 이번 회차에서 뺀 넷.**

    set-on-being-free(자유를 좋아하는)   열린 새장     ↔ 개념 cage(새장)      둘 다 처마에 걸린 새장
    from-up-top(위쪽에서)              지붕과 홈통   ↔ 개념 gutter(빗물받이)  둘 다 지붕 끝의 홈통
    drop-bombs-on-it(폭탄을 떨구다)     들판의 구덩이  ↔ 개념 crater(분화구)   둘 다 둥근 구덩이
    put-them-low-before-all(업신여겨…)  바닥의 방석   ↔ 개념 cushion(방석)    둘 다 바닥에 놓인 네모 방석

`set-on-keeping-the-peace`(평화를 좋아하는)도 모루를 몸통으로 쓰는데, 모루는
`idea/worth-it`(~할 만한)이 오늘 가져갔다. `the-cloakroom-counter`(옷 맡는 곳)는
옷걸이 봉이라 옷 파일의 포화 무리에 붙는다.

### 일곱 갈래 촛대는 메노라다 — 정교가 아니다 (2026-09-21)

`of-the-eastern-church`(정교의)를 「a tall candle stand with a row of thin
tapers」로 뽑았더니 **일곱 갈래 촛대**가 나왔다. 유대교의 메노라다. 게다가
개념 `menorah`(하누카 촛대)가 따로 있다.

프롬프트에 **꼴을 박아** 다시 뽑았다 — 「a low sand tray … many thin tapers
pushed upright into the sand … no branched candlestick」. 정교의 초꽂이가
나왔고 `menorah`와 117이다.

**믿음을 가리키는 낱말은 꼴을 지정한다.** 「촛대」라고만 하면 모델은 가장
흔한 촛대를 그리는데, 그것이 다른 종교의 것일 수 있다.

### 한글 집안 셋을 다 그렸다 — 이름패 열둘 · 띠 둘 · 배지 둘 (2026-09-21)

「한글로 가르는 무리 셋」에서 이름패 열둘 가운데 넷만 그려져 있었다. 남은
다섯(`a-follower-of-buddha` · `a-follower-of-christ` · `a-follower-of-islam` ·
`a-follower-of-rome` · `one-for-rule-by-the-people`)과 띠 둘 · 배지 둘을
한 회차에 몰아 뽑아 **세 집안을 다 채웠다.**

    pnpm twins --file city   682장 — 0쌍

**기 때와 같은 결과다.** 색과 꼴이 가른다.

    the-faith-of-rome  ↔ the-faith-of-the-east        구조 79 · 색 0.983   같은 배지, 다른 빛깔
    of-the-burgher-class ↔ of-the-free-minded-creed   구조 86 · 색 1.445   같은 띠
    a-follower-of-christ ↔ a-follower-of-rome         구조 91 · 색 0.998   같은 이름패
    a-follower-of-rome ↔ the-faith-of-rome            구조 129 · 색 1.382  같은 빛깔, 다른 꼴

마지막 줄이 요점이다 — `a-follower-of-rome`(가톨릭 신자)과
`the-faith-of-rome`(가톨릭교)은 **둘 다 진홍**인데, 하나는 선 나무패이고
하나는 누운 둥근 배지라 129다. `a-follower-of-christ`(그리스도인)과
`the-faith-of-the-east`(정교)도 둘 다 자주인데 131이다.

**이제 이 셋은 다시 셀 일이 없다.** 한글로 가르는 무리는 기 열여섯 · 달력
열둘 · 이름패 열둘 · 띠 둘 · 배지 둘로 모두 마흔넷이고, 전부 그려졌으며
문턱 안에 드는 쌍은 하나도 없다.

### 비단이 셋이다 (2026-09-21)

    city/made-of-silk-cloth(비단의)  one length of cloth with a bright sheen running
                                    along the line of its fold
    clothes/silk-cloth(명주)         a folded length of smooth cloth with a soft sheen
                                    along the fold
    silk(비단) ← 이미 그렸다          one length of shiny cream silk fabric falling in
                                    soft folds

셋 다 「결 따라 윤나는 접힌 천」이다. `silk`는 이미 그려져 있으니 나머지 둘이
갈 자리를 찾아야 한다 — 이를테면 하나는 짜는 자리(베틀에 걸린 날실), 하나는
파는 자리(가게 선반의 두루마리)로 옮긴다. 이번 회차에서 셋 다 뺐다.

## 됨됨이(quality) 백스물하나의 몸통을 세었다 — 두 도식에 서른둘이 몰렸다 (2026-09-21)

`quality`의 그림 빚 121에서 열다섯을 뽑으려고 몸통을 셌다. 다른 축과 달리
**물건이 아니라 도식이 겹친다.**

| 도식 | 수 | 보기 |
| --- | ---: | --- |
| 줄 세우고 하나만 다르다 | **11** | `with-nothing-to-fault`(나무랄 데 없이) · `same-as-always`(여느 때의) · `last-in-the-row`(맨 끝의) · `of-that-kind`(그런) · `as-a-rule-then`(여느 때는) · `even-that-one`(~조차) · `a-certain-few`(어떤 몇몇) · `in-the-midst-of-them`(~ 가운데) · `whichever-one-it-is`(어느 것이나) · `far-above-the-rest`(유난히 뛰어난) · `of-what-kind`(어떤) |
| 둘을 견주어 크기 | **6** | `than-that-one`(~보다) · `more-of-it`(더) · `less-than-that`(덜) · `the-most-of-all`(가장) · `the-least-of-all`(가장 덜) · `by-a-wide-margin`(확 크게) |
| 열쇠 | 4 | `the-very-one`(바로 그) · `solely-and-only`(오로지) · `that-tells-them-apart`(가려내는) · `in-no-way`(도무지) |
| 저울 | 3 | `ought-by-rights`(해야 마땅하다) · `without-any-decency`(막된) · `looking-kindly-on-it`(좋게 보아 주는) |
| 한글 띠·배지 | 3 | `the-dark-outlook`(비관) · `of-a-dark-outlook`(비관하는) · `of-a-bright-outlook`(낙관하는) |
| 상자 안팎 | 2 | `on-the-outer-side`(바깥쪽의) ↔ `on-the-inner-side`(안쪽의) — 같은 상자의 겉과 속이다 |
| 책과 안락의자 | 2 | `of-cultivated-manners`(교양 있는) ↔ `knowing-a-great-deal`(아는 게 많은) |

**앞의 둘이 서른하나 가운데 열일곱이다.** 「줄 세우고 하나만 다르다」는
`props.ts`가 이름 붙여 둔 도식 그대로이고, 그것만 열하나다. 물건을 바꿔도
80×80에서는 같은 그림으로 보인다 — 항아리 줄이냐 빵 줄이냐 그루터기 줄이냐다.

**갈래를 물건이 아니라 짜임으로 내야 한다.** 이를테면 「맨 끝의」는 줄을
끊어 끝만 크게, 「~ 가운데」는 위에서 내려다본 고리꼴, 「어느 것이나」는
손이 아무거나 집는 찰나로 옮긴다.

### 다림줄은 이미 아홉이었다 — 내가 열을 만들었다 (2026-09-21)

지난 회차에 `office/saying-it-as-it-is`(있는 그대로 말하다)를 다림줄로
옮겼는데, 다림줄은 이미 아홉이 쓰고 있었다 — `conviction-belief`(신념) ·
`the-voice-inside-that-judges`(양심) ·
`right-on-your-side-and-nothing-to-hide`(이치가 바르니…) ·
`right-and-wrong-of-it`(옳고 그름) · `holding-to-the-rule`(원칙을 지키는) ·
`quality/in-the-right-of-it`(옳다) 따위다.

**`props`는 알려 줬다. 내가 요약 줄만 봤다.** 「다른 개념이 제 몸통으로 쓰는
낱말」 줄은 **개념**이 그 낱말을 몸통으로 삼을 때만 찍힌다. 다림줄은 아홉이
다 **그림**으로만 쓰고 있어서 그 줄이 안 나왔고, 나는 「빈 낱말」로 읽었다.
목록의 `그림` 줄을 봐야 했다.

**재 보니 붙지는 않았다** — 94~120으로 다 문턱 밖이다. 그래도 옮겼다.
다림줄 하나를 다섯 개념이 나눠 쓰면 **학습자가 카드를 못 가른다.** 「장면을
찾는 다섯 수」의 마지막 줄이 그 자리다.

옮긴 그림은 **평미레**다 — 되에 수북한 곡식을 밀어 깎아 꼭 그만큼만 남긴다.
보태지도 덜지도 않는 것이 「있는 그대로 말하다」다. 다림줄 셋과 106~135이다.

### 매듭을 시키면 올가미가 나온다 (2026-09-21)

`make-it-harder-than-it-was`(더 까다롭게 하다)의 프롬프트가 「one simple loop
with three extra turns added and pulled tight」였다. **교수형 올가미**가
나왔다. 뜻과 아무 상관이 없고 읽히는 뜻이 나쁘다.

소포로 바꿨더니 이번엔 개념 `parcel`(소포)로 읽혔다(구조 99). 돌멩이에
필요 없이 몇 겹 더 감은 것으로 세 번째에 섰다.

**「고리」·「매듭」처럼 줄로만 된 것을 시킬 때는 무엇에 묶이는지를 같이
적는다.** 묶일 것을 안 주면 모델은 올가미를 그린다.

## 사무(office) 아흔아홉의 몸통을 세었다 — 도장 여덟 · 장부 여섯 (2026-09-21)

`office`의 그림 빚 99에서 열다섯을 뽑으려고 몸통을 셌다. **물건 무리가
스물여덟이다.**

| 무리 | 수 | 개념 |
| --- | ---: | --- |
| 도장·봉인 | **8** | `belonging-to-the-state`(나라의) · `of-the-union-of-states`(연방의) · `the-first-letters-of-a-name`(이름 첫 글자) · `a-seal-that-stamps`(도장) · `saying-it-is-so`(증명해 줌) · `bind-them-to-do-it`(하도록 묶다) · `the-firms-own`(회사 상표의) · `the-makers-mark`(상표 그림) |
| 장부 | **6** | `bring-it-in-and-enter-it`(들여놓다) · `a-checking-over`(살펴 봄) · `to-do-with-running-it`(경영 쪽의) · `hold-it-in-charge`(맡아 다스리다) · `to-do-with-state-money`(나라 살림의) · `what-the-trade-brings-in`(매출액) |
| 알림판 | 4 | `a-notice-put-in`(알림 글) · `to-do-with-notices`(알림의) · `pressing-just-now`(지금 긴한) · `so-the-word-goes`(그렇다는데) |
| 바퀴 | 4 | `make-it-over-anew`(뜯어고치다) · `do-its-proper-work`(제구실하다) · `up-and-running`(돌아가고 있는) · `turning-with-little-to-show`(헛돌아가는) |
| 연단 | 2 | `a-report-given`(알림 발표) ↔ `one-sent-to-speak`(내세운 사람) — **둘 다 빈 의자 앞의 연단이다** |
| 모래시계 | 2 | `with-no-term-set`(기한 없는) ↔ `before-the-term-is-up`(기한 전의) |
| 문틈의 종이 | 2 | `word-sent-on`(알리는 글) ↔ `bring-it-on-oneself`(떠안게 되다) |

도장 여덟과 장부 여섯은 **뜻이 저마다 다른데 그림이 하나다.** 「증명해 줌」과
「하도록 묶다」와 「연방의」를 80×80에서 도장으로만 가릴 수 없다.

**파일 밖과 겹쳐 이번 회차에서 뺀 셋.**

    all-told-together(통틀어)     주판알 한쪽으로  ↔ calculate(셈하다)   같은 주판
    pin-it-down-exactly(잡아 정하다) 도면 위 컴퍼스  ↔ dividers(제도 컴퍼스) 같은 컴퍼스
    by-wire-and-current(전자로)    꽂힌 플러그    ↔ plug-in(꽂다) · unplug(뽑다)

### 「덧대었다」는 색을 갈라야 보인다 (2026-09-21)

`make-it-more-and-more`(늘리다)를 「a ladder with extra rungs lashed on above
its original top」으로 뽑았더니 **그냥 사다리**가 나왔다. 덧댄 자리가 같은
나무빛이라 안 보인다. `ladder`(사다리)와 115로 멀긴 해도 뜻이 안 선다.

「짙은 사다리 위에 **훨씬 밝은** 새 단을 끈으로 묶어 이은 자리가 보이게」로
고쳐 다시 뽑으니 섰다(102).

**덧대고 잇고 갈아 끼운 것을 그릴 때는 빛깔 차이를 프롬프트에 박는다.**
`make-it-over-anew`(뜯어고치다)의 「half its spokes replaced by paler new
ones」는 이미 그렇게 적혀 있다 — 이 자리도 그래야 했다.

## 배움(school) 아흔의 몸통을 세었다 — 두루마리 여섯을 끝냈다 (2026-09-21)

`school`의 그림 빚 90에서 열다섯을 뽑았다. 여섯은 **한글을 그림에 넣는
집안**이라 한 회차에 몰아 뽑아 끝냈다 — 장대 사이에 편 두루마리에 「러시아
말」 · 「에스파냐 말」 · 「독일 말」 · 「중국 말」 · 「영국 말」 · 「프랑스 말」이다.

    pnpm twins --file school                       519장 — 0쌍
    in-the-english-tongue ↔ in-the-german-tongue   구조 68 · 색 1.913
    in-the-russian-tongue ↔ in-the-chinese-tongue  구조 81 · 색 1.173

**한글로 가르는 무리는 이제 쉰이다** — 기 16 · 달력 12 · 이름패 12 · 두루마리 6 ·
띠 2 · 배지 2. 전부 그려졌고 문턱 안 쌍이 없다.

**거울상 여섯 무리.**

| 무리 | 개념 | 그림 |
| --- | --- | --- |
| 안경 | `the-reading-of-books`(읽기) ↔ `a-person-of-learning`(배운 사람) | **둘 다 책 위에 접어 둔 안경이다** |
| 렌즈 | `gather-ones-mind-in`(마음을 모으다) ↔ `the-power-of-mind`(지력) | 둘 다 빛을 한 점에 모으는 렌즈다 |
| 한 획 그림 | `touched-with-genius`(천재적인) ↔ `a-mind-of-rare-gift`(천재) | 둘 다 한 획으로 그린 그림이고 **뜻도 같은 낱말의 그림씨와 이름씨다** |
| 돌기둥 | `in-the-old-manner`(옛 격식의) · `of-ancient-days-long-past`(고대의) · `of-the-latin-tongue`(라틴의) | 셋 다 다듬은 돌이다 |
| 활자 | `a-single-word`(낱말) · `set-it-in-good-order`(체계를 잡다) · `print-it-again-anew`(다시 펴내다) | 셋 다 납활자다 |
| 두 장 나란히 | `write-it-again`(고쳐 쓰다) · `going-over-it-again`(고쳐 다듬기) · `say-it-another-way`(쉬운 말로 바꿔 말하다) · `putting-it-in-other-words`(다시 말함) | 넷 다 「같은 것을 두 장 놓고 견준다」 도식이다 |

**사전 여섯은 잘 갈려 있다.** `english-to-russian`(영러)은 서로 다른 빛깔의
갈피끈 둘, `russian-to-english`(러영)은 두께가 다른 색인 탭, `spanish-to-russian`
(서러)은 갈라진 책등, `chinese-to-russian`(중러)은 반쯤 벗겨진 갑, `german-to-russian`
(독러)은 쇠걸쇠, `french-to-russian`(불러)은 닳아 둥근 모서리다. **같은 책이라도
장치를 하나씩 달리 주면 갈린다** — 도장 여덟과 장부 여섯이 갈 길이 여기 있다.

**파일 밖과 겹쳐 이번 회차에서 뺀 셋.**

    having-the-knack(능숙함)        물레 위의 손   ↔ 개념 potter(도예가)
    the-art-of-painting(그림 그리는 일) 이젤과 팔레트  ↔ 개념 easel(이젤) · artist(화가)
    the-gist-drawn-together(간추린 말) 깔때기       ↔ 개념 funnel(깔때기) · aim-before-you-loose

## 생각(idea) 백열다섯의 몸통을 세었다 — 배지는 글자 수가 같으면 붙는다 (2026-09-21)

`idea`의 그림 빚 115에서 열다섯을 뽑았다. 여섯은 **한글을 그림에 넣는 집안**
이라 몰아 뽑아 끝냈다 — 띠에 「공산주의의」 · 「사회주의의」 · 「민족주의의」,
배지에 「민족주의」 · 「인종주의」 · 「애국심」이다.

    pnpm twins --file idea   761장 — 0쌍

### 글자 수가 같으면 구조가 문턱 안으로 들어온다

배지 여섯을 서로 맞대 재니 **글자 수로 갈린다.**

    nation-first-belief(민족주의)    ↔ race-above-race-belief(인종주의)  구조 45 · 색 0.688
    nation-first-belief(민족주의)    ↔ the-faith-of-rome(가톨릭교)       구조 57 · 색 1.350
    race-above-race-belief(인종주의) ↔ the-faith-of-the-east(정교)       구조 63 · 색 0.875
    race-above-race-belief(인종주의) ↔ love-of-ones-land(애국심)         구조 75 · 색 1.015
    nation-first-belief(민족주의)    ↔ love-of-ones-land(애국심)         구조 82 · 색 1.263

넉 자끼리는 **45 · 57 · 63**이고, 석 자가 끼면 **75 · 82**로 벌어진다.
「민족주의」와 「인종주의」는 넉 자에 끝 두 자까지 같아 **구조 45 — 문턱
안이다.** 색 0.688이 혼자 막고 있다.

**한글 무리에서 색을 벌리는 것은 멋이 아니라 그물이다.** 기 열여섯과 달력
열둘에서는 구조가 60~100이라 여유가 있었는데, 배지는 글자가 화면을 크게
차지해 구조가 그만큼 붙는다. 이 무리에 새 개념을 넣을 때는 **넉 자 이름에
비슷한 빛깔을 주지 않는다.**

### 거울상 여덟 무리 (스물넷)

| 무리 | 수 | 개념 |
| --- | ---: | --- |
| 매듭·밧줄 | 6 | `a-question-asked`(물음) ↔ `the-taking-in-of-it`(알아들음)은 **묶은 매듭과 푼 매듭**이다 · `the-end-of-it`(끝나는 데) · `and-also-that`(그리고) · `look-like-it`(~처럼 보이다) · `one-way-or-another`(어떻게든) |
| 열쇠·자물쇠 | 4 | `it-cannot-be`(될 수 없이) · `sounds-like-it-could-be`(그럴듯한) · `hold-a-doubt`(미심쩍어하다) · **`quality/in-no-way`(도무지)** |
| 퍼즐 · 빈 것 | 각 3 | `think-the-thing-up` · `quick-and-witty` · `the-wit-one-has` / `not-a-thing` · `anything-whatever` · `nothing-to-be-done` |
| 갈림길 · 천 덮인 형체 · 아치 쐐기돌 · 저울 | 각 2 | `the-chance-of-it-being` ↔ `better-to-do-it` / `something-or-other` ↔ `take-it-to-be-so` / `it-would-be-so` ↔ `you-cannot-leave-it-out` / `to-my-mind` ↔ `a-showing-it-to-be-false` |

**파일을 건너뛰는 쌍이 있다.** `idea/it-cannot-be`(될 수 없이)는 「열쇠 곁에
구멍 꼴이 다른 자물쇠」이고 `quality/in-no-way`(도무지)는 「구멍 꼴이 확실히
다른 열쇠 구멍 곁의 열쇠」다 — **글이 거의 같다.** 한 파일만 훑어서는 안
걸린다.

**파일 밖과 겹쳐 이번 회차에서 뺀 둘.**

    form-it-up-whole(이루어 놓다)     벌집        ↔ 개념 honeycomb(벌집 모양의)
    gaze-and-lose-oneself(넋 놓고 보다) 우물의 두레박  ↔ 개념 well(우물) · lower-down(내리다)

### 도장 여덟에 장치를 하나씩 주었다 (2026-09-21)

②의 첫 무리를 끝냈다. `school`의 사전 여섯이 본보기다 — **물건은 같아도
장치를 하나씩 달리 주면 갈린다.** 여덟이 다 아직 안 그려져 있어 뽑기 전에
고칠 수 있었다.

| 개념 | 뜻 | 장치 |
| --- | --- | --- |
| `belonging-to-the-state` | 나라의 | 봉랍 찍힌 자루 하나와 안 찍힌 자루 둘 |
| `of-the-union-of-states` | 연방의 | **한 장에 나란히 찍힌 서로 다른 도장 다섯** |
| `the-first-letters-of-a-name` | 이름 첫 글자 | 반지를 빼고 **밀랍에 남은 자국**만, 두 꼴이 얽힌 |
| `a-seal-that-stamps` | 도장 | 인주 위에 선 나무 손잡이 도장 |
| `saying-it-is-so` | 증명해 줌 | 찍힌 자국과 **뒤집힌 도장 면을 나란히** |
| `bind-them-to-do-it` | 하도록 묶다 | 세 번 감은 끈의 매듭을 **납봉인 집게**로 물린 것 |
| `the-firms-own` | 회사 상표의 | **낙인**과 이미 지져진 나무 상자 |
| `the-makers-mark` | 상표 그림 | **엎어 놓은 사발 굽에 찍힌** 작은 표 |

    pnpm twins --file office                              620장 — 0쌍
    the-makers-mark ↔ the-first-letters-of-a-name         구조  91 · 색 0.618
    the-first-letters-of-a-name ↔ saying-it-is-so         구조  97 · 색 2.535
    of-the-union-of-states ↔ saying-it-is-so              구조 111 · 색 1.001
    saying-it-is-so ↔ guarantee(보증하다)                  구조 114 · 색 1.064

**파일 밖도 봤다.** `guarantee`(보증하다)가 「손이 빈 카드에 둥근 도장을
누르는 것」이라 `saying-it-is-so`(증명해 줌)가 그리로 갈 뻔했다 — 손을 빼고
**뒤집힌 도장 면**을 놓아 갈랐다. `nobleman`(귀족)과 `a-hired-go-between`
(대리 맡은 이)이 이미 인장 반지를 쓰고 있어 `the-first-letters-of-a-name`도
반지를 버렸다.

**②의 남은 마흔여섯도 같은 식으로 푼다.** 장부 여섯 · 알림판 넷 · 바퀴 넷 ·
땅에 박힌 기둥 여덟이 남았다.

### 땅에 박힌 기둥 여덟에 장치를 주었다 (2026-09-22)

②의 가장 큰 무리다. 여덟이 다 안 그려져 있어 뽑기 전에 고쳤다. **다섯은
기둥을 아예 버렸고 셋은 이미 갈려 있었다.**

| 개념 | 뜻 | 장치 |
| --- | --- | --- |
| `be-at-feud-with-them` | 원수로 지내다 | 마주 선 경계돌 둘과 그 사이 밟혀 다져진 띠 (그대로) |
| `lay-claim-to-it` | 제 몫이라 내세우다 | **나무껍질을 도끼로 벗긴 자리**와 발치의 흰 나뭇밥 |
| `standing-on-its-own-right` | 주권의 | **문 하나 없이 땅을 온전히 두른 낮은 돌담**, 위에서 |
| `a-position-held` | 버티는 자리 | 흙둑 위에 바깥을 향해 박은 말뚝들 (그대로) |
| `a-push-forward` | 밀고 나감 | **긁힌 자국을 뒤에 남기고 밀린 흙더미** |
| `the-best-mark-so-far` | 최고 기록 | **벽에 그은 물높이 자국들** 가운데 하나만 훌쩍 위에 |
| `holding-to-the-rule` | 원칙을 지키는 | **곁의 울은 무너졌는데 빗장은 그대로 지른 문** |
| `of-that-place` | 그 고장의 | 갈림길의 이정표, 마을 쪽에만 낀 이끼 (그대로) |

    pnpm twins --file city                         694장 — 0쌍
    standing-on-its-own-right ↔ build(짓다)         구조 110 · 색 1.754
    lay-claim-to-it ↔ tree(나무)                    구조 113 · 색 1.927
    a-push-forward ↔ bulldozer(불도저)              구조 114 · 색 1.202
    a-position-held ↔ a-push-forward               구조 116 · 색 1.184

**한 번 되돌렸다.** `a-push-forward`를 「날에 밀린 흙더미」로 적었더니 모델이
**불도저**를 그렸는데, 개념 `bulldozer`(불도저)가 따로 있다. 「기계 없이, 탈것
없이」를 박아 다시 뽑았다. **연장을 말하면 모델은 연장을 그린다** — 자국만
남기려면 그렇게 적어야 한다.

**`holding-to-the-rule`은 다림줄에서 뺐다.** 다림줄은 아홉이 쓰고 있었다
([그 자리](#다림줄은-이미-아홉이었다--내가-열을-만들었다-2026-09-21)).

**②에 남은 것은 서른여덟이다** — 장부 여섯 · 길바닥 표시 다섯 · 알림판 넷 ·
바퀴 넷 · 열쇠 넷(`quality`) · 그 밖.

### 길바닥 표시 다섯(과 차선 쌍 둘)에 장치를 주었다 (2026-09-22)

「선이 그어진 길바닥」 다섯에 거울상이던 `keep-in-lane`↔`change-lanes`를
더해 일곱을 한 번에 끝냈다. 일곱 다 안 그려져 있었다.

| 개념 | 뜻 | 장치 |
| --- | --- | --- |
| `hard-shoulder` | 갓길 | 흰 가장자리 선 **너머로 비켜선 승합차**, 달리는 차로는 비어 있다 |
| `centre-line` | 중앙선 | **노란 두 줄**만 길바닥 가득, 낮은 눈높이 |
| `one-way-street` | 일방통행 | 좁은 길바닥의 **큰 흰 화살표** 하나 |
| `tow-away-zone` | 견인 지역 | 빗금 칠한 연석과 **열린 바퀴 잠금쇠** |
| `icy-stretch` | 결빙 구간 | 굽이의 **그늘진 쪽에만** 번들거림, 볕 쪽은 말랐다 |
| `keep-in-lane` | 차선을 지키다 | **바퀴 둘만** 크게, 점선 안쪽으로 양쪽 틈이 고르다 |
| `change-lanes` | 차선을 바꾸다 | 점선을 **넘는 차 한 대**와 켜진 깜빡이, 위에서 |

    pnpm twins --file transport            304장 — 0쌍
    keep-in-lane ↔ change-lanes            구조 109 · 색 2.491
    hard-shoulder ↔ centre-line            구조 110 · 색 2.149
    icy-stretch ↔ winding-road             구조 117 · 색 1.806

**눈높이가 장치가 된다.** 길바닥은 다 같은 회색 판이라 무엇을 그리든 붙을
자리인데, 바퀴만 크게 잡은 것(`keep-in-lane`)과 차 한 대를 위에서 잡은 것
(`change-lanes`)이 109로 갈렸다. **물건을 바꾸지 않고 눈높이만 바꿔도 된다** —
②의 남은 무리에 쓸 수 있는 손이다.

**②에 남은 것은 서른셋이다** — 장부 여섯 · 알림판 넷 · 바퀴 넷 · 열쇠 넷 ·
돌기둥 셋 · 활자 셋 · 노선 판 셋 · 그 밖.

### 장부 여섯 · 알림판 넷 · 바퀴 넷 (2026-09-22)

한 파일에서 열넷을 한 회차에 끝냈다. 열셋이 안 그려져 있었다.

**장부 여섯은 눈높이로 갈랐다.** 길바닥에서 얻은 손이 그대로 먹는다.

| 개념 | 뜻 | 장치 |
| --- | --- | --- |
| `bring-it-in-and-enter-it` | 들여놓다 | 문간에 막 내려놓은 **궤짝**과 펼친 장부, 정면 |
| `a-checking-over` | 살펴 봄 | 돋보기를 빼고 **줄마다 그은 확인 표**만 크게, 위에서 |
| `to-do-with-running-it` | 경영 쪽의 | 책상 전경 — 닫힌 장부 · 전화 · 빈 의자 |
| `hold-it-in-charge` | 맡아 다스리다 | **책배 쪽에서 본** 잠긴 장부, 선반에 꽂힌 |
| `to-do-with-state-money` | 나라 살림의 | 돌판 위 아주 큰 장부, **쇠 추 둘**이 눌러 |
| `what-the-trade-brings-in` | 매출액 | **바로 위에서** 본 장부와 자라는 동전 더미 셋 |

    to-do-with-state-money ↔ what-the-trade-brings-in   구조 148
    hold-it-in-charge ↔ to-do-with-running-it           구조 128
    a-checking-over ↔ fact(사실)                         구조  91

**알림판 넷은 이미 갈려 있었다** — 한 장(`a-notice-put-in`) · 넉 장을 고르게
(`to-do-with-notices`) · 겹친 더미 맨 앞에 **붉은 핀**(`pressing-just-now`) ·
핀 자국만 남은 빈 판(`so-the-word-goes`). 붉은 핀 하나만 더했다.

**바퀴 넷도 눈높이로 갈랐다.** `do-its-proper-work`(제구실하다)는 물레방아를
**정면에서** 물받이마다 가득 차게, `up-and-running`(돌아가고 있는)은 **옆에서**
물이 쏟아지고 물길이 흐르게. 122로 갈린다. `make-it-over-anew`(뜯어고치다)는
수레바퀴의 살 절반만 새것이고, `turning-with-little-to-show`(헛돌아가는)는
미끄러지는 띠다.

    pnpm twins --file office   633장 — 0쌍

**②에 남은 것은 열아홉이다** — 열쇠 넷(`quality`) · 돌기둥 셋 · 활자 셋 ·
노선 판 셋 · 안경 둘 · 렌즈 둘 · 계기판 둘.

### 열쇠 일곱 · 안경 둘 · 렌즈 둘 · 계기판 둘 · 노선 판 둘 (2026-09-22)

②의 작은 무리 여섯을 한 회차에 끝냈다. 열다섯이 다 안 그려져 있었다.

**열쇠 일곱은 파일 둘에 흩어져 있었다** — `quality` 넷과 `city` 셋이다.
한 무리로 놓고 고리·걸린 자리·눈높이로 갈랐다.

| 개념 | 뜻 | 장치 |
| --- | --- | --- |
| `the-very-one` | 바로 그 | 열쇠가 잔뜩 꿰인 고리, **하나에만 붉은 실** |
| `solely-and-only` | 오로지 | **텅 빈 고리**에 열쇠 하나 |
| `that-tells-them-apart` | 가려내는 | 나란한 두 열쇠, **이 하나만 짧다** |
| `in-no-way` | 도무지 | 구멍에 **반만 들어가다 멈춘** 열쇠 |
| `rule-over-the-place` | 다스리다 | 돌 문설주의 **꺾쇠에 걸린** 꾸러미 |
| `the-one-that-holds-power` | 다스리는 | 나무 받침에 **세워 놓은** 큰 열쇠 |
| `how-full-it-is` | 들어차 있음 | 거의 빈 **열쇠 걸이 판** |

    that-tells-them-apart ↔ in-no-way    구조  90
    solely-and-only ↔ key(열쇠)           구조 111
    the-very-one ↔ rule-over-the-place    구조 127

**거울상 셋도 함께 풀었다.** `the-reading-of-books`(읽기)는 펼친 책에 안경을
가로놓아 위에서, `a-person-of-learning`(배운 사람)은 안경을 버리고 **닳은
책등 다섯**으로 갔다(131). `the-power-of-mind`(지력)는 렌즈를 버리고
**가는 막대 하나로 도는 맷돌**로 갔다(119). `turn-on-the-sat-nav`
(내비게이션을 켜다)는 **막 켜져 아직 빈 화면**, `route-guidance`(경로 안내)는
**굽은 선과 화살표**다(127).

**가장 가까운 것은 노선 판 둘이다** — `through-service`(직행)와
`stopping-service`(완행의)가 구조 94 · 색 0.332다. 둘 다 판에 선과 점이라
색이 거의 같다. 문턱 밖이지만 이 회차에서 제일 가깝다.

**`stopping-service`를 다시 볼 자리.** 그림이 지도판처럼 나와
`the-map-of-the-lines`(노선도, 아직 안 그림)와 겹칠 수 있다. 그쪽을 뽑을 때
맞대 재 볼 것.

**②가 끝났다.** 남은 것은 돌기둥 셋 · 활자 셋 · `service-interval` 하나인데,
셋 다 이미 서로 갈려 있어 그리기만 하면 된다.

### ②를 닫았다 — 돌기둥 셋 · 활자 셋 · 배차 간격 (2026-09-22)

남은 일곱을 그렸다. 돌기둥 셋(**선 기둥 · 넘어진 북 · 눕힌 판**)과 활자 셋
(**낱개 활자 · 새것과 헌 것 · 칸칸이 고른 통**)은 이미 서로 갈려 있어 손볼 것이
없었다. `service-interval`(배차 간격)만 노선 판에서 빼내
**고르게 늘어선 버스 셋**으로 옮겼다(`stopping-service`와 121).

**사전 여섯이 설계대로 갈렸다.** ②의 본보기로 삼았던 무리를 실제로 그려 재니
가장 가까운 쌍이 91이다.

    english-to-russian ↔ german-to-russian    구조  91   갈피끈 둘 ↔ 쇠걸쇠
    english-to-russian ↔ french-to-russian    구조  96
    russian-to-english ↔ chinese-to-russian   구조 105
    spanish-to-russian ↔ chinese-to-russian   구조 112

**같은 물건 여섯이 90~112로 벌어진다.** 장치 하나씩이 충분하다는 뜻이고,
②를 그 방식으로 판단한 것이 맞았다.

`set-it-in-good-order`(체계를 잡다)의 프롬프트에 「labelled compartments」가
있어 글자를 부를 자리였다 — 「칸의 꼴과 크기로 고른다」로 바꿔 뽑았다.

### ③의 큰 무리를 풀었다 — 짜임은 눈높이·줄 꼴·다름의 자리로 가른다 (2026-09-22)

「줄 세우고 하나만 다르다」 열하나는 ③에서 가장 큰 무리였다. **물건을 바꾸지
않고 짜임만 바꿔** 갈랐다. 셋을 돌려 쓴다 — **눈높이**(위·옆·가까이),
**줄의 꼴**(곧은 줄·고리·깊이·격자), **다름의 자리**(끝·가운데·전부·없음).

| 개념 | 뜻 | 짜임 |
| --- | --- | --- |
| `with-nothing-to-fault` | 나무랄 데 없이 | **한 점만 가까이** — 흠 없는 잿물, 옆 항아리 테만 걸침 |
| `same-as-always` | 여느 때의 | **격자, 위에서** — 크기도 빛깔도 다 같은 빵 |
| `last-in-the-row` | 맨 끝의 | **비스듬히 멀어지는 줄** — 맨 끝 나무만 흰 칠 |
| `of-that-kind` | 그런 | **깊이** — 앞의 하나, 뒤로 물러선 같은 것 셋 |
| `as-a-rule-then` | 여느 때는 | **바닥의 자국, 위에서** — 걸상은 치워 놓았다 |
| `even-that-one` | ~조차 | **옆에서 길게** — 다 섰는데 끝 하나가 내려앉았다 |
| `a-certain-few` | 어떤 몇몇 | **곧은 줄에 흩어진 표** 셋 |
| `in-the-midst-of-them` | ~ 가운데 | **고리꼴, 위에서** — 가운데 하나만 검다 |
| `whichever-one-it-is` | 어느 것이나 | **집는 찰나** — 아무거나 하나를 든 손 |
| `far-above-the-rest` | 유난히 뛰어난 | **정면 나란히** — 큰 것이 끝이 아니라 **가운데** |
| `of-what-kind` | 어떤 | **셋이 다 다름**, 가까이 위에서 |

    same-as-always ↔ a-certain-few        구조 106   둘 다 같은 것의 줄
    of-that-kind ↔ with-nothing-to-fault  구조 120
    a-certain-few ↔ whichever-one-it-is   구조 119
    pnpm twins --file quality              0쌍

**가장 가까운 쌍이 97이다.** 열하나를 같은 도식으로 두고도 90 위로 벌어진다 —
**②의 「장치」와 ③의 「짜임」은 같은 값어치다.** 물건을 새로 찾을 필요가 없다는
뜻이라, ③의 남은 서른다섯은 ②보다 싸다.

**견주기 여섯 가운데 넷도 같이 풀었다** — `than-that-one`(둘만, 옆에서) ·
`more-of-it`(둘, 위에서) · `less-than-that`(땅을 잘라 보인 단면) ·
`the-most-of-all`(여럿 중 하나, 멀어지는 줄). 121 · 97로 갈린다.
`the-least-of-all`(가장 덜)과 `by-a-wide-margin`(확 크게)이 남았다.

### ③ 열다섯을 더 풀었다 — 수레가 쇼핑 카트로 나왔다 (2026-09-22)

줄 선 차 넷 · 수레 넷 · 집 없는 셋 · 손 줄 둘 · 투표함 둘이다.

**줄 선 차 넷은 눈높이로만 갈랐다.** 물건이 넷 다 「멈춘 차의 줄」인데
`the-road-is-choked`(길이 막히다)는 **연석 높이에서 바퀴만**,
`congested`(막히는)는 **바로 위에서 여러 차로**, `nose-to-tail`(차가 밀리는)은
**범퍼 둘만 가까이**, `crawl-along`(서행하다)은 **안개 속 뒷불빛만**이다.
120~126으로 갈린다.

    the-road-is-choked ↔ congested   구조 126
    congested ↔ nose-to-tail         구조 120
    nose-to-tail ↔ crawl-along       구조 122
    to-do-with-choosing ↔ put-their-name-forward  구조 99   ← 가장 가깝다

**`cart`를 쓰면 쇼핑 카트가 나온다.** 수레 넷 가운데 둘이 쇼핑 카트로
나왔다 — 개념 `cart`(쇼핑 카트)가 그 낱말을 쥐고 있다. 「horse drawn
carriage」로 꼴을 박고 «no shopping trolley»를 붙여 다시 뽑았다.
[IMAGE_STYLE](../IMAGE_STYLE.md)의 낱말 함정 표에 넣었다.

**③에 남은 것은 스물이다** — 두 장 나란히 넷 · 길 위의 지도 셋 · 연단 둘 ·
모래시계 둘 · 문틈의 종이 둘 · 떠나는 차 둘 · 역 시계 둘 · 옷의 일곱 쌍 가운데
남은 것.

### ③을 닫았다 — 마지막 열다섯 (2026-09-22)

두 장 나란히 넷 · 길 위의 지도 셋 · 연단 둘 · 모래시계 둘 · 문틈의 종이 둘 ·
역 시계 둘이다. 짜임을 하나씩 달리 주었다.

| 개념 | 뜻 | 짜임 |
| --- | --- | --- |
| `write-it-again` | 고쳐 쓰다 | 새로 쓴 장 하나와 **바닥에 떨군 구겨진 장** |
| `going-over-it-again` | 고쳐 다듬기 | **한 장만 가까이**, 줄 사이에 손질 자국 |
| `say-it-another-way` | 쉬운 말로 바꿔 말하다 | 카드 둘 — **엉킨 그림 ↔ 세 획** |
| `putting-it-in-other-words` | 다시 말함 | **긴 선 → 화살표 → 짧은 선** 도식 |
| `ask-which-way-to-go` | 길을 묻다 | **펴 든 손**과 이정표 둘 |
| `reroute` | 경로를 바꾸다 | **지도만 가까이** — 그은 선을 긋고 둘러 간 선 |
| `take-a-wrong-turn` | 길을 잘못 들다 | **차를 빼고 바퀴 자국만**, 낮은 눈높이 |
| `a-report-given` | 알림 발표 | **연단 위 종이 한 장**만 가까이, 의자는 흐리게 |
| `one-sent-to-speak` | 내세운 사람 | 연단을 빼고 **앞으로 나온 걸상 하나** |
| `with-no-term-set` | 기한 없는 | **옆으로 누운** 모래시계, 모래가 고여 멈춤 |
| `before-the-term-is-up` | 기한 전의 | **세워 정면**, 윗칸에 모래가 아직 많다 |
| `word-sent-on` | 알리는 글 | **방 안쪽 바닥 높이**에서 본 문틈의 종이 |
| `bring-it-on-oneself` | 떠안게 되다 | **위에서 본 매트**에 쌓인 봉투 다섯 |
| `it-comes-in-behind-time` | 연착하다 | **멀리서** 빈 선로와 높이 걸린 시계 |
| `last-service-time` | 막차 시간 | **시계 문자판만 가까이**, 뒤로 셔터 내린 매점 |

    word-sent-on ↔ bring-it-on-oneself   구조 109   ← 가장 가깝다
    ask-which-way-to-go ↔ reroute        구조 116
    write-it-again ↔ going-over-it-again  구조 120
    office · school · transport 세 파일 다 0쌍

**한 번 되돌렸다.** `bring-it-on-oneself`(떠안게 되다)를 「현관 매트 위 고지서
더미」로 적었더니 **게시판에 꽂은 봉투들**이 나왔다. 매트와 마룻바닥을 박고
«no board, no pins»를 붙여 다시 뽑았다. 앞선 `cart`·`bulldozer`와 같은 자리다 —
**모델은 그 낱말이 흔히 사는 자리로 끌려간다.**

### 옷 일곱 쌍을 풀었다 — 손을 넣으면 폼과 갈린다 (2026-09-22)

③의 마지막 무리다. 일곱 쌍 열넷과 `miss-the-stop`을 함께 뽑았다.

| 쌍 | 갈라 놓은 자리 |
| --- | --- |
| 사이즈를 재다 ↔ 가슴둘레 | **줄자를 감는 두 손**(폼 없음) ↔ **폼 정면**에 두른 줄자 (103) |
| 몸에 맞추다 ↔ 품을 줄이다 | **폼 옆선의 시침핀 줄** ↔ **천을 집은 손가락 둘** (128) |
| 옷맵시 ↔ 맵시 있는 | **창을 등진 옆 실루엣** ↔ **주머니 수건만 가까이** (117) |
| 옷이 늘어나다 ↔ 목이 늘어난 | **옷걸이에 솟은 어깨 뿔** ↔ **벌어진 목둘레만 위에서** (111) |
| 입혀 주다 ↔ 후줄근한 | **소매에 팔을 끼워 주는 손** ↔ **의자에 늘어진 젖은 외투** (114) |
| 단을 접다 ↔ 단을 내리다 | **핀을 꽂는 손가락** ↔ **펼친 단의 옛 접힌 자국** (135) |
| 옷을 물려주다 ↔ 기성복 | **작은 것부터 셋** 정면 ↔ **빽빽한 봉**이 비스듬히 멀어짐 (122) |

**손을 넣는 것이 가장 잘 듣는다.** 드레스폼 여덟이 몰려 있던 자리인데, 한쪽에
**손**을 넣으면 폼이 화면에서 빠지면서 103~128로 벌어진다. 사람을 안 그리는
규칙 안에서도 손은 쓸 수 있다.

    clothes · transport 두 파일 다 0쌍

### ④를 닫았다 — 품사 짝 셋과 옷 열하나 (2026-09-22)

남은 두 쌍을 그렸다. **한쪽은 한 곳을 가까이, 한쪽은 전체를 멀리**로 갈랐다.

    worn-down-to-the-weave(옷이 해지다)  소매 팔꿈치 **한 군데**만 비쳐 가는 것, 가까이
    threadbare(해진)                   외투 **전체**를 위에서, 팔꿈치·소맷부리·앞섶이 다 닳음
                                       구조 119

    touched-with-genius(천재적인)        붓 한 획으로 그린 **흠 없는 동그라미**
    a-mind-of-rare-gift(천재)           빽빽한 도면이 놓인 **책상과 물러난 의자**
                                       구조 127

**앞의 쌍은 「한 곳 ↔ 전체」, 뒤의 쌍은 「한 일 ↔ 그 사람의 자리」다.**
그림씨는 상태 하나를, 이름씨는 그 사람이 떠난 자리를 보인다 — 사람을 안
그리는 규칙 안에서 이름씨를 그리는 손이다.

**거울상 한 쌍도 함께 풀었다.** `bleach`(표백제)와 `fabric-softener`
(섬유유연제)가 둘 다 「병 하나에 갠 수건」이었는데, 병을 아예 빼고
**표백된 흰 천 ↔ 누런 천**과 **결이 선 수건 ↔ 납작해진 수건**으로 바꿨다(119).
**약은 병이 아니라 그 결과로 그린다.**

    clothes · school 두 파일 다 0쌍

### ①을 닫았다 — 남은 아홉은 새 손으로 뚫렸다 (2026-09-22)

①의 남은 아홉은 **빈 몸통이 없어** 두 번 막혔던 자리다. 그 사이에 손이 넷
늘어서(손을 넣는다 · 결과로 그린다 · 그 사람의 자리 · 눈높이) 다시 풀었다.
**몸통을 새로 찾는 대신 같은 몸통을 다르게 잡았다.**

| 개념 | 뺏겼던 몸통 | 새 그림 | 임자와의 거리 |
| --- | --- | --- | ---: |
| `put-thread-through-it`(실을 꿰다) | 바늘 | **손끝 둘**이 귀로 나온 실 끝을 쥔 것, 아주 가까이 | `needle` 119 |
| `take-it-off-again`(벗어 내리다) | 외투+걸이 | **빈 걸이와 벽에 남은 안 바랜 자국**, 외투는 아래 의자에 | `hang` 103 |
| `on-the-peg-by-the-door`(옷을 걸다) | 외투+걸이 | **옷걸이에 끼우는 두 손**, 벽 고리 없음 | `hang` 99 |
| `silk-cloth`(명주) | 윤나는 천 | **쓸어 가는 손** 앞으로 미끄러지는 윤 | `silk` 121 · `fabric-roll` 131 |
| `pin-it-down-exactly`(잡아 정하다) | 제도 컴퍼스 | **손끝이 지도 한 점에 꽂는 핀** 하나 | `dividers` 105 |
| `by-wire-and-current`(전자로) | 플러그·콘센트 | **구리줄에 켜진 전구 셋**, 양끝이 벗겨짐 | `plug-in` 141 |
| `having-the-knack`(능숙함) | 물레·대팻밥 | **한 번에 깎아 끊기지 않은 사과 껍질** | `potter` 117 |
| `the-art-of-painting`(그림 그리는 일) | 이젤 | **팔레트만 가까이**, 갓 갠 물감과 젖은 붓 | `easel` 121 |
| `from-up-top`(위쪽에서) | 홈통 | **마당을 바로 위에서** — 눈높이 자체가 뜻이다 | — |

**세 가지가 반복해서 먹혔다.**

1. **손을 넣으면 임자가 화면에서 빠진다** — 실·명주·핀·옷걸이가 다 그랬다.
2. **물건이 아니라 자국을 그린다** — 빈 걸이의 안 바랜 자국이 「벗어 내리다」다.
3. **뜻이 눈높이면 눈높이를 그린다** — 「위쪽에서」는 바로 위에서 본 마당이다.

가장 가까운 것이 99(`on-the-peg-by-the-door` ↔ `hang`)이고, `by-wire-and-current`는
한 번 되돌렸다 — 「줄 위의 등 다섯」이 그냥 **조명**으로 나와, 구리줄과 벗긴
끝을 박아 다시 뽑았다.

**clothes · office · school · city 네 파일 다 0쌍.** 찾아보기의 ①~④가 모두
닫혔다.

---

## 2026-09-23 — 글이 겹친 열아홉, 프롬프트만 고쳤다 (그림이 남았다)

`pnpm echoes --all`로 **이미 그린 것까지** 훑었다. 488쌍이 걸렸는데 대부분은
「한 벌」이다 — 숫자·달·요일·색·방위·나라 이름은 소품을 일부러 같이 쓴다
([IMAGE_STYLE.md](../IMAGE_STYLE.md)). 그것을 걷어 내고 남은 **진짜 복사본**이
아래 열아홉이다. 한쪽 프롬프트를 다른 장면으로 옮겼다.

`pnpm twins`는 이 가운데 하나만 봤다 — `difference` ↔ `that-tells-them-apart`
(구조 37 · 색 0.16). 나머지 열여덟은 **픽셀로는 멀고 뜻으로 겹친다.** 카드 둘이
같은 말을 하는 자리라 twins가 영영 못 잡는 쪽이다.

| 고친 개념 | 겹친 짝 | 겹침 | 새 장면 |
| --- | --- | ---: | --- |
| `difference`(차이) | `that-tells-them-apart`(가려내는) | 1.00 | 한쪽 모서리만 잘린 카드 둘 (열쇠 무리는 quality 쪽 한 벌이라 그대로 뒀다) |
| `yoga`(요가) | `meditate`(명상하다) | 1.00 | 세워 둔 매트와 블록 둘·스트랩 |
| `christmas`(성탄절) | `christmas-tree`(크리스마스트리) | 1.00 | 문에 건 화환과 그 아래 꾸러미 둘 |
| `gardener`(정원사) | `water-plants`(물을 주다) | 0.88 | 연장 실은 외바퀴 수레와 장갑 |
| `musician`(음악가) | `violinist`(바이올리니스트) | 0.83 | 펼친 악보대와 의자에 놓인 클라리넷 |
| `withdrawal`(인출) | `withdraw-money`(인출하다) | 0.83 | 출금구 접시에 놓인 지폐 뭉치 |
| `withdraw-cash`(현금을 뽑고 싶습니다) | `withdrawal`(인출) | 1.00 | 밤거리의 불 켜진 현금인출기 |
| `vitality-spark`(생기) | `hope`(희망) | 0.75 | 비 맞고 잎을 드는 풀 |
| `goal-net`(골네트) | `goal-post`(골대) | 0.75 | 그물 뒤에서 본 매듭과 기댄 공 |
| `rocket`(로켓) | `rocket-launch`(발사) | 0.71 | 발사대에 선 로켓과 정비탑 |
| `mouthfeel`(식감) | `crispy`(바삭한) | 0.71 | 베어 문 자리가 드러난 사과 |
| `steamed`(찐) | `steaming-hot`(김이 모락모락) | 0.70 | 갈라 놓은 찐빵의 속살 |
| `lecture-hall`(강의실) | `auditorium`(강당) | 0.70 | 긴 책상과 화이트보드·천장 빔 |
| `desktop`(데스크톱) | `computer`(컴퓨터) | 0.67 | 책상 밑 본체와 뒤로 오른 케이블 |
| `passing-years`(세월) | `tree-rings`(나이테) | 0.67 | 가운데가 패도록 닳은 돌 문턱 |
| `wealth`(부) | `treasure`(보물) | 0.63 | 쌓은 금화와 불룩한 돈주머니 |
| `telegraphy`(전신) | `telegraph`(전신기) | 0.60 | 지평선까지 이어진 전신주 줄 |
| `basketball`(농구) | `backboard`(농구 백보드) | 0.60 | 3점 선 위에 놓인 공, 바로 위에서 |
| `disinfectant`(소독약) | `iodine`(요오드팅크) | 0.60 | 분무기와 접어 둔 천 |

**그림은 못 뽑았다.** `pnpm genimg`이 열한 장 연속으로 같은 자리에서 멈춘다.

    FAIL difference — Codex subscription image generation failed with exit code 1

원인은 **Codex 구독의 사용 한도**다(2026-09-24에 스킬을 직접 돌려 확인).
`genimg.sh`는 오류를 한 줄로 자르는데, 그 뒤에 이렇게 적혀 있었다.

    You've hit your usage limit. … try again at Sep 27th

그래서 지금 **프롬프트와 그림이 어긋나 있다** — 화면에는 옛 그림이 그대로
나간다. **9월 27일 이후에** 이 열아홉을 다시 뽑고 구우면 된다. 안 그린
1067장도 같은 한도에 걸려 있다.

    pnpm genimg difference yoga christmas gardener musician withdrawal withdraw-cash vitality-spark goal-net rocket mouthfeel steamed lecture-hall desktop passing-years wealth telegraphy basketball disinfectant
    pnpm image  difference yoga christmas gardener musician withdrawal withdraw-cash vitality-spark goal-net rocket mouthfeel steamed lecture-hall desktop passing-years wealth telegraphy basketball disinfectant

시트를 눈으로 보는 일은 건너뛰지 않는다 — 뒤바뀐 장은 md5도 twins도 못 잡는다.
