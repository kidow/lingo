# 苽 VS3 body3 원raw 정적 비교

VS3 `u82fd-ue0103`의 실제 `engine-whole-u82fd-ue0103.json`만 읽습니다. 원키는 defaults/groups/trace의 body3이고 10raw/11drawing calls/22polygon입니다. id3와 파일 SHA `fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b`를 고정합니다. base actualfull5는 읽어 결합하지 않으며 기존 source-boundary compiler의 합성full5를 이 도구의 actualfull5로 승격하지 않습니다. 기존 compile/native/helper를 import/run하지 않고 새 projection·factory·engine·geometry 호출도 없습니다.

ROOT CLI: `python3 docs/hanja-source-raw-compare-u82fd-vs3-2026-10-21/serve.py --port 59412`

- `/whole`: 국내전체9획과 VS3 원raw전체10을 각520px로 비교합니다.
- `/compare?domestic=7&raw=7`: 국내7 single과 원raw7 single을 독립 비교합니다.
- `/compare?domestic=7&raw=8`: 국내7 single과 원raw8 single을 독립 비교합니다.
- `/compare`: 국내1..9/원raw1..10 및 각각 single/prefix를 선택합니다. 번호는 원순서 그대로이며 같은번호가 대응한다는 주장이 아닙니다.
- `/checks`: 고정 자료·선택 정체성과 startup RAM fetch 횟수 요약입니다.

원raw polygon은 원좌표의 M/L/Z로 표시하고 viewBox0 0 200 200을 유지합니다. 원raw별 guide나 source를 새로 생성하지 않습니다. 국내자료는 기존고정 URL/5190bytes/SHA `274ccdf460d27d4a4fcd3669fcd550384ae1515e37d5eb04d3752dc86496708e`를 ROOT startup에서 한 번만 RAM fetch하고 실제 viewBox/root/group attrs를 그대로 읽습니다. 작성 시 HTTP/XML 실독0, 합성 XML 검사는 실제 국내원형의 값 확인이 아닙니다. 미디어 저장·리디렉션·GET마다 fetch는 없습니다. 서버를 시작한 ROOT가 PID/port/session을 기록하고 완료·보류 후 본인 서버와 래퍼를 종료합니다.

과거 VS3 pen7 boundary .6944510812570955의 두번째mask nib FAIL, K 방향FAIL 및 최근 K 원raw7+9 정적 형태차이 HOLD는 불변입니다. 이번에는 VS3 정적원형과 번호를 ROOT가 새로 대조할 수 있게 준비할 뿐, 과거 whole 관찰이나 기존 groups를 승인으로 상속하지 않습니다. sourceGroups=[]/정적새관찰0/방향·시간·합획·부분애니메이션·native·APP·runtime은 모두 false입니다. 원P/guide/width/weight/순서·NOTICE·기존HOLD를 고치지 않습니다.

초회 새 집중검사는 고정입력6핀/새4핀, 실제body3/id3/10raw22polygon 원순서 exactly-once, single/prefix selector와 query·identity·proof-role 음성, 합성 국내XML 파서/원attrs 보존까지 통과한 뒤 whole 링크를 /compare?로 잘못 기대한 단언에서 실패했습니다. helper/source는 바꾸지 않고 단언을 실제 /compare로 보정했습니다. config/server/body 직접3핀과 통과 Python prefix 해시를 고정한 --failed-tail에서 실패단언·미실행 raw7/8 화면·fetch0만 1회 PASS했습니다. 통과 prefix 반복0이며 초회 FIRSTPASS로 기록하지 않습니다. 신규 PythonAST1, 변경 checkJS 구문2회, 최종메타1회입니다. 기존 통과검사·compiler·projection·engine·빌드/TSC·서버/UI·Git은 실행하지 않았습니다.
