import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=x=>createHash('sha256').update(x).digest('hex'),hash=sha,digest=x=>sha(JSON.stringify(x)),config=obj('config.json'),t=config.targets.u6a32,cache=obj('fixtures.json').u6a32;let calls=0
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(){return 0}
export function cachedDerivationCallCount(){return calls}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f);assert.equal(digest(cache.baseline),t.baselineSHA256)}
function validateSelectedProof(trace,proof,identity){assert.deepEqual(identity,t.identity,'Exact seven-field archive proof/capsule/manifest identity');assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(digest(proof),t.fullProofSHA256);assert.deepEqual(trace,proof.trace);const prefix=t.sourceDirectory+'/';for(const[f,h]of [['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceManifestFile','sourceManifestFileSha256']])assert.equal(sha(read(prefix+identity[f])),identity[h]);const saved=obj(prefix+identity.sourceProofFile),capsule=obj(prefix+identity.sourceCapsuleFile),manifest=obj(prefix+identity.sourceManifestFile);assert.deepEqual(proof,saved);assert.equal(capsule.root,'u6a32');assert.equal(capsule.glyph,'樲');assert.equal(capsule.mode,'archive-recovered');const entry=manifest.glyphs.find(x=>x.glyph==='樲').whole.find(x=>x.root==='u6a32'&&x.mode==='archive-recovered');assert(entry&&entry.sourceComplete);assert.equal(entry.proofFileSha256,identity.sourceProofFileSha256);assert.equal(entry.sourceFileSha256,identity.sourceCapsuleFileSha256);assert.deepEqual(proof.engineHashes,manifest.engineHashes);assert.equal(proof.engineRevision,manifest.engineRevision)}
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
export function reorderOriginalPens(baseline,order){assert.equal(baseline.length,16);assert.equal(order.length,16);assert.equal(new Set(order).size,16);assert(order.every(i=>Number.isInteger(i)&&i>=1&&i<=16));assert.deepEqual(order,t.originalPenOrder);return order.map(i=>baseline[i-1])}
export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);const corrected=deriveOriginalTail(cache.baseline,proof),out=reorderOriginalPens(corrected,t.originalPenOrder);assert.deepEqual([out.length,out.flat().length,out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[16,17,32]);for(let i=0;i<16;i++)assert.equal(out[i],corrected[t.originalPenOrder[i]-1]);calls++;return out}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,t.root);return compileProgressive(trace,proof,id)}
