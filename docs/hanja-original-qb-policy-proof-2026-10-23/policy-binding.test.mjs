import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const base = new URL('../../', import.meta.url)
const own = new URL('./', import.meta.url)
const sha = value => createHash('sha256').update(value).digest('hex')
const read = path => readFileSync(new URL(path, base))
const initial = JSON.parse(readFileSync(new URL('initial-feasibility.json', own)))
const contact = JSON.parse(readFileSync(new URL('source-contact-prefix.json', own)))
function verifyWhole(context, fixture) {
  assert.equal(sha(fixture), context.fixtureSHA256)
  const entry = JSON.parse(fixture)[context.root]
  assert.deepEqual(entry.identity, context.identity)
  assert.equal(entry.strokes.length, context.logicalPens)
  assert.deepEqual(entry.fullProof.trace[context.previousRaw], contact.originalPreviousCall)
  assert.deepEqual(entry.fullProof.trace[context.currentRaw], contact.originalCurrentCall)
  assert.deepEqual(entry.strokes[context.logicalPen - 1], contact.originalLogicalMasks)
  assert.equal(entry.nativeApproval, false)
  return entry
}
test('QB first policy binding: two exact wholes, 32 initial bindings, one contact certificate', () => {
  assert.equal(initial.bindingsCount, 32)
  assert.equal(initial.uniqueMathComputations, 18)
  assert.equal(Object.keys(initial.uniqueCertificates).length, 18)
  assert.equal(contact.proofComputations, 1)
  assert.equal(contact.bindings, 2)
  assert.notEqual(contact.wholeContexts[0].fixtureSHA256, contact.wholeContexts[1].fixtureSHA256)
  assert.equal(sha(readFileSync(new URL('source-contact-prefix.py', own))), contact.newProofGeneratorSHA256)
  assert.equal(sha(read(contact.methodSource.path)), contact.methodSource.sha256)
  let negatives = 0
  for (const context of contact.wholeContexts) {
    const raw = read(context.fixture)
    verifyWhole(context, raw)
    assert.throws(() => verifyWhole({ ...context, root: 'wrong' }, raw)); negatives++
    assert.throws(() => verifyWhole({ ...context, currentRaw: context.previousRaw }, raw)); negatives++
    assert.throws(() => verifyWhole(context, Buffer.concat([raw, Buffer.from(' ')]))); negatives++
  }
  for (const certificate of Object.values(initial.uniqueCertificates)) {
    assert.equal(certificate.notRasterProof, true)
    assert.equal(certificate.notSourcePIntersectionProof, true)
    assert.equal(certificate.notPreviousMaskContactProof, true)
  }
  assert.equal(contact.certificate.footTriangles, 2)
  assert.equal(contact.certificate.bodySlabs, 21)
  assert.equal(contact.fullBodyXMax, 95.1)
  assert.ok(contact.fullBodyXMax > contact.guideEndpointX)
  assert.equal(contact.internalDisplayMicroclockNew, true)
  for (const artifact of [initial, contact]) {
    assert.equal(artifact.nativeApproval, false)
    assert.equal(artifact.registered, false)
  }
  assert.equal(negatives, 6)
})
test('QB initial target bindings preserve all 32 original source masks', () => {
  const entries = new Map(initial.wholeContexts.map(context => {
    const raw = read(context.fixture)
    assert.equal(sha(raw), context.fixtureSHA256)
    return [context.root, JSON.parse(raw)[context.root]]
  }))
  const seen = new Set()
  for (const binding of initial.bindings) {
    const entry = entries.get(binding.root)
    const certificate = initial.uniqueCertificates[binding.certificateSourceSHA256]
    assert.deepEqual(entry.strokes[binding.pen - 1][binding.mask - 1], certificate.originalSegment)
    const target = `${binding.root}:${binding.pen}:${binding.mask}`
    assert.equal(seen.has(target), false)
    seen.add(target)
  }
  assert.equal(seen.size, 32)
})
