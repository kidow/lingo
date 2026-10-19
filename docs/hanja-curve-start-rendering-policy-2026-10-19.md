# 곡선 시작 stamp의 렌더링 정책 검토

2026-10-19. 격리 설계 근거이며 구현·native 승인·runtime 적용은 아니다. 원 polygon, source 좌표, outline, guide, 폭, weight, 획 순서와 모든 과거 HOLD는 고정한다. 앱·공유 renderer를 수정하지 않았다.

## 현재 검토용 renderer와 앱의 대조

- [shared43 progressive.mjs](hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs), `renderProgressive` 48행부터: local p=0은 빈 문자열, p=1은 unmasked 전체 outline. 0<p<1의 curve는 원 outline에 `stroke-width=revealWidth`, `stroke-linecap=round`, `pathLength=1`, `stroke-dasharray="p 2"`인 guide 마스크를 적용한다. Cardinal은 원 bounds 직사각형의 폭/높이를 p에 따라 연속 확장한다.
- [stroke-player.tsx](../components/hanja/stroke-player.tsx) 167행의 filled-outline 경로는 `StrokeOutlines`를 사용한다. [stroke-outlines.tsx](../components/hanja/stroke-outlines.tsx) 31–51행은 p<=0 숨김/p>=1 unmasked 전체 outline, 양수 curve는 같은 round-cap·dash 마스크를 사용한다. [hanja-stroke-outline.ts](../lib/hanja-stroke-outline.ts) 12행과 23행은 같은 weight 비례 local-progress와 cardinal clipping 수식이다.
- 따라서 **filled-outline의 핵심 노출 정책은 일치**한다. 전체 구현이 동일한 것은 아니다. 앱은 React/useId, Animation clock, 획 간격·정지·수동·idle/done 상태를 사용하고, shared43은 요청받은 한 획의 진행률을 즉시 문자열 SVG로 만든다. 앱의 outline 없는 fallback은 centerline 자체를 dashoffset으로 그리므로 이번 filled-polygon 검토와 별도다.

읽은 파일 SHA256:

| 파일 | SHA256 |
|---|---|
| shared43 progressive.mjs | `a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09` |
| stroke-player.tsx | `c15831803ca9ea712e73b2fd4ce26227b384d9708dabf358e2315c5015a70001` |
| stroke-outlines.tsx | `207dc35705bd9f37af2688eab0fea491db3c38d09f650ca3e73514252046e7b8` |
| hanja-stroke-outline.ts | `fb5e309e567de18fdeb19efdc200cd73cc8bce68934554be8d884b5b6e10ff44` |

## 0에서 유한 면적이 생기는 조건

한 mask의 원 polygon 합집합을 P, 고정 guide를 호길이로 매개화한 C(s), 전체 길이를 L, 고정 반폭을 r=revealWidth/2라 한다. 둥근 cap의 이상적인 노출 집합은 다음과 같다. SVG의 alpha/antialias 경계는 별도로 검토해야 한다.

`W(p) = ⋃{ B(C(s), r) : 0 <= s <= pL }`, `0 < p < 1`.

현재 노출은 `P ∩ W(p)`이며 코드가 p=0에서만 이를 비운다. p→0+의 집합은 시작점 q=C(0)의 원판으로 수렴하므로, `area(P ∩ B(q,r)) > 0`이면 시작 원형 footprint가 유한 면적으로 즉시 노출될 수 있다. 단순히 epsilon에서 잉크가 있다는 것과 이 유한 면적 불연속은 다르다.

실제 root 관찰은 별도 증거다: [棖 HOLD](hanja-native-hold-u68d6-2026-10-19.md), [粻 HOLD](hanja-native-hold-u7cbb-2026-10-19.md)는 V→Q 두 번째 mask에서 약15px 시작 조각을 보고했다. [穧 HOLD](hanja-source-native-hold-u7a67-vq-activation-2026-10-19/README.md)는 VQ14 경계, [縐 HOLD](hanja-source-native-hold-u7e10-qq-activation-2026-10-19/README.md)는 QQ1 경계 및 epsilon의 유한 footprint를 기록한다. 같은 원인을 각 DOM에서 확정한 것은 아니며, 픽셀값을 이 수식에서 계산했다고 주장하지 않는다.

## 제안의 정확한 범위

새 렌더링의 목표 집합은 다음이다.

`R(p) = P ∩ W(p) ∩ G(p)`.

G는 **nested start gate**이며 `p1<=p2 ⇒ G(p1)⊆G(p2)`여야 한다. 목표는 `lim(p→0+) area(R(p))=0`, 진행 중 양의 면적 jump 없음, 완료 직전 원형 coverage다. 표시용 gate가 source polygon/path/폭/필순을 새로 만드는 것은 아니지만, 기존 노출 방식과 다른 **새 표시 정책**임을 명시해야 한다.

