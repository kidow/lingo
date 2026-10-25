import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import {makeReviewedU8609HkcsSourceContext,type ReviewedU8609HkcsContext} from './hanja-stroke-start-caps-u8609-hkcs.ts'
import {makeReviewedU8609FoldContext,type ReviewedU8609FoldContext} from './hanja-stroke-fold-u8609-hkcs.ts'
import {makeReviewedU8609PrefixContext,type ReviewedU8609PrefixContext} from './hanja-stroke-prefix-u8609-hkcs.ts'

const FIXED=fixture.hkcs_m8609
export type ReviewedU8609HkcsSourceContexts=Readonly<{caps:ReviewedU8609HkcsContext;fold:ReviewedU8609FoldContext;prefix:ReviewedU8609PrefixContext}>

/** Preserve all three original proof/identity/whole factories; this does not approve playback. */
export function makeReviewedU8609HkcsSourceContexts(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU8609HkcsSourceContexts|null{
 try{
  const caps=makeReviewedU8609HkcsSourceContext(proof,identity,strokes)
  const fold=makeReviewedU8609FoldContext(proof,identity,strokes)
  const prefix=makeReviewedU8609PrefixContext(proof,identity,strokes)
  return caps&&fold&&prefix?Object.freeze({caps,fold,prefix}):null
 }catch{return null}
}

/** Product adapter supplies the pinned public proof and identity, never an outlines-only substitute. */
export function reviewedU8609HkcsSourceContexts(strokes:HanjaOutlineStrokes):ReviewedU8609HkcsSourceContexts|null{
 return makeReviewedU8609HkcsSourceContexts(FIXED.fullProof,FIXED.identity,strokes)
}
