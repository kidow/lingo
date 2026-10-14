import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"96d44f30a8f372952d76117e9037f1ceb18895f9dcbc0002f960ce3d1df9ae43")
const manifest={"u85af-k":{"identity":{"sourceRoot":"u85af-k","sourceProofFile":"./engine-whole-u85af-k.json","sourceProofFileSha256":"ff35daefae38ee8a4b1c86ce484d65323c2b091b93a457a207713527c955326f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ea6186fa2d2d1cb2fdbbb3a31ef25fe30503b13b6e31797e1ce0d26574514a4c","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e265279b268be343fe3b7ae5336a6f55c68b4e2c3b554771fc00453b58addfbf"},"fullProofSHA256":"9e463db6a3eca14d322c64d0f0ed478edf49297de297aed0d2a6a6aee1562233","pens":18,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]]},"u85af-ue0104":{"identity":{"sourceRoot":"u85af-ue0104","sourceProofFile":"./engine-whole-u85af-ue0104.json","sourceProofFileSha256":"ff35daefae38ee8a4b1c86ce484d65323c2b091b93a457a207713527c955326f","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ea6186fa2d2d1cb2fdbbb3a31ef25fe30503b13b6e31797e1ce0d26574514a4c","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e265279b268be343fe3b7ae5336a6f55c68b4e2c3b554771fc00453b58addfbf"},"fullProofSHA256":"9e463db6a3eca14d322c64d0f0ed478edf49297de297aed0d2a6a6aee1562233","pens":18,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]]}}
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
