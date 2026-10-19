# 棖1316 앱 코드 역사 근거 스냅샷

1316 당시 실제컴포넌트 브라우저 검토에 사용한 앱3개를 원바이트 그대로 보존합니다. 확장되는 현재앱과 과거native승인근거의 검사를 분리하기 위한 독립sidecar입니다. 원review/native2/validation/resume/배포data/옛verify-runtime.mjs/옛집중test는 수정하지 않습니다.

|원경로|불변snapshot|원승인SHA256|
|---|---|---|
|lib/hanja-stroke-start-gate.ts|lib__hanja-stroke-start-gate.ts.source.txt|ce2960e7be5c976b6ba29430187732ef414b75af934ae001177c858ae3b08db8|
|lib/hanja-stroke-start-gate.test.ts|lib__hanja-stroke-start-gate.test.ts.source.txt|0b477719fdd215d93a6ebbc3fb2aa55e6fb02594d26335f69a7b60e5dc445646|
|components/hanja/stroke-outlines.tsx|components__hanja__stroke-outlines.tsx.source.txt|58b3f80a4a86093708a322315fc8137fc8b7bee18ce2c385b297c50b04075a3e|

.source.txt는 비실행원문이며 Next/TypeScript소스나테스트로수집하지 않습니다. resolver.mjs는 위원경로와기대SHA의정확3쌍에만파일읽기를허용합니다. 경로정규화·별칭·대소문자SHA변환·새경로·새SHA fallback이없으며 읽은snapshot자체의SHA가다르면즉시실패합니다. 원문을교체하고새해시를같이주는것도거부합니다.

## 독립 역사입력 검사

rtk proxy node docs/hanja-component-evidence-start-gate-u68d6-1316-2026-10-20/check.mjs

고정1316review SHA f4a2e0258f78778b13abf72380e2a3bd25890fd8ca69d1f027dd7200a08a7c8a 및원native-review SHA4c65b6ce19f3b635780ce3027a08ca06e7bce242c44f988e05162d8dca86f06b를확인합니다. 원47핀중app3만snapshot으로확인하고나머지44개는기존원경로·기대SHA로확인합니다. current liveapp3는읽지않으므로향후정상확장으로과거근거가바뀌지않습니다. 실제복사시점의원바이트동일성은별도로확인하며해시는옛native기록과같습니다.

1316 actual은당시globalunique5732·remaining246·canonicalrefs373를확인한1회체크포인트기록입니다. 이역사입력검사는그실행을재현하거나최신runtime총수가5732라고주장하지않습니다. 새runtime은최신batchactual로확인해야합니다. 기존live검증/옛test읽기경로마이그레이션은이번범위가아니므로향후앱변경전별도작업이필요합니다.

현재앱의棖exactgeometry/target하나/변조거부/다른mask미적용·완료mask는live회귀검사로남겨야합니다. 새후보는새exactguard와자체실제componentfreshnative를확보해야하며이snapshot을새승인으로상속하지않습니다. 실제앱controller/storage/routes검증은여전히false입니다.

파일은추가만하고app/lib/shared43/runtime/registry변경0, sourcegeometry/compiler/engine0, UI/server/Git/build0입니다.

커밋메시지: test(hanja): preserve immutable 棖1316 component evidence
