import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"3eaab0337588dc2d03538413a4c1b8890487a5b0b0296f6c889513714fdc5e7b")
const manifest={"u5d9e":{"identity":{"root":"u5d9e","file":"engine-whole-u5d9e.json","fileSHA256":"892f6f89e783fc23c9b4da3b6242a59bc9b77ec0d331652dc7c1e59280cec62d"},"fullProofSHA256":"a552a7ff7a9652c7f3a9e7ca4f7cb3ff76fde7db1efb932e5a52421a90c14d97","pens":15,"sourceGroups":[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17]]}}
const root=process.argv[2]
assert(Object.hasOwn(manifest,root),'Only explicitly pinned original source profiles may compile')
const pinned=manifest[root],identity=wholeSourceIdentities[root]
assert.deepEqual(identity,pinned.identity);assert.deepEqual(sourceGroups,pinned.sourceGroups)
const bytes=readFileSync(new URL(identity.file,import.meta.url));assert.equal(hash(bytes),identity.fileSHA256)
const hb=readFileSync(new URL('./engine-proof.json',import.meta.url));assert.equal(hash(hb),"892f6f89e783fc23c9b4da3b6242a59bc9b77ec0d331652dc7c1e59280cec62d")
const header=JSON.parse(hb),raw=JSON.parse(bytes)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pinned.fullProofSHA256,'Caller protects complete header attribution even when legacy compiler treats extra fields as optional')
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pinned.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256,sourceGroups,nativeApproval:false}))
