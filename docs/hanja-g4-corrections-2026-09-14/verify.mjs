import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { validateDictionaryBundle, validateDictionaryProofs } from '../../scripts/hanja-stroke-dictionary.ts'

const read = file => readFileSync(new URL(file, import.meta.url), 'utf8')
const json = file => JSON.parse(read(file))
const digest = value => createHash('sha256').update(value).digest('hex')
validateDictionaryProofs()
validateDictionaryBundle()
const review = json('./review.json')
const candidates = json('./candidate-paths.json').entries
assert.equal(digest(read('./candidate-paths.json')), review.candidateFileSha256)
assert.equal(review.sourceArtworkCopied, false)
assert.deepEqual(candidates.map(e => e.glyph), ['冊', '灰', '姉'])
for (const candidate of candidates) {
  const approved = HANJA_STROKES.filter(e => e.glyph === candidate.glyph)
  assert.equal(approved.length, 1)
  assert.deepEqual(approved[0].paths, candidate.paths)
  assert.equal(approved[0].pathsSha256, digest(JSON.stringify(candidate.paths)))
  assert.equal(approved[0].verificationSource, 'ehanja-crosschecked')
  const proof = review.entries.find(e => e.glyph === candidate.glyph)
  assert.deepEqual(proof.approvedStrokes, candidate.paths.map((_, i) => i + 1))
}
const online = []
if (process.argv.includes('--online')) {
  const sources = json('../hanja-g4-held-11-2026-09-14/sources.json').entries
  for (const { glyph } of candidates) {
    const source = sources.find(e => e.glyph === glyph)
    const response = await fetch(source.sourceUrl, { signal: AbortSignal.timeout(20000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(bytes.length, source.sourceBytes)
    assert.equal(digest(bytes), source.sourceSha256)
    online.push({ glyph, status: response.status, bytes: bytes.length, sha256: digest(bytes) })
  }
}
console.log(JSON.stringify({ result: 'passed', approvedCharacters: candidates.length,
  approvedStrokes: candidates.reduce((n, e) => n + e.paths.length, 0),
  runtimeCharacters: HANJA_STROKES.length, online }, null, 2))
