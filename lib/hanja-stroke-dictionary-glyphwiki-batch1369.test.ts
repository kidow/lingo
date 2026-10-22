import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1369_STROKES as ENTRY,loadGlyphWikiBatch1369Strokes as load,GLYPHWIKI_BATCH1369_NATIVE_APPROVAL,GLYPHWIKI_BATCH1369_RUNTIME_APPLIED} from './hanja-stroke-dictionary-glyphwiki-batch1369.ts'
import {compileProgressive,compileSourceWhole,captureProjection,selectedProofIdentity,projectionCallCount,cachedPositiveCallCount} from '../docs/hanja-source-cache-u85e9-k-2026-10-22/source.mjs'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1369 new cached source: original36P exactly once, QQ7 gap and exact HV16 retained',()=>{
 const c=json('docs/hanja-source-cache-u85e9-k-2026-10-22/source.json'),p=json('docs/hanja-public-glyphwiki-engine-capture-u85e9-k-2026-10-22/engine-whole-u85e9-k.json')
 assert.equal(projectionCallCount(),0);assert.deepEqual(compileProgressive(p.trace,p,selectedProofIdentity),c.strokes);assert.equal(cachedPositiveCallCount(),1);assert.equal(c.strokes.length,19);assert.equal(c.strokes.flat().length,20);assert.equal(sha(JSON.stringify(c.strokes)),c.geometrySHA256)
 assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(p.groups.length,21);assert.equal(p.trace.flat().length,21)
 assert.deepEqual(c.sourceGroups,[[0],[1],[3],[2],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17],[19],[20],[18]])
 const path=(poly:any[])=>{const area=poly.reduce((n,v,i)=>{const q=poly[(i+1)%poly.length];return n+v.x*q.y-q.x*v.y},0),a=area<0?[poly[0],...poly.slice(1).reverse()]:poly;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
 const original=p.trace.flatMap((r:any[])=>r.flatMap(v=>v.polygons)).map(path).sort(),emitted=c.strokes.flat().flatMap((m:any)=>m.outline.match(/M[^M]+/g).map((s:string)=>s.trim())).sort();assert.equal(original.length,36);assert.deepEqual(emitted,original)
 for(let pen=0;pen<c.sourceGroups.length;pen++){const polys=c.sourceGroups[pen].flatMap((raw:number)=>p.groups[raw].polygons).map(path).sort(),actual=c.strokes[pen].flatMap((m:any)=>m.outline.match(/M[^M]+/g).map((s:string)=>s.trim())).sort();assert.deepEqual(actual,polys)}
 assert.equal(c.strokes[6].length,2);for(let i=0;i<2;i++){const q=p.trace[6+i][0].args,m=c.strokes[6][i];assert.equal(m.outline,p.trace[6+i][0].polygons.map(path).join(' '));assert.equal(m.revealPath,'M'+q[0]/2+' '+q[1]/2+' Q'+q[2]/2+' '+q[3]/2+' '+q[4]/2+' '+q[5]/2);assert.equal(m.revealWidth,14)}
 assert.deepEqual(c.sourcePreservation.QQ7.endpointGapSourceUnits,[-3.9750000000000014,-24.935600000000022]);assert.equal(c.sourcePreservation.QQ7.temporalContinuityApproved,false)
 assert.deepEqual(p.trace[16][0].args.slice(2,4),p.trace[17][0].args.slice(0,2));assert.equal(c.strokes[15][0].revealPath,'M43.3275 66.7 L84.33 66.7 L84.33 86.84');assert.equal(c.strokes[15][0].revealWidth,14);assert.equal(c.strokes[14][0].direction,'down');assert.equal(c.strokes[14][0].revealPath,undefined)
 assert.equal(c.terminalReview.newTailSplit,0);assert.equal(c.preparation.successfulPureProjectionOperations,1);assert.equal(c.preparation.engineRuns,0);assert.equal(c.nativeApproval,false)
 const code=bytes('docs/hanja-source-cache-u85e9-k-2026-10-22/source.mjs').toString(),body=code.slice(code.indexOf('function compileBound('),code.indexOf('\n\nlet projectionRuns')).trimEnd();assert.equal(sha(body),'f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038')
 const wrongs=[(x:any)=>delete x.engineHashes,(x:any)=>x.trace[6][0].args[0]+=1,(x:any)=>x.trace[7][0].polygons[0][0].x+=.1,(x:any)=>x.defaults.kWidth+=1,(x:any)=>x.groups.reverse()]
 for(const mutate of wrongs){const q=clone(p);mutate(q);assert.notDeepEqual(q,p);assert.throws(()=>compileProgressive(q.trace,q,selectedProofIdentity))}
 const id={...selectedProofIdentity,root:'u85e9'};assert.notDeepEqual(id,selectedProofIdentity);assert.throws(()=>compileProgressive(p.trace,p,id))
 const sparse=clone(p.trace);delete sparse[6];assert.throws(()=>compileProgressive(sparse,p,selectedProofIdentity))
 assert.throws(()=>compileProgressive(p.trace,p,selectedProofIdentity,0));assert.throws(()=>compileSourceWhole('u85e9',p.trace,p,selectedProofIdentity));assert.throws(()=>captureProjection(p.trace,p,selectedProofIdentity));assert.equal(projectionCallCount(),0)
})
test('1369 strict loader: frozen candidate, actual payload alterations rejected, still unregistered',()=>{
 const b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1369.json'),c=json('docs/hanja-source-cache-u85e9-k-2026-10-22/source.json'),pub=json('public/hanja-strokes/glyphwiki/u85e9-k.json')
 assert.deepEqual(load(b),ENTRY);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert.equal(b[0].glyph,'藩');assert.equal(b[0].paths.length,19);assert.deepEqual(b[0].outlines,c.strokes);assert.equal(b[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u85e9-k.json')));assert.equal(b[0].pathsSha256,sha(JSON.stringify(b[0].paths)));assert.equal(pub.records.length,7);assert.deepEqual(pub.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-u85e9-k-2026-10-22/engine-whole-u85e9-k.json'));assert.equal(pub.preparationHistory.nativeApproval,false);assert.equal(GLYPHWIKI_BATCH1369_NATIVE_APPROVAL,false);assert.equal(GLYPHWIKI_BATCH1369_RUNTIME_APPLIED,false)
 const negatives=[(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].outlines[6].reverse(),(x:any)=>x[0].outlines[6][1].weight+=1,(x:any)=>x[0].outlines[15][0].revealWidth+=1,(x:any)=>x[0].outlines[14][0].bounds[3]-=1,(x:any)=>x[0].sourceStrokeIndices[16]=19,(x:any)=>x[0].geometrySource='wrong',(x:any)=>x[0].glyph='番',(x:any)=>x[0].extra=true]
 for(const mutate of negatives){const q=clone(b);mutate(q);assert.notDeepEqual(q,b);assert.throws(()=>load(q))}
 const hole=clone(b);delete hole[0].outlines[6][1];assert.throws(()=>load(hole));const inherited=clone(b),m=inherited[0].outlines[6][1],w=m.weight;delete m.weight;Object.setPrototypeOf(m,{weight:w});assert.throws(()=>load(inherited))
 assert.throws(()=>load());assert.throws(()=>load(b,b));assert.throws(()=>load(null))
})
