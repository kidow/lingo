import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import {
  HANJA_NUMBERED_SOURCE, HANJA_NUMBERED_STROKES, NUMBERED_REFERENCES, loadNumberedBundle,
  type HanjaNumberedStrokeData, type NumberedBundle,
} from './hanja-stroke-numbered.ts'
import { hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'
import { buildNumberedBundle, numberedGeometry, validateNumberedBundle, validateNumberedReview } from '../scripts/hanja-stroke-numbered.ts'
import originals from '../scripts/hanja-stroke-numbered-originals.json' with { type: 'json' }

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')

test('all 42 published paths reproduce from pinned licensed originals and reviewed corrections', () => {
  const bundle = buildNumberedBundle()
  assert.equal(bundle.verificationSource.id, 'moyaland-numbered')
  assert.match(bundle.verificationSource.scope, /not exam-body certification/)
  assert.deepEqual(loadNumberedBundle(bundle), HANJA_NUMBERED_STROKES)
  assert.equal(HANJA_NUMBERED_STROKES.reduce((n, entry) => n + entry.paths.length, 0), 42)
  validateNumberedBundle()
  for (const entry of HANJA_NUMBERED_STROKES) {
    validateNumberedReview(entry, NUMBERED_REFERENCES[entry.glyph].strokes)
    const original = originals.candidates.find(c => c.character === entry.glyph)!
    const uncorrected = normalizeMedians(original.medians)
    const changed = entry.paths.flatMap((p, i) => p === uncorrected[i] ? [] : [i + 1])
    assert.deepEqual(changed, entry.glyph === '笛' ? [] : entry.glyph === '蹟' ? [12] : [2])
    assert.equal(hash(entry.paths), NUMBERED_REFERENCES[entry.glyph].pathsSha256)
  }
})

test('JSON metadata key order cannot prevent a valid bundle from loading', () => {
  const reordered = JSON.parse(JSON.stringify(buildNumberedBundle(), (_key, value: unknown) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)))
    }
    return value
  })) as NumberedBundle
  assert.deepEqual(loadNumberedBundle(reordered), HANJA_NUMBERED_STROKES)
})

test('three reviewed characters play, while wrong counts and other held characters stay unavailable', () => {
  for (const [glyph, reference] of Object.entries(NUMBERED_REFERENCES)) {
    const data = hanjaStrokeData({ glyph, strokes: reference.strokes })
    assert.ok(data)
    assert.equal(data.verificationSource, HANJA_NUMBERED_SOURCE.id)
    assert.equal(data.paths.length, reference.strokes)
    assert.equal(hanjaStrokeData({ glyph, strokes: reference.strokes - 1 }), null)
  }
  for (const [glyph, strokes] of [['訣', 11], ['紋', 10], ['兔', 8]] as const) {
    assert.equal(hanjaStrokeData({ glyph, strokes }), null)
  }
})

test('runtime source loading rejects missing, duplicate, unsupported or misattributed entries', () => {
  const bundle = buildNumberedBundle()
  const mutate = (fn: (copy: NumberedBundle) => void) => {
    const copy = clone(bundle)
    fn(copy)
    assert.throws(() => loadNumberedBundle(copy), /Numbered bundle/)
  }
  mutate(copy => { copy.characters = copy.characters.slice(1) })
  mutate(copy => { copy.characters = [copy.characters[0], copy.characters[0], copy.characters[2]] })
  mutate(copy => { copy.characters[0].glyph = '訣' })
  mutate(copy => { copy.characters[0].sourceStrokeIndices = [2, 1, ...copy.characters[0].sourceStrokeIndices.slice(2)] })
  mutate(copy => { copy.characters[0].sourceReference.directionEvidenceSha256 = '0'.repeat(64) })
  mutate(copy => { copy.characters[0].sourceReference.publisherProvenanceSha256 = '0'.repeat(64) as never })
  mutate(copy => { copy.characters[0].sourceImage = 'BIN0001.gif' as never })
  mutate(copy => { copy.characters[0].paths = copy.characters[0].paths.slice(1) })
})

test('a runtime path and its claimed hash cannot be changed together to bypass the review', () => {
  const changed = clone(HANJA_NUMBERED_STROKES) as HanjaNumberedStrokeData[]
  changed[0].paths = ['M10 10 L20 20', ...changed[0].paths.slice(1)]
  changed[0].pathsSha256 = hash(changed[0].paths)
  assert.throws(() => validateNumberedBundle(changed), /published bundle/)
  assert.throws(() => validateNumberedReview(changed[0], 11), /reviewed entry/)
  const forged = clone(HANJA_NUMBERED_STROKES[0])
  forged.verificationSource = 'eomunhoe-f37' as never
  assert.throws(() => validateNumberedReview(forged, 11), /reviewed entry/)
})

test('missing originals, reordered strokes, wrong counts and changed coordinates cannot generate playback', () => {
  assert.throws(() => buildNumberedBundle(originals.candidates.slice(1)), /missing/)
  assert.throws(() => buildNumberedBundle([...originals.candidates, originals.candidates[0]]), /Duplicate/)
  const wrongCount = originals.candidates.map(c => ({ ...c, strokes: ['only-one'] }))
  assert.throws(() => buildNumberedBundle(wrongCount), /count mismatch/)
  for (const candidate of originals.candidates) {
    const moved = clone(candidate.medians)
    moved[0][0][0] += 1
    assert.throws(() => numberedGeometry(candidate.character, moved), /original medians/)
    const reordered = clone(candidate.medians)
    ;[reordered[0], reordered[1]] = [reordered[1], reordered[0]]
    assert.throws(() => numberedGeometry(candidate.character, reordered), /original medians/)
  }
})

test('the audit keeps publisher-numbered evidence distinct and verifies actual MM geometry', () => {
  const characters = Object.entries(NUMBERED_REFERENCES).map(([glyph, ref]) => ({ glyph, strokes: ref.strokes, readingGrade: '3급II' }))
  const candidates = originals.candidates.map(c => ({ ...c, strokes: normalizeMedians(c.medians) }))
  const report = auditStrokes(characters, [], HANJA_NUMBERED_STROKES, [], candidates)
  assert.equal(report.playback['numbered-reviewed'], 3)
  assert.equal(report.verificationSources.numbered, 3)
  assert.equal(report.verificationSources.eomunhoe, 0)
  for (const entry of report.entries) {
    assert.ok(entry.evidence && 'source' in entry.evidence)
    assert.equal(entry.evidence.source, 'moyaland-numbered')
  }
  assert.throws(() => auditStrokes(characters, [], HANJA_NUMBERED_STROKES), /geometry mismatch/)
  const corrupt = clone(candidates)
  corrupt[0].medians[0][0][0] += 1
  assert.throws(() => auditStrokes(characters, [], HANJA_NUMBERED_STROKES, [], corrupt), /original medians/)
})
