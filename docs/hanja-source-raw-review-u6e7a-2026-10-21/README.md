# 湺 원 raw 정적 대응 기록

ROOT는 기존 helper5로 국내/base/K 전체 자형3장, 국내12획 single과 base 비어있지 않은 raw14개 single26장, 빈 raw5 별도 흰 이미지1장, prefix4쌍8장으로 총38장을 관찰했습니다. 518×766 viewport에서 명목520 SVG의 흰 가장자리만 잘리고 ink는 전체 보였습니다. strict pixel 동일성이나 시간필순 승인이 아닙니다.

국내1-based → 원 raw1-based: `[[1],[2],[3,4],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]]`. 0-based는 review.json에 별도로 저장합니다. 원 raw5(type0)는 trace[]/polygon[]의 빈행으로 원본에 남기고 excludedEmpty로 따로 기록합니다. 14개 nonempty를 각각 한 번 배정하고 빈행1을 합하면 원15행 전체입니다.

물3은 원 raw3·4의 두 cdDrawCurve/type2 조각 대응만 관찰했습니다. 첫 끝(36.4,184)과 다음 시작(32.8,150)의 원 gap을 유지하며 새 guide·연결선을 만들지 않습니다. 국내7은 raw9 H+raw10 V, 국내8은 별도 닫는 raw11 H입니다. 이 정적 결합은 merged animation/방향/연속 궤적 승인이 아닙니다.

prefix 국내3/raw4, 국내7/raw10, 국내8/raw11, 국내12/raw15를 각 좌우2장으로 비교했습니다. K는 whole만 호환 관찰했고 K raw single이나 K header 대체를 승인하지 않았습니다.

base 원 actual full5 engine-proof SHA `ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9`와 선택 body3 SHA `9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c`를 그대로 결박합니다. body3의 groups/trace/defaults는 기존 full5의 동일 필드와 일치하며 새 full5를 합성하지 않습니다. K는 별도 body3-only입니다. 원1087 HOLD/min13/sourceGroups[]/compiler/NOTICE와 false 이력은 그대로입니다.

ROOT 서버 PID56029/port59412/session85739는 CtrlC130/serve129 짧은 traceback 뒤 승인된 ps에서 부재 확인했습니다. tab62는 유지했습니다. 저자는 HTTP/UI/서버/기하/factory/compiler/engine/Git/build를 실행하지 않았습니다. 새 문서는 정적 대응 관찰만 true이고 native direction/temporal/animation/APP/runtime은 false입니다.
