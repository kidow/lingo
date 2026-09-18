import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH12_STROKES, G1_BATCH12_DICTIONARY_GEOMETRY, loadG1Batch12DictionaryBundle } from './hanja-stroke-dictionary-g1-batch12.ts'
import { buildG1Batch12DictionaryBundle, G1_BATCH12_DICTIONARY_PROOF_PINS, validateG1Batch12DictionaryProofs, validateG1Batch12DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch12.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch12-2026-09-19/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH12_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 701 playable strokes with actual corpus provenance', () => {
  validateG1Batch12DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH12_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH12_STROKES.reduce((n, e) => n + e.paths.length, 0), 701)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['闇', '隘', '靄', '揶', '爺', '瘍', '筵', '艶', '懊'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH12_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH12_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH12_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['縊', '鶯', '釀', '瘍', '瘀', '臆', '諺', '儼', '艶', '穢', '蘊', '壅'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 艹 pairs bar-then-vertical; 彦 writes its 丿 before the 乀; 歲 sweeps before the 戌 bar.
  for (const [glyph, n] of [['蘊', 1], ['蘊', 3], ['諺', 10], ['穢', 10]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 嚴 writes its inner bars before the right vertical; 曲 writes its inner bar before the inner verticals.
  assert.deepEqual(published('儼').sourceStrokeIndices.slice(14, 18), [16, 17, 18, 15])
  assert.deepEqual(published('艶').sourceStrokeIndices.slice(2, 5), [5, 3, 4])
  for (const glyph of ['軋', '闇', '靄', '扼', '揶', '冶', '爺', '筵', '伍', '曳'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 益 dot of 縊, both 火 dots of 鶯 and the 隹 tick of 壅 descend to the lower left; the right 益 dot descends to
  // the lower right; the 亠·疒·立 dots of 釀·瘍·臆·壅 are vertical; the final 於 dot of 瘀 rises to the right.
  for (const [glyph, n] of [['縊', 7], ['鶯', 1], ['鶯', 5], ['壅', 8]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const right = points('縊', 8)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(published('縊').sourceStrokeIndices[7], null)
  for (const [glyph, n] of [['釀', 8], ['瘍', 1], ['臆', 5], ['壅', 1]] as const) {
    const dot = points(glyph, n)
    assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const tick = points('瘀', 13)
  assert.ok(tick[0][0] < tick.at(-1)![0] && tick[0][1] > tick.at(-1)![1])
  assert.equal(published('瘀').sourceStrokeIndices[12], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH12_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 10)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH12_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch12DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch12DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch12DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch12DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch12DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch12DictionaryBundle(HANJA_DICTIONARY_G1_BATCH12_STROKES.slice(1)), /published bundle/)
})
