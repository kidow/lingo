import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,candidateWholeProofs} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"644e58a03ae6d5a2630cb15d2510da19fb1696a998da4a81f422ebd26e96597f")
const manifest={"u96a4":{"identity":{"sourceRoot":"u96a4","sourceProofFile":"./engine-whole-u96a4.json","sourceProofFileSha256":"73c81d45b46962635d95fdaaaf0a17705d204ab2d63f24f64e91d7c5514da4e1","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"719d85dc7057947d874e3938c9408fd522b401cb74d9f5d4751f69868a4c4418"},"fullProofSHA256":"7b43578e702eb48d2334e2ae49b77dfeec98d663bc78afaa6f063df73fdad4bf","pens":15,"sourceGroups":[[0,1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]]},"u96a4-ue0100":{"identity":{"sourceRoot":"u96a4-ue0100","sourceProofFile":"./engine-whole-u96a4-ue0100.json","sourceProofFileSha256":"73c81d45b46962635d95fdaaaf0a17705d204ab2d63f24f64e91d7c5514da4e1","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"719d85dc7057947d874e3938c9408fd522b401cb74d9f5d4751f69868a4c4418"},"fullProofSHA256":"7b43578e702eb48d2334e2ae49b77dfeec98d663bc78afaa6f063df73fdad4bf","pens":15,"sourceGroups":[[0,1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]]}}
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
