import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES, SPECIAL_BATCH13_DICTIONARY_GEOMETRY, loadSpecialBatch13DictionaryBundle } from './hanja-stroke-dictionary-special-batch13.ts'
import { buildSpecialBatch13DictionaryBundle, SPECIAL_BATCH13_DICTIONARY_PROOF_PINS, validateSpecialBatch13DictionaryProofs, validateSpecialBatch13DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch13.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE, TRADITIONAL_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch13-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: Corpus; matchingCandidates: Corpus[]; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; permutation?: number[]
    notes: string; checks: Record<string, string>; correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; reason: string }[] }
const selection = JSON.parse(read(dir + 'selection.json')) as { overrides: Record<string, unknown> }
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.find(e => e.glyph === glyph)!

test('forty-eight special grade forms reproduce 618 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch13DictionaryBundle()
  assert.equal(observations.entries.length, 50)
  assert.equal(approved.length, 48)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.reduce((n, e) => n + e.paths.length, 0), 618)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(SPECIAL_BATCH13_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH13_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH13_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH13_DICTIONARY_GEOMETRY.Hant.sha256, TRADITIONAL_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH13_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES,
    candidates('Ja'), candidates('MM'), candidates('Hant'), candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES,
    candidates('MM'), candidates('Ja'), candidates('Hant'), candidates('Hans')), /geometry mismatch/)
})

test('two glyphs are held for a 戸 against 戶 form difference and stay out of the runtime', () => {
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['褊', '諞'])
  for (const record of held) {
    // A held glyph is recorded as a form mismatch, carries its reason, and has no published geometry.
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.equal(record.initialDecision, 'held')
    assert.ok(record.issues!.length)
    assert.match(record.notes, /戸|戶/)
    assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.find(e => e.glyph === record.glyph), undefined)
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(hanjaStrokeData({ glyph: record.glyph, strokes: original.strokes }), null)
  }
  // Both carry 扁, and the dictionary opens it with a bar far wider than the licensed dot.
  for (const [glyph, stroke] of [['褊', 6], ['諞', 8]] as const) {
    const original = originals.find(e => e.glyph === glyph)!
    const width = (path: string) => {
      const xs = [...path.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => +m[1])
      return Math.max(...xs) - Math.min(...xs)
    }
    assert.ok(width(original.paths[stroke - 1]) < 25, glyph)
  }
})

test('no corpus override was needed: no alternative changed a flagged-stroke count', () => {
  assert.deepEqual(Object.keys(selection.overrides), [])
  for (const original of approved)
    assert.equal(published(original.glyph).geometrySource, SPECIAL_BATCH13_DICTIONARY_GEOMETRY[original.corpus].sha256, original.glyph)
})

test('the five reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['苹', '觱', '嘏', '醢', '莧'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 艹 writes each 十 bar first, 角 its inner vertical between the bars, and 𥁄 its sweep before the bar.
  for (const [glyph, n] of [['苹', 1], ['莧', 1], ['莧', 3], ['觱', 1], ['觱', 15], ['醢', 8]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 苹 swaps only the left 十: the right one already follows the dictionary.
  assert.deepEqual(published('苹').sourceStrokeIndices.slice(2, 4), [3, 4])
  // 叚 rotates three: its long left vertical opens the component.
  assert.deepEqual(published('嘏').sourceStrokeIndices.slice(5, 8), [8, 6, 7])
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke),
    ['苹6', '苹7', '瀌4', '翯2', '翯3', '翯5', '翯6', '翯7', '徯5', '徯7'])
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
  // Every straightened opening dot is a two-point segment on one x, spanning the licensed run.
  for (const [glyph, stroke] of [['瀌', 4], ['翯', 7]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const pts = points(edit.path), source = points(original)
    assert.equal(pts.length, 2)
    assert.equal(pts[0][0], pts[1][0])
    assert.deepEqual([pts[0][1], pts[1][1]], [source[0][1], source.at(-1)![1]])
    assert.match(edit.reason, /^Straighten /)
  }
  // Every reversed stroke keeps its licensed points and only runs the other way.
  for (const [glyph, stroke] of [['翯', 3], ['翯', 6]] as const) {
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
  for (const [glyph, stroke] of [['苹', 6], ['苹', 7], ['翯', 2], ['翯', 5], ['徯', 5], ['徯', 7]] as const) {
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
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES) {
    const source = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], source.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH13_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch13DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch13DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch13DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch13DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch13DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch13DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.slice(1)), /published bundle/)
})
