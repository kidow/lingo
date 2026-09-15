import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH7_STROKES, G2_BATCH7_DICTIONARY_GEOMETRY, loadG2Batch7DictionaryBundle } from './hanja-stroke-dictionary-g2-batch7.ts'
import { buildG2Batch7DictionaryBundle, G2_BATCH7_DICTIONARY_PROOF_PINS, validateG2Batch7DictionaryProofs, validateG2Batch7DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch7.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch7-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH7_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 615 playable strokes with actual corpus provenance', () => {
  validateG2Batch7DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH7_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH7_STROKES.reduce((n, e) => n + e.paths.length, 0), 615)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['艇', '鼎', '鄭', '彫', '祚', '濬'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH7_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH7_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH7_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 44)
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
  "蔣": [
    2,
    1,
    4,
    3,
    6,
    5,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  ],
  "劑": [
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
    13,
    14,
    12,
    15,
    16
  ],
  "駐": [
    2,
    1,
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
    15
  ],
  "駿": [
    2,
    1,
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
    17
  ],
  "輯": [
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
    14,
    15,
    16,
    13
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

test('reviewed directions, connected turns and bars preserve the observed semantics', () => {
  for (const [glyph, n] of [['庄', 1], ['獐', 4], ['璋', 5], ['旌', 1], ['劑', 1], ['琮', 5], ['塵', 1], ['窒', 1], ['綜', 7], ['疇', 11]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[0] === p[0][0]) && p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['諮', 1], ['諮', 8], ['診', 1], ['餐', 10]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[1] === p[0][1]) && p.at(-1)![0] > p[0][0])
  }
  assert.ok(points('呈', 4).at(-1)![0] < points('呈', 4)[0][0])
  for (const [glyph, n] of [['雌', 9], ['准', 5], ['趙', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1])
  }
  const right = points('趙', 10)
  assert.ok(right.at(-1)![0] > right[0][0] && right.at(-1)![1] > right[0][1])
  for (const [glyph, n, roof] of [['駿', 14, 11], ['浚', 7, 4], ['峻', 7, 4], ['稷', 12, 10], ['窒', 5, 3]] as const) {
    const p = points(glyph, n)
    assert.equal(p[0][0], p[1][0])
    assert.ok(p[1][1] > p[0][1] && p[2][0] > p[1][0])
    assert.ok(p.at(-1)![1] < p.at(-2)![1])
    assert.ok(toPath(p[0], points(glyph, roof)) < 2.5, glyph + ': roof attachment')
  }
  for (const [glyph, n, left, right] of [['蠶', 11, 9, 10], ['蠶', 12, 9, 10],
    ['晶', 3, 1, 2], ['晶', 4, 1, 2], ['晶', 7, 5, 6], ['晶', 8, 5, 6],
    ['晶', 11, 9, 10], ['晶', 12, 9, 10], ['劑', 12, 11, 14], ['劑', 13, 11, 14],
    ['濬', 15, 13, 14], ['濬', 16, 13, 14], ['濬', 17, 13, 14],
    ['輯', 13, 12, 16], ['輯', 14, 12, 16], ['餐', 12, 14, 11], ['餐', 13, 14, 11]] as const) {
    const p = points(glyph, n)
    assert.ok(toPath(p[0], points(glyph, left)) < 0.2, glyph + ': left ' + n)
    assert.ok(toPath(p.at(-1)!, points(glyph, right)) < 0.2, glyph + ': right ' + n)
    assert.ok(Math.abs(p.at(-1)![1] - p[0][1]) < Math.abs(p.at(-1)![0] - p[0][0]) / 2,
      glyph + ': bar must not accidentally attach to the roof')
  }
  assert.ok(toPath(points('秦', 10)[0], points('秦', 8)) < 2.5)
})

test('reviewed independent marks and components stay detached at the five-unit playback width', () => {
  for (const [glyph, a, b] of [['彫', 3, 1], ['彫', 3, 2], ['彫', 5, 1], ['彫', 5, 2],
    ['趙', 9, 8], ['趙', 10, 8], ['趙', 9, 10], ['綜', 6, 13],
    ['祚', 4, 3], ['祚', 5, 3], ['祚', 4, 5],
    ['駿', 13, 6], ['駿', 14, 16], ['浚', 6, 3], ['浚', 7, 9],
    ['峻', 6, 3], ['峻', 7, 9], ['稷', 11, 5], ['稷', 12, 14],
    ['稙', 13, 2], ['稙', 13, 5], ['稙', 13, 8], ['窒', 5, 6]] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
  const cup = points('窒', 5)
  // Its starting vertical intentionally touches the roof; only the returning hook stays apart.
  assert.ok(toPath(cup.at(-1)!, points('窒', 3)) > 5)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH7_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch7DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch7DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch7DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch7DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch7DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch7DictionaryBundle(HANJA_DICTIONARY_G2_BATCH7_STROKES.slice(1)), /published bundle/)
})
