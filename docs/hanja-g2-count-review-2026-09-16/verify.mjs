/** Read-only reconciliation and current runtime coverage; --derive emits new snapshots. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const hash = path => createHash('sha256').update(readFileSync(new URL(path, import.meta.url))).digest('hex')
const sources = read('source-checks.json')
const official = read('official-evidence.json')
const observations = read('observations.json')
const registry = read('../../content/hanja/stroke-count-corrections.json')
const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
const targetGlyphs = ['瓊', '藍', '蘆', '飼', '晟', '祐', '庾', '禎', '熙']
assert.deepEqual(sources.entries.map(e => e.glyph), targetGlyphs)
assert.deepEqual(observations.entries.map(e => e.glyph), targetGlyphs)
assert.equal(observations.runtimeApprovalsAdded, 0)
assert.equal(observations.inspectedDictionaryStrokes, 125)
for (const e of observations.entries) {
  const c = byGlyph.get(e.glyph), s = sources.entries.find(x => x.glyph === e.glyph)
  assert.equal(c.strokes, e.catalogStrokes)
  assert.equal(s.catalogStrokes, e.catalogStrokesBefore)
  assert.equal(s.title, e.glyph)
  assert.equal(s.dictionary.status, 200)
  assert.equal(s.detail.status, 200)
  assert.equal(s.dictionary.sha256, e.sourceSha256)
  assert.equal(s.animated, e.dictionaryStrokes)
  assert.equal(s.outlines, s.animated)
  assert.equal(s.displayedStrokes, s.animated)
  assert.ok(s.timingSequenceValid && s.clipCoverageValid)
  assert.deepEqual(e.visuallyInspectedStages, [1, s.animated])
  assert.ok(e.officialEvidenceIds.every(id => official.entries.some(a => a.id === id)))
  assert.equal(e.animationApproved, false)
  assert.equal(e.fullCandidatePathReviewComplete, false)
  assert.equal(hanjaStrokeData(c), null, e.glyph + ' must not be promoted by a count-only review')
}
assert.equal(official.assignment.workbook.sha256, registry.workbookSha256)
assert.ok(official.assignment.grade2.containsDisplayedGlyph)
assert.equal(official.assignment.grade2.containsWorkbookGlyph, false)
const corrected = observations.entries.filter(e => e.catalogStrokes !== e.catalogStrokesBefore)
assert.deepEqual(corrected.map(e => e.glyph), ['熙'])
assert.equal(corrected[0].catalogStrokesBefore, 13)
assert.equal(corrected[0].catalogStrokes, 14)
const xi = byGlyph.get('熙')
assert.equal(xi.sourceGlyph, '煕')
assert.equal(xi.sourceStrokes, 13)
assert.equal(xi.sourceRow, 5954)
assert.ok(xi.glyphAliases.includes('煕'))
const correction = registry.entries.find(e => e.id === xi.strokeCountCorrection)
assert.ok(correction)
assert.equal(correction.strokes, xi.strokes)
assert.equal(correction.sourceStrokes, xi.sourceStrokes)
assert.equal(correction.sourceRow, xi.sourceRow)
assert.equal(correction.sourceGlyph, xi.sourceGlyph)
const ruling = official.entries.find(e => e.id === '9699')
assert.equal(correction.sourceUrl, ruling.url)
assert.equal(correction.sourceDate, ruling.date)
assert.ok(corrected[0].officialEvidenceIds.includes('8732'), 'Preserve contradictory older ruling')

const grades = ['8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급', '3급II', '3급', '2급', '1급', '특급II', '특급']
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total: list.length, applied: applied.length, remaining: list.length - applied.length,
    percent: +(100 * applied.length / list.length).toFixed(1),
    totalStrokes: list.reduce((n, c) => n + c.strokes, 0),
    appliedStrokes: applied.reduce((n, c) => n + c.strokes, 0) }
}
const queue = glyphs => {
  const remaining = glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return { characters: remaining.length, strokes: remaining.reduce((n, g) => n + byGlyph.get(g).strokes, 0), glyphs: remaining }
}
const prior = read('../hanja-g2-batch10-2026-09-16/progress.json')
const unresolved = observations.entries.filter(e => e.catalogStrokes !== e.dictionaryStrokes)
const aligned = observations.entries.filter(e => e.catalogStrokes === e.dictionaryStrokes)
assert.equal(unresolved.length, 8)
assert.deepEqual(aligned.map(e => e.glyph), ['熙'])
const remainingQueues = {
  wholeStrokeReview: queue(aligned.map(e => e.glyph)),
  sourceCountReview: queue(unresolved.map(e => e.glyph)),
  geometryCountReview: queue(prior.remainingGrade2Queues.geometryCountReview.glyphs),
  geometryNeeded: queue(prior.remainingGrade2Queues.geometryNeeded.glyphs),
}
const remaining = characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort()
const queued = Object.values(remainingQueues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual(queued.sort(), remaining)
const previousCandidates = read('../hanja-g2-batch10-2026-09-16/next-batch.json')
const entries = aligned.map(e => {
  const c = previousCandidates.entries.find(x => x.glyph === e.glyph)
  return { ...c, strokes: e.catalogStrokes, catalogStrokesBefore: e.catalogStrokesBefore,
    status: 'count-aligned-awaiting-full-stroke-review', correctionId: byGlyph.get(e.glyph).strokeCountCorrection,
    preferredCandidate: 'MM', fullCandidatePathReviewComplete: false }
})
assert.equal(entries[0].licensedCandidates.find(c => c.corpus === 'MM').strokes, 14)
const nextBatch = {
  schemaVersion: 1, title: '熙 14획 전체 경로·방향 검토',
  basis: '표시 자형과 획수가 공식 상담 및 국내 사전 자료에서 일치한다. MM 후보의 획수가 같다는 사실만으로 경로를 승인하지 않는다.',
  characters: entries.length, strokes: entries.reduce((n, e) => n + e.strokes, 0), entries,
  requiredReview: [
    'Pin and refresh source title, all fourteen delays, clip coverage and complete stroke sequence.',
    'Inspect each licensed MM stroke against the matching source stage for boundary, order, direction and shape.',
    'Retain licensed geometry or document local corrections; never copy proprietary dictionary paths into runtime assets.',
    'Reinspect corrected paths before adding provenance, runtime data and regression tests.',
  ], runtimeApprovalsAdded: 0,
}
const progress = {
  date: '2026-09-16',
  batch: { countReviewed: 9, dictionaryStagesInspected: 125, catalogStrokesBefore: 130,
    catalogStrokesAfter: 131, corrected: 1, catalogRetained: 8, applied: 0, appliedStrokes: 0 },
  overall: summarize(characters),
  byGrade: grades.map(grade => ({ grade, ...summarize(characters.filter(c => c.readingGrade === grade)) })),
  remainingGrade2Queues: remainingQueues,
  next: { task: 'Review all fourteen licensed candidate strokes of 熙 against the dictionary source', characters: 1, strokes: 14, glyphs: ['熙'] },
}
assert.deepEqual(progress.overall, { total: 5978, applied: 2275, remaining: 3703,
  percent: 38.1, totalStrokes: 74558, appliedStrokes: 25320 })
const proofPins = Object.fromEntries(['source-checks.json', 'official-evidence.json', 'observations.json'].map(p => [p, hash(p)]))
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, proofPins)
}
console.log(JSON.stringify({ verification: 'passed', countCorrectionPreservesSource: true,
  runtimeApprovalsAdded: 0, proofPins, progress, nextBatch }, null, 2))
