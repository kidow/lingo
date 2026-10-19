# 荃 VS2 앱 바이트 역사 스냅샷

앱 commit96a6d24a93e8df8937d0d2004feb083c75a0c74a의 3파일 실제 UTF-8 바이트를 보존합니다. 원 경로·기대 SHA 정확 쌍과 Buffer 바이트 해시만 허용합니다. 향후 앱 whitelist 확장은 이 파일에 반영하지 않습니다.

- lib/hanja-stroke-start-gate.ts → lib__hanja-stroke-start-gate.ts.source.txt / 1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704
- lib/hanja-stroke-start-gate.test.ts → lib__hanja-stroke-start-gate.test.ts.source.txt / 0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8
- components/hanja/stroke-outlines.tsx → components__hanja__stroke-outlines.tsx.source.txt / f729f0db65f84dee49182a104d874fe48b347f05dbaeb0283e1a0777434c1900

이 작성 시점 isolatedActualComponentBrowserVerified/actualAppUI/runtimeRegistered/runtimeApplied는 모두 false이며 영구 역사 상태입니다. standalone PASS2는 실제 앱 component 브라우저 승인과 다릅니다. 이후 검토 결과는 새 native 근거에만 기록합니다. 원 source/full5 identity4/기존 HOLD/원 renderer false는 그대로 보존합니다.

검사는 이 새 resolver의 경로·SHA·Buffer·변조 거부 한정 1회이며 기존 앱 테스트는 반복하지 않습니다. source/engine/compiler/UI/서버/Git/빌드 실행0입니다.
