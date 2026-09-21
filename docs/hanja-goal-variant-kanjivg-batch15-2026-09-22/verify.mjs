/** Research integrity checks; whole-glyph visual judgments are recorded, not inferred by tests. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const bytes = name => readFileSync(new URL(name, import.meta.url))
const read = name => JSON.parse(bytes(name))
const hashes = {
  "candidates.json": "4b0efefd65eb4263af196a51652ee25454c9eb11e60fe9f65b4d05663e1a7723",
  "findings.json": "04c85071621aac13a2606f3a30a5b27e783ff9e1ae3040f3be24f33757487816",
  "tap-metadata.json": "9c64eaa42c319da70fcdbae904a16dfd50afc649d994af172d0d44bd13e6bf17",
  "next-candidates.json": "5b92b8f9004436a5fdfe796a044d4d04e5bcc5fbb05191b3e9f3157f13f82488"
}
for (const [name, hash] of Object.entries(hashes)) assert.equal(createHash('sha256').update(bytes(name)).digest('hex'), hash)
const source = read('candidates.json'), findings = read('findings.json'), tap = read('tap-metadata.json')
const byId = id => source.entries.find(e => e.candidate.id === id)
assert.equal(source.revision, '422b5538595676da918c288a4230cb5e22a1ee7e')
assert.equal(source.license.spdx, 'CC-BY-SA-3.0')
assert.equal(findings.runtimeAdded, 0)
assert.equal(findings.privateMediaSaved, false)
assert.equal(source.entries.reduce((n,e) => n+e.paths.length,0), 63)
assert.deepEqual(source.entries.map(e=>[e.candidate.id,e.paths.length]), [['053df',10],['053df-VtLst',10],['053df-Hyougai',9],['07be0',17],['07be0-Kaisho',17]])
for (const entry of source.entries) {
  assert.equal(entry.candidate.strokes, entry.paths.length)
  assert.equal(entry.candidate.revision, source.revision)
  assert.ok(entry.paths.every(p=>p.startsWith('M')))
  assert.match(entry.candidate.sha256, /^[0-9a-f]{64}$/)
  assert.match(entry.dictionary.sha256, /^[0-9a-f]{64}$/)
}
for (const entry of findings.entries) {
  assert.equal(entry.decision,'held')
  assert.equal(entry.reviewedStrokes.length, entry.strokes)
  assert.equal(entry.reviewedDictionaryStrokes.length, entry.strokes)
  for (const alt of entry.alternatives) assert.equal(alt.reviewedStrokes.length, byId(alt.id).paths.length)
}
const canonical = p=>p.replace(/[\s,]/g,'')
const base=byId('053df'), alternative=byId('053df-VtLst')
findings.entries[0].comparisonMapping.forEach((j,i)=>assert.equal(canonical(alternative.paths[i]),canonical(base.paths[j-1])))
assert.deepEqual(findings.entries[0].alternatives[1].segmentationMismatch,{domestic:[4,7],candidate:6})
assert.equal(tap.glyph,'搭')
assert.equal(tap.dictionary.title,'搭')
assert.equal(tap.dictionary.httpStatus,200)
assert.equal(tap.dictionary.animated,13)
assert.equal(tap.dictionary.outlines,13)
assert.equal(tap.dictionary.timingSequenceValid,true)
assert.equal(tap.dictionary.clipCoverageValid,true)
assert.equal(tap.privateAssetsSaved,false)
const previous=read('../hanja-goal-special-kanjivg-batch12-2026-09-22/next-inventory.json')
const excluded = new Set(["莽","萸","鱉","宬","瀆","鼈","瞥","髓","鍮","諭","愉","朕","讒","菰","曁","闥","餤","隴","麑","麌","饐","鏘","爨","駸","褊","諞","鐶","敝","釁","褐","菱","塚","迸","叟","篠","禦","祉"])
const remaining = previous.entries.filter(e=>!excluded.has(e.glyph)).map(e=>e.glyph==='搭'?{...e,dictionary:{strokes:tap.dictionary.animated}}:e)
assert.equal(remaining.length,142)
assert.ok(remaining.every(e=>e.dictionary?.strokes && e.sources.every(s=>s.strokes!==e.dictionary.strokes)))
const coverage=read('coverage.json')
assert.equal(coverage.runtime.applied+coverage.runtime.remaining,coverage.runtime.total)
assert.equal(coverage.grades.reduce((n,g)=>n+g.applied,0),coverage.runtime.applied)
assert.equal(coverage.runtime.applied,4963)
console.log(JSON.stringify({primaryPaths:27,alternatePaths:36,domesticSteps:27,runtimeAdded:0,tapDomesticSteps:13,outsideHoldsDifferentCount:remaining.length,snapshotApplied:coverage.runtime.applied,snapshotRemaining:coverage.runtime.remaining}))
