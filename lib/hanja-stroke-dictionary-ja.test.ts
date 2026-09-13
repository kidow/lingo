import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { HANJA_DICTIONARY_JA_STROKES, loadJaDictionaryBundle } from './hanja-stroke-dictionary-ja.ts'
import { buildJaDictionaryBundle, JA_DICTIONARY_PROOF_PINS, validateJaDictionaryProofs } from '../scripts/hanja-stroke-dictionary-ja.ts'
import { dictionaryGeometry, validateDictionaryBundle, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g3ii-hyang-2026-09-13/'
const originals = JSON.parse(read(dir + 'originals.json')) as { entries: { glyph: string; medians: number[][][] }[] }
const observations = JSON.parse(read(dir + 'observations.json')) as { rows: [string, number, number, number, number, boolean][] }
const review = JSON.parse(read(dir + 'review.json')) as {
  strokes: number; strokeReview: [number, string, string, string][]; localCenterlines: number[];
  retainedPriorProposalStrokes: number[]; runtimeApproved: boolean;
  numericalRelations: { gaps: [number, number][]; contacts: [number, number][] }
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { strokes: { sourceStroke: number | null; points: [number, number][] }[] }
const prior = JSON.parse(read(dir + 'prior-candidate.json')) as { paths: string[] }
const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex')
const published = HANJA_DICTIONARY_JA_STROKES[0]
type Point = [number, number]
const points = (path: string): Point[] => Array.from(path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g), m => [+m[1], +m[2]])
const pointSegment = ([x, y]: Point, [ax, ay]: Point, [bx, by]: Point) => {
  const dx = bx - ax, dy = by - ay
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(x - ax - t * dx, y - ay - t * dy)
}
function pathDistance(first: string, second: string) {
  const a = points(first), b = points(second)
  const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  let minimum = Infinity
  for (let i = 1; i < a.length; i++) for (let j = 1; j < b.length; j++) {
    const p = a[i - 1], q = a[i], r = b[j - 1], s = b[j]
    if (cross(p, q, r) * cross(p, q, s) < 0 && cross(r, s, p) * cross(r, s, q) < 0) return 0
    minimum = Math.min(minimum, pointSegment(p, r, s), pointSegment(q, r, s), pointSegment(r, p, q), pointSegment(s, p, q))
  }
  return minimum
}

test('響 requires all 22 live observations and preserves the separately proven 11/12 boundary', () => {
  assert.equal(originals.entries[0].medians.length, 20)
  assert.deepEqual(observations.rows.map(r => r[1]), Array.from({ length: 22 }, (_, i) => i + 1))
  assert.ok(observations.rows.every(r => r[0] === '響' && r[2] > 0 && r[2] < r[3] && r[4] === r[1] - 1 && r[5]))
  assert.deepEqual(review.strokeReview.map(r => r[0]), observations.rows.map(r => r[1]))
  assert.ok(review.strokeReview.every(r => r[1] && r[2] && r[3] === 'verified'))
  assert.ok(review.runtimeApproved)
  assert.deepEqual(loadJaDictionaryBundle(buildJaDictionaryBundle()), HANJA_DICTIONARY_JA_STROKES)
  assert.deepEqual(hanjaStrokeData({ glyph: '響', strokes: 22 }), published)
  assert.equal(hanjaStrokeData({ glyph: '響', strokes: 21 }), null)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === '響').length, 1)
  assert.deepEqual(points(published.paths[10]).at(-1), points(published.paths[11])[0])
  const merged = structuredClone(published)
  merged.paths = [...merged.paths.slice(0, 10), merged.paths[10] + merged.paths[11].replace(/^M/, ' L'), ...merged.paths.slice(12)]
  merged.pathsSha256 = hash(merged.paths)
  assert.throws(() => validateDictionaryReview(merged, 21), /published entry/)
})

test('響 local replacements preserve direction, visible gaps and intended contacts at runtime width 5', () => {
  assert.deepEqual(published.sourceStrokeIndices.flatMap((n, i) => n === null ? [i + 1] : []), review.localCenterlines)
  assert.equal(review.localCenterlines.length, 12)
  assert.equal(review.retainedPriorProposalStrokes.length, 10)
  for (const n of review.retainedPriorProposalStrokes) {
    assert.deepEqual(corrections.strokes[n - 1].points, points(prior.paths[n - 1]))
  }
  const p = points(published.paths[0]), last = p.at(-1)!, previous = p.at(-2)!
  assert.ok(last[0] > previous[0] && last[1] > previous[1])
  for (const [a, b] of review.numericalRelations.gaps) {
    assert.ok(pathDistance(published.paths[a - 1], published.paths[b - 1]) > 5, a + '/' + b + ' gap')
  }
  for (const [a, b] of review.numericalRelations.contacts) {
    assert.ok(pathDistance(published.paths[a - 1], published.paths[b - 1]) < 5, a + '/' + b + ' contact')
  }
  const reconstructed = normalizeMedians(corrections.strokes.map(s => s.points.map(([x, y]) => [x, -y])))
  assert.deepEqual(reconstructed, published.paths)
})

test('Ja provenance cannot be relabeled as MM or bypass the shared audit', () => {
  assert.doesNotThrow(() => validateDictionaryBundle())
  const candidate = { character: '響', medians: originals.entries[0].medians, strokes: normalizeMedians(originals.entries[0].medians) }
  const characters = [{ glyph: '響', strokes: 22, readingGrade: '3급II' }]
  const audit = auditStrokes(characters, [], HANJA_DICTIONARY_JA_STROKES, [candidate], [])
  assert.equal(audit.verificationSources.dictionary, 1)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 1)
  assert.throws(() => auditStrokes(characters, [], HANJA_DICTIONARY_JA_STROKES, [], [candidate]), /geometry mismatch/)
  const wrongSource = structuredClone(buildJaDictionaryBundle())
  wrongSource.characters[0].geometrySource = 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee'
  assert.throws(() => loadJaDictionaryBundle(wrongSource), /entry mismatch/)
  const changed = structuredClone(candidate.medians)
  changed[0][0][0]++
  assert.throws(() => dictionaryGeometry('響', changed), /original mismatch/)
})

test('rewritten proofs, restored first-stroke direction or changed runtime paths fail closed', () => {
  for (const filename of Object.keys(JA_DICTIONARY_PROOF_PINS)) {
    assert.throws(() => validateJaDictionaryProofs(p => read(p) + (p === filename ? ' ' : '')), /proof mismatch/)
  }
  const reversed = structuredClone(published)
  reversed.paths = [...published.paths].reverse()
  reversed.pathsSha256 = hash(reversed.paths)
  assert.throws(() => validateDictionaryReview(reversed, 22), /published entry/)
  const restored = structuredClone(corrections.strokes)
  restored[0].points = points(prior.paths[0])
  const oldDirection = structuredClone(published)
  oldDirection.paths = normalizeMedians(restored.map(s => s.points.map(([x, y]) => [x, -y])))
  oldDirection.pathsSha256 = hash(oldDirection.paths)
  assert.throws(() => validateDictionaryReview(oldDirection, 22), /published entry/)
})
