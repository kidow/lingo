import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1374_STROKES as ENTRY,loadGlyphWikiBatch1374Strokes as load,GLYPHWIKI_BATCH1374_NATIVE_APPROVAL,GLYPHWIKI_BATCH1374_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1374.ts'
import {reviewedU96aeContext,reviewedU96aePolicy,REVIEWED_U96AE_SOURCE as POLICY_SOURCE} from './hanja-stroke-start-gate-u96ae.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const FIXTURE='docs/hanja-source-cache-u96ae-2026-10-22/source.json',PUBLIC='public/hanja-strokes/glyphwiki/u96ae.json',BUNDLE='public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1374.json',REVIEW='docs/hanja-actual-component-profiles-2026-10-22/u96ae-activation-review.json'
function polygonKey(points:number[][]):string {
 const rotations=(p:number[][])=>p.map((_,i)=>JSON.stringify([...p.slice(i),...p.slice(0,i)]))
 return [...rotations(points),...rotations(points.slice().reverse())].sort()[0]
}
test('1374 activation tail: sourcegate and actual resolver 隮 once',async()=>{
 const f=json(FIXTURE),p=json(PUBLIC),bundle=json(BUNDLE),proof=json(f.identity.actualFull5File),review=json(REVIEW)
 assert.equal(sha(bytes(FIXTURE)),'cb15dde1e5e3e4afe29cddaaab7d2ad27eff8866e7b2ad535ce52b9ed5bcf5a6')
 assert.equal(sha(bytes(f.identity.actualFull5File)),'940eb7ea3b0b5a2f019a520ae8a132f75074682eb0eb2a94e63fbddc2b4b8e2a')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.deepEqual(p.engineProof,proof);assert.deepEqual(p.sourceIdentity,f.identity);assert.equal(p.sourceProofShape.newHeaderTraceCombination,false)
 assert.equal(sha(JSON.stringify(f.strokes)),'9f607f1122fe9b3ccafeffe97a62dc62a9a9d0b7acc6ea3e52613a2466d4b5cc')
 assert.deepEqual(p.sourceGroups,f.sourceGroups);assert.deepEqual([...f.sourceGroups.flat()].sort((a:number,b:number)=>a-b),Array.from({length:20},(_,i)=>i))
 assert.deepEqual(p.strokes,f.strokes);assert.deepEqual(bundle[0].outlines,f.strokes);assert.deepEqual(load(bundle),ENTRY)
 assert.deepEqual(bundle[0].paths,f.strokes.map((row:any[])=>row.map(m=>m.outline).join(' ')));assert.equal(bundle[0].pathsSha256,sha(JSON.stringify(bundle[0].paths)));assert.equal(bundle[0].geometrySource,sha(bytes(PUBLIC)))
 assert.deepEqual([proof.groups.length,proof.trace.flat().length,proof.trace.flat().flatMap((c:any)=>c.polygons).length],[20,23,42])
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[17,20,42])
 const original=proof.trace.flat().flatMap((c:any)=>c.polygons).map((poly:any[])=>polygonKey(poly.map(v=>[v.x/2,v.y/2]))).sort()
 const emitted=f.strokes.flat().flatMap((m:any)=>m.outline.match(/M[^Z]+Z/g)||[]).map((d:string)=>{const n=d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);return polygonKey(Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]]))}).sort()
 assert.deepEqual(emitted,original,'All original42 P exactly once, no new ink')
 assert.equal(p.records.length,7);assert.deepEqual(p.missingReferences,[]);assert.equal(p.preparationHistory.sourceProjectionRuns,0);assert.equal(p.sourceProvenance.initialPureProjectionOperations,1)
 assert.equal(p.preparationHistory.nativeApproval,false);assert.equal(p.preparationHistory.runtimeApplied,false);assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
 assert.equal(POLICY_SOURCE.sourceCacheSHA256,sha(bytes(FIXTURE)));assert.equal(POLICY_SOURCE.sourceTimingPreservedClaim,false)
 const C=reviewedU96aeContext(bundle[0].outlines)!;assert(C)
 for(let pen=0;pen<f.strokes.length;pen++)for(let mask=0;mask<f.strokes[pen].length;mask++){const pol=reviewedU96aePolicy(C,pen,mask);if(pen===11&&mask===1){assert(pol);assert.equal(pol.id,'u96ae-12-2');assert.deepEqual(pol.segment,f.strokes[11][1]);assert.equal(pol.kind,'contact-foot-x-u96ae')}else assert.equal(pol,null)}
 assert.equal(GLYPHWIKI_BATCH1374_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1374_RUNTIME_APPLIED,false)
 for(const mutate of[(x:any)=>x[0].outlines[11][1].weight++,(x:any)=>x[0].outlines[11][1].revealPath+=' ',(x:any)=>x[0].outlines[11][0].bounds[3]++,(x:any)=>x[0].outlines[11].reverse(),(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].glyph='齊',(x:any)=>x[0].geometrySource='wrong']){const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))}
 const holes=clone(bundle);delete holes[0].outlines[11][1];assert.throws(()=>load(holes));assert(Object.isFrozen(ENTRY[0].outlines));assert.throws(()=>load());assert.throws(()=>load(bundle,bundle))
 assert.equal(review.glyph,'隮');assert.equal(review.batch,1374);assert.equal(review.native.validScreens,50);assert.equal(review.native.breakdown.reduce((n:number,row:any)=>n+row.screens,0),50)
 assert.deepEqual(review.native.bad,[]);assert.deepEqual(review.native.errors,[]);assert.equal(review.native.breakdown.find((x:any)=>x.case==='all17-compact9').uniqueSamples,153)
 const special=review.native.breakdown.find((x:any)=>x.case==='12m2-special-exact-original-P-residual');assert.equal(special.DOMTwoPathDExactEqual,true);assert.equal(special.clonedActualMaskAttribute,null);assert.equal(special.pixelEqualityClaim,false)
 assert.equal(review.approval.rootIsolatedActualComponentFiniteApproved,true);assert.equal(review.approval.runtimeRegistrationAuthorized,true)
 for(const k of['actualProductAppUI','actualAppUI','controller','storage','all17Autoplay'])assert.equal(review.approval[k],false)
 assert.equal(review.server.initialFailedListenResourcesAlreadyExecuted,true);assert.equal(review.server.allAttemptsSSRZeroClaim,false);assert.equal(review.server.successfulServerSSR,1)
 assert.equal(review.originalHOLDPreserved,true);for(const[path,hash]of Object.entries(review.inputSHA256))assert.equal(sha(bytes(path)),hash,path)
 const registry=bytes('lib/hanja-strokes.ts').toString(),imp="import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1374_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1374.ts'\n",spread="  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1374_STROKES,\n"
 assert.equal(registry.split(imp).length,2);assert.equal(registry.split(spread).length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts');const unique=new Set(HANJA_STROKES.map(x=>x.glyph))
 assert(unique.size>=5789);assert(5978-unique.size<=189);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='隮').length,1)
 assert.deepEqual(hanjaStrokeData({glyph:'隮',strokes:17}),bundle[0]);assert.equal(hanjaStrokeData({glyph:'隮',strokes:16}),null)
 assert(bytes('public/hanja-strokes/glyphwiki/u96ae.NOTICE.md').toString().includes(sha(bytes(REVIEW))))
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,pens:17,masks:20,polygons:42,sourcePins:Object.keys(review.inputSHA256).length,mismatch:0,nativeFiniteScreens:50,sourceProjection:0,engine:0,oldTests:0,SSR:0,build:false}))
})
