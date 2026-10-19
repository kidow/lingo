import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {readHistoricalAppSnapshot,historicalAppSnapshotBindings,historicalEvidence} from '../docs/hanja-component-evidence-growing-caps-u7659-1320-2026-10-20/resolver.mjs'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1320_STROKES as ENTRY,loadGlyphWikiBatch1320Strokes as loadReviewed} from './hanja-stroke-dictionary-glyphwiki-batch1320.ts'
import {selectedProofIdentity,compileProgressive,compileSourceWhole,sourceCompileCallCount,geometryDerivationCallCount,cachedPositiveCallCount,nativeApproval,runtimeApplied} from '../docs/hanja-source-independent-vq-two-q15-up-u7659-source-experiment-2026-10-20/candidate.mjs'
const ROOT=new URL('../',import.meta.url),DIR='docs/hanja-goal-glyphwiki-batch1320-2026-10-20/',EXP='docs/hanja-source-independent-vq-two-q15-up-u7659-source-experiment-2026-10-20/';
const sha=(x:Uint8Array|string)=>createHash('sha256').update(x).digest('hex');
const appHashes=new Map(historicalAppSnapshotBindings().map(x=>[x.originalPath,x.expectedSHA256]));
const read=(p:string):Buffer=>{const h=appHashes.get(p);return h?readHistoricalAppSnapshot(p,h):readFileSync(new URL(p,ROOT))};
type MutableEntry={paths:string[];outlines:{weight:number;direction:string;bounds:number[];outline:string}[][]};
test('1320 strict complete JSON loader rejects arity and nested mutations',()=>{
 const fixture:unknown=JSON.parse(read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1320.json').toString());assert.deepEqual(loadReviewed(fixture),ENTRY);
 for(const args of [[],[fixture,{}]])assert.throws(()=>Reflect.apply(loadReviewed,null,args));
 const changes:((b:MutableEntry[])=>void)[]=[b=>{b[0].paths[0]='M0 0 L1 1 Z'},b=>{b[0].outlines[11][1].direction='wrong'},b=>{b[0].outlines[17][0].weight++},b=>{b[0].outlines[11].reverse()},b=>{b[0].outlines[0][0].bounds[0]++},b=>{b[0].outlines.reverse()}];
 for(const mutate of changes){const b=JSON.parse(JSON.stringify(fixture)) as MutableEntry[];mutate(b);assert.throws(()=>loadReviewed(b))}
 assert.equal(ENTRY[0].glyph,'癙');assert.equal(ENTRY[0].outlines?.length,18);
});
test('1320 fixed full5 and snapshot pins; source negative calls do not compile',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()) as {immutableFilesSHA256:Record<string,string>};assert.equal(Object.keys(review.immutableFilesSHA256).length,93);
 for(const[p,h]of Object.entries(review.immutableFilesSHA256))assert.equal(sha(read(p)),h,p);
 const fixture=JSON.parse(read(EXP+'fixtures.json').toString()) as Record<string,{fullProof:Record<string,unknown>;strokes:unknown}>;const f=fixture.u7659,proof=f.fullProof,trace=proof.trace,id=selectedProofIdentity;assert.deepEqual(ENTRY[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),'70ca22b0b1bcf57f63141c5b4460262054ab51847b1bd4e880aa2657347eee74');
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 for(const args of[[],[trace],[trace,proof],[trace,proof,id,{}],[trace,proof,{...id,extra:true}],[[],proof,id],[trace,{...proof,extra:true},id]])assert.throws(()=>Reflect.apply(compileProgressive,null,args));
 for(const key of Object.keys(id)){const missing:Record<string,unknown>={...id};delete missing[key];assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,missing]));assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,{...id,[key]:'wrong'}]))}
 for(const args of[['u7659',trace,proof],['wrong',trace,proof,id],['u7659',trace,proof,id,{}]])assert.throws(()=>Reflect.apply(compileSourceWhole,null,args));
 assert.equal(sourceCompileCallCount(),0);assert.equal(geometryDerivationCallCount(),0);assert.equal(cachedPositiveCallCount(),0);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false);
 const binding=historicalAppSnapshotBindings()[0];assert.throws(()=>readHistoricalAppSnapshot(binding.originalPath,'0'.repeat(64)));assert.throws(()=>readHistoricalAppSnapshot('unrecognized/app.ts',binding.expectedSHA256));
});
test('1320 native component provenance, original object and committed parent remain distinct',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()),resume=JSON.parse(read(DIR+'resume.json').toString()),parentBytes=read('docs/hanja-goal-glyphwiki-batch1319-2026-10-20/resume.json'),parent=JSON.parse(parentBytes.toString());assert.equal(sha(parentBytes),'1637030501a6c554f58499d97000b31f83cfa83f01b82b072e99b5c8222fa34e');assert(parent.actualCheckpointVerified&&parent.actualRegistryVerified&&parent.runtimeRegistered);assert.equal(parent.completedRuntime,5735);assert.equal(resume.completedRuntime,5736);assert.equal(resume.remainingCommittedRuntime,242);assert.equal(resume.totalHolds,188);assert.equal(resume.canonicalInspection.references,377);assert.deepEqual(resume.resolvedHolds.slice(0,-1),parent.resolvedHolds);
 const canonical=JSON.parse(read('docs/hanja-goal-glyphwiki-batch939-2026-10-13/resume.json').toString()) as {newHolds:unknown[]};const holds=canonical.newHolds.filter(r=>typeof r==='object'&&r!==null&&'glyph'in r&&r.glyph==='癙');assert.equal(holds.length,1);assert.equal(sha(JSON.stringify(holds[0])),'850a3c5f777c51d336aa14187654cf507a8e7641bf8274f7dc33c4999c83327b');
 assert.equal(review.isolatedActualComponentBrowserVerified,true);assert.equal(review.actualAppUI,false);const a=review.actualComponentNative;assert.deepEqual(a.hydrationErrorsThroughout,[]);assert.equal(a.whole.targetsFullRound,3);assert(a.whole.allTargetsMasked);assert.deepEqual(a.prefix.map(x=>x.targetsFullRound),[1,2]);assert.equal(a.coverage.freshRedResidualObservation,false);assert.equal(a.coarse.total,27);assert.equal(a.sameFrame.visibility,'visible');for(const k of ['sameProgress','lengthMatches','distanceMatches','radiusMatches','capsRadiusMatches','startMatches','endMatches','ownerMatches','maskMatches'])assert.equal(a.sameFrame[k],true);assert.equal(a.fine.observedLocalZero15,1.4363272496400559e-15);assert.equal(a.fine.observedNearOne12And15,.9999999999999987);assert.equal(a.fine.nearOne12And15FullRound,false);assert(a.fine.exactOneFullRoundVerifiedSeparately);assert.equal(a.natural[0].endFullRound,false);assert.equal(a.natural[1].endFullRound,false);assert.equal(a.natural[2].endFullRound,true);assert.equal(a.server.exitCode,143);assert.equal(review.startGateIntegration.targetCompletionUnmasked,false);assert.deepEqual(ENTRY[0].outlines,JSON.parse(read(EXP+'fixtures.json').toString()).u7659.strokes);
 const old=JSON.parse(read(EXP+'preparation.json').toString());assert.equal(old.nativeApproval,false);assert.equal(old.runtimeApplied,false);const harness=JSON.parse(read('docs/hanja-component-growing-caps-u7659-harness-2026-10-20/validation.json').toString());assert.equal(harness.hydrationBrowserExecuted,false);assert.equal(harness.isolatedActualComponentBrowserVerified,false);assert.equal(historicalEvidence.isolatedActualComponentBrowserVerified,false);assert.equal(historicalEvidence.runtimeRegistered,false);
});
