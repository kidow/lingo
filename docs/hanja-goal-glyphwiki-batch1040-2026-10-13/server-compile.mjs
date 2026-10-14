import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"7f9066ab2185c399a409326377cd36736a35631e266f05f3c5da2bae351cafba")
const manifest={"u982e":{"identity":{"root":"u982e","file":"engine-whole-u982e.json","fileSHA256":"71adad899d9205cf2a08696e75a39c2d223789da9c8a7f66f2c617ab305e6d42"},"fullProofSHA256":"28d206436faacc485364eafbf0c6ce25a392d447cd87bf648caa501915bfba0c","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]]},"u982e-ue0100":{"identity":{"root":"u982e-ue0100","file":"engine-whole-u982e-ue0100.json","fileSHA256":"71adad899d9205cf2a08696e75a39c2d223789da9c8a7f66f2c617ab305e6d42"},"fullProofSHA256":"a39aba1e3416ece7a390e96ca194cd329956148131d04ccdedad65732c971c75","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"71adad899d9205cf2a08696e75a39c2d223789da9c8a7f66f2c617ab305e6d42")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
