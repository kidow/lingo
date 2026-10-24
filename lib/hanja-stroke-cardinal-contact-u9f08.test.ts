import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU9f08CardinalSourceContext,reviewedU9f08CardinalContext,reviewedU9f08CardinalPolicy,sampleReviewedU9f08CardinalFrame} from './hanja-stroke-cardinal-contact-u9f08.ts'
const fixed=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u9f08-2026-10-24/fixtures.json',import.meta.url),'utf8')).u9f08
test('鼈13/22 bands bind their independent original P and completed original H',()=>{
 const context=makeReviewedU9f08CardinalSourceContext(fixed.fullProof,fixed.identity,fixed.strokes);assert.ok(context);assert.equal(context,reviewedU9f08CardinalContext(fixed.strokes))
 for(const [pen,origin,positive] of [[13,45.15,13.5],[22,63.1,20.3]]){
  const policy=reviewedU9f08CardinalPolicy(context,pen-1,1);assert.ok(policy);assert.equal(policy.id,'u9f08-'+pen+'-2');assert.deepEqual(policy.segment,fixed.strokes[pen-1][1]);assert.deepEqual(policy.predecessor,fixed.strokes[pen-1][0])
  const frame=sampleReviewedU9f08CardinalFrame(policy,policy.segment,.03,1);assert.equal(frame.phase,'contact-prefix');assert.equal(frame.UARead,false);assert.equal(frame.requiresCompletedOriginalPredecessor,true);assert.deepEqual(frame.clip,{x:policy.segment.bounds[0],y:origin-3.5*.03,width:8.5,height:(3.5+positive)*.03})
  assert.equal(sampleReviewedU9f08CardinalFrame(policy,policy.segment,0,0).visible,false);const full=sampleReviewedU9f08CardinalFrame(policy,policy.segment,1,1);assert.equal(full.originalPDirect,true);assert.equal(full.clip,null)
  for(const p of[-1,1.1,NaN])assert.throws(()=>sampleReviewedU9f08CardinalFrame(policy,policy.segment,p,1));for(const previous of[0,.99999999,NaN])assert.throws(()=>sampleReviewedU9f08CardinalFrame(policy,policy.segment,.03,previous))
  assert.throws(()=>sampleReviewedU9f08CardinalFrame({...policy} as never,policy.segment,.03,1));assert.throws(()=>sampleReviewedU9f08CardinalFrame(policy,{...policy.segment,weight:policy.segment.weight+1},.03,1))
 }
 assert.equal(reviewedU9f08CardinalPolicy(context,3,1),null);assert.equal(reviewedU9f08CardinalPolicy(null,12,1),null)
 const wrong=structuredClone(fixed.strokes);wrong[12][0].outline+=' ';assert.equal(reviewedU9f08CardinalContext(wrong),null)
})
