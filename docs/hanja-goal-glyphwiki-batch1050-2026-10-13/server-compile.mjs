import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"8fb0b804892a5c8cf5ca36cedf9610d27e2a05b52e6515a76cec4802b88eecf0")
const manifest={"u8afc":{"identity":{"root":"u8afc","file":"engine-whole-u8afc.json","fileSHA256":"e4dd998406f9fc841981e454bd011098d009daca2c01b9df3b93a001adbd27d2"},"fullProofSHA256":"7774f5d36cbff4b23f4e578eda97deb1d76aca6ce8c1a9eda097349bb8e71918","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17]]},"u8afc-ue0100":{"identity":{"root":"u8afc-ue0100","file":"engine-whole-u8afc-ue0100.json","fileSHA256":"e4dd998406f9fc841981e454bd011098d009daca2c01b9df3b93a001adbd27d2"},"fullProofSHA256":"e01676a0c45905ceec850ccb76265f9e93a6c36cfa8b8f7f897c8cd12d388c25","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17]]},"u8afc-ue0101":{"identity":{"root":"u8afc-ue0101","file":"engine-whole-u8afc-ue0101.json","fileSHA256":"e4dd998406f9fc841981e454bd011098d009daca2c01b9df3b93a001adbd27d2"},"fullProofSHA256":"c68da99d8c988e323fc9a7c827ba9ebacfd48617b198af91f126d6887b8a6c02","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17]]},"u8afc-ue0102":{"identity":{"root":"u8afc-ue0102","file":"engine-whole-u8afc-ue0102.json","fileSHA256":"8ce30f49741d64cecb77b3618f99feccc76cff51b493081c1aded532dd39c3f6"},"fullProofSHA256":"cb2e4da9f1ff40b617fa214566e6ae1b56237816f99ada1451e0dc0a2fd7810f","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"e4dd998406f9fc841981e454bd011098d009daca2c01b9df3b93a001adbd27d2")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
