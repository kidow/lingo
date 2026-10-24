import assert from'node:assert/strict'
import test from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeReviewedU82d4KFootSourceContext,reviewedU82d4KFootContext,reviewedU82d4KFootPolicy,sampleReviewedU82d4KFootFrame,verifyReviewedU82d4KFootPrior,REVIEWED_U82d4K_FOOT_SOURCE as SOURCE}from'./hanja-stroke-source-foot-u82d4-k.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:Buffer|string)=>createHash('sha256').update(v).digest('hex')
test('苔 source foot retains exact P and gap with source-X continuous completion',()=>{
 const f=JSON.parse(bytes(SOURCE.fixture).toString()).u82d4_k;assert.equal(sha(bytes(SOURCE.fixture)),SOURCE.fixtureSHA256);assert.equal(sha(bytes(SOURCE.proof)),SOURCE.proofSHA256);assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256)
 const ctx=makeReviewedU82d4KFootSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);assert.equal(ctx,reviewedU82d4KFootContext(f.strokes));const p=reviewedU82d4KFootPolicy(ctx,4,1);assert(p);assert.deepEqual(p.segment,f.strokes[4][1]);assert.deepEqual(p.previousSegment,f.strokes[4][0]);assert.equal(p.phaseShareExact,'3711565983/10109987065');assert.equal(p.previousCompletion,'original-Q7-tube')
 assert.equal(reviewedU82d4KFootPolicy({...ctx},4,1),null);assert.equal(reviewedU82d4KFootPolicy(ctx,4,0),null);assert.throws(()=>sampleReviewedU82d4KFootFrame(p,p.segment,.01,.999));assert.throws(()=>sampleReviewedU82d4KFootFrame(p,{...p.segment,weight:p.segment.weight+1},.1,1));assert.throws(()=>sampleReviewedU82d4KFootFrame(p,p.segment,NaN,1));assert.equal(verifyReviewedU82d4KFootPrior(p,null,1),false)
 for(const t of[0,1e-6,.01,p.phaseShare-1e-10,p.phaseShare,p.phaseShare+1e-10,.75,.99999999,1]){const x=sampleReviewedU82d4KFootFrame(p,p.segment,t,1);assert.equal(x.UARead,false);assert.equal(x.paintOriginalPOnce,true);assert.equal(x.originalPDirect,t===1);assert.equal(x.originalSourceFull,t===1);assert(x.bodyClip.width>=0);assert(x.fullFootClip.width>=0);if(t===0){assert.equal(x.footPathD,'');assert.equal(x.bodyClip.width,0);assert.equal(x.fullFootClip.width,0)}if(t===1){assert.equal(x.footFullTriangles,9);assert.equal(x.bodyClip.width,49);assert.equal(x.fullFootClip.width,17.2);assert.equal(x.completionDirectOriginalOutlineRequired,true)}}
 const changed=structuredClone(f.strokes);changed[0][0].weight++;assert.equal(reviewedU82d4KFootContext(changed),null);assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.guideGapPreserved,true)
})
