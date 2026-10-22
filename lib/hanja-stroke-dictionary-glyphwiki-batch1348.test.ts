import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1348_STROKES as EXPECTED,loadGlyphWikiBatch1348Strokes as load,GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,GLYPHWIKI_BATCH1348_RUNTIME_APPLIED,GLYPHWIKI_BATCH1348_ASSIGNMENT_PROVISIONAL}from'./hanja-stroke-dictionary-glyphwiki-batch1348.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1348 미등록 loader 의미동일성·정확source결박과 실제변조음성',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1348.json'),asset=json('public/hanja-strokes/glyphwiki/u799b.json'),cache=json('docs/hanja-source-cache-u799b-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u799b.json')))
 assert.deepEqual(bundle[0].outlines,cache.strokes);assert.equal(sha(JSON.stringify(cache.strokes)),"68ce025578bf5e283747988bc01e803d2d59dfad15004ed9dacf27100a5aabc8")
 assert.deepEqual(asset.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u799b.json'));assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u799b.json')),"876e21ebba154ca75ab0d5f1421f83f9f664b0ee2112b9e8d5025e2e29392440")
 assert.deepEqual(asset.sourceGroups,cache.sourceGroups);assert.deepEqual(asset.sourceIdentity,cache.identity);assert.equal(asset.preparationHistory.runtimeApplied,false)
 assert.equal(asset.records.length,5);assert.deepEqual(asset.exactInterRawJoins,[[8,9],[13,14]]);assert.equal(asset.independentMaskPolicies.length,0)
 assert.equal(GLYPHWIKI_BATCH1348_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1348_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1348_ASSIGNMENT_PROVISIONAL,true);assert(Object.isFrozen(EXPECTED[0].outlines![8][0].bounds))
 const reordered=bundle.map((b:any)=>Object.fromEntries(Object.entries(b).reverse()));assert.deepEqual(load(reordered),EXPECTED)
 for(const args of[[],[bundle,{}]])assert.throws(()=>Reflect.apply(load,null,args))
 for(const mutate of[(b:any)=>b[0].glyph='wrong',(b:any)=>b[0].outlines[8][0].weight++,(b:any)=>b[0].outlines[8][0].revealPath+=' ',(b:any)=>b[0].outlines[6][0].bounds[0]++,(b:any)=>b[0].sourceStrokeIndices.reverse(),(b:any)=>b[0].paths[0]+=' ',(b:any)=>b[0].nativeApproval=true]){
  const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))
 }
 const sparse=clone(bundle);delete sparse[0].outlines[8][0];assert.throws(()=>load(sparse))
 const inherited=clone(bundle),m=inherited[0].outlines[8][0],weight=m.weight;delete m.weight;Object.setPrototypeOf(m,{weight});assert.throws(()=>load(inherited))
 let reads=0;const getter=clone(bundle);Object.defineProperty(getter[0].outlines[8][0],'weight',{enumerable:true,get(){reads++;return weight}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const symbol=clone(bundle);symbol[0][Symbol('extra')]=1;assert.throws(()=>load(symbol));assert.throws(()=>{(EXPECTED[0].outlines![8][0].bounds as number[])[0]++})
})
