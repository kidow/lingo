# 麌 실제 StrokeOutlines 로컬 검토 harness

원18p20m48 d697a545504cc475de264b657c28f9b5b857278e4813c4ebf3c96dba2c37464d와 실제 앱3 전체 바이트를 그대로 transpileModule(CJS/ESM)로 연결합니다. Next dev/build·설치·registry 실행·source/compiler/engine 실행은 없습니다. React/ReactDOM/Scheduler는 설치된 고정 vendor SHA를 확인해 로컬 라우트로 제공합니다. useLayoutEffect를 포함한 실제 React hook export를 사용합니다.

두 exact target은9m2 circle-start/11m1 growing-caps입니다. 9 정책은 기존 원공식,11은 원 MLQL 가이드와 UA getTotalLength/getPointAtLength를 같은 layout commit에서 한 번씩 읽고 dash/cap/끝점/visibility를 동기화합니다. p0 ink0, SSR 중간hidden, p1/완료prefix/whole은 항상 fullround mask를 유지합니다. 원좌표/폭/guide/bodyweight/순서/polygon은 바꾸지 않습니다.

SSR idle/full은 실제 ReactDOMServer의 초기 state 그대로입니다. 중간hidden과 prefix12의 SSR 사례만 원TSX를 변경하지 않고 초기 elapsed useState 인수를 명시적으로 seed하는 통제 사례입니다. 이 통제 SSR을 실제 hydration 또는 앱UI 승인으로 주장하지 않습니다. 집중 resource1에서 SSR총4회(초기1+통제3)를 만들고, Q9 원수식 parity 및11 mock-UA 첫직선/끝점 계약 parity와 fail-closed 음성을 확인합니다. 실제 곡선 UA 호길이·hydration·영상은 ROOT 브라우저 검토 전 false입니다.

UI: whole18/prefix12/각18획/0·epsilon·95·99.99·99.999999·100/coarse9(각220)/8초 자연재생/두 다중경계 전후 버튼을 제공합니다. rho=r와 첫L끝 전후는 현재 커밋된 원guide UA길이를 클릭시 읽고 원 weight 비율로 logical pen progress를 계산합니다. 원firstL11.8/r7 외 임의 임계값은 없습니다. SVG는520×520 고정, 디버그 status는 접힌 details와 max-height220px로 배치밀림을 막습니다. 상태는 매RAF 모든target의 p/guide/length/cap/끝점/mask/fullround/오류를 갱신하며 복사 버튼도 제공합니다.

root 기동: node docs/hanja-component-growing-caps-u9e8c-harness-2026-10-20/serve.mjs 0 (이 작성 작업에서는 서버/UI0). source/runtime/native 승인자료는 별도이며 여기 actualcomponentBrowser/actualAppUI/runtimeRegistered는 false입니다. 입력핀과 자체핀은 매 GET 재확인합니다. 새 snapshot7의 당시 미검토 상태는 영구 보존하고 이후 승인은1318review에만 기록합니다.

새 check.mjs 집중1과 새모듈 구문/선언 AST 한정1만 실행하며 결과는 validation.json에 기록합니다. 기존 PASS 검사·old actual·전체테스트/TSC/build는 실행하지 않습니다.
