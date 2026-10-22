import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1347_STROKES as EXPECTED,loadGlyphWikiBatch1347Strokes as load,GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,GLYPHWIKI_BATCH1347_RUNTIME_APPLIED,GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL}from'./hanja-stroke-dictionary-glyphwiki-batch1347.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1347 미등록 loader 의미동일성·정확source결박과 실제변조음성',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1347.json'),asset=json('public/hanja-strokes/glyphwiki/u5bd8.json'),cache=json('docs/hanja-source-cache-u5bd8-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u5bd8.json')))
 assert.deepEqual(bundle[0].outlines,cache.strokes);assert.equal(sha(JSON.stringify(cache.strokes)),"09d0c9e1a5d83a69b0e1e0715ca375759bf5ef205da91a54b97a8a9924e951cc")
 assert.deepEqual(asset.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u5bd8.json'));assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u5bd8.json')),"56562fc1898b65d7101b8ccf89cb3ebb9f65623c6dd876b286eda83dbe21b223")
 assert.deepEqual(asset.sourceGroups,cache.sourceGroups);assert.deepEqual(asset.sourceIdentity,cache.identity);assert.equal(asset.preparationHistory.runtimeApplied,false)
 assert.equal(asset.records.length,6);assert.deepEqual(asset.exactInterRawJoins,[[2,3],[7,8]]);assert.equal(asset.independentMaskPolicies.length,1)
 assert.equal(GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1347_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL,true);assert(Object.isFrozen(EXPECTED[0].outlines![2][0].bounds))
 const reordered=bundle.map((b:any)=>Object.fromEntries(Object.entries(b).reverse()));assert.deepEqual(load(reordered),EXPECTED)
 for(const args of[[],[bundle,{}]])assert.throws(()=>Reflect.apply(load,null,args))
 for(const mutate of[(b:any)=>b[0].glyph='wrong',(b:any)=>b[0].outlines[2][0].weight++,(b:any)=>b[0].outlines[2][0].revealPath+=' ',(b:any)=>b[0].outlines[4][0].bounds[0]++,(b:any)=>b[0].sourceStrokeIndices.reverse(),(b:any)=>b[0].paths[0]+=' ',(b:any)=>b[0].nativeApproval=true]){
  const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))
 }
 const sparse=clone(bundle);delete sparse[0].outlines[2][0];assert.throws(()=>load(sparse))
 const inherited=clone(bundle),m=inherited[0].outlines[2][0],weight=m.weight;delete m.weight;Object.setPrototypeOf(m,{weight});assert.throws(()=>load(inherited))
 let reads=0;const getter=clone(bundle);Object.defineProperty(getter[0].outlines[2][0],'weight',{enumerable:true,get(){reads++;return weight}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const symbol=clone(bundle);symbol[0][Symbol('extra')]=1;assert.throws(()=>load(symbol));assert.throws(()=>{(EXPECTED[0].outlines![2][0].bounds as number[])[0]++})
})

// New correction tail only; original successful loader/strict negatives are not repeated.
test('1347 source-preserving UP5 and independent VH11 correction',async()=>{
 const c=json('docs/hanja-source-cache-u5bd8-2026-10-22/source.json'),b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1347.json'),a=json('public/hanja-strokes/glyphwiki/u5bd8.json');const m=await import('../docs/hanja-source-cache-u5bd8-2026-10-22/source.mjs'),p=a.engineProof;assert.deepEqual(m.compileProgressive(p.trace,p,c.identity),c.strokes);assert.equal(m.projectionCallCount(),0);assert.equal(m.cachedCorrectionCallCount(),0);assert.deepEqual(load(b),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(c.strokes.length,13);assert.equal(c.strokes.flat().length,15);assert.equal(c.strokes.flat().map((x:any)=>x.outline).join(' ').match(/M/g).length,34);assert.equal(c.geometrySHA256,"09d0c9e1a5d83a69b0e1e0715ca375759bf5ef205da91a54b97a8a9924e951cc");assert.deepEqual(c.strokes[4].map((x:any)=>x.direction),['curve','up']);assert.equal(c.strokes[4][0].weight,73.963568);assert.equal(c.strokes[4][1].weight,6.5);assert.equal(c.strokes[4][0].revealPath,"M24 23.6125 L24 34.504999999999995 Q24 39.504999999999995 29 39.504999999999995 L85 39.504999999999995");assert.deepEqual(c.strokes[10].map((x:any)=>x.direction),['down','right']);assert.deepEqual(c.strokes[10].map((x:any)=>x.weight),[33.415,76.5]);assert(c.strokes[10].every((x:any)=>!Object.hasOwn(x,'revealPath')));assert.equal(sha(JSON.stringify(EXPECTED[0].paths)),"022b4d857548a5c9f8481a660301f73eb7cc9983fbef81c14149ef6646d329e0");assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u5bd8-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u5bd8-2026-10-22/source.json')));assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u5bd8.json')));assert.equal(c.correctionHistory.successfulCachedCorrectionOperations,1);assert.equal(c.nativeApproval,false);assert.equal(a.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,false);
 for(const mutate of[(x:any)=>x[0].outlines[4].pop(),(x:any)=>x[0].outlines[4][1].weight=13,(x:any)=>x[0].outlines[10].reverse(),(x:any)=>x[0].outlines[10][0].direction='curve']){const bad=clone(b);mutate(bad);assert.throws(()=>load(bad));}
 const native=json("docs/hanja-actual-component-profiles-2026-10-22/u5bd8-native-review.json");assert.equal(native.native.validScreens,21);assert.deepEqual(native.native.fullRoundResidual.failurePens,[5,11]);assert.equal(native.historicalInputPinsAtObservation.geometrySHA256,"49d4afb76f69af37ce081c75284251481a203aeb5c2bb51196bc4f2f82f14b04");assert.equal(native.approval.runtimeApplied,false);
})
