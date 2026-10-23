import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1410_STROKES as ENTRY,loadGlyphWikiBatch1410Strokes as load,GLYPHWIKI_BATCH1410_NATIVE_APPROVAL,GLYPHWIKI_BATCH1410_RUNTIME_APPLIED,GLYPHWIKI_BATCH1410_ASSIGNMENT_PROVISIONAL,GLYPHWIKI_BATCH1410_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1410.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const FIXTURE='docs/hanja-source-independent-qq-three-u727c-source-experiment-2026-10-23/fixtures.json',FULL='docs/hanja-source-original-full-u727c-2026-10-23/engine-proof.json',PUBLIC='public/hanja-strokes/glyphwiki/u727c.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1410.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u727c-activation-review.json'
test('1410 sourcegate: original15raw14calls32P zero4 caps5 feet3 fresh98 official33 static13',()=>{
 const f=json(FIXTURE).u727c,full=json(FULL),p=json(PUBLIC),b=json(BUNDLE),r=json(REVIEW),n=json(r.nativeEvidence.path)
 assert.equal(sha(bytes(FIXTURE)),'90caec4d8b1d11bd15cb34dffb09469d9254385b5fee4316605f5de6af260b7d')
 assert.equal(sha(bytes(FULL)),'89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db')
 assert.equal(sha(JSON.stringify(f.strokes)),'350fc58023412c2aa5e03acf53ed462056a970b0f96265df52c1fcbacc4f29ff')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.equal(Object.keys(full.engineHashes).length,8);assert.deepEqual(Object.keys(p.sourceRecords).sort(),['u5de0-02','u725c-01','u727c'])
 assert.equal(full.groups.length,15);assert.equal(full.trace.flat().length,14);assert.equal(full.trace.flat().reduce((c:number,t:any)=>c+t.polygons.length,0),32)
 assert.equal(full.trace[4].length,0);assert.deepEqual(p.sourcePreservation.zeroDrawRawZeroBased,[4]);assert.equal(p.sourcePreservation.zeroDrawRawPreserved,true)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((c:number,m:any)=>c+(m.outline.match(/M/g)?.length??0),0)],[11,14,32])
 assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(f.strokes,f.baseline);assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.equal(p.sourceIdentity.root,'u727c')
 assert.deepEqual(p.sourceGroups,[[0],[1],[2],[3],[4,5],[6,7],[8,9],[10,11],[12],[13],[14]])
 assert.deepEqual(p.displayPolicy.activeCaps.map((x:any)=>[x.pen,x.mask]),[[1,1],[4,1],[6,1],[7,1],[8,1]]);assert.deepEqual(p.displayPolicy.feet.map((x:any)=>[x.pen,x.mask]),[[6,2],[7,2],[8,2]])
 assert.equal(p.sourcePreservation.originalPolygonsExactlyOnce,true);assert.equal(p.sourcePreservation.originalGuideWidthWeightUnchanged,true);assert.equal(p.displayPolicy.newSourceFootClockExplicit,true)
 assert.deepEqual(load(b),ENTRY);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((pen:any[])=>pen.map(m=>m.outline).join(' ')))
 assert.deepEqual(b[0].sourceStrokeIndices,[1,2,3,4,6,7,9,11,13,14,15])
 assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUBLIC)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 for(const [key,field]of [['officialDirectionEvidence','directionReviewSha256'],['staticWholeEvidence','orderReviewSha256']] as const)assert.equal(sha(bytes(r[key].path)),b[0].sourceReference[field])
 assert.equal(n.freshScreenshots,98);assert.equal(n.freshDistinctScopes,98);assert.equal(n.freshPASS,98);assert.equal(n.freshFAIL,0);assert.equal(Object.entries(n.scopeCounts).filter(([k])=>k!=='total').reduce((s,[,v])=>s+Number(v),0),98)
 assert.equal(n.scopeDetails.fullRoundResidual.white,true);assert.equal(n.scopeDetails.footCoverage.whiteInterior,true);assert.equal(n.scopeDetails.footCoverage.pixelEqualityClaimed,false)
 assert.equal(n.allFullyVisible,true);assert.deepEqual(n.allBad,[]);assert.deepEqual(n.allErrors,[]);assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.stdoutEmptyNotAsserted,true)
 assert.equal(r.officialDirectionEvidence.freshFrames,33);assert.equal(r.officialDirectionEvidence.strokes,11);assert.equal(r.staticWholeEvidence.freshScreens,13);assert.equal(r.staticWholeEvidence.staticOnly,true)
 for(const [path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of ['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(GLYPHWIKI_BATCH1410_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1410_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1410_ASSIGNMENT_PROVISIONAL,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0)
 for(const k of ['actualProductAppUI','controllerWorkflow','storageWorkflow','all11Autoplay','wholeReplayAllTime','officialMicroTimingEquivalent'])assert.equal(r.approval[k],false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v;assert.deepEqual(load(reordered(b)),ENTRY)
 for(const mutate of [(x:any)=>x[0].outlines[5][1].weight++,(x:any)=>x[0].outlines[0][0].revealPath+=' ',(x:any)=>x[0].sourceReference.directionReviewSha256='bad']){const v=clone(b);mutate(v);assert.throws(()=>load(v))}
 let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'牼'}});assert.throws(()=>load(v));assert.equal(reads,0);assert(Object.isFrozen(ENTRY[0].outlines))
 assert(bytes('public/hanja-strokes/glyphwiki/u727c.NOTICE.md').toString().includes(sha(bytes(REVIEW))))
 console.log(JSON.stringify({sourcegate:true,pens:11,masks:14,originalRaw:15,drawingCalls:14,polygons:32,zeroDrawRaw:4,freshNative:98,officialMacroFrames:33,staticScreens:13,sourceProjection:0,engine:0,SSR:0,actualRegistryImported:false}))
})
test('1410 activation tail: resolves 牼 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString(),imp="import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1410_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1410.ts'\n",spread="  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1410_STROKES,\n"
 assert.equal(reg.split(imp).length,2);assert.equal(reg.split(spread).length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5825);assert.equal(5978-unique.size,153);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='牼').length,1);assert.deepEqual(hanjaStrokeData({glyph:'牼',strokes:11}),b[0]);assert.equal(hanjaStrokeData({glyph:'牼',strokes:10}),null)
 assert.deepEqual([b[0].outlines.length,b[0].outlines.flat().length],[11,14]);assert.equal(json(PUBLIC).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,pens:11,masks:14,polygons:32,newNativeScreens:98,officialMacroFrames:33,actualAppUI:false,sourceProjection:0,engine:0,SSR:0,build:false}))
})
