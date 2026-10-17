import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,originalSourceGroups,originalPenOrder,nativeApproval,runtimeApplied} from '../docs/hanja-goal-glyphwiki-batch1061-2026-10-13/source-order-candidate.mjs'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1061_STROKES,loadGlyphWikiBatch1061Strokes} from './hanja-stroke-dictionary-glyphwiki-batch1061.ts'
const root=new URL('../',import.meta.url),dir='docs/hanja-goal-glyphwiki-batch1061-2026-10-13/',read=(f:string)=>readFileSync(new URL(f,root)),json=(f:string)=>JSON.parse(read(f).toString()),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex'),prep=json(dir+'source-order-preparation.json'),h=json(dir+'engine-proof.json'),b=json(dir+selectedProofIdentity.sourceProofFile),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b},fixture=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1061.json'),e=fixture[0]
test('爔 원20획의 전체 마스크 참조와 원polygon이 순열 이후에도 정확히 보존된다',()=>{
 const out=compileSourceWhole('u7214',proof.trace,proof,selectedProofIdentity)
 assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
 assert.equal(sha(JSON.stringify(out)),'a83385b3defce643d32731ae22a9b4e3247cab015ad5269c153640a585608fb6')
 assert.deepEqual([out.length,out.flat().length,out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[20,23,50])
 assert.deepEqual(originalPenOrder,[1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,19,20,16,17,18])
 assert.deepEqual(sourceGroups,originalPenOrder.map(i=>originalSourceGroups[i-1]))
 assert.deepEqual(out.map(p=>sha(JSON.stringify(p))),originalPenOrder.map(i=>prep.originalPenSHA256[i-1].sha256))
 assert.deepEqual(e.outlines,out);assert.deepEqual(e.paths,out.map(p=>p.map(m=>m.outline).join(' ')))
 assert.deepEqual(e.sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
 assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH1061_STROKES,fixture)
 assert.equal(loadGlyphWikiBatch1061Strokes(fixture).length,1);assert.throws(()=>loadGlyphWikiBatch1061Strokes([]))
})
test('爔 full5·identity5·필수3/4인자 계약은 순서 후보에서도 엄격하다',()=>{
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof,selectedProofIdentity,{}]))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u7214',proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u7214',proof.trace,proof,selectedProofIdentity,{}]))
 assert.throws(()=>compileSourceWhole('u7214-ue0100',proof.trace,proof,selectedProofIdentity))
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
test('爔 공개출처와 새17/18 경계의 실제검토·라이선스 기록이 일치한다',()=>{
 for(const[f,h]of Object.entries(prep.inputSHA256))assert.equal(sha(read(dir+f)),h)
 assert.equal(Object.keys(prep.inputSHA256).length,30)
 const s=json(dir+'sources.json'),g=json('public/hanja-strokes/glyphwiki/u7214.json'),r=json(dir+'review.json'),rh=sha(read(dir+'review.json'))
 assert.equal(g.selectedWhole,'u7214');assert.deepEqual(g.records,s.records);assert.deepEqual(g.aliases,s.aliases);assert.deepEqual(g.providerVersions,s.providerVersions);assert.deepEqual(g.drawTrace,proof.trace)
 assert.deepEqual([Object.keys(g.records).length,s.wholeNames.length,g.providerVersions.length],[6,1,0])
 assert.equal(e.geometrySource,sha(read('public/hanja-strokes/glyphwiki/u7214.json')))
 for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(e.sourceReference[key],rh)
 assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u7214.json')
 assert.deepEqual(r.whole.actuallyObserved,['u7214']);assert.equal(r.whole.selectedCompiledWholeComparedWithDomestic,true)
 assert.deepEqual([r.coarse.inheritedOriginalFrames,r.coarse.freshCorrectedFrames,r.coarse.totalFrames],[117,63,180])
 assert.deepEqual(r.fine.passedPens,[1,2,3,4,5,6,11,14,15,17,18,19,20]);assert.deepEqual(r.fine.freshFinalPens,[17,18,19,20])
 assert.deepEqual(r.fine.domesticAndCandidateSVGWidths,[520,520]);assert.equal(r.fine.endpointCropsCandidateOnly,true);assert.deepEqual(r.fine.pen3FocusRecheck.candidateCrop,[75,170]);assert.equal(r.fine.pen3FocusRecheck.passed,true)
 assert.deepEqual(r.maskBoundaries.map((x:{pen:number;boundary:number})=>[x.pen,x.boundary]),[[17,.8048666263391028],[18,.7638650613122197],[18,.8116715212919543]])
 for(const x of r.maskBoundaries){assert.equal(x.freshFinalObservation,true);assert.equal(x.oldOriginalObservationInherited,false);assert.equal(x.beforeAtAfterPassed,true);assert.equal(x.tail95Passed,true)}
 assert.equal(r.actualReplay[0].pen,18);assert.equal(r.actualReplay[0].startTextPercent,3.7562);assert.equal(r.actualReplay[0].naturalCompletion,true)
 assert.equal(r.sourceChecks.runtimeFixtureCompilations,1);assert.equal(r.sourceChecks.sourceEngineExecutions,0)
 for(const key of ['strict','order'])assert.equal(sha(read(r.sourcePreparations[key].file)),r.sourcePreparations[key].sha256)
 const a=r.nativeHelperCompilationAccounting;assert.equal(sha(read(a.cachedRunnerFile)),a.cachedRunnerSHA256)
 for(const x of [a.originalRunner,a.finalRunner]){assert.equal(x.startupCompilationsReportedByRoot,1);assert.equal(x.requestCompilationsReportedByRoot,0);assert.equal(x.cleanupReportedByRoot,true)}
 assert.equal(r.appUIAutoplayVerifiedThisBatch,false);assert.equal(prep.nativeApproval,false);assert.equal(prep.runtimeApplied,false)
 const mod=read('lib/hanja-stroke-dictionary-glyphwiki-batch1061.ts').toString();assert.match(mod,/as const/);assert.doesNotMatch(mod,/satisfies|from\s*['"][^'"]+\.json/)
})
