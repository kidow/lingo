import assert from 'node:assert/strict'
import { normalizedPolygonPath } from '../hanja-goal-outline-winding-2026-09-22/normalize.mjs'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4,5],[6]]
const CURVES = {
  "0:0": [
    93.275,
    24,
    66.625,
    33,
    33.825,
    39,
    0,
    7
  ],
  "1:1": [
    33.825,
    98,
    33.825,
    158,
    14.35,
    186,
    1,
    7
  ],
  "5:0": [
    175,
    65,
    175,
    153,
    164.4027759787463,
    171.3413492675545,
    22,
    0
  ],
  "5:1": [
    164.4027759787463,
    171.3413492675545,
    159.4,
    180,
    149.4,
    180,
    2,
    214
  ],
  "6:1": [
    137.56,
    64,
    137.56,
    159,
    88.68,
    188,
    1,
    7
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,7)
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
        const hook=index===5 && j===1
        if(hook){assert.equal(call.polygons.length,2);assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[149.4,180],[149.4,174],[133.4,174],[133.4,177]])}
        const curve={...segment(hook?call.polygons.slice(0,1):call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
        return hook?[curve,segment(call.polygons.slice(1),'left',8)]:[curve]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
