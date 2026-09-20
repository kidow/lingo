import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES, SPECIAL_BATCH14_DICTIONARY_GEOMETRY, loadSpecialBatch14DictionaryBundle } from './hanja-stroke-dictionary-special-batch14.ts'
import { buildSpecialBatch14DictionaryBundle, SPECIAL_BATCH14_DICTIONARY_PROOF_PINS, validateSpecialBatch14DictionaryProofs, validateSpecialBatch14DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch14.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch14-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: Corpus; matchingCandidates: Corpus[]; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; permutation?: number[]
    notes: string; checks: Record<string, string>; correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; reason: string }[] }
const selection = JSON.parse(read(dir + 'selection.json')) as { overrides: Record<string, { corpus: Corpus; startingCorpus: Corpus; reason: string }>; note: string }
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.find(e => e.glyph === glyph)!

test('thirty special grade forms reproduce 389 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch14DictionaryBundle()
  assert.equal(observations.entries.length, 30)
  assert.equal(approved.length, 30)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.length, 30)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.reduce((n, e) => n + e.paths.length, 0), 389)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(SPECIAL_BATCH14_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH14_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH14_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH14_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 30)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES,
    candidates('MM'), candidates('Ja'), [], candidates('Hans')), /geometry mismatch/)
})

test('no glyph is held: every form matched the dictionary once the flags were resolved', () => {
  assert.equal(observations.entries.filter(e => e.decision === 'held').length, 0)
  for (const record of observations.entries) {
    assert.equal(record.decision, 'matched')
    assert.equal(record.checks.glyphForm, 'match')
    assert.ok(record.notes.length > 10, record.glyph)
  }
})

test('two corpus overrides, both starting from the Japanese file and both for 隹', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['矍', '攜'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.ok(original.matchingCandidates.includes(override.startingCorpus), glyph)
    assert.notEqual(override.startingCorpus, override.corpus, glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH14_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
  }
  assert.equal(Object.values(selection.overrides).filter(o => o.startingCorpus === 'Ja').length, 2)
  // 睢 was left alone: both corpora leave exactly one stroke over the threshold.
  assert.match(selection.note, /睢/)
  assert.equal(originals.find(e => e.glyph === '睢')!.corpus, 'MM')
})

test('the three reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['薈', '殽', '豨'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 艹 writes each 十 bar first; 肴 and 希 write their long sweep before the bar.
  for (const [glyph, n] of [['薈', 1], ['薈', 3], ['殽', 3], ['豨', 10]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 豕 writes its lower-left leg before the short right one, two positions apart.
  assert.deepEqual(published('豨').sourceStrokeIndices.slice(4, 7), [7, 6, 5])
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke),
    ['矍13', '詡9', '詡10', '詡12', '詡13', '睢8', '攜9'])
  assert.deepEqual(corrections.edits.map(e => e.glyph + e.stroke), authored.map(e => e.glyph + e.stroke))
  const points = (path: string) => [...path.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
  const bounds = (path: string) => {
    const pts = points(path)
    return [Math.min(...pts.map(p => p[0])), Math.max(...pts.map(p => p[0])),
      Math.min(...pts.map(p => p[1])), Math.max(...pts.map(p => p[1]))]
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
  // Every reversed stroke keeps its licensed points and only runs the other way.
  for (const [glyph, stroke] of [['詡', 10], ['詡', 13]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const numbers = (path: string) => path.match(/[-\d.]+/g)!.map(Number)
    const before = numbers(original), after = numbers(edit.path)
    assert.equal(before.length, after.length)
    for (let i = 0; i < before.length; i += 2)
      assert.deepEqual([after[i], after[i + 1]], [before[before.length - 2 - i], before[before.length - 1 - i]])
    assert.match(edit.reason, /^Reverse /)
  }
  // Every reflected stroke keeps its licensed points mirrored about its own horizontal centre.
  for (const [glyph, stroke] of [['矍', 13], ['詡', 9], ['詡', 12], ['睢', 8], ['攜', 9]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const source = points(original), pts = points(edit.path)
    assert.equal(pts.length, source.length)
    const sum = Math.min(...source.map(p => p[0])) + Math.max(...source.map(p => p[0]))
    for (const [i, [x, y]] of pts.entries()) {
      assert.ok(Math.abs(x - (sum - source[i][0])) < 0.06, glyph + stroke + ' x' + i)
      assert.equal(y, source[i][1])
    }
    assert.match(edit.reason, /^Reflect /)
  }
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES) {
    const source = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], source.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH14_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch14DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch14DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch14DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch14DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch14DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch14DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.slice(1)), /published bundle/)
})
