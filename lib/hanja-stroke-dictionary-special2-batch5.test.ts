import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES, SPECIAL2_BATCH5_DICTIONARY_GEOMETRY, loadSpecial2Batch5DictionaryBundle } from './hanja-stroke-dictionary-special2-batch5.ts'
import { buildSpecial2Batch5DictionaryBundle, SPECIAL2_BATCH5_DICTIONARY_PROOF_PINS, validateSpecial2Batch5DictionaryProofs, validateSpecial2Batch5DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch5.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch5-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 659 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch5DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.reduce((n, e) => n + e.paths.length, 0), 659)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['瘻', '瑠', '浬', '璃', '陌', '謎', '梶'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH5_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['旒', '瑠', '狸', '羸', '厘', '鯉', '浬', '璃', '碼', '瑪',
    '驀', '冪', '麵', '蓂', '姆', '錨', '繆', '懋', '雯', '黴'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 里's 土 bar first, the 王 radical's bars before its vertical, 馬's left vertical first,
  // 艹 pairs bar-then-vertical, 母's crossing bar after both dots, 黑's lower bar before its long vertical.
  for (const [glyph, n] of [['狸', 8], ['厘', 7], ['浬', 8], ['鯉', 16], ['瑠', 2], ['瑠', 12], ['璃', 2],
    ['瑪', 5], ['碼', 6], ['驀', 12], ['驀', 1], ['驀', 3], ['冪', 3], ['冪', 5], ['蓂', 1], ['蓂', 3],
    ['錨', 9], ['錨', 11], ['姆', 7], ['黴', 13]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 麥 draws its central vertical after the two small 人; 懋 writes 矛 before either 木.
  assert.deepEqual(published('麵').sourceStrokeIndices.slice(0, 6), [1, 3, 4, 5, 6, 2])
  assert.deepEqual(published('懋').sourceStrokeIndices.slice(0, 9), [5, 6, 7, 8, 9, 1, 2, 3, 4])
  for (const glyph of ['瘻', '縷', '婁', '侖', '霖', '楙', '謎', '泯'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending strokes: 𠫓 in 旒, 亠 in 羸, 文 in 雯.
  for (const [glyph, n] of [['旒', 7], ['羸', 1], ['雯', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // Descending-left strokes: both interior pairs of 羽 in 繆.
  for (const n of [8, 9, 11, 12]) {
    const p = points('繆', n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], '繆' + n)
    assert.equal(published('繆').sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 7)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH5_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch5DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch5DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch5DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch5DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch5DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch5DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.slice(1)), /published bundle/)
})
