# 俓 원 pen1의 고유 MQ 시작 기하

원6MQ 렌더러 검토 중 ROOT가 비대상 원pen1 global1e-6에서 큰 head 블록 FIRSTFAIL을 관찰했습니다. 이 문서는 원 pen1만 읽고 신규 exact BigInt 유리수 산술1묶음으로 초기 arc7 조건과 M/P 위치를 판정합니다. 기존6MQ의 산술·정책검사·원source검사는 반복하지 않았고 새renderer/APP는 작성하지 않습니다.

## 실제 원자료

- 고정source 9p12m27 geometry f731ac914a72e3021f43db274bca35d7b4f91968e964601f9112bdb900052726 / fixture 8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d
- actualfull5 단일engine-proof/id3 655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936, 일치body3 a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4
- pen1은 원raw1의 cdDrawCurve 한 호출이며 args=[68.175,15,45.9,72,12.9,117,0,7]입니다. flags(0,7)를 보존합니다.
- 실제 문법은 단일 **MQ**입니다: `M34.0875 7.5 Q22.95 36 6.45 58.5`
- width14 / 원weight58.007167 / 원bounds[6.05,6.15,37.7,58.75] / 전체mask SHA256 f0448ecdcc199a2fdaaf728a26107b55056282e4efece30949cbc3eff4fcc23a

새 guide/좌표/폭/weight/flags/원P/접합/꼬리분리는 없습니다. 단일 MQ라는 분류는 실제문자열과 원call에 근거하며 기존6MQ의 수치를 대입한 결과가 아닙니다.

## 고유 초기 arc7 충분조건

Q(t)=P0+2At+Bt², A=C−P0, B=P0−2C+P2로 두었습니다. 실제 guide 소수문자열을 정확분수로 읽은 값입니다.

|항목|정확값|
|---|---|
|P0|(2727/80,15/2)|
|A|(-891/80,57/2)|
|B|(-429/80,-6)|
|T|1/4|
|K|1/100|
|minimizing t on[0,T]|1/4|
|λ=min(norm(A+tB)²)|90593649/102400|
|det(A,B)|7029/32|
|4K²λ³−det²|614003963808731462938449/2684354560000000000|
|chord(T)²|372525849/1638400|
|rK(r7)|7/100|
|cos(7K) lower|19951/20000|
|cos lower−7K|18551/20000|

λ>0이며 κ≤|det(A,B)|/(2λ^(3/2))<K=1/100입니다. chord(T)²>49이므로 초기 arc길이7은 t<1/4 안에 포함됩니다. cos(7K)≥1−(7K)²/2>7K이고 rK<1이므로 이 arc0..7의 ideal normal strip은 정칙입니다. 서로다른 normal단면의 교차를 가정하여 앞 접선에 투영하면 중심선 차이의 하한 Δs·cos(7K)가 끝 normal의 최대투영 rK·Δs보다 커 모순이므로 이 초기 strip의 injectivity 충분조건도 성립합니다.

이것은 **이 고정 MQ의 초기 이상기하 조건**입니다. 전체곡선/후반원P의 coverage, 픽셀단위 연속성·단조·AA, 실제UA의 dash/cap/join, 완료모양, 자연재생, 공식방향/시간, 전체한자승인을 증명하지 않습니다. 원필드나 수학L을 실제UA 측정으로 대체할 근거도 아닙니다.

## 시작 M과 원P 위험

원P는22점body와3점성분 두 개로 구성됩니다. 정확 winding/경계 검사에서 M=(2727/80,15/2)는 각성분 winding0/경계아님이었으므로 자기P의 세성분 모두 밖입니다. 시작점이 P 안이라는 가정을 사용하지 않습니다. 이 판정은 source좌표의 기하적 위치이며 실제 ROOT가 본 head 블록의 raster인과/면적/픽셀수를 확정하지 않습니다.

ρ=min(7,d), d=p·UA L의 두 growingdisc와 원butt/miter prefix를 쓰는 별도 후보는 초기 이상면적 상한14d+2πd²→0을 가지지만, 원P와의 교집합이 모든p에서 연결됨을 여기서 증명하지는 않았습니다. M이 밖이라는 이유로 guide를 이동하거나 임의hide-until-contact 시간을 두거나 P를 나눌 수 없습니다.

## 권고 한 가지 — 별도7MQ 후보, 아직 작성하지 않음

ROOT의 다음 명시적 승인 후에만 별도 `docs/hanja-renderer-growing-caps-u4fd3-seven-mq-experiment-2026-10-22/`에서 고정전체source는 그대로 두고 원pen1 MQ의 T1/4·K1/100만 추가하는7target 후보를 준비하는 것이 최소후속입니다. 기존6target 각mask/T/K는 그대로 보존하고 나머지5mask도 불변이어야 합니다. 실제ROOT의 pen1 0/epsilon·원P coverage·시작초기/완료를 먼저 확인하고 이후 필요한 연결성/전체위험게이트를 별도로 수행해야 합니다. 기존6MQ의 유한통과관찰과 원source의 방향·시간 미승인/HOLD는 그 자체로 보존하며 새후보 승인으로 승계하지 않습니다.

새renderer·APP·registry/runtime 작성0이고 승인false를 유지합니다. 실제측정은 같은 연결된 원guide에서 동일p/frame의 native L/getPointAtLength를 사용해야 하며 원weight·수학L로 치환하지 않습니다.

## 직접입력 핀

- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/fixtures.json`: `8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/config.json`: `bf816148dd4b7757badd4e7a65f42ef663460faae18fab2ace7d568a5f6e5efe`
- `docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/preparation.json`: `95d0634cd76e6e9d5e762956683761295dbdaf0ec90476ec421d61130ae8550c`
- `docs/hanja-goal-glyphwiki-batch1067-2026-10-13/engine-proof.json`: `655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936`
- `docs/hanja-goal-glyphwiki-batch1067-2026-10-13/engine-whole-u4fd3.json`: `a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4`
- `docs/hanja-renderer-native-review-u4fd3-qq3-sixmq-2026-10-22/README.md`: `838daff1e7ab69a0072d7135077dfbea3d555663983e373309df7c40cb8c4261`
- `docs/hanja-renderer-native-review-u4fd3-qq3-sixmq-2026-10-22/review.json`: `4bbb18e4fc475e54776045cce03fd5cbca1961ce8dcb97b726bb5452d234c485`
- `docs/hanja-u4fd3-qq3-start-geometry-proof-2026-10-21/README.md`: `e97d52a2c6f2b3ce24e23c948e35bdd0fd2bd34c000160dbbd528d509b62bc86`

고유pen1 산술1묶음과 직접입력8핀/문서메타1만 확인합니다. 기존6MQ 산술·정책검사·기존source8 검사는 반복하지 않았습니다. 원기하/compiler/factory/engine/projection/HTTP/UI/server/Git/build/TSC 실행0입니다.
