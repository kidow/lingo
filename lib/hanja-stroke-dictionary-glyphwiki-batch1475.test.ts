import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1475_STROKES as ENTRY,loadGlyphWikiBatch1475Strokes as load,GLYPHWIKI_BATCH1475_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1475.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),PUB='public/hanja-strokes/glyphwiki/u596b-k.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1475.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u596b-activation-review.json'
test('1475 sourcegate: original 奫 full5 closure7 and finite63 native approval',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path)['u596b-k'],n=json(r.nativeEvidence.path),source=json('docs/hanja-goal-glyphwiki-batch794-2026-10-13/sources.json')
 assert.deepEqual(p.engineProof,f.fullProof);assert.deepEqual(p.engineProof,json(r.actualFull5.path));assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(p.syntheticFull5,false)
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((a:any[])=>a.map(m=>m.outline).join(' ')))
 assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256);assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((s:number,c:any)=>s+c.polygons.length,0)],[15,19,18,19,32])
 assert.deepEqual(p.sourceGroups,f.sourceGroups);assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:18},(_,i)=>i));assert.deepEqual(Object.keys(p.sourceRecords),["u596b-k","u596b","u5927-03","u6df5","u6c35-01","u23d92-jv","cdp-89cd"])
 for(const[name,record]of Object.entries(p.sourceRecords)as[string,any][]){assert.deepEqual(record,source.records[name]);assert.equal(Object.hasOwn(record,'version'),false);for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(Object.hasOwn(p.sourceRecords,row.split(':')[7]))}
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].geometrySource,sha(bytes(PUB)));assert.equal(b[0].candidateSha256,sha(bytes(PUB)));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(p)),h,p);for(const h of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',h.commit+':'+h.path],{cwd:new URL('..',import.meta.url),maxBuffer:4000000})),h.SHA256,h.path)
 assert.deepEqual([n.finiteScopes,n.freshFiniteScopes,n.reusedUnchangedFiniteScopes,n.naturalSnapshots],[63,63,0,6]);assert.equal(n.result,'PASS');assert.equal(n.server.exitCode,130);assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.equal(n.finiteObserved.residual.automaticPixelCounts,null);assert.equal(n.finiteObserved.residual.visualWhiteNoSolidResidual,true)
 assert.deepEqual(b[0].variant,{catalogStrokes:14,playbackStrokes:15,form:'사전'});assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u596b-k.md').length>0)
 console.log(JSON.stringify({sourcegate:true,actualFull5Unchanged:true,closure7:true,finite63:true,natural6Separate:true,sourceEngineMathReplay:0,registryImported:false}))
})
test('1475 loader: exact single variant, order-insensitive keys and getter rejection',()=>{
 const b=json(BUNDLE);for(const x of[null,{},[],[null],new Array(1)])assert.throws(()=>load(x));let reads=0;const g=structuredClone(b);Object.defineProperty(g[0],'glyph',{enumerable:true,get(){reads++;return'奫'}});assert.throws(()=>load(g));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra));const weight=structuredClone(b);weight[0].outlines[6][1].weight++;assert.throws(()=>load(weight))
 for(const count of[14,16]){const changed=structuredClone(b);changed[0].variant.playbackStrokes=count;changed[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%b[0].paths.length]);assert.throws(()=>load(changed))}const normal=structuredClone(b);delete normal[0].variant;assert.throws(()=>load(normal))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines[6][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact:true,keyOrderInsensitive:true,getterReads:reads,normalAndWrong14or16PlaybackRejected:true}))
})
test('1475 activation tail: 奫 catalog14 dictionary15 exactly once',async()=>{
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts');const b=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='奫').length,1);assert.equal(HANJA_VARIANT_STROKES.filter(x=>x.glyph==='奫').length,1);assert.deepEqual(hanjaStrokeData({glyph:'奫',strokes:14}),b);assert.equal(hanjaPlaybackVariant({glyph:'奫',strokes:14})?.paths.length,15)
 for(let strokes=0;strokes<40;strokes++)if(strokes!==14)assert.equal(hanjaPlaybackVariant({glyph:'奫',strokes}),null);assert.equal(hanjaStrokeData({glyph:'奫',strokes:15}),null);assert.equal(hanjaStrokeData({glyph:'奫',strokes:16}),null);assert.deepEqual(HANJA_STROKES.find(x=>x.glyph==='奫')?.variant,{catalogStrokes:14,playbackStrokes:15,form:'사전'})
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;assert.equal(registered,5890);assert.equal(5978-registered,88);console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,exactVariantAllowedOnce:true,catalog14Accepted:true,playback15:true,lookup15and16Rejected:true,registered,remaining:5978-registered,build:false}))
})
