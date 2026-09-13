import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import {
  HANJA_DICTIONARY_STROKES, DICTIONARY_REFERENCES, loadDictionaryBundle, type DictionaryBundle,
} from './hanja-stroke-dictionary.ts'
import {
  buildDictionaryBundle, dictionaryGeometry, validateDictionaryBundle, validateDictionaryProofs, validateDictionaryReview,
} from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const root = new URL('../', import.meta.url)
const read = (path: string) => readFileSync(new URL(path, root), 'utf8')
const originalSources = JSON.parse(read('docs/hanja-g3ii-gyeol-mun-2026-09-13/originals.json')) as {
  name: string; entries: { glyph: string; medians: number[][][] }[]
}[]
const fullOriginals = JSON.parse(read('docs/hanja-g3ii-sam-pung-2026-09-13/originals.json')) as typeof originalSources[number]
const candidates = [...originalSources.find(s => s.name === 'MM')!.entries, ...fullOriginals.entries].map(e => ({
  character: e.glyph, medians: e.medians, strokes: normalizeMedians(e.medians),
}))
const clone = <T>(value: T): T => structuredClone(value)

test('dictionary crosscheck publishes four reviewed candidates and 46 strokes', () => {
  const bundle = buildDictionaryBundle()
  assert.deepEqual(loadDictionaryBundle(bundle), HANJA_DICTIONARY_STROKES)
  assert.doesNotThrow(() => validateDictionaryBundle())
  assert.deepEqual(HANJA_DICTIONARY_STROKES.map(e => e.glyph), ['訣', '紋', '森', '楓'])
  assert.equal(HANJA_DICTIONARY_STROKES.reduce((n, e) => n + e.paths.length, 0), 46)
  for (const entry of HANJA_DICTIONARY_STROKES) {
    assert.deepEqual(hanjaStrokeData({ glyph: entry.glyph, strokes: entry.paths.length }), entry)
    assert.equal(hanjaStrokeData({ glyph: entry.glyph, strokes: entry.paths.length + 1 }), null)
    assert.equal(entry.verificationSource, 'ehanja-crosschecked')
    assert.equal(HANJA_STROKES.filter(e => e.glyph === entry.glyph).length, 1)
    assert.equal(entry.sourceImage, undefined)
  }
  assert.deepEqual(bundle.characters.find(e => e.glyph === '紋')!.sourceStrokeIndices, [1, 2, 3, null, null, 6, 7, 8, 9, 10])
})

test('three direct observations resolve only the exact earlier conflicts, not the dictionary font as a whole', () => {
  const prior = JSON.parse(read('docs/hanja-g3ii-crosscheck-63-2026-09-13/review-a.json'))
  const proof = JSON.parse(read('docs/hanja-g3ii-direction-3-2026-09-13/direction-review.json'))
  assert.equal(prior.summary.staticRoleComparisonsWithoutDetectedConflict, 18)
  assert.equal(proof.result.verified, 3)
  assert.equal(proof.result.unresolved, 0)
  assert.equal(proof.result.liveScreenshotsObserved, 10)
  for (const entry of proof.entries) {
    const ref = DICTIONARY_REFERENCES[entry.glyph]
    assert.deepEqual(entry.observations.map((o: { stroke: number }) => o.stroke), prior.summary.conflicts.find((c: { glyph: string }) => c.glyph === entry.glyph).indices)
    assert.equal(entry.observations.map((o: { stroke: number }) => o.stroke).join(','), ref.directions)
    assert.equal(entry.sourceSha256, ref.svgSha256)
    assert.equal(entry.wholeGlyphMatchClaimed, false)
    for (const observation of entry.observations) {
      assert.equal(observation.decision, 'verified')
      assert.ok(observation.screenshotsObserved >= 3)
      const offsets = observation.preScreenshotDashoffsets as number[]
      assert.ok(offsets.every((n, i) => n > 0 && n < observation.initialDashoffset && (!i || n < offsets[i - 1])))
    }
  }
})

test('changed direction proof or candidate review cannot silently become a new approval', () => {
  for (const suffix of ['direction-review.json', 'candidate-paths.json', 'review-a.json', 'donors.json', 'observations.json', 'sources.json', 'sam-pung-2026-09-13/review.json', 'sam-pung-2026-09-13/originals.json']) {
    assert.throws(() => validateDictionaryProofs(path => read(path) + (path.endsWith(suffix) ? ' ' : '')), /proof mismatch/)
  }
})

