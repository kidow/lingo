# 疷 U+75B7 원 캐시 strict 후보

선택 root는 base u75b7만입니다. 원 batch838의 engine-whole-u75b7.json full5를 그대로 고정하고, 2인자 원 factory의 positive를 정확1회 호출한 결과를 fixtures.json에 먼저 공개했습니다. 새 후보는 실제 root·원 파일·파일 SHA의 strict id3와 필수 인자수3/whole4를 검사한 뒤 캐시만 반환합니다. VS0/다른root와 legacy2인자 fallback은 거부합니다.

실제 baseline은10pen·13mask·26polygon·11raw입니다. 초기 예상11mask는11raw와 혼동한 값이며, 원 factory의 raw9 FIFTEEN_TAIL_GROUPS는 이미 curve/right/up3mask를 반환합니다. 기존13mask 전부와 모든 pen/mask 필드·outline·control point·bounds·width·weight를 보존합니다. mask를 삭제·병합하거나 새 tail partition을 만들지 않았습니다. 원 factory 실행1회와 새 cached positive1회는 구분해서 기록합니다. engine과 runtime source compiler는0입니다.

7획은 원raw6의 세로선(V)과 raw7의 원 Q를 별도 마스크로 유지합니다(H→Q 아님). 원raw6 끝[82.68,162.025], raw7 시작[64.68,167.45]이며 저장된 부동소수점 차이는[-18,5.424999999999983], 표시상[-18,5.425]입니다. 원 Q guide는 M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625, 원 폭14입니다. 이 간격을 메우거나 새 connector·좌표·경로·폭·weight를 만들지 않습니다.

기존 국내10방향/whole2종 관찰과 별개로 이 새 후보의 whole·전체방향·coarse·fine·multi경계·자연재생·coverage·앱은 모두 미검토입니다. 기존7획 Q 시작 nib pop HOLD를 해결했다고 주장하지 않습니다. 새 nativeApproval/runtimeApplied는false이며 원HOLD·캡슐을 변경하지 않았습니다. 다른 원terminal flag와 기존9획3mask도 보정하지 않고 위험 목록에 보존했습니다.

serve.py는 원 shared43 renderer·고정 국내 glyph/source SHA·원 source()/dictionary_svg() 함수를 사용하고520px로 표시합니다. HTTP 서버는 캐시만 읽으며 원 factory/engine/Node compile을 호출하지 않습니다. 이 준비에서는 서버·HTTP·UI를 실행하지 않습니다. 국내 SVG는 실제 검토자가 요청할 때 RAM으로만 가져오며 저장하지 않습니다.

검토자가 나중 실행할 명령:

~~~sh
rtk proxy python3 docs/hanja-source-independent-qq-u75b7-source-experiment-2026-10-20/serve.py --port 0
~~~

검토가 끝나면 출력된 소유 PID와 실행 래퍼만 종료합니다. source-check.mjs는 cached positive1회 및 구조·변조 거부 검사만 수행하며 기존 원 factory를 다시 호출하지 않습니다. 준비 횟수와 구문 결과는 preparation.json에 기록합니다.
