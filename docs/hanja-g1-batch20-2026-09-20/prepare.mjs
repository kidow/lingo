/** Read-only compiler: stdout contains reviewed artifacts for native file writes. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'

const read = name => readFileSync(new URL(name, import.meta.url), 'utf8')
const json = name => JSON.parse(read(name))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const format = value => JSON.stringify(value, null, 2) + '\n'
const DATE = '2026-09-20'
const originals = json('originals.json')
const observations = json('observations.json')
const proposals = json('proposals.json')
const sourceChecks = json('source-checks.json')
const corrections = json('corrections.json')
const accepted = observations.entries.filter(e => e.decision === 'matched')
const held = observations.entries.filter(e => e.decision === 'held')
if (observations.status !== 'complete' || observations.entries.length !== 50
  || accepted.length + held.length !== 50 || accepted.length !== 50
  || held.some(e => !e.notes || !e.issues?.length || proposals[e.glyph]))
  throw Error('Review set incomplete')
const pathsByGlyph = new Map()
for (const observation of accepted) {
  const original = originals.entries.find(e => e.glyph === observation.glyph)
  const source = sourceChecks.entries.find(e => e.glyph === observation.glyph)
  const recipe = proposals[observation.glyph]
  if (!original || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
    || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
    || hash(original.medians) !== original.originalMediansSha256
    || observation.directions.length !== original.strokes || source.strokes.length !== original.strokes
    || Object.values(observation.checks).some(v => v !== 'match') || recipe.length !== original.strokes)
    throw Error('Incomplete source review: ' + observation.glyph)
  if (observation.initialDecision !== 'matched' && !observation.correctedReview?.completed)
    throw Error('Correction reinspection missing: ' + observation.glyph)
  const used = new Set()
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > original.strokes || r.path || used.has(r.sourceStroke))
        throw Error('Invalid source stroke')
      used.add(r.sourceStroke)
      return original.paths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === original.glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Authored path not reviewed')
    return r.path
  })
  pathsByGlyph.set(original.glyph, paths)
}
const strokes = accepted.reduce((n, e) => n + pathsByGlyph.get(e.glyph).length, 0)
const candidate = {
  date: DATE, coordinateSystem: '100 x 100, y downward; licensed normalized centerlines with reviewed corrections',
  entries: accepted.map(e => ({ glyph: e.glyph, paths: pathsByGlyph.get(e.glyph) })),
}
const pins = Object.fromEntries(['originals.json', 'observations.json', 'proposals.json', 'source-checks.json', 'corrections.json']
  .map(name => [name, sha(read(name))]))
const review = {
  date: DATE, verificationSource: 'ehanja-crosschecked',
  scope: 'Complete per-glyph Korean dictionary order, direction, boundary and form crosscheck. Not exam-body certification.',
  pins, candidatePathsSha256: sha(format(candidate)),
  reviewedCharacters: 50, reviewedStrokes: originals.entries.reduce((n, e) => n + e.strokes, 0),
  approvedCharacters: accepted.length, approvedStrokes: strokes, heldCharacters: held.length,
  proprietaryAssetsSaved: 0,
  entries: observations.entries.map(e => {
    const original = originals.entries.find(o => o.glyph === e.glyph)
    return { glyph: e.glyph, strokes: original.strokes, decision: e.decision, corpus: original.corpus,
      originalMediansSha256: original.originalMediansSha256, dictionary: original.dictionary,
      directions: e.directions, checks: e.checks,
      ...(e.decision === 'matched' ? {
        sourceStrokeIndices: proposals[e.glyph].map(p => p.sourceStroke),
        pathsSha256: hash(pathsByGlyph.get(e.glyph)),
        corrected: !!e.correctedReview,
      } : { notes: e.notes, issues: e.issues }) }
  }),
}
const reviewSha = sha(format(review))
const corrected = accepted.filter(e => e.initialDecision !== 'matched').length
const verification = {
  id: 'ehanja-crosschecked', title: 'e-hanja 필순·방향 교차검토', url: 'http://www.e-hanja.kr/',
  scope: `Grade 1 batch 8: 50 characters individually checked, ${accepted.length} approved and ${held.length} held; ${corrected} corrected forms rechecked. Not exam-body certification.`,
}
const geometry = originals.sources
const characters = accepted.map(e => {
  const original = originals.entries.find(o => o.glyph === e.glyph)
  const paths = pathsByGlyph.get(e.glyph)
  return {
    glyph: e.glyph, verifiedAt: DATE, geometrySource: geometry[original.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch20-' + e.glyph.codePointAt(0).toString(16) + '-v1',
    sourceStrokeIndices: proposals[e.glyph].map(p => p.sourceStroke), pathsSha256: hash(paths),
    sourceReference: {
      orderUrl: original.dictionary.url, dictionarySvgUrl: original.dictionary.url,
      dictionarySvgSha256: original.dictionary.sha256,
      dictionaryDirectionStrokes: Array.from({ length: original.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: pins['observations.json'],
    }, paths,
  }
})
console.log(JSON.stringify({ candidate, review, runtime: { verificationSource: verification, geometrySources: geometry, characters },
  proofPins: { ...pins, 'candidate-paths.json': sha(format(candidate)), 'review.json': reviewSha } }))
