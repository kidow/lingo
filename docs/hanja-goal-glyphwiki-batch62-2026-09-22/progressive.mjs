import assert from 'node:assert/strict'
import { normalizedPolygonPath } from '../hanja-goal-outline-winding-2026-09-22/normalize.mjs'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4,5],[6],[7,8],[9]]
const CURVES = {
  "2:0": [
    14.6,
    157,
    38.96,
    148,
    75.92,
    129,
    0,
    7
  ],
  "5:1": [
    176.99200000000002,
    170,
    176.99200000000002,
    180,
    166.99200000000002,
    180,
    1,
    114
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,10)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    return {outline:normalizedPolygonPath(polygons),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        const hook=index===5
        if(hook){assert.equal(call.polygons.length,2);assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[166.9,180],[166.9,174],[148.9,174],[148.9,177]])}
        const curve={...segment(hook?call.polygons.slice(0,1):call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
        return hook?[curve,segment(call.polygons.slice(1),'left',9)]:[curve]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
