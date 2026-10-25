import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,nativeApproved,runtimeApplied} from './candidate.mjs'

const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).hkcs_m61b8
const clone=x=>JSON.parse(JSON.stringify(x))
const digest=x=>createHash('sha256').update(x).digest('hex')

test('憸 fixture retains the exact full5 including three empty metadata rows',()=>{
  assert.deepEqual(f.identity,selectedProofIdentity)
  assert.equal(digest(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))),f.identity.sourceProofFileSha256)
  assert.deepEqual(f.fullProof,JSON.parse(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))))
  for(const index of [6,11,16]){
    assert.deepEqual(f.fullProof.groups[index].raw,[0,...Array(10).fill(null)])
    assert.deepEqual(f.fullProof.groups[index].polygons,[])
    assert.deepEqual(f.fullProof.trace[index],[])
  }
  assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:21},(_,i)=>i).filter(i=>![6,11,16].includes(i)))
  assert.equal(f.strokes.length,16)
  assert.equal(f.strokes.flat().length,18)
  assert.deepEqual(f.strokes[7].map(s=>s.direction),['right','down'])
  assert.deepEqual(f.strokes[10].map(s=>s.direction),['right','down'])
  assert.equal(digest(JSON.stringify(f.strokes)),'4abb872544b8d0eb9ce26886af39f3bdd942e69cba16e102cb66bbae2bd49055')
  assert.equal(nativeApproved,false)
  assert.equal(runtimeApplied,false)
})

test('憸 source gate rejects identity, metadata, polygon, trace and reflective mutations before projection',()=>{
  const cases=[]
  const identity=clone(f.identity);identity.sourceRoot='u61b8';cases.push([f.fullProof.trace,f.fullProof,identity])
  const metadata=clone(f.fullProof);metadata.groups[6].raw[0]=1;cases.push([metadata.trace,metadata,f.identity])
  const polygon=clone(f.fullProof);polygon.groups[1].polygons[0][0].x+=0.1;cases.push([polygon.trace,polygon,f.identity])
  const trace=clone(f.fullProof);trace.trace[1][0].args[0]+=0.1;cases.push([trace.trace,trace,f.identity])
  const shortened=clone(f.fullProof);shortened.groups.splice(6,1);shortened.trace.splice(6,1);cases.push([shortened.trace,shortened,f.identity])
  const extra=clone(f.fullProof);extra.unreviewed=true;cases.push([extra.trace,extra,f.identity])
  const prototype=clone(f.fullProof);Object.setPrototypeOf(prototype,{});cases.push([prototype.trace,prototype,f.identity])
  let getterCalls=0
  const accessor=clone(f.fullProof);Object.defineProperty(accessor,'defaults',{enumerable:true,get(){getterCalls++;return f.fullProof.defaults}});cases.push([accessor.trace,accessor,f.identity])
  for(const args of cases)assert.throws(()=>compileProgressive(...args))
  assert.equal(getterCalls,0)
})
