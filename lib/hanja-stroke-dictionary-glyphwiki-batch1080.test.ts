import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,nativeApproval,runtimeApplied} from '../docs/hanja-goal-glyphwiki-batch1080-2026-10-13/strict-source-candidate.mjs'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES,loadGlyphWikiBatch1080Strokes} from './hanja-stroke-dictionary-glyphwiki-batch1080.ts'
const ROOT=new URL('../',import.meta.url),dir='docs/hanja-goal-glyphwiki-batch1080-2026-10-13/',read=(f:string)=>readFileSync(new URL(f,ROOT)),json=(f:string)=>JSON.parse(read(f).toString()),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const prep=json(dir+'strict-source-preparation.json'),ready=json(dir+'source-only-helper-readiness.json'),profile=ready.profiles[0],h=json(dir+'engine-proof.json'),b=json(dir+selectedProofIdentity.sourceProofFile),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b},fixture=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1080.json'),e=fixture[0]
test('摸 VS2 원14획·15mask·31polygon과 ordered mask SHA를 보존한다',()=>{
 const out=compileSourceWhole('u6478-ue0102',proof.trace,proof,selectedProofIdentity)
 assert.equal(sha(JSON.stringify(proof)),'70a9b222a58beb59713e235e6c93aefff7400927fadd2b2c6fb399a4cf6dd2da')
 assert.equal(sha(JSON.stringify(out)),'af6a0d2e06d8bf8a8e30dbb04fbeb385aef6fb51ce00036c64283c3447e27ca4')
 assert.deepEqual([out.length,out.flat().length,out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[14,15,31])
 assert.deepEqual(selectedProofIdentity,profile.identity);assert.deepEqual(selectedProofIdentity,prep.identity)
 assert.deepEqual(sourceGroups,profile.sourceGroups);assert.deepEqual(sourceGroups,prep.sourceGroups)
 assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),profile.orderedPenMaskSHA256)
 assert.deepEqual(e.outlines,out);assert.deepEqual(e.paths,out.map(p=>p.map(m=>m.outline).join(' ')))
 assert.deepEqual(e.sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
 assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH1080_STROKES,fixture)
 assert.equal(loadGlyphWikiBatch1080Strokes(fixture).length,1);assert.throws(()=>loadGlyphWikiBatch1080Strokes([]))
})
test('摸 full5/id7의 ./prefix·Sha256·필수3/4인자를 엄격히 유지한다',()=>{
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,selectedProofIdentity,{}]))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u6478-ue0102',proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u6478-ue0102',proof.trace,proof,selectedProofIdentity,{}]))
 assert.throws(()=>compileSourceWhole('u6478',proof.trace,proof,selectedProofIdentity))
 for(const key of Object.keys(selectedProofIdentity))assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,{...selectedProofIdentity,[key]:'wrong'}]))
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,{...selectedProofIdentity,extra:true}]))
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,{...selectedProofIdentity,sourceProofFile:'./'+selectedProofIdentity.sourceProofFile}]))
 const alias={...selectedProofIdentity,sourceProofFileSHA256:selectedProofIdentity.sourceProofFileSha256} as Record<string,unknown>;delete alias.sourceProofFileSha256
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,alias]))
 const changed=JSON.parse(JSON.stringify(proof));changed.defaults.kWidth+=.1
 assert.throws(()=>compileProgressive(changed.trace,changed,selectedProofIdentity))
 assert.throws(()=>compileProgressive([],proof,selectedProofIdentity))
 assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false)
})
test('摸 공개 source·라이선스와 실제 native 검토 기록이 일치한다',()=>{
 const r=json(dir+'review.json'),sources=json(dir+'sources.json'),g=json('public/hanja-strokes/glyphwiki/u6478.json'),rh=sha(read(dir+'review.json'))
 for(const[f,h]of Object.entries(r.originalFilesSHA256 as Record<string,string>))assert.equal(sha(read(dir+f)),h)
 for(const[f,h]of Object.entries(r.sharedRendererBytePins as Record<string,string>))assert.equal(sha(read(dir+f)),h)
 assert.equal(Object.keys(r.originalFilesSHA256).length,25)
 for(const[f,h]of Object.entries(ready.inputFileSHA256 as Record<string,string>))assert.equal(sha(read(dir+f)),h)
 assert.equal(g.selectedWhole,'u6478-ue0102');assert.deepEqual(g.records,sources.records);assert.deepEqual(g.aliases,sources.aliases);assert.deepEqual(g.providerVersions,sources.providerVersions);assert.deepEqual(g.drawTrace,proof.trace)
 assert.deepEqual([Object.keys(g.records).length,sources.wholeNames.length,g.providerVersions.length],[13,5,4])
 assert.equal(e.geometrySource,sha(read('public/hanja-strokes/glyphwiki/u6478.json')))
 for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(e.sourceReference[key],rh)
 assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u6478.json')
 assert.equal(r.nativeApproval,true);assert.deepEqual(r.whole.compatible,['u6478-ue0102']);assert.equal(r.whole.actuallyObserved.length,5)
 assert.equal(r.directions.actualObserved,14);assert.equal(r.directions.allPassed,true);assert.equal(r.coarse.totalFrames,126);assert.equal(r.coarse.allPassed,true)
 assert.deepEqual(r.fine.passedPens,[2,3,9,13,14]);assert.deepEqual(r.fine.domesticAndCandidateSVGWidths,[520,520]);assert.equal(r.fine.allPassed,true)
 assert.equal(r.maskBoundaries[0].boundary,.9239717736303439);assert.equal(r.maskBoundaries[0].beforeAtAfterPassed,true);assert.equal(r.maskBoundaries[0].tail95Passed,true)
 assert.equal(r.actualReplay[0].pen,2);assert.equal(r.actualReplay[0].startTextPercent,3.835);assert.equal(r.actualReplay[0].naturalCompletion,true)
 assert.equal(r.sourceChecks.runtimeFixtureCompilations,2);assert.equal(r.sourceChecks.sourceEngineExecutions,0);assert.equal(r.sourceChecks.fixtureSource.priorRAMLifetimeError.length>0,true)
 assert.equal(r.strictContract.actualSchema.includes('top-level readiness map'),true)
 assert.equal(sha(read(r.nativeHelperCompilationAccounting.cachedRunnerFile)),r.nativeHelperCompilationAccounting.cachedRunnerSHA256)
 assert.equal(r.nativeHelperCompilationAccounting.cleanupReportedByRoot,true)
 assert.equal(r.appUIAutoplayVerifiedThisBatch,false);assert.equal(prep.nativeApproval,false);assert.equal(prep.runtimeApplied,false)
 const mod=read('lib/hanja-stroke-dictionary-glyphwiki-batch1080.ts').toString();assert.match(mod,/as const/);assert.doesNotMatch(mod,/satisfies|from\s*['"][^'"]+\.json/)
})
