# 綎 고정 여섯 시작 대상의 초기 arc7 검토

원 source13p15m35/35polygon, geometry `43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67`와 실제 base full5/id3 `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`를 그대로 고정합니다. `engine-whole-u7d8e.json` 실제full5이며 다른 root나 header를 합성하지 않습니다. source JSON/flags/guide/outline/폭14/weight/순열과 원 HOLD·최소14/sourceGroups[]는 수정하지 않습니다. **綎 source actual native는 아직 미실시**이고 이 문서에 native 시작 FAIL/PASS 증거는 없습니다. native/APP/runtime 승인false입니다.

## 원 guide 문법 직접 분류

| target | 0-based raw | 문법 | 고정 원 guide | weight / bounds | mask JSON SHA256 |
|---|---|---|---|---|---|
| 1m1 | [0] | MQ | `M23.45 8 Q18.9 18.5 13.375 28` | 22.394321 / [12.95,6.6,26.95,28.2] | `0e1c4f3eaef4e7555dba714951cd37b10d86d516ebc70ad0da6f26615093febf` |
| 1m2 | [1] | MQ | `M6.55 22.5 Q14.35 28 17.6 38` | 19.035559 / [6.65,22.4,19.95,39.4] | `021e400409eba0977e6df2ed33db961425cf087b0f0b3a6c65500b7ff75a1973` |
| 2m1 | [2] | MQ | `M32.875 19.5 Q23.775 38 13.05 55` | 40.660554 / [12.65,18.05,36.25,55.2] | `67843a8282a765c661853d0ced78e0ea40259242c3ac7730a11d56a1c4d5c836` |
| 2m2 | [3] | MQ | `M7.2 56.5 Q20.85 54.5 32.875 50.5` | 26.366752 / [6.25,50.05,33,60.7] | `12ce1069bf0308c337e9128d22a8b6da2291aa74f6485352efd910e74c80811c` |
| 11m1 | [8,9] | MLL, H 뒤 사선 L | `M36.825 16.5 L52.975 16.5 L43 44.5` | 45.873738 / [36.8,13,58.45,50.55] | `a28fc333fc2c6241d32fce321060f1aa1dc7cc031f4dd0db80671e5a7a37dcc5` |
| 12m1 | [10,11] | MLQ, H 뒤 Q | `M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5` | 67.486235 / [31.4,41,61.3,93.9] | `4c02c9beac272d4710fe32fdec9280384ebf8a6442d1eb69d6aeea132437e3ed` |

raw0..3은 각각 원 cdDrawCurve입니다. logical11은 원 raw8 H와 raw9 사선 L의 exact endpoint 결합입니다. 마지막 L은 δ=(-399/40,28)로 x·y가 모두 변하므로 수직 V가 아닙니다. 원 flags22/113을 근거로 guide를 H/V로 바꾸지 않습니다. logical12는 원 raw10 H와 raw11 Q의 exact endpoint 결합이고 flags22/7을 그대로 보존합니다. raw9→10의 incidental 접점은 별획으로 남습니다. QQ1/2의 원 mask간 gap과 전후 순열은 그대로이며 정적 대응은 시간방향 승인으로 확대하지 않습니다.

## 네 MQ의 고유 충분조건

각 원 Q(t)=P0+2At+Bt²에서 A=P1−P0, B=P2−2P1+P0로 두고 S(t)=|A+Bt|²의 [0,T] 최솟값λ를 계산했습니다. c=det(A,B), |κ|≤|c|/(2λ^(3/2))이므로 λ>0, chord²(T)>49, 4K²λ³−c²>0, 1−(7K)²/2>7K이면 처음 arc7이 t<T 안에 있고 초기 ideal normal-offset의 충분조건이 됩니다. 모든 수는 해당 원 guide의 정확 십진 유리수에서 새로 계산했으며 다른 글자의 인증 수치/통과를 이식하지 않았습니다.

| target | T | K | min t | λ | chord²−49 | 4K²λ³−c² | cos lower−7K |
|---|---|---|---|---|---|---|---|
| 1m1 | 1/2 | 1/100 | 1/2 | 802409/6400 | 2023489/25600 | 373331548254503929/655360000000000 | 18551/20000 |
| 1m2 | 1/2 | 1/20 | 4296/16381 | 5784025/65524 | 251389/6400 | 3672259209617128221/1125281544791296 | 471/800 |
| 2m1 | 1/2 | 1/100 | 1/2 | 2645249/6400 | 9469041/25600 | 17257462126068373249/655360000000000 | 18551/20000 |
| 2m2 | 1/2 | 1/100 | 1/2 | 1112329/6400 | 3395761/25600 | 764608631655587289/655360000000000 | 18551/20000 |

