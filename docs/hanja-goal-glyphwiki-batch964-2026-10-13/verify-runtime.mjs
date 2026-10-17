import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,compileProgressive,sourceGroups,wholeSourceIdentities,nativeApproval as originalNativeApproval} from './progressive.mjs'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const base=new URL('./',import.meta.url)
const read=(f)=>readFileSync(new URL(f,base)),obj=(f)=>JSON.parse(read(f).toString()),sha=(b)=>createHash('sha256').update(b).digest('hex')
const audit=obj('native-server-source-audit.json'),review=obj('review.json'),header=obj('engine-proof.json'),selected=obj(audit.selectedProof)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
const outer={root:audit.selectedWhole,sourceProofFile:audit.selectedProof,sourceProofFileSHA256:audit.inputSHA256[audit.selectedProof],engineHeaderSHA256:audit.inputSHA256['engine-proof.json'],sourceFileSHA256:audit.inputSHA256['sources.json'],compilerFileSHA256:audit.inputSHA256['progressive.mjs']}
function compileStrict(trace,p,id) {
 assert.deepEqual(id,outer)
 assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(p)),review.callerContract.fullProofSHA256)
 const inner=wholeSourceIdentities['u642d-ue0102']
 assert.deepEqual(inner,review.callerContract.innerFileIdentity)
 return compileSourceWhole('u642d-ue0102',trace,p,inner)
}

for(const[f,digest]of Object.entries({...audit.inputSHA256,...review.additionalOriginalBytePins}))assert.equal(sha(read(f)),digest,f)
assert.equal(Object.keys(audit.inputSHA256).length,14)
const before=JSON.stringify(proof),out=compileStrict(proof.trace,proof,outer)
assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),review.compiledSHA256)
assert.equal(out.length,13);assert.equal(out.flat().length,14);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),30)
assert.throws(()=>compileStrict(proof.trace,proof,{...outer,root:'u642d'}))
assert.throws(()=>compileStrict(proof.trace,{...proof,extra:true},outer))
assert.throws(()=>compileSourceWhole('u642d-ue0102',proof.trace,proof))
assert.throws(()=>compileProgressive(proof.trace,proof))
const entry=hanjaStrokeData({glyph:'搭',strokes:13});assert(entry);assert.equal(HANJA_STROKES.filter(e=>e.glyph==='搭').length,1)
for(const strokes of [12,14])assert.equal(hanjaStrokeData({glyph:'搭',strokes}),null)
assert.deepEqual(entry.outlines,out);assert.deepEqual(entry.paths,out.map(p=>p.map(m=>m.outline).join(' ')))
assert.deepEqual(entry.sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
const geometry=read('../../public/hanja-strokes/glyphwiki/u642d.json'),g=JSON.parse(geometry)
assert.equal(g.root,'u642d-ue0102');assert.equal(entry.geometrySource,sha(geometry));assert.deepEqual(g.drawTrace,proof.trace)
assert.equal(entry.verifiedAt,'2026-10-17');assert.equal(entry.verificationSource,'ehanja-crosschecked')
assert.equal(entry.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(entry.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u642d.json')
assert.match(entry.geometryLicense.revision,/exact whole u642d-ue0102;all12 family records;5 roots;2 historical dependencies/)
assert.equal(entry.sourceReference.dictionarySvgSha256,'9c1fad8c9538779dfa9937b484bd8f3eb94f2e53a57fcf497d1a5195c4af7547')
for(const k of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(entry.sourceReference[k],sha(read('review.json')))
assert.equal(review.nativeApproval,true);assert.equal(review.progressiveFramesApproved,117);assert.equal(review.actualWholeViews,5)
assert.deepEqual(review.sourceOrderPermutation,Array.from({length:13},(_,i)=>i+1))
assert.deepEqual(review.curveFineChecks.map(c=>c.pen),[2,3,8,9,11,12])
assert(review.curveFineChecks.every(c=>c.passed&&c.size===520&&c.beforePercent===99.99&&c.afterPercent===100))
assert.deepEqual(review.maskBoundaryObservations,[{pen:2,mask:2,start:0.9239717736303439,beforeAtAfterPassed:true,tailProbePercent:96,tailProbePassed:true}])
assert.deepEqual(review.actualReplayProgress,[{pen:2,observedPercent:2.8575,completedAX:100,completedScreenshot:true,passed:true}])
assert.equal(review.appUIAutoplayVerifiedThisBatch,false)
const metadata=obj('metadata.json');assert.equal(originalNativeApproval,false);assert.equal(metadata.runtimeApplied,false);assert(!metadata.runtimeRegistered)
const resume=obj('resume.json'),previous=read('../hanja-goal-glyphwiki-batch963-2026-10-13/resume.json')
assert.equal(resume.previousResumeSHA256,sha(previous));assert.equal(resume.completedRuntime,5493);assert.equal(resume.remainingCommittedRuntime,485);assert.equal(resume.totalHolds,271)
assert.deepEqual(g.providerVersions.map(v=>v.name),['u8345-var-001@4','ufa5e-03@5'])
console.log(JSON.stringify({glyph:'搭',pens:13,masks:14,polygons:30,frames:117,sourcePreserved:true,runtimeApplied:true,selectedWhole:g.root,compiledSHA256:review.compiledSHA256,full5ProofOuter6Inner3Verified:true,historicalProviders:2,appUIAutoplayVerifiedThisBatch:false}))

