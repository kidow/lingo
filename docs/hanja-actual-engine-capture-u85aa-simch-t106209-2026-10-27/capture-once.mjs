import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'
import vm from 'node:vm'
const base='/Users/kidow/Documents/dev/kidow/lingo/'
const sha=x=>createHash('sha256').update(x).digest('hex')
const sourcePath='docs/hanja-source-inventory-u85aa-additional-2026-10-27/sources.json'
const sourceSHA256='d3ac2cab4265ea40f84c4cb9badcc9f6e746988b9f48a911bfc38718522efb8f'
const root='simch-kx_t106209'
const sourceBytes=readFileSync(base+sourcePath);assert.equal(sha(sourceBytes),sourceSHA256)
const source=JSON.parse(sourceBytes),records={},seen=new Set()
function visit(key,chain=[]){assert(!chain.includes(key),'cycle');if(seen.has(key))return;const r=source.recordsByLiteralReference[key];assert(r,'missing '+key);seen.add(key);records[key]=r;for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99')visit(a[7],[...chain,key]);}}
visit(root)
assert.deepEqual([...seen].sort(),['simch-kx_t106209','u65a4-02@4','u8279-03'].sort())
const codes=JSON.parse(gunzipSync(Buffer.from(readFileSync('/private/tmp/hanja-pinned-engine8-49232-2026-10-23.json.gz.b64','utf8').trim(),'base64')))
const ref=JSON.parse(readFileSync(base+'docs/hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/capture.json'))
assert.equal(ref.engine.revision,'49232bac0348fe815f4200d4116ab7917e0db47f')
assert.deepEqual(Object.keys(codes),Object.keys(ref.engine.actualLoadedHashes))
for(const [file,hash] of Object.entries(ref.engine.actualLoadedHashes))assert.equal(sha(codes[file]),hash)
const INSTRUMENT="\nconst k=new Kage();for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);\nconst groups=[],trace=[];let calls=[],makeGlyphCalls=0;\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst originalMake=k.makeGlyph;k.makeGlyph=function(...args){makeGlyphCalls++;return originalMake.apply(this,args)};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep},whole:p.array.map(p=>p.array),makeGlyphCalls})"
export const preflight={sourcePath,sourceSHA256,root,records:Object.keys(records),recordVersions:Object.fromEntries(Object.entries(records).map(([key,r])=>[key,r.version])),engineRevision:ref.engine.revision,engineHashes:ref.engine.actualLoadedHashes,actualVMContexts:0,makeGlyphCalls:0}
let captureInvocations=0
export function captureOnce(){
 assert.equal(captureInvocations++,0,'No engine replay allowed')
 const ctx=vm.createContext({records,root}),actualLoadedHashes={}
 for(const[file,code]of Object.entries(codes)){actualLoadedHashes[file]=sha(code);vm.runInContext(code,ctx,{timeout:1000,filename:file})}
 const result=JSON.parse(vm.runInContext(INSTRUMENT,ctx,{timeout:3000}))
 const errors=[],badRaw=[]
 // Preserve the legacy generic type3 eight-coordinate rule; no scoped relaxation here.
 const activeCoordinates={1:4,2:6,3:8,7:8}
 for(const [i,g]of result.groups.entries()){
  const count=activeCoordinates[g.raw[0]]
  if(!count||!g.raw.slice(0,3).every(Number.isFinite)||g.raw.slice(3,3+count).length!==count||!g.raw.slice(3,3+count).every(Number.isFinite))badRaw.push({rawIndex:i+1,type:g.raw[0],expectedActiveCoordinates:count??null,raw:g.raw})
 }
 const finiteCalls=result.trace.flat().every(c=>c.args.every(Number.isFinite))
 const finiteP=result.whole.every(p=>p.every(v=>Number.isFinite(v.x)&&Number.isFinite(v.y)))
 const wholeMatches=JSON.stringify(result.groups.flatMap(g=>g.polygons))===JSON.stringify(result.whole)
 const traceMatches=JSON.stringify(result.groups.map(g=>g.polygons))===JSON.stringify(result.trace.map(row=>row.flatMap(c=>c.polygons)))
 if(result.makeGlyphCalls!==1)errors.push('makeGlyph count')
 if(badRaw.length)errors.push('generic active-coordinate guard')
 if(!finiteCalls)errors.push('nonfinite call arguments')
 if(!finiteP)errors.push('nonfinite polygon vertices')
 if(!wholeMatches)errors.push('whole/group polygon mismatch')
 if(!traceMatches)errors.push('trace/group polygon mismatch')
 return {full5:{engineRevision:ref.engine.revision,engineHashes:actualLoadedHashes,groups:result.groups,trace:result.trace,defaults:result.defaults},captureFacts:{sourcePath,sourceSHA256,actualProviderRoot:root,rootVersion:records[root].version,recordVersions:preflight.recordVersions,actualVMContexts:1,vendorEvaluations:8,captureEvaluation:1,makeGlyphCalls:result.makeGlyphCalls,instrumentSHA256:sha(INSTRUMENT),raw:result.groups.length,calls:result.trace.flat().length,polygons:result.whole.length,wholePolygonsSHA256:sha(JSON.stringify(result.whole)),wholeAndTracePolygonsExactlySame:wholeMatches&&traceMatches,diagnostics:{genericGuardPassed:errors.length===0,badRaw,finiteCalls,finiteP,wholeMatches,traceMatches,errors},aliasInserted:false,sourceRowsChanged:false,newLocalComposite:false,partSubstitution:false,sourceProjection:0,nativeApproval:false,runtimeApplied:false}}
}
