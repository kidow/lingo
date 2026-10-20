# 邁 VS3 실제 frozen StrokeOutlines 격리 harness

새 snapshot의 APP3 정확 바이트를 그대로 TSX transpile하고 SSR whole17과 target17m1/17m2 controlled mid 2개를 만듭니다. DOM hydration/실제 component 승인은 아직 false입니다. 원 source body3/id3·17p22m40·22mask40poly 전체를 고정하며 full5/header 합성은 없습니다. 기존 모든 APP 정책은 각 기존 frozen resolver에서 읽고 live APP 파일을 읽지 않습니다.

ROOT CLI: `python3 docs/hanja-component-growing-caps-u9081-vs3-harness-2026-10-21/serve.py --port 0`. localhost 1개만 필요할 때 시작하고 PID·포트·wrapper session을 기록한 뒤 후보 완료/보류 시 해당 서버와 wrapper를 종료합니다. 작성자는 서버·브라우저를 실행하지 않았습니다.

`risk17m1-epsilon` → Q/C `risk-coverage17m1`/`risk-coverage17m2` → `whole17`, prefix3/6/9/16/17 → 두 target local 각0/epsilon/95/99.99/99.999999/100 → rho 각전/정확/후 → pen17 boundary 전/정확/후와0/epsilon/95 → pen17 coarse9 → play8sec. 화면은 실제 #root 520 SVG와 별도 #coarse 보드를 구분합니다. 코스는 3열720px라 좁은 패널에서는 가로로 이동해 모든 열을 봅니다.

상태 window.harnessStatus 및 펼칠 수 있는 #status에 hydrationErrors, 모든 target pen+mask, 실제 localProgress, fullRound, distanceAttributePresent, sameFrame 13개 검사를 기록합니다. 누락 거리 속성을 0으로 바꾸지 않고 NaN/false로 구분합니다. 요청 local1이 부동소수점으로1미만일 때 fullRound라고 부르지 않으며 exact whole/prefix 완료는 별도 확인합니다. natural은 시작/끝만 관찰하며 모든 RAF의 연속 검증을 주장하지 않습니다.

ROOT standalone 일부 게이트의 PASS는 원 관찰 맥락일 뿐 전체 승인으로 상속하지 않습니다. source/compiler/factory/projection/engine0, APP 기존 검사 반복0, actualAppUI/runtime/native 최종false.
