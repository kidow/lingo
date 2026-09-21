/** Checks provenance and observed coverage; visual judgments remain in findings.json. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url)))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const proposals = read('proposals.json')
const findings = read('findings.json')
const checks = read('source-checks.json')
const candidates = read(proposals.candidateFile)
const expectedOrders = {
  '纛': [1, 3, 2, ...Array.from({length:21}, (_, i) => i + 4)],
  '蘿': [...Array.from({length:18}, (_, i) => i + 1), 20, 21, 19, 22],
  '藺': [...Array.from({length:15}, (_, i) => i + 1), 17, 18, 16, 19],
}
assert.equal(proposals.license, 'CC-BY-SA-3.0')
assert.equal(proposals.attribution, candidates.attribution)
assert.deepEqual(proposals.entries.map(e => e.glyph), [...'纛蘿藺'])
assert.equal(proposals.authoredGeometryPoints, 0)
assert.equal(proposals.proprietaryAssetsSaved, 0)
assert.equal(proposals.runtimeApprovalsAdded, 0)
let strokes = 0
for (const entry of proposals.entries) {
  const original = candidates.entries.find(e => e.id === entry.id)
  const result = findings.entries.find(e => e.id === entry.id)
  const indices = Array.from({length:entry.strokes}, (_, i) => i + 1)
  assert.equal(entry.strokes, original.strokes.length)
  assert.equal(entry.strokes, original.dictionaryStrokes)
  assert.equal(entry.catalogStrokes, original.catalogStrokes)
  assert.equal(entry.viewBox, '0 0 109 109')
  for (const key of ['revision', 'url', 'svgSha256', 'blobSha1']) assert.equal(entry[key], original[key])
  assert.deepEqual(entry.dictionary, original.dictionary)
  assert.deepEqual(entry.dictionaryToCandidate, expectedOrders[entry.glyph])
  assert.deepEqual([...entry.dictionaryToCandidate].sort((a,b) => a-b), indices)
  assert.equal(entry.originalPathsSha256, hash(original.strokes.map(s => s.path)))
  assert.equal(entry.reorderedPathsSha256, hash(entry.dictionaryToCandidate.map(i => original.strokes[i-1].path)))
  assert.equal(entry.runtimeApproved, false)
  assert.equal(result.fullStrokeReviewCompleted, true)
  assert.equal(result.decision, 'passed-awaiting-normalization-and-integration')
  assert.deepEqual(result.reviewedDictionaryIndices, indices)
  assert.deepEqual(result.observations.flatMap(o => o.strokes), indices)
  for (const phase of ['original', 'reordered']) {
    assert.equal(checks[phase].sources.find(s => s.glyph === entry.glyph).strokes, entry.strokes)
    const seen = new Set(checks[phase].visits.filter(v => v.id === entry.id && v.view === 'strokes')
      .flatMap(v => v.pairs.filter(([a,b]) => a === b).map(([a]) => a)))
    assert.deepEqual([...seen].sort((a,b) => a-b), indices)
  }
  assert.ok(checks.reordered.visits.some(v => v.id === entry.id && v.view === 'forms'))
  strokes += entry.strokes
}
assert.equal(strokes, 65)
assert.equal(findings.reviewedStrokes, strokes)
assert.equal(findings.authoredGeometryPoints, 0)
assert.equal(findings.splitOrMergedStrokes, 0)
assert.equal(findings.proprietaryAssetsSaved, 0)
assert.equal(findings.runtimeApprovalsAdded, 0)
const characters = readdirSync(new URL('../../content/hanja/characters/', import.meta.url))
  .filter(f => f.endsWith('.json')).flatMap(f => read('../../content/hanja/characters/' + f).characters)
for (const glyph of [...'纛蘿藺鱉宬']) assert.equal(hanjaStrokeData(characters.find(c => c.glyph === glyph)), null)
const applied = characters.filter(c => hanjaStrokeData(c)).length
const special2 = read('../../content/hanja/characters/special-2.json').characters
const runtime = {applied, total:characters.length, remaining:characters.length-applied,
  special2Applied:special2.filter(c => hanjaStrokeData(c)).length, special2Total:special2.length}
assert.deepEqual(runtime, findings.runtimeSnapshot)
console.log(JSON.stringify({pass:true, reviewedCharacters:3, originalStrokesCovered:strokes,
  reorderedStrokesCovered:strokes, finalFormsCovered:3, geometryPreserved:true,
  runtimeApprovalsAdded:0, proprietaryAssetsSaved:0, runtime}, null, 2))
