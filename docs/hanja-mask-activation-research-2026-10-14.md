# 원본 독립 마스크 시작 돌출 연구 — 2026-10-14

권장안은 **독립 곡선 마스크의 활성화에 한정한 불투명도 게이트를 별도 실험**하고, 실제 앱과 검토 화면이 동일한 순수 렌더 모델을 사용하게 만드는 것입니다. 원본 자형·경로·폭·좌표·펜 순서·획수는 그대로 유지할 수 있습니다. 다만 페이드가 필순·방향·펜 경계 불일치를 고치지는 않습니다. 이 문서는 연구이며 native 승인이나 보류 해제 근거가 아닙니다.

## 실제 읽은 구현과 실패 근거

- `components/hanja/stroke-player.tsx`: outline 재생은 SVG의 WAAPI를 시계로 사용합니다. 원본 outline 렌더는 별도 `StrokeOutlines`가 담당합니다.
- `components/hanja/stroke-outlines.tsx`와 `lib/hanja-stroke-outline.ts`: 펜별 진행률을 원본 weight로 나눕니다. local progress≤0이면 경로가 없고, 0<progress<1인 곡선은 원본 revealPath와 revealWidth를 round cap dash mask로 표시합니다. progress≥1에서는 mask/clip을 제거합니다.
- 검토용 batch43 `renderProgressive`도 같은 분기·round cap·weight 분할을 사용합니다. 색상·ID·React 구조는 다르지만 위 처리 규칙은 현재 같습니다. 검토 서버는 한 펜을 8초에 재생하고 앱은 실제 STROKE_DURATION을 사용하므로 **재생 속도·시계까지 동일한 검증은 아닙니다**.
- 隮857: root가 국내 전체17방향을 관찰한 뒤 11=raw12,12=raw13/14의 독립 원본 마스크 후보를 검사했습니다. mask2 경계 0.47233769673240533 바로 뒤에서 원본 Q 시작 nib 전체가 나타나 native FAIL입니다. 중심선 단절[-12.07,+5.55]과 원본 filled overlap60.15105169는 그대로 남습니다.
- 荃846: root가 VS2 전체10방향을 확인했지만 pen6 mask2 경계0.3743875462201848에서 Q nib 돌출 FAIL입니다. 중심선 단절[-10,0]과 filled overlap3.7944814는 승인 근거가 아닙니다.
- 闐844: **같은 시작 활성화 실패로 분류하면 안 됩니다.** pen10 99.99→100에서 root가 두 번 관찰한 완료 모양 변화입니다. 기존 실제 출력 분석은 body가 두 시점 모두 이미 unmasked이고 outline/winding/fill rule은 같으며, 차이가 terminal up tail의 tight-bounds clip 제거뿐임을 확인했습니다. 브라우저 raster 원인은 아직 미해결입니다. 시작 게이트로 해결됐다고 주장할 수 없습니다.

