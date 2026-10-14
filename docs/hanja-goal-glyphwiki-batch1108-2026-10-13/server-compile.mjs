import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"79108b505180f838abb76ec4e44aa68f809bbcd8924b926cab12e0523cf0902a")
const manifest={"u6201":{"identity":{"root":"u6201","file":"engine-whole-u6201.json","fileSHA256":"32d35ac4821d409fab91aa3c2203e1647c8bac35d83e086cf13a2cd0cf1f0784"},"fullProofSHA256":"d42163d6551047cec9a0b8ae17590d754fcd57c3bc539471590248260b5811be","pens":23,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23]]},"u6201-ue0100":{"identity":{"root":"u6201-ue0100","file":"engine-whole-u6201-ue0100.json","fileSHA256":"32d35ac4821d409fab91aa3c2203e1647c8bac35d83e086cf13a2cd0cf1f0784"},"fullProofSHA256":"fba8931549bd05f6e17917110fbad2585dcf369088f3a69cff5843d42eb2ee42","pens":23,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"32d35ac4821d409fab91aa3c2203e1647c8bac35d83e086cf13a2cd0cf1f0784")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
