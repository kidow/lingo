import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1495_STROKES as ENTRY,loadGlyphWikiBatch1495Strokes as load,GLYPHWIKI_BATCH1495_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1495.ts'
import {makeReviewedU8609HkcsSourceContexts} from './hanja-stroke-source-context-u8609-hkcs.ts'
import {reviewedU8609HkcsPolicy} from './hanja-stroke-start-caps-u8609-hkcs.ts'
import {makeReviewedU8609HkcsUnionPointSourceContext,reviewedU8609HkcsUnionPointPolicy} from './hanja-stroke-union-point-windows-u8609-hkcs.ts'
import {makeReviewedU8609HkcsPointRect19SourceContext,reviewedU8609HkcsPointRect19Policy} from './hanja-stroke-point-rect19-u8609-hkcs.ts'
import {reviewedU8609PointFoldPolicy} from './hanja-stroke-point-fold-u8609-hkcs.ts'
import {reviewedU8609PrefixPolicy} from './hanja-stroke-prefix-u8609-hkcs.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u8609-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1495.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u8609-activation-review.json'
test('1495 binds normal20 to fixed source and corrected point native approval',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m8609,n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u8609-hkcs-2026-10-26/sources.json')
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(bytes(REVIEW)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(file)),hash,file)
 for(const item of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024})),item.SHA256,item.path)
 assert.deepEqual(c.sourceRecords,source.records);assert.deepEqual(c.sourceProvenance,source.sourceIdentity);assert.equal(Object.keys(c.sourceRecords).length,9);assert.equal(source.rootVersion,2);assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,25);assert.equal(f.fullProof.trace.flat().length,25);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),40);assert.equal(f.strokes.length,20);assert.equal(f.strokes.flat().length,25)
 assert.deepEqual(c.sourceGroups,[[0],[1],[3],[2],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18],[19],[20,21],[22,23],[24]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:25},(_,i)=>i));assert.deepEqual(b[0].sourceStrokeIndices,c.sourceGroups.map((g:number[])=>g[0]+1));assert.deepEqual(c.sourcePreservation.metadataZeroBasedRows,[])
 const ctx=makeReviewedU8609HkcsSourceContexts(f.fullProof,f.identity,f.strokes),union=makeReviewedU8609HkcsUnionPointSourceContext(f.fullProof,f.identity,f.strokes),rect=makeReviewedU8609HkcsPointRect19SourceContext(f.fullProof,f.identity,f.strokes);assert(ctx&&union&&rect);assert.equal(union,ctx.caps)
 const count=(policy:(p:number,m:number)=>unknown)=>f.strokes.reduce((n:number,row:unknown[],p:number)=>n+row.filter((_,m)=>policy(p,m)).length,0)
 assert.deepEqual([count((p,m)=>[10,11,17,18].includes(p)?null:reviewedU8609HkcsPolicy(ctx.caps,p,m)),count((p,m)=>reviewedU8609HkcsUnionPointPolicy(union,p,m)),count((p,m)=>reviewedU8609HkcsPointRect19Policy(rect,p,m)),count((p,m)=>reviewedU8609PointFoldPolicy(ctx.fold,p,m)),count((p,m)=>reviewedU8609PrefixPolicy(ctx.prefix,p,m))],[2,3,1,2,1])
 assert(f.strokes.flat().every((s:object)=>!Object.hasOwn(s,'inkPaths')));assert.equal(n.nativeApproval,true);assert.equal(n.finiteCounts.frozenPlanObservations,92);assert.equal(n.finiteCounts.distinctProgressStates,89);assert.equal(n.finiteCounts.reusedDistinctStates,26);assert.equal(n.finiteCounts.freshDistinctStates,63);assert.equal(n.finiteCounts.zeroBoundaryCenterDuplicateObservations,3);assert.equal(n.natural.verifiedUniqueObservations,18);assert.equal(n.freshFiniteCoverage.allCompletedResidualsVisuallyWhite,true);assert.equal(n.freshDoneWhole.logicalPens,20);assert.equal(n.freshDoneWhole.specialTargets,9);assert.equal(n.freshDoneWhole.allSpecialTargetsExactlyOne,true);assert.equal(n.freshDoneWhole.allBadAndErrorListsEmpty,true);assert.equal(n.zeroAndBoundaryActualValues.mask18Before.p,0);assert.equal(n.zeroAndBoundaryActualValues.mask19Before.p,0);assert(n.zeroAndBoundaryActualValues.dedicatedZero18.p>0);assert(n.zeroAndBoundaryActualValues.dedicatedZero19.p>0);assert.equal(n.server.stopped,true);assert.equal(n.server.portClosed,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.publisherMicrotimingEquivalent,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u8609-hkcs.md').length>0)
})
const reverse=(v:unknown):unknown=>Array.isArray(v)?v.map(reverse):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reverse(x)])):v
test('1495 strict loader accepts key order and rejects semantic or reflective changes',()=>{
 const b=json(BUNDLE);assert.deepEqual(load(reverse(b)),ENTRY);assert.equal(Object.isFrozen(ENTRY),true);assert.equal(Object.isFrozen(ENTRY[0].outlines),true)
 for(const field of['outline','weight','revealPath','revealWidth']){const x=json(BUNDLE),s=x[0].outlines[0][0];s[field]=typeof s[field]==='number'?s[field]+.001:s[field]+' ';assert.throws(()=>load(x))}
 for(const field of['geometrySource','pathsSha256']){const x=json(BUNDLE);x[0][field]='changed';assert.throws(()=>load(x))}
 const inherited=json(BUNDLE);Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited));const symbol=json(BUNDLE);symbol[0][Symbol('unexpected')]=true;assert.throws(()=>load(symbol));const hidden=json(BUNDLE);Object.defineProperty(hidden,'extra',{value:1});assert.throws(()=>load(hidden))
 let called=false;const getter=json(BUNDLE);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){called=true;throw Error('must not run')}});assert.throws(()=>load(getter));assert.equal(called,false);assert.throws(()=>(load as(...args:unknown[])=>unknown)(b,b));assert.throws(()=>load([]))
})
