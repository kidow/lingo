# 隮857 — 原 마스크 활성화 게이트 독립 실험

검토 주소: http://127.0.0.1:64720/?stroke=12&enlarged=1

**진단 전용, 앱 미적용, native 미승인.** 기존857 문서·source·boundary compiler·runtime·components·공용batch43 renderer를 변경하지 않습니다.

원본 side와 gated side 모두 동일한 compiled17pens20masks42polygons를 사용합니다. 공통 pure `reveal-descriptor.mjs`가 local progress/mask/clip/opacity를 계산하며 `svg-string-adapter.mjs`와 `svg-dom-adapter.mjs`는 해당 descriptor만 표현합니다. DOM adapter는 실험용 SVG DOM 구현입니다. 실제 production React 컴포넌트를 변경하거나 실행했다고 주장하지 않습니다.

게이트는 pen12의 두 번째 독립 원본 curve 결과 group만 40ms 동안 alpha0→1로 올립니다. 원본 outline/revealPath/revealWidth/bounds/weight/pen order/count와 완료 자형은 그대로입니다. 마스크 시간228.653664749291ms, local gate window0.1749370605708782, 원본 mask2 경계0.47233769673240533입니다.

8초 느린 재생은 같은 q 구간을 늘려 관찰합니다. 실제 앱 한 펜 재생은433.3333333333333ms, 전체17펜 모드는 gap120ms를 사용합니다. 현재 앱의650/1.5와180/1.5를 읽어 고정했으며 런타임 참조 SHA도 검사합니다. 슬라이더·경계 전/at/후·9프레임·520px 비교가 준비돼 있습니다. HTTP200은 실제 버튼 재생 관찰과 다릅니다.

원본 사전 표제·17clips·bytes8388·SHA를 기존 RAM-only dictionary renderer가 검증합니다. 사전 그래픽은 페이지 응답/RAM에서만 사용하며 파일이나 콘솔에 저장하지 않습니다. `fixture` 응답은 공개원본 geometry 및 계약만 반환하고 private SVG는 포함하지 않습니다.

## 실제 검사 결과

`test.mjs`를 빌드 없이 **한 번** 실행했습니다. 원본 preview와204SVG출력, 두 diagnostic adapter408출력, source 객체4336참조, 나머지 펜192경우, 게이트101값, fade4경우, 최종17자형 검사가 통과했습니다. DOM adapter 검사는 최소 XML node serializer를 이용한 구조 검사이며 실제 브라우저 픽셀 검사가 아닙니다. HTTP7주소200과 source/compiled SHA 검증도 통과했습니다. 정확한 수치는 `validation.json`에 있습니다.

## root의 실제 native 검사 순서

1. 기존·게이트를 같은 q에서 경계 직전/정확/직후 비교하고 1%,4%,10%,25%를 관찰합니다. 전체 nib이 단지 희미해졌다 진해지는지, 국내 방향의 성장으로 타당한지 별도로 판단합니다.
2. DOM/string adapter 선택이 같은 모습인지 확인합니다. 실제 앱 속도·8초 모드에서 둘 다 재생 및 중간·100%를 관찰합니다. 현재 root만 native 관찰·승인을 할 수 있습니다.
3. 9프레임과99.99→100을 검사합니다. completion clip 제거 분기는 기존과 같으므로 종료 점프가 별도로 남으면 보류합니다.
4. 완료 whole·source identity가 같음을 확인하고 기존 보류857을 자동 해제하지 않습니다.

**이 실험이 해결하지 않는 것:** 중심선 gap[-12.07,+5.55], 국내 펜 경계·순서·방향 불일치, 다른 original nib의 방향 성장 근거, 闐844 tail clip 완료 문제, 원본 획수 불일치 후보. fade 연속성 수치만으로 native 승인을 만들지 않습니다.

## 등록부 참조 재검증 — 2026-10-15

승인된 다른 글자 등록으로 `lib/hanja-strokes.ts`의 참조 해시가 변경됐습니다. 새 프로세스에서 隮17의 runtime 데이터가 여전히 `null`이고 등록부에도 隮가 없음을 확인했습니다. 원본857 자료·compiler 및 렌더러 참조는 그대로입니다. 원래 `runtimeReferencePins`와 `validation.json`을 보존하고, 해당 등록부 하나만 `contract.registryRevalidation`에 원래·현재 해시를 명시했습니다. 재검사 결과는 `current-revalidation.json`에 별도로 기록하며 native 승인을 부여하지 않습니다.
