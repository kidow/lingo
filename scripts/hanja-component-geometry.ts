/**
 * Deterministic geometry helpers for research candidates, never Korean stroke-order approval.
 * Coordinates and reported distances use the app's 100-unit viewBox; nothing is
 * independently rescaled during comparison, so misplaced or undersized strokes still fail.
 */
export type Point = [number, number]
export type Box = { x: number; y: number; width: number; height: number }

type Segment = { command: 'M' | 'L' | 'Q' | 'C'; points: Point[] }
type Token = string | number
const ARITY = { M: 2, L: 2, Q: 4, C: 6 } as const
const CURVE_TOLERANCE = 0.01
const DIRECTION_TOLERANCE = 1e-9

function finitePoint(point: Point): Point {
  if (!point.every(Number.isFinite)) throw new Error('Nonfinite stroke coordinate')
  return point
}

/** Accept one open pen stroke only. A later M, Z, or unsupported command is an error. */
function parsePath(path: string): Segment[] {
  if (typeof path !== 'string' || !path.trim() || path.length > 100_000) {
    throw new Error('Invalid stroke path')
  }
  const tokens: Token[] = []
  const expression = /[MLQCmlqc]|[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/g
  let end = 0
  for (const match of path.matchAll(expression)) {
    const gap = path.slice(end, match.index)
    const command = /^[MLQCmlqc]$/.test(match[0])
    if (!/^\s*,?\s*$/.test(gap)
      || (gap.includes(',') && (!tokens.length || command || typeof tokens.at(-1) === 'string'))) {
      throw new Error('Malformed stroke path')
    }
    const token = command ? match[0] : Number(match[0])
    if (typeof token === 'number' && !Number.isFinite(token)) throw new Error('Nonfinite stroke coordinate')
    tokens.push(token)
    end = match.index + match[0].length
  }
  if (!/^\s*$/.test(path.slice(end))) throw new Error('Malformed stroke path')
  const segments: Segment[] = []
  let current: Point = [0, 0]
  let cursor = 0
  let active = ''
  while (cursor < tokens.length) {
    if (typeof tokens[cursor] === 'string') active = tokens[cursor++] as string
    const command = active.toUpperCase() as keyof typeof ARITY
    if (!Object.hasOwn(ARITY, command)) throw new Error('Missing stroke command')
    if ((!segments.length && command !== 'M') || (segments.length && command === 'M')) {
      throw new Error('A stroke must have exactly one initial M command')
    }
    const values = tokens.slice(cursor, cursor + ARITY[command])
    if (values.length !== ARITY[command] || values.some(value => typeof value !== 'number')) {
      throw new Error('Incomplete stroke command')
    }
    cursor += ARITY[command]
    const relative = active !== command
    const points: Point[] = []
    for (let index = 0; index < values.length; index += 2) {
      points.push(finitePoint([
        (values[index] as number) + (relative ? current[0] : 0),
        (values[index + 1] as number) + (relative ? current[1] : 0),
      ]))
    }
    segments.push({ command, points })
    if (segments.length > 4096) throw new Error('Stroke path exceeds segment limit')
    current = points.at(-1)!
    if (command === 'M') active = relative ? 'l' : 'L'
  }
  if (segments.length < 2) throw new Error('Stroke needs a drawing segment')
  return segments
}

function distance(a: Point, b: Point): number {
  const value = Math.hypot(a[0] - b[0], a[1] - b[1])
  if (!Number.isFinite(value)) throw new Error('Nonfinite stroke distance')
  return value
}

function lerp(a: Point, b: Point, fraction: number): Point {
  return finitePoint([a[0] * (1 - fraction) + b[0] * fraction, a[1] * (1 - fraction) + b[1] * fraction])
}

function bezier(points: Point[], fraction: number): Point {
  let layer = points
  while (layer.length > 1) layer = layer.slice(1).map((point, index) => lerp(layer[index], point, fraction))
  return layer[0]
}

function pointToSegment(point: Point, start: Point, end: Point): number {
  const length = distance(start, end)
  if (!length) return distance(point, start)
  const dx = (end[0] - start[0]) / length
  const dy = (end[1] - start[1]) / length
  const fraction = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / length))
  return distance(point, lerp(start, end, fraction))
}

