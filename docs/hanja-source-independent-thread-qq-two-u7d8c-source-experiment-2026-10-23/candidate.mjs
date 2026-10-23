// 綌 source-only original masks. Old domestic13 cumulative evidence is not fresh direction/mapping approval.
import assert from 'node:assert/strict'
import {readFileSync}from'node:fs'
import {createHash}from'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v)),json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url)))
const PINS={"docs/hanja-goal-glyphwiki-batch420-2026-10-09/sources.json":"05eed11de7d6a051a61ac4a57cf14efd7702c08a47cb7d94d5595df9f3b2ad5e","docs/hanja-goal-glyphwiki-batch420-2026-10-09/review.json":"f305041caf9294bdbfd3bb431574828f246a68ccf4fdf67ee01335d21f01b902","docs/hanja-goal-glyphwiki-batch420-2026-10-09/progressive.mjs":"9107467cbdcdf9323dd1a3f94709686827c19331a20c73a72cbc753166e33a60","docs/hanja-source-original-full-u7d8c-2026-10-23/engine-proof.json":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713"},INDEPENDENT_PAIRS=new Set(["[0,1]","[2,3]"])
export const sourceRoot='u7d8c',nativeApproval=false,runtimeApplied=false,selectedProofIdentity={"root":"u7d8c","file":"../hanja-source-original-full-u7d8c-2026-10-23/engine-proof.json","fileSHA256":"d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713"}
let geometryRuns=0,cachedCalls=0
function validate(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(digest(proof),'ecf173a2b776e16f1ce1cf36f5ac68ba60a36ff783bd926cdaa884a9c3ed697f');assert.deepEqual(trace,proof.trace)
 for(const[p,h]of Object.entries(PINS))assert.equal(sha(readFileSync(new URL('../../'+p,import.meta.url))),h,p)
 assert.deepEqual(sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14,15],[16]]);assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),Array.from({length:17},(_,i)=>i))
 assert.deepEqual(trace[8],[]);assert.deepEqual(proof.groups[8].polygons,[])
 for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
}
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14,15],[16]]
const CURVES = {"0:0":[49.53,16,39.66,37,27.675,56,0,7],"1:0":[12.87,45,29.79,56,36.84,76,7,8],"2:0":[69.975,39,50.235,76,26.97,110,0,7],"3:0":[14.28,113,43.89,109,69.975,101,0,7],"4:0":[55.17,78,68.565,91,74.205,114,7,8],"6:0":[29.79,127,26.97,155,12.87,180,0,7],"7:0":[55.875,122,68.565,136,73.5,161,7,8],"9:0":[115.45,22,102.15,50,77.45,69,0,7],"10:0":[141.1,21,162.95,36,177.2,60,7,8],"11:0":[132.55,50,114.5,99,74.6,123,0,7],"12:0":[130.65,53,148.7,98,181.95,115,7,0]}
const BEZIERS = {}
const TERMINALS = []
function deriveOriginalMasks(trace, proof) {
  assert.equal(trace.length,17)
  const exceptions = []
  for(const indices of sourceGroups){const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else if(INDEPENDENT_PAIRS.has(JSON.stringify(indices))){assert.equal(i,1);assert.equal(prev.kind,'cdDrawCurve');assert.equal(calls[i].kind,'cdDrawCurve');const expected={'[0,1]':{end:[27.675,56],start:[12.87,45]},'[2,3]':{end:[26.97,110],start:[14.28,113]}}[JSON.stringify(indices)];assert.deepEqual(end,expected.end);assert.deepEqual(start,expected.start);assert(Math.hypot(end[0]-start[0],end[1]-start[1])>0,'Original nonzero thread source gap retained');}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
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
    // Existing sourceGroups are retained as a provisional static hypothesis; no new temporal approval.
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

export function captureGeometry(trace,proof,identity){validate(trace,proof,identity);assert.equal(geometryRuns,0);geometryRuns++;const strokes=deriveOriginalMasks(trace,proof);assert.equal(strokes.length,13);assert.equal(strokes.flat().length,15);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),34);return{strokes,baseline:structuredClone(strokes),fullProof:proof}}
export function compileProgressive(trace,proof,identity){validate(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.deepEqual(f.fullProof,proof);assert.equal(digest(f.strokes),json('./config.json').targets[sourceRoot].derivedSHA256);cachedCalls++;return structuredClone(f.strokes)}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
