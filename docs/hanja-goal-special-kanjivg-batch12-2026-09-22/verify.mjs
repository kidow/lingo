/** Check research metadata and exact public-path identities; not visual approval. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const read = n => JSON.parse(readFileSync(new URL(n, import.meta.url), 'utf8'))
const source = read('candidates.json'), finding = read('findings.json'), inventory = read('next-inventory.json')
assert.equal(source.revision, '422b5538595676da918c288a4230cb5e22a1ee7e')
assert.equal(source.license.spdx, 'CC-BY-SA-3.0')
assert.equal(finding.runtimeAdded, 0)
const review = finding.entries[0], base = source.entries.find(e => e.candidate.id === review.candidate)
assert.equal(base.paths.length, 25)
assert.equal(base.catalogStrokes, 25)
assert.equal(base.dictionaryStrokes, 26)
assert.equal(review.reviewedStrokes.length, 25)
assert.equal(review.reviewedDictionaryStrokes.length, 26)
assert.equal(review.comparisonMapping.length, 26)
assert.equal(review.comparisonMapping[7], null)
assert.deepEqual(review.comparisonMapping.filter(i => i !== null), Array.from({ length: 25 }, (_, i) => i + 1))
for (const alt of review.alternatives) {
  const entry = source.entries.find(e => e.candidate.id === alt.id)
  assert.equal(entry.paths.length, 25)
  alt.pathIdentityMappingToBase.forEach((j, i) => {
    if (j !== null) assert.equal(entry.paths[i], base.paths[j - 1])
    else assert.notEqual(entry.paths[i], base.paths[i])
  })
}
assert.equal(HANJA_STROKES.some(e => e.glyph === '釁'), false)
const dir = new URL('../../content/hanja/characters/', import.meta.url)
const catalog = readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const registered = new Set(HANJA_STROKES.map(e => e.glyph))
assert.equal(catalog.filter(e => !registered.has(e.glyph)).length, inventory.missing)
assert.equal(inventory.entries.length, 177)
assert.equal(inventory.entries.reduce((n, e) => n + e.sources.length, 0), 298)
for (const row of inventory.entries) {
  assert.equal(registered.has(row.glyph), false)
  assert.equal(row.matchesDomesticCount, !!row.dictionary && row.sources.some(s => s.strokes === row.dictionary.strokes))
  for (const s of row.sources) { assert.match(s.sha256, /^[a-f0-9]{64}$/); assert.ok(s.strokes > 0); assert.ok(s.url.includes(inventory.revision)) }
}
assert.deepEqual(inventory.domesticCountMatchUnheldGlyphs, inventory.entries.filter(e => e.matchesDomesticCount && !e.recentHold).map(e => e.glyph))
console.log(JSON.stringify({ reviewedPaths: 25, domesticSteps: 26, runtimeAdded: 0, missing: inventory.missing, sourceGlyphs: 177, sourceFiles: 298, countMatchingUnheld: inventory.domesticCountMatchUnheldGlyphs }))
