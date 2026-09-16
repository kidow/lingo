/** Read-only licensed 熙 extraction. Network bytes remain in memory. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'

export async function acquire() {
  const batch = JSON.parse(readFileSync(new URL('../hanja-g2-count-review-2026-09-16/next-batch.json', import.meta.url)))
  assert.equal(batch.entries.length, 1)
  const entry = batch.entries[0]
  assert.equal(entry.glyph, '熙')
  assert.equal(entry.strokes, 14)
  const pin = MAKE_ME_A_HANZI_SOURCE
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(45000) })
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  const candidate = parseCandidates(bytes, pin).find(c => c.character === entry.glyph)
  assert.equal(candidate.medians.length, entry.strokes)
  const previous = JSON.parse(readFileSync(new URL('../hanja-g2-count-review-2026-09-16/source-checks.json', import.meta.url)))
    .entries.find(e => e.glyph === entry.glyph)
  const { status, ...dictionary } = previous.dictionary
  assert.equal(status, 200)
  return { schemaVersion: 1, date: '2026-09-16', purpose: 'Licensed original geometry for review; no approval.',
    sources: { MM: { ...pin, bytes: bytes.length } }, entries: [{
      glyph: entry.glyph, strokes: entry.strokes, corpus: 'MM', medians: candidate.medians,
      originalMediansSha256: createHash('sha256').update(JSON.stringify(candidate.medians)).digest('hex'),
      paths: normalizeMedians(candidate.medians), dictionary,
    }], characters: 1, strokes: 14, proprietaryAssetsSaved: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await acquire()))
