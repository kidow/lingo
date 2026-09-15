/** Read-only release check and current coverage summary. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { validateG2DictionaryBundle } from '../../scripts/hanja-stroke-dictionary-g2.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const compiled = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('prepare.mjs', import.meta.url))],
  { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 }))
assert.deepEqual(read('candidate-paths.json'), compiled.candidate)
assert.deepEqual(read('review.json'), compiled.review)
assert.deepEqual(read('../../public/hanja-strokes/dictionary-reviewed-g2.json'), compiled.runtime)
validateG2DictionaryBundle()
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
const held = compiled.review.entries.filter(e => e.decision === 'held')
for (const e of held) assert.ok(!compiled.runtime.characters.some(c => c.glyph === e.glyph))
const progress = {
  date: '2026-09-15', batch: { reviewed: 50, reviewedStrokes: 581, applied: 44, appliedStrokes: 506,
    unchanged: 35, corrected: 9, held: 6, heldStrokes: 75 },
  overall: summarize(characters),
  byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  next: { task: 'See the completed followup report for the current recommendation',
    report: 'docs/hanja-g2-batch1-followup-2026-09-15/README.md' },
}
console.log(JSON.stringify({ verification: 'passed', compilerMatchesArtifacts: true, proofPinsValid: true,
  uniqueRuntimeGlyphs: true, heldExcludedFromOriginalBatch: true, progress }, null, 2))
