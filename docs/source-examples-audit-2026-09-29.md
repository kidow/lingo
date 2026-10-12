# 구절형이 아닌 개념의 원문 예문 표본 점검 (2026-09-29)

구절형 개념(slug에 붙임표 셋 이상)의 원문 예문은 약 30%가 깨져 있었다(387f115f).
나머지 개념 9,463개의 예문에서 무작위로 700줄을 뽑아 같은 잣대로 봤다.
**128줄(18.3%)이 걸렸다** — 문법이 틀린 것과 원어민이 안 쓰는 어색한 것을 합친
값이다. 표본의 128줄은 그날 고쳤고, 원문은 맞는데 `ko`만 틀린 26줄도 고쳤다.

| 언어 | 걸린 줄 | 비율 | `ko`만 틀림 |
| --- | --- | --- | --- |
| de | 31/150 | 21% | 5 |
| fr | 28/150 | 19% | 5 |
| es | 27/150 | 18% | 7 |
| ru | 23/150 | 15% | 5 |
| en · ja · zh | 19/100 | 19% | 4 |

## 구절형처럼 한 갈래로 몰리지 않는다

구절형은 «둘째 예문을 대용어로 뭉갠» 한 가지 버릇이라 정규식으로 뽑아 고칠 수
있었다. 여기는 그렇지 않다 — 파일 열넷에 흩어져 있고 품사로도 크게 안 갈린다.
**통째로 다시 쓸 갈래가 없으므로 전수 교정은 하지 않는다.** 대신 걸리는 꼴은
넷으로 모인다:

1. **짝말(연어)이 어긋난다** — 가장 많다(언어마다 6~9줄). 추상 명사가 주어로
   서서 엉뚱한 동사를 받는다: «Der Winter brach die festgefahrene Lage auf» ·
   «этаж принял воду» · «une communication a cédé». 한국어를 그대로 옮긴 셈법도
   여기 든다(«tres piezas de lingote»).
2. **표제어를 다른 뜻으로 썼다** — `Bogen`을 무지개로, `Oberteil`을 산꼭대기로,
   `pardon`을 사과문으로.
3. **표제형을 억지로 끼워 어미가 빠졌다** — «die östlich Mauer» · «drei
   Kleidungsstück» · 영어 «he did keep ones word». 구절형과 같은 원인이다.
4. **러시아어는 둘째 예문이 세 배 잘 깨진다**(i=1 26% · i=0 8%). 주어를 뒤로
   돌린 짧은 문장(«Воду принял первый этаж.»)에서 짝말과 상이 함께 틀린다.

**깨끗한 곳:** 여행 회화(`scene`)와 표현형 문장은 거의 0이다(18줄에 1줄 꼴). 쉬운
구체 명사(가족 · 교통 · 일상)도 드물다. 오류는 **추상어와 뜻을 좁게 쪼갠 개념**에
몰린다 — `quality` · `idea` · `number`가 모든 언어에서 평균보다 높았다.

## 표제어부터 틀린 여섯

예문으로는 못 고쳐 표제어를 바꿨다.

| 낱말 | 전 | 후 |
| --- | --- | --- |
| `keep-ones-word` en | keep ones word | keep one's word |
| `ever-so-slightly` ru | чуть чуть | слегка (`чуть-чуть`은 `a-little`의 곁말) |
| `share-count` es | parte contada | parte |
| `showing-count` es | función contada | representación |
| `from-move-date` fr | Faites-le partir de mon emménagement («그를 떠나게 하라») | Comptez à partir de mon emménagement |
| `half-past` de | 예문 둘이 같은 문장 | 둘째 예문을 새로 썼다 |

## 영어 전수 점검 (2026-10-12)

위에서 «전수 교정은 하지 않는다»고 했으나, 2026-10-08에 독일어 · 스페인어 ·
프랑스어 · 러시아어 예문을 전수로 다시 쓴 뒤 영어도 같은 방식으로 읽었다. 그
주에 표제어를 바꾸며 새로 쓴 5,140줄은 빼고, 옛 생성 예문 **17,434줄**을 모두
봤다. **2,906줄(16.7%)을 다시 썼고**, 원문은 맞는데 `ko`만 틀린 871줄을 고쳤다
(0836018f). 다시 쓴 줄 가운데 첫째 예문 1,141줄은 소리를 다시 구웠다.

