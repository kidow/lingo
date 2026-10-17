import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileSourceWhole,compileWithOuterIdentity,selectedProofIdentity,selectedOuterIdentity,sourceGroups,renderProgressive} from './progressive-mandatory-candidate.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex'),prep=JSON.parse(readFileSync(new URL('./mandatory-source-preparation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"candidate-compile-analysis.json":"324c12345fa6a8450c65d923d716e58cfbc11be0bc8bea57ed23be8c84013660","engine-proof.json":"65f407a46de41a235666d33630ca11f926f8a7d065c7a981fc9b941098625098","engine-whole-u5fa7-g.json":"90b9b007c266cc38bb9a2e8bf5f8904c60c282c3a427f5a562924bbac47a26d0","engine-whole-u5fa7-ue0100.json":"b2206f3ca557e9667aa9ac5496bbc23d91a161c9a3da865d11e2d1f89bf1a26d","engine-whole-u5fa7-var-001.json":"59cdafd3205086cd3cc06f0f3122885a26c9b60ce2a8a70eaf348e571e187217","engine-whole-u5fa7.json":"b2206f3ca557e9667aa9ac5496bbc23d91a161c9a3da865d11e2d1f89bf1a26d","metadata.json":"cf963d1736cd44db47a3fde173df3a8fb775c6db2aca5c43f2a6954df7b5b9b6","progressive.mjs":"470b36fcfd63c28981dc9ba05da8f6a5294ea605285bcff91fa215b1778f866f","source-analysis.json":"152ac01578efe51933fea1d47b2715886e82558782545b6053282a94a052243f","source-join-analysis.json":"ca35f2a9cb73a75b8a3f007fa446af8ef76d67e40538200d14e39dbe6e020b2f","source-preservation-audit.json":"172806024318e7f796c62cf89a0b6a370c3d7105fef001cb1b6a4767122c0e8c","sources.json":"3d2bbf1f286c0f8c153933f781a9734ce18b4e9b3b16dacdddb4090f5cec1d00","verify-source.mjs":"a4c4633bf09527989db4f19126f3613549c251aed21ce28130e48915c582d4c9"})
for(const[file,pin]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Protected source/caller '+file)
assert.equal(process.argv[2],'u5fa7-g','Explicit selected root argument is mandatory')
assert.deepEqual(selectedOuterIdentity,prep.outerIdentity);assert.deepEqual(selectedProofIdentity,prep.innerIdentity)
const header=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceHeaderFile,import.meta.url))),body=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url))),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
const strokes=compileWithOuterIdentity(proof.trace,proof,selectedOuterIdentity)
assert.equal(sha(JSON.stringify(strokes)),prep.compiledSHA256);assert.equal(strokes.length,12);assert.equal(strokes.flat().length,13)
assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),26);assert.deepEqual(sourceGroups,prep.sourceGroups)
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
console.log(JSON.stringify({sourceRoot:'u5fa7-g',innerIdentity:selectedProofIdentity,outerIdentity:selectedOuterIdentity,fullProofSHA256:sha(JSON.stringify(proof)),compiledSHA256:sha(JSON.stringify(strokes)),pens:12,masks:13,polygons:26,sourceGroups,outerRejections,innerRejections,strokes:process.env.CHECK==='1'?undefined:strokes,render:process.env.CHECK==='1'?undefined:renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}))
