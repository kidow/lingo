/** Read-only reproduction, coverage and next-batch derivation. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2Batch10DictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2-batch10.ts'
import { plan } from '../hanja-g2-inventory-2026-09-15/plan.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-batch10.json'), compiled.runtime)
validateG2Batch10DictionaryBundle()
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
for (const e of compiled.review.entries) assert.ok(hanjaStrokeData(e))
const inventory = read('../hanja-g2-inventory-2026-09-15/inventory.json')
const dictionary = read('../hanja-g2-inventory-2026-09-15/dictionary-inventory.json')
const records = snapshot => snapshot.rows.map(row => Object.fromEntries(snapshot.fields.map((key, i) => [key, row[i]])))
const candidates = records(inventory), sources = records(dictionary), planned = plan()
const catalogByGlyph = new Map(characters.map(c => [c.glyph, c]))
const remainingQueues = Object.fromEntries(Object.entries(planned.summary.actionQueue).map(([key, queue]) => {
  const glyphs = queue.glyphs.filter(g => !hanjaStrokeData(catalogByGlyph.get(g)))
  return [key, { characters: glyphs.length, strokes: glyphs.reduce((n, g) => n + catalogByGlyph.get(g).strokes, 0), glyphs }]
}))
assert.equal(remainingQueues.wholeStrokeReview.characters, 0)
assert.equal(remainingQueues.sourceCountReview.characters, 9)
const entries = remainingQueues.sourceCountReview.glyphs.map(glyph => {
  const candidate = candidates.find(c => c.glyph === glyph), source = sources.find(s => s.glyph === glyph)
  assert.ok(candidate && source)
  assert.notEqual(source.animatedCount, candidate.catalogStrokes)
  return {
    glyph, strokes: candidate.catalogStrokes, dictionaryDisplayedStrokes: source.displayedStrokes,
    dictionaryAnimatedStrokes: source.animatedCount, dictionaryTitle: source.svgTitle,
    dictionaryUrl: source.svgUrl, dictionarySha256: source.svgSha256,
    licensedCandidates: ['Ko', 'MM', 'Ja'].filter(id => candidate[id + 'Strokes'] != null).map(id => ({
      corpus: id, strokes: candidate[id + 'Strokes'],
      sourceUrl: inventory.geometry[id].url, sourceSha256: inventory.geometry[id].sha256,
    })),
    status: 'awaiting-source-and-catalog-stroke-count-reconciliation',
  }
})
const nextBatch = {
  schemaVersion: 1, title: '2급 사전·목록 획수 차이 검토 후보',
  basis: 'The ordinary intake queue is complete. These nine characters have dictionary animation counts different from the catalog; source-count reconciliation is required before geometry approval.',
  inventoryDate: '2026-09-15', characters: entries.length, strokes: entries.reduce((n, e) => n + e.strokes, 0),
  strokeCountBasis: 'Current catalog counts, not approved animation counts', entries,
  requiredReview: [
    'Refresh source title, displayed stroke count, complete SVG timing sequence and the catalog basis.',
    'Identify whether the difference is a source error, catalog error, or Korean glyph and stroke-boundary variant using independent sources.',
    'Do not change the catalog or split and merge paths merely to force counts to match.',
    'After resolving the discrepancy, inspect all stroke directions, boundaries and paths individually before promotion.',
  ], runtimeApprovalsAdded: 0,
}
const progress = {
  date: '2026-09-16', batch: { reviewed: 7, reviewedStrokes: 108, applied: 7, appliedStrokes: 108,
    corrected: 7, locallyCorrectedPaths: 29, retainedPaths: 79, reorderedCharacters: 0, held: 0 },
  overall: summarize(characters),
  byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: remainingQueues,
  next: { task: 'Reconcile dictionary and catalog stroke counts for nine grade 2 characters',
    first: entries[0]?.glyph ?? null, last: entries.at(-1)?.glyph ?? null,
    characters: entries.length, strokes: nextBatch.strokes,
    eligibleUnreviewedCharacters: remainingQueues.wholeStrokeReview.characters },
}
assert.equal(Object.values(remainingQueues).reduce((n, q) => n + q.characters, 0),
  progress.byGrade.find(g => g.grade === '2급').remaining)
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, batch10ApprovalsComplete: true, progress, nextBatch }, null, 2))
