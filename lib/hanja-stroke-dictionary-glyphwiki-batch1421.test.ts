import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1421_STROKES as ENTRY,loadGlyphWikiBatch1421Strokes as load,GLYPHWIKI_BATCH1421_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1421_NATIVE_APPROVAL,GLYPHWIKI_BATCH1421_RUNTIME_APPLIED}from'./hanja-stroke-dictionary-glyphwiki-batch1421.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const PUB='public/hanja-strokes/glyphwiki/u7d7f.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1421.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u7d7f-activation-review.json'
test('1421 sourcegate: 絿 original38P native79 actual10board residuals and Y-prefix',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).u7d7fK,full=json(r.actualFull5.path),n=json(r.nativeEvidence.path)
 assert.equal(sha(JSON.stringify(f.strokes)),'dd4b5fdf0e32df563cf23cd3688c1e59cf9d7ea0b5ef2b9438a1f6c3154b5ba5')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.deepEqual(p.sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[13],[8],[9],[10],[11],[12],[14]])
 assert.equal(full.groups.length,15);assert.equal(full.trace.flat().length,16);assert.equal(full.groups.reduce((a:number,g:any)=>a+g.polygons.length,0),38)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((a:number,m:any)=>a+(m.outline.match(/M/g)?.length??0),0)],[13,16,38])
 assert.equal(Object.keys(p.sourceRecords).length,4);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((s:any[])=>s.map(m=>m.outline).join(' ')));assert.deepEqual(b[0].sourceStrokeIndices,p.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 assert.equal(b[0].sourceReference.orderReviewSha256,sha(bytes(r.staticWholeEvidence.path)));assert.equal(b[0].sourceReference.directionReviewSha256,sha(bytes(r.officialDirectionEvidence.path)))
 assert.equal(n.distinctScopes,79);assert.equal(n.result,'PASS');assert.equal(n.finiteScopes,73);assert.equal(n.naturalScopes,6);assert.equal(n.nativeApproval,true);assert.equal(n.freshScopes,79)
 assert.deepEqual(n.bad,[]);assert.deepEqual(n.errors,[]);assert.deepEqual(n.finalObservation.bad,[]);assert.deepEqual(n.finalObservation.errors,[])
 assert.equal(n.source.originalPGuideWidthWeightUnchanged,true);assert.equal(n.finalObservation.originalComplete,true);assert.equal(n.coverage.allCaps10ActualBoardFullyVisible,true);assert.equal(n.coverage.allCaps10ResidualWhite,true);assert.equal(n.allTimeProof,false)
 assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.pid,41482);assert.equal(n.server.CJS,137)
 assert.equal(r.officialDirectionEvidence.freshExistingFrames,9);assert.deepEqual(r.officialDirectionEvidence.strokes,[1,2,8]);assert.equal(r.staticWholeEvidence.freshExistingScreens,13)
 for(const[path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(GLYPHWIKI_BATCH1421_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1421_RUNTIME_APPLIED,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.actualProductAppUI,false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(b)),ENTRY);let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'絿'}});assert.throws(()=>load(v));assert.equal(reads,0)
 const changed=clone(b);changed[0].outlines[0][0].weight++;assert.throws(()=>load(changed));assert(Object.isFrozen(ENTRY[0].outlines))
 console.log(JSON.stringify({sourcegate:true,distinctNativePASS:79,pens:13,masks:16,originalP:38,actualBoardCoverage10:true,officialFrames9:true,static13:true,actualRegistryImported:false,engine:0,projection:0,SSR:0,build:false}))
})
test('1421 activation tail: resolves 絿 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString();assert.equal(reg.split("import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1421_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1421.ts'\n").length,2);assert.equal(reg.split('  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1421_STROKES,\n').length,2)
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5836);assert.equal(5978-unique.size,142);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='絿').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'絿',strokes:13}),b[0]);assert.equal(hanjaStrokeData({glyph:'絿',strokes:12}),null);assert.equal(json(PUB).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,distinctNativePASS:79,officialFrames:9,staticScreens:13,engine:0,projection:0,SSR:0,build:false}))
})
