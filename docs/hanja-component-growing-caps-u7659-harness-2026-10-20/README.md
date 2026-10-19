# 癙 실제 StrokeOutlines 격리 하네스

현재 앱의 StrokeOutlines TSX, outline 함수, start-gate 함수를 변조 없이 TypeScript transpileModule(CJS/ESM)로 연결합니다. 기존 React/ReactDOM/scheduler의 고정 로컬 바이트만 사용합니다. 설치·Next 실행·registry 평가·source geometry/compiler/engine 실행은 없습니다. 타이밍은 현재 hanja-strokes.ts의 고정 선언 3줄만 읽고 평가합니다.

고정 source는 18획/21마스크/46다각형, SHA70ca22b0b1bcf57f63141c5b4460262054ab51847b1bd4e880aa2657347eee74입니다. 원 source8·renderer6·기존 HOLD·NOTICE와 standalone fresh PASS2를 입력 핀으로 추적합니다. standalone PASS는 실제 component의 브라우저 승인이 아닙니다.

SSR은 실제 component의 초기 idle/전체 완료 1회와 숫자 상태를 명시적으로 주입한 12·15·18 중간 상태 3회입니다. 주입한 3회는 원 TSX를 고치지 않고 서버 React useState의 숫자 초기값만 제어합니다. 이 결과는 브라우저 hydration 실행이 아닙니다. 브라우저 진입은 원 초기 idle SSR을 hydrate하며 실제 React useLayoutEffect가 원 Q 경로의 길이와 끝점을 같은 p에서 읽습니다. 준비 시 isolatedActualComponentBrowserVerified=false, actualAppUI=false, runtimeRegistered/runtimeApplied=false를 유지합니다.

세 대상은 12m2 u7659-12-2, 15m2 u7659-15-2, 18m1 u7659-18-1이며 모두 growing-q-caps입니다. 원 P/guide/폭/weight는 그대로입니다. p0 ink 없음, 중간 SSR·측정 전 ink 숨김, p1·완료 prefix·whole은 별도 full-round mask를 항상 유지합니다. 매 RAF에 각 대상의 p/L/d/rho, 시작·끝 원 좌표/반경, visibility, mask 및 sameFrame 검증값을 갱신합니다. Mock-UA parity는 원 경로/동일 endpoint 입력의 계약 검증이며 실제 UA 호길이·픽셀 검증이 아닙니다.

루트 전용 실행(이 준비에서는 실행하지 않음):

```sh
node docs/hanja-component-growing-caps-u7659-harness-2026-10-20/serve.mjs 0
```

127.0.0.1만 수신하며 시작/매 GET 입력·자체 핀을 검사합니다. 외부 네트워크 요청이나 국내 SVG 디스크 저장은 없습니다. 전체 SVG는 520px, coarse 각9 표본은 220px입니다. 상태 영역은 접힌 details와 max-height220px로 SVG 높이/캡처 좌표를 밀지 않으며 복사할 수 있습니다.

whole18·prefix13/16·각 획75%·global0/epsilon/95/fine99.99·99.999999·100·대상별 local0/epsilon/95/fine·세 multi 경계±1e-10·rho=r±1e-10·coarse9·선택 획8초 자연 재생을 제공합니다. rho 경계는 클릭 시 해당 실제 guide의 getTotalLength로 계산하며 가정한 길이를 고정하지 않습니다. 자연 시작 수치는 클릭 직후 숫자만으로 승인하지 않고 첫 실제 DOM 상태를 관찰해야 합니다.

집중 check는 resources 1회/SSR4·새 Q app/standalone mock parity·엄격 거부만 실행합니다. 새 snapshot 거부 검사와 각 새 모듈 구문/선언 AST는 별도 각1회입니다. 기존 앱 집중 테스트·source 검사·과거 actual은 반복하지 않습니다. 검증 결과는 validation.json에 실행 후 기록합니다. root 브라우저 관찰 후 승인은 별도 근거에만 추가하며 역사 snapshot의 false는 바꾸지 않습니다.
