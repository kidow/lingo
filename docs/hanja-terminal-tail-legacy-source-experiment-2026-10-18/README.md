# 기존 terminal UP·LEFT 폴리곤 분리 격리 실험

玿657 5획·珗648 10획·祔605 9획·罦610 11획만 대상으로 합니다. 고정된 기존 terminalUpTail/terminalLeftTail 함수와 원 point(Math.floor(x*10)/10) 코드를 그대로 사용하여 마지막 원 tail polygon의 바이트 동등성을 확인합니다. 계산으로 만든 polygon은 identity 검사에만 쓰고 출력에는 원 polygon outline 자체를 이동합니다.

원 body의 outline에서 마지막 tail polygon만 제외하고 body bounds를 남은 원 정점으로 계산합니다. 원 revealPath/revealWidth/direction/weight와 다른 모든 획은 그대로입니다. 분리 tail은 원 outline·원 정점 bounds·기존 up/left 방향 및 기존 jump/2 weight를 사용합니다. 새 좌표·guide·폭·연결선·필순을 작성하지 않습니다. 획수 불변·대상 mask만1→2이며 모든 원 폴리곤은 정확히1회 남습니다.

기존 public full5 whole + header4 + 별도 draw-trace의 일치, dependency closure·engine8 고정 hash를 확인합니다. 신규 wrapper는 정확한 selected root/file/fileSHA256와 fullproof 전체SHA, source/header/trace byte pins를 먼저 검사하고 원2인수 API에만 위임합니다. byte pins와 첫 baseline SHA는 이번 신규 캡처이며 독립적인 과거 hash 검증으로 표현하지 않습니다. 기존 archive 검증 기록은 과거 기록이고 이번 새 engine/HTTP 재생이 아닙니다.

기존 보류·registry·source·NOTICE는 불변입니다. 원 whole/방향·이전실패 관찰은 기존 기록으로만 유지하며 새 실험의 승인으로 세지 않습니다. PUBLIC fixture만 저장합니다. 국내 SVG는 helper RAM-only입니다.

Root 검토 실행: `python3 -B serve.py --target 657 --port 0` (648/605/610 선택). 준비 중 서버는 시작하지 않습니다. 고정 공개 fixture cache로 startup/GET compile0·engine0. `/whole`, `/pairs?stroke=N`, `/progressive?stroke=N`, `&coarse=1`, `/checks`를 제공합니다. actual520·0/epsilon·95·99.99·100·새 body/tail 경계 전/중/후·9coarse·자연재생은 별도 native 검토가 필요합니다.

source-only/nativeApproval=false/runtimeApplied=false. 원 polygon 보존은 방향·경계·AA·ink-front 연속성 승인과 다릅니다. local tail 면적 probe는 부동소수점 근사이며 whole-pen 시각 certificate가 아닙니다.

집중 검증1회 exit0: 양성 각1(총4), 음성68개 모두 위임 전 거절, Node구문 각1/PythonAST1/staticguard1 PASS. 원 폴리곤 각각1회·원 tail 바이트 일치·body guide/width/weight 및 다른 획 불변을 확인했습니다. 원 baseline은 이번 첫 양성 출력에서 새로 캡처했습니다. engine/HTTP/server/native/runtime0입니다.

새 body/tail 경계: 玿5획 .8928777260195087, 珗10획 .8163683872273019, 祔9획 .9247886572011831, 罦11획 .7367455878823783. 이 비율은 source 계산값으로 native 관찰값이 아닙니다. local tail0 면적0·100% 잔여면적0을 확인했지만 p99.99 양의 잔여면적·AA·새 경계의 ink-front는 별도 시각 검토가 필요합니다.
