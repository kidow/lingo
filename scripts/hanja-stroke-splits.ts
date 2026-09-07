/** Individually reviewed against f37.hwp; never infer membership from a shared radical. */
type SplitRecipe = {
  id: 'official-grass-v1' | 'official-seong-v1'
  image: string
  row: number
  originalCount: number
  /** X coordinates in the already normalized square; remove the bridge between the two crosses. */
  gap?: readonly [number, number]
}

export const SPLIT_CORRECTIONS: Readonly<Record<string, SplitRecipe>> = {
  成: { id: 'official-seong-v1', image: 'BIN002A.gif', row: 19, originalCount: 6 },
  萬: { id: 'official-grass-v1', image: 'BIN000A.gif', row: 4, originalCount: 12, gap: [46, 53] },
  草: { id: 'official-grass-v1', image: 'BIN000D.gif', row: 7, originalCount: 9, gap: [45, 51] },
  花: { id: 'official-grass-v1', image: 'BIN000F.gif', row: 10, originalCount: 7, gap: [46, 54] },
  藥: { id: 'official-grass-v1', image: 'BIN0002.gif', row: 18, originalCount: 18, gap: [44, 52] },
  苦: { id: 'official-grass-v1', image: 'BIN0008.gif', row: 8, originalCount: 8, gap: [42, 52] },
  英: { id: 'official-grass-v1', image: 'BIN000B.gif', row: 8, originalCount: 8, gap: [44, 53] },
  敬: { id: 'official-grass-v1', image: 'BIN0008.gif', row: 1, originalCount: 12, gap: [30, 36] },
  觀: { id: 'official-grass-v1', image: 'BIN0008.gif', row: 23, originalCount: 24, gap: [33, 38] },
  舊: { id: 'official-grass-v1', image: 'BIN0009.gif', row: 12, originalCount: 17, gap: [46, 54] },
  落: { id: 'official-grass-v1', image: 'BIN0004.gif', row: 24, originalCount: 12, gap: [40, 49] },
  葉: { id: 'official-grass-v1', image: 'BIN000B.gif', row: 6, originalCount: 12, gap: [42, 51] },
}

function points(path: string): number[][] {
  if (!/^M-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?(?: L-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?)+$/.test(path)) {
    throw new Error('Expected normalized M/L centerline')
  }
  return path.split(/[ML]/).slice(1).map((pair) => pair.trim().split(' ').map(Number))
}

function encode(points: number[][]): string {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
}

function splitCrosses(path: string, [leftEnd, rightStart]: readonly [number, number]) {
  const p = points(path)
  if (p.some(([x], i) => i > 0 && x <= p[i - 1][0])
    || !(p[0][0] < leftEnd && leftEnd < rightStart && rightStart < p.at(-1)![0])) {
    throw new Error('Invalid reviewed horizontal split')
  }
  const at = (x: number) => {
    const i = p.findIndex(([px]) => px >= x)
    const [ax, ay] = p[i - 1], [bx, by] = p[i]
    return [x, Math.round((ay + (by - ay) * (x - ax) / (bx - ax)) * 10) / 10]
  }
  return [encode([...p.filter(([x]) => x < leftEnd), at(leftEnd)]),
    encode([at(rightStart), ...p.filter(([x]) => x > rightStart)])]
}

/** Input must first be normalized from the hash-pinned Ko corpus. */
export function applyReviewedSplit(glyph: string, original: readonly string[]) {
  const recipe = SPLIT_CORRECTIONS[glyph]
  if (!recipe || original.length !== recipe.originalCount) throw new Error(`Unreviewed split/count: ${glyph}`)
  if (recipe.id === 'official-seong-v1') {
    const inner = points(original[2])
    if (inner.length !== 6) throw new Error('Changed 成 inner stroke')
    return { paths: [original[1], original[0], encode(inner.slice(0, 3)), encode(inner.slice(2)), ...original.slice(3)],
      mapping: [2, 1, 3, 3, 4, 5, 6] }
  }
  const [left, right] = splitCrosses(original[0], recipe.gap!)
  return { paths: [left, original[1], right, original[2], ...original.slice(3)],
    mapping: [1, 2, 1, 3, ...original.slice(3).map((_, index) => index + 4)] }
}
