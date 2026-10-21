# 綎 pen11 원P 투영 clip 가능성 검토

표시정책 후보의 이상기하 조건만 검토했다. **renderer 구현·실제 UA 진행 실험·native/APP/runtime 승인은 모두 0/false**다. 원 source8, 기존 HOLD, 원4점 body와 상단 corner, guide·폭·weight·flags는 변경하지 않았다.

## 고정 대상과 이미 확인된 한계

- source: `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/`, 13p15m35.
- 전체 geometry SHA256: `43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67`.
- fixture SHA256: `cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c`.
- 실제 full5: `docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json`, SHA256 `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`. 원 id3의 sourceRoot/sourceProofFile/sourceProofFileSha256 및 필수3/4인자 계약 유지. 별 header 합성·다른 variant 혼합 없음.
- pen11m1 mask SHA256: `a28fc333fc2c6241d32fce321060f1aa1dc7cc031f4dd0db80671e5a7a37dcc5`.
- 원 guide `M36.825 16.5 L52.975 16.5 L43 44.5`, width14/r7, weight45.873738, bounds[36.8,13,58.45,50.55]. 두 번째 구간은 사선 L이며 V가 아니다.
- raw8은 원 H, raw9는 flags22/113인 원 body4점과 **상단** corner5점이다. 끝 foot은 body4점 안에 있다. 마지막 polygon을 terminal tail로 간주하거나 기존 UP/LEFT kernel을 확대 적용하지 않는다.

앞선 정확 산술은 반복하지 않았다. body 엄격내부 witness (3027/80,50201/1000)는 원 full-round guide 반경7 바깥이며 마지막 endpoint까지 거리제곱이 236611229/4000000>49였다. ROOT 별도 coverage 보드에서는 marker 없는 residual에 좌하단 foot의 작은 검정 삼각형을 실제 관찰했다. 이는 원 full-round guide14가 P를 완전히 덮지 못한 근거다. 픽셀수·면적·near1 형태변화의 인과는 확정하지 않았다. 실제 보드 UA L=45.87373352050781/endpoint(43,44.5)은 해당 관찰값이며 새표시 검증값이 아니다. 원 native 기록 커밋은 2d71227fb0fb0f833daefb11a2baf91191d31743다.

## 원 polygon과 원 guide 좌표

새 source polygon을 만들지 않고 기존 outline의 세 부분만 식별한다. H/B/J라는 이름은 설명용이며 원 단일 mask11m1의 분할·새 source mask/weight 생성이 아니다.

`H=[(184/5,31/2),(1059/20,31/2),(1059/20,35/2),(184/5,35/2)]`

`B=[B0(278/5,17),B1(443/10,497/10),B2(753/20,1011/20),B3(199/4,33/2)]`

`J=[(999/20,31/2),(1059/20,13),(1169/20,35/2),(1119/20,19),(999/20,43/2)]`

`P=H∪B∪J`. 원 guide 점은 A=(1473/40,33/2), G=(2119/40,33/2), C=(43,89/2). 원 사선 벡터 V=C−G=(−399/40,28), 수직벡터 N=(−28,−399/40), V·V=1413601/1600이다. 원 좌표를 유리수로 표현했으며 outline/guide를 다시 생성하지 않았다.

## 새로 한 번 확인한 정확 조건

이번 새 산술 1회는 다음 조건만 계산했다. 기존 coverage witness·초기 K0 산술은 재계산하지 않았다.

B의 연속 삼점 cross는 [4157/20,86459/400,82097/400,39389/200], J는 [109/4,39/2,11/4,36,18]로 전부 양수다. 따라서 각 원 polygon은 엄격볼록이다. B 면적은 165237/800이다.

u(X)=(X−G)·V, z(X)=(X−G)·N으로 두면 다음과 같다.

| 원 body 점 | u | z |
| --- | --- | --- |
| B0 | −3899/320 | −6279/80 |
| B1 | 1625813/1600 | −8827/100 |
| B2 | 1770027/1600 | 71561/800 |
| B3 | 51471/1600 | 903/10 |

u는 두 경계 chain B0→B1→B2 및 B0→B3→B2에서 각각 엄격증가한다. 네 고유 u 사이의 3개 열린 slab에서 선 u=h와의 교점이 정확히2개이고 단면 폭은 양수다. B의 u-sublevel은 볼록한 단일 연결영역이다. u_min=−3899/320, u_max=1770027/1600, span=894761/800이다.

B0의 J 각 edge에 대한 cross는 [149/8,403/40,221/40,103/8,339/10]로 전부 양수다. 즉 **B의 첫 투영점 B0는 J의 엄격내부**다. 초기에 잘린 B의 작은 쐐기도 원 J 안의 양의 면적과 접촉한다. 이 조건을 원 guide endpoint가 B 안에 있다는 주장으로 바꾸지 않는다.

