# 梲 원raw 정적 대응 관찰

ROOT가 국내11획과 base 원13raw를 실제 single/prefix로 대조했습니다. 이 기록은 정적 형태의 대응 후보만 보존하며 방향·시간·합획·애니메이션·runtime 승인은 false입니다. 새sourceGroups·guide·마스크·source cache를 만들지 않았습니다.

browser2 tab48, viewport1280×720에서 whole 국내/base/VS0 3개 모두 compatible로 관찰했습니다. base raw1..13 single을 전부 확인했으며 당시 국내1이 배경에 고정되어 있었습니다. 이어 raw13이 고정된 상태에서 domestic2..11 single을 모두 관찰했습니다. 서로 다른 single 대상은 raw13개+국내11개=24개입니다. 이것을24개 독립 캡처나24개 시간적방향 검증으로 확대하지 않습니다. VS0는whole만 확인했고 individual/prefix·재생은 미관찰입니다.

## 1-based 정적 대응 후보

`[[1],[2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13]]`

국내6은 원raw6의 위H와 raw7의 오른쪽 내림/Q 두 조각 대응 후보입니다. 국내8은 口의 원raw9 topH+raw10 V 대응 후보입니다. 원의 잘못된口 leftV+bottomH 합병(zero-based[7,10])은 사용·승인하지 않습니다. 이 표를 sourceGroups나 temporal필순 승인으로 취급하지 않습니다.

prefix 국내1..6 ↔ base raw1..7, 국내1..8 ↔ raw1..10, 국내1..11 ↔ raw1..13의 각 좌우 SVG를 native로 관찰했고 3쌍/6SVG는 compatible였습니다. 다른prefix는 미관찰입니다.

## 고정 출처와 실행 경계

원batch961 base `engine-whole-u68b2.json`과 VS0 `engine-whole-u68b2-ue0100.json`은 각각 실제full5이며 원engine-proof와 같은 SHA256 `34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc`를 보존합니다. 바이트가 같아도 root별identity는 별도로 유지합니다. 원13raw·15calls·29polygon·원HOLD/NOTICE·미승인 상태는 그대로입니다.

검토 helper는 `../hanja-source-raw-compare-u68b2-2026-10-21/`의 고정5파일이며 실제 국내viewBox1152를 유지합니다. helper 작성 시 검증·과거HTTP는 이번에 반복하지 않았고 sourcecompiler/engine/projection0입니다. 원helper의 과거420px·viewBox1024 기록과 이번 실제520 정적 관찰을 혼동하지 않습니다.

ROOT는 탭을 먼저 닫고 PID8891 / port51804 / session43189를 SIGINT exit130(짧은 traceback)으로 종료한 뒤 ps로 PID 부재를 확인했습니다. author의 서버·UI 실행은0입니다.

이 새2파일은 JSON·23개 직접입력핀·README digest를 확인하는 metadata1회만 수행합니다. 기존source/검사/SSR/compiler/engine·새논리sourcecache·애니메이션·Git·build는0입니다. native/runtime/app false이며 sourceGroups는 빈 배열 그대로입니다.
