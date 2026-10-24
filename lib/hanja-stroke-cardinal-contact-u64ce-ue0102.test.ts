import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU64ceUe0102CardinalContext,makeReviewedU64ceUe0102CardinalSourceContext,reviewedU64ceUe0102CardinalPolicy,sampleReviewedU64ceUe0102CardinalFrame,REVIEWED_U64CE_UE0102_CARDINAL_SOURCE as SOURCE} from './hanja-stroke-cardinal-contact-u64ce-ue0102.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u64ce-ue0102-2026-10-24/fixtures.json',import.meta.url),'utf8'))['u64ce-ue0102'],strokes=f.strokes,context=reviewedU64ceUe0102CardinalContext(strokes),clone=(x:any)=>JSON.parse(JSON.stringify(x)),sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex')
test('擎 original8m2 cardinal band binding and transition FIRST',()=>{
 assert(context);assert.equal(makeReviewedU64ceUe0102CardinalSourceContext({...f.fullProof,engineRevision:'wrong'},f.identity,strokes),null);assert.equal(makeReviewedU64ceUe0102CardinalSourceContext(f.fullProof,f.identity,strokes),context);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.equal(sha(readFileSync(new URL('../'+SOURCE.fixture,import.meta.url))),SOURCE.fixtureSHA256)
 const q=reviewedU64ceUe0102CardinalPolicy(context,7,1);assert(q);assert.equal(q.axis,'y');assert.equal(q.origin,31.2);assert.equal(q.negativeExtent,3.5);assert.equal(q.positiveExtent,15.4);assert.deepEqual(q.segment,strokes[7][1]);assert.deepEqual(q.predecessor,strokes[7][0])
 for(const p of[0,1e-6,.03,.5,.9999,1]){const a=sampleReviewedU64ceUe0102CardinalFrame(q,q.segment,p,1);assert.equal(a.visible,p>0);assert.equal(a.originalPDirect,p===1);if(p>0&&p<1){assert(a.clip);assert(a.clip.width>0&&a.clip.height>0);assert.equal(a.UARead,false)}}
 assert.throws(()=>sampleReviewedU64ceUe0102CardinalFrame(q,q.segment,.1,0));assert.throws(()=>sampleReviewedU64ceUe0102CardinalFrame(q,{...q.segment,outline:q.segment.outline+' '},.1,1));const changed=clone(strokes);changed[7][1].outline+=' ';assert.equal(reviewedU64ceUe0102CardinalContext(changed),null);assert.equal(reviewedU64ceUe0102CardinalPolicy({...context},7,1),null);assert.equal(SOURCE.nativeApproval,false)
 console.log(JSON.stringify({newCardinalTargets:1,finiteFrames:6,newSourceMathReused:true,nativeApproval:false}))
})
