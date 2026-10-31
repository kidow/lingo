import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1497_STROKES as ENTRY,loadGlyphWikiBatch1497Strokes as load,GLYPHWIKI_BATCH1497_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1497.ts'
import {makeReviewedU85c7HkcsSourceContext,reviewedU85c7HkcsPolicy} from './hanja-stroke-start-caps-u85c7-hkcs.ts'
import {makeReviewedU85c7HkcsCardinalPointSourceContext,reviewedU85c7HkcsCardinalPointPolicy} from './hanja-stroke-cardinal-point-windows-u85c7-hkcs.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u85c7-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1497.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u85c7-activation-review.json'
test('1497 binds normal18 to unchanged original rows and scoped native approval',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m85c7,n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u85c7-hkcs-2026-10-26/sources.json')
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(fixtureEvidenceBytes(REVIEW,APPROVAL.SHA256,bytes)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(file,hash,bytes)),hash,file)
 for(const item of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024})),item.SHA256,item.path)
 assert.deepEqual(c.sourceRecords,source.records);assert.deepEqual(c.sourceProvenance,source.sourceIdentity);assert.equal(Object.keys(c.sourceRecords).length,4);assert.equal(source.rootVersion,2);assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,23);assert.equal(f.fullProof.trace.flat().length,20);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),37);assert.equal(f.strokes.length,18);assert.equal(f.strokes.flat().length,20)
 assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[10],[11],[12],[13],[4],[5],[6,7],[8],[15,16],[17],[18],[20],[21],[22]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:23},(_,i)=>i).filter(i=>![9,14,19].includes(i)));assert.deepEqual(b[0].sourceStrokeIndices,c.sourceGroups.map((g:number[])=>g[0]+1));assert.deepEqual(c.sourcePreservation.metadataZeroBasedRows,[9,14,19]);for(const i of[9,14,19]){assert.deepEqual(c.engineProof.groups[i].polygons,[]);assert.deepEqual(c.engineProof.trace[i],[])}
 const ctx=makeReviewedU85c7HkcsSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx);assert.equal(makeReviewedU85c7HkcsCardinalPointSourceContext(f.fullProof,f.identity,f.strokes),ctx);const count=(policy:(p:number,m:number)=>unknown)=>f.strokes.reduce((n:number,row:unknown[],p:number)=>n+row.filter((_,m)=>policy(p,m)).length,0);assert.deepEqual([count((p,m)=>reviewedU85c7HkcsPolicy(ctx,p,m)),count((p,m)=>reviewedU85c7HkcsCardinalPointPolicy(ctx,p,m))],[3,2]);for(const p of[10,12])assert.equal(f.strokes[p][1].revealPath,undefined)
 assert(f.strokes.flat().every((s:object)=>!Object.hasOwn(s,'inkPaths')));assert.equal(n.nativeApproval,true);assert.equal(n.finite.total,47);assert.equal(n.finite.fresh,35);assert.equal(n.finite.reused,12);assert.equal(n.natural.unique,10);assert.equal(n.whole.pens,18);assert.equal(n.whole.specialTargets,5);assert.equal(n.whole.allSpecialProgressExactly1,true);assert.equal(n.whole.allChecks,true);assert.deepEqual(n.productPaint.rgb,[66,85,255]);assert.equal(n.productPaint.svgOpacity,1);assert.equal(n.productPaint.htmlOpacity,.6);assert.equal(n.postRun.portClosed,true);assert.equal(r.originalEvidence.freshDirectionFrames,54)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);for(const key of['allTime','pixelCount','publisherMicrotimingEquivalent','productWholeAutoplay'])assert.equal(r.approval[key],false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u85c7-hkcs.md').length>0)
})
const reverse=(v:unknown):unknown=>Array.isArray(v)?v.map(reverse):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reverse(x)])):v
test('1497 strict loader accepts object key order and rejects semantic or reflective changes',()=>{
 const b=json(BUNDLE);assert.deepEqual(load(reverse(b)),ENTRY);assert.equal(Object.isFrozen(ENTRY),true);assert.equal(Object.isFrozen(ENTRY[0].outlines),true)
 for(const field of['outline','weight','revealPath','revealWidth']){const x=json(BUNDLE),s=x[0].outlines[4][0];s[field]=typeof s[field]==='number'?s[field]+.001:s[field]+' ';assert.throws(()=>load(x))}
 for(const field of['geometrySource','pathsSha256']){const x=json(BUNDLE);x[0][field]='changed';assert.throws(()=>load(x))}
 const inherited=json(BUNDLE);Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited));const symbol=json(BUNDLE);symbol[0][Symbol('unexpected')]=true;assert.throws(()=>load(symbol));const hidden=json(BUNDLE);Object.defineProperty(hidden,'extra',{value:1});assert.throws(()=>load(hidden))
 let called=false;const getter=json(BUNDLE);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){called=true;throw Error('must not run')}});assert.throws(()=>load(getter));assert.equal(called,false);assert.throws(()=>(load as(...args:unknown[])=>unknown)(b,b));assert.throws(()=>load([]))
})
