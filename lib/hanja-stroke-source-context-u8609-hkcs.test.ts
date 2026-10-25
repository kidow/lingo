import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609HkcsSourceContexts,reviewedU8609HkcsSourceContexts} from './hanja-stroke-source-context-u8609-hkcs.ts'
import {reviewedU8609HkcsPolicy} from './hanja-stroke-start-caps-u8609-hkcs.ts'
import {reviewedU8609FoldPolicy} from './hanja-stroke-fold-u8609-hkcs.ts'
import {reviewedU8609PrefixPolicy} from './hanja-stroke-prefix-u8609-hkcs.ts'
const fixed=fixture.hkcs_m8609,strokes=fixed.strokes as unknown as HanjaOutlineStrokes

test('蘉 runtime adapter preserves all three genuine source capabilities',()=>{
 const c=makeReviewedU8609HkcsSourceContexts(fixed.fullProof,fixed.identity,strokes)
 assert(c);assert(Object.isFrozen(c));assert.deepEqual(reviewedU8609HkcsSourceContexts(strokes),c)
 assert.equal(reviewedU8609HkcsPolicy(c.caps,9,0)?.id,'u8609-hkcs-10-1')
 assert.equal(reviewedU8609FoldPolicy(c.fold,5,1)?.id,'u8609-hkcs-fold-6-2')
 assert.equal(reviewedU8609PrefixPolicy(c.prefix,16,0)?.id,'u8609-hkcs-prefix-17-1')
 assert.equal(reviewedU8609HkcsPolicy({...c.caps},9,0),null)
 assert.equal(reviewedU8609FoldPolicy({...c.fold},5,1),null)
 assert.equal(reviewedU8609PrefixPolicy({...c.prefix},16,0),null)
})

test('蘉 requires the fixed proof, identity and every original source field',()=>{
 const badProof=structuredClone(fixed.fullProof);badProof.engineRevision='changed'
 assert.equal(makeReviewedU8609HkcsSourceContexts(badProof,fixed.identity,strokes),null)
 assert.equal(makeReviewedU8609HkcsSourceContexts(fixed.fullProof,{...fixed.identity,sourceRoot:'changed'},strokes),null)
 const changed=structuredClone(fixed.strokes);changed[0][0].weight+=1
 assert.equal(reviewedU8609HkcsSourceContexts(changed as unknown as HanjaOutlineStrokes),null)
 assert.equal(makeReviewedU8609HkcsSourceContexts(null,fixed.identity,strokes),null)
})
