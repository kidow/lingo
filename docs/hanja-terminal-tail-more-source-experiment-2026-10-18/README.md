# 추가5자 원 LEFT-tail source 실험

楘570(4획),膴575(2획),諝640(14획),痗565(9획),苺566(6획)의 고정 원tail polygon만 분리합니다. 기존 terminalLeftTail/point 함수는7e064978…fdece08 원문 그대로이며 좌표·guide·width·bodyweight·원sourceGroups/순서를 새로 작성하지 않습니다. 원body bounds는 남은 원polygon으로만 재계산합니다.

|후보|선택root|원raw(0-based)|선택closure/전체family/provider|
|---|---|---|---|
|痗565|u75d7|[9,10]|4/10/4|
|苺566|u82fa-k|[6,7]|5/10/0|
|楘570|u6958|[5]|3/3/0|
|膴575|u81b4|[1,2]|5/6/0|
|諝640|u8add|[16,17]|5/6/0|

痗의provider4는 전체family 고정자료이며 선택root closure4가 provider4를 모두사용한다는뜻이아닙니다. 모든99참조·고정version·NOTICE·full5/header/trace·engine8바이트는 원source에 남고 새input핀으로묶습니다. strictfull5/id3 mandatory3/4를검증한후에만 원legacy2arg compiler를위임합니다. 누락·추가인수·proof변이·identity변이는 위임전에거절합니다.

baseline은 처음현재환경에서캡처하며 옛독립compiled SHA로 주장하지 않습니다. source검증은후보별positive1과strictnegative1세트,구문/AST/정적helperguard만한번수행합니다. 결과fixture는공개기하뿐이며 국내SVG는helper실행시RAM만사용합니다. 기존hold/registry/NOTICE/metadata/기하는수정하지않고source통과도native승인으로승격하지않습니다.

source검증1회exit0 PASS:후보별positive1(총5)·각17strictnegative(총85)·Node구문2개각1회·PythonAST1/helperguard1 PASS입니다. engine0/HTTP0/server0/nativefalse/runtimefalse입니다.

|후보|획/mask/polygon|새tail경계|공개fixtureSHA|
|---|---|---|---|
|痗565|12/13/31|0.8978270678166707|99ec70800bc7ac514c199e3089c86a5d381d841012ebc9f18d12d1421df788bc|
|苺566|9/10/22|0.9145494031087816|b7e838211ab1ccc31be7e72112767d4b1f49414f2f139078f2b4cf4c94fbf5ee|
|楘570|13/14/28|0.7787370020434744|6c115f341b978a8ccb96b38e788a569e1c9783c6a042c12516c98dfb889ffb1c|
|膴575|16/17/32|0.9239515302035813|c3695e5c2a6aa962a9e6eff7b34cd3c6f16867ecbbee6a394d115e89d68303e4|
|諝640|16/17/33|0.9128762450249068|abff288f47a9f7cc91e573547d4ea7abc732f4ceff579be997d2469322c10c62|

諝의원raw8은빈행이며 원legacy sourceGroups는이를그리지않습니다. fullproof/trace빈행을삭제하거나새그룹으로승격하지않고그대로보존했습니다. 새로운bodycoverage나시작/끝native연속성은 아직승인하지않습니다.

준비이후 root만서버를시작합니다:
rtk proxy python3 -B docs/hanja-terminal-tail-more-source-experiment-2026-10-18/serve.py --target 570 --port 0
/whole,/pairs,/progressive?stroke=4&enlarged=1,99.99/95/모든mask경계/9coarse/자연재생을지원합니다. helper는publicfixtures 캐시를읽어startup/GET sourcecompile0입니다.

Attribution:GlyphWiki Project and contributors,LicenseRef-GlyphWiki. 고정archive a7dd7f3d911936770fa742e8c37d16bee7e2173c 및 각원source의provider 원문·license/NOTICE를보존합니다.
