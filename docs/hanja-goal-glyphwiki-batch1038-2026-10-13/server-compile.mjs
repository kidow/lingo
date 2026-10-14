import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"120ffb2ebdf67c28f7be9710acb8a12915f09245147f4f460220b8787800a766")
const manifest={"u582d":{"identity":{"root":"u582d","file":"engine-whole-u582d.json","fileSHA256":"31d5a4cb591e7ab86081f450bd2f3d664707ec21ca1ba5183a639921a044b00e"},"fullProofSHA256":"61f4cdb43f271f215fb2e9f6f090b9245bbf2985ba38b3fa6b4b67b370c5e36f","pens":12,"sourceGroups":[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13]]},"u582d-ue0100":{"identity":{"root":"u582d-ue0100","file":"engine-whole-u582d-ue0100.json","fileSHA256":"31d5a4cb591e7ab86081f450bd2f3d664707ec21ca1ba5183a639921a044b00e"},"fullProofSHA256":"819603cf355a173124c4acdcc1756ca0c790af4e6c970858e2a352974ec1d9bc","pens":12,"sourceGroups":[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"31d5a4cb591e7ab86081f450bd2f3d664707ec21ca1ba5183a639921a044b00e")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
