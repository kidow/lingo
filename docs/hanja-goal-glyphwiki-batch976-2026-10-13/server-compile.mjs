import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"66583dd4898d320198202434a8b2e9eec20d4418e39cc7ca681c3e5f8436c931")
const manifest={"u615d-ue0102":{"identity":{"sourceRoot":"u615d-ue0102","sourceProofFile":"./engine-whole-u615d-ue0102.json","sourceProofFileSha256":"bbe10304713328888505f953340102dcdf33c966f486b3f16ba2562b97b2fe45","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"fd372548df50bcc53aaea6bf74c38c3c8406ec372e7858d1f0f6e9ee17426da9"},"fullProofSHA256":"3fb49ef872184ff426053823946b397397b53e0d5141aaa2780056539a9aa31a","pens":15,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]]}}
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
