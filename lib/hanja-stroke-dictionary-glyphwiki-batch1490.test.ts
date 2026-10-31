import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1490_STROKES as ENTRY,loadGlyphWikiBatch1490Strokes as load,GLYPHWIKI_BATCH1490_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1490.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u6fe9-hkcs-m.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1490.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u6fe9-activation-review.json'
import {makeReviewedU6fe9HkcsMLogical3SourceContext,reviewedU6fe9HkcsMLogical3Policy,reviewedU6fe9HkcsMLogical3Parts} from './hanja-stroke-logical3-u6fe9-hkcs-m.ts'
test('1490 sourcegate binds normal17 and actual independent logical3 paint',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m6fe9,n=json(r.nativeEvidence.path)
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(fixtureEvidenceBytes(REVIEW,APPROVAL.SHA256,bytes)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(file,hash,bytes)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,21);assert.equal(f.fullProof.trace.flat().length,21);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),41)
 assert.equal(f.strokes.length,17);assert.equal(f.strokes.flat().length,21);assert.deepEqual(c.sourceGroups,[[0],[1],[2,3,4,5],[6],[7],[9],[8],[10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:21},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,3);assert.deepEqual(b[0].sourceStrokeIndices,[1,2,3,7,8,10,9,11,12,13,14,15,16,17,18,19,21])
 const ctx=makeReviewedU6fe9HkcsMLogical3SourceContext(f.fullProof,f.identity,f.strokes),policy=reviewedU6fe9HkcsMLogical3Policy(ctx,2);assert.ok(policy);const parts=reviewedU6fe9HkcsMLogical3Parts(policy,f.strokes[2]);assert.ok(parts);assert.deepEqual(parts,c.logical3IndependentPaint);assert.deepEqual([parts.foot.length,parts.body.length,parts.rise.length],[3,4,2]);assert.equal(sha(JSON.stringify(parts)),r.logical3OriginalPaint.independentPartsSHA256);assert(f.strokes.flat().every((s:object)=>!Object.hasOwn(s,'inkPaths')))
 assert.equal(n.finite.uniqueFrames,53);assert.equal(n.finite.actualRequestedPVerifiedWithinFloatingRoundoff,true);assert.deepEqual(n.finite.bad,[]);assert.deepEqual(n.finite.errors,[]);assert.equal(n.natural.uniqueProgressObservations,9);assert.equal(n.natural.uniqueEndObservations,7);assert.equal(n.natural.uniqueObservations,16);assert.equal(n.normalizedEndpoint.rawProgress,'0.9999999999999999');assert.equal(n.normalizedEndpoint.status,'visible');assert.equal(n.normalizedEndpoint.exactCompleteClaimedForThisPartialEndpoint,false);assert.equal(n.doneWhole.observations,1);assert.equal(n.doneWhole.logicalStrokes,17);assert.equal(n.doneWhole.selectedPen,3);assert.equal(n.doneWhole.logical3.rawProgress,'1');assert.equal(n.doneWhole.logical3.status,'complete');assert.equal(n.doneWhole.logical3.independentOriginalP,9)
 const water=json(r.originalEvidence.water3Path),remaining=json(r.originalEvidence.remaining16Path);assert.equal(water.sourceSVG.sha256,b[0].sourceReference.dictionarySvgSha256);assert.equal(remaining.input.SVG_SHA256,b[0].sourceReference.dictionarySvgSha256);assert.equal(water.native.acceptedScreens,3);assert.equal(r.originalEvidence.remaining16FreshFrames,48)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal(n.cleanup.exitCode,130);assert.equal(n.cleanup.ownServers,0);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u6fe9-hkcs-m.md').length>0)
 console.log(JSON.stringify({sourcegate:true,full5Unchanged:true,normal17:true,independentP9:true,nativeFinite53:true,naturalUnique16:true,exactDone17:true,registryImported:false}))
})
test('1490 loader is key-order independent and rejects changed or reflective input',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'濩'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const p=structuredClone(b);p[0].outlines[0][0].outline+=' ';assert.throws(()=>load(p));const q=structuredClone(b);q[0].outlines[1][0].revealPath+=' ';assert.throws(()=>load(q));const variant=structuredClone(b);variant[0].variant={catalogStrokes:17,playbackStrokes:17,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:unknown):unknown=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert(Object.isFrozen(ENTRY[0].outlines![0][0]))
})
