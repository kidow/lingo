import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"acd07a688a310d15c91fed3854f02e1b784203d131d78ca5be84093e010c03ac")
const manifest={"u54fb":{"identity":{"sourceRoot":"u54fb","sourceProofFile":"./engine-whole-u54fb.json","sourceProofFileSha256":"528cba8f9ab4d9d410c4d9415e415271339938ad47c78575bcde4be8be7eeb3e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b307718caed02108a6c92ee285ceda9d5b61dfeecc47efc81c3d99b5f450b73b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"84018ca72962bf309fdb4b5c552fbefdfe4cacbafa59ae8cd3e1008b00d8d964"},"fullProofSHA256":"670ed4d0e2805916d7f1cf3dcc0863ff7e19cafd83beea1ddff188f41b826f8c","pens":10,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9],[10],[11]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicitly pinned complete whole case is supported')
const pin=manifest[root],selected=candidateWholeProofs.find(c=>c.identity.sourceRoot===root)
assert(selected);assert.deepEqual(selected.identity,pin.identity);assert.deepEqual(selected.sourceGroups,pin.sourceGroups)
const id=selected.identity,bytes=readFileSync(new URL(id.sourceProofFile,import.meta.url)),hb=readFileSync(new URL(id.sourceHeaderFile,import.meta.url))
assert.equal(hash(bytes),id.sourceProofFileSha256);assert.equal(hash(hb),id.sourceHeaderFileSha256)
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.sourceProofFile,sourceProofFileSHA256:id.sourceProofFileSha256,sourceGroups:selected.sourceGroups,nativeApproval:false}))
