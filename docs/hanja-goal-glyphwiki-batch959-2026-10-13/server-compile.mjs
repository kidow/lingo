import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"441a899527e22fdf3c53aa5caa9f784a348b70797610d699e3b0d53b96b64e21")
const manifest={"u9a52":{"identity":{"root":"u9a52","file":"engine-whole-u9a52.json","fileSHA256":"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0"},"fullProofSHA256":"7dc6356e60e854e8e873ff6f9e1c8b4ea9c2b18913d87516926f0ba3fb1acdec","pens":22,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19],[20,21],[22],[23],[24],[25]]}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"dc653e47f2e31c8e9d247512bea5e42bb00ae61dedba3549cba5fe8854cd8ec0")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false}))
