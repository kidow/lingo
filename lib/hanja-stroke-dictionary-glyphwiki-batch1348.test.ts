import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1348_STROKES as EXPECTED,loadGlyphWikiBatch1348Strokes as load,GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,GLYPHWIKI_BATCH1348_RUNTIME_APPLIED}from'./hanja-stroke-dictionary-glyphwiki-batch1348.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1348 원UP7quad·VH13 복원캐시와 미등록loader 결박',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1348.json'),asset=json('public/hanja-strokes/glyphwiki/u799b.json'),cache=json('docs/hanja-source-cache-u799b-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.deepEqual(bundle[0].outlines,cache.strokes);assert.equal(bundle[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u799b.json')))
 assert.equal(sha(JSON.stringify(cache.strokes)),'4af5b9e1055c0c5c24681c02f65c0e0188782b1528b40dc511c009b0a7c31c67')
 assert.equal(asset.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u799b-2026-10-22/source.json')));assert.equal(asset.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u799b-2026-10-22/source.mjs')))
 assert.deepEqual(asset.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u799b.json'));assert.equal(asset.cachedCorrection.priorCacheSHA256,'fe4a48617edf3d8a485ef4fab79a89844846e9916acf5f37f9593eb1c11f0f37')
 assert.equal(asset.preparationHistory.newCachedCorrectionOperations,1);assert.equal(asset.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1348_RUNTIME_APPLIED,false)
 assert.deepEqual(asset.exactInterRawJoins,[[8,9]]);assert.deepEqual(asset.independentMaskPolicies.map((p:any)=>[p.pen,p.maskCount]),[[7,2],[13,2]])
 for(const mutate of[(b:any)=>b[0].outlines[6][1].outline+=' ',(b:any)=>b[0].outlines[6][0].weight++,(b:any)=>b[0].outlines[12].reverse(),(b:any)=>b[0].outlines[12][0].bounds[0]++,(b:any)=>b[0].outlines[12][0].revealPath='M46 34.5 L46 75.5']){
  const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))
 }
 const stale=clone(bundle);stale[0].outlines=cache.baselineStrokes;assert.throws(()=>load(stale))
})
