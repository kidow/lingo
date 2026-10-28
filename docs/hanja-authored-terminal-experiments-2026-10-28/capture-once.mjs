import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import vm from 'node:vm'
const BASE=new URL('../../',import.meta.url),sha=x=>createHash('sha256').update(x).digest('hex')
const INPUTS=[
  {
    "glyph": "燄",
    "path": "docs/hanja-authored-terminal-experiments-2026-10-28/sources-local-u71c4-terminal0.json",
    "SHA256": "553c2f118f345f1fafcdee82345fcfd24e115f3014c45182745343d1549f765a",
    "root": "local_u71c4_terminal0_20261028",
    "originalRoot": "u71c4",
    "sourcePath": "docs/hanja-goal-glyphwiki-batch725-2026-10-12/sources.json",
    "sourceSHA": "6b71a63de83e55275b3ad82463ae3a5e25ba2e50d0dab5128a608fcb50ba59c0",
    "baselinePath": "docs/hanja-source-full5-three-candidates-2026-10-28/engine-whole-u71c4.json",
    "baselineSHA": "0c217263017c7fa574185ab550dac4b16aa561bb5a63cf77a24625a57a65f30d",
    "allowedLogicalSlot": 2,
    "allowedRawGroupsZeroBased": [
      1,
      2
    ]
  },
  {
    "glyph": "鷖",
    "path": "docs/hanja-authored-terminal-experiments-2026-10-28/sources-local-u9dd6-terminal0.json",
    "SHA256": "79c86b27120e9e46f12e3f45fc12599d30e6b1c2e0f5d81725b2bce5e42bdb00",
    "root": "local_u9dd6_terminal0_20261028",
    "originalRoot": "u9dd6",
    "sourcePath": "docs/hanja-goal-glyphwiki-batch736-2026-10-12/sources.json",
    "sourceSHA": "1668b083c40a2a6c720e13f2ae1ac900e79abbdf01f16a8d8bdd27609fa29fe9",
    "baselinePath": "docs/hanja-source-full5-three-candidates-2026-10-28/engine-whole-u9dd6.json",
    "baselineSHA": "4bb1b5eaf9d08ebcfe61d82e99f9dadead4ac08bbcb546d60fcbea8d2bbd9bb2",
    "allowedLogicalSlot": 9,
    "allowedRawGroupsZeroBased": [
      9,
      10
    ]
  }
]
const ENGINE={
  "engineRevision": "49232bac0348fe815f4200d4116ab7917e0db47f",
  "engineHashes": {
    "2d.js": "dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942",
    "buhin.js": "6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456",
    "curve.js": "77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da",
    "kage.js": "c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78",
    "kagecd.js": "489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860",
    "kagedf.js": "e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847",
    "polygon.js": "f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2",
    "polygons.js": "111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"
  }
}
// Only fixed public engine8 and public GlyphWiki records. No publisher media, auth, private images, registry or shared code.
const load=await Promise.allSettled(Object.entries(ENGINE.engineHashes).map(async([file,expected])=>{
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+ENGINE.engineRevision+'/'+file,{signal:AbortSignal.timeout(20000)})
 assert(response.ok,'Pinned public engine HTTP '+response.status+' '+file)
 const bytes=Buffer.from(await response.arrayBuffer());assert.equal(sha(bytes),expected,'Exact engine bytes '+file)
 return{file,code:bytes.toString('utf8'),SHA256:sha(bytes)}
}))
const failures=load.flatMap((r,i)=>r.status==='rejected'?[{file:Object.keys(ENGINE.engineHashes)[i],error:String(r.reason)}]:[])
assert.deepEqual(failures,[],'No retries or partial engine load')
const engine=load.map(r=>r.value)
const INSTRUMENT="\nconst k=new Kage();for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);\nconst groups=[],trace=[];let calls=[],makeGlyphCalls=0;\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst originalMake=k.makeGlyph;k.makeGlyph=function(...args){makeGlyphCalls++;return originalMake.apply(this,args)};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep},whole:p.array.map(p=>p.array),makeGlyphCalls})"

