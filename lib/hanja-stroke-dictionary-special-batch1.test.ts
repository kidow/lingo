import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES, SPECIAL_BATCH1_DICTIONARY_GEOMETRY, loadSpecialBatch1DictionaryBundle } from './hanja-stroke-dictionary-special-batch1.ts'
import { buildSpecialBatch1DictionaryBundle, SPECIAL_BATCH1_DICTIONARY_PROOF_PINS, validateSpecialBatch1DictionaryProofs, validateSpecialBatch1DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch1.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, CANDIDATE_SOURCE, TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch1-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: Corpus; matchingCandidates: Corpus[]; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; permutation?: number[]
    checks: Record<string, string>; correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; reason: string }[] }
const selection = JSON.parse(read(dir + 'selection.json')) as { overrides: Record<string, { corpus: Corpus; startingCorpus: Corpus }> }
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 618 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch1DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.reduce((n, e) => n + e.paths.length, 0), 618)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  // The special grade is the first round to need all five pinned corpora at once: 冂 exists only in the
  // Korean file and 榦 only in the Taiwan one, and both carry the dictionary's stroke count.
  assert.equal(originals.find(e => e.glyph === '冂')!.corpus, 'Ko')
  assert.equal(originals.find(e => e.glyph === '榦')!.corpus, 'Hant')
  assert.equal(SPECIAL_BATCH1_DICTIONARY_GEOMETRY.Ko.sha256, CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH1_DICTIONARY_GEOMETRY.Hant.sha256, TRADITIONAL_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH1_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH1_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, candidates('Ko'), HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES,
    candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, candidates('Ko'), HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES,
    candidates('MM'), candidates('Ja'), candidates('Hant'), candidates('Hans')), /geometry mismatch/)
})

test('a corpus override is recorded, reasoned and reproduced in the published entry', () => {
  // 珈 started on the Japanese file, which writes the 王 vertical before its second bar; MM keeps the
  // dictionary order, so the override replaces the corpus instead of reordering the strokes.
  assert.deepEqual(Object.keys(selection.overrides), ['珈'])
  const original = originals.find(e => e.glyph === '珈')!
  assert.equal(selection.overrides['珈'].startingCorpus, 'Ja')
  assert.equal(selection.overrides['珈'].corpus, 'MM')
  assert.equal(original.corpus, 'MM')
  assert.ok(original.matchingCandidates.includes('Ja') && original.matchingCandidates.includes('MM'))
  assert.equal(published('珈').geometrySource, SPECIAL_BATCH1_DICTIONARY_GEOMETRY.MM.sha256)
  assert.ok(published('珈').sourceStrokeIndices.every((index, i) => index === i + 1))
})

test('the eleven reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['桷', '蕑', '减', '橿', '秬', '繳', '黥', '雞', '楛', '觚', '觳'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 艹 writes each 十 bar first; 田 and 里 write the inner bar before the inner vertical; 角 writes the
  // inner vertical between its two bars; 糸 writes the centre vertical before the left dot.
  for (const [glyph, n] of [['蕑', 1], ['蕑', 3], ['楛', 5], ['楛', 7], ['橿', 8], ['橿', 14],
    ['黥', 6], ['桷', 9], ['觚', 6], ['觳', 12], ['繳', 4], ['秬', 6], ['减', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 隹 rotates three: the dictionary writes both upper bars before the long vertical.
  assert.deepEqual(published('雞').sourceStrokeIndices.slice(14, 17), [16, 17, 15])
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke), ['蠲1', '蠲2', '煢1', '煢5', '雞13', '槀1', '稾1'])
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
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], original.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH1_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch1DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch1DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch1DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch1DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch1DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch1DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.slice(1)), /published bundle/)
})
