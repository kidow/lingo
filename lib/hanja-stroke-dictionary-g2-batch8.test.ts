import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_BATCH8_STROKES, G2_BATCH8_DICTIONARY_GEOMETRY, loadG2Batch8DictionaryBundle } from './hanja-stroke-dictionary-g2-batch8.ts'
import { buildG2Batch8DictionaryBundle, G2_BATCH8_DICTIONARY_PROOF_PINS, validateG2Batch8DictionaryProofs, validateG2Batch8DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-batch8.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch8-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const published = (glyph: string) => HANJA_DICTIONARY_G2_BATCH8_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('all fifty individual reviews reproduce 591 playable strokes with actual corpus provenance', () => {
  validateG2Batch8DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_G2_BATCH8_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G2_BATCH8_STROKES.reduce((n, e) => n + e.paths.length, 0), 591)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(originals.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['陟', '鄒', '阪'])
  for (const original of originals) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G2_BATCH8_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => originals.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = originals.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH8_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_BATCH8_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const observations = JSON.parse(read(dir + 'observations.json')) as { entries: { glyph: string; initialDecision: string; correctedReview?: { completed: boolean; reviewedStrokes: number } }[] }
  const corrected = observations.entries.filter(e => e.initialDecision !== 'matched')
  assert.equal(corrected.length, 43)
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
  "聚": [
    1,
    2,
    4,
    5,
    6,
    3,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14
  ],
  "耽": [
    1,
    2,
    4,
    5,
    6,
    3,
    7,
    8,
    9,
    10
  ],
  "坡": [
    1,
    2,
    3,
    5,
    4,
    6,
    7,
    8
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

test('reviewed directions, connected turns and bar attachments preserve source semantics', () => {
  for (const [glyph, n] of [['彰', 1], ['締', 4], ['締', 7], ['蹴', 8], ['衷', 1], ['坪', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[0] === p[0][0]) && p.at(-1)![1] > p[0][1])
  }
  for (const [glyph, n] of [['諜', 1], ['瞻', 12], ['託', 1], ['霸', 5], ['霸', 6], ['霸', 7], ['霸', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(q => q[1] === p[0][1]) && p.at(-1)![0] > p[0][0])
  }
  for (const [glyph, n] of [['敞', 2], ['采', 2], ['隻', 3], ['哨', 5], ['焦', 3], ['崔', 6], ['楸', 10], ['雉', 8], ['灘', 17], ['兌', 1], ['坪', 5]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] < p[0][0] && p.at(-1)![1] > p[0][1], glyph + ': left fall')
  }
  for (const [glyph, n] of [['敞', 3], ['采', 4], ['哨', 6], ['坪', 6]] as const) {
    const p = points(glyph, n)
    assert.ok(p.at(-1)![0] > p[0][0] && p.at(-1)![1] > p[0][1], glyph + ': right fall')
  }
  assert.ok(points('阪', 4).at(-1)![0] < points('阪', 4)[0][0])
  assert.ok(points('扁', 1).at(-1)![0] < points('扁', 1)[0][0])
  const roof = points('兌', 2)
  assert.equal(roof[0][1], roof[1][1])
  assert.ok(roof[1][0] > roof[0][0] && roof.at(-1)![1] > roof[1][1])
  const straight = points('陟', 8)
  assert.ok(Math.abs(straight.at(-1)![0] - straight[0][0]) < 1)
  const cup = points('瞻', 11)
  assert.equal(cup[0][0], cup[1][0])
  assert.ok(cup[1][1] > cup[0][1] && cup[2][0] > cup[1][0])
  assert.ok(cup.at(-1)![1] < cup.at(-2)![1])
  assert.ok(toPath(cup[0], points('瞻', 8)) < 1)
  for (const [glyph, n, left, right] of [
    ['斬', 4, 2, 3], ['斬', 5, 2, 3], ['滄', 8, 10, 7], ['滄', 9, 10, 7],
    ['撤', 10, 8, 9], ['澈', 11, 8, 9], ['瞻', 3, 1, 2], ['瞻', 5, 1, 2],
    ['哨', 9, 7, 8], ['軸', 4, 2, 3], ['軸', 10, 8, 9], ['軸', 12, 8, 9],
    ['聚', 3, 2, 6], ['聚', 4, 2, 6], ['耽', 3, 2, 6], ['耽', 4, 2, 6],
    ['胎', 3, 1, 2], ['胎', 4, 1, 2], ['霸', 20, 18, 19], ['霸', 21, 18, 19],
    ['扁', 7, 5, 6]
  ] as const) {
    const p = points(glyph, n)
    assert.ok(toPath(p[0], points(glyph, left)) < 0.2, glyph + ': left ' + n)
    assert.ok(toPath(p.at(-1)!, points(glyph, right)) < 0.2, glyph + ': right ' + n)
    assert.ok(Math.abs(p.at(-1)![1] - p[0][1]) < Math.abs(p.at(-1)![0] - p[0][0]) / 2,
      glyph + ': bar must not attach to the roof')
  }
  for (const [glyph, n, base] of [['敞', 12, 9], ['撤', 15, 12], ['澈', 15, 12],
    ['楸', 13, 12], ['炊', 8, 7], ['衷', 7, 5], ['衷', 10, 5],
    ['琢', 12, 5], ['扁', 4, 1], ['扁', 8, 6], ['扁', 9, 6]] as const)
    assert.ok(toPath(points(glyph, n)[0], points(glyph, base)) < 2.5, glyph + ': attachment ' + n)
  for (const [glyph, n, bar] of [['隻', 3, 4], ['焦', 3, 4], ['崔', 6, 7], ['雉', 8, 9], ['灘', 17, 18]] as const)
    assert.ok(toPath(points(glyph, n).at(-1)!, points(glyph, bar)) < 1, glyph + ': 隹 fall / bar')
})

test('independent components stay separate at the five-unit playback width', () => {
  for (const [glyph, a, b] of [
    ['敞', 2, 1], ['敞', 3, 1], ['哨', 5, 4], ['哨', 6, 4],
    ['瞻', 11, 12], ['瞻', 12, 13], ['締', 6, 13], ['締', 5, 4], ['締', 6, 4],
    ['趨', 17, 7], ['鄒', 5, 6], ['峙', 8, 6], ['灘', 13, 7],
    ['霸', 5, 4], ['霸', 6, 4], ['霸', 7, 4], ['霸', 8, 4],
    ['霸', 5, 3], ['霸', 7, 3], ['霸', 5, 6], ['霸', 7, 8], ['彭', 8, 6]
  ] as const)
    assert.ok(separation(points(glyph, a), points(glyph, b)) > 5, glyph + ': ' + a + '/' + b)
  assert.ok(toPath(points('瞻', 11).at(-1)!, points('瞻', 8)) > 5)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G2_BATCH8_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2Batch8DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG2Batch8DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2Batch8DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG2Batch8DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG2Batch8DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG2Batch8DictionaryBundle(HANJA_DICTIONARY_G2_BATCH8_STROKES.slice(1)), /published bundle/)
})
