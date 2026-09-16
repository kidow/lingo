/** Read-only reproduction of approved 藍·蘆 data, current coverage and next review. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2LanLuDictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2-lan-lu.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-lan-lu.json'), compiled.runtime)
validateG2LanLuDictionaryBundle()
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
assert.equal(hanjaStrokeData(byGlyph.get('藍')).paths.length, 18)
assert.equal(hanjaStrokeData(byGlyph.get('蘆')).paths.length, 20)
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0), appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const previous = read('../hanja-g2-sheng-2026-09-16/progress.json')
const queues = Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key, q]) => {
  const glyphs = q.glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return [key, { characters: glyphs.length, strokes: glyphs.reduce((n, g) => n + byGlyph.get(g).strokes, 0), glyphs }]
}))
const queued = Object.values(queues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual(queued.sort(), characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort())
const previousCandidates = read('../hanja-g2-batch10-2026-09-16/next-batch.json')
const nextBatch = {
  schemaVersion: 1, title: '瓊 19획 자형·경계 근거와 전체 경로 검토',
  basis: 'Catalog and licensed MM use nineteen strokes; dictionary uses eighteen. The lower-right 攵/夂 form must be reconciled using the official explanations and complete order evidence.',
  characters: 1, strokes: 19, strokeCountBasis: 'Current catalog; not dictionary animated count',
  entries: previousCandidates.entries.filter(e => e.glyph === '瓊').map(e => ({
    ...e, status: 'awaiting-nineteen-stroke-form-boundary-and-whole-path-review'
  })),
  requiredReview: [
    'Refresh official answers 7946 and 10717; distinguish the two glyph forms without changing catalog count from font appearance alone.',
    'Refresh the whole dictionary playback and licensed candidate pins.',
    'Locate direct support for the nineteen-stroke form and its final component boundaries and directions; do not add a stroke solely to match the count.',
    'Review every path and cumulative form; keep unsupported variants held and describe combined evidence accurately.'
  ], runtimeApprovalsAdded: 0,
}
const progress = {
  date: '2026-09-16', batch: { reviewed: 2, reviewedStrokes: 38, applied: 2, appliedStrokes: 38,
    corrected: 2, locallyCorrectedPaths: 6, retainedPaths: 32, reorderedCharacters: 2, held: 0 },
  overall: summarize(characters), byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: queues, next: { task: 'Review 瓊 nineteen-stroke form, boundaries and all candidate paths', characters: 1, strokes: 19, glyphs: ['瓊'] },
}
assert.deepEqual(progress.overall, { total: 5978, applied: 2279, remaining: 3699, percent: 38.1, totalStrokes: 74558, appliedStrokes: 25383 })
assert.equal(progress.byGrade.find(g => g.grade === '2급').remaining, 77)
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, compiled.proofPins)
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, progress, nextBatch, proofPins: compiled.proofPins }, null, 2))
