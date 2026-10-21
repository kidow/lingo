# 訩 Q8·Q9 독립 renderer 유한 관찰

ROOT가 원11획·13mask·23polygon을 유지한 Q8m1/Q9m1 실험을 검토했다. 성공 관찰은 **178표본·68스크린**이다. local12, 초기10, rho6, coverage2, coarse99, fine33, 자연12, whole2, pen5 초기1, idle pen8 완료1을 합산했다. coarse는 150px 3×3 11화면, fine는 150px 3열 11화면이며 나머지는 개별 유효 화면이다.

Q8 원M은 원P 밖이지만 이번 초기·rho 표본에서 같은 획의 새 분리섬을 보지 않았다. Q9의 새 획이 이전 획들과 처음 떨어져 있는 것은 독립획의 정상 구성이다. fine·whole에서 완료 pop을 보지 않았고, 두 coverage 잔여가 빈 화면임을 원P 경계가 보이는 상태에서 확인했다. 이를 범용 연결성·연속성·수학적 coverage 증명으로 확대하지 않는다.

자연재생은 Q8/Q9 각각 유효 진행5장과 완료1장만 기록했다. 실제 #candidate 부모(x9.1690, y232.294, 너비540)에 맞춘 후 잉크 전체가 보인 화면만 채택했다. 이전 offscreen5장·잘림4장, 잘못 선택한 SVG, DOM rect0, Q9 epsilon offscreen6장은 제외했다. Q9 epsilon은 생성 frame10..15로 복구 관찰했다. 완료 p1/fullround 및 UA 보고 null 리셋, errors[]를 확인했다. 연속8초 영상이나 모든 RAF를 관찰한 것은 아니다. warn/error limit10 수집은 []였으며 해당 수집 범위에 한정한다.

원 cardinal6/10의 경계·완료12표본은 이전 리뷰를 참조하며 재실행하지 않았다. 기존 source/HOLD/준비 false는 보존한다. 실제 앱 컴포넌트·controller·storage·제품 UI·runtime 승인은 아직 false다.

서버 세션8878과53869는 모두 exit130, 59412 listener 부재로 종료 확인됐다. 8878/53869는 exec session_id이며 실제 PID는 미계측(null)이다. 최초 기록의 PID 라벨을 이 사실 정정에서 바로잡았으며 원기하·정책·승인 근거는 바뀌지 않는다. 상세 표본·핀은 review.json에 고정한다. 신규 문서 메타·합산·핀 검사1회만 수행하며 기존 renderer 검사·산술·engine·projection은 반복하지 않는다.

## 실제 component 연결 준비 이력

별도 訩 전용 app3을 추가했다. 전체11p13m23의 모든 원JSON 필드가 일치하는 private context에서만 Q8m1/Q9m1을 선택한다. 저장된 각 T1/2·K1/100을 연결하며 산술을 반복하지 않는다. 같은 연결 SVG의 원guide를 pathLength 없이 측정하고, owner/document/부모/transform/진행을 UA 읽기 전·사이·후 및 표시 직전에 확인한다. partial은 butt+miter+성장cap, p0는 미표시, p1/완료prefix는 원fullround 별도 key다. canonical data-growing-distance 6속성·cap 좌표·cleanup 회귀를 포함한다.

신규 focused 최초8개 중7개가 PASS했고, 원필드 변조56건을 모두 거절한 뒤 테스트의 `changed>60` 가정만 FAIL했다. 실제 원필드 수56으로 단언을 정정하고 실패 전용 환경변수·test-name 선택으로 이미 통과한56변조 prefix와7검사는 건너뛰었다. 실패 단언 및 미실행 sparse/상속·비열거/추가키/accessor tail만1회 실행하여 PASS했다. module/component 기능 보정은 없었다. 실제 SVG 컨테이너의 child SSR12·clock/prefix·ordinary81은 최초 실행에서 PASS했다. 최종 변경 TS/TSX3개 AST는 각1회 diagnostics0이다. import 초기화는 두 프로세스의 실행 전제이며 기존수트·renderer검사·곡률 산술 재실행은0이다.

기존 component의 추가 import/context/분기/child를 정확히 역제거하면 이전 SHA `2a15c7489c8bcde9c607faf7f48af611359dfb6625fc5eeaedcaaa5cc4a4a3c9`와 byte동일함을 최초 SSR 검사에서 확인했다. 실제 component 브라우저·controller/storage·제품 UI/runtime 승인은 아직 false다. ROOT의 후속 실제 component 검토가 필요하다.

최종 app3 SHA:

- `lib/hanja-stroke-start-gate-u8a29.ts`: `934888e6b7edf95ef5d5b5a26513e475d839aecfea07c83dd93955bd9dec6df1`
- `lib/hanja-stroke-start-gate-u8a29.test.ts`: `94e158b9c21dd65b6986e47ca8b7254a51a14ba1cca815e6c70e7ca4b338a94f`
- `components/hanja/stroke-outlines.tsx`: `e149a6c35233e3c6464007b15a0fec707746394601afd54eb17c2066cd05358f`

PID/session 사실정정 후 전용 module의 standaloneFiniteReviewSHA256 metadata1필드만 최신 리뷰 SHA로 연결했다. 옛 값으로 역교체하면 최초 앱 module byte가 복원됨을 새정정 tail1로 확인했으며 정책·애니메이션·SSR 검사는 반복하지 않았다.
