# 鬷 원 baseline의 정확19획 순열 후보

선택 root는 base u9b37만입니다. 원 batch877 full5와 정확한 id3를 보존하고, 승인된 원 compiler positive1회로 baseline19획·22mask·53polygon을 RAM에 만들었습니다. 그 결과를 fixtures.json에 먼저 공개한 뒤 후보 검사를 합니다. engine 실행과 새 tail 보정은0입니다. 이후 후보 함수와 HTTP 서버는 원 compiler를 실행하지 않습니다.

순열은 1부터 [1,2,3,4,5,6,7,8,9,10,15,16,11,12,13,14,17,18,19]입니다. 모든 pen/mask 필드·outline·guide·bounds·width·weight는 baseline 객체를 그대로 선택합니다. 새 좌표·path·폭·weight·connector·interpolation은 없습니다. 기존 [12,14] raw 그룹은 국내13 대응 근거가 확인된 그대로 보존합니다. VS0 또는 다른 root는 거부합니다.

원 id3의 sourceProofFile은 원 모듈 문맥의 ./engine-whole-u9b37.json 표기를 그대로 보존합니다. 새 모듈의 sourceProofFile export는 같은 바이트를 가리키는 ../hanja-goal-glyphwiki-batch877-2026-10-13/engine-whole-u9b37.json 경로이며, 두 문맥을 SHA로 결박합니다. full5를 새 header/trace로 조합하지 않습니다.

ROOT의 별도 native 기록은 whole520 호환 및 국내11~16 대응에 한정됩니다. 새 후보 전체19방향·coarse·fine·multi 경계·자연재생·coverage·앱은 아직 미검토이며 nativeApproval/runtimeApplied는 false입니다. 첫10/마지막17~19획이 순열에서 그대로라는 이유로 승인하지 않습니다. 원 HOLD·캡슐·native 기록은 변경하지 않았습니다. 원 terminal flags와 기존 baseline tail/multi mask는 config.json에 위험 목록으로 보존했고 이번에 보정하지 않았습니다.

serve.py는 캐시만 읽고 원 shared43 표시 함수와 고정 국내 URL/SHA를 사용합니다. 원형·방향·prefix·진행률·8초 재생·mask 경계·9단계 화면 모두520px입니다. 이전 baseline 패널은 baselinePenMap의 원 획이므로11~16 구간의 누적 prefix 차이는 순열에 따른 의도된 차이입니다. 원 source()/dictionary_svg() 함수는 기존 방향 렌더러 그대로이며 HTTP 요청은 실제 검토자가 서버와 브라우저를 열 때만 발생합니다. 이 준비에서는 HTTP·서버·UI를 실행하지 않습니다. 원 사전 응답은 RAM에만 두며 저장하지 않습니다.

검토자가 나중 실행할 명령:

~~~sh
rtk proxy python3 docs/hanja-source-independent-order-u9b37-source-experiment-2026-10-20/serve.py --port 0
~~~

검토가 끝나면 해당 PID와 실행 래퍼만 종료합니다. 준비 검증 결과와 정확한 원 compiler1회·cached positive1회는 preparation.json에 구분해서 기록합니다.
