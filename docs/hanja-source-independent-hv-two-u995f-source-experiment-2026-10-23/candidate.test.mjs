import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './candidate.mjs'
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8')),sha=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x))
const config=json('./config.json'),fixture=json('./fixtures.json').u995f,full=json(config.identity.file),mapping=json('../hanja-source-raw-compare-u995f-2026-10-23/native-review.json')
const canonical=points=>{const out=[];for(const row of[points,[...points].reverse()])for(let i=0;i<row.length;i++)out.push(JSON.stringify([...row.slice(i),...row.slice(0,i)]));return out.sort()[0]}
const parse=outline=>outline.split('M').slice(1).map(p=>{const n=(p.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);assert.equal(n.length%2,0);return Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]])})
test('饟 fixed source cache FIRST: complete full5, raw31 once, original52P and independent boundaries',()=>{
 assert.equal(candidate.sourceCompileCallCount(),0)
 assert.deepEqual(fixture.fullProof,full);assert.deepEqual(fixture.identity,config.identity);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(mapping.staticNumberedMappingApprovedByROOT,true);assert.equal(mapping.animationNativeApproval,false)
 assert.deepEqual(fixture.sourceGroups.map(row=>row.map(i=>i+1)),mapping.acceptedLogicalRawMapping)
 assert.deepEqual([...fixture.sourceGroups.flat()].sort((a,b)=>a-b),Array.from({length:31},(_,i)=>i))
 const actual=candidate.compileSourceWhole('u995f',full.trace,full,config.identity)
 assert.deepEqual(actual,fixture.strokes);assert.equal(sha(actual),fixture.geometrySHA256);assert.deepEqual([actual.length,actual.flat().length,actual.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[26,28,52])
 const original=full.groups.flatMap(g=>g.polygons.map(p=>canonical(p.map(q=>[q.x/2,q.y/2])))).sort(),emitted=actual.flatMap(ss=>ss.flatMap(s=>parse(s.outline).map(canonical))).sort();assert.deepEqual(emitted,original)
 assert.deepEqual(actual[22].map(s=>s.direction),['right','curve']);assert.deepEqual(actual[23].map(s=>s.direction),['down','curve']);for(const p of[3,12,15])assert.equal(actual[p].length,1)
 assert.equal(candidate.sourceCompileCallCount(),0);assert.equal(candidate.geometryDerivationCallCount(),0);assert.equal(candidate.cachedPositiveCallCount(),1)
 assert.throws(()=>candidate.compileSourceWhole('u995f-x',full.trace,full,config.identity));assert.throws(()=>candidate.compileSourceWhole('u995f',full.trace,full,{...config.identity,fileSHA256:'0'.repeat(64)}))
 const q=clone(full);q.groups[28].polygons[0][0].x+=.1;assert.throws(()=>candidate.compileSourceWhole('u995f',q.trace,q,config.identity));const t=clone(full);t.trace[27][0].args[0]+=.1;assert.throws(()=>candidate.compileSourceWhole('u995f',t.trace,t,config.identity));assert.equal(candidate.sourceCompileCallCount(),0)
 console.log(JSON.stringify({fixedCache:true,raw31Once:true,P52CoordinatesPreserved:true,exactLL3:true,independentPairs2:true,negative4:true,sourceProjectionThisTest:0,engine:0,nativeApproval:false}))
})
