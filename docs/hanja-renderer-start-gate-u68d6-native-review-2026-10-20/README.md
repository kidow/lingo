# 棖 start-gate · root native 기록 및 exact-target 앱 통합

이 폴더는 원2026-10-19 실험6파일의 nativefalse 준비 기록을 덮어쓰지 않는 별도2026-10-20 검토 기록입니다. Root가 실제 오른쪽 새renderer로 whole1/coverage residual 빈화면520/12국내방향/coarse108candidate+108baseline/10획 multi6점/fine/8초자연재생을 관찰PASS했습니다. 실제앱controller·저장소·라우팅 UI 검증과 runtime등록은 아직없습니다. 아래별도root관찰은실제컴포넌트만의격리검증입니다.

앱변경은 lib/hanja-stroke-start-gate.ts와집중test, components/hanja/stroke-outlines.tsx입니다. 원12획13mask 전체의 모든 필드를 exact 비교하고 논리10 두번째Q만새정책을사용합니다. 원source좌표/outline/guide/폭14/weight/필순/공유43는불변입니다. 다른mask는기존경로이며target은완료prefix/idle/done/p=1에서도원roundsweep마스크를유지하고unmask하지않습니다.

브라우저getTotalLength는대상전용자식의useEffect에서연결된원guide ref와정확d를대조한뒤만호출합니다. SSR와첫hydration은measurement=null로같으며DOM참조가렌더/import에없습니다. 대상은p=0에도defs에mount해재생전에측정하고측정길이를path와함께보관합니다. 참조/길이가없거나측정실패하면중간잉크를숨기고기존round stamp로fallback하지않습니다. p=1은측정전에도fullroundsweep만유지합니다. Effect는컴포넌트수준에있고map/조건부훅이없습니다.

Root실측 guide L38.68603515625/tau=.36188769263779674이며tau=min(1,원폭14/실제browserL)입니다. source-derived gate좌표만생성하며원glyphgeometry가아닙니다. root는경계직후middleold 약15pxstamp와rightnew filledstamp없음을대조했고극미한AA선은양성면적덩어리와구별했습니다. coverageResidual이비었다는것은root시각관찰이며분석적면적측정을대신하지않습니다.

읽은Next로컬지침: node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md 및 01-app/01-getting-started/05-server-and-client-components.md. Client가초기SSR될수있고browser API는effect에서처리하도록경계를보존했습니다.

집중검사1회PASS: exact12p13m25 전체guard/다른mask·source필드변조와무효길이/진행률반례19/측정ref·d·연결조건/무효길이/브라우저길이참고tau/격리renderer수학동일성/면적0상한/원배열불변을확인했습니다. TS/TSX AST3파일1회 diagnostics0 및target분기가완료unmask분기보다앞서고effect안측정·SSR초기null인정적조건PASS. 실패0/반복0입니다. 이초기unit/정적검사당시에는실제SSR hydration·SVG pixels를검증하지않았으며그검사이력은그대로보존합니다. 아래root의후속격리컴포넌트관찰과구분합니다. appUI:false/runtimeRegistered:false/build/TSC/전체검사0을유지하며작성자는서버/UI/Git을실행하지않았습니다.

## Root 실제 컴포넌트 브라우저 후속 관찰

Root가실제원StrokeOutlines 전체TSX를쓴로컬harness에서 SSR→hydrate readytrue/errors[]를확인했습니다. 초기idle whole의targetMaskedtrue, 실제browserL38.68603515625, pen10 .75와multi10(.45282994944832855) 전/경계/후520PASS입니다. before에는targetink가없어masked:null이맞고, at에는기계epsilon gate가있었습니다. after의극미AAarc만남으며유한filledstamp는없습니다.

0/epsilon .000001의target신규잉크없음,95/99.99/99.999999/100 실제520PASS이고95·fine·완료모두targetMaskedtrue입니다. 실제component coarse9각220 전부PASS. 8초play 클릭직후첫down진행시작은보았으나숫자UI가이전1에머물러 정량start는관측하지못했습니다(start=null). 8초이상후AXprogress1·520완성을확인PASS했습니다. pen11 .75의완료target과whole(done12)도maskedtrue/errors[]입니다.

isolatedActualComponentBrowserVerified:true만새로확정하고 actualAppUI:false/controller:false/storage:false/routes:false/runtimeRegistered:false를유지합니다. 원6실험의준비false와새SSR/집중검사횟수는덮어쓰지않습니다. root서버PID68933/port62685/session36832 STOP143이며새검사·geometry·UI·서버재실행0입니다.
