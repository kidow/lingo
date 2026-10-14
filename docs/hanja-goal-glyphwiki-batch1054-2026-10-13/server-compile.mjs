import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"c47ad2bdac9231db87a83895abb852483104bf6339d3d57f0c1635aa77e09a1b")
const manifest={"u9079-g":{"identity":{"root":"u9079-g","file":"engine-whole-u9079-g.json","fileSHA256":"bd4fb6410f5e7a1bd2b169c693581d3a45a2637ae9cfb750768048a50a166f1c"},"fullProofSHA256":"49414c8a6c647b224d6819041bb5aaeb63d32794cd93b7e559fcabead8ce8d87","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]]},"u9079-ue0102":{"identity":{"root":"u9079-ue0102","file":"engine-whole-u9079-ue0102.json","fileSHA256":"0848b462b98f241fe2f1331c5cf9eec9d518f45009c18f40c09dfc24b3a0324f"},"fullProofSHA256":"b93c27028feff524a7862b344809f6de6d80bc7730dca44fca28c28e07070168","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]]},"u9079-var-001":{"identity":{"root":"u9079-var-001","file":"engine-whole-u9079-var-001.json","fileSHA256":"6e5a1d93ccf33131670497cb0a2d786fee282073f3f90f77f47020afc6703779"},"fullProofSHA256":"4f829c38cf07a5cff387ad1262d18587f360485d2459064ca4b3d756c3794aca","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]]},"u9079-var-002":{"identity":{"root":"u9079-var-002","file":"engine-whole-u9079-var-002.json","fileSHA256":"5b21487c8880df543f939edfc9776e0048b24144df0d4237f32f7dc55619f55a"},"fullProofSHA256":"4bbe62b08b04f5bfb1ce706528c9e5a1349fd6633cec86778bc8c3402b403c10","pens":16,"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"98d07cd2de607719ba66f249e500f7898973912dd5268dcf9ad6a02307af3949")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
