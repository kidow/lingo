# 苽 VS3 body3 정적 대응 검토

ROOT가 실제 VS3 body3만 쓰는 정적 helper에서 국내 whole/VS3 whole 각1, 국내 single1~9 전체9, VS3 raw single1~10 전체10, 국내1~7 prefix/VS3 raw1~8 prefix 각1을 관찰했습니다. 유효 native 화면은 2+9+10+2=23개이며 현재 잉크가 모두 보였습니다. single7 첫 비교의2화면은 이후 복수링크 strict 에러로 출력이 불확실하여 제외하고 재시도 화면만 계수했습니다.

정적 대응 후보(1-based)는 `[[1],[2],[4],[3],[5],[6],[7,8],[9],[10]]`입니다. 국내 상단 H1·V2·H3·V4와 VS3 H1·V2·V3·H4의3/4 차이를 기록합니다. raw5/6은 국내5/6, 국내7의 V 뒤 오른위 가로는 raw7 V와 raw8 오른위 가로, 국내8은 raw9점, 국내9는 raw10오른내림과 정적으로 대조했습니다. 국내1~7과 원raw1~8 prefix의 누적 구성도 정적 대응 가능성이 있었습니다. 같은 sourceGroups의 동적 승인이나 합획시간·방향 승인은 아닙니다.

K raw9의 긴 왼쪽 가로는 VS3 raw8에 없습니다. 다만 VS3 raw8의 작은 왼아래 세리프를 관찰했고 서체 차이 범위로 따로 남깁니다. 정확한 자형 동일성을 주장하지 않습니다. 원polygon 절단·새connector·outline/guide 수정·다른root 혼합은 없습니다.

실제 VS3 `engine-whole-u82fd-ue0103.json`은 defaults/groups/trace의 body3이며 10raw/11calls/22polygon, 파일SHA `fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b`, id3 root=u82fd-ue0103입니다. 기존 base header 합성full5/원compiler는 사용하지 않았습니다. 현재 sourceGroups=[]이고 위 번호는 별도 proposal입니다. 기존 VS37 두번째mask activation nib HOLD와 K 방향/형태 HOLD는 해결하거나 덮지 않습니다. 새native animation/temporal·APP·runtime 승인은 false입니다.

서버 PID5327/port59412/session45694는 CtrlC exit130/output0 뒤 ROOT의 ps에서 부재를 확인했습니다. 저자 HTTP/UI/server/Git·기하·projection/compiler/factory/engine·기존검사/build/TSC 실행0이며 새 메타·고정입력11핀 확인1회만 수행합니다. ROOT의23 정적 관찰은 새 동적source 승인과 구별합니다.
