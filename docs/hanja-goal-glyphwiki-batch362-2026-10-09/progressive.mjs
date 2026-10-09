import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[11],[12],[7],[8,9],[10],[13],[14],[15],[16],[17],[18],[19]]
const CURVES = {"4:0":[90,55.8875,57,61.6225,23,64.49,0,7],"7:0":[128,51.58625,122,75.24312499999999,103,90.2975,0,7],"9:0":[178,67.3575,178,96.749375,169.89167436265515,105.27460371386499,22,0],"9:1":[169.89167436265515,105.27460371386499,163,112.520625,153,112.520625,2,114],"10:0":[148,67.3575,143,96.0325,105,113.2375,132,7],"11:0":[55,77.39375,44,100.33375,15,115.388125,132,7],"12:0":[64,83.12875,83,88.146875,97,96.749375,7,8],"13:0":[106,104.325,67,129.9,15,143.075,0,7],"14:0":[101,110.525,136,130.675,180,138.425,7,0],"15:1":[102,171.825,102,181.825,92,181.825,1,14],"16:0":[45,136.875,65,142.3,77,152.375,7,8],"17:0":[29,177.175,58,167.1,92,153.15,0,7],"18:0":[147,138.425,131,144.625,102,153.15,0,7],"19:0":[102,153.925,149,165.55,170,178.725,7,8]}
const BEZIERS = {}
const TERMINALS = [{"index":9,"callIndex":1,"args":[169.89167436265515,105.27460371386499,163,112.520625,153,112.520625,2,114],"polygon":[{"x":153,"y":112.5,"off":0},{"x":153,"y":106.5,"off":0},{"x":135,"y":106.5,"off":0},{"x":135,"y":109.5,"off":0}]},{"index":15,"callIndex":1,"args":[102,171.825,102,181.825,92,181.825,1,14],"polygon":[{"x":92,"y":181.8,"off":0},{"x":92,"y":175.8,"off":0},{"x":72,"y":175.8,"off":0},{"x":72,"y":178.8,"off":0}]}]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,20)
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
  return sourceGroups.map(indices=>{
    let terminal
    const pieces=indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        let polygons=call.polygons
        const selected=TERMINALS.find(t=>t.index===index&&t.callIndex===j)
        if(selected){
          assert.deepEqual(a,selected.args)
          assert.deepEqual(call.polygons.at(-1),selected.polygon)
          // Domestic pens11/15 end left. Reveal exactly the independently emitted
          // original terminal polygon with an existing rectangular clip.
          // No trajectory, connector, coordinate, contour or pen is added.
          const xs=selected.polygon.map(p=>p.x)
          terminal=segment([selected.polygon],'left',(Math.max(...xs)-Math.min(...xs))/2)
          polygons=call.polygons.slice(0,-1)
        }
        return [{...segment(polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      if(call.kind==='cdDrawBezier'){
        assert.deepEqual(a,BEZIERS[index+':'+j])
        return [{...segment(call.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      let polygons=call.polygons
      const[x1,y1,x2,y2]=a
      return [segment(polygons,Math.abs(y2-y1)>=Math.abs(x2-x1)?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  })
    if(pieces.length===1)return pieces
    // Domestic review established one pen for these source drawing commands.
    // Share one mask along their exact continuous original centerline; no new
    // coordinates, connector, polygon, width or source primitive is introduced.
    const calls=indices.flatMap(index=>trace[index])
    const command=call=>{
      const a=call.args
      if(call.kind==='cdDrawLine')return `L${a[2]/2} ${a[3]/2}`
      if(call.kind==='cdDrawCurve')return `Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`
      assert.equal(call.kind,'cdDrawBezier')
      return `C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`
    }
    const first=calls[0].args
    const main = {
      outline:pieces.map(p=>p.outline).join(' '),
      bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],
      direction:'curve',
      weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,
      revealPath:`M${first[0]/2} ${first[1]/2} ${calls.map(command).join(' ')}`,
      revealWidth:14
    }
    return terminal ? [main,terminal] : [main]
  })
}
