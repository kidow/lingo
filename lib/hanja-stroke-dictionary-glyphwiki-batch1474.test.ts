import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import {requiredFixture} from './hanja-stroke-batch-test-types.ts'
import {fixtureKey} from './hanja-stroke-batch-test-types.ts'
import type {BatchTestFixture} from './hanja-stroke-batch-test-types'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1474_STROKES as ENTRY,loadGlyphWikiBatch1474Strokes as load,GLYPHWIKI_BATCH1474_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1474.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u902d.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1474.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u902d-activation-review.json'
test('1474 sourcegate: original 逭12 full5 and finite72 ROOT approval',()=>{
 const r=(json(REVIEW) as typeof import("../docs/hanja-actual-component-profiles-2026-10-22/u902d-activation-review.json")),p=(json(PUB) as typeof import("../public/hanja-strokes/glyphwiki/u902d.json")),b=(json(BUNDLE) as BatchTestFixture<typeof import("../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1474.json")>),f=json(r.sourceFixture.path).u902d,n=json(r.nativeEvidence.path),source=(json('docs/hanja-goal-glyphwiki-batch1035-2026-10-13/sources.json') as typeof import("../docs/hanja-goal-glyphwiki-batch1035-2026-10-13/sources.json"))
 assert.deepEqual(p.engineProof,f.fullProof);assert.deepEqual(p.engineProof,json(r.actualFull5.path))
 assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(p.syntheticFull5,false);assert.equal(p.sourceProofFormat,'actual-full5')
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((a:any[])=>a.map(m=>m.outline).join(' ')))
 assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((s:number,c:any)=>s+c.polygons.length,0)],[12,17,17,17,28])
 assert.deepEqual(p.sourceGroups,f.sourceProposal.groups);assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:17},(_,i)=>i))
 assert.deepEqual(Object.keys(p.sourceRecords),['u902d','u8fb6','u5b98','u5b80-03','u5196-03','u382f'])
 for(const[name,record]of Object.entries(p.sourceRecords)as [string,any][]){
  assert.deepEqual(record,source.records[fixtureKey(source.records,name)]);assert.equal(Object.hasOwn(record,'version'),false)
  for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(Object.hasOwn(p.sourceRecords,row.split(':')[7]))
 }
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].geometrySource,sha(bytes(PUB)));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)))
 assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(fixtureEvidenceBytes(p,h,bytes)),h,p)
 for(const h of r.historicalInputSHA256)assert.equal(sha(execFileSync('git',['show',h.commit+':'+h.path],{cwd:new URL('..',import.meta.url),maxBuffer:4000000})),h.SHA256,h.path)
 assert.deepEqual([n.finiteScopes,n.freshFiniteScopes,n.reusedUnchangedFiniteScopes,n.naturalSnapshots],[72,72,0,6])
 assert.equal(n.whole.acceptedObservations,1);assert.equal(n.server.exitCode,130);assert.equal(n.result,'PASS');assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[])
 assert.equal(n.finiteObserved.residual.automaticPixelCounts,null);assert.equal(n.finiteObserved.residual.visualWhiteNoSolidResidual,true)
 assert.deepEqual(n.sourcePreservation.sourceGuideGap12Source200,[-2,-2]);assert.equal(r.approval.runtimeRegistrationAuthorized,true)
 assert.equal(bytes('public/hanja-strokes/glyphwiki/NOTICE-u902d.md').length>0,true)
 console.log(JSON.stringify({sourcegate:true,finite72:true,natural6Separate:true,whole12Separate:true,actualFull5Unchanged:true,publicClosure6:true,sourceEngineMathReplay:0,registryImported:false}))
})
test('1474 loader rejects malformed, inherited and getter bundles without side effects',()=>{
 const b=(json(BUNDLE) as BatchTestFixture<typeof import("../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1474.json")>);for(const v of[null,{},[],[null],new Array(1)])assert.throws(()=>load(v))
 let reads=0;const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return '逭'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra))
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{injected:true});assert.throws(()=>load(inherited))
 const changed=structuredClone(b);changed[0].outlines[11][1].weight++;assert.throws(()=>load(changed))
 assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[b,b]))
 assert.equal(load(b),load(structuredClone(b)));assert.equal(Object.isFrozen(requiredFixture(load(b)[0].outlines)[11][1]),true)
 console.log(JSON.stringify({loaderInvalidInputs:true,deepFrozen:true,registryImported:false}))
})
test('1474 activation tail: normal 逭 catalog12 exactly once',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts')
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='逭').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'逭',strokes:12}),json(BUNDLE)[0])
 assert.equal(hanjaStrokeData({glyph:'逭',strokes:11}),null);assert.equal(hanjaStrokeData({glyph:'逭',strokes:13}),null)
 assert.equal(hanjaPlaybackVariant({glyph:'逭',strokes:12}),null)
 const registered=new Set(HANJA_STROKES.map(x=>x.glyph)).size,declaredCatalog=5888+90
 assert(registered>=5889);assert.equal(registered,HANJA_STROKES.length);assert(declaredCatalog-registered>=0&&declaredCatalog-registered<=89)
 console.log(JSON.stringify({actualRegistryImport:true,targetMatches:1,catalog12Accepted:true,other11and13Rejected:true,variant:null,registered,remaining:declaredCatalog-registered,build:false}))
})
