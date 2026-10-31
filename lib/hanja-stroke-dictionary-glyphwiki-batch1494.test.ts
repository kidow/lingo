import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1494_STROKES as ENTRY,loadGlyphWikiBatch1494Strokes as load,GLYPHWIKI_BATCH1494_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1494.ts'
import {makeReviewedU5e6aHkcsSourceContexts} from './hanja-stroke-source-context-u5e6a-hkcs.ts'
import {reviewedU5e6aHkcsPolicy} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
import {reviewedU5e6aHkcsShortHookPolicy} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsKernelPointWindowSourceContext,reviewedU5e6aHkcsKernelPointWindowPolicy} from './hanja-stroke-contact-kernel-point-window-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsUnion16SourceContext,reviewedU5e6aHkcsUnion16Policy} from './hanja-stroke-union-point-window16-u5e6a-hkcs.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u5e6a-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1494.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u5e6a-activation-review.json'
test('1494 binds normal17 to fixed source and approved union16',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m5e6a,n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u5e6a-hkcs-2026-10-26/sources.json')
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(fixtureEvidenceBytes(REVIEW,APPROVAL.SHA256,bytes)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(file,hash,bytes)),hash,file)
 for(const item of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024})),item.SHA256,item.path)
 assert.deepEqual(c.sourceRecords,source.records);assert.deepEqual(c.sourceProvenance,source.sourceIdentity);assert.equal(Object.keys(c.sourceRecords).length,4);assert.equal(source.rootVersion,1);assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,19);assert.equal(f.fullProof.trace.flat().length,21);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),38);assert.equal(f.strokes.length,17);assert.equal(f.strokes.flat().length,21)
 assert.deepEqual(c.sourceGroups,[[1],[2,3],[0],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:19},(_,i)=>i));assert.deepEqual(b[0].sourceStrokeIndices,c.sourceGroups.map((g:number[])=>g[0]+1));assert.deepEqual(c.sourcePreservation.metadataZeroBasedRows,[])
 const contexts=makeReviewedU5e6aHkcsSourceContexts(f.fullProof,f.identity,f.strokes),point=makeReviewedU5e6aHkcsKernelPointWindowSourceContext(f.fullProof,f.identity,f.strokes),union=makeReviewedU5e6aHkcsUnion16SourceContext(f.fullProof,f.identity,f.strokes);assert(contexts&&point&&union);assert.equal(union,contexts.caps)
 const count=(policy:(p:number,m:number)=>unknown)=>f.strokes.reduce((n:number,row:unknown[],p:number)=>n+row.filter((_,m)=>policy(p,m)).length,0)
 assert.deepEqual([count((p,m)=>p===15&&m===0?null:reviewedU5e6aHkcsPolicy(contexts.caps,p,m)),count((p,m)=>reviewedU5e6aHkcsShortHookPolicy(contexts.shortHook,p,m)),count((p,m)=>reviewedU5e6aHkcsKernelPointWindowPolicy(point,p,m)),count((p,m)=>reviewedU5e6aHkcsUnion16Policy(union,p,m))],[6,2,2,1])
 assert(f.strokes.flat().every((s:object)=>!Object.hasOwn(s,'inkPaths')));assert.equal(n.nativeApproval,true);assert.equal(n.freshFinite.uniqueStates,7);assert.deepEqual(n.freshFinite.actualProgress,[0,1e-6,.01,.03,.5,.99999999,1]);assert.equal(n.freshNatural.uniqueObservations,2);assert.equal(n.reusedUnchangedEvidence.finiteStates,77);assert.equal(n.reusedUnchangedEvidence.naturalObservations,18);assert.deepEqual(n.approvedTotals,{finiteStates:84,naturalObservations:20,whole17Images:1});assert.equal(n.freshDoneWhole.logicalPens,17);assert.equal(n.freshDoneWhole.specialTargets,11);assert.equal(n.freshDoneWhole.allSpecialTargetsExactlyOne,true);assert.equal(n.freshDoneWhole.allBadAndErrorsEmpty,true);assert.equal(n.server.stopped,true);assert.equal(n.server.portClosed,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.publisherMicrotimingEquivalent,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u5e6a-hkcs.md').length>0)
})
const reverse=(v:unknown):unknown=>Array.isArray(v)?v.map(reverse):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reverse(x)])):v
test('1494 strict loader accepts key order and rejects semantic or reflective changes',()=>{
 const b=json(BUNDLE);assert.deepEqual(load(reverse(b)),ENTRY);assert.equal(Object.isFrozen(ENTRY),true);assert.equal(Object.isFrozen(ENTRY[0].outlines),true)
 for(const field of['outline','weight','revealPath','revealWidth']){const x=json(BUNDLE),s=x[0].outlines[0][0];s[field]=typeof s[field]==='number'?s[field]+.001:s[field]+' ';assert.throws(()=>load(x))}
 for(const field of['geometrySource','pathsSha256']){const x=json(BUNDLE);x[0][field]='changed';assert.throws(()=>load(x))}
 const inherited=json(BUNDLE);Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited));const symbol=json(BUNDLE);symbol[0][Symbol('unexpected')]=true;assert.throws(()=>load(symbol));const hidden=json(BUNDLE);Object.defineProperty(hidden,'extra',{value:1});assert.throws(()=>load(hidden))
 let called=false;const getter=json(BUNDLE);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){called=true;throw Error('must not run')}});assert.throws(()=>load(getter));assert.equal(called,false);assert.throws(()=>(load as(...args:unknown[])=>unknown)(b,b));assert.throws(()=>load([]))
})
