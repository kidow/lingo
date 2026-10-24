import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU8ff2KCardinalContext,makeReviewedU8ff2KCardinalSourceContext,reviewedU8ff2KCardinalPolicy,sampleReviewedU8ff2KCardinalFrame,REVIEWED_U8FF2K_CARDINAL_SOURCE as SOURCE} from './hanja-stroke-cardinal-contact-u8ff2-k.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u8ff2-k-2026-10-24/fixtures.json',import.meta.url),'utf8'))['u8ff2-k'],strokes=f.strokes,context=reviewedU8ff2KCardinalContext(strokes),clone=(x:any)=>JSON.parse(JSON.stringify(x)),sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex')
test('迲 original8m2 cardinal band binding and transition FIRST',()=>{
 assert(context);assert.equal(makeReviewedU8ff2KCardinalSourceContext(f.fullProof,f.identity,strokes),context);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.equal(sha(readFileSync(new URL('../'+SOURCE.fixture,import.meta.url))),SOURCE.fixtureSHA256)
 const q=reviewedU8ff2KCardinalPolicy(context,7,1);assert(q);assert.equal(q.axis,'y');assert.equal(q.origin,53.5);assert.equal(q.negativeExtent,3.5);assert.equal(q.positiveExtent,27);assert.deepEqual(q.segment,strokes[7][1]);assert.deepEqual(q.predecessor,strokes[7][0])
 for(const p of[0,1e-6,.03,.5,.9999,1]){const a=sampleReviewedU8ff2KCardinalFrame(q,q.segment,p,1);assert.equal(a.visible,p>0);assert.equal(a.originalPDirect,p===1);if(p>0&&p<1){assert(a.clip);assert(a.clip.width>0&&a.clip.height>0);assert.equal(a.UARead,false)}}
 assert.throws(()=>sampleReviewedU8ff2KCardinalFrame(q,q.segment,.1,0));assert.throws(()=>sampleReviewedU8ff2KCardinalFrame(q,{...q.segment,outline:q.segment.outline+' '},.1,1));const changed=clone(strokes);changed[7][1].outline+=' ';assert.equal(reviewedU8ff2KCardinalContext(changed),null);assert.equal(reviewedU8ff2KCardinalPolicy({...context},7,1),null);assert.equal(SOURCE.nativeApproval,false)
 console.log(JSON.stringify({newCardinalTargets:1,finiteFrames:6,newSourceMathReused:true,nativeApproval:false}))
})
