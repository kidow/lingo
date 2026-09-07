# TOEIC(TSL) 실질 상한 — 남은 547개를 갈래로 나눴다

확인일: 2026-09-08. 대상: `pnpm coverage --missing tsl`의 목록. 그 시점 703/1250 (56.2%).

**같은 날 이 문서가 센 것을 그대로 넣었다** — 곁말 38개와 새 개념 셋
(`duplicate`·`freight`·`purser`). 744/1250 (59.5%)이 됐고, 아래에서 상한으로
적은 숫자와 같다. 남은 것은 뜻을 더 봐야 하는 곁말 아홉과 보류한 후보 넷뿐이다.

TSL은 **끝이 있는 유일한 목록**이라 남은 수가 그대로 할 일처럼 보인다. 한 배치를
넣어 보니 아니었다 — 후보 쉰 남짓 가운데 열하나만 살아남았고 나머지는 그림이
안 서거나 이미 있는 개념이었다. 그래서 채우기 전에 **채울 수 있는지부터 셌다.**
[TORFL 등급별 상한](a1-gap-audit.md)에 했던 셈과 같다.

## 결론

빠진 547개 중 **정말 없는 것 490개**를 갈래로 나누면 이렇다.

| 갈래 | 개수 | 채울 수 있나 |
| --- | ---: | --- |
| 추상 명사 (`productivity` · `morale` · `compliance`) | 118 | **못 넣는다** |
| 그림이 서지 않는 형용사 (`eligible` · `plausible` · `applicable`) | 115 | **못 넣는다** |
| 그림이 서지 않는 동사 (`facilitate` · `comply` · `clarify`) | 84 | **못 넣는다** |
| 부사 (`sincerely` · `promptly` · `accordingly`) | 63 | **못 넣는다** |
| 글자·로고·호칭·기능어 (`logo` · `letterhead` · `yen` · `ma'am` · `whoever`) | 6 | **못 넣는다** (IMAGE_STYLE) |
| **기존 개념과 그림이 같아지는 것** | **50** | 개념으로도 곁말로도 못 넣는다 (아래) |
| **기존 개념의 다른 말** | **47** | 곁말(`also`)로 넣는다 |
| **새 개념으로 넣을 수 있는 것** | **7** | 그중 셋만 확실하다 |

여기에 목록에는 없지만 우리 글 안에 이미 있는 것 57개가 더 있다 — 표제어 안에
든 것 42개(`vending machine` 안의 `vend`처럼), 예문에만 있는 것 15개.

즉 **실질 상한은 757/1250 (60.6%)**이고, 뜻을 더 봐야 하는 것을 다 빼면
744(59.5%)에서 끝난다. 56.2%는 바닥이 아니라 **천장에서 네 뼘 아래**다.

**출제 기준으로는 더 낮다.** 곁말은 소개 카드에만 붙고 퀴즈에 한 번도 안 나온다
(spec.md §4). 지금 703 가운데 6개가 이미 곁말뿐이므로, 실제로 문제가 되는 것은
697개다. 새 개념 일곱을 다 넣어도 **704(56.3%)**가 출제 기준 천장이다.

## 왜 이 목록만 이렇게 안 채워지나

**TSL이 코퍼스 빈도 목록이기 때문이다.** HSK·TORFL은 사람이 등급별로 고른
어휘표라 구체 명사가 앞쪽에 몰려 있는데, TSL은 TOEIC 대비 교재에서 자주 나온
순서대로 뽑았다. 그래서 파생어와 부사가 표제어 자리를 그대로 차지한다 —
`sincere`가 아니라 `sincerely`, `produce`가 아니라 `productivity`다.

넷을 합치면 380개, 정말 없는 것의 **77.6%**가 그림 없이 뜻만 있는 낱말이다.
그림이 서는 형용사(색·크기·온도)와 동사(먹다·달리다)는 이미 다른 트랙이
가져가 채웠다. 남은 형용사는 `eligible`·`plausible`처럼 **판단**이고, 남은
동사는 `facilitate`·`comply`처럼 **사무 절차**라 실루엣이 없다.

