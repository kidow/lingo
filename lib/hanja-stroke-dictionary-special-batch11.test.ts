import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES, SPECIAL_BATCH11_DICTIONARY_GEOMETRY, loadSpecialBatch11DictionaryBundle } from './hanja-stroke-dictionary-special-batch11.ts'
import { buildSpecialBatch11DictionaryBundle, SPECIAL_BATCH11_DICTIONARY_PROOF_PINS, validateSpecialBatch11DictionaryProofs, validateSpecialBatch11DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch11.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch11-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: Corpus; matchingCandidates: Corpus[]; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; permutation?: number[]
    notes: string; checks: Record<string, string>; correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; reason: string }[] }
const selection = JSON.parse(read(dir + 'selection.json')) as { overrides: Record<string, { corpus: Corpus; startingCorpus: Corpus; reason: string }> }
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 716 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch11DictionaryBundle()
  assert.equal(observations.entries.length, 50)
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.reduce((n, e) => n + e.paths.length, 0), 716)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(SPECIAL_BATCH11_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH11_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH11_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH11_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES,
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

test('four corpus overrides, all of them starting from the Japanese file', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['蜩', '搶', '鬻', '隼'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.ok(original.matchingCandidates.includes(override.startingCorpus), glyph)
    assert.notEqual(override.startingCorpus, override.corpus, glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH11_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
  }
  assert.equal(Object.values(selection.overrides).filter(o => o.startingCorpus === 'Ja').length, 4)
  assert.equal(selection.overrides['隼'].corpus, 'Hans')
  // 蜩 and 搶 came out clean; 鬻 and 隼 kept one authored stroke each side of the swap.
  for (const glyph of ['蜩', '搶'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1), glyph)
})

test('the eight reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['鱒', '鬒', '瑱', '瑳', '鬯', '簀', '慼', '倩'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 魚 writes the inner bar of 田 first, 長 its left vertical first, 眞 the mark of 匕 first,
  // 王 its second bar before the vertical, and 責·靑 the bar of 龶 before the vertical.
  for (const [glyph, n] of [['鱒', 5], ['鬒', 1], ['鬒', 11], ['瑱', 5], ['瑳', 2], ['瑳', 8], ['簀', 8], ['慼', 1], ['倩', 4]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 鬯 rotates three interior dots, a difference only the endpoint assignment check found.
  assert.deepEqual(published('鬯').sourceStrokeIndices.slice(3, 6), [6, 4, 5])
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke), ['竈1', '鬻19', '鬻20', '隼3', '窗1'])
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
  // Every straightened opening dot of 穴 is a two-point segment on one x, spanning the licensed run.
  for (const [glyph, stroke] of [['竈', 1], ['窗', 1]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const pts = points(edit.path), source = points(original)
    assert.equal(pts.length, 2)
    assert.equal(pts[0][0], pts[1][0])
    assert.deepEqual([pts[0][1], pts[1][1]], [source[0][1], source.at(-1)![1]])
    assert.match(edit.reason, /^Straighten /)
  }
  // Every reflected stroke keeps its licensed points mirrored about its own horizontal centre.
  for (const [glyph, stroke] of [['鬻', 19], ['鬻', 20], ['隼', 3]] as const) {
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
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES) {
    const source = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], source.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH11_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch11DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch11DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch11DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch11DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch11DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch11DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.slice(1)), /published bundle/)
})
