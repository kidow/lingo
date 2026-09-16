/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH16_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH16_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES, g2GeometryBatch16DictionaryReference, g2GeometryBatch16DictionaryMetadata,
  type G2GeometryBatch16DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch16.ts'

const dir = 'docs/hanja-g2-geometry-batch16-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; additionalDerivedFromStrokes?: number[]; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH16_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch16-2026-09-16/split-review.json": "dcf14e1ad68a5b5cb1580c12e6dbb10d2bf94e45e0c1b7c1a2035172986d8cea",
  "docs/hanja-g2-geometry-batch16-2026-09-16/initial-observations.json": "d7e8a7daf755dabe7cc0de0cb97e1c7c0ca4bb233500bcc93ce1b4481b27fed0",
  "docs/hanja-g2-geometry-batch16-2026-09-16/originals.json": "707f2f1ddf7199e874de1f113492e8054b0a5dc8b6fe2523f0ee21b401c250e7",
  "docs/hanja-g2-geometry-batch16-2026-09-16/observations.json": "7196f3ea57c1990f2fffc7b9f8181c0866f004dcfe4e9fd1a0c95a022e4c2210",
  "docs/hanja-g2-geometry-batch16-2026-09-16/proposals.json": "acb1f50afb30317a9d9d6b5fb945a78b07a4ef7b75bc4985f350938d53a7b2f5",
  "docs/hanja-g2-geometry-batch16-2026-09-16/source-checks.json": "cc79128389e7dfba8284992baac5fe5b24dd7243e7d538689f72c5bb48705356",
  "docs/hanja-g2-geometry-batch16-2026-09-16/corrections.json": "4ba49a1c70a2238c772ac675ba0d93d1abedfb11d5ba16f5c6e068b08ecd6633",
  "docs/hanja-g2-geometry-batch16-2026-09-16/candidate-paths.json": "dadb92572e6de7829fe5080cbf8b51a894005f1b394647eb86068776cf36a8b8",
  "docs/hanja-g2-geometry-batch16-2026-09-16/review.json": "6c9ac3f98605c3f4733e66f536891e61a44e3f898326e4f072aa48088759f125"
}
export function validateG2GeometryBatch16DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH16_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch16 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch16DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch16DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch16 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch16 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string; additionalOriginalSources?: { stroke: number; path: string }[] }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch16 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch16 dictionary authored path mismatch')
    const extra = r.additionalDerivedFromStrokes ?? []
    if (new Set(extra).size !== extra.length || extra.some(n => !Number.isInteger(n) || n < 1 || n > originalPaths.length || n === r.derivedFromStroke)
      || !isDeepStrictEqual(edit.additionalOriginalSources ?? [], extra.map(n => ({ stroke: n, path: originalPaths[n - 1] }))))
      throw Error('G2 geometry-batch16 dictionary merged source mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch16 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch16DictionaryBundle(): G2GeometryBatch16DictionaryBundle {
  validateG2GeometryBatch16DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH16_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY) || originals.entries.length !== 1
    || new Set(originals.entries.map(e => e.glyph)).size !== 1 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch16 dictionary approved set mismatch')
  const split = JSON.parse(read(dir + 'split-review.json')) as {
    decision: string; sourceStroke: number; splitPointIndex: number; originalPath: string
    licensedSourceFragments: { targetStroke: number; path: string }[]; targetSourceStrokeMapping: number[]
  }
  const splitSource = originals.entries[0]
  const sourcePoints = [...splitSource.paths[8].matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
  const fragment = (points: number[][]) => points.map((p, i) => (i ? 'L' : 'M') + p.join(' ')).join(' ')
  const splitRecipes = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  if (splitSource.glyph !== '珽' || splitSource.strokes !== 10 || splitSource.catalogStrokes !== 11
    || split.decision !== 'confirmed-split' || split.sourceStroke !== 9 || split.splitPointIndex !== 3
    || split.originalPath !== splitSource.paths[8]
    || !isDeepStrictEqual(split.licensedSourceFragments, [{targetStroke:9,path:fragment(sourcePoints.slice(0,4))},{targetStroke:10,path:fragment(sourcePoints.slice(3))}])
    || !isDeepStrictEqual(split.targetSourceStrokeMapping, [1,2,3,4,5,6,7,8,9,9,10])
    || !isDeepStrictEqual(splitRecipes['珽'].map(p => p.derivedFromStroke), split.targetSourceStrokeMapping))
    throw Error('G2 geometry-batch16 dictionary split boundary mismatch')
  const characters = G2_GEOMETRY_BATCH16_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.catalogStrokes !== ref.strokes || original.dictionaryStrokes !== ref.strokes || original.strokes !== ref.originalStrokes || original.medians.length !== ref.originalStrokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 geometry-batch16 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch16DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch16 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch16DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH16_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH16_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch16DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch16DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH16_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch16 dictionary published entry mismatch')
}
export function validateG2GeometryBatch16DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES) {
  const expected = buildG2GeometryBatch16DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH16_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch16 dictionary published bundle mismatch')
}
