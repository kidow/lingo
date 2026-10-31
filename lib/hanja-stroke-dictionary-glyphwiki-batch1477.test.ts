import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1477_STROKES as ENTRY,loadGlyphWikiBatch1477Strokes as load,GLYPHWIKI_BATCH1477_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1477.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),PUB='public/hanja-strokes/glyphwiki/u85ff-koseki-368300.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1477.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u85ff-activation-review.json'
test('1477 sourcegate: authored 藿20 full5 unchanged and finite30 ROOT approval',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path)['koseki-368300'],n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u85ff-koseki-368300-2026-10-25/sources.json')
 assert.deepEqual(p.engineProof,f.fullProof);assert.deepEqual(p.engineProof,json(r.actualFull5.path));assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(p.syntheticFull5,false)
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((a:any[])=>a.map(m=>m.outline).join(' ')));assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((s:number,c:any)=>s+c.polygons.length,0)],[20,21,21,21,37]);assert.deepEqual(p.sourceGroups,f.sourceGroups);assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:21},(_,i)=>i))
 assert.deepEqual(Object.keys(p.sourceRecords),r.sourceClosureRecords);assert.equal(p.sourceRecords['koseki-368300'].version,'9');for(const[name,record]of Object.entries(p.sourceRecords)as[string,any][]){assert.deepEqual(record,source.records[name]);for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(Object.hasOwn(p.sourceRecords,row.split(':')[7]))}
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].geometrySource,sha(bytes(PUB)));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(p,h,bytes)),h,p);for(const h of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',h.commit+':'+h.path],{cwd:new URL('..',import.meta.url),maxBuffer:4000000})),h.SHA256,h.path)
 assert.deepEqual([n.finiteScopes,n.naturalSnapshots,n.whole.acceptedObservations],[30,6,1]);assert.equal(n.result,'PASS');assert.equal(n.server.exitCode,130);assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.equal(n.finiteObserved.residual.automaticPixelCounts,null);assert.equal(n.finiteObserved.residual.visuallyWhite,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u85ff-koseki-368300.md').length>0);assert.equal(p.review.originalDirectionDistinctFrames,60);assert.equal(p.review.staticPens,20)
 console.log(JSON.stringify({sourcegate:true,raw21Calls21P37:true,finite30:true,natural6Separate:true,sourceEngineMathReplay:0,registryImported:false}))
})
test('1477 loader field-order insensitive, exact20, getter unread',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x));let reads=0;const g=structuredClone(b);Object.defineProperty(g[0],'glyph',{enumerable:true,get(){reads++;return'藿'}});assert.throws(()=>load(g));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra));const w=structuredClone(b);w[0].outlines[6][1].weight++;assert.throws(()=>load(w))
 for(const count of[19,21]){const m=structuredClone(b);m[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%b[0].paths.length]);assert.throws(()=>load(m))}const variant=structuredClone(b);variant[0].variant={catalogStrokes:20,playbackStrokes:20,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines![6][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]));console.log(JSON.stringify({loaderExact20:true,getterReads:reads,wrong19or21Rejected:true}))
})
test('1477 activation tail: normal 藿 catalog20 once',async()=>{
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts');const b=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='藿').length,1);assert.deepEqual(hanjaStrokeData({glyph:'藿',strokes:20}),b);assert.equal(hanjaPlaybackVariant({glyph:'藿',strokes:20}),null);assert.equal(hanjaStrokeData({glyph:'藿',strokes:19}),null);assert.equal(hanjaStrokeData({glyph:'藿',strokes:21}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;const historicalRegistration={applied:5892,remaining:86};assert.equal(historicalRegistration.applied+historicalRegistration.remaining,5978);assert.equal(registered,HANJA_STROKES.length);assert(registered>=historicalRegistration.applied);assert(5978-registered<=historicalRegistration.remaining);console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog20Accepted:true,lookup19and21Rejected:true,variant:null,registered,remaining:5978-registered,build:false}))
})
