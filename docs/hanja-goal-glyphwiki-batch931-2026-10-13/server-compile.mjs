import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroupsByWhole} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"e0a5fd78a241c9e5cabb6ac17b3764dd08a7e55056d2120bfaeb6e25d104fa44")
const manifest={"u8411-ue0102":{"identity":{"root":"u8411-ue0102","file":"engine-whole-u8411-ue0102.json","fileSHA256":"0dd2f3ec1e32d271e32f5832e91407ea9f51a8ae934bc44b178c7c5a05d087b1"},"fullProofSHA256":"4347b8affca113f80d7bb09927f66e67f6b1466ba3d7da25b780b2c8f3dadf61","pens":12}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only an explicitly pinned complete source profile is supported')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"48400abc4aa15a97c99a877777c68f1674bd5ef83ad26926f019363737167936")
const header=JSON.parse(hb),original=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...original,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups:sourceGroupsByWhole[root],nativeApproval:false}))
