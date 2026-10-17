import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES} from '../../lib/hanja-stroke-dictionary-glyphwiki-batch1080.ts'
const ROOT=new URL('../../',import.meta.url),DIR=new URL('./',import.meta.url),read=f=>readFileSync(new URL(f,ROOT)),obj=f=>JSON.parse(read(f)),local=f=>JSON.parse(readFileSync(new URL(f,DIR))),sha=v=>createHash('sha256').update(v).digest('hex')
const review=local('review.json'),prep=local('strict-source-preparation.json'),ready=local('source-only-helper-readiness.json'),resume=local('resume.json'),raw=obj('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1080.json'),e=raw[0]
for(const[f,h]of Object.entries({...review.originalFilesSHA256,...review.sharedRendererBytePins}))assert.equal(sha(readFileSync(new URL(f,DIR))),h,f)
assert.equal(Object.keys(review.originalFilesSHA256).length,25)
for(const[f,h]of Object.entries(ready.inputFileSHA256))assert.equal(sha(readFileSync(new URL(f,DIR))),h,f)
assert.deepEqual(prep.identity,ready.profiles[0].identity);assert.equal(prep.identity.sourceRoot,'u6478-ue0102')
const h=local('engine-proof.json'),b=local(prep.identity.sourceProofFile),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b}
assert.equal(sha(JSON.stringify(proof)),'70a9b222a58beb59713e235e6c93aefff7400927fadd2b2c6fb399a4cf6dd2da')
assert.equal(sha(JSON.stringify(e.outlines)),'af6a0d2e06d8bf8a8e30dbb04fbeb385aef6fb51ce00036c64283c3447e27ca4')
assert.deepEqual([e.outlines.length,e.outlines.flat().length,e.outlines.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[14,15,31])
assert.deepEqual(e.outlines.map(p=>sha(JSON.stringify(p))),ready.profiles[0].orderedPenMaskSHA256)
assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES,raw);assert.deepEqual(e.sourceStrokeIndices,prep.sourceGroups.map(g=>g[0]+1))
const g=obj('public/hanja-strokes/glyphwiki/u6478.json'),s=local('sources.json');assert.deepEqual(g.records,s.records);assert.deepEqual(g.aliases,s.aliases);assert.deepEqual(g.providerVersions,s.providerVersions);assert.deepEqual(g.drawTrace,proof.trace)
assert.deepEqual([Object.keys(g.records).length,s.wholeNames.length,g.providerVersions.length],[13,5,4])
assert.equal(e.geometrySource,sha(read('public/hanja-strokes/glyphwiki/u6478.json')))
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(e.sourceReference[key],sha(readFileSync(new URL('review.json',DIR))))
assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki')
assert.equal(resume.previousResume,'docs/hanja-goal-glyphwiki-batch1079-2026-10-13/resume.json');assert.equal(sha(read(resume.previousResume)),resume.previousResumeSHA256)
const parent=obj(resume.previousResume);assert.equal(parent.actualCheckpointVerified,true);assert.equal(resume.completedRuntime,parent.completedRuntime+1);assert.equal(resume.remainingCommittedRuntime,resume.total-resume.completedRuntime);assert.equal(resume.totalHolds,parent.totalHolds);assert.deepEqual(resume.newHoldsThisBatch,[])
const actual=hanjaStrokeData({glyph:'摸',strokes:14});assert(actual);assert.deepEqual(actual.paths,e.paths);assert.deepEqual(actual.outlines,e.outlines);assert.deepEqual(actual.sourceStrokeIndices,e.sourceStrokeIndices)
assert.equal(hanjaStrokeData({glyph:'摸',strokes:13}),null);assert.equal(hanjaStrokeData({glyph:'摸',strokes:15}),null)
const registry=read('lib/hanja-strokes.ts').toString();assert.equal((registry.match(/import .*HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES/g)||[]).length,1);assert.equal((registry.match(/\.\.\.HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES/g)||[]).length,1)
assert.equal(new Set(HANJA_STROKES.map(x=>x.glyph)).size,resume.completedRuntime)
assert.equal(review.nativeApproval,true);assert.equal(review.directions.allPassed,true);assert.equal(review.coarse.totalFrames,126);assert.deepEqual(review.fine.passedPens,[2,3,9,13,14])
assert.equal(review.maskBoundaries[0].beforeAtAfterPassed,true);assert.equal(review.actualReplay[0].naturalCompletion,true);assert.equal(review.actualReplay[0].startTextPercent,3.835)
assert.equal(review.sourceChecks.runtimeFixtureCompilations,2);assert.equal(review.sourceChecks.sourceEngineExecutions,0)
assert.equal(prep.nativeApproval,false);assert.equal(prep.runtimeApplied,false);assert.equal(review.appUIAutoplayVerifiedThisBatch,false)
console.log(JSON.stringify({glyph:'摸',pens:14,masks:15,polygons:31,directions:14,coarseFrames:126,finePens:[2,3,9,13,14],maskBoundaries:1,naturalReplay2:true,inputPins:25,sharedPins:3,full5Identity7Mandatory3And4:true,runtimeFixtureCompilations:2,sourceCompilerRunsThisVerifier:0,engineRuns:0,registryCount:resume.completedRuntime,remaining:resume.remainingCommittedRuntime,activeHolds:resume.totalHolds,runtimeApplied:true,appUIAutoplayVerifiedThisBatch:false}))
