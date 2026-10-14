import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroupsByWhole} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"6ac3a4857533d3f0a7764edba6603b5deabe483cc61798d1d0e7c313f98a8724")
const manifest={"u68f8":{"identity":{"root":"u68f8","file":"engine-whole-u68f8.json","fileSHA256":"81edbe3109ad910b3f28e1bcfb5e1fb93e041b81a716b1474a84fd5c6956c4a3"},"fullProofSHA256":"c6c4d14dd42873e31cdc5a653f3b326aaa7c6cecb049140d038605c4eac01a79","pens":12},"u68f8-01":{"identity":{"root":"u68f8-01","file":"engine-whole-u68f8-01.json","fileSHA256":"6ae745c705159b111d85860d4dd0bc1a73903ac32db79ddc6ae8a399baf0ed73"},"fullProofSHA256":"73d7ca31150ac2a46617e00dc500ba6e6d745fbc6885a5d70f9e648f01cc8dd0","pens":12}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only an explicitly pinned complete source profile is supported')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"801936866eca159104ef90452f4e6d200105f24c4f2d24959fe3723d055fe93c")
const header=JSON.parse(hb),original=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...original,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups:sourceGroupsByWhole[root],nativeApproval:false}))
