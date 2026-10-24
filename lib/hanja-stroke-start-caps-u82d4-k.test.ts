import assert from'node:assert/strict'
import test from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeReviewedU82d4KSourceContext,reviewedU82d4KContext,reviewedU82d4KPolicy,measureReviewedU82d4KFrame,commitReviewedU82d4KCaps,REVIEWED_U82d4K_SOURCE as SOURCE,REVIEWED_U82d4K_PROOFS as PROOFS}from'./hanja-stroke-start-caps-u82d4-k.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:Buffer|string)=>createHash('sha256').update(v).digest('hex')
test('苔 two independent source Q caps bind whole9 and retained certificates',()=>{
 const f=JSON.parse(bytes(SOURCE.sourceCacheFile).toString()).u82d4_k,proof=JSON.parse(bytes(SOURCE.proofFile).toString())
 assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.equal(sha(bytes(SOURCE.proofFile)),SOURCE.proofSHA256);assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256);assert.deepEqual(PROOFS,proof.initialCertificates)
 const ctx=makeReviewedU82d4KSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);assert.equal(ctx,reviewedU82d4KContext(f.strokes))
 for(const pen of[4,5]){const p=reviewedU82d4KPolicy(ctx,pen,0);assert(p);assert.equal(p.certificate.T,'1/2');assert.equal(p.certificate.K,'1/20');assert.equal(p.certificate.initialArcMax,7);assert.deepEqual(p.segment,f.strokes[pen][0]);assert.throws(()=>measureReviewedU82d4KFrame(p,p.segment,.01,null));assert.equal(commitReviewedU82d4KCaps(p,p.segment,.01,'x',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')}
 assert.equal(reviewedU82d4KPolicy(ctx,4,1),null);assert.equal(reviewedU82d4KPolicy({...ctx},4,0),null);const changed=structuredClone(f.strokes);changed[8][0].weight++;assert.equal(reviewedU82d4KContext(changed),null);assert.equal(makeReviewedU82d4KSourceContext(f.fullProof,{...f.identity,sourceRoot:'u82d4'},f.strokes),null)
 let reads=0;const getter={...f.identity};Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'u82d4-k'}});assert.equal(makeReviewedU82d4KSourceContext(f.fullProof,getter,f.strokes),null);assert.equal(reads,0);assert.equal(SOURCE.nativeApproval,false)
})
