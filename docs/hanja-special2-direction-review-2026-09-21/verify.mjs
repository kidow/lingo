/** Check review provenance and coverage; visual decisions are recorded, not inferred here. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url)))
const sha = value => createHash('sha256').update(value).digest('hex')
const jsonSha = value => sha(JSON.stringify(value))
const originals = read('originals.json')
const review = read('review.json')
const proposals = read('proposals.json')
const checks = read('source-checks.json')
const audit = read('../hanja-special2-variants-2026-09-21/audit.json')
const expected = [...'纛蘿藺鱉宬嘯瀟嘴']
const approved = [...'嘯瀟嘴']
assert.deepEqual(originals.entries.map(e => e.glyph), expected)
assert.deepEqual(review.entries.map(e => e.glyph), expected)
assert.deepEqual(Object.keys(proposals), approved)
assert.equal(originals.proprietaryAssetsSaved, 0)
assert.equal(review.proprietaryAssetsSaved, 0)
assert.equal(review.authoredGeometryPoints, 0)
assert.equal(review.runtimeApprovalsAdded, 0)

const characters = readdirSync(new URL('../../content/hanja/characters/', import.meta.url))
  .filter(name => name.endsWith('.json'))
  .flatMap(name => read('../../content/hanja/characters/' + name).characters)
const catalog = new Map(characters.map(c => [c.glyph, c]))
let originalCoverage = 0, correctedCoverage = 0
for (const original of originals.entries) {
  const entry = review.entries.find(e => e.glyph === original.glyph)
  const prior = audit.records.find(e => e.glyph === original.glyph)
  const option = prior.matchingCandidates.find(e => e.corpus === original.corpus)
  const sequence = Array.from({ length: original.strokes }, (_, index) => index + 1)
  const pin = audit.corpora[original.corpus]
  for (const key of ['url', 'sha256']) assert.equal(originals.sources[original.corpus][key], pin[key])
  assert.equal(original.candidateSha256, option.candidateSha256)
  assert.equal(original.strokes, prior.dictionaryStrokes)
  assert.equal(original.catalogStrokes, catalog.get(original.glyph).strokes)
  assert.equal(original.catalogStrokes, prior.catalogStrokes)
  assert.deepEqual(original.dictionary, { url: prior.dictionary.url, bytes: prior.dictionary.bytes, sha256: prior.dictionary.sha256 })
  assert.equal(jsonSha(original.medians), original.originalMediansSha256)
  assert.deepEqual(normalizeMedians(original.medians), original.paths)
  assert.equal(original.paths.length, original.strokes)
  assert.equal(jsonSha(original.paths), entry.originalPathsSha256)
  for (const key of ['corpus', 'catalogStrokes', 'strokes', 'candidateSha256', 'dictionary', 'staticSvg', 'originalMediansSha256']) {
    assert.deepEqual(entry[key], original[key])
  }
  assert.equal(sha(readFileSync(new URL('../../' + original.staticSvg.path, import.meta.url))), original.staticSvg.sha256)
  assert.deepEqual(entry.reviewedOriginalStrokes, sequence)
  assert.equal(hanjaStrokeData(catalog.get(original.glyph)), null, original.glyph + ' must remain outside runtime in this review batch')

  const source = checks.sources.find(e => e.glyph === original.glyph)
  assert.equal(source.strokes, original.strokes)
  assert.match(source.transform, /^scale\(1,-1\) translate\(-?\d+, -\d+\)$/)
  assert.equal(source.timeline.length, original.strokes)
  assert.equal(new Set(source.timeline.map(e => e.xmlIndex)).size, original.strokes)
  source.timeline.forEach((frame, index) => {
    assert.deepEqual(Object.keys(frame).sort(), ['delay', 'duration', 'xmlIndex'])
    assert.ok(Number.isInteger(frame.xmlIndex) && frame.xmlIndex > 0)
    assert.ok(frame.duration > 0 && frame.delay >= 0)
    if (index) assert.ok(frame.delay >= source.timeline[index - 1].delay + source.timeline[index - 1].duration)
  })
  assert.ok(checks.visits.some(v => v.view === 'forms' && v.glyphs.includes(original.glyph)))
  const coverage = corrected => new Set(checks.visits
    .filter(v => v.view === 'strokes' && v.glyph === original.glyph && v.corrected === corrected)
    .flatMap(v => Array.from({ length: v.end - v.start + 1 }, (_, i) => v.start + i)))
  assert.deepEqual([...coverage(false)].sort((a, b) => a - b), sequence)
  originalCoverage += sequence.length
  if (approved.includes(original.glyph)) {
    assert.equal(entry.status, 'paths-reviewed-awaiting-integration')
    assert.deepEqual(entry.issues, [])
    assert.deepEqual(entry.permutation, proposals[original.glyph])
    assert.deepEqual([...entry.permutation].sort((a, b) => a - b), sequence)
    const paths = entry.permutation.map(index => original.paths[index - 1])
    assert.equal(jsonSha(paths), entry.reviewedPathsSha256)
    assert.deepEqual(entry.reviewedCorrectedStrokes, sequence)
    assert.deepEqual([...coverage(true)].sort((a, b) => a - b), sequence)
    correctedCoverage += sequence.length
  } else {
    assert.match(entry.status, /^held-/)
    assert.equal(entry.permutation, null)
    assert.equal(entry.reviewedPathsSha256, null)
    assert.deepEqual(entry.reviewedCorrectedStrokes, [])
    assert.ok(entry.issues.some(issue => issue.kind !== 'order'))
    for (const issue of entry.issues) assert.ok(issue.strokes.every(index => sequence.includes(index)))
  }
}
assert.equal(checks.sources.length, expected.length)
assert.equal(originalCoverage, 148)
assert.equal(correctedCoverage, 52)
assert.deepEqual(review.summary, { reviewedCharacters: 8, reviewedStrokes: 148,
  pathsReviewedCharacters: 3, pathsReviewedStrokes: 52, heldCharacters: 5, heldStrokes: 96 })
const applied = characters.filter(c => hanjaStrokeData(c)).length
const special2 = read('../../content/hanja/characters/special-2.json').characters
const runtime = { applied, total: characters.length, remaining: characters.length - applied,
  special2Applied: special2.filter(c => hanjaStrokeData(c)).length, special2Total: special2.length }
assert.deepEqual(runtime, review.runtimeSnapshot)
console.log(JSON.stringify({ pass: true, originalCoverage, correctedCoverage,
  summary: review.summary, runtime, runtimeApprovalsAdded: 0, authoredGeometryPoints: 0,
  proprietaryAssetsSaved: 0 }, null, 2))
