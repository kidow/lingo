import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"991e7b29dd5283197cce7687c88eb1f565bcc654f9b266ab90756cb72fd2800c")
const manifest={"u6913":{"identity":{"root":"u6913","file":"engine-whole-u6913.json","fileSHA256":"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772"},"fullProofSHA256":"49ef345819177270739876a5319cc29e96dac1764210b0f4abfa5cd6f0e2880e","pens":12,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"6163185f7b800ab14f89f4b1588f0511202206a1cf7787eaa64c0abbcf549772")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false}))