test('森 and 楓 require all 25 observed dictionary strokes and cumulative candidate reviews', () => {
  const review = JSON.parse(read('docs/hanja-g3ii-sam-pung-2026-09-13/review.json')) as {
    entries: { glyph: string; strokes: number; pathsSha256: string; sourceStrokeIndices: number[];
      strokeReview: [number, string, string, string][]; wholeCandidateGeometryReviewed: boolean; runtimeApproved: boolean }[]
  }
  const observations = JSON.parse(read('docs/hanja-g3ii-dictionary-12-2026-09-13/observations.json')) as {
    rows: [string, number, number, number, number, boolean][]
  }
  const sources = JSON.parse(read('docs/hanja-g3ii-dictionary-12-2026-09-13/sources.json')) as {
    entries: { glyph: string; sourceSha256: string; dictionaryStrokes: number }[]
  }
  assert.deepEqual(review.entries.map(e => e.glyph), ['森', '楓'])
  assert.equal(review.entries.reduce((n, e) => n + e.strokes, 0), 25)
  for (const entry of review.entries) {
    const published = HANJA_DICTIONARY_STROKES.find(e => e.glyph === entry.glyph)!
    const sequence = Array.from({ length: entry.strokes }, (_, i) => i + 1)
    const rows = observations.rows.filter(r => r[0] === entry.glyph)
    assert.deepEqual(rows.map(r => r[1]), sequence)
    assert.ok(rows.every(r => r[2] > 0 && r[2] < r[3] && r[4] === r[1] - 1 && r[5]))
    assert.deepEqual(entry.strokeReview.map(r => r[0]), sequence)
    assert.ok(entry.strokeReview.every(r => r[1] && r[2] && r[3] === 'verified'))
    assert.ok(entry.wholeCandidateGeometryReviewed && entry.runtimeApproved)
    assert.deepEqual(published.sourceStrokeIndices, sequence)
    assert.equal(published.pathsSha256, entry.pathsSha256)
    assert.equal(published.sourceReference.dictionaryDirectionStrokes, sequence.join(','))
    assert.equal(published.sourceReference.orderUrl, published.sourceReference.dictionarySvgUrl)
    const source = sources.entries.find(e => e.glyph === entry.glyph)!
    assert.equal(source.dictionaryStrokes, entry.strokes)
    assert.equal(source.sourceSha256, published.sourceReference.dictionarySvgSha256)
    const candidate = candidates.find(e => e.character === entry.glyph)!
    assert.deepEqual(published.paths, normalizeMedians(candidate.medians))
    const changed = clone(published)
    changed.paths = [...changed.paths].reverse()
    changed.pathsSha256 = createHash('sha256').update(JSON.stringify(changed.paths)).digest('hex')
    assert.throws(() => validateDictionaryReview(changed, entry.strokes), /published entry/)
    const falseSource = clone(buildDictionaryBundle())
    falseSource.characters.find(e => e.glyph === entry.glyph)!.sourceReference.dictionarySvgSha256 = '0'.repeat(64)
    assert.throws(() => loadDictionaryBundle(falseSource), /Dictionary bundle/)
  }
})

test('runtime guards reject substituted sources, broader direction scope, extra glyphs and lost donor provenance', () => {
  const mutations: ((b: DictionaryBundle) => void)[] = [
    b => { (b.verificationSource as unknown as { id: string }).id = 'eomunhoe-f37' },
    b => { b.characters[0].sourceReference.dictionaryDirectionStrokes = '1,2,3,4,5,6,7,8,9,10,11' },
    b => { b.characters[0].glyph = 'constructor' },
    b => { b.characters[1].glyph = b.characters[0].glyph },
    b => { b.characters[1].sourceStrokeIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    b => { b.characters[0].paths = b.characters[0].paths.slice(1) },
  ]
  for (const mutate of mutations) {
    const bundle = clone(buildDictionaryBundle())
    mutate(bundle)
    assert.throws(() => loadDictionaryBundle(bundle), /Dictionary bundle/)
  }
})

test('reconstruction rejects missing, duplicate, moved, reordered or reversed original candidates', () => {
  assert.throws(() => buildDictionaryBundle(candidates.slice(1)), /candidate set/)
  assert.throws(() => buildDictionaryBundle([candidates[0], candidates[0]]), /candidate set/)
  for (const candidate of candidates) {
    const moved = clone(candidate.medians)
    moved[0][0][0] += 1
    assert.throws(() => dictionaryGeometry(candidate.character, moved), /original medians/)
    const reversed = clone(candidate.medians)
    reversed[0].reverse()
    assert.throws(() => dictionaryGeometry(candidate.character, reversed), /original medians/)
  }
})

test('valid metadata or recalculated hashes cannot authorize edited or reordered runtime paths', () => {
  for (const recalculate of [false, true]) {
    const changed = clone(HANJA_DICTIONARY_STROKES[0])
    changed.paths = [...changed.paths].reverse()
    if (recalculate) changed.pathsSha256 = createHash('sha256').update(JSON.stringify(changed.paths)).digest('hex')
    assert.throws(() => validateDictionaryReview(changed, 11), /published entry/)
    assert.throws(() => validateDictionaryBundle([changed, HANJA_DICTIONARY_STROKES[1]]), /published bundle/)
  }
})

test('audit reports the dictionary crosscheck separately and reconstructs both corrected and unchanged geometry', () => {
  const characters = Object.entries(DICTIONARY_REFERENCES).map(([glyph, ref]) => ({ glyph, strokes: ref.strokes, readingGrade: '3급II' }))
  const audit = auditStrokes(characters, [], HANJA_DICTIONARY_STROKES, [], candidates)
  assert.equal(audit.verificationSources.dictionary, 4)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.equal(audit.playback['dictionary-crosschecked'], 4)
  assert.throws(() => auditStrokes(characters, [], HANJA_DICTIONARY_STROKES), /geometry mismatch/)
  const corrupt = clone(candidates)
  corrupt[1].medians[0][0][0] += 1
  assert.throws(() => auditStrokes(characters, [], HANJA_DICTIONARY_STROKES, [], corrupt), /original medians/)
})
