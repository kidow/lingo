import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES, SPECIAL_BATCH6_DICTIONARY_GEOMETRY, loadSpecialBatch6DictionaryBundle } from './hanja-stroke-dictionary-special-batch6.ts'
import { buildSpecialBatch6DictionaryBundle, SPECIAL_BATCH6_DICTIONARY_PROOF_PINS, validateSpecialBatch6DictionaryProofs, validateSpecialBatch6DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch6.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch6-2026-09-20/'
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
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 664 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch6DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.reduce((n, e) => n + e.paths.length, 0), 664)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  assert.equal(SPECIAL_BATCH6_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH6_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH6_DICTIONARY_GEOMETRY.Hant.sha256, TRADITIONAL_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH6_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH6_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES,
    candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES,
    candidates('MM'), candidates('Ja'), candidates('Hant'), candidates('Hans')), /geometry mismatch/)
})

test('two corpus overrides, both leaving the dictionary order intact', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['畀', '歃'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.equal(override.startingCorpus, 'Ja', glyph)
    assert.ok(original.matchingCandidates.includes('Ja'), glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH6_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
    // Both came out clean: every published stroke is its licensed original, in order.
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1), glyph)
  }
})

test('the nine reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['茀', '紕', '轡', '繽', '鬢', '豳', '蘋', '紓', '紲'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // All but 豳 are neighbouring pairs: 艹 writes each 十 bar first, 糸 its centre vertical
  // before the left dot, and 髟 the left vertical of 長 before the bars beside it.
  for (const [glyph, n] of [['茀', 1], ['茀', 3], ['紕', 4], ['轡', 11], ['轡', 17], ['繽', 4],
    ['鬢', 1], ['蘋', 1], ['紓', 4], ['紲', 4]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 蘋 swaps only the first 十 of its 艹; the second pair is already the licensed order.
  assert.deepEqual(published('蘋').sourceStrokeIndices.slice(2, 4), [3, 4])
  // 豳 is the one rotation: the tall centre vertical of 山 moves from first to fifteenth,
  // and the 凵 and right vertical that close the enclosure stay where they are.
  assert.deepEqual(published('豳').sourceStrokeIndices,
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 16, 17])
})

test('no authored paths: every published stroke is a licensed original', () => {
  assert.deepEqual(corrections.edits, [])
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored, [])
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      assert.equal(entry.paths[i], original.paths[index! - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH6_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch6DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch6DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch6DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch6DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch6DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch6DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.slice(1)), /published bundle/)
})
