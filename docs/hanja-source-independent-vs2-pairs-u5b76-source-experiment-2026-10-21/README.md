# 孶 VS2 독립 쌍 source-only 후보

원822의 VS2 actualfull5/id3만 고정한 격리 8파일입니다. 정적 대응 후보를 표현할 뿐 source·방향·시간·합획·animation/native·APP/runtime 승인은 모두 false입니다. 원 `sourceGroups=[]`, base 최소16/VS2 최소17 HOLD, NOTICE와 원 compiler는 변경하지 않았습니다.

## 출처와 고정 대응

- 선택 파일: `../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json`
- 원 파일 SHA256: `21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0`
- 전체 full5 canonical SHA256: `13963a3e69966dbb29354a335493976b0783c69129b228ff3cca2ec8f0b7d874`
- 원 full5의 defaults/engineHashes/engineRevision/groups/trace 다섯 키를 그대로 보존합니다. root·proof 파일·파일SHA identity3 및 외부 root 포함4를 엄격히 검사합니다. 실제 VS2 full5 단일 파일이며 base header 결합이나 다른 variant body 혼합은 없습니다.
- ROOT 정적 기록: `../hanja-source-raw-review-u5b76-vs2-2026-10-21/`. whole3/single37/prefix12 총52 유효 관찰만 사용합니다. 초기 base 아래 잘린 화면1은 제외됐고 VS0/VS1 직접 관찰0입니다.
- 1-based 후보: `[[1],[2],[3],[4],[5,6],[7,8],[9],[10,11],[12,13],[14],[15,16],[17],[18]]`
- zero-based 배열: `[[0],[1],[2],[3],[4,5],[6,7],[8],[9,10],[11,12],[13],[14,15],[16],[17]]`

다섯 pair logical5·6·8·9·11은 각각 raw 마스크를 두 개 그대로 보존합니다. raw endpoint 차이는 원좌표 기준으로 각각 `[-16.216199999999997,-5.418349999999997]`, `[-15.540525000000002,3.4832250000000187]`, `[-16.2162,-5.418349999999997]`, `[-15.540524999999988,3.4832250000000187]`, `[0,0]`입니다. 마지막 raw15H→16Q의 정확접점도 합치지 않습니다. 합성 guide·connector·새 좌표·폭·weight 변경은 없습니다. 각 raw 내부의 기존 call·flags는 유지하며 raw17의 내부 V+Q 두 call도 원 single VLQ 마스크 그대로입니다.

## 공개 캐시와 실행 경계

원 공개 compiled cache가 없으므로 승인된 기존 8067 순수 projection 본문을 복사해 singleton raw baseline을 처음 만들었습니다. 최초 캡처 시 prior-art 입력 경로에 잘못 적용된 템플릿 치환이 private FIXED_PINS/config 비교에서 FAIL1을 냈습니다. projection 진입·geometry·fixture 산출은 모두0이었습니다. 경로 한 곳을 정확 복구하고 실패한 capture만 재시도하여 실제 projection **1회**를 성공시킨 직후 `fixture.json`을 먼저 저장했습니다. 이후 모듈은 캐시 검증만 하며 fixture 존재 시 capture를 거부합니다. 원 compiler/factory/engine 실행0입니다.

실산출은 **13p18m44**(원18raw/19calls)이며 compiled SHA256 `d08f44b6a8a1233cf8bf685cfc5305be1efb9e8ffea4af750af15ebf4c438727`, raw baseline SHA256 `85a2b047e8b478697139a240e0ccea132832d9e133861580b44a47fd468872c7`, 공개 fixture 파일 SHA256 `2626f648bf03fcd5dfd62c0ad0b3ec960530b2115a7818d4f352c06ef0ce818b`입니다. 모든 원 polygon44개를 정확히 한 번 보존합니다. 타깃 쌍 전체도 raw 마스크 deepJSON 참조 재배치만 하며 tail 분리0입니다. logical11의 H/Q 독립경계와 logical12 원 LEFT14, 곡선 시작·끝/QQ 활성화·원P coverage·합획 연결성은 미검토 위험입니다. baseline은 같은 논리 projection clone이므로 독립 정답 근거가 아닙니다.

## ROOT 검토

`rtk proxy python3 -B docs/hanja-source-independent-vs2-pairs-u5b76-source-experiment-2026-10-21/serve.py --port 0`

`/whole`, `/pairs?stroke=5`, `/progressive?stroke=5&coarse=1`, `/progressive?stroke=6`, `/progressive?stroke=8`, `/progressive?stroke=9`, `/progressive?stroke=11`, `/progressive?stroke=12`를 제공합니다. 국내/논리 baseline/후보 3SVG520, coarse9 각각220, 8초 재생과 모든 다중경계 before/at/after·0/epsilon/95/fine controls입니다. 국내SVG는 고정 rawhelper의 ROOT startup RAM 다운로드·바이트SHA/실제XML 검증을 사용하며 저장하지 않습니다. 작성자 HTTP/UI/server0입니다.

새 캐시 양성1과 필요한 거부 조건, 원 raw mask 모든 필드·trace·44polygon exact-once·8067 본문·다섯 independent pair를 최초 집중검사1회 확인합니다. 새 Node2/선언AST1/PythonAST1/embeddedJS1/helperguard1/최종메타1만 수행하며 기존 검사는 반복하지 않습니다. 결과는 prep.json에 구분합니다. 실제 source/native/APP/runtime 승인은 ROOT fresh 검토 전까지 false입니다.

최초 새 집중검사는 캐시 양성1/실질 음성27, 원44polygon exact-once, 부모trace/모든 raw 마스크 필드, 다섯 독립 pair(정확접점 포함), raw17 내부 두 call, 8067 본문 바이트 보존을 PASS했습니다. 새 candidate/check Node구문 각1·선언AST1·PythonAST1·embeddedJS구문1·helperguard1/query양성6·음성14도 처음 실행에서 PASS했습니다. 사전 capture 핀 경로 실패1(기하0)과 실제 projection 성공1은 별도로 보존하며 통과 검사 재실행0입니다. 최종 메타는 새8파일/own7핀·캐시 digest만 한 번 확인합니다. ROOT 실제 UI 검토 전 source/native/APP/runtime 승인은 false입니다.
