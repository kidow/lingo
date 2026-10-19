# 帨 · 전역 투영 renderer native 승인과 앱 준비 근거

Root가 docs/hanja-renderer-global-projection-u5e28-experiment-2026-10-20 고정renderer를 fresh검토해 전체 gate PASS했습니다. 원HQ-UP 고정기하10p12m31/SHAc1488f46315395ce3258b8bccafd0350bd2d49f281e7a187bf4f0bf5cf7fa8b3는 그대로입니다. 5m2는 원 circle-start 수식,10m1은 첫 원접선v(0,1)·P투영 a=-1/b36/법선[-21,3]의 전역plane입니다. 모든 대상은 p1·whole·완료prefix에서도 원roundsweep mask를 유지하며100%unmask하지 않습니다. 이 전역plane은 다른 곡선/글자에 자동 적용하는 정책이 아닙니다.

Root 관찰: whole1호환,10방향75%520px,coarse90candidate+90baseline 각220px, fine[10,2,6,5] 각99.99/99.999999/100 모두PASS입니다. 모든 multi5=.47237311751523536/10=.793630846991174의before-at-after/0/epsilon.0001%/95 PASS이며5after의 tinyAAarc는 별도기록합니다. coverage5m2·10m1의 빨간residual은520px에서비었습니다. 자연10 3.04125→100/5 2.69→100 각8초PASS입니다. Browser L5=26.571182250976562/tau .5268866047345508,L10=49.116146087646484/tau .2850386505288376이나 plane10은 DOM길이측정을사용하지않습니다. PID92901/p49428/session40798 STOP143을root가확인했습니다.

이후 앱3개만 exact whole context→typed target정책 조회로확장했습니다. 棖legacy API와기하·수식은유지하며帨5m2/10m1만추가합니다. circle Q는effect에서commit된connected SVGref와동일d를확인한뒤getTotalLength측정, SSR/첫hydration표시는측정없음과동일합니다. plane은길이측정없이원정점투영만사용합니다. 정책별 DOM은 data-stroke-start-gate=u68d6-10-2/u5e28-5-2/u5e28-10-1, data-stroke-reveal-policy=circle-start/global-projection으로구분합니다. 두 REVIEWED전체의 bounds→segment→masks→strokes를정책생성전 runtime deepfreeze하여 공개정책참조로allowlist를바꾸지못하게했습니다. 다른mask·stroke-player·shared43·registry는수정0입니다.

검증은live집중1회3/3PASS(棖회귀,帨parity/wholeguard/committedref조건,실제전체 TSX의SSR)·영향1316test1회3/3PASS입니다. AST는 REPL TypeScript 로딩빈namespace로파서전실패2 후 일반Node1회6파일 diagnostics0이며성공검사반복0입니다. 공개segment/bounds참조의runtime불변성 보강 후 새단독test1회PASS+변경2파일AST1회PASS만추가했고기존3·1316테스트는반복하지않았습니다. 실제DOM mount/hydration/브라우저 재생은아직0이며 mock ref조건검사/SSR와구분합니다. 빌드/TSC/전체suite/sourcegeometry/factory/compiler/engine/UI/server0입니다.

1316 test/verify의원app3읽기만 기존snapshot resolver의정확경로+SHA로명시이전했습니다. allowJs=false이므로 resolver.d.mts 선언을별도추가했으며 원snapshot6/옛review/native2/validation/resume/배포data는불변입니다. 원actual verifier는재실행하지않았습니다. 새actualcomponentharness와root fresh검토는후속이며 isolatedActualComponentBrowserVerified=false/actualAppUI=false/runtimeApplied=false/runtimeRegistered=false입니다.

최종renderer validation SHA762f02b1788e6a3cc98a5c2e13513101f2107ea9a428b78e440baf3b52600431. checker의45원정점/6폐합 정정과vacuous검사한계 이력은원최종validation에그대로고정합니다. 원6prep nativefalse를덮지않고 이독립native-review2에root승인만별도로기록합니다.
