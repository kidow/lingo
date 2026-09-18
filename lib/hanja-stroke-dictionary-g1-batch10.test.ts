import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH10_STROKES, G1_BATCH10_DICTIONARY_GEOMETRY, loadG1Batch10DictionaryBundle } from './hanja-stroke-dictionary-g1-batch10.ts'
import { buildG1Batch10DictionaryBundle, G1_BATCH10_DICTIONARY_PROOF_PINS, validateG1Batch10DictionaryProofs, validateG1Batch10DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch10.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch10-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH10_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 642 playable strokes with actual corpus provenance', () => {
  validateG1Batch10DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH10_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH10_STROKES.reduce((n, e) => n + e.paths.length, 0), 642)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['澁', '壻', '遡', '逍', '瘙', '疎', '搔'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH10_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH10_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH10_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['刪', '翔', '觴', '嗇', '犀', '煽', '扇', '屑', '簫', '蕭', '瘙', '宵', '搔'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 角 writes its inner vertical before the bottom bar; 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['觴', 6], ['蕭', 1], ['蕭', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 冊 writes both inner verticals before the long bar; 嗇 writes the bar and vertical before the two 人;
  // 叉 writes the long 乀 before its two marks; 肅 ends with the right and central verticals.
  assert.deepEqual(published('刪').sourceStrokeIndices.slice(0, 5), [1, 2, 4, 5, 3])
  assert.deepEqual(published('嗇').sourceStrokeIndices.slice(0, 6), [5, 6, 1, 2, 3, 4])
  assert.deepEqual(published('搔').sourceStrokeIndices.slice(4, 7), [6, 7, 5])
  assert.deepEqual(published('瘙').sourceStrokeIndices.slice(6, 9), [8, null, 7])
  assert.deepEqual(published('簫').sourceStrokeIndices.slice(9), [11, 13, 14, 16, 17, 15, 19, 18, 12, 10])
  assert.deepEqual(published('蕭').sourceStrokeIndices.slice(7), [9, 11, 12, 14, 15, 13, 17, 16, 10, 8])
  for (const glyph of ['徙', '珊', '澁', '壻', '遡', '逍', '疎', '殲'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // 羽 interiors, 戶 openings, 小 dots and the left 蚤 mark descend to the lower left; the right 小 dots descend
  // to the lower right; the 疒 dot of 瘙 is vertical; the upper right mark of 犀 rises to the right.
  const lowerLeft = [['翔', 8], ['翔', 9], ['翔', 11], ['翔', 12], ['煽', 5], ['煽', 10], ['煽', 11], ['煽', 13], ['煽', 14],
    ['扇', 1], ['扇', 6], ['扇', 7], ['扇', 9], ['扇', 10], ['屑', 5], ['宵', 5], ['瘙', 8]] as const
  for (const [glyph, n] of lowerLeft) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['屑', 6], ['宵', 6]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const dot = points('瘙', 1)
  assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1])
  assert.equal(published('瘙').sourceStrokeIndices[0], null)
  const mark = points('犀', 7)
  assert.ok(mark[0][0] < mark.at(-1)![0] && mark[0][1] > mark.at(-1)![1])
  assert.equal(published('犀').sourceStrokeIndices[6], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH10_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 21)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH10_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch10DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch10DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch10DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch10DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch10DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch10DictionaryBundle(HANJA_DICTIONARY_G1_BATCH10_STROKES.slice(1)), /published bundle/)
})
