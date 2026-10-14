import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"987a0d6c07b733ca862ee0d4f3dbbb58f116a50e8a97b84b7ea6f527846f25d5")
const manifest={"u8ff2-g":{"identity":{"sourceRoot":"u8ff2-g","sourceProofFile":"./engine-whole-u8ff2-g.json","sourceProofFileSha256":"56f6d2c08ce2cd9a958a659e6f9c4cb0fc3a2a5565afe0904d87a09743a94f7e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"ce77b96838dd5884e1c262e826d77bf52dc3df84895bc67816c74b2361fb6f92","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"2e6b3de668110819c3d1313946a2eb40826cf904d04ae862aa6407d38d6ff1ac"},"fullProofSHA256":"2814ec20b6f1995e13443777facab7df1616c63972edfcf4db4e982ce2ff3823","pens":9,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[10,9]]}}
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
