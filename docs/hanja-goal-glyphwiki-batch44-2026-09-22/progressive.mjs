import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'

// Candidate grouping; approval requires the complete domestic visual review.
export const sourceGroups = [[0],[1],[3],[2],[4],[6],[7,8],[9],[5]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,10)
  const segment = (polygons,direction,weight) => {
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    return {
      outline:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),
      // Timing-only normalization avoids JSON/JS bundlers spelling the same
      // source length with a different floating-point tail. Geometry is untouched.
      bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6,
    }
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    const calls=trace[index]
    assert.deepEqual(calls.flatMap(c=>c.polygons),proof.groups[index].polygons)
    return calls.flatMap((call,callIndex)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.equal(index,5);assert.equal(callIndex,1)
        assert.deepEqual(a,[152,171.95,152,181.95,142,181.95,1,14])
        assert.equal(call.polygons.length,2)
        assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[142,181.9],[142,175.9],[122,175.9],[122,178.9]])
        return [{...segment(call.polygons.slice(0,1),'curve',10),
          revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14},
          segment(call.polygons.slice(1),'left',10)]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
