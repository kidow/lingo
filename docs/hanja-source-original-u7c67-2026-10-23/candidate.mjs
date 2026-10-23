// Provisional original-source QB partition; no native approval.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {ORIGINAL_U7C67,originalU7c67SourceContext} from './source-context.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sourceGroups=ORIGINAL_U7C67.sourceGroups,INDEPENDENT_PAIRS=new Set(['[10,11]'])
const CURVES={"0:0":[49,13.67,40,34.58,12,49.88,0,7],"2:0":[48,27.44,68,34.07,75,44.27,7,8],"3:0":[128,13.67,119,34.07,91,47.33,0,7],"5:0":[127,27.44,147,34.07,154,44.27,7,8],"6:0":[27,52.325,46,59.75,58,72.95,7,8],"7:0":[16,82.025,35,88.625,49,101.825,7,8],"10:0":[16,182.675,35,173.6,55,162.05,0,7],"13:0":[141,110.075,128,119.975,88,129.875,132,7],"14:0":[125,117.5,154,133.175,141.3215248323964,159.63199450416107,7,0],"14:1":[141.3215248323964,159.63199450416107,137,168.65,127,168.65,2,14],"15:0":[138,125.75,118,138.95,82,147.2,32,7],"16:0":[145,136.475,123,154.625,81,162.875,32,7],"17:0":[173,119.15,160,128.225,143,134.825,0,7],"18:0":[142,134,169,145.55,179,159.575,7,8],"22:0":[176,69.65,171,77.9,168,87.8,22,7],"23:1":[80,97.7,80,141.425,65,162.875,1,7],"25:1":[118,86.05,118,96.05,128,96.05,1,4001]}
const BEZIERS={"11:0":[53,160.4,68,176.9,84,184.325,179,181.025,7,0]}
const TERMINALS=[]
const sha=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
const EXPECTED_GEOMETRY_SHA256='71dd8ca53d86c8808365b831f3b65df0a6d6b50b22c7a6311ede12740518e287'
function deriveOriginalMasks(trace, proof) {
  assert.equal(trace.length,26)
  const exceptions = []
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else if(INDEPENDENT_PAIRS.has(JSON.stringify(indices))){assert.equal(i,1);assert.equal(prev.kind,'cdDrawCurve');assert.equal(calls[i].kind,'cdDrawBezier');assert.deepEqual(end,[55,162.05]);assert.deepEqual(start,[53,160.4]);}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
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
          // If a pinned terminal is selected, reveal exactly the independently emitted
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
    if(INDEPENDENT_PAIRS.has(JSON.stringify(indices))){assert.equal(pieces.length,2);return pieces}
    if(pieces.length===1)return pieces
    // The existing numeric source table groups these drawing commands; new direction approval is pending.
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

let runs=0,cachedCalls=0
export const sourceRoot='u7c67',selectedProofIdentity=ORIGINAL_U7C67.identity,nativeApproval=false,runtimeApplied=false
export {sourceGroups}
export function captureGeometry(trace,proof,identity){assert.equal(originalU7c67SourceContext(trace,proof,identity),ORIGINAL_U7C67);assert.equal(EXPECTED_GEOMETRY_SHA256,'PENDING_FIRST_COMPILE','Frozen cache exists; do not reproject');assert.equal(runs,0,'FIRST compile only; use frozen cache thereafter');runs++;const strokes=deriveOriginalMasks(trace,proof);assert.equal(strokes.length,23);assert.equal(strokes.flat().length,24);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),60);return strokes}
export function compileProgressive(trace,proof,identity){assert.equal(originalU7c67SourceContext(trace,proof,identity),ORIGINAL_U7C67);const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u7c67;assert.equal(sha(f.strokes),EXPECTED_GEOMETRY_SHA256);assert.deepEqual(f.fullProof,proof);assert.deepEqual(f.identity,identity);assert.deepEqual(f.sourceGroups,sourceGroups);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return runs}
export function cachedPositiveCallCount(){return cachedCalls}
