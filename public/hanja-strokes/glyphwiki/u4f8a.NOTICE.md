# 侊 현재 고정 공식 source

GlyphWiki Project와 기여자의 공개 글리프 정의입니다. 공식 API 문서 https://en.glyphwiki.org/wiki/GlyphWiki:AdvancedApplication 및 라이선스 https://glyphwiki.org/wiki/GlyphWiki:License 를 참조합니다. 원84 NOTICE와 고정 archive 라이선스는 변경하지 않습니다.

2026-10-18 공식 API raw response/버전/고정이름/data SHA를 별도로 기록합니다. 선택 u4f8a@8→u4f8a-j@2→u5149-g02@3→u5149-02@7 및 u4ebb-01@12만 whole engine에 사용합니다. 과거 archive u5149-02와 현재 정의가 실제 다릅니다. 현재 Q 시작 y98과flag32는 공식 source가 지정한 값이며 새로 작성하지 않았습니다. 미선택 var001/v02의 y104 정의는 별도 영역에 보존하고 선택closure에 섞지 않았습니다.

국내 dictionary는 기존84 metadata의 URL/bytes/SHA를 참조하며 SVG/HTML/스크린샷을 저장하지 않습니다. 과거 filled-gap 보류 이력은 불변이고 현재의 접촉·방향·자형·progressive/native/runtime 승인을 대신하지 않습니다. native/runtime=false입니다.

## 검토된 runtime 1236

현재 공식고정 u4f8a@8→u4f8a-j@2→u5149-g02@3→u5149-02@7 및 u4ebb-01@12 closure의 원8획22polygon·좌표·outline union·폭·sourceGroups·획순서를 보존합니다. 같은 고정baseline에서8획 raw7의 마지막 cdDrawLine terminal5 원quad만 기존7e0649 UP kernel로 분리합니다. 원body guide·width14·bounds·weight는 유지하고 기존고정 tailweight12.5를 추가하므로 전체weight불변은 주장하지 않습니다. 다른7획은 완전동일하며 새author좌표·폭·연결선·경로·순열을 만들지 않습니다. 원84의 archive gap 및 현재공식 leaf의 flag32/y98 변경을 구분하며 현재source를 옛archive복원이라고 표시하지 않습니다. 원1235 terminal8 완료FAIL·신규OBJECT1·원84/NOTICE/source/nativefalse는 불변입니다. full5 engineHashes/id5 sourceRoot/sourceProofFile/sourceProofFileSha256/sourceCapsuleFile/sourceCapsuleFileSha256 ./lowerSha 필수3/4 계약을 보존합니다. 원source VM1/compile1, source실험 cachedderive1/cachedpositive1·negative32 이력과 runtime source/fixture/derive/engine0을 분리합니다. Root의 새선택whole1/8방향/72+72coarse/fine6/새8경계/8초 자연재생PASS만 승인합니다.
선택source/원NOTICE는불변이며국내SVG는RAM전용으로파일에포함하지않습니다. source-only실험과원1235보류의native/runtime=false는보존합니다.
