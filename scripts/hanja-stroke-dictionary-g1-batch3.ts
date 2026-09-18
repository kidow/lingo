/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH3_DICTIONARY_VERIFICATION, G1_BATCH3_DICTIONARY_GEOMETRY, G1_BATCH3_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH3_STROKES, g1Batch3DictionaryReference, g1Batch3DictionaryMetadata,
  type G1Batch3DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch3.ts'

const dir = 'docs/hanja-g1-batch3-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH3_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH3_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch3-2026-09-18/originals.json": "8e5bd4a29cc516f88c777756dc785fbfd32666086d26026416cce87f5b9257cf",
  "docs/hanja-g1-batch3-2026-09-18/observations.json": "cf51a39620e465c0be5018066d366c197ac016ae41247801bf2c8c2393ce8718",
  "docs/hanja-g1-batch3-2026-09-18/proposals.json": "fa88406adcecf0398ba7709da9b6a76e3b3716868f450e33eadc3a755b99881b",
  "docs/hanja-g1-batch3-2026-09-18/source-checks.json": "372237ee7c100720632b64649da524f93b136e1b636ab3aca518a198e4b45f7b",
  "docs/hanja-g1-batch3-2026-09-18/corrections.json": "620a04bea2d916522b424053009d99546b7279755417ef5eaa361ba17a94b408",
  "docs/hanja-g1-batch3-2026-09-18/candidate-paths.json": "28550b61ff0338bf6fcd5afb13f0175fa3836e525f2d1d7be7252258388d1c60",
  "docs/hanja-g1-batch3-2026-09-18/review.json": "39b69cbdd41e0530e38a0912cec75c3faf22970f8d74c9cb2f5f5c5e5b675d7f"
}
export function validateG1Batch3DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH3_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch3 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch3DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch3DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch3 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch3 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch3 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch3 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch3 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch3DictionaryBundle(): G1Batch3DictionaryBundle {
  validateG1Batch3DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH3_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH3_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH3_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch3 dictionary approved set mismatch')
  const characters = G1_BATCH3_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch3 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch3DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch3 dictionary frozen candidate mismatch')
    return { ...g1Batch3DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH3_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH3_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch3DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch3DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH3_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch3 dictionary published entry mismatch')
}
export function validateG1Batch3DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH3_STROKES) {
  const expected = buildG1Batch3DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH3_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch3 dictionary published bundle mismatch')
}
