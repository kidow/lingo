import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const directory = process.env.REVIEW_DIR || '/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch958-2026-10-13'
const {compileSourceWhole,renderProgressive,wholeSourceIdentities,sourceGroups,sourceOrderPermutation} = await import(directory + '/progressive-order-candidate.mjs')
const read = file => readFileSync(directory + '/' + file)
const hash = value => createHash('sha256').update(value).digest('hex')
const config = JSON.parse(read('source-order-combined-preparation.json'))
for (const [file,pin] of Object.entries(config.pins)) assert.equal(hash(read(file)),pin,'Original/candidate dependency ' + file)
const root = process.argv[2] || (process.argv[1]?.startsWith('u') ? process.argv[1] : 'u8600-ue0102')
assert.equal(root,'u8600-ue0102','Unsupported whole root')
const identity = wholeSourceIdentities[root]
assert.deepEqual(identity,{root:'u8600-ue0102',file:'engine-whole-u8600-ue0102.json',fileSHA256:'c8d0def2940322eb47a32c2c26f38f254107f50391a9050cef0d1abf5e5459d1'})
assert.equal(hash(read(identity.file)),identity.fileSHA256)
assert.equal(hash(read('engine-proof.json')), '832b6fb9106c1f3c384cdaad21e36aef916c8b830be4d3af8db17150472ac3bf')
const header = JSON.parse(read('engine-proof.json'))
const selected = JSON.parse(read(identity.file))
const proof = {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
assert.equal(hash(JSON.stringify(proof)), 'fd46ea6e994260c722d029b72952b9118e7049b911231627e2427198c32e88b4')
const before = JSON.stringify(proof)
const strokes = compileSourceWhole(root,proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before)
assert.equal(strokes.length,20)
assert.equal(strokes.flat().length,21)
assert.equal(hash(JSON.stringify(strokes)), 'babd04963c177be1328660e1ddc85035afc65f702e2e712fc2a5659ffa05e891')
console.log(JSON.stringify({sourceRoot:root,identity,sourceGroups,sourceOrderPermutation,compiledPens:strokes.length,compiledMasks:strokes.flat().length,strokes,render:renderProgressive.toString(),blocked:false,nativeApproval:false,runtimeApplied:false}))
