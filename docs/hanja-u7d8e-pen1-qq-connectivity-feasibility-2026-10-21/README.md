# 綎 pen1 원QQ 연결성의 표시정책 한계

**현 성장cap 및 접촉 전 숨김만으로는 해결했다고 할 근거가 없다. 추가 source-specific 접촉·진행 근거가 필요하며 새 구현/native/APP/runtime 승인false다.** 원 두 P/guide/폭14/weight/gap, source13p15m35/35polygon과 기존 HOLD2는 수정하지 않았다. 합성guide·좌표보정·원P 재분할을 하지 않았다.

## 원자료와 관찰을 구분

고정 geometry는 `43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67`, fixture SHA는 `cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c`이다. 실제full5/id3을 그대로 사용한다.

| 항목 | 1m1 | 1m2 |
|---|---|---|
| 원raw0based |0|1|
| 원guide |M23.45 8 Q18.9 18.5 13.375 28|M6.55 22.5 Q14.35 28 17.6 38|
| 원width |14|14|
| 원weight |22.394321|19.035559|
| mask SHA256 |0e1c4f3eaef4e7555dba714951cd37b10d86d516ebc70ad0da6f26615093febf|021e400409eba0977e6df2ed33db961425cf087b0f0b3a6c65500b7ff75a1973|

1m1 guide 끝 E=(107/8,28), 1m2 guide 시작 S=(131/20,45/2)다. S−E=(−273/40,−11/2), 거리제곱122929/1600>0이다. 원 raw 좌표에서는 gap(−13.65,−11)이며 독립mask를 이어 붙인 guide가 아니다.

ROOT가 실제확인한 FAIL은 pen1 global.625의220px 후보에서 두경로 ink사이 흰틈과 작은별도조각이 보인 사건이다. 같은SVG 재확인1이있고520확인은없다. 원native-review2를수정하지않고참조한다. 실제그frame의 Q2 UA L/q/ρ값은 전달되지않았다. 이 문서의 이상기하 계산값을 그 UA실측값으로 쓰지 않는다.

## 두 원P는 서로 떨어져 있지 않다

새 정확분수 판정에서 C=(14,27)은 P1의 첫본체와 P2의 첫본체 양쪽의 **엄격내부**다. 원edge 위가 아니므로 작은 열린근방을 공유하며 교집합면적은양수다. 따라서 guide gap이 있다는것만으로 완성P1/P2가 분리되어있다고 할 수 없다. 원삼각장식/끝cap을 합성하거나 새source조각을 만들지 않은 채 원polygon 소속만 판정했다.

반면 W=(8,24)는 P2의 첫22점 본체 엄격내부이며 P1 전체에는없다. P1 전체 최소x=259/20=12.95>8이다. S에서 W까지 거리제곱1741/400<9다. 즉 P2의 시작쪽에는 P1과떨어져있으면서 원시작disc가 먼저노출할수있는 실제원P영역이있다.

P2의 다른polygon은 마지막5점 끝cap이다. 그 minY=178/5=35.6이고 S에서수직거리131/10=13.1이다. 원끝cap은 시작쪽본체와구분해야한다.

## global.625에서 어느 성분이 먼저 나타나는가

source weight로 계산하는 Q2 local진행은 정확히

`((5/8)(22.394321+19.035559)−22.394321)/19.035559 = 3499354/19035559`

이며 약.18383247899365604다. 이 비율은 helper의 mask시간배분이고 **UA L의 대체값이 아니다**. 실제성장거리는 d=local·L_UA이다.

원 Q2의 이상적 Bézier 길이 L_geo에는19<L_geo<21이라는거친유리수 경계가있다. chord²=144941/400>19²이고 두control leg제곱은9109/100<10²,1769/16<11²이므로 chord와control polygon 길이경계를사용했다. 따라서 이상모델의 d는

`66487726/19035559 < d < 73486434/19035559`, 즉3<d<4다.

이 구간의 시작disc ρ=d는 W를엄격히포함하므로 P2 첫본체의 열린영역이먼저보인다. 길이d prefix와폭14의sweep는 S에서거리 d+7<11 안에있고 두성장disc도거리2d<8 안에있다. 반면 P2 마지막cap의수직거리부터13.1>11이다. 따라서 **이상모델의 .625 시작조각은 P2의시작쪽22점 본체이며 마지막5점 끝cap이아니다**. 이 판정은 원P를분할해표시하라는뜻이아니다.

실제frame의UA L/q/ρ가미기록이므로 그screen의작은조각을 source좌표에일대일등록한검증까지했다고하지않는다. 정상UA측정이위이상길이경계와일치하는지는별도확인이필요하다. ROOT의 실제흰틈HOLD와위 source성분설명은서로다른근거다.

## 불성립한 충분조건과 남은 한계