| 묶음 | 줄 | 다시 씀 | 비율 | `ko`만 |
| --- | --- | --- | --- | --- |
| scene | 2,318 | 68 | 3% | 10 |
| quality | 1,580 | 390 | 25% | 59 |
| action · number | 1,889 | 394 | 21% | 102 |
| idea · office | 2,028 | 531 | 26% | 90 |
| nature · city · time | 2,359 | 373 | 16% | 95 |
| school · sport · job · transport | 2,873 | 423 | 15% | 181 |
| food · everyday · body · travel | 2,640 | 457 | 17% | 163 |
| home · clothes · family | 1,747 | 270 | 15% | 171 |

표본(300줄)이 잡은 13%보다 높다. 오류가 **파일 안의 몇 구간에 뭉쳐** 있어서
표본에 덜 걸렸다. 걸린 꼴은 다섯이다.

1. **격언처럼 지은 일반론** — 둘째 예문에 몰린다: «A quiet desire lasts
   longer.» · «An intensive week beats a lazy month.» 첫째 예문과 달라야 한다는
   조건이 문장을 «A X는 Y다» 꼴로 밀어낸 것으로 보인다.
2. **추상 명사가 엉뚱한 동작을 하는 짝말** — «The sympathy came without
   words.» · «Rain killed the sales promotion.»
3. **사무 · 현대어에 붙은 옛 시골 배경** — 방앗간 · 소 떼 · 수레 · 나루:
   «The mill keeps flextime in summer.» 같은 문장을 피하려다 배경이 한쪽으로
   쏠렸다.
4. **표제형을 지키려는 문법 오류** — `did`를 끼우거나(«He did cause a
   mishap»), 원형을 그대로 두거나(«They always be late»), 주어를 뒤로 돌렸다
   («On the table stands a wineglass.»).
5. **`ko`가 다른 장면을 말한다** — 주로 첫째 예문이다. 영어만 다시 만들고
   한국어를 그대로 둔 흔적이다(«The sailor works on a ship.» / «선원이 밧줄을
   감습니다.»). she를 «그는»으로 옮긴 줄도 40여 개였다.

`check`는 표제어가 글자 그대로 있는지만 보므로 다섯 모두 지나간다. 잡는 그물은
사람(또는 에이전트)이 한 줄씩 읽는 것뿐이다.

### 예문으로 못 고친 표제어 69

점검하면서 표제어부터 틀린 개념 68을 따로 모았고, 짝을 맞추려고 `paternal-family`를
더했다. **59를 바꾸고 4를 뺐다.** 6은 표제어를 그대로 두었고, 그 가운데 셋은
예문만 새로 썼다. 뜻(`meaning_ko`)은 하나도 바꾸지 않았다. 영어를 개념에 맞췄다.

- **`oneself` · `one's`가 문장에 그대로 설 수 없다** → `you`로 바꿨다: warm
  yourself · talk to yourself · burn yourself · fend for yourself · keep your
  word · get your bearings.
- **쉼표 · 대문자가 빠졌다:** That was delicious, thank you · food, clothing and
  shelter · Antarctica · Bible.
- **두 뜻을 붙임표로 이은 말:** worry-trouble → worry · cost-expense → cost ·
  bond-tie → ties.
- **복수로 쓰는 말:** dentures · headphones · cosmetics · toiletries.
- **뜻이 다르다:** shiver → flinch(흠칫하다) · hazardous → reckless(무모한) ·
  dietary → low-calorie · novelty → new product · bachelor → bachelor's degree ·
  deputy → member of parliament · overdraw → overdraft.
- **뺀 넷:** swish-cook · cloth-count(셈말 폭) · evening-time · where-it-came-from.
  영어에 그런 말이 없거나, 같은 뜻의 개념이 이미 그 낱말을 가졌다.
