import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1484_STROKES as ENTRY,loadGlyphWikiBatch1484Strokes as load,GLYPHWIKI_BATCH1484_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1484.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u840d-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1484.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u840d-activation-review.json'
test('1484 sourcegate: original P9, exact full5 and independent approval scopes',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),f=json(r.sourceFixture.path).hkcs_m840d,n=json(r.nativeEvidence.path),old=json(r.priorLogical7Evidence.path)
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(bytes(REVIEW)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const[file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(file)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.equal(f.fullProof.groups.length,15);assert.equal(f.fullProof.trace.flat().length,15);assert.equal(f.fullProof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),31)
 assert.equal(f.strokes.length,12);assert.equal(f.strokes.flat().length,15);assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7,8,9],[10],[11],[12],[13],[14]]);assert.deepEqual(c.sourceGroups.flat(),Array.from({length:15},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,5)
 assert.deepEqual(f.strokes[6].map((s:{inkPaths:string[]})=>s.inkPaths.length),[3,2,2,2]);const originalP=f.fullProof.groups.slice(6,10).flatMap((g:{polygons:{x:number;y:number}[][]})=>g.polygons.map(p=>p.map((v,i)=>(i?'L':'M')+(v.x/2)+' '+(v.y/2)).join(' ')+' Z'));assert.deepEqual(f.strokes[6].flatMap((s:{inkPaths:string[]})=>s.inkPaths),originalP)
 assert.equal(old.finite.count,11);assert.equal(old.boundaries.count,6);assert.equal(old.wholeIdle.count,1);assert.equal(n.finite.acceptedCount,24);assert.equal(n.logical7StyleGuardImpact.count,4);assert.equal(n.natural.uniqueApprovedScenes,8);assert.equal(n.wholeDone.count,1);assert.equal(n.wholeDone.logicalStrokes,12);assert.deepEqual(n.finite.bad,[]);assert.deepEqual(n.finite.errors,[])
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.approval.allTime,false);assert.equal(r.approval.pixelCount,false);assert.equal(r.approval.productWholeAutoplay,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal(n.cleanup.ownServers,0);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u840d-hkcs.md').length>0)
 console.log(JSON.stringify({sourcegate:true,full5Unchanged:true,normal12:true,independentP9:true,native7Finite17:true,capsFinite24:true,guardOnly4:true,capsNaturalUnique8:true,whole12:true,registryImported:false}))
})
test('1484 loader preserves independent paths and rejects reflective or changed bundles',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'萍'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const dropped=structuredClone(b);delete dropped[0].outlines[6][0].inkPaths;assert.throws(()=>load(dropped));const p=structuredClone(b);p[0].outlines[6][0].inkPaths[0]+=' ';assert.throws(()=>load(p));const q=structuredClone(b);q[0].outlines[6][0].revealPath+=' ';assert.throws(()=>load(q));const variant=structuredClone(b);variant[0].variant={catalogStrokes:12,playbackStrokes:12,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:unknown):unknown=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert(Object.isFrozen((ENTRY[0].outlines![6][0] as unknown as {inkPaths:readonly string[]}).inkPaths))
})
