/** Read-only reproduction of approved 熙 data, current coverage and next review. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2XiDictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2-xi.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2-xi.json'), compiled.runtime)
validateG2XiDictionaryBundle()
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
assert.equal(hanjaStrokeData(byGlyph.get('熙')).paths.length, 14)
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0), appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const previous = read('../hanja-g2-count-review-2026-09-16/progress.json')
const queues = Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key, q]) => {
  const glyphs = q.glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return [key, { characters: glyphs.length, strokes: glyphs.reduce((n, g) => n + byGlyph.get(g).strokes, 0), glyphs }]
}))
const queued = Object.values(queues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual(queued.sort(), characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort())
const previousCandidates = read('../hanja-g2-batch10-2026-09-16/next-batch.json')
const next = previousCandidates.entries.find(e => e.glyph === '晟')
const official = read('../hanja-g2-count-review-2026-09-16/official-evidence.json').entries.find(e => e.id === '10026')
const nextBatch = {
  schemaVersion: 1, title: '晟 11획의 경계 보강·전체 경로 검토',
  basis: '한국어문회는 丁 2획 기준 총 11획을 명시한다. 사전과 MM/Ja 후보는 丁 부분을 합쳐 10획이므로 경계·순서·방향 보강이 먼저 필요하다.',
  characters: 1, strokes: 11, strokeCountBasis: 'Current catalog; not candidate stroke count',
  entries: [{ ...next, strokes: byGlyph.get('晟').strokes, status: 'awaiting-eleven-stroke-boundary-and-whole-path-review',
    officialCountSource: { url: official.url, date: official.date, sha256: official.sha256 } }],
  requiredReview: [
    'Refresh the complete dictionary sequence and licensed candidate pins.',
    'Verify the canonical two-stroke 丁 boundary and order using direct evidence; do not split solely to match the catalog count.',
    'If the boundary is supported, author a licensed-derived eleven-stroke proposal and inspect every direction, boundary and path.',
    'Keep the character held when evidence remains insufficient; record gaps instead of inferring approval.',
  ], runtimeApprovalsAdded: 0,
}
const progress = {
  date: '2026-09-16', batch: { reviewed: 1, reviewedStrokes: 14, applied: 1, appliedStrokes: 14,
    corrected: 1, locallyCorrectedPaths: 2, retainedPaths: 12, reorderedCharacters: 0, held: 0 },
  overall: summarize(characters), byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: queues, next: { task: 'Review 晟 canonical eleven-stroke boundaries and all candidate paths', characters: 1, strokes: 11, glyphs: ['晟'] },
}
assert.deepEqual(progress.overall, { total: 5978, applied: 2276, remaining: 3702, percent: 38.1, totalStrokes: 74558, appliedStrokes: 25334 })
assert.equal(progress.byGrade.find(g => g.grade === '2급').remaining, 80)
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, compiled.proofPins)
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, progress, nextBatch, proofPins: compiled.proofPins }, null, 2))
