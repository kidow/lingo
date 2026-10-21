# 絺 다섯 시작 mask — ROOT 유한범위 source native PASS

ROOT가 고정 source와 새 다섯-target 표시정책을 실제 브라우저에서 관찰하고 **유한범위 source 게이트를 승인**했습니다. 실제 component·APP/controller/storage/routes·runtime 승인은 false입니다. 기존 source 준비 및 HOLD의 false 이력을 바꾸지 않습니다.

## 고정 입력

- source8: `../hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/`, commit `1449e5604bf3e855f5ec218e6b7c472a72cdf8eb`.
- geometry `933b3e52ba6e2a53237c09777724d4ea34ac05cd3124e1ecfb1ae38682cf719b`, **13pens/15masks/38polygons**.
- 기존 actual full5/id3, canonical proof `48e1f7b44d0d008a38f38c3f1df90526298869a8f22e68108ab74b12a18fc552`. base 원문만 선택하며 body/header/variant 혼합0.
- renderer6: `../hanja-renderer-growing-starts-u7d7a-experiment-2026-10-21/`, ROOT 전달 commit prefix `81b481`, render SHA `aeedd44a50e0b928568da901c1edbd221786272c7033b754b45783feb89a6ad6`.
- 기존 HOLD: [README](../hanja-source-native-hold-u7d7a-startcaps-2026-10-21/README.md) / [JSON](../hanja-source-native-hold-u7d7a-startcaps-2026-10-21/hold.json), ROOT 전달 commit prefix `1c3af36`. 12획0은 선행11획이 유지되고 선택12획만 없는 상태입니다.
- [초기 arc7 기하 근거](../hanja-u7d7a-start-geometry-proof-2026-10-21/README.md), ROOT 전달 commit prefix `743aa7cc`, SHA `756995b91312074687cca80014786163749887336ba41ae918bb0de0b1b9d7d9`.
- 다섯 target: 1m1/1m2/2m1/2m2의 고유 Q 초기 인증과, 12m1 원 `M L L Q`의 첫 직선32.4에 결박한 별도 kind입니다. 원 guide·width14·weight·38polygon 및 LEFT514는 불변이며 꼬리 분리0입니다.

## ROOT 실제 관찰 범위

화면은 **518×766**, 선언 SVG520입니다. 흰 가장자리만 clip되고 대상 ink는 전체 관찰됐다는 ROOT 보고입니다. 완전히 잘리지 않은520 viewport라고 주장하지 않습니다. coarse grid에서 다른 행 ink가 함께 보이는 경우에도 선택한 SVG의 전체 ink를 대조했고, 그것을 추가 샘플로 세지 않습니다.

| 게이트 | ROOT 관찰 |
|---|---|
| coverage | 다섯 P-minus-original-full-round residual 각 흰색, 총5 |
| target local | 다섯 mask × 요청0/epsilon/95/99.99/99.999999/100, 총30스크린 PASS |
| rho=r 경계 | 다섯 target의 before/at/after, 총15 PASS |
| 12m1 첫 L 끝 | before/at/after, 총3 PASS |
| QQ1·QQ2 경계 | 각 before/at/after, 총6 PASS |
| fine | 전체13획 ×99.99/99.999999/100, 총39 PASS |
| coarse | 위험획1·2·12 ×9단계, 총27, actual220 PASS |
| 자연재생 | 선택획1·2·12 각각 시작/끝2장, 총6 PASS |

요청 local 버튼과 실제 local floating-point 수치의 독립 측정은 구분합니다. ROOT가 이번에 제공하지 않은 각 local 실수값이나 UA 길이를 새로 추정하지 않습니다. 경계 delta의 독립 숫자 측정 또한 새로 주장하지 않습니다. QQ의 고정 원 경계는 source weight 기준 `1=0.5362013129661535`, `2=0.5861325333592735`입니다.

자연재생은8초로 설정된 helper에서 시작과 끝을 각각 관찰했습니다. 연속8초 영상·모든 RAF 관찰이라는 주장이 아닙니다. 아래 수치는 선택획의 진행률이며 glyph 전체 시간이나 각 내부 mask의 local 값으로 확대하지 않습니다.

| 선택획 | 시작 | 끝 |
|---|---:|---:|
| 1 | 0.1779375 | 1 |
| 2 | 0.17391249998212152 | 1 |
| 12 | 0.16764999998211716 | 1 |

다른10획의 coarse와 자연재생은 이번 검토에서 **미검토**입니다. 국내 정적 대응은 기존 single/prefix 근거를 재사용했으며, 새 국내 temporal 방향·전체13획 자연재생 승인은 없습니다. 원 baseline은 같은 source 투영을 shared43으로 그린 참조이며 독립적인 정답이 아닙니다.

## 오류·종료와 승인 한계

현재 絺 페이지의 `pre.errors=[]`를 ROOT가 확인했습니다. 탭 dev 로그에는 `2026-10-20T23:59:46.329Z`의 과거 潗/梲 hydration 오류1이 남아 있었으며, 현재 絺 오류와 구분합니다. **탭 전체 errors가 비었다고 주장하지 않습니다.**

초회 DNS 실패1은 서버 listen 전이며, 승인된 escalation 재기동 실제1회가 성공했습니다. ROOT 서버 PID49372/port59412/session87187은 Ctrl-C 후 exit130·빈 출력으로 종료됐습니다. 첫 ps는 sandbox 권한 실패였고, 승인된 ps로 PID49372 부재를 확인했습니다. 다른 세션 서버를 종료한 기록이 아닙니다.

원 sourceCompiler/projection/factory/engine/geometry와 과거 검사를 이 기록 작성에서 실행하지 않았습니다. source 입력39핀과 renderer6 현재 파일을 합친45핀을 필요한 새 provenance로 고정하고, 기존 준비·수학·native 관찰을 재실행하지 않았습니다. 새 문서 메타검사는 이 두 파일과 고정 출처·관찰 수치의 정합만 확인합니다.

이 문서의 `sourceNativeApproval=true/sourceFiniteGateApprovalOnly=true`는 위 유한 관찰의 범위만 의미합니다. `nativeApproval/fullNativeApproval/isolatedActualComponentBrowserVerified/actualAppUI/runtimeRegistered/runtimeApplied`는 모두 false입니다. renderer/source preparation의 원 false와 초기 finite cap HOLD도 영구 보존합니다.
