/** Read-only: classify the special grade II characters that are still unreviewed, using only the
 *  2026-09-18 inventory files and the published runtime. Nothing is fetched and nothing is approved. */
import { readFileSync, readdirSync } from 'node:fs'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const inventory = read('docs/hanja-special2-inventory-2026-09-18/inventory.json')
const dictionary = read('docs/hanja-special2-inventory-2026-09-18/dictionary-inventory.json')
const field = (list, name) => list.indexOf(name)
const gi = field(inventory.fields, 'glyph'), ci = field(inventory.fields, 'catalogStrokes')
const mm = field(inventory.fields, 'MMStrokes'), ja = field(inventory.fields, 'JaStrokes')
const ko = field(inventory.fields, 'KoStrokes'), pm = field(inventory.fields, 'publisherMatch')
const dg = field(dictionary.fields, 'glyph'), ds = field(dictionary.fields, 'displayedStrokes')
const displayed = new Map(dictionary.rows.map(r => [r[dg], r[ds]]))

const reviewed = new Set()
for (const name of readdirSync(new URL('public/hanja-strokes/', root)))
  if (name.startsWith('dictionary-reviewed-special2-'))
    for (const entry of read('public/hanja-strokes/' + name).characters) reviewed.add(entry.glyph)
// Characters that reached a review and were held there are a separate class from the ones intake never admitted.
const heldGlyphs = new Set()
for (const name of readdirSync(new URL('docs/', root)))
  if (name.startsWith('hanja-special2-batch'))
    for (const entry of read('docs/' + name + '/observations.json').entries)
      if (entry.decision === 'held') heldGlyphs.add(entry.glyph)

const groups = { eligibleAgain: [], textbookSource: [], heldAfterReview: [], dictionaryCountDiffers: [], candidateCountDiffers: [], noCandidate: [] }
for (const row of inventory.rows) {
  const glyph = row[gi]
  if (reviewed.has(glyph)) continue
  const catalog = row[ci], shown = displayed.get(glyph)
  const candidates = { MM: row[mm], Ja: row[ja], Ko: row[ko] }
  const record = { glyph, catalogStrokes: catalog, dictionaryStrokes: shown, candidates }
  if (heldGlyphs.has(glyph)) { groups.heldAfterReview.push(record); continue }
  if (row[pm] !== 'absent') { groups.textbookSource.push(record); continue }
  if (shown !== catalog) { groups.dictionaryCountDiffers.push(record); continue }
  if (Object.values(candidates).includes(catalog)) { groups.eligibleAgain.push(record); continue }
  if (Object.values(candidates).some(Boolean)) {
    const drawn = Object.values(candidates).filter(Boolean)
    record.shortestGap = Math.min(...drawn.map(n => Math.abs(n - catalog)))
    groups.candidateCountDiffers.push(record)
    continue
  }
  groups.noCandidate.push(record)
}
const strokes = list => list.reduce((n, e) => n + e.catalogStrokes, 0)
const summary = Object.fromEntries(Object.entries(groups)
  .map(([name, list]) => [name, { characters: list.length, strokes: strokes(list) }]))
summary.candidateGapHistogram = groups.candidateCountDiffers
  .reduce((counts, e) => ({ ...counts, [e.shortestGap]: (counts[e.shortestGap] ?? 0) + 1 }), {})
summary.dictionaryCountDiffersWithMatchingCandidate = groups.dictionaryCountDiffers
  .filter(e => Object.values(e.candidates).includes(e.dictionaryStrokes)).length

console.log(JSON.stringify({
  schemaVersion: 1, date: '2026-09-20',
  purpose: 'Why the eligible special grade II queue is empty: classification of the characters that intake still rejects.',
  inputs: ['docs/hanja-special2-inventory-2026-09-18/inventory.json',
    'docs/hanja-special2-inventory-2026-09-18/dictionary-inventory.json',
    'public/hanja-strokes/dictionary-reviewed-special2-*.json'],
  intakeRule: 'A character enters the review queue when the dictionary title and metadata are consistent, the dictionary stroke count equals the catalog count, and at least one licensed candidate corpus carries the same count.',
  reviewedCharacters: reviewed.size, summary, groups,
}, null, 2))
