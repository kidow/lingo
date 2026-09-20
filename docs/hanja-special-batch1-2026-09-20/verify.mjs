/** Read-only reproduction, coverage and next-batch derivation. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateSpecialBatch1DictionaryBundle } from '../../scripts/hanja-stroke-dictionary-special-batch1.ts'
import { plan, PREFERENCE } from '../hanja-special-inventory-2026-09-20/plan.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 64_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-special-batch1.json'), compiled.runtime)
validateSpecialBatch1DictionaryBundle()
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const files = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
const characters = files.flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
assert.equal(new Set(characters.map(e => e.glyph)).size, characters.length)
const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0), appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
for (const e of compiled.review.entries.filter(e => e.decision === 'matched')) assert.ok(hanjaStrokeData(e))
for (const e of compiled.review.entries.filter(e => e.decision === 'held'))
  assert.equal(hanjaStrokeData({ glyph: e.glyph, strokes: e.strokes }), null)
const observations = read('observations.json')
const approved = observations.entries.filter(e => e.decision === 'matched')
const heldEntries = observations.entries.filter(e => e.decision === 'held')
const corrected = approved.filter(e => e.initialDecision !== 'matched')
const authored = compiled.review.entries.flatMap(e => e.sourceStrokeIndices).filter(i => i === null).length
const reordered = corrected.filter(e => e.permutation).length
const inventory = read('../hanja-special-inventory-2026-09-20/inventory.json')
const dictionary = read('../hanja-special-inventory-2026-09-20/dictionary-inventory.json')
const records = snapshot => snapshot.rows.map(row => Object.fromEntries(snapshot.fields.map((key, i) => [key, row[i]])))
const candidates = records(inventory), sources = records(dictionary), planned = plan()
// A glyph held for a component form the licensed corpora do not share stays out of the queue
// until a source with that form exists; otherwise every later batch would re-hold it.
const docsDir = new URL('../', import.meta.url)
const heldElsewhere = new Set(readdirSync(docsDir)
  .filter(name => /^hanja-special-batch\d+-/.test(name))
  .flatMap(name => {
    try { return JSON.parse(readFileSync(new URL(name + '/observations.json', docsDir), 'utf8')).entries }
    catch { return [] }
  })
  .filter(entry => entry.decision === 'held').map(entry => entry.glyph))
const pending = planned.summary.actionQueue.wholeStrokeReview.glyphs
  .filter(g => !hanjaStrokeData(characters.find(c => c.glyph === g)) && !heldElsewhere.has(g))
const entries = pending.slice(0, 50).map(glyph => {
  const candidate = candidates.find(c => c.glyph === glyph), source = sources.find(s => s.glyph === glyph)
  const matching = PREFERENCE.filter(id => candidate[id + 'Strokes'] === candidate.catalogStrokes)
  assert.ok(matching.length)
  return { glyph, strokes: candidate.catalogStrokes, dictionaryUrl: source.svgUrl, dictionarySha256: source.svgSha256,
    candidate: matching[0], matchingCandidates: matching,
    candidateSourceUrl: inventory.geometry[matching[0]].url,
    candidateSourceSha256: inventory.geometry[matching[0]].sha256,
    status: 'awaiting-complete-order-direction-boundary-and-form-review' }
})
const nextBatch = { ...planned.nextBatch, title: '특급 다음 전체 획 검토 후보',
  characters: entries.length, strokes: entries.reduce((n, e) => n + e.strokes, 0), entries }
const progress = {
  date: '2026-09-20', batch: { reviewed: 50, reviewedStrokes: compiled.review.reviewedStrokes,
    applied: compiled.review.approvedCharacters, appliedStrokes: compiled.review.approvedStrokes,
    corrected: corrected.length, reorderedCharacters: reordered, locallyCorrectedPaths: authored,
    retainedPaths: compiled.review.approvedStrokes - authored,
    held: heldEntries.length, heldGlyphs: heldEntries.map(e => e.glyph) },
  overall: summarize(characters),
  byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  next: { task: 'Review the next 50 eligible special grade characters', first: entries[0].glyph,
    last: entries.at(-1).glyph, characters: entries.length, strokes: nextBatch.strokes,
    eligibleUnreviewedCharacters: pending.length, heldOutOfQueue: [...heldElsewhere] },
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, specialBatch1ApprovalsComplete: true, progress, nextBatch }, null, 2))
