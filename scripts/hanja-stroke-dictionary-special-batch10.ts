/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH10_DICTIONARY_VERIFICATION, SPECIAL_BATCH10_DICTIONARY_GEOMETRY, SPECIAL_BATCH10_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES, specialBatch10DictionaryReference, specialBatch10DictionaryMetadata,
  type SpecialBatch10DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch10.ts'

const dir = 'docs/hanja-special-batch10-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH10_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH10_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch10-2026-09-20/originals.json": "ceca9a89c6690efd0782fb545ab1216abca86d13215f107e3594841175c2af11",
  "docs/hanja-special-batch10-2026-09-20/observations.json": "981e47df722389355a040496a7f9fd918b879520301a7bbf186ac618102e91bc",
  "docs/hanja-special-batch10-2026-09-20/proposals.json": "bf624f4f951ec76c70a1c7ed177ce75b99cbab6fe7a62d6922cd7beaf5680092",
  "docs/hanja-special-batch10-2026-09-20/source-checks.json": "f6ed907c9c7767a29cdbeb0b4944218038bf4683cf4555f50e601848ff2b6a9d",
  "docs/hanja-special-batch10-2026-09-20/corrections.json": "77e1361022f019a23d63a1382c6c28e6211f952d6363a533d9cf429d9a763c65",
  "docs/hanja-special-batch10-2026-09-20/candidate-paths.json": "9838aa1fe89b672682a1064d2ebf61f17026ca95e6fa7b38f28e2aa5fc005d3d",
  "docs/hanja-special-batch10-2026-09-20/review.json": "d470f79920fc785af85928929a88209ac5ff110cdb96759bb9993d44823f9dee"
}
export function validateSpecialBatch10DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH10_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch10 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch10DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch10DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch10 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch10 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch10 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch10 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch10 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch10DictionaryBundle(): SpecialBatch10DictionaryBundle {
  validateSpecialBatch10DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH10_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH10_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH10_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch10 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH10_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch10 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch10DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch10 dictionary frozen candidate mismatch')
    return { ...specialBatch10DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH10_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH10_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch10DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch10DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH10_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch10 dictionary published entry mismatch')
}
export function validateSpecialBatch10DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES) {
  const expected = buildSpecialBatch10DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH10_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch10 dictionary published bundle mismatch')
}
