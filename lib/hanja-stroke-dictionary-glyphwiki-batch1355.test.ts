import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1355_STROKES as EXPECTED,loadGlyphWikiBatch1355Strokes as load,GLYPHWIKI_BATCH1355_NATIVE_APPROVAL,GLYPHWIKI_BATCH1355_RUNTIME_APPLIED,GLYPHWIKI_BATCH1355_ASSIGNMENT_PROVISIONAL} from './hanja-stroke-dictionary-glyphwiki-batch1355.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1355 fixed source: full5 and original63P exact once, independent QB25',async()=>{
 const fixed=json('docs/hanja-source-cache-u7c69-2026-10-22/source.json'),c={...fixed,strokes:fixed.baselineStrokes??fixed.strokes,geometrySHA256:fixed.baselineGeometrySHA256??fixed.geometrySHA256,preparation:fixed.baselinePreparation??fixed.preparation},a=json('public/hanja-strokes/glyphwiki/u7c69.json'),p=json('docs/hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u7c69.json'),m=await import('../docs/hanja-source-cache-u7c69-2026-10-22/source.mjs')
 assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u7c69.json')),'a902211b39ab636e2e7804b5cf6ffe584ad69865e32e7bbb27a3b5598de34721');assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(a.engineProof,p)
 assert.deepEqual(m.compileProgressive(p.trace,p,c.identity),fixed.strokes);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.projectionCallCount(),0)
 assert.equal(c.strokes.length,25);assert.equal(c.strokes.flat().length,26);assert.equal(c.geometrySHA256,'487cd2e28d504e22859e3cac45f985c46b4f6018630ee197701d1b2724b80c1e');assert.equal(sha(JSON.stringify(c.strokes)),c.geometrySHA256)
 assert.deepEqual(c.sourceGroups,[[0],[1],[2],[3],[4],[5],[12],[13],[14,15],[16],[17],[18],[19],[20],[21,22],[23],[24],[25],[26],[27,28],[29],[6],[7],[8,9],[10,11]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:30},(_,i)=>i))
 const path=(poly:any[])=>{assert(poly.every(v=>v.off===0));const area=poly.reduce((n,v,i)=>{const q=poly[(i+1)%poly.length];return n+v.x*q.y-q.x*v.y},0);assert.notEqual(area,0);const a=area<0?[poly[0],...poly.slice(1).reverse()]:poly;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
 const originals=p.trace.flatMap((r:any[])=>r.flatMap(x=>x.polygons)).map(path).sort(),emitted=c.strokes.flat().flatMap((m:any)=>m.outline.match(/M[^M]+/g).map((s:string)=>s.trim())).sort();assert.equal(originals.length,63);assert.deepEqual(emitted,originals)
 assert.deepEqual(c.strokes[24].map((m:any)=>m.revealPath.match(/[MLQC]/g).join('')),['MQ','MC']);assert.equal(c.strokes[24].length,2)
 for(const [i,raw] of [[0,10],[1,11]])assert.equal(c.strokes[24][i].outline,p.trace[raw].flatMap((x:any)=>x.polygons).map(path).join(' '))
 assert.deepEqual(p.trace[10][0].args,[16,180.885,35,171.92,55,160.51,0,7]);assert.deepEqual(p.trace[11][0].args,[53,158.88,68,175.18,84,182.515,179,179.255,7,0])
 for(const [pen,raw]of [[9,[14,15]],[15,[21,22]],[20,[27,28]]] as const){const left=p.trace[raw[0]].at(-1),right=p.trace[raw[1]][0];assert.deepEqual(left.args.slice(left.kind==='cdDrawLine'?2:4,left.kind==='cdDrawLine'?4:6),right.args.slice(0,2));assert.equal(c.strokes[pen-1].length,1);assert.equal(c.strokes[pen-1][0].outline,raw.flatMap(i=>p.trace[i].flatMap((x:any)=>x.polygons)).map(path).join(' '))}
 for(const [pen,raw]of [[17,24],[20,28]])assert(p.trace[raw].at(-1).polygons.every((v:any)=>c.strokes[pen-1][0].outline.includes(path(v))))
 assert.equal(c.preparation.successfulPureProjectionOperations,1);assert.equal(c.preparation.newTerminalDerivations,0);assert.equal(c.preparation.engineRuns,0);assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u7c69-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u7c69-2026-10-22/source.json')))
 for(const field of ['nativeApproval','directionApproved','temporalOrderApproved','actualAppUI','runtimeApplied'])assert.equal(c[field],false)
 const bad=clone(p);bad.trace[28][1].args[5]++;assert.throws(()=>m.compileProgressive(bad.trace,bad,c.identity));assert.throws(()=>m.compileProgressive(p.trace,p,{...c.identity,root:'wrong'}));assert.throws(()=>Reflect.apply(m.compileProgressive,null,[p.trace,p]));assert.throws(()=>m.captureProjection(p.trace,p,c.identity));assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.projectionCallCount(),0)
})
test('1355 provisional loader: semantic JSON and strict source binding',()=>{
 const b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1355.json'),c=json('docs/hanja-source-cache-u7c69-2026-10-22/source.json'),a=json('public/hanja-strokes/glyphwiki/u7c69.json')
 assert.deepEqual(load(b),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u7c69.json')));assert.equal(EXPECTED[0].pathsSha256,sha(JSON.stringify(EXPECTED[0].paths)));assert.equal(a.records.length,10);assert.equal(a.missingReferences.length,0)
 const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reorder(x)])):v;assert.deepEqual(load(reorder(b)),EXPECTED)
 for(const change of [(x:any)=>x[0].glyph='wrong',(x:any)=>x[0].outlines[24].reverse(),(x:any)=>x[0].outlines[24][1].weight++,(x:any)=>x[0].outlines[19][0].revealPath+=' ',(x:any)=>x[0].outlines[16][0].bounds[0]++,(x:any)=>x[0].sourceStrokeIndices.reverse(),(x:any)=>x[0].nativeApproval=true]){const x=clone(b);change(x);assert.notDeepEqual(x,b);assert.throws(()=>load(x))}
 const sparse=clone(b);delete sparse[0].outlines[24][1];assert.throws(()=>load(sparse));let reads=0;const getter=clone(b);Object.defineProperty(getter[0].outlines[19][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(getter));assert.equal(reads,0);assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[b,0]));assert(Object.isFrozen(EXPECTED[0].outlines![24][1].bounds))
 assert.equal(GLYPHWIKI_BATCH1355_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1355_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1355_ASSIGNMENT_PROVISIONAL,true);assert.equal(a.preparationHistory.runtimeApplied,false)
})

