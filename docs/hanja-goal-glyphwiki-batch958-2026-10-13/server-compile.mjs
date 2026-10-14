import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"8a1c0d482e643e18cc3533682f7715930b6c7d9ba1bfbb30c67d81442ba72c85")
const manifest={"u8600-ue0102":{"identity":{"root":"u8600-ue0102","file":"engine-whole-u8600-ue0102.json","fileSHA256":"c8d0def2940322eb47a32c2c26f38f254107f50391a9050cef0d1abf5e5459d1"},"fullProofSHA256":"fd46ea6e994260c722d029b72952b9118e7049b911231627e2427198c32e88b4","pens":20,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]]}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"832b6fb9106c1f3c384cdaad21e36aef916c8b830be4d3af8db17150472ac3bf")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false}))
