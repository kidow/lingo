import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH9_STROKES, G2_BATCH9_DICTIONARY_GEOMETRY, loadG2Batch9DictionaryBundle } from './hanja-stroke-dictionary-g2-batch9.ts'
import { buildG2Batch9DictionaryBundle, G2_BATCH9_DICTIONARY_PROOF_PINS, validateG2Batch9DictionaryProofs, validateG2Batch9DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch9.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch9-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH9_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 578 playable strokes with actual corpus provenance', () => {
  validateG2Batch9DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH9_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH9_STROKES.reduce((n, e) => n + e.paths.length, 0), 578)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['邯', '晧', '滑', '滉', '廻', '烋'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH9_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH9_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH9_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 41)
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
  "怖": [
    1,
    2,
    3,
    5,
    4,
    6,
    7,
    8
  ],
  "虐": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    9,
    8
  ],
  "翰": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    12,
    15,
    11,
    9,
    10,
    14,
    16,
    13
  ],
  "艦": [
    1,
    2,
    3,
    4,
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
    15,
    16,
    17,
    18,
    19,
    20
  ],
  "峽": [
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    5,
    6
  ],
  "晧": [
    1,
    2,
    3,
    4,
    5,
    6,
    8,
    7,
    9,
    10,
    11
  ],
  "樺": [
    1,
    2,
    3,
    4,
    6,
    5,
    8,
    7,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  ],
  "滑": [
    1,
    2,
    3,
    4,
    5,
    7,
    6,
    8,
    9,
    10,
    11,
    12,
    13
  ],
  "滉": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    10,
    8,
    9,
    11,
    12,
    13
  ],
  "勳": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    9,
    8,
    10,
    11,
    12,
    13,
    14,
    15,
    16
  ],
  "熏": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    9,
    8,
    10,
    11,
    12,
    13,
    14
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

test('reviewed directions, turns and attachments preserve the observed forms', () => {
  for (const [glyph, n] of [['沆', 4], ['亢', 1], ['弦', 4], ['鉉', 9], ['炫', 5], ['濠', 4], ['壕', 4], ['鎬', 9], ['徽', 11]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[0] === p[0][0]) && p.at(-1)![1] > p[0][1], glyph + ': vertical')
  }
  for (const [glyph, n] of [['杓', 7], ['艦', 15]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[1] === p[0][1]) && p.at(-1)![0] > p[0][0])
  }
  for (const [glyph, n] of [['鋪', 7], ['鉉', 7], ['鎬', 7], ['徽', 12]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] < p[0][1], glyph + ': upward-right')
  }
  for (const n of [12, 13, 15, 16]) {
    const p = points('翰', n)
    assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1], '翰 inner falls left')
  }
  for (const [glyph, n] of [['弦', 6], ['鉉', 11], ['炫', 7], ['幻', 1], ['徽', 8]] as const) {
    const p = points(glyph, n), left = p.reduce((i, q, j) => q[0] < p[i][0] ? j : i, 0)
    assert.ok(left > 0 && left < p.length - 1)
    assert.ok(p[left][1] > p[0][1] && p.at(-1)![0] > p[left][0] && p.at(-1)![1] > p[left][1])
  }
  for (const [glyph, n] of [['扈', 1], ['馨', 12]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0], glyph + ': leftward roof')
  }
  const noHook = points('檜', 15)
  assert.ok(Math.abs(noHook.at(-1)![0] - noHook.at(-2)![0]) < 1 && noHook.at(-1)![1] > noHook.at(-2)![1])
  for (const [glyph, n, left, right] of [
    ['鋪', 12, 10, 11], ['鋪', 13, 10, 11], ['弼', 8, 6, 7], ['弼', 9, 6, 7],
    ['翰', 5, 3, 4], ['翰', 6, 3, 4], ['邯', 4, 2, 3], ['邯', 5, 2, 3],
    ['峴', 6, 4, 5], ['峴', 7, 4, 5], ['桓', 8, 6, 7],
    ['滑', 12, 10, 11], ['滑', 13, 10, 11], ['檜', 16, 14, 15], ['檜', 17, 14, 15]
  ] as const) {
    const p = points(glyph, n)
    assert.ok(toPath(p[0], points(glyph, left)) < 1, glyph + ': left bar ' + n)
    assert.ok(toPath(p.at(-1)!, points(glyph, right)) < 1, glyph + ': right bar ' + n)
  }
  for (const n of [7, 8, 9, 11])
    assert.ok(toPath(points('淮', n)[0], points('淮', 5)) < 1, '淮 left attachment')
  assert.ok(toPath(points('淮', 6).at(-1)!, points('淮', 7)) < 1)
  for (const [glyph, n, base] of [['扈', 4, 1], ['徽', 17, 15], ['煥', 9, 8]] as const)
    assert.ok(toPath(points(glyph, n)[0], points(glyph, base)) < 2.5, glyph + ': attached start')
})

test('independent parts remain separate at the five-unit playback width', () => {
  for (const [glyph, a, b] of [
    ['翰', 12, 7], ['翰', 16, 11], ['炫', 6, 2],
    ['峽', 7, 10], ['峽', 5, 3], ['峽', 6, 9],
    ['赫', 7, 5], ['赫', 7, 13], ['型', 8, 4],
    ['瑩', 5, 2], ['瑩', 5, 4], ['壕', 9, 3],
    ['煥', 7, 11], ['煥', 8, 11], ['晧', 7, 10],
    ['晃', 5, 4], ['滉', 8, 7], ['徽', 8, 9], ['桓', 1, 6]
  ] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH9_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch9DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch9DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch9DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch9DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch9DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch9DictionaryBundle(HANJA_DICTIONARY_G2_BATCH9_STROKES.slice(1)), /published bundle/)
})