원 Q2의 기존초기proof T1/2,K1/20은 그대로참조하고재증명하지않았다. 첫접선 A=(39/5,11/2)에대해 원P1∩P2의최소투영이단위접선거리8보다멀다는보수적충분조건을시험했으나불성립했다. 이조건을통과시키려고임의threshold를조절하지않았다. 따라서 이문서는 ideal원성장영역전체가 P1과분리됨을그투영경계로증명하지않는다. Native흰틈의원인을특정곡률이나특정정규선으로단정하지않는다.

확인된것은 완성P끼리는겹치지만 시작쪽P2영역은따로있고, 실제새표시에서중간분리조각이관찰됐다는점이다. 초기K조건은한mask의시작면적이0으로수렴하는조건이며 다른완료mask와의접촉조건이아니다. 앞선 epsilon/rho/local 통과로QQ연결성을승격할수없다.

## hide-until-contact는 충분한 해법이 아니다

기존성장영역의 P1접촉이생길때까지 P2를숨기고 접촉순간 기존성장영역전체를보이게하면, 이미만들어진 W주변같은양의면적부분도함께공개될수있다. 원성장영역이단조로누적되고접촉전그열린부분을숨겼다는조건이면접촉시유한면적점프가될수있다. 단순히연결된성분전체만선택해도그성분이P1에처음붙는순간이전에쌓인부분을한꺼번에보이는문제가남는다. 실제접촉시각/점프면적을계산하거나native확정한것은아니다.

반대로겹침C에서연결된앞부분만0면적부터성장시키는새정책은원guide시작 S에서진행하는표시순서와다를수있다. 추가guide/connector나임의원P분할없이가능하다는일반승인은할수없다. 특히 C→S쪽역방향노출이국내시간방향을보존한다는근거가현재없다. 원P가겹친다는위상사실만으로허용된표시정책이존재하거나불가능하다고전칭판정하지않는다.

권고는 **구현을보류하고 이원QQ의접촉방향근거1건을먼저확보**하는것이다. 정확.625의기존실제DOM L/q/ρ와원P성분을대응시키고 국내두번째조각의실제시간진행방향을함께고정해야 접촉영역에서연속노출하는후속정책을검토할수있다. 현재는 source-specific성장cap/단순숨김만의수정안을승인하거나새renderer를만들지않는다.

## 수행 및 핀

새필요산술1묶음의첫실행에서위투영8충분조건이실패했다. 그전의교집합양수/비율/원source조건을다시검사하지않고미실행tail1에서엄격내부witness와body/끝cap식별만확인했다. process종료로원source파서/함수RAM을필요prerequisite1회재구성했지만 교집합slab·면적·투영계산prefix는반복하지않았다. 기존passed tests/기존initialproof산술/sourcecompile/factory/engine/geometry/renderer/UI/server/Git/build 실행0. 새문서1의핀/메타확인만1회다. 최종핀메타 첫시도는 ROOT의 기존HOLD2 포트59412 보완으로 해당2핀에서중단됐다. 새문서의2핀만맞추고 실패2핀/미실행메타tail1만확인했으며 앞서통과한12핀은다시계산하지않았다.

| 기존입력 | SHA256 |
|---|---|
|`docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/config.json`|`96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0`|
|`docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json`|`cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c`|
|`docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.mjs`|`ac38052ea783f34742fe8e72c1e55dcdfd457480ddac06fc2c49580d07f14709`|
|`docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/prep.json`|`8f312b99ac62bcdfd3e4bd18e703b9ed2d1b6e0e17a68ad8edd3d4f8138b4353`|
|`docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json`|`e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`|
|`docs/hanja-u7d8e-start-geometry-proof-2026-10-21/README.md`|`40cd9f09bf92c580af78385c6ed3d727cb030cb2c143db5aa29672b3416b3e7c`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/README.md`|`ce624861466e5120a68a8f1fef05634def9b3185c0730660828513b3b75b3962`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/check.mjs`|`a46c996afbf596949d4ac857963665271d69892fbaf7a2f9df5b28a9b6bb2946`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/config.json`|`2cbd091e85902619d02694e8b37aba52618fe596a1d020813b3553babb508c4a`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/render.mjs`|`0c1f0ac9e154186745b32a5ab575096663e4e3740fad83f920bdd4f839e4c4ca`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/serve.py`|`cb963aa8c3831cf3220175987f6fb05c8c40340247ab9b705cc3dbcd07d2b13b`|
|`docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/validation.json`|`aa487782764998460afd84f2c82981a71731cf5089fcf270984257172042e6da`|
|`docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/README.md`|`93b1562404186b6746c764c68d1fc9c319688957fdfea0ef5f4ec97d0df5e363`|
|`docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/review.json`|`43cff5019266b20a807b9106f565da1b7aab7bfb6c78c113e66fd3a135357bb7`|
