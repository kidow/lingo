import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {readHistoricalAppSnapshot,historicalAppSnapshotBindings} from '../docs/hanja-component-evidence-global-projection-u5e28-1317-2026-10-20/resolver.mjs'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1317_STROKES as ENTRY,loadGlyphWikiBatch1317Strokes as loadReviewed} from './hanja-stroke-dictionary-glyphwiki-batch1317.ts'
import {selectedProofIdentity,compileProgressive,compileSourceWhole,sourceCompileCallCount,geometryDerivationCallCount,cachedPositiveCallCount,nativeApproval,runtimeApplied} from '../docs/hanja-source-independent-hq-up-u5e28-source-experiment-2026-10-19/candidate.mjs'
const ROOT=new URL('../',import.meta.url),DIR='docs/hanja-goal-glyphwiki-batch1317-2026-10-20/',EXP='docs/hanja-source-independent-hq-up-u5e28-source-experiment-2026-10-19/';
const sha=(x:Uint8Array|string)=>createHash('sha256').update(x).digest('hex');
const appHashes=new Map(historicalAppSnapshotBindings().map(x=>[x.originalPath,x.expectedSHA256]));
const read=(p:string):Buffer=>{const h=appHashes.get(p);return h?readHistoricalAppSnapshot(p,h):readFileSync(new URL(p,ROOT))};
type MutableEntry={paths:string[];outlines:{weight:number;direction:string;bounds:number[];outline:string}[][]};
test('1317 strict complete JSON loader rejects arity and nested mutations',()=>{
 const fixture:unknown=JSON.parse(read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1317.json').toString());assert.deepEqual(loadReviewed(fixture),ENTRY);
 for(const args of [[],[fixture,{}]])assert.throws(()=>Reflect.apply(loadReviewed,null,args));
 const changes:((b:MutableEntry[])=>void)[]=[b=>{b[0].paths[0]='M0 0 L1 1 Z'},b=>{b[0].outlines[4][1].direction='wrong'},b=>{b[0].outlines[9][0].weight++},b=>{b[0].outlines[4].reverse()},b=>{b[0].outlines[0][0].bounds[0]++},b=>{b[0].outlines.reverse()}];
 for(const mutate of changes){const b=JSON.parse(JSON.stringify(fixture)) as MutableEntry[];mutate(b);assert.throws(()=>loadReviewed(b))}
 assert.equal(ENTRY[0].glyph,'帨');assert.equal(ENTRY[0].outlines?.length,10);
});
test('1317 fixed full5 and snapshot pins; source negative calls do not compile',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()) as {immutableFilesSHA256:Record<string,string>};assert.equal(Object.keys(review.immutableFilesSHA256).length,79);
 for(const[p,h]of Object.entries(review.immutableFilesSHA256))assert.equal(sha(read(p)),h,p);
 const fixture=JSON.parse(read(EXP+'fixtures.json').toString()) as Record<string,{fullProof:Record<string,unknown>;strokes:unknown}>;const f=fixture.u5e28,proof=f.fullProof,trace=proof.trace,id=selectedProofIdentity;assert.deepEqual(ENTRY[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),'c1488f46315395ce3258b8bccafd0350bd2d49f281e7a187bf4f0bf5cf7fa8b3');
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 for(const args of[[],[trace],[trace,proof],[trace,proof,id,{}],[trace,proof,{...id,extra:true}],[[],proof,id],[trace,{...proof,extra:true},id]])assert.throws(()=>Reflect.apply(compileProgressive,null,args));
 for(const key of Object.keys(id)){const missing:Record<string,unknown>={...id};delete missing[key];assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,missing]));assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,{...id,[key]:'wrong'}]))}
 for(const args of[['u5e28',trace,proof],['wrong',trace,proof,id],['u5e28',trace,proof,id,{}]])assert.throws(()=>Reflect.apply(compileSourceWhole,null,args));
 assert.equal(sourceCompileCallCount(),0);assert.equal(geometryDerivationCallCount(),0);assert.equal(cachedPositiveCallCount(),0);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false);
 const binding=historicalAppSnapshotBindings()[0];assert.throws(()=>readHistoricalAppSnapshot(binding.originalPath,'0'.repeat(64)));assert.throws(()=>readHistoricalAppSnapshot('unrecognized/app.ts',binding.expectedSHA256));
});
test('1317 parent/canonical provenance preserves capture anomaly and app-UI boundary',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString()),resume=JSON.parse(read(DIR+'resume.json').toString()),parentBytes=read('docs/hanja-goal-glyphwiki-batch1316-2026-10-20/resume.json'),parent=JSON.parse(parentBytes.toString());
 assert.equal(sha(parentBytes),'d45d8524d27ec48e4b660bd877b190b4264bd6038168459a0637f9b78a6b74e6');assert(parent.actualCheckpointVerified&&parent.actualRegistryVerified&&parent.runtimeRegistered);assert.equal(parent.completedRuntime,5732);assert.equal(resume.completedRuntime,5733);assert.equal(resume.remainingCommittedRuntime,245);assert.equal(resume.canonicalInspection.references,374);assert.equal(resume.totalHolds,191);assert.equal(resume.resolvedHolds.length,parent.resolvedHolds.length+1);assert.deepEqual(resume.resolvedHolds.slice(0,-1),parent.resolvedHolds);
 const canonical=JSON.parse(read('docs/hanja-goal-glyphwiki-batch939-2026-10-13/resume.json').toString()) as {newHolds:unknown[]};const matches=canonical.newHolds.filter(r=>typeof r==='object'&&r!==null&&'glyph'in r&&r.glyph==='帨');assert.equal(matches.length,1);assert.equal(sha(JSON.stringify(matches[0])),'c1c35401d41d4c410dafe866e45a33c03d8220627b5f4ca3ef6ba66c40afd812');
 assert.equal(review.actualAppUI,false);assert.equal(review.isolatedActualComponentBrowserVerified,true);const a=review.actualComponentNative;assert.equal(a.whole.firstCapturePassed,false);assert.equal(a.captureHistory[0].blank,true);assert.equal(a.captureHistory[0].causeConfirmed,false);assert.equal(a.captureHistory[1].completedImagePassed,true);assert.equal(a.captureHistory[1].DOMBlackFillPaths,14);assert.deepEqual(a.hydrationErrorsThroughout,[]);assert.equal(a.earlyPen10.initialIsland,false);assert.equal(review.startGateIntegration.targetCompletionUnmasked,false);assert.equal(a.server.exitCode,143);assert.equal(a.natural[0].startPercent,5.361250001192093);assert.equal(a.natural[1].startPercent,5.464999999403881);
 const oldReview=JSON.parse(read('docs/hanja-renderer-global-projection-u5e28-native-review-2026-10-20/native-review.json').toString());assert.equal(oldReview.isolatedActualComponentBrowserVerified,false);
});
