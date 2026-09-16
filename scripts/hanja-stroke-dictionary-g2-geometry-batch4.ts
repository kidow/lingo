/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION, G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY, G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES, g2GeometryBatch4DictionaryReference, g2GeometryBatch4DictionaryMetadata,
  type G2GeometryBatch4DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-geometry-batch4.ts'

const dir = 'docs/hanja-g2-geometry-batch4-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; catalogStrokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_GEOMETRY_BATCH4_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-geometry-batch4-2026-09-16/initial-observations.json": "5b0a2a12619f8535b0f9765fb21188b7f0949361817ab268f5f547958529d62b",
  "docs/hanja-g2-geometry-batch4-2026-09-16/originals.json": "94aedadf2f3356f371512e454839ccdca091b89a118afbe0788115dcdd1159af",
  "docs/hanja-g2-geometry-batch4-2026-09-16/observations.json": "7a37cdf86e7cb4cd50c63edaa382df2f9017c6760c54c8cfc6b61d17f373ec41",
  "docs/hanja-g2-geometry-batch4-2026-09-16/proposals.json": "5c19ca4898924f8f893ef88edd6cebef3fa5370273128280d22d667ac58c920b",
  "docs/hanja-g2-geometry-batch4-2026-09-16/source-checks.json": "a3de3a49ea2ed9d6432421d36e99553f551f5f886e7236b716cd3e148de2ab0a",
  "docs/hanja-g2-geometry-batch4-2026-09-16/corrections.json": "b01094b19ef8fb1493420e1c51e0e2cd0c2b466bdc7c1db6d2f342360aa2e333",
  "docs/hanja-g2-geometry-batch4-2026-09-16/candidate-paths.json": "64d9de6f0b235089be3a86431d2ed9b271bdc8687bb7d48b01a9ca064a7c99e5",
  "docs/hanja-g2-geometry-batch4-2026-09-16/review.json": "d50bdf7563d3a636bd3209ee8a664e8f03bea8e852c479e5a64eb0e78ded6a77"
}
export function validateG2GeometryBatch4DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_GEOMETRY_BATCH4_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 geometry-batch4 dictionary proof mismatch: ' + path)
  }
}
export function g2GeometryBatch4DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2GeometryBatch4DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 geometry-batch4 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 geometry-batch4 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 geometry-batch4 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 geometry-batch4 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 geometry-batch4 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2GeometryBatch4DictionaryBundle(): G2GeometryBatch4DictionaryBundle {
  validateG2GeometryBatch4DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 geometry-batch4 dictionary approved set mismatch')
  const characters = G2_GEOMETRY_BATCH4_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 geometry-batch4 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2GeometryBatch4DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 geometry-batch4 dictionary frozen candidate mismatch')
    return { ...g2GeometryBatch4DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION, geometrySources: G2_GEOMETRY_BATCH4_DICTIONARY_GEOMETRY, characters }
}
export function validateG2GeometryBatch4DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2GeometryBatch4DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 geometry-batch4 dictionary published entry mismatch')
}
export function validateG2GeometryBatch4DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES) {
  const expected = buildG2GeometryBatch4DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_GEOMETRY_BATCH4_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 geometry-batch4 dictionary published bundle mismatch')
}
