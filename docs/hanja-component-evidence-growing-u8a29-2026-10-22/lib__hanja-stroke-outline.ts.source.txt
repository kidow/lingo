/** Filled source geometry with explicitly reviewed reveal directions. */
export type HanjaOutlineSegment = {
  outline: string
  bounds: readonly number[]
  direction: 'right' | 'left' | 'down' | 'up' | 'curve'
  weight: number
  revealPath?: string
  revealWidth?: number
}
export type HanjaOutlineStrokes = readonly (readonly HanjaOutlineSegment[])[]

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
