import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH10_STROKES, G2_BATCH10_DICTIONARY_GEOMETRY, loadG2Batch10DictionaryBundle } from './hanja-stroke-dictionary-g2-batch10.ts'
import { buildG2Batch10DictionaryBundle, G2_BATCH10_DICTIONARY_PROOF_PINS, validateG2Batch10DictionaryProofs, validateG2Batch10DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch10.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch10-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH10_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all seven individual reviews reproduce 108 playable strokes with actual corpus provenance', () => {
  validateG2Batch10DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH10_STROKES.length, 7)
  assert.equal(HANJA_DICTIONARY_G2_BATCH10_STROKES.reduce((n, e) => n + e.paths.length, 0), 108)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['憙', '禧'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH10_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH10_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 7)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH10_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 7)
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, { sourceStroke: number | null; derivedFromStroke?: number }[]>
  for (const original of originals)
    assert.deepEqual(proposals[original.glyph].map(r => r.sourceStroke ?? r.derivedFromStroke),
      Array.from({ length: original.strokes }, (_, i) => i + 1))
})

const distance = (p: number[], a: number[], b: number[]) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const toPath = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((v, k) => distance(p, path[k], v)))
const separation = (a: number[][], b: number[][]) => Math.min(...a.flatMap((p, i) => i === 0 ? [] :
  Array.from({ length: 101 }, (_, j) => toPath(
    [a[i - 1][0] + (p[0] - a[i - 1][0]) * j / 100, a[i - 1][1] + (p[1] - a[i - 1][1]) * j / 100], b))))

test('reviewed directions and attachments preserve the observed forms', () => {
  for (const [glyph, n] of [['噫', 4], ['禧', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[0] === p[0][0]) && p.at(-1)![1] > p[0][1], glyph + ': vertical')
  }
  const rise = points('欽', 7)
  assert.ok(rise.at(-1)![0] > rise[0][0] && rise.at(-1)![1] < rise[0][1])
  for (const [glyph, n] of [['噫', 16], ['熹', 7], ['憙', 7], ['憙', 16], ['嬉', 10], ['禧', 12]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] > p[0][1], glyph + ': descending-right')
  }
  for (const [glyph, n, bar] of [['熹', 8, 9], ['憙', 8, 9], ['嬉', 11, 12], ['禧', 13, 14]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1], glyph + ': descending-left')
    assert.ok(toPath(p.at(-1)!, points(glyph, bar)) < 2.5, glyph + ': joined middle bar')
  }
  for (const [glyph, n, left, right] of [
    ['噫', 11, 9, 10], ['噫', 12, 9, 10], ['熹', 6, 4, 5],
    ['熹', 12, 10, 11], ['嬉', 9, 7, 8]
  ] as const) {
    const p = points(glyph, n)
    assert.ok(toPath(p[0], points(glyph, left)) < 1, glyph + ': left bar ' + n)
    assert.ok(toPath(p.at(-1)!, points(glyph, right)) < 1, glyph + ': right bar ' + n)
  }
  assert.ok(toPath(points('羲', 5)[0], points('羲', 3)) < 1)
  assert.ok(toPath(points('羲', 5).at(-1)!, points('羲', 6)) < 1)
  assert.ok(toPath(points('欽', 12)[0], points('欽', 11)) < 1)
  const left = points('禧', 4), right = points('禧', 5)
  assert.ok(left.at(-1)![1] - left[0][1] > 30 && Math.abs(left.at(-1)![0] - left[0][0]) < 5)
  assert.ok(right.at(-1)![1] - right[0][1] > 25)
})

test('independent parts remain separate at the five-unit playback width', () => {
  for (const [glyph, a, b] of [
    ['噫', 16, 14],
    ['熹', 7, 6], ['熹', 7, 9], ['熹', 7, 4], ['熹', 8, 6], ['熹', 14, 10], ['熹', 14, 12],
    ['憙', 7, 6], ['憙', 7, 9], ['憙', 8, 6], ['憙', 14, 10], ['憙', 14, 12],
    ['憙', 16, 12], ['憙', 16, 11], ['憙', 16, 14],
    ['嬉', 10, 9], ['嬉', 10, 12], ['嬉', 11, 9],
    ['羲', 14, 6], ['羲', 15, 13],
    ['禧', 4, 2], ['禧', 5, 2], ['禧', 5, 14], ['禧', 12, 11], ['禧', 12, 14], ['禧', 13, 11]
  ] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH10_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch10DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch10DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch10DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch10DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch10DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch10DictionaryBundle(HANJA_DICTIONARY_G2_BATCH10_STROKES.slice(1)), /published bundle/)
})
