# 현재 미적용 232자 — 정적 registry 차집합

2026-10-21 · 기준 checkpoint는 batch1330(`1210da013837cd6e264d05276bff8d669cf2d77d`)입니다. `lib/hanja-strokes.ts`를 import하거나 실행하지 않고, 활성 `HANJA_STROKES` import/spread에서 고정 JSON·로컬 literal 및 반환 map의 glyph dataflow를 TypeScript AST로 따라갔습니다.

정적 추적 결과 5,746 entries = 5,746 unique glyph입니다. 원inventory 569entries와의 차집합은 232자이며 총catalog 5,978와의 차이도232입니다. glyph를 생산하는 활성 분기의 미해석은0입니다. 읽은 TS AST909파일·JSON151파일, 총1,060파일의 경로·원바이트 SHA256·크기를 `inventory.json`에 기록합니다. source 모듈·registry·loader·원 compiler·engine·기존검사를 평가하거나 실행하지 않았습니다. AST에서 glyph 반환 dataflow만 분석했으며 loader validation guard의 실제 통과 검증은 아닙니다.

## 기존 inventory 상태별 투영

| 원queue status | 현재 미등록 수 |
|---|---:|
| sourcePreparedAwaitingNativeReview | 90 |
| existingHold | 63 |
| existingReviewUnknown | 53 |
| sourceMissingAwaitingEvidence | 12 |
| heldReviewed | 9 |
| newCandidateNoIndexedEvidence | 5 |
| 합계 | 232 |

이는 `docs/hanja-remaining-autonomous-2026-10-13/inventory.json`의 **과거 status를 현재 미등록 Set에 투영한 값**입니다. 최근 ROOT의 HOLD·source 복구·정적 대응을 자동 재분류하지 않았습니다. 특히 sourcePrepared90은 native-ready·guard 통과·whole/방향/진행 승인을 뜻하지 않습니다. 나머지 원status는152자입니다. `missing`에는 glyph/id/grade/strokes/원sourcequeue/원batch 참조만 보존합니다.

## sourceMissing12의 의미

迲·纆·籩·鼈·邅·闐·縝·禛·絰·寘·敝·遹입니다. 과거 누락 ref는 u571f-j(迲/纆/絰), u76ee-j(籩/闐/縝/禛/寘), u2b739-jv(鼈), u56de-j(邅), u5182-j(敝/遹)로 기록되어 있습니다.

12자 모두 원inventory에 국내SVG URL이 있지만 metadataPinnedUnverified/captureFilesPresentUnverified입니다. URL의 현재 응답·원자료 복원 가능성을 이 작업에서 확인하지 않았습니다. `sourceMissingReviewNeeded`에 원URL·누락 ref·현재 확인 필요 여부를 보존합니다. 국내SVG URL 존재는 GlyphWiki 고정 closure가 완전하다는 근거가 아닙니다. 闐·縝·邅 등의 후속 recovery가 존재할 수 있으므로 과거 sourceMissing 상태만으로 현재 실제 원자료가 없다고 단정하지 않습니다.

## 범위

원registry/source/NOTICE/HOLD/기하/승인·적용 수를 변경하지 않습니다. 새2파일만 저장하고 JSON 수량·중복·경로/digest 형식·README 결박·기준2파일 digest를 확인하는 metadata1회를 수행합니다. 1,060파일의 전체 pin loop, registry 평가, compiler/engine, 기존 PASS 검사·SSR·UI·서버·Git·build는 실행하지 않습니다. native/runtime/app 승인은 false입니다.
