# 한능검 4후보 · 단일Q·혼합guide 시작 표시 격리 실험

원corrected source8 및 고정fixture를 참조하며 복제하지 않습니다. 懰18p21m46, 繘18p23m52, 帨10p12m31, 麀13p16m42의 전체strokes·full5/id·원자료pin을 고정합니다. 새sourcegeometry/compiler/engine/파생0, 새좌표/outline/guide/폭/weight/필순0입니다. 원terminalFAIL과HOLD·원sourcefalse를 그대로 두고 새nativefalse로 시작합니다.

## 적용 범위

|후보|단일Q 적용pen/mask|새격리수학후보로 포함한 혼합pen/mask|
|---|---|---|
|懰|5/2|7/1,10/1|
|繘|1/1,1/2,2/1,2/2|10/1,13/1,15/1|
|帨|5/2|10/1|
|麀|9/2|11/1,13/1|

첫curve도epsilon유한cap을 방지하는 대상입니다. 위단일Q7+혼합8=15mask를 정확allowlist로 포함합니다. 단독pen의curve는 기존renderer를 유지하므로 0→epsilon 유한cap 가능성이 남습니다. 혼합8은 원연속guide의prefix길이에 대한 별도수학승인 아래 격리표시후보로만 포함하며 새native승인은 아닙니다.

## 원guide 혼합8개 읽기

|후보 pen/mask|원 명령열|첫접선(원첫L끝-M)|퇴화|
|---|---|---|---|
|帨 10/1|M L Q L|[0,28]|아니오|
|懰 7/1|M L Q Q|[16.152499999999996,0]|아니오|
|懰 10/1|M L Q|[0,78.5]|아니오|
|繘 10/1|M L Q|[0,16.104999999999997]|아니오|
|繘 13/1|M L L Q|[45.441,0]|아니오|
|繘 15/1|M L Q L|[0,8.316249999999997]|아니오|
|麀 11/1|M L Q L|[0,15]|아니오|
|麀 13/1|M L Q L|[0,24.200000000000003]|아니오|

전체guide 문자열·원raw group·full5/id·원mask SHA는config의 mixedGuideReadOnlyAudit에 보존했습니다. 모두명시적M/L/Q이며첫L이비퇴화입니다. 원연속guide의호길이prefix가pL이면 같은삼각부등식 면적상한을 도출할 수 있지만, 정확fullstrokes/maskguard·전체M/L/Q명령과인수개수검사·시작접선비퇴화검사를 고정했습니다. 브라우저coverage/native승인은 별도fresh검토가 필요합니다.

## 표시 수학과 한계

R=P∩W(p)∩G(p). 원guide시작점q와 첫L끝-q 또는 첫Qcontrol-q 정규접선, 반폭r=7을 사용하고 G는원시작circle밖 unrestricted, 안은접선투영≤-r+2r·min(p/tau,1)입니다. tau=min(1,원revealWidth/브라우저SVG getTotalLength(원guide))이며 기존pathLength=1을 유지합니다. 이상적전체면적상한 2r(h+r)+2πr·pL+π(pL)²→0이고 집합은단조입니다. Node수치적분과441점검사는실제browserL/AA/alpha면적 증명이 아닙니다. 4096분할Q와원polygon꼭짓점참고거리는모두r안이지만 내부coverage증명도아닙니다. 적용target은p=1/완료prefix/whole에서도항상roundsweepmask를 유지하여누락을숨기지않습니다. target별P-minus-fullsweep 빨간잔여가있으면HOLD입니다. 원polygon/fullstrokes정확guard가불일치하면거부합니다.

## root 검토

python3 docs/hanja-renderer-start-gate-candidates4-experiment-2026-10-20/serve.py --target u61f0 --port 0
--target은u61f0/u7e58/u5e28/u9e80 중하나이며항상현재후보server1개만실행하고완료/보류후종료합니다. /whole,/pairs?stroke=N,/progressive?stroke=N&coarse=1,/progressive?stroke=N&coverage=1&mask=M에서확인합니다. metrics는적용15mask중선택후보의각브라우저L/tau를표시합니다.

4개모두새native0입니다. root가각whole/모든국내방향/모든coarse/위험completionfine/모든multi경계와local0·epsilon/적용각mask의잔여coverage/자연재생을fresh검토해야합니다. UI/server/Git/build/app/lib/shared43/runtime/registry변경0, 타후보의수학/브라우저승인을상속하지않습니다.

커밋메시지: test(hanja): prepare four exact curve start-gate candidates
