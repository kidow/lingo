import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1405_STROKES as ENTRY,loadGlyphWikiBatch1405Strokes as load,GLYPHWIKI_BATCH1405_NATIVE_APPROVAL,GLYPHWIKI_BATCH1405_RUNTIME_APPLIED,GLYPHWIKI_BATCH1405_ASSIGNMENT_PROVISIONAL,GLYPHWIKI_BATCH1405_APPROVAL_REVIEW as APPROVAL} from './hanja-stroke-dictionary-glyphwiki-batch1405.ts'
import {reviewedU8fc5Context,reviewedU8fc5Policy} from './hanja-stroke-start-caps-u8fc5.ts'
import {reviewedU8fc5TailContext,reviewedU8fc5TailFrame} from './hanja-stroke-original-up-tail-u8fc5.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const FIXTURE='docs/hanja-source-independent-qb-u8fc5-vs2-source-experiment-2026-10-19/fixtures.json',HEADER='docs/hanja-goal-glyphwiki-batch75-2026-09-22/alternative-engine-proof.json',TRACE='docs/hanja-goal-glyphwiki-batch75-2026-09-22/alternative-draw-trace.json',SOURCES='docs/hanja-goal-glyphwiki-batch75-2026-09-22/alternative-sources.json',PUBLIC='public/hanja-strokes/glyphwiki/u8fc5.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1405.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u8fc5-activation-review.json',GATE='docs/hanja-goal-glyphwiki-batch1405-2026-10-23/source-gate.json'
test('1405 sourcegate FIRST: original header4 separate trace7 closure, original23P, finite40 and source-preserving eight masks',()=>{
 const f=json(FIXTURE)['u8fc5-ue0102'],header=json(HEADER),trace=json(TRACE),sources=json(SOURCES),p=json(PUBLIC),b=json(BUNDLE),r=json(REVIEW),g=json(GATE),n=json(r.nativeEvidence.path),old=json(r.officialDirectionEvidence.path)
 assert.equal(sha(bytes(FIXTURE)),'6d61dce090101293999a78f83fba373d5b93d77dc53ab14e4e8a76c0e4f2598f')
 for(const[p,h]of Object.entries(g.inputSHA256))assert.equal(sha(bytes(p)),h,p)
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(p)),h,p)
 assert.deepEqual(Object.keys(header).sort(),['defaults','engineRevision','groups','hashes']);assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineRevision','groups','hashes','trace']);assert.deepEqual(f.fullProof,{...header,trace});assert.deepEqual(p.engineProof,f.fullProof);assert.equal(Object.keys(f.fullProof.hashes).length,8)
 assert.deepEqual(p.sourceIdentity,f.identity);assert.deepEqual(r.sourceIdentity,f.identity);assert.equal(Object.keys(f.identity).length,7)
 assert.deepEqual([f.fullProof.groups.length,f.fullProof.trace.length,f.fullProof.trace.flat().length,f.fullProof.groups.flatMap((x:any)=>x.polygons).length],[10,10,10,23])
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((n:number,s:any)=>n+(s.outline.match(/M/g)||[]).length,0)],[7,8,23])
 assert.equal(sha(JSON.stringify(f.strokes)),'780347f088e4ec9baeba17018b1c64c7be9538ffd5da3cd424d326968cd3d8e7');assert.deepEqual(p.derived,f.strokes);assert.deepEqual(p.sourceGroups,[[0,1],[2],[3],[4],[5],[6,7],[8,9]]);assert.deepEqual(p.sourceGroups.flat(),Array.from({length:10},(_,i)=>i))
 const canonical=(points:number[][])=>{const a=points.map(x=>JSON.stringify(x)),rot=(q:string[])=>q.map((_,i)=>JSON.stringify([...q.slice(i),...q.slice(0,i)]));return[...rot(a),...rot([...a].reverse())].sort()[0]},poly=(t:string)=>{const a=t.match(/-?\d+(?:\.\d+)?/g)!.map(Number);return Array.from({length:a.length/2},(_,i)=>a.slice(i*2,i*2+2))}
 const original=f.fullProof.groups.flatMap((g:any)=>g.polygons.map((q:any[])=>canonical(q.map(v=>[v.x/2,v.y/2])))).sort(),actual=f.strokes.flat().flatMap((m:any)=>m.outline.match(/M[^M]+/g).map((t:string)=>canonical(poly(t)))).sort();assert.deepEqual(actual,original)
 assert.deepEqual(p.records.map((v:any)=>v.name),['u8fc5-ue0102','aj1-20228','u8fb6']);for(const record of p.records){assert.deepEqual(record,sources.records[record.name]);for(const row of record.data.split('$')){const x=row.split(':');if(x[0]==='99')assert(p.records.some((r:any)=>r.name===x[7]))}}assert.deepEqual(p.sourceFamily.archive,sources.snapshot)
 assert.equal(p.sourcePreservation.newConnector,false);assert.equal(p.sourcePreservation.originalHeader4Preserved,true);assert.equal(p.sourcePreservation.actualArchiveFull5Claim,false);assert.deepEqual(p.sourcePreservation.originalPen7CenterlineGapPreserved,{firstEnd:[55,154],nextStart:[53,152]})
 assert.deepEqual(load(b),ENTRY);assert.deepEqual(b[0].outlines,f.strokes);assert.deepEqual(b[0].paths,f.strokes.map((pen:any[])=>pen.map(s=>s.outline).join(' ')));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(b[0].geometrySource,sha(bytes(PUBLIC)));assert.equal(b[0].sourceReference.geometryReviewSha256,sha(bytes(REVIEW)));assert.equal(APPROVAL.path,REVIEW);assert.equal(APPROVAL.SHA256,sha(bytes(REVIEW)))
 assert.equal(n.native.validScreens,40);assert.equal(n.native.breakdown.reduce((x:number,s:any)=>x+s.screens,0),40);assert.equal(n.stateVerification.totalStateOnlyChecks,9);assert.deepEqual(n.stateVerification.finalEmptyBad,[]);assert.deepEqual(n.stateVerification.correctedQ0Bad,[]);assert.equal(n.isolatedActualComponentFiniteApproval,true)
 assert.equal(old.status,'held');assert.deepEqual(old.reviewedDomesticStrokes,[1,2,3,4,5,6,7]);assert.equal(r.approval.officialContinuousCenterlineClaim,false);assert.equal(r.approval.actualProductAppUI,false);assert.equal(r.approval.officialMicroTimingEquivalent,false);assert.equal(r.approval.runtimeRegistrationAuthorized,true)
 const c=reviewedU8fc5Context(f.strokes);assert(c);assert(reviewedU8fc5TailContext(f.strokes));let policies=0;for(let i=0;i<7;i++)for(let m=0;m<f.strokes[i].length;m++)if(reviewedU8fc5Policy(c,i,m))policies++;assert.equal(policies,8)
 assert.equal(GLYPHWIKI_BATCH1405_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1405_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1405_ASSIGNMENT_PROVISIONAL,true);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines))
 const mutations=[(v:any)=>v.push(clone(v[0])),(v:any)=>v[0].glyph='遅',(v:any)=>v[0].pathsSha256='0'.repeat(64),(v:any)=>v[0].paths[0]+=' ',(v:any)=>v[0].outlines[0][0].weight+=.1,(v:any)=>v[0].outlines[6][1].revealPath+=' ',(v:any)=>v[0].outlines[0][0].bounds[0]+=1,(v:any)=>v[0].sourceReference.geometryReviewSha256='0'.repeat(64),(v:any)=>v[0].geometryLicense.revision='latest',(v:any)=>v[0].extra=true]
 for(const mutate of mutations){const v=clone(b);mutate(v);assert.throws(()=>load(v))}
 const symbolic=clone(b);Object.defineProperty(symbolic[0],Symbol('extra'),{value:1});assert.throws(()=>load(symbolic));let getterReads=0;const accessor=clone(b);Object.defineProperty(accessor[0],'glyph',{enumerable:true,get(){getterReads++;return'迅'}});assert.throws(()=>load(accessor));assert.equal(getterReads,0)
 console.log(JSON.stringify({batch:1405,sourcegateFIRST:true,counts:[7,8,23],header4SeparateTrace7:true,fullProofHashes8:true,nativeVisual40:true,stateOnly9:true,policyTargets:8,newEngine:0,projection:0,oldMathRerun:0,nativeRerun:0,loaderNegatives:12,getterReads:0,registryImport:0,build:0,wholeTSC:0}))
})

