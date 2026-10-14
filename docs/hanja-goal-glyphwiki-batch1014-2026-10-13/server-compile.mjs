import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"778d4f042f3e6950a7749d1b8be956492fe9d9c28456ec90ad1b3f59c8552853")
const manifest={"u9799":{"identity":{"root":"u9799","file":"engine-whole-u9799.json","fileSHA256":"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432"},"fullProofSHA256":"e47dc7cfc7349653dba759760bfd65120d770590ef12340da90e769993fe6c21","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18]]},"u9799-ue0100":{"identity":{"root":"u9799-ue0100","file":"engine-whole-u9799-ue0100.json","fileSHA256":"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432"},"fullProofSHA256":"e47dc7cfc7349653dba759760bfd65120d770590ef12340da90e769993fe6c21","pens":16,"sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"a615c7e46db0633502accb3f7873a2b71d7fc2c0a28433964541779ca0f23432")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
