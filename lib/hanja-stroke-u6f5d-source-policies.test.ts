import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {makeReviewedU6f5dSourceContext,reviewedU6f5dPolicy,REVIEWED_U6f5d_PROOFS} from './hanja-stroke-start-caps-u6f5d.ts'
import {makeReviewedU6f5dCardinalSourceContext,reviewedU6f5dCardinalPolicy,sampleReviewedU6f5dCardinalFrame} from './hanja-stroke-cardinal-contact-u6f5d.ts'
import {makeReviewedU6f5dHookSourceContext,reviewedU6f5dHookPolicy,reviewedU6f5dHookFrame,measureReviewedU6f5dHookFrame} from './hanja-stroke-original-left-hook-u6f5d.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u6f5d-2026-10-24/fixtures.json',import.meta.url),'utf8')).u6f5d,clone=(x:unknown)=>JSON.parse(JSON.stringify(x))
test('new 潝 targets preserve strict source and finite original-P display contracts',()=>{
 const ctx=makeReviewedU6f5dSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);assert.equal(REVIEWED_U6f5d_PROOFS.length,10)
 for(const t of REVIEWED_U6f5d_PROOFS){const p=reviewedU6f5dPolicy(ctx,t.pen-1,t.mask-1);assert(p);assert.deepEqual(p.segment,f.strokes[t.pen-1][t.mask-1])}
 for(const change of[(v:typeof f)=>v.fullProof.trace[0][0].args[0]++,(v:typeof f)=>v.identity.sourceRoot+='-foreign',(v:typeof f)=>v.strokes[0][0].weight++]){const v=clone(f);change(v);assert.equal(makeReviewedU6f5dSourceContext(v.fullProof,v.identity,v.strokes),null)}
 let getters=0;const forged=clone(f.identity);Object.defineProperty(forged,'sourceRoot',{enumerable:true,get(){getters++;return f.identity.sourceRoot}});assert.equal(makeReviewedU6f5dSourceContext(f.fullProof,forged,f.strokes),null);assert.equal(getters,0)
 const c=makeReviewedU6f5dCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert(c)
 for(const pen of[8,10,13]){const p=reviewedU6f5dCardinalPolicy(c,pen-1,1);assert(p);const s=f.strokes[pen-1][1];assert.equal(sampleReviewedU6f5dCardinalFrame(p,s,0,0).visible,false);assert.equal(sampleReviewedU6f5dCardinalFrame(p,s,1,1).originalPDirect,true);for(const v of[1e-8,.03,.5,.99999999]){const z=sampleReviewedU6f5dCardinalFrame(p,s,v,1);assert(z.clip);assert(z.clip.y<p.originY&&z.clip.y+z.clip.height>p.originY);assert(z.clip.height>0)}assert.throws(()=>sampleReviewedU6f5dCardinalFrame(p,s,.03,.99));assert.throws(()=>sampleReviewedU6f5dCardinalFrame(p,{...s,weight:s.weight+.1},.03,1));for(const v of[NaN,-.1,1.1])assert.throws(()=>sampleReviewedU6f5dCardinalFrame(p,s,v,1))}
 assert.equal(reviewedU6f5dCardinalPolicy(c,7,0),null)
 const h=makeReviewedU6f5dHookSourceContext(f.fullProof,f.identity,f.strokes);assert(h)
 for(const pen of[10,13]){const p=reviewedU6f5dHookPolicy(h,pen-1,2);assert(p);const s=f.strokes[pen-1][2];assert.equal(p.bodyOutline+' '+p.tailOutline,s.outline);assert.equal(measureReviewedU6f5dHookFrame(p,s,0,0,null).visible,false);const end=measureReviewedU6f5dHookFrame(p,s,1,1,null);assert.equal(end.alpha,1);assert.equal(end.bodyRect.height,8);assert.equal(end.tailRect.width,p.leftClock);assert.equal(reviewedU6f5dHookFrame(p,s,p.bodyShare,1).phase,'body');assert.equal(reviewedU6f5dHookFrame(p,s,p.bodyShare+1e-9,1).phase,'tail');assert.throws(()=>reviewedU6f5dHookFrame(p,s,.03,0));assert.throws(()=>measureReviewedU6f5dHookFrame(p,s,.03,1,null));assert.throws(()=>reviewedU6f5dHookFrame(p,{...s,revealWidth:15},.03,1));assert(Object.isFrozen(p.segment));assert(Object.isFrozen(p.bodyBounds))}
 assert.equal(reviewedU6f5dHookPolicy(h,9,1),null)
})
