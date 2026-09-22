import assert from 'node:assert/strict'

// Compile captured public drawing geometry, never private dictionary graphics.
// Rectangles reveal axis-aligned source bodies. The one curved corner follows
// its original quadratic command. The terminal polygon reveals upward.
export function compileProgressive(trace, proof) {
  assert.equal(trace.length, proof.groups.length)
  const path = polygons => polygons.map(points => points.map((p, i) =>
    `${i ? 'L' : 'M'}${p.x / 2} ${p.y / 2}`).join(' ') + ' Z').join(' ')
  const bounds = polygons => {
    const points = polygons.flat()
    const xs = points.map(p => p.x / 2), ys = points.map(p => p.y / 2)
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  }
  const segment = (polygons, direction, weight) => ({
    outline: path(polygons), bounds: bounds(polygons), direction, weight,
  })
  return proof.sourceGroups.map(indices => indices.flatMap(index => {
    const calls = trace[index]
    assert.deepEqual(calls.flatMap(c => c.polygons), proof.groups[index].polygons)
    return calls.flatMap((call, callIndex) => {
      const a = call.args
      if (call.kind === 'cdDrawCurve') {
        assert.equal(index, 8); assert.equal(callIndex, 1)
        assert.deepEqual(a, [42, 168.82, 42, 178.82, 52, 178.82, 1, 1])
        // Width covers the original corner polygons; it does not alter them.
        return [{ ...segment(call.polygons, 'curve', 10),
          revealPath: `M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,
          revealWidth: 14,
        }]
      }
      assert.equal(call.kind, 'cdDrawLine')
      const [x1, y1, x2, y2] = a
      assert(x1 === x2 || y1 === y2)
      const direction = x1 === x2 ? (y2 > y1 ? 'down' : 'up') : (x2 > x1 ? 'right' : 'left')
      if (index === 8 && callIndex === 2) {
        assert.deepEqual(a, [52,178.82,176,178.82,6,5])
        assert.equal(call.polygons.length,3)
        assert.deepEqual(call.polygons[2],proof.groups[8].polygons[6])
        return [segment(call.polygons.slice(0,2),direction,Math.abs(x2-x1)/2),
          segment(call.polygons.slice(2),'up',12.5)]
      }
      return [segment(call.polygons,direction,Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}

export function renderProgressive(strokes, stroke, progress, prefix = 'reveal') {
  const all = strokes.map(s => s.map(p => `<path d="${p.outline}"/>`).join(''))
  const current = strokes[stroke-1]
  const weight = current.reduce((n,s) => n+s.weight,0)
  let elapsed = Math.max(0,Math.min(1,progress))*weight
  const pieces = current.map((s,i) => {
    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight
    if (p === 0) return ''
    if (p === 1) return `<path d="${s.outline}"/>`
    const id = `${prefix}-${stroke}-${i}`
    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y
    if (s.direction === 'curve') return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1-p}"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`
    const horizontal = s.direction === 'right' || s.direction === 'left'
    const rx = s.direction === 'left' ? right-width*p : x
    const ry = s.direction === 'up' ? bottom-height*p : y
    return `<defs><clipPath id="${id}"><rect x="${rx}" y="${ry}" width="${horizontal?width*p:width}" height="${horizontal?height:height*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`
  }).join('')
  return `<svg viewBox="0 0 100 100"><g fill="#222">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`
}
