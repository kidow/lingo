import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1483_STROKES as ENTRY,loadGlyphWikiBatch1483Strokes as load,GLYPHWIKI_BATCH1483_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1483.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u5767-hkcs.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1483.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u5767-activation-review.json'
test('1483 sourcegate: unchanged full5 and correctly finalized finite21 approval',()=>{
 const r=json(REVIEW),b=json(BUNDLE),c=json(PUB),n=json(r.nativeEvidence.path),f=json(r.sourceFixture.path).hkcs_m5767
 assert.equal(APPROVAL.path,REVIEW);assert.equal(sha(bytes(REVIEW)),APPROVAL.SHA256);assert.deepEqual(load(b),ENTRY)
 for(const [file,hash]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(file)),hash,file)
 for(const item of r.historicalInputSHA256){const body=execFileSync('git',['show',item.commit+':'+item.path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024});assert.equal(sha(body),item.SHA256,item.commit+':'+item.path)}
 assert.deepEqual(c.engineProof,f.fullProof);assert.deepEqual(c.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((row:{outline:string}[])=>row.map(s=>s.outline).join(' ')));assert.equal(sha(JSON.stringify(b[0].paths)),b[0].pathsSha256)
 assert.equal(c.syntheticFull5,false);assert.deepEqual(Object.keys(c.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(c.engineProof.groups.length,9);assert.equal(c.engineProof.trace.flat().length,9);assert.equal(f.strokes.flat().reduce((sum:number,s:{outline:string})=>sum+(s.outline.match(/M/g)||[]).length,0),15)
 assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7],[8]]);assert.deepEqual(c.sourceGroups.flat(),Array.from({length:9},(_,i)=>i));assert.equal(Object.keys(c.sourceRecords).length,3)
 assert.equal(n.freshFinite.PASS,21);assert.deepEqual([n.freshFinite.capFrames,n.freshFinite.bandFrames,n.freshFinite.boundaryFrames],[12,6,3]);assert.deepEqual(n.freshFinite.bad,[]);assert.deepEqual(n.freshFinite.errors,[]);assert.equal(n.freshFinite.residualBoards.count,3);assert.equal(n.freshFinite.residualBoards.pixelZeroClaim,false)
 assert.equal(n.reportingCorrection.initialClaimed21WhenActual17,true);assert.equal(n.reportingCorrection.final21ConfirmedOnlyAfterActualLast4,true);assert.equal(n.reportingCorrection.earlyClaimIsNotApprovalEvidence,true)
 assert.equal(n.naturalSnapshots.PASS,6);assert.deepEqual(n.naturalSnapshots.observations.map((x:{pen:number})=>x.pen),[3,5,7]);assert.equal(n.naturalSnapshots.observations[2].bandMiddleObserved,true);assert.equal(n.whole.pens,8);assert.equal(n.whole.PASS,1);assert.equal(n.whole.allPensVisible,true)
 assert.equal(n.reusedEvidence.originalFrames,24);assert.equal(n.reusedEvidence.staticPairs,8);assert.equal(n.reusedEvidence.newSourceOrMathReplay,0);assert.equal(n.cleanup.exitCode,130);assert.equal(n.cleanup.remainingOwnedServers,0)
 assert.equal(n.approval.runtimeRegistrationAuthorized,true);assert.equal(n.approval.allTimeProof,false);assert.equal(n.approval.pixelCountCertified,false);assert.equal(c.preparationHistory.runtimeApplied,false);assert.equal('variant'in b[0],false);assert(bytes('public/hanja-strokes/glyphwiki/NOTICE-u5767-hkcs.md').length>0)
 console.log(JSON.stringify({sourcegate:true,full5Unchanged:true,sourceClosure3:true,raw9Calls9P15:true,finalFinite21:true,naturalSeparate6:true,whole8:true,reportCorrectionSeparated:true,engine:0,projection:0,registryImported:false}))
})
test('1483 loader: exact normal8, reordered keys and inert descriptors',()=>{
 const b=json(BUNDLE);for(const x of [null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'坧'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited));const symbol=structuredClone(b);Object.defineProperty(symbol[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbol))
 const weight=structuredClone(b);weight[0].outlines[6][1].weight++;assert.throws(()=>load(weight));for(const count of [7,9]){const changed=structuredClone(b);changed[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%8]);assert.throws(()=>load(changed))}
 const variant=structuredClone(b);variant[0].variant={catalogStrokes:8,playbackStrokes:8,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:any):any=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x;assert.equal(load(reverse(b)),load(b));assert.equal(Object.isFrozen(load(b)[0].outlines![6][1]),true);assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact:true,getterReads:reads,wrong7or9Rejected:true,variantRejected:true,keyOrderIndependent:true}))
})
test('1483 activation tail: normal8 exactly once and actual remaining roster',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts'),entry=json(BUNDLE)[0]
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='坧').length,1);assert.equal(HANJA_VARIANT_STROKES.filter(x=>x.glyph==='坧').length,0);assert.deepEqual(hanjaStrokeData({glyph:'坧',strokes:8}),entry);assert.equal(hanjaPlaybackVariant({glyph:'坧',strokes:8}),null)
 assert.equal(hanjaStrokeData({glyph:'坧',strokes:7}),null);assert.equal(hanjaStrokeData({glyph:'坧',strokes:9}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size;assert.equal(registered,5898);assert.equal(5978-registered,80)
 const directory=new URL('../content/hanja/characters/',import.meta.url),characters=readdirSync(directory).filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(new URL(f,directory),'utf8')).characters)
 assert.equal(characters.length,5978);const remainingRoster=characters.filter((c:{glyph:string;strokes:number})=>!hanjaStrokeData(c)).map((c:{id:string;glyph:string;readingGrade:string;strokes:number})=>({id:c.id,glyph:c.glyph,grade:c.readingGrade,strokes:c.strokes}));assert.equal(remainingRoster.length,80)
 console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,normal8:true,variant:false,lookup7and9Rejected:true,registered,remaining:remainingRoster.length,remainingRoster,build:false}))
})
