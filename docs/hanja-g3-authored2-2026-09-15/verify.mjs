/** Read-only evidence, provenance, reconstruction and runtime verification. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_AUTHORED, textbookAuthoredSha256, validateTextbookAuthored } from '../../scripts/hanja-stroke-textbook-authored.ts'
import { prepare } from './prepare.mjs'
const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const scope = json('./scope.json'), queue = json('./queue.json')
const observations = json('./observations.json'), source = json('./source-checks.json')
const proposals = json('./proposals.json'), review = json('./review.json')
const authored = json('./authored.json'), candidates = json('./candidate-paths.json')
const generated = prepare()
assert.equal(scope.status, 'review-complete')
assert.equal(queue.status, 'review-complete')
assert.deepEqual(scope.glyphs, ['畓', '屛'])
assert.deepEqual(queue.entries.map(e => e.glyph), scope.glyphs)
assert.deepEqual(review.records, generated.records)
assert.deepEqual(authored.entries, generated.entries)
assert.deepEqual(candidates.characters, generated.characters)
assert.deepEqual(candidates.geometrySources, generated.geometrySources)
assert.equal(source.manifest.sha256, queue.publisher.manifestSha256)
assert.equal(source.manifest.sha256Verified, true)
assert.equal(source.proprietaryAssetsSaved, 0)
const bundle = json('../../public/hanja-strokes/textbook-reviewed.json')
let strokes = 0
for (const item of queue.entries) {
  const { glyph } = item, n = item.strokes
  const record = review.records.find(e => e.glyph === glyph)
  const entry = authored.entries.find(e => e.glyph === glyph)
  const observation = observations.entries.find(e => e.glyph === glyph)
  const checkedSource = source.entries.find(e => e.glyph === glyph)
  assert.equal(item.manifest.glyph, glyph)
  assert.deepEqual(item.candidateCounts, { MM: null, Ja: null, Ko: null })
  assert.equal(item.candidate, 'local-authored')
  assert.equal(observation.decision, 'matched')
  assert.deepEqual(observation.sourceVideo, item.sourceVideo)
  assert.deepEqual(checkedSource.sourceVideo, item.sourceVideo)
  assert.equal(checkedSource.durationSeconds, observation.durationSeconds)
  assert.equal(checkedSource.videoSha256Verified, true)
  assert.equal(checkedSource.proprietaryAssetsSaved, 0)
  assert.equal(validateTextbookAuthored(entry, []), entry)
  assert.equal(entry.paths.length, n)
  assert.deepEqual(entry.authoredPathIndices, Array.from({ length: n }, (_, i) => i + 1))
  assert.deepEqual(entry.borrowedParts, [])
  assert.equal(entry.sourceVideoSha256, item.sourceVideo.sha256)
  assert.equal(entry.pathsSha256, hash(entry.paths))
  assert.equal(record.geometrySource, textbookAuthoredSha256(entry))
  assert.equal(record.geometryAuthored, entry.id)
  assert.equal(record.geometryCorrection, undefined)
  assert.equal(record.correctionSha256, undefined)
  assert.equal(record.expectedStrokes, n)
  assert.equal(record.candidateStrokes, n)
  assert.equal(record.strokeEndsSeconds.length, n)
  let previous = 0
  for (const end of record.strokeEndsSeconds) {
    assert.ok(end > previous && end <= observation.durationSeconds)
    previous = end
  }
  assert.equal(proposals[glyph].length, n)
  for (const points of proposals[glyph]) {
    assert.ok(points.length >= 2)
    assert.ok(points.every(p => p.length === 2 && p.every(v => Number.isFinite(v) && v >= 0 && v <= 100)))
  }
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.filter(e => e.glyph === glyph), [record])
  assert.deepEqual(TEXTBOOK_AUTHORED.filter(e => e.glyph === glyph), [entry])
  const runtime = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === glyph)
  assert.ok(runtime)
  const { verificationSource, ...published } = runtime
  assert.equal(verificationSource, 'vivasam-high-2022')
  assert.deepEqual(published, candidates.characters.find(e => e.glyph === glyph))
  assert.deepEqual(runtime.sourceStrokeIndices, Array(n).fill(null))
  assert.equal(HANJA_STROKES.filter(e => e.glyph === glyph).length, 1)
  validateTextbookReview(runtime, n)
  assert.throws(() => validateTextbookReview({ ...runtime, sourceStrokeIndices: Array(n).fill(1) }, n), /provenance mismatch/)
  assert.throws(() => validateTextbookReview({ ...runtime, geometryAuthored: undefined }, n), /provenance mismatch/)
  const changedPaths = runtime.paths.map((p, i) => i === 0 ? 'M1 1 L2 2' : p)
  assert.throws(() => validateTextbookReview({ ...runtime, paths: changedPaths, pathsSha256: hash(changedPaths) }, n), /provenance mismatch/)
  const geometry = candidates.geometrySources.filter(e => e.glyph === glyph)
  assert.deepEqual(bundle.geometrySources.filter(e => e.glyph === glyph), geometry)
  assert.equal(geometry.length, 1)
  assert.equal(geometry[0].kind, 'local-authored')
  assert.deepEqual(geometry[0].donorSources, [])
  strokes += n
}
assert.equal(strokes, 20)
const distance = (point, path) => Math.min(...path.slice(1).map((b, i) => {
  const a = path[i], dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy)
}))
// Whole-video observations: independent upper/lower fields and separated interior bars.
assert.ok(distance(proposals['畓'][0].at(-1), proposals['畓'][5]) > 5)
assert.ok(distance(proposals['屛'][4].at(-1), proposals['屛'][8]) > 5)
for (const [id, before] of Object.entries(json('./baseline.json'))) {
  const file = id.slice(0, id.lastIndexOf('#'))
  const entries = json('../../' + file)[before.key]
  assert.equal(hash(entries.slice(0, before.count)), before.prefixSha256)
}
let freshSourcePins = 0
if (process.argv.includes('--fresh')) {
  for (const pin of [{ url: queue.publisher.manifestUrl, bytes: queue.publisher.manifestBytes,
    sha256: queue.publisher.manifestSha256 }, ...queue.entries.map(e => e.sourceVideo)]) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(30000) })
    assert.ok(response.ok)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, pin.bytes)
    assert.equal(sha(bytes), pin.sha256)
    freshSourcePins++
  }
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const remaining = catalog.filter(e => !applied.has(e.glyph))
assert.deepEqual(remaining.map(e => e.glyph).sort(), ['屯','鈍','隷','隣'].sort())
const next = json('./next-batch.json')
assert.deepEqual(next.glyphs, ['屯', '鈍'])
assert.equal(next.characters, 2)
assert.equal(next.strokes, 16)
assert.ok(next.entries.every(e => remaining.some(c => c.glyph === e.glyph && c.strokes === e.strokes)))
console.log(JSON.stringify({
  result: 'pass', reviewedCharacters: 2, reviewedStrokes: strokes,
  addedCharacters: 2, addedStrokes: strokes, locallyAuthoredStrokes: strokes,
  borrowedStrokes: 0, heldCharacters: 0,
  runtime: applied.size, remaining: 5978 - applied.size,
  grade3Applied: catalog.length - remaining.length, grade3Total: catalog.length,
  grade3Remaining: remaining.length, grade3RemainingStrokes: remaining.reduce((n,e) => n + e.strokes, 0),
  grade3RemainingGlyphs: remaining.map(e => e.glyph),
  existingPrefixesPreserved: true, freshSourcePins, proprietaryAssetsSaved: 0,
}))