SVG round cap은 길이가 매우 짧아도 원본 stroke-width 크기의 끝 영역을 갖습니다. 현재 mask의 local progress=0은 아예 생략하고, 아주 작은 양수에서 round-cap mask가 활성화되므로 nib 영역이 한꺼번에 보일 수 있습니다. 이는 원본 outline에 새 도형을 넣은 결과가 아니라 reveal mask 활성화 문제라는 **코드·SVG 규칙에 근거한 설명**입니다. 실제 해당 브라우저 픽셀을 새로 측정한 주장은 아닙니다. [SVG2 stroke-linecap 및 dash cap 정의](https://www.w3.org/TR/SVG2/painting.html#StrokeLinecapProperty)

## 구체적인 실험 알고리즘

독립 원본 곡선 mask를 현재 방식 그대로 렌더하되 그 mask로 표시되는 **현재 segment의 path만** group opacity로 감쌉니다. 이미 완료된 이전 segment·펜은 항상 opacity1로 유지합니다. 원본 outline, revealPath, revealWidth, bounds, weight, mask 분할 및 순서에는 손대지 않습니다.

1. 기존 weight 분할 결과 local progress `q`를 그대로 사용합니다.
2. 실제 mask 재생 시간 `D = STROKE_DURATION × segment.weight / sum(pen.weights)`를 구합니다.
3. 진단값 `tau = min(40ms, D)`를 사용합니다. 40ms는 미승인 실험값이며 native 결과로 판단해야 합니다.
4. `alpha(q) = clamp(q × D / tau, 0, 1)`를 **현재 segment의 결과 path 그룹**에만 적용합니다.
5. q≤0에서는 현재처럼 미표시, q≥1에서는 alpha1/원본 최종 자형입니다. 틈을 가리는 새 connector·회전·경로 역전·width 증가를 추가하지 않습니다.
6. 최초 mask, cardinal tail, 일반 원본 연속 곡선까지 자동 적용하지 않습니다. 출처 경계가 root에게 독립 원본 same-pen으로 확인된 실패 fixture만 별도 진단 모드에서 실험합니다. 실험 파라미터는 source catalog/geometry에 섞지 않습니다.

이 방법에서 매우 작은 q가 활성화하는 유한 면적 nib의 합성 불투명도는 q에 비례하여 0으로 갑니다. 따라서 **이상적인 알파 합성의 시작 순간 유한 점프**를 없앨 수 있습니다. 그러나 이는 nib을 해당 방향으로 성장시키는 것과 다릅니다. 같은 작은 모양이 점점 진해지는 페이드이며, 중심선의 시작점이 앞 segment 끝과 다르다는 사실은 그대로입니다. 실제60/120Hz에서 보이는 한 프레임 변화, 모바일 raster, 교육적으로 자연스러운 방향은 별도 검증해야 합니다. nib을 올바른 방향으로 성장시켜야 한다는 판단이 나오면 이 페이드 안은 보류합니다.

단순 opacity gate는 **종료 시 clip/mask 제거의 점프를 해결하지 않습니다.** 844에는 먼저 원본 tail을 동일하게 유지한 채 q=1에서도 clip을 유지하는 진단과 실제 unmasked 결과를 비교해야 합니다. 동일 tight-bounds clip을 유지하면 가장자리 raster 자체가 달라질 수 있어 그대로 배포하면 안 됩니다. unmasked outline로 crossfade하는 방식도 누락 부위를 방향과 무관하게 나타내므로 필순 해결안으로 추천하지 않습니다. 종료 자형·방향 검증이 실패하면 보류를 유지합니다.

## 검토 미리보기와 앱을 정확하게 맞추는 조건

현재 별도 string renderer와 React renderer를 각각 고치면 쉽게 달라집니다. 향후 구현한다면 React에 의존하지 않는 **하나의 순수 segment reveal descriptor**를 만들고 양쪽 adapter가 그것을 소비해야 합니다. descriptor는 입력 source를 그대로 참조하며 local progress, visibility, mask/clip 종류, 기존 rect/dash 값, activation alpha만 반환합니다. 서로 다른 helper가 alpha를 다시 계산하지 않습니다.

- 동일한 compiled 입력·SHA·segment 순서, normalized global time, duration/gap, alpha gate version/값을 양쪽에서 사용합니다.
- 검토 페이지에 실제 앱 속도 모드를 두고 기존8초 모드는 slow inspection으로 명시합니다. 520px fine은 시간과 별개로 같은 q를 직접 지정합니다.
- prefix/React useId는 다를 수 있지만 mask definitions·path·fill rule·alpha·clip 수치는 같아야 합니다.
- 원본 guide/background가 승인 장면에 끼어들지 않게 같은 색상·배경·guide off·viewport·DPR을 맞춥니다.
- 임의 경로를 합치거나 nib 도형을 source에서 잘라 재작성하지 않습니다.

## 실제 수행한 최소 수치 검사

원본857 boundary compiler를 수정하지 않고 고정 full proof/identity로 실제 컴파일했습니다. 원본14Q와 source mask width14를 유지했습니다. 경계 전/정확/후±1e-10에서 local fractions는 아래와 같고, 현재 renderer의 두 번째 mask 존재는 false/false/true였습니다.

```json
{
  "glyph": "隮",
  "pen": 12,
  "mask": 2,
  "sourceBoundary": 0.47233769673240533,
  "segments": [
    {
      "direction": "down",
      "weight": 15.725,
      "bounds": [
        71.75,
        26.85,
        77.25,
        47.3
      ]
    },
    {
      "direction": "curve",
      "weight": 17.566859,
      "revealPath": "M68.47 49.1 Q76.63499999999999 46.325 84.8 42.625",
      "revealWidth": 14,
      "bounds": [
        67,
        42.2,
        84.95,
        52.85
      ]
    }
  ],
  "fractions": [
    [
      0.999999999788287,
      0
    ],
    [
      1,
      0
    ],
    [
      1,
      1.8951514416519027e-10
    ]
  ],
  "beforeAtAfterSecondMaskPresent": [
    false,
    false,
    true
  ],
  "wholeAtProgressOneMasksRemoved": true,
  "afterBoundaryProposedGateAlpha": 4.7378786041297564e-9,
  "gateTable": [
    {
      "q": 0,
      "alpha": 0
    },
    {
      "q": 1e-12,
      "alpha": 2.4999999999999998e-11
    },
    {
      "q": 1e-9,
      "alpha": 2.5000000000000002e-8
    },
    {
      "q": 0.001,
      "alpha": 0.025
    },
    {
      "q": 0.02,
      "alpha": 0.5
    },
    {
      "q": 0.04,
      "alpha": 1
    },
    {
      "q": 0.05,
      "alpha": 1
    },
    {
      "q": 1,
      "alpha": 1
    }
  ],
  "actualPureFunctionAssertionsPassed": 5,
  "nativeObserved": 0
}
```

위 0.04 window는 수학적 연속성 예시를 검사한 값입니다. 실제 권장40ms temporal gate를 앱에 구현하거나 native로 관찰한 결과가 아닙니다. 기존 runtime `outlineSegmentProgress`를 직접 import해 경계·범위 밖·0/1·중간값11개에서 review의 기존 weight 분할식과 일치하는 것도 실제 확인했습니다. **현재 분할 수치의 일치만 증명하며 렌더 픽셀·재생 시계의 동등성을 증명하지 않습니다.**

## 의미 있는 다음 최소 검사

1. 원본857/846 fixture를 별도 실험만으로 렌더: 모든 source-file SHA 및 원본 complete mask SHA·coords·path·width·weight·order·count가 그대로인지 한 번 확인합니다. gate는 원본 경계 불일치를 승인하지 않아야 합니다.
2. 공유 descriptor의 동일 q/time에서 React와 string adapter가 path·dash·rect·opacity·clip 분기 모두 같음을 검사합니다. 0, boundary±epsilon, gate 끝±epsilon, .9999/1, pause/resume/reset을 포함합니다.
3. root가 IAB 실제520px에서 boundary 전/정확/후 및 첫 4%,10%,25% 모습을 비교합니다. 시작 nib이 같은 영역에서 희미해지는 현상을 **방향 성장으로 잘못 승인하지 않습니다**. 국내 필순과 start 위치·흐름을 따로 대조합니다.
4. 실제 앱 속도60Hz/가능시120Hz 재생과 느린8초 모드 양쪽을 관찰합니다. 실제 앱 autoPlay·pause/resume·replay에서 opacity가 되돌아가거나 이전 segment가 어두워지면 실패입니다.
5. 844는 독립 완료 fixture로 원본 tail clip 유지/제거를 같은 렌더러·viewport·DPR로 진단합니다. 99.99→100 형태 변화가 남으면 출처/renderer 보류 유지입니다. 시작 gate 성공과 합치지 않습니다.
6. 최종 완료 결과는 원본 whole과 동일해야 하며 원본 source 숫자/펜 경계가 맞지 않는885·889 등 후보는 게이트 성공과 무관하게 계속 보류합니다.

현재 source approval, native 승인, runtime 등록은 모두 하지 않았습니다. components/shared renderer/compiler/runtime 변경·빌드·커밋·private graphic 저장0. 이 연구 파일만 추가했습니다.

검사 입력 SHA:
```json
{
  "components/hanja/stroke-player.tsx": "c15831803ca9ea712e73b2fd4ce26227b384d9708dabf358e2315c5015a70001",
  "components/hanja/stroke-outlines.tsx": "207dc35705bd9f37af2688eab0fea491db3c38d09f650ca3e73514252046e7b8",
  "lib/hanja-stroke-outline.ts": "fb5e309e567de18fdeb19efdc200cd73cc8bce68934554be8d884b5b6e10ff44",
  "docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs": "a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09",
  "docs/hanja-goal-glyphwiki-batch844-2026-10-13/review.json": "379369f3323afad68910743a1d99c454a867c797ae16a241e44c49eba16286fe",
  "docs/hanja-goal-glyphwiki-batch846-2026-10-13/review.json": "8db8d2f905fdbacc3e39384e2be6b93764816bdeeaba7034df0674b87ff5d920",
  "docs/hanja-goal-glyphwiki-batch857-2026-10-13/review.json": "02ff30be0d5871124736afe49e635b64eb93589ce8906f69ac15c475bed3b47d",
  "docs/hanja-goal-glyphwiki-batch844-2026-10-13/native-pen10-render-difference-analysis.json": "8fbce25b1ffabe106e0cffe5036c8736ef61fe121392e05a0a7e399a59925a07"
}
```
