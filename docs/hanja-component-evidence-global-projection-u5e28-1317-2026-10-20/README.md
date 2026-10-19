# 帨1317 예정 · 앱 바이트 역사 스냅샷

현재 고정 앱3을 원바이트 그대로 보존하는 독립 sidecar7입니다. 이 스냅샷 작성 시 실제 컴포넌트 브라우저 검토는 아직미실행(false)이며 hydration/실제앱 UI/runtime등록 승인도false입니다. 격리 renderer fresh nativePASS가 이 컴포넌트나 앱 승인을 뜻하지 않습니다. 1317 번호도 아직 예정이며 root가 이후 실제검토·적용을 명시해야합니다.

|원경로|비실행 원문 스냅샷|고정SHA256|
|---|---|---|
|lib/hanja-stroke-start-gate.ts|lib__hanja-stroke-start-gate.ts.source.txt|fd291f88e6039519ed50d721efc3cc09d393d86af571f2403f2df20e49647f0d|
|lib/hanja-stroke-start-gate.test.ts|lib__hanja-stroke-start-gate.test.ts.source.txt|445cb7bf57fe1293ea270a7626c25a122756771c09255bf2188d0c5c7f5873a3|
|components/hanja/stroke-outlines.tsx|components__hanja__stroke-outlines.tsx.source.txt|40dfc67744e21021545db018876fe95d0d9918053244def58e70df0d45abc513|

생성 전 현재3파일의 실제 bytes SHA가 위고정값과일치함을RAM에서확인했습니다. 원코드 변환·포맷·줄끝변경 없이 apply_patch로동일 UTF-8 bytes를보존하고 새집중검사는 snapshot의 고정SHA/읽기계약만검사합니다. check.mjs는 현재liveapp3을다시읽지않으므로 향후정상 앱확장과과거바이트 증거를분리합니다. source.txt는 Next/TypeScript 실행소스나테스트로수집하지않는 원문입니다.

resolver는 원경로+기대SHA의정확3쌍만허용하고 변경SHA·별칭·경로정규화·대소문자변환·다른파일fallback·잘못된인수개수를거부합니다. 입력bytes가바뀌면새hash를같이넘겨도거부하며 Buffer만허용합니다. 반환binding목록은복사이고 private목록/entry는freeze되어있습니다. typed resolver.d.mts를처음부터제공하여 allowJs=false에서도선언없는모듈가정을피합니다.

940 actualcomponentharnessconfig SHA18a820202329529d1765c0f034540f3936f84d3e60336b7268703e6371f6bbea와start-gate/component 두핀을대조했습니다. harness의실행입력세번째는변경없는outline.ts이고 unit-test는실행의존성이아니므로해당config에포함되지않습니다. 이번역사세번째입력은1316과같이관련unit-test.ts이며 현재고정바이트 SHA를직접확인했습니다. outline은기존별도원핀을유지하며스냅샷범위를늘리지않습니다.

향후root component PASS와1317등록결과는별도 runtime1317 review에만기록합니다. 이 README·historicalEvidence의작성시점false를나중에승인true로덮지않습니다. 이전1316 snapshot7/review/validation/resume/data,현재app8,원source/render기하/NOTICE/HOLD/runtime/registry는수정하지않습니다.

검사(root 실행용): `node docs/hanja-component-evidence-global-projection-u5e28-1317-2026-10-20/check.mjs`. 신규집중 거부검사1회/Node구문 resolver·check 각1회/선언AST1회만실행하며sourcefactory/compile/engine/UI/server/Git/build/TSC/옛actual재실행0입니다.

검증 결과: 신규 집중1회 PASS/음성77/스냅샷3의고정SHA전부일치/실패0, resolver·check Node구문각1회와선언AST1회 diagnostics0입니다. 원앱·옛검사·기하·sourcecompiler·engine·UI·서버·runtime·registry·Git·build 실행/변경0입니다. 이결과문구와checker의README SHA리터럴만후속갱신하며통과검사는반복하지않습니다.
