import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,compileProgressive,selectedProofIdentity,sourceGroups,sourceOrderPermutation} from './progressive-order-candidate.mjs'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const base=new URL('./',import.meta.url)
const read=(f)=>readFileSync(new URL(f,base)),obj=(f)=>JSON.parse(read(f).toString()),sha=(v)=>createHash('sha256').update(v).digest('hex')
const prep=obj('source-order-candidate-validation.json'),review=obj('review.json'),id=selectedProofIdentity,header=obj('engine-proof.json'),body=obj(id.sourceProofFile),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}

for(const[f,digest]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),digest,f)
assert.equal(Object.keys(prep.originalPins).length,12);assert.equal(sha(read('source-order-candidate-validation.json')),review.sourcePreparation.sha256)
assert.deepEqual(Object.keys(id).sort(),['sourceHeaderFile','sourceHeaderFileSha256','sourceProofFile','sourceProofFileSha256','sourceRoot']);assert.deepEqual(id,prep.identity)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
const before=JSON.stringify(proof),out=compileSourceWhole('u7cba',proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),review.compiledSHA256);assert.equal(out.length,14);assert.equal(out.flat().length,14)
assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),28)
assert.deepEqual(sourceOrderPermutation,[1,2,3,4,5,6,13,7,8,9,10,14,11,12]);assert.deepEqual(out.map(pen=>sha(JSON.stringify(pen))),sourceOrderPermutation.map(n=>prep.originalPenSHA256[n-1]))
assert.equal(proof.trace[6].length,0);assert.equal(proof.groups[6].polygons.length,0);assert.deepEqual(sourceGroups[5],[5,6])
assert.throws(()=>compileProgressive(proof.trace,proof));assert.throws(()=>compileSourceWhole('u7cba',proof.trace,proof))
const entry=hanjaStrokeData({glyph:'粺',strokes:14});assert(entry);assert.equal(HANJA_STROKES.filter(e=>e.glyph==='粺').length,1)
for(const strokes of [13,15])assert.equal(hanjaStrokeData({glyph:'粺',strokes}),null)
assert.deepEqual(entry.outlines,out);assert.deepEqual(entry.paths,out.map(p=>p.map(m=>m.outline).join(' ')));assert.deepEqual(entry.sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
const bytes=read('../../public/hanja-strokes/glyphwiki/u7cba.json'),g=JSON.parse(bytes),raw=obj('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch978.json')[0]
assert.equal(g.root,'u7cba');assert.equal(entry.geometrySource,sha(bytes));assert.equal(raw.geometrySource,sha(bytes));assert.deepEqual(g.drawTrace,proof.trace)
assert.equal(entry.verificationSource,'ehanja-crosschecked');assert.equal(entry.verifiedAt,'2026-10-17')
assert.equal(raw.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(raw.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u7cba.json')
assert.match(raw.geometryLicense.revision,/all4 family records;2 roots;1 historical dependencies/);assert.match(raw.geometryLicense.revision,/744e14da6ee8492f8e6037076c475cbfaf25fb19df40bbb5f1be1bea1ef420ec/)
assert.deepEqual(g.providerVersions,obj('sources.json').providerVersions);assert.equal(g.providerVersions[0].name,'u7c73-01@5')
assert.equal(raw.sourceReference.dictionarySvgSha256,'1187db8fd3cfb59053fff58a2a7fda076845bc10afcf0f89d1f545419a240474')
for(const k of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(raw.sourceReference[k],sha(read('review.json')))
assert.equal(review.nativeApproval,true);assert.equal(review.wholeReview.actualWholeViews,2);assert.equal(review.directionReview.finalDirectionsObserved,14);assert.equal(review.directionReview.finalAllPassed,true)
assert.equal(review.progressiveFramesApproved,126);assert.equal(review.observationProvenance.originalUnchangedCoarseFrames,54);assert.equal(review.observationProvenance.correctedCoarseFrames,72)
assert.deepEqual(review.observationProvenance.originalUnchangedCoarsePens,[1,2,3,4,5,6]);assert.deepEqual(review.observationProvenance.correctedCoarsePens,[7,8,9,10,11,12,13,14])
assert.deepEqual(review.curveFineChecks.map(c=>c.pen),[1,2,5,6,7,8,9,12,14]);assert(review.curveFineChecks.every(c=>c.passed&&c.size===520&&c.beforePercent===99.99&&c.afterPercent===100))
assert.deepEqual(review.observationProvenance.correctedFinePensRechecked,[12,14]);assert.equal(review.observationProvenance.fineGeometryObservationCount,11);assert.equal(review.observationProvenance.uniqueFinalFinePens,9)
assert.deepEqual(review.maskBoundaryObservations,[]);assert.equal(review.noMultiMaskBoundaries,true)
assert.deepEqual(review.actualReplayProgress.map(p=>[p.pen,p.observedPercent,p.completedAX]),[[12,2.76,100],[14,2.5225,100]]);assert(review.actualReplayProgress.every(p=>p.passed))
assert.equal(review.appUIAutoplayVerifiedThisBatch,false);assert.equal(prep.nativeApproval,false);assert.equal(prep.runtimeApplied,false);assert.equal(obj('metadata.json').runtimeApplied,false)
const resume=obj('resume.json'),previous=read('../hanja-goal-glyphwiki-batch977-2026-10-13/resume.json')
assert.equal(resume.previousResumeSHA256,sha(previous));assert.equal(resume.completedRuntime,5499);assert.equal(resume.remainingCommittedRuntime,479);assert.equal(resume.totalHolds,279)
console.log(JSON.stringify({glyph:'粺',pens:14,masks:14,polygons:28,frames:126,original54Corrected72:true,uniqueFinePens:9,fineObservations:11,emptyRaw6Group56Preserved:true,sourcePreserved:true,runtimeApplied:true,compiledSHA256:review.compiledSHA256,strictFull5Identity5Verified:true,historicProvider:'u7c73-01@5',rawLicenseFixtureOnly:true,appUIAutoplayVerifiedThisBatch:false}))
