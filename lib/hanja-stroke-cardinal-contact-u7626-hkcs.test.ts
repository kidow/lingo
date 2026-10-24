import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync}from'node:fs'
import {makeReviewedU7626HkcsCardinalSourceContext,reviewedU7626HkcsCardinalContext,reviewedU7626HkcsCardinalPolicy,sampleReviewedU7626HkcsCardinalFrame}from'./hanja-stroke-cardinal-contact-u7626-hkcs.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7626-hkcs-2026-10-24/fixtures.json',import.meta.url),'utf8')).hkcs_m7626
test('瘦10m2 exact source band keeps its completed original H and original fields',()=>{
 const context=makeReviewedU7626HkcsCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert(context);assert.equal(context,reviewedU7626HkcsCardinalContext(f.strokes))
 const p=reviewedU7626HkcsCardinalPolicy(context,9,1);assert(p);assert.deepEqual(p.predecessor,f.strokes[9][0]);assert.deepEqual(p.segment,f.strokes[9][1]);assert.equal(p.origin,33.3);assert.equal(p.negativeExtent,3.5);assert.equal(p.positiveExtent,26.45)
 const b=p.segment.bounds,frame=sampleReviewedU7626HkcsCardinalFrame(p,p.segment,.03,1);assert.deepEqual(frame.clip,{x:b[0],y:33.3-3.5*.03,width:b[2]-b[0],height:(3.5+26.45)*.03});assert.equal(frame.UARead,false)
 assert.equal(sampleReviewedU7626HkcsCardinalFrame(p,p.segment,0,0).visible,false);assert.equal(sampleReviewedU7626HkcsCardinalFrame(p,p.segment,1,1).originalPDirect,true)
 for(const prev of[0,.99999999,NaN])assert.throws(()=>sampleReviewedU7626HkcsCardinalFrame(p,p.segment,.03,prev))
 for(const progress of[-1,NaN,1.01])assert.throws(()=>sampleReviewedU7626HkcsCardinalFrame(p,p.segment,progress,1))
 assert.throws(()=>sampleReviewedU7626HkcsCardinalFrame({...p}as never,p.segment,.03,1));assert.equal(reviewedU7626HkcsCardinalPolicy(context,9,0),null)
})
