# 踧 · batch940

15획·16개 원본 mask·34개 polygon을 보존하고, 원본 pen12·13 전체 mask만 국내 순서에 맞춰 교환했습니다. 원본16개 자료와 adapter/audit/NOTICE는 바꾸지 않았습니다.

2026-10-17 root의 브라우저 패널 검토로 보정12획 왼삐침·13획 오른점 방향과18개 진행 프레임, 12·13·15획의520px 99.99→100% 끝점을 확인했습니다. 기존 root 관찰117프레임·나머지13획 방향·fine2/7/11/14·11획 경계/90% probe/실제 재생은 mask SHA 불변 근거로 재사용했습니다. 새 관찰과 재사용은 `review.json`에서 분리합니다. 전체135프레임을 승인했으며 앱 자동재생 UI를 새로 검증했다고 주장하지 않습니다.

`resume.json`은 compact checkpoint입니다. 이전939의262개 보류 이력은 삭제하거나 생략하여 해제한 것이 아닙니다. 각 상속 필드가 가리키는 이전 파일/필드가 그대로 유효합니다. 939의 큰 원본 resume 파일은 보존합니다.

`native-server-compile-order-candidate.mjs`와 `serve-order-native.py`는 원본 helper를 변경하지 않고 보정 adapter를 연결합니다. source-only 준비의 실제 compiler 1회·구문 검증은 `source-order-candidate-preparation.json`에 기록했습니다. runtime registry 연결 뒤 focused test와 `verify-runtime.mjs`는 root가 실행합니다. 빌드·배포는 실행하지 않습니다.
