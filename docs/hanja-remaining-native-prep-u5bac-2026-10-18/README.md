# 宬 · 획수 불일치 비교 도구

카탈로그 10획, 고정 source 10획, 국내 사전 9획을 각각 보존합니다. 기존 획수 보류는 유지합니다. 숫자를 맞추기 위해 획을 나누거나 합치거나 대응시키지 않습니다. root 승인 범위는 비교 도구 준비이며 필순·자형·방향·재생 승인이 아닙니다.

고정 whole `u5bac@13`, full5 proof와 원래7필드 identity, 실제 API `compileProgressive(trace, proof, identity)`의 명시 인자3개를 그대로 사용합니다. 원source7파일·NOTICE·capsule·proof·engine8해시·카탈로그·국내 metadata·공유 renderer를 SHA로 고정합니다. source 10획과 국내 9획을 독립 검증하며, 臄 템플릿의 동수 guard를 조용히 제거한 도구가 아닙니다.

정적 검사: `rtk proxy python3 docs/hanja-remaining-native-prep-u5bac-2026-10-18/serve-native.py --check-only`. 이 모드에서 sourcecompile/engine/HTTP/server는0이며 내장 Node 구문1회를 검사합니다. 별도로 Python AST1회를 검사합니다. 실제 서버 시작은 `rtk proxy python3 docs/hanja-remaining-native-prep-u5bac-2026-10-18/serve-native.py --port 0`이며 현재는 실행하지 않았습니다. root가 시작하면 출력된 PID·port를 기록하고 검토 후 해당 서버만 종료합니다.

`/whole`은 국내 전체와 선택 source 전체를 그대로 보여줍니다. `/pairs`는 국내 획과 source 획을 별도 dropdown으로 명시 선택하며 기본 선택도 자동1:1 대응도 없습니다. `/progressive?stroke=1&enlarged=1&samples=1`은 source의 선택 획만 재생하며 왼쪽은 기본적으로 국내 전체입니다. 국내 일부 획을 보고 싶을 때만 `domestic`을 독립 지정합니다.520px 확대,99.99%·100%·95%, 모든 source mask 경계 전·중·후,9개 coarse 프레임, 실제 재생을 지원합니다.

국내 URL http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5BAC.svg · SHA256 952416be2e0c3d74b67d732b94917f9d4e262b57236cacde8b1a01f315c5c8c6 · 5004bytes · 9clips. 정확한 기존 특급II dictionary-inventory 행을 pin하며 URL·SHA·clip을 추측하지 않습니다. 사전 SVG는 root 서버 실행 시 RAM으로만 읽고 파일·스크린샷으로 저장하지 않습니다. 국내 사전은 시험 주관기관의 승인이 아닙니다.

정적 guard·Python AST·내장 Node 구문을 각각 한 번 실행해 통과했습니다. 기존 원형 검증을 SHA로 참조했고 source 재컴파일·엔진·HTTP·서버 시작은0입니다. 실제 HTTP route와 native 화면은 아직 검토하지 않았습니다. native/runtime승인false·신규hold/resume/counter변경0입니다.
