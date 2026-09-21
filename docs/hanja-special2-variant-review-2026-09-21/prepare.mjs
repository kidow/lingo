/** Print licensed candidates for visual review. No proprietary geometry is downloaded or saved here. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { parseCandidates } from '../../scripts/hanja-stroke-audit.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const queue = read('docs/hanja-special2-variants-2026-09-21/next-review.json')
const audit = read('docs/hanja-special2-variants-2026-09-21/audit.json')
const alternate = process.argv.includes('--alternate-kui')
const corpus = alternate ? 'Hans' : 'Ja'
const source = audit.corpora[corpus]
const response = await fetch(source.url, { signal: AbortSignal.timeout(180000) })
assert.equal(response.status, 200)
const bytes = new Uint8Array(await response.arrayBuffer())
const candidates = new Map(parseCandidates(bytes, source).map(c => [c.character, c]))
const entries = queue.priorityReview.filter(item => !alternate || item.glyph === '夔').map(item => {
  const candidate = candidates.get(item.glyph)
  const option = item.candidateOptions.find(c => c.corpus === corpus)
  assert.ok(option)
  assert.equal(hash(JSON.stringify(candidate)), option.sha256)
  assert.equal(candidate.medians.length, item.playbackCandidateStrokes)
  const dictionary = audit.records.find(r => r.glyph === item.glyph).dictionary
  assert.equal(dictionary.sha256, item.dictionarySha256)
  const staticSvg = 'public/hanja/u' + item.glyph.codePointAt(0).toString(16) + '.svg'
  return { glyph: item.glyph, catalogStrokes: item.catalogStrokes, strokes: item.playbackCandidateStrokes,
    corpus, candidateSha256: option.sha256, medians: candidate.medians,
    originalMediansSha256: hash(JSON.stringify(candidate.medians)), paths: normalizeMedians(candidate.medians),
    dictionary: { url: dictionary.url, bytes: dictionary.bytes, sha256: dictionary.sha256 },
    staticSvg: { path: staticSvg, sha256: hash(readFileSync(new URL(staticSvg, root))) } }
})
assert.equal(entries.length, alternate ? 1 : 16)
assert.equal(entries.reduce((sum, e) => sum + e.strokes, 0), alternate ? 21 : 207)
console.log(JSON.stringify({ schemaVersion: 1, date: '2026-09-21',
  purpose: 'Unmodified licensed candidates; pending full visual review, not runtime approval.',
  sources: { [corpus]: { ...source, bytes: bytes.length } }, proprietaryAssetsSaved: 0, entries }))