/** Adaptive de Casteljau subdivision retains reversals, including collinear curves. */
function flattenCurve(points: Point[], output: Point[], depth = 0): void {
  if (output.length > 100_000) throw new Error('Stroke curve exceeds sampling limit')
  const start = points[0], end = points.at(-1)!
  const polygonLength = points.slice(1).reduce((sum, point, index) => sum + distance(points[index], point), 0)
  const flat = points.slice(1, -1).every(point => pointToSegment(point, start, end) <= CURVE_TOLERANCE)
    && polygonLength - distance(start, end) <= CURVE_TOLERANCE
  if (flat || depth === 16) {
    output.push(end)
    return
  }
  const left = [start], right = [end]
  let layer = points
  while (layer.length > 1) {
    layer = layer.slice(1).map((point, index) => lerp(layer[index], point, 0.5))
    left.push(layer[0])
    right.unshift(layer.at(-1)!)
  }
  flattenCurve(left, output, depth + 1)
  flattenCurve(right, output, depth + 1)
}

/** Equal-arclength samples of an adaptive polyline approximation, including both endpoints. */
export function samplePath(path: string, count = 32): Point[] {
  if (!Number.isInteger(count) || count < 2 || count > 4096) throw new Error('Invalid sample count')
  const segments = parsePath(path)
  const vertices = [segments[0].points[0]]
  for (const segment of segments.slice(1)) {
    if (segment.command === 'L') vertices.push(segment.points[0])
    else flattenCurve([vertices.at(-1)!, ...segment.points], vertices)
  }
  const lengths = [0]
  for (let index = 1; index < vertices.length; index++) {
    lengths.push(lengths[index - 1] + distance(vertices[index - 1], vertices[index]))
  }
  const total = lengths.at(-1)!
  if (!Number.isFinite(total) || total <= 0) throw new Error('Stroke must have positive finite length')
  let edge = 1
  return Array.from({ length: count }, (_, index) => {
    const target = index * total / (count - 1)
    while (edge < lengths.length - 1 && lengths[edge] <= target) edge++
    const span = lengths[edge] - lengths[edge - 1]
    return span ? lerp(vertices[edge - 1], vertices[edge], (target - lengths[edge - 1]) / span) : [...vertices[edge]]
  })
}

function extrema(points: Point[], axis: 0 | 1): number[] {
  const [p0, p1, p2, p3] = points.map(point => point[axis])
  if (points.length === 3) {
    const denominator = p0 - 2 * p1 + p2
    return denominator ? [(p0 - p1) / denominator] : []
  }
  if (points.length !== 4) return []
  const a = -p0 + 3 * p1 - 3 * p2 + p3
  const b = 2 * (p0 - 2 * p1 + p2)
  const c = p1 - p0
  if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? [] : [-c / b]
  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return []
  const root = Math.sqrt(discriminant)
  return [(-b + root) / (2 * a), (-b - root) / (2 * a)]
}

/** Exact line/Bezier centerline bounds, not the control-point hull or painted stroke width. */
export function bounds(paths: readonly string[]): Box {
  if (!paths.length) throw new Error('No stroke paths')
  const points: Point[] = []
  for (const path of paths) {
    const segments = parsePath(path)
    let current = segments[0].points[0]
    points.push(current)
    for (const segment of segments.slice(1)) {
      const curve = [current, ...segment.points]
      for (const fraction of [...extrema(curve, 0), ...extrema(curve, 1)]) {
        if (fraction > 0 && fraction < 1) points.push(bezier(curve, fraction))
      }
      current = segment.points.at(-1)!
      points.push(current)
    }
  }
  let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity
  for (const [x, y] of points) {
    left = Math.min(left, x); right = Math.max(right, x)
    top = Math.min(top, y); bottom = Math.max(bottom, y)
  }
  const result = { x: left, y: top, width: right - left, height: bottom - top }
  if (!Object.values(result).every(Number.isFinite)) throw new Error('Nonfinite stroke bounds')
  return result
}

/**
 * One component-wide axis-aligned affine transform; never merges or splits pen strokes.
 * A zero-extent source axis stays a line centered in that target dimension, using scale 1.
 * Positive source extents may not be collapsed to zero target size.
 */
export function fitPaths(paths: readonly string[], box: Box): {
  paths: string[]; sourceBox: Box; transform: { sx: number; sy: number; tx: number; ty: number }
} {
  if (!Object.values(box).every(Number.isFinite) || box.width < 0 || box.height < 0) {
    throw new Error('Invalid target box')
  }
  // Validate pen length as well as syntax before applying any transformation.
  for (const path of paths) samplePath(path, 2)
  const sourceBox = bounds(paths)
  if ((sourceBox.width && !box.width) || (sourceBox.height && !box.height)) {
    throw new Error('Target box would collapse a stroke axis')
  }
  const sx = sourceBox.width ? box.width / sourceBox.width : 1
  const sy = sourceBox.height ? box.height / sourceBox.height : 1
  const tx = box.x + (box.width - sourceBox.width * sx) / 2 - sourceBox.x * sx
  const ty = box.y + (box.height - sourceBox.height * sy) / 2 - sourceBox.y * sy
  if (![sx, sy, tx, ty].every(Number.isFinite)) throw new Error('Nonfinite affine transform')
  const format = (value: number) => Number(value.toFixed(9)).toString()
  const fitted = paths.map(path => parsePath(path).map(segment =>
    segment.command + segment.points.map(([x, y]) =>
      finitePoint([x * sx + tx, y * sy + ty]).map(format).join(' '),
    ).join(' '),
  ).join(' '))
  return { paths: fitted, sourceBox, transform: { sx, sy, tx, ty } }
}

