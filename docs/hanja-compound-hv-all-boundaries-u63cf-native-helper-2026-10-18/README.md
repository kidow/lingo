# 描1082 전체 mask 경계 검토 wrapper

원본 cardinal 실험 helper는 목표9획의 경계만 표시합니다. 이 격리 wrapper는 원본8파일을 SHA로 고정하고 RAM에서 UI 문자열5곳만 정확히 한 번 바꿉니다. 원본 파일은 수정하지 않으며 delegate의 __file__과 HERE는 원본 폴더를 유지합니다. Q7 helper와 같은 치환 방식을 참고했지만 실제 delegate는 hanja-compound-terminal23-source-experiment-2026-10-18입니다.

대상은1082 하나로 고정합니다. 기존 VS2 선택·full5/id7(./경로와 Sha256)·mandatory3/4 계약, 원 mask/좌표/폭/가중치/순서를 유지합니다. 12획14mask25polygon의 동결 fixture를 사용하며 원래2획 경계 .9239717736303439와 H/V 분리9획 경계 .5180275480864729를 현재 선택획의 직전·경계·직후 버튼으로 표시합니다. 일반적인 모든 내부 경계는 실제 mask 가중치 누적으로 구합니다.

기존 3개 SVG520·0/epsilon·95·99.99/100·coarse9·8초 자연재생 UI와 로컬 RAM 국내자료 처리를 그대로 위임합니다. fixture 읽기는 소스 컴파일이 아니며 시작/GET 모두 소스 컴파일0입니다. 기존1082의9획 완료FAIL 보류는 보존합니다. 이 H/V 후보의 자형·최종방향·경계·fine·coarse·자연재생은 루트의 새 브라우저 검토 전까지 승인되지 않았습니다.

루트가 native 검토할 때만 실행:

`rtk proxy python3 -B -u docs/hanja-compound-hv-all-boundaries-u63cf-native-helper-2026-10-18/serve.py --target 1082 --port 0`

정적 준비검사는 `--check-only`이며 서버·HTTP·engine·소스 compiler를 실행하지 않습니다. validation.json은 wrapper2파일 및 원본8파일 핀, 치환 계약과 실제 정적 검사 결과를 담습니다. 원본37핀도 원 helper guards가 검증합니다. 생성 작업 중 서버와 native 검토를 실행하지 않았으며 runtime 적용·빌드·Git은 없습니다.
