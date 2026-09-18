import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES, SPECIAL2_BATCH14_DICTIONARY_GEOMETRY, loadSpecial2Batch14DictionaryBundle } from './hanja-stroke-dictionary-special2-batch14.ts'
import { buildSpecial2Batch14DictionaryBundle, SPECIAL2_BATCH14_DICTIONARY_PROOF_PINS, validateSpecial2Batch14DictionaryProofs, validateSpecial2Batch14DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch14.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch14-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-nine approved reviews reproduce 620 playable strokes with actual corpus provenance; the held form stays out', () => {
  validateSpecial2Batch14DictionaryBundle()
  assert.equal(approved.length, 49)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.length, 49)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.reduce((n, e) => n + e.paths.length, 0), 620)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['蹠', '韆', '阡', '邨', '諏', '厠', '輜', '緇', '飭', '朶'])
  // 鯖 is held: the dictionary writes 靑 with 円 where the pinned candidate writes 青 with 月.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['鯖'])
  assert.equal(held[0].checks.glyphForm, 'mismatch')
  assert.ok(!HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.some(e => e.glyph === '鯖'))
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH14_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 49)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['輒', '醮', '邨', '蔥', '皺', '雛', '騶', '驟', '輜', '緇', '飭', '馱'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 艹 pairs bar-then-vertical, 馬 opens with its left vertical, 皮 sweeps before it folds, 田 inner bar before its vertical.
  for (const [glyph, n] of [['蔥', 1], ['蔥', 3], ['騶', 1], ['驟', 1], ['馱', 1], ['皺', 11], ['輜', 13], ['緇', 12]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 耳 writes its inner bars and long lower bar before the right vertical; 食 writes its fold and inner bars before the long vertical.
  assert.deepEqual(published('輒').sourceStrokeIndices.slice(9, 13), [11, 12, 13, 10])
  assert.deepEqual(published('驟').sourceStrokeIndices.slice(12, 16), [14, 15, 16, 13])
  assert.deepEqual(published('飭').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  for (const glyph of ['蹠', '韆', '輟', '簽', '矗', '諏', '蹙', '鷲', '厠', '咤'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending-left strokes: the 隹 ticks of 醮 and 雛, and the reversed opening sweep of 屯 in 邨.
  for (const [glyph, n] of [['醮', 10], ['雛', 13], ['邨', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 3)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH14_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch14DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch14DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch14DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch14DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch14DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch14DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.slice(1)), /published bundle/)
})
