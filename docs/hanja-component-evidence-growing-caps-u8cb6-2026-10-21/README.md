# 貶 실제 컴포넌트 역사 snapshot

앱 commit22c1f7e39ed2610b1ebc0a3eeef7699ff15fdb3d의 전용 QC module/test/component 3파일 원byte를 정확히 고정합니다. 원source8/standalone renderer/PASS 및 기존 frozen 체인은 변경하지 않습니다.

- lib/hanja-stroke-start-gate-u8cb6.ts → lib__hanja-stroke-start-gate-u8cb6.ts.source.txt · SHA256 0af422a86d3eb458af58384108ad283a2119b91c435372ece85e41e766939c07
- lib/hanja-stroke-start-gate-u8cb6.test.ts → lib__hanja-stroke-start-gate-u8cb6.test.ts.source.txt · SHA256 707c6f0a9ab8056aec1aa1a4226330a7783c68990b5deee867ca3c5fe6a4e408
- components/hanja/stroke-outlines.tsx → components__hanja__stroke-outlines.tsx.source.txt · SHA256 97f31915282e1d95676626a5e0b578300864b95b976b30cad311f576ab2d7564

resolver는 정확한 originalPath+expectedSHA 문자열쌍·인수수·Buffer 타입과 SHA만 허용하며 live fallback·경로 정규화가 없습니다. 목록은 사본이며 원byte 변조를 거부합니다. snapshot의 isolatedActualComponentBrowserVerified/actualAppUI/runtimeApplied/registered false는 영구 역사값입니다.

기존 main/SI/DI/CAN/牷/挃/瀷 module·test는 각 기존 frozen resolver를 재사용하며 복사하지 않습니다. 이 폴더의 새 검사1회만 실행하고 기존 검사·소스compiler/factory/engine·브라우저·서버·Git·빌드는 실행하지 않습니다.
