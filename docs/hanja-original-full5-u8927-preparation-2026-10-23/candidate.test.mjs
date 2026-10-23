import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeOriginalU8927Context as guard,SOURCE_IDENTITY,nativeApproval,runtimeApplied} from './source-context.mjs'
const bytes=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(bytes(n)),sha=v=>createHash('sha256').update(v).digest('hex'),copy=x=>JSON.parse(JSON.stringify(x))
test('u8927 actual full5 whole source context only',()=>{
 const c=json('./whole-candidate.json'),p=json('./engine-whole-u8927.json'),h=json('../hanja-goal-glyphwiki-batch430-2026-10-09/engine-proof.json'),tr=json('../hanja-goal-glyphwiki-batch430-2026-10-09/draw-trace.json'),s=json('../hanja-goal-glyphwiki-batch430-2026-10-09/sources.json')
 assert.equal(sha(bytes('./engine-whole-u8927.json')),c.actualFull5SHA256);assert.equal(sha(JSON.stringify(p)),'250b4fdbc638541d9bcfe7dd6d10dd75c92aa90f4d1c5c864ac95b847ebb7430')
 assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(Object.keys(h).sort(),['defaults','engineHashes','engineRevision','groups']);for(const k of Object.keys(h))assert.deepEqual(p[k],h[k]);assert.deepEqual(p.trace,tr)
 assert.deepEqual([p.groups.length,p.trace.flat().length,p.groups.flatMap(g=>g.polygons).length],[17,17,33]);assert.equal(Object.keys(p.engineHashes).length,8);assert.equal(c.capture.executions,1);assert.equal(c.capture.fetches,0);assert.equal(c.capture.sourceProjection,0)
 for(const[path,h]of Object.entries(c.originalFiles))assert.equal(sha(bytes('../../'+path)),h)
 assert.deepEqual(c.sourceFamily.records,Object.values(s.records));assert.equal(c.sourceFamily.selectedClosureCount,3);assert.deepEqual(c.sourceFamily.selectedClosureNames,['u8927','u8033-01','u8863-04'])
 for(const rec of c.sourceFamily.records)for(const row of rec.data.split('$')){const a=row.split(':');if(a[0]==='99')assert(c.sourceFamily.selectedClosureNames.includes(a[7]))}
 const positive=guard(p,SOURCE_IDENTITY,c.sourceFamily.records);assert(positive);assert(Object.isFrozen(positive));assert.equal(guard(p,copy(SOURCE_IDENTITY),copy(c.sourceFamily.records)),positive)
 const wrongP=copy(p);wrongP.trace[14][0].args[0]++;assert.equal(guard(wrongP,SOURCE_IDENTITY,c.sourceFamily.records),null)
 const wrongHeader=copy(p);wrongHeader.defaults.kWidth++;assert.equal(guard(wrongHeader,SOURCE_IDENTITY,c.sourceFamily.records),null)
 const wrongID=copy(SOURCE_IDENTITY);wrongID.sourceRoot='u8927-ue0102';assert.equal(guard(p,wrongID,c.sourceFamily.records),null)
 const wrongRecords=copy(c.sourceFamily.records);wrongRecords[0].data+=' ';assert.equal(guard(p,SOURCE_IDENTITY,wrongRecords),null)
 assert.equal(guard(h,SOURCE_IDENTITY,c.sourceFamily.records),null);let reads=0;const getter=copy(p);Object.defineProperty(getter,'trace',{enumerable:true,get(){reads++;return tr}});assert.equal(guard(getter,SOURCE_IDENTITY,c.sourceFamily.records),null);assert.equal(reads,0)
 assert.deepEqual(c.sourceGroupsProposed.flat(),Array.from({length:17},(_,i)=>i));assert.equal(c.hold.logicalPen,14);assert.equal(c.hold.newGeometryCorrection,false);assert.equal(c.nativeApproval,false);assert.equal(c.runtimeApplied,false);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false)
 console.log(JSON.stringify({actualFull5:true,originalHeader4AndTraceExact:true,closure:3,raw:17,calls:17,P:33,enginePins:8,engineExecutionInTest:0,sourceProjection:0,negative:6,getterCalls:0,HOLDPreserved:true,nativeApproval:false,runtimeApplied:false}))
})
