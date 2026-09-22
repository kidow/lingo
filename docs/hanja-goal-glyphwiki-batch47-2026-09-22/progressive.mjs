import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[7],[9],[8],[10,11],[12]]
const CURVES = {
  "7:1": [
    59,
    171.32,
    59,
    181.32,
    49,
    181.32,
    1,
    214
  ],
  "8:0": [
    73,
    133.8,
    91,
    144.6,
    99,
    166.92,
    7,
    8
  ],
  "9:0": [
    37,
    134.51999999999998,
    28,
    158.28,
    14,
    174.84,
    0,
    7
  ],
  "11:0": [
    175.7,
    75.48,
    160.4,
    161.88,
    77.6,
    187.08,
    22,
    7
  ],
  "12:0": [
    115.4,
    75.48,
    125.3,
    155.4,
    183.8,
    181.32,
    7,
    0
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,13)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    return {outline:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        const hook=index===7
        if(hook){assert.equal(call.polygons.length,2);assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[49,181.3],[49,175.3],[33,175.3],[33,178.3]])}
        const curve={...segment(hook?call.polygons.slice(0,1):call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
        return hook?[curve,segment(call.polygons.slice(1),'left',8)]:[curve]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
