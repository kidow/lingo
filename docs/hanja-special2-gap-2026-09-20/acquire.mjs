/** Read-only pinned licensed-candidate extraction for the special grade II characters whose licensed
 *  candidate is exactly one stroke away from the catalog count. Same shape as a batch originals.json,
 *  so serve.py and gap.mjs can read it; nothing here is an approval. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE,
  TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
const read = file => readFileSync(new URL(file, import.meta.url))
export async function acquire() {
  const blocked = JSON.parse(read('../hanja-special2-queue-2026-09-20/blocked.json'))
  const inventory = JSON.parse(read('../hanja-special2-inventory-2026-09-18/dictionary-inventory.json'))
  const dictionary = inventory.rows.map(row => Object.fromEntries(inventory.fields.map((key, i) => [key, row[i]])))
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
  // The corpus is the first one carrying the glyph, in the queue's preference order.
  const records = [...blocked.groups.candidateOneStrokeShort, ...blocked.groups.candidateOtherGap]
  const entries = records.map(record => {
    const corpus = ['Ja', 'MM', 'Hans', 'Hant', 'Ko'].find(id => record.corpora[id] !== undefined)
    const candidate = candidates.get(corpus).get(record.glyph)
    assert.equal(candidate.medians.length, record.corpora[corpus])
    const source = dictionary.find(row => row.glyph === record.glyph)
    assert.equal(source.svgTitle, record.glyph)
    return { glyph: record.glyph, radical: record.radical, strokes: record.catalogStrokes, candidateStrokes: candidate.medians.length,
      corpus, matchingCandidates: Object.keys(record.corpora), medians: candidate.medians,
      originalMediansSha256: createHash('sha256').update(JSON.stringify(candidate.medians)).digest('hex'),
      paths: normalizeMedians(candidate.medians),
      dictionary: { url: source.svgUrl, bytes: source.svgBytes, sha256: source.svgSha256 } }
  })
  return { schemaVersion: 1, date: '2026-09-20',
    purpose: 'Licensed original geometry for the one-stroke-gap re-examination; no approval.',
    sources, entries, characters: entries.length,
    catalogStrokes: entries.reduce((n, e) => n + e.strokes, 0), proprietaryAssetsSaved: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await acquire()))
