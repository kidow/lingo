import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"e798ddf15dd133fb11601b1702d22b0ccc5bcbe84d7cd42bd9a4fb6a9629c3a8")
const manifest={"u506a":{"identity":{"sourceRoot":"u506a","sourceProofFile":"./engine-whole-u506a.json","sourceProofFileSha256":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38"},"fullProofSHA256":"eb0185e5d2cf757d7b246e5ff994a5ee75d2a8a8faee773dc77dc4ad89a3a2fa","pens":11,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13]]},"u506a-ue0100":{"identity":{"sourceRoot":"u506a-ue0100","sourceProofFile":"./engine-whole-u506a-ue0100.json","sourceProofFileSha256":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38"},"fullProofSHA256":"eb0185e5d2cf757d7b246e5ff994a5ee75d2a8a8faee773dc77dc4ad89a3a2fa","pens":11,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicitly pinned complete whole case is supported')
const pin=manifest[root],selected=candidateWholeProofs.find(c=>c.identity.sourceRoot===root)
assert(selected);assert.deepEqual(selected.identity,pin.identity);assert.deepEqual(selected.sourceGroups,pin.sourceGroups)
const id=selected.identity,bytes=readFileSync(new URL(id.sourceProofFile,import.meta.url)),hb=readFileSync(new URL(id.sourceHeaderFile,import.meta.url))
assert.equal(hash(bytes),id.sourceProofFileSha256);assert.equal(hash(hb),id.sourceHeaderFileSha256)
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.sourceProofFile,sourceProofFileSHA256:id.sourceProofFileSha256,sourceGroups:selected.sourceGroups,nativeApproval:false}))
