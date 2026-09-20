import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES, SPECIAL_BATCH7_DICTIONARY_GEOMETRY, loadSpecialBatch7DictionaryBundle } from './hanja-stroke-dictionary-special-batch7.ts'
import { buildSpecialBatch7DictionaryBundle, SPECIAL_BATCH7_DICTIONARY_PROOF_PINS, validateSpecialBatch7DictionaryProofs, validateSpecialBatch7DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special-batch7.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

type Corpus = 'MM' | 'Ja' | 'Ko' | 'Hant' | 'Hans'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special-batch7-2026-09-20/'
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
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.find(e => e.glyph === glyph)!

test('fifty special grade forms reproduce 658 playable strokes with actual corpus provenance', () => {
  validateSpecialBatch7DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.reduce((n, e) => n + e.paths.length, 0), 658)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  assert.equal(SPECIAL_BATCH7_DICTIONARY_GEOMETRY.Ja.sha256, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH7_DICTIONARY_GEOMETRY.MM.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(SPECIAL_BATCH7_DICTIONARY_GEOMETRY.Hans.sha256, SIMPLIFIED_CANDIDATE_SOURCE.sha256)
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL_BATCH7_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: Corpus) => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES,
    candidates('Ja'), candidates('MM'), [], candidates('Hans'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES,
    candidates('MM'), candidates('Ja'), [], candidates('Hans')), /geometry mismatch/)
})

test('four corpus overrides, all of them starting from the Japanese file', () => {
  assert.deepEqual(Object.keys(selection.overrides).sort(), ['挈', '售', '偲', '漾'].sort())
  for (const [glyph, override] of Object.entries(selection.overrides)) {
    const original = originals.find(e => e.glyph === glyph)!
    assert.equal(original.corpus, override.corpus, glyph)
    assert.equal(override.startingCorpus, 'Ja', glyph)
    assert.ok(original.matchingCandidates.includes('Ja'), glyph)
    assert.ok(override.reason.length > 40, glyph)
    assert.equal(published(glyph).geometrySource, SPECIAL_BATCH7_DICTIONARY_GEOMETRY[override.corpus].sha256, glyph)
  }
  // 挈, 偲 and 漾 came out clean; 售 kept one flagged tick and took an authored path instead.
  for (const glyph of ['挈', '偲', '漾'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === i + 1), glyph)
  assert.ok(published('售').sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('the eight reordered forms cannot regress to their licensed original', () => {
  const reordered = observations.entries.filter(e => e.permutation)
  assert.deepEqual(reordered.map(e => e.glyph), ['絏', '蠨', '觫', '瑣', '繻', '贐', '黯', '藹'])
  for (const record of reordered) {
    const original = originals.find(e => e.glyph === record.glyph)!
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
    assert.deepEqual(published(record.glyph).sourceStrokeIndices, record.permutation)
  }
  // All but 蠨 are neighbouring pairs: 糸 writes its centre vertical before the left dot,
  // 艹 each 十 bar first, 角 its inner vertical between the bars, 王 its second bar before
  // the vertical, 聿 its centre vertical before the bar, and 黑 the inner bar of 里.
  for (const [glyph, n] of [['絏', 4], ['觫', 6], ['瑣', 2], ['繻', 4], ['贐', 11], ['黯', 6],
    ['藹', 1], ['藹', 3]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 蠨 moves thirteen positions: both 十 of 艹, and inside 肅 the two long verticals the
  // licensed file draws early but the dictionary leaves until the end.
  assert.deepEqual(published('蠨').sourceStrokeIndices,
    [1, 2, 3, 4, 5, 6, 8, 7, 10, 9, 11, 12, 13, 15, 17, 18, 20, 21, 19, 23, 22, 16, 14])
  assert.deepEqual([...published('蠨').sourceStrokeIndices].sort((a, b) => a! - b!),
    Array.from({ length: 23 }, (_, i) => i + 1))
})

test('every authored path stays inside its licensed stroke and is reviewed', () => {
  const authored = HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.flatMap(e =>
    e.sourceStrokeIndices.map((index, i) => ({ glyph: e.glyph, stroke: i + 1, index }))).filter(e => e.index === null)
  assert.deepEqual(authored.map(e => e.glyph + e.stroke),
    ['蟀7', '售3', '濉11', '肫5', '熠6', '熠7', '熠9', '熠10'])
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
  // The reversed strokes keep every licensed point and only run the other way.
  for (const [glyph, stroke] of [['肫', 5], ['熠', 7], ['熠', 10]] as const) {
    const original = originals.find(e => e.glyph === glyph)!.paths[stroke - 1]
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === stroke)!
    const numbers = (path: string) => path.match(/[-\d.]+/g)!.map(Number)
    const before = numbers(original), after = numbers(edit.path)
    assert.equal(before.length, after.length)
    for (let i = 0; i < before.length; i += 2)
      assert.deepEqual([after[i], after[i + 1]], [before[before.length - 2 - i], before[before.length - 1 - i]])
    assert.match(edit.reason, /^Reverse /)
  }
  // 蟀's opening dot is straightened to the observed vertical: two points, one x.
  const dot = corrections.edits.find(e => e.glyph === '蟀')!
  const points = [...dot.path.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
  assert.equal(points.length, 2)
  assert.equal(points[0][0], points[1][0])
  // Every other published stroke is a licensed original, untouched.
  for (const entry of HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    for (const [i, index] of entry.sourceStrokeIndices.entries())
      if (index !== null) assert.equal(entry.paths[i], original.paths[index - 1])
  }
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL_BATCH7_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecialBatch7DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecialBatch7DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecialBatch7DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecialBatch7DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecialBatch7DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecialBatch7DictionaryBundle(HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.slice(1)), /published bundle/)
})
