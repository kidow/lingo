# 鬷 기존 캐시 독립 비교 준비

국내 11~16획과 기존 base/VS0 원 polygon을 다시 비교하기 위한 읽기 전용 도구입니다. 새 필순·그룹·기하를 만들지 않습니다. 기존 batch877의 HOLD와 native 승인 상태는 바꾸지 않았습니다.

- base 및 VS0는 각각 원 23 raw·53 polygon의 full5 캐시를 직접 읽습니다. raw 번호는 0부터입니다.
- 국내 11~16획 버튼은 고정된 동일 사전 URL의 원 방향 SVG를 표시합니다. root 선택은 사전 URL·획 순서를 바꾸지 않습니다.
- raw12와 raw14를 각각 독립 패널에서 확인하고, raw13/15/16/17/18도 개별 선택할 수 있습니다. 기존 논리11=[12,14],12=[13],13=[15],14=[16]은 비교용 보류 기록일 뿐, 새 결합이나 승인된 대응이 아닙니다.
- 원 사전 source()/dictionary_svg() 함수는 기존 방향 렌더러에서 바이트 그대로 복사했습니다. 국내 사전 자료는 요청 시에만 RAM으로 가져오며 SHA·길이·제목·clip 수를 확인합니다. 파일·이미지·응답 본문을 저장하지 않습니다.
- 기존 serve-native.py는 import 시 C=compiled()와 사전 source()를 실행하므로 import하지 않습니다. progressive.mjs/engine/compiler도 import·실행하지 않습니다. 원 캐시와 렌더러·기존 문서는 SHA로만 고정합니다.
- 새 서버는 main 진입 전 파일 읽기·HTTP·서버 실행을 하지 않습니다. 실행 시 127.0.0.1 한 포트에만 바인딩합니다. 사용 후 출력된 PID와 실행 래퍼를 종료해야 합니다.

루트 검토자가 나중에 실행할 명령:

~~~sh
rtk proxy python3 docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/server.py --port 0
~~~

국내 전체 자형 버튼과 패널은 원 사전 outline들을 원 transform 아래 그대로 합쳐 표시합니다. 원 polygon·새 그룹·새 필순은 만들지 않습니다.

화면은 정적 원형/국내 방향 대조용이며 progressive·자동재생·쓰기 캔버스 검증이 아닙니다. 이 준비 단계에서는 HTTP, 브라우저, 서버를 실행하지 않았습니다. nativeApproval/runtimeApplied/appUI는 모두 false입니다. 집중 자원 계약 검사와 구문 검사는 validation.json에 별도로 기록합니다.

## 두 번째 루트 검토 뒤 선택 확장

루트 검토에서 base·VS0 whole을 각각 관찰했으나 당시 국내 whole 대조가 없어 호환 자형 승인은 보류했습니다. 국내11~14 방향과 원 raw12/13/14/15/16을 대조한 기록은 validation.json에 보존했습니다. 다음은 원 raw17·18과 국내11·12를 비교하고, 추가 국내15·16 및 전체 자형을 확인하는 단계입니다. 새 대응 순서를 이 도구가 추정하거나 승인하지 않습니다. 확장 준비에서는 새 서버·HTTP·브라우저를 실행하지 않았습니다.
