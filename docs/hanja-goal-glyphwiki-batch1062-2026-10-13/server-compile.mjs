import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"b640c8e150b0df8a9f491fa218de58bf4d96f13a8edad0fb9ad797ce8f96410c")
const manifest={"u993c":{"identity":{"root":"u993c","file":"engine-whole-u993c.json","fileSHA256":"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509"},"fullProofSHA256":"1d30ebb1aa669481ef6d86ac8a73240450b03fb1c0942a210eab357dab277403","pens":19,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]]},"u993c-ue0100":{"identity":{"root":"u993c-ue0100","file":"engine-whole-u993c-ue0100.json","fileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f"},"fullProofSHA256":"230a02c28010e6d32c170e600b72b1e4ef8d5d5972f1a353e8de56e1243afa19","pens":19,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]]},"u993c-ue0101":{"identity":{"root":"u993c-ue0101","file":"engine-whole-u993c-ue0101.json","fileSHA256":"0206fc9154c5a23f44dc48c14a2d81e92ba1f8593c6b32c0db30cc962cd6534f"},"fullProofSHA256":"78cc598db25fa8b4e4892af60f5599aa753da03d81abb05791f98e0b67662886","pens":19,"sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]]},"u993c-ue0102":{"identity":{"root":"u993c-ue0102","file":"engine-whole-u993c-ue0102.json","fileSHA256":"5464992fc12c35d0b32e6cfd28a65a24637391175651f607741c3ad167acc4d9"},"fullProofSHA256":"ed6eec86146b37387c3dab0f93c61891e2bcbb444b4c027c6da5a11ee5b3c7f0","pens":19,"sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"e9b9ccc73cd6478efed79a50d84ff67a9db1f6c0dbdcc899cfa7d440b20d5509")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
