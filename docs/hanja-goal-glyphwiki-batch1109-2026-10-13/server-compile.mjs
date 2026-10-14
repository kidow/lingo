import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileSourceWhole,renderProgressive,wholeSourceIdentities} from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),"4c52b66a3a82c7a11a6c43a99c48f4aba3f10e7182465ee10cf3951df466dbed")
const manifest={"u70d4":{"identity":{"root":"u70d4","file":"engine-whole-u70d4.json","fileSHA256":"05276b4271d5e0ceff57e4c8f50add960a4e04c4fa5ebcd5922d8fa8e78d6843"},"fullProofSHA256":"57a53e47f27d795333109ee685c031cac6c3e93cd1f1ebfdd3e92c170e611e89","pens":10,"sourceGroups":[[0],[1],[2],[3,4],[5],[6,7],[8],[9],[10,11],[12]]},"u70d4-ue0100":{"identity":{"root":"u70d4-ue0100","file":"engine-whole-u70d4-ue0100.json","fileSHA256":"05276b4271d5e0ceff57e4c8f50add960a4e04c4fa5ebcd5922d8fa8e78d6843"},"fullProofSHA256":"6321a14e9d0f49686f23b5b64041e36d3c3d5979ef8cfe37afb8f5cb44d89bba","pens":10,"sourceGroups":[[0],[1],[2],[3,4],[5],[6,7],[8],[9],[10,11],[12]]}}
const root=process.argv[2];assert(Object.hasOwn(manifest,root),'Only an explicit fixed whole profile is supported')
const pin=manifest[root],id=wholeSourceIdentities[root]
assert.deepEqual(id,pin.identity)
const bytes=readFileSync(new URL(id.file,import.meta.url)),hb=readFileSync(new URL('./engine-proof.json',import.meta.url))
assert.equal(hash(bytes),id.fileSHA256);assert.equal(hash(hb),"05276b4271d5e0ceff57e4c8f50add960a4e04c4fa5ebcd5922d8fa8e78d6843")
const h=JSON.parse(hb),raw=JSON.parse(bytes),proof={engineRevision:h.engineRevision,engineHashes:h.engineHashes,...raw,sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256}
assert.equal(hash(JSON.stringify(proof)),pin.fullProofSHA256)
const before=JSON.stringify(proof),strokes=compileSourceWhole(root,proof.trace,proof,id)
assert.equal(JSON.stringify(proof),before);assert.equal(strokes.length,pin.pens)
console.log(JSON.stringify({strokes,render:renderProgressive.toString(),sourceRoot:root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256,sourceGroups:pin.sourceGroups,nativeApproval:false}))
