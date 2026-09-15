import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH5_STROKES, G2_BATCH5_DICTIONARY_GEOMETRY, loadG2Batch5DictionaryBundle } from './hanja-stroke-dictionary-g2-batch5.ts'
import { buildG2Batch5DictionaryBundle, G2_BATCH5_DICTIONARY_PROOF_PINS, validateG2Batch5DictionaryProofs, validateG2Batch5DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch5.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch5-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH5_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 622 playable strokes with actual corpus provenance', () => {
  validateG2Batch5DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH5_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH5_STROKES.reduce((n, e) => n + e.paths.length, 0), 622)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['暹', '貰', '邵', '隋', '倻', '墺'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH5_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH5_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH5_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 33)
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
    "暹": [1,2,3,4,5,6,7,8,10,11,9,12,13,14,15,16],
    "燮": [5,6,7,8,9,10,11,1,2,3,4,12,13,14,15,16,17],
    "瑟": [1,2,3,4,5,6,7,8,11,12,10,9,13],
    "淵": [1,2,3,4,6,7,9,10,8,12,11,5],
    "盈": [2,1,3,4,5,6,7,8,9],
    "濊": [1,2,3,4,5,6,7,9,8,10,11,12,13,14,15,16],
  }
  for (const [glyph, order] of Object.entries(expectedOrders))
    assert.deepEqual(proposals[glyph].map(r => r.sourceStroke ?? r.derivedFromStroke), order)
  for (const glyph of ['紹', '繩', '紳'])
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(3, 6), [null, null, null])
})

test('source-specific directions, turns and enclosure connections remain distinct', () => {
  for (const [glyph, n] of [['紹', 4], ['繩', 4], ['紳', 4], ['閼', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
  }
  const left = points('穩', 7), right = points('穩', 9), bar = points('繩', 13)
  assert.ok(left.at(-1)![0] < left[0][0] && left.at(-1)![1] > left[0][1])
  assert.ok(right.at(-1)![0] > right[0][0] && right.at(-1)![1] > right[0][1])
  assert.ok(bar.at(-1)![0] < bar[0][0])
  const rise = points('閼', 16)
  assert.ok(rise.at(-1)![0] - rise[0][0] > 20 && rise.at(-1)![1] < rise[0][1])
  const turn = points('暹', 15)
  assert.ok(turn[1][0] > turn[0][0])
  assert.equal(turn[1][0], turn[2][0])
  assert.ok(turn[2][1] > turn[1][1])
  for (const [glyph, n] of [['殖', 12], ['瑟', 11], ['穩', 17]] as const) {
    const p = points(glyph, n)
    assert.equal(p[0][0], p[1][0])
    assert.ok(p[1][1] > p[0][1] && p.at(-1)![0] > p[0][0])
  }
  for (const [glyph, n, rightWall] of [['殖', 9, 8], ['殖', 10, 8], ['殖', 11, 8],
    ['睿', 12, 11], ['睿', 13, 11], ['睿', 14, 11]] as const) {
    const p = points(glyph, n), wall = points(glyph, rightWall)
    assert.ok(Math.abs(p.at(-1)![0] - Math.max(...wall.map(q => q[0]))) < 3)
  }
})

test('corrected independent marks stay separated at playback stroke width', () => {
  const distance = (p: number[], a: number[], b: number[]) => {
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
  }
  const separation = (a: number[][], b: number[][]) => Math.min(...a.flatMap((p, i) => i === 0 ? [] :
    Array.from({ length: 101 }, (_, j) => {
      const q = [a[i - 1][0] + (p[0] - a[i - 1][0]) * j / 100, a[i - 1][1] + (p[1] - a[i - 1][1]) * j / 100]
      return Math.min(...b.slice(1).map((v, k) => distance(q, b[k], v)))
    })))
  for (const [glyph, a, b] of [['殖', 7, 12], ['殖', 8, 12], ['殖', 3, 12], ['閼', 15, 16], ['閼', 6, 16], ['閼', 12, 16], ['穩', 7, 8], ['穩', 8, 9]] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH5_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch5DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch5DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch5DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch5DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch5DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch5DictionaryBundle(HANJA_DICTIONARY_G2_BATCH5_STROKES.slice(1)), /published bundle/)
})
