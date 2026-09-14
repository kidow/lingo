import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'

const json = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const sources = json('./sources.json')
const review = json('./review.json')
const originals = json('./originals.json')
assert.equal(sha256(readFileSync(new URL('./sources.json', import.meta.url))), review.supplementalSourcesSha256)
const results = []

for (const source of sources.records) {
  const record = review.records.find(r => r.glyph === source.glyph)
  assert.ok(record)
  const response = await fetch(source.svgUrl, { signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, source.bytes)
  assert.equal(sha256(bytes), source.sha256)
  const svg = bytes.toString('utf8')
  assert.equal(svg.match(/<title>(.*?)<\/title>/)?.[1], source.glyph)
  const ids = [...svg.matchAll(/<path id="([^"]+)"/g)].map(m => m[1])
  assert.equal(ids.length, source.strokes)
  assert.deepEqual(source.boundaryStrokes.map(n => ids[n - 1]), source.outlineIds)
  const animations = [...svg.matchAll(/<path\s+style="--d:(\d+)ms;--t:(\d+)ms;[^"]*"\s+clip-path="url\(#([^)]*)\)"[^>]*>/g)]
  assert.deepEqual(animations.map(m => [Number(m[1]), Number(m[2])]), source.animation)
  for (let index = 0; index < animations.length; index++) {
    const clipId = animations[index][3]
    assert.match(clipId, /^U[0-9A-F]+c\d+$/)
    const escaped = clipId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const target = svg.match(new RegExp('<clipPath id="' + escaped + '"><use xlink:href="#([^"]+)"'))?.[1]
    assert.equal(target, ids[index])
  }
  const videoResponse = await fetch(record.sourceVideo.url, { signal: AbortSignal.timeout(30000) })
  assert.equal(videoResponse.status, 200)
  const movie = Buffer.from(await videoResponse.arrayBuffer())
  assert.equal(movie.length, record.sourceVideo.bytes)
  assert.equal(sha256(movie), record.sourceVideo.sha256)
  const original = originals.find(o => o.glyph === source.glyph)
  const runtime = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === source.glyph)
  assert.ok(original && runtime)
  assert.equal(sha256(JSON.stringify(original.medians)), original.originalMediansSha256)
  assert.deepEqual(runtime.paths, normalizeMedians(original.medians))
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(r => r.glyph === source.glyph), record)
  validateTextbookReview(runtime, source.strokes)
  results.push({ glyph: source.glyph, strokes: source.strokes, dictionaryAndVideoHashesMatch: true, explicitBoundaryStrokes: source.boundaryStrokes, runtimeReproduced: true })
}

const baseline = json('./baseline.json')
for (const [file, before] of Object.entries(baseline)) {
  const rows = json('../../' + file)[before.key]
  assert.equal(sha256(JSON.stringify(rows.slice(0, before.count))), before.prefixSha256)
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e => e.glyph))
const grade3Applied = catalog.filter(c => applied.has(c.glyph)).length
console.log(JSON.stringify({ result: 'pass', records: results, runtime: applied.size, grade3Applied, grade3Remaining: catalog.length - grade3Applied, assetsSaved: 0 }))
