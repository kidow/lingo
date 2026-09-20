import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH16_STROKES, G1_BATCH16_DICTIONARY_GEOMETRY, loadG1Batch16DictionaryBundle } from './hanja-stroke-dictionary-g1-batch16.ts'
import { buildG1Batch16DictionaryBundle, G1_BATCH16_DICTIONARY_PROOF_PINS, validateG1Batch16DictionaryProofs, validateG1Batch16DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch16.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch16-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH16_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('forty-eight approved grade 1 reviews reproduce 612 playable strokes with actual corpus provenance; the held forms stay out', () => {
  validateG1Batch16DictionaryBundle()
  assert.equal(approved.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH16_STROKES.length, 48)
  assert.equal(HANJA_DICTIONARY_G1_BATCH16_STROKES.reduce((n, e) => n + e.paths.length, 0), 612)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['輳', '呪', '紬', '櫛', '嗟', '蹉', '搾'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  // 嗔 and 朕 are held: the dictionary writes 眞 with a 匕 top and the left 月 of 朕 with two dots where MM draws 真 with 十 and two bars.
  const held = observations.entries.filter(e => e.decision === 'held')
  assert.deepEqual(held.map(e => e.glyph), ['嗔', '朕'])
  for (const record of held) {
    assert.equal(record.checks.glyphForm, 'mismatch')
    assert.ok(!HANJA_DICTIONARY_G1_BATCH16_STROKES.some(e => e.glyph === record.glyph))
    assert.equal(hanjaStrokeData(originals.find(e => e.glyph === record.glyph)!), null)
  }
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH16_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH16_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 48)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH16_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['踵', '腫', '紬', '樽', '櫛', '嗟', '蹉'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 重 writes the bar below 日 before its long vertical; 由 writes the inner bar before the inner vertical; 𦍌 writes its short bar before the vertical.
  for (const [glyph, n] of [['踵', 14], ['腫', 11], ['紬', 9], ['嗟', 7], ['蹉', 11]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  // 皀 folds and writes its inner bars before the long left vertical, as 飠 does.
  assert.deepEqual(published('櫛').sourceStrokeIndices.slice(11, 15), [13, 14, 15, 12])
  for (const glyph of ['稠', '漕', '爪', '眺', '簇', '猝', '慫', '踪', '挫', '躊', '輳', '誅', '做', '胄', '呪', '嗾', '廚', '紂', '註', '竣', '蠢', '汁', '咫', '摯', '枳', '肢', '疹', '帙', '桎', '膣', '叱', '跌', '嫉', '斟', '澄', '叉', '搾', '窄', '鑿', '撰', '纂'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The left 尊 dot of 樽 descends to the lower left; the right one descends to the lower right.
  const left = points('樽', 5)
  assert.ok(left[0][0] > left.at(-1)![0] && left[0][1] < left.at(-1)![1])
  assert.equal(published('樽').sourceStrokeIndices[4], null)
  const right = points('樽', 6)
  assert.ok(right[0][0] < right.at(-1)![0] && right[0][1] < right.at(-1)![1])
  assert.equal(published('樽').sourceStrokeIndices[5], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH16_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 2)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH16_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch16DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch16DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch16DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch16DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch16DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch16DictionaryBundle(HANJA_DICTIONARY_G1_BATCH16_STROKES.slice(1)), /published bundle/)
})
