import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"0309caefc350f14adc709091b0876e060af1026289c52da0f19c79ad20af8c12")
const manifest={"u8c5d":{"identity":{"sourceRoot":"u8c5d","sourceProofFile":"./engine-whole-u8c5d.json","sourceProofFileSha256":"184c4621dcff5f7791fa525e7559206dc385bc1e125b9d3cb372d6b5e708bc05","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8bdd22d21a66c26071665a278f767f04e553cee68c30b9cf69bda2a7338b5922"},"fullProofSHA256":"fe8c27b63349f5fe59322610c0db51de28dc806d55cab63b6cb44c6a98d15dfe","pens":11,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8,9],[10],[11],[12]]},"u8c5d-ue0100":{"identity":{"sourceRoot":"u8c5d-ue0100","sourceProofFile":"./engine-whole-u8c5d-ue0100.json","sourceProofFileSha256":"184c4621dcff5f7791fa525e7559206dc385bc1e125b9d3cb372d6b5e708bc05","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8bdd22d21a66c26071665a278f767f04e553cee68c30b9cf69bda2a7338b5922"},"fullProofSHA256":"fe8c27b63349f5fe59322610c0db51de28dc806d55cab63b6cb44c6a98d15dfe","pens":11,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8,9],[10],[11],[12]]}}
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
