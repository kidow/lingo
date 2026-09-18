/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH6_DICTIONARY_VERIFICATION, G1_BATCH6_DICTIONARY_GEOMETRY, G1_BATCH6_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH6_STROKES, g1Batch6DictionaryReference, g1Batch6DictionaryMetadata,
  type G1Batch6DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch6.ts'

const dir = 'docs/hanja-g1-batch6-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH6_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH6_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch6-2026-09-18/originals.json": "d95f1af42264e040a199515fd23021953eaf797b426ef41d8773595be3de9eff",
  "docs/hanja-g1-batch6-2026-09-18/observations.json": "cc7da08e73cf3fad6821dd6cca1c4d063751b3d10a4895e5525f680d59473f9e",
  "docs/hanja-g1-batch6-2026-09-18/proposals.json": "4e147547323d0bd3f77232395e81e033c5e5f0e4d3ff94e8fb3ef22ef92149a5",
  "docs/hanja-g1-batch6-2026-09-18/source-checks.json": "2e76a96474866af72dd9ff0518fbd073a9a126957a82f89924b07bb5027755a9",
  "docs/hanja-g1-batch6-2026-09-18/corrections.json": "f65a0c4ac33df2ee6cb3dc40fad4e4c9c85797f6ed6f977d2c8b2aafdd103238",
  "docs/hanja-g1-batch6-2026-09-18/candidate-paths.json": "5aa05b34c9f71d38e29df6044d64aa96609896bc6fa6077909b6933e3e35eb5f",
  "docs/hanja-g1-batch6-2026-09-18/review.json": "40f1fd31fc7e012afb37b76e7e5beed4688d518054ea232098015e4079467d7a"
}
export function validateG1Batch6DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH6_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch6 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch6DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch6DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch6 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch6 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch6 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch6 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch6 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch6DictionaryBundle(): G1Batch6DictionaryBundle {
  validateG1Batch6DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH6_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH6_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH6_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch6 dictionary approved set mismatch')
  const characters = G1_BATCH6_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.strokes !== ref.strokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay <= list[i - 1].delay)))
      throw Error('G1 batch6 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch6DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch6 dictionary frozen candidate mismatch')
    return { ...g1Batch6DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH6_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH6_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch6DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch6DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH6_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch6 dictionary published entry mismatch')
}
export function validateG1Batch6DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH6_STROKES) {
  const expected = buildG1Batch6DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH6_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch6 dictionary published bundle mismatch')
}
