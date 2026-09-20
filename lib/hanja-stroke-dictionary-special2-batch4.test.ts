import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES, SPECIAL2_BATCH4_DICTIONARY_GEOMETRY, loadSpecial2Batch4DictionaryBundle } from './hanja-stroke-dictionary-special2-batch4.ts'
import { buildSpecial2Batch4DictionaryBundle, SPECIAL2_BATCH4_DICTIONARY_PROOF_PINS, validateSpecial2Batch4DictionaryProofs, validateSpecial2Batch4DictionaryBundle } from '../scripts/hanja-stroke-dictionary-special2-batch4.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-special2-batch4-2026-09-18/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-eight approved reviews reproduce 745 playable strokes with actual corpus provenance', () => {
  validateSpecial2Batch4DictionaryBundle()
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.reduce((n, e) => n + e.paths.length, 0), 745)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['遯', '逗', '螂', '瑯', '櫚', '轢', '輅'])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, SPECIAL2_BATCH4_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '특급II' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('the 賣 family stays out of the runtime while the licensed corpora lack its dictionary form', () => {
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['牘', '竇'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(record.issues?.length)
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.ok(!HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.some(e => e.glyph === record.glyph))
    // A later batch may publish the glyph from a corpus that does share the dictionary form;
    // what must never reach the runtime is the original this batch held.
    const runtimeEntry = hanjaStrokeData(original)
    assert.ok(runtimeEntry === null || JSON.stringify(runtimeEntry.paths) !== JSON.stringify(original.paths))
  }
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['潼', '螂', '琅', '瑯', '粮', '驢', '蠣', '聆', '翎', '廖'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // Simple swaps: 里's 土 bar first, the 王 radical's bars before its vertical, 馬's left vertical first, 艹 pairs bar-then-vertical.
  for (const [glyph, n] of [['潼', 13], ['瑯', 2], ['驢', 1], ['蠣', 9], ['蠣', 11]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n])
  // 耳 closes with its long right vertical.
  assert.deepEqual(published('聆').sourceStrokeIndices.slice(0, 6), [1, 2, 4, 5, 6, 3])
  for (const glyph of ['暾', '嵐', '纜', '徠', '褸'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // Vertical descending dots: 良 in 螂, 广 in 廖.
  for (const [glyph, n] of [['螂', 7], ['廖', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p.every(point => point[0] === p[0][0]))
    assert.ok(p.at(-1)![1] > p[0][1])
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  // Descending-left strokes: 良's dot in 琅 and 粮, and both interior pairs of 羽 in 翎 and 廖.
  for (const [glyph, n] of [['琅', 5], ['粮', 7], ['翎', 7], ['翎', 8], ['翎', 10], ['翎', 11],
    ['廖', 5], ['廖', 6], ['廖', 8], ['廖', 9]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  assert.equal(HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 12)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(SPECIAL2_BATCH4_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateSpecial2Batch4DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildSpecial2Batch4DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadSpecial2Batch4DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildSpecial2Batch4DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadSpecial2Batch4DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateSpecial2Batch4DictionaryBundle(HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.slice(1)), /published bundle/)
})
