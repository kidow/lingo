import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,sourceCompileCallCount,cachedPositiveCallCount} from './candidate.mjs'
const json=n=>JSON.parse(readFileSync(new URL(n,import.meta.url))),sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),copy=x=>JSON.parse(JSON.stringify(x))
test('u6705 cached header4 trace context',()=>{
 const f=json('./fixtures.json').u6705,h=json(f.identity.headerFile),tr=json(f.identity.traceFile),s=compileProgressive(tr,h,f.identity)
 assert.deepEqual(Object.keys(h).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(f.headerProof,h);assert.deepEqual(f.originalTrace,tr);assert.equal(Object.keys(h.engineHashes).length,8)
 assert.equal(sha(s),'29cffb3c3ddc0456d34e0fe55b9ffa966cff7470f47d6e80a5f729e545524c4d');assert.deepEqual([s.length,s.flat().length],[14,15]);assert.equal(f.sourceGeometryGenerations,1);assert.equal(sourceCompileCallCount(),0);assert.equal(cachedPositiveCallCount(),1)
 assert.equal(s[3].length,2);assert.equal(s[3][0].revealPath,'M24.525 48 Q21.125 61.5 12.625 83.5');assert.equal(s[3][1].revealPath,'M7.525 84 Q19.85 80.5 36.85 74.5');assert.equal(s[3][0].revealWidth,14);assert.equal(s[3][1].revealWidth,14)
})
test('u6705 failed tail: original polygon cycles and four context negatives',()=>{
 const f=json('./fixtures.json').u6705,h=json(f.identity.headerFile),tr=json(f.identity.traceFile),s=f.strokes
 const canonical=pts=>{const a=pts.map(p=>p.join(',')),variants=[];for(const x of [a,a.slice().reverse()])for(let i=0;i<x.length;i++)variants.push(x.slice(i).concat(x.slice(0,i)).join(';'));return variants.sort()[0]}
 const raw=tr.flatMap(r=>r.flatMap(c=>c.polygons)).map(p=>canonical(p.map(v=>[v.x/2,v.y/2]))).sort()
 const actual=s.flat().flatMap(m=>m.outline.split(/ Z(?: |$)/).filter(Boolean).map(poly=>canonical(poly.trim().split(/ [ML]/).map(x=>x.replace(/^[ML]/,'').split(' ').map(Number))))).sort()
 assert.equal(raw.length,37);assert.deepEqual(actual,raw)
 const badH=copy(h);badH.defaults.kWidth++;assert.throws(()=>compileProgressive(tr,badH,f.identity))
 const badT=copy(tr);badT[0][0].args[0]++;assert.throws(()=>compileProgressive(badT,h,f.identity))
 const badID=copy(f.identity);badID.root='u7e58';assert.throws(()=>compileProgressive(tr,h,badID))
 const fake5=copy(h);fake5.trace=tr;assert.throws(()=>compileProgressive(tr,fake5,f.identity))
 assert.equal(sourceCompileCallCount(),0);assert.equal(f.nativeApproval,false);assert.equal(f.runtimeApplied,false)
 console.log(JSON.stringify({fixedCache:true,pens:14,masks:15,P:37,headerKeys:4,traceSeparate:true,enginePins:8,independentPen:4,negative:4,geometryGenerationInTest:0,engine:0,nativeApproval:false}))
})
