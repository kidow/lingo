import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6")
const manifest={"u9a22":{"identity":{"sourceRoot":"u9a22","sourceProofFile":"./engine-whole-u9a22.json","sourceProofFileSha256":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8b4cc3119febcb64146fb6b64471b6bea7ab6ca2134ecbd5769fed1fda7ea1d9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bd167ab27a95af086c8cb2a14d4622c92860e019eedcf4f367fe59b1d5f01056"},"fullProofSHA256":"4cdaae773d849bf8a9545b7e816cc015d366130068327197c688d4a1e31012e5","pens":19,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17,18],[19],[20,21],[22]]},"u9a22-ue0100":{"identity":{"sourceRoot":"u9a22-ue0100","sourceProofFile":"./engine-whole-u9a22-ue0100.json","sourceProofFileSha256":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8b4cc3119febcb64146fb6b64471b6bea7ab6ca2134ecbd5769fed1fda7ea1d9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bd167ab27a95af086c8cb2a14d4622c92860e019eedcf4f367fe59b1d5f01056"},"fullProofSHA256":"4cdaae773d849bf8a9545b7e816cc015d366130068327197c688d4a1e31012e5","pens":19,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17,18],[19],[20,21],[22]]}}
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