## 그림이 같아지는 50개

새 개념으로 만들면 4지선다에서 서로 오답으로 깔린다. 그림까지 같으므로 카드가
성립하지 않는다.

| 빠진 낱말 | 이미 있는 자리 |
| --- | --- |
| `layoff` | `lay-off`(해고하다) — 그림 프롬프트까지 같았다 (상자 들고 나가는 사람) |
| `relocation` · `removal` | `relocate`(이전하다) |
| `renovate` · `remodel` | `renovation`(개조 공사) |
| `statistics` | `chart`(도해) · `graph`(그래프) · `bar-chart`(막대그래프) |
| `sue` | `judge`(판사) · `courthouse`(법원) |
| `forbid` | `ban`(금지) |
| `hygiene` | `soap`(비누) · `towel`(수건) · `hand-sanitizer`(손소독제) |
| `bankruptcy` | `go-bankrupt`(파산하다) |
| `spa` | `sauna`(사우나) · `hot-spring`(온천) |
| `dealership` | `showroom`(전시장) |
| `counselor` | `advisor`(고문) · `therapist`(치료사) · `psychologist`(심리학자) |
| `homeless` | `beggar`(거지) |
| `bye` | `see-you`(또 봐요) |

**품사나 태가 달라 곁말로도 못 들어간다.** `relocation`(명사)과 `relocate`(동사)는
같은 낱말이 아니고, `layoff`와 `lay off`도 마찬가지다. 곁말은 **같은 품사·같은
뜻의 다른 표기**만 받는다 (spec.md §5).

## 가장 큰 채울 수 있는 갈래는 곁말이다 — 47개

spec.md §7은 "영어는 철자 변이만 넣는다"고 적었고, 그 근거는 "빠진 것이 대부분
파생어"였다. 그건 맞다(380개). 그런데 나머지에는 **파생어가 아니라 같은 뜻의
다른 낱말**이 47개 섞여 있다. 러시아어·중국어에서 곁말을 넣어 숫자를 올린 것과
같은 자리다.

| 빠진 낱말 | 붙일 개념 |
| --- | --- |
| `automobile` · `auto` · `sedan` | `car`(자동차) |
| `physician` | `doctor`(의사) |
| `attorney` | `lawyer`(변호사) |
| `salesperson` · `salesman` · `salespeople` | `clerk`(점원) |
| `waitress` | `waiter`(종업원) |
| `instructor` | `teacher`(선생님) |
| `trainee` | `intern`(인턴) |
| `realtor` · `stockbroker` | `broker`(중개인) |
| `stockholder` | `shareholder`(주주) |
| `messenger` | `courier`(택배원) |
| `renter` | `tenant`(세입자) |
| `businessperson` | `businessman`(사업가) |
| `entrepreneur` | `founder`(창립자) |
| `teen` | `teenager`(십 대) |
| `photocopier` | `copier`(복사기) |
| `memorandum` | `memo`(메모) |
| `handbook` | `manual`(설명서) |
| `booklet` · `pamphlet` | `brochure`(안내책자) |
| `bookcase` | `bookshelf`(책장) |
| `smartphone` | `cellphone`(휴대전화) |
| `freighter` | `cargo-ship`(화물선) |
| `congestion` | `traffic-jam`(교통 체증) |
| `hazard` | `danger`(위험) |
| `alert` | `warning`(경고) |
| `vacant` | `empty`(빈) |
| `wildlife` | `wild-animal`(야수) |
| `seaside` | `beach`(해변) |
| `pant` | `pants`(바지) |
| `congratulation` | `congratulations`(축하합니다) |
| `await` | `wait`(기다리다) |
| `oversee` | `supervise`(감독하다) |
| `disconnect` | `unplug`(뽑다) |
| `dispose` | `discard`(버리다) |
| `gymnasium` | `gym`(헬스장) |
| `diner` | `restaurant`(식당) |
| `residence` | `house`(집) |
| `attire` | `clothes`(옷) |
| `accessory` | `jewelry`(장신구) |
| `periodical` | `magazine`(잡지) |
| `vend` | `vending-machine`(자판기) |
| `webpage` | `website`(웹사이트) |

