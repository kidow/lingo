import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1488_STROKES as ENTRY,loadGlyphWikiBatch1488Strokes as load,GLYPHWIKI_BATCH1488_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1488.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u59b5-g.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1488.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u59b5-activation-review.json'
test('1488 sourcegate pins original normal8 and limited actual scopes',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).u59b5_g,n=json(r.nativeEvidence.path)
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(bytes(REVIEW)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(file)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,9);assert.equal(f.fullProof.trace.flat().length,9);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),16)
 assert.equal(f.strokes.length,8);assert.equal(f.strokes.flat().length,9);assert.deepEqual(c.sourceGroups,[[0,1],[2],[3],[4],[5],[7],[6],[8]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:9},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,3);assert.deepEqual(b[0].sourceStrokeIndices,[1,3,4,5,6,8,7,9])
 assert.equal(n.finite.uniqueFrames,27);assert.equal(n.finite.actualRequestedPVerifiedWithinFloatingRoundoff,true);assert.deepEqual(n.finite.bad,[]);assert.deepEqual(n.finite.errors,[]);assert.equal(n.natural.uniqueProgressObservations,4);assert.equal(n.natural.uniqueEndObservations,3);assert.equal(n.natural.uniqueObservations,7);assert.equal(n.natural.reusedEnds[0].newEndObservation,false);assert.equal(n.natural.exactFullCommitAtEveryNaturalEndClaimed,false);assert.equal(n.doneWhole.observations,1);assert.equal(n.doneWhole.logicalStrokes,8);assert.equal(n.doneWhole.oldBoundary3GridBelowExcluded,true)
 const old=json(r.originalReviewReuse.findingsPath),meta=json(r.originalReviewReuse.metadataPath);assert.deepEqual(old.reviewedDomesticStrokes,Array.from({length:8},(_,i)=>i+1));assert.equal(old.cumulativeAndFinalReviewed,true);assert.equal(old.progressiveReviewed,false);assert.equal(r.originalReviewReuse.oldSourceDiscontinuityNotTransferred,true);assert.equal(meta.dictionary.sha256,b[0].sourceReference.dictionarySvgSha256)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal(n.cleanup.exitCode,130);assert.equal(n.cleanup.ownServers,0);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u59b5-g.md').length>0)
 console.log(JSON.stringify({sourcegate:true,full5Unchanged:true,normal8:true,nativeFinite27:true,naturalUnique7:true,separateWhole8:true,registryImported:false}))
})
test('1488 loader is key-order independent and rejects changed or reflective input',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'妵'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const p=structuredClone(b);p[0].outlines[0][0].outline+=' ';assert.throws(()=>load(p));const q=structuredClone(b);q[0].outlines[1][0].revealPath+=' ';assert.throws(()=>load(q));const variant=structuredClone(b);variant[0].variant={catalogStrokes:8,playbackStrokes:8,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:unknown):unknown=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert(Object.isFrozen(ENTRY[0].outlines![0][0]))
})
