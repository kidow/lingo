import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch978.json' with {type:'json'}
import {loadGlyphWikiBatch978Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH978_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch978.ts'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,sourceOrderPermutation} from '../docs/hanja-goal-glyphwiki-batch978-2026-10-13/progressive-order-candidate.mjs'
const base=new URL('../docs/hanja-goal-glyphwiki-batch978-2026-10-13/',import.meta.url)
const read=(f:string)=>readFileSync(new URL(f,base)),obj=(f:string)=>JSON.parse(read(f).toString()),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const prep=obj('source-order-candidate-validation.json'),review=obj('review.json'),id=selectedProofIdentity,header=obj('engine-proof.json'),body=obj(id.sourceProofFile),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}

test('粺 preserves every original mask, complete proof and empty raw6 under final order',()=>{
 for(const[f,digest]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),digest,f)
 assert.equal(Object.keys(prep.originalPins).length,12);assert.equal(sha(read('source-order-candidate-validation.json')),review.sourcePreparation.sha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
 const before=JSON.stringify(proof),out=compileSourceWhole('u7cba',proof.trace,proof,id)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),review.compiledSHA256);assert.deepEqual(out,reviewed[0].outlines)
 assert.equal(out.length,14);assert.equal(out.flat().length,14);assert.equal(proof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),28)
 assert.deepEqual(sourceOrderPermutation,[1,2,3,4,5,6,13,7,8,9,10,14,11,12])
 assert.deepEqual(out.map(pen=>sha(JSON.stringify(pen))),sourceOrderPermutation.map(n=>prep.originalPenSHA256[n-1]))
 assert.deepEqual(reviewed[0].sourceStrokeIndices,sourceGroups.map(g=>g[0]+1));assert.deepEqual(sourceGroups[5],[5,6])
 assert.equal(proof.trace[6].length,0);assert.equal(proof.groups[6].polygons.length,0)
 assert.deepEqual(reviewed[0].paths,out.map(pen=>pen.map(m=>m.outline).join(' ')))
})
test('粺 requires explicit full5 and exact prefixed lowercase-Sha256 identity5',()=>{
 assert.deepEqual(Object.keys(id).sort(),['sourceHeaderFile','sourceHeaderFileSha256','sourceProofFile','sourceProofFileSha256','sourceRoot'])
 assert.deepEqual(id,prep.identity)
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u7cba',proof.trace,proof]))
 assert.throws(()=>compileProgressive(proof.trace,proof,{...id,sourceProofFile:id.sourceProofFile.slice(2)}))
 const extraIdentity={...id,sourceProofFileSHA256:id.sourceProofFileSha256};assert.throws(()=>compileProgressive(proof.trace,proof,extraIdentity))
 const extraProof={...proof,extra:true};assert.throws(()=>compileProgressive(proof.trace,extraProof,id))
 const changed=structuredClone(proof);changed.defaults.kWidth+=.1;assert.throws(()=>compileProgressive(changed.trace,changed,id))
 assert.throws(()=>compileProgressive([],proof,id))
})
test('粺 raw fixture attribution retains historic provider and exact native evidence',()=>{
 assert.deepEqual(loadGlyphWikiBatch978Strokes(reviewed),HANJA_DICTIONARY_GLYPHWIKI_BATCH978_STROKES)
 const e=reviewed[0],bytes=readFileSync(new URL('../public/hanja-strokes/glyphwiki/u7cba.json',import.meta.url)),g=JSON.parse(bytes.toString())
 assert.equal(g.root,'u7cba');assert.equal(e.geometrySource,sha(bytes));assert.deepEqual(g.drawTrace,proof.trace)
 assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u7cba.json')
 assert.match(e.geometryLicense.revision,/all4 family records;2 roots;1 historical dependencies/);assert.match(read('../../public/hanja-strokes/glyphwiki/NOTICE-u7cba.md').toString(),/u7c73-01@5/)
 assert.deepEqual(g.providerVersions,obj('sources.json').providerVersions);assert.equal(g.providerVersions[0].name,'u7c73-01@5')
 assert.equal(e.sourceReference.dictionarySvgSha256,'1187db8fd3cfb59053fff58a2a7fda076845bc10afcf0f89d1f545419a240474')
 for(const k of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'] as const)assert.equal(e.sourceReference[k],sha(read('review.json')))
 assert.equal(review.nativeApproval,true);assert.equal(review.directionReview.finalDirectionsObserved,14);assert.equal(review.directionReview.finalAllPassed,true)
 assert.equal(review.progressiveFramesApproved,126);assert.equal(review.observationProvenance.originalUnchangedCoarseFrames,54);assert.equal(review.observationProvenance.correctedCoarseFrames,72)
 assert.deepEqual(review.curveFineChecks.map((x:{pen:number})=>x.pen),[1,2,5,6,7,8,9,12,14])
 assert.deepEqual(review.observationProvenance.correctedFinePensRechecked,[12,14]);assert.equal(review.observationProvenance.fineGeometryObservationCount,11);assert.equal(review.observationProvenance.uniqueFinalFinePens,9)
 assert.deepEqual(review.maskBoundaryObservations,[]);assert.equal(review.noMultiMaskBoundaries,true)
 assert.deepEqual(review.actualReplayProgress.map((p:{pen:number;observedPercent:number;completedAX:number})=>[p.pen,p.observedPercent,p.completedAX]),[[12,2.76,100],[14,2.5225,100]])
 assert.equal(review.appUIAutoplayVerifiedThisBatch,false);assert.equal(prep.nativeApproval,false);assert.equal(obj('metadata.json').runtimeApplied,false)
 for(const mutate of [(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].outlines[0][0].weight++,(x:any)=>x[0].geometryLicense.spdx='MIT',(x:any)=>x[0].sourceReference.orderReviewSha256='0'.repeat(64)]){const changed=structuredClone(reviewed);mutate(changed);assert.throws(()=>loadGlyphWikiBatch978Strokes(changed))}
})
