import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import proof from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/14-prior-window-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8b92HkcsSourceContext,reviewedU8b92HkcsPolicy} from './hanja-stroke-start-caps-u8b92-hkcs.ts'
import {makeReviewedU8b92PriorWindowSourceContext,reviewedU8b92PriorWindowPolicy,measureReviewedU8b92PriorWindowFrame,REVIEWED_U8B92_PRIOR_WINDOW_SOURCE,REVIEWED_U8B92_PRIOR_WINDOW_INPUT_SHA256} from './hanja-stroke-prior-window-u8b92-hkcs.ts'
const f=fixture.hkcs_m8b92,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
test('讒14 delegates the exact existing whole source context and keeps normal cap dispatch held',()=>{
 const c=makeReviewedU8b92PriorWindowSourceContext(f.fullProof,f.identity,s);assert(c);assert.equal(c,makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,s));assert.equal(reviewedU8b92HkcsPolicy(c,13,1),null)
 const p=reviewedU8b92PriorWindowPolicy(c,13,1);assert(p);assert.deepEqual(p.segment,s[13][1]);assert.deepEqual(p.priorSegment,s[13][0]);assert.equal((p.segment.outline.match(/M/g)||[]).length,3)
 const bad=clone(f.fullProof);bad.trace[18][0].args[0]+=.1;assert.equal(makeReviewedU8b92PriorWindowSourceContext(bad,f.identity,s),null);assert.equal(makeReviewedU8b92PriorWindowSourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const a=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU8b92PriorWindowSourceContext(f.fullProof,a,s),null);assert.equal(reads,0)
 assert.equal(reviewedU8b92PriorWindowPolicy({...c},13,1),null);assert.equal(reviewedU8b92PriorWindowPolicy(c,13,0),null)
})
test('讒14 authored X-window starts empty, contains contact column and completes original P3',()=>{
 const c=makeReviewedU8b92PriorWindowSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8b92PriorWindowPolicy(c,13,1);assert(p);let left=Infinity,right=-Infinity
 for(const progress of [0,.000001,.01,.1,.5,.9,1]){const frame=measureReviewedU8b92PriorWindowFrame(p,p.segment,p.priorSegment,progress,true);assert(frame.left<=left&&frame.right>=right);left=frame.left;right=frame.right;assert(frame.left<=48&&48<=frame.right);assert.equal(frame.outline,progress===0?null:p.segment.outline);assert.equal(frame.sourceGuide,'M39 50 Q48 49 66 46');assert.equal(frame.status,progress===0?'empty':progress===1?'complete':'partial');assert.equal(frame.rect.width,frame.right-frame.left);assert.equal(frame.clock,'authored-contact-column-x-window')}
 assert.equal(left,38.15);assert.equal(right,66.05);assert.deepEqual(REVIEWED_U8B92_PRIOR_WINDOW_SOURCE.originalQSeam,[-9,2.5]);assert.equal(REVIEWED_U8B92_PRIOR_WINDOW_SOURCE.actualPriorOpaqueVerified,false)
})
test('讒14 rejects forged policy, mutated current/prior and absent opaque prior',()=>{
 const c=makeReviewedU8b92PriorWindowSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8b92PriorWindowPolicy(c,13,1);assert(p)
 assert.throws(()=>measureReviewedU8b92PriorWindowFrame({...p},p.segment,p.priorSegment,.5,true));assert.throws(()=>measureReviewedU8b92PriorWindowFrame(p,p.segment,p.priorSegment,.5,false));assert.equal(measureReviewedU8b92PriorWindowFrame(p,p.segment,p.priorSegment,0,false).status,'empty')
 for(const patch of [{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1}])assert.throws(()=>measureReviewedU8b92PriorWindowFrame(p,{...p.segment,...patch},p.priorSegment,.5,true));assert.throws(()=>measureReviewedU8b92PriorWindowFrame(p,p.segment,{...p.priorSegment,weight:p.priorSegment.weight+.1},.5,true));for(const n of [-1,2,NaN,Infinity])assert.throws(()=>measureReviewedU8b92PriorWindowFrame(p,p.segment,p.priorSegment,n,true))
})
test('讒14 exact prior proof and source pins stay separate from native/clock approval',()=>{
 assert.equal(proof.verticalSlices.criticalX.length,26);assert.equal(proof.verticalSlices.openSlabs.length,25);assert.equal(proof.verticalSlices.everyClosedSliceSingleInterval,true);assert.equal(proof.candidateWindow.positivePriorOverlapForEveryPositiveP,true);assert.equal(proof.normalGrowingFrontCounterexample.newInkVisibleButPriorDisjointForSufficientlySmallPositiveArc,true)
 for(const k of ['virtualConnector','sourceGuideReversed','originalTimingEquivalent','sharedRendererConnected','nativeApproval','runtimeApplied'] as const)assert.equal(REVIEWED_U8B92_PRIOR_WINDOW_SOURCE[k],false)
 for(const[p,h]of Object.entries(REVIEWED_U8B92_PRIOR_WINDOW_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
})
