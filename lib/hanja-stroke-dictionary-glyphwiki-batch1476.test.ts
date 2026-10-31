import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import {fixtureProperty} from './hanja-stroke-batch-test-types.ts'
import {requiredFixture} from './hanja-stroke-batch-test-types.ts'
import {fixtureKey} from './hanja-stroke-batch-test-types.ts'
import type {BatchTestFixture} from './hanja-stroke-batch-test-types'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1476_STROKES as ENTRY,loadGlyphWikiBatch1476Strokes as load,GLYPHWIKI_BATCH1476_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1476.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),PUB='public/hanja-strokes/glyphwiki/u7228-ue0100.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1476.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u7228-activation-review.json'
test('1476 sourcegate: 爨 original body3 preserved; fresh114 reuse51 natural8',()=>{
 const r=(json(REVIEW) as typeof import("../docs/hanja-actual-component-profiles-2026-10-22/u7228-activation-review.json")),p=(json(PUB) as typeof import("../public/hanja-strokes/glyphwiki/u7228-ue0100.json")),b=(json(BUNDLE) as BatchTestFixture<typeof import("../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1476.json")>),f=json(r.sourceFixture.path).u7228_ue0100,n=json(r.nativeEvidence.path),source=(json('docs/hanja-goal-glyphwiki-batch906-2026-10-13/sources.json') as typeof import("../docs/hanja-goal-glyphwiki-batch906-2026-10-13/sources.json"))
 assert.deepEqual(p.engineProof,f.fullProof);assert.deepEqual(p.engineProof,json(r.actualBody3.path));assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','groups','trace']);assert.equal(p.syntheticFull5,false);assert.equal(p.sourcePreservation.engineHeaderAdded,false)
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((a:any[])=>a.map(m=>m.outline).join(' ')));assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((s:number,c:any)=>s+c.polygons.length,0)],[30,34,34,34,60])
 assert.deepEqual(p.sourceGroups,f.sourceGroups);assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:34},(_,i)=>i));assert.deepEqual(Object.keys(p.sourceRecords),r.sourceClosureRecords)
 for(const[name,record]of Object.entries(p.sourceRecords)as[string,any][]){assert.deepEqual(record,source.records[fixtureKey(source.records,name)]);for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(Object.hasOwn(p.sourceRecords,row.split(':')[7]))}
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].geometrySource,sha(bytes(PUB)));assert.equal(b[0].candidateSha256,sha(bytes(PUB)));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(p,h,bytes)),h,p);for(const h of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',h.commit+':'+h.path],{cwd:new URL('..',import.meta.url),maxBuffer:4000000})),h.SHA256,h.path)
 assert.deepEqual([n.finiteScopes,n.freshFiniteScopes,n.reusedUnchangedFiniteScopes,n.naturalSnapshots],[165,114,51,8]);assert.equal(n.result,'PASS');assert.equal(n.server.exitCode,130);assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.equal(n.observed.residual.automaticPixelCounts,null);assert.equal(n.observed.residual.visualWhiteNoSolidResidual,true)
 assert.deepEqual(b[0].variant,{catalogStrokes:29,playbackStrokes:30,form:'사전'});assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u7228-ue0100.md').length>0)
 console.log(JSON.stringify({sourcegate:true,body3Unchanged:true,syntheticFull5:false,raw34Calls34P60:true,fresh114:true,reuse51:true,natural8Separate:true,engine:0,projection:0,registryImported:false}))
})
test('1476 loader: exact variant; wrong normal29 or31 rejected; getter unread',()=>{
 const b=(json(BUNDLE) as BatchTestFixture<typeof import("../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1476.json")>);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x));let reads=0;const g=structuredClone(b);Object.defineProperty(g[0],'glyph',{enumerable:true,get(){reads++;return'爨'}});assert.throws(()=>load(g));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra));const weight=structuredClone(b);weight[0].outlines[5][1].weight++;assert.throws(()=>load(weight))
 for(const count of[29,31]){const changed=structuredClone(b);changed[0].variant.playbackStrokes=count;changed[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%b[0].paths.length]);assert.throws(()=>load(changed))}const normal=structuredClone(b);Reflect.deleteProperty(normal[0],'variant');assert.throws(()=>load(normal))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(requiredFixture(load(b)[0].outlines)[5][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact:true,getterReads:reads,wrong29or31Rejected:true}))
})
test('1476 activation tail: catalog29 playback30 exactly once',async()=>{
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts');const b=(json(BUNDLE) as BatchTestFixture<typeof import("../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1476.json")>)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='爨').length,1);assert.equal(HANJA_VARIANT_STROKES.filter(x=>x.glyph==='爨').length,1);assert.deepEqual(hanjaStrokeData({glyph:'爨',strokes:29}),b);assert.equal(hanjaPlaybackVariant({glyph:'爨',strokes:29})?.paths.length,30)
 for(let strokes=0;strokes<50;strokes++)if(strokes!==29)assert.equal(hanjaPlaybackVariant({glyph:'爨',strokes}),null);assert.equal(hanjaStrokeData({glyph:'爨',strokes:30}),null);assert.equal(hanjaStrokeData({glyph:'爨',strokes:31}),null);assert.deepEqual(fixtureProperty(requiredFixture(HANJA_STROKES.find(x=>x.glyph==='爨')),'variant'),{catalogStrokes:29,playbackStrokes:30,form:'사전'})
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;assert(registered>=5891);assert.equal(registered,HANJA_STROKES.length);assert(5978-registered>=0&&5978-registered<=87);console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog29Accepted:true,playback30:true,lookup30and31Rejected:true,registered,remaining:5978-registered,build:false}))
})