**아홉은 넣기 전에 뜻을 다시 본다.** 표 아래쪽 아홉(`gymnasium` · `diner` ·
`residence` · `attire` · `accessory` · `periodical` · `vend` · `sedan` ·
`webpage`)은 뜻이 미세하게 갈린다 — 체육관과 헬스장, 간이식당과 식당, 세단과
자동차, 웹페이지와 웹사이트는 상하위 관계지 같은 말이 아니다. 곁말은 "또는"으로
붙어 같은 것이라고 가르치므로, 갈리는 것을 넣으면 틀린 것을 가르친다. 이 아홉을
빼면 38개다.

`pnpm claim`으로 임자를 확인했다. 넷이 걸렸지만(`auto`←독일어 `Auto`,
`photocopier`←프랑스어 `photocopier`, `gymnasium`←독일어 `Gymnasium`,
`entrepreneur`←프랑스어 `entrepreneur`) **모두 다른 언어의 표기**다. 곁말
검사와 오답 뽑기는 같은 언어 안에서만 도므로(scripts/check.ts) 영어 곁말로는
막히지 않는다. claim은 표기만 보기 때문에 언어를 가리지 않고 짚는다.

## 새 개념 후보는 일곱, 그중 셋만 확실하다

| 낱말 | 뜻 | 판단 |
| --- | --- | --- |
| `duplicate` | 사본 | **넣는다.** 같은 종이 두 장이면 서고, `copier`(기계)와 그림이 갈린다 |
| `freight` | 화물 | **넣는다.** 팔레트에 묶인 나무 상자. 다만 중국어 `货物`와 러시아어 `груз`는 `shipment`(발송품)의 것이라 `货运`·`фрахт`로 간다 |
| `purser` | 사무장 | **넣는다.** 제복과 현금 상자. `captain`(선장)·`sailor`(선원)와 갈린다 |
| `login` | 로그인 | 보류. 자물쇠와 입력줄인데 `email`(전자우편)이 이미 화면에 아이콘과 줄을 그린 그림이다 |
| `contestant` | 참가자 | 보류. 프랑스어 `candidat`·독일어 `Teilnehmer`·러시아어 `участник`가 모두 임자라 표기를 새로 골라야 한다 |
| `entrée` | — | 보류. 미국에서는 주요리, 그 밖에서는 전채다. 뜻이 갈리면 그림도 갈린다 |
| `erase` | 지우다 | 보류. 스페인어 `borrar`가 `delete`(삭제하다)의 정답이라 스페인어 표기를 못 세운다 |

## 어떻게 갈랐나

기계로 1차를 냈다 — 접사를 벗겨 우리 표기와 대조하는 방식이다. 490개 중 198개가
파생·합성으로 잡혔는데 **오탐이 그대로 섞여 있었다.**

`distractor`←`tractor` · `cater`←`cat` · `revision`←`vise` · `intonation`←`ton` ·
`residence`←`side` · `repetition`←`petition` · `purser`←`purse`

표기가 겹치는 것과 뜻이 이어지는 것은 다르다. 그래서 최종 갈래는 **뜻으로**
매겼다. 기계는 후보를 좁히는 데까지만 썼다.

## 이 숫자를 어떻게 쓰나

- **"547개 남음"은 일감이 아니다.** 일감은 곁말 47(확실 38) + 새 개념 7(확실 3),
  합쳐 쉰 남짓이다.
- 곁말을 다 넣어도 **출제되는 문제는 한 개도 안 는다.** 숫자를 올릴 것인지
  카드를 채울 것인지 먼저 정한다.
- 그 쉰을 넣고 나면 TSL에서 더 할 일이 없다. 다음은 목록을 바꾼다 — HSK 7-9급이
  2,004/5,562(36.0%)로 남은 목록이 가장 크다.
