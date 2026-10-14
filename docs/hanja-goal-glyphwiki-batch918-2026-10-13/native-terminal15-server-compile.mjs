import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {pathToFileURL} from 'node:url'
const d=process.env.REVIEW_DIR
const audit=JSON.parse(readFileSync(d+'/native-terminal15-server-audit.json'))
const sha=x=>createHash('sha256').update(x).digest('hex')
for(const[f,pin]of Object.entries(audit.inputSHA256))assert.equal(sha(readFileSync(d+'/'+f)),pin,'Pinned original/candidate input '+f)
const m=await import(pathToFileURL(d+'/'+audit.adapter))
const root=process.env.WHOLE_ROOT||audit.selectedWhole
assert.equal(root,audit.selectedWhole,'Exact selected whole only')
assert.deepEqual(m.selectedProofIdentity,audit.identity)
assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
const header=JSON.parse(readFileSync(d+'/'+audit.identity.sourceHeaderFile))
const selected=JSON.parse(readFileSync(d+'/'+audit.identity.sourceProofFile))
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
assert.equal(sha(JSON.stringify(proof)),audit.fullProofSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
const before=JSON.stringify(proof)
const compile=(trace,p,id,whole=root)=>m.compileSourceWhole(whole,trace,p,id)
const out=compile(proof.trace,proof,audit.identity)
assert.equal(before,JSON.stringify(proof));assert.equal(sha(JSON.stringify(out)),audit.compiledSHA256)
assert.equal(out.length,10);assert.equal(out.flat().length,12)
const canonical=poly=>{const points=poly.map(v=>[v.x,v.y]),options=[];for(const p of[points,[...points].reverse()])for(let i=0;i<p.length;i++)options.push(JSON.stringify([...p.slice(i),...p.slice(0,i)]));return options.sort()[0]}
const contours=outline=>(outline.match(/M[^Z]+Z/g)||[]).map(s=>{const a=s.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>({x:a[i*2]*2,y:a[i*2+1]*2}))})
const original=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
assert.deepEqual(out.flatMap(p=>p.flatMap(mask=>contours(mask.outline))).map(canonical).sort(),original)
for(const raw of[3,7]){const call=proof.trace[raw][0],masks=out[raw];assert.equal(call.kind,'cdDrawCurve');assert.equal(call.args.at(-1),15);assert.equal(call.polygons.length,5);assert.equal(masks.length,2);assert.equal(masks[1].direction,'up');assert.equal(masks[1].weight,proof.defaults.kWidth*5/2);assert.equal(masks[1].revealPath,undefined)}
let rejections=0
if(process.env.CHECK==='1'){
 for(const mutate of[q=>q.trace[0][0].args[0]+=.1,q=>q.trace[0][0].polygons[0][0].x+=.1,q=>q.groups[0].polygons[0][0].y+=.1,q=>q.defaults.kWidth+=.1,q=>q.engineRevision='changed',q=>q.engineHashes['2d.js']='changed']){const q=structuredClone(proof);mutate(q);assert.throws(()=>compile(q.trace,q,audit.identity));rejections++}
 for(const key of Object.keys(audit.identity)){assert.throws(()=>compile(proof.trace,proof,{...audit.identity,[key]:'changed'}));rejections++}
 assert.throws(()=>compile(proof.trace,proof,null));rejections++
 assert.throws(()=>compile(proof.trace,proof,audit.identity,'unsupported'));rejections++
 for(const raw of[3,7]){const q=structuredClone(proof);q.trace[raw][0].polygons.at(-1)[0].x+=.1;assert.throws(()=>compile(q.trace,q,audit.identity));rejections++}
 assert.equal(rejections,15)
}
console.log(JSON.stringify({sourceRoot:root,pens:out.length,masks:out.flat().length,originalPolygons:original.length,polygonExactOnce:true,inputImmutable:true,compiledSHA256:sha(JSON.stringify(out)),identity:audit.identity,rejections,finePens:out.flatMap((p,i)=>p.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions:audit.terminalPairs.map(t=>({pen:t.pen,mask:2,start:t.maskBoundary,weights:[t.bodyWeight,t.tailWeight],nativeReviewed:false})),nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:m.renderProgressive.toString()}))

