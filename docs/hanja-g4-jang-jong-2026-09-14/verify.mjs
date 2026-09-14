import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { validateDictionaryBundle, validateDictionaryProofs } from '../../scripts/hanja-stroke-dictionary.ts'

const read = file => readFileSync(new URL(file, import.meta.url), 'utf8')
const json = file => JSON.parse(read(file))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
validateDictionaryProofs()
validateDictionaryBundle()
const review = json('./review.json'), candidates = json('./candidate-paths.json').entries
assert.equal(hash(read('./candidate-paths.json')), review.candidateFileSha256)
assert.equal(hash(read('./observations.json')), review.observationsSha256)
assert.deepEqual(candidates.map(e => e.glyph), ['獎', '鍾'])
for (const candidate of candidates) {
  const runtime = HANJA_STROKES.filter(e => e.glyph === candidate.glyph)
  assert.equal(runtime.length, 1)
  assert.deepEqual(runtime[0].paths, candidate.paths)
  assert.equal(runtime[0].pathsSha256, hash(JSON.stringify(candidate.paths)))
  assert.equal(runtime[0].verificationSource, 'ehanja-crosschecked')
  assert.deepEqual(review.entries.find(e => e.glyph === candidate.glyph).approvedStrokes,
    candidate.paths.map((_, i) => i + 1))
}
const online = []
if (process.argv.includes('--online')) {
  const sourceRows = json('../hanja-g4-held-11-2026-09-14/sources.json').entries
  const resources = [
    ...sourceRows.filter(e => candidates.some(c => c.glyph === e.glyph)).map(e => ({ name: e.glyph, url: e.sourceUrl, bytes: e.sourceBytes, sha256: e.sourceSha256 })),
    ...json('./observations.json').dependencies.map(e => ({ ...e, name: e.url.split('/').at(-1) })),
  ]
  for (const resource of resources) {
    const response = await fetch(resource.url, { signal: AbortSignal.timeout(20000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, resource.bytes)
    assert.equal(hash(bytes), resource.sha256)
    online.push({ name: resource.name, status: 200, bytes: bytes.length, sha256: hash(bytes) })
  }
}
console.log(JSON.stringify({ result: 'passed', characters: candidates.length,
  strokes: candidates.reduce((n, e) => n + e.paths.length, 0), runtimeCharacters: HANJA_STROKES.length, online }, null, 2))
