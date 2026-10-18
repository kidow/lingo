# 岯623 V2→H1 경계 표시 실험

고정 whole `u5caf`의 2획 raw[1,2]만 대상으로 합니다. V call의 원 다각형 두 개와 H call의 원 다각형 한 개를 2+1 chunk로 분리합니다. 새 좌표·연결선·원 outline·call 좌표·폭·방향·획순·비대상 mask 변경은 없습니다.

기존 곡선 centerline guide를 원 polygon bounds의 down→right 표시로 바꿉니다. 따라서 **active guide와 표시 범위는 원 centerline과 동일하지 않습니다**. V foot은 원 main polygon 자체이며 별도 저작한 꼬리가 아닙니다. 원 call 길이/2 가중치48·25.085의 합73.085를 보존합니다. 예상 경계는0.6567695149483478입니다.

기존 鋂 VH 함수와 달리 V2/H1 및 flags0/13→2/2, chunks[0..1]/[2]를 좁게 검사합니다. 기존1387byte 본문 전체 동일 재사용 주장은 하지 않습니다. 원 polygon 정규화·bounds·가중치 공식과 타획 참조 보존 방식은 재사용합니다. V convex main quad 안에 H 시작 edge가 엄격히 포함되는 guard와 epsilon 면적 검사는 source 산술이며 native 승인 근거가 아닙니다.

## 고정 계약과 출처

원623의 full5 proof와 header4·draw trace·archive closure3records/1whole/0providers를 byte pin합니다. 외부 API는 compileProgressive(trace,full5,id3) 필수3인자, compileSourceWhole(root,trace,full5,id3) 필수4인자입니다. id3은 root/file/fileSHA256이며 prefix 없는 정확한 이름입니다. 원 legacy2 compiler는 변경하지 않았으며 baseline 첫 확보에만1회 호출합니다. 이후 검사는 먼저 저장한 공개 baseline 캐시를 사용하고 원 compiler·engine을 실행하지 않습니다. baseline hash는 이번 capture의 hash이며 독립 과거 증거라고 주장하지 않습니다.

기존 원2획 hold, 원72프레임 검토/0승인, 미검토fine5/7·replay·기존canonical은 불변입니다. nativeApproval=false/runtimeApplied=false이며 앱 자동재생·새 국내 대조를 검증하지 않았습니다.

## 검토 helper

`rtk proxy python3 -B docs/hanja-bounds-vh-u5caf-source-experiment-2026-10-18/serve.py --target 623 --port 0`

whole/pairs/progressive에서 LEFT 국내·MIDDLE 기존·RIGHT 실험을 봅니다. fine/pair는 각각520px, coarse baseline/candidate는 각각220px입니다. 모든2획 mask 경계 직전/경계/직후와0/epsilon/50/95/99.99/100%,9개 coarse,8초 자연재생을 제공합니다. 국내SVG는 SHA/clip count가드 후 RAM에서만 사용하며 저장하지 않습니다. 매GET 원본21핀과 신규7핀/config/preparation bytes를 검사하고 source/engine compile0입니다. 서버는 root가 필요할 때 실행·종료합니다.

## 검증 기록

preparation.json의 실제 단회 source-check 결과를 참조합니다. 공개 fixtures.json만 저장합니다. private SVG/HTML/이미지는 저장하지 않습니다. native/runtime/registry/hold/resume 변경은 없습니다.
