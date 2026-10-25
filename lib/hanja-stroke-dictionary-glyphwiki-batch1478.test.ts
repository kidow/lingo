import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1478_STROKES as ENTRY,loadGlyphWikiBatch1478Strokes as load,GLYPHWIKI_BATCH1478_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1478.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),PUB='public/hanja-strokes/glyphwiki/u846f-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1478.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u846f-activation-review.json'
test('1478 sourcegate: authored 葯13 full5 unchanged and finite78 ROOT approval',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path)['hkcs_m846f'],n=json(r.nativeEvidence.path),source=json('docs/hanja-source-alternative-u846f-hkcs-2026-10-25/sources.json')
 assert.deepEqual(p.engineProof,f.fullProof);assert.deepEqual(p.engineProof,json(r.actualFull5.path));assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(p.syntheticFull5,false)
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((a:any[])=>a.map(m=>m.outline).join(' ')));assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((s:number,c:any)=>s+c.polygons.length,0)],[13,17,16,17,37]);assert.deepEqual(p.sourceGroups,f.sourceProposal.groups);assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:16},(_,i)=>i))
 assert.deepEqual(Object.keys(p.sourceRecords),r.sourceClosureRecords);assert.equal(p.sourceRecords['hkcs_m846f'].version,2);for(const[name,record]of Object.entries(p.sourceRecords)as[string,any][]){assert.deepEqual(record,source.records[name]);for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(Object.hasOwn(p.sourceRecords,row.split(':')[7]))}
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].geometrySource,sha(bytes(PUB)));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(p)),h,p);for(const h of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',h.commit+':'+h.path],{cwd:new URL('..',import.meta.url),maxBuffer:4000000})),h.SHA256,h.path)
 assert.deepEqual([n.finiteScopes,n.naturalSnapshots,n.whole.acceptedObservations],[78,6,1]);assert.equal(n.result,'PASS');assert.equal(n.server.exitCode,130);assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.equal(n.finiteObserved.residual.automaticPixelCounts,null);assert.equal(n.finiteObserved.residual.visuallyWhite,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u846f-hkcs.md').length>0);assert.equal(p.review.originalDirectionDistinctFrames,39);assert.equal(p.review.staticPens,13)
 console.log(JSON.stringify({sourcegate:true,raw16Calls17P37:true,finite78:true,natural6Separate:true,sourceEngineMathReplay:0,registryImported:false}))
})
test('1478 loader field-order insensitive, exact13, getter unread',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x));let reads=0;const g=structuredClone(b);Object.defineProperty(g[0],'glyph',{enumerable:true,get(){reads++;return'葯'}});assert.throws(()=>load(g));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra));const w=structuredClone(b);w[0].outlines[4][1].weight++;assert.throws(()=>load(w))
 for(const count of[12,14]){const m=structuredClone(b);m[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%b[0].paths.length]);assert.throws(()=>load(m))}const variant=structuredClone(b);variant[0].variant={catalogStrokes:13,playbackStrokes:13,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines![4][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]));console.log(JSON.stringify({loaderExact13:true,getterReads:reads,wrong12or14Rejected:true}))
})
test('1478 activation tail: normal 葯 catalog13 once',async()=>{
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts');const b=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='葯').length,1);assert.deepEqual(hanjaStrokeData({glyph:'葯',strokes:13}),b);assert.equal(hanjaPlaybackVariant({glyph:'葯',strokes:13}),null);assert.equal(hanjaStrokeData({glyph:'葯',strokes:12}),null);assert.equal(hanjaStrokeData({glyph:'葯',strokes:14}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;assert.equal(registered,5893);assert.equal(5978-registered,85);console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog13Accepted:true,lookup12and14Rejected:true,variant:null,registered,remaining:5978-registered,build:false}))
 const folder=new URL('../content/hanja/characters/',import.meta.url),catalog=readdirSync(folder).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,folder),'utf8')).characters);assert.equal(catalog.length,5978)
 const remaining=catalog.filter((c:{glyph:string;strokes:number})=>!hanjaStrokeData(c));assert.equal(remaining.length,85);console.log(JSON.stringify({remainingRoster:remaining.map((c:{id:string;glyph:string;readingGrade:string;strokes:number})=>[c.id,c.glyph,c.readingGrade,c.strokes])}))
})

