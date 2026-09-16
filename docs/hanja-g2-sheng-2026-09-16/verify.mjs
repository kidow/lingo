/** Read-only reproduction of approved 晟 data, current coverage and next review. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2ShengDictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2-sheng.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-sheng.json'), compiled.runtime)
validateG2ShengDictionaryBundle()
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
assert.equal(hanjaStrokeData(byGlyph.get('晟')).paths.length, 11)
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0), appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const previous = read('../hanja-g2-xi-2026-09-16/progress.json')
const queues = Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key, q]) => {
  const glyphs = q.glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return [key, { characters: glyphs.length, strokes: glyphs.reduce((n, g) => n + byGlyph.get(g).strokes, 0), glyphs }]
}))
const queued = Object.values(queues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual(queued.sort(), characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort())
const previousCandidates = read('../hanja-g2-batch10-2026-09-16/next-batch.json')
const nextBatch = {
  schemaVersion: 1, title: '藍·蘆 2자·38획의 4획 초두 근거와 전체 경로 검토',
  basis: '2급 source-count queue: dictionary has 3-stroke 艹, catalog and licensed MM have 4-stroke 艹. Resolve the displayed form and full sequence before promotion.',
  characters: 2, strokes: 38, strokeCountBasis: 'Current catalog; not dictionary animated count',
  entries: previousCandidates.entries.filter(e => ['藍','蘆'].includes(e.glyph)).map(e => ({
    ...e, status: 'awaiting-four-stroke-grass-boundary-and-whole-path-review'
  })),
  requiredReview: [
    'Refresh dictionary playback and licensed candidate pins for both whole glyphs.',
    'Find direct support for the canonical four-stroke grass boundary and order; a general writing allowance is not an exam stroke-order ruling.',
    'Crosscheck every remaining stroke and the displayed glyph form; explicitly distinguish combined evidence from a whole-glyph direct source.',
    'Keep unsupported boundaries or incompatible forms held; do not approve by stroke count alone.'
  ], runtimeApprovalsAdded: 0,
}
const progress = {
  date: '2026-09-16', batch: { reviewed: 1, reviewedStrokes: 11, applied: 1, appliedStrokes: 11,
    corrected: 1, locallyCorrectedPaths: 3, retainedPaths: 8, reorderedCharacters: 1, held: 0 },
  overall: summarize(characters), byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: queues, next: { task: 'Review 藍 and 蘆 canonical four-stroke grass boundaries and whole candidate paths', characters: 2, strokes: 38, glyphs: ['藍', '蘆'] },
}
assert.deepEqual(progress.overall, { total: 5978, applied: 2277, remaining: 3701, percent: 38.1, totalStrokes: 74558, appliedStrokes: 25345 })
assert.equal(progress.byGrade.find(g => g.grade === '2급').remaining, 79)
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, compiled.proofPins)
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, progress, nextBatch, proofPins: compiled.proofPins }, null, 2))
