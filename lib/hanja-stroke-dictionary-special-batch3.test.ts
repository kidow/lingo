import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES, SPECIAL_BATCH3_DICTIONARY_GEOMETRY, loadSpecialBatch3DictionaryBundle } from './hanja-stroke-dictionary-special-batch3.ts'
import { buildSpecialBatch3DictionaryBundle, SPECIAL_BATCH3_DICTIONARY_PROOF_PINS, validateSpecialBatch3DictionaryProofs, validateSpecialBatch3DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch3.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch3-2026-09-20/'
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
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 624 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch3DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.reduce((n, e) => n + e.paths.length, 0), 624)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  assert.equal(SPECIAL_BATCH3_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH3_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH3_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH3_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES,
    candidates('MM'), candidates('Ja'), [], candidates('Hans')), /geometry mismatch/)
})

test('one corpus override carries the batch, and the rest of the queue needed none', () => {
  // Batch 2 changed eight corpora; this stretch of the catalog needed one. 曩 is the only glyph whose
  // starting corpus wrote a component in a different order, and the simplified file already matched.
  assert.deepEqual(Object.keys(selection.overrides), ['曩'])
  const original = originals.find(e => e.glyph === '曩')!
  assert.equal(selection.overrides['曩'].startingCorpus, 'Ja')
  assert.equal(selection.overrides['曩'].corpus, 'Hans')
  assert.equal(original.corpus, 'Hans')
  assert.ok(original.matchingCandidates.includes('Ja'))
  assert.equal(published('曩').geometrySource, SPECIAL_BATCH3_DICTIONARY_GEOMETRY.Hans.sha256)
  // Only its opening dot still differed, so the published order is the licensed order throughout.
  assert.ok(published('曩').sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('the three reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['糺', '覊', '儻'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 糸 writes the centre vertical before the left dot; 里 writes its inner bar before the vertical.
  assert.deepEqual(published('糺').sourceStrokeIndices.slice(3, 5), [5, 4])
  assert.deepEqual(published('儻').sourceStrokeIndices.slice(15, 17), [17, 16])
  // 革 rotates three: both bars come before the long vertical.
  assert.deepEqual(published('覊').sourceStrokeIndices.slice(17, 20), [19, 20, 18])
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke), ['曩5', '甯1'])
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
    // Both are opening dots straightened to the observed vertical: two points, one x.
    const points = [...edit.path.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
    assert.equal(points.length, 2)
    assert.equal(points[0][0], points[1][0])
  }
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], original.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH3_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch3DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch3DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch3DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch3DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch3DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch3DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.slice(1)), /published bundle/)
})
