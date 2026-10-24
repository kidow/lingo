import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,sourceGroups,sourceProposal,selectedProofIdentity,nativeApproved,runtimeApplied} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex')
test('逭 base DRAFT12 preserves all17raw17calls28P and the original nonliteral final gap',()=>{
 const f=read('fixtures.json').u902d,p=read(selectedProofIdentity.sourceProofFile)
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,p);assert.deepEqual(f.sourceProposal,sourceProposal)
 assert.deepEqual(Object.keys(p),['engineRevision','engineHashes','groups','trace','defaults'])
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,p.groups.length,p.trace.flat().length,p.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[12,17,17,17,28])
 assert.deepEqual(sourceGroups,[[6],[7],[8,9],[10],[11,12],[13],[14,15],[16],[0],[1],[2,3],[4,5]])
 assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:17},(_,i)=>i))
 assert.equal(sha(JSON.stringify(f.strokes)),'6f03a75cb5d9e9aee3ac646bd98b3e69fffca6b6b7ca7b1b5b4a82b589d30feb')
 const expected=p.groups.flatMap(g=>g.polygons.map(poly=>JSON.stringify(poly.map(v=>[v.x,v.y]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])))).sort()
 const actual=f.strokes.flatMap(pen=>pen.flatMap(s=>s.outline.split('M').slice(1).map(d=>{const n=d.match(/-?\d+(?:\.\d+)?/g).map(Number),points=[];for(let i=0;i<n.length;i+=2)points.push([n[i]*2,n[i+1]*2]);return JSON.stringify(points.sort((a,b)=>a[0]-b[0]||a[1]-b[1]))}))).sort()
 assert.deepEqual(actual,expected)
 for(const[a,b]of[[8,9],[11,12],[14,15],[2,3]])assert.deepEqual(p.trace[a][0].args.slice(2,4),p.trace[b][0].args.slice(0,2))
 assert.deepEqual([p.trace[5][0].args[0]-p.trace[4][0].args[4],p.trace[5][0].args[1]-p.trace[4][0].args[5]],[-2,-2])
 assert.equal(f.strokes[0][0].direction,'down');assert.equal(f.strokes[8][0].revealPath.startsWith('M13.5 10.5 Q'),true)
 assert.equal(f.strokes[11][0].revealPath,'M8 89.5 Q17.5 84 27.5 77');assert.equal(f.strokes[11][1].revealPath,'M26.5 76 C34 86 42 90.5 89.5 88.5')
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
 for(const k of ['sourceStaticMappingApproved','initialContactApproved','allFramesApproved','productionImportAllowed','sourceTimingEquivalent'])assert.equal(sourceProposal[k],false)
 for(const[k,h]of[['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceChecksFile','sourceChecksFileSha256']])assert.equal(sha(readFileSync(new URL(selectedProofIdentity[k],import.meta.url))),selectedProofIdentity[h])
 assert.throws(()=>compileProgressive(p.trace,p,{...f.identity,sourceRoot:'u902d-ue0102'}))
 const trace=structuredClone(p.trace);trace[0][0].args[0]++;assert.throws(()=>compileProgressive(trace,p,f.identity))
 const q=structuredClone(p);q.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(p.trace,q,f.identity))
 let reads=0;const id={...f.identity};Object.defineProperty(id,'sourceRoot',{enumerable:true,get(){reads++;return'u902d'}});assert.throws(()=>compileProgressive(p.trace,p,id));assert.equal(reads,0)
 console.log(JSON.stringify({logical12:true,raw17:true,calls17:true,P28:true,originalPointsOnce:true,negative4:true,positiveProjectionReplayed:0,native:false,runtime:false}))
})