test('1355 LEFT20 changed tail: original quad partition and strict bundle',async()=>{
 const c=json('docs/hanja-source-cache-u7c69-2026-10-22/source.json'),a=json('public/hanja-strokes/glyphwiki/u7c69.json'),b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1355.json'),m=await import('../docs/hanja-source-cache-u7c69-2026-10-22/source.mjs')
 const before=m.cachedPositiveCallCount();assert.deepEqual(m.compileProgressive(a.engineProof.trace,a.engineProof,c.identity),c.strokes);assert.equal(m.cachedPositiveCallCount(),before+1);assert.equal(m.projectionCallCount(),0);assert.equal(m.cachedCorrectionCallCount(),0)
 assert.equal(c.strokes.length,25);assert.equal(c.strokes.flat().length,27);assert.equal(c.geometrySHA256,'a318844147f674ab9d14bb25d85060ac665b05ab50aa5a1f629885f0e19a9850');assert.equal(sha(JSON.stringify(c.strokes)),c.geometrySHA256)
 const polys=(s:any[][])=>s.flat().flatMap(m=>m.outline.match(/M[^M]+/g).map((v:string)=>v.trim())).sort();assert.equal(polys(c.strokes).length,63);assert.deepEqual(polys(c.strokes),polys(c.baselineStrokes));for(let i=0;i<25;i++)if(i!==19)assert.deepEqual(c.strokes[i],c.baselineStrokes[i])
 const old=c.baselineStrokes[19][0],body=c.strokes[19][0],tail=c.strokes[19][1]
 for(const key of ['revealPath','revealWidth','weight','direction'])assert.deepEqual(body[key],old[key])
 assert.equal(body.weight,41.539066);assert.equal(body.revealWidth,14);assert.equal(body.outline+' '+tail.outline,old.outline)
 assert.equal(tail.outline,'M69.45 83.8 L59.45 82.3 L59.45 80.8 L69.45 80.8 Z');assert.deepEqual(tail.bounds,[59.45,80.8,69.45,83.8]);assert.equal(tail.direction,'left');assert.equal(tail.weight,10);assert(!Object.hasOwn(tail,'revealPath'))
 assert.deepEqual(a.engineProof.trace[28].at(-1).polygons.at(-1),[{x:138.9,y:167.6,off:0},{x:138.9,y:161.6,off:0},{x:118.9,y:161.6,off:0},{x:118.9,y:164.6,off:0}])
 assert.equal(c.cachedCorrection.successfulCachedCorrectionOperations,1);assert.equal(c.cachedCorrection.wholeProjectionRepeated,0);assert.equal(c.cachedCorrection.engineRuns,0);assert.equal(c.cachedCorrection.newNativeApproval,false);assert.equal(c.preparation.newTerminalDerivations,1);assert.equal(c.baselinePreparation.newTerminalDerivations,0)
 assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u7c69-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u7c69-2026-10-22/source.json')));assert.equal(a.sourcePreservation.UP17Unchanged,true)
 assert.deepEqual(load(b),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u7c69.json')))
 for(const change of [(x:any)=>x[0].outlines[19].reverse(),(x:any)=>x[0].outlines[19][1].weight++,(x:any)=>x[0].outlines[19][0].bounds[0]--,(x:any)=>x[0].outlines[19][0].revealPath+=' ']){const x=clone(b);change(x);assert.notDeepEqual(x,b);assert.throws(()=>load(x))}
 for(const field of ['nativeApproval','actualAppUI','runtimeApplied'])assert.equal(c[field],false)
 assert.equal(GLYPHWIKI_BATCH1355_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1355_RUNTIME_APPLIED,false)
})
