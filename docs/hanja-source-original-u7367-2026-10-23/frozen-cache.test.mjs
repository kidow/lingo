import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {ORIGINAL_U7367 as s} from './source-context.mjs'
import {compileProgressive,captureGeometry,sourceCompileCallCount,cachedPositiveCallCount} from './candidate.mjs'
const clone=x=>JSON.parse(JSON.stringify(x)),sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
function cycle(points){const keys=points.map(p=>p[0]+','+p[1]),variants=[];for(const a of[keys,keys.slice().reverse()])for(let i=0;i<a.length;i++)variants.push([...a.slice(i),...a.slice(0,i)].join('|'));return variants.sort()[0]}
test('獧 frozen first compile retains all 34 source polygons and the exact independent LQ gap',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).u7367
 const out=compileProgressive(s.trace,s.fullProof,s.identity);assert.deepEqual(out,f.strokes);assert.equal(cachedPositiveCallCount(),1);assert.equal(sourceCompileCallCount(),0)
 assert.equal(sha(out),'b9962c915ff58b78e9ec44abd27d615be5525696c35d03707799b64bdb61fe88')
 const actual=out.flat().flatMap(m=>[...m.outline.matchAll(/M([^Z]+)Z/g)].map(match=>{const n=match[1].split(/[ML\s]+/).filter(Boolean).map(Number);assert(n.every(Number.isFinite));return cycle(Array.from({length:n.length/2},(_,i)=>[n[i*2]*2,n[i*2+1]*2]))})).sort()
 const original=s.fullProof.groups.flatMap(g=>g.polygons).map(p=>cycle(p.map(v=>[v.x,v.y]))).sort()
 assert.deepEqual(actual,original);assert.equal(actual.length,34)
 assert.equal(out.length,16);assert.equal(out.flat().length,17);assert.equal(out[13][0].direction,'down');assert.equal(out[13][0].revealPath,undefined);assert.equal(out[13][1].revealPath,'M42.925 90.5 Q56.150000000000006 86 71.675 79')
 assert.deepEqual(f.sourceGroups[13],[15,16]);assert.deepEqual(f.fullProof,s.fullProof);assert.deepEqual(f.identity,s.identity)
 assert.throws(()=>captureGeometry(s.trace,s.fullProof,s.identity),/first compile already frozen/);assert.equal(sourceCompileCallCount(),0)
 let negatives=1
 for(const mutate of[x=>{x.proof.groups[0].extra=true},x=>{x.proof.engineHashes['2d.js']='bad'},x=>{x.trace[10][0].args[4]+=.1},x=>{x.identity.root='u8627'}]){const x={trace:clone(s.trace),proof:clone(s.fullProof),identity:clone(s.identity)};mutate(x);assert.throws(()=>compileProgressive(x.trace,x.proof,x.identity));negatives++}
 let reads=0;const getter=clone(s.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){reads++;return s.fullProof.groups}});assert.throws(()=>compileProgressive(s.trace,getter,s.identity));assert.equal(reads,0);negatives++
 assert.equal(cachedPositiveCallCount(),1);assert.equal(sourceCompileCallCount(),0)
 for(const k of['nativeApproval','runtimeApplied','registered'])assert.equal(f[k],false)
 console.log(JSON.stringify({frozenCachePass:true,newCachePositive:1,negativeCases:negatives,accessorReads:reads,originalPolygonCycles:34,pens:16,masks:17,compiledAgain:0,engine:0,nativeApproval:false}))
})

