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
const catalog = json('../../content/hanja/characters/g2.json').characters
if (basis.glyph !== '瓊' || basis.strokes !== 19 || basis.dictionaryStrokes !== 18
  || basis.wholeFormSource.embeddedXmlSha256 !== '8b3af69f2301ca72701f2d0a17511f7a97f17d73e89286daacdfaa5362949d5c'
  || basis.wholeFormSource.strokes !== 19 || basis.automaticRadicalApproval !== false
  || !isDeepStrictEqual(basis.officialRulings.map(r => r.id), [7946,10717])
  || !isDeepStrictEqual(basis.runtimeToMoeStroke, Array.from({length:19},(_,i)=>i+1))
  || !isDeepStrictEqual(basis.runtimeToDictionaryStroke, [...Array.from({length:15},(_,i)=>i+1),null,null,null,null])
  || catalog.find(c => c.glyph === '瓊')?.strokes !== 19)
  throw Error('Nineteen-stroke form evidence changed')
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
    || observation.directions.length !== original.strokes || source.strokes.length !== original.dictionaryStrokes || source.svg.title !== observation.glyph
    || source.displayedStrokes !== original.dictionaryStrokes || source.svg.animated !== original.dictionaryStrokes
    || !source.svg.timingSequenceValid || !source.svg.clipCoverageValid
    || Object.values(observation.checks).some(v => v !== 'match') || recipe.length !== original.strokes)
    throw Error('Incomplete source review: ' + observation.glyph)
  if (!isDeepStrictEqual(source.strokes.map(s => s.xmlIndex), [15,16,17,18,...Array.from({length:14},(_,i)=>i+1)])
    || !isDeepStrictEqual(sourceChecks.wholeFormSource, basis.wholeFormSource)
    || !isDeepStrictEqual(sourceChecks.officialRulings, basis.officialRulings)) throw Error('Source stage mapping changed')
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
  reviewedCharacters: 1, reviewedStrokes: 19, approvedCharacters: 1, approvedStrokes: 19,
  proprietaryAssetsSaved: 0,
  entries: observations.entries.map(e => {
    const original = originals.entries.find(o => o.glyph === e.glyph)
    return { glyph: e.glyph, strokes: original.strokes, dictionaryStrokes: original.dictionaryStrokes, decision: e.decision, corpus: original.corpus,
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
  scope: basis.method,
}
const geometry = originals.sources
const characters = accepted.map(e => {
  const original = originals.entries.find(o => o.glyph === e.glyph)
  const paths = pathsByGlyph.get(e.glyph)
  return {
    glyph: e.glyph, verifiedAt: '2026-09-16', geometrySource: geometry[original.corpus].sha256,
    geometryCorrection: 'dictionary-g2-qiong-' + e.glyph.codePointAt(0).toString(16) + '-v1',
    sourceStrokeIndices: proposals[e.glyph].map(p => p.sourceStroke), pathsSha256: hash(paths),
    sourceReference: {
      orderUrl: basis.wholeFormSource.url, dictionarySvgUrl: original.dictionary.url,
      dictionarySvgSha256: original.dictionary.sha256,
      dictionaryDirectionStrokes: Array.from({ length: 15 }, (_, i) => i + 1).join(','),
      orderReviewSha256: reviewSha, geometryReviewSha256: reviewSha, directionReviewSha256: pins['observations.json'],
    }, paths,
  }
})
console.log(JSON.stringify({ candidate, review, runtime: { verificationSource: verification, geometrySources: geometry, characters },
  proofPins: { ...pins, 'candidate-paths.json': sha(format(candidate)), 'review.json': reviewSha } }))
