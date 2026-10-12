import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import crypto from 'node:crypto'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=name=>JSON.parse(fs.readFileSync(new URL(name,import.meta.url),'utf8'))
const proof=read('engine-proof.json'),trace=read('draw-trace.json'),review=read('terminal5-source-review.json')
const sha=value=>crypto.createHash('sha256').update(value).digest('hex')
const expectedTrace='d7ca87f353cb576b69ad2875512a81697f65dc30d65345418822ed8b2d9f199d'
const expectedGroups='908f52af7d4bf5af67549b1404c96c0d3bf8b0f3646be3007f7fdac956118a35'
const engineHashes={"polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860"}
const revision='49232bac0348fe815f4200d4116ab7917e0db47f'
function originalInputs(t,p){
  assert.equal(sha(JSON.stringify(t)),expectedTrace,'All original trace geometry pinned')
  assert.equal(sha(JSON.stringify(p.groups)),expectedGroups,'All original polygons pinned')
  assert.deepEqual(t,p.trace)
  assert.equal(p.engineRevision,revision)
}
originalInputs(trace,proof)
assert.equal(review.traceSHA256,expectedTrace);assert.equal(review.groupsSHA256,expectedGroups)
assert.deepEqual(review.engineHashes,engineHashes)
assert.equal(review.nativeBrowserApproved,false);assert.equal(review.runtimeApplied,false)
const context=vm.createContext({})
for(const [file,hash] of Object.entries(engineHashes)){
 const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+revision+'/'+file)
 assert(response.ok,'Pinned public source query: '+file)
 const code=await response.text();assert.equal(sha(code),hash,'Pinned public source SHA: '+file)
 vm.runInContext(code,context,{filename:file})
}
const call=trace[10].at(-1)
assert.equal(call.kind,'cdDrawLine');assert.deepEqual(call.args,[126.15,85,174.95,85,3006,5])
const k={kShotai:0,kMincho:0,kMinWidthT:6,kWidth:5,kAdjustMageStep:5,kUseCurve:false}
const polygons=new context.Polygons()
context.cdDrawLine(k,polygons,...call.args)
assert.deepEqual(JSON.parse(JSON.stringify(polygons.array.map(p=>p.array))),call.polygons,'Actual pinned cdDrawLine complete output')
const [x1,y1,x2,y2,ta1,ta2]=call.args
assert(y1===y2&&x1<x2&&ta1%1000===6&&ta2%100===5)
const opt1=Math.floor(ta1/1000),width=k.kMinWidthT-opt1/2,jump=k.kWidth*(4*(1-opt1/k.kAdjustMageStep)+1)
assert.deepEqual({opt1,width,jump},{opt1:3,width:4.5,jump:13})
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const tail=[point(x2,y2-width),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width)]
assert.deepEqual(tail,call.polygons.at(-1));assert.deepEqual(tail,review.originalTailPolygon)
const compiled=compileProgressive(trace,proof)
assert.equal(compiled.length,16);assert.equal(compiled.flat().length,17)
assert.equal(compiled[8].length,2);assert.equal(compiled[8][0].direction,'curve');assert.equal(compiled[8][0].revealWidth,14)
assert.equal(compiled[8][1].direction,'up');assert.equal(compiled[8][1].weight,6.5)
assert.deepEqual(compiled[8][1].bounds,[85.2,33.75,88.45,40.25])
assert.equal('revealPath' in compiled[8][1],false,'No invented tail centerline')
assert(compiled.flat().filter(p=>'revealWidth' in p).every(p=>p.revealWidth===14))
function canonical(points){
 const variants=[]
 for(const p of [points,[...points].reverse()])for(let i=0;i<p.length;i++)variants.push(JSON.stringify([...p.slice(i),...p.slice(0,i)]))
 return variants.sort()[0]
}
function outlinePolygons(outline){return [...outline.matchAll(/M([^Z]+)Z/g)].map(m=>{const nums=m[1].match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);assert(nums.length%2===0);return Array.from({length:nums.length/2},(_,i)=>[nums[i*2],nums[i*2+1]])})}
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(v=>[v.x/2,v.y/2]))).sort()
const rendered=compiled.flatMap(p=>p.flatMap(s=>outlinePolygons(s.outline))).map(canonical).sort()
assert.deepEqual(rendered,original,'All original polygons preserved exactly once after tail separation')
assert.deepEqual(outlinePolygons(compiled[8][1].outline).map(canonical),[canonical(tail.map(v=>[v.x/2,v.y/2]))])
let mutationRejects=0
for(const mutate of [
 (t,p)=>{t[10].at(-1).polygons.at(-1)[1].y-=1;p.groups[10].polygons.at(-1)[1].y-=1},
 (t,p)=>{t[10].at(-1).args[2]+=1},
 (t,p)=>{p.defaults.kWidth+=1},
 (t,p)=>{t[0][0].polygons[0][0].x+=1;p.groups[0].polygons[0][0].x+=1}
]){const t=structuredClone(trace),p=structuredClone(proof);p.trace=t;mutate(t,p);assert.throws(()=>{originalInputs(t,p);compileProgressive(t,p)});mutationRejects++}
const alteredTail=structuredClone(trace),alteredProof=structuredClone(proof);alteredTail[10].at(-1).polygons.at(-1)[1].y-=1;alteredProof.groups[10].polygons.at(-1)[1].y-=1
assert.throws(()=>compileProgressive(alteredTail,alteredProof),'Compiler rejects modified original tail')
console.log(JSON.stringify({status:'PASS',verification:'Public pinned-source query, actual engine execution and outline identity; browser approval pending',pens:compiled.length,masks:compiled.flat().length,curveMasks:compiled.flat().filter(p=>p.direction==='curve').length,originalPolygons:original.length,preservedPolygons:rendered.length,mutationRejects:mutationRejects+1,tailDirection:'up',tailWeight:6.5,newCenterline:false,privateMediaUsed:false,runtimeApplied:false,nativeBrowserApproved:false}))
