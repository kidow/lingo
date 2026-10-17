# 한능검 native 검토 캐시 실행기

검토된 기존 helper를 수정하지 않고 처음 만든 `C` 객체를 RAM에서 그대로 재사용합니다. 원래 Handler·renderer·국내 SVG RAM cache·guard를 유지합니다. 전체 자형 경로의 원본 자료 조회도 그대로이며, 후보 획 재생은 최초 compiled strokes를 사용합니다.

```sh
rtk proxy python3 -B scripts/hanja-native-cached-server.py --helper /Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch1048-2026-10-13/serve-source-order.py --port 0
```

`--helper`는 검토된 기존 Python 파일의 절대 경로여야 합니다. 현재 지원 계약은 명시적인 `A_BYTES`·`WRAPPER_SHA` 파일과 최상위 `C=compiled()`를 가진 combined/order helper입니다. 다른 구조를 추측하거나 대체하지 않습니다.

- 실제 실행 시 원 helper import가 최초 컴파일을 **1회** 실행하고 국내 사전 SVG를 RAM에서 읽습니다. 컴파일0·HTTP0 실행기라고 주장하지 않습니다. 그 뒤 selectedWhole 요청은 같은 `C`를 돌려주며 요청별 컴파일은0입니다.
- helper·compiler wrapper·config의 시작 시 SHA와 config의 명시적 `strictPreparationSHA256`를 매 요청 확인합니다. 기존 guard도 매번 호출하므로 원래 source·fullProof·identity·입력 핀 검증을 우회하지 않습니다.
- `None`은 원래 selectedWhole을 뜻합니다. 다른 root·빈 문자열·별칭은 거절하며 대체 whole로 넘어가지 않습니다. 국내와 후보 획 번호 매핑을 새로 만들지 않습니다.
- 서버는 localhost에만 바인딩합니다. `--port 0`은 빈 포트를 선택합니다. 시작 출력의 PID·port를 기록하고 검토 완료·보류 후 해당 프로세스와 실행 래퍼만 종료하세요.
- 파일·SVG·스크린샷·검토 로그를 저장하지 않습니다. native 승인·runtime 등록·보류 건수도 바꾸지 않습니다.

정적 회귀 검증은 실제 helper를 import하지 않는 fake module과 RAM 파일 fixture만 사용합니다. 서버·HTTP·source compiler·engine을 실행하지 않습니다.

```sh
rtk proxy python3 -B scripts/hanja-native-cached-server.test.py
```

검증 범위: 같은 원본 `C`와 Handler 유지, 요청별 compiler0, 잘못된 root 거절, helper/wrapper/config/strict 준비 SHA 변경 거절, 원 guard 유지, order helper의 정확한 config·wrapper 계약입니다. 실제 서버·화면 검증은 root가 해당 후보를 검토할 때 수행합니다.
