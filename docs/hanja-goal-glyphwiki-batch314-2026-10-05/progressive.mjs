import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[13],[8],[9],[10],[11],[12],[14]]
const CURVES = {"0:0":[52.53,15,39.49,58,12.595,92,0,7],"1:0":[51.715,27,72.09,38,80.24,54,7,8],"5:0":[19.93,120,32.97,134,34.6,154,7,8],"6:0":[76.165,119,70.46,135,61.495,151,0,7],"7:0":[16.67,177,50.085,169,82.685,157,0,7],"8:1":[135.345,172,135.345,182,125.345,182,1,14],"9:0":[92.885,78,108.325,90,114.115,111,7,8],"10:0":[89.025,161,111.22,142,133.41500000000002,118,0,7],"11:0":[175.875,78,162.365,97,147.89,114,0,7],"12:0":[139.205,69,141.135,129,182.63,169,7,0],"14:0":[146.925,18,159.47,28,166.225,46,7,8]}
const BEZIERS = {}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,15)
  const exceptions = []
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
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
