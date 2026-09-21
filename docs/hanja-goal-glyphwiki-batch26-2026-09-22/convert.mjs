import assert from 'node:assert/strict'

// Only the line, quadratic and vertical-sweep forms actually used by this
// reviewed subset are supported. KAGE primitives are not generally pen strokes.
export function expandKage(source) {
  const primitives = []
  function visit(name, transform = [1, 1, 0, 0], ancestry = []) {
    assert(!ancestry.includes(name), 'Cyclic KAGE reference')
    assert(ancestry.length < 16, 'KAGE dependency depth exceeded')
    const record = source.records[name]
    assert(record && typeof record.data === 'string', 'Missing KAGE record')
    for (const [index, row] of record.data.split('$').entries()) {
      const fields = row.split(':')
      const type = Number(fields[0])
      const values = fields.map(Number)
      if (type === 99) {
        assert([8, 11].includes(fields.length), 'Unsupported reference format')
        assert(values.slice(0, 7).every(Number.isFinite))
        assert(values[1] === 0 && values[2] === 0
          && (fields.length === 8 || (values[9] === 0 && values[10] === 0)),
        'KAGE stretch requires a separately verified implementation')
        const [, , , x0, y0, x1, y1] = values
        assert(x1 > x0 && y1 > y0, 'Invalid KAGE component rectangle')
        visit(fields[7], [
          transform[0] * (x1 - x0) / 200,
          transform[1] * (y1 - y0) / 200,
          transform[0] * x0 + transform[2],
          transform[1] * y0 + transform[3],
        ], [...ancestry, name])
        continue
      }
      assert([1, 2, 7].includes(type), 'Unsupported KAGE primitive')
      assert(values.every(Number.isFinite), 'Invalid KAGE coordinates')
      assert.equal(fields.length, type === 1 ? 7 : type === 2 ? 9 : 11)
      const [, head, tail] = values
      assert(type === 1 ? head === 0 && tail === 0
        : type === 2 ? (head === 0 && tail === 7) || (head === 7 && tail === 0)
          : head === 0 && tail === 7,
      'Unsupported head/tail shape: do not omit hooks or other source features')
      const points = []
      for (let i = 3; i < values.length; i += 2) {
        points.push([
          (values[i] * transform[0] + transform[2]) / 2,
          (values[i + 1] * transform[1] + transform[3]) / 2,
        ])
      }
      primitives.push({ type, points, source: name, sourceRow: index + 1 })
    }
  }
  visit(source.root)
  return primitives
}

export function kagePaths(source, order) {
  const primitives = expandKage(source)
  assert.deepEqual([...order].sort((a, b) => a - b),
    Array.from({ length: primitives.length }, (_, i) => i + 1),
    'Reviewed order must use each primitive exactly once')
  const point = p => p.map(value => Math.round(value * 1e6) / 1e6).join(' ')
  return order.map(index => {
    const { type, points } = primitives[index - 1]
    const start = 'M ' + point(points[0])
    if (type === 1) return start + ' L ' + point(points[1])
    if (type === 2) return start + ' Q ' + points.slice(1).map(point).join(' ')
    return start + ' L ' + point(points[1]) + ' Q ' + points.slice(2).map(point).join(' ')
  })
}
