import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES, SPECIAL2_BATCH3_DICTIONARY_GEOMETRY, loadSpecial2Batch3DictionaryBundle } from './hanja-stroke-dictionary-special2-batch3.ts'
import { buildSpecial2Batch3DictionaryBundle, SPECIAL2_BATCH3_DICTIONARY_PROOF_PINS, validateSpecial2Batch3DictionaryProofs, validateSpecial2Batch3DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch3.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch3-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-nine approved reviews reproduce 610 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch3DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.length, 49)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.reduce((n, e) => n + e.paths.length, 0), 610)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph),
    ['槻', '懃', '檎', '碁', '祁', '祇', '祺', '娜', '獰', '鄲', '獺', '嶋', '覩', '櫂'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH3_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 49)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('a component form the licensed corpus does not share stays out of the runtime', () => {
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['犢'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(record.issues?.length)
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.ok(!HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.some(e => e.glyph === record.glyph))
    // Nothing else in the runtime may quietly supply the held glyph either.
    assert.equal(hanjaStrokeData(original), null)
  }
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['竅', '懃', '啖', '聃', '幢', '黛', '韜', '櫂'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps observed against the dictionary: 里 and 黑 draw their bar before the long vertical.
  for (const [glyph, n] of [['幢', 13], ['黛', 11]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n])
  // Longer moves: 堇's central vertical after its bars, 耳's right vertical last, 隹's right vertical after its bars.
  assert.deepEqual(published('懃').sourceStrokeIndices.slice(7, 10), [9, 10, 8])
  assert.deepEqual(published('聃').sourceStrokeIndices.slice(0, 6), [1, 2, 4, 5, 6, 3])
  assert.deepEqual(published('櫂').sourceStrokeIndices.slice(14, 18), [16, 17, 15, 18])
  for (const glyph of ['槻', '磯', '楠', '戇', '棹'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending-left dots: 方's top dot, both 火 dots, 爫's first dot, 隹's dot.
  for (const [glyph, n] of [['竅', 11], ['啖', 4], ['啖', 8], ['韜', 11], ['櫂', 13]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // 爫's third dot descends to the right.
  const right = points('韜', 13)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 6)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH3_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch3DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch3DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch3DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch3DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch3DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch3DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.slice(1)), /published bundle/)
})
