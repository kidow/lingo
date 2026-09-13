import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateDictionaryBundle } from '../../scripts/hanja-stroke-dictionary.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const source = read('./sources.json'), review = read('./review.json'), form = read('./form-resolution.json')
const candidate = read('./candidate-paths.json').entries[0]
validateDictionaryBundle()
assert.equal(form.status, 'resolved-for-this-source')
assert.equal(form.sourceGlyph.normalize('NFC'), form.glyph)
assert.equal(review.runtimeApproved, true)
assert.equal(review.strokes, 8)
assert.equal(hash(JSON.stringify(candidate.paths)), review.pathsSha256)
assert.deepEqual(hanjaStrokeData({ glyph: '兔', strokes: 8 }).paths, candidate.paths)
assert.deepEqual(review.strokeReview.map(r => r[0]), [1,2,3,4,5,6,7,8])
assert.ok(review.strokeReview.every(r => r[3] === 'verified'))
let liveSourcesChecked = 0
if (process.argv.includes('--online')) {
  // RAM-only fetches; system TLS verification stays enabled. Nothing is copied into the repository.
  const fetchBytes = url => execFileSync('/usr/bin/curl', ['-fsSL', '--max-time', '25', url], { maxBuffer: 4000000 })
  const bytes = fetchBytes(source.animation.sourceUrl), text = bytes.toString('utf8')
  assert.equal(bytes.length, source.animation.sourceBytes)
  assert.equal(hash(bytes), source.animation.sourceSha256)
  assert.equal(text.match(/<title[^>]*>(.*?)<\/title>/s)?.[1], form.sourceGlyph)
  const timings = [...text.matchAll(/<path\b[^>]*clip-path[^>]*>/g)].map(([tag]) => {
    const clip = tag.match(/clip-path="([^"]+)"/)?.[1] ?? '', style = tag.match(/style="([^"]+)"/)?.[1] ?? ''
    return [Number(clip.match(/c(\d+)/)?.[1]), Number(style.match(/--d:\s*([\d.]+)/)?.[1]),
      Number(style.match(/--t:\s*([\d.]+)/)?.[1]), Number(style.match(/stroke-dashoffset:\s*([\d.]+)/)?.[1])]
  }).sort((a, b) => a[0] - b[0])
  assert.deepEqual(timings, source.animation.timingRows)
  liveSourcesChecked++
  const unicode = fetchBytes(source.unicode.url)
  assert.equal(hash(unicode), source.unicode.sha256)
  assert.equal(unicode.toString('utf8').split('\n').find(l => l.startsWith('2F80F;')), source.unicode.record)
  liveSourcesChecked++
}
const dir = new URL('../../content/hanja/characters/', import.meta.url)
const catalog = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const playable = catalog.filter(c => hanjaStrokeData(c)), grade = catalog.filter(c => c.readingGrade === '3급II')
console.log(JSON.stringify({ scope: '兔', addedCharacters: 1, addedStrokes: 8, liveSourcesChecked,
  total: catalog.length, playable: playable.length, unanimated: catalog.length - playable.length,
  grade3II: { total: grade.length, playable: grade.filter(c => hanjaStrokeData(c)).length,
    remaining: grade.filter(c => !hanjaStrokeData(c)).map(c => c.glyph) }, prebuildRun: false }, null, 2))
