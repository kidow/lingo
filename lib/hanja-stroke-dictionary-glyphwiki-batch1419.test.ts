import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1419_STROKES as ENTRY,loadGlyphWikiBatch1419Strokes as load,GLYPHWIKI_BATCH1419_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1419_NATIVE_APPROVAL,GLYPHWIKI_BATCH1419_RUNTIME_APPLIED}from'./hanja-stroke-dictionary-glyphwiki-batch1419.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const PUB='public/hanja-strokes/glyphwiki/u6fae.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1419.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u6fae-activation-review.json'
test('1419 sourcegate: 澮 original31P native50 actual8board residuals',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).u6faeK,full=json(r.actualFull5.path),n=json(r.nativeEvidence.path)
 assert.equal(sha(JSON.stringify(f.strokes)),'905aa90391e5be8784fb3a741c020a701d26fa258f6a46cf96d1bfcb32f84ae1')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.deepEqual(p.sourceGroups,[[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15,16],[17],[18]])
 assert.equal(full.groups.length,19);assert.equal(full.trace.flat().length,19);assert.equal(full.groups.reduce((a:number,g:any)=>a+g.polygons.length,0),31)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((a:number,m:any)=>a+(m.outline.match(/M/g)?.length??0),0)],[16,19,31])
 assert.equal(Object.keys(p.sourceRecords).length,7);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((s:any[])=>s.map(m=>m.outline).join(' ')));assert.deepEqual(b[0].sourceStrokeIndices,p.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 assert.equal(b[0].sourceReference.orderReviewSha256,sha(bytes(r.staticWholeEvidence.path)));assert.equal(b[0].sourceReference.directionReviewSha256,sha(bytes(r.officialDirectionEvidence.path)))
 assert.equal(n.distinctScopes,50);assert.equal(n.result,'PASS');assert.equal(n.finiteScopes,44);assert.equal(n.naturalScopes,6);assert.equal(n.nativeApproval,true);assert.equal(n.freshScopes,50)
 assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.deepEqual(n.finalObservation.bad,[]);assert.deepEqual(n.finalObservation.errors,[])
 assert.equal(n.source.originalPGuideWidthWeightClockUnchanged,true);assert.equal(n.finalObservation.originalComplete,true);assert.equal(n.coverage.allCaps8ActualBoardFullyVisible,true);assert.equal(n.coverage.allCaps8ResidualWhite,true);assert.equal(n.sourceContactScope.allPositivePrefixClaim,false);assert.equal(n.allTimeProof,false)
 assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.pid,17211);assert.equal(n.server.CJS,132)
 assert.equal(r.officialDirectionEvidence.freshExistingFrames,3);assert.deepEqual(r.officialDirectionEvidence.strokes,[3]);assert.equal(r.staticWholeEvidence.freshExistingScreens,16)
 for(const[path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(GLYPHWIKI_BATCH1419_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1419_RUNTIME_APPLIED,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.actualProductAppUI,false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(b)),ENTRY);let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'澮'}});assert.throws(()=>load(v));assert.equal(reads,0)
 const changed=clone(b);changed[0].outlines[0][0].weight++;assert.throws(()=>load(changed));assert(Object.isFrozen(ENTRY[0].outlines))
 console.log(JSON.stringify({sourcegate:true,distinctNativePASS:50,pens:16,masks:19,originalP:31,actualBoardCoverage8:true,officialWater3Frames3:true,static16:true,actualRegistryImported:false,engine:0,projection:0,SSR:0,build:false}))
})
test('1419 activation tail: resolves 澮 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString();assert.equal(reg.split("import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1419_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1419.ts'\n").length,2);assert.equal(reg.split('  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1419_STROKES,\n').length,2)
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5834);assert.equal(5978-unique.size,144);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='澮').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'澮',strokes:16}),b[0]);assert.equal(hanjaStrokeData({glyph:'澮',strokes:15}),null);assert.equal(json(PUB).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,distinctNativePASS:50,officialFrames:3,staticScreens:16,engine:0,projection:0,SSR:0,build:false}))
})
