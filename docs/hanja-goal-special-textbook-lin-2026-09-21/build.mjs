/** Reproduce textbook-verified public KanjiVG geometry without publisher media. */
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import { normalizeKanjiVGPath } from '../../lib/hanja-stroke-kanjivg-geometry.ts'
const read = name => readFileSync(new URL(name, import.meta.url))
const sha = value => createHash('sha256').update(value).digest('hex')
const candidate = JSON.parse(read('candidate.json'))
const source = JSON.parse(read('sources.json'))
const review = JSON.parse(read('findings.json'))
const normalized = JSON.parse(read('normalized.json'))
const observations = JSON.parse(read('observations.json'))
assert.equal(review.decision, 'approved')
assert.equal(review.glyph, source.glyph)
assert.equal(review.glyph, candidate.glyph)
assert.equal(review.publisherRow, source.publisherRow)
assert.equal(review.sourceGeometrySha256, candidate.candidate.sha256)
assert.deepEqual(review.sourceVideo, source.sourceVideo)
assert.equal(review.strokes.length, candidate.catalogStrokes)
assert.ok(Object.values(review.checks).every(value => value === 'match'))
assert.deepEqual(review.sourceStrokeIndices, Array.from({ length: 15 }, (_, i) => i + 1))
const paths = review.sourceStrokeIndices.map(index => normalizeKanjiVGPath(candidate.paths[index - 1]))
assert.deepEqual(paths, normalized.paths)
assert.equal(observations.glyph, review.glyph)
const entry = {
  glyph: candidate.glyph, verificationSource: source.publisher.id, verifiedAt: review.reviewedAt,
  geometrySource: candidate.candidate.sha256,
  geometryCorrection: 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1',
  sourceStrokeIndices: review.sourceStrokeIndices, pathsSha256: sha(JSON.stringify(paths)),
  sourceReference: { manifestSha256: source.publisher.manifestSha256,
    manifestRow: source.publisherRow, glyph: candidate.glyph, videoFilename: source.publisherRow + '.mp4' },
  sourceVideo: source.sourceVideo,
  reviewSha256: sha(read('findings.json')),
  observationsSha256: sha(read('observations.json')),
  geometryLicense: { spdx: 'CC-BY-SA-3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attribution: 'KanjiVG © Ulrich Apel and contributors', sourceUrl: candidate.candidate.url,
    revision: candidate.candidate.revision,
    modifications: 'Uniform coordinate scaling by 100/109. Source order and curves preserved; no reversal, new points, splitting or merging. Rendered at reviewed runtime stroke width 5.' },
  paths,
}
console.log(JSON.stringify([entry], null, 2))
