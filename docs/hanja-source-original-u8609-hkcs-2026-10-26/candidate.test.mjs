import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal,nativeApproved,runtimeApplied} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).hkcs_m8609
const clone=x=>JSON.parse(JSON.stringify(x)),digest=x=>createHash('sha256').update(x).digest('hex')
const pointSet=xs=>xs.map(p=>JSON.stringify(p)).sort()
test('蘉 fixture retains the exact original25raw and explicit original-order swap/25calls/40P once',()=>{
 assert.deepEqual(f.identity,selectedProofIdentity)
 assert.equal(digest(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))),f.identity.sourceProofFileSha256)
 assert.deepEqual(f.fullProof,JSON.parse(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))))
 assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),Array.from({length:25},(_,i)=>i));assert.deepEqual(sourceGroups.slice(2,4),[[3],[2]])
 assert.equal(f.strokes.length,20);assert.equal(f.strokes.flat().length,25)
 assert.equal(digest(JSON.stringify(f.strokes)),'36c6d68c80e42dd733c2a293a9cbf7f4dd5e72f15d1e9fd5c4109b4253ab19b2')
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
 assert.equal(calls,25);assert.equal(polygons,40)
 assert.equal(f.strokes.flat().filter(s=>s.direction==='curve').length,7)
 assert.equal(sourceProposal.directOriginalDirectionFrames,60)
 assert.equal(sourceProposal.sourceGeometryChanged,false);assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
})
test('蘉 rejects identity, metadata, P/Q, header and reflective mutations before positive projection',()=>{
 const cases=[]
 const identity=clone(f.identity);identity.sourceRoot='u8609';cases.push([f.fullProof.trace,f.fullProof,identity])
 const metadata=clone(f.fullProof);metadata.groups[4].raw[0]+=1;cases.push([metadata.trace,metadata,f.identity])
 const polygon=clone(f.fullProof);polygon.groups[0].polygons[0][0].x+=0.1;cases.push([polygon.trace,polygon,f.identity])
 const trace=clone(f.fullProof);trace.trace[0][0].args[0]+=0.1;cases.push([trace.trace,trace,f.identity])
 const shortened=clone(f.fullProof);shortened.groups.splice(4,1);shortened.trace.splice(4,1);cases.push([shortened.trace,shortened,f.identity])
 const extra=clone(f.fullProof);extra.unreviewed=true;cases.push([extra.trace,extra,f.identity])
 const prototype=clone(f.fullProof);Object.setPrototypeOf(prototype,{});cases.push([prototype.trace,prototype,f.identity])
 let getterCalls=0;const accessor=clone(f.fullProof);Object.defineProperty(accessor,'defaults',{enumerable:true,get(){getterCalls++;return f.fullProof.defaults}});cases.push([accessor.trace,accessor,f.identity])
 for(const args of cases)assert.throws(()=>compileProgressive(...args))
 assert.equal(getterCalls,0)
})
