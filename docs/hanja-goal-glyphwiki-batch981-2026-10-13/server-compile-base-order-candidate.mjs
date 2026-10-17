import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,selectedProofIdentity,sourceGroups,sourceOrderPermutation,renderProgressive} from './progressive-base-order-candidate.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url)),prep=JSON.parse(read('./base-order-source-preparation.json'))
for(const[f,pin]of Object.entries({...prep.originalPins,...prep.newFilesSHA256}))assert.equal(sha(read(f)),pin,'Frozen source/base helper '+f)
assert.equal(process.argv[2]??process.env.WHOLE_ROOT,'u5fa7','Only explicitly pinned base root is supported')
assert.deepEqual(selectedProofIdentity,prep.selectedProofIdentity);assert.deepEqual(sourceGroups,prep.sourceGroups);assert.deepEqual(sourceOrderPermutation,prep.sourceOrderPermutation)
const header=JSON.parse(read(selectedProofIdentity.sourceHeaderFile)),body=JSON.parse(read(selectedProofIdentity.sourceProofFile)),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body},before=JSON.stringify(proof)
assert.equal(sha(before),prep.fullProofSHA256)
const strokes=compileSourceWhole('u5fa7',proof.trace,proof,selectedProofIdentity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,12);assert.equal(strokes.flat().length,13);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),28)
let rejections=0;const reject=fn=>{assert.throws(fn);rejections++}
if(process.env.CHECK==='1'){
 reject(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]));reject(()=>Reflect.apply(compileSourceWhole,null,['u5fa7',proof.trace,proof]))
 for(const key of Object.keys(selectedProofIdentity))reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,[key]:'changed'}))
 reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFile:selectedProofIdentity.sourceProofFile.slice(2)}));reject(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceHeaderFile:selectedProofIdentity.sourceHeaderFile.slice(2)}))
 const{sourceProofFileSha256,...rest}=selectedProofIdentity;reject(()=>compileProgressive(proof.trace,proof,{...rest,sourceProofFileSHA256:sourceProofFileSha256}))
 for(const mutate of[p=>{p.trace[0][0].args[0]+=.1},p=>{p.groups[0].polygons[0][0].x+=.1},p=>{p.defaults.kWidth+=.1},p=>{p.engineHashes['2d.js']='changed'},p=>{p.extra=true}]){const p=structuredClone(proof);mutate(p);reject(()=>compileProgressive(p.trace,p,selectedProofIdentity))}
 reject(()=>compileSourceWhole('u5fa7-g',proof.trace,proof,selectedProofIdentity))
}
const maskTransitions=strokes.flatMap((pen,i)=>{const total=pen.reduce((n,m)=>n+m.weight,0);let prev=0;return pen.slice(0,-1).map((m,j)=>{prev+=m.weight;return{pen:i+1,mask:j+2,start:prev/total,weights:pen.map(m=>m.weight)}})})
console.log(JSON.stringify({sourceRoot:'u5fa7',identity:selectedProofIdentity,fullProofSHA256:sha(JSON.stringify(proof)),sourceGroups,compiledSHA256:sha(JSON.stringify(strokes)),pens:12,masks:13,polygons:28,rejections,finePens:strokes.flatMap((pen,i)=>pen.some(m=>m.direction==='curve')?[i+1]:[]),maskTransitions,strokes:process.env.CHECK==='1'?undefined:strokes,render:process.env.CHECK==='1'?undefined:renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}))
