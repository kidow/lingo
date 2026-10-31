import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1493_STROKES as ENTRY,loadGlyphWikiBatch1493Strokes as load,GLYPHWIKI_BATCH1493_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1493.ts'
import {makeReviewedU8b92HkcsSourceContext,reviewedU8b92HkcsPolicy} from './hanja-stroke-start-caps-u8b92-hkcs.ts'
import {makeReviewedU8b92HkcsShortCurveSourceContext,reviewedU8b92HkcsShortCurvePolicy} from './hanja-stroke-short-curve-prefix-u8b92-hkcs.ts'
import {makeReviewedU8b92HkcsPointHvSourceContext,reviewedU8b92HkcsPointHvPolicy} from './hanja-stroke-cardinal-point-contact-u8b92-hkcs.ts'
import {makeReviewedU8b92HkcsFlag5TailSourceContext,reviewedU8b92HkcsFlag5TailPolicy} from './hanja-stroke-flag5-up-tail-u8b92-hkcs.ts'
import {makeReviewedU8b92PriorPointWindowSourceContext,reviewedU8b92PriorPointWindowPolicy} from './hanja-stroke-prior-point-window-u8b92-hkcs.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u8b92-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1493.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u8b92-activation-review.json'
test('1493 binds normal24 to original fixed source and point-window native approval',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m8b92,n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u8b92-hkcs-2026-10-26/sources.json')
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(fixtureEvidenceBytes(REVIEW,APPROVAL.SHA256,bytes)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(file,hash,bytes)),hash,file)
 for(const item of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024})),item.SHA256,item.path)
 assert.deepEqual(c.sourceRecords,source.records);assert.deepEqual(c.sourceProvenance,source.sourceIdentity);assert.equal(Object.keys(c.sourceRecords).length,3);assert.equal(source.rootVersion,1);assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,31);assert.equal(f.fullProof.trace.flat().length,34);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),63);assert.equal(f.strokes.length,24);assert.equal(f.strokes.flat().length,34)
 assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[5],[6,7],[8],[9],[10,11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22,23],[24],[25,26],[27],[28],[29],[30]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:31},(_,i)=>i).filter(i=>i!==4));assert.deepEqual(b[0].sourceStrokeIndices,c.sourceGroups.map((g:number[])=>g[0]+1));assert.deepEqual(c.sourcePreservation.metadataZeroBasedRows,[4])
 const count=(policy:(p:number,m:number)=>unknown):number=>f.strokes.reduce((n:number,row:unknown[],p:number)=>n+row.filter((_,m)=>policy(p,m)).length,0);const counts:number[]=[]
 {const ctx=makeReviewedU8b92HkcsSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);counts.push(count((p,m)=>reviewedU8b92HkcsPolicy(ctx,p,m)))}
 {const ctx=makeReviewedU8b92HkcsShortCurveSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);counts.push(count((p,m)=>reviewedU8b92HkcsShortCurvePolicy(ctx,p,m)))}
 {const ctx=makeReviewedU8b92HkcsPointHvSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);counts.push(count((p,m)=>reviewedU8b92HkcsPointHvPolicy(ctx,p,m)))}
 {const ctx=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);counts.push(count((p,m)=>reviewedU8b92HkcsFlag5TailPolicy(ctx,p,m)))}
 {const ctx=makeReviewedU8b92PriorPointWindowSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);counts.push(count((p,m)=>reviewedU8b92PriorPointWindowPolicy(ctx,p,m)))}
 assert.deepEqual(counts,[7,2,3,2,1])
 assert(f.strokes.flat().every((s:object)=>!Object.hasOwn(s,'inkPaths')));assert.equal(n.nativeApproval,true);assert.equal(n.freshFinite.states,27);assert.equal(n.freshNatural.states,6);assert.equal(n.reuse.finiteStates,100);assert.equal(n.reuse.naturalStates,24);assert.deepEqual(n.totals,{finite:127,natural:30,doneWholeScreens:1});assert.equal(n.whole.logicalPens,24);assert.equal(n.whole.targetCount,15);assert.equal(n.whole.allTargetPExactly1,true);assert.deepEqual(n.whole.bad,[]);assert.deepEqual(n.whole.errors,[]);assert.equal(n.server.stopped,true);assert.equal(n.server.portClosed,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.publisherMicrotimingEquivalent,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u8b92-hkcs.md').length>0)
})
const reverse=(v:unknown):unknown=>Array.isArray(v)?v.map(reverse):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reverse(x)])):v
test('1493 strict loader accepts key order and rejects semantic or reflective changes',()=>{
 const b=json(BUNDLE);assert.deepEqual(load(reverse(b)),ENTRY);assert.equal(Object.isFrozen(ENTRY),true);assert.equal(Object.isFrozen(ENTRY[0].outlines),true)
 for(const field of['outline','weight','revealPath','revealWidth']){const x=json(BUNDLE),s=x[0].outlines[0][0];s[field]=typeof s[field]==='number'?s[field]+.001:s[field]+' ';assert.throws(()=>load(x))}
 for(const field of['geometrySource','pathsSha256']){const x=json(BUNDLE);x[0][field]='changed';assert.throws(()=>load(x))}
 const inherited=json(BUNDLE);Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited));const symbol=json(BUNDLE);symbol[0][Symbol('unexpected')]=true;assert.throws(()=>load(symbol));const hidden=json(BUNDLE);Object.defineProperty(hidden,'extra',{value:1});assert.throws(()=>load(hidden))
 let called=false;const getter=json(BUNDLE);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){called=true;throw Error('must not run')}});assert.throws(()=>load(getter));assert.equal(called,false);assert.throws(()=>(load as(...args:unknown[])=>unknown)(b,b));assert.throws(()=>load([]))
})
