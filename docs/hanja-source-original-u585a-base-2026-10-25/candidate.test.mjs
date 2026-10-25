import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {sourceGroups,selectedProofIdentity,compileProgressive,sourceProposal,nativeApproved,runtimeApplied} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u585a
const proof=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url)))
const sha=x=>createHash('sha256').update(x).digest('hex')
assert.deepEqual(f.fullProof,proof)
assert.deepEqual(f.identity,selectedProofIdentity)
assert.equal(sha(JSON.stringify(f.strokes)),'2cccc641c770be0c780c628cfff7f2bcb80497bb79743b7c84e99b2fe225881b')
assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i))
assert.deepEqual([f.strokes.length,f.strokes.flat().length,f.strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[12,14,26])
const points=poly=>poly.map(p=>[p.x/2,p.y/2].join(',')).sort()
for(const[pen,indices]of sourceGroups.entries()){
 const calls=indices.flatMap(i=>proof.trace[i]);assert.equal(f.strokes[pen].length,calls.length)
 for(const[mask,call]of calls.entries()){
  const segment=f.strokes[pen][mask],rendered=segment.outline.split(/(?=M)/).filter(Boolean).map(part=>part.match(/-?\d+(?:\.\d+)?/g).map(Number)).map(a=>Array.from({length:a.length/2},(_,i)=>a.slice(i*2,i*2+2).join(',')).sort())
  assert.deepEqual(rendered,call.polygons.map(points));assert(segment.weight>0)
  if(call.kind==='cdDrawCurve'){
   const a=call.args;assert.equal(segment.revealPath,`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`);assert.equal(segment.revealWidth,14);assert.equal(segment.direction,'curve')
  }else{assert.equal(call.kind,'cdDrawLine');assert(['right','left','up','down'].includes(segment.direction))}
 }
}
// The single positive projection created fixtures.json. Reuse its pinned result;
// the following calls fail before compileOriginal and do not project again.
const clone=x=>JSON.parse(JSON.stringify(x));let negative=0
for(const change of [
 ()=>compileProgressive(proof.trace,proof,{...f.identity,sourceRoot:'foreign'}),
 ()=>compileProgressive(proof.trace,{...proof,engineRevision:'synthetic'},f.identity),
 ()=>{const trace=clone(proof.trace);trace[0][0].args[0]+=1;compileProgressive(trace,proof,f.identity)},
 ()=>compileProgressive(proof.trace,proof),
]){assert.throws(change);negative++}
let reads=0;const getter=clone(proof);Object.defineProperty(getter,'groups',{enumerable:true,get(){reads++;return proof.groups}});assert.throws(()=>compileProgressive(proof.trace,getter,f.identity));assert.equal(reads,0);negative++
assert.equal(sourceProposal.catalogStrokes,13);assert.equal(sourceProposal.proposedPlaybackStrokes,12);assert.equal(sourceProposal.sourceStaticMappingApproved,true);assert.equal(sourceProposal.sourceCurvePathsApproved,false);assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
console.log(JSON.stringify({glyph:'塚',fixturePens:12,masks:14,P:26,raw13EachOnce:true,originalPGuideOrderPreserved:true,negative,getterReads:reads,sourceProjection:0,engine:0,actualNative:false}))
