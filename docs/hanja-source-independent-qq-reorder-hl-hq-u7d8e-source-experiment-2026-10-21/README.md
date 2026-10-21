# 綎 QQ·HL/HQ 정적 순열 source-only 후보

원851의 base actualfull5/id3만 고정한 격리 8파일입니다. ROOT 정적 single/prefix 대응을 source-specific 배열로 표현하며 방향·시간·합획·animation/native/APP/runtime 승인은 모두 false입니다. 원 HOLD, `sourceGroups=[]`, 최소14>국내13, NOTICE와 원 compiler는 그대로입니다.

## 고정 출처와 정적 근거

- actualfull5: `../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json`, SHA256 `e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25`
- 원 full JSON canonical SHA256 `e5ddb2e7be953bd9d2bb529538840355a0503274e04eeba3ab36ea6a5dc811ab`; 선택 base body와 trace 전체를 해당 동일 파일에 엄격 결박합니다. 별도 body3/header 합성이나 K/var001 혼합은 없습니다.
- 정적 기록: `../hanja-source-raw-review-u7d8e-2026-10-21/`의 40화면(whole4/single30/prefix6) 관찰만 재사용합니다. temporal 방향·진행 승인으로 확대하지 않습니다.
- 1-based 후보: `[[1,2],[3,4],[5],[6],[7],[8],[17],[14],[15],[16],[9,10],[11,12],[13]]`
- zero-based source: `[[0,1],[2,3],[4],[5],[6],[7],[16],[13],[14],[15],[8,9],[10,11],[12]]`
- 국내7/8/9/10에 base raw17/14/15/16을 배치합니다. 각 raw1..17은 정확히 한 번이며 전체 source 필드는 원본과 결박됩니다.

## 마스크와 새 실행 경계

QQ1 raw1/2 gap[-13.65,-11], QQ2 raw3/4 gap[-11.700000000000001,3]은 각각 독립2mask로 유지합니다. 새 connector나 합성guide는 없습니다. logical11은 raw9 H+raw10 원내림 L의 exact endpoint HL이고 수직선으로 바꾸지 않습니다. logical12는 raw11 H+raw12 Q의 exact endpoint HQ입니다. 중간 raw10→raw11 접점은 서로 다른 국내획이므로 전체 raw9..12를 합치지 않습니다.

원 candidate-compile-analysis.json은 compiledPens/Masks=0이고 공개 compiled cache가 없습니다. 따라서 승인된 기존 8067 순수 projection 본문을 바이트 그대로 새 module 내부에 복사하여 **최초1회** singleton raw baseline을 만들고, 원 참조 재배치/정확접합만 수행한 뒤 **즉시 public fixture.json을 먼저 저장**했습니다. 원 compiler/factory/engine은 호출하지 않았습니다. 이후 캐시 양성호출과 모든 GET/startup은 projection/compiler/engine0입니다. 이미 fixture가 있으면 captureProjection은 거부합니다.

실산출은 **13p15m35**, 원17raw/17calls/35polygon입니다. compiled canonical SHA256 `43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67`, raw baseline SHA256 `cbf59535b8acb10989cb66da20e5d7d7fd9ab34cc679eca50c2179e04db478d2`, public fixture SHA256 `cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c`입니다. 모든 원 polygon은 정확히 한 번, 원좌표/off/args/flags/폭/weight 정책을 보존합니다. 새 tail 분리는 0이며 logical11 terminal113과 logical12/13 curve 끝, QQ 시작 finite cap/내부경계 연결성은 미검토 위험입니다. 원 P coverage·source 시작/끝·연결성을 승인하지 않습니다. baseline은 같은 논리 projection 복사본으로 독립 근거가 아닙니다.

## ROOT 검토 CLI

`rtk proxy python3 -B docs/hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/serve.py --port 0`

`/whole`, `/pairs?stroke=1`, `/progressive?stroke=1&coarse=1`, `/progressive?stroke=2`, `/progressive?stroke=11`을 제공합니다. 국내/같은논리baseline/후보 3SVG520, coarse9 각각220, 재생8초입니다. QQ 모든경계 before/at/after와 0/epsilon/95/fine controls를 표시합니다. 국내SVG는 고정 rawhelper에서 ROOT startup RAM1회 다운로드·바이트SHA·실제XML검증만 수행하고 저장하지 않습니다. 작성자 HTTP/UI/server0입니다.

## 최초 검사 계획

새 cachedpositive1과 필요한 negative, 원 raw mask 필드/trace/35polygon exact-once·HL/HQ/원 순열·8067 byte identity를 한 번 검사합니다. 새 Node2/선언AST1/PythonAST1/embeddedJS1/helperguard1/메타1만 수행하며 이미 통과한 원 검사·수학·source 모듈을 반복하지 않습니다. 실패가 있으면 실패 부분과 아직 미실행 tail만 복구해 prep.json에 기록합니다. 원 prepare false/HOLD/NOTICE 및 APP/registry는 변경하지 않습니다.

최초 새집중에서 캐시양성1·음성24·전체raw필드/35polygon/HL·HQ/8067본문 검증을 통과한 뒤 새 serve.py의 UI문구 뒤 줄바꿈 누락 때문에 Python AST SyntaxError1이 발생했습니다. source/fixture/projection은 변경하지 않았습니다. 문구 줄바꿈만 복구하고 `source-check.mjs --helper-tail-only`로 이미 통과한 앞 검사는 건너뛰어 실패한 helper와 미실행 tail만 검증합니다. 이 복구는 기존 원 검사나 cachedpositive·projection 재실행을 허용하지 않습니다.

helper-tail 복구에서 Python AST·helperguard·query양성6/음성14·embedded JS 구문은 모두 통과했습니다. 다만 마지막 결과 출력에서 앞 검사 블록 안의 `groups`를 참조하여 reporter ReferenceError1이 났습니다. 출력 참조만 `T.sourceGroups`로 고쳤고 이미 통과한 helper/tail 검사는 재실행하지 않습니다. 별도 reporter-only/최종메타 확인으로 복구합니다. 전체 실패는 최초 AST1+결과 reporter1이며, cache 양성1/음성24와 pure projection1은 반복하지 않았습니다.

최종 결과: 최초 source 집중의 캐시양성1/음성24·원35polygon/전체raw필드/HL·HQ/8067 보존 검증 PASS, helper-tail의 query양성6/음성14·PythonAST·guard·embeddedJS PASS, reporter-only 복구1 PASS입니다. 앞서 통과한 source/helper 검사는 재실행0입니다. 새 candidate/check Node구문 각1 및 선언AST1은 처음 실행에서 PASS했습니다. 최초 전체명령을 FIRSTPASS로 꾸미지 않으며 AST 실패1과 reporter 실패1을 prep.json에 분리 보존합니다. 최종 own7핀·문서8/JSON·캐시digest 메타1로 마감합니다. native/APP/runtime 승인은 여전히 false입니다.
