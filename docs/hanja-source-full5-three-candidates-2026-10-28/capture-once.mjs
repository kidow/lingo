import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import vm from 'node:vm'
const BASE=new URL('../../',import.meta.url),sha=x=>createHash('sha256').update(x).digest('hex')
const INPUTS=[
  {
    "glyph": "燄",
    "root": "u71c4",
    "path": "docs/hanja-goal-glyphwiki-batch725-2026-10-12/sources.json",
    "SHA256": "6b71a63de83e55275b3ad82463ae3a5e25ba2e50d0dab5128a608fcb50ba59c0",
    "legacyPath": "docs/hanja-goal-glyphwiki-batch725-2026-10-12/engine-whole-u71c4.json",
    "legacySHA256": "6063cd871c6e08b229f0140032ebebf54e16abd7c5e76369a7f4730819c4acb4",
    "reviewPath": "docs/hanja-goal-glyphwiki-batch725-2026-10-12/review.json",
    "sourceRoot": "u71c4",
    "records": 8,
    "aliases": []
  },
  {
    "glyph": "鷖",
    "root": "u9dd6",
    "path": "docs/hanja-goal-glyphwiki-batch736-2026-10-12/sources.json",
    "SHA256": "1668b083c40a2a6c720e13f2ae1ac900e79abbdf01f16a8d8bdd27609fa29fe9",
    "legacyPath": "docs/hanja-goal-glyphwiki-batch736-2026-10-12/engine-whole-u9dd6.json",
    "legacySHA256": "62d7abce8b2d2999ccefbe546620c978bf1fb14a7caf831e001881a81e0fc6a7",
    "reviewPath": "docs/hanja-goal-glyphwiki-batch736-2026-10-12/review.json",
    "sourceRoot": "u9dd6",
    "records": 14,
    "aliases": []
  },
  {
    "glyph": "嗸",
    "root": "u55f8",
    "path": "docs/hanja-goal-glyphwiki-batch741-2026-10-12/sources.json",
    "SHA256": "9769886d5795ba19c3048c8c44c19e4899a55f63ee30b8de861f0bf48a7f26f2",
    "legacyPath": "docs/hanja-goal-glyphwiki-batch741-2026-10-12/engine-whole-u55f8.json",
    "legacySHA256": "a569a023239afa92474c47b5c530c4d5f7f244285e055e7a50fafc6086cc2070",
    "reviewPath": "docs/hanja-goal-glyphwiki-batch741-2026-10-12/review.json",
    "sourceRoot": "u55f8",
    "records": 4,
    "aliases": []
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
function firstDifference(a,b,path='$'){
 if(Object.is(a,b))return null
 if(!a||!b||typeof a!=='object'||typeof b!=='object')return{path,old:a,new:b}
 if(Array.isArray(a)!==Array.isArray(b))return{path,kind:'array/object'}
 const ak=Object.keys(a),bk=Object.keys(b);if(!isDeepStrictEqual(ak.slice().sort(),bk.slice().sort()))return{path,oldKeys:ak,newKeys:bk}
 for(const key of ak){const d=firstDifference(a[key],b[key],path+'.'+key);if(d)return d}
 return null
}
const outputs=[]
for(const input of INPUTS){
 const bytes=readFileSync(new URL(input.path,BASE));assert.equal(sha(bytes),input.SHA256);const source=JSON.parse(bytes)
 assert.equal(source.root,input.root);assert.deepEqual(source.aliases,[])
 const used=new Set();function visit(name,chain=[]){assert(!chain.includes(name),'No source cycle');if(used.has(name))return;const r=source.records[name];assert(r&&typeof r.data==='string');assert(!r.data.startsWith('[['),'No undeclared alias interpretation');used.add(name);for(const line of r.data.split('$')){const a=line.split(':');if(a[0]==='99')visit(a[7],[...chain,name])}}visit(input.root)
 const ctx=vm.createContext({records:source.records,root:input.root}),actualLoadedHashes={}
 for(const item of engine){actualLoadedHashes[item.file]=sha(item.code);vm.runInContext(item.code,ctx,{timeout:1000,filename:item.file})}
 const result=JSON.parse(vm.runInContext(INSTRUMENT,ctx,{timeout:3000,filename:'actual-public-whole-capture'}))
 assert.equal(result.makeGlyphCalls,1);assert.deepEqual(result.groups.flatMap(g=>g.polygons),result.whole)
 assert.deepEqual(result.groups.map(g=>g.polygons),result.trace.map(row=>row.flatMap(c=>c.polygons)))
 const full5={engineRevision:ENGINE.engineRevision,engineHashes:actualLoadedHashes,groups:result.groups,trace:result.trace,defaults:result.defaults}
 assert.deepEqual(Object.keys(full5).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 const oldBytes=readFileSync(new URL(input.legacyPath,BASE));assert.equal(sha(oldBytes),input.legacySHA256);const legacy=JSON.parse(oldBytes)
 const actualBody={groups:result.groups,trace:result.trace,defaults:result.defaults},same=isDeepStrictEqual(legacy,actualBody)
 outputs.push({input,full5,captureFacts:{actualVMContexts:1,vendorEvaluations:8,captureEvaluation:1,makeGlyphCalls:1,actualProviderRoot:input.root,sourceRecords:Object.keys(source.records).length,reachableSourceRecords:used.size,newAliasesInserted:false,sourceRecordEdits:0,actualLoadedHashes,engineRevision:ENGINE.engineRevision,wholePolygonsSHA256:sha(JSON.stringify(result.whole)),wholeAndTracePolygonsExactlySame:true,instrumentSHA256:sha(INSTRUMENT),raw:result.groups.length,calls:result.trace.flat().length,polygons:result.whole.length,newHeaderFromExecutedCodeBytesOnly:true,oldHeaderOrBodyCombined:false,sourceProjection:0,legacy3KeyBodyExactlySame:same,firstLegacyDifference:same?null:firstDifference(legacy,actualBody),legacyBodyCanonicalSHA256:sha(JSON.stringify(legacy)),newBodyCanonicalSHA256:sha(JSON.stringify(actualBody)),nativeApproval:false,runtimeApplied:false}})
}
export const publicOutputs=outputs
export const publicCaptureSummary={publicOnly:true,privateMediaInputs:false,engineHTTPRequests:8,engineCodeFilesSaved:0,actualVMContexts:outputs.length,sourceProjection:0,server:0,registry:0,summary:outputs.map(o=>({glyph:o.input.glyph,root:o.input.root,...o.captureFacts}))}
console.log(JSON.stringify(publicCaptureSummary))
