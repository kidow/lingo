/** Print licensed candidates only. Proprietary dictionary geometry is never saved. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { parseCandidates } from '../../scripts/hanja-stroke-audit.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root)))
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const audit = read('docs/hanja-special2-variants-2026-09-21/audit.json')
const selection = [['纛', 'Ja'], ['蘿', 'Ja'], ['藺', 'Ja'], ['鱉', 'MM'],
  ['宬', 'Hans'], ['嘯', 'Ja'], ['瀟', 'MM'], ['嘴', 'Ja']]
const sources = {}, corpora = {}
for (const id of new Set(selection.map(([, id]) => id))) {
  const pin = audit.corpora[id]
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(180000) })
  assert.equal(response.status, 200)
  const bytes = new Uint8Array(await response.arrayBuffer())
  assert.equal(sha(bytes), pin.sha256)
  sources[id] = { ...pin, bytes: bytes.length }
  corpora[id] = new Map(parseCandidates(bytes, pin).map(c => [c.character, c]))
}
const entries = selection.map(([glyph, corpus]) => {
  const record = audit.records.find(r => r.glyph === glyph)
  const option = record.matchingCandidates.find(c => c.corpus === corpus)
  const candidate = corpora[corpus].get(glyph)
  assert.equal(sha(JSON.stringify(candidate)), option.candidateSha256)
  assert.equal(candidate.medians.length, record.dictionaryStrokes)
  const staticSvg = 'public/hanja/u' + glyph.codePointAt(0).toString(16) + '.svg'
  return { glyph, corpus, catalogStrokes: record.catalogStrokes, strokes: record.dictionaryStrokes,
    candidateSha256: option.candidateSha256, medians: candidate.medians,
    originalMediansSha256: sha(JSON.stringify(candidate.medians)), paths: normalizeMedians(candidate.medians),
    dictionary: { url: record.dictionary.url, bytes: record.dictionary.bytes, sha256: record.dictionary.sha256 },
    staticSvg: { path: staticSvg, sha256: sha(readFileSync(new URL(staticSvg, root))) },
    numericalScreen: { angles: option.angles, overSixty: option.overSixty, possibleNeighbourSwaps: option.possibleNeighbourSwaps } }
})
assert.equal(entries.reduce((sum, entry) => sum + entry.strokes, 0), 148)
console.log(JSON.stringify({ schemaVersion: 1, date: '2026-09-21',
  purpose: 'Unmodified licensed candidates for full visual review; not runtime approval.',
  sources, proprietaryAssetsSaved: 0, entries }))
