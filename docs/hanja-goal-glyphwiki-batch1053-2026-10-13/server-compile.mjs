import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"bd9e6f3948e855863e586ba024f65917fdf1df4f51b9a0f995d8e162085bcd89")
const manifest={"u89ff":{"identity":{"root":"u89ff","file":"engine-whole-u89ff.json","fileSHA256":"d2997421064ee5ec9aa7f69a752d79209f8b5181a729baf1db14c80aa625aae0"},"fullProofSHA256":"f99cf002de61ecab6478a9d4cc628fa4b110720bbd0ac576de928559a4732b07","pens":25,"sourceGroups":[[0],[1,2],[3],[4,5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22,23],[24],[25],[26],[27,28],[29]]},"u89ff-ue0100":{"identity":{"root":"u89ff-ue0100","file":"engine-whole-u89ff-ue0100.json","fileSHA256":"d2997421064ee5ec9aa7f69a752d79209f8b5181a729baf1db14c80aa625aae0"},"fullProofSHA256":"b235cad87f99df9f656dab95091970492cfe46b486557cde3e24c7a205cf42b8","pens":25,"sourceGroups":[[0],[1,2],[3],[4,5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22,23],[24],[25],[26],[27,28],[29]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"d2997421064ee5ec9aa7f69a752d79209f8b5181a729baf1db14c80aa625aae0")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
