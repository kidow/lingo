# 俓 QQ 세 쌍의 고유 시작 기하 충분조건

원 관찰일은 2026-10-21이고 이 문서는 2026-10-22에 마감합니다. source-only 9p12m27의 논리4/5/6에 있는 원6MQ만 대상으로 신규 exact BigInt 유리수 산술1묶음을 수행했습니다. 기존 다른 글자의 κ 계산·검사를 재실행하거나 승계를 하지 않았으며 renderer·APP는 만들지 않습니다.

## 결론과 한계

여섯 고정 MQ의 초기 arc7 정칙성·곡률·ideal normal-offset injectivity 충분조건은 모두 성립합니다. 각 첫 MQ는 T=1/2,K=1/40, 각 둘째 MQ는 T=1/2,K=1/25입니다. 이는 개별 고정guide의 초기 이상기하 증명이며 두 원P의 접촉·마스크 연결성·전체coverage·후반곡선·AA·실제UA·필순·native 승인 증명이 아닙니다. ROOT의 원렌더링 시작/경계 HOLD는 그대로 유지합니다.

원 native15화면 중 각 global62.5% 세 화면은 연결된 꺾임으로 보이고 분리섬이 보이지 않았습니다. 이는 원 fullround 정책의 세 시점 관찰이지 새 성장 정책의 연결성 승인이 아닙니다. 세 둘째 MQ 시작점은 자기P bounds의 minX보다 작으므로 자기P 밖입니다. 이 문서는 첫 MQ의 시작점이 자기P 안인지, 두 원P의 전체 교집합/접촉시각, 성장표시의 모든 중간시점 연결성을 판정하지 않았습니다. 임의 hide-until-contact threshold·새 connector·guide 합성 없이 별도 검토가 필요합니다.

## 고정 원자료

- source: docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/
- strokes JSON SHA256: f731ac914a72e3021f43db274bca35d7b4f91968e964601f9112bdb900052726; 공개 fixture SHA256: 8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d
- 단일 actualfull5 engine-proof.json/id3 SHA256: 655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936
- 원27폴리곤과 모든 raw flags/guide/width14/weight 및 raw gap(-41/40,-2)은 불변입니다. min12 HOLD·원165 부분검토·정적대응과 방향/시간 미승인 이력을 보존합니다.

|mask/raw|원 guide|weight|전체 mask SHA256|
|---|---|---|---|
|4m1/raw4|`M50.8 21.5 Q45.675 29.5 38.5 39`|21.390185|`db6d4ea0ce8946865f9ec2e062c1b698b2a63aea3132a1b08ee8dc050f1d77ad`|
|4m2/raw5|`M37.9875 38 Q47.725 46 52.85 56.5`|23.730653|`e7970b812cc18bccdb49e3a4dbc712d5637770b94fa7d7cddc69797425854f43`|
|5m1/raw6|`M68.225 21.5 Q63.099999999999994 29.5 55.925 39`|21.390185|`e2db2142a762f083b3ef755a17dab7346c0d77baf7e9bce1c59e5bffc03fe190`|
|5m2/raw7|`M55.4125 38 Q65.15 46 70.275 56.5`|23.730653|`42fb545b11df11f37f0b2263982148e05744d297f748c4257e96085776df1d14`|
|6m1/raw8|`M85.65 21.5 Q80.525 29.5 72.8375 39`|21.688941|`0e3c40645a5e77dd1eb84a7f092cef5c7fae1cee4fde9f1dfb0be54e25a1e82f`|
|6m2/raw9|`M72.325 38 Q82.575 45.5 88.725 55.5`|23.983536|`b96b7a0f0ae6fe31fc542cf975bd58b0a1ed602c6652dc32d132c3a2e615b15e`|

5m1의 실제 guide 제어점 x=63.099999999999994를 이상적인63.1로 바꾸지 않았습니다. 아래 계산은 고정된 revealPath 소수문자열 자체를 정확분수로 해석했으며, 원raw args의 126.19999999999999 및 JavaScript /2 결과를 교정하지 않았습니다. 새 좌표는 생성하지 않았습니다.

## 초기 arc7 충분조건

Q(t)=P0+2At+Bt², A=C−P0, B=P0−2C+P2, λ=min_[0,T]|A+tB|²로 둡니다. 최소t는 이 볼록 이차식의 임계점 −A·B/|B|²를 [0,T]로 제한하여 구했습니다. 각 λ≥아래 λ0>0이며 |det(A,B)|≤C0입니다. 곡률은 κ≤C0/(2λ0^(3/2))<K입니다. 보수적 양성 margin 4K²λ0³−C0²>0과 chord(T)²>49를 각각 확인했습니다. 후자는 arc길이7에 도달하기 전에 t가 T를 넘지 않음을 보장합니다.

