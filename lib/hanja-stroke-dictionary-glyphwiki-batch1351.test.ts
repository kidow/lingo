import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1351_STROKES as EXPECTED,loadGlyphWikiBatch1351Strokes as load,GLYPHWIKI_BATCH1351_NATIVE_APPROVAL,GLYPHWIKI_BATCH1351_RUNTIME_APPLIED,GLYPHWIKI_BATCH1351_ASSIGNMENT_PROVISIONAL} from './hanja-stroke-dictionary-glyphwiki-batch1351.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1351 source cache: exact whole, static permutation, independent QB and 34 polygons',async()=>{
 const proof=json('docs/hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u9085.json'),cache=json('docs/hanja-source-cache-u9085-2026-10-22/source.json'),asset=json('public/hanja-strokes/glyphwiki/u9085.json'),m=await import('../docs/hanja-source-cache-u9085-2026-10-22/source.mjs')
 assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u9085.json')),'141da37dfebf6ce8b32daaeb052a9074cdc4d2ce239b8803bb554d79b60b3702')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(asset.engineProof,proof)
 assert.deepEqual(m.compileProgressive(proof.trace,proof,cache.identity),cache.strokes);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.projectionCallCount(),0)
 assert.equal(cache.strokes.length,17);assert.equal(cache.strokes.flat().length,18);assert.equal(cache.geometrySHA256,'5798b45122f9077412d9a2e6e5bcea94bc8c541ac1db2c86af0996f708bcbd62');assert.equal(sha(JSON.stringify(cache.strokes)),cache.geometrySHA256)
 assert.deepEqual(cache.sourceGroups,[[6],[7],[12],[13,14],[8],[9,10],[11],[15],[16],[17,18],[19],[20],[21],[0],[1],[2,3],[4,5]])
 assert.deepEqual(cache.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:22},(_,i)=>i));assert.deepEqual(asset.sourceGroups,cache.sourceGroups)
 const outline=(polygon:any[])=>{const area=polygon.reduce((s,v,i)=>{const n=polygon[(i+1)%polygon.length];return s+v.x*n.y-n.x*v.y},0);assert.notEqual(area,0);const p=area<0?[polygon[0],...polygon.slice(1).reverse()]:polygon;return p.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
 const originals=proof.trace.flatMap((r:any[])=>r.flatMap(x=>x.polygons)).map(outline).sort(),emitted=cache.strokes.flat().flatMap((x:any)=>x.outline.match(/M[^M]+/g).map((p:string)=>p.trim())).sort()
 assert.equal(originals.length,34);assert.deepEqual(emitted,originals);assert.deepEqual(proof.trace.map((r:any[])=>r.flatMap(x=>x.polygons)),proof.groups.map((g:any)=>g.polygons))
 for(const [pen,indices]of [[4,[13,14]],[6,[9,10]],[10,[17,18]],[16,[2,3]]] as const){const a=proof.trace[indices[0]][0].args,b=proof.trace[indices[1]][0].args;assert.deepEqual(a.slice(2,4),b.slice(0,2));assert.equal(cache.strokes[pen-1].length,1);assert.equal(cache.strokes[pen-1][0].revealPath,`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2} L${b[2]/2} ${b[3]/2}`);assert.equal(cache.strokes[pen-1][0].revealWidth,14)}
 const q=proof.trace[4][0],b=proof.trace[5][0],last=cache.strokes[16];assert.equal(q.kind,'cdDrawCurve');assert.equal(b.kind,'cdDrawBezier');assert.deepEqual(b.args.slice(0,2).map((v:number,i:number)=>v-q.args[4+i]),[-2,-2]);assert.equal(last.length,2)
 assert.equal(last[0].revealPath,`M${q.args[0]/2} ${q.args[1]/2} Q${q.args[2]/2} ${q.args[3]/2} ${q.args[4]/2} ${q.args[5]/2}`);assert.equal(last[1].revealPath,`M${b.args[0]/2} ${b.args[1]/2} C${b.args[2]/2} ${b.args[3]/2} ${b.args[4]/2} ${b.args[5]/2} ${b.args[6]/2} ${b.args[7]/2}`);assert(last.every((x:any)=>x.revealWidth===14))
 assert.equal(asset.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u9085-2026-10-22/source.mjs')));assert.equal(asset.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u9085-2026-10-22/source.json')))
 for(const k of ['nativeApproval','directionApproved','temporalOrderApproved','actualAppUI','runtimeApplied'])assert.equal(cache[k],false)
 assert.equal(cache.preparation.successfulPureProjectionOperations,1);assert.equal(cache.preparation.engineRuns,0);assert.equal(cache.preparation.newTerminalDerivations,0)
 const badTrace=clone(proof.trace);badTrace[5][0].args[0]++;assert.throws(()=>m.compileProgressive(badTrace,proof,cache.identity))
 const badProof=clone(proof);badProof.groups[0].polygons[0][0].x++;assert.throws(()=>m.compileProgressive(badProof.trace,badProof,cache.identity))
 assert.throws(()=>m.compileProgressive(proof.trace,proof,{...cache.identity,root:'wrong'}));assert.throws(()=>Reflect.apply(m.compileProgressive,null,[proof.trace,proof]));assert.throws(()=>m.captureProjection(proof.trace,proof,cache.identity));assert.equal(m.projectionCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
})
test('1351 provisional loader: semantic equality, strict own fields and no approval inheritance',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1351.json'),asset=json('public/hanja-strokes/glyphwiki/u9085.json'),cache=json('docs/hanja-source-cache-u9085-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,cache.strokes);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u9085.json')));assert.equal(EXPECTED[0].pathsSha256,sha(JSON.stringify(EXPECTED[0].paths)))
 const reordered=(v:any):any=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v;assert.deepEqual(load(reordered(bundle)),EXPECTED)
 assert.equal(GLYPHWIKI_BATCH1351_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1351_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1351_ASSIGNMENT_PROVISIONAL,true);assert.equal(asset.preparationHistory.runtimeApplied,false)
 assert.equal(asset.records.length,9);assert.equal(asset.missingReferences.length,0);assert.deepEqual(asset.exactInterRawJoins,[[13,14],[9,10],[17,18],[2,3]]);assert.deepEqual(asset.independentMaskPolicies[0].gapSourceUnits,[-2,-2])
 for(const mutate of[(v:any)=>v[0].glyph='wrong',(v:any)=>v[0].outlines[16].reverse(),(v:any)=>v[0].outlines[16][1].revealPath+=' ',(v:any)=>v[0].outlines[16][0].weight++,(v:any)=>v[0].outlines[3][0].revealWidth++,(v:any)=>v[0].sourceStrokeIndices.reverse(),(v:any)=>v[0].nativeApproval=true]){const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))}
 assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[bundle,0]));const sparse=clone(bundle);delete sparse[0].outlines[16][1];assert.throws(()=>load(sparse))
 let reads=0;const getter=clone(bundle);Object.defineProperty(getter[0].outlines[16][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(getter));assert.equal(reads,0);assert(Object.isFrozen(EXPECTED[0].outlines![16][1].bounds))
})
