import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609PointFoldContext,reviewedU8609PointFoldPolicy,measureReviewedU8609PointFoldFrame,REVIEWED_U8609_POINT_FOLD_INPUT_SHA256} from './hanja-stroke-point-fold-u8609-hkcs.ts'
import {makeReviewedU8609FoldContext,reviewedU8609FoldPolicy} from './hanja-stroke-fold-u8609-hkcs.ts'
const f=fixture.hkcs_m8609,s=f.strokes as HanjaOutlineStrokes,ctx=makeReviewedU8609PointFoldContext(f.fullProof,f.identity,s)
assert(ctx)
test('蘉 point-fold has zero initial diameter, nested source windows and exact full source bounds',()=>{
 for(const pen of[6,14]){const p=reviewedU8609PointFoldPolicy(ctx,pen-1,1);assert(p);const [ax,ay]=p.spec.anchor,[x0,y0,x1,y1]=p.segment.bounds;let width=-1,height=-1
  for(const progress of[0,1e-8,1e-6,.001,.01,.03,.5,1]){const f=measureReviewedU8609PointFoldFrame(p,p.segment,p.priorSegment,progress,true);assert.equal(f.progress,progress);assert(f.rect.width>=width&&f.rect.height>=height);width=f.rect.width;height=f.rect.height;assert.equal(f.rect.width,(x1-x0)*progress);assert.equal(f.rect.height,(y1-y0)*progress);assert.equal(f.outline,progress===0?null:p.segment.outline);assert.equal(f.originalPDirect,progress===1);assert(f.rect.x<=ax&&f.rect.y<=ay);assert(f.rect.x+f.rect.width>=ax-1e-12&&f.rect.y+f.rect.height>=ay-1e-12)}
  assert.deepEqual(measureReviewedU8609PointFoldFrame(p,p.segment,p.priorSegment,0,false).rect,{x:ax,y:ay,width:0,height:0});assert.deepEqual(measureReviewedU8609PointFoldFrame(p,p.segment,p.priorSegment,1,true).rect,{x:x0,y:y0,width:x1-x0,height:y1-y0})
 }
})
test('蘉 point-fold rejects old policy, cloned private policy, changed source and nonopaque prior',()=>{
 for(const pen of[6,14]){const p=reviewedU8609PointFoldPolicy(ctx,pen-1,1);assert(p);const oldCtx=makeReviewedU8609FoldContext(f.fullProof,f.identity,s),old=reviewedU8609FoldPolicy(oldCtx,pen-1,1);assert(old);assert.throws(()=>measureReviewedU8609PointFoldFrame(old as unknown as typeof p,p.segment,p.priorSegment,.01,true));assert.throws(()=>measureReviewedU8609PointFoldFrame({...p},p.segment,p.priorSegment,.01,true));assert.throws(()=>measureReviewedU8609PointFoldFrame(p,p.segment,p.priorSegment,.01,false));assert.throws(()=>measureReviewedU8609PointFoldFrame(p,{...p.segment,outline:p.segment.outline+' '},p.priorSegment,.01,true));for(const n of[-1,1.1,NaN,Infinity])assert.throws(()=>measureReviewedU8609PointFoldFrame(p,p.segment,p.priorSegment,n,true))}
 assert.equal(reviewedU8609PointFoldPolicy({...ctx},5,1),null);assert.equal(reviewedU8609PointFoldPolicy(ctx,16,0),null)
})
test('蘉 point-fold binds existing source and new proof without rerunning prior geometry',()=>{for(const[p,expected]of Object.entries(REVIEWED_U8609_POINT_FOLD_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),expected)})
