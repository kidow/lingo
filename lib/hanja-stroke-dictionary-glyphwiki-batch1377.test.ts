import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1377_STROKES as ENTRY,loadGlyphWikiBatch1377Strokes as load,GLYPHWIKI_BATCH1377_NATIVE_APPROVAL,GLYPHWIKI_BATCH1377_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1377.ts'
import {reviewedU68b4Context,reviewedU68b4Policy} from './hanja-stroke-start-gate-u68b4.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const PUBLIC="public/hanja-strokes/glyphwiki/u68b4-var-001.json",BUNDLE="public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1377.json",REVIEW="docs/hanja-actual-component-profiles-2026-10-22/u68b4-activation-review.json",FIXTURE="docs/hanja-source-independent-vh-u68b4-var001-source-experiment-2026-10-20/fixtures.json"
function polygonKey(p:number[][]):string{const rotations=(q:number[][])=>q.map((_,i)=>JSON.stringify([...q.slice(i),...q.slice(0,i)]));return [...rotations(p),...rotations(p.slice().reverse())].sort()[0]}
test('1377 sourcegate: 梴 actual variant full5 and unchanged source',()=>{
 const p=json(PUBLIC),f=json(FIXTURE).originalOrderBaseline,bundle=json(BUNDLE),proof=json(p.sourceIdentity.actualFull5File),review=json(REVIEW)
 assert.equal(sha(bytes(FIXTURE)),'039f6a12433c4d6aa5d403198897e09c2ccd9e242497aa3684d3dd9841ea957e')
 assert.equal(sha(bytes(p.sourceIdentity.actualFull5File)),'3bfeb5f11bac4cab87401ab180445f5dad19443e2f413d1be7d86917975d6448')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(p.engineProof,proof);assert.equal(p.sourceIdentity.root,'u68b4-var-001');assert.equal(p.sourceProofShape.newHeaderTraceCombination,false)
 assert.deepEqual(p.strokes,f);assert.deepEqual(bundle[0].outlines,f);assert.deepEqual(load(bundle),ENTRY);assert.equal(sha(JSON.stringify(f)),'d0a12406e6dc3fda2012d6edef84dafb7afe47a4dd5a7f305c35b948e3131767')
 assert.deepEqual(p.sourceGroups,[[0],[1],[2],[3],[13],[9],[10],[11,12],[4,5,6],[7],[8]]);assert.deepEqual([...p.sourceGroups.flat()].sort((a:number,b:number)=>a-b),Array.from({length:14},(_,i)=>i))
 assert.deepEqual([f.length,f.flat().length,f.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[11,12,25])
 const original=proof.trace.flat().flatMap((c:any)=>c.polygons).map((poly:any[])=>polygonKey(poly.map(v=>[v.x/2,v.y/2]))).sort()
 const emitted=f.flat().flatMap((m:any)=>m.outline.match(/M[^Z]+Z/g)||[]).map((d:string)=>{const n=d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);return polygonKey(Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]]))}).sort();assert.deepEqual(emitted,original)
 assert.deepEqual(bundle[0].paths,f.map((row:any[])=>row.map(m=>m.outline).join(' ')));assert.equal(bundle[0].pathsSha256,sha(JSON.stringify(bundle[0].paths)));assert.equal(bundle[0].geometrySource,sha(bytes(PUBLIC)))
 assert.equal(p.records.length,7);assert.deepEqual(p.missingReferences,[]);assert.equal(p.preparationHistory.nativeApproval,false);assert.equal(p.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1377_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1377_RUNTIME_APPLIED,false)
 assert.equal(Object.hasOwn(f[7][1],'revealPath'),false);assert.equal(Object.hasOwn(f[7][1],'revealWidth'),false)
 const C=reviewedU68b4Context(bundle[0].outlines);assert(C);for(let i=0;i<11;i++)for(let j=0;j<f[i].length;j++){const P=reviewedU68b4Policy(C,i,j);if(i===7&&j===1){assert(P);assert.equal(P.id,'u68b4-8-2');assert.deepEqual(P.segment,f[i][j])}else assert.equal(P,null)}
 for(const mutate of[(x:any)=>x[0].outlines[7][1].weight++,(x:any)=>x[0].outlines[7][1].bounds[0]++,(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].glyph='梃',(x:any)=>x[0].geometrySource='bad']){const bad=clone(bundle);mutate(bad);assert.throws(()=>load(bad))}
 assert.throws(()=>load(Object.fromEntries(Object.entries(bundle))));assert.throws(()=>load());assert.throws(()=>load(bundle,bundle));assert(Object.isFrozen(ENTRY[0].outlines))
 for(const [path,hash]of Object.entries(review.inputSHA256))assert.equal(sha(bytes(path)),hash,path)
 console.log(JSON.stringify({sourceGate:true,pens:11,masks:12,polygons:25,actualFull5:true,sourceProjection:0,engine:0,oldTests:0,SSR:0,build:false}))
})
test('1377 actualregistry tail: 梴 finite approval and single resolver',async()=>{
 const review=json(REVIEW),bundle=json(BUNDLE),p=json(PUBLIC)
 assert.equal(review.native.validScreens,31);assert.equal(review.native.breakdown.reduce((n:number,x:any)=>n+x.screens,0),31);assert.equal(review.native.breakdown.find((x:any)=>x.case==='all11-compact9').uniqueSamples,99)
 assert.equal(review.approval.rootIsolatedActualComponentFiniteApproved,true);assert.equal(review.approval.runtimeRegistrationAuthorized,true);for(const k of ['actualAppUI','actualProductAppUI','controller','storage','all11Autoplay'])assert.equal(review.approval[k],false)
 assert.equal(review.originalHOLDPreserved,true);assert.equal(review.source.originalHGuideAbsent,true);assert.equal(review.source.originalHRevealWidthAbsent,true);assert.equal(review.source.sourceTimingPreservedClaim,false)
 const registry=bytes('lib/hanja-strokes.ts').toString(),imp="import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1377_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch1377.ts'\n",spread="  ...HANJA_DICTIONARY_GLYPHWIKI_BATCH1377_STROKES,\n";assert.equal(registry.split(imp).length,2);assert.equal(registry.split(spread).length,2)
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),unique=new Set(HANJA_STROKES.map(x=>x.glyph));assert(unique.size>=5791);assert(5978-unique.size<=187);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='梴').length,1);assert.deepEqual(hanjaStrokeData({glyph:'梴',strokes:11}),bundle[0]);assert.equal(hanjaStrokeData({glyph:'梴',strokes:10}),null)
 assert.equal(p.preparationHistory.runtimeApplied,false);assert(bytes("public/hanja-strokes/glyphwiki/u68b4-var-001.NOTICE.md").toString().includes(sha(bytes(REVIEW))))
 console.log(JSON.stringify({actualRegistryImport:true,applied:unique.size,remaining:5978-unique.size,targetMatches:1,pens:11,masks:12,polygons:25,nativeFiniteScreens:31,oldTests:0,SSR:0,engine:0,build:false}))
})
