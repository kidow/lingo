import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES, SPECIAL_BATCH9_DICTIONARY_GEOMETRY, loadSpecialBatch9DictionaryBundle } from './hanja-stroke-dictionary-special-batch9.ts'
import { buildSpecialBatch9DictionaryBundle, SPECIAL_BATCH9_DICTIONARY_PROOF_PINS, validateSpecialBatch9DictionaryProofs, validateSpecialBatch9DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch9.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch9-2026-09-20/'
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
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.find(e => e.glyph === glyph)!

test('forty-eight special grade forms reproduce 618 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch9DictionaryBundle()
  assert.equal(observations.entries.length, 50)
  assert.equal(approved.length, 48)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.reduce((n, e) => n + e.paths.length, 0), 618)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.equal(SPECIAL_BATCH9_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH9_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH9_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH9_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES,
    candidates('MM'), candidates('Ja'), [], candidates('Hans')), /geometry mismatch/)
})

test('two glyphs are held for a 戸 against 戶 form difference and stay out of the runtime', () => {
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['牖', '扆'])
  for (const record of held) {
    // A held glyph is recorded as a form mismatch, carries its reason, and has no published geometry.
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.equal(record.initialDecision, 'held')
    assert.ok(record.issues!.length)
    assert.match(record.notes, /戸|戶/)
    assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.find(e => e.glyph === record.glyph), undefined)
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(hanjaStrokeData({ glyph: record.glyph, strokes: original.strokes }), null)
  }
})

test('five corpus overrides, four of them starting from the Japanese file', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['喟', '鮪', '帷', '劓', '夤'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.ok(original.matchingCandidates.includes(override.startingCorpus), glyph)
    assert.notEqual(override.startingCorpus, override.corpus, glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH9_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
  }
  assert.equal(Object.values(selection.overrides).filter(o => o.startingCorpus === 'Ja').length, 4)
  assert.equal(selection.overrides['夤'].startingCorpus, 'MM')
  // 喟, 劓 and 夤 came out clean; 鮪 still needed a swap and 帷 an authored path.
  for (const glyph of ['喟', '劓', '夤'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1), glyph)
})

test('the four reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['濰', '黝', '鮪', '囿'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // 糸 writes its centre vertical before the left dot, 黑 the inner bar of 里, and 有 its
  // left sweep before the bar — the last one twice, inside 鮪 and inside 囿.
  for (const [glyph, n] of [['濰', 7], ['黝', 6], ['鮪', 12], ['囿', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke), ['耰1', '濰12', '帷6', '軔10'])
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
  // 耰's opening bar keeps every licensed point and only runs the other way.
  const original = originals.find(e => e.glyph === '耰')!.paths[0]
  const edit = corrections.edits.find(e => e.glyph === '耰')!
  const numbers = (path: string) => path.match(/[-\d.]+/g)!.map(Number)
  const before = numbers(original), after = numbers(edit.path)
  assert.equal(before.length, after.length)
  for (let i = 0; i < before.length; i += 2)
    assert.deepEqual([after[i], after[i + 1]], [before[before.length - 2 - i], before[before.length - 1 - i]])
  assert.match(edit.reason, /^Reverse /)
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES) {
    const source = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], source.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH9_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch9DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch9DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch9DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch9DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch9DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch9DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.slice(1)), /published bundle/)
})
