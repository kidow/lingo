import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU8438KCardinalSourceContext,reviewedU8438KCardinalContext,reviewedU8438KCardinalPolicy,sampleReviewedU8438KCardinalFrame} from './hanja-stroke-cardinal-contact-u8438-k.ts'
const fixed=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u8438-k-2026-10-24/fixtures.json',import.meta.url),'utf8'))['u8438-k']
test('萸9m2 uses its exact original source and a completed original predecessor',()=>{
 const context=makeReviewedU8438KCardinalSourceContext(fixed.fullProof,fixed.identity,fixed.strokes)
 assert.ok(context);assert.equal(context,reviewedU8438KCardinalContext(fixed.strokes))
 const policy=reviewedU8438KCardinalPolicy(context,8,1);assert.ok(policy)
 assert.equal(policy.id,'u8438-k-9-2');assert.deepEqual(policy.predecessor,fixed.strokes[8][0]);assert.deepEqual(policy.segment,fixed.strokes[8][1])
 const frame=sampleReviewedU8438KCardinalFrame(policy,fixed.strokes[8][1],.03,1)
 assert.equal(frame.phase,'contact-prefix');assert.equal(frame.requiresCompletedOriginalPredecessor,true);assert.equal(frame.UARead,false)
 assert.deepEqual(frame.clip,{x:78.5,y:35.65-3.5*.03,width:8.5,height:42.5*.03})
 assert.equal(sampleReviewedU8438KCardinalFrame(policy,policy.segment,0,0).visible,false)
 const full=sampleReviewedU8438KCardinalFrame(policy,policy.segment,1,1);assert.equal(full.originalPDirect,true);assert.equal(full.clip,null)
 assert.equal(reviewedU8438KCardinalPolicy(context,8,0),null);assert.equal(reviewedU8438KCardinalPolicy(null,8,1),null)
 for(const previous of[0,.99999999,NaN])assert.throws(()=>sampleReviewedU8438KCardinalFrame(policy,policy.segment,.03,previous))
 for(const progress of[-1,1.01,NaN])assert.throws(()=>sampleReviewedU8438KCardinalFrame(policy,policy.segment,progress,1))
 assert.throws(()=>sampleReviewedU8438KCardinalFrame({...policy} as never,policy.segment,.03,1))
 assert.throws(()=>sampleReviewedU8438KCardinalFrame(policy,{...policy.segment,weight:policy.segment.weight+1},.03,1))
 const wrong=structuredClone(fixed.strokes);wrong[8][0].outline+=' ';assert.equal(reviewedU8438KCardinalContext(wrong),null)
})
