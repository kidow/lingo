import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609FoldContext,reviewedU8609FoldPolicy,measureReviewedU8609FoldFrame,REVIEWED_U8609_FOLD_SOURCE,REVIEWED_U8609_FOLD_INPUT_SHA256} from './hanja-stroke-fold-u8609-hkcs.ts'
const f=fixture.hkcs_m8609,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
test('蘉 fold context binds complete original source, identity and unchanged outline20',()=>{
 assert(makeReviewedU8609FoldContext(f.fullProof,f.identity,s))
 const bad=clone(f.fullProof);bad.trace[16][0].args[0]+=.1;assert.equal(makeReviewedU8609FoldContext(bad,f.identity,s),null)
 const badOrder=clone(s).map(p=>[...p]);[badOrder[2],badOrder[3]]=[badOrder[3],badOrder[2]];assert.equal(makeReviewedU8609FoldContext(f.fullProof,f.identity,badOrder),null)
 assert.equal(makeReviewedU8609FoldContext(f.fullProof,{...f.identity,sourceRoot:'unreviewed'},s),null)
 let reads=0;const accessor=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU8609FoldContext(f.fullProof,accessor,s),null);assert.equal(reads,0)
})
test('蘉6 exact Q seam and14 noncoincident seam remain distinct fixed policies',()=>{
 const c=makeReviewedU8609FoldContext(f.fullProof,f.identity,s);assert(c)
 for(const [pen,anchor,seam]of [[6,[76.5,23.5],'exact'],[14,[74,48],'noncoincident-original-P-contact']] as const){
  const p=reviewedU8609FoldPolicy(c,pen-1,1);assert(p);assert.deepEqual(p.spec.anchor,anchor);assert.equal(p.spec.qSeam,seam);assert.deepEqual(p.segment,s[pen-1][1]);assert.deepEqual(p.priorSegment,s[pen-1][0]);assert.equal(p.spec.commonKernelHalfWidth,.3)
  const raw=p.spec.rawOneBased[1]-1;const originalHead=f.fullProof.trace[raw][0].polygons[1].map(v=>[v.x/2,v.y/2]);const head=[...p.spec.headPath.matchAll(/[ML](-?[0-9.]+) (-?[0-9.]+)/g)].map(m=>[+m[1],+m[2]]);assert.deepEqual(head.map(p=>JSON.stringify(p)).sort(),originalHead.map(p=>JSON.stringify(p)).sort())
 }
 assert.equal(reviewedU8609FoldPolicy(c,16,0),null);assert.equal(reviewedU8609FoldPolicy({...c},5,1),null)
})
test('蘉 authored clip clock hides0, preserves full source1 and requires opaque prior',()=>{
 const c=makeReviewedU8609FoldContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of [6,14]){const p=reviewedU8609FoldPolicy(c,pen-1,1);assert(p);let height=-1
  for(const progress of [0,.000001,.01,.5,1]){const frame=measureReviewedU8609FoldFrame(p,p.segment,p.priorSegment,progress,true);assert.equal(frame.headScale,progress);assert(frame.bodyRect.height>=height);height=frame.bodyRect.height;assert.equal(frame.clock,'authored-local-linear-body-and-head');assert.equal(frame.outline,progress===0?null:p.segment.outline);assert.equal(frame.status,progress===0?'empty':progress===1?'complete':'partial')}
  assert.throws(()=>measureReviewedU8609FoldFrame(p,p.segment,p.priorSegment,.5,false));assert.throws(()=>measureReviewedU8609FoldFrame({...p},p.segment,p.priorSegment,.5,true));assert.throws(()=>measureReviewedU8609FoldFrame(p,{...p.segment,weight:p.segment.weight+.1},p.priorSegment,.5,true));assert.throws(()=>measureReviewedU8609FoldFrame(p,p.segment,{...p.priorSegment,outline:'M0 0Z'},.5,true));for(const value of [-1,2,NaN,Infinity])assert.throws(()=>measureReviewedU8609FoldFrame(p,p.segment,p.priorSegment,value,true))
 }
 assert.equal(REVIEWED_U8609_FOLD_SOURCE.originalTimingEquivalent,false);assert.equal(REVIEWED_U8609_FOLD_SOURCE.sharedRendererConnected,false);assert.equal(REVIEWED_U8609_FOLD_SOURCE.nativeApproval,false)
})
test('蘉 contact proof input pins stay exact without math replay',()=>{for(const[p,h]of Object.entries(REVIEWED_U8609_FOLD_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)})
