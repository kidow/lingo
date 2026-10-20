# 牷 실제 컴포넌트 역사 snapshot

2026-10-20 · 앱 commit522ecfbf7f79f0b362a6be10c6e63279df4ca50b의 원module/test/component 3파일 전체byte를 고정합니다. 원파일을 변형하거나 실행하지 않습니다.

- lib/hanja-stroke-start-gate-u7277.ts → lib__hanja-stroke-start-gate-u7277.ts.source.txt · SHA256 43757c391fc54957e04ae8f7116aa57dce06c8dc49f700b62ca2a4bd6046946b
- lib/hanja-stroke-start-gate-u7277.test.ts → lib__hanja-stroke-start-gate-u7277.test.ts.source.txt · SHA256 fc30aeb5a2fbbce1170f8c57ce9918e3a04f3a8e1d685717abc70f63240cced1
- components/hanja/stroke-outlines.tsx → components__hanja__stroke-outlines.tsx.source.txt · SHA256 64ccda53de43acacac1d8308c4095a62623822fa36bad71cc35b144bc2f70e5b

정확 originalPath+SHA 문자열 쌍, Buffer 타입·byteSHA, 읽기2/검증3인수만 허용합니다. live앱 대체읽기·경로정규화·불명확SHA fallback은 없습니다. 반환binding 목록은 사본입니다.

작성시점 isolatedActualComponentBrowserVerified/actualAppUI/runtimeRegistered/runtimeApplied는 false이며 이 역사상태는 영구 보존합니다. 이후 실제root 관찰은 별도review에만 기록합니다. parent standalone/native 근거를 실제컴포넌트 승인으로 승계하지 않습니다.

기존 main/test는 고정 CAN base resolver, SI/DI/CAN은 각 역사resolver에서 정확pair로 읽으며 중복복사하지 않습니다. outline은 하네스config의 기존 고정byteSHA로 읽습니다. 새컴포넌트에 필요한 u7277 module import를 빠뜨리지 않습니다.

새 check.mjs만 최초1회 실행합니다. 이전 source/app/renderer/증거 검사는 재실행하지 않습니다. 서버/UI/브라우저/registry/소스기하/compiler/engine/build/Git 실행0입니다.
