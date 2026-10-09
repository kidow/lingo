import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]]
const CURVES = {"4:0":[50.4112,61.76194625,47.9488,74.8247675,37.278400000000005,82.57389875000001,7,8],"5:1":[73.39359999999999,75.89495500000001,73.39359999999999,85.89495500000001,83.39359999999999,85.89495500000001,1,1],"6:0":[85.70559999999999,56.22685249999999,107.04639999999999,59.99071625,113.61280000000001,70.3966925,7,8],"7:0":[132.4912,60.87633125,153.832,67.07563625,162.86079999999998,78.14582375,7,8],"8:0":[29.627200000000002,95.886341875,28.1728,111.38243375,21.870400000000004,120.575030625,7,8],"9:1":[43.2016,114.514715,43.2016,124.514715,53.2016,124.514715,1,2001],"10:0":[50.4736,89.32020125,63.0784,93.78517687499999,66.9568,106.12952124999998,7,8],"11:0":[78.10719999999999,94.83575937499998,90.712,102.189836875,96.0448,115.322118125,7,8],"12:0":[112.18719999999999,96.01440875,110.73280000000001,111.6385675,104.43039999999999,120.90713624999998,7,8],"13:1":[125.7616,114.87938,125.7616,124.87938,135.7616,124.87938,1,2001],"14:0":[133.0336,89.39400249999998,145.6384,93.89587875000001,149.5168,106.3422425,7,8],"15:0":[160.66719999999998,94.95514374999999,173.27199999999996,102.36999875000001,178.60479999999998,115.61081125000001,7,8],"18:0":[93.47,142.90425,66.335,168.64974999999998,12.065,181.5225,132,7],"19:0":[104.525,142.90425,134.675,165.139,179.9,176.84150000000002,7,0]}
const BEZIERS = {}
const TERMINALS = [{"index":5,"callIndex":2,"args":[83.39359999999999,85.89495500000001,132.4912,85.89495500000001,6,5],"polygon":[{"x":132.4,"y":79.8,"off":0},{"x":134.4,"y":54.8,"off":0},{"x":132.4,"y":54.8,"off":0},{"x":126.4,"y":79.8,"off":0}]},{"index":9,"callIndex":2,"args":[53.2016,124.514715,78.10719999999999,124.514715,2006,5],"polygon":[{"x":78.1,"y":119.5,"off":0},{"x":80.1,"y":102.5,"off":0},{"x":78.1,"y":102.5,"off":0},{"x":73.1,"y":119.5,"off":0}]},{"index":13,"callIndex":2,"args":[135.7616,124.87938,160.66719999999998,124.87938,2006,5],"polygon":[{"x":160.6,"y":119.8,"off":0},{"x":162.6,"y":102.8,"off":0},{"x":160.6,"y":102.8,"off":0},{"x":155.6,"y":119.8,"off":0}]}]
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
        const polygons=call.polygons
        return [{...segment(polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      if(call.kind==='cdDrawBezier'){
        assert.deepEqual(a,BEZIERS[index+':'+j])
        return [{...segment(call.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      let polygons=call.polygons
      const[x1,y1,x2,y2]=a
      const selected=TERMINALS.find(t=>t.index===index&&t.callIndex===j)
      if(selected){
        assert.deepEqual(a,selected.args)
        assert.deepEqual(call.polygons.at(-1),selected.polygon)
        // Domestic6/10/14 finish upward. Reveal only the independently emitted
        // original terminal polygon with the existing rectangular clip.
        const ys=selected.polygon.map(p=>p.y)
        terminal=segment([selected.polygon],'up',(Math.max(...ys)-Math.min(...ys))/2)
        polygons=call.polygons.slice(0,-1)
      }
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
