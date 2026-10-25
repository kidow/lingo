import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5e6aHkcsSourceContexts,reviewedU5e6aHkcsSourceContexts,REVIEWED_U5E6A_SOURCE_CONTEXT_INPUT_SHA256} from './hanja-stroke-source-context-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsSourceContext,reviewedU5e6aHkcsPolicy} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsShortHookSourceContext,reviewedU5e6aHkcsShortHookPolicy} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsKernelBandSourceContext,reviewedU5e6aHkcsKernelBandPolicy} from './hanja-stroke-contact-kernel-band-u5e6a-hkcs.ts'
const f=fixture.hkcs_m5e6a,s=f.strokes as HanjaOutlineStrokes

test('幪 adapter keeps all three genuine source capabilities and frozen wrapper',()=>{
 const c=makeReviewedU5e6aHkcsSourceContexts(f.fullProof,f.identity,s);assert(c);assert(Object.isFrozen(c));assert.deepEqual(reviewedU5e6aHkcsSourceContexts(s),c)
 assert.equal(c.caps,makeReviewedU5e6aHkcsSourceContext(f.fullProof,f.identity,s));assert.equal(c.shortHook,makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,s));assert.equal(c.kernelBand,makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,s))
 assert.equal(reviewedU5e6aHkcsPolicy(c.caps,7,0)?.id,'u5e6a-hkcs-8-1');assert.equal(reviewedU5e6aHkcsShortHookPolicy(c.shortHook,1,2)?.id,'u5e6a-hkcs-short-hook-2-3');assert.equal(reviewedU5e6aHkcsKernelBandPolicy(c.kernelBand,1,1)?.id,'u5e6a-hkcs-kernel-band-2-2')
 assert.equal(reviewedU5e6aHkcsPolicy({...c.caps},7,0),null);assert.equal(reviewedU5e6aHkcsShortHookPolicy({...c.shortHook},1,2),null);assert.equal(reviewedU5e6aHkcsKernelBandPolicy({...c.kernelBand},1,1),null)
})
test('幪 adapter rejects changed whole proof, identity and original source fields without getters',()=>{
 const proof=structuredClone(f.fullProof);proof.engineRevision='changed';assert.equal(makeReviewedU5e6aHkcsSourceContexts(proof,f.identity,s),null);assert.equal(makeReviewedU5e6aHkcsSourceContexts(f.fullProof,{...f.identity,sourceRoot:'changed'},s),null)
 const changed=structuredClone(f.strokes);changed[0][0].weight+=1;assert.equal(reviewedU5e6aHkcsSourceContexts(changed as HanjaOutlineStrokes),null);assert.equal(makeReviewedU5e6aHkcsSourceContexts(null,f.identity,s),null)
 let reads=0;const id=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(makeReviewedU5e6aHkcsSourceContexts(f.fullProof,id,s),null);assert.equal(reads,0)
 assert(makeReviewedU5e6aHkcsSourceContexts(structuredClone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),structuredClone(s)))
})
test('幪 adapter pins reuse unchanged public source and direct macro/static/paint evidence',()=>{
 for(const[p,expected]of Object.entries(REVIEWED_U5E6A_SOURCE_CONTEXT_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),expected)
 assert.equal(f.strokes.length,17);assert.equal(f.strokes.flat().length,21);assert.equal(createHash('sha256').update(JSON.stringify(s)).digest('hex'),'a2cf337d73821d42be30b945b96ae67d6c4ae668a9447681bb4dc63c4f415e33')
})
