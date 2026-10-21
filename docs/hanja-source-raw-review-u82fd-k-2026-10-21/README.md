# 苽 K 정적 비교 — 7획 형태 차이 보류

ROOT가 국내/base/K whole 각 1화면, 국내 1~9 single 9화면, K raw 1~10 single 10화면을 실제 관찰했습니다. 총 22화면에서 잉크 전체가 보였고 prefix와 VS3의 새 관찰은 없습니다. whole 관찰을 전체 형태 호환 승인으로 확대하지 않습니다.

국내 상단은 H1·V2·H3·V4, K는 H1·V2·V3·H4여서 3/4 위치가 다릅니다. 정적 번호 대응 후보는 `[[1],[2],[4],[3],[5],[6],[7,9],[10],[8]]`입니다. 국내7은 stem V 뒤 오른쪽 H이지만 K raw9는 왼쪽으로 길게 뻗은 가로 전체입니다. 원 raw7+9를 모두 보존하면 형태 차이가 남으므로 보류합니다. 원 polygon을 자르거나 수정하지 않았으며 sourceGroups는 빈 배열이고 제안은 별도 필드입니다. base도 상단 H가 raw1에 통합되어 선택하지 않습니다.

K는 `engine-whole-u82fd-k.json`의 실제 body3만 사용합니다. base의 actual full5와 별도 정체성이며 base 헤더를 K에 합성하지 않습니다. 과거 K 방향 실패와 VS3 7획 activation HOLD, 원 NOTICE는 그대로 유지합니다. 이번 기록은 정적 대응 후보이며 시간·방향·합획·source animation·APP·runtime 승인은 모두 false입니다.

뷰포트 518×766에 nominal SVG520의 흰 모서리만 일부 잘렸고 실제 잉크는 모두 보였습니다. 오류 로그는 이번 보고에서 검토하지 않았습니다. 전용 서버 PID67425/port59412/session66809는 CtrlC exit130(짧은 traceback) 뒤 ps status1로 PID 부재를 확인했습니다.

새 메타데이터·고정 입력핀 검사 1회만 수행합니다. 기존 검사·compiler·factory·projection·engine·기하·빌드·TSC 재실행은 0입니다. 상세 정체성, 관찰 범위와 고정핀은 [review.json](./review.json)에 기록합니다.
