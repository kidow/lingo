# 癙1320 앱 바이트 역사 스냅샷

작성 시점의 실제 앱3 바이트를 그대로 보관합니다. source.txt는 원 UTF-8 바이트이며 경로/SHA의 정확 쌍만 resolver로 읽습니다. 이후 앱 수정은 이 스냅샷에 반영하지 않습니다.

작성 시점 isolatedActualComponentBrowserVerified=false, actualAppUI=false, runtimeRegistered/runtimeApplied=false입니다. root standalone capsules PASS는 실제 component 브라우저 승인과 다릅니다. 이후 승인 여부는 별도1320 runtime review에만 기록하고 이 문서는 그대로 유지합니다.

실제 경로와 고정 SHA256:
- lib/hanja-stroke-start-gate.ts → lib__hanja-stroke-start-gate.ts.source.txt / 5e1eaaf4b99c72854370a499980bf97e9b3001bde8c35a1475149ec52bf40bf8
- lib/hanja-stroke-start-gate.test.ts → lib__hanja-stroke-start-gate.test.ts.source.txt / b79aea6e0fbc1a259edba29f93e4391119e5c99142a4d708f43d3b972b9fa3c5
- components/hanja/stroke-outlines.tsx → components__hanja__stroke-outlines.tsx.source.txt / ca136b72b218785c65f0b34f522b0c48fc37978371d0e6bb0f3f89134a6f6d1e

resolver는 필수 인수·허용 경로/SHA 쌍·Buffer·실제 byte SHA를 모두 검사합니다. 별칭/상위경로/바뀐바이트/다른SHA/추가인수는 거부합니다. TypeScript 선언은 별도 d.mts로 제공하며 allowJs 변경이 없습니다.

검증은 check.mjs 집중1회와 각 새모듈 구문/선언 AST 한정1회입니다. 결과는 작업 완료 보고에 별도로 남깁니다. 브라우저/앱UI/source/compiler/engine/registry/build 실행은 이 검사 범위에 없습니다.
