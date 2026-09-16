/** Read-only check of the held 飼 review; it never emits runtime animation data. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const originals = read('originals.json')
const sources = read('source-checks.json')
const observations = read('observations.json')
const review = read('review.json')
const entry = originals.entries[0]
assert.equal(originals.entries.length, 1)
assert.equal(entry.glyph, '飼')
assert.equal(entry.strokes, 13)
assert.equal(entry.catalogStrokes, 14)
assert.equal(entry.medians.length, 13)
assert.deepEqual(entry.paths, normalizeMedians(entry.medians))
assert.equal(entry.originalMediansSha256, hash(JSON.stringify(entry.medians)))
assert.equal(originals.sources.MM.sha256, 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee')
assert.equal(entry.dictionary.sha256, '768fb0fe8e2827fdf3e6b460c2d7bcb08e1e1120b165099316f447ad02d895fb')
assert.equal(entry.dictionaryStrokes, 13)
assert.equal(entry.detail.displayedStrokes, 13)
assert.equal(entry.svg.animated, 13)
assert.equal(entry.svg.outlines, 13)
assert.ok(entry.svg.timingSequenceValid && entry.svg.clipCoverageValid)
assert.deepEqual(sources.dictionary.dictionary, entry.dictionary)
assert.deepEqual(sources.dictionary.strokes.map(s => s.xmlIndex), [6,7,8,9,10,11,12,13,1,2,3,4,5])
assert.ok(sources.dictionary.strokes.every((s, i, list) => s.duration > 0 && (i === 0 || s.delay > list[i-1].delay)))
assert.equal(sources.moe.strokes, 13)
assert.equal(sources.moe.embeddedXmlSha256, 'ab2c347fe331ad593210a71d56713575de10f01cc4869d54358f36e4282a48c3')
assert.deepEqual(sources.sources.map(s => s.id), ['eomunhoe-food','eomunhoe-si','kanken','cns-food'])
assert.ok(sources.sources.every(s => s.status === 200 && /^[a-f0-9]{64}$/.test(s.sha256) && s.wholeGlyphOrder === false))
assert.equal(sources.sources.find(s => s.id === 'cns-food').strokes, 9)
assert.equal(sources.supplementaryGeometry[0].medians, 13)
assert.equal(sources.supplementaryGeometry[0].sha256, '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8')
assert.equal(sources.supplementaryGeometry[1].truncated, false)
assert.ok(sources.supplementaryGeometry[1].entries.every(e => e.strokes === 13))
assert.equal(sources.conclusion.wholeFourteenStrokeReferenceLocated, false)
assert.equal(sources.conclusion.proprietaryAssetsSaved, 0)
const appForm = sources.staticForms.find(a => a.url === 'public/hanja/u98fc.svg')
assert.equal(hash(readFileSync(new URL('../../' + appForm.url, import.meta.url))), appForm.sha256)
assert.equal(observations.wholeTargetPathReviewCompleted, false)
assert.deepEqual(observations.rows.map(r => r.stroke), Array.from({length:13}, (_, i) => i+1))
assert.ok(observations.rows.every((r, i) => r.dictionaryXmlIndex === sources.dictionary.strokes[i].xmlIndex
  && r.dictionaryPlaybackStage === i+1 && r.moeStage === i+1 && r.direction && r.finding
  && r.status === 'observed-unapproved-variant'))
assert.equal(observations.coverage.wholeTargetPathsApproved, 0)
assert.equal(review.approved, false)
assert.equal(review.runtimeApprovalsAdded, 0)
assert.equal(review.wholeFourteenPathReviewCompleted, false)
assert.equal(review.catalogChanged, false)

const catalogDir = new URL('../../content/hanja/characters/', import.meta.url)
const characters = readdirSync(catalogDir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, catalogDir), 'utf8')).characters)
const byGlyph = new Map(characters.map(c => [c.glyph, c]))
assert.equal(byGlyph.size, characters.length)
assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
assert.equal(byGlyph.get('飼').strokes, 14)
assert.equal(byGlyph.get('飼').readingGrade, '2급')
assert.equal(hanjaStrokeData(byGlyph.get('飼')), null)
assert.ok(!HANJA_STROKES.some(e => e.glyph === '飼'), 'Held variant must not be registered even with another count')
const summarize = list => {
  const applied = list.filter(c => hanjaStrokeData(c))
  return { total:list.length, applied:applied.length, remaining:list.length-applied.length,
    percent:+(100*applied.length/list.length).toFixed(1),
    totalStrokes:list.reduce((n,c) => n+c.strokes, 0),
    appliedStrokes:applied.reduce((n,c) => n+c.strokes, 0) }
}
const previous = read('../hanja-g2-qiong-2026-09-16/progress.json')
const queues = Object.fromEntries(Object.entries(previous.remainingGrade2Queues).map(([key,q]) => {
  const glyphs = q.glyphs.filter(g => !hanjaStrokeData(byGlyph.get(g)))
  return [key, {characters:glyphs.length, strokes:glyphs.reduce((n,g) => n+byGlyph.get(g).strokes,0), glyphs}]
}))
const queued = Object.values(queues).flatMap(q => q.glyphs)
assert.equal(new Set(queued).size, queued.length)
assert.deepEqual([...queued].sort(), characters.filter(c => c.readingGrade === '2급' && !hanjaStrokeData(c)).map(c => c.glyph).sort())
const nextGlyphs = ['祐','禎']
const nextBatch = {
  schemaVersion:1, title:'祐·禎 2자·24획 자형과 전체 필순 근거 검토',
  basis:'Both dictionary/candidate forms have one fewer stroke than the catalog. Reconcile 示 and 礻 form evidence before path approval.',
  characters:2, strokes:24, strokeCountBasis:'Current catalog; not dictionary animation totals',
  entries:read('../hanja-g2-batch10-2026-09-16/next-batch.json').entries.filter(e => nextGlyphs.includes(e.glyph))
    .map(e => ({...e,status:'awaiting-target-form-and-whole-path-review'})),
  requiredReview:[
    'Refresh Korean form guidance, dictionary counts and licensed source pins.',
    'Locate whole-glyph sequence and direction evidence matching each current catalog form.',
    'Review every target path and cumulative state; do not split strokes for count alone.'
  ],
  held:[{glyph:'飼',strokes:14,reason:review.reason,review:'review.json',reopenConditions:review.reopenConditions}],
  runtimeApprovalsAdded:0
}
assert.equal(nextBatch.entries.reduce((n,e) => n+e.strokes,0), 24)
assert.ok(nextBatch.entries.every(e => !hanjaStrokeData(byGlyph.get(e.glyph))))
const progress = {
  date:'2026-09-16',
  batch:{sourceAudited:1,targetStrokes:14,candidatePathsReviewed:13,wholeTargetPathsReviewed:0,applied:0,appliedStrokes:0,held:1},
  overall:summarize(characters),
  byGrade:previous.byGrade.map(({grade}) => ({grade,...summarize(characters.filter(c => c.readingGrade === grade))})),
  remainingGrade2Queues:queues,
  next:{task:'Review 祐 and 禎 target forms and whole-glyph stroke evidence',characters:2,strokes:24,glyphs:nextGlyphs}
}
assert.deepEqual(progress.overall, previous.overall)
assert.deepEqual(progress.byGrade, previous.byGrade)
assert.deepEqual(progress.remainingGrade2Queues, previous.remainingGrade2Queues)
const proofFiles = ['acquire.mjs','serve.py','originals.json','source-checks.json','observations.json','review.json','verify.mjs']
const proofPins = Object.fromEntries(proofFiles.map(f => [f,hash(readFileSync(new URL(f,import.meta.url)))]))
assert.ok(!readdirSync(new URL('./', import.meta.url)).some(f => /\.(svg|xml|png|jpe?g|gif|webp|html)$/i.test(f)), 'No source art in the review directory')
if (!process.argv.includes('--derive')) {
  assert.deepEqual(read('progress.json'), progress)
  assert.deepEqual(read('next-batch.json'), nextBatch)
  assert.deepEqual(read('checks.json').proofPins, proofPins)
}
console.log(JSON.stringify({verification:'passed',heldGlyphAbsentFromRuntime:true,licensedCandidateNormalizationValid:true,
  metadataAndObservationCoverageValid:true,catalogAndCoverageUnchanged:true,proprietaryAssetsSaved:0,proofPins,progress,nextBatch},null,2))
