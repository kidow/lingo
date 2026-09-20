import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G1_BATCH19_STROKES, G1_BATCH19_DICTIONARY_GEOMETRY, loadG1Batch19DictionaryBundle } from './hanja-stroke-dictionary-g1-batch19.ts'
import { buildG1Batch19DictionaryBundle, G1_BATCH19_DICTIONARY_PROOF_PINS, validateG1Batch19DictionaryProofs, validateG1Batch19DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g1-batch19.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g1-batch19-2026-09-20/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja' | 'Ko'; medians: number[][][]; paths: string[] }[]
}).entries
const observations = JSON.parse(read(dir + 'observations.json')) as {
  entries: { glyph: string; decision: string; initialDecision: string; issues?: number[]; checks: Record<string, string>
    correctedReview?: { completed: boolean; reviewedStrokes: number } }[]
}
const approved = originals.filter(e => observations.entries.find(o => o.glyph === e.glyph)!.decision === 'matched')
const published = (glyph: string) => HANJA_DICTIONARY_G1_BATCH19_STROKES.find(e => e.glyph === glyph)!
const points = (glyph: string, n: number) => [...published(glyph).paths[n - 1].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('fifty approved grade 1 reviews reproduce 599 playable strokes with actual corpus provenance', () => {
  validateG1Batch19DictionaryBundle()
  assert.equal(approved.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH19_STROKES.length, 50)
  assert.equal(HANJA_DICTIONARY_G1_BATCH19_STROKES.reduce((n, e) => n + e.paths.length, 0), 599)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  assert.deepEqual(approved.filter(e => e.corpus === 'Ja').map(e => e.glyph), ['褪', '腿', '妬', '陛', '逋', '慓'])
  assert.deepEqual(approved.filter(e => e.corpus === 'Ko').map(e => e.glyph), [])
  assert.deepEqual(observations.entries.filter(e => e.decision === 'held'), [])
  for (const original of approved) {
    const entry = published(original.glyph)
    assert.equal(entry.geometrySource, G1_BATCH19_DICTIONARY_GEOMETRY[original.corpus].sha256)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, entry.paths)
    assert.deepEqual(hanjaStrokeData(original), entry)
    assert.equal(hanjaStrokeData({ ...original, strokes: original.strokes + 1 }), null)
    validateDictionaryReview(entry, original.strokes)
  }
  const candidates = (corpus: 'MM' | 'Ja' | 'Ko') => approved.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = approved.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '1급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH19_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 50)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G1_BATCH19_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
})

test('corrected forms cannot regress to their original foreign-corpus geometry', () => {
  const corrected = observations.entries.filter(e => e.decision === 'matched' && e.initialDecision !== 'matched')
  assert.deepEqual(corrected.map(e => e.glyph), ['慟', '堆', '套', '跛', '婆', '騙', '稟', '披'])
  for (const record of corrected) {
    const original = originals.find(e => e.glyph === record.glyph)!
    assert.equal(record.correctedReview?.completed, true)
    assert.equal(record.correctedReview.reviewedStrokes, original.strokes)
    const reverted = structuredClone(published(record.glyph))
    reverted.paths = original.paths
    assert.throws(() => validateDictionaryReview(reverted, original.strokes), /published entry/)
  }
  // 皮 writes its long left sweep before the top fold; 長 and 馬 write the long left vertical before the top bar; 重 writes the lower bar before the long centre vertical.
  for (const [glyph, n] of [['跛', 8], ['婆', 4], ['披', 4], ['套', 4], ['騙', 1], ['慟', 10]] as const)
    assert.deepEqual(published(glyph).sourceStrokeIndices.slice(n - 1, n + 1), [n + 1, n], glyph + n)
  for (const glyph of ['跆', '汰', '撐', '桶', '筒', '頹', '褪', '腿', '妬', '巴', '爬', '琶', '辦', '沛', '牌', '悖', '唄', '佩', '稗', '膨', '澎', '愎', '鞭', '陛', '疱', '庖', '逋', '褒', '袍', '匍', '脯', '泡', '圃', '哺', '咆', '曝', '瀑', '豹', '慓', '飄', '剽', '諷'])
    assert.ok(published(glyph).sourceStrokeIndices.every((index, i) => index === null || index === i + 1))
})

test('source-specific direction corrections remain distinct', () => {
  // The 隹 tick and the opening stroke of 戶 descend to the lower left; the 亠 dot is the vertical mark the dictionary writes.
  for (const [glyph, n] of [['堆', 6], ['騙', 11]] as const) {
    const p = points(glyph, n)
    assert.ok(p[0][0] > p.at(-1)![0] && p[0][1] < p.at(-1)![1], glyph + n)
    assert.equal(published(glyph).sourceStrokeIndices[n - 1], null)
  }
  const dot = points('稟', 1)
  assert.equal(dot[0][0], dot.at(-1)![0])
  assert.ok(dot[0][1] < dot.at(-1)![1])
  assert.equal(published('稟').sourceStrokeIndices[0], null)
  assert.equal(HANJA_DICTIONARY_G1_BATCH19_STROKES.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length, 3)
})

test('changed proof bytes, source identity and incomplete or malformed bundles fail closed', () => {
  for (const file of Object.keys(G1_BATCH19_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG1Batch19DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const malformed = structuredClone(buildG1Batch19DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG1Batch19DictionaryBundle(malformed), /entry mismatch/)
  const relabeled = structuredClone(buildG1Batch19DictionaryBundle())
  relabeled.characters[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1Batch19DictionaryBundle(relabeled), /entry mismatch/)
  assert.throws(() => validateG1Batch19DictionaryBundle(HANJA_DICTIONARY_G1_BATCH19_STROKES.slice(1)), /published bundle/)
})
