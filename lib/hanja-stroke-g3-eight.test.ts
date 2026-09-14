import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE, HANJA_TEXTBOOK_STROKES } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { MAKE_ME_A_HANZI_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview, type TextbookReviewRecord } from '../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS, textbookCorrectionSha256, textbookGeometry } from '../scripts/hanja-stroke-textbook-corrections.ts'

const directory = '../docs/hanja-g3-eight-corrections-2026-09-14/'
const json = <T>(path: string): T => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8')) as T
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const review = json<{ manifest: { sha256: string }; records: TextbookReviewRecord[] }>(directory + 'review.json')
const originals = json<{ glyph: string; medians: number[][][]; originalMediansSha256: string; geometrySource: { sha256: string; url: string } }[]>(directory + 'originals.json')
const priorPaths = json<{ glyph: string; paths: string[] }[]>(directory + 'prior-candidate-paths.json')
const candidates = json<{ glyph: string; paths: string[] }[]>(directory + 'candidate-paths.json')
const observations = json<{ glyph: string; sourceOverview: { fps: number; start: number; frames: number; last: number }; changedOutputStrokes: number[]; sourceStrokeIndices: number[]; strokeEndsSeconds: number[]; reviewedCumulativeStrokes: number }[]>(directory + 'observations.json')
const catalog = json<{ characters: { glyph: string; strokes: number }[] }>('../content/hanja/characters/g3.json').characters
const glyphs = [...'肩絹繫顧矯糾奈稻']
const changes: Record<string, number[]> = { 肩: [1], 絹: [4, 5, 6], 繫: [17], 顧: [1], 矯: [10, 11, 12, 15, 16, 17], 糾: [4, 5], 奈: [6], 稻: [7, 9] }
const entry = (glyph: string) => {
  const result = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === glyph)
  assert.ok(result, glyph)
  return result
}
type Point = [number, number]
const points = (glyph: string, stroke: number): Point[] => entry(glyph).paths[stroke - 1].replace('M', '').split('L').map(p => p.trim().split(/\s+/).map(Number) as Point)
const pointDistance = (p: Point, a: Point, b: Point) => {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
const segmentDistance = (a: Point, b: Point, c: Point, d: Point) => {
  const abC = cross(a, b, c), abD = cross(a, b, d), cdA = cross(c, d, a), cdB = cross(c, d, b)
  if (abC * abD < 0 && cdA * cdB < 0) return 0
  return Math.min(pointDistance(a, c, d), pointDistance(b, c, d), pointDistance(c, a, b), pointDistance(d, a, b))
}
const distance = (glyph: string, first: number, second: number) => {
  const a = points(glyph, first), b = points(glyph, second)
  return Math.min(...a.slice(1).flatMap((end, i) => b.slice(1).map((other, j) => segmentDistance(a[i], end, b[j], other))))
}

test('eight grade 3 corrections publish exactly 109 reviewed strokes with pinned publisher evidence', () => {
  assert.deepEqual(review.records.map(r => r.glyph), glyphs)
  assert.equal(review.manifest.sha256, HANJA_TEXTBOOK_SOURCE.manifestSha256)
  let total = 0
  for (const r of review.records) {
    const character = catalog.find(c => c.glyph === r.glyph)
    assert.ok(character)
    const actual = TEXTBOOK_REVIEW_REGISTRY.records.find(e => e.glyph === r.glyph)
    assert.deepEqual(actual, r)
    assert.equal(r.geometrySource, MAKE_ME_A_HANZI_SOURCE.sha256)
    assert.equal(r.sourceVideo?.url, new URL('../media/video/' + r.manifestRow + '.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href)
    assert.deepEqual(entry(r.glyph).paths, candidates.find(c => c.glyph === r.glyph)?.paths)
    assert.deepEqual(hanjaStrokeData(character)?.paths, entry(r.glyph).paths)
    assert.equal(entry(r.glyph).paths.length, character.strokes)
    validateTextbookReview(entry(r.glyph), character.strokes)
    total += character.strokes
  }
  assert.equal(total, 109)
  // Later batches may resolve the three boundary holds; this review covers only its eight glyphs.
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
})

test('whole videos and all 109 cumulative paths are recorded; 17 replacements retain original correspondence', () => {
  let frames = 0, replaced = 0
  for (const r of review.records) {
    const original = originals.find(o => o.glyph === r.glyph)
    const observation = observations.find(o => o.glyph === r.glyph)
    const recipe = TEXTBOOK_CORRECTIONS.find(c => c.glyph === r.glyph)
    assert.ok(original && observation && recipe)
    assert.equal(hash(original.medians), original.originalMediansSha256)
    assert.equal(original.geometrySource.sha256, MAKE_ME_A_HANZI_SOURCE.sha256)
    assert.equal(original.geometrySource.url, MAKE_ME_A_HANZI_SOURCE.url)
    assert.equal(recipe.originalMediansSha256, original.originalMediansSha256)
    assert.equal(recipe.sourceVideoSha256, r.sourceVideo?.sha256)
    assert.equal(r.correctionSha256, textbookCorrectionSha256(recipe))
    assert.equal(recipe.coordinateSystem, 'viewBox100')
    assert.deepEqual(recipe.strokes.flatMap((s, i) => s.points ? [i + 1] : []), changes[r.glyph])
    assert.deepEqual(observation.changedOutputStrokes, changes[r.glyph])
    assert.deepEqual(observation.sourceStrokeIndices, recipe.strokes.map(s => s.sourceStroke))
    assert.deepEqual([...observation.sourceStrokeIndices].sort((a, b) => a - b), Array.from({ length: r.expectedStrokes }, (_, i) => i + 1))
    assert.deepEqual(observation.strokeEndsSeconds, r.strokeEndsSeconds)
    assert.equal(observation.reviewedCumulativeStrokes, r.expectedStrokes)
    assert.equal(observation.sourceOverview.start, 0)
    assert.equal(observation.sourceOverview.fps, 2)
    assert.equal((observation.sourceOverview.frames - 1) / 2, observation.sourceOverview.last)
    observation.strokeEndsSeconds.forEach((t, i, all) => assert.ok(t > (all[i - 1] ?? 0) && t <= observation.sourceOverview.last))
    const generated = textbookGeometry(r, original.medians)
    assert.deepEqual(generated.paths, entry(r.glyph).paths)
    const normalized = normalizeMedians(original.medians)
    recipe.strokes.forEach((s, i) => {
      assert.ok(s.sourceStroke !== null)
      if (!s.points) assert.equal(generated.paths[i], normalized[s.sourceStroke - 1])
    })
    const order = normalized.map((_, i) => i + 1)
    if (r.glyph === '絹' || r.glyph === '糾') [order[3], order[4]] = [order[4], order[3]]
    assert.deepEqual(generated.sourceStrokeIndices, order)
    frames += observation.sourceOverview.frames
    replaced += observation.changedOutputStrokes.length
  }
  assert.equal(frames, 286)
  assert.equal(replaced, 17)
})

test('connected down-left first strokes, unhooked verticals and independent dots retain source directions', () => {
  for (const glyph of ['肩', '顧']) {
    const p = points(glyph, 1)
    for (let i = 1; i < p.length; i++) assert.ok(p[i][0] < p[i - 1][0] && p[i][1] > p[i - 1][1])
    assert.ok(distance(glyph, 1, 2) < 5)
    assert.ok(distance(glyph, 1, 4) < 5)
  }
  for (const [glyph, stroke] of [['繫', 17], ['奈', 6]] as const) {
    const p = points(glyph, stroke), end = p.at(-1)!, prior = p.at(-2)!
    assert.ok(end[1] > prior[1])
    assert.ok(Math.abs(end[0] - prior[0]) < 0.3)
  }
  for (const glyph of ['絹', '糾']) {
    assert.ok(distance(glyph, 4, 5) > 6)
    assert.ok(distance(glyph, 4, 6) > 6)
    for (const [stroke, sign] of [[5, -1], [6, 1]]) {
      const p = points(glyph, stroke)
      assert.ok((p.at(-1)![0] - p[0][0]) * sign > 0)
      assert.ok(p.at(-1)![1] > p[0][1])
    }
  }
  const fall = points('稻', 7), dot = points('稻', 9)
  assert.ok(fall.at(-1)![0] < fall[0][0] && fall.at(-1)![1] > fall[0][1])
  assert.ok(dot.at(-1)![0] > dot[0][0] && dot.at(-1)![1] > dot[0][1])
  assert.ok(distance('稻', 6, 7) < 5)
  assert.ok(distance('稻', 2, 7) < 5)
  assert.ok(distance('繫', 8, 9) < 5)
})

test('矯 keeps two open counters, its source contact and its surrounding white gaps at width5', () => {
  assert.ok(distance('矯', 8, 10) < 5, 'source upper mouth touches left falling stroke')
  for (const [a, b] of [[9, 11], [12, 14], [14, 16], [13, 15], [14, 17]]) {
    assert.ok(distance('矯', a, b) > 5.5, a + '/' + b + ' must not touch')
  }
  for (const [center, strokes] of [[[58, 48.5], [10, 11, 12]], [[58, 71.5], [15, 16, 17]]] as [Point, number[]][]) {
    for (const stroke of strokes) {
      const p = points('矯', stroke)
      assert.ok(Math.min(...p.slice(1).map((end, i) => pointDistance(center, p[i], end))) > 3, 'counter retains an open center')
    }
  }
})

test('restoring unreviewed original paths cannot pass the completed registry even with a rewritten path hash', () => {
  for (const r of review.records) {
    const original = priorPaths.find(p => p.glyph === r.glyph)
    assert.ok(original)
    assert.notDeepEqual(entry(r.glyph).paths, original.paths)
    assert.throws(() => validateTextbookReview({ ...entry(r.glyph), paths: original.paths, pathsSha256: hash(original.paths) }, r.expectedStrokes))
  }
})

test('the eight approvals append without rewriting any earlier review, recipe or runtime record', () => {
  const before = json<Record<string, { key: string; count: number; prefixSha256: string }>>(directory + 'baseline.json')
  for (const [file, baseline] of Object.entries(before)) {
    const list = json<Record<string, { glyph: string }[]>>('../' + file)[baseline.key]
    assert.equal(hash(list.slice(0, baseline.count)), baseline.prefixSha256, file)
    assert.deepEqual(list.slice(baseline.count, baseline.count + 8).map(r => r.glyph), glyphs)
  }
})
