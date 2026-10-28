const OLD_TOOL_SHA="2e4b23cacd607b818faa7bdfde8fa1c8e192d59c6ff8649ec23fbc34945e93fe"
const PROGRAM_SHA="b65913a7f0c9444b729794760a054704f1e157fbe7c62c12a4c6176ee0ada61b"
const PROGRAM="const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})"
import fs from 'node:fs'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import {pathToFileURL} from 'node:url'
const root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),sha=x=>crypto.createHash('sha256').update(x).digest('hex')
const sourcePath='docs/hanja-source-alternative-u6adc-2026-10-26/sources.json',sourceSHA='523eae26e1932b1c95ea2d9145c684a6b32dedea1581b26cbd8d4f93a12decad'
const oldProofPath='docs/hanja-goal-glyphwiki-batch438-2026-10-09/engine-proof.json',oldProofSHA='e0ddc60691b7d6e4050407cc2d08fccd414ba5e8cb2c5a83ff04ec21d9cdfece'
const oldToolPath='docs/hanja-goal-glyphwiki-batch438-2026-10-09/verify-source.mjs'
const NAMES=['hkcs_m6adc','hkcs_m56ca-c01','hkcs_m548e','hkcs_m56ca-c04','hkcs_m5904-p03-s00','hkcs_m53e3-p04-s00'],VERSIONS=[1,2,3,1,1,1]
function inputs(){
 assert.equal(sha(read(sourcePath)),sourceSHA);assert.equal(sha(read(oldProofPath)),oldProofSHA);assert.equal(sha(read(oldToolPath)),OLD_TOOL_SHA);assert.equal(sha(PROGRAM),PROGRAM_SHA)
 const source=JSON.parse(read(sourcePath)),old=JSON.parse(read(oldProofPath)),records=Object.fromEntries(source.records.filter(x=>NAMES.includes(x.record?.name)).map(x=>[x.record.name,x.record]))
 assert.deepEqual(Object.keys(records).sort(),NAMES.slice().sort());for(let i=0;i<NAMES.length;i++){assert.equal(records[NAMES[i]].version,VERSIONS[i]);for(const row of records[NAMES[i]].data.split('$'))if(row.split(':')[0]==='99')assert(records[row.split(':')[7]])}
 assert.equal(old.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f');assert.equal(Object.keys(old.engineHashes).length,8);assert.equal(old.defaults.kWidth,5)
 return{source,old,records}
}
export function plan(){
 const{old,records}=inputs()
 return{glyph:'櫜',root:'hkcs_m6adc@1',sourcePath,sourceSHA,closure:NAMES.map(n=>({name:n,version:records[n].version,dataSHA256:sha(records[n].data)})),engineRevision:old.engineRevision,engineHashes:old.engineHashes,unchangedInstrumentation:{path:oldToolPath,SHA256:OLD_TOOL_SHA,programSHA256:PROGRAM_SHA},expectedDrawingRowsFromPublicClosure:23,actualFilledPolygonsNotCaptured:true,original19ClockReview:'docs/hanja-official-media-compare-u6adc-2026-10-29/native-clock-review.json',nativeApproval:false,runtimeApplied:false,HTTP:0,newEngine:0,server:0}
}
let invoked=false
export async function capture(){
 assert.equal(invoked,false,'one capture attempt per module instance; no retry loop');invoked=true
 const{old,records}=inputs()
 const codes=await Promise.all(Object.entries(old.engineHashes).map(async([file,hash])=>{const url='https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+old.engineRevision+'/'+file,r=await fetch(url,{signal:AbortSignal.timeout(20000)});assert(r.ok,'fixed public engine HTTP '+r.status);const code=await r.text();assert.equal(sha(code),hash,file);return code}))
 const ctx=vm.createContext({root:'hkcs_m6adc',records});for(const code of codes)vm.runInContext(code,ctx,{timeout:1000})
 const actual=JSON.parse(vm.runInContext(PROGRAM,ctx,{timeout:2000}));assert.deepEqual(actual.defaults,old.defaults);assert.equal(actual.groups.length,23);assert.equal(actual.trace.length,23);assert.equal(actual.trace.flat().length,23);assert.deepEqual(actual.groups.map(g=>g.polygons),actual.trace.map(t=>t.flatMap(c=>c.polygons)))
 const points=actual.groups.flatMap(g=>g.polygons.flat());assert(points.length>0&&points.every(p=>p.off===0&&Number.isFinite(p.x)&&Number.isFinite(p.y)))
 const proof={engineRevision:old.engineRevision,engineHashes:old.engineHashes,...actual}
 return{proof,receipt:{glyph:'櫜',root:'hkcs_m6adc@1',sourcePath,sourceSHA,exactClosure:NAMES.map(n=>({name:n,version:records[n].version,dataSHA256:sha(records[n].data)})),engineRevision:old.engineRevision,engineHashes:old.engineHashes,instrumentationSource:oldToolPath,instrumentationProgramSHA256:PROGRAM_SHA,newEngineContexts:1,makeGlyphCalls:1,sourceProjection:0,rawGroups:actual.groups.length,drawingCalls:actual.trace.flat().length,P:actual.groups.reduce((n,g)=>n+g.polygons.length,0),privateRequests:0,privateMediaSaved:false,server:0,wholeCompatibilityApproved:false,sourceMappingApproved:false,nativeApproval:false,runtimeApplied:false,callerMustPersistPublicResultWithNativePatch:true}}
}
if(typeof process!=='undefined'&&process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){assert.equal(process.argv[2],'--plan','CLI is metadata-only. Root imports capture() into RAM for the explicit one engine run.');console.log(JSON.stringify(plan()))}
