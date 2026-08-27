/**
 * 결정적 난수.
 *
 * 보기 순서를 Math.random으로 섞으면 서버와 클라이언트가 다른 순서를 내서
 * 하이드레이션이 깨진다. 시드를 주면 양쪽이 같은 결과를 낸다. 덤으로
 * 재현 가능해서 디버깅도 쉽다.
 */

export function hashString(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 — 작고 분포가 고르다 */
export function makeRng(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function sample<T>(items: readonly T[], count: number, rng: () => number): T[] {
  return shuffled(items, rng).slice(0, count)
}
