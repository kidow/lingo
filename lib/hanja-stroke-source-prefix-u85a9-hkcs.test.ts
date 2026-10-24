import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU85a9HkcsSourcePrefixSourceContext,reviewedU85a9HkcsSourcePrefixContext,reviewedU85a9HkcsSourcePrefixPolicy,sampleReviewedU85a9HkcsSourcePrefixFrame,REVIEWED_U85a9_HKCS_SOURCE_PREFIX_SOURCE} from './hanja-stroke-source-prefix-u85a9-hkcs.ts'
const fixed=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u85a9-hkcs-2026-10-24/fixtures.json',import.meta.url),'utf8'))['hkcs_m85a9']
test('薩6m1 source P uses a new Y-prefix clock with completed prior5 and direct original completion',()=>{
 const context=makeReviewedU85a9HkcsSourcePrefixSourceContext(fixed.fullProof,fixed.identity,fixed.strokes)
 assert.ok(context);assert.equal(context,reviewedU85a9HkcsSourcePrefixContext(fixed.strokes))
 const policy=reviewedU85a9HkcsSourcePrefixPolicy(context,5,0);assert.ok(policy)
 assert.deepEqual(policy.segment,fixed.strokes[5][0]);assert.deepEqual(policy.predecessor,fixed.strokes[4][1])
 assert.equal(policy.previousPen,5);assert.equal(policy.previousMask,2)
 let lastHeight=0
 for(const progress of [1e-6,.01,.03,.5,.99999999]){
  const frame=sampleReviewedU85a9HkcsSourcePrefixFrame(policy,policy.segment,progress,1)
  assert.equal(frame.phase,'source-y-prefix');assert.equal(frame.originalPDirect,false);assert.equal(frame.UARead,false)
  assert.equal(frame.requiresCompletedOriginalPredecessor,true);assert.equal(frame.paintOriginalPOnce,true)
  assert.deepEqual(frame.clip,{x:23.05,y:49.4,width:34.75-23.05,height:26.95*progress})
  assert.ok(frame.clip);assert.ok(frame.clip.height>lastHeight);lastHeight=frame.clip.height
 }
 const empty=sampleReviewedU85a9HkcsSourcePrefixFrame(policy,policy.segment,0,0)
 assert.equal(empty.visible,false);assert.equal(empty.clip,null)
 const full=sampleReviewedU85a9HkcsSourcePrefixFrame(policy,policy.segment,1,1)
 assert.equal(full.originalPDirect,true);assert.equal(full.originalSourceFull,true);assert.equal(full.clip,null)
 assert.equal(policy.segment.revealPath,fixed.strokes[5][0].revealPath);assert.equal(policy.segment.weight,fixed.strokes[5][0].weight)
 assert.equal(reviewedU85a9HkcsSourcePrefixPolicy(context,5,1),null);assert.equal(reviewedU85a9HkcsSourcePrefixPolicy(null,5,0),null)
 for(const previous of [0,.99999999,NaN,Infinity])assert.throws(()=>sampleReviewedU85a9HkcsSourcePrefixFrame(policy,policy.segment,.03,previous))
 for(const progress of [-1,1.01,NaN,Infinity])assert.throws(()=>sampleReviewedU85a9HkcsSourcePrefixFrame(policy,policy.segment,progress,1))
 assert.throws(()=>sampleReviewedU85a9HkcsSourcePrefixFrame({...policy} as never,policy.segment,.03,1))
 assert.throws(()=>sampleReviewedU85a9HkcsSourcePrefixFrame(policy,{...policy.segment,revealPath:policy.segment.revealPath+' '},.03,1))
 const wrong=structuredClone(fixed.strokes);wrong[4][1].outline+=' ';assert.equal(reviewedU85a9HkcsSourcePrefixContext(wrong),null)
 assert.equal(REVIEWED_U85a9_HKCS_SOURCE_PREFIX_SOURCE.nativeApproval,false)
})
