# 湺 고정 다섯 시작 대상의 초기 arc7 검토

대상은 base u6e7a의12p13m23/23polygon, geometry `643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6`입니다. 원 actualfull5/id3 `ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9`와 별도 body3 `9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c`를 유지합니다. 원 guide/outline/width14/weight/order/빈raw5/QQgap/口7접합을 바꾸지 않습니다. 이 문서는 표시 구현이나 native 통과 기록이 아닙니다. **湺 source actual native는 아직 미실시**이고 시작 FAIL을 관찰했다고 주장하지 않습니다.

## 직접 읽은 고정 대상

| target | 0-based raw | 문법 | 원 guide | weight / 원 bounds | mask JSON SHA256 |
|---|---|---|---|---|---|
| 1m1 | [0] | MQ | `M13.16 10 Q22.16 13.5 26.12 20.5` | 16.679676 / [13.45,9.75,28.2,22.05] | `4e9920c85e2f23d90321d86891a93b62ad0991831540253b333aa53a8afb09ca` |
| 2m1 | [1] | MQ | `M6.32 33 Q16.04 36.5 19.64 43.5` | 16.960908 / [6.6,32.7,21.75,44.95] | `fff8024b411e3899ae9a592f85ede33c15f64adbc996d5850dc06b462541fbee` |
| 3m1 | [2] | MQ | `M7.04 66.5 Q19.64 71 18.2 92` | 27.83515 / [7.35,66.2,21.25,93.45] | `9aad0d4ea4da1b98c089bcfb21e44dbe366221502d00682980c6e4bf79bbe7a7` |
| 3m2 | [3] | MQ | `M16.4 75 Q17.84 69 32.96 33.5` | 44.682028 / [13.45,33.3,33.35,75.7] | `aefa96b7c578bb177bbba1c2abbcb2c70da1b09548284f95a8c90cf71c282f5a` |
| 7m1 | [8,9] | MLL, 첫 H 직선 | `M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40` | 54.22 / [56,10,89.2,47] | `1f7c593b97516e4e19525ac968f9cbb8132163beff3ab101b32cc80ce190b185` |

1m1/2m1/3m1/3m2는 각각 원 cdDrawCurve이고, 7m1은 원 raw8 cdDrawLine H 뒤 raw9 cdDrawLine V가 exact endpoint로 접합된 MLL입니다. 7m1을 Q로 분류하거나 곡률 Q 인증을 강제하지 않습니다. 3m1과3m2는 서로 다른 두 Q mask로 남으며 원 gap[-3.6,-34]는 보존됩니다.

## Q별 고유 유리수 충분조건

원 Q(t)=P0+2At+Bt², A=P1−P0, B=P2−2P1+P0로 둡니다. S(t)=|A+Bt|²의 [0,T] 최솟값 λ와 c=det(A,B)에 대해 |κ|≤|c|/(2λ^(3/2))입니다. 따라서 λ>0, chord²(T)>49, 4K²λ³−c²>0, 1−(7K)²/2>7K를 각 고정 control에서 계산합니다. chord²>49와 regularity 때문에 처음 arc7은 t<T 안에 있습니다. 표의 분수는 저장된 원 guide 십진 문자열의 정확 유리수이고 부동소수 샘플/수치적분 증명이 아닙니다.

| target | T | K | min t | λ | chord²−49 | curvature margin 4K²λ³−c² | cos lower−7K |
|---|---|---|---|---|---|---|---|
| 1m1 | 1/2 | 1/20 | 1/2 | 695529/10000 | 1201929/40000 | 94995559291520889/100000000000000 | 471/800 |
| 2m1 | 1/2 | 1/20 | 1/2 | 719181/10000 | 1488669/40000 | 64616379494406741/100000000000000 | 471/800 |
| 3m1 | 1/2 | 1/12 | 28515/130381 | 20412324/130381 | 4320749/40000 | 45864288693287205150411/1385233355060213125 | 71/288 |
| 3m2 | 1/3 | 1/11 | 0/1 | 23796/625 | 2048581/202500 | 7572864386844/29541015625 | 39/242 |

| target | A | B | c | rK | cos lower |
|---|---|---|---|---|---|
| 1m1 | ["9/1","7/2"] | ["-126/25","7/2"] | 2457/50 | 7/20 | 751/800 |
| 2m1 | ["243/25","7/2"] | ["-153/25","7/2"] | 1386/25 | 7/20 | 751/800 |
| 3m1 | ["63/5","9/2"] | ["-351/25","33/2"] | 6777/25 | 7/12 | 239/288 |
| 3m2 | ["36/25","-6/1"] | ["342/25","-59/2"] | 198/5 | 7/11 | 193/242 |

