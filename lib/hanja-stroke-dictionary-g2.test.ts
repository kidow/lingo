import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_STROKES, G2_DICTIONARY_GEOMETRY, loadG2DictionaryBundle } from './hanja-stroke-dictionary-g2.ts'
import { HANJA_DICTIONARY_G2_FOLLOWUP_STROKES } from './hanja-stroke-dictionary-g2-followup.ts'
import { g2DictionaryGeometry } from '../scripts/hanja-stroke-dictionary-g2.ts'
import { buildG2DictionaryBundle, G2_DICTIONARY_PROOF_PINS, validateG2DictionaryProofs, validateG2DictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-batch1-2026-09-15/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; corpus: 'MM' | 'Ja'; medians: number[][][]; paths: string[] }[]
}).entries
const held = ['迦', '甄', '雇', '膠', '絞', '窟']
const published = (glyph: string) => HANJA_DICTIONARY_G2_STROKES.find(e => e.glyph === glyph)!

test('the original 44-review batch excludes its held forms; separate followup approval is required', () => {
  assert.equal(HANJA_DICTIONARY_G2_STROKES.length, 44)
  assert.equal(HANJA_DICTIONARY_G2_STROKES.reduce((n, e) => n + e.paths.length, 0), 506)
  assert.deepEqual(loadG2DictionaryBundle(buildG2DictionaryBundle()), HANJA_DICTIONARY_G2_STROKES)
  validateG2DictionaryBundle()
  for (const original of originals) {
    const actual = hanjaStrokeData(original)
    if (held.includes(original.glyph)) {
      assert.equal(HANJA_DICTIONARY_G2_STROKES.find(e => e.glyph === original.glyph), undefined)
      assert.deepEqual(actual, HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.find(e => e.glyph === original.glyph))
      assert.throws(() => g2DictionaryGeometry(original.glyph, original.medians), /mismatch/)
    } else {
      assert.deepEqual(actual, published(original.glyph))
      assert.equal(HANJA_STROKES.filter(e => e.glyph === original.glyph).length, 1)
      assert.equal(hanjaStrokeData({ glyph: original.glyph, strokes: original.strokes + 1 }), null)
    }
  }
})

test('both licensed corpora reach the shared audit without being relabeled official', () => {
  const accepted = originals.filter(e => !held.includes(e.glyph))
  const candidates = (corpus: 'MM' | 'Ja') => accepted.filter(e => e.corpus === corpus)
    .map(e => ({ character: e.glyph, medians: e.medians, strokes: e.paths }))
  const catalog = accepted.map(e => ({ glyph: e.glyph, strokes: e.strokes, readingGrade: '2급' }))
  const audit = auditStrokes(catalog, [], HANJA_DICTIONARY_G2_STROKES, candidates('Ja'), candidates('MM'))
  assert.equal(audit.verificationSources.dictionary, 44)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 44)
  assert.throws(() => auditStrokes(catalog, [], HANJA_DICTIONARY_G2_STROKES, candidates('MM'), candidates('Ja')), /geometry mismatch/)
  const wrong = structuredClone(buildG2DictionaryBundle())
  wrong.characters[0].geometrySource = G2_DICTIONARY_GEOMETRY.Ja.sha256
  assert.throws(() => loadG2DictionaryBundle(wrong), /entry mismatch/)
  const original = originals[0]
  const changed = structuredClone(original.medians)
  changed[0][0][0]++
  assert.throws(() => dictionaryGeometry(original.glyph, changed), /original mismatch/)
})

test('reviewed reorderings and corrected directions cannot revert to candidate defaults', () => {
  for (const glyph of ['憾', '坑', '炅', '傀', '槐', '購', '掘', '圈', '珪']) {
    const reverted = structuredClone(published(glyph))
    reverted.paths = originals.find(e => e.glyph === glyph)!.paths
    assert.throws(() => validateDictionaryReview(reverted, reverted.paths.length), /published entry/)
  }
  const dot = [...published('坑').paths[3].matchAll(/[ML]([-\.\d]+) ([-\.\d]+)/g)]
    .map(m => [+m[1], +m[2]])
  assert.equal(dot[0][0], dot.at(-1)![0])
  assert.ok(dot.at(-1)![1] > dot[0][1])
  for (const [glyph, stroke, sign] of [['炅', 5, -1], ['圈', 3, -1], ['圈', 4, 1]] as const) {
    const points = [...published(glyph).paths[stroke - 1].matchAll(/[ML]([-\.\d]+) ([-\.\d]+)/g)]
      .map(m => [+m[1], +m[2]])
    assert.ok((points.at(-1)![0] - points[0][0]) * sign > 0)
    assert.ok(points.at(-1)![1] > points[0][1])
  }
})

test('proof edits, held substitutions and malformed runtime paths fail closed', () => {
  for (const file of Object.keys(G2_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2DictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const substitute = structuredClone(buildG2DictionaryBundle())
  substitute.characters[0].glyph = '迦'
  assert.throws(() => loadG2DictionaryBundle(substitute), /entry mismatch/)
  const malformed = structuredClone(buildG2DictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2DictionaryBundle(malformed), /entry mismatch/)
  const reversed = structuredClone(published('柯'))
  reversed.paths = [...reversed.paths].reverse()
  assert.throws(() => validateDictionaryReview(reversed, 9), /published entry/)
  const missing = HANJA_DICTIONARY_G2_STROKES.slice(1)
  assert.throws(() => validateG2DictionaryBundle(missing), /published bundle/)
})
