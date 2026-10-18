import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=x=>createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x)),config=obj('config.json'),t=config.targets['u5bac-ue0102'],cache=obj('fixtures.json')['u5bac-ue0102'];let derived=0,cached=0
const selectedProofIdentity=Object.freeze(t.identity),FULL_PROOF_SHA256=t.fullProofSHA256,TRACE_SHA256=t.traceSHA256,FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(){return 0}
export function geometryDerivationCallCount(){return derived}
export function cachedPositiveCallCount(){return cached}
export function inputGuards(){for(const[p,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(p)),h,p)}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);inputGuards();for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f);assert.equal(digest(cache.baseline),t.baselineSHA256)}
function validateSelectedProof(trace,proof,identity){
 assert(identity,'Explicit whole/proof/closure/checks identity required');assert.deepEqual(identity,selectedProofIdentity,'Exact seven-field case-sensitive identity; no path aliases')
 const read=p=>readFileSync(new URL(p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
 const pb=read(identity.sourceProofFile),cb=read(identity.sourceCapsuleFile),sb=read(identity.sourceChecksFile)
 assert.equal(sha(pb),identity.sourceProofFileSha256);assert.equal(sha(cb),identity.sourceCapsuleFileSha256);assert.equal(sha(sb),identity.sourceChecksFileSha256)
 const saved=JSON.parse(pb),capsule=JSON.parse(cb),checks=JSON.parse(sb)
 assert.equal(capsule.glyph,"宬");assert.equal(capsule.root,"u5bac");assert(capsule.wholeNames.includes(identity.sourceRoot))
 const closure=new Set();const walk=name=>{if(closure.has(name))return;const record=capsule.records[name];assert(record,'Every selected whole dependency must be explicitly captured: '+name);closure.add(name);for(const row of record.data.split('$')){const fields=row.split(':');if(fields[0]==='99')walk(fields[7])}};walk(identity.sourceRoot)
 const glyphEntry=checks.glyphs.find(x=>x.glyph==="宬")
 const entry=glyphEntry.whole.find(x=>x.root===identity.sourceRoot)
 assert(entry&&entry.sourceComplete);assert.equal(entry.root,identity.sourceRoot);assert.equal(closure.size,entry.recordCount)
 assert.equal(entry.proofSha256,identity.sourceProofFileSha256);assert.equal(glyphEntry.sourceFileSha256,identity.sourceCapsuleFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FULL_PROOF_SHA256);assert.deepEqual(proof,saved)
 assert.equal(digest(trace),TRACE_SHA256);assert.deepEqual(trace,proof.trace)
 assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([k])=>!['trace','groups'].includes(k))),FULL_SOURCE_HEADER)
}
const contourPolygons=outline=>(outline.match(/M[^Z]+Z/g)||[]).map(path=>{
 const values=path.match(/-?\d+(?:\.\d+)?/g).map(Number)
 return {path,points:Array.from({length:values.length/2},(_,i)=>({x:values[i*2]*2,y:values[i*2+1]*2,off:0}))}
})
const canonical=points=>{
 const p=points.map(v=>[v.x,v.y]),choices=[]
 for(const o of[p,[...p].reverse()])for(let i=0;i<o.length;i++)choices.push(JSON.stringify([...o.slice(i),...o.slice(0,i)]))
 return choices.sort()[0]
}
const bounds=points=>[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))]

export function deriveOriginalTail(baseline,proof){
 assert.equal(digest(baseline),t.baselineSHA256);assert.equal(digest(proof),t.fullProofSHA256);const trace=proof.trace,p=t,before=JSON.stringify(proof);
 const result=baseline.map(pen=>pen.map(mask=>({...mask,bounds:[...mask.bounds]})))
 for(const fixture of p.terminals){
  const {raw,call,pen,maskIndex,args,kind}=fixture
  assert.equal(p.sourceGroups[pen-1].at(-1),raw,'Terminal must be last authored raw of this same pen')
  assert.equal(trace[raw].length-1,call,'No following authored call may be silently delayed')
  const terminal=trace[raw][call]
  assert.equal(terminal.kind,kind);assert.deepEqual(terminal.args,args)
  assert(kind==='cdDrawCurve'||kind==='cdDrawBezier')
  const endpoint=terminal.args.slice(kind==='cdDrawCurve'?4:6,kind==='cdDrawCurve'?6:8),[x2,y2]=endpoint
  const ta1=terminal.args.at(-2),ta2=terminal.args.at(-1)
  assert.equal(ta2,15);assert(terminal.args[1]<y2)
  const opt1=Math.floor((ta1%10000)/1000),width=proof.defaults.kMinWidthT-opt1/2,jump=proof.defaults.kWidth*5
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const expectedTail=[point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)]
  const tailPolygon=terminal.polygons.at(-1)
  assert.deepEqual(tailPolygon,expectedTail,'Separate last original terminal15 quad, unchanged')
  assert.equal(baseline[pen-1].length,fixture.originalPenMasks)
  const oldMask=baseline[pen-1][maskIndex]
  assert.equal(maskIndex,baseline[pen-1].length-1)
  assert.equal(oldMask.direction,'curve')
  const contours=contourPolygons(oldMask.outline),target=canonical(tailPolygon),matched=contours.flatMap((c,i)=>canonical(c.points)===target?[i]:[])
  assert.equal(matched.length,1,'Original quad appears exactly once in current curve mask')
  const ti=matched[0],bodyContours=contours.filter((_,i)=>i!==ti)
  assert(bodyContours.length>0)
  assert.deepEqual(bounds(bodyContours.flatMap(c=>c.points)),oldMask.bounds,'Body bounds must already equal original mask bounds; otherwise hold')
  const body={...oldMask,bounds:[...oldMask.bounds],outline:bodyContours.map(c=>c.path).join(' ')}
  const tail={outline:contours[ti].path,bounds:bounds(tailPolygon),direction:'up',weight:jump/2}
  assert.equal(tail.weight,12.5,'Fixed original jump, never bbox-height weight')
  result[pen-1].splice(maskIndex,1,body,tail)
 }
 const sourcePolygons=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
 const rendered=result.flatMap(pen=>pen.flatMap(mask=>contourPolygons(mask.outline).map(c=>canonical(c.points)))).sort()
 assert.deepEqual(rendered,sourcePolygons,'Every unchanged original polygon exactly once')
 assert.equal(result.length,baseline.length,'Same pens/order/count')
 assert.equal(JSON.stringify(proof),before,'Source input is immutable')
 return result
}

export function captureGeometry(trace,proof,id){assert.equal(arguments.length,3);inputGuards();validateSelectedProof(trace,proof,id);const strokes=deriveOriginalTail(cache.baseline,proof);derived++;return{baseline:cache.baseline,strokes}}
export function compileProgressive(...args){assert.equal(args.length,3);guards();const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);assert.equal(digest(cache.strokes),t.derivedSHA256);cached++;return cache.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,id]=args;assert.equal(root,t.root);return compileProgressive(trace,proof,id)}
