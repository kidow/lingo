import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5,6],[7]]
const CURVES = {
  "4:1": [
    60,
    129,
    60,
    175.23,
    15,
    187.65,
    1,
    7
  ],
  "6:1": [
    136,
    168.68,
    136,
    178.68,
    146,
    178.68,
    1,
    1
  ],
  "7:0": [
    74,
    113.82,
    100,
    124.17,
    112,
    142.8,
    7,
    8
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,8)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    // Separate source polygons are filled independently. Normalize winding before
    // joining SVG subpaths so overlapping source decorations remain a union.
    const normalized=polygons.map(p=>{
      const area=p.reduce((n,v,i)=>{const next=p[(i+1)%p.length];return n+v.x*next.y-next.x*v.y},0)
      assert(area!==0)
      return area<0?[p[0],...p.slice(1).reverse()]:p
    })
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
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
      if(index===6&&j===2){
        assert.deepEqual(a,[146,178.68,181,178.68,6,5])
        assert.equal(call.polygons.length,3)
        assert.deepEqual(call.polygons[2].map(p=>[p.x,p.y]),[[181,172.6],[183,147.6],[181,147.6],[175,172.6]])
        return [segment(call.polygons.slice(0,2),'right',(x2-x1)/2),segment(call.polygons.slice(2),'up',(172.6-147.6)/2)]
      }
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
