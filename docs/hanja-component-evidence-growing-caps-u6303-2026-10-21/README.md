# 挃 실제 component 역사 snapshot

2026-10-21 · APP3 commit6b0d119e4caf6e3b2de7654de4a93dab5c5e1c2e의 module/test/component 전체byte3개를 고정합니다.

- lib/hanja-stroke-start-gate-u6303.ts → lib__hanja-stroke-start-gate-u6303.ts.source.txt · SHA256 9774d49905f6d8f98c18d8e585296769065916f40de9a84e09254ea4b73c7ef8
- lib/hanja-stroke-start-gate-u6303.test.ts → lib__hanja-stroke-start-gate-u6303.test.ts.source.txt · SHA256 53f23c6ca557be839353a971ba250678c1ccc08b40c61efc6a6bb19cb678e756
- components/hanja/stroke-outlines.tsx → components__hanja__stroke-outlines.tsx.source.txt · SHA256 2f0009c6a37ac9c6f9f8f63ddff904bd3949907d6a97bd42a9aaa3d453ddcd1d

resolver는정확path+SHA/Buffer byteSHA/읽기2·검증3인수만허용합니다. 경로정규화·live대체읽기·traversal·SHA fallback은없으며반환목록은사본입니다. 실제component/SSR에필요한u6303외main/SI/DI/CAN/u7277모듈은기존frozen resolver에서참조하므로복제0입니다. 원TSX는새snapshot의정확byte만우선사용합니다.

역사상태 isolatedActualComponentBrowserVerified/actualAppUI/runtimeRegistered/runtimeApplied=false는영구불변입니다. 이후ROOT native는별도review에만기록하며standalone/native를실제component승인으로승계하지않습니다. 새snapshot check1만실행하고기존source/app/renderer/증거test실행0입니다. snapshot읽기·검증은TStranspile/SSR을하지않습니다. sourcefactory/compiler/geometry/engine/HTTP/UI/server/registry/build/Git0입니다.
