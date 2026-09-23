/**
 * **그림 프롬프트를 소품 낱말로 끊는다.**
 *
 * `scripts/props.ts`가 쓰던 것을 그대로 옮겨 왔다. `scripts/queue.ts`가 회차
 * 안의 소품 겹침을 찍으면서 둘이 나눠 쓴다 — 불용어를 한쪽만 고치면 같은
 * 프롬프트를 두 도구가 달리 읽는다.
 *
 * **문턱은 실측으로 잡혔다** (2026-09-09, 프롬프트 6,748장). 0.6%보다 흔한
 * 낱말은 소품이 아니라 장면을 받치는 바닥이다 — `folded`·`wall`·`paper`가
 * 그쪽이고 `cord`·`dial`·`stool`이 이쪽이다.
 */

/** 프롬프트를 낱말로 끊는다. 소품이 아닌 것은 여기서 떨어진다 */
export const STOP = new Set(
  `a an the one two three four five and or of on in at to from with without into onto over under
   above below beside behind between across along around near next by for its their his her
   seen from front side above below back top bottom left right angle slight three-quarter
   plain blank empty small large tall short long wide narrow round square flat thick thin
   dark light pale soft hard bright muted no not facial features background surface simple
   single lying standing sitting hanging resting holding placed set laid propped tucked
   figure figures person people hand hands foot feet head body arm arms leg legs
   this that these those it is are was were be been being as if then than so such
   view close closed open opened upright downward upward forward back mid same other another
   each every all both few many some more most less least own`
    .split(/\s+/)
    .filter(Boolean),
)

export const propWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))

/** 이보다 흔하면 소품으로 안 센다 (프롬프트 가운데 차지하는 비율) */
export const COMMON = 0.006
