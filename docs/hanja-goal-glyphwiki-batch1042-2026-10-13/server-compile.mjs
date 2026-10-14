import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"e428a1351db11996cb444d238a3bf01ef06efb74a1d709c94a6eb523bf288695")
const manifest={"u5686-ue0102":{"identity":{"root":"u5686-ue0102","file":"engine-whole-u5686-ue0102.json","fileSHA256":"83155d6abe17b816b06a62f2a98940c17f14e2046478380c14159810bd772f18"},"fullProofSHA256":"86a8fef3c201586baee790115d77c9be3cc2ff930c5d672fbb75598b906e23e6","pens":17,"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18,19],[20]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"b20075ea51dc510eae2c1b8d021a3b65ef462ffab27e768d91c0fc33110efa38")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
