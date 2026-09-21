import assert from 'node:assert/strict'

// Only the line, quadratic and vertical-sweep forms actually used by this
// reviewed subset are supported. KAGE primitives are not generally pen strokes.
export function expandKage(source, { allowConnectionLines = false, allowBentStrokes = false, allowReviewedCurves = false, allowBoxLines = false } = {}) {
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
      assert([1, 2, 7].includes(type) || (allowBentStrokes && type === 3), 'Unsupported KAGE primitive')
      assert(values.every(Number.isFinite), 'Invalid KAGE coordinates')
      assert.equal(fields.length, type === 1 ? 7 : [2, 3].includes(type) ? 9 : 11)
      const [, head, tail] = values
      // KAGE line head/tail 2 means horizontal connection; 32 means vertical
      // connection (format revision 2). Only these reviewed axis-aligned forms
      // are opt-in. Hooks and corner forms remain unsupported.
      const connectedLine = allowConnectionLines && type === 1 && (
        (head === 2 && tail === 2 && values[4] === values[6])
        || (head === 32 && (tail === 0 || tail === 32) && values[3] === values[5])
        || (head === 0 && tail === 32 && values[3] === values[5])
      )
      const downRightBend = allowBentStrokes && type === 3 && head === 32 && tail === 0
        && values[3] === values[5] && values[6] === values[8]
        && values[4] < values[6] && values[5] < values[7]
      // Curve caps/connection codes reviewed for 葵; no hook codes admitted.
      // An upper-corner fragment is not a standalone pen stroke. The reviewed
      // grouping helper must validate its exact predecessor and shared point.
      const cornerLine = allowReviewedCurves && type === 1 && head === 0 && tail === 2
        && values[4] === values[6] && values[3] < values[5]
      const reviewedCurve = allowReviewedCurves && type === 2 && (
        (head === 7 && tail === 8) || ((head === 22 || head === 32) && tail === 7)
      )
      const boxLine = allowBoxLines && type === 1 && values[3] === values[5] && values[4] < values[6]
        && ((head === 12 && tail === 13) || (head === 22 && tail === 23))
      assert(type === 1 ? (head === 0 && tail === 0) || connectedLine || cornerLine || boxLine
        : type === 2 ? (head === 0 && tail === 7) || (head === 7 && tail === 0) || reviewedCurve
          : type === 3 ? downRightBend : head === 0 && tail === 7,
      'Unsupported head/tail shape: do not omit hooks or other source features')
      const points = []
      for (let i = 3; i < values.length; i += 2) {
        points.push([
          (values[i] * transform[0] + transform[2]) / 2,
          (values[i + 1] * transform[1] + transform[3]) / 2,
        ])
      }
      primitives.push({ type, points, source: name, sourceRow: index + 1,
        ...(allowReviewedCurves || allowBoxLines ? { head, tail } : {}) })
    }
  }
  visit(source.root)
  return primitives
}

export function kagePaths(source, order, options) {
  const primitives = expandKage(source, options)
  assert(!primitives.some(p => p.head === 22 || (p.head === 0 && p.tail === 2)),
    'KAGE upper corner requires explicit reviewed grouping')
  assert.deepEqual([...order].sort((a, b) => a - b),
    Array.from({ length: primitives.length }, (_, i) => i + 1),
    'Reviewed order must use each primitive exactly once')
  const point = p => p.map(value => Math.round(value * 1e6) / 1e6).join(' ')
  return order.map(index => {
    const { type, points } = primitives[index - 1]
    const start = 'M ' + point(points[0])
    if (type === 1) return start + ' L ' + point(points[1])
    if (type === 2) return start + ' Q ' + points.slice(1).map(point).join(' ')
    if (type === 3) {
      // KAGE 49232bac kagedf.js:202-237 uses a quadratic turn around the
      // declared corner. Its default kMage=10 (kage.js:410) becomes 5 here.
      // Only the reviewed down-right, non-hook form is accepted above.
      const [a, corner, end] = points
      const radius = 5
      assert(corner[1] - a[1] > radius && end[0] - corner[0] > radius,
        'KAGE bend legs are too short for the verified default corner')
      return start + ' L ' + point([corner[0], corner[1] - radius])
        + ' Q ' + point(corner) + ' ' + point([corner[0] + radius, corner[1]])
        + ' L ' + point(end)
    }
    return start + ' L ' + point(points[1]) + ' Q ' + points.slice(2).map(point).join(' ')
  })
}
