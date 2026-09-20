import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH6_STROKES, G1_BATCH6_DICTIONARY_GEOMETRY, loadG1Batch6DictionaryBundle } from './hanja-stroke-dictionary-g1-batch6.ts'
import { buildG1Batch6DictionaryBundle, G1_BATCH6_DICTIONARY_PROOF_PINS, validateG1Batch6DictionaryProofs, validateG1Batch6DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch6.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch6-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH6_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-nine approved grade 1 reviews reproduce 710 playable strokes with actual corpus provenance; the held form stays out', () => {
  validateG1Batch6DictionaryBundle()
  assert.equal(approved.length, 49)
  assert.equal(HANJA_DICTIONARY_G1_BATCH6_STROKES.length, 49)
  assert.equal(HANJA_DICTIONARY_G1_BATCH6_STROKES.reduce((n, e) => n + e.paths.length, 0), 710)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['陋', '綾', '籬', '饅', '卍'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 碌 is held: the dictionary writes the first stroke of 彑 as a vertical that turns right where the pinned candidate writes a bar that turns down.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['碌'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH6_STROKES.some(e => e.glyph === record.glyph))
    // A later batch may publish the glyph from a corpus that does share the dictionary form;
    // what must never reach the runtime is the original this batch held.
    const heldOriginal = originals.find(e => e.glyph === record.glyph)!
    const runtimeEntry = hanjaStrokeData(heldOriginal)
    assert.ok(runtimeEntry === null || JSON.stringify(runtimeEntry.paths) !== JSON.stringify(heldOriginal.paths))
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH6_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH6_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 49)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH6_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['撈', '壟', '聾', '聊', '寥', '戮', '籬', '釐', '俚', '裡', '罹', '躪', '饅', '卍', '彎'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 里 writes its middle bar before the long vertical; 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['釐', 16], ['俚', 7], ['裡', 10], ['躪', 8], ['躪', 10]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 耳 writes its inner bars and the long bottom bar before the right vertical; 隹 its bars before the inner vertical;
  // 食 its fold and inner bars before the long left vertical; 卍 follows the dictionary's own five-stroke sequence.
  assert.deepEqual(published('聾').sourceStrokeIndices.slice(18, 22), [20, 21, 22, 19])
  assert.deepEqual(published('聊').sourceStrokeIndices.slice(2, 6), [4, 5, 6, 3])
  assert.deepEqual(published('籬').sourceStrokeIndices.slice(20, 24), [21, 23, 24, 22])
  assert.deepEqual(published('饅').sourceStrokeIndices.slice(3, 7), [5, 6, 7, 4])
  assert.deepEqual(published('卍').sourceStrokeIndices, [1, 3, 6, 5, 2, 4])
  for (const glyph of ['鈴', '虜', '麓', '陋', '綾', '鱗', '鰻', '輓'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Descending to the lower left: the left 火 dot of 撈, every 羽 interior of 寥 and 戮, the 隹 ticks of 籬, 罹 and 躪, and the 糸 dot of 彎.
  for (const [glyph, n] of [['撈', 4], ['寥', 5], ['寥', 6], ['寥', 8], ['寥', 9], ['戮', 2], ['戮', 3], ['戮', 5], ['戮', 6],
    ['籬', 20], ['罹', 11], ['躪', 22], ['彎', 18]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // The 立 dot of 壟 and the 宀 dot of 寥 are vertical.
  for (const [glyph, n] of [['壟', 1], ['寥', 1]] as const) {
    const dot = points(glyph, n)
    assert.ok(dot.every(([x]) => x === dot[0][0]) && dot[0][1] < dot.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_G1_BATCH6_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 15)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH6_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch6DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch6DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch6DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch6DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch6DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch6DictionaryBundle(HANJA_DICTIONARY_G1_BATCH6_STROKES.slice(1)), /published bundle/)
})
