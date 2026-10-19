import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {readHistoricalAppSnapshot,historicalAppSnapshotBindings} from '../docs/hanja-component-evidence-growing-caps-u9e8c-1318-2026-10-20/resolver.mjs'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1318_STROKES as ENTRY,loadGlyphWikiBatch1318Strokes as loadReviewed} from './hanja-stroke-dictionary-glyphwiki-batch1318.ts'
import {selectedProofIdentity,compileProgressive,compileSourceWhole,sourceCompileCallCount,geometryDerivationCallCount,cachedPositiveCallCount,nativeApproval,runtimeApplied} from '../docs/hanja-source-independent-vq-up-order-u9e8c-source-experiment-2026-10-20/candidate.mjs'
const ROOT=new URL('../',import.meta.url),DIR='docs/hanja-goal-glyphwiki-batch1318-2026-10-20/',EXP='docs/hanja-source-independent-vq-up-order-u9e8c-source-experiment-2026-10-20/';
const sha=(x:Uint8Array|string)=>createHash('sha256').update(x).digest('hex');
const appHashes=new Map(historicalAppSnapshotBindings().map(x=>[x.originalPath,x.expectedSHA256]));
const read=(p:string):Buffer=>{const h=appHashes.get(p);return h?readHistoricalAppSnapshot(p,h):readFileSync(new URL(p,ROOT))};
type MutableEntry={paths:string[];outlines:{weight:number;direction:string;bounds:number[];outline:string}[][]};
test('1318 strict complete JSON loader rejects arity and nested mutations',()=>{
 const fixture:unknown=JSON.parse(read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1318.json').toString());assert.deepEqual(loadReviewed(fixture),ENTRY);
 for(const args of [[],[fixture,{}]])assert.throws(()=>Reflect.apply(loadReviewed,null,args));
 const changes:((b:MutableEntry[])=>void)[]=[b=>{b[0].paths[0]='M0 0 L1 1 Z'},b=>{b[0].outlines[8][1].direction='wrong'},b=>{b[0].outlines[10][0].weight++},b=>{b[0].outlines[8].reverse()},b=>{b[0].outlines[0][0].bounds[0]++},b=>{b[0].outlines.reverse()}];
 for(const mutate of changes){const b=JSON.parse(JSON.stringify(fixture)) as MutableEntry[];mutate(b);assert.throws(()=>loadReviewed(b))}
 assert.equal(ENTRY[0].glyph,'麌');assert.equal(ENTRY[0].outlines?.length,18);
});
test('1318 fixed full5 and snapshot pins; source negative calls do not compile',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()) as {immutableFilesSHA256:Record<string,string>};assert.equal(Object.keys(review.immutableFilesSHA256).length,102);
 for(const[p,h]of Object.entries(review.immutableFilesSHA256))assert.equal(sha(read(p)),h,p);
 const fixture=JSON.parse(read(EXP+'fixtures.json').toString()) as Record<string,{fullProof:Record<string,unknown>;strokes:unknown}>;const f=fixture.u9e8c,proof=f.fullProof,trace=proof.trace,id=selectedProofIdentity;assert.deepEqual(ENTRY[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),'d697a545504cc475de264b657c28f9b5b857278e4813c4ebf3c96dba2c37464d');
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 for(const args of[[],[trace],[trace,proof],[trace,proof,id,{}],[trace,proof,{...id,extra:true}],[[],proof,id],[trace,{...proof,extra:true},id]])assert.throws(()=>Reflect.apply(compileProgressive,null,args));
 for(const key of Object.keys(id)){const missing:Record<string,unknown>={...id};delete missing[key];assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,missing]));assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,{...id,[key]:'wrong'}]))}
 for(const args of[['u9e8c',trace,proof],['wrong',trace,proof,id],['u9e8c',trace,proof,id,{}]])assert.throws(()=>Reflect.apply(compileSourceWhole,null,args));
 assert.equal(sourceCompileCallCount(),0);assert.equal(geometryDerivationCallCount(),0);assert.equal(cachedPositiveCallCount(),0);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false);
 const binding=historicalAppSnapshotBindings()[0];assert.throws(()=>readHistoricalAppSnapshot(binding.originalPath,'0'.repeat(64)));assert.throws(()=>readHistoricalAppSnapshot('unrecognized/app.ts',binding.expectedSHA256));
});
test('1318 native component provenance, original object and committed parent remain distinct',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()),resume=JSON.parse(read(DIR+'resume.json').toString()),parentBytes=read('docs/hanja-goal-glyphwiki-batch1317-2026-10-20/resume.json'),parent=JSON.parse(parentBytes.toString());assert.equal(sha(parentBytes),'4e26d9543a3003bf99bec1f73c04bdcb5b9781293ba91a241988cab924f10edd');assert(parent.actualCheckpointVerified&&parent.actualRegistryVerified&&parent.runtimeRegistered);assert.equal(parent.completedRuntime,5733);assert.equal(resume.completedRuntime,5734);assert.equal(resume.remainingCommittedRuntime,244);assert.equal(resume.totalHolds,190);assert.equal(resume.canonicalInspection.references,375);assert.deepEqual(resume.resolvedHolds.slice(0,-1),parent.resolvedHolds);
 const canonical=JSON.parse(read('docs/hanja-goal-glyphwiki-batch939-2026-10-13/resume.json').toString()) as {newHolds:unknown[]};const holds=canonical.newHolds.filter(r=>typeof r==='object'&&r!==null&&'glyph'in r&&r.glyph==='麌');assert.equal(holds.length,1);assert.equal(sha(JSON.stringify(holds[0])),'b097499a7a0a75d563b230687ca2c1a6828a9bcd4fb8ef14d03bfb6f0f3cb4d6');
 assert.equal(review.isolatedActualComponentBrowserVerified,true);assert.equal(review.actualAppUI,false);const a=review.actualComponentNative;assert.deepEqual(a.hydrationErrorsThroughout,[]);assert.equal(a.whole.initialP1AllTargetsMasked,true);assert.equal(a.prefix.growing11FullRound,true);assert.equal(a.coverage.freshRedResidualObservation,false);assert.equal(a.coarse.total,18);assert.equal(a.sameFrame.visibility,'visible');for(const k of ['sameProgress','distanceMatches','radiusMatches','capsRadiusMatches','endMatches'])assert.equal(a.sameFrame[k],true);assert.equal(a.natural[0].endFullRound,true);assert.equal(a.natural[0].endCapsRadius,0);assert.equal(a.natural[1].startLocalTargetProgress,0);assert.equal(a.natural[1].firstMaskActiveAtStart,true);assert.equal(a.server.exitCode,143);assert.equal(review.startGateIntegration.targetCompletionUnmasked,false);
 const f=JSON.parse(read(EXP+'fixtures.json').toString()) as Record<string,{strokes:unknown[][];originalOrderBaseline:unknown[][];originalPenOrder:number[]}>;assert.deepEqual(f.u9e8c.strokes,f.u9e8c.originalPenOrder.map(n=>f.u9e8c.originalOrderBaseline[n-1]));
 const old=JSON.parse(read('docs/hanja-renderer-growing-caps-u9e8c-native-review-2026-10-20/native-review.json').toString());assert.equal(old.actualComponentVerified,false);assert.equal(old.runtimeRegistered,false);const harness=JSON.parse(read('docs/hanja-component-growing-caps-u9e8c-harness-2026-10-20/validation.json').toString());assert.equal(harness.hydrationBrowserExecuted,false);assert.equal(harness.isolatedActualComponentBrowserVerified,false);
});
