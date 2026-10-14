import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"67b829336c1e5888f6821699eaf4d21295acb678f99e0efd41db7702c04de3c5")
const manifest={"u9789":{"identity":{"root":"u9789","file":"engine-whole-u9789.json","fileSHA256":"ec780c9465cf5f272c934cf21ba0207ee1f9a5963bcf6d7c685f145bde1dc376"},"fullProofSHA256":"7cdcc61ef16eddd6db8e849269ce016d81aa8399f108c0e6f6ef1b9cea312ab2","pens":15,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]]},"u9789-ue0100":{"identity":{"root":"u9789-ue0100","file":"engine-whole-u9789-ue0100.json","fileSHA256":"ec780c9465cf5f272c934cf21ba0207ee1f9a5963bcf6d7c685f145bde1dc376"},"fullProofSHA256":"63176f8e723ef6414b2acb89ba43909770229a5e2e3fa01a797804963c55f890","pens":15,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"ec780c9465cf5f272c934cf21ba0207ee1f9a5963bcf6d7c685f145bde1dc376")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
