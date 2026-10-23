import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU7e81CardinalSourceContext,reviewedU7e81CardinalContext,reviewedU7e81CardinalPolicy,sampleReviewedU7e81CardinalFrame,REVIEWED_U7E81_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u7e81.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7e81-2026-10-24/fixtures.json',import.meta.url),'utf8')).u7e81,s=f.strokes
test('纁10V original contact bands FIRST',()=>{
 const ctx=reviewedU7e81CardinalContext(s);assert(ctx);assert.equal(makeReviewedU7e81CardinalSourceContext(f.fullProof,f.identity,s),ctx);assert.equal(makeReviewedU7e81CardinalSourceContext(f.fullProof,{...f.identity,sourceRoot:"wrong"},s),null);assert.equal(reviewedU7e81CardinalPolicy(ctx,0,0),null);
 for(const pen of[10]){const policy=reviewedU7e81CardinalPolicy(ctx,pen-1,1);assert(policy);const seg=s[pen-1][1];for(const p of[1e-10,.03,.5,.99999999]){const frame=sampleReviewedU7e81CardinalFrame(policy,seg,p,1);assert(frame.clip);assert.equal(frame.originalPDirect,false);if(policy.axis==='y'){assert.equal(frame.clip.x,81.85);assert.equal(frame.clip.y,30.95-3.5*p);assert.equal(frame.clip.width,8.5);assert(Math.abs(frame.clip.height-29.3*p)<1e-12)}}
 assert.equal(sampleReviewedU7e81CardinalFrame(policy,seg,0,0).visible,false);assert.equal(sampleReviewedU7e81CardinalFrame(policy,seg,1,1).originalPDirect,true);for(const p of[NaN,Infinity,-1,1.1])assert.throws(()=>sampleReviewedU7e81CardinalFrame(policy,seg,p,1));assert.throws(()=>sampleReviewedU7e81CardinalFrame(policy,seg,.03,.999));assert.throws(()=>sampleReviewedU7e81CardinalFrame({...policy},seg,.03,1));assert.throws(()=>sampleReviewedU7e81CardinalFrame(policy,{...seg,weight:1},.03,1));}
 assert.equal(REVIEWED_U7E81_CARDINAL_SOURCE.nativeApproval,false);
})
