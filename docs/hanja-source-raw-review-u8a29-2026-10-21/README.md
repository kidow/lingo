# 訩 원raw 정적대응: ROOT 유한 관찰

원1055 actualfull5 `engine-whole-u8a29.json` 자체5키/SHA`b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1`만 사용한 정적비교입니다. 원13raw/13calls/23polygon·좌표·원필드·HOLD는 변경하지 않았습니다. 폰트모양 차이는 있으나 전체구성과각단획의 정적대응을 확인했습니다. 정확자형동일성·방향·시간·source애니메이션·합획·APP/runtime승인은아닙니다.

유효520표본은 **28장**입니다: 국내/원whole2, 국내single1..11의11, 원rawsingle1..13의13, domesticprefix6/rawprefix7의2입니다. raw12/13 첫2장은오른쪽잉크가잘려제외했습니다. raw12는후속rect x11.541/y235.497에서전체잉크,raw13는후속x-8.913/y235.497에서원ink x222..451전체를확인한대체표본만셉니다. raw13의전체SVG박스가보였다고쓰지않습니다.

관찰된정적그룹후보(1based)는 `[[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,13],[12]]`입니다. dom6은왼口의H+V로원6H/7V,dom10은오른凶의왼V+아래H로원11V/13H,dom11은원12오른V입니다. 원raw12를13뒤로두는 정적순서필요를기록하지만 동적필순이나 sourceGroups를승인하지않습니다. review의sourceGroups는[]로유지하고후보mapping은별도필드에둡니다.

## 기존최소12와국내11의차이

원join분석의 index는**0based**입니다. `[5,6]`(표시raw6/7)만원순서인접 exactendpoint여서13raw→최소12였습니다. `[10,12]`(표시raw11/13)은원raw12가사이에있어기존연속규칙으로합치지못합니다. 새ROOT정적관찰은raw11/13의구성과raw12의마지막대응을확인했을뿐,좌표일치만으로합획하는허가가아닙니다. 또기존 `[4,7]`(표시raw5/8)은각dom5/dom7이므로그대로별획입니다. 원countguard12>11은유지합니다.

원raw6끝=7시작=(62.125,135),원raw11끝=13시작=(89.45,169)으로각gap0입니다. 원polygon은각pair3개이고원raw12는(177.2,29)→(177.2,169)/flags0,23입니다. 원raw11 flags0,13 및raw7 flags22,123도그대로이며형상/terminal보정은이번0입니다.

## 독립source 가능성: 아직생성0

actualfull5+id3를고정한새독립adapter에서원rawpolygon캐시를재사용하고두pair를**각독립2mask**로보존하는계획은가능합니다. 그경우예상11p13m23이며원23polygon exactlyonce가조건입니다. 원guide/connector를잇거나폭·원P를바꿀필요가없다는구성가능성만보고합니다. 실제rawprojection/fixture/source8은이번에만들지않았으므로검증된생성계수라고쓰지않습니다. 기존compiler는준비문서상absent이고원HOLD를약화해되살리지않습니다. 추후ROOT별도승인시actualfull5하나에결박한최초pureprojection→즉시publicfixture→새cached검사가필요합니다. 초기cap/terminal completion/coverage/국내시간필순은그다음fresh검토대상입니다.

당해탭warn/error limit10결과[]이며전체console무오류일반화는아닙니다. ROOT서버63825/59412/session57601은Ctrl-C exit130/output0,후속ps부재확인으로종료했습니다. ROOT전달현재runtime1338의5754/224는상태참조로만쓰며registry를재실행하지않았습니다. 새리뷰metadata/핀만1회확인하고원검사·source/compiler/engine/기하·HTTP·서버·Git/build실행0입니다.
