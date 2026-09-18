import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES, SPECIAL2_BATCH11_DICTIONARY_GEOMETRY, loadSpecial2Batch11DictionaryBundle } from './hanja-stroke-dictionary-special2-batch11.ts'
import { buildSpecial2Batch11DictionaryBundle, SPECIAL2_BATCH11_DICTIONARY_PROOF_PINS, validateSpecial2Batch11DictionaryProofs, validateSpecial2Batch11DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch11.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch11-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-nine approved reviews reproduce 606 playable strokes with actual corpus provenance; the held form stays out', () => {
  validateSpecial2Batch11DictionaryBundle()
  assert.equal(approved.length, 49)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.length, 49)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.reduce((n, e) => n + e.paths.length, 0), 606)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['湲', '寃', '逾', '楢', '慇', '艤', '飴', '邇', '姙'])
  // 瑜 is held: the dictionary writes 巜 where the pinned candidate writes 刂.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['瑜'])
  assert.equal(held[0].checks.glyphForm, 'mismatch')
  assert.ok(!HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.some(e => e.glyph === '瑜'))
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH11_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 49)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['爰', '葦', '猷', '侑', '洧', '毓', '艤', '飴', '謚', '贓', '牆', '臧'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 艹 pairs bar-then-vertical, 有 sweep before bar, 母 dots before the bar, 羊 bar before vertical, 爿 long vertical first.
  for (const [glyph, n] of [['葦', 1], ['葦', 3], ['侑', 3], ['洧', 4], ['毓', 6], ['艤', 10], ['牆', 1]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 食 writes its fold and inner bars before the long vertical; 爿·戈 open with the short strokes; 嗇 writes 土 before the 人 pairs.
  assert.deepEqual(published('飴').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('贓').sourceStrokeIndices.slice(7, 12), [10, 11, 12, 9, 8])
  assert.deepEqual(published('臧').sourceStrokeIndices.slice(0, 5), [3, 4, 5, 2, 1])
  assert.deepEqual(published('牆').sourceStrokeIndices.slice(4, 10), [9, 10, 5, 6, 7, 8])
  for (const glyph of ['垣', '円', '湲', '蝟', '孺', '逾', '蟻', '肄', '咨', '梓'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Outward dot pairs (爫 in 爰, 丷 in 猷 and 謚): the left dot descends left, the right dot descends right.
  for (const [glyph, n] of [['爰', 2], ['猷', 1], ['謚', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  for (const [glyph, n] of [['爰', 4], ['猷', 2], ['謚', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 6)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH11_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch11DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch11DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch11DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch11DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch11DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch11DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.slice(1)), /published bundle/)
})
