import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1479_STROKES as ENTRY,loadGlyphWikiBatch1479Strokes as load,GLYPHWIKI_BATCH1479_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1479.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u5ebe-ue0102.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1479.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u5ebe-activation-review.json'
test('1479 sourcegate: original 庾 full5 and accurately separated finite approval',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),n=json(r.nativeEvidence.path),f=json(r.sourceFixture.path).u5ebe_ue0102
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(fixtureEvidenceBytes(REVIEW,APPROVAL.SHA256,bytes)),APPROVAL.SHA256);assert.equal(sha(bytes(PUB)),b[0].candidateSha256);assert.deepEqual(load(b),ENTRY)
 for(const [file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(file,hash,bytes)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.commit+':'+item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')))
 assert.equal(c.syntheticFull5,false);assert.deepEqual(Object.keys(c.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(c.engineProof.groups.length,13);assert.equal(c.engineProof.trace.flat().length,15);assert.equal(f.strokes.flat().reduce((sum:number,s:{outline:string})=>sum+(s.outline.match(/M/g)||[]).length,0),26)
 assert.deepEqual(c.sourceGroups.flat().slice().sort((a:number,b:number)=>a-b),Array.from({length:13},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,4)
 assert.equal(n.freshFinite.PASS,15);assert.equal(n.naturalSnapshots.PASS,4);assert.equal(n.additionalReview.finite.PASS,26);assert.equal(n.additionalReview.natural.PASS,4);assert.equal(n.reusedEvidence.ordinaryTallyWasPASS,false)
 assert.deepEqual(n.additionalReview.finite.bad,[]);assert.deepEqual(n.additionalReview.finite.errors,[]);assert.equal(n.additionalReview.cleanup.exitCode,130);assert.equal(n.additionalReview.firstAliasStartup.finiteFrames,0)
 assert.equal(n.approval.newFiniteSnapshots,41);assert.equal(n.approval.naturalSnapshotsSeparate,8);assert.equal(n.approval.unchangedOrdinaryAttributionClosed,true);assert.equal(n.approval.runtimeRegistrationAuthorized,true);assert.equal(n.approval.allTimeProof,false)
 assert.deepEqual(b[0].variant,{catalogStrokes:11,playbackStrokes:12,form:'사전'});assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u5ebe-ue0102.md').length>0)
 console.log(JSON.stringify({sourcegate:true,full5Unchanged:true,sourceClosure4:true,raw13Calls15P26:true,newFinite41:true,naturalSeparate8:true,ordinary54NotPromoted:true,engine:0,projection:0,registryImported:false}))
})
test('1479 loader: exact dictionary12 variant; wrong counts and accessors rejected',()=>{
 const b=json(BUNDLE);for(const x of [null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'庾'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const weight=structuredClone(b);weight[0].outlines[10][1].weight++;assert.throws(()=>load(weight));for(const count of [11,13]){const changed=structuredClone(b);changed[0].variant.playbackStrokes=count;changed[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%12]);assert.throws(()=>load(changed))}
 const normal=structuredClone(b);delete normal[0].variant;assert.throws(()=>load(normal));const wrongCatalog=structuredClone(b);wrongCatalog[0].variant.catalogStrokes=12;assert.throws(()=>load(wrongCatalog))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines![10][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact:true,getterReads:reads,wrong11or13Rejected:true,normalRejected:true}))
})
test('1479 activation tail: unchanged catalog11 selects dictionary12 exactly once',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts'),entry=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='庾').length,1);assert.equal(HANJA_VARIANT_STROKES.filter(x=>x.glyph==='庾').length,1);assert.deepEqual(hanjaStrokeData({glyph:'庾',strokes:11}),entry)
 assert.equal(hanjaPlaybackVariant({glyph:'庾',strokes:11})?.paths.length,12);for(let strokes=0;strokes<50;strokes++)if(strokes!==11)assert.equal(hanjaPlaybackVariant({glyph:'庾',strokes}),null)
 assert.equal(hanjaStrokeData({glyph:'庾',strokes:12}),null);assert.equal(hanjaStrokeData({glyph:'庾',strokes:13}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;const historicalRegistration={applied:5894,remaining:84};assert.equal(historicalRegistration.applied+historicalRegistration.remaining,5978);assert.equal(registered,HANJA_STROKES.length);assert(registered>=historicalRegistration.applied);assert(5978-registered<=historicalRegistration.remaining)
 const directory=new URL('../content/hanja/characters/',import.meta.url),characters=readdirSync(directory).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,directory),'utf8')).characters)
 assert.equal(characters.length,5978);const remainingRoster=characters.filter((c:{glyph:string;strokes:number})=>!hanjaStrokeData(c)).map((c:{id:string;glyph:string;readingGrade:string;strokes:number})=>({id:c.id,glyph:c.glyph,grade:c.readingGrade,strokes:c.strokes}));assert.equal(remainingRoster.length,characters.length-registered);assert(remainingRoster.length<=historicalRegistration.remaining)
 console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog11Accepted:true,playback12:true,lookup12and13Rejected:true,registered,remaining:remainingRoster.length,remainingRoster,build:false}))
})
