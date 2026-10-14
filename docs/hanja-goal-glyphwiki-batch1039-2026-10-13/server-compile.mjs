import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"c475633c6fdfb001ccdf5b130d55f0f04276505fa8e444a3ce6eb2d4354f17bf")
const manifest={"u5a93":{"identity":{"root":"u5a93","file":"engine-whole-u5a93.json","fileSHA256":"689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8"},"fullProofSHA256":"3ab3258a839c3f6521bacd242ca98345f678d111fb9a31f582df72b4e817c48e","pens":12,"sourceGroups":[[0],[1],[3,2,4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14]]},"u5a93-ue0100":{"identity":{"root":"u5a93-ue0100","file":"engine-whole-u5a93-ue0100.json","fileSHA256":"689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8"},"fullProofSHA256":"63a39221e2930b963836d6e32340d151fbf4afc61cbc545510f9c3f9b5ab06f3","pens":12,"sourceGroups":[[0],[1],[3,2,4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
