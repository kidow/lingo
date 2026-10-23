import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU8fe8CardinalSourceContext,reviewedU8fe8CardinalContext,reviewedU8fe8CardinalPolicy,sampleReviewedU8fe8CardinalFrame,REVIEWED_U8FE8_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u8fe8.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u8fe8-2026-10-24/fixtures.json',import.meta.url),'utf8')).u8fe8,s=f.strokes
test('迨4/8 original V convex contact and clip FIRST',()=>{
 const ctx=reviewedU8fe8CardinalContext(s);assert(ctx);assert.equal(makeReviewedU8fe8CardinalSourceContext(f.fullProof,f.identity,s),ctx);assert.equal(makeReviewedU8fe8CardinalSourceContext(f.fullProof,{...f.identity,sourceRoot:"wrong"},s),null);assert.equal(reviewedU8fe8CardinalPolicy(ctx,0,0),null);
 for(const pen of[4,8]){const policy=reviewedU8fe8CardinalPolicy(ctx,pen-1,1);assert(policy);const seg=s[pen-1][1];for(const p of[1e-10,.03,.5,.99999999]){const f=sampleReviewedU8fe8CardinalFrame(policy,seg,p,1);assert(f.clip);assert.equal(f.clip.x,policy.x);assert.equal(f.clip.width,8.5);assert.equal(f.clip.y,policy.originY-3.5*p);assert(Math.abs(f.clip.height-(policy.up+policy.down)*p)<1e-13);const wy=policy.originY+Math.min(policy.down*p/2,.1);assert(wy>=f.clip.y&&wy<=f.clip.y+f.clip.height);assert.equal(f.originalPDirect,false)}
 assert.equal(sampleReviewedU8fe8CardinalFrame(policy,seg,0,0).visible,false);assert.equal(sampleReviewedU8fe8CardinalFrame(policy,seg,1,1).originalPDirect,true);for(const p of[NaN,Infinity,-1,1.1])assert.throws(()=>sampleReviewedU8fe8CardinalFrame(policy,seg,p,1));assert.throws(()=>sampleReviewedU8fe8CardinalFrame(policy,seg,.03,.999));assert.throws(()=>sampleReviewedU8fe8CardinalFrame({...policy},seg,.03,1));assert.throws(()=>sampleReviewedU8fe8CardinalFrame(policy,{...seg,weight:1},.03,1));}
 assert.equal(REVIEWED_U8FE8_CARDINAL_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U8FE8_CARDINAL_SOURCE.proof.length,2);
})
