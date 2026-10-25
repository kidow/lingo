import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import {makeReviewedU5e6aHkcsSourceContext,type ReviewedU5e6aHkcsContext} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsShortHookSourceContext,type ReviewedU5e6aHkcsShortHookContext} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsKernelBandSourceContext,type ReviewedU5e6aHkcsKernelBandContext} from './hanja-stroke-contact-kernel-band-u5e6a-hkcs.ts'

const FIXED=fixture.hkcs_m5e6a
export type ReviewedU5e6aHkcsSourceContexts=Readonly<{caps:ReviewedU5e6aHkcsContext;shortHook:ReviewedU5e6aHkcsShortHookContext;kernelBand:ReviewedU5e6aHkcsKernelBandContext}>

/** Preserve the three original private proof/identity/whole factories; playback remains unapproved. */
export function makeReviewedU5e6aHkcsSourceContexts(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU5e6aHkcsSourceContexts|null{
 try{
  const caps=makeReviewedU5e6aHkcsSourceContext(proof,identity,strokes)
  const shortHook=makeReviewedU5e6aHkcsShortHookSourceContext(proof,identity,strokes)
  const kernelBand=makeReviewedU5e6aHkcsKernelBandSourceContext(proof,identity,strokes)
  return caps&&shortHook&&kernelBand?Object.freeze({caps,shortHook,kernelBand}):null
 }catch{return null}
}

/** Supply fixed public proof and identity; never replace a proof-bound factory with outlines alone. */
export function reviewedU5e6aHkcsSourceContexts(strokes:HanjaOutlineStrokes):ReviewedU5e6aHkcsSourceContexts|null{
 return makeReviewedU5e6aHkcsSourceContexts(FIXED.fullProof,FIXED.identity,strokes)
}

/** Historical source/macro/static/paint evidence pins; no publisher-clock or actual-playback approval. */
export const REVIEWED_U5E6A_SOURCE_CONTEXT_INPUT_SHA256=Object.freeze({"lib/hanja-stroke-start-caps-u5e6a-hkcs.ts":"37892258f60b1583a4f75244c0816171ffff39a40ea2b28fb7959c88038fc34d","lib/hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts":"18b9c449aebfd8ebb39a98ee5419c6de929820053ad0bcb8be277debb7576aec","lib/hanja-stroke-contact-kernel-band-u5e6a-hkcs.ts":"e6fcacdeb9401c98910e51b79a69727102415cbc43fda8997da0ba4debba5495","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json":"9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8","docs/hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/engine-whole-hkcs_m5e6a.json":"e8831644fbe62a6af83581d45c4024cf2c324732b731ada72372309ef62ccb11","docs/hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/capture.json":"1891922869a639a68e31dfd9d2721c6e802d9619bdc05b5473c5492de5e4ffe8","docs/hanja-source-alternative-u5e6a-hkcs-2026-10-26/sources.json":"47c4f8b2cde48170e8daf50dc220f616b61a2327b062d76491b8498069f25be8","docs/hanja-official-media-compare-u5e6a-2026-10-26/official-temporal-native-review.json":"3eead4ca3970c63cc587be3a6ced1e9840dd3c2621674dee22cf69ad4e899e2a","docs/hanja-source-raw-compare-u5e6a-hkcs-individual-2026-10-26/native-static-review.json":"a727e402295aedf1fb12e8f0bf20b688f7a52abc44349f212e6320644e6f9ea4","docs/hanja-source-raw-compare-u5e6a-hkcs-individual-2026-10-26/static-mapping.json":"92119f5cf96eea1014dae141ccd6521a5951b0046ae9974d87ba6cb5d25b5322","docs/hanja-source-raw-compare-u5e6a-hkcs-whole-2026-10-26/native-whole-review.json":"da41a95b94e55b9a57b95f0a9729307acee8aaf1ef3ae517bfbe6e87b31b4837","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/paint-and-contact-conditions-proof.json":"c3d052d3725ae13230cd6ab6449b5b5d36375c2c40a2d7eda103c06701446fa7","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/verify-paint-and-contact-conditions.py":"f364db8ae9ece3cad6f566fb0a1359a23317fa0dd2fea13c5d5e68771de60c38"})
