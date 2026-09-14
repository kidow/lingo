import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { loadJaDictionaryBundle } from './hanja-stroke-dictionary-ja.ts'
import { buildJaDictionaryBundle } from '../scripts/hanja-stroke-dictionary-ja.ts'
import { dictionaryGeometry, validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const dir = 'docs/hanja-g4-corrections-2026-09-14/'
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Original = { glyph: string; medians: number[][][] }
const sources = (JSON.parse(read('docs/hanja-g4-chaek-hoe-ja-2026-09-14/originals.json')) as {
  sources: { name: string; sourceSha256: string; entries: Original[] }[]
}).sources
const reviews = HANJA_STROKES.filter(e => ['冊', '灰', '姉'].includes(e.glyph))
const points = (path: string) => [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [Number(m[1]), Number(m[2])])
const entry = (glyph: string) => reviews.find(e => e.glyph === glyph)!

test('all 19 reviewed strokes are available only for the three exact corrected glyphs', () => {
  assert.deepEqual(reviews.map(e => e.glyph).sort(), ['冊', '灰', '姉'].sort())
  assert.equal(reviews.reduce((n, e) => n + e.paths.length, 0), 19)
  for (const item of reviews) {
    assert.equal(item.verificationSource, 'ehanja-crosschecked')
    assert.equal(item.verifiedAt, '2026-09-14')
    assert.deepEqual(hanjaStrokeData({ glyph: item.glyph, strokes: item.paths.length }), item)
    assert.equal(hanjaStrokeData({ glyph: item.glyph, strokes: item.paths.length + 1 }), null)
  }

})

test('all cumulative stages and direction observations are pinned without copying dictionary artwork', () => {
  const proof = JSON.parse(read(dir + 'review.json')) as {
    sourceArtworkCopied: boolean; priorDirectionEvidence: string; priorDirectionEvidenceSha256: string; candidateFileSha256: string;
    entries: { glyph: string; strokes: number; approvedStrokes: number[]; authoredStrokes: number[]; pathsSha256: string }[]
  }
  assert.equal(proof.sourceArtworkCopied, false)
  assert.equal(createHash('sha256').update(read(proof.priorDirectionEvidence)).digest('hex'), proof.priorDirectionEvidenceSha256)
  assert.equal(createHash('sha256').update(read(dir + 'candidate-paths.json')).digest('hex'), proof.candidateFileSha256)
  for (const e of proof.entries) {
    assert.deepEqual(e.approvedStrokes, Array.from({ length: e.strokes }, (_, i) => i + 1))
    assert.equal(hash(entry(e.glyph).paths), e.pathsSha256)
    assert.deepEqual(entry(e.glyph).sourceStrokeIndices?.flatMap((s, i) => s === null ? [i + 1] : []), e.authoredStrokes)
  }
  for (const file of ['review.json', 'corrections.json', 'candidate-paths.json']) {
    assert.throws(() => validateDictionaryProofs(path => read(path) + (path === dir + file ? ' ' : '')), /proof mismatch/)
  }
})

test('corrections preserve the last crossbar, down-left dot and two separate aligned verticals', () => {
  const chaek = entry('冊'), hoe = entry('灰'), ja = entry('姉')
  assert.deepEqual(chaek.sourceStrokeIndices, [null, 2, 4, 5, 3])
  const first = points(chaek.paths[0]), last = points(chaek.paths[4])
  assert.equal(first[0][0], first.at(-1)![0])
  assert.ok(first[0][1] < first.at(-1)![1])
  assert.ok(last[0][0] < last.at(-1)![0])
  const dot = points(hoe.paths[2]), sweep = points(hoe.paths[5]), center = points(hoe.paths[4])
  assert.ok(dot.at(-1)![0] < dot[0][0] && dot.at(-1)![1] > dot[0][1])
  assert.ok(Math.abs(sweep[0][1] - center[0][1]) < 3)
  assert.ok(sweep.at(-1)![0] > sweep[0][0] && sweep.at(-1)![1] > sweep[0][1])
  const top = points(ja.paths[3]), bottom = points(ja.paths[7])
  assert.deepEqual(top.at(-1), bottom[0])
  assert.ok(top[0][1] < bottom[0][1] && bottom[0][1] < bottom.at(-1)![1])
  assert.equal(top[0][0], bottom.at(-1)![0])
  assert.equal(ja.paths.length, 8)
})

test('unchanged originals reconstruct every path; changed data and forged hashes fail closed', () => {
  for (const original of sources.flatMap(s => s.entries)) {
    const expected = entry(original.glyph)
    assert.deepEqual(dictionaryGeometry(original.glyph, original.medians).paths, expected.paths)
    const changed = structuredClone(original.medians)
    changed[0][0][0]++
    assert.throws(() => dictionaryGeometry(original.glyph, changed), /original/)
    const reversed = structuredClone(expected)
    reversed.paths = [...reversed.paths].reverse()
    reversed.pathsSha256 = hash(reversed.paths)
    assert.throws(() => validateDictionaryReview(reversed as Parameters<typeof validateDictionaryReview>[0], expected.paths.length), /published entry/)
  }
  const bundle = structuredClone(buildJaDictionaryBundle())
  assert.throws(() => loadJaDictionaryBundle({ ...bundle, characters: [bundle.characters[0], bundle.characters[0]] }), /entry mismatch/)
  assert.throws(() => loadJaDictionaryBundle({ ...bundle, characters: [bundle.characters[0]] }), /bundle mismatch/)
})

test('the shared audit preserves MM versus Japanese geometry and reports dictionary evidence separately', () => {
  const candidates = (name: string) => sources.find(s => s.name === name)!.entries.map(e => ({
    character: e.glyph, medians: e.medians, strokes: normalizeMedians(e.medians),
  }))
  const characters = reviews.map(e => ({ glyph: e.glyph, strokes: e.paths.length, readingGrade: '4급' }))
  const ja = candidates('AnimCJK Japanese'), mm = candidates('Make Me a Hanzi')
  const result = auditStrokes(characters, [], reviews, ja, mm)
  assert.equal(result.verificationSources.dictionary, 3)
  assert.equal(result.verificationSources.eomunhoe, 0)
  assert.equal(result.playback['dictionary-crosschecked'], 3)
  assert.throws(() => auditStrokes(characters, [], reviews, mm, ja), /geometry mismatch/)
})
