import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1417_STROKES as ENTRY,loadGlyphWikiBatch1417Strokes as load,GLYPHWIKI_BATCH1417_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1417_NATIVE_APPROVAL,GLYPHWIKI_BATCH1417_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1417.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const PUB='public/hanja-strokes/glyphwiki/u7bd2.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1417.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u7bd2-activation-review.json'

test('1417 sourcegate: 篒 original35P native55 official13threeframes static15',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).u7bd2K,full=json(r.actualFull5.path),n=json(r.nativeEvidence.path)
 assert.equal(sha(JSON.stringify(f.strokes)),'20e83c465365d9bc4a9ab89bae868a60426edd7033fc4d652d50e870fa1e17cf')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.deepEqual(p.sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[12],[13],[9,14],[15],[16]])
 assert.equal(full.groups.length,17);assert.equal(full.trace.flat().length,17);assert.equal(full.groups.reduce((s:number,g:any)=>s+g.polygons.length,0),35)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((s:number,m:any)=>s+(m.outline.match(/M/g)?.length??0),0)],[15,17,35])
 assert.equal(Object.keys(p.sourceRecords).length,4);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((s:any[])=>s.map(m=>m.outline).join(' ')));assert.deepEqual(b[0].sourceStrokeIndices,p.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 assert.equal(b[0].sourceReference.orderReviewSha256,sha(bytes(r.staticWholeEvidence.path)));assert.equal(b[0].sourceReference.directionReviewSha256,sha(bytes(r.officialDirectionEvidence.path)))
 assert.equal(n.distinctScopes,55);assert.equal(n.result,'PASS');assert.equal(n.finiteScopes,49);assert.equal(n.naturalScopes,6);assert.equal(n.nativeApproval,true)
 assert.deepEqual(n.finalObservation.bad,[]);assert.deepEqual(n.finalObservation.errors,[]);assert.equal(n.source.originalPGuideWidthWeightUnchanged,true);assert.equal(n.finalObservation.originalRisingRightFullyConnected,true)
 assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.pid,88491)
 assert.equal(r.officialDirectionEvidence.freshExistingFrames,3);assert.equal(r.staticWholeEvidence.freshExistingScreens,15)
 for(const [path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of ['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(GLYPHWIKI_BATCH1417_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1417_RUNTIME_APPLIED,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.actualProductAppUI,false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(b)),ENTRY);let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'篒'}});assert.throws(()=>load(v));assert.equal(reads,0)
 const altered=clone(b);altered[0].outlines[13][0].weight++;assert.throws(()=>load(altered));assert(Object.isFrozen(ENTRY[0].outlines))
 console.log(JSON.stringify({sourcegate:true,distinctNativePASS:55,pens:15,masks:17,originalP:35,official13Frames3:true,static15:true,actualRegistryImported:false,engine:0,projection:0,SSR:0,build:false}))
})
test('1417 activation tail: resolves 篒 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString();assert.equal(reg.split("import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1417_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1417.ts'\n").length,2);assert.equal(reg.split('  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1417_STROKES,\n').length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5832);assert.equal(5978-unique.size,146);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='篒').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'篒',strokes:15}),b[0]);assert.equal(hanjaStrokeData({glyph:'篒',strokes:14}),null);assert.equal(json(PUB).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,distinctNativePASS:55,officialFrames:3,staticScreens:15,engine:0,projection:0,SSR:0,build:false}))
})
