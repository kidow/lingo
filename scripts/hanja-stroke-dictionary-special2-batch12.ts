/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH12_DICTIONARY_VERIFICATION, SPECIAL2_BATCH12_DICTIONARY_GEOMETRY, SPECIAL2_BATCH12_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES, special2Batch12DictionaryReference, special2Batch12DictionaryMetadata,
  type Special2Batch12DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch12.ts'

const dir = 'docs/hanja-special2-batch12-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH12_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH12_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch12-2026-09-18/originals.json": "19eb0916daac1d499a8771723f922df5a533bc24fae10c57cae01c88181c1269",
  "docs/hanja-special2-batch12-2026-09-18/observations.json": "7a5830f598fedfd84191e75ec87f776ab2b485093572663c479682d2fc34abaf",
  "docs/hanja-special2-batch12-2026-09-18/proposals.json": "ed2443869f7c6666ca922ee0be12e6ee7ccb3f059365e82c1d9a71317ae46a67",
  "docs/hanja-special2-batch12-2026-09-18/source-checks.json": "a9301da9dda9d291ee244662e8a979ed8c733fda8351a82efb95bcfbb6167afb",
  "docs/hanja-special2-batch12-2026-09-18/corrections.json": "2fcc11f87976e35c55fe05c4e5c182ff494da15fcb87f6a706336037dc4341c4",
  "docs/hanja-special2-batch12-2026-09-18/candidate-paths.json": "2c15f3dbaf1f0a550a897b7636a1282175077f12aa5b7ce4a6de72b364598a89",
  "docs/hanja-special2-batch12-2026-09-18/review.json": "e6ec4142a861ddeb77c2acd81a8046dd75e28dab89566a0cb005faf53b58ed75"
}
export function validateSpecial2Batch12DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH12_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch12 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch12DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch12DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch12 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch12 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch12 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch12 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch12 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch12DictionaryBundle(): Special2Batch12DictionaryBundle {
  validateSpecial2Batch12DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH12_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH12_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH12_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch12 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH12_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch12 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch12DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch12 dictionary frozen candidate mismatch')
    return { ...special2Batch12DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH12_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH12_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch12DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch12DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH12_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch12 dictionary published entry mismatch')
}
export function validateSpecial2Batch12DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES) {
  const expected = buildSpecial2Batch12DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH12_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch12 dictionary published bundle mismatch')
}
