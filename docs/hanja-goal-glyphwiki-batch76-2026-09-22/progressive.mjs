import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5]]
const CURVES = {
  "1:1": [
    48.5,
    171,
    48.5,
    181,
    38.5,
    181,
    1,
    314
  ],
  "2:0": [
    15.95,
    122,
    50.825,
    107,
    82.6,
    91,
    0,
    7
  ],
  "4:1": [
    110.22999999999999,
    95,
    110.22999999999999,
    160,
    60.415000000000006,
    188,
    1,
    7
  ],
  "5:1": [
    147.895,
    169,
    147.895,
    179,
    157.895,
    179,
    1,
    1
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,6)
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
        if(index===1&&j===1){
          assert.equal(call.polygons.length,2)
          assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[38.5,181],[38.5,175],[24.5,175],[24.5,178]])
          return [{...segment(call.polygons.slice(0,1),'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14},segment(call.polygons.slice(1),'left',(38.5-24.5)/2)]
        }
        return [{...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
      if(index===5&&j===2){
        assert.deepEqual(a,[157.895,179,183.13,179,6,5])
        assert.equal(call.polygons.length,3)
        assert.deepEqual(call.polygons[2].map(p=>[p.x,p.y]),[[183.1,173],[185.1,148],[183.1,148],[177.1,173]])
        return [segment(call.polygons.slice(0,2),'right',(x2-x1)/2),segment(call.polygons.slice(2),'up',(173-148)/2)]
      }
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
