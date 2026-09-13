import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_STROKES } from './hanja-stroke-dictionary.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { dictionaryGeometry, validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import originals from '../docs/hanja-g3ii-pye-2026-09-13/originals.json' with { type: 'json' }
import recipe from '../docs/hanja-g3ii-pye-2026-09-13/corrections.json' with { type: 'json' }
import observations from '../docs/hanja-g3ii-pye-2026-09-13/observations.json' with { type: 'json' }
import review from '../docs/hanja-g3ii-pye-2026-09-13/review.json' with { type: 'json' }
import sources from '../docs/hanja-g3ii-pye-2026-09-13/sources.json' with { type: 'json' }
import corrections from '../content/hanja/stroke-count-corrections.json' with { type: 'json' }

const entry = HANJA_DICTIONARY_STROKES.find(e => e.glyph === '弊')!
const sequence = Array.from({ length: 14 }, (_, i) => i + 1)
type Point = [number, number]
const points = (path: string): Point[] => [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
const cross = (a: Point, b: Point) => a[0] * b[1] - a[1] * b[0]
const subtract = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]]
function pointSegment(p: Point, a: Point, b: Point) {
  const [dx, dy] = subtract(b, a), length = dx * dx + dy * dy
  const t = length ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / length)) : 0
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
function segmentDistance(a: Point, b: Point, c: Point, d: Point) {
  const ab = subtract(b, a), cd = subtract(d, c), ca = subtract(c, a), denominator = cross(ab, cd)
  if (denominator) {
    const t = cross(ca, cd) / denominator, u = cross(ca, ab) / denominator
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return 0
  }
  return Math.min(pointSegment(a, c, d), pointSegment(b, c, d), pointSegment(c, a, b), pointSegment(d, a, b))
}
function distance(first: number, second: number) {
  const a = points(entry.paths[first - 1]), b = points(entry.paths[second - 1])
  return Math.min(...a.slice(1).flatMap((p, i) => b.slice(1).map((q, j) => segmentDistance(a[i], p, b[j], q))))
}

test('弊 animation requires the reviewed 14-stroke form and retains the original 15-stroke provenance', () => {
  const correction = corrections.entries.find(e => e.glyph === '弊')!
  assert.equal(correction.sourceStrokes, 15)
  assert.equal(correction.strokes, 14)
  assert.equal(correction.id, sources.strokeCount.correctionId)
  assert.equal(correction.sourceUrl, sources.strokeCount.officialUrl)
  assert.equal(entry.sourceReference.dictionarySvgUrl, sources.animation.sourceUrl)
  assert.equal(entry.sourceReference.dictionarySvgSha256, sources.animation.sha256)
  assert.equal(sources.animation.sourceGlyph, '弊')
  assert.deepEqual(hanjaStrokeData({ glyph: '弊', strokes: 14 }), entry)
  assert.equal(hanjaStrokeData({ glyph: '弊', strokes: 15 }), null)
})

test('all 14 弊 strokes were observed and the two unchanged MM paths remain reproducible', () => {
  assert.ok(review.runtimeApproved && review.wholeCandidateGeometryReviewed)
  assert.deepEqual(observations.visualReview.activeStrokesViewed, sequence)
  assert.deepEqual(observations.visualReview.candidateCumulativeStatesViewed, sequence)
  assert.deepEqual(observations.rows.map(row => row[0]), sequence)
  assert.equal(entry.sourceReference.dictionaryDirectionStrokes, sequence.join(','))
  assert.deepEqual(entry.sourceStrokeIndices, recipe.entries[0].sourceStrokeIndices)
  assert.deepEqual(review.localCenterlines, recipe.entries[0].authored.map(e => e.stroke))
  const normalized = normalizeMedians(originals.entries[0].medians)
  for (const n of [9, 12]) assert.equal(entry.paths[n - 1], normalized[n - 1])
  for (const n of review.localCenterlines) assert.notEqual(entry.paths[n - 1], normalized[n - 1])
  assert.deepEqual(dictionaryGeometry('弊', originals.entries[0].medians).paths, entry.paths)
})

test('弊 retains domestic falling directions, one center descent and the bent hook', () => {
  for (const n of [1, 6, 8, 10, 13]) {
    const p = points(entry.paths[n - 1]); assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1])
  }
  for (const n of [2, 7, 11]) {
    const p = points(entry.paths[n - 1]); assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] > p[0][1])
  }
  for (const n of [9, 12]) assert.ok(points(entry.paths[n - 1]).at(-1)![0] > points(entry.paths[n - 1])[0][0])
  for (const n of [3, 5, 14]) {
    const path = entry.paths[n - 1], p = points(path)
    assert.equal(path.match(/M/g)?.length, 1)
    assert.ok(p.slice(1).every((point, i) => point[1] > p[i][1]))
    assert.ok(Math.abs(p.at(-1)![0] - p[0][0]) < 4)
  }
  const hook = points(entry.paths[3]), end = hook.at(-1)!, beforeEnd = hook.at(-2)!
  assert.ok(end[0] < beforeEnd[0] && end[1] < beforeEnd[1])
  assert.ok(pointSegment(end, points(entry.paths[4])[0], points(entry.paths[4]).at(-1)!) > 5.5)
})

test('弊 keeps the observed gaps and crossings at the actual stroke width five', () => {
  for (const [a, b] of [[1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6], [4, 7], [5, 7], [4, 8], [4, 10], [4, 11], [5, 13], [10, 14], [11, 14]]) {
    assert.ok(distance(a, b) > 5.5, `Unexpected stroke contact: ${a}/${b}, centerline distance ${distance(a, b)}`)
  }
  for (const [a, b] of [[3, 4], [4, 5], [8, 9], [8, 11], [9, 10], [10, 11], [12, 13], [12, 14]]) {
    assert.ok(distance(a, b) < 2.5, `Missing connection: ${a}/${b}`)
  }
  assert.equal(distance(4, 5), 0)
  assert.equal(distance(10, 11), 0)
  assert.equal(distance(12, 13), 0)
  assert.equal(distance(12, 14), 0)
})

test('changed 弊 evidence, an invented fifteenth stroke or a reversed source cannot pass review', () => {
  for (const suffix of ['/observations.json', '/review.json', '/corrections.json', '/sources.json']) {
    assert.throws(() => validateDictionaryProofs(path => {
      const value = readFileSync(new URL('../' + path, import.meta.url), 'utf8')
      return path.startsWith('docs/hanja-g3ii-pye-2026-09-13/') && path.endsWith(suffix) ? value + ' ' : value
    }), /proof/)
  }
  const changed = structuredClone(entry)
  changed.paths = [...entry.paths, entry.paths[4]]
  assert.throws(() => validateDictionaryReview(changed, 15), /mismatch/)
  const reversed = structuredClone(originals.entries[0].medians)
  reversed[4].reverse()
  assert.throws(() => dictionaryGeometry('弊', reversed), /original/)
})
