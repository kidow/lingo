import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU6f11CardinalSourceContext,reviewedU6f11CardinalContext,reviewedU6f11CardinalPolicy,sampleReviewedU6f11CardinalFrame,REVIEWED_U6F11_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u6f11.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u6f11-2026-10-24/fixtures.json',import.meta.url),'utf8')).u6f11,s=f.strokes
test('漑5V/12H original contact bands FIRST',()=>{
 const ctx=reviewedU6f11CardinalContext(s);assert(ctx);assert.equal(makeReviewedU6f11CardinalSourceContext(f.fullProof,f.identity,s),ctx);assert.equal(makeReviewedU6f11CardinalSourceContext(f.fullProof,{...f.identity,sourceRoot:"wrong"},s),null);assert.equal(reviewedU6f11CardinalPolicy(ctx,0,0),null);
 for(const pen of[5,12]){const policy=reviewedU6f11CardinalPolicy(ctx,pen-1,1);assert(policy);const seg=s[pen-1][1];for(const p of[1e-10,.03,.5,.99999999]){const frame=sampleReviewedU6f11CardinalFrame(policy,seg,p,1);assert(frame.clip);assert.equal(frame.originalPDirect,false);if(policy.axis==='y'){assert.equal(frame.clip.x,51.75);assert.equal(frame.clip.y,20.5-3.5*p);assert.equal(frame.clip.width,8.5);assert(Math.abs(frame.clip.height-33.5*p)<1e-12)}else{assert.equal(frame.clip.x,66.75-7.15*p);assert.equal(frame.clip.y,45);assert.equal(frame.clip.height,6.5);assert(Math.abs(frame.clip.width-33.45*p)<1e-12)}}
 assert.equal(sampleReviewedU6f11CardinalFrame(policy,seg,0,0).visible,false);assert.equal(sampleReviewedU6f11CardinalFrame(policy,seg,1,1).originalPDirect,true);for(const p of[NaN,Infinity,-1,1.1])assert.throws(()=>sampleReviewedU6f11CardinalFrame(policy,seg,p,1));assert.throws(()=>sampleReviewedU6f11CardinalFrame(policy,seg,.03,.999));assert.throws(()=>sampleReviewedU6f11CardinalFrame({...policy},seg,.03,1));assert.throws(()=>sampleReviewedU6f11CardinalFrame(policy,{...seg,weight:1},.03,1));}
 assert.equal(REVIEWED_U6F11_CARDINAL_SOURCE.nativeApproval,false);
})
