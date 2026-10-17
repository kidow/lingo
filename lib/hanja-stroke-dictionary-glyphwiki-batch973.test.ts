import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch973.json' with {type:'json'}
import {loadGlyphWikiBatch973Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH973_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch973.ts'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceOrderPermutation} from '../docs/hanja-goal-glyphwiki-batch973-2026-10-13/progressive-order-candidate.mjs'
const base=new URL('../docs/hanja-goal-glyphwiki-batch973-2026-10-13/',import.meta.url)
const read=(f:string)=>readFileSync(new URL(f,base)),obj=(f:string)=>JSON.parse(read(f).toString()),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const prep=obj('source-order-candidate-validation.json'),review=obj('review.json'),id=selectedProofIdentity,header=obj('engine-proof.json'),body=obj(id.sourceProofFile),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}

test('蓷 original whole geometry and complete-mask permutation remain exact',()=>{
 for(const[f,digest]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),digest,f)
 assert.equal(Object.keys(prep.originalPins).length,8);assert.equal(sha(read('source-order-candidate-validation.json')),review.sourcePreparation.sha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
 const before=JSON.stringify(proof),out=compileProgressive(proof.trace,proof,id)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),review.compiledSHA256)
 assert.deepEqual(out,reviewed[0].outlines);assert.equal(out.length,15);assert.equal(out.flat().length,16)
 assert.equal(proof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),34)
 assert.deepEqual(out.map(pen=>sha(JSON.stringify(pen))),prep.candidatePenSHA256)
 assert.deepEqual(prep.candidatePenSHA256,sourceOrderPermutation.map(n=>prep.originalPenSHA256[n-1]))
 assert.deepEqual(sourceOrderPermutation,[1,2,4,3,5,6,7,8,9,10,11,13,14,12,15])
 assert.deepEqual(reviewed[0].paths,out.map(pen=>pen.map(m=>m.outline).join(' ')))
 assert.deepEqual(reviewed[0].sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
 assert.equal(proof.trace[7].length,0);assert.equal(proof.groups[7].polygons.length,0)
})
test('蓷 strict wrapper rejects missing identity, casing, proof and source substitutions',()=>{
 assert.deepEqual(Object.keys(id).sort(),['sourceProofFile','sourceProofFileSHA256','sourceRoot'])
 assert.deepEqual(id,prep.identity)
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 const extraId={...id,sourceProofFileSha256:id.sourceProofFileSHA256}
 assert.throws(()=>compileProgressive(proof.trace,proof,extraId))
 assert.throws(()=>compileProgressive(proof.trace,proof,{...id,sourceRoot:'u84f7'}))
 const extraProof={...proof,extra:true};assert.throws(()=>compileProgressive(proof.trace,extraProof,id))
 const changed=structuredClone(proof);changed.defaults.kWidth+=.1;assert.throws(()=>compileProgressive(changed.trace,changed,id))
 assert.throws(()=>compileProgressive([],proof,id))
})
test('蓷 runtime attribution and native evidence exclude invalid observations',()=>{
 assert.deepEqual(loadGlyphWikiBatch973Strokes(reviewed),HANJA_DICTIONARY_GLYPHWIKI_BATCH973_STROKES)
 const e=reviewed[0],bytes=readFileSync(new URL('../public/hanja-strokes/glyphwiki/u84f7.json',import.meta.url)),g=JSON.parse(bytes.toString())
 assert.equal(g.root,'u84f7-ue0102');assert.equal(e.geometrySource,sha(bytes));assert.deepEqual(g.drawTrace,proof.trace)
 assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u84f7.json')
 assert.match(e.geometryLicense.revision,/all11 family records;4 roots;0 historical dependencies/)
 assert.equal(e.sourceReference.dictionarySvgSha256,'5da50e9487e106c3d63494d12819e0ef3a352b98632468212671fbfe71d77e59')
 for(const k of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'] as const)assert.equal(e.sourceReference[k],sha(read('review.json')))
 assert.equal(review.nativeApproval,true);assert.equal(review.progressiveFramesApproved,135)
 assert.equal(review.observationProvenance.originalUnchangedCoarseFrames+review.observationProvenance.correctedCoarseFrames,135)
 assert.deepEqual(review.curveFineChecks.map((x:{pen:number})=>x.pen),[3,4,6,7,8,9,10,14])
 assert.deepEqual(review.finePensNotClaimed,[12,13]);assert.deepEqual(review.observationProvenance.excludedOriginalCoarsePens,[12,13,14])
 assert.equal(review.wholeReview.actualWholeViews,3);assert.equal(review.wholeReview.sourceProofReuse[0].actualNativeObservation,false)
 assert.equal(review.tailProbe.observedAX,95);assert.equal(review.tailProbe.observedOutput,'95.0000%');assert.equal(review.tailProbe.screenshotObserved,true)
 assert.equal(review.excludedEvidence[0].actualPercent,63.3333);assert.equal(review.excludedEvidence[0].passed,false)
 assert.deepEqual(review.actualReplayProgress.map((p:{observedPercent:number})=>p.observedPercent),[3.0287,3.3987]);assert(review.actualReplayProgress.every((p:{completedAX:number;passed:boolean})=>p.completedAX===100&&p.passed))
 assert.equal(prep.nativeApproval,false);assert.equal(prep.runtimeApplied,false);assert.equal(obj('metadata.json').runtimeApplied,false)
 for(const mutate of [(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].outlines[0][0].weight++,(x:any)=>x[0].geometryLicense.spdx='MIT',(x:any)=>x[0].sourceReference.orderReviewSha256='0'.repeat(64)]){const changed=structuredClone(reviewed);mutate(changed);assert.throws(()=>loadGlyphWikiBatch973Strokes(changed))}
})
