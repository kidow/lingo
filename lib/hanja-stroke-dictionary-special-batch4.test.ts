import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES, SPECIAL_BATCH4_DICTIONARY_GEOMETRY, loadSpecialBatch4DictionaryBundle } from './hanja-stroke-dictionary-special-batch4.ts'
import { buildSpecialBatch4DictionaryBundle, SPECIAL_BATCH4_DICTIONARY_PROOF_PINS, validateSpecialBatch4DictionaryProofs, validateSpecialBatch4DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch4.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch4-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: Corpus; matchingCandidates: Corpus[]; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; permutation?: number[]
    checks: Record<string, string>; correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; reason: string }[] }
const selection = JSON.parse(read(dir + 'selection.json')) as { overrides: Record<string, { corpus: Corpus; startingCorpus: Corpus; reason: string }> }
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 714 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch4DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.reduce((n, e) => n + e.paths.length, 0), 714)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  assert.equal(SPECIAL_BATCH4_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH4_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH4_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH4_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES,
    candidates('MM'), candidates('Ja'), [], candidates('Hans')), /geometry mismatch/)
})

test('two corpus overrides, one of which replaces a ten-stroke permutation', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['蠃', '雒'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.equal(override.startingCorpus, 'Ja', glyph)
    assert.ok(original.matchingCandidates.includes('Ja'), glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH4_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
  }
  // 蠃 came out clean; 雒 kept one flagged tick and took an authored path instead of a reorder.
  assert.ok(published('蠃').sourceStrokeIndices.every((index, i) => index === i + 1))
  assert.ok(published('雒').sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('the twelve reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph),
    ['綯', '黷', '僮', '厲', '藘', '孌', '蘞', '罍', '繚', '脢', '霾', '篾'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // Every one is a neighbouring pair swapped: 糸 writes its centre vertical before the left dot,
  // 艹 writes each 十 bar first, 田 and 里 write the inner bar before the vertical, 每 its inner mark.
  for (const [glyph, n] of [['綯', 4], ['繚', 4], ['孌', 11], ['孌', 17], ['藘', 1], ['藘', 3],
    ['蘞', 1], ['蘞', 3], ['黷', 6], ['僮', 12], ['霾', 20], ['罍', 3], ['罍', 8], ['罍', 13],
    ['厲', 3], ['厲', 5], ['脢', 10], ['篾', 12]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke),
    ['螣5', '螣6', '雒9', '捋5', '捋7', '稂6', '僇4', '僇5', '僇7', '僇8', '廩1'])
  assert.deepEqual(corrections.edits.map(e => e.glyph + e.stroke), authored.map(e => e.glyph + e.stroke))
  const bounds = (path: string) => {
    const points = [...path.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
    return [Math.min(...points.map(p => p[0])), Math.max(...points.map(p => p[0])),
      Math.min(...points.map(p => p[1])), Math.max(...points.map(p => p[1]))]
  }
  for (const edit of corrections.edits) {
    const original = originals.find(e => e.glyph === edit.glyph)!
    const [minX, maxX, minY, maxY] = bounds(original.paths[edit.stroke - 1])
    const [editMinX, editMaxX, editMinY, editMaxY] = bounds(edit.path)
    assert.ok(editMinX >= minX - 0.05 && editMaxX <= maxX + 0.05, edit.glyph + edit.stroke + ' x')
    assert.ok(editMinY >= minY - 0.05 && editMaxY <= maxY + 0.05, edit.glyph + edit.stroke + ' y')
    assert.notEqual(edit.path, original.paths[edit.stroke - 1])
    assert.ok(edit.reason.length > 20)
    assert.equal(published(edit.glyph).paths[edit.stroke - 1], edit.path)
  }
  // The two reversed 羽 strokes keep every licensed point and only run the other way.
  for (const [glyph, stroke] of [['僇', 5], ['僇', 8]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const numbers = (path: string) => path.match(/[-\d.]+/g)!.map(Number)
    const before = numbers(original), after = numbers(edit.path)
    assert.equal(before.length, after.length)
    for (let i = 0; i < before.length; i += 2)
      assert.deepEqual([after[i], after[i + 1]], [before[before.length - 2 - i], before[before.length - 1 - i]])
    assert.match(edit.reason, /^Reverse /)
  }
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], original.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH4_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch4DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch4DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch4DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch4DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch4DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch4DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.slice(1)), /published bundle/)
})
