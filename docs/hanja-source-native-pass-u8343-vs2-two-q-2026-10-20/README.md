# 荃 VS2 두 Q 독립 native 통과 기록

root가 IAB 브라우저 패널에서 source8 commit0014ea255eeb3699b86c53e5bc68999fbe380268 / renderer6 commit109e9f5d30fd21bfc52a8f3b27066df68171c902의 고정 후보를 직접 관찰했습니다. 이 문서는 기존846 HOLD나 source8/renderer6의 preparation false를 덮어쓰지 않는 새 독립 증거입니다. 원10획/11mask/20polygon·각 Q 원 outline/path/width/weight와 source gap은 불변입니다.

whole1회·전10방향75%@520, 전10획99.99→100(5/6은99.999999 추가)@520, coarse90candidate+90baseline@220=180이 PASS했습니다. 6획 경계.3743875462201848의 before/at/after±1e-6와 다음mask0/epsilon .0001%/95 총6candidate, Q5/Q6 rho=r 전후 각3 총6candidate를 확인했습니다(원 SVG520/CSS border 포함 crop522). 두 Q의 P-minus-full-round 잔여는 흰색@520이며 Q5global0/epsilon/95도 통과했습니다.

UA L5=55.10026550292969,L6=46.49167251586914입니다. 각8초 natural은 시작과 완료를 관찰했고 모든RAF를 본 것이 아닙니다. Q5초기UI5.0475% 뒤 읽은 metrics는global/local .05986250001192093,L55.10026550292969,d/rho3.298439644325975,point(48.89913558959961,36.04238510131836)이었습니다. Q6첫재생이0에 머물렀다가 fresh AX와 실제 버튼18 클릭으로 회복했으며 원인은 추측하지 않습니다. 회복초기UI5.065% 뒤global .06003749999999991/frame:null은 첫H진행이라 정상입니다. 둘 다100%까지 관찰했습니다.

완료에서 metrics는 cached last frame(Q5local .9994250000119209,Q6local .9993606265387094)이므로 current p1이라고 기록하지 않습니다. 실제 완료DOM에서 prefixQ5/현재Q6의 full-round mask2·dasharray null을 별도로 확인했습니다. UI const 재선언 warning1과 첫재생 미작동1은 형상FAIL로 확대하지 않으며 실제값과 회복관찰을 구분합니다. native geometryFAIL은0입니다.

전용서버 PID78821/port60769/session12825는 root가 정확히 종료하여 exit143을 확인했습니다. source/NOTICE/기존HOLD/기존스냅샷은 그대로입니다. 이 PASS는 standalone에 한하며 실제앱 component/controller/storage/runtime 적용은 아직false입니다. 후속荃 전용 app3와 실제component harness를 별도로 검증해야 합니다.
荃 앱 전용 좌표계 가드 보정: 독립 읽기 감사에서 cap/ink의 transform 또는 같은 SVG 안 부모 변경이 기존 가드를 통과할 수 있음을 확인했습니다. 현재 component는 별도 offscreen SVG가 아니라 같은 target g/defs에 측정 경로를 두므로, 해당 부모·document·owner 연결과 attribute/computed transform을 UA 읽기 전·사이·후 및 visibility 커밋 직전에 고정 확인합니다. measurement에는 pathLength가 없고 표시 dash에만 pathLength=1을 유지합니다. 기존 癙 함수/테스트 prefix와 component bytes·원 source/standalone 결과는 불변입니다.

새 failed-tail 검사 최초1회 FAIL 뒤 외부 SVG 부모 기본 검증 및 과도한 mock 기대만 보정하여 복구1회 PASS(362거절,219.531ms)했습니다. 기존 荃 3개 집중검사는 반복하지 않았습니다. 변경2파일 AST는 각각 실제1회 diagnostics0이며, 그 전 CJS import namespace를 읽지 못한 RAM 준비 오류2회는 AST/파일쓰기0에서 createRequire로 복구했습니다. 이 보정은 실제 component 브라우저 검증이 아니며 actualComponentBrowserVerified/runtimeApplied=false를 유지합니다. 최종 앱 파일 SHA와 정직한 실행 이력은 review.json의 appCoordinateGuardCorrection에 고정했습니다.
