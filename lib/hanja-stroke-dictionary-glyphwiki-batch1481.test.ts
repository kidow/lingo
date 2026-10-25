import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1481_STROKES as ENTRY,loadGlyphWikiBatch1481Strokes as load,GLYPHWIKI_BATCH1481_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1481.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u83bd-t.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1481.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u83bd-activation-review.json'
test('1481 sourcegate: original 莽 body3 and finite approval remain separate',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),n=json(r.nativeEvidence.path),f=json(r.sourceFixture.path)['u83bd-t']
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(bytes(REVIEW)),APPROVAL.SHA256);assert.equal(sha(bytes(PUB)),b[0].candidateSha256);assert.deepEqual(load(b),ENTRY)
 for(const [file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(file)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.commit+':'+item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.deepEqual(Object.keys(c.engineProof).sort(),['defaults','groups','trace']);assert.equal(c.engineProof.groups.length,11);assert.equal(c.engineProof.trace.flat().length,12);assert.equal(f.strokes.flat().reduce((sum:number,s:{outline:string})=>sum+(s.outline.match(/M/g)||[]).length,0),25)
 assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[7],[8],[9],[10],[4],[5],[6]]);assert.deepEqual(c.sourceGroups.flat().slice().sort((a:number,b:number)=>a-b),Array.from({length:11},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,5)
 assert.equal(n.freshFinite.PASS,39);assert.equal(n.freshFinite.targetFrames,36);assert.equal(n.freshFinite.boundaryFrames,3);assert.deepEqual(n.freshFinite.bad,[]);assert.deepEqual(n.freshFinite.errors,[]);assert.equal(n.freshFinite.sixResidualBoards.pixelZeroClaim,false)
 assert.equal(n.naturalSnapshots.PASS,6);assert.deepEqual(n.naturalSnapshots.pens,[2,6,10]);assert.equal(n.whole.pens,11);assert.equal(n.whole.PASS,1);assert.equal(n.toolWaitAndViewCorrections.productFailure,false);assert.equal(n.toolWaitAndViewCorrections.requiredMidAndEndCompleted,true)
 assert.equal(n.reusedEvidence.originalFrames,33);assert.equal(n.reusedEvidence.staticPairs,11);assert.equal(n.reusedEvidence.newSourceOrMathReplay,0);assert.equal(n.cleanup.exitCode,130);assert.equal(n.cleanup.remainingOwnedServers,0)
 assert.equal(n.approval.runtimeRegistrationAuthorized,true);assert.equal(n.approval.allTimeProof,false);assert.equal(n.approval.pixelCountCertified,false);assert.equal(c.preparationHistory.runtimeApplied,false)
 assert.deepEqual(b[0].variant,{catalogStrokes:12,playbackStrokes:11,form:'사전'});assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u83bd-t.md').length>0)
 console.log(JSON.stringify({sourcegate:true,body3Unchanged:true,sourceClosure5:true,raw11Calls12P25:true,newFinite39:true,naturalSeparate6:true,whole11:true,engine:0,projection:0,registryImported:false}))
})
test('1481 loader: exact dictionary11 variant and inert descriptors',()=>{
 const b=json(BUNDLE);for(const x of [null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'莽'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const weight=structuredClone(b);weight[0].outlines[9][1].weight++;assert.throws(()=>load(weight));for(const count of [10,12]){const changed=structuredClone(b);changed[0].variant.playbackStrokes=count;changed[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%11]);assert.throws(()=>load(changed))}
 const normal=structuredClone(b);delete normal[0].variant;assert.throws(()=>load(normal));const wrongCatalog=structuredClone(b);wrongCatalog[0].variant.catalogStrokes=11;assert.throws(()=>load(wrongCatalog))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines![9][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact:true,getterReads:reads,wrong10or12Rejected:true,normalRejected:true}))
})
test('1481 activation tail: unchanged catalog12 selects dictionary11 exactly once',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts'),entry=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='莽').length,1);assert.equal(HANJA_VARIANT_STROKES.filter(x=>x.glyph==='莽').length,1);assert.deepEqual(hanjaStrokeData({glyph:'莽',strokes:12}),entry)
 assert.equal(hanjaPlaybackVariant({glyph:'莽',strokes:12})?.paths.length,11);for(let strokes=0;strokes<50;strokes++)if(strokes!==12)assert.equal(hanjaPlaybackVariant({glyph:'莽',strokes}),null)
 assert.equal(hanjaStrokeData({glyph:'莽',strokes:11}),null);assert.equal(hanjaStrokeData({glyph:'莽',strokes:13}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;assert.equal(registered,5896);assert.equal(5978-registered,82)
 const directory=new URL('../content/hanja/characters/',import.meta.url),characters=readdirSync(directory).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,directory),'utf8')).characters)
 assert.equal(characters.length,5978);const remainingRoster=characters.filter((c:{glyph:string;strokes:number})=>!hanjaStrokeData(c)).map((c:{id:string;glyph:string;readingGrade:string;strokes:number})=>({id:c.id,glyph:c.glyph,grade:c.readingGrade,strokes:c.strokes}));assert.equal(remainingRoster.length,82)
 console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog12Accepted:true,playback11:true,lookup11and13Rejected:true,registered,remaining:remainingRoster.length,remainingRoster,build:false}))
})
