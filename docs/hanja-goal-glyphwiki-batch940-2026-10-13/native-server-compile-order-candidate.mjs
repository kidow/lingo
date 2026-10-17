import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath, pathToFileURL} from 'node:url'

const directory = process.env.REVIEW_DIR || fileURLToPath(new URL('.', import.meta.url))
const read = file => readFileSync(directory + '/' + file)
const hash = value => createHash('sha256').update(value).digest('hex')
assert.equal(hash(read('domestic-order-source-audit.json')), '1cdb2c5746a4cb0784ef21e22eba94bd361f5445afe27b41c8333beb51a91481', 'Frozen order audit')
assert.equal(hash(read('domestic-order-adapter.mjs')), 'c44f3124091702ae7b3c28c3c45364205b2f8e37bc2c179467b6e5b03a9401f6', 'Frozen order adapter')
const audit = JSON.parse(read('domestic-order-source-audit.json'))
for (const [file, pin] of Object.entries(audit.originalInputsBytePins)) assert.equal(hash(read(file)), pin, 'Original byte pin ' + file)
const adapter = await import(pathToFileURL(directory + '/domestic-order-adapter.mjs'))
const root = process.env.WHOLE_ROOT || adapter.selectedProofIdentity.root
assert.equal(root, 'u8e27', 'Unsupported selected whole')
assert.deepEqual(adapter.domesticToOriginalPen, [1,2,3,4,5,6,7,8,9,10,11,13,12,14,15])
assert.equal(adapter.nativeApproval, false)
assert.equal(adapter.runtimeApplied, false)
const identity = {
  root,
  sourceProofFile: 'engine-whole-u8e27.json',
  sourceProofFileSHA256: audit.originalInputsBytePins['engine-whole-u8e27.json'],
  engineHeaderSHA256: audit.originalInputsBytePins['engine-proof.json'],
  sourceFileSHA256: audit.originalInputsBytePins['sources.json'],
  compilerFileSHA256: audit.originalInputsBytePins['progressive.mjs'],
}
assert.deepEqual(identity, adapter.selectedProofIdentity)
const proof = adapter.buildSourceProof(identity)
assert.deepEqual(Object.keys(proof).sort(), ['defaults','engineHashes','engineRevision','groups','trace'])
const proofBefore = JSON.stringify(proof)
assert.equal(hash(proofBefore), audit.caller.fullProofSHA256)
const strokes = adapter.compileProgressive(proof.trace, proof, identity)
assert.equal(JSON.stringify(proof), proofBefore, 'Input proof unchanged')
assert.equal(strokes.length, 15)
assert.equal(strokes.flat().length, 16)
assert.equal(hash(JSON.stringify(strokes)), audit.compiledSHA256)
assert.deepEqual(strokes.map(pen => hash(JSON.stringify(pen))), audit.permutedPerPenSHA256)
assert.deepEqual(strokes.flat().map(mask => hash(JSON.stringify(mask))), audit.permutedPerMaskSHA256)
const canonical = polygon => {
  const points = polygon.map(point => [point.x / 2, point.y / 2])
  const options = []
  for (const direction of [points, [...points].reverse()]) for (let i = 0; i < direction.length; i++) options.push(JSON.stringify([...direction.slice(i), ...direction.slice(0, i)]))
  return options.sort()[0]
}
const original = proof.groups.flatMap(group => group.polygons).map(canonical).sort()
const emitted = strokes.flatMap(pen => pen.flatMap(mask => (mask.outline.match(/M[^Z]* Z/g) || []).map(outline => {
  const values = outline.match(/-?\d+(?:\.\d+)?/g).map(Number)
  return canonical(Array.from({length: values.length / 2}, (_, i) => ({x: values[i * 2] * 2, y: values[i * 2 + 1] * 2})))
}))).sort()
assert.equal(original.length, 34)
assert.deepEqual(emitted, original, 'Every unchanged original polygon exactly once')
const exactJoins = []
for (const [pen, groups] of adapter.sourceGroups.entries()) {
  const calls = groups.flatMap(index => proof.trace[index])
  for (let i = 1; i < calls.length; i++) {
    const previous = calls[i - 1]
    const offset = previous.kind === 'cdDrawLine' ? 2 : previous.kind === 'cdDrawCurve' ? 4 : 6
    const end = previous.args.slice(offset, offset + 2)
    assert.deepEqual(end, calls[i].args.slice(0, 2))
    exactJoins.push({pen: pen + 1, end})
  }
}
console.log(JSON.stringify({
  sourceRoot: root, sourceOnly: true, nativeApproval: false, runtimeApplied: false,
  pens: strokes.length, masks: strokes.flat().length, originalPolygons: original.length,
  polygonExactOnce: true, originalCoordinatesUnchanged: true, inputProofUnchanged: true,
  compiledSHA256: audit.compiledSHA256, domesticToOriginalPen: adapter.domesticToOriginalPen, exactJoins,
  finePens: audit.finePens,
  maskTransitions: audit.maskTransitions,
  strokes, render: adapter.renderProgressive.toString(),
}))
