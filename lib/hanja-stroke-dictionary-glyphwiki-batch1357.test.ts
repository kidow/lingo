import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1357_STROKES as EXPECTED,loadGlyphWikiBatch1357Strokes as load,GLYPHWIKI_BATCH1357_NATIVE_APPROVAL,GLYPHWIKI_BATCH1357_RUNTIME_APPLIED,GLYPHWIKI_BATCH1357_ASSIGNMENT_PROVISIONAL} from './hanja-stroke-dictionary-glyphwiki-batch1357.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1357 fixed source: actual full5, original20P and independent QB9',async()=>{
 const fixed=json('docs/hanja-source-cache-u8fea-k-2026-10-22/source.json'),c={...fixed,strokes:fixed.baselineStrokes??fixed.strokes,geometrySHA256:fixed.baselineGeometrySHA256??fixed.geometrySHA256,preparation:fixed.baselinePreparation??fixed.preparation},a=json('public/hanja-strokes/glyphwiki/u8fea-k.json'),p=json('docs/hanja-public-glyphwiki-engine-capture-u8fea-k-2026-10-22/engine-whole-u8fea-k.json'),m=await import('../docs/hanja-source-cache-u8fea-k-2026-10-22/source.mjs')
 assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-u8fea-k-2026-10-22/engine-whole-u8fea-k.json')),'e35bcc0a2a9ce973de3a1f11e8c38a1dd074b93cfe1599aeeb125067cd59c7ba');assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(a.engineProof,p)
 assert.deepEqual(m.compileProgressive(p.trace,p,c.identity),fixed.strokes);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.projectionCallCount(),0)
 assert.equal(c.strokes.length,9);assert.equal(c.strokes.flat().length,10);assert.equal(c.geometrySHA256,'9b7ad70e6b8a0c4ea7543431c1b6d5b21aeed00a9b2f6896ad07ea3737b150be');assert.equal(sha(JSON.stringify(c.strokes)),c.geometrySHA256)
 assert.deepEqual(c.sourceGroups,[[6],[7,8],[9],[10],[11],[0],[1],[2,3],[4,5]]);assert.deepEqual(c.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:12},(_,i)=>i))
 const path=(poly:any[])=>{assert(poly.every(v=>v.off===0));const area=poly.reduce((n,v,i)=>{const q=poly[(i+1)%poly.length];return n+v.x*q.y-q.x*v.y},0);assert.notEqual(area,0);const a=area<0?[poly[0],...poly.slice(1).reverse()]:poly;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
 const originals=p.trace.flatMap((r:any[])=>r.flatMap(x=>x.polygons)).map(path).sort(),emitted=c.strokes.flat().flatMap((m:any)=>m.outline.match(/M[^M]+/g).map((s:string)=>s.trim())).sort();assert.equal(originals.length,20);assert.deepEqual(emitted,originals)
 for(const [pen,raw]of [[2,[7,8]],[8,[2,3]]] as const){const v=p.trace[raw[0]][0].args,w=p.trace[raw[1]][0].args;assert.deepEqual(v.slice(2,4),w.slice(0,2));assert.equal(c.strokes[pen-1].length,1);assert.equal(c.strokes[pen-1][0].revealPath,`M${v[0]/2} ${v[1]/2} L${v[2]/2} ${v[3]/2} L${w[2]/2} ${w[3]/2}`)}
 const q=p.trace[4][0],b=p.trace[5][0];assert.equal(q.kind,'cdDrawCurve');assert.equal(b.kind,'cdDrawBezier');assert.deepEqual(b.args.slice(0,2).map((v:number,i:number)=>v-q.args[4+i]),[-2,-2]);assert.equal(c.strokes[8].length,2)
 for(const [i,raw] of [[0,4],[1,5]])assert.equal(c.strokes[8][i].outline,p.trace[raw].flatMap((x:any)=>x.polygons).map(path).join(' '))
 assert.deepEqual(c.strokes[8].map((m:any)=>m.revealPath.match(/[MLQC]/g).join('')),['MQ','MC']);assert(c.strokes[8].every((m:any)=>m.revealWidth===14))
 assert.equal(c.preparation.successfulPureProjectionOperations,1);assert.equal(c.preparation.newTerminalDerivations,0);assert.equal(c.preparation.engineRuns,0);assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u8fea-k-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u8fea-k-2026-10-22/source.json')))
 for(const field of ['nativeApproval','directionApproved','temporalOrderApproved','actualAppUI','runtimeApplied'])assert.equal(c[field],false)
 const bad=clone(p);bad.trace[5][0].args[0]++;assert.throws(()=>m.compileProgressive(bad.trace,bad,c.identity));assert.throws(()=>m.compileProgressive(p.trace,p,{...c.identity,root:'wrong'}));assert.throws(()=>Reflect.apply(m.compileProgressive,null,[p.trace,p]));assert.throws(()=>m.captureProjection(p.trace,p,c.identity));assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.projectionCallCount(),0)
})
test('1357 provisional loader: semantic JSON and strict source fields',()=>{
 const b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1357.json'),c=json('docs/hanja-source-cache-u8fea-k-2026-10-22/source.json'),a=json('public/hanja-strokes/glyphwiki/u8fea-k.json')
 assert.deepEqual(load(b),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u8fea-k.json')));assert.equal(EXPECTED[0].pathsSha256,sha(JSON.stringify(EXPECTED[0].paths)));assert.equal(a.records.length,3);assert.equal(a.missingReferences.length,0)
 const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reorder(x)])):v;assert.deepEqual(load(reorder(b)),EXPECTED)
 for(const change of [(x:any)=>x[0].glyph='wrong',(x:any)=>x[0].outlines[8].reverse(),(x:any)=>x[0].outlines[8][1].weight++,(x:any)=>x[0].outlines[1][0].revealPath+=' ',(x:any)=>x[0].outlines[0][0].bounds[0]++,(x:any)=>x[0].sourceStrokeIndices.reverse(),(x:any)=>x[0].nativeApproval=true]){const x=clone(b);change(x);assert.notDeepEqual(x,b);assert.throws(()=>load(x))}
 const sparse=clone(b);delete sparse[0].outlines[8][1];assert.throws(()=>load(sparse));let reads=0;const getter=clone(b);Object.defineProperty(getter[0].outlines[8][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(getter));assert.equal(reads,0);assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[b,0]));assert(Object.isFrozen(EXPECTED[0].outlines![8][1].bounds))
 assert.equal(GLYPHWIKI_BATCH1357_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1357_RUNTIME_APPLIED,false);assert.equal(GLYPHWIKI_BATCH1357_ASSIGNMENT_PROVISIONAL,true);assert.equal(a.preparationHistory.runtimeApplied,false)
})

