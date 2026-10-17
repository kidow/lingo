import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,compileWithOuterIdentity,selectedProofIdentity,selectedOuterIdentity,sourceGroups,renderProgressive} from './progressive-mandatory-candidate.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex'),prep=JSON.parse(readFileSync(new URL('./mandatory-source-preparation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"candidate-compile-analysis.json":"5049f6bf9034e38b86baeac57c63367b6c22998c154579a2903cac8beeaf7c6f","engine-proof.json":"c6d079d7a0abab8e2ffccbb85fc26cf57ce9112e47fea0c6b32bcc1918fec3d1","engine-whole-u8cb6-k.json":"488c0f134823ad7a00cdf89d9a4f41d8cbbba770292da49d09b9fa895e16d05e","engine-whole-u8cb6-ue0100.json":"488c0f134823ad7a00cdf89d9a4f41d8cbbba770292da49d09b9fa895e16d05e","engine-whole-u8cb6.json":"488c0f134823ad7a00cdf89d9a4f41d8cbbba770292da49d09b9fa895e16d05e","metadata.json":"852547f8f37ff27a54ca799c465925a76d2e3f72bbe3a2b8d7f69b294efc4641","progressive.mjs":"8aa92d8cc6d3ef1cca539da68fb54d35ce9832d988ad861d93faea295d6e64cc","source-analysis.json":"8cfc56a86743c4d539e928e360d2806cb2a475ac72998169e8b6d4951b464f91","source-join-analysis.json":"7f227373c23d87552e6d3480b9906b0724258cb604fa81df3db86ed9b167d3a5","source-preservation-audit.json":"490df3d39272b11bd0dab7d725afc76f2cf42446e5a2ea26102c7b7c6ed4d29f","sources.json":"062932cc003a13dacd36a66fd7c51b920f4826f26acb4ed6734eace780d3f6bc","verify-source.mjs":"fc3d4dd0d75a9abbeaf702fd4776b1b25be1ab05861d65be22877812a09de333"})
for(const[file,pin]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Protected source/caller '+file)
assert.equal(process.argv[2],'u8cb6','Explicit selected root argument is mandatory')
assert.deepEqual(selectedOuterIdentity,prep.outerIdentity);assert.deepEqual(selectedProofIdentity,prep.innerIdentity)
const header=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceHeaderFile,import.meta.url))),body=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url))),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
const strokes=compileWithOuterIdentity(proof.trace,proof,selectedOuterIdentity)
assert.equal(sha(JSON.stringify(strokes)),prep.compiledSHA256);assert.equal(strokes.length,12);assert.equal(strokes.flat().length,12)
assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),25);assert.deepEqual(sourceGroups,prep.sourceGroups)
let outerRejections=0,innerRejections=0
if(process.env.CHECK==='1'){
 const rejectOuter=fn=>{assert.throws(fn);outerRejections++},rejectInner=fn=>{assert.throws(fn);innerRejections++}
 for(const key of Object.keys(selectedOuterIdentity))rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,{...selectedOuterIdentity,[key]:'changed'}))
 rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,null));rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,{...selectedOuterIdentity,extra:true}));rejectOuter(()=>Reflect.apply(compileWithOuterIdentity,null,[proof.trace,proof]))
 rejectInner(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]));rejectInner(()=>Reflect.apply(compileSourceWhole,null,[selectedProofIdentity.sourceRoot,proof.trace,proof]))
 for(const key of Object.keys(selectedProofIdentity))rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,[key]:'changed'}))
 rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFile:selectedProofIdentity.sourceProofFile.slice(2)}))
 rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceHeaderFile:selectedProofIdentity.sourceHeaderFile.slice(2)}))
 rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFileSHA256:selectedProofIdentity.sourceProofFileSha256}))
 rejectInner(()=>compileProgressive(proof.trace,{...proof,extra:true},selectedProofIdentity))
 const changed=structuredClone(proof);changed.defaults.kWidth+=.1;rejectInner(()=>compileProgressive(changed.trace,changed,selectedProofIdentity))
 rejectInner(()=>compileProgressive([...proof.trace].reverse(),proof,selectedProofIdentity))
}
console.log(JSON.stringify({sourceRoot:'u8cb6',innerIdentity:selectedProofIdentity,outerIdentity:selectedOuterIdentity,fullProofSHA256:sha(JSON.stringify(proof)),compiledSHA256:sha(JSON.stringify(strokes)),pens:12,masks:12,polygons:25,sourceGroups,outerRejections,innerRejections,strokes:process.env.CHECK==='1'?undefined:strokes,render:process.env.CHECK==='1'?undefined:renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}))
