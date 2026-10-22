import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1372_STROKES as ENTRY,loadGlyphWikiBatch1372Strokes as load,GLYPHWIKI_BATCH1372_RUNTIME_APPLIED}from'./hanja-stroke-dictionary-glyphwiki-batch1372.ts'
import{compileSourceWhole,captureProjection,selectedProofIdentity,projectionCallCount,cachedPositiveCallCount}from'../docs/hanja-source-cache-u7494-2026-10-22/source.mjs'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v));
test('1372 fixed source 16p17m32 exact polygons and independent HQ6',()=>{
 const c=json('docs/hanja-source-cache-u7494-2026-10-22/source.json'),p=json('docs/hanja-public-glyphwiki-engine-capture-u7494-2026-10-22/engine-whole-u7494.json'),id=clone(selectedProofIdentity);
 assert.equal(projectionCallCount(),0);assert.deepEqual(compileSourceWhole('u7494',p.trace,p,id),c.strokes);assert.equal(cachedPositiveCallCount(),1);
 assert.equal(c.strokes.length,16);assert.equal(c.strokes.flat().length,17);assert.equal(c.strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0),32);
 assert.deepEqual(c.sourceGroups,[[0],[2],[1],[3],[4],[5,6],[7],[8,9],[10],[12],[13],[11],[14],[15,16],[17],[18]]);
 const canonical=(a:number[][])=>{const variants=[];for(const o of[a,[...a].reverse()])for(let i=0;i<a.length;i++)variants.push(JSON.stringify(o.slice(i).concat(o.slice(0,i))));return variants.sort()[0]};
 const expected=p.groups.flatMap((g:any)=>g.polygons.map((poly:any[])=>canonical(poly.map(q=>[q.x/2,q.y/2])))).sort(),actual=c.strokes.flat().flatMap((m:any)=>[...m.outline.matchAll(/M([^Z]+)Z/g)].map((x:any)=>canonical([...x[1].matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map((v:any)=>[Number(v[1]),Number(v[2])])))).sort();assert.deepEqual(actual,expected);
 assert.equal(c.strokes[5].length,2);assert.equal(c.strokes[5][0].direction,'right');assert.equal(c.strokes[5][0].revealPath,undefined);assert.equal(c.strokes[5][0].weight,22.275);assert.equal(c.strokes[5][1].revealPath,'M74.2125 12.5 Q78.9375 27 91.0875 33.5');assert.equal(c.strokes[5][1].revealWidth,14);assert.equal(c.strokes[5][1].weight,26.940038);
 assert.equal(c.strokes[7].length,1);assert.equal(c.strokes[13].length,1);assert.equal(c.strokes[7][0].revealPath,'M43.66875 34.230112 L83.83125 34.230112 L83.83125 53.90108799999999');assert.equal(c.strokes[13][0].revealPath,'M48.25875 63.4512 L79.24125000000001 63.4512 L79.24125000000001 86.7888');
 for(const [pen,raw]of[[6,7],[12,14]]){const m=c.strokes[pen][0],ps=p.groups[raw].polygons.flat();assert.equal(m.direction,'down');assert.equal(m.revealPath,undefined);assert.deepEqual(m.bounds,[Math.min(...ps.map((v:any)=>v.x/2)),Math.min(...ps.map((v:any)=>v.y/2)),Math.max(...ps.map((v:any)=>v.x/2)),Math.max(...ps.map((v:any)=>v.y/2))])}
 assert.equal(c.sourcePreservation.HVFullCapsuleSufficientConditions.length,2);assert(c.sourcePreservation.HVFullCapsuleSufficientConditions.every((r:any)=>r.polygons.every((v:any)=>v.allVerticesStrictlyInsideOwnSourceCapsuleR14)));
 assert.throws(()=>captureProjection(p.trace,p,id));for(const mutate of[(q:any)=>q.engineRevision+='x',(q:any)=>q.trace[6][0].args[0]++,(q:any)=>q.groups[9].polygons[0][0].x++,(q:any)=>q.defaults.kWidth++]){const bad=clone(p);mutate(bad);assert.throws(()=>compileSourceWhole('u7494',bad.trace,bad,id))}
 const badid=clone(id);badid.root='u7494-k';assert.throws(()=>compileSourceWhole('u7494',p.trace,p,badid));assert.equal(projectionCallCount(),0);assert.equal(cachedPositiveCallCount(),1);
})
test('1372 strict public loader and historical pending status',()=>{
 const b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1372.json'),a=json('public/hanja-strokes/glyphwiki/u7494.json'),c=json('docs/hanja-source-cache-u7494-2026-10-22/source.json');
 assert.deepEqual(load(b),ENTRY);assert.deepEqual(ENTRY[0].outlines,c.strokes);assert.equal(ENTRY[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u7494.json')));
 assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u7494-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u7494-2026-10-22/source.json')));
 assert.equal(a.records.length,8);assert.equal(a.engineProof.trace.length,19);assert.deepEqual(a.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-u7494-2026-10-22/engine-whole-u7494.json'));assert.equal(a.sourceProofShape.actualFull5,true);assert.equal(a.sourceProofShape.headerSynthesized,false);
 assert.equal(a.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1372_RUNTIME_APPLIED,false);
 for(const args of[[],[b,0]])assert.throws(()=>Reflect.apply(load,null,args));
 for(const mutate of[(q:any)=>q[0].glyph='x',(q:any)=>q[0].outlines[5].reverse(),(q:any)=>q[0].outlines[7][0].weight++,(q:any)=>q[0].outlines[12][0].bounds[3]++]){const bad=clone(b);mutate(bad);assert.throws(()=>load(bad))}
 const sparse=clone(b);delete sparse[0].outlines[5][1];assert.throws(()=>load(sparse));const inherited=clone(b),m=inherited[0].outlines[5][1],w=m.weight;delete m.weight;Object.setPrototypeOf(m,{weight:w});assert.throws(()=>load(inherited));assert(Object.isFrozen(ENTRY[0].outlines![5][0].bounds));
})
