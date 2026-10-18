# 鋂 원11획 bounds V/H · 원12획 LEFT 격리 실험

선택 고정 whole은 u92c2입니다. 기존 proof·source·NOTICE·보류 이력은 바꾸지 않습니다. native 승인과 runtime 등록은 모두 false입니다.

## 표시 정책과 보존 범위

원11획 raw10은 [109.96000000000001,66.1]에서 [100.66,156.19]로 약5.8938도 기운 세로이며 원 polygon1개입니다. raw11은 같은 끝점에서 오른쪽 [184.36,156.19]까지의 가로이고 polygon2개입니다. 이 세 원 polygon은 좌표·연결·순서를 바꾸거나 나누지 않고 각각 V-down bounds clip1개와 H-right bounds clip1개에 넣습니다. 원11획 combined guide의 활성 reveal을 보존한다는 주장은 하지 않습니다. 기존 down/right 사각 clip을 이 고정 두 call에만 선택한 **표시 정책 변경**이며, 원curve의 revealWidth14를 넓히거나 대체 guide를 창작하지 않습니다. 범용 diagonal 처리나 기존 H→V22/23 guard 지원으로 확대하지 않습니다.

원11획 per-call weight45.284374·41.85의 합87.134374는 기존 pen weight와 같습니다. V 원outline의 foot는 authored endpoint보다19.21sourceunits 아래로 이어집니다. 아래쪽 발끝을 먼저 채운 뒤 높은 가로 위치로 돌아오는 인상이 국내 방향·박자와 맞는지는 root의 새520px 검토가 필요합니다. 고정 H 시작 edge는 원V 내부이지만 양의 겹침만으로 native 연속성 승인이라 하지 않습니다.

원12획은 기존7e0649 UP/LEFT primitive의 LEFT14 함수·eligible·derive 본문을 바이트 그대로 가져와 같은 원baseline에서 **독립적으로** 분리합니다. 기존11획을 바꾼 결과에 순차 적용하지 않습니다. 두 독립 결과의11/12획만 합치고 다른13획의 모든 mask·guide·width·weight·순서는 그대로 둡니다. 원 polygon37개는 정확히 한 번씩 유지하며 최종15pen17mask입니다. 원12획 body guide·폭·weight는 유지하고 마지막 원tail outline만 기존LEFT mask로 옮깁니다.

## baseline 출처와 엄격한 API

기존 LEFT4 source 실험의 커밋된 공개 fixtures.json에서 baseline과 독립 LEFT12 결과를 읽습니다. 이전 실험의 첫 baseline 캡처를 재사용한 것이며 과거 독립 compiled hash라고 하지 않습니다. 새 원source compiler·engine 실행은0이며 새 baseline을 추론하지 않습니다. 원engine8/header4/bodyfull5/trace/source closure·이전lab8을 SHA로 고정합니다. 외부 API는 full5 proof와 unprefixed {root,file,fileSHA256}를 받는 필수3/4인자입니다. 누락·extra·casing·prefix·proof 변조는 파생 전 거절합니다.

## native 검토 전제

이번 새 후보의 whole·방향·coarse·fine·재생 검토는0입니다. root의 직전 기존LEFT12 후보 검토에서11획 foot가100%에서 약17px 늘어난 관찰이 새 실험의 동기입니다. 기존12획 LEFT fine이 자연스러웠다는 이력을 이 실험의 전체 승인으로 승계하지 않습니다. 원source row/획수/whole 해석을 바꾸지 않습니다.

원11획 새경계 약.5197073430515493와 원12획 LEFT경계를 각각 before/at/after·0/epsilon·95/99.99/100·8초자연재생으로 fresh 확인해야 합니다. top fine/pair의 국내·기존·실험 SVG는 각520px, coarse의 기존·실험 SVG는 각220px입니다. raster/AA에서의 native 연속성·방향은 source 면적 계산으로 증명하지 않습니다.

서버는 공개 최종 fixture만 RAM에 읽으며 startup/GET의 sourcecompile·engine은0입니다. 국내SVG는 고정 SHA를 검사해 RAM에서만 읽고 저장하지 않습니다. localhost/port0만 사용하고 root가 검토를 마치면 child와 wrapper를 종료합니다.

실행: rtk proxy python3 -B serve.py --target 564 --port 0
정적 검사: rtk proxy node source-check.mjs

## 실제 source 검사 결과

단회 source-check가 성공했습니다. 양성 candidate 호출1회·동일 캐시 baseline 독립 파생2회·음성거부30건이며 기존 source compiler0·engine0입니다. Node 구문2파일·Python AST1·check-only guard1회가 통과했습니다. 전체15pen17mask37polygon의 원polygon exact-once·다른13획 불변·source 입력불변을 확인했습니다.

최종 candidate SHA256 `ccaf8ca2095d6c1c008aceff90f1af7fe619302741284dd93a32ffd80849df86`, baseline `dcbf44d0645e6b063acfbb2dc5508c000fa63309ee57ac6e2f61494f06c90b8f`입니다.11획 경계 .5197073430515493,12획 LEFT 경계 .9014638588254574입니다. 각 cardinal clip의 원polygon half-plane 면적은0에서0이고1에서잔여0입니다. H epsilon은 완료된 원V 내부입니다. 이는 소스 산술 결과이며 raster/AA·국내 방향·whole·재생 승인으로 확대하지 않습니다.
