# 挃 다섯 곡선 · LEFT 보존 standalone 검토 PASS

ROOT가 고정 source의 9획·11mask·24polygon(기하 49d827b2f18f74efc30c2b9d4fa4682362aabcb84d8fde8f189d733943d1e85c)과 다섯 target 2m1/3m1/5m1/5m2/6m1을 standalone helper에서 검토했습니다. 원 LEFT314 분리 및 pen5 gap 14.293376962775445, guide/width/weight/좌표는 그대로입니다. actual 앱 component·controller/storage/routes 및 runtime 등록은 아직 미검증/false입니다.

whole 세 SVG와 전체 9방향75%(18 SVG), 전체 fine27, coarse81쌍이 PASS입니다. coarse는 명목220px/관찰221.818px이며 이전 pen1·2와 이번3~9를 합친 결과입니다. 다섯 target local6 총30 중 2m1 epsilon/full은 같은 frozen helper의 이전 관찰이며 나머지28은 이번 관찰입니다. coverage5 white 중3m1/5m1은 원 helper 불변 관찰,2m1/5m2/6m1은 고유 ID helper 관찰입니다. rho15·firstL78 전후3·다중경계12·LEFT tail local/단독 각6도 PASS입니다.

자연재생 pen2/3/5/6 각8초의 시작 global은 .160225/.15512500001192092/.16339999999403954/.15408750000000002이며 모두1로 완료했습니다. 시작/끝8화면 관찰이며 모든 RAF 관찰이 아닙니다. 길이 값은 helper metrics이며 getTotalLength 독립 API bridge 측정이라고 주장하지 않습니다.

옛 coverage2m1 HTML/SVG ID 충돌로 검게 보인 결과는 도구 실패로 보존합니다. 고유 ID mask1 확인 후 coverage PASS와 구분하며 기존 HOLD·NOTICE·false는 수정하지 않았습니다. ROOT가 PID70800/port50380/session71263을 SIGINT130으로 종료하고 PID 부재·tab13 종료를 확인했습니다.

새 문서 두 파일의 JSON/핀 일관성만 최초1회 확인합니다. 기존 source/수학/SSR/집중검사·renderer 검사는 반복하지 않습니다. standalone PASS는 앱 통합의 근거이며 실제 component/native app/runtime 승격은 별도 후속 검토입니다. 문서 쓰기 전 orchestration parse 실패1(파일/검사0) 및 local guide 상대경로 read 실패1을 절대경로로 복구한 이력은 결과와 구분합니다.

## 별도 앱 준비 단계

lib/hanja-stroke-start-gate-u6303.ts 및 전용 테스트와 StrokeOutlines의 u6303 child/context 분기만 추가했습니다. 기존 main/SI/DI/CAN/牷 정책 10파일과 기존 component의 모든 child 바이트는 보존했습니다. 고정9p11m24 전체 필드와 다섯 target만 허용하며 MLQ2m1 초기L78/네 Q의 개별 BigInt 인증은 초기arc7 한정입니다. 후반Q314·polygon 전체 sweep 및 raster의 수학적 증명으로 확대하지 않습니다.

새 집중검사 최초1회 8/8 PASS(303.272875ms), 변경 AST3 진단0입니다. source literal의 명시적 HanjaOutlineStrokes 타입 선언 누락을 읽기에서 발견해 타입만 복원하고 해당 모듈 AST1 진단0을 확인했습니다. runtime 동작 변화가 없어 통과 집중검사는 반복하지 않았습니다. 고정필드/위조·sparse 거부, 합성 UA 같은 frame/DOM 변조·cleanup, 다섯 target×9 mock parity45와 실제 child SSR의 zero/partial-hidden/full-masked 및 idle whole를 확인했습니다. mock은 실제 UA 측정이 아니며 SSR은 hydration/browser 검증이 아닙니다.

새 child는 measurement NOpathLength와 dash pathLength1을 구분하고 원 g/defs/parent/document/owner 및 attr+computed transform을 UA 전/중/후 확인합니다. 같은 p·L·endpoint·rho를 기록한 뒤 visibility를 마지막에 설정합니다. p0는 비우고 p1/prefix/whole은 항상 원 full-round mask를 유지합니다. 실제 component 브라우저·앱 controller/storage/routes·runtime 등록은 아직 false이며 牷 frozen 하네스13의 역사 자료는 변경하지 않았습니다.

앱 patch 구성 전 문법 실패1과 과대 read의 JSON truncation 실패1은 파일/검사0에서 복구했습니다. 새 앱3 핀과 이 PASS2의 정합만 별도 최초1회 확인하며 이전 source/SSR/집중검사는 재실행하지 않습니다.
