import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[2],[1],[3],[12],[10,11],[13],[14],[15],[16],[17],[18],[19],[4],[5],[6,7],[8,9]]
const CURVES = {"3:0":[14.09,160,41.205,150,73.93,135,0,7],"4:0":[71.44,21,85.12,30,93.76,46,7,8],"5:0":[63.52,57,77.2,65,87.28,81,7,8],"8:0":[63.52,179,77.2,168,91.6,154,0,7],"11:0":[157.12,24,162.16,42,181.6,57,7,0],"12:0":[122.56,31,114.64,50,93.04,72,0,7],"14:0":[146.32,57,131.92000000000002,78,100.24,96,132,7],"15:0":[130.48000000000002,76,161.44,106,148.80248942299195,155.3130373044626,7,0],"15:1":[148.80248942299195,155.3130373044626,146.32,165,136.32,165,2,14],"16:0":[142,88,128.32,109,98.8,128,32,7],"17:0":[150.64,106,132.64,138,99.52000000000002,159,32,7],"18:0":[177.28,76,167.2,89,150.64,103,0,7],"19:0":[149.2,104,170.8,121,182.32,143,7,8]}
const BEZIERS = {"9:0":[90.16,152,100.96,172,112.47999999999998,181,180.88,177,7,0]}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,20)
  const exceptions = []
  // Research-only: retain every original primitive separately; never join source gaps.
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
