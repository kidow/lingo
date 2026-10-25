import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal,nativeApproved,runtimeApplied} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).hkcs_m8b92
const clone=x=>JSON.parse(JSON.stringify(x)),digest=x=>createHash('sha256').update(x).digest('hex')
const pointSet=xs=>xs.map(p=>JSON.stringify(p)).sort()
test('讒 fixture retains the exact original31raw and consumes all30 drawing raws/34calls/63P once',()=>{
 assert.deepEqual(f.identity,selectedProofIdentity)
 assert.equal(digest(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))),f.identity.sourceProofFileSha256)
 assert.deepEqual(f.fullProof,JSON.parse(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))))
 assert.deepEqual(f.fullProof.groups[4],{raw:[0,...Array(10).fill(null)],polygons:[]});assert.deepEqual(f.fullProof.trace[4],[])
 assert.deepEqual(sourceGroups.flat(),Array.from({length:31},(_,i)=>i).filter(i=>i!==4))
 assert.equal(f.strokes.length,24);assert.equal(f.strokes.flat().length,34)
 assert.equal(digest(JSON.stringify(f.strokes)),'3e0339d807e7bc697bed53420f88ff3fc52048df340c1d658c483898c6f406eb')
 let calls=0,polygons=0
 for(const [pen,indices]of sourceGroups.entries()){
  let mask=0
  for(const raw of indices)for(const call of f.fullProof.trace[raw]){
   const segment=f.strokes[pen][mask++],points=[...segment.outline.matchAll(/[ML](-?[0-9.eE+-]+) (-?[0-9.eE+-]+)/g)].map(m=>[Number(m[1]),Number(m[2])])
   assert.deepEqual(pointSet(points),pointSet(call.polygons.flat().map(p=>[p.x/2,p.y/2])),'only original normalized P points')
   assert.equal((segment.outline.match(/M/g)||[]).length,call.polygons.length)
   assert(Number.isFinite(segment.weight)&&segment.weight>0)
   calls++;polygons+=call.polygons.length
  }
  assert.equal(mask,f.strokes[pen].length)
 }
 assert.equal(calls,34);assert.equal(polygons,63)
 assert.equal(f.strokes.flat().filter(s=>s.direction==='curve').length,10)
 assert.equal(sourceProposal.directOriginalDirectionFrames,72)
 assert.equal(sourceProposal.sourceGeometryChanged,false);assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
})
test('讒 rejects identity, metadata, P/Q, header and reflective mutations before positive projection',()=>{
 const cases=[]
 const identity=clone(f.identity);identity.sourceRoot='u8b92';cases.push([f.fullProof.trace,f.fullProof,identity])
 const metadata=clone(f.fullProof);metadata.groups[4].raw[0]=1;cases.push([metadata.trace,metadata,f.identity])
 const polygon=clone(f.fullProof);polygon.groups[0].polygons[0][0].x+=0.1;cases.push([polygon.trace,polygon,f.identity])
 const trace=clone(f.fullProof);trace.trace[0][0].args[0]+=0.1;cases.push([trace.trace,trace,f.identity])
 const shortened=clone(f.fullProof);shortened.groups.splice(4,1);shortened.trace.splice(4,1);cases.push([shortened.trace,shortened,f.identity])
 const extra=clone(f.fullProof);extra.unreviewed=true;cases.push([extra.trace,extra,f.identity])
 const prototype=clone(f.fullProof);Object.setPrototypeOf(prototype,{});cases.push([prototype.trace,prototype,f.identity])
 let getterCalls=0;const accessor=clone(f.fullProof);Object.defineProperty(accessor,'defaults',{enumerable:true,get(){getterCalls++;return f.fullProof.defaults}});cases.push([accessor.trace,accessor,f.identity])
 for(const args of cases)assert.throws(()=>compileProgressive(...args))
 assert.equal(getterCalls,0)
})