function meanDistance(a: Point[], b: Point[], reverse = false): number {
  return a.reduce((sum, point, index) => sum + distance(point, b[reverse ? b.length - 1 - index : index]), 0) / a.length
}

/** Hungarian minimum-cost perfect matching. Equal choices prefer the lower column. */
function minimumAssignment(cost: number[][]): number[] {
  const size = cost.length
  const u = Array<number>(size + 1).fill(0), v = Array<number>(size + 1).fill(0)
  const p = Array<number>(size + 1).fill(0), way = Array<number>(size + 1).fill(0)
  for (let row = 1; row <= size; row++) {
    p[0] = row
    let column = 0
    const min = Array<number>(size + 1).fill(Infinity), used = Array<boolean>(size + 1).fill(false)
    do {
      used[column] = true
      const currentRow = p[column]
      let delta = Infinity, next = 0
      for (let candidate = 1; candidate <= size; candidate++) {
        if (used[candidate]) continue
        const reduced = cost[currentRow - 1][candidate - 1] - u[currentRow] - v[candidate]
        if (reduced < min[candidate]) { min[candidate] = reduced; way[candidate] = column }
        if (min[candidate] < delta) { delta = min[candidate]; next = candidate }
      }
      for (let candidate = 0; candidate <= size; candidate++) {
        if (used[candidate]) { u[p[candidate]] += delta; v[candidate] -= delta }
        else min[candidate] -= delta
      }
      column = next
    } while (p[column] !== 0)
    do {
      const previous = way[column]
      p[column] = p[previous]
      column = previous
    } while (column !== 0)
  }
  const assignment = Array<number>(size)
  for (let column = 1; column <= size; column++) assignment[p[column] - 1] = column - 1
  return assignment
}

export type PathComparison = {
  countMatch: boolean
  orderedMeanDistance: number | null
  unorderedMeanDistance: number | null
  assignment: number[]
  orderAgreement: number | null
  directionAgreement: number | null
  maxMeanDistance: number | null
}

/**
 * All distances are mean point errors in 100-unit coordinate space (not percentages).
 * orderedMeanDistance pairs same-index strokes in their original drawing directions.
 * unorderedMeanDistance and maxMeanDistance use minimum-cost 1:1 matching, allowing
 * reversal for SHAPE matching only. assignment[generatedIndex] is an expected index.
 * orderAgreement is the fraction of matches with unchanged index. directionAgreement
 * is the fraction whose forward error is strictly smaller than reversed error by 1e-9;
 * ambiguous ties are not agreement. Neither fraction certifies linguistic correctness.
 * Different counts or two empty arrays have null metrics and an empty assignment.
 */
export function comparePaths(generated: readonly string[], expected: readonly string[]): PathComparison {
  if (generated.length > 256 || expected.length > 256) throw new Error('Too many strokes for comparison')
  const a = generated.map(path => samplePath(path)), b = expected.map(path => samplePath(path))
  const countMatch = a.length === b.length
  if (!countMatch || !a.length) return {
    countMatch, orderedMeanDistance: null, unorderedMeanDistance: null, assignment: [],
    orderAgreement: null, directionAgreement: null, maxMeanDistance: null,
  }
  const forward = a.map(stroke => b.map(target => meanDistance(stroke, target)))
  const reversed = a.map(stroke => b.map(target => meanDistance(stroke, target, true)))
  const cost = forward.map((row, index) => row.map((value, column) => Math.min(value, reversed[index][column])))
  const assignment = minimumAssignment(cost)
  const assigned = assignment.map((column, row) => cost[row][column])
  return {
    countMatch,
    orderedMeanDistance: forward.reduce((sum, row, index) => sum + row[index], 0) / a.length,
    unorderedMeanDistance: assigned.reduce((sum, value) => sum + value, 0) / a.length,
    assignment,
    orderAgreement: assignment.filter((column, row) => column === row).length / a.length,
    directionAgreement: assignment.filter((column, row) => forward[row][column] + DIRECTION_TOLERANCE < reversed[row][column]).length / a.length,
    maxMeanDistance: Math.max(...assigned),
  }
}
