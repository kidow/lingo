import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,compileWithOuterIdentity,selectedProofIdentity,selectedOuterIdentity,sourceGroups,renderProgressive} from './progressive-mandatory-candidate.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex'),prep=JSON.parse(readFileSync(new URL('./mandatory-source-preparation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"candidate-compile-analysis.json":"034303cf1e2197f505753791274d6abb3851d2975bf2f8a3ca27efa64a35e28f","engine-proof.json":"b03d16a9988456b6d2fbcd989951dc44fb15d9de88d10098181e17a51b07c458","engine-whole-u794a-g.json":"e72f0e7fbfd1ac7f1028f075f89bb00786bb754122548ebfc5af4554c84da994","engine-whole-u794a-ue0100.json":"0943bb1ae686032ce63caf815dfc6100983a00ca2220a9713ae5269f95eb86b4","engine-whole-u794a-ue0101.json":"0943bb1ae686032ce63caf815dfc6100983a00ca2220a9713ae5269f95eb86b4","engine-whole-u794a-ue0102.json":"a0a599db51333780c9fa14942ed58d70b26a10da7acf4829ca18716be73d5f65","engine-whole-u794a.json":"0943bb1ae686032ce63caf815dfc6100983a00ca2220a9713ae5269f95eb86b4","metadata.json":"5bd54040abfc97b192fdf5185049852c688606bedfb6684d9a1d8aa659ac6704","progressive.mjs":"e4fea1657932e3d468d2ef5a9df7626b0c918be41767e770bdaa7f68429aaba9","source-analysis.json":"a7792d53a2dab319a397f15e841f80929ed61ece95ddb0e029762d3871477fab","source-join-analysis.json":"c5b6553fadd77ef676bdce2d3a71b2c5a4272b847ed9beba680e8a3e1ef6d2a7","source-preservation-audit.json":"9c0d1b0ca8caf9310d7b53dc284def5af71672bfaa874a3663277022bdc4a06b","sources.json":"c052f50abba68a194e8f64f7619702a987040fda93e39f60b6a151f083c1f44d","verify-source.mjs":"9f9743d53eeb5ebd135e48137320e1085dcb26d1017110fb81e19b014b712210"})
for(const[file,pin]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Protected source/caller '+file)
assert.equal(process.argv[2],'u794a','Explicit selected root argument is mandatory')
assert.deepEqual(selectedOuterIdentity,prep.outerIdentity);assert.deepEqual(selectedProofIdentity,prep.innerIdentity)
const header=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceHeaderFile,import.meta.url))),body=JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url))),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.equal(sha(JSON.stringify(proof)),prep.fullProofSHA256)
const strokes=compileWithOuterIdentity(proof.trace,proof,selectedOuterIdentity)
assert.equal(sha(JSON.stringify(strokes)),prep.compiledSHA256);assert.equal(strokes.length,9);assert.equal(strokes.flat().length,10)
assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),24);assert.deepEqual(sourceGroups,prep.sourceGroups)
let outerRejections=0,innerRejections=0
if(process.env.CHECK==='1'){
 const rejectOuter=fn=>{assert.throws(fn);outerRejections++},rejectInner=fn=>{assert.throws(fn);innerRejections++}
 for(const key of Object.keys(selectedOuterIdentity))rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,{...selectedOuterIdentity,[key]:'changed'}))
 rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,null));rejectOuter(()=>compileWithOuterIdentity(proof.trace,proof,{...selectedOuterIdentity,extra:true}));rejectOuter(()=>Reflect.apply(compileWithOuterIdentity,null,[proof.trace,proof]))
 rejectInner(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFile:selectedProofIdentity.sourceProofFile.slice(2)}))
 rejectInner(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,sourceProofFileSHA256:selectedProofIdentity.sourceProofFileSha256}))
 rejectInner(()=>compileProgressive(proof.trace,{...proof,extra:true},selectedProofIdentity))
 const changed=structuredClone(proof);changed.defaults.kWidth+=.1;rejectInner(()=>compileProgressive(changed.trace,changed,selectedProofIdentity))
 rejectInner(()=>compileProgressive([...proof.trace].reverse(),proof,selectedProofIdentity))
}
console.log(JSON.stringify({sourceRoot:'u794a',innerIdentity:selectedProofIdentity,outerIdentity:selectedOuterIdentity,fullProofSHA256:sha(JSON.stringify(proof)),compiledSHA256:sha(JSON.stringify(strokes)),pens:9,masks:10,polygons:24,sourceGroups,outerRejections,innerRejections,strokes:process.env.CHECK==='1'?undefined:strokes,render:process.env.CHECK==='1'?undefined:renderProgressive.toString(),nativeApproval:false,runtimeApplied:false}))
