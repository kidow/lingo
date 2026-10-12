import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import crypto from 'node:crypto'
import {compileProgressive} from './progressive.mjs'
import {compileTerminal15Evidence} from './terminal15-candidate-evidence.mjs'
const proof=JSON.parse(fs.readFileSync(new URL('engine-proof.json',import.meta.url)))
const trace=JSON.parse(fs.readFileSync(new URL('draw-trace.json',import.meta.url)))
const sha=v=>crypto.createHash('sha256').update(v).digest('hex')
const revision='49232bac0348fe815f4200d4116ab7917e0db47f'
assert.equal(proof.engineRevision,revision)
const expectedHashes={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
assert.deepEqual(proof.engineHashes,expectedHashes)
const context=vm.createContext({})
for(const file of ['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js']){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+revision+'/'+file)
 assert(response.ok,'Pinned public source query: '+file)
 const code=await response.text();assert.equal(sha(code),expectedHashes[file]);vm.runInContext(code,context,{filename:file})
}
const k=new context.Kage()
for(const raw of [6,8,11]){
 const call=trace[raw][0],polygons=new context.Polygons()
 context[call.kind](k,polygons,...call.args)
 assert.deepEqual(JSON.parse(JSON.stringify(polygons.array.map(p=>p.array))),call.polygons,'Actual pinned engine complete terminal output: '+raw)
}
assert.deepEqual(JSON.parse(JSON.stringify([k.kMinWidthT,k.kWidth,k.kAdjustKakatoL,k.kAdjustKakatoR])),[6,5,[14,9,5,2,0],[8,6,4,2]])
const baseline=compileProgressive(trace,proof),candidate=compileTerminal15Evidence(trace,proof)
assert.equal(baseline.length,13);assert.equal(baseline.flat().length,13)
assert.equal(candidate.length,13);assert.equal(candidate.flat().length,14)
for(let i=0;i<baseline.length;i++)if(i!==10)assert.deepEqual(candidate[i],baseline[i],'Other pen unchanged')
assert.equal(baseline[6][0].direction,'down');assert.deepEqual(baseline[6][0].bounds,[42.05,36.5,48.05,71])
assert.equal(candidate[10][0].revealPath,baseline[10][0].revealPath);assert.equal(candidate[10][0].revealWidth,14)
assert.equal(candidate[10][1].direction,'up');assert.equal(candidate[10][1].weight,13)
assert.deepEqual(candidate[10][1].bounds,[87.65,74.5,91.65,87.5])
function canonical(points){const vars=[];for(const p of [points,[...points].reverse()])for(let i=0;i<p.length;i++)vars.push(JSON.stringify([...p.slice(i),...p.slice(0,i)]));return vars.sort()[0]}
function outlines(d){return [...d.matchAll(/M([^Z]+)Z/g)].map(m=>{const n=m[1].match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);return Array.from({length:n.length/2},(_,i)=>[n[i*2],n[i*2+1]])})}
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(v=>[v.x/2,v.y/2]))).sort()
for(const c of [baseline,candidate])assert.deepEqual(c.flatMap(s=>s.flatMap(p=>outlines(p.outline))).map(canonical).sort(),original,'All original polygons preserved exactly once')
let mutationRejects=0
for(const change of [(t,p)=>{t[11][0].polygons.at(-1)[1].y-=1;p.groups[11].polygons.at(-1)[1].y-=1},(t,p)=>{t[11][0].args[9]=5},(t,p)=>{p.defaults.kWidth+=1},(t,p)=>{t[0][0].polygons[0][0].x+=1;p.groups[0].polygons[0][0].x+=1}]){
 const t=structuredClone(trace),p=structuredClone(proof);change(t,p);assert.throws(()=>compileTerminal15Evidence(t,p));mutationRejects++
}
function lineDistance(q,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((q[0]-a[0])*dx+(q[1]-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(q[0]-a[0]-t*dx,q[1]-a[1]-t*dy)/2}
const linePaths=[[[90.19,81],[120.88,81]],[[120.88,81],[120.88,122]]]
const pen8MaxVertexDistance=Math.max(...[7,8].flatMap(i=>trace[i].flatMap(c=>c.polygons.flat())).map(p=>Math.min(...linePaths.map(([a,b])=>lineDistance([p.x,p.y],a,b)))))
assert(pen8MaxVertexDistance<7)
const bezierArgs=trace[11][0].args
function cubic(t){const s=1-t;return [0,1].map(k=>s*s*s*bezierArgs[k]+3*s*s*t*bezierArgs[k+2]+3*s*t*t*bezierArgs[k+4]+t*t*t*bezierArgs[k+6])}
function nearestCubic(q){
 const dist2=t=>{const p=cubic(t);return (p[0]-q[0])**2+(p[1]-q[1])**2}
 let best=0;const count=8192
 for(let i=1;i<=count;i++)if(dist2(i/count)<dist2(best/count))best=i
 let low=Math.max(0,(best-1)/count),high=Math.min(1,(best+1)/count)
 for(let i=0;i<80;i++){const l=low+(high-low)/3,r=high-(high-low)/3;if(dist2(l)<dist2(r))high=r;else low=l}
 return Math.sqrt(dist2((low+high)/2))/2
}
const terminal=trace[11][0]
const pen11TipDistances=terminal.polygons.at(-1).slice(1,3).map(p=>nearestCubic([p.x,p.y]))
const pen11BodyMaxVertexDistance=Math.max(...terminal.polygons.slice(0,-1).flat().map(p=>nearestCubic([p.x,p.y])))
assert(pen11TipDistances.every(d=>d>7));assert(pen11BodyMaxVertexDistance<7)
const pen7FinalSliver=(baseline[6][0].bounds[3]-baseline[6][0].bounds[1])*.0001
console.log(JSON.stringify({status:'PASS',verification:'Public fixed-source execution and numerical geometry evidence; native browser pending',baselinePens:baseline.length,baselineMasks:baseline.flat().length,candidatePens:candidate.length,candidateMasks:candidate.flat().length,originalPolygons:original.length,preservedPolygons:original.length,mutationRejects,unchangedOtherPens:12,tailDirection:'up',tailWeight:13,sourceBranch:'cdDrawCurveU terminal15, not cdDrawLine terminal5',pen7FinalSliver,pen8MaxVertexDistance,pen11TipDistances,pen11BodyMaxVertexDistance,distanceMethod:'Numerical 8192 samples plus 80 bracket refinements; geometric evidence, not a browser observation',newCenterline:false,privateMediaUsed:false,runtimeApplied:false,nativeBrowserApproved:false}))
