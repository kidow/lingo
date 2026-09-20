/** Read-only pinned licensed-candidate extraction. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE,
  TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
const read = file => readFileSync(new URL(file, import.meta.url))
export async function acquire() {
  const batch = JSON.parse(read('../hanja-special-batch2-2026-09-20/next-batch.json'))
  const inventory = JSON.parse(read('../hanja-special-inventory-2026-09-20/dictionary-inventory.json'))
  const dictionary = inventory.rows.map(row => Object.fromEntries(inventory.fields.map((key, i) => [key, row[i]])))
  // The special grade keeps all five pinned corpora on the table; the starting corpus comes from the queue.
  const pins = { MM: MAKE_ME_A_HANZI_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, Ko: CANDIDATE_SOURCE,
    Hant: TRADITIONAL_CANDIDATE_SOURCE, Hans: SIMPLIFIED_CANDIDATE_SOURCE }
  const sources = {}, candidates = new Map()
  for (const [id, pin] of Object.entries(pins)) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(300000) })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.equal(createHash('sha256').update(bytes).digest('hex'), pin.sha256)
    candidates.set(id, new Map(parseCandidates(bytes, pin).map(c => [c.character, c])))
    sources[id] = { ...pin, bytes: bytes.length }
  }
  // A per-glyph override may replace the inventory's starting corpus; see selection.json for the reason.
  const selection = JSON.parse(read('selection.json')).overrides
  const entries = batch.entries.map(entry => {
    const override = selection[entry.glyph]
    if (override) assert.equal(override.startingCorpus, entry.candidate)
    const corpus = override?.corpus ?? entry.candidate
    assert.ok(entry.matchingCandidates.includes(corpus))
    const candidate = candidates.get(corpus).get(entry.glyph)
    assert.equal(candidate.medians.length, entry.strokes)
    const source = dictionary.find(row => row.glyph === entry.glyph)
    assert.equal(source.svgTitle, entry.glyph)
    // Every corpus that carries the same stroke count stays on the record; a form mismatch in the
    // starting corpus is then re-checked against the alternatives instead of becoming a hold.
    const alternatives = Object.fromEntries(entry.matchingCandidates.filter(id => id !== corpus)
      .map(id => [id, normalizeMedians(candidates.get(id).get(entry.glyph).medians)]))
    return { glyph: entry.glyph, strokes: entry.strokes, corpus,
      matchingCandidates: entry.matchingCandidates, medians: candidate.medians,
      originalMediansSha256: createHash('sha256').update(JSON.stringify(candidate.medians)).digest('hex'),
      paths: normalizeMedians(candidate.medians), alternatives,
      dictionary: { url: source.svgUrl, bytes: source.svgBytes, sha256: source.svgSha256 } }
  })
  return { schemaVersion: 1, date: '2026-09-20', purpose: 'Licensed original geometry for review; no approval.',
    sources, entries, characters: entries.length, strokes: entries.reduce((n, e) => n + e.strokes, 0), proprietaryAssetsSaved: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await acquire()))
