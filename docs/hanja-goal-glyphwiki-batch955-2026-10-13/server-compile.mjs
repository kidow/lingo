import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"c49463b1c789661392e575e4dd46b86e6819178d33abfec6aa43a409307c1956")
const manifest={"u9b80":{"identity":{"root":"u9b80","file":"engine-whole-u9b80.json","fileSHA256":"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28"},"fullProofSHA256":"23abb80728e4ed9dffb1b4b69e9dca546e48ad751ec73fea295e86707d9ed4f4","pens":16,"sourceGroups":[[0],[1,2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]]}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"1b437b21aa800079c7bcc358c5df3f8d01abf5ab1df51cfd6697ad8ee3ab2c28")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false}))
