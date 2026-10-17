import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{compileProgressive,renderProgressive,selectedProofIdentity,sourceGroups}from'./progressive-order-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),prep=JSON.parse(readFileSync(new URL('./source-order-candidate-validation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"sources.json":"45b9d3c7875aaa96cf8ae05c7be6bf3666db5da9c3c2948877cdcabb59234905","metadata.json":"67927260a97c92e15116190b6f50030f9403f3d44484665fbc307e2939c47bb0","engine-proof.json":"d492dcf6f1d5a4426dba870c8846fa6ff5632436ec6cba75705ccdbf51fc3c17","progressive.mjs":"d86028daf3b2c05ebf53ffde4c2a4a4e90cdafc50d42b601043733af8ec8505c","engine-whole-u6504-k.json":"c07dcaadabdfa463af113fd929e2281e99425c3bfb7bdece212086a3b69db585","engine-whole-u6504-ue0100.json":"c07dcaadabdfa463af113fd929e2281e99425c3bfb7bdece212086a3b69db585","engine-whole-u6504.json":"f5033f3fc29986a09b6e825d2ad575b03242c31d51559d4959ac670a7fd16b9b","strict-native-adapter.mjs":"d9c6f5de72ae09fb8751126ccde4565c2d89a77c133d201302ae437dc10ec535"})
for(const[f,h]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Protected input '+f)
const root=process.argv[2],identity=selectedProofIdentity
assert.equal(root,'u6504','Only explicit selected original whole root may compile')
assert.deepEqual(identity,{"sourceRoot":"u6504","sourceProofFile":"engine-whole-u6504.json","sourceProofFileSha256":"f5033f3fc29986a09b6e825d2ad575b03242c31d51559d4959ac670a7fd16b9b","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d492dcf6f1d5a4426dba870c8846fa6ff5632436ec6cba75705ccdbf51fc3c17"})
const bodyBytes=readFileSync(new URL(identity.sourceProofFile,import.meta.url)),headerBytes=readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))
assert.equal(sha(bodyBytes),identity.sourceProofFileSha256);assert.equal(sha(headerBytes),identity.sourceHeaderFileSha256)
const body=JSON.parse(bodyBytes),header=JSON.parse(headerBytes),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'87ce02d64cee7e4e29a789ba8a973ed87f701b3ebd009777ecf703e88cc07cdc')
const before=JSON.stringify(proof),strokes=compileProgressive(proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,18);assert.equal(strokes.flat().length,21)
console.log(JSON.stringify({sourceRoot:root,identity,sourceProofFile:identity.sourceProofFile,sourceProofFileSha256:identity.sourceProofFileSha256,fullProofSHA256:sha(JSON.stringify(proof)),sourceGroups,strokes,render:renderProgressive.toString(),pens:18,masks:21,compiledSHA256:sha(JSON.stringify(strokes)),nativeApproval:false,runtimeApplied:false}))
