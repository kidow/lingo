import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {makeReviewedU6f5aSourceContext,reviewedU6f5aPolicy,REVIEWED_U6f5a_PROOFS} from './hanja-stroke-start-caps-u6f5a.ts'
import {makeReviewedU6f5aCardinalSourceContext,reviewedU6f5aCardinalPolicy,sampleReviewedU6f5aCardinalFrame} from './hanja-stroke-cardinal-contact-u6f5a.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u6f5a-2026-10-24/fixtures.json',import.meta.url),'utf8')).u6f5a,clone=(x:unknown)=>JSON.parse(JSON.stringify(x))
test('new 潚 exact caps5 and cardinal2 display contracts',()=>{
 const c=makeReviewedU6f5aSourceContext(f.fullProof,f.identity,f.strokes);assert(c);assert.equal(REVIEWED_U6f5a_PROOFS.length,5)
 for(const t of REVIEWED_U6f5a_PROOFS){const p=reviewedU6f5aPolicy(c,t.pen-1,t.mask-1);assert(p);assert.deepEqual(p.segment,f.strokes[t.pen-1][t.mask-1])}
 for(const change of[(v:typeof f)=>v.fullProof.trace[0][0].args[0]++,(v:typeof f)=>v.identity.sourceRoot+='-foreign',(v:typeof f)=>v.strokes[0][0].weight++]){const v=clone(f);change(v);assert.equal(makeReviewedU6f5aSourceContext(v.fullProof,v.identity,v.strokes),null)}
 let getters=0;const g=clone(f.identity);Object.defineProperty(g,'sourceRoot',{enumerable:true,get(){getters++;return f.identity.sourceRoot}});assert.equal(makeReviewedU6f5aSourceContext(f.fullProof,g,f.strokes),null);assert.equal(getters,0)
 const cc=makeReviewedU6f5aCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert(cc)
 for(const pen of[4,11]){const p=reviewedU6f5aCardinalPolicy(cc,pen-1,1);assert(p);const s=f.strokes[pen-1][1];assert.equal(sampleReviewedU6f5aCardinalFrame(p,s,0,0).visible,false);assert.equal(sampleReviewedU6f5aCardinalFrame(p,s,1,1).originalPDirect,true);for(const v of[1e-8,.03,.5,.99999999]){const z=sampleReviewedU6f5aCardinalFrame(p,s,v,1);assert(z.clip);assert(z.clip.y<p.originY&&z.clip.y+z.clip.height>p.originY);assert(z.clip.height>0)}assert.throws(()=>sampleReviewedU6f5aCardinalFrame(p,s,.03,.99));assert.throws(()=>sampleReviewedU6f5aCardinalFrame(p,{...s,weight:s.weight+.1},.03,1));for(const v of[NaN,-.1,1.1])assert.throws(()=>sampleReviewedU6f5aCardinalFrame(p,s,v,1));assert(Object.isFrozen(p.segment));assert(Object.isFrozen(p.segment.bounds))}
 assert.equal(reviewedU6f5aCardinalPolicy(cc,3,0),null);assert.equal(reviewedU6f5aPolicy(c,3,1),null)
})
