// Provisional original-source QQ/QB partition; no native approval.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {ORIGINAL_U7E7E,originalU7e7eSourceContext} from './source-context.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sourceGroups=ORIGINAL_U7E7E.sourceGroups,INDEPENDENT_PAIRS=new Set(['[0,1]','[2,3]','[12,13]'])
const CURVES={"0:0":[47.55,16,38.1,37,26.625,56,0,7],"1:0":[12.45,45,28.65,56,35.4,76,7,8],"2:0":[67.125,39,48.225,76,25.95,110,0,7],"3:0":[13.8,113,42.15,109,67.125,101,0,7],"4:0":[52.95,78,65.775,91,71.175,114,7,8],"6:0":[28.65,127,25.95,155,12.45,180,0,7],"7:0":[53.625,122,65.775,136,70.5,161,7,8],"8:0":[82.28,21,94.44,30,102.12,46,7,8],"9:0":[75.24,57,87.4,65,96.36,81,7,8],"12:0":[75.24,179,87.4,168,100.2,154,0,7]}
const BEZIERS={"13:0":[98.92,152,108.52000000000001,172,118.75999999999999,181,179.56,177,7,0]}
const TERMINALS=[]
const sha=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
const EXPECTED_GEOMETRY_SHA256='0884b854279f6228115aa178fcd4f1693bfb7ebd92761abc39f22534fd9e4c92'
function deriveOriginalMasks(trace, proof) {
  assert.equal(trace.length,27)
  const exceptions = []
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else if(INDEPENDENT_PAIRS.has(JSON.stringify(indices))){assert.equal(i,1);const expected=JSON.stringify(indices)==='[0,1]'?[[26.625,56],[12.45,45],'cdDrawCurve']:JSON.stringify(indices)==='[2,3]'?[[25.95,110],[13.8,113],'cdDrawCurve']:[[100.2,154],[98.92,152],'cdDrawBezier'];assert.equal(prev.kind,'cdDrawCurve');assert.equal(calls[i].kind,expected[2]);assert.deepEqual(end,expected[0]);assert.deepEqual(start,expected[1]);}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
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
    // Existing numeric groups preserve the original calls; new direction approval is pending.
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
export const sourceRoot='u7e7e',selectedProofIdentity=ORIGINAL_U7E7E.identity,nativeApproval=false,runtimeApplied=false
export {sourceGroups}
export function captureGeometry(){throw new Error('Original 繾 first compile already frozen; use exact cache')} 
export function compileProgressive(trace,proof,identity){assert.equal(originalU7e7eSourceContext(trace,proof,identity),ORIGINAL_U7E7E);const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u7e7e;assert.equal(sha(f.strokes),EXPECTED_GEOMETRY_SHA256);assert.deepEqual(f.fullProof,proof);assert.deepEqual(f.identity,identity);assert.deepEqual(f.sourceGroups,sourceGroups);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return runs}
export function cachedPositiveCallCount(){return cachedCalls}

