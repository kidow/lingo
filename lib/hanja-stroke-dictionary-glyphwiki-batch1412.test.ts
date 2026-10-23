import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1412_STROKES as ENTRY,loadGlyphWikiBatch1412Strokes as load,GLYPHWIKI_BATCH1412_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1412_NATIVE_APPROVAL,GLYPHWIKI_BATCH1412_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1412.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const PUB='public/hanja-strokes/glyphwiki/u7d8c.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1412.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u7d8c-activation-review.json'

test('1412 sourcegate: 綌 original34P native68 official39 static15',()=>{
 const r=json(REVIEW),p=json(PUB),b=json(BUNDLE),f=json(r.sourceFixture.path).u7d8c,full=json(r.actualFull5.path),n=json(r.nativeEvidence.path)
 assert.equal(sha(JSON.stringify(f.strokes)),'41775e1ca7a738e13e58551035401c5cb77dc47deb25d976961792e29e2361b2')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.deepEqual(p.sourceGroups,[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14,15],[16]])
 assert.equal(full.groups.length,17);assert.equal(full.trace.flat().length,16);assert.equal(full.groups.reduce((s:number,g:any)=>s+g.polygons.length,0),34)
 assert.equal(full.groups[8].polygons.length,0);assert(p.sourceGroups[6].includes(8))
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((s:number,m:any)=>s+(m.outline.match(/M/g)?.length??0),0)],[13,15,34])
 assert.equal(Object.keys(p.sourceRecords).length,4);assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(b[0].outlines,f.strokes)
 assert.deepEqual(b[0].paths,f.strokes.map((s:any[])=>s.map(m=>m.outline).join(' ')));assert.deepEqual(b[0].sourceStrokeIndices,p.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(load(b),ENTRY);assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUB)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 assert.equal(b[0].sourceReference.orderReviewSha256,sha(bytes(r.staticWholeEvidence.path)));assert.equal(b[0].sourceReference.directionReviewSha256,sha(bytes(r.officialDirectionEvidence.path)))
 assert.equal(n.distinctPASS,68);assert.equal(n.distinctFAIL,0);assert.equal(n.freshPASS,68);assert.equal(n.freshFAIL,0);assert.equal(n.scopeCounts.total,68)
 assert.equal(n.allFullyVisible,true);assert.deepEqual(n.allBad,[]);assert.deepEqual(n.allErrors,[]);assert.equal(n.visualMissingInk,false);assert.equal(n.visualSeparatedFragment,false)
 assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.stdoutEmpty,true)
 assert.equal(r.officialDirectionEvidence.freshExistingFrames,39);assert.equal(r.staticWholeEvidence.freshExistingScreens,15)
 for(const [path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of ['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(GLYPHWIKI_BATCH1412_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1412_RUNTIME_APPLIED,false)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.actualProductAppUI,false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(b)),ENTRY);let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'綌'}});assert.throws(()=>load(v));assert.equal(reads,0)
 const altered=clone(b);altered[0].outlines[12][0].weight++;assert.throws(()=>load(altered));assert(Object.isFrozen(ENTRY[0].outlines))
 console.log(JSON.stringify({sourcegate:true,distinctNativePASS:68,pens:13,masks:15,originalP:34,zeroDrawRaw8Preserved:true,official39:true,static15:true,actualRegistryImported:false,engine:0,projection:0,SSR:0,build:false}))
})
test('1412 activation tail: resolves 綌 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString();assert.equal(reg.split("import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1412_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1412.ts'\n").length,2);assert.equal(reg.split('  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1412_STROKES,\n').length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5827);assert.equal(5978-unique.size,151);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='綌').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'綌',strokes:13}),b[0]);assert.equal(hanjaStrokeData({glyph:'綌',strokes:12}),null);assert.equal(json(PUB).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,distinctNativePASS:68,officialFrames:39,staticScreens:15,engine:0,projection:0,SSR:0,build:false}))
})
