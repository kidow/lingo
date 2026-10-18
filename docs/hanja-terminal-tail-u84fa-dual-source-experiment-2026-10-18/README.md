# 蓺 9획 line-UP +14획 curve15 격리 소스 후보

원738 자료·NOTICE·보류와 lead7 공개 캐시는 불변입니다. Root의 새 검토에서 기존9획 fine/경계는 통과했으나14획은99.99→100에 약35px UP 말단이 추가되어 실패했습니다. 이 실패를 해제하거나 새 후보의 시각 승인으로 취급하지 않습니다.

원 cdDrawLine(6/5) 전용 UP 함수는14획 cdDrawCurve(22/15)에 적용할 수 없습니다. 9획은 기존 UP7e 함수,14획은 고정979 curve15 지원628bytes/partition2652bytes를 byte 그대로 별도 lexical scope에 재사용합니다. 원끝점·defaults에서 계산한14획 마지막4점은 원polygon과 정확히 같으며 새 획 좌표를 작성하지 않습니다.

두 분리는 동일한 원 baseline에서 독립적으로 계산합니다. 9만 분리한 결과는 기존 lead7 candidate SHA와 일치해야 합니다. 원43 polygon/순서,15획,타13획,모든 원body 경로·폭·weight와 sourceGroups를 보존합니다. 두 원tail polygon만 새 UP mask로 분리하여15→17mask가 됩니다. 원body weight는 보존하고 각 원공식의 tail weight6.5/12.5가 추가되므로 총 mask-time weight가 원값과 같다는 주장은 하지 않습니다. body bounds는 남은 원polygon의 bounds이며 outline union은 불변입니다.

full5 proof와 exact id3(root/file/fileSHA256),필수3/4 인수를 고정합니다. sourcecompiler/engine/HTTP/server 실행0. 공개 fixture를 시작 시1회 읽고 GET에서 컴파일하지 않습니다. 국내SVG는 요청 시 RAM에만 보관합니다. 모든 복수 mask9/14 경계 전중후,520px fine,0/epsilon/95/99.99/100,9단계 coarse,8초 자연재생 및 port0을 제공합니다.

실행: python3 serve.py --target 738 --port 0.
브라우저 nativeApproval=false/runtimeApplied=false이며 Root의 새 전체형상·방향·경계·끝점·자연재생 검토가 필요합니다. opacity나100% 강제 unmask 보정은 추가하지 않습니다.

검증 결과는 preparation.json에 기록합니다. source 양성/음성·PythonAST/helperguard/Node 구문은 필요한 범위에서 단회 실행합니다.

실제 집중검증: 최초 실행은 복사된 baselineSHA256:null 하네스 가드에서 파생 전 중단되었습니다. 새 config에 실제 캐시SHA를 넣은 뒤 재실행1회 PASS(총2실행,성공1/후보양성1/독립파생2/음성27). 원compiler/engine0. PythonAST/helperguard 각1,Node구문2파일 각1 PASS. 최초 오류는 원자료·기하 실패가 아닙니다.

최종15획·17mask·43polygon, SHA 5ea70467c9dc732c28b53a90f80728322538ebaedac556880df1c45737926354. 경계9=0.7723377633369092,14=0.8512635128883379. helper는 실제 fixture 모든 복수 mask에서 경계를 계산합니다. 설명문구만 후속 정정했으며 기하·source 검사 반복0입니다.
