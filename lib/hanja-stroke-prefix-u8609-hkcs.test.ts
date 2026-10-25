import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import proof from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/17-alternative-prefix-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609PrefixContext,reviewedU8609PrefixPolicy,measureReviewedU8609PrefixFrame,REVIEWED_U8609_PREFIX_SOURCE,REVIEWED_U8609_PREFIX_INPUT_SHA256} from './hanja-stroke-prefix-u8609-hkcs.ts'
const f=fixture.hkcs_m8609,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
test('蘉17 context binds exact full20 source and unchanged original two-P curve',()=>{
 const c=makeReviewedU8609PrefixContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8609PrefixPolicy(c,16,0);assert(p)
 assert.deepEqual(p.segment,s[16][0]);assert.equal((p.segment.outline.match(/M/g)||[]).length,2);assert.equal(p.segment.revealWidth,14);assert.equal(p.segment.weight,10.681923)
 const bad=clone(f.fullProof);bad.trace[19][0].args[0]+=.1;assert.equal(makeReviewedU8609PrefixContext(bad,f.identity,s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[16][0].revealWidth=15;assert.equal(makeReviewedU8609PrefixContext(f.fullProof,f.identity,changed),null)
 assert.equal(makeReviewedU8609PrefixContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const accessor=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU8609PrefixContext(f.fullProof,accessor,s),null);assert.equal(reads,0)
 assert.equal(reviewedU8609PrefixPolicy({...c},16,0),null);for(const [pen,mask]of [[5,1],[13,1],[16,1],[9,0]])assert.equal(reviewedU8609PrefixPolicy(c,pen,mask),null)
})
test('蘉17 authored linear Y-prefix separates direct Q shortage and completion extent',()=>{
 const c=makeReviewedU8609PrefixContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8609PrefixPolicy(c,16,0);assert(p);let h=-Infinity
 for(const progress of [0,.000001,.01,.5,.79,.8,.999999,1]){const frame=measureReviewedU8609PrefixFrame(p,p.segment,progress);assert(frame.cutY>=h);h=frame.cutY;assert.equal(frame.clock,'authored-linear-source-y');assert.equal(frame.sourceGuide,p.segment.revealPath);assert.equal(frame.outline,progress===0?null:p.segment.outline);assert.equal(frame.status,progress===0?'empty':progress===1?'complete':'partial');assert.equal(frame.authoredCompletionExtension,progress>frame.authoredQEndBoundary);assert.equal(frame.rect.height,frame.cutY-64.35)}
 const end=measureReviewedU8609PrefixFrame(p,p.segment,1);assert.equal(end.cutY,74.6);assert(end.cutY>end.sourceQEndY);assert(Math.abs(end.authoredQEndBoundary-.7941463414634156)<1e-12)
 assert.equal(measureReviewedU8609PrefixFrame(p,p.segment,.79).authoredCompletionExtension,false);assert.equal(measureReviewedU8609PrefixFrame(p,p.segment,.8).authoredCompletionExtension,true)
})
test('蘉17 rejects forged policy/changed P-Q-width-weight and invalid clocks',()=>{
 const c=makeReviewedU8609PrefixContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8609PrefixPolicy(c,16,0);assert(p)
 assert.throws(()=>measureReviewedU8609PrefixFrame({...p},p.segment,.5));for(const patch of [{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1}])assert.throws(()=>measureReviewedU8609PrefixFrame(p,{...p.segment,...patch},.5));for(const progress of [-1,2,NaN,Infinity])assert.throws(()=>measureReviewedU8609PrefixFrame(p,p.segment,progress))
})
test('蘉17 reuses exact prefix proof without prior/micro/native approval or math replay',()=>{
 assert.equal(proof.alternativeYPrefix.criticalY.length,25);assert.equal(proof.alternativeYPrefix.openSlabs.length,24);assert.equal(proof.alternativeYPrefix.everyNonemptyPrefixConnected,true);assert.equal(proof.alternativeYPrefix.sourceQYDirectClipNotComplete,true);assert.equal(REVIEWED_U8609_PREFIX_SOURCE.virtualThirdP,false);assert.equal(REVIEWED_U8609_PREFIX_SOURCE.bodyHeadContactDimension,1);for(const k of ['originalTimingEquivalent','priorConnectivityApproved','initialMicroDirectionApproved','sharedRendererConnected','nativeApproval'] as const)assert.equal(REVIEWED_U8609_PREFIX_SOURCE[k],false)
 for(const[p,h]of Object.entries(REVIEWED_U8609_PREFIX_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
})