| target | A | B | c | rK | cos lower |
|---|---|---|---|---|---|
| 1m1 | ["-91/20","21/2"] | ["-39/40","-1/1"] | 1183/80 | 7/100 | 19951/20000 |
| 1m2 | ["39/5","11/2"] | ["-91/20","9/2"] | 481/8 | 7/20 | 751/800 |
| 2m1 | ["-91/10","37/2"] | ["-13/8","-3/2"] | 3497/80 | 7/100 | 19951/20000 |
| 2m2 | ["273/20","-2/1"] | ["-13/8","-2/1"] | -611/20 | 7/100 | 19951/20000 |

네 target 모두 엄격 양성입니다. rK<1이므로 초기 normal map의 Jacobian1−uκ는 |u|≤7에서 양성입니다. 서로 다른 arc s<t의 offset이 만난다면 Δ=t−s≤7에 대해 T(s) 방향 chord투영≥Δ cos(KΔ)≥Δ cos lower인 반면 offset차 투영절댓값≤7KΔ라서 모순입니다. 이것은 초기arc≤7의 ideal regular/injective 조건이며 SVG pixel coverage나 원P 교집합의 연결성 증명이 아닙니다.

## HL/HQ의 별도 직선 초기 구간

| target | 실제 문법 | 첫 H 길이 | 첫 길이²−49 | 초기곡률 / 접선 | 첫 arc7 이후 위험 |
|---|---|---|---|---|---|
| 11m1 | MLL-first-H-with-later-diagonal | 323/20 | 84729/400 | K0 / (1,0) | 다음 벡터 ["-399/40","28/1"]; G1 아님 |
| 12m1 | MLQ-first-H | 513/40 | 184769/1600 | K0 / (1,0) | 다음 벡터 ["-57/20","39/1"]; G1 아님 |

11m1은 MLL-first-H-with-later-diagonal,12m1은 MLQ-first-H라는 서로 다른 고정 문법입니다. 첫 H가 각각323/20=16.15와513/40=12.825라서 r7보다 크고, 초기arc7에는 앞 segment·corner가 없습니다. 이 부분의 K0는 뒤 사선/뒤 Q의 곡률을0으로 주장하는 것이 아닙니다. 12의 Q 시작 방향은 (-57/20,39)이며 첫 H와 G1로 이어지지 않습니다. 두 대상 모두 첫 직선 길이를 전체 원 guide UA L로 대체해서는 안 됩니다.

## 보류 위험과 범위

첫 d≤7 구간의 ideal strip+성장disc 후보 면적상한14d+2πd²→0만 사용할 수 있습니다. 원P·선행mask와의 연결, QQ global진행 중의 분리섬, 11의 H→사선 corner/flags22·113,12의 H→Q corner와 원종단,13의 원flags7·0, 원P전체coverage, arc7이후의 정상선/단조성, p1/전체/prefix mask정책과 실제UA raster, 국내 시간필순은 별도 미승인입니다. 모든 원 polygon/guide/width/weight를 그대로 둔 채 이 조건만으로 renderer/native 통과를 선언하지 않습니다. 이 문서에서 renderer/APP/source 수정과 tail분리는0입니다.

## 고정 핀과 실행

- `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/config.json`: `96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0`
- `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/fixture.json`: `cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c`
- `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.mjs`: `ac38052ea783f34742fe8e72c1e55dcdfd457480ddac06fc2c49580d07f14709`
- `docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/prep.json`: `8f312b99ac62bcdfd3e4bd18e703b9ed2d1b6e0e17a68ad8edd3d4f8138b4353`
- `docs/hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json`: `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`
- `docs/hanja-source-raw-review-u7d8e-2026-10-21/README.md`: `e8a162de87031a03476117a23900783990a2c2b4960c9b93c3a844bcc7c37a39`
- `docs/hanja-source-raw-review-u7d8e-2026-10-21/review.json`: `e1dfaa520d4cb32397f71285392795ac7f9edae9e9ccd2a1c997bc4ad6ff6cac`
- `docs/hanja-u6e7a-start-geometry-proof-2026-10-21/README.md`: `1b022108cad73df9d24c1fcb9e565a707d35260e934e59201e0cec930aa09efd`

이전 湺 proof는 설명 구조 참고만이며 綎 수치/인증을 대신하지 않습니다. 110847byte fixture는 이 여섯 target 추출에 명시적으로 필요하여 context-mode에서 로컬 분석하고 원polygon 전체를 출력하지 않았습니다. 고유 유리수 산술 최초1회, 필요 source핀·고유6mask·문서 메타1회만 수행합니다. 기존 source검사/engine/compiler/factory/새geometry/서버/UI/Git/build/TSC 실행0입니다. 처음 prep 이름을 preparation.json으로 추정한 읽기1은ENOENT였고 실제prep.json을 확인했으며 자료생성/변경은 없었습니다.
