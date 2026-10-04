import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15]]
const CURVES = {"0:0":[70.29,23,53.39,34,13.675,45,0,7],"3:0":[43.25,76,34.8,125,11.985,159,132,7],"4:0":[47.475,98,63.53,106,72.825,121,7,8],"10:0":[71.32,162,100.12,153,123.16,141,0,7],"12:0":[163.48,71,151,92,128.92000000000002,111,0,7],"13:0":[173.08,92,155.8,120,129.88,142,0,7],"14:0":[181.72,118,158.68,158,117.4,183,0,7],"15:0":[149.08,15,163.48,23,172.12,38,7,8]}
const BEZIERS = {"11:0":[136.6,14,136.6,163,171.16,180,180.76,180,0,15]}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16)
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1];assert.deepEqual(prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'original pen trajectory must be continuous')}}
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
        // The pinned engine's a2=15 branch emits a separate original polygon
        // for its upward terminal hook. Stage that polygon after the cubic body;
        // do not invent a guide line, alter points or subdivide any polygon.
        if(index===11 && j===0){
          assert.equal(a[9],15);assert.equal(call.polygons.length,5)
          assert.deepEqual(call.polygons[4],[{"x":180.7,"y":175,"off":0},{"x":182.7,"y":149,"off":0},{"x":180.7,"y":149,"off":0},{"x":174.7,"y":175,"off":0}])
          assert.deepEqual(call.polygons,proof.groups[index].polygons)
          return [{...segment(call.polygons.slice(0,4),'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14},segment(call.polygons.slice(4),'up',13)]
        }
        throw Error('unreviewed cubic terminal')
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}
