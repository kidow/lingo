# 陔 QQ6 시작 기하·연결성 제한

원 source commit62335492의 논리6/raw7·8만 대상으로 한 신규 exact BigInt 유리수 산술1묶음입니다. 9p10m25 geometry `217aabd8f2b39b0f4489607a26be20800411422465a8297660a0469c202ea398`, actualfull5/id3 및 모든 원P/guide/폭14/weight를 유지합니다. 기존 綎/湺 QQ의 native나 수학 승인을 승계하지 않으며 renderer·APP·새기하·연결자·임의시간 threshold는 만들지 않습니다.

## 결론

두 고유 MQ의 초기 정칙성·arc7 곡률 충분조건은 성립하지만, 이것만으로 두 mask 연결성을 승인할 수 없습니다. 원두P 자체는 양성면적으로 겹치지만 MQ2의 초기 growing 표시가 첫P와 분리되는 이상기하 반례가 있습니다. 따라서 현재는 **HOLD 유지, 단순 growcap 이식/새renderer 작성 보류**가 권고입니다. 이는 두 mask쌍 조건에 한정합니다. 앞서 완료된 다른획과의 누적겹침, 실제 모든 UA/AA 화면, 전체한자 연결성을 반례로 확대하지 않습니다.

## 고정 source

|mask|원 guide|weight|전체 mask SHA256|
|---|---|---|---|
|6m1/raw7|`M63 25 Q58.5 34 50 43`|22.203603|`f1b564b1d0d3ec17dcb909b3577783da2c8dee266eec60ead825d50344d7aab0`|
|6m2/raw8|`M39 36 Q50 41 56 51.5`|23.005434|`1468a51c80bb4521912a577b3b5d8930605fbdaa26270592d844b579688d5ba9`|

P1은 원 M/L 다각형22점+3점+3점, P2는22점+5점입니다. 모든 성분의 정확 winding/경계검사에서 M1=(63,25)은 자기P1 밖, M2=(39,36)은 자기P2 밖이었습니다(각각 상대P 밖이기도 함). 시작점이 P 안이라는 가정을 두지 않습니다. 첫 guide 끝(50,43)→다음 M(39,36)의 표시gap=(-11,-7), 거리²170이며 원rawgap=(-22,-14)을 유지합니다.

## 각 MQ의 초기 arc7 충분조건

Q(t)=P0+2At+Bt², λ=min[0,T]|A+tB|²로 두었습니다. 아래는 모두 원 guide 소수의 정확분수에서 계산한 값입니다. κ≤|det(A,B)|/(2λ^(3/2)), chord(T)>7, cos(7K)≥1−(7K)²/2>7K를 확인했습니다. λ>0와 곡률식 `4K²λ³−det(A,B)²>0`은 초기 regularity를, chord²>49는 arc7이 t≤T 안임을, cos lower>7K는 이 초기 이상 normal-offset strip의 injectivity 충분조건을 제공합니다. 이 이상기하 조건은 원P 전체coverage·이전P 접촉·다른시간·후반curve·SVG raster/AA 증명이 아닙니다.

|mask|T|K|최소t|λ|chord²|곡률식 양성margin|cos lower−7K|
|---|---|---|---|---|---|---|---|
|6m1|1/2|1/40|0|405/4|445/4|1330101/1024|2591/3200|
|6m2|1/2|1/30|110/221|29241/221|8685/64|3221466671151/1079386100|1331/1800|

6m1 A=(-9/2,9),B=(-4,0),cross=36,rK=7/40,cos lower=3151/3200입니다. 6m2 A=(11,5),B=(-5,11/2),cross=171/2,rK=7/30,cos lower=1751/1800입니다. K는 표시 threshold가 아니라 이 두 고정guide의 보수적 곡률 상계입니다. 기존 κ 계산/검사를 반복하지 않았습니다.

## P 겹침과 초기 분리 반례

원P1/P2의 각22점 body는 C=(101/2,427/10)=(50.5,42.7)을 모두 엄격한 내부에 포함합니다. 원 성분 간 proper edge crossing pair는2이며 양성겹침이 있음을 이 내부witness로 확인했습니다. 전체겹침면적을 계산/추정하지 않았습니다.

