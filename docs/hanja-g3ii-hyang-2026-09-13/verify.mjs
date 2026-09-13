import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateDictionaryBundle } from '../../scripts/hanja-stroke-dictionary.ts'
import { validateJaDictionaryBundle } from '../../scripts/hanja-stroke-dictionary-ja.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(value).digest('hex')
const review = read('./review.json'), candidate = read('./candidate-paths.json').entries[0]
const source = read('../hanja-g3ii-dictionary-12-2026-09-13/sources.json').entries.find(e => e.glyph === '響')
const observations = read('./observations.json')
validateDictionaryBundle()
validateJaDictionaryBundle()
assert.equal(review.runtimeApproved, true)
assert.equal(review.strokes, 22)
assert.equal(review.localCenterlines.length, 12)
assert.equal(review.retainedPriorProposalStrokes.length, 10)
assert.deepEqual(review.strokeReview.map(r => r[0]), Array.from({ length: 22 }, (_, i) => i + 1))
assert.ok(review.strokeReview.every(r => r[3] === 'verified'))
assert.deepEqual(observations.rows.map(r => r[1]), review.strokeReview.map(r => r[0]))
assert.ok(observations.rows.every(r => r[2] > 0 && r[2] < r[3] && r[4] === r[1] - 1 && r[5]))
assert.equal(source.dictionaryStrokes, 22)
assert.equal(source.sourceUrl, review.sourceUrl)
assert.equal(source.sourceSha256, review.sourceSha256)
assert.equal(hash(JSON.stringify(candidate.paths)), review.pathsSha256)
assert.deepEqual(hanjaStrokeData({ glyph: '響', strokes: 22 }).paths, candidate.paths)
let liveSourcesChecked = 0
if (process.argv.includes('--online')) {
  const response = await fetch(source.sourceUrl, { signal: AbortSignal.timeout(15000) })
  assert.ok(response.ok)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, source.sourceBytes)
  assert.equal(hash(bytes), source.sourceSha256)
  const text = bytes.toString('utf8')
  assert.equal(text.match(/<title[^>]*>(.*?)<\/title>/s)?.[1], '響')
  const timings = Array.from(text.matchAll(/<path\b[^>]*clip-path[^>]*>/g)).map(([tag]) => {
    const clip = tag.match(/clip-path="([^"]+)"/)?.[1] ?? '', style = tag.match(/style="([^"]+)"/)?.[1] ?? ''
    return [Number(clip.match(/c(\d+)/)?.[1]), Number(style.match(/--d:\s*([\d.]+)/)?.[1]),
      Number(style.match(/--t:\s*([\d.]+)/)?.[1]), Number(style.match(/stroke-dashoffset:\s*([\d.]+)/)?.[1])]
  }).sort((a, b) => a[0] - b[0])
  assert.deepEqual(timings, source.timingRows)
  liveSourcesChecked++
}
const dir = new URL('../../content/hanja/characters/', import.meta.url)
const catalog = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const playable = catalog.filter(c => hanjaStrokeData(c))
const grade = catalog.filter(c => c.readingGrade === '3급II')
console.log(JSON.stringify({ status: 'passed', glyph: '響', verifiedStrokes: 22, liveSourcesChecked,
  priorProposalPathsRetained: 10, localCenterlines: 12, newRuntimeGlyphs: 1,
  currentRuntimeGlyphs: HANJA_STROKES.length, catalogTotal: catalog.length,
  playable: playable.length, remaining: catalog.length - playable.length,
  grade3iiTotal: grade.length, grade3iiPlayable: grade.filter(c => hanjaStrokeData(c)).length,
  grade3iiRemaining: grade.filter(c => !hanjaStrokeData(c)).map(c => c.glyph),
}, null, 2))
