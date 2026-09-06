/** Preserve every candidate point and stroke boundary; only fit the glyph to a 100-unit square. */
export function normalizeMedians(medians: readonly (readonly (readonly number[])[])[]): string[] {
  const points = medians.flat()
  if (!points.length || medians.some((stroke) => stroke.length < 2)
    || points.some((point) => point.length !== 2 || !point.every(Number.isFinite))) {
    throw new Error('Invalid stroke medians')
  }
  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => -y)
  const left = Math.min(...xs), right = Math.max(...xs)
  const top = Math.min(...ys), bottom = Math.max(...ys)
  const extent = Math.max(right - left, bottom - top)
  if (!extent) throw new Error('Empty stroke extent')
  const scale = 80 / extent
  const round = (n: number) => Math.round(n * 10) / 10
  return medians.map((stroke) => stroke.map(([x, y], i) =>
    `${i ? 'L' : 'M'}${round(50 + (x - (left + right) / 2) * scale)} ${round(50 + (-y - (top + bottom) / 2) * scale)}`,
  ).join(' '))
}
