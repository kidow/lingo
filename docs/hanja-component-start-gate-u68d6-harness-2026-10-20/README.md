# 棖 실제 StrokeOutlines 로컬 harness

실제components/hanja/stroke-outlines.tsx 전체와실제outline/start-gate 함수는원문을변조하지않고TypeScript.transpileModule로만ESM/CJS를생성합니다. Nextbuild/dev/TSC/번들러/패키지설치0. 타이밍은lib/hanja-strokes.ts의원3선언(1.5,650/speed,180/speed)만추출하며전체registry를import/실행하지않습니다. fixture는기존공개배열을읽고원geometrySHA고정입니다.

기존로컬React/ReactDOM19.2.8·scheduler0.27.0·TS5.9.3을사용합니다. ReactDOMclient 약1MB는허용된로컬RAM읽기/고정해시검증후CJS코드를함수로감싼ESM을RAM에서제공할뿐소스복사저장/외부전송0입니다. 전용allowlist importmap으로동일Reactinstance와실제컴포넌트/함수를연결합니다. 앱학습기록/스토리지/앱state접근0입니다.

실제ReactDOMServer renderToString으로SVG초기SSR를만들고동일identifierPrefix hc-로hydrateRoot합니다. wrapper Probe effect가hydration준비상태를표시하며recoverable hydration error를표시합니다. 초기준비검사에서는브라우저미실행으로hydration성공을주장하지않았으며아래root후속관찰과구분합니다. 실제component targetmask/ref/effect를그대로사용하며getTotalLength·masked 여부·gate여부를화면에표시합니다.

root실행전용: node docs/hanja-component-start-gate-u68d6-harness-2026-10-20/serve.mjs 0
127.0.0.1만bind/정확Host·routeallowlist/외부CORS허용0·CSPself. 원app/module/fixture/Reactvendor 및own파일핀을매GET검증합니다. 전체520SVG·12획선택·multi10boundary전후·0epsilon95·99.99/99.999999/100·8초재생·coarse9개실제component각220을제공합니다. standalone mock Animation clock은실제component의elapsed effect를구동하며실제앱controller/라우팅/학습기록을검증하는것은아닙니다. coarse표본clock은2프레임뒤pause하므로UI에서표본완성상태를확인해야합니다.

새harness 검사1회 최초PASS: 실제ReactDOMServer+원전체TSX SSR 생성1회/모듈12route/상수거부3/원입력핀 검증. serve/browser/check Node구문초기각1회PASS. 이후React속성hydration경고도놓치지않게로컬console.error수집을추가하고변경된browser구문만1회확인했습니다. resources/SSR집중검사반복0·실패0입니다. 기존lib집중검사재실행0입니다. 초기집중검사의SSR은실제ReactDOMServer실행이며그검사자체는브라우저를실행하지않았습니다. checks의HTTP/UI/server0은그시점기록이고아래root후속실행과구분합니다. 서버기동시resources/SSR는그기동의준비로다시생성되며검사재실행과구분합니다. 이harness는root가시작할때만HTTP/브라우저를사용합니다. geometry/compiler/engine/runtime등록0,actualAppUI:false. 기존lib집중검사는반복하지않습니다.

## Root 브라우저 후속 관찰 · 2026-10-20

실제component SSRhydrate readytrue/errors[]·초기idle whole targetMaskedtrue·browserL38.68603515625/tau.36188769263779674. pen10 .75 및multi10경계 .45282994944832855 before/at/after520 PASS: before는targetink없음/targetMasked:null, at는기계epsilon gate, after는극미AAarc뿐이고새유한filledstamp없음입니다. 0/epsilon .000001 target신규잉크없음·95/99.99/99.999999/100520 PASS, targetMaskedtrue 유지. coarse9 실제component각220 전PASS입니다.

play8sec은클릭직후첫down진행이시작됨을봤고8초이상후AXprogress1과520완성PASS를확인했습니다. 클릭직후숫자UI는이전1이어서 정량시작값은관측하지못했으며 start=null입니다. pen11 .75 completedtarget/whole(done12)에서도maskedtrue/errors[] 유지입니다.

root PID68933/port62685/session36832 STOP143. isolatedActualComponentBrowserVerified:true/hydrationBrowserExecuted:true이며 actualAppUI(controller/storage/routes):false/runtimeRegistered:false 유지. 통과focus/SSR/구문 재실행0·이번저자는메타4파일만수정했습니다.