H와 J는 원 직사각형 [999/20,1059/20]×[31/2,35/2] 전체를 공유한다. 그 네 꼭짓점에 대한 J edge cross가 모두 비음수가 되었고, 접촉 면적은6이다. 두 볼록 polygon의 모든 수직단면은 x 중첩구간에서 이 직사각형의 y구간을 공유한다. 따라서 S=H∪J의 각 비어 있지 않은 수직단면은 한 interval이다. S의 x범위는 [184/5,1169/20], y범위는 [13,43/2]다.

## 조건부 두 단계 원P clip 안

이것은 **새 표시 계약의 제안**이며 구현·승인된 정책이 아니다. source의 MLL/flags22,113 및 mask weight는 그대로 유지한다. source별 원 polygon과 원 guide의 진행점만 사용한다.

### 1. 원 H 진행 중

이상적인 원 guide 점 q가 A→G에 있을 때 α_H=(q.x−1473/40)/(323/20)로 둔다. h_H=184/5+(433/20)α_H이며, 표시 집합은 S∩{x≤h_H}다. B는 아직 표시하지 않는다. 시작 x는 원 S의 최소값, 완료 x는 원 S의 최대값이므로 임의 threshold가 아니다. 원 H guide의 Δx에 대한 threshold 비는 433/323이다.

α_H 증가에 따라 집합은 포함관계로 증가한다. H의 왼쪽부터 시작하고 J가 등장하는 순간에도 H와의 공통 수직단면이 있으므로 이상집합에 분리섬이 없다. α_H=0은 면적0인 경계선이며 p0에서는 명시적으로 빈 현재획을 표시한다. α_H=1은 S 전체다. 면적변화 상한은 (17/2)|Δh_H|이므로 초기·전환 근처 유한면적 점프가 없다.

H의 표시 x범위가 원 guide H 끝52.975보다 큰58.45까지 정규화된다는 점은 숨기지 않는다. 이는 원 상단 corner J를 H 구간 동안 완성하는 새 표시 의미다. 국내의 시간방향/원 corner 형성 방식과 일치한다는 승인은 별도로 필요하다.

### 2. 원 사선 L 진행 중

q=G+α_L V인 원 사선 위에서는 α_L=(q.y−33/2)/28이다. h_L=u_min+(u_max−u_min)α_L로 두고, 표시 집합을 S∪(B∩{u≤h_L})로 제안한다.

사선의 화면 y가 증가하면 u threshold도 증가한다. B clip은 볼록하고 처음부터 B0를 포함하며, B0는 이미 완성된 J의 엄격내부다. 따라서 α_L>0의 새 B 부분은 S와 접촉하고 계속 중첩된다. 이는 두 별도 mask 사이의 gap을 잇는 connector가 아니라 **같은 원 mask 안에서 실제로 겹치는 원 polygon**에 대한 접촉 증명이다.

N방향 전체폭/(V·V)로부터 B의 strip 면적변화는 (40816/201943)|Δh_L| 이하이다. 따라서 α_L→0에서 새 body 면적은0으로 수렴하고, α_L→1에서 누락면적도0으로 수렴한다. H 완료와 L 시작의 표시 집합은 B0가 J 내부이므로 정확히 S로 같다. 마지막에는 B 전체가 표시되어 원 P가 된다. 사선과 H를 단일한 전역 x sweep로 취급하지 않는다.

### 3. p0, p1, 보존 범위

- p0는 선택한 현재획만 빈 집합이다. 선행 완료획을 지우지 않는다.
- 중간은 원 P의 부분집합만 표시하고 p1/whole/prefix는 원 P 전체다. source polygon의 점 추가·guide 연장·폭 확대·terminal 분할·새 source mask/weight는 없다.
- 원 round sweep가 P를 덮지 못한다는 반례 때문에 이 안은 기존 full-round 교집합 정책을 그대로 유지한 해법이 아니다. **완료에서도 원 P를 직접 사용하는 별도 source-specific 표시 계약**이 필요하다. 기존 정책의 완료/coverage 승인을 승계하지 않는다.
- source weight45.873738과 원 시간계약은 바꾸지 않는 안이지만 표시의 내부 공간배분은 달라진다. 시간방향 보존·국내 필순 애니메이션 일치는 아직 증명하거나 관찰하지 않았다.

## 실제 UA 연결 조건과 미증명 범위

미래 구현을 검토할 경우 연결된 원 guide DOM 한 개에서 같은 p/frame에 L_UA=getTotalLength(), q=getPointAtLength(p·L_UA)를 얻어야 한다. guide d/폭, 원 전체 geometry와 mask JSON, ownerSVGElement·parent·document, path/SVG/CSS transforms를 전·중·후 확인하고 유효성 확인 후 visibility를 마지막에 변경해야 한다. source getter나 다른 frame의 endpoint·복사 path로 대체하면 이 문서의 조건이 성립하지 않는다.