test('1405 activation tail: resolves 迅 once after ROOT append',async()=>{
 const reg=bytes('lib/hanja-strokes.ts').toString(),imp="import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1405_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1405.ts'\n",spread="  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1405_STROKES,\n"
 assert.equal(reg.split(imp).length,2);assert.equal(reg.split(spread).length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),bundle=json(BUNDLE),resolved=hanjaStrokeData({glyph:'迅',strokes:7})
 assert.equal(HANJA_STROKES.filter(x=>x.glyph==='迅').length,1);assert.deepEqual(resolved,bundle[0]);assert.equal(hanjaStrokeData({glyph:'迅',strokes:6}),null);assert(resolved)
 assert.deepEqual([resolved.outlines!.length,resolved.outlines!.flat().length,resolved.outlines!.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[7,8,23])
 const caps=reviewedU8fc5Context(resolved.outlines!),tail=reviewedU8fc5TailContext(resolved.outlines!);assert(caps);assert(tail)
 let runtimeCaps=0;for(let p=0;p<resolved.outlines!.length;p++)for(let m=0;m<resolved.outlines![p].length;m++){const q=reviewedU8fc5Policy(caps,p,m);assert(q);runtimeCaps++}assert.equal(runtimeCaps,8)
 const originalPen1=resolved.outlines![0][0],mid=reviewedU8fc5TailFrame(tail,originalPen1,.95),done=reviewedU8fc5TailFrame(tail,originalPen1,1)
 assert.equal(mid.phase,'tail');assert.equal(done.phase,'complete');assert.equal(done.bodyOutline+' '+done.tailOutline,originalPen1.outline);assert.equal(done.originalMaskCount,8);assert.equal(done.paintOriginalInkOnce,true)
 const directory=new URL('../content/hanja/characters/',import.meta.url),catalog=readdirSync(directory).filter(p=>p.endsWith('.json')).flatMap(p=>JSON.parse(readFileSync(new URL(p,directory),'utf8')).characters)
 assert.equal(catalog.length,5978);const applied=catalog.filter(c=>hanjaStrokeData(c)!==null).length,remaining=catalog.length-applied;assert(applied>=5820);assert(remaining<=158)
 console.log(JSON.stringify({actualRegistryImport:true,actualResolverCatalog:true,applied,remaining,targetMatches:1,pens:7,masks:8,originalPolygons:23,runtimeCaps,originalUPComposite:true,newNativeVisualScreens:40,stateOnlyChecks:9,actualAppUI:false,sourceProjection:0,engine:0,SSR:0,build:false}))
})
