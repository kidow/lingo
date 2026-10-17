import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex'),prep=JSON.parse(readFileSync(new URL('./combined-native-preparation.json',import.meta.url)))
assert.deepEqual(prep.originalPins,{"engine-whole-u8c5d.json":"184c4621dcff5f7791fa525e7559206dc385bc1e125b9d3cb372d6b5e708bc05","engine-whole-u8c5d-ue0100.json":"184c4621dcff5f7791fa525e7559206dc385bc1e125b9d3cb372d6b5e708bc05","progressive.mjs":"0309caefc350f14adc709091b0876e060af1026289c52da0f19c79ad20af8c12","engine-proof.json":"8bdd22d21a66c26071665a278f767f04e553cee68c30b9cf69bda2a7338b5922","sources.json":"bc734014e82aed345c93b15f8135ba8af041b3e137875b8704bf5bedebeb5558","metadata.json":"9a9dce28ea0e4123bb92920bf7ec518729ea7c9f7d334e671cb1e7c45d7a1cc5","serve-whole.py":"f94aa99fa7e5d1d690d5a786e241d7ed5f5772d87c8aadb02c182e6fab3ed1be","serve-progressive.py":"6dd4bb689164ab7710775fcf62f855de7b0e6efeef2f6cdc609277e517b61776","server-compile.mjs":"6d0d3f8faa0992fbe7f76de83f30ffb14371987f037e4ad49e5125aa3888a097"})
for(const[file,pin]of Object.entries({...prep.originalPins,...prep.additionalProtectedPins,...prep.newFilesSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Protected original/helper '+file)
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),'0309caefc350f14adc709091b0876e060af1026289c52da0f19c79ad20af8c12')
const root=process.argv[2];assert.equal(root,'u8c5d','Only the explicit selected whole profile is supported')
const identity={"sourceRoot":"u8c5d","sourceProofFile":"./engine-whole-u8c5d.json","sourceProofFileSha256":"184c4621dcff5f7791fa525e7559206dc385bc1e125b9d3cb372d6b5e708bc05","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8bdd22d21a66c26071665a278f767f04e553cee68c30b9cf69bda2a7338b5922"},selected=candidateWholeProofs.find(p=>p.identity.sourceRoot===root)
assert(selected);assert.deepEqual(selected.identity,identity);assert.deepEqual(selected.sourceGroups,prep.sourceGroups)
const bytes=readFileSync(new URL(identity.sourceProofFile,import.meta.url)),headerBytes=readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))
assert.equal(sha(bytes),identity.sourceProofFileSha256);assert.equal(sha(headerBytes),identity.sourceHeaderFileSha256)
const body=JSON.parse(bytes),header=JSON.parse(headerBytes),proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(sha(JSON.stringify(proof)),'fe8c27b63349f5fe59322610c0db51de28dc806d55cab63b6cb44c6a98d15dfe','Complete five-field proof includes pinned original engine metadata')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,11);assert.equal(strokes.flat().length,13);assert.equal(sha(JSON.stringify(strokes)),'da6b85a928c222d94cad7f986d4da03c42239a8bbeb2cc570aebd6e7f6390864')
assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),26)
console.log(JSON.stringify({sourceRoot:root,identity,sourceProofFile:identity.sourceProofFile,sourceProofFileSha256:identity.sourceProofFileSha256,fullProofSHA256:sha(JSON.stringify(proof)),sourceGroups:selected.sourceGroups,strokes,render:renderProgressive.toString(),pens:11,masks:13,compiledSHA256:sha(JSON.stringify(strokes)),nativeApproval:false,runtimeApplied:false}))
