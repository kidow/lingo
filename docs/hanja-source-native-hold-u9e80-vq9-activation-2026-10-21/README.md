# 麀 corrected 후보 VQ9 활성화 — HOLD

두 UP 꼬리 분리 뒤의 고정 후보(13획·16마스크·42polygon)를 ROOT가 검토했습니다. VQ9 두 번째 마스크 시작 직후 큰 고립 유한 polygon(각진 block)이 나타나 FIRST FAIL입니다. baseline도 같지만 동일 투영에서 유래하므로 독립 승인 근거가 아닙니다.

## 실제 캡처 범위

browser2 tab43, viewport1280×720에서 default11 → 9 링크 → 경계 전·정확·직후를 조작했습니다. 처음 3장은 candidate 오른쪽이 화면 밖이거나 부분만 보였으므로 완전한 실제 candidate 증거로 사용하지 않습니다.

ROOT가 SVG count3을 확인한 뒤 실제 오른쪽 SVG index2를 클릭해 직후 nib을 먼저 확인했습니다. 이어 각 경계 버튼 뒤 SVG index2를 직접 클릭하여 before/at/after 유효 3장을 다시 관찰했습니다. 경계는 0.33586229166757064, delta는 ±1e-10이며 표시값은 33.58622916% / 33.58622917% / 33.58622918%였습니다. before/at에는 새 두 번째 Q가 없고 after에서 큰 고립 finite block이 즉시 나타났습니다. 최초 세 부분 캡처는 PASS·FAIL을 확정하는 완전한 증거로 세지 않으며 최종 3장과 구분합니다.

수정 대상11·13 UP 꼬리 gate, whole·방향·fine·coarse·natural·coverage 및 다른 gate는 모두 미실행입니다. Q2 고립 block의 엄밀한 원인 증명이나 새 보정은 수행하지 않았습니다. 원이전11·13 완료 팝 FAIL은 별도 과거 후보의 이력으로 그대로 보존합니다.

## 고정 출처와 보존

고정 source8: `../hanja-source-independent-vq-two-up-u9e80-source-experiment-2026-10-19/`.
기하 SHA256은 `c14d5e5bfa57bff1b1b31b4faab58e98c21795b72e7c6e84709018ada1192151`입니다. actualfull5/id3와 progressive3·whole4 계약, 원15raw·20calls·42polygon·VQ9 gap[-21,6] 및11·13 exact UP partition, guide·폭·weight·좌표·원HOLD·NOTICE는 모두 불변입니다. 새로운 source/group/renderer 수정은 없습니다.

ROOT는 탭을 먼저 닫고 PID92373 / port49713 / session37775에서 Ctrl-C exit130을 확인했습니다. 종료 출력은 비었고 ps로 PID 부재를 확인했습니다. author는 서버·브라우저를 실행하지 않았습니다.

native/runtime/app 승인은 false이며 적용5746·미적용232를 바꾸지 않습니다. 새 HOLD JSON·39개 입력핀·README digest 메타데이터 확인 1회만 수행합니다. source/compiler/factory/derive/engine·기존 검사·UI·서버·Git·빌드는 실행하지 않습니다.
