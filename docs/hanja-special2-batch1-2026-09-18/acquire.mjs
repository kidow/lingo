/** Read-only pinned licensed-candidate extraction. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, JAPANESE_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
const read = file => readFileSync(new URL(file, import.meta.url))
export async function acquire() {
  const batch = JSON.parse(read('../hanja-special2-inventory-2026-09-18/next-batch.json'))
  const inventory = JSON.parse(read('../hanja-special2-inventory-2026-09-18/dictionary-inventory.json'))
  const dictionary = inventory.rows.map(row => Object.fromEntries(inventory.fields.map((key, i) => [key, row[i]])))
  const pins = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE }
  const sources = {}, candidates = new Map()
  for (const [id, pin] of Object.entries(pins)) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(120000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(createHash('sha256').update(bytes).digest('hex'), pin.sha256)
    candidates.set(id, new Map(parseCandidates(bytes, pin).map(c => [c.character, c])))
    sources[id] = { ...pin, bytes: bytes.length }
  }
  const entries = batch.entries.map(entry => {
    const candidate = candidates.get(entry.candidate).get(entry.glyph)
    assert.equal(candidate.medians.length, entry.strokes)
    const source = dictionary.find(row => row.glyph === entry.glyph)
    assert.equal(source.svgTitle, entry.glyph)
    return { glyph: entry.glyph, strokes: entry.strokes, corpus: entry.candidate, medians: candidate.medians,
      originalMediansSha256: createHash('sha256').update(JSON.stringify(candidate.medians)).digest('hex'),
      paths: normalizeMedians(candidate.medians),
      dictionary: { url: source.svgUrl, bytes: source.svgBytes, sha256: source.svgSha256 } }
  })
  return { schemaVersion: 1, date: '2026-09-18', purpose: 'Licensed original geometry for review; no approval.',
    sources, entries, characters: entries.length, strokes: entries.reduce((n, e) => n + e.strokes, 0), proprietaryAssetsSaved: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await acquire()))
