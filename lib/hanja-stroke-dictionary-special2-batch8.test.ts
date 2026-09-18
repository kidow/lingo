import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES, SPECIAL2_BATCH8_DICTIONARY_GEOMETRY, loadSpecial2Batch8DictionaryBundle } from './hanja-stroke-dictionary-special2-batch8.ts'
import { buildSpecial2Batch8DictionaryBundle, SPECIAL2_BATCH8_DICTIONARY_PROOF_PINS, validateSpecial2Batch8DictionaryProofs, validateSpecial2Batch8DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch8.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch8-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved reviews reproduce 671 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch8DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.reduce((n, e) => n + e.paths.length, 0), 671)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['謖', '邃', '隧', '讐', '燧', '楯', '寔', '鰐', '鍔', '鄂'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH8_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['謖', '綏', '鬚', '銹', '邃', '藪', '讐', '蓴', '褶', '翅', '蒔', '鰐'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 田's inner bar first, 镸 opens with its left vertical, 乃's sweep before its fold, 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['謖', 10], ['鰐', 5], ['鬚', 1], ['銹', 14], ['藪', 1], ['藪', 3],
    ['蓴', 1], ['蓴', 3], ['蒔', 1], ['蒔', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // Each 隹 of 讐 writes all three inner bars before its long vertical.
  assert.deepEqual(published('讐').sourceStrokeIndices.slice(4, 7), [6, 7, 5])
  assert.deepEqual(published('讐').sourceStrokeIndices.slice(12, 15), [14, 15, 13])
  for (const glyph of ['巽', '淞', '釗', '綬', '漱', '嗽', '隧', '岫', '尸', '沁'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Outward dot pairs: 爫 in 綏 and the two dots under 穴 in 邃.
  for (const [glyph, n] of [['綏', 8], ['邃', 6]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
  }
  for (const [glyph, n] of [['綏', 10], ['邃', 7]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] < p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
  }
  // Descending-left strokes: the top-right tick of each 隹 in 讐 and both interior pairs of 羽 in 褶 and 翅.
  for (const [glyph, n] of [['讐', 3], ['讐', 11], ['褶', 7], ['褶', 8], ['褶', 10], ['褶', 11],
    ['翅', 6], ['翅', 7], ['翅', 9], ['翅', 10]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 14)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH8_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch8DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch8DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch8DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch8DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch8DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch8DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.slice(1)), /published bundle/)
})
