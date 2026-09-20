import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH15_STROKES, G1_BATCH15_DICTIONARY_GEOMETRY, loadG1Batch15DictionaryBundle } from './hanja-stroke-dictionary-g1-batch15.ts'
import { buildG1Batch15DictionaryBundle, G1_BATCH15_DICTIONARY_PROOF_PINS, validateG1Batch15DictionaryProofs, validateG1Batch15DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch15.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch15-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH15_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-nine approved grade 1 reviews reproduce 666 playable strokes with actual corpus provenance; the held form stays out', () => {
  validateG1Batch15DictionaryBundle()
  assert.equal(approved.length, 49)
  assert.equal(HANJA_DICTIONARY_G1_BATCH15_STROKES.length, 49)
  assert.equal(HANJA_DICTIONARY_G1_BATCH15_STROKES.reduce((n, e) => n + e.paths.length, 0), 666)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['迹', '塡', '顚', '挺', '穽', '阻'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 睛 is held: the dictionary closes 靑 with 円 where the pinned MM original draws 月; 靖 closes with 月 on both sides.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['睛'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH15_STROKES.some(e => e.glyph === record.glyph))
    // A later batch may publish the glyph from a corpus that does share the dictionary form;
    // what must never reach the runtime is the original this batch held.
    const heldOriginal = originals.find(e => e.glyph === record.glyph)!
    const runtimeEntry = hanjaStrokeData(heldOriginal)
    assert.ok(runtimeEntry === null || JSON.stringify(runtimeEntry.paths) !== JSON.stringify(heldOriginal.paths))
  }
  assert.ok(HANJA_DICTIONARY_G1_BATCH15_STROKES.some(e => e.glyph === '靖'))
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH15_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH15_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 49)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH15_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['纏', '廛', '癲', '奠', '截', '肇'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 里 writes the bar below 日 before its long vertical; 眞 writes the 匕 tick before its 乚.
  for (const [glyph, n] of [['纏', 14], ['廛', 8], ['癲', 6]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  for (const glyph of ['謫', '狄', '迹', '塡', '箋', '顫', '顚', '銓', '輾', '栓', '箭', '煎', '澱', '剪', '氈', '悛', '篆', '霑', '粘', '錠', '挺', '町', '碇', '穽', '釘', '靖', '幀', '酊', '啼', '梯', '悌', '蹄', '詔', '躁', '阻', '凋', '嘲', '曹', '棗', '粗', '槽', '繰', '糟'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 酋 dot of 奠, the 隹 tick of 截 and the 戶 opening of 肇 descend to the lower left; the right 酋 dot of 奠 descends to the lower right.
  for (const [glyph, n] of [['奠', 1], ['截', 6], ['肇', 1]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const right = points('奠', 2)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(published('奠').sourceStrokeIndices[1], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH15_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 4)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH15_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch15DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch15DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch15DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch15DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch15DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch15DictionaryBundle(HANJA_DICTIONARY_G1_BATCH15_STROKES.slice(1)), /published bundle/)
})
