# 陔 원 raw 정적 비교 준비

국내 9획과 원 base `u9654`의 raw 11개를 whole·single·prefix로 독립 대조하는 도구입니다. 같은 번호 대응, 새 그룹, 합획, 방향·시간·애니메이션을 승인하지 않습니다. native/APP/runtime은 모두 false입니다.

원자료는 `docs/hanja-goal-glyphwiki-batch1007-2026-10-13/engine-whole-u9654.json`의 actualfull5 한 파일입니다. 원 defaults·groups·trace와 engineHashes·engineRevision 5키를 보존하고 sourceRoot/file/SHA identity3를 검사합니다. 다른 variant의 header/body를 합치지 않습니다. 원 11raw/12calls/25polygon을 M/L/Z로 직접 표시하며 좌표·guide·폭·weight·source를 재생성하지 않습니다. 기존 최소10>국내9 HOLD 및 원 sourceGroups=[]는 바꾸지 않습니다. 원 NOTICE.md는 존재하지 않아 새로 만들지 않았습니다.

## ROOT 실행

```sh
rtk proxy python3 -B docs/hanja-source-raw-compare-u9654-2026-10-21/serve.py --port 0
```

출력된 localhost 포트에서 `/whole`을 먼저 봅니다. `/compare?source=base&domestic=1&raw=1`에서 국내1~9와 raw1~11을 각각 선택합니다. 번호가 같다는 이유로 대응을 추정하지 않습니다. `dview=prefix&rview=prefix`는 두 prefix를 독립 선택합니다. 예: `/compare?source=base&domestic=9&raw=11&dview=prefix&rview=prefix`. `/checks`도 정적 전체 표시입니다.

서버 시작 시 고정 URL의 국내 XML을 RAM으로 1회만 읽고 status/URL/4653bytes/SHA를 확인합니다. 실제 root viewBox와 group transform은 해당 XML에서 읽습니다. 작성자는 HTTP/XML실물 파싱·서버·브라우저를 실행하지 않았습니다. 미디어 저장은 없습니다. GET 재조회나 엔진/투영/기존 helper import는 없습니다. ROOT는 PID/포트를 기록하고 검토 종료 후 해당 서버만 종료합니다.

## 준비 검증

새 계약검사 최초1회 PASS: 원 raw single11·prefix11, polygon25 exact-once, 합성 국내 single/prefix18, query19·identity4·proof-role2·XML3 반례를 확인했습니다. 새 Node 구문1·Python AST1·helper guard1도 최초 PASS입니다. 실제 XML/HTTP/서버/화면은 미실행입니다. 최종 metadata 확인1회 외 통과 검사는 반복하지 않았습니다. 상세 결과는 validation.json에 기록합니다. 합성 국내 XML은 parser 계약만 확인하며 실제 국내 XML·HTTP·화면 검증을 대신하지 않습니다. 원 guard를 느슨하게 하거나 새 source candidate를 만들지 않았습니다. 기존 통과 검사는 반복하지 않습니다.

사전 원자료 읽기에서 존재하지 않는 NOTICE.md 가정으로 ENOENT 1회가 있었고, 새 파일·검사·HTTP·기하 실행 전에 실제 존재 파일만 고정하도록 복구했습니다. generic serve.py는 기존 u82fd-vs3 helper의 바이트를 그대로 재사용합니다. 새 check는 이 후보의 actualfull5/base 계약에 한정하며 이전 후보의 failed-tail 이력을 복사하지 않습니다.
