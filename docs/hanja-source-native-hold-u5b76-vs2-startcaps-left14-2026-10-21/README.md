# 孶 VS2 시작 cap 및 LEFT14 완료 부근 형태 차이 — HOLD

ROOT가 source8 commit `5ef55cb4f7e158e994fbecf0d8ad217ec9528b49`를 실제 검토한 기록입니다. 시작 관련 11화면 중 10화면에서 유한 cap 노출을 확인했습니다. 나머지 logical11의 첫 H epsilon 한 화면에서는 새 ink가 보이지 않았으나 이 마스크 전체의 시작 PASS로 확대하지 않습니다. logical12 완료 부근에는 왼쪽 foot의 형태 차이가 있어 completion PASS로 기록하지 않습니다.

## ROOT 관찰 14화면

모든 관찰 대상은 `#candidate` SVG520이며 실제 ink 전체가 보이는 상태였습니다.

| logical pen | 관찰 | 화면 수 | 결과 |
| --- | --- | ---: | --- |
| 5·6·8·9 | 각 epsilon .0001%(현재 논리획 global 1e-6, mask-local 별도 미계측), boundary1-after | 8 | 각각 유한 cap 노출 FIRST FAIL |
| 11 | epsilon .0001%, 첫 H 마스크 | 1 | 이 단일 샘플에서 새 ink가 보이지 않음. FAIL 수에서 제외하며 시작 승인도 아님 |
| 11 | boundary1-after, 두 번째 Q | 1 | 유한 cap 노출 FIRST FAIL |
| 12 | epsilon .0001%, 원 내부 V+Q 마스크의 V 시작 | 1 | 유한 cap 노출 FIRST FAIL |
| 12 | 99.99% / 99.999999% / 100% | 3 | near1에서 짧은 left foot, exact1에서 더 긴 왼쪽 foot의 형태 차이. completion PASS 아님 |

모든 epsilon .0001% 입력은 현재 논리획 global 1e-6이며 pair mask-local 진행률은 weight 배분에 따라 다릅니다. mask-local 값은 별도 미계측입니다. 시작 화면 11개는 실패10개와 단일 빈 화면1개이며 완료 부근 3개를 더한 총14개입니다. logical12 형태 차이의 엄밀한 원인, 픽셀 길이, 면적은 확정하지 않았습니다. 시작 cap의 원인 증명이나 보정도 수행하지 않았습니다. 오류 로그는 미검토이므로 errors[]를 주장하지 않습니다. whole·방향·coarse·rho·coverage·natural 및 이 기록에 없는 게이트는 새로 관찰하지 않았습니다. 정적 대응을 방향·시간·합획·애니메이션 승인으로 확대하지 않습니다.

## 고정 출처와 보존

- source8: `../hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/`
- 고정 산출: **13p18m44**, 원18raw/19calls
- 기하 SHA256: `d08f44b6a8a1233cf8bf685cfc5305be1efb9e8ffea4af750af15ebf4c438727`
- fixture SHA256: `2626f648bf03fcd5dfd62c0ad0b3ec960530b2115a7818d4f352c06ef0ce818b`
- VS2 actualfull5: `../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json`
- full5 파일 SHA256: `21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0`

VS2 actualfull5/id3 단일 출처와 root/file/SHA identity, strict progressive3/whole4 계약은 그대로입니다. base header 혼합0이며 raw·guide·폭·weight·flags·순서·44polygon·다섯 독립 쌍의 gap을 변경하지 않습니다. 정확접점 logical11 raw15/16도 독립2마스크 그대로이고 logical12 raw17 내부 V+Q LEFT14도 분리하지 않았습니다. 원822 `sourceGroups=[]`, min/HOLD, NOTICE와 준비 false 및 사전 핀 경로 실패/복구 이력은 보존합니다. 새 renderer 코드는 작성하지 않았습니다.

ROOT 서버 PID69939 / port59412 / session18755는 Ctrl-C(SIGINT), exit130과 짧은 traceback 후 ps status1/PID 부재를 확인하여 종료됐습니다. 이 기록 작성자는 UI나 서버를 실행하지 않았습니다.

새 두 파일의 JSON·README digest와 입력36핀을 메타데이터 검사1회로 확인합니다. 작성 전 경로 정규화 RAM 처리에서 URL 전역 부재 오류1이 있었으며 파일·검사0에서 문자열 정규화로 복구했습니다. 기존 source/math/check, projection·compiler·factory·engine, UI·서버·Git·build·TSC 실행0입니다. native·APP·runtime 승인은 false이며 추가 renderer 준비는 하지 않습니다.

ROOT 읽기 정정: 최초 메타 핀 확인은 진행률 라벨 오류를 잡지 못했습니다. 위 epsilon을 mask-local로 표기한 부분을 현재 논리획 global 값으로 정정하고 README digest·변경 JSON 문구만 추가 확인1회 수행했습니다. 원관찰·입력핀·기하·UI 및 기존 검사는 반복하지 않았습니다.
