# 萇 원캐시 정적 비교 · VS2 새 관찰 준비

기본 화면은 국내12획 전체와 원 VS2(u8407-ue0102)의 body3/13raw/26polygon만 각520px로 나란히 표시합니다. ROOT가 whole와원번호대응을먼저확인하는 정적 도구이며 partial animation·새source8·합획·순서·기하생성이 없습니다.

기존832 HOLD: base/VS0/VS1은 connected3pen草로 국내4pen草와 whole불일치였으므로 새재검증대상이 아닙니다. /base-reference는그원12raw24polygon의과거참고만선택표시합니다. 원VS2만whole호환이었지만13raw대국내12 및하부fold oldzero-based raw4/5(화면1-based raw5/6) gap[-27,9.905]가남았습니다. 새연결선·원raw합치기·번호대응추정으로이를해소하지않습니다. 원review/NOTICE/source/cache는변경하지않습니다.

base는 원 engine-proof.json actualfull5 SHA405140315a52c6b34dff87f6c8af11ae1c9cea7a545e20d5de683e3e6ebb8019와 selectedbody3 SHA9d75cb2107b46a390dd89188177f975b35a892c735332a965856111b00a382c8의groups/trace/defaults exact일치 및 identity5를고정합니다. VS2는 원 engine-whole-u8407-ue0102.json body3 SHA4feed3fbf8f5ea97f8907536ada45a5b0070af09b571e24f5dbf018448184306와 identity3만읽습니다. base header를VS2에붙이거나body3를full5로승격하지않습니다. captured records9는closure숫자가아닙니다.

원polygon의원x/y/off0·원viewBox200에서 M-L-Z만직접표시하며 좌표정규화·보간·raw순서변경·새경로생성은하지않습니다. sourcegroup와tracepolygon은원순서로같고 base24/VS226원polygon을각한번씩표시합니다. 국내는원viewBox1024/원transform/시간순DOM번호를유지합니다.

ROOT 실행: python3 docs/hanja-source-raw-compare-u8407-2026-10-21/serve.py --port 0

/whole 기본VS2+국내전체, /compare 기본VS2·국내1·raw1이며국내1..12/raw1..13의single/prefix를각자고릅니다. base참고는raw1..12이고variant전환시raw1로명시초기화하여같은번호의대응을가정하지않습니다. /base-reference는과거base whole불일치참고만, /checks는각원root의별도개수/승인false를반환합니다. SVG520px·2열540px고정이므로좁은패널에서는가로이동하여둘다실제관찰합니다.

시작시에만고정국내URL의6438byte/SHA49144737314e9f8d8f84e4d77196ef4811cf6e3e0ef1d2dda748740238c3472c를RAM1회확인하고저장하지않습니다. 이번준비단계에는HTTP/실제XMLfetch가없습니다. source/compiler/factory/engine/projection실행0이고원helper를import/run하지않습니다. 새정적핀·원polygon·selector·HTML계약검사1회와신규구문만확인합니다. mock국내표시는실제native승인근거가아닙니다.

새native/whole/방향/합획/runtime/app모두false입니다. ROOT만서버/UI/Git을진행하고검토완료·보류시ownedPID/port/wrapper와불필요탭을정리합니다. 준비중서버·UI·Git·빌드0이며기존검사반복0입니다.