네 target은 위 값이 모두 엄격 양성이므로 각자 초기 arc≤7의 충분조건을 충족합니다. 같은 물수변이나 다른 글자의 인증/통과를 차용한 판단이 아닙니다. 이 검토에서 곡률 조건 실패 target은 없어서 원P x-monotone clip 대안을 추가로 승인하거나 구현하지 않습니다.

## 초기 normal-offset의 제한된 의미

arc0..7에서 rK<1이므로 normal map의 Jacobian 1−uκ는 |u|≤r에서 양성입니다. 서로 다른 s<t의 normal offset이 만난다고 가정하면, Δ=t−s≤7이고 시작 접선 T(s)에 투영한 원 chord는 ≥Δ cos(KΔ)≥Δ[1−(7K)²/2]입니다. offset 차이의 같은 투영 절댓값은 ≤rKΔ이므로 위 엄격 부등식과 모순입니다. 따라서 이 초기 구간의 이상적 normal-offset은 regular/injective입니다. 원 SVG dash/butt/miter의 실제 UA raster가 이 이상기하와 동일하다고 단정하지 않습니다.

## 7m1 별도 첫 직선 조건

MLL 첫 H의 실제 문자열 x차는 `13860000000000007/500000000000000`이고 y차0, tangent(1,0), K0입니다. 이 길이는27보다 크고 따라서 r7보다 큽니다. 첫 arc7에는 앞 segment나 corner가 없습니다. 부동소수 표기 때문에 이 exact guide 길이를 임의로27.72로 재작성하지 않습니다. 첫 직선 길이를 전체 path BrowserL로 대체하지 않습니다. 다음 H→V corner와 원 flags22/23의 진행·완료는 이 초기 조건의 범위 밖입니다.

## 승인하지 않는 범위

초기 ideal strip과 반지름ρ=min(d,7)의 두 disc 후보의 면적 상한은 d≤7에서14d+2πd²→0입니다. P와의 교집합 연결성, 이전 mask와의 접촉, QQ 전체 진행.625 등에서의 섬, arc7 이후의 offset/round-cap 중첩·단조성, 전체 원P coverage, cardinal/terminal 형태, p1 mask 전환, actual UA pixel 연속성, 국내 시간방향을 보장하지 않습니다. 원 gap을 건너는 connector나 새 guide를 만들지 않습니다. 향후 renderer가 생기더라도 원geometry 전체와 각 mask JSON을 정확히 결박하고 ROOT가 coverage/epsilon/경계/coarse/fine/완료/자연재생을 새로 검토해야 합니다. native/APP/runtime 승인false입니다.

## 원 자료 핀과 실행 범위

- `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/config.json`: `aae777e3fd0680c43e6e0aade49749bc120b7f727292e3ae555cb827777a1a92`
- `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/fixtures.json`: `247767960d239c885d98e1975f0774de34fac914ab1a9402bcf602d78e8f8aa4`
- `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/candidate.mjs`: `cf2e80cca7dc84accb0e7de98cb8b670de40f5fea6ea82656ca50062b4675fe4`
- `docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/preparation.json`: `ec17ac9bd20bb291591b206669aa570ce32ddb991ba6f0643b1ca1f77c2f744e`
- `docs/hanja-goal-glyphwiki-batch1087-2026-10-13/engine-proof.json`: `ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9`
- `docs/hanja-goal-glyphwiki-batch1087-2026-10-13/engine-whole-u6e7a.json`: `9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c`
- `docs/hanja-source-raw-review-u6e7a-2026-10-21/README.md`: `8ea59a2fb06d959ea9f13e8972a77a403d36e20b7e9908ca94b7d89da22c5e1f`
- `docs/hanja-source-raw-review-u6e7a-2026-10-21/review.json`: `846f5f57f0f7a277c955b9cf8384dba79f6e3d202a2047ff9f7fe27abc13277a`

고유5대상 최초 유리수 산술1회만 수행했습니다. 원 source projection/compiler/factory/engine, 기존 검사, renderer/APP/registry/serve 변경, HTTP/UI/server/Git/build 실행0입니다. source 필요핀/고유mask/문서 metadata 확인1회만 수행합니다.
