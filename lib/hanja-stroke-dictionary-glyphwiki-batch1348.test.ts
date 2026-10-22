import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1348_STROKES as EXPECTED,loadGlyphWikiBatch1348Strokes as load,GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,GLYPHWIKI_BATCH1348_RUNTIME_APPLIED,GLYPHWIKI_BATCH1348_ASSIGNMENT_PROVISIONAL,GLYPHWIKI_BATCH1348_ACTUAL_COMPONENT_REVIEW as REVIEW}from'./hanja-stroke-dictionary-glyphwiki-batch1348.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1348 원UP7quad·VH13 복원캐시 loader 결박 (준비시 최초PASS)',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1348.json'),asset=json('public/hanja-strokes/glyphwiki/u799b.json'),cache=json('docs/hanja-source-cache-u799b-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.deepEqual(bundle[0].outlines,cache.strokes);assert.equal(bundle[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u799b.json')))
 assert.equal(sha(JSON.stringify(cache.strokes)),'4af5b9e1055c0c5c24681c02f65c0e0188782b1528b40dc511c009b0a7c31c67')
 assert.equal(asset.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u799b-2026-10-22/source.json')));assert.equal(asset.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u799b-2026-10-22/source.mjs')))
 assert.deepEqual(asset.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u799b.json'));assert.equal(asset.cachedCorrection.priorCacheSHA256,'fe4a48617edf3d8a485ef4fab79a89844846e9916acf5f37f9593eb1c11f0f37')
 assert.equal(asset.preparationHistory.newCachedCorrectionOperations,1);assert.equal(asset.preparationHistory.runtimeApplied,false);
 assert.deepEqual(asset.exactInterRawJoins,[[8,9]]);assert.deepEqual(asset.independentMaskPolicies.map((p:any)=>[p.pen,p.maskCount]),[[7,2],[13,2]])
 for(const mutate of[(b:any)=>b[0].outlines[6][1].outline+=' ',(b:any)=>b[0].outlines[6][0].weight++,(b:any)=>b[0].outlines[12].reverse(),(b:any)=>b[0].outlines[12][0].bounds[0]++,(b:any)=>b[0].outlines[12][0].revealPath='M46 34.5 L46 75.5']){
  const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))
 }
 const stale=clone(bundle);stale[0].outlines=cache.baselineStrokes;assert.throws(()=>load(stale))
})

test('1348 activation tail: ROOT32유한화면 승인과 실제등록',async()=>{
 assert.equal(GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,true);assert.equal(GLYPHWIKI_BATCH1348_RUNTIME_APPLIED,true);assert.equal(GLYPHWIKI_BATCH1348_ASSIGNMENT_PROVISIONAL,false);
 const r=json(REVIEW.file);assert.equal(sha(bytes(REVIEW.file)),REVIEW.sha256);assert.equal(r.approval.rootRegistrationApproved,true);assert.equal(r.approval.isolatedActualComponentFiniteApproved,true);assert.equal(r.approval.actualAppUI,false);assert.equal(r.approval.all15Autoplay,false);assert.equal(r.approval.storage,false);assert.equal(r.native.validScreens,32);assert.equal(r.native.compact.uniqueSamples,135);assert.equal(r.native.compact.screens+r.native.curveFullRoundResidual.screens+r.native.boundaries.screens+r.native.nearCompletion.screens+r.native.natural7.screens+r.native.doneWhole.screens,32);assert.deepEqual(r.native.natural7.bad,[]);assert.deepEqual(r.native.natural7.errors,[]);
 for(const[p,h]of Object.entries(r.inputSHA256)){assert.match(h as string,/^[a-f0-9]{64}$/);if(p==='scripts/hanja-actual-component-review.mjs'||p=== 'docs/hanja-actual-component-profiles-2026-10-22/u799b.json')continue;assert.equal(sha(bytes(p)),h,p)} // 공통adapter/profile은관측당시역사지문.
 const asset=json('public/hanja-strokes/glyphwiki/u799b.json'),cache=json('docs/hanja-source-cache-u799b-2026-10-22/source.json');assert.equal(asset.preparationHistory.runtimeApplied,false);assert.equal(cache.runtimeApplied,false);assert.equal(sha(JSON.stringify(EXPECTED[0].outlines)),r.source.geometrySHA256);assert.deepEqual(EXPECTED[0].outlines,cache.strokes);
 const{HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts');const unique=new Set(HANJA_STROKES.map(x=>x.glyph));assert.equal(unique.size,5763);assert.equal(5978-unique.size,215);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='禛').length,1);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='寘').length,1);assert.deepEqual(hanjaStrokeData({glyph:'禛',strokes:15}),EXPECTED[0]);
 console.log(JSON.stringify({batch:1348,glyph:'禛',registryUnique:unique.size,remaining:5978-unique.size,targetMatches:1,u5bd8Matches:HANJA_STROKES.filter(x=>x.glyph==='寘').length,pens:15,masks:17,polygons:38,actualFiniteScreens:32,actualAppUI:false,engine:0,sourceProjection:0,oldLoaderNegativeTestsRepeated:0}));
})
