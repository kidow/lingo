import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {pathToFileURL,fileURLToPath} from 'node:url'
const d=process.env.REVIEW_DIR??fileURLToPath(new URL('.',import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
const read=f=>readFileSync(d+'/'+f),a=JSON.parse(read('native-itaiji-preparation.json'))
for(const[f,h]of Object.entries(a.inputSHA256))assert.equal(sha(read(f)),h,'Immutable original input '+f)
for(const[f,h]of Object.entries(a.newFilesSHA256))assert.equal(sha(read(f)),h,'New isolated helper pin '+f)
const m=await import(pathToFileURL(d+'/progressive.mjs')),root=process.env.WHOLE_ROOT??a.selectedWhole
assert.equal(root,a.selectedWhole,'Only the complete frozen itaiji root is a candidate')
const header=JSON.parse(read('engine-proof.json')),selected=JSON.parse(read(a.selectedProof))
assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups','missing','root','status','trace'])
assert.deepEqual(header.missing,['u76ee-j']);for(const k of ['defaults','groups','trace'])assert.equal(header[k],null,'Original blocked base header preserved')
assert.deepEqual(Object.keys(selected).sort(),['defaults','groups','trace'])
assert.equal(sha(read(a.selectedProof)),a.identity.sourceProofFileSha256)
assert.equal(sha(read('engine-proof.json')),a.identity.sourceHeaderFileSha256)
assert.deepEqual(m.selectedProofIdentity,a.identity)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(sha(JSON.stringify(proof)),a.fullProofSHA256)
function compile(trace,p,id,requestedRoot=root){assert.equal(requestedRoot,root,'Explicit whole root');assert.deepEqual(id,a.identity,'Exact five-field original source identity');assert.deepEqual(p,proof,'Exact full five-field proof');return m.compileSourceWhole(requestedRoot,trace,p,id)}
const before=JSON.stringify(proof),out=compile(proof.trace,proof,a.identity)
assert.equal(JSON.stringify(proof),before);assert.equal(out.length,13);assert.equal(out.flat().length,13);assert.equal(sha(JSON.stringify(out)),a.compiledSHA256)
assert.deepEqual(m.sourceGroups,a.sourceGroups0Based)
const canonical=poly=>{const p=poly.map(q=>[q.x/2,q.y/2]),options=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)options.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return options.sort()[0]}
const original=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
const emitted=out.flatMap(pen=>pen.flatMap(mask=>(mask.outline.match(/M[^Z]* Z/g)||[]).map(s=>{const nums=s.match(/-?\d+(?:\.\d+)?/g).map(Number);return canonical(Array.from({length:nums.length/2},(_,i)=>({x:nums[i*2]*2,y:nums[i*2+1]*2})))}))).sort()
assert.equal(original.length,25);assert.deepEqual(emitted,original,'Every original polygon exactly once without coordinate changes')
const joins=[];for(const[pen,g]of m.sourceGroups.entries()){const calls=g.flatMap(i=>proof.trace[i]);for(let i=1;i<calls.length;i++){const c=calls[i-1],n=c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,end=c.args.slice(n,n+2);assert.deepEqual(end,calls[i].args.slice(0,2));joins.push({pen:pen+1,end})}}
let rejections=0
if(process.env.CHECK==='1'){
 const reject=f=>{assert.throws(f);rejections++}
 for(const mutate of [p=>p.trace[0][0].args[0]+=.1,p=>p.trace[0][0].polygons[0][0].x+=.1,p=>p.groups[0].polygons[0][0].y+=.1,p=>p.defaults.kWidth+=.1,p=>p.engineRevision='changed',p=>p.engineHashes['2d.js']='0'.repeat(64)]){const p=structuredClone(proof);mutate(p);reject(()=>compile(p.trace,p,a.identity))}
 for(const k of Object.keys(a.identity))reject(()=>compile(proof.trace,proof,{...a.identity,[k]:'changed'}))
 reject(()=>compile(proof.trace,proof,null));reject(()=>compile([...proof.trace].reverse(),proof,a.identity));reject(()=>compile(proof.trace,proof,a.identity,'u5bd8'))
}
console.log(JSON.stringify({sourceRoot:root,pens:13,masks:13,originalPolygons:25,polygonExactOnce:true,originalCoordinatesUnchanged:true,exactJoins:joins,rejections,compiledSHA256:a.compiledSHA256,fullProofSHA256:a.fullProofSHA256,finePens:a.finePens,maskTransitions:[],nativeApproval:false,runtimeApplied:false,strokes:process.env.CHECK==='1'?undefined:out,render:process.env.CHECK==='1'?undefined:m.renderProgressive.toString()}))
