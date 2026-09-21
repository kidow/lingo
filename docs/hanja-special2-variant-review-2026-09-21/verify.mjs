/** Revalidate licensed bytes, frozen paths, source timeline and review coverage. No files are written. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { parseCandidates } from '../../scripts/hanja-stroke-audit.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const root = new URL('../../', import.meta.url)
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const original = read('originals.json'), alternate = read('alternate-kui.json'), review = read('review.json')
const queue = read('../hanja-special2-variants-2026-09-21/next-review.json')
const audit = read('../hanja-special2-variants-2026-09-21/audit.json')
const sourceChecks = read('source-checks.json'), alternateChecks = read('alternate-source-checks.json')
const catalog = new Map(JSON.parse(readFileSync(new URL('content/hanja/characters/special-2.json', root))).characters.map(c => [c.glyph, c]))
const corpora = {}
for (const [id, pin] of Object.entries({ ...original.sources, ...alternate.sources })) {
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(180000) })
  assert.equal(response.status, 200)
  const bytes = new Uint8Array(await response.arrayBuffer())
  assert.equal(bytes.length, pin.bytes)
  corpora[id] = new Map(parseCandidates(bytes, pin).map(c => [c.character, c]))
}
assert.deepEqual(original.entries.map(e => e.glyph), queue.priorityReview.map(e => e.glyph))
assert.deepEqual(review.entries.map(e => e.glyph), original.entries.map(e => e.glyph))
assert.deepEqual(alternate.entries.map(e => [e.glyph, e.corpus]), [['夔', 'Hans']])
for (const snapshot of [original, alternate]) for (const entry of snapshot.entries) {
  const expected = queue.priorityReview.find(e => e.glyph === entry.glyph)
  const candidate = corpora[entry.corpus].get(entry.glyph)
  assert.equal(entry.catalogStrokes, catalog.get(entry.glyph).strokes)
  assert.equal(entry.strokes, expected.playbackCandidateStrokes)
  assert.equal(hash(JSON.stringify(candidate)), entry.candidateSha256)
  assert.equal(entry.candidateSha256, expected.candidateOptions.find(c => c.corpus === entry.corpus).sha256)
  assert.deepEqual(entry.medians, candidate.medians)
  assert.equal(hash(JSON.stringify(entry.medians)), entry.originalMediansSha256)
  assert.deepEqual(entry.paths, normalizeMedians(candidate.medians))
  assert.equal(entry.paths.length, entry.strokes)
  assert.equal(hash(readFileSync(new URL(entry.staticSvg.path, root))), entry.staticSvg.sha256)
  const known = audit.records.find(e => e.glyph === entry.glyph).dictionary
  assert.deepEqual(entry.dictionary, { url: known.url, bytes: known.bytes, sha256: known.sha256 })
  const checks = entry.corpus === 'Ja' ? sourceChecks : alternateChecks
  const source = checks.sources.find(s => s.glyph === entry.glyph)
  assert.equal(source.strokes, entry.strokes)
  assert.equal(source.timeline.length, entry.strokes)
  assert.equal(new Set(source.timeline.map(s => s.xmlIndex)).size, entry.strokes)
  assert.match(source.transform, /^scale\(1,-1\) translate\(-?\d+, -\d+\)$/)
  source.timeline.forEach((s, i) => {
    assert.ok(s.duration > 0 && s.delay >= 0)
    if (i) assert.ok(s.delay >= source.timeline[i - 1].delay + source.timeline[i - 1].duration)
  })
  const visits = checks.visits.filter(v => v.view === 'strokes' && v.glyph === entry.glyph && (v.corpus ?? 'Ja') === entry.corpus)
  const covered = new Set(visits.flatMap(v => Array.from({ length: v.end - v.start + 1 }, (_, i) => v.start + i)))
  assert.deepEqual([...covered].sort((a, b) => a - b), Array.from({ length: entry.strokes }, (_, i) => i + 1))
  assert.ok(checks.visits.some(v => v.view === 'forms' && v.glyphs.includes(entry.glyph)))
}
let reviewedStrokes = 0, heldStrokes = 0, inspectedStrokes = 0
for (const entry of review.entries) {
  const originalEntry = original.entries.find(e => e.glyph === entry.glyph)
  assert.equal(entry.catalogStrokes, originalEntry.catalogStrokes)
  assert.equal(entry.playbackStrokes, originalEntry.strokes)
  assert.deepEqual(entry.dictionary, originalEntry.dictionary)
  assert.equal(entry.staticSvg.sha256, originalEntry.staticSvg.sha256)
  assert.equal(entry.runtimeApproved, false)
  assert.equal(hanjaStrokeData(catalog.get(entry.glyph)), null, 'This review must not silently promote ' + entry.glyph)
  assert.ok(entry.observations.length >= 2 && entry.remainingGate)
  for (const reviewed of entry.reviewedCandidates) {
    const snapshot = reviewed.corpus === 'Ja' ? originalEntry : alternate.entries.find(e => e.glyph === entry.glyph)
    assert.equal(reviewed.candidateSha256, snapshot.candidateSha256)
    assert.deepEqual(reviewed.sourceStrokeIndices, Array.from({ length: entry.playbackStrokes }, (_, i) => i + 1))
    inspectedStrokes += reviewed.sourceStrokeIndices.length
  }
  if (entry.decision === 'held-path-shape-mismatch') {
    assert.equal(entry.glyph, '篠')
    assert.equal(entry.selectedCorpus, null)
    assert.equal(entry.selectedCandidateSha256, null)
    assert.deepEqual(entry.reviewedCandidates[0].issueStrokes, [15])
    heldStrokes += entry.playbackStrokes
  } else {
    assert.equal(entry.decision, 'dictionary-paths-reviewed-awaiting-integration')
    const selected = entry.reviewedCandidates.find(c => c.corpus === entry.selectedCorpus)
    assert.ok(selected)
    assert.equal(entry.selectedCandidateSha256, selected.candidateSha256)
    assert.deepEqual(selected.issueStrokes, [])
    reviewedStrokes += entry.playbackStrokes
  }
}
assert.deepEqual(review.entries.filter(e => e.selectedCorpus === 'Hans').map(e => e.glyph), ['夔'])
assert.equal(review.characters, 16)
assert.equal(review.uniqueStrokes, 207)
assert.equal(review.pathReviewedCharacters, 15)
assert.equal(review.pathReviewedStrokes, reviewedStrokes)
assert.equal(reviewedStrokes, 190)
assert.equal(review.heldCharacters, 1)
assert.equal(review.heldStrokes, heldStrokes)
assert.equal(heldStrokes, 17)
assert.equal(review.candidateStrokesInspected, inspectedStrokes)
assert.equal(inspectedStrokes, 228)
assert.equal(review.runtimeApprovalsAdded, 0)
assert.equal(review.proprietaryAssetsSaved, 0)
const characters = readdirSync(new URL('content/hanja/characters/', root)).filter(p => p.endsWith('.json'))
  .flatMap(p => JSON.parse(readFileSync(new URL('content/hanja/characters/' + p, root))).characters)
const applied = characters.filter(c => hanjaStrokeData(c)).length
console.log(JSON.stringify({ verified: true, date: new Date().toISOString(), characters: 16, uniqueStrokes: 207,
  candidateStrokesInspected: inspectedStrokes, pathReviewed: { characters: 15, strokes: reviewedStrokes },
  held: { glyphs: ['篠'], strokes: heldStrokes }, runtimeApprovalsAdded: 0, proprietaryAssetsSaved: 0,
  runtime: { total: characters.length, applied, remaining: characters.length - applied,
    special2: { total: catalog.size, applied: [...catalog.values()].filter(c => hanjaStrokeData(c)).length } } }, null, 2))
