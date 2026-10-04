import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[2],[1],[3],[10],[11],[12,13],[14],[15],[16],[17],[4],[5],[6,7],[8,9]]
const CURVES = {"3:0":[14.6,160,40.7,150,72.2,135,0,7],"4:0":[71.575,21.79,85.35,30.7,94.05,46.54,7,8],"5:0":[63.6,57.43,77.375,65.35,87.525,81.19,7,8],"8:0":[63.6,178.21,77.375,167.32,91.875,153.46,0,7]}
const BEZIERS = {"9:0":[90.425,151.48,101.3,171.28,112.9,180.19,181.775,176.23,7,0]}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,18)
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2)
    if(indices[0]===8 && indices[1]===9 && i===1){
      // Preserve this exact source's centreline offset; its original filled
      // ascending quadratic and following cubic contours overlap. No connector is created.
      assert.deepEqual(end,[91.875,153.46]);assert.deepEqual(start,[90.425,151.48])
      const inside=poly=>{const p=[91.25,154];let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1]) && p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit}return hit}
      assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap')
    }else assert.deepEqual(end,start,'all other original pen trajectories must be continuous')
  }}
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
      if(call.kind==='cdDrawBezier'){
        assert.deepEqual(a,BEZIERS[index+':'+j])
        return [{...segment(call.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
