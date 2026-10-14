import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"88da2c6776df93d7d2946fe3d31da92d7ab15fe985fb0722fbb95224987c3d92")
const manifest={"u5dbc-k":{"identity":{"sourceRoot":"u5dbc-k","sourceProofFile":"./engine-whole-u5dbc-k.json","sourceProofFileSha256":"5fed1f353746571c424168b5b65d6c0770be78aee8b43e3b6eeaf43433689365","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b4b34a7a5f11371ea18c2d132c8989b58f0230c3da31fb6c2cc9de81a1123255","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"848a2ef0d13b28e583da92456c95c870ea64261d5863eab8c5a9a2c9e02eea6d"},"fullProofSHA256":"c6b60d6be9562b23c0e4c8b029bb9b99d9c66bae647efb242b932fc95ffeb2ba","pens":17,"sourceGroups":[[0],[1,2],[3],[4,5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]]},"u5dbc-ue0100":{"identity":{"sourceRoot":"u5dbc-ue0100","sourceProofFile":"./engine-whole-u5dbc-ue0100.json","sourceProofFileSha256":"34a76c745651a160c653d186459950cca59526cb783233e2c02427550bc1dd14","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b4b34a7a5f11371ea18c2d132c8989b58f0230c3da31fb6c2cc9de81a1123255","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"848a2ef0d13b28e583da92456c95c870ea64261d5863eab8c5a9a2c9e02eea6d"},"fullProofSHA256":"44f8054d58e39bb0c5c796e8d3de11973261b148cc39788313c24bc7b4d5f58a","pens":17,"sourceGroups":[[0],[1,2],[3],[4,5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]]}}
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
