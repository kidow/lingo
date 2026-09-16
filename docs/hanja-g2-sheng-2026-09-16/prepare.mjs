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
const originals = json('originals.json')
const observations = json('observations.json')
const proposals = json('proposals.json')
const sourceChecks = json('source-checks.json')
const corrections = json('corrections.json')
const basis = json('count-basis.json')
const catalog = json('../../content/hanja/characters/g2.json').characters.find(c => c.glyph === basis.glyph)
if (!catalog || catalog.strokes !== 11 || basis.strokes !== 11 || basis.dictionaryStrokes !== 10
  || basis.licensedOriginalStrokes !== 10 || basis.wholeGlyphElevenStageSourceFound !== false
  || basis.officialCount.id !== '10026'
  || basis.officialCount.sha256 !== '64003376f3018606dd6ae15a7a36ec999d1d03c6d3332daa0e265871ba1f07ee'
  || basis.officialComponent.sha256 !== '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c'
  || basis.officialComponent.imageSha256 !== '74f22eccf1c38fe55f08879eabf9327f1a9934ea32f6e46136fe935782b81d24'
  || basis.officialComponent.sourceRow !== 19
  || !isDeepStrictEqual(basis.dictionaryToRuntime, [1,2,3,4,5,6,7,7,8,9,10])
  || !isDeepStrictEqual(basis.licensedToRuntime, [1,2,3,4,6,5,7,7,8,9,10])) throw Error('Count basis changed')
const accepted = observations.entries.filter(e => e.decision === 'matched')
if (observations.status !== 'complete' || accepted.length !== 1 || observations.entries.length !== 1)
  throw Error('Review set incomplete')
const pathsByGlyph = new Map()
for (const observation of accepted) {
  const original = originals.entries.find(e => e.glyph === observation.glyph)
  const source = sourceChecks.entries.find(e => e.glyph === observation.glyph)
  const recipe = proposals[observation.glyph]
  if (!original || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
    || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
    || hash(original.medians) !== original.originalMediansSha256
    || observation.directions.length !== basis.strokes || source.strokes.length !== original.strokes || source.svg.title !== observation.glyph
    || source.displayedStrokes !== original.strokes || source.svg.animated !== original.strokes
    || !source.svg.timingSequenceValid || !source.svg.clipCoverageValid
    || Object.values(observation.checks).some(v => v !== 'match') || recipe.length !== basis.strokes)
    throw Error('Incomplete source review: ' + observation.glyph)
  if (!isDeepStrictEqual(source.strokes.map(s => s.xmlIndex), [7,8,9,10,1,2,3,4,5,6])
    || !isDeepStrictEqual(sourceChecks.officialComponent, basis.officialComponent)) throw Error('Source mapping changed')
  if (observation.initialDecision !== 'matched' && !observation.correctedReview?.completed)
    throw Error('Correction reinspection missing: ' + observation.glyph)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > original.strokes || r.path)
        throw Error('Invalid source stroke')
      return original.paths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === original.glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || original.paths[r.derivedFromStroke - 1] !== edit.originalPath) throw Error('Authored path not reviewed')
    return r.path
  })
  pathsByGlyph.set(original.glyph, paths)
}
const candidate = {
  date: '2026-09-16', coordinateSystem: '100 x 100, y downward; licensed normalized centerlines with reviewed corrections',
  entries: accepted.map(e => ({ glyph: e.glyph, paths: pathsByGlyph.get(e.glyph) })),
}
const pins = Object.fromEntries(['initial-observations.json', 'originals.json', 'observations.json', 'proposals.json', 'source-checks.json', 'corrections.json', 'count-basis.json']
  .map(name => [name, sha(read(name))]))
const review = {
  date: '2026-09-16', verificationSource: 'ehanja-crosschecked',
  scope: basis.method,
  pins, candidatePathsSha256: sha(format(candidate)),
  reviewedCharacters: 1, reviewedStrokes: 11, approvedCharacters: 1, approvedStrokes: 11,
  proprietaryAssetsSaved: 0,
  entries: observations.entries.map(e => {
    const original = originals.entries.find(o => o.glyph === e.glyph)
    return { glyph: e.glyph, strokes: basis.strokes, dictionaryStrokes: original.strokes, decision: e.decision, corpus: original.corpus,
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
const verification = {
  id: 'ehanja-crosschecked', title: 'e-hanja 필순·방향 교차검토', url: 'http://www.e-hanja.kr/',
  scope: 'Grade 2 晟: 10-stage dictionary crosscheck plus official 晟 eleven-stroke ruling and 成 boundary diagram; 11 resulting paths rechecked. Not exam-body certification.',
}
const geometry = originals.sources
const characters = accepted.map(e => {
  const original = originals.entries.find(o => o.glyph === e.glyph)
  const paths = pathsByGlyph.get(e.glyph)
  return {
    glyph: e.glyph, verifiedAt: '2026-09-16', geometrySource: geometry[original.corpus].sha256,
    geometryCorrection: 'dictionary-g2-sheng-' + e.glyph.codePointAt(0).toString(16) + '-v1',
    sourceStrokeIndices: proposals[e.glyph].map(p => p.sourceStroke), pathsSha256: hash(paths),
    sourceReference: {
      orderUrl: basis.officialCount.url, dictionarySvgUrl: original.dictionary.url,
      dictionarySvgSha256: original.dictionary.sha256,
      dictionaryDirectionStrokes: Array.from({ length: original.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: pins['observations.json'],
    }, paths,
  }
})
console.log(JSON.stringify({ candidate, review, runtime: { verificationSource: verification, geometrySources: geometry, characters },
  proofPins: { ...pins, 'candidate-paths.json': sha(format(candidate)), 'review.json': reviewSha } }))