const outputs=[]
for(const input of INPUTS){
 const readPinned=(path,hash)=>{const bytes=readFileSync(new URL(path,BASE));assert.equal(sha(bytes),hash);return JSON.parse(bytes)}
 const variant=readPinned(input.path,input.SHA256),source=readPinned(input.sourcePath,input.sourceSHA),baseline=readPinned(input.baselinePath,input.baselineSHA)
 assert.equal(variant.root,input.root);assert.equal(variant.originalSource.SHA256,input.sourceSHA)
 const records={...source.records,...variant.records};for(const [name,r]of Object.entries(source.records))assert.deepEqual(records[name],r)
 const numericChanges=[];const refChanges=[]
 for(const [local,r]of Object.entries(variant.records)){
  const original=local.replace(/^local_/,'').replace(/_terminal0_20261028$/,'');assert(source.records[original])
  const oldRows=source.records[original].data.split('$'),newRows=r.data.split('$');assert.equal(oldRows.length,newRows.length)
  for(let row=0;row<oldRows.length;row++){const a=oldRows[row].split(':'),b=newRows[row].split(':');assert.equal(a.length,b.length);for(let cell=0;cell<a.length;cell++)if(a[cell]!==b[cell]){const change={original,local,rowOneBased:row+1,fieldOneBased:cell+1,from:a[cell],to:b[cell]};if(a[0]==='99'&&cell===7)refChanges.push(change);else numericChanges.push(change)}}
 }
 assert.equal(numericChanges.length,1);assert.equal(numericChanges[0].rowOneBased,3);assert.equal(numericChanges[0].fieldOneBased,3);assert.equal(numericChanges[0].to,'0');assert.deepEqual(refChanges,variant.referenceRewires.map(x=>({original:x.originalOwner,local:x.localOwner,rowOneBased:x.rowOneBased,fieldOneBased:8,from:x.from,to:x.to})))
 const ctx=vm.createContext({records,root:input.root}),actualLoadedHashes={}
 for(const item of engine){actualLoadedHashes[item.file]=sha(item.code);vm.runInContext(item.code,ctx,{timeout:1000,filename:item.file})}
 const result=JSON.parse(vm.runInContext(INSTRUMENT,ctx,{timeout:3000,filename:'actual-authored-terminal-capture'}))
 assert.equal(result.makeGlyphCalls,1);assert.deepEqual(result.groups.flatMap(g=>g.polygons),result.whole);assert.deepEqual(result.groups.map(g=>g.polygons),result.trace.map(row=>row.flatMap(c=>c.polygons)))
 const full5={engineRevision:ENGINE.engineRevision,engineHashes:actualLoadedHashes,groups:result.groups,trace:result.trace,defaults:result.defaults}
 const rawDiff=[],polygonDiff=[],traceDiff=[],changedPolygons=[]
 for(let i=0;i<Math.max(baseline.groups.length,result.groups.length);i++){
  const a=baseline.groups[i],b=result.groups[i]
  if(!isDeepStrictEqual(a?.raw,b?.raw))rawDiff.push(i)
  if(!isDeepStrictEqual(a?.polygons,b?.polygons)){polygonDiff.push(i);for(let j=0;j<Math.max(a?.polygons.length||0,b?.polygons.length||0);j++)if(!isDeepStrictEqual(a?.polygons[j],b?.polygons[j]))changedPolygons.push({rawZeroBased:i,polygonZeroBased:j,before:a?.polygons[j]??null,after:b?.polygons[j]??null})}
  if(!isDeepStrictEqual(baseline.trace[i],result.trace[i]))traceDiff.push(i)
 }
 const affected=[...new Set([...rawDiff,...polygonDiff,...traceDiff])].sort((a,b)=>a-b),outside=affected.filter(i=>!input.allowedRawGroupsZeroBased.includes(i))
 const facts={glyph:input.glyph,root:input.root,actualVMContexts:1,vendorEvaluations:8,makeGlyphCalls:1,numericChanges,referenceRewires:refChanges,originalRecordsEdited:false,sourceCoordinatesInventedOrChanged:false,rawBefore:baseline.groups.length,rawAfter:result.groups.length,polygonsBefore:baseline.groups.flatMap(g=>g.polygons).length,polygonsAfter:result.whole.length,rawDiff,polygonDiff,traceDiff,affected,outsideAllowedLogicalSlot:outside,defaultsUnchanged:isDeepStrictEqual(baseline.defaults,result.defaults),singleLogicalSlotOnly:outside.length===0&&baseline.groups.length===result.groups.length,status:outside.length?'HOLD-outside-single-slot':'draft-single-slot-only-native-pending',wholeAndTracePolygonsExactlySame:true,actualLoadedHashes,baselineNotReexecuted:true,authored:true,originalWhole:false,nativeApproval:false,wholeApproval:false,timingApproval:false,runtimeApplied:false}
 outputs.push({input,full5,facts,changedPolygons})
}
export const publicOutputs=outputs
export const publicEngineCodes=engine
export const publicCaptureSummary={actualVMContexts:2,engineHTTPRequests:8,engineCodeFilesSaved:0,originalVMExecutions:0,publicOnly:true,summary:outputs.map(x=>x.facts)}
console.log(JSON.stringify(publicCaptureSummary))
