# 緦 앱5 원바이트 역사 스냅샷

앱 commit b0ee9e26da0b71cd7f3facc45347441d1d87defe의 기존 gate/main test·새 Si module/test·실제 StrokeOutlines 총5파일을 수정 없이 UTF-8 bytes로 고정합니다. 각 originalPath와 기대 SHA는 resolver.mjs의 유한한5쌍에만 결박합니다. 경로 정규화·대소문자 관용·임의 SHA·추가 인수를 허용하지 않습니다. read는 원 live파일 대신 이 디렉터리의 고정사본만 읽습니다. resolver.d.mts는 정확한 Buffer 반환 API를 선언합니다.

생성 시 실제 component 브라우저 검증·actualAppUI/controller/storage/runtime 등록은 모두 false입니다. 이 기록은 후속 root 검토가 통과하더라도 영구 false를 유지합니다. standalone native PASS2와 후속 runtime review가 서로 다른 시점의 증거를 기록합니다. 미래 live component/정책 변경은 여기5사본이나 resolver를 변경할 이유가 아닙니다.

check.mjs는5개 exact바이트 읽기와 경로/SHA/인수 개수/Buffer형식/단일byte·BOM·절단·추가byte 변조 거절 및 private binding 불변을 새로1회 검사합니다. 원앱 테스트·source geometry/compiler/engine/UI/server/build는 실행하지 않습니다. 실제 실행결과는 동시 생성한 緦 harness validation.json에 기록하며 이 README의 승인 상태는 바꾸지 않습니다.
