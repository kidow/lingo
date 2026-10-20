# 瀷 QQ + LEFT14/314 캐시 분리 실험

2026-10-20. source-only 준비이며 nativeApproval/runtimeApplied/appUI는 false입니다.

원source ../hanja-source-independent-qq-u7037-k-source-experiment-2026-10-19/의 actual full5/id3, 고정proof·NOTICE·원HOLD·두Q renderer는 불변입니다. 기존factory/engine/compiler를 호출하지 않고 공개baseline20p21m51을 먼저 보존했습니다. 두 분리는 각각 같은 원baseline에서 독립 수행하고 pen4/7 결과만 조립합니다. 순차 mutation은 없습니다.

|획|원flag|width|jump|body weight|추가tail weight|분리경계|
|---|---|---:|---:|---:|---:|---:|
|4|1/14|6|20|51.151068|10|0.836470558453697|
|7|1/314|6|14|51.541068|7|0.880425823457816|

20p23m51. 원51polygon 각각 한 번, 원quad 좌표·방향·폭·guide·body weight·bounds 및 타18획을 보존합니다. 원10m1 down cardinal에는 guide를 만들지 않으며 원11m1 MLL도 그대로입니다. body bounds는 각각 [29.8,8.35,61.8,37.4]/[62.15,8.35,94.55,37.4]로 분리 전후 같습니다. 전체mask weight690.244175→707.244175(+17)는 배분합 변화이지 고정8초 재생시간 증가가 아닙니다. 획4·7 내부 body/tail 배분이 달라지며 QQ3 자체의 내부경계는 그대로입니다.

기존terminalLeftTail/derive의 exact guard를 사용합니다. 원quadSHA4 9e762b7e0c07a01940e8c4c8a8c197866d000e9d6ecd93049f6a43ff588145d5,7 2412a00bab5804f90b51d927412c612f2487390784d0480be7948171065d8e9c. 꼬리점[41.3,31.4]/[77.05,31.4]는 앞H와 거리19.5224 및 뒤V/Q의 x범위와 거리10.02/7.03으로 원r7 sweep 밖에 있습니다. 이는 분리 필요성의 정적 근거이며 새body 전체coverage나 raster/native PASS 증명이 아닙니다.

원QQ3 raw2/3 gap33.72803136858125/normalized16.864015684290624 유지. 원literal20, raw16→15 순서 유지. 원372 정적20/원812 방향1–3의 한계와 원pen4 FIRST epsilon positive-area FAIL(약36px 눈측정), 원전체20방향75% 관찰·whole 호환은 과거 기록입니다. 새후보의 필순·시간·합획·native 승인으로 승계하지 않습니다. 10 V213·11 V223 및 다른곡선의 초기cap/terminal 위험은 미교정입니다.

## 검토 helper

root만 python3 docs/hanja-source-independent-qq-left-u7037-k-source-experiment-2026-10-20/serve.py --target u7037-k --port 0 기동합니다. /whole, /pairs?stroke=N, /progressive?stroke=N&coarse=1. 국내/분리전baseline/후보 3SVG 각520, coarse9 baseline+후보 각220, 모든multi3·4·7 경계before/at/after 및0/epsilon .0001%/95/99.99/100, 고정8초 재생을 제공합니다. private 국내SVG는 root 기동 시 RAM으로만 읽으며 startup/매GET sourcecompile0·engine0입니다. 현재 서버/UI/HTTP 실행0입니다.

## 검사와 이력

새 집중검사 최초1회 PASS: cached positive1/negative37, 검사 중 source기하·tailderive·engine0. Node구문2/선언AST1 diagnostics0/PythonAST1/embeddedBrowserNode1/helperguard1 각각 최초PASS. 기존source/renderer 검사는 반복하지 않았습니다. 최종metadata/pin확인1회만 수행합니다.

최초REPL 호출은 객체realm prototype guard에서 거부1, 분리산출0/engine0였습니다. guard를 바꾸지 않고 정상Node에서 캐시 분리operation1(동일baseline 독립partition2)을 수행했습니다. 공개final fixture는 집중검사 전에 저장했습니다. 이후문서 RAM구성 caller parseFAIL1은 파일/검사/추가분리0에서 복구했습니다. 기존factory/compiler/engine0, 새좌표·폭·connector·guide·tail점 생성0.

최종 검사결과는 preparation.json에 기록합니다. 원HOLD/미승인은 보존하며 전체fresh root 검토 전 native/runtime/app false입니다.
