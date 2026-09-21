/** Provenance/coverage checks only; not full visual approval. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url)))
const data = read('candidates.json')
const inventory = read('inventory.json')
const findings = read('findings.json')
const checks = read('source-checks.json')
const previous = read('../hanja-special2-direction-review-2026-09-21/originals.json')
const repository = inventory.repositories.find(r => r.repo === 'KanjiVG/kanjivg')
assert.equal(repository.treeTruncated, false)
assert.equal(repository.revision, '422b5538595676da918c288a4230cb5e22a1ee7e')
assert.equal(data.license, 'CC-BY-SA-3.0')
assert.equal(data.entries.length, 7)
assert.deepEqual(findings.reviewedGlyphs, [...'纛蘿藺鱉宬'])
assert.equal(findings.referenceStrokes, 96)
assert.equal(findings.fullStrokeReviewCompleted, false)
assert.equal(findings.runtimeApprovalsAdded, 0)
assert.equal(findings.authoredGeometryPoints, 0)
assert.equal(data.proprietaryAssetsSaved, 0)
assert.equal(findings.proprietaryAssetsSaved, 0)
let hotspots = 0
for (const entry of data.entries) {
  const result = findings.candidates.find(r => r.id === entry.id)
  const tree = repository.glyphs.find(r => r.glyph === entry.glyph)
  const file = tree.files.find(f => f.path === 'kanji/' + entry.id + '.svg')
  const original = previous.entries.find(r => r.glyph === entry.glyph)
  assert.equal(entry.blobSha1, file.blobSha1)
  assert.equal(entry.bytes, file.bytes)
  assert.equal(entry.revision, repository.revision)
  assert.equal(entry.url, 'https://raw.githubusercontent.com/KanjiVG/kanjivg/' + repository.revision + '/' + file.path)
  assert.deepEqual(entry.dictionary, original.dictionary)
  assert.equal(entry.dictionaryStrokes, original.strokes)
  assert.equal(entry.catalogStrokes, original.catalogStrokes)
  assert.equal(entry.runtimeApproved, false)
  assert.equal(result.runtimeApproved, false)
  assert.equal(result.svgSha256, entry.svgSha256)
  assert.equal(result.strokes, entry.strokes.length)
  assert.equal(entry.viewBox, '0 0 109 109')
  assert.ok(entry.strokes.every(s => s.path && s.type))
  assert.deepEqual(entry.strokes.map(s => s.index), Array.from({length: entry.strokes.length}, (_, i) => i + 1))
  assert.equal(result.fullFormCompared, true)
  assert.ok(checks.visits.some(v => v.id === entry.id && v.view === 'forms'))
  for (const pair of result.reviewedPairs) {
    assert.ok(pair[0] > 0 && pair[0] <= entry.dictionaryStrokes)
    assert.ok(pair[1] > 0 && pair[1] <= entry.strokes.length)
    assert.ok(checks.visits.some(v => v.id === entry.id && v.view === 'strokes'
      && v.pairs.some(p => p[0] === pair[0] && p[1] === pair[1])))
    hotspots++
  }
}
assert.equal(hotspots, 19)
const shortlisted = findings.candidates.filter(c => c.decision === 'shortlisted-awaiting-full-review')
assert.deepEqual(shortlisted.map(c => c.id), findings.shortlist.ids)
assert.equal(shortlisted.reduce((n, c) => n + c.strokes, 0), 65)
assert.deepEqual(findings.shortlist.glyphs, [...'纛蘿藺'])
assert.equal(findings.unresolved.reduce((n, c) => n + c.strokes, 0), 31)
for (const glyph of [...'鱉宬']) assert.equal(repository.glyphs.find(r => r.glyph === glyph).files.length, 0)
assert.equal(inventory.repositories.find(r => r.repo === 'parsimonhi/animCJK').revision, 'ec5e17cca76c87587790bcbce5ea0b4d4fb753d6')
assert.equal(inventory.repositories.find(r => r.repo === 'skishore/makemeahanzi').revision, 'bddc96d41bef78427ed0e034e9f7e31d71fd1b92')
const characters = readdirSync(new URL('../../content/hanja/characters/', import.meta.url))
  .filter(f => f.endsWith('.json')).flatMap(f => read('../../content/hanja/characters/' + f).characters)
for (const glyph of findings.reviewedGlyphs) assert.equal(hanjaStrokeData(characters.find(c => c.glyph === glyph)), null)
const special2 = read('../../content/hanja/characters/special-2.json').characters
const applied = characters.filter(c => hanjaStrokeData(c)).length
const runtime = { applied, total: characters.length, remaining: characters.length - applied,
  special2Applied: special2.filter(c => hanjaStrokeData(c)).length, special2Total: special2.length }
assert.deepEqual(runtime, findings.runtimeSnapshot)
console.log(JSON.stringify({ pass: true, licensedCandidateFiles: 7, comparedForms: 7,
  inspectedHotspotPairs: hotspots, shortlistedCharacters: 3, shortlistedStrokes: 65,
  fullStrokeReviewCompleted: false, unresolvedCharacters: 2, unresolvedReferenceStrokes: 31,
  runtimeApprovalsAdded: 0, proprietaryAssetsSaved: 0, runtime }, null, 2))