하지만 원 MQ2 시작 M2=(39,36)에 대해 분석witness W=(40,73/2)=(40,36.5)는 P2 body의 엄격한 내부이고 P1 밖입니다. |W−M2|²=5/4<4이므로 초기 호길이 d=2,ρ=min(7,d)=2인 이상 growing 정책의 startdisc 내부에 양성 이웃영역이 있습니다. 원fullround 시작disc의 r7 안이기도 합니다. W는 문서의 반례점이며 새guide/clip/geometry로 사용하지 않습니다.

초기 원path의 길이 d까지 어느 점도 시작점에서 거리 d를 넘을 수 없습니다. butt-prefix의 반폭7 및 두 disc(ρ≤7)를 합쳐도 d=2일 때 x≤39+2+7=48입니다. 반면 원P1의 모든 점은 x≥993/20=49.65입니다. 따라서 이 d에서 현재 growcap에 의해 보이는 P2 양성잉크와 P1 사이에는 최소 x간격33/20이 있고, **두mask쌍 안에서는 분리된 조각이 존재**합니다. 실제 browser의 L 또는 d=2에 해당하는 p/global시간을 측정·추정하지 않았으며 ROOT 사진의 특정 픽셀/삼각형을 W와 동일시하지 않습니다. 모든 누적선행획·모든 AA 화면에 대한 단정도 아닙니다.

같은 envelope로 두mask가 처음 접촉할 수 있으려면 최소한 d≥73/20가 필요합니다(충분조건/정확접촉시각은 아님). 현재 grown set 전체를 접촉까지 숨겼다가 한 번에 풀면 W 주위의 이미 양성인 영역도 함께 풀리므로 유한면적 점프를 피한다는 보장이 없고, 이 이상모델에서는 그 위험이 남습니다. 이것을 새 hide-until-contact threshold로 구현하지 않습니다.

## 필요한 후속 근거

ROOT가 확보한 국내6의 원DOM 경로 `M680 648L564 502L460 511L618 386`와 시각 시간진행은 추가관찰 대상입니다. L4점이 있다는 사실만으로 두Q의 gap 연결·방향·타이밍이 같다고 승인하지 않습니다. 공식 필순guide 실물의 구간 진행을 더 관찰하고, 필요하면 별도 source-specific 경로/표시정책을 추가 검토해야 합니다. 그 검토는 기존 원source를 몰래 바꾸거나 원DOM을 candidateguide에 복사할 권고가 아닙니다. 새 충분조건과 실제 native검토 전에는 renderer 구현·방향생성·APP등록을 보류합니다.

## 고정핀과 수행범위

- [docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/config.json](../../docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/config.json) `99ee7405e92d86fdbfaa21c14e2bf8e1e5df74a4cd970342d1e04d1734f2de1c`
- [docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/fixtures.json](../../docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/fixtures.json) `62ea332acd6d3aa4179c0f6f509c372f2231cd68915a83b03814bf24f7f61750`
- [docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/preparation.json](../../docs/hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/preparation.json) `1aa076c81c10ebcb5050de748b4f80596e986b994fc2f2fae5e1cdcc09d25ab3`
- [docs/hanja-goal-glyphwiki-batch1007-2026-10-13/engine-whole-u9654.json](../../docs/hanja-goal-glyphwiki-batch1007-2026-10-13/engine-whole-u9654.json) `c9c59133365d33fdbe9c6cb6d58963c100db5cf91be234c9b3df4f1e7e7ea169`
- [docs/hanja-source-native-review-hq-qq-u9654-2026-10-21/README.md](../../docs/hanja-source-native-review-hq-qq-u9654-2026-10-21/README.md) `d295a0867bf87faf279fde3e6672df31c3846eec4184a9904fc806aa90431162`
- [docs/hanja-source-native-review-hq-qq-u9654-2026-10-21/review.json](../../docs/hanja-source-native-review-hq-qq-u9654-2026-10-21/review.json) `34f54c0776bb3492bbf0fa9a078c5e4d280f90766ab7c3e8e5280c79ee8d9f9c`

신규 산술1묶음/새문서핀·metadata1만 수행했습니다. source/compiler/factory/engine/geometry변경·실험renderer·기존검사·HTTP·UI·서버·Git·build 실행0입니다. 원 nativeHOLD와 author DNS/준비false 역사, 공식 방향/APP/runtime미승인은 그대로입니다.
