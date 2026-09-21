/** Offline consistency checks; this is not a substitute for visual stroke review. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { angle, endpoints } from './audit.mjs'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const report = read('audit.json')
const queue = read('next-review.json')
const blocked = read('../hanja-special2-queue-2026-09-20/blocked.json')
const catalog = new Map(read('../../content/hanja/characters/special-2.json').characters.map(c => [c.glyph, c]))
const previous = read('../hanja-special2-inventory-2026-09-18/dictionary-inventory.json')
const old = new Map(previous.rows.map(row => [row[previous.fields.indexOf('glyph')], row[previous.fields.indexOf('svgSha256')]]))
assert.deepEqual(report.corpora, blocked.corpora)
assert.equal(report.records.length, 35)
assert.deepEqual(report.records.map(r => r.glyph), blocked.groups.dictionaryCountDiffers.map(r => r.glyph))
assert.equal(report.runtimeApprovalsAdded, 0)
assert.equal(report.proprietaryAssetsSaved, 0)
const groups = { directionScreenClear: [], directionReview: [], countMismatch: [], noCandidate: [] }
for (const record of report.records) {
  const { glyph, dictionary: source, matchingCandidates: candidates } = record
  assert.equal(record.error, null, glyph + ': acquisition failed')
  assert.equal(record.catalogStrokes, catalog.get(glyph).strokes)
  assert.notEqual(record.catalogStrokes, record.dictionaryStrokes)
  assert.equal(source.title, glyph)
  assert.equal(source.outlines, record.dictionaryStrokes)
  assert.equal(source.animated, record.dictionaryStrokes)
  assert.ok(source.timingSequenceValid && source.clipCoverageValid)
  assert.equal(source.unchangedSinceInventory, source.sha256 === old.get(glyph))
  assert.match(source.sha256, /^[a-f\d]{64}$/)
  assert.ok(source.bytes > 0)
  const expected = Object.entries(record.corpora).filter(([, count]) => count === record.dictionaryStrokes).map(([id]) => id)
  assert.deepEqual(candidates.map(c => c.corpus), expected)
  for (const candidate of candidates) {
    assert.equal(candidate.strokes, record.dictionaryStrokes)
    assert.equal(candidate.angles.length, candidate.strokes)
    assert.ok(candidate.angles.every(a => a === null || (Number.isInteger(a) && a >= 0 && a <= 180)))
    assert.deepEqual(candidate.overSixty, candidate.angles.flatMap((a, i) => a === null || a > 60 ? [i + 1] : []))
    assert.match(candidate.candidateSha256, /^[a-f\d]{64}$/)
    for (const swap of candidate.possibleNeighbourSwaps) {
      const [a, b] = swap.strokes
      assert.equal(b, a + 1)
      assert.ok(candidate.overSixty.includes(a) && candidate.overSixty.includes(b))
      assert.ok(swap.crossedAngles.every(a => a !== null && a <= 60))
    }
  }
  const group = candidates.length ? candidates.some(c => c.overSixty.length === 0) ? 'directionScreenClear' : 'directionReview'
    : Object.keys(record.corpora).length ? 'countMismatch' : 'noCandidate'
  groups[group].push(glyph)
}
assert.equal(groups.directionScreenClear.length + groups.directionReview.length, 24)
assert.deepEqual(groups.countMismatch, ['莽', '萸', '兎'])
assert.deepEqual(groups.noCandidate, ['菉', '珷', '珹', '奫', '晸', '逈', '凞', '囍'])
assert.equal(queue.stage, 'unreviewed')
assert.equal(queue.runtimeApprovalsAdded, 0)
assert.deepEqual(queue.priorityReview.map(r => r.glyph), groups.directionScreenClear)
for (const [group, glyphs] of Object.entries(groups)) {
  const records = report.records.filter(r => glyphs.includes(r.glyph))
  assert.deepEqual(queue.groups[group], { glyphs,
    catalogStrokes: records.reduce((s, r) => s + r.catalogStrokes, 0),
    dictionaryStrokes: records.reduce((s, r) => s + r.dictionaryStrokes, 0) })
}
for (const entry of queue.priorityReview) {
  const record = report.records.find(r => r.glyph === entry.glyph)
  assert.equal(entry.approved, false)
  assert.equal(entry.catalogStrokes, record.catalogStrokes)
  assert.equal(entry.playbackCandidateStrokes, record.dictionaryStrokes)
  assert.equal(entry.dictionarySha256, record.dictionary.sha256)
  assert.deepEqual(entry.candidateOptions, record.matchingCandidates.filter(c => !c.overSixty.length)
    .map(c => ({ corpus: c.corpus, sha256: c.candidateSha256 })))
}
assert.deepEqual(endpoints('M10 20 l5 2 h3 v-1 q2 3 4 5 t6 7'), { start: [10, 20], end: [28, 33] })
assert.deepEqual(endpoints('M1 2 C3 4 5 6 7 8 S9 10 11 12 Z'), { start: [1, 2], end: [1, 2] })
assert.deepEqual(endpoints('M1e1 -2e1 3 4'), { start: [10, -20], end: [3, 4] })
assert.throws(() => endpoints('M1 2 A1 2 3 4 5 6 7'), /Unsupported/)
assert.throws(() => endpoints('M1 2 L3'), /Expected/)
assert.equal(angle([1, 0], [0, 1]), 90)
assert.equal(angle([1, 0], [-1, 0]), 180)
assert.equal(angle([0, 0], [1, 0]), null)
console.log(JSON.stringify({ verified: true, characters: report.records.length,
  catalogStrokes: report.records.reduce((s, r) => s + r.catalogStrokes, 0),
  dictionaryStrokes: report.records.reduce((s, r) => s + r.dictionaryStrokes, 0),
  matchingCandidateStrokes: report.records.filter(r => r.matchingCandidates.length).reduce((s, r) => s + r.dictionaryStrokes, 0),
  groups, runtimeApprovalsAdded: 0, proprietaryAssetsSaved: 0 }, null, 2))
