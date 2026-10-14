import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"ab770cc938e1ae77d886cbed5fc50c0413a61853be534ae0ece144fff419f3a8")
const manifest={"u7fec":{"identity":{"root":"u7fec","file":"engine-whole-u7fec.json","fileSHA256":"610e4fe9ecd96555428014d82c8ea0994c168060149a9d059e795eda4c24e032"},"fullProofSHA256":"d093d2996745a3a1f425496c38bc8669c50c138b371d6526073d24faa23ad0a4","pens":15,"sourceGroups":[[0,1],[2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18]]},"u7fec-ue0100":{"identity":{"root":"u7fec-ue0100","file":"engine-whole-u7fec-ue0100.json","fileSHA256":"610e4fe9ecd96555428014d82c8ea0994c168060149a9d059e795eda4c24e032"},"fullProofSHA256":"ef7e03a6163b5d9b528def9aef4002041d8d4c42a5ebc52f7817e96dbb5b6c55","pens":15,"sourceGroups":[[0,1],[2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"610e4fe9ecd96555428014d82c8ea0994c168060149a9d059e795eda4c24e032")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
