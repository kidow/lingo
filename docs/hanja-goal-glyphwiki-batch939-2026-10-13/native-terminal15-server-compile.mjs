import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {pathToFileURL} from 'node:url'
const d=process.env.REVIEW_DIR,a=JSON.parse(readFileSync(d+'/native-terminal15-server-audit.json')),sha=x=>createHash('sha256').update(x).digest('hex')
for(const[f,h]of Object.entries(a.inputSHA256))assert.equal(sha(readFileSync(d+'/'+f)),h,'Original/candidate byte pin '+f)
const m=await import(pathToFileURL(d+'/'+a.adapter)),root=process.env.WHOLE_ROOT||a.selectedWhole
assert.equal(root,a.selectedWhole);assert.deepEqual(m.selectedProofIdentity,a.identity);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
const proof=m.buildSourceProof(a.identity)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(sha(JSON.stringify(proof)),a.fullProofSHA256)
const before=JSON.stringify(proof),compile=(t,p,id,whole=root)=>m.compileSourceWhole(whole,t,p,id),out=compile(proof.trace,proof,a.identity)
assert.equal(before,JSON.stringify(proof));assert.equal(sha(JSON.stringify(out)),a.compiledSHA256);assert.equal(out.length,20);assert.equal(out.flat().length,22)
const canonical=poly=>{const p=poly.map(v=>[v.x,v.y]),all=[];for(const x of[p,[...p].reverse()])for(let i=0;i<x.length;i++)all.push(JSON.stringify([...x.slice(i),...x.slice(0,i)]));return all.sort()[0]}
const polygons=outline=>(outline.match(/M[^Z]+Z/g)||[]).map(s=>{const n=s.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:n.length/2},(_,i)=>({x:n[i*2]*2,y:n[i*2+1]*2}))})
const original=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
assert.deepEqual(out.flatMap(p=>p.flatMap(m=>polygons(m.outline))).map(canonical).sort(),original);assert.equal(original.length,46)
const call=proof.trace[2][0];assert.equal(call.kind,'cdDrawCurve');assert.equal(call.args.at(-1),15);assert.equal(call.polygons.length,5);assert.equal(out[2].length,2);assert.equal(out[2][1].direction,'up');assert.equal(out[2][1].weight,proof.defaults.kWidth*5/2);assert.equal(out[2][1].revealPath,undefined)
let rejections=0
if(process.env.CHECK==='1'){
 for(const change of[q=>q.trace[0][0].args[0]+=.1,q=>q.trace[0][0].polygons[0][0].x+=.1,q=>q.groups[0].polygons[0][0].y+=.1,q=>q.defaults.kWidth+=.1,q=>q.engineRevision='changed',q=>q.engineHashes['2d.js']='changed']){const q=structuredClone(proof);change(q);assert.throws(()=>compile(q.trace,q,a.identity));rejections++}
 for(const field of Object.keys(a.identity)){assert.throws(()=>compile(proof.trace,proof,{...a.identity,[field]:'changed'}));rejections++}
 assert.throws(()=>compile(proof.trace,proof,null));rejections++;assert.throws(()=>compile(proof.trace,proof,a.identity,'unsupported'));rejections++
 const q=structuredClone(proof);q.trace[2][0].polygons.at(-1)[0].x+=.1;assert.throws(()=>compile(q.trace,q,a.identity));rejections++;assert.equal(rejections,14)
}
console.log(JSON.stringify({sourceRoot:root,pens:out.length,masks:out.flat().length,originalPolygons:original.length,polygonExactOnce:true,inputImmutable:true,compiledSHA256:sha(JSON.stringify(out)),identity:a.identity,rejections,finePens:out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:out.flatMap((p,i)=>{const total=p.reduce((n,m)=>n+m.weight,0);let cumulative=0;return p.slice(0,-1).map((m,k)=>{cumulative+=m.weight;return{pen:i+1,mask:k+2,start:cumulative/total,weights:p.map(m=>m.weight),nativeReviewed:false}})}),nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:m.renderProgressive.toString()}))

