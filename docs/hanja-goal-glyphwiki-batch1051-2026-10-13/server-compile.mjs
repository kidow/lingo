import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"49f6c24e5d00e1dd917f85d2f2b5c303f2833f74cf30a8a1aa55691e6b671408")
const manifest={"u54ba":{"identity":{"root":"u54ba","file":"engine-whole-u54ba.json","fileSHA256":"c090501d558674ff2c7bc38ae62fec1cddc7d3e4d1ab006d97de5726ff8edbe2"},"fullProofSHA256":"31dd362c5b421992b469e60a18396b19868b7cffd1e8e784bc67cf96e5e878da","pens":9,"sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10]]},"u54ba-ue0100":{"identity":{"root":"u54ba-ue0100","file":"engine-whole-u54ba-ue0100.json","fileSHA256":"c090501d558674ff2c7bc38ae62fec1cddc7d3e4d1ab006d97de5726ff8edbe2"},"fullProofSHA256":"d46201153e41da3dffe6c6b2bd30eeec542eed528096e61217a9b21b8a37c0cc","pens":9,"sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"c090501d558674ff2c7bc38ae62fec1cddc7d3e4d1ab006d97de5726ff8edbe2")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
