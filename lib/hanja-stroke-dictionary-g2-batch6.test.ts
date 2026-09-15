import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH6_STROKES, G2_BATCH6_DICTIONARY_GEOMETRY, loadG2Batch6DictionaryBundle } from './hanja-stroke-dictionary-g2-batch6.ts'
import { buildG2Batch6DictionaryBundle, G2_BATCH6_DICTIONARY_PROOF_PINS, validateG2Batch6DictionaryProofs, validateG2Batch6DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch6.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch6-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH6_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 574 playable strokes with actual corpus provenance', () => {
  validateG2Batch6DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH6_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH6_STROKES.reduce((n, e) => n + e.paths.length, 0), 574)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['甕', '郁', '魏', '兪', '踰', '楡'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH6_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH6_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH6_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 37)
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, { sourceStroke: number | null; derivedFromStroke?: number }[]>
  const expectedOrders: Record<string, number[]> = {
    "甕": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      11,
      12,
      10,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "佑": [
      1,
      2,
      4,
      3,
      5,
      6,
      7
    ],
    "鬱": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      22,
      20,
      21,
      23,
      24,
      25,
      26,
      27,
      28,
      29
    ],
    "珥": [
      1,
      2,
      3,
      4,
      5,
      6,
      8,
      9,
      10,
      7
    ]
  }
  for (const [glyph, order] of Object.entries(expectedOrders))
    assert.deepEqual(proposals[glyph].map(r => r.sourceStroke ?? r.derivedFromStroke), order)
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

test('reviewed dot directions, bends and enclosure connections remain intact', () => {
  for (const [glyph, n] of [['甕', 1], ['雍', 1], ['熔', 5], ['傭', 3], ['溶', 4], ['鎔', 9], ['昱', 5], ['煜', 9], ['鷹', 1], ['翊', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['耀', 8], ['耀', 9], ['耀', 11], ['耀', 12], ['翊', 7], ['翊', 8], ['翊', 10], ['翊', 11], ['瑗', 6], ['媛', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1], glyph + ': ' + n)
  }
  for (const [glyph, n] of [['瑗', 8], ['媛', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] > p[0][1])
  }
  const bend = points('融', 8)
  assert.equal(bend[0][0], bend[1][0])
  assert.ok(bend[1][1] > bend[0][1] && bend[2][0] > bend[1][0])
  assert.equal(bend[2][1], bend[1][1])
  const bar = points('誾', 9)
  assert.ok(bar.at(-1)![0] > bar[0][0] && bar.every(p => p[1] === bar[0][1]))
  assert.ok(toPath(points('殷', 1).at(-1)!, points('殷', 2)) < 2.5)
  for (const [glyph, n, left, right] of [['魏', 12, 10, 11], ['魏', 14, 10, 11],
    ['垠', 5, 7, 4], ['垠', 6, 7, 4], ['珥', 7, 6, 10], ['珥', 8, 6, 10],
    ['胤', 7, 5, 6], ['胤', 8, 5, 6], ['佾', 7, 5, 6], ['佾', 8, 5, 6]] as const) {
    const p = points(glyph, n)
    assert.ok(toPath(p[0], points(glyph, left)) < 2.5, glyph + ': left ' + n)
    assert.ok(toPath(p.at(-1)!, points(glyph, right)) < 2.5, glyph + ': right ' + n)
  }
})

test('independent flesh dots remain detached from walls and each other at playback width', () => {
  for (const [glyph, first, second, left, right] of [['兪', 6, 7, 4, 5], ['踰', 13, 14, 11, 12], ['楡', 10, 11, 8, 9]] as const) {
    for (const dot of [first, second]) for (const wall of [left, right])
      assert.ok(separation(points(glyph, dot), points(glyph, wall)) > 5, glyph + ': ' + dot + '/' + wall)
    assert.ok(separation(points(glyph, first), points(glyph, second)) > 5, glyph + ': dots')
  }
  for (const [glyph, a, b] of [['瑗', 6, 7], ['瑗', 7, 8], ['媛', 5, 6], ['媛', 6, 7], ['融', 8, 9]] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH6_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch6DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch6DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch6DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch6DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch6DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch6DictionaryBundle(HANJA_DICTIONARY_G2_BATCH6_STROKES.slice(1)), /published bundle/)
})
