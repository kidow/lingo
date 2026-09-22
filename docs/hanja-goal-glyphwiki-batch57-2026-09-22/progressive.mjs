import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[1],[2],[0],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]]
const CURVES = {
  "1:0": [
    27.08,
    56,
    24.32,
    86,
    16.04,
    99,
    7,
    8
  ],
  "2:0": [
    49.85,
    53,
    62.27,
    68,
    66.41,
    85,
    7,
    8
  ],
  "9:1": [
    96.05,
    98.9,
    96.05,
    108.9,
    106.05,
    108.9,
    1,
    1
  ],
  "10:1": [
    97.1,
    146.97,
    96.05,
    176.94,
    51.95,
    188.28,
    1,
    7
  ],
  "12:1": [
    158,
    169.37,
    158,
    179.37,
    168,
    179.37,
    1,
    1
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
        return [{...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      if(index===12&&j===2){
        assert.deepEqual(a,[168,179.37,182.15,179.37,6,5])
        assert.equal(call.polygons.length,3)
        assert.deepEqual(call.polygons[2].map(p=>[p.x,p.y]),[[182.1,173.3],[184.1,148.3],[182.1,148.3],[176.1,173.3]])
        return [segment(call.polygons.slice(0,2),'right',(x2-x1)/2),segment(call.polygons.slice(2),'up',(173.3-148.3)/2)]
      }
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
