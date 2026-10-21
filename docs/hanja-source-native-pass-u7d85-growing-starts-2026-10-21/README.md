# 綅 일곱 시작 target의 ROOT 유한 source 게이트 기록

ROOT가 고정 source와 격리 renderer의 아래 유한 게이트를 최종 승인했습니다. 이는 **source 유한 게이트에 한정한 승인**이며, 전체 native·실제 컴포넌트·APP/controller/storage·runtime 승인은 false입니다. 원 source/renderer 준비자료, HOLD 및 수학문서의 당시 false는 덮어쓰지 않습니다.

## 고정 출처

- source: `docs/hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/`
- public fixture SHA256 `48bdc3cf39f8c0eb167f60c25d782a305d1785bab552c600967c12963e3c9fcf`
- 원 고정 기하: **13p15m35**, canonical SHA256 `5333f55bf957db713a728f045fd7d3803c85605a0acbc61841278ec41a75bd09`
- actualfull5/id3 identity: `engine-proof.json`, SHA256 `e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83`; full JSON canonical `8af797e3ed009a1b8f630ea9346a45d3af79fcf964da48b788b3bfc515eae1c0`
- renderer: `docs/hanja-renderer-growing-starts-u7d85-experiment-2026-10-21/`, commit prefix `7b0bba66`, render SHA256 `43c46356cfcb501d54dc4a536d8aff46df3f8c21505a98f3911c7e7ac530a3ff`
- 증명: `docs/hanja-u7d85-start-geometry-proof-2026-10-21/README.md`
- 이전 HOLD: `docs/hanja-source-native-hold-u7d85-startcaps-2026-10-21/`

원 guide·폭·weight·35polygon·QQ gap은 그대로이며 source/projection/compiler/factory/engine/새 tail 분리는 0입니다. 1m1/1m2/2m1/2m2는 각 고유 Q 초기 arc7 인증, 7m1 MLL·11m1 MLQ·12m1 MLQ는 별도 straight-first-prefix kind입니다. 이 기록으로 초기 인증을 전체 원 P coverage나 후반 연결성의 일반 정리로 확대하지 않습니다. 실제 coverage 관찰은 아래 별도로 적습니다.

## ROOT 실제 관찰

화면 518×766, SVG 선언520입니다. 흰 가장자리만 잘렸고 실제 target 잉크는 모두 관찰했습니다. 전체520 viewport가 잘리지 않았다고 주장하지 않습니다.

| 유한 게이트 | 실제 범위 | 결과 |
| --- | --- | --- |
| P-minus-original-full-round coverage | 7target 각1, 총7 흰 residual | PASS |
| local | 7target × 0/epsilon/95/99.99/99.999999/100 =42화면 | PASS |
| rho 전/중/후 | 7target ×3 =21화면 | PASS |
| 첫 L 종료 전/중/후 | 7m1/11m1/12m1 ×3 =9화면 | PASS |
| QQ 내부 경계 전/중/후 | pen1/2 ×3 =6화면 | PASS |
| 전체13획 fine | 99.99/99.999999/100 ×13 =39화면 | PASS |
| risk coarse | pen1/2/7/11/12 ×9 =45화면, 실제220 | PASS |

QQ 경계는 pen1 `0.5367060031053901`, pen2 `0.5883777707055957`입니다. 이 표에 따로 제공되지 않은 실제 local 부동소수 값이나 rho delta는 추정하지 않습니다. grid에 다른 행의 잉크도 일부 보였으나 선택한 SVG의 전체 잉크를 검토했고, 다른 행을 추가 샘플로 세지 않았습니다. 나머지8획 coarse와 natural은 미실행입니다. 국내 static 대응은 기존 증거를 재사용하며 fresh temporal 방향 관찰은 0입니다.

## 자연 재생: 시작·끝 관찰만

재생 설정은 8초입니다. 다음은 각 선택 risk획의 시작과 끝 각1장, **총10화면**이며 연속8초 영상·모든 RAF를 관찰했다는 주장이 아닙니다. 시작 값은 선택획 진행값이며 glyph 전체 clock 또는 내부 mask별 local 값으로 바꾸어 해석하지 않습니다.

| 획 | 유효 시작 | 끝 | 결과 |
| --- | --- | --- | --- |
| 1, attempt3 | 0.17890000000596046 | 1 | PASS |
| 2 | 0.17813750000596337 | 1 | PASS |
| 7 | 0.17911250000595463 | 1 | PASS |
| 11 | 0.17589999999404243 | 1 | PASS |
| 12 | 0.1809999999940337 | 1 | PASS |

pen1 최초 attempt1 시작0.1707375와 attempt2 시작0.1842875는 교체 중 SVG rect0/후보 화면 밖 상태라 유효 증거에서 제외했습니다. 고정 `#candidate` 정렬 후 attempt3을 새 시작부터 끝까지 관찰했습니다. 제외된2시도를 geometry FAIL 또는 유효 자연 PASS로 세지 않습니다.

ROOT는 마지막 현재 페이지 `pre.errors=[]`를 확인했습니다. 전체 tab developer log는 이번에 다시 확인하지 않았으므로 전체 tab errors가 비었다고 주장하지 않습니다.

## 종료와 승인 경계

ROOT 서버 PID58671 / port59412 / session75004는 Ctrl-C(SIGINT) exit130, 출력 빈 상태로 종료했고 승인된 ps 조회로 PID 부재를 확인했습니다. 작성자는 서버·브라우저를 실행하지 않았습니다.

source 유한 게이트 승인만 true입니다. 전체 native/전체13획 replay/temporal·실제 컴포넌트·APP·runtime 승인과 등록은 false입니다. 기존 미승인 이력을 바꾸지 않습니다.

## 새 문서 검증 이력

고정 renderer 입력49와 새기록용 renderer6, 총55핀을 확인했습니다. 최초 경로 읽기에서 root-relative `docs/...`를 renderer 하위에 잘못 결합하여 ENOENT1이 났으나 첫 파일을 열기 전이라 검증핀0/파일변경0/기존검사0이었습니다. root-relative 경로로 고쳐 필요한 입력핀 검증1을 완료했습니다. 이전 수학·source·helper·기존 PASS 검사를 반복하지 않았습니다.

새 두 문서의 바이트·JSON·README digest·최종 관찰값·false 범위만 메타1로 마감합니다. 기존 입력핀을 다시 검사하지 않으며 sourceprojection/module/compiler/engine/HTTP/API/UI/server/Git/build 실행은 모두 0입니다.
