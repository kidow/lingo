/** Filled source geometry with explicitly reviewed reveal directions. */
export type HanjaOutlineSegment = {
  outline: string
  bounds: readonly number[]
  direction: 'right' | 'left' | 'down' | 'up' | 'curve'
  weight: number
  revealPath?: string
  revealWidth?: number
  /** Optional source-space mask placement; the filled outline is already placed. */
  revealTransform?: string
  /** Source-space start aperture, released when the padded guide reaches its first source point. */
  revealStartGate?: {
    unit: readonly [number, number]
    minProjection: number
    firstProjection: number
    padding: number
    until: number
    bounds: readonly [number, number, number, number]
  }
}
export type HanjaOutlineStrokes = readonly (readonly HanjaOutlineSegment[])[]

/** Undefined releases the gate; an empty polygon fails closed for invalid gate data. */
export function outlineStartClip(segment: HanjaOutlineSegment, progress: number): string | undefined {
  const gate = segment.revealStartGate
  if (!gate) return undefined
  if (!Array.isArray(gate.unit) || gate.unit.length !== 2 || !Array.isArray(gate.bounds) || gate.bounds.length !== 4) return ''
  const [ux, uy] = gate.unit
  const [x, y, right, bottom] = gate.bounds
  if (![ux, uy, x, y, right, bottom, gate.minProjection, gate.firstProjection, gate.padding, gate.until, progress].every(Number.isFinite)
    || Math.abs(Math.hypot(ux, uy) - 1) > 1e-8 || right <= x || bottom <= y
    || gate.padding <= 0 || gate.until <= 0 || gate.until >= 1
    || gate.minProjection >= gate.firstProjection + gate.padding) return ''
  if (progress >= gate.until) return undefined
  const cut = gate.minProjection + (gate.firstProjection + gate.padding - gate.minProjection)
    * Math.max(0, progress) / gate.until
  const rectangle = [[x, y], [right, y], [right, bottom], [x, bottom]]
  const result: number[][] = []
  let previous = rectangle[rectangle.length - 1]
  let previousDistance = previous[0] * ux + previous[1] * uy - cut
  for (const current of rectangle) {
    const distance = current[0] * ux + current[1] * uy - cut
    if ((previousDistance <= 0) !== (distance <= 0)) {
      const t = previousDistance / (previousDistance - distance)
      result.push([previous[0] + t * (current[0] - previous[0]), previous[1] + t * (current[1] - previous[1])])
    }
    if (distance <= 0) result.push(current)
    previous = current
    previousDistance = distance
  }
  return result.map(point => point.join(',')).join(' ')
}

export function outlineSegmentProgress(segments: readonly HanjaOutlineSegment[], progress: number) {
  if (progress >= 1) return segments.map(() => 1)
  if (progress <= 0) return segments.map(() => 0)
  let remaining = Math.max(0, Math.min(1, progress)) * segments.reduce((sum, s) => sum + s.weight, 0)
  return segments.map(segment => {
    const value = Math.max(0, Math.min(1, remaining / segment.weight))
    remaining -= segment.weight
    return value
  })
}

export function outlineClip(segment: HanjaOutlineSegment, progress: number) {
  const p = Math.max(0, Math.min(1, progress))
  const [x, y, right, bottom] = segment.bounds
  const width = right - x, height = bottom - y
  const horizontal = segment.direction === 'right' || segment.direction === 'left'
  return {
    x: segment.direction === 'left' ? right - width * p : x,
    y: segment.direction === 'up' ? bottom - height * p : y,
    width: horizontal ? width * p : width,
    height: horizontal ? height : height * p,
  }
}
