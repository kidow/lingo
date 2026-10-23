import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1407_STROKES as ENTRY,loadGlyphWikiBatch1407Strokes as load,GLYPHWIKI_BATCH1407_NATIVE_APPROVAL,GLYPHWIKI_BATCH1407_RUNTIME_APPLIED,GLYPHWIKI_BATCH1407_ASSIGNMENT_PROVISIONAL,GLYPHWIKI_BATCH1407_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1407.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const FIXTURE='docs/hanja-terminal23-u785c-2026-10-23/fixtures.json',FULL='docs/hanja-source-original-full-u785c-2026-10-23/engine-proof.json',PUBLIC='public/hanja-strokes/glyphwiki/u785c.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1407.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u785c-activation-review.json'
test('1407 sourcegate: original30P exact terminal23 display31 fragments fresh22 reused90 official36 static14',()=>{
 const f=json(FIXTURE).u785c,full=json(FULL),p=json(PUBLIC),b=json(BUNDLE),r=json(REVIEW),n=json(r.nativeEvidence.path)
 assert.equal(sha(bytes(FIXTURE)),'7a4d144581920439cc0dc6cb306622ca1c820add3376ad0db86055c299b98816')
 assert.equal(sha(bytes(FULL)),'da9a0299154697b3d5aa39f520f725175da503ec23168aeeb431c38c2eae3f39')
 assert.equal(sha(JSON.stringify(f.strokes)),'ef01b0a716ba10f20b49ff4546bb378c12a7c3b5b137c3dbdbb6ade3b573f6ac')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,full);assert.deepEqual(p.engineProof,full)
 assert.equal(Object.keys(full.engineHashes).length,8);assert.deepEqual(Object.keys(p.sourceRecords).sort(),['u5de0-02','u77f3-01','u785c'])
 assert.equal(full.groups.length,16);assert.equal(full.trace.flat().length,16);assert.equal(full.trace.flat().reduce((c:number,t:any)=>c+t.polygons.length,0),30)
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((c:number,m:any)=>c+(m.outline.match(/M/g)?.length??0),0)],[12,16,31])
 assert.deepEqual(p.outlines,f.strokes);assert.deepEqual(p.sourceIdentity,r.sourceIdentity);assert.equal(p.sourceIdentity.root,'u785c')
 assert.equal(f.sourcePreservation.original30PolygonsExactlyOnce,false);assert.equal(f.sourcePreservation.original30PolygonsUnionPreserved,true);assert.equal(f.sourcePreservation.originalGuideWidthBodyWeightUnchanged,true);assert.equal(f.sourcePreservation.originalClockIdentityApproved,false)
 const old=f.baselineStrokes;for(let i=0;i<12;i++)if(i!==3)assert.deepEqual(f.strokes[i],old[i])
 for(const k of ['revealPath','revealWidth','weight','direction'])assert.deepEqual(f.strokes[3][0][k],old[3][0][k])
 assert.equal(f.strokes[3][1].direction,'down');assert.equal(f.strokes[3][1].weight,3);assert.equal(f.strokes[3][1].revealPath,undefined)
 assert.deepEqual(p.displayPolicy.activeCaps.map((x:any)=>[x.pen,x.mask]),[[2,1],[4,1],[7,1],[8,1],[9,1]]);assert.deepEqual(p.displayPolicy.feet.map((x:any)=>[x.pen,x.mask]),[[7,2],[8,2],[9,2]])
 assert.equal(p.displayPolicy.terminal23.originalPolygons,30);assert.equal(p.displayPolicy.terminal23.displayFragments,31);assert.equal(p.displayPolicy.terminal23.newInnerClockExplicit,true)
 assert.deepEqual(load(b),ENTRY);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((pen:any[])=>pen.map(m=>m.outline).join(' ')))
 assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUBLIC)))
 assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)))
 for(const [key,field]of [['officialDirectionEvidence','directionReviewSha256'],['staticWholeEvidence','orderReviewSha256']] as const)assert.equal(sha(bytes(r[key].path)),b[0].sourceReference[field])
 assert.equal(n.freshScreenshots,22);assert.equal(n.freshDistinctScopes,22);assert.equal(n.freshPASS,22);assert.equal(n.freshFAIL,0);assert.equal(n.excludedClippedInitialCaptures,2)
 assert.equal(n.reusedOldEvidence.unchangedScopeReused,90);assert.equal(n.reusedOldEvidence.oldPen4InitialRhoReplacedByFresh,5);assert.equal(n.reusedOldEvidence.failedResidualNotReused,true);assert.equal(n.combinedFinitePassingTargetScopes,112)
 assert.equal(n.bodyResidual.white,true);assert.equal(n.bodyResidual.oldTinyBlackTerminalResidueGone,true);assert.equal(n.allFullyVisible,true);assert.deepEqual(n.allBad,[]);assert.deepEqual(n.allErrors,[]);assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.server.stdoutEmpty,true)
 assert.equal(r.officialDirectionEvidence.freshFrames,36);assert.equal(r.officialDirectionEvidence.strokes,12);assert.equal(r.staticWholeEvidence.freshScreens,14);assert.equal(r.staticWholeEvidence.staticOnly,true)
 for(const [path,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(path)),h,path)
 for(const k of ['nativeApproval','runtimeApplied','registrationApproved','runtimeRegistered'])assert.equal(p.preparationHistory[k],false)
 assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1407_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1407_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1407_ASSIGNMENT_PROVISIONAL,true)
 assert.equal(r.approval.runtimeRegistrationAuthorized,true);assert.equal(r.runtimeActualGate.authorActualRegistryImport,0)
 for(const k of ['actualProductAppUI','controllerWorkflow','storageWorkflow','all12Autoplay','wholeReplayAllTime','officialMicroTimingEquivalent'])assert.equal(r.approval[k],false)
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v;assert.deepEqual(load(reordered(b)),ENTRY)
 for(const mutate of [(x:any)=>x[0].outlines[3][1].weight++,(x:any)=>x[0].outlines[3][0].revealPath+=' ',(x:any)=>x[0].sourceReference.directionReviewSha256='bad']){const v=clone(b);mutate(v);assert.throws(()=>load(v))}
 let reads=0;const v=clone(b);Object.defineProperty(v[0],'glyph',{enumerable:true,get(){reads++;return'硜'}});assert.throws(()=>load(v));assert.equal(reads,0);assert(Object.isFrozen(ENTRY[0].outlines))
 assert(bytes('public/hanja-strokes/glyphwiki/u785c.NOTICE.md').toString().includes(sha(bytes(REVIEW))))
 console.log(JSON.stringify({sourcegate:true,pens:12,masks:16,originalPolygons:30,displayFragments:31,freshNative:22,reusedUnchangedTargetScopes:90,officialMacroFrames:36,staticScreens:14,newCachedCorrection:1,sourceProjection:0,engine:0,SSR:0,actualRegistryImported:false}))
})
test('1407 activation tail: resolves 硜 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString(),imp="import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1407_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1407.ts'\n",spread="  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1407_STROKES,\n"
 assert.equal(reg.split(imp).length,2);assert.equal(reg.split(spread).length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph)),b=json(BUNDLE)
 assert.equal(unique.size,5822);assert.equal(5978-unique.size,156);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='硜').length,1);assert.deepEqual(hanjaStrokeData({glyph:'硜',strokes:12}),b[0]);assert.equal(hanjaStrokeData({glyph:'硜',strokes:11}),null)
 assert.deepEqual([b[0].outlines.length,b[0].outlines.flat().length],[12,16]);assert.equal(json(PUBLIC).preparationHistory.runtimeApplied,false)
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,pens:12,masks:16,originalPolygons:30,displayFragments:31,newNativeScreens:22,reusedUnchangedTargetScopes:90,officialMacroFrames:36,actualAppUI:false,sourceProjection:0,engine:0,SSR:0,build:false}))
})
