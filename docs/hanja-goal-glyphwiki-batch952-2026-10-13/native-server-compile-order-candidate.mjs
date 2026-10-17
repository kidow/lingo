import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'

const directory = process.env.REVIEW_DIR || '/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch952-2026-10-13'
const read = file => fs.readFileSync(directory + '/' + file)
const hash = value => createHash('sha256').update(value).digest('hex')
assert.equal(hash(read('native-server-input-pins.json')), '8517d2307395e5452c838215ba6ff463697998bb4b492c253c15fe17aafd277d', 'Original caller manifest bytes')
assert.equal(hash(read('progressive-order-candidate.mjs')), 'a9a490cc60f2044933155a76a798874e81310d4a311f589e52adf2c3605c8b82', 'Candidate adapter bytes')
const config = JSON.parse(read('native-server-input-pins.json'))
for (const [file,pin] of Object.entries(config.pins)) assert.equal(hash(read(file)),pin,'Original input ' + file)
const adapter = await import(directory + '/progressive-order-candidate.mjs')
const identity = config.identity
assert.deepEqual(identity,adapter.selectedProofIdentity)
const selected = JSON.parse(read(identity.sourceProofFile))
const header = JSON.parse(read(identity.sourceHeaderFile))
const proof = {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.equal(hash(JSON.stringify(proof)), '7b00f149de47d0626a1167bc4e8de874862bdf3d1f99fcc4a946a344952ba76d')
assert.equal(JSON.parse(read('sources.json')).archive.sha256, '7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
const before = JSON.stringify(proof)
const strokes = adapter.compileProgressive(proof.trace,proof,identity)
assert.equal(JSON.stringify(proof),before)
assert.equal(strokes.length,17)
assert.equal(strokes.flat().length,18)
assert.equal(hash(JSON.stringify(strokes)), 'fc6e4eb27426a20b029f57736acfecd034361876333271cf9e32858abb9908cb')
assert.equal(adapter.nativeApproval,false)
assert.equal(adapter.runtimeApplied,false)
console.log(JSON.stringify({sourceRoot:identity.sourceRoot,identity,sourceVerificationPassed:true,sourceGroups:adapter.sourceGroups,sourceOrderPermutation:adapter.sourceOrderPermutation,strokes,render:adapter.renderProgressive.toString(),compiledPens:strokes.length,compiledMasks:strokes.flat().length,blocked:false,nativeApproval:false,runtimeApplied:false}))
