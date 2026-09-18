import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH5_STROKES, G1_BATCH5_DICTIONARY_GEOMETRY, loadG1Batch5DictionaryBundle } from './hanja-stroke-dictionary-g1-batch5.ts'
import { buildG1Batch5DictionaryBundle, G1_BATCH5_DICTIONARY_PROOF_PINS, validateG1Batch5DictionaryProofs, validateG1Batch5DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch5.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch5-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH5_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-eight approved grade 1 reviews reproduce 716 playable strokes with actual corpus provenance; the held forms stay out', () => {
  validateG1Batch5DictionaryBundle()
  assert.equal(approved.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH5_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH5_STROKES.reduce((n, e) => n + e.paths.length, 0), 716)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['禱', '屠', '堵', '遁', '邏', '閭', '礫', '逞'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 瀆 is held: the dictionary writes the middle of 賣 as 四 where the pinned candidate writes 罒.
  // 疼 is held: the dictionary finishes 冬 with a long rising stroke where the pinned candidate draws a dot.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['瀆', '疼'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH5_STROKES.some(e => e.glyph === record.glyph))
    assert.equal(hanjaStrokeData(originals.find(e => e.glyph === record.glyph)!), null)
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH5_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH5_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH5_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['滔', '沌', '瞳', '憧', '兜', '邏', '癩', '駱', '鸞', '戾', '簾', '逞'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 里 writes its middle bar before the long vertical; 馬 opens with its left vertical; 𡈼 writes its bar before the vertical;
  // 兜 writes 白 before the left bracket; 隹 in the Ja 邏 writes its bars before the inner vertical.
  for (const [glyph, n] of [['瞳', 15], ['憧', 13], ['駱', 1], ['逞', 5]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  assert.deepEqual(published('兜').sourceStrokeIndices.slice(0, 7), [3, 4, 5, 6, 7, 1, 2])
  assert.deepEqual(published('邏').sourceStrokeIndices.slice(15, 18), [17, 18, 16])
  for (const glyph of ['禱', '屠', '堵', '遁', '閭', '礫', '瀾', '齡'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending to the lower left: the left 爫 dot of 滔, the reversed 屯 sweep of 沌, the 糸 dot and 隹 tick of 邏, the 糸 dot of 鸞,
  // the 戶 sweep of 戾, the left 兼 dot of 簾 and the reversed 𡈼 bar of 逞. The right 爫 dot of 滔 descends right; the 疒 dot of 癩 is vertical.
  for (const [glyph, n] of [['滔', 5], ['沌', 4], ['邏', 10], ['邏', 14], ['鸞', 18], ['戾', 1], ['簾', 10], ['逞', 4]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const right = points('滔', 7)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(published('滔').sourceStrokeIndices[6], null)
  const dot = points('癩', 1)
  assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1])
  assert.equal(published('癩').sourceStrokeIndices[0], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH5_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 10)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH5_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch5DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch5DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch5DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch5DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch5DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch5DictionaryBundle(HANJA_DICTIONARY_G1_BATCH5_STROKES.slice(1)), /published bundle/)
})
