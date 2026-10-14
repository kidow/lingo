import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"c44999855fa4ca45ceb674c5926dd33da6f34b8f2313f87ee3edd5d5274ced4b")
const manifest={"u5612":{"identity":{"sourceRoot":"u5612","sourceProofFile":"./engine-whole-u5612.json","sourceProofFileSha256":"d1e51a49b8e2079837a3f3fd9a44c9e07578ba483975fe346f70bd50cb611482","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"718f558a4b519a58bacb41b29017972b9297b88ecfede8d9e98d60d76be8ce87","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"a4198d1aba582c3bb099b3bbad6cfc94b1e86ff5df1f9a278452fa83b06564af"},"fullProofSHA256":"5ca364516affab1d6c32f0ceeb032ebae3c0d928be2435d92e7f350b594c2137","pens":14,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15]]},"u5612-ue0100":{"identity":{"sourceRoot":"u5612-ue0100","sourceProofFile":"./engine-whole-u5612-ue0100.json","sourceProofFileSha256":"d1e51a49b8e2079837a3f3fd9a44c9e07578ba483975fe346f70bd50cb611482","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"718f558a4b519a58bacb41b29017972b9297b88ecfede8d9e98d60d76be8ce87","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"a4198d1aba582c3bb099b3bbad6cfc94b1e86ff5df1f9a278452fa83b06564af"},"fullProofSHA256":"5ca364516affab1d6c32f0ceeb032ebae3c0d928be2435d92e7f350b594c2137","pens":14,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15]]}}
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
