/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL2_BATCH10_DICTIONARY_VERIFICATION, SPECIAL2_BATCH10_DICTIONARY_GEOMETRY, SPECIAL2_BATCH10_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES, special2Batch10DictionaryReference, special2Batch10DictionaryMetadata,
  type Special2Batch10DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special2-batch10.ts'

const dir = 'docs/hanja-special2-batch10-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL2_BATCH10_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL2_BATCH10_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special2-batch10-2026-09-18/originals.json": "90e7e47e69e844a1db2e569c565644b239de4b3572bc9cb703a61344efaa326c",
  "docs/hanja-special2-batch10-2026-09-18/observations.json": "fa9af9a869dcca7c9bbf5764b03834444939d574d733678e5423aedc66ffeace",
  "docs/hanja-special2-batch10-2026-09-18/proposals.json": "aeede1ce59bd08d3ab276772de392aca1f47dcae80a80b0910108b6b4588e943",
  "docs/hanja-special2-batch10-2026-09-18/source-checks.json": "34f878d46f90f18777cdaaaf343613ee171524ce88ef070b81455bffeb7ff48f",
  "docs/hanja-special2-batch10-2026-09-18/corrections.json": "313cc863c072a139bcaf1a5e6b48efbba286d9be386b917f4c737837b252f8c3",
  "docs/hanja-special2-batch10-2026-09-18/candidate-paths.json": "d1fb77df510d853c6a229cfb96351a35ad524a612e6583dc47993115d093a862",
  "docs/hanja-special2-batch10-2026-09-18/review.json": "0ac3e1aa14e6eedcf855b88c032b364788033e8b6502f0df99a72c3e9e1dadde"
}
export function validateSpecial2Batch10DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL2_BATCH10_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special2 batch10 dictionary proof mismatch: ' + path)
  }
}
export function special2Batch10DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = special2Batch10DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special2 batch10 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special2 batch10 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special2 batch10 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special2 batch10 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special2 batch10 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecial2Batch10DictionaryBundle(): Special2Batch10DictionaryBundle {
  validateSpecial2Batch10DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL2_BATCH10_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL2_BATCH10_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL2_BATCH10_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special2 batch10 dictionary approved set mismatch')
  const characters = SPECIAL2_BATCH10_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special2 batch10 dictionary review incomplete: ' + ref.glyph)
    const geometry = special2Batch10DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special2 batch10 dictionary frozen candidate mismatch')
    return { ...special2Batch10DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL2_BATCH10_DICTIONARY_VERIFICATION, geometrySources: SPECIAL2_BATCH10_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecial2Batch10DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecial2Batch10DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL2_BATCH10_DICTIONARY_VERIFICATION.id }))
    throw Error('Special2 batch10 dictionary published entry mismatch')
}
export function validateSpecial2Batch10DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES) {
  const expected = buildSpecial2Batch10DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL2_BATCH10_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special2 batch10 dictionary published bundle mismatch')
}