원 시작 접선이 정칙일 때 `v=C'(0)/|C'(0)|`를 원 args에서 얻고 `u(x)=<x-q,v>`로 둔다. `a=min(x∈P)u(x)`, `b=max(x∈P)u(x)`는 **원 polygon 전체**에서 구한다. `G(p)={x:u(x)<=h(p)}`이고 연속·비감소 h가 h(0)=a에서 시작하면, P와 gate의 교집합은 폭이0으로 줄어드는 strip 안에 있으므로 면적은0으로 수렴한다. W와 G가 nested이면 R도 nested다. 이 반평면 수식은 cardinal bounds clipping과 같은 종류의 연속 면적 노출이며, 구현 완료나 서예 동작의 적합성을 증명하지는 않는다.

전체 곡선에 단일 투영 gate를 끝까지 적용하면 접선 뒤로 되돌아오는 원 guide의 노출을 지연시킬 수 있다. 더 국소적인 연구안은 시작 footprint `S=P∩B(q,r)`에만 gate를 적용하는 `G(p)=(ℝ²\S) ∪ (S∩{u<=h(p)})`이다. 이때 a,b도 원 S의 투영 범위로 정한다. 이 역시 수학적 후보이며 mask alpha 조합·경계·회전·퇴화 접선은 미검증이다.

gate를 완전히 여는 시각 τ와 h의 시간 배분은 **미결정**이다. τ=0.1 같은 임의 상수, 임의 시작 좌표, 폭 확대, 원 head 삭제에는 근거가 없다. 원 guide의 진행 및 원 footprint 범위를 이용한 종료 조건과 weight 시간 배분을 별도로 정당화해야 한다. `h(p)=a+(b-a)p`는 연속성의 존재 예일 뿐, 곡선의 국소 방향을 보존하는 채택 정책이 아니다. 접선이0이거나 정칙하지 않으면 임의 방향을 만들지 않고 대상 guard를 보류한다.

## 완료 coverage와 단순 butt-cap의 한계

시작 gate를 완료 전에 모두 열더라도 필요조건은 `P ⊆ W(1)`이다. 원 head/foot/tail polygon이 고정폭 guide sweep 밖에 있으면 시작 개선만으로는 이를 덮지 못한다. 현재 p=1의 unmask 분기가 그 누락을 마지막 순간 복원할 수 있으므로, **전체 coverage 미충족은 별도 HOLD**다. 원형을 줄이거나 100%에서 잔여 영역을 몰아서 보이는 방식은 해법이 아니다.

필요한 완료 조건은 `lim(p→1-) area(P\R(p))=0` 및 원 polygon 전체의 coverage다. 99.99%와100%의 모든 픽셀이 반드시 같아야 한다는 수학적 주장은 하지 않는다. subpixel clipping·antialias와 유한 면적의 새 stamp를 구분하되, 그 차이를 실제 마지막 프레임 누락을 면제하는 데 사용하지 않는다.

round를 butt로 바꾸기만 하면 시작 접선 뒤의 원 font head나 끝 장식이 sweep에서 누락될 수 있다. 따라서 butt는 0면적 시작만 보고 채택할 수 없다. [batch831](hanja-goal-glyphwiki-batch831-2026-10-13/progressive.mjs)의 특정 V13+H fullbounds 분할과 기존979 terminal15 quad 분할도 원 primitive/정확 guard가 있는 전용 정책이다. terminal7 Q 시작 head에 자동 일반화할 검증 선례가 아니다.

## 후속 검증 조건과 승인 경계

1. 실제 오른쪽 candidate의 mask id/local p 및 원 polygon을 결박한다. middle baseline pop과 혼동하지 않는다.
2. 원 filled geometry·필순·source args·guide·폭·weight는 해시/참조로 고정한다. renderer 정책만 별도 실험한다.
3. 0면적 극한·nested inclusion·연속 면적·비퇴화 접선·gate 종료의 source 근거·완료 coverage를 검증한다. 여러 작은 p와 경계 전후를 보되 epsilon 무조건 빈 화면을 정상 진행의 정의로 삼지 않는다.
4. 모든 mask 경계, 99.99/100, coarse, 자연재생, full whole/order를 fresh root에서 검토한다. 기존 outline/필순 승인을 새 노출 정책 승인으로 승계하지 않는다.
5. 앱 filled-outline와 helper의 동일 정책 구현 여부, alpha-mask/clip 좌표계와 표시 크기를 대조한다. 일반 fallback centerline 경로는 별도 범위다.

이번 작업은 코드 읽기와 설계 문서1개 저장만 수행했다. sourcegeometry/compiler/engine/test/build/UI/server/runtime/registry/Git 변경0. 수식은 위 로컬 구현과 집합 정의에 근거한 설계이며, 외부 자료·비밀값 전송0이다.
