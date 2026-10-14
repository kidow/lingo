import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {pathToFileURL} from 'node:url'
const d=process.env.REVIEW_DIR,a=JSON.parse(readFileSync(d+'/native-var001-input-pins.json')),sha=x=>createHash('sha256').update(x).digest('hex')
for(const[f,h]of Object.entries(a.inputSHA256))assert.equal(sha(readFileSync(d+'/'+f)),h,'Exact original/candidate pin '+f)
const m=await import(pathToFileURL(d+'/'+a.adapter)),root=process.env.WHOLE_ROOT||a.selectedWhole
assert.equal(root,a.selectedWhole);assert.deepEqual(m.selectedProofIdentity,a.identity)
const p=m.buildSourceProof(a.identity),before=JSON.stringify(p),compile=(t,q,id,r=root)=>m.compileSourceWhole(r,t,q,id),out=compile(p.trace,p,a.identity)
assert.equal(JSON.stringify(p),before);assert.equal(sha(JSON.stringify(out)),a.compiledSHA256)
const canonical=poly=>{const p=poly.map(v=>[v.x,v.y]),all=[];for(const x of[p,[...p].reverse()])for(let i=0;i<x.length;i++)all.push(JSON.stringify([...x.slice(i),...x.slice(0,i)]));return all.sort()[0]}
const orig=p.groups.flatMap(g=>g.polygons).map(canonical).sort(),emitted=out.flatMap(p=>p.flatMap(m=>(m.outline.match(/M[^Z]+Z/g)||[]).map(s=>{const n=s.match(/-?\d+(?:\.\d+)?/g).map(Number);return canonical(Array.from({length:n.length/2},(_,i)=>({x:n[i*2]*2,y:n[i*2+1]*2})));}))).sort();assert.deepEqual(emitted,orig)
let rejected=0
if(process.env.CHECK==='1'){
 for(const f of[q=>q.trace[0][0].args[0]+=.1,q=>q.trace[0][0].polygons[0][0].x+=.1,q=>q.groups[0].polygons[0][0].y+=.1,q=>q.defaults.kWidth+=.1,q=>q.engineRevision='changed',q=>q.engineHashes['2d.js']='changed']){const q=structuredClone(p);f(q);assert.throws(()=>compile(q.trace,q,a.identity));rejected++}
 for(const f of Object.keys(a.identity)){assert.throws(()=>compile(p.trace,p,{...a.identity,[f]:'changed'}));rejected++}
 assert.throws(()=>compile(p.trace,p,null));rejected++;assert.throws(()=>compile(p.trace,p,a.identity,'u9046-g'));rejected++
 const q=structuredClone(p);q.sourceRoot='u9046';assert.throws(()=>compile(q.trace,q,a.identity));rejected++;assert.equal(rejected,14)
}
console.log(JSON.stringify({sourceRoot:root,pens:out.length,masks:out.flat().length,originalPolygons:orig.length,polygonExactOnce:true,inputImmutable:true,identity:a.identity,compiledSHA256:a.compiledSHA256,rejections:rejected,finePens:out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:out.flatMap((p,i)=>{let c=0,total=p.reduce((n,m)=>n+m.weight,0);return p.slice(0,-1).map((m,k)=>{c+=m.weight;return{pen:i+1,mask:k+2,start:c/total,weights:p.map(m=>m.weight),nativeReviewed:false}})}),sourceOrder:a.sourceOrder,nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:m.renderProgressive.toString()}))

