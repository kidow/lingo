# 樲 terminal15 분리 + 원펜 순열 source-only 실험

원 baseline16p16m32poly를 strict3 API로 추가1회 캡처해 fixtures.json에 먼저 저장했습니다. root의 이전 native helper startupcompile1은 별도이며 엔진 실행0입니다. 새 adapter는 공개 baseline만 읽고 원source compiler를 호출하지 않습니다.

old6 raw5 cubic의 마지막quad는 기존979 terminal15 공식과 정확히 같습니다. 나머지4poly bodybounds도 원mask와 같아 기존 support·partition guard 본문을 그대로 재사용합니다. 원quad를 UP마스크로 옮기고 weight12.5를 기존 정책으로 추가합니다. bodyguide·width14·bodyweight는 그대로이고 원32polygon이 정확히 한 번씩 남습니다. 새 좌표·폭·연결선은 없습니다.

그 뒤 전체펜 순열 [1,2,3,4,5,8,9,10,11,12,13,14,15,16,6,7]을 적용합니다. 16p17m32poly, longcurve는15·dot은16입니다. 원 sourceGroups는 보존하고 finalSourceGroups를 별도로 둡니다.

고정 국내 SVG RAM 분석에서 원6/7의 위치가 국내15/16에 대응함을 확인했으나 새 후보의 native 승인은 없습니다. root의 원native whole1 compatible, directions1–5PASS/6–16FAIL, fineold6 positive-area hook100% stampFAIL, coarse/boundary/replay0 이력은 그대로입니다. root원서버56676/session8669/59414의 종료는 본 실험이 추정하지 않습니다.

rtk proxy python3 -B -u docs/hanja-terminal15-order-u6a32-source-experiment-2026-10-18/serve.py --target u6a32 --port 0

startup/GET sourcecompile0/engine0. /whole, /pairs?stroke=15, /progressive?stroke=15&coarse=1. fine/pair는 국내·원본·실험3SVG520, coarse원본/실험은 각220입니다. 0/epsilon·95·99.99/100·모든 동적 경계전중후·8초재생을 제공합니다. 국내 SVG/HTML은 RAM만 사용합니다. GlyphWiki Project and contributors, LicenseRef-GlyphWiki(not CC0). 원source NOTICE/archive LICENSE·고정manifest를 그대로 보존핀에 포함합니다. 원whole은 archive recovered이며 고정버전을 임의로 만들지 않습니다. native/runtime/canonical/registry/build/Git 변경0입니다.

검증 이력: baseline원compiler1, cached후보양성1·음성40·Node구문2·PythonAST1은 완료했습니다. 첫 집중 실행은 helper check-only의 인코딩 진입에서 exit1로 끝났습니다. 정상 UTF-8 파일에 명시 encoding 헤더만 추가하고 실패한 helperguard만 단독1회 재확인해 PASS했습니다. 전체 집중검사·derive·sourcecompile는 반복하지 않았습니다. 작성 REPL의 초기 문자열 parse 실패1은 파일쓰기·컴파일 전입니다.

독립감사 후 UI정정: baseline창은 같은 원획 before/after 비교입니다. candidate stroke마다 originalPenOrder[stroke-1]를 선택하므로 final15는 baseline6, final16은baseline7입니다. 순열 전후 누적prefix는 서로 다릅니다. 초기 same-index baseline표시 템플릿잔존을 helper만 수정했고 source/fixture/compiler는 변경하지 않았습니다.
