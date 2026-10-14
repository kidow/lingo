import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"ca04b26cf31f4c3221d202dc8b1f3b32d332ea60fb8af964542ea6fc3f711d2c")
const manifest={"u5635":{"identity":{"root":"u5635","file":"engine-whole-u5635.json","fileSHA256":"3f0f397fbae8b5f00882e21ef20baa134e493ccfb6d72654d97fb13b5911a4d0"},"fullProofSHA256":"43d23e3580e4e7d6b4b05feef87ad3e7e9621bb7da8a624b9b2da571cdeed4ea","pens":15,"sourceGroups":[[0],[1,2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]},"u5635-ue0100":{"identity":{"root":"u5635-ue0100","file":"engine-whole-u5635-ue0100.json","fileSHA256":"3f0f397fbae8b5f00882e21ef20baa134e493ccfb6d72654d97fb13b5911a4d0"},"fullProofSHA256":"33e5c16a766df3b1c7a756424a26fd29109f8ee16bac8260bb6a142ac65c5ce5","pens":15,"sourceGroups":[[0],[1,2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"3f0f397fbae8b5f00882e21ef20baa134e493ccfb6d72654d97fb13b5911a4d0")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
