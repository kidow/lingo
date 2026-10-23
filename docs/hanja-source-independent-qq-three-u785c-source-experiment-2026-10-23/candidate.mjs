// Source-only original masks. Domestic direction mapping and actual browser approval remain pending.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v)),json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url)))
const INDEPENDENT_PAIRS=new Set(['[7,8]','[9,10]','[11,12]'])
const PINS={"docs/hanja-goal-glyphwiki-batch411-2026-10-09/sources.json":"66661138c4e5163462cce04a687cc2ed96a9a49092fb0f4ecc60fc0f48e603eb","docs/hanja-goal-glyphwiki-batch411-2026-10-09/review.json":"9b23d7594be636df592bed690f98661f1f136c5878d0bf26320d9cbd0cd2f79d","docs/hanja-goal-glyphwiki-batch411-2026-10-09/progressive.mjs":"5b166e8f6e976f94765d8f13a8deb39617d6292dd7a2c91f787bf7a94fb56e70","docs/hanja-source-original-full-u785c-2026-10-23/engine-proof.json":"da9a0299154697b3d5aa39f520f725175da503ec23168aeeb431c38c2eae3f39","docs/hanja-source-foot-u785c-preparation-2026-10-23/prefix-proof.json":"e96ee2116289e93ad38d76e62fbe0d399b6c2d7f5fbbb62649ff79a59e84a215"}
export const sourceRoot='u785c',nativeApproval=false,runtimeApplied=false
export const selectedProofIdentity={root:'u785c',file:'../hanja-source-original-full-u785c-2026-10-23/engine-proof.json',fileSHA256:'da9a0299154697b3d5aa39f520f725175da503ec23168aeeb431c38c2eae3f39'}
let geometryRuns=0,cachedCalls=0
function validate(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(digest(proof),'95a75bc82dfba9c855fec3c0982c1397c154cec33f3ce77696434458f5057d4d')
 assert.deepEqual(trace,proof.trace)
 for(const[p,h]of Object.entries(PINS))assert.equal(sha(readFileSync(new URL('../../'+p,import.meta.url))),h,p)
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3,4],[5],[6],[7,8],[9,10],[11,12],[13],[14],[15]])
 assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i))
 for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
}
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[7,8],[9,10],[11,12],[13],[14],[15]]
const CURVES = {"1:0":[48.015,38,37.275,88,9.53,131,132,7],"7:0":[107.36,43,97.71,59,84.2,78,0,7],"8:0":[83.235,76,101.57,92,111.22,113,7,8],"9:0":[140.17,43,130.51999999999998,59,117.01,78,0,7],"10:0":[116.045,76,134.38,92,144.03,113,7,8],"11:0":[172.98,43,163.33,59,148.855,78,0,7],"12:0":[147.89,76,167.19,91,178.77,111,7,8]}
const BEZIERS = {}
const TERMINALS = []
function deriveOriginalMasks(trace, proof) {
  assert.equal(trace.length,16)
  const exceptions = []
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else if(INDEPENDENT_PAIRS.has(JSON.stringify(indices))){assert.equal(i,1);assert.equal(prev.kind,'cdDrawCurve');assert.equal(calls[i].kind,'cdDrawCurve');assert(Math.hypot(end[0]-start[0],end[1]-start[1])>2&&Math.hypot(end[0]-start[0],end[1]-start[1])<3,'Original finite source gap retained');}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
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
          // Domestic pen19 ends left. Reveal exactly the independently emitted
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

export function captureGeometry(trace,proof,identity){
 validate(trace,proof,identity);assert.equal(geometryRuns,0);geometryRuns++
 const strokes=deriveOriginalMasks(trace,proof)
 assert.equal(strokes.length,12);assert.equal(strokes.flat().length,15)
 assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),30)
 return {strokes,baseline:structuredClone(strokes),fullProof:proof}
}
export function compileProgressive(trace,proof,identity){
 validate(trace,proof,identity);const fixed=json('./fixtures.json')[sourceRoot]
 assert.deepEqual(fixed.fullProof,proof);assert.equal(digest(fixed.strokes),json('./config.json').targets[sourceRoot].derivedSHA256)
 cachedCalls++;return structuredClone(fixed.strokes)
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
