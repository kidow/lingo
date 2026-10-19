# 蘩 VS2 order candidate — native boundary16 HOLD

- 기록일: 2026-10-19. Root의 이번 fresh native 관찰만 기록합니다. 기존 source·원proof·geometry·NOTICE·이전FAIL 이력을 변경하지 않습니다.
- 대상: `hanja-source-independent-qq-left-order-u8629-vs2-source-experiment-2026-10-19/`. Source commit은 제공된 축약 `71e44…`만 보존하며 fullSHA를 추정하지 않습니다.
- Preparation SHA256: `2553d1dd8b626bf4c1492d8a9214f8b674f50035818b4eca73ed0fdc65d66f34`. Config SHA256: `1f8cdddbc3203a040852e7811a153c6070dbdd2d502dcd713429c586d831650a`.
- 공개 candidate geometry SHA256: `4d858961b59c0abb02db765f3f0009b30d4333df83cae1aff2f441bc905c8192` — 21획·24마스크·54폴리곤.

## 실제 관찰·중단

Root는 VS2 전체 자형1개가 국내 자형과 호환됨을 확인했습니다. FIRST boundary16의 before/at/after를 실제3SVG520에서 대조하던 중, 오른쪽 CANDIDATE의 두 번째 원 Q 시작부가 경계 직후 약10px의 떨어진 양성 영역으로 갑자기 출현하여 FAIL로 보류했습니다. 경계 직전/정점 관찰을 전체 경계 PASS로 확대하지 않습니다.

이번 후보의 다른 fine·방향·coarse·다른 경계·자연재생 gate는 모두 미실행입니다. 과거 LEFT·QQ·order branch의 부분 관찰이나 승인을 이번 gate의 PASS로 승계하지 않습니다. 원 source의 nativeApproval/runtimeApplied=false를 보존하며, 이 문서는 별도 canonical HOLD4·registry·runtime 변경이 아닙니다.

Root 보고 서버 PID39066 / port58826 / session16638은 STOPPED, 종료코드143입니다. 문서 작성자는 UI·서버를 실행하거나 종료하지 않았습니다.

## 독립된 고정 proof와 경계

선택 root는 `u8629-ue0102`입니다. 실제 full5 `../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0102.json` SHA256 `941040794a9a052683f9a5b5d62c9fcce4519e28bceecabc0c2471ecb84cb780`과 기존 id3 root/file/fileSHA256·필수3/4 계약을 그대로 유지합니다. 다른 whole·trace를 혼합하지 않습니다.

현재 whole-pen 순열은 `[1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]`이며, 경계16은 원 raw17/18의 독립 Q/Q 마스크입니다. 원 첫 Q 끝 `[70,138.84199999999998]`와 다음 Q 시작 `[44,129.76999999999998]`의 delta `[-26,-9.072000000000003]`, raw gap `27.537269000392904`는 보존됩니다. 경계값은 `0.4387289328474441`입니다. 원 gap을 메우거나 새 connector를 만들지 않습니다.

다른 복수 마스크 경계8=`0.8661807063624651`, 17=`0.2814581973372976`은 config의 고정 수치일 뿐 이번 native검토의 PASS가 아닙니다. sourcefactory·기하·tail·engine 추가산출은 없습니다.

## 후속 범위

Root가 다른 에이전트와 공유 renderer의 시작 정책을 읽기분석 중입니다. 棖·粻의 유사 관찰과 원인이 같다고 확정하지 않으며 각각의 proof·source·실제 관찰을 분리합니다. 이 문서에서 renderer 코드나 시작 guide/clip/width/weight/direction을 바꾸거나 원폴리곤의 새로운 진행 순서를 발명하지 않습니다.

같은 고정 source·helper·renderer 정책으로 이번 경계를 반복 검사하여 새 근거로 계산하지 않습니다. 재검토 전에는 실제 오른쪽 candidate mask id/local progress/처음 노출되는 원폴리곤과 시작 정책의 관계가 명시되고, 검증 가능한 source보존 guard·정책 근거가 확보되어야 합니다. renderer나 helper 정책이 후속으로 바뀌면 그 버전·핀·원 baseline과의 차이를 구분해 새 판정 대상으로 기록해야 합니다. 그 뒤 root가 모든 필요 gate를 fresh 검토하며 이번 HOLD와 기존 부분 관찰을 보존합니다.

이번 작업은 이 독립 HOLD 문서1개 추가만 포함합니다. source/geometry/compiler/engine/test 재실행0, UI/server/runtime/registry/Git/build0입니다.
