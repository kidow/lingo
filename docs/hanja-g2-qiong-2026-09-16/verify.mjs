/** Read-only reproduction of approved 瓊 data, current coverage and next review. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2QiongDictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2-qiong.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-qiong.json'), compiled.runtime)
validateG2QiongDictionaryBundle()
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
assert.equal(hanjaStrokeData(byGlyph.get('瓊')).paths.length, 19)
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0), appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const previous = read('../hanja-g2-lan-lu-2026-09-16/progress.json')
const queues = Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key, q]) => {
  const glyphs = q.glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return [key, { characters: glyphs.length, strokes: glyphs.reduce((n, g) => n + byGlyph.get(g).strokes, 0), glyphs }]
}))
const queued = Object.values(queues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual(queued.sort(), characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort())
const previousCandidates = read('../hanja-g2-batch10-2026-09-16/next-batch.json')
const nextBatch = {
  schemaVersion:1, title:'飼 14획 자형·경계 근거와 전체 경로 검토',
  basis:'Catalog uses the nine-stroke food component plus 司; the dictionary shows a thirteen-stroke alternate form. Establish explicit form/boundary evidence before approval.',
  characters:1, strokes:14, strokeCountBasis:'Current catalog; not dictionary animated count',
  entries:previousCandidates.entries.filter(e=>e.glyph==='飼').map(e=>({...e,status:'awaiting-fourteen-stroke-form-and-whole-path-review'})),
  requiredReview:[
    'Refresh official food-component answer 10635 and identify the exact nine-stroke form.',
    'Refresh dictionary playback and licensed candidate source pins.',
    'Seek whole fourteen-stroke reference; distinguish Korean guidance from foreign supplementary sequence evidence.',
    'Review all fourteen paths, boundaries, direction and cumulative form without count-only splitting.'
  ], runtimeApprovalsAdded:0,
}
const progress = {
  date: '2026-09-16', batch: { reviewed: 1, reviewedStrokes: 19, applied: 1, appliedStrokes: 19,
    corrected: 1, locallyCorrectedPaths: 2, retainedPaths: 17, reorderedCharacters: 0, held: 0 },
  overall: summarize(characters), byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: queues, next: { task: 'Review 飼 fourteen-stroke form, boundaries and all candidate paths', characters: 1, strokes: 14, glyphs: ['飼'] },
}
assert.deepEqual(progress.overall, { total: 5978, applied: 2280, remaining: 3698, percent: 38.1, totalStrokes: 74558, appliedStrokes: 25402 })
assert.equal(progress.byGrade.find(g => g.grade === '2급').remaining, 76)
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, compiled.proofPins)
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, progress, nextBatch, proofPins: compiled.proofPins }, null, 2))
