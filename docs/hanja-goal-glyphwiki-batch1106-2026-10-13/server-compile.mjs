import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"63dd5e13d7a8676e56b8c1b64e74a76c468bc7bb317a1b820d16ded7ad0490e5")
const manifest={"zihai-163645":{"identity":{"root":"zihai-163645","file":"engine-whole-zihai-163645.json","fileSHA256":"4eedd08fc16a6a4f206db9c0ed269b2bb8e86ec92ccf7fecdb76199fd30360f8"},"fullProofSHA256":"c8cd31272dedff54191a9c756572aa45b4619135b8447e0b32b53ff4531ba7f3","pens":19,"sourceGroups":[[0,1],[2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18],[19,20],[21],[22],[23]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"4eedd08fc16a6a4f206db9c0ed269b2bb8e86ec92ccf7fecdb76199fd30360f8")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
