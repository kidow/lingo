import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[11],[12,13],[4],[5],[6],[7],[8,9],[10]]
const CURVES = {
  "4:0": [
    72,
    76,
    60,
    99,
    42,
    115,
    0,
    7
  ],
  "11:0": [
    57,
    47,
    45,
    88,
    16,
    119,
    0,
    7
  ],
  "13:0": [
    167,
    69,
    168,
    168,
    154.60932767758425,
    179.1588936020131,
    22,
    1
  ],
  "13:1": [
    154.60932767758425,
    179.1588936020131,
    150,
    183,
    138,
    180,
    1,
    0
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,14)
  assert.equal(proof.engineConstructorSize,1)
  assert.equal(proof.engineStyle,'gothic')
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
    return {outline:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].map((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        return {...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      return segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)
    })
  }))
}
