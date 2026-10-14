import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"08e0deb48ce12a78caf570dec83e4c87d63e9d0eca16a17b301872aa3e13f040")
const manifest={"u71af":{"identity":{"sourceRoot":"u71af","sourceProofFile":"./engine-whole-u71af.json","sourceProofFileSha256":"87e68404750ea316b52488a8d0706b8ee6feb8b5fc9e484ecf99d72ea148cad6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"bcd286b20471c4b8593ace2d2caea6f1605d561e5b217a4f12e5d96403068764","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d421f3ccae4feeaaf5f2f99140a3019368f7603c9e1b7e3e30fb307db94a7249"},"fullProofSHA256":"ee3c8dc23b49cc3911da9eb477f5ef67271ebcbda0861fb854597328962d2c1e","pens":15,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]]},"u71af-ue0100":{"identity":{"sourceRoot":"u71af-ue0100","sourceProofFile":"./engine-whole-u71af-ue0100.json","sourceProofFileSha256":"87e68404750ea316b52488a8d0706b8ee6feb8b5fc9e484ecf99d72ea148cad6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"bcd286b20471c4b8593ace2d2caea6f1605d561e5b217a4f12e5d96403068764","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"d421f3ccae4feeaaf5f2f99140a3019368f7603c9e1b7e3e30fb307db94a7249"},"fullProofSHA256":"ee3c8dc23b49cc3911da9eb477f5ef67271ebcbda0861fb854597328962d2c1e","pens":15,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]]}}
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
