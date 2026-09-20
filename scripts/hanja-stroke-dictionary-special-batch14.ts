/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH14_DICTIONARY_VERIFICATION, SPECIAL_BATCH14_DICTIONARY_GEOMETRY, SPECIAL_BATCH14_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES, specialBatch14DictionaryReference, specialBatch14DictionaryMetadata,
  type SpecialBatch14DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch14.ts'

const dir = 'docs/hanja-special-batch14-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH14_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH14_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch14-2026-09-20/originals.json": "84274524f38be76baded09ecbe504699cd41b20e425c70a02446adf41e62fde0",
  "docs/hanja-special-batch14-2026-09-20/observations.json": "be8bb55272839f4ddd5fbb507f8d7678a1abe97396198b44fa8bf36fdd434243",
  "docs/hanja-special-batch14-2026-09-20/proposals.json": "a1b2cb6eb65b308244cef35e86ad96f88ba5a11647b985c652e6b5116d220b12",
  "docs/hanja-special-batch14-2026-09-20/source-checks.json": "01e6cc12cf825aae54af3bf372953d4b68ed59605acbeea60a131bc6bea90824",
  "docs/hanja-special-batch14-2026-09-20/corrections.json": "ca42350fd03cfbc047f34d1a99dc83e384a8094eab5da5ea82f474f2aa0156fa",
  "docs/hanja-special-batch14-2026-09-20/candidate-paths.json": "1e42f3b0cf84b85e3f74d83836b81b65cd4af8a8e19d3fbef3a6accbf53ecc3f",
  "docs/hanja-special-batch14-2026-09-20/review.json": "8e46881822b99d98c40e7e47befeb43113badb0c556cfd0869c562666c42f34c"
}
export function validateSpecialBatch14DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH14_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch14 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch14DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch14DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch14 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch14 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch14 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch14 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch14 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch14DictionaryBundle(): SpecialBatch14DictionaryBundle {
  validateSpecialBatch14DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH14_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH14_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH14_DICTIONARY_GEOMETRY) || originals.entries.length !== 30
    || new Set(originals.entries.map(e => e.glyph)).size !== 30 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch14 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH14_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch14 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch14DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch14 dictionary frozen candidate mismatch')
    return { ...specialBatch14DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH14_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH14_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch14DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch14DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH14_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch14 dictionary published entry mismatch')
}
export function validateSpecialBatch14DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES) {
  const expected = buildSpecialBatch14DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH14_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch14 dictionary published bundle mismatch')
}
