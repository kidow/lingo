import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{compileProgressive,renderProgressive,selectedProofIdentity,sourceGroups}from'./progressive-order-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),prep=JSON.parse(readFileSync(new URL('./source-order-candidate-validation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"engine-whole-u84f7.json":"21b62de47d0da6b00c1e717a7034afff9053aa9a943b76f9f39ebcc85c90cb65","engine-whole-u84f7-ue0100.json":"f747c593febe2d4b6d18abbff7605622fcf041e358e48943feb56d446f037213","engine-whole-u84f7-ue0101.json":"f747c593febe2d4b6d18abbff7605622fcf041e358e48943feb56d446f037213","engine-whole-u84f7-ue0102.json":"cbe4c51a6a1a6552a778a94c7ad5cc0e99e4426e907ee1670a0bf9cc38b8ae2d","progressive.mjs":"4c54269328b421e07d8ee5c0ca7161c5a6f966b3e6cbfe8fc9cb092f810256f5","engine-proof.json":"5fe3095208c76a4fb82c88a500d6a4bd57800c44e9909c47271a0ec5a7ee4f8e","sources.json":"275a8572d5aa62bf69309a892f6c59c58001421739823fe634fde43c8bacb5e6","metadata.json":"6c352de5169c720b7e488e11ba67718de4a07612bfe9b2592f19d59312481c58"})
for(const[f,h]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(f,import.meta.url))),h,'Protected input '+f)
const root=process.argv[2],identity=selectedProofIdentity
assert.equal(root,'u84f7-ue0102','Only explicit selected original whole root may compile')
assert.deepEqual(identity,{"sourceRoot":"u84f7-ue0102","sourceProofFile":"engine-whole-u84f7-ue0102.json","sourceProofFileSHA256":"cbe4c51a6a1a6552a778a94c7ad5cc0e99e4426e907ee1670a0bf9cc38b8ae2d"})
const bodyBytes=readFileSync(new URL(identity.sourceProofFile,import.meta.url)),headerBytes=readFileSync(new URL('engine-proof.json',import.meta.url))
assert.equal(sha(bodyBytes),identity.sourceProofFileSHA256);assert.equal(sha(headerBytes),'5fe3095208c76a4fb82c88a500d6a4bd57800c44e9909c47271a0ec5a7ee4f8e')
const body=JSON.parse(bodyBytes),header=JSON.parse(headerBytes),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'25d4245c9a74ce598a4e6bc9cc09680820c832916e610a36d367f254e3b6f825')
const before=JSON.stringify(proof),strokes=compileProgressive(proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,15);assert.equal(strokes.flat().length,16);assert.equal(sha(JSON.stringify(strokes)),prep.candidateCompiledSHA256)
console.log(JSON.stringify({sourceRoot:root,identity,sourceProofFile:identity.sourceProofFile,sourceProofFileSHA256:identity.sourceProofFileSHA256,fullProofSHA256:sha(JSON.stringify(proof)),sourceGroups,strokes,render:renderProgressive.toString(),pens:15,masks:16,compiledSHA256:sha(JSON.stringify(strokes)),nativeApproval:false,runtimeApplied:false}))