test('1357 terminal23 changed tail: exact union and original capsule coverage',async()=>{
 const c=json('docs/hanja-source-cache-u8fea-k-2026-10-22/source.json'),a=json('public/hanja-strokes/glyphwiki/u8fea-k.json'),b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1357.json'),p=a.engineProof,m=await import('../docs/hanja-source-cache-u8fea-k-2026-10-22/source.mjs'),k=c.cachedCorrection
 const before=m.cachedPositiveCallCount();assert.deepEqual(m.compileProgressive(p.trace,p,c.identity),c.strokes);assert.equal(m.cachedPositiveCallCount(),before+1);assert.equal(m.projectionCallCount(),0);assert.equal(m.cachedCorrectionCallCount(),0)
 assert.equal(c.strokes.length,9);assert.equal(c.strokes.flat().length,11);assert.equal(c.geometrySHA256,'bd5f197f8e5fa156722ac07fc475d319f3e8a47b779dd688698990c2bb3d5eed');assert.equal(sha(JSON.stringify(c.strokes)),c.geometrySHA256)
 for(let i=0;i<9;i++)if(i!==1)assert.deepEqual(c.strokes[i],c.baselineStrokes[i])
 const [body,tail]=c.strokes[1],old=c.baselineStrokes[1][0]
 for(const key of ['revealPath','revealWidth','direction','weight'])assert.equal(body[key],old[key])
 assert.deepEqual(body.bounds,[40.9,24.55,92.05,76.2]);assert.deepEqual(tail,{outline:'M89.55 76.2 L83.55 79.2 L83.55 76.2 Z',bounds:[83.55,76.2,89.55,79.2],direction:'down',weight:3})
 assert.deepEqual(p.trace[8][0].args,[173.125,56.15,173.125,144.425,22,23]);assert.deepEqual(k.originalQuad,p.trace[8][0].polygons[0]);assert.deepEqual(k.cutPoint,{x:167.1,y:152.4,off:0});assert.equal(k.bodyTailBoundary,89.7625/(89.7625+3))
 const scale=(v:number)=>{const [i,f='']=String(v).split('.'),d=10n**BigInt(f.length),n=BigInt(i+f)*40n;assert.equal(n%d,0n);return n/d},pt=(v:any)=>[scale(v.x),scale(v.y)]
 const area2=(p:bigint[][])=>{const n=p.reduce((s,v,i)=>{const q=p[(i+1)%p.length];return s+v[0]*q[1]-q[0]*v[1]},0n);return n<0n?-n:n}
 const q=k.originalQuad.map(pt),r=k.bodyRectangle.map(pt),tr=k.tailTriangle.map(pt),E=pt(k.cutPoint)
 assert.deepEqual(E,[6684n,6096n]);assert.equal(E[0],q[2][0]);assert.equal(E[1],q[1][1]);assert(q[3][1]<E[1]&&E[1]<q[2][1])
 assert.equal(area2(q),3813120n);assert.equal(area2(r),3697920n);assert.equal(area2(tr),115200n);assert.equal(area2(q),area2(r)+area2(tr))
 // The cut is the horizontal section of the original convex quad: interiors are disjoint.
 assert(r.every((v:bigint[])=>v[1]<=E[1]));assert(tr.every((v:bigint[])=>v[1]>=E[1]))
 const dist2=(v:bigint[],s:bigint[],e:bigint[])=>{assert(s[0]===e[0]||s[1]===e[1]);const clamp=(x:bigint,a:bigint,b:bigint)=>x<(a<b?a:b)?(a<b?a:b):x>(a>b?a:b)?(a>b?a:b):x;const x=clamp(v[0],s[0],e[0]),y=clamp(v[1],s[1],e[1]);return(v[0]-x)**2n+(v[1]-y)**2n}
 const U=[3275n,2246n],J=[6925n,2246n],T=[6925n,5777n],R2=313600n
 for(const v of r)assert(dist2(v,J,T)<R2)
 for(const v of p.trace[8][0].polygons[1].map(pt))assert(dist2(v,J,J)<R2)
 for(const v of p.trace[7][0].polygons[0].map(pt))assert(dist2(v,U,J)<R2)
 // Each rectangle/head/H polygon is in its convex capsule/disc; the old tail witness is outside.
 assert.equal(dist2([6700n,6320n],J,T),345474n);assert(345474n>R2)
 const path=(poly:any[])=>{const signed=poly.reduce((s,v,i)=>{const w=poly[(i+1)%poly.length];return s+v.x*w.y-w.x*v.y},0),v=signed<0?[poly[0],...poly.slice(1).reverse()]:poly;return v.map((p,i)=>(i?'L':'M')+p.x/2+' '+p.y/2).join(' ')+' Z'}
 const original=p.trace.flatMap((v:any[])=>v.flatMap(x=>x.polygons)).map(path),expected=[...original];expected.splice(expected.indexOf(path(k.originalQuad)),1,path(k.bodyRectangle),path(k.tailTriangle))
 const fragments=c.strokes.flat().flatMap((s:any)=>s.outline.match(/M[^M]+/g).map((v:string)=>v.trim()));assert.equal(original.length,20);assert.equal(fragments.length,21);assert.deepEqual(fragments.sort(),expected.sort())
 assert.deepEqual(a.sourcePreservation,c.sourcePreservation);assert.equal(a.sourcePreservation.original20PolygonsUnionPreserved,true);assert.equal(a.sourcePreservation.newExternalInk,false)
 assert.deepEqual(load(b),EXPECTED);assert.deepEqual(b[0].outlines,c.strokes);assert.equal(b[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u8fea-k.json')));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)))
 assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u8fea-k-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u8fea-k-2026-10-22/source.json')))
 for(const mutate of [(x:any)=>x[0].outlines[1].reverse(),(x:any)=>x[0].outlines[1][0].revealPath+=' ',(x:any)=>x[0].outlines[1][1].weight++,(x:any)=>x[0].outlines[1][0].bounds[3]++]){const x=clone(b);mutate(x);assert.notDeepEqual(x,b);assert.throws(()=>load(x))}
 assert.equal(c.preparation.newCachedCorrectionOperations,1);assert.equal(c.preparation.engineRuns,0);assert.equal(c.nativeApproval,false);assert.equal(a.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1357_NATIVE_APPROVAL,false)
})
