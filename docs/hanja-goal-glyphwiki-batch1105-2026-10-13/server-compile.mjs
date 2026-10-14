import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"97a9922ff99ce0dde06ea6d3728a156acec635f8105bcbae37843fde9d87ccc1")
const manifest={"koseki-532530@2":{"identity":{"root":"koseki-532530@2","file":"engine-whole-koseki-532530@2.json","fileSHA256":"60e5b88dad2c24d554a64e4a8b881745f19c84e9c9784bfdf1177b4f87db4baf"},"fullProofSHA256":"39feead2b1d8c02bee38274dac5e67b10a95f2bb02a7ed1241042b32f06c9529","pens":19,"sourceGroups":[[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20],[21]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"60e5b88dad2c24d554a64e4a8b881745f19c84e9c9784bfdf1177b4f87db4baf")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
