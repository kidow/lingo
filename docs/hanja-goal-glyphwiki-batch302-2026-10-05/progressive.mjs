import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[10],[11,12],[13],[14],[15],[16],[17],[4],[5],[6,7],[8,9]]
const CURVES = {"0:0":[21.89,55,26.48,89,15.77,108,7,8],"1:0":[68.555,53,58.61,66,41.78,85,0,7],"2:1":[41.78,97,41.78,160,11.18,187,1,7],"3:0":[41.015,123,59.375,143,64.72999999999999,163,7,8],"4:0":[72.035,21.42,85.43,30.6,93.89,46.92,7,8],"5:0":[64.28,58.14,77.675,66.3,87.545,82.62,7,8],"8:0":[64.28,182.58,77.675,171.36,91.775,157.08,0,7],"10:0":[132.66500000000002,15.3,121.385,48.96,98.825,72.42,0,7],"12:0":[164.39,32.64,144.65,77.52,96.71,103.02,22,7],"13:0":[124.91,31.62,142.535,78.54,179.9,91.8,7,0]}
const BEZIERS = {"9:0":[90.365,155.04,100.94,175.44,112.22,184.62,179.195,180.54,7,0]}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,18)
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2)
    if(indices[0]===8 && indices[1]===9 && i===1){
      // Preserve this exact source's centreline offset; its original filled
      // ascending quadratic and following cubic contours overlap. No connector is created.
      assert.deepEqual(end,[91.775,157.08]);assert.deepEqual(start,[90.365,155.04])
      const inside=poly=>{const p=[91.25,157.75];let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1]) && p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit}return hit}
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
