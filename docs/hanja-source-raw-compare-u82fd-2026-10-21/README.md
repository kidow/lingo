# 苽 · 원 polygon 정적 whole/raw 비교

국내9획과 원 K body3(10raw·11calls·23polygon), base actualfull5(9raw·10calls·21polygon)를 각각 독립 표시합니다. 원 좌표와 viewBox200의 M/L/Z만 사용하며 크기520px는 표시 크기입니다. K에 base header를 결합하지 않습니다. 원파일·NOTICE·HOLD·sourceGroups는 바꾸지 않으며 새source/애니메이션/runtime 승인도 없습니다.

## 원자료와 보류

K: `docs/hanja-goal-glyphwiki-batch1068-2026-10-13/engine-whole-u82fd-k.json` SHA 4e7bed3138e42c70a00f80a866afb69b9b8634cac9c6c64eec01e7814efec95d / 정확 keys defaults·groups·trace, identity3. Base: `docs/hanja-goal-glyphwiki-batch1068-2026-10-13/engine-proof.json` SHA 4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a / 원actualfull5 identity3. 두 body는 실제로 다르므로 서로의 geometry/header/승인을 공유하지 않습니다.

기존 native-review는 K의 방향9 PASS=false와 VS3 pen7 두번째mask 경계 뒤 유한 nib FIRSTFAIL을 기록합니다. 이 하네스는 그 실패를 재검증하거나 통과로 바꾸지 않습니다. VS3는 이번 표시 대상에서 제외합니다. 단순 raw번호·정적 형태만으로 국내 획 대응이나 합획·필순을 승인하지 않습니다.

## ROOT 실행과 제어

ROOT만 `python3 docs/hanja-source-raw-compare-u82fd-2026-10-21/serve.py --port 0`으로 전용 서버 한 개를 시작합니다. PID·포트를 기록하고 검토 종료/보류 시 소유 서버·래퍼만 종료합니다. 이 준비 단계에는 HTTP·서버·UI 실행0입니다.

`/whole`은 국내 전체·base 전체·K 전체를 분리합니다. `/compare` 기본source는 K이며 domestic1..9/raw1..10을 각각 single/prefix 선택합니다. base를 선택하면 raw1..9로 제한합니다. 예: `/compare?source=k&domestic=1&raw=1&dview=single&rview=single`. 같은 번호가 대응한다는 의미가 아닙니다. 정적 prefix도 원 배열 순서의 표시일 뿐 새로운 논리획이나 시간적 방향 증거가 아닙니다.

국내 XML은 고정 URL/bytes/SHA로 서버 startup에서 RAM에 정확히1회만 읽습니다. 원 title·clip9·viewBox·root/group attrs를 파싱하고 표시하며 rootattrs/viewBox를 미리 추정하지 않습니다. author HTTP0이며 검사 XML은 합성 자료입니다. 실제 국내 좌표/transform은 시작 시 고정 원XML에서만 얻고 디스크에 저장하지 않습니다.

새 focused는 정확한 원44polygon 각각 whole에서1회·single/prefix 보존, base/K proof역할·identity변조 거부, 선택 범위·합성 XML 계약만 검사합니다. 기존 compiler/factory/projector/engine/helper 및 과거 검사는 실행하지 않습니다. native/APP/runtime은 false이며 ROOT 실제 관찰 전 통과 기록을 만들지 않습니다.
