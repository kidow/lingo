/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH13_DICTIONARY_VERIFICATION, SPECIAL_BATCH13_DICTIONARY_GEOMETRY, SPECIAL_BATCH13_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES, specialBatch13DictionaryReference, specialBatch13DictionaryMetadata,
  type SpecialBatch13DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch13.ts'

const dir = 'docs/hanja-special-batch13-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH13_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH13_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch13-2026-09-20/originals.json": "d8de4b790cafb43206864239f9fbeafa422aaf5922a615acff6289ea2f35e96d",
  "docs/hanja-special-batch13-2026-09-20/observations.json": "95347dc215be684ed3c99ccb561ded6da8a28f64512df1fc2d3c282e95efdd0f",
  "docs/hanja-special-batch13-2026-09-20/proposals.json": "57c54e7fa69c9378b8b66b51c69c12a7adc7590ed8bb79c228e447cb8c7a3719",
  "docs/hanja-special-batch13-2026-09-20/source-checks.json": "2b3d4df51e90113015b415c4ee7629fafdc703fe012a36ac3e785a3aed932182",
  "docs/hanja-special-batch13-2026-09-20/corrections.json": "d4e2a9b0ae3a9dae3b59e4fbedce659f0bd0012802d5b1f2999211cdef918dbf",
  "docs/hanja-special-batch13-2026-09-20/candidate-paths.json": "8040122bd5ec5a4ba577673cf094545fbc557c8b853286d203e72f7b0a3d941e",
  "docs/hanja-special-batch13-2026-09-20/review.json": "f6cb4b9a46dfa5c8e1a23e9d09c6c9545c590eefb025f6752f7d8f3fa3b4b08e"
}
export function validateSpecialBatch13DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH13_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch13 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch13DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch13DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch13 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch13 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch13 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch13 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch13 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch13DictionaryBundle(): SpecialBatch13DictionaryBundle {
  validateSpecialBatch13DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH13_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH13_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH13_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch13 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH13_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch13 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch13DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch13 dictionary frozen candidate mismatch')
    return { ...specialBatch13DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH13_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH13_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch13DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch13DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH13_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch13 dictionary published entry mismatch')
}
export function validateSpecialBatch13DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES) {
  const expected = buildSpecialBatch13DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH13_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch13 dictionary published bundle mismatch')
}
