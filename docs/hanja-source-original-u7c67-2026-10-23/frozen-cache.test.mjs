import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {ORIGINAL_U7C67 as s} from './source-context.mjs'
import {compileProgressive,captureGeometry,sourceCompileCallCount,cachedPositiveCallCount} from './candidate.mjs'
const clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
function cycle(points){const keys=points.map(p=>p[0]+','+p[1]),variants=[];for(const a of[keys,keys.slice().reverse()])for(let i=0;i<a.length;i++)variants.push([...a.slice(i),...a.slice(0,i)].join('|'));return variants.sort()[0]}
test('籧 frozen first compile retains all 60 source polygons and the exact independent QB gap',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u7c67
 const out=compileProgressive(s.trace,s.fullProof,s.identity);assert.deepEqual(out,f.strokes);assert.equal(cachedPositiveCallCount(),1);assert.equal(sourceCompileCallCount(),0)
 assert.equal(sha(out),'71dd8ca53d86c8808365b831f3b65df0a6d6b50b22c7a6311ede12740518e287')
 const actual=out.flat().flatMap(m=>[...m.outline.matchAll(/M([^Z]+)Z/g)].map(match=>{const n=match[1].split(/[ML\s]+/).filter(Boolean).map(Number);assert(n.every(Number.isFinite));return cycle(Array.from({length:n.length/2},(_,i)=>[n[i*2]*2,n[i*2+1]*2]))})).sort()
 const original=s.fullProof.groups.flatMap(g=>g.polygons).map(p=>cycle(p.map(v=>[v.x,v.y]))).sort()
 assert.deepEqual(actual,original);assert.equal(actual.length,60)
 assert.equal(out.length,23);assert.equal(out.flat().length,24);assert.deepEqual(out[22].map(m=>m.revealPath),['M8 91.3375 Q17.5 86.8 27.5 81.025','M26.5 80.2 C34 88.45 42 92.1625 89.5 90.5125'])
 assert.deepEqual(f.sourceGroups[22],[10,11]);assert.deepEqual(f.fullProof,s.fullProof);assert.deepEqual(f.identity,s.identity)
 assert.throws(()=>captureGeometry(s.trace,s.fullProof,s.identity),/Frozen cache exists/);assert.equal(sourceCompileCallCount(),0)
 let negatives=1
 for(const mutate of[x=>{x.proof.groups[0].extra=true},x=>{x.proof.engineHashes['2d.js']='bad'},x=>{x.trace[10][0].args[4]+=.1},x=>{x.identity.root='u8627'}]){const x={trace:clone(s.trace),proof:clone(s.fullProof),identity:clone(s.identity)};mutate(x);assert.throws(()=>compileProgressive(x.trace,x.proof,x.identity));negatives++}
 let reads=0;const getter=clone(s.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){reads++;return s.fullProof.groups}});assert.throws(()=>compileProgressive(s.trace,getter,s.identity));assert.equal(reads,0);negatives++
 assert.equal(cachedPositiveCallCount(),1);assert.equal(sourceCompileCallCount(),0)
 for(const k of['nativeApproval','runtimeApplied','registered'])assert.equal(f[k],false)
 console.log(JSON.stringify({frozenCachePass:true,newCachePositive:1,negativeCases:negatives,accessorReads:reads,originalPolygonCycles:60,pens:23,masks:24,compiledAgain:0,engine:0,nativeApproval:false}))
})
