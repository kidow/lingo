import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6,7,8]]
const CURVES = {
  "2:0": [
    47.5,
    61,
    38,
    110,
    12.35,
    148,
    132,
    7
  ],
  "3:0": [
    52.25,
    86,
    70.3,
    94,
    80.75,
    109,
    7,
    8
  ],
  "8:0": [
    164.9,
    107,
    162.3,
    158,
    147.63133716508534,
    178.1492621358718,
    22,
    0
  ],
  "8:1": [
    147.63133716508534,
    178.1492621358718,
    144.1,
    183,
    138.1,
    183,
    2,
    114
  ]
}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,9)
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
        if(index===8&&j===1){
          assert.equal(call.polygons.length,2)
          assert.deepEqual(call.polygons[1].map(p=>[p.x,p.y]),[[138.1,183],[138.1,179.4],[127.3,179.4],[127.3,181.2]])
          return [{...segment(call.polygons.slice(0,1),'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14},segment(call.polygons.slice(1),'left',5.4)]
        }
        return [{...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      if(index===6&&j===0){
        assert.deepEqual(a,[117.45,69,109,107,32,13])
        // Follow the original straight centerline, preserving the preset's full cap.
        return [{...segment(call.polygons,'curve',Math.hypot(x2-x1,y2-y1)/2),revealPath:`M${x1/2} ${y1/2} L${x2/2} ${y2/2}`,revealWidth:14}]
      }
      assert(x1===x2||y1===y2)
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
