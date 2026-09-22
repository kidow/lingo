import assert from 'node:assert/strict'

/** Preserve the union of independently filled source polygons in one SVG path. */
export function normalizedPolygonPath(polygons) {
  return polygons.map(p => {
    assert(p.length >= 3 && p.every(v => Number.isFinite(v.x) && Number.isFinite(v.y) && v.off === 0))
    const area = p.reduce((n,v,i) => { const next=p[(i+1)%p.length]; return n+v.x*next.y-next.x*v.y },0)
    assert(area !== 0)
    const vertices = area < 0 ? [p[0],...p.slice(1).reverse()] : p
    return vertices.map((v,i) => `${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z'
  }).join(' ')
}

/** Existing normalized coordinates: traversal changes only; never add or move a vertex. */
export function normalizedOutline(outline) {
  return outline.split(' Z').map(p => p.trim()).filter(Boolean).map(path => {
    const points=[...path.matchAll(/[ML](-?[0-9.]+) (-?[0-9.]+)/g)].map(m=>({x:Number(m[1])*2,y:Number(m[2])*2,off:0}))
    assert.equal(points.length,(path.match(/[ML]/g)||[]).length)
    return normalizedPolygonPath([points])
  }).join(' ')
}
