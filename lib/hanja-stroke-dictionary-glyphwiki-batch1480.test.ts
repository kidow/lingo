import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1480_STROKES as ENTRY,loadGlyphWikiBatch1480Strokes as load,GLYPHWIKI_BATCH1480_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1480.ts'

const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url))
const json=(p:string)=>JSON.parse(bytes(p).toString())
const sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex')
const PUB='public/hanja-strokes/glyphwiki/u61b8-hkcs.json'
const BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1480.json'
const REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u61b8-activation-review.json'

test('1480 sourcegate: authored 憸 full5 retains metadata3 and ROOT finite66 approval',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).hkcs_m61b8,n=json(r.nativeEvidence.path)
 assert.deepEqual(p.engineProof,f.fullProof)
 assert.deepEqual(p.engineProof,json(r.actualFull5.path))
 assert.deepEqual(Object.keys(p.engineProof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(p.syntheticFull5,false)
 assert.deepEqual(p.sourceIdentity,f.identity)
 assert.deepEqual(p.outlines,f.strokes)
 assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((a:{outline:string}[])=>a.map(m=>m.outline).join(' ')))
 assert.equal(sha(JSON.stringify(f.strokes)),r.sourceFixture.geometrySHA256)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.fullProof.groups.length,f.fullProof.trace.flat().length,f.fullProof.trace.flat().reduce((a:number,c:{polygons:unknown[]})=>a+c.polygons.length,0)],[16,18,21,18,33])
 assert.deepEqual(p.sourceGroups,f.sourceProposal.groups)
 assert.deepEqual(p.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:21},(_,i)=>i).filter(i=>![6,11,16].includes(i)))
 for(const i of [6,11,16]){assert.deepEqual(p.engineProof.groups[i].raw,[0,...Array(10).fill(null)]);assert.deepEqual(p.engineProof.groups[i].polygons,[]);assert.deepEqual(p.engineProof.trace[i],[])}
 const source=json('docs/hanja-source-alternative-u61b8-hkcs-2026-10-25/sources.json')
 assert.deepEqual(p.sourceRecords,source.records)
 assert.deepEqual(Object.keys(p.sourceRecords),r.sourceClosureRecords)
 assert.equal(Number(p.sourceRecords.hkcs_m61b8.version),2)
 assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)))
 assert.equal(n.finite.totalObserved,66)
 assert.equal(n.finite.totalApproved,66)
 assert.equal(n.finite.targets.length,10)
 assert.equal(n.finite.boundaries.length,2)
 assert.equal(n.natural.snapshots,8)
 assert.equal(n.actualWhole.logicalStrokes,16)
 assert.equal(n.actualWhole.approved,1)
 assert.deepEqual(n.finite.allStatusBad,[])
 assert.deepEqual(n.finite.allStatusErrors,[])
 assert.equal(n.finite.residualChecks.numericPixelZeroClaimed,false)
 assert.equal(n.approval.actualAppUI,false)
 assert.equal(n.approval.allTimeRaster,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true)
 assert.equal(r.normalCatalogStrokes,16)
 assert.equal(r.individualVariantRegistered,false)
 assert.equal(f.sourceProposal.nativeApproval,false)
 assert.equal(f.sourceProposal.runtimeApplied,false)
 assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 for(const [path,expected] of Object.entries(r.inputSHA256) as [string,string][])assert.equal(sha(fixtureEvidenceBytes(path,expected,bytes)),expected,path)
 for(const [path,expected] of Object.entries(r.historicalInputSHA256) as [string,string][]){
  const historical=execFileSync('rtk',['proxy','git','show','f37593185:'+path],{cwd:new URL('..',import.meta.url),maxBuffer:8*1024*1024})
  assert.equal(sha(historical),expected,path)
 }
 assert.deepEqual(ENTRY,b)
 console.log(JSON.stringify({sourcegate:true,metadata3Preserved:true,finite66:true,natural8Separate:true,actualWhole16:true,sourceEngineReplayed:false}))
})

test('1480 loader: order-independent exact16 bundle rejects getters and unreviewed fields',()=>{
 const b=json(BUNDLE)
 for(const x of [null,{},[],[null],new Array(1)])assert.throws(()=>load(x))
 let reads=0
 const getter=structuredClone(b);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'憸'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const inherited=structuredClone(b);Object.setPrototypeOf(inherited[0],{extra:true});assert.throws(()=>load(inherited))
 const extra=structuredClone(b);Object.defineProperty(extra[0],Symbol('extra'),{value:1});assert.throws(()=>load(extra))
 const weight=structuredClone(b);weight[0].outlines[0][0].weight++;assert.throws(()=>load(weight))
 for(const count of [15,17]){const wrong=structuredClone(b);wrong[0].paths=Array.from({length:count},(_,i)=>b[0].paths[i%b[0].paths.length]);assert.throws(()=>load(wrong))}
 const variant=structuredClone(b);variant[0].variant={catalogStrokes:16,playbackStrokes:16,form:'사전'};assert.throws(()=>load(variant))
 const reverse=(x:unknown):unknown=>Array.isArray(x)?x.map(reverse):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).reverse().map(([k,v])=>[k,reverse(v)])):x
 assert.equal(load(reverse(b)),load(b))
 assert.equal(Object.isFrozen(load(b)[0].outlines![0][0]),true)
 assert.throws(()=>Reflect.apply(load,null,[b,b]))
 console.log(JSON.stringify({loaderExact16:true,getterReads:reads,wrong15or17Rejected:true}))
})