|mask|A|B|최소t|λ0|C0|4K²λ0³−C0²|chord(T)²|
|---|---|---|---|---|---|---|---|
|4m1|(-41/8,8)|(-41/20,3/2)|0|81|9|499041/400|652301/6400|
|4m2|(779/80,8)|(-369/80,5/2)|1/2|100|62|2556|15163609/102400|
|5m1|(-2562500000000003/500000000000000,8)|(-512499999999997/250000000000000,3/2)|0|81|9|499041/400|101922031250000033825000000000009/1000000000000000000000000000000|
|5m2|(779/80,8)|(-369/80,5/2)|1/2|100|62|2556|15163609/102400|
|6m1|(-41/8,8)|(-41/16,3/2)|0|81|13|463841/400|423457/4096|
|6m2|(41/4,15/2)|(-41/10,5/2)|1/2|100|57|3151|120893/800|

정확 λ와 cross는 다음과 같습니다. 같은 값이 나오는 두 별도mask도 각 actual guide에서 독립 계산했습니다.

|mask|정확λ|정확 det(A,B)|
|---|---|---|
|4m1|5777/64|697/80|
|4m2|3604121/25600|9799/160|
|5m1|22566406250000015375000000000009/250000000000000000000000000000|1742499999999979/200000000000000|
|5m2|3604121/25600|9799/160|
|6m1|5777/64|205/16|
|6m2|57521/400|451/8|

첫 MQ 세 개는 rK=7/40, cos(7K)≥3151/3200이고 차는2591/3200>0입니다. 둘째 MQ 세 개는 rK=7/25, cos(7K)≥1201/1250이고 차는851/1250>0입니다. 초기 arc0..7에서 회전각이 K·7 이하이고 normal strip의 국소 Jacobian 1−uκ는 |u|≤7에서 양수입니다. 서로 다른 두 normal 단면의 교차를 가정하고 앞 접선으로 투영하면 중심선의 투영하한 Δs·cos(7K)가 끝 normal의 가능한 투영 rK·Δs보다 크므로 모순입니다. 이 조건은 해당 초기 strip의 전역 injectivity를 주며 전체원P를 clip한 결과의 연결성은 따로 보장하지 않습니다.

이상적인 butt-prefix와 반경ρ=min(d,7)의 양끝 disc를 생각할 때 초기 d→0의 면적상한은 14d+2πd²→0입니다. 이 수학적 한계는 실제 SVG dash/cap/join/UA 반올림/AA 픽셀의 연속성·nestedness 증명이 아닙니다. 실제 적용을 검토한다면 같은 연결된 원guide의 UA L와 getPointAtLength(pL)를 동일p/frame에서 측정해야 하며 source weight·수학L을 그 측정값으로 대체하지 않습니다.

## 후속 권고

고유6MQ의 초기 인증자료는 준비 가능하지만 새renderer 승인은 요청·부여된 바 없습니다. 향후 ROOT가 별도 실험을 허용할 경우 정확한 wholeJSON/개별mask에 결박하고 먼저 각 epsilon·경계·global62.5%와 원P coverage/완료를 fresh native로 검토해야 합니다. 이전 다른 QQ의 분리 반례도 이 쌍에 자동이식하지 않습니다. 현재는 원 HOLD와 방향/시간/APP/runtime false를 유지합니다.

## 입력 핀과 실행범위

- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/README.md`: `ca09b85d4837b8f21457b71f651dc4ab24ba7e1586065a527a33fa9b4b727a26`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/config.json`: `bf816148dd4b7757badd4e7a65f42ef663460faae18fab2ace7d568a5f6e5efe`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/candidate.mjs`: `304172c2a399b831df6f89680326dc8ef5ee0ea9a0a70c9f4d8ab352e80ace69`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/candidate.d.mts`: `235a60584f8ba27a53105d7077c01c9a99cc99454d30f736ef68bedfb2c6a4ff`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/fixtures.json`: `8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/source-check.mjs`: `8df461a00dba9b5734a4b5bfe2603354cb06d8765cb16be194575035a071d830`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/serve.py`: `835a4e9eca8a992307309e04871d776694fb7db8acb3fdea4ee9fa61948c4732`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/preparation.json`: `95d0634cd76e6e9d5e762956683761295dbdaf0ec90476ec421d61130ae8550c`
- `docs/hanja-source-native-review-qq3-u4fd3-2026-10-21/README.md`: `8a615959737208bd857839adf1548ac8f648831022e93e334ce7340b23e00c68`
- `docs/hanja-source-native-review-qq3-u4fd3-2026-10-21/review.json`: `3792587736186dbea0464b26dc1fe189d6d55dc87e1a3a83dbcd6e342f881ca9`

새 산술1묶음과 이 문서의 입력10핀/메타1만 확인했습니다. 원source·기하·정책·renderer·APP·registry 변경0, compiler/factory/engine/서버/HTTP/UI/Git/build/TSC/기존검사 실행0입니다.
