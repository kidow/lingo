/** Read-only: the grade 1 review queue recomputed against all five pinned candidate corpora,
 *  including the two AnimCJK files (ZhHant, ZhHans) of the same revision that earlier rounds did not read.
 *  Downloads only pinned bytes, verifies their hashes and prints counts; nothing proprietary is stored. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE,
  TRADITIONAL_CANDIDATE_SOURCE, SIMPLIFIED_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
const root = new URL('../../', import.meta.url)
const read = p => JSON.parse(readFileSync(new URL(p, root), 'utf8'))
const reviewed = new Set()
for (const name of readdirSync(new URL('public/hanja-strokes/', root)))
  if (name.endsWith('.json')) for (const c of (read('public/hanja-strokes/' + name).characters || [])) reviewed.add(c.glyph)
const held = new Set()
for (const name of readdirSync(new URL('docs/', root)))
  if (name.startsWith('hanja-g1-batch'))
    for (const e of read('docs/' + name + '/observations.json').entries) if (e.decision === 'held') held.add(e.glyph)
const cat = read('content/hanja/characters/g1.json').characters
const dic = read('docs/hanja-g1-inventory-2026-09-18/dictionary-inventory.json')
const di = Object.fromEntries(dic.fields.map((f, i) => [f, i]))
const rows = new Map(dic.rows.map(r => [r[di.glyph], r]))
const pins = { Ko: CANDIDATE_SOURCE, Ja: JAPANESE_CANDIDATE_SOURCE, MM: MAKE_ME_A_HANZI_SOURCE,
  Hant: TRADITIONAL_CANDIDATE_SOURCE, Hans: SIMPLIFIED_CANDIDATE_SOURCE }
const corpora = {}
for (const [id, pin] of Object.entries(pins)) {
  const res = await fetch(pin.url, { signal: AbortSignal.timeout(300000) })
  const bytes = Buffer.from(await res.arrayBuffer())
  assert.equal(createHash('sha256').update(bytes).digest('hex'), pin.sha256, id)
  corpora[id] = new Map(parseCandidates(bytes, pin).map(c => [c.character, c]))
}
const picks = []
for (const c of cat) {
  if (reviewed.has(c.glyph)) continue
  const row = rows.get(c.glyph)
  const shown = row?.[di.displayedStrokes]
  const ok = ['Ko', 'MM', 'Ja', 'Hant', 'Hans'].filter(id => corpora[id].get(c.glyph)?.strokes.length === c.strokes)
  if (shown === c.strokes && ok.length) picks.push({ glyph: c.glyph, strokes: c.strokes, corpora: ok, heldBefore: held.has(c.glyph) })
}
console.log(JSON.stringify({
  schemaVersion: 1, date: '2026-09-20',
  purpose: 'Grade 1 review queue recomputed with all five pinned corpora. Intake conditions unchanged: exact dictionary title and metadata, dictionary stroke count equal to the catalog count, and a licensed candidate with the same count.',
  corpora: Object.fromEntries(Object.entries(pins).map(([id, pin]) => [id, { url: pin.url, sha256: pin.sha256 }])),
  reviewedCharacters: reviewed.size, proprietaryAssetsSaved: 0,
  eligible: picks.length, strokes: picks.reduce((n, p) => n + p.strokes, 0),
  fresh: picks.filter(p => !p.heldBefore).map(p => ({ glyph: p.glyph, strokes: p.strokes, corpora: p.corpora })),
  previouslyHeld: picks.filter(p => p.heldBefore).map(p => ({ glyph: p.glyph, strokes: p.strokes, corpora: p.corpora })),
}, null, 2))
