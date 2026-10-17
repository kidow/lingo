# 篠 · 획수 불일치 비교 도구

카탈로그와 고정 source는16획, 국내 사전은17획입니다. 기존 획수 보류를 유지합니다. 숫자를 맞추기 위한 분할·합침이나 같은 번호의 자동 대응은 하지 않습니다. 이 준비는 필순·자형·방향·재생 승인이 아닙니다.

선택 whole는 archive의 `u7be0-k`이며 `u7be0-ue0101`의 고정 alias입니다. 원본 archive whole의 버전은 미상이며 @version을 만들지 않습니다. 기존 source7파일과 NOTICE·capsule·proof·engine8해시·카탈로그·국내 metadata·공유 renderer를 SHA로 보존합니다. 실제 API는 full5 proof와 원래 identity7을 받는 `compileProgressive(trace, proof, identity)`의 명시 인자3개입니다. source16획과 국내17획은 독립 검증합니다.

`/whole`은 국내 전체와 선택 source 전체를 표시합니다. `/pairs`는 국내 획과 source 획을 별도 dropdown에서 명시 선택하며 기본 선택이나 자동1:1 대응이 없습니다. `/progressive?stroke=1&enlarged=1&samples=1`은 source 획만 재생하고 왼쪽은 기본적으로 국내 전체입니다. 국내 일부 획은 `domestic`을 독립 지정해야 합니다.520px 확대·99.99/100/95%·모든 source mask 경계 전중후·9개 coarse 프레임·재생·임시 port를 지원합니다. 기존 source 결과는16pens·16masks·36polygons, fine 후보1·3·4·6·7·10·11·12·15·16, mask 내부 경계0입니다. 이 목록은 source 계산이며 native 관찰이 아닙니다.

정적 검사: `rtk proxy python3 docs/hanja-remaining-native-prep-u7be0-2026-10-18/serve-native.py --check-only`. sourcecompile/engine/HTTP/server 없이 guard와 내장 Node 구문을 검사하며 Python AST를 별도로 검사합니다. 결과는 validation.json에 기록합니다. 실제 서버 시작 명령은 `rtk proxy python3 docs/hanja-remaining-native-prep-u7be0-2026-10-18/serve-native.py --port 0`입니다. 이 작업에서는 실행하지 않았습니다. root가 시작할 때 PID·port를 기록하고 검토 종료 후 해당 서버와 래퍼만 종료합니다.

국내 URL http://img.e-hanja.kr/hanjaSvg/aniSVG/7B00/7BE0.svg · SHA256 530dc2d943f5961f9aa6f511f1bb1a41e3a5d11df4d7be4f576fd6d2d3356978 · 8438bytes · 17clips. 기존 특급II dictionary-inventory의 정확한 행을 고정합니다. 실제 사전 SVG는 root 서버 실행 시 RAM에서만 읽으며 파일·스크린샷으로 저장하지 않습니다. 국내 사전은 시험 주관기관의 승인이 아닙니다.

native/runtime승인false, 신규hold/resume/counter변경0입니다. 원형 source 검증을 SHA로 참조하며 source 재컴파일하지 않습니다. HTTP route와 native 화면은 아직 검토하지 않았습니다.
