import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal,nativeApproved,runtimeApplied} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u56ac_g
const edges=points=>points.map((a,i)=>[a,points[(i+1)%points.length]].map(p=>p.join(',')).sort().join('|')).sort()
const splitPolys=outline=>outline.split(' Z').map(s=>[...s.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map(m=>[Number(m[1]),Number(m[2])])).filter(x=>x.length)
test('u56ac-g cached source projection preserves all original P edges and Q/ML call order',()=>{
 assert.deepEqual(sourceGroups,[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]])
 assert.equal(f.strokes.length,19);assert.equal(f.strokes.flat().length,21);assert.equal(f.strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),36)
 assert.equal(createHash('sha256').update(JSON.stringify(f.strokes)).digest('hex'),'3aa23536479df3d6c8a3b43f634d2977ce428edf6ca31cb49bdfdbe922a49d46')
 for(const [pen,raws]of sourceGroups.entries()){
  const calls=raws.flatMap(i=>f.fullProof.trace[i]);assert.equal(calls.length,f.strokes[pen].length)
  calls.forEach((call,i)=>{
   const s=f.strokes[pen][i],polys=splitPolys(s.outline);assert.equal(polys.length,call.polygons.length)
   call.polygons.forEach((poly,j)=>assert.deepEqual(edges(polys[j]),edges(poly.map(v=>[v.x/2,v.y/2]))))
   assert(s.weight>0&&Number.isFinite(s.weight));const points=polys.flat();assert.deepEqual(s.bounds,[Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))])
   if(call.kind==='cdDrawCurve'){const a=call.args;assert.equal(s.revealPath,'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2);assert.equal(s.revealWidth,14)}
   else if(call.args[0]!==call.args[2]&&call.args[1]!==call.args[3]){const a=call.args;assert.equal(s.revealPath,'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2);assert.equal(s.revealWidth,14)}
  })
 }
 assert.equal(sourceProposal.sourceGuideReversed,false);assert.equal(sourceProposal.sourceStaticMappingApproved,true);assert.equal(sourceProposal.initialContactApproved,false);assert.equal(sourceProposal.allFramesApproved,false)
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
 console.log(JSON.stringify({cachedProjectionOnly:true,newProjection:0,originalEdges:36,callOrder:21}))
})
test('u56ac-g source gate rejects altered proof, trace, identity and getter before projection',()=>{
 assert.deepEqual(f.identity,selectedProofIdentity)
 const p=structuredClone(f.fullProof);p.engineRevision='wrong';assert.throws(()=>compileProgressive(p.trace,p,f.identity))
 const g=structuredClone(f.fullProof);g.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(g.trace,g,f.identity))
 const t=structuredClone(f.fullProof.trace);t[0][0].args[0]++;assert.throws(()=>compileProgressive(t,f.fullProof,f.identity))
 assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,{...f.identity,sourceRoot:'foreign'}))
 let getterReads=0;const accessor=structuredClone(f.fullProof);Object.defineProperty(accessor,'groups',{enumerable:true,get(){getterReads++;return f.fullProof.groups}});assert.throws(()=>compileProgressive(f.fullProof.trace,accessor,f.identity));assert.equal(getterReads,0)
 assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,f.identity,'extra'))
 console.log(JSON.stringify({negativeBeforeProjection:6,getterReads,newProjection:0,engine:0}))
})
