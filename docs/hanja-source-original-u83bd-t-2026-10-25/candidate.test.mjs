import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,sourceGroups,sourceProposal,selectedProofIdentity,nativeApproved,runtimeApplied} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex')
test('莽 sourcegate: original body3/raw11/draw12/P25 preserved as eleven pens and twelve masks',()=>{
 const f=read('fixtures.json')['u83bd-t'],p=read(selectedProofIdentity.sourceProofFile)
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,p);assert.deepEqual(f.sourceProposal,sourceProposal)
 assert.deepEqual(Object.keys(p).sort(),['defaults','groups','trace'])
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,p.groups.length,p.trace.flat().length,p.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[11,12,11,12,25])
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[7],[8],[9],[10],[4],[5],[6]])
 assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:11},(_,i)=>i))
 const expected=p.groups.flatMap(g=>g.polygons.map(poly=>JSON.stringify(poly.map(v=>[v.x,v.y]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])))).sort()
 const actual=f.strokes.flatMap(pen=>pen.flatMap(s=>s.outline.split('M').slice(1).map(d=>{const n=d.match(/-?\d+(?:\.\d+)?/g).map(Number),points=[];for(let i=0;i<n.length;i+=2)points.push([n[i]*2,n[i+1]*2]);return JSON.stringify(points.sort((a,b)=>a[0]-b[0]||a[1]-b[1]))}))).sort()
 assert.deepEqual(actual,expected)
 sourceGroups.forEach((indexes,i)=>{let mask=0;for(const index of indexes)for(const c of p.trace[index]){
  const s=f.strokes[i][mask++],a=c.args,points=c.polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
  assert.deepEqual(s.bounds,[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)])
  let distance
  if(c.kind==='cdDrawCurve'){assert.equal(s.direction,'curve');assert.equal(s.revealPath,'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2);assert.equal(s.revealWidth,14);distance=Math.hypot(a[4]-a[0],a[5]-a[1])/2}
  else {assert.equal(c.kind,'cdDrawLine');distance=Math.hypot(a[2]-a[0],a[3]-a[1])/2;if(a[0]!==a[2]&&a[1]!==a[3]){assert.equal(s.direction,'curve');assert.equal(s.revealPath,'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2);assert.equal(s.revealWidth,14)}else assert.equal(s.direction,a[0]===a[2]?(a[3]>a[1]?'down':'up'):(a[2]>a[0]?'right':'left'))}
  assert.equal(s.weight,Math.round(distance*1e6)/1e6)
 }})
 assert.equal(f.strokes[9].length,2);assert.equal(f.strokes[9][0].direction,'down');assert.equal(f.strokes[9][1].direction,'curve')
 assert.deepEqual(p.trace[5][0].args.slice(2,4),p.trace[5][1].args.slice(0,2))
 assert.equal(sourceProposal.catalogStrokes,12);assert.equal(sourceProposal.proposedPlaybackStrokes,11)
 assert.equal(sourceProposal.full5Claimed,false);assert.equal(sourceProposal.engineHeaderAdded,false)
 for(const[k,h]of[['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceChecksFile','sourceChecksFileSha256']])assert.equal(sha(readFileSync(new URL(selectedProofIdentity[k],import.meta.url))),selectedProofIdentity[h])
 for(const e of [sourceProposal.dictionaryReview,sourceProposal.staticReview,sourceProposal.wholeReviewReuse])assert.equal(sha(readFileSync(new URL('../../'+e.path,import.meta.url))),e.SHA256)
 assert.equal(sourceProposal.initialContactApproved,false);assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
 console.log(JSON.stringify({sourcegate:true,pens11Masks12Raw11Draw12P25:true,geometrySHA256:sha(JSON.stringify(f.strokes)),positiveProjectionReplay:0}))
})
test('莽 original-body3 binder rejects changed proof/trace/identity without projecting again',()=>{
 const p=read(selectedProofIdentity.sourceProofFile),id=structuredClone(selectedProofIdentity)
 const full5={...p,engineRevision:'invented',engineHashes:{}};assert.throws(()=>compileProgressive(full5.trace,full5,id))
 const changed=structuredClone(p);changed.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(changed.trace,changed,id))
 const wrong={...id,sourceRoot:'u83bd'};assert.throws(()=>compileProgressive(p.trace,p,wrong))
 const reversed=structuredClone(p.trace);reversed[5].reverse();assert.throws(()=>compileProgressive(reversed,p,id))
 let reads=0;const getter=structuredClone(id);Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){reads++;return'u83bd-t'}});assert.throws(()=>compileProgressive(p.trace,p,getter));assert.equal(reads,0)
 assert.throws(()=>compileProgressive(p.trace,p,id,null))
 console.log(JSON.stringify({negative:6,getterReads:reads,positiveProjectionReplay:0}))
})
