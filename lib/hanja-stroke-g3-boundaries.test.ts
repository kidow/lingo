import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview, type TextbookReviewRecord } from '../scripts/hanja-stroke-textbook.ts'

const directory = '../docs/hanja-g3-boundaries-2026-09-14/'
const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')
const json = <T>(path: string): T => JSON.parse(read(path)) as T
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const review = json<{ supplementalSourcesSha256: string; records: TextbookReviewRecord[] }>(directory + 'review.json')
const sources = json<{ records: { glyph: string; svgUrl: string; sha256: string; strokes: number; boundaryStrokes: number[]; outlineIds: string[]; animation: number[][] }[] }>(directory + 'sources.json')
const originals = json<{ glyph: string; medians: number[][][]; originalMediansSha256: string; geometrySource: { sha256: string } }[]>(directory + 'originals.json')
const candidates = json<{ glyph: string; paths: string[] }[]>(directory + 'candidate-paths.json')
const observations = json<{ glyph: string; reviewedCumulativeStrokes: number; dictionaryCumulativeStrokes: number; boundaryStrokes: number[]; boundaryProgress: number[]; sourceOverview: { fps: number; frames: number; last: number } }[]>(directory + 'observations.json')
const prior = json<{ records: { glyph: string; decision: string; checks: { boundaries: string } }[] }>(directory + 'prior-review.json')
const catalog = json<{ characters: { glyph: string; strokes: number }[] }>('../content/hanja/characters/g3.json').characters
const glyphs = [...'郭郊那']
const expected = { 郭: { count: 11, boundary: [9, 10] }, 郊: { count: 9, boundary: [7, 8] }, 那: { count: 7, boundary: [5, 6] } }
const entry = (glyph: string) => {
  const found = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === glyph)
  assert.ok(found, glyph)
  return found
}

test('three boundary holds publish exactly 27 unchanged licensed JA paths after supplementary review', () => {
  assert.deepEqual(review.records.map(r => r.glyph), glyphs)
  let total = 0
  for (const r of review.records) {
    const character = catalog.find(c => c.glyph === r.glyph)
    const original = originals.find(o => o.glyph === r.glyph)
    assert.ok(character && original)
    assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === r.glyph), r)
    assert.equal(r.status, 'matched')
    assert.equal(r.geometryCorrection, undefined)
    assert.equal(r.geometrySource, '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8')
    assert.equal(original.geometrySource.sha256, r.geometrySource)
    assert.equal(hash(original.medians), original.originalMediansSha256)
    assert.deepEqual(entry(r.glyph).paths, normalizeMedians(original.medians))
    assert.deepEqual(entry(r.glyph).paths, candidates.find(c => c.glyph === r.glyph)?.paths)
    assert.deepEqual(hanjaStrokeData(character)?.paths, entry(r.glyph).paths)
    assert.equal(hash(entry(r.glyph).paths), r.pathsSha256)
    validateTextbookReview(entry(r.glyph), character.strokes)
    total += character.strokes
  }
  assert.equal(total, 27)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
})

test('each approval binds the independent boundary evidence rather than converting a video pause into a stroke', () => {
  const fileHash = createHash('sha256').update(read(directory + 'sources.json')).digest('hex')
  assert.equal(fileHash, review.supplementalSourcesSha256)
  let overviewFrames = 0
  for (const glyph of glyphs) {
    const source = sources.records.find(s => s.glyph === glyph)
    const r = review.records.find(r => r.glyph === glyph)
    const observation = observations.find(o => o.glyph === glyph)
    const earlier = prior.records.find(r => r.glyph === glyph)
    assert.ok(source && r && observation && earlier)
    const spec = expected[glyph as keyof typeof expected]
    assert.equal(earlier.decision, 'held')
    assert.equal(earlier.checks.boundaries, 'pending')
    assert.equal(r.checks?.boundaries, 'match')
    assert.ok(r.notes?.includes(source.svgUrl) && r.notes.includes(source.sha256) && r.notes.includes(fileHash))
    assert.deepEqual(source.boundaryStrokes, spec.boundary)
    assert.equal(source.strokes, spec.count)
    assert.deepEqual(source.outlineIds.map(id => Number(id.match(/d(\d+)$/)?.[1])), spec.boundary)
    assert.equal(source.animation.length, spec.count)
    source.animation.forEach(([start, duration], index) => {
      assert.ok(duration > 0)
      assert.ok(start > (index ? source.animation[index - 1][0] + source.animation[index - 1][1] : 0))
    })
    assert.deepEqual(observation.boundaryStrokes, spec.boundary)
    assert.deepEqual(observation.boundaryProgress, [0, .25, .5, .75, 1])
    assert.equal(observation.reviewedCumulativeStrokes, spec.count)
    assert.equal(observation.dictionaryCumulativeStrokes, spec.count)
    assert.equal(observation.sourceOverview.fps, 2)
    assert.equal((observation.sourceOverview.frames - 1) / 2, observation.sourceOverview.last)
    overviewFrames += observation.sourceOverview.frames
  }
  assert.equal(overviewFrames, 96)
})

test('right-side ear retains two touching paths followed by an independent top-to-bottom vertical', () => {
  const points = (path: string) => path.replace('M', '').split('L').map(p => p.trim().split(/\s+/).map(Number))
  for (const glyph of glyphs) {
    const paths = entry(glyph).paths
    const [first, second, vertical] = paths.slice(-3).map(points)
    assert.ok(first.some(p => p[0] > first[0][0]))
    assert.ok(first.at(-1)![0] < Math.max(...first.map(p => p[0])))
    assert.ok(first.at(-1)![1] > first[0][1])
    assert.ok(Math.hypot(first.at(-1)![0] - second[0][0], first.at(-1)![1] - second[0][1]) < 3)
    assert.ok(second.at(-1)![1] > second[0][1])
    assert.ok(Math.max(...second.map(p => p[0])) > second[0][0])
    assert.ok(second.at(-1)![0] < Math.max(...second.map(p => p[0])))
    assert.ok(vertical.at(-1)![1] > vertical[0][1] + 50)
  }
})

test('merging or reversing the newly established strokes fails the published review', () => {
  for (const glyph of glyphs) {
    const current = entry(glyph), paths = current.paths
    const index = paths.length - 3
    const merged = [...paths.slice(0, index), paths[index] + ' ' + paths[index + 1].replace('M', 'L'), ...paths.slice(index + 2)]
    assert.throws(() => validateTextbookReview({ ...current, paths: merged, pathsSha256: hash(merged) }, paths.length))
    const swapped = paths.slice()
    ;[swapped[index], swapped[index + 1]] = [swapped[index + 1], swapped[index]]
    assert.throws(() => validateTextbookReview({ ...current, paths: swapped, pathsSha256: hash(swapped) }, paths.length))
  }
})

test('three approvals preserve all previously published review and runtime records', () => {
  const baseline = json<Record<string, { key: string; count: number; prefixSha256: string }>>(directory + 'baseline.json')
  for (const [file, before] of Object.entries(baseline)) {
    const list = json<Record<string, { glyph: string }[]>>('../' + file)[before.key]
    assert.equal(hash(list.slice(0, before.count)), before.prefixSha256)
    assert.deepEqual(list.slice(before.count, before.count + 3).map(r => r.glyph), glyphs)
  }
})
