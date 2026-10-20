import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {readHistoricalAppSnapshot as readqian,historicalAppSnapshotBindings as qianBindings,historicalEvidence} from '../docs/hanja-component-evidence-growing-caps-u7277-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readbase,historicalAppSnapshotBindings as baseBindings} from '../docs/hanja-component-evidence-growing-caps-u6faf-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readsi,historicalAppSnapshotBindings as siBindings} from '../docs/hanja-component-evidence-growing-caps-u7de6-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readdi,historicalAppSnapshotBindings as diBindings} from '../docs/hanja-component-evidence-growing-caps-u75b7-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readcan,historicalAppSnapshotBindings as canBindings} from '../docs/hanja-component-evidence-growing-caps-u6faf-distance-2026-10-20/resolver.mjs'
import test from 'node:test'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1325_STROKES as ENTRY,loadGlyphWikiBatch1325Strokes as loadReviewed} from './hanja-stroke-dictionary-glyphwiki-batch1325.ts'
import {selectedProofIdentity,compileProgressive,compileSourceWhole,sourceCompileCallCount,geometryDerivationCallCount,cachedPositiveCallCount,nativeApproval,runtimeApplied} from '../docs/hanja-source-independent-hq-order-u7277-source-experiment-2026-10-20/candidate.mjs'
const ROOT=new URL('../',import.meta.url),DIR='docs/hanja-goal-glyphwiki-batch1325-2026-10-21/',EXP='docs/hanja-source-independent-hq-order-u7277-source-experiment-2026-10-20/',SRC='docs/hanja-goal-glyphwiki-batch848-2026-10-13/'
const sha=(x:Uint8Array|string)=>createHash('sha256').update(x).digest('hex')
const frozen=[{read:readqian,bindings:qianBindings()},{read:readbase,bindings:baseBindings().filter(x=>x.originalPath==='lib/hanja-stroke-start-gate.ts'||x.originalPath==='lib/hanja-stroke-start-gate.test.ts')},{read:readsi,bindings:siBindings().filter(x=>x.originalPath.includes('-si.'))},{read:readdi,bindings:diBindings().filter(x=>x.originalPath.includes('-di.'))},{read:readcan,bindings:canBindings().filter(x=>x.originalPath.includes('-can.'))}]
const read=(p:string):Buffer=>{for(const s of frozen){const b=s.bindings.find(x=>x.originalPath===p);if(b)return s.read(p,b.expectedSHA256)}return readFileSync(new URL(p,ROOT))}
type MutableEntry={paths:string[];outlines:{weight:number;direction:string;bounds:number[];outline:string}[][]}
test('1325 all-field loader key-order independence and effective nested negatives',()=>{
 const fixture:unknown=JSON.parse(read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1325.json').toString());assert.deepEqual(loadReviewed(fixture),ENTRY)
 const reorder=(x:unknown):unknown=>Array.isArray(x)?x.map(reorder):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reorder(v)])):x
 assert.deepEqual(loadReviewed(reorder(fixture)),ENTRY)
 for(const args of[[],[fixture,{}]])assert.throws(()=>Reflect.apply(loadReviewed,null,args))
 const changes:((b:MutableEntry[])=>void)[]=[b=>{b[0].paths[0]='M0 0 L1 1 Z'},b=>{b[0].outlines[5][1].direction='invalid'},b=>{b[0].outlines[5][0].weight++},b=>{b[0].outlines[5].reverse()},b=>{b[0].outlines[0][0].bounds[0]++},b=>{b[0].outlines.reverse()}]
 for(const mutate of changes){const b=JSON.parse(JSON.stringify(fixture))as MutableEntry[];mutate(b);assert.notDeepEqual(b,fixture,'negative must materially change JSON');assert.throws(()=>loadReviewed(b))}
 const hole=JSON.parse(JSON.stringify(fixture));delete hole[0].outlines[0];assert.throws(()=>loadReviewed(hole))
 const inherited=JSON.parse(JSON.stringify(fixture)),weight=inherited[0].outlines[0][0].weight;delete inherited[0].outlines[0][0].weight;Object.setPrototypeOf(inherited[0].outlines[0][0],{weight});assert.throws(()=>loadReviewed(inherited))
 assert.equal(ENTRY[0].glyph,'牷');assert.equal(ENTRY[0].outlines?.length,10);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines?.[0][0].bounds))
})
test('1325 full5 id3 cached raw references preserve every mask and immutable frozen pins',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString())as{immutableFilesSHA256:Record<string,string>};assert.equal(Object.keys(review.immutableFilesSHA256).length,96);for(const[p,h]of Object.entries(review.immutableFilesSHA256))assert.equal(sha(read(p)),h,p)
 const t=JSON.parse(read(EXP+'config.json').toString()).targets.u7277,f=JSON.parse(read(EXP+'fixtures.json').toString()).u7277,proof=JSON.parse(read(SRC+'engine-whole-u7277.json').toString()),trace=proof.trace
 assert.deepEqual(ENTRY[0].outlines,f.strokes);assert.deepEqual(f.strokes,f.baseline);assert.deepEqual(f.strokes,t.factoryGroupMap.map((g:number[])=>g.flatMap(x=>f.rawBaseline[x])))
 assert.deepEqual(f.originalOrderBaseline,f.rawBaseline);assert.equal(sha(JSON.stringify(f.strokes)),'0080eaa2405975a46a34d479ba06c9d876e7b83cf9135f32cc8104b099b52b10')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,proof);assert.deepEqual(selectedProofIdentity,t.identity);assert.deepEqual(Object.keys(selectedProofIdentity).sort(),['file','fileSHA256','root']);assert.equal(sha(read(EXP+t.identity.file)),t.identity.fileSHA256);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256)
 for(const args of[[],[trace],[trace,proof],[trace,proof,t.identity,{}],[trace,proof,{...t.identity,extra:true}],[[],proof,t.identity],[trace,{...proof,extra:true},t.identity]])assert.throws(()=>Reflect.apply(compileProgressive,null,args))
 for(const args of[[t.root,trace,proof],[t.root,trace,proof,t.identity,{}],['wrong',trace,proof,t.identity]])assert.throws(()=>Reflect.apply(compileSourceWhole,null,args))
 for(const key of Object.keys(t.identity)){const missing={...t.identity};delete missing[key];assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,missing]))}
 assert.equal(sourceCompileCallCount(),0);assert.equal(geometryDerivationCallCount(),0);assert.equal(cachedPositiveCallCount(),0);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false)
 assert.equal(f.strokes.flat().reduce((n:number,s:{outline:string})=>n+(s.outline.match(/M/g)||[]).length,0),22)
})
test('1325 parent canonical object and exact frozen actual component evidence only',()=>{
 const r=JSON.parse(read(DIR+'review.json').toString()),resume=JSON.parse(read(DIR+'resume.json').toString()),parent=JSON.parse(read('docs/hanja-goal-glyphwiki-batch1324-2026-10-20/resume.json').toString())
 assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch1324-2026-10-20/resume.json')),'d8da90903d3712dec01f7e17e3bbacb36ad765868dda2d8cffcb77621dd0fd2f');assert(parent.actualCheckpointVerified&&parent.actualRegistryVerified&&parent.runtimeRegistered)
 assert.equal(parent.completedRuntime,5740);assert.equal(resume.completedRuntime,5741);assert.equal(resume.remainingCommittedRuntime,237);assert.equal(resume.totalHolds,183);assert.equal(resume.canonicalInspection.references,382);assert.deepEqual(resume.resolvedHolds.slice(0,-1),parent.resolvedHolds)
 const canonical=JSON.parse(read('docs/hanja-goal-glyphwiki-batch939-2026-10-13/resume.json').toString()),target=canonical.newHolds[219];assert.equal(target.glyph,'牷');assert.equal(sha(JSON.stringify(target)),'0800afdd6e252fb8a8e861bcb117a3e3b7d65e5455b56c51428b4682cf66b80c')
 const a=r.actualComponentNative;assert(r.isolatedActualComponentBrowserVerified);assert.equal(r.actualAppUI,false);assert(a.hydrationReady);assert.deepEqual(a.hydrationErrors,[]);assert.equal(a.directions.frames,4);assert.equal(a.directions.all10DirectionsRerun,false);assert.equal(a.local.frames,24);assert.equal(a.rho.frames,12);assert.equal(a.maskBoundaries.frames,6);assert.equal(a.coverage.whiteResidualTargets,4);assert.equal(a.coarse.pairs,36);assert.equal(a.sameFrame.falseObserved,0);assert.equal(a.local.requested100ObservedPartial.actual,.9999999999999998);assert.equal(a.local.requested100ObservedPartial.fullRound,false);assert(a.whole.allTargetsExactP1&&a.whole.alwaysMasked);assert.equal(a.natural.observedScreens,8);assert.equal(a.natural.allAnimationFramesObserved,false);assert.equal(a.server.exitCode,130)
 assert.equal(historicalEvidence.isolatedActualComponentBrowserVerified,false);assert.equal(historicalEvidence.runtimeApplied,false)
 const component=read('components/hanja/stroke-outlines.tsx').toString();assert.equal(sha(component),'64ccda53de43acacac1d8308c4095a62623822fa36bad71cc35b144bc2f70e5b');assert(!component.includes('function U6303CapsOutline'))
 const start=component.indexOf('function U7277CapsOutline('),end=component.indexOf('function CanCapsOutline(',start),child=component.slice(start,end);assert(start>=0&&end>start);assert(child.includes('progress===1'));assert(child.includes('data-growing-full-round="true"'));assert(child.includes("mask={'url(#'+clipId+')'}"));assert(child.includes('visibility="hidden"'));assert(child.includes('data-u7277-measurement="true"'));assert(child.includes('pathLength="1"'))
 assert.equal(JSON.parse(read(EXP+'preparation.json').toString()).nativeApproval,false)
})