**수학적 전체길이·source weight45.873738·H길이323/20을 UA total length나 시간 경계로 쓰지 않는다.** H길이는 source 좌표식의 분모일 뿐이다. 이상기하에서는 q.y=33/2인 A→G와 q.y>33/2인 G→C를 구분할 수 있고 공통점 G에서는 두 표시 집합이 같다. 실제 getPointAtLength의 코너 양자화·부동소수점·좌표검증 및 경계 판정은 아직 조사하지 않았다. 임의 epsilon·시점 점프를 넣어 해결했다고 하지 않는다. 원 segment에 해당하는 유효 q임을 확인할 수 없다면 fail-closed/HOLD가 필요하다.

이 문서가 보장하지 않는 것은 다음과 같다.

- 실제 SVG clip 경계의 AA·픽셀 중첩·흰틈·국내 필순 방향 및 원 상단 corner의 시각적 자연스러움.
- UA 진행점 오차에서의 단조성·H/L branch 안전성 및 cleanup/정확 p1 DOM 동작.
- 다른12획, 네 Q 시작, pen12 HQ, source 전체 완성/진행/native/APP/runtime 승인.
- 다른 글자/다른 polygon/다른 flags 또는 기존 UP·LEFT guard로의 일반화.

권고는 **이 원 단일 mask11m1에만** 위 source-exact 두 단계 표시를 별도 후보로 검토하는 것 하나다. 구현 전에는 원 P/full5/전체13p15m35와 H/B/J 각 원문·진행점 계약을 묶어야 한다. 이후 ROOT의 전환점·0/epsilon·near1/1·원P 잔여·방향·자연재생 검토가 필요하다. 이번에는 새 renderer/서버/UI를 만들거나 실행하지 않았다.

## 핀과 수행 범위

새 필요 유리수 산술1회, 이 README의 source 핀/문서 메타 확인1회만 수행했다. 기존 witness 산술·기존 tests·factory·compiler·engine·projection·geometry 재실행0, 원 파일 변경0, 새 파일1. 아래 SHA256은 이 검토에 필요한 기존 입력21개다. 새 README 자신의 최종 SHA는 READY 보고로 전달한다.

| 입력 | SHA256 |
| --- | --- |
| `docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json` | `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25` |
| `docs/hanja-source-raw-review-u7d8e-2026-10-21/README.md` | `e8a162de87031a03476117a23900783990a2c2b4960c9b93c3a844bcc7c37a39` |
| `docs/hanja-source-raw-review-u7d8e-2026-10-21/review.json` | `e1dfaa520d4cb32397f71285392795ac7f9edae9e9ccd2a1c997bc4ad6ff6cac` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/README.md` | `9274f34ff4ae1e5c89e2e5483dbc999a981249665ea6e427637b07b67a2576e7` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.d.mts` | `621b42084c20ffa4f12523c422181cfa221c11478dab2a9eab7cb8a61ba937f3` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.mjs` | `ac38052ea783f34742fe8e72c1e55dcdfd457480ddac06fc2c49580d07f14709` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/config.json` | `96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json` | `cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/prep.json` | `8f312b99ac62bcdfd3e4bd18e703b9ed2d1b6e0e17a68ad8edd3d4f8138b4353` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/serve.py` | `67d83af82082be1fb2ad8fec0778a97daba5737919b6754dc0566e67628aaa38` |
| `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/source-check.mjs` | `6328a4431e7ada3e33780c352b763b5b27262822174ba8c24168304772748714` |
| `docs/hanja-u7d8e-start-geometry-proof-2026-10-21/README.md` | `40cd9f09bf92c580af78385c6ed3d727cb030cb2c143db5aa29672b3416b3e7c` |
| `docs/hanja-source-native-hold-u7d8e-startcaps-terminal-2026-10-21/README.md` | `da94b6f50b1a2b1fc299f2a3d7578adda9abf3e5b175387cc589589cb27186b3` |
| `docs/hanja-source-native-hold-u7d8e-startcaps-terminal-2026-10-21/hold.json` | `1822634ff57513cbf3d947a2e0c919ed16a0d312b435279afa441eca01acc7b5` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/README.md` | `53250b54873b8f631bf83b69add9cccd3d8a58be8dca203bcc0ed79b9d7e4360` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/config.json` | `d8ecc37eba80997469df557ba762fcf1e3f45d523216c4f49250fb0151026f95` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/check.mjs` | `4940a530f253965faf7b0afc362eb9e4f3b3754b666284d86bc5154106f09d10` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/serve.py` | `4e73c47063bba175401dda565a22fa1cbfd0ad6a902ac77264ca78085abc409b` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-2026-10-21/validation.json` | `fcf6891c9d6d757eecb47c7241a9772aefa999e8d565a8783f2a2bc600d0d3d4` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-native-2026-10-21/README.md` | `97a5b33a8f65f504c003a947bebd8a20603b49a88078c94e90b775a342cbd8fb` |
| `docs/hanja-u7d8e-pen11-terminal-coverage-native-2026-10-21/review.json` | `19cd472b684f354e465df9f810e06e6eaa8b7c21504bd113b5bb9c713b190c72` |
