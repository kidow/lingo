import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {readHistoricalAppSnapshot as readzhi,historicalAppSnapshotBindings as zhiBindings,historicalEvidence} from '../docs/hanja-component-evidence-growing-caps-u6303-2026-10-21/resolver.mjs'
import {readHistoricalAppSnapshot as readquan,historicalAppSnapshotBindings as quanBindings} from '../docs/hanja-component-evidence-growing-caps-u7277-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readbase,historicalAppSnapshotBindings as baseBindings} from '../docs/hanja-component-evidence-growing-caps-u6faf-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readsi,historicalAppSnapshotBindings as siBindings} from '../docs/hanja-component-evidence-growing-caps-u7de6-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readdi,historicalAppSnapshotBindings as diBindings} from '../docs/hanja-component-evidence-growing-caps-u75b7-2026-10-20/resolver.mjs'
import {readHistoricalAppSnapshot as readcan,historicalAppSnapshotBindings as canBindings} from '../docs/hanja-component-evidence-growing-caps-u6faf-distance-2026-10-20/resolver.mjs'
import test from 'node:test'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1326_STROKES as ENTRY,loadGlyphWikiBatch1326Strokes as loadReviewed} from './hanja-stroke-dictionary-glyphwiki-batch1326.ts'
import {selectedProofIdentity,compileProgressive,compileSourceWhole,sourceCompileCallCount,geometryDerivationCallCount,cachedPositiveCallCount,nativeApproval,runtimeApplied} from '../docs/hanja-source-independent-qq-left-u6303-source-experiment-2026-10-20/candidate.mjs'
const ROOT=new URL('../',import.meta.url),DIR='docs/hanja-goal-glyphwiki-batch1326-2026-10-21/',EXP='docs/hanja-source-independent-qq-left-u6303-source-experiment-2026-10-20/',SRC='docs/hanja-goal-glyphwiki-batch901-2026-10-13/'
const sha=(x:Uint8Array|string)=>createHash('sha256').update(x).digest('hex')
const frozen=[{read:readzhi,bindings:zhiBindings()},{read:readquan,bindings:quanBindings().filter(x=>x.originalPath.includes('-u7277.'))},{read:readbase,bindings:baseBindings().filter(x=>x.originalPath==='lib/hanja-stroke-start-gate.ts'||x.originalPath==='lib/hanja-stroke-start-gate.test.ts')},{read:readsi,bindings:siBindings().filter(x=>x.originalPath.includes('-si.'))},{read:readdi,bindings:diBindings().filter(x=>x.originalPath.includes('-di.'))},{read:readcan,bindings:canBindings().filter(x=>x.originalPath.includes('-can.'))}]
const read=(p:string):Buffer=>{for(const s of frozen){const b=s.bindings.find(x=>x.originalPath===p);if(b)return s.read(p,b.expectedSHA256)}return readFileSync(new URL(p,ROOT))}
type MutableEntry={paths:string[];outlines:{weight:number;direction:string;bounds:number[];outline:string}[][]}
test('1326 all-field loader key-order independence and effective nested negatives',()=>{
 const fixture:unknown=JSON.parse(read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1326.json').toString());assert.deepEqual(loadReviewed(fixture),ENTRY)
 const reorder=(x:unknown):unknown=>Array.isArray(x)?x.map(reorder):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reorder(v)])):x
 assert.deepEqual(loadReviewed(reorder(fixture)),ENTRY)
 for(const args of[[],[fixture,{}]])assert.throws(()=>Reflect.apply(loadReviewed,null,args))
 const changes:((b:MutableEntry[])=>void)[]=[b=>{b[0].paths[0]='M0 0 L1 1 Z'},b=>{b[0].outlines[1][1].direction='invalid'},b=>{b[0].outlines[1][0].weight++},b=>{b[0].outlines[1].reverse()},b=>{b[0].outlines[0][0].bounds[0]++},b=>{b[0].outlines.reverse()}]
 for(const mutate of changes){const b=JSON.parse(JSON.stringify(fixture))as MutableEntry[];mutate(b);assert.notDeepEqual(b,fixture,'negative must materially change JSON');assert.throws(()=>loadReviewed(b))}
 const hole=JSON.parse(JSON.stringify(fixture));delete hole[0].outlines[0];assert.throws(()=>loadReviewed(hole))
 const inherited=JSON.parse(JSON.stringify(fixture)),weight=inherited[0].outlines[0][0].weight;delete inherited[0].outlines[0][0].weight;Object.setPrototypeOf(inherited[0].outlines[0][0],{weight});assert.throws(()=>loadReviewed(inherited))
 assert.equal(ENTRY[0].glyph,'挃');assert.equal(ENTRY[0].outlines?.length,9);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines?.[0][0].bounds))
})
test('1326 existing full5 id3 and prior exact LEFT partition preserve all raw fields and frozen pins',()=>{
 const review=JSON.parse(read(DIR+'review.json').toString())as{immutableFilesSHA256:Record<string,string>};assert.equal(Object.keys(review.immutableFilesSHA256).length,136);for(const[p,h]of Object.entries(review.immutableFilesSHA256))assert.equal(sha(read(p)),h,p)
 const t=JSON.parse(read(EXP+'config.json').toString()).targets.u6303,f=JSON.parse(read(EXP+'fixtures.json').toString()).u6303,proof=JSON.parse(read(SRC+'engine-whole-u6303.json').toString()),trace=proof.trace
 const source=JSON.parse(read(SRC+'sources.json').toString());assert.equal(Object.keys(source.records).length,4);assert.equal(source.wholeNames.length,2);assert.equal(source.providerVersions.length,0);assert.deepEqual(t.sourceFamily.selectedRootClosure,['u6303','u624c-01','u81f3-02-var-003']);for(const name of t.sourceFamily.selectedRootClosure)assert(Object.hasOwn(source.records,name));assert.equal(t.existingFull5Preserved,true);assert.equal(t.newHeaderTraceCombination,false)
 assert.deepEqual(ENTRY[0].outlines,f.strokes);assert.notDeepEqual(f.strokes,f.baseline);assert.deepEqual(f.baseline,t.factoryGroupMap.map((g:number[])=>g.flatMap(x=>f.rawBaseline[x])));assert.deepEqual(f.originalOrderBaseline,f.rawBaseline)
 assert.equal(sha(JSON.stringify(f.strokes)),'49d827b2f18f74efc30c2b9d4fa4682362aabcb84d8fde8f189d733943d1e85c');assert.equal(sha(JSON.stringify(f.baseline)),t.baselineSHA256)
 assert.equal(f.baseline.flat().length,10);assert.equal(f.strokes.flat().length,11)
 const original=f.baseline[1][0],body=f.strokes[1][0],tail=f.strokes[1][1],parts=original.outline.match(/M[^M]+/g).map((v:string)=>v.trim())
 assert.equal(parts.length,5);assert.deepEqual(body,{...original,outline:parts.slice(0,-1).join(' '),bounds:t.tailSpec.remainingBounds});assert.deepEqual(tail,{outline:parts.at(-1),bounds:[10.75,87.5,17.75,90.5],direction:'left',weight:7})
 assert.equal(body.revealPath,original.revealPath);assert.equal(body.revealWidth,original.revealWidth);assert.equal(body.weight,85.071068);assert.equal(body.weight+tail.weight,92.071068)
 for(let p=0;p<f.strokes.length;p++)if(p!==1)assert.deepEqual(f.strokes[p],f.baseline[p])
 const polygons=(s:{outline:string}[][])=>s.flatMap(ms=>ms.flatMap(m=>(m.outline.match(/M[^M]+/g)||[]).map(v=>v.trim())))
 assert.deepEqual(polygons(f.strokes),polygons(f.baseline));assert.equal(polygons(f.strokes).length,24)
 const last=trace[1].at(-1);assert.equal(last.kind,'cdDrawCurve');assert.deepEqual(last.args,[45.5,171,45.5,181,35.5,181,1,314]);assert.equal(sha(JSON.stringify(last.polygons.at(-1))),'778d009b838724279642df6caa1e646a07e6473d5dd4cab6e0ca4ab6195b03a1')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,proof);assert.deepEqual(selectedProofIdentity,t.identity);assert.deepEqual(Object.keys(selectedProofIdentity).sort(),['file','fileSHA256','root']);assert.equal(sha(read(EXP+t.identity.file)),t.identity.fileSHA256);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256)
 for(const args of[[],[trace],[trace,proof],[trace,proof,t.identity,{}],[trace,proof,{...t.identity,extra:true}],[[],proof,t.identity],[trace,{...proof,extra:true},t.identity]])assert.throws(()=>Reflect.apply(compileProgressive,null,args))
 for(const args of[[t.root,trace,proof],[t.root,trace,proof,t.identity,{}],['wrong',trace,proof,t.identity]])assert.throws(()=>Reflect.apply(compileSourceWhole,null,args))
 for(const key of Object.keys(t.identity)){const missing={...t.identity};delete missing[key];assert.throws(()=>Reflect.apply(compileProgressive,null,[trace,proof,missing]))}
 assert.equal(sourceCompileCallCount(),0);assert.equal(geometryDerivationCallCount(),0);assert.equal(cachedPositiveCallCount(),0);assert.equal(nativeApproval,false);assert.equal(runtimeApplied,false)
 assert.equal(f.sourceGeometryGenerations,0);assert.equal(f.tailDerivations,1);assert.equal(f.engineRuns,0);assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
})
test('1326 canonical object parent and frozen actual component scope remain distinct from source history',()=>{
 const r=JSON.parse(read(DIR+'review.json').toString()),resume=JSON.parse(read(DIR+'resume.json').toString()),parent=JSON.parse(read('docs/hanja-goal-glyphwiki-batch1325-2026-10-21/resume.json').toString())
 assert.equal(sha(read('docs/hanja-goal-glyphwiki-batch1325-2026-10-21/resume.json')),'a0999d8d0465dc003bd7fb9ab0dd21e70c96a1662481e2f202b7bba2a4636e46');assert(parent.actualCheckpointVerified&&parent.actualRegistryVerified&&parent.runtimeRegistered)
 assert.equal(parent.completedRuntime,5741);assert.equal(resume.completedRuntime,5742);assert.equal(resume.remainingCommittedRuntime,236);assert.equal(resume.totalHolds,182);assert.equal(resume.canonicalInspection.references,383);assert.deepEqual(resume.resolvedHolds.slice(0,-1),parent.resolvedHolds)
 const canonical=JSON.parse(read('docs/hanja-goal-glyphwiki-batch939-2026-10-13/resume.json').toString()),target=canonical.newHolds[242];assert.equal(target.glyph,'挃');assert.equal(sha(JSON.stringify(target)),'d7798c439aa41fbb7cc1d3c33935a21b7a55a914e58c592c5e2037062aacb0d2')
 const a=r.actualComponentNative;assert(r.isolatedActualComponentBrowserVerified);assert.equal(r.actualAppUI,false);assert(a.hydrationReady);assert.deepEqual(a.hydrationErrors,[]);assert.equal(a.directions.frames,4);assert.equal(a.directions.all9DirectionsRerun,false);assert.equal(a.local.frames,30);assert.equal(a.rho.frames,15);assert.equal(a.firstL.frames,3);assert.equal(a.maskBoundaries.frames,12);assert.equal(a.coverage.whiteResidualTargets,5);assert.equal(a.coarse.pairs,36);assert.equal(a.sameFrame.falseObserved,0);assert.equal(a.local.requested100ObservedPartial.actual,.9999999999999998);assert.equal(a.local.requested100ObservedPartial.fullRound,false);assert(a.whole.exactGlobal1Observed);assert.equal(a.natural.observedScreens,8);assert.equal(a.natural.allAnimationFramesObserved,false);assert.equal(a.server.exitCode,130);assert.equal(a.server.pid,5517);assert.equal(a.server.sessionId,74929);assert.equal(a.independentMeasurementBridgeClaim,false);assert.equal(a.diagnostics.firstNatural2ObserverHiddenStatusInnerTextJSONParseFailure,1)
 assert.equal(historicalEvidence.isolatedActualComponentBrowserVerified,false);assert.equal(historicalEvidence.runtimeApplied,false)
 const component=read('components/hanja/stroke-outlines.tsx').toString();assert.equal(sha(component),'2f0009c6a37ac9c6f9f8f63ddff904bd3949907d6a97bd42a9aaa3d453ddcd1d')
 const start=component.indexOf('function U6303CapsOutline('),end=component.indexOf('function U7277CapsOutline(',start),child=component.slice(start,end);assert(start>=0&&end>start);assert(child.includes('progress===1'));assert(child.includes('data-growing-full-round="true"'));assert(child.includes("mask={'url(#'+clipId+')'}"));assert(child.includes('visibility="hidden"'));assert(child.includes('data-u6303-measurement="true"'));assert(child.includes('pathLength="1"'))
 assert.equal(JSON.parse(read(EXP+'preparation.json').toString()).nativeApproval,false)
})
