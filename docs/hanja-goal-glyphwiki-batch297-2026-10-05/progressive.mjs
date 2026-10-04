import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4,5],[6],[7,8,9],[10],[11,12],[13,14],[15],[16],[17],[18],[19]]
const CURVES = {"3:0":[29.05,58.825,28.115,74.775,17.83,80.575,7,8],"5:0":[91.695,65.35,87.02,73.325,78.605,81.3,22,7],"6:1":[41.205,99.425,41.205,126.25,15.025,139.3,1,7],"9:0":[72.995,119.725,81.41,115.375,105.72,103.05,32,7],"10:1":[125.125,38.32,125.125,56.8,102.65,70,1,7],"12:1":[158.475,48.78,158.475,58.78,168.475,58.78,1,3001],"14:0":[166.45,73.3,149.775,117.52,95.4,128.07999999999998,22,7],"15:0":[121.5,73.3,131.65,112.9,178.775,121.48,7,0],"16:0":[37,134.78,38,164.355,18,175.34,7,8],"17:1":[66,168.72,66,178.72,76,178.72,1,1],"18:0":[87,130.555,107,139.005,118,155.905,7,8],"19:0":[148,136.47,172,149.99,179,171.115,7,8]}
const BEZIERS = {}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,20)
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2)
    if(indices[0]===7 && i===1){
      // Preserve this exact source's centreline offset; its original filled
      // horizontal and vertical contours overlap. No connector is created.
      assert.deepEqual(end,[72.06,84.2]);assert.deepEqual(start,[72.995,84.2])
      const inside=poly=>{const p=[70,85.2];let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1]) && p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit}return hit}
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
