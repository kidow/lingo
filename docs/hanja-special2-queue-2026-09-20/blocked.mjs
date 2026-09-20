/** Read-only: classify the special grade II characters that are still unreviewed, against all five pinned
 *  candidate corpora and the 2026-09-18 dictionary inventory. Downloads only pinned bytes, verifies their
 *  hashes and prints counts; nothing proprietary is stored and nothing is approved here. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE,
  TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const catalog = read('content/hanja/characters/special-2.json').characters
const inventory = read('docs/hanja-special2-inventory-2026-09-18/inventory.json')
const dictionary = read('docs/hanja-special2-inventory-2026-09-18/dictionary-inventory.json')
const ii = Object.fromEntries(inventory.fields.map((f, i) => [f, i]))
const di = Object.fromEntries(dictionary.fields.map((f, i) => [f, i]))
const inventoryRows = new Map(inventory.rows.map(r => [r[ii.glyph], r]))
const displayed = new Map(dictionary.rows.map(r => [r[di.glyph], r[di.displayedStrokes]]))

const reviewed = new Set()
for (const name of readdirSync(new URL('public/hanja-strokes/', root)))
  if (name.endsWith('.json'))
    for (const entry of (read('public/hanja-strokes/' + name).characters ?? [])) reviewed.add(entry.glyph)

const pins = { Ko: CANDIDATE_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, MM: MAKE_ME_A_HANZI_SOURCE,
  Hant: TRADITIONAL_CANDIDATE_SOURCE, Hans: SIMPLIFIED_CANDIDATE_SOURCE }
const corpora = {}
for (const [id, pin] of Object.entries(pins)) {
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(300000) })
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(createHash('sha256').update(bytes).digest('hex'), pin.sha256, id)
  corpora[id] = new Map(parseCandidates(bytes, pin).map(c => [c.character, c.strokes.length]))
}

const groups = { textbookSource: [], dictionaryCountDiffers: [], candidateOneStrokeShort: [], candidateOtherGap: [], noCandidateAnywhere: [] }
for (const character of catalog) {
  const { glyph, strokes, radical } = character
  if (reviewed.has(glyph)) continue
  const shown = displayed.get(glyph)
  const carried = Object.entries(corpora).map(([id, map]) => [id, map.get(glyph)]).filter(([, n]) => n)
  const record = { glyph, radical, catalogStrokes: strokes, dictionaryStrokes: shown,
    corpora: Object.fromEntries(carried) }
  if (inventoryRows.get(glyph)[ii.publisherMatch] !== 'absent') { groups.textbookSource.push(record); continue }
  if (shown !== strokes) { groups.dictionaryCountDiffers.push(record); continue }
  if (!carried.length) { groups.noCandidateAnywhere.push(record); continue }
  record.shortestGap = Math.min(...carried.map(([, n]) => Math.abs(n - strokes)))
  record.allShorter = carried.every(([, n]) => n < strokes)
  ;(record.shortestGap === 1 && record.allShorter ? groups.candidateOneStrokeShort : groups.candidateOtherGap).push(record)
}

const strokesOf = list => list.reduce((n, e) => n + e.catalogStrokes, 0)
const byRadical = list => Object.fromEntries(Object.entries(
  list.reduce((counts, e) => ({ ...counts, [e.radical]: (counts[e.radical] ?? 0) + 1 }), {}))
  .sort((a, b) => b[1] - a[1]).slice(0, 10))
const summary = Object.fromEntries(Object.entries(groups)
  .map(([name, list]) => [name, { characters: list.length, strokes: strokesOf(list), radicals: byRadical(list) }]))
summary.specialTwoReviewed = catalog.filter(c => reviewed.has(c.glyph)).length
summary.specialTwoTotal = catalog.length
summary.dictionaryCountDiffersWithMatchingCandidate = groups.dictionaryCountDiffers
  .filter(e => Object.values(e.corpora).includes(e.dictionaryStrokes)).length

console.log(JSON.stringify({
  schemaVersion: 2, date: '2026-09-20',
  purpose: 'Why the eligible special grade II queue is empty: classification of the characters that intake still rejects, against all five pinned corpora.',
  inputs: ['content/hanja/characters/special-2.json',
    'docs/hanja-special2-inventory-2026-09-18/inventory.json',
    'docs/hanja-special2-inventory-2026-09-18/dictionary-inventory.json',
    'public/hanja-strokes/*.json'],
  corpora: Object.fromEntries(Object.entries(pins).map(([id, pin]) => [id, { url: pin.url, sha256: pin.sha256 }])),
  intakeRule: 'A character enters the review queue when the dictionary title and metadata are consistent, the dictionary stroke count equals the catalog count, and at least one licensed candidate corpus carries the same count.',
  proprietaryAssetsSaved: 0, summary, groups,
}, null, 2))
