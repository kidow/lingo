import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"924716145002ac4a6bf95f44225329a5418e12e3b13dbc7f52d23de91d01b065")
const manifest={"u99fd":{"identity":{"sourceRoot":"u99fd","sourceProofFile":"./engine-whole-u99fd.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f"},"fullProofSHA256":"3a2bde43c2ada80267c4254680e59629b71e7d0739586a77be47cfd2a4b6bf8e","pens":17,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]]},"u99fd-ue0100":{"identity":{"sourceRoot":"u99fd-ue0100","sourceProofFile":"./engine-whole-u99fd-ue0100.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f"},"fullProofSHA256":"3a2bde43c2ada80267c4254680e59629b71e7d0739586a77be47cfd2a4b6bf8e","pens":17,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]]}}
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
