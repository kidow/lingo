import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroupsByWhole} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"8cf46f3714ddb579cfeec39b312bebae130cfc223662e8338e383a1779096eb2")
const manifest={"u9139":{"identity":{"root":"u9139","file":"engine-whole-u9139.json","fileSHA256":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241"},"fullProofSHA256":"b507195dcbb136d662df7b4ddda3948103fe72cdef6dc40f88d16e914efff333","pens":17},"u9139-k":{"identity":{"root":"u9139-k","file":"engine-whole-u9139-k.json","fileSHA256":"40f8ca488dee7583af1c27144d72a7850d006ad0427354d389592878ff26ceb7"},"fullProofSHA256":"b935e8a491385059750705c4ca7c4de7ce4d655836ff5da4ce7445a899e29880","pens":17},"u9139-ue0100":{"identity":{"root":"u9139-ue0100","file":"engine-whole-u9139-ue0100.json","fileSHA256":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241"},"fullProofSHA256":"48b428144b73e06853cf6e49393807c7a92ee6745d20ed05a53274752ce22ba5","pens":17}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only an explicitly pinned complete source profile is supported')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"e937e387bb9b3923c81fceba944d9a78f5bf73467a93dc4bbc06875a845dff0c")
const header=JSON.parse(hb),original=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...original,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups:sourceGroupsByWhole[root],nativeApproval:false}))
