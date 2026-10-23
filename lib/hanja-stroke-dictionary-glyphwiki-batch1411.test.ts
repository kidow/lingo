import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1411_STROKES as ENTRY,loadGlyphWikiBatch1411Strokes as load,GLYPHWIKI_BATCH1411_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1411_NATIVE_APPROVAL,GLYPHWIKI_BATCH1411_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1411.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const PUB='public/hanja-strokes/glyphwiki/u6705.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1411.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u6705-activation-review.json'
test('1411 sourcegate: 朅 original37P native107distinct official42 static16',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).u6705,full=json(r.actualFull5.path),n=json(r.nativeEvidence.path)
 assert.equal(sha(JSON.stringify(f.strokes)),'29cffb3c3ddc0456d34e0fe55b9ffa966cff7470f47d6e80a5f729e545524c4d')
 assert.equal(sha(bytes(r.actualFull5.path)),'9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 for(const k of ['defaults','engineHashes','engineRevision','groups'])assert.deepEqual(f.headerProof[k],full[k])
 assert.deepEqual(f.originalTrace,full.trace);assert.deepEqual(p.engineProof,full);assert.deepEqual(p.sourceIdentity,f.identity)
 assert.equal(full.groups.length,18);assert.equal(full.trace.flat().length,19);assert.equal(full.groups.reduce((s:number,g:any)=>s+g.polygons.length,0),37)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((s:number,m:any)=>s+(m.outline.match(/M/g)?.length??0),0)],[14,15,37])
 assert.equal(Object.keys(p.sourceRecords).length,5);assert(Object.hasOwn(p.sourceRecords,'u200ca@4'));assert.deepEqual(p.sourceGroups,f.sourceGroups)
 assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((s:any[])=>s.map(m=>m.outline).join(' ')))
 assert.deepEqual(b[0].sourceStrokeIndices,f.sourceGroups.map((g:number[])=>g[0]+1));assert.deepEqual(load(b),ENTRY)
 assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 assert.equal(b[0].sourceReference.orderReviewSha256,sha(bytes(r.staticWholeEvidence.path)));assert.equal(b[0].sourceReference.directionReviewSha256,sha(bytes(r.officialDirectionEvidence.path)))
 assert.equal(n.distinctPASS,107);assert.equal(n.distinctFAIL,0);assert.equal(n.freshPASS,64);assert.equal(n.freshFAIL,0);assert.equal(n.reusedSuccessfulScopes+n.freshDistinctScopes-n.oldFreshDuplicateScopes,107)
 assert.equal(n.corrected14.originalMissingTriangleResolved,true);assert.equal(n.corrected14.connectionPreserved,true);assert.equal(n.allFullyVisible,true);assert.deepEqual(n.allBad,[]);assert.deepEqual(n.allErrors,[])
 assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.stdoutEmpty,true)
 assert.equal(n.excluded.historicalTarget14ResidualFailurePreserved,true);assert.equal(n.excluded.observerFalsePositiveImages,1)
 assert.equal(r.officialDirectionEvidence.freshExistingFrames,42);assert.equal(r.staticWholeEvidence.freshExistingScreens,16)
 assert.equal(p.displayPolicy.down14Correction.sourceFieldsUnchanged,true);assert.equal(p.displayPolicy.down14Correction.cutY,89)
 for(const [path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of ['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1411_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1411_RUNTIME_APPLIED,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.actualProductAppUI,false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(b)),ENTRY);let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'朅'}});assert.throws(()=>load(v));assert.equal(reads,0)
 const altered=clone(b);altered[0].outlines[13][0].weight++;assert.throws(()=>load(altered));assert(Object.isFrozen(ENTRY[0].outlines))
 console.log(JSON.stringify({sourcegate:true,distinctNativePASS:107,freshNative:64,reusedNative:44,duplicateExcluded:1,pens:14,masks:15,originalP:37,official42:true,static16:true,actualRegistryImported:false,engine:0,projection:0,SSR:0,build:false}))
})
test('1411 activation tail: resolves 朅 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString();assert.equal(reg.split("import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1411_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1411.ts'\n").length,2);assert.equal(reg.split('  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1411_STROKES,\n').length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5826);assert.equal(5978-unique.size,152);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='朅').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'朅',strokes:14}),b[0]);assert.equal(hanjaStrokeData({glyph:'朅',strokes:13}),null);assert.equal(json(PUB).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,distinctNativePASS:107,officialFrames:42,staticScreens:16,engine:0,projection:0,SSR:0,build:false}))
})
