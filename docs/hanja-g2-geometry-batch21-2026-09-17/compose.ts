/** Component candidates are geometry inputs only; whole-glyph review is mandatory. */
import { createHash } from 'node:crypto'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export type DictionaryComponent = {
  glyph: string; corpus: 'MM'; sourceSha256: string; medians: number[][][]
  originalMediansSha256: string; targetBox: [number, number, number, number]
}
export function compose(parts: readonly DictionaryComponent[]): number[][][] {
  return parts.flatMap(part => {
    if (hash(part.medians) !== part.originalMediansSha256) throw Error('Component medians mismatch')
    const [left, top, width, height] = part.targetBox
    if (part.targetBox.length !== 4 || !part.targetBox.every(Number.isFinite) || width <= 0 || height <= 0) throw Error('Component target box invalid')
    const normalized = normalizeMedians(part.medians).map(path => [...path.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]]))
    const points = normalized.flat(), xs = points.map(p => p[0]), ys = points.map(p => p[1])
    const minX = Math.min(...xs), minY = Math.min(...ys), dx = Math.max(...xs) - minX, dy = Math.max(...ys) - minY
    if (!dx || !dy) throw Error('Component extent invalid')
    return normalized.map(stroke => stroke.map(([x, y]) => [
      Math.round((left + (x - minX) * width / dx) * 1000) / 100,
      Math.round((100 - top - (y - minY) * height / dy) * 1000) / 100,
    ]))
  })
}
