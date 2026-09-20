/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH9_DICTIONARY_VERIFICATION, SPECIAL_BATCH9_DICTIONARY_GEOMETRY, SPECIAL_BATCH9_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES, specialBatch9DictionaryReference, specialBatch9DictionaryMetadata,
  type SpecialBatch9DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch9.ts'

const dir = 'docs/hanja-special-batch9-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH9_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH9_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch9-2026-09-20/originals.json": "0ce17d71517a416b3769bbe6bdc754ebb4e69a6b881323c00de8383023cc0f6a",
  "docs/hanja-special-batch9-2026-09-20/observations.json": "e36213f9d9d63b54e4900e3c5095bf1be6126748eeb65b92958d7c828af07b1e",
  "docs/hanja-special-batch9-2026-09-20/proposals.json": "132a90e27259f6094d8bf0899d16f95fec85b6c968b53f732953959fd9004df2",
  "docs/hanja-special-batch9-2026-09-20/source-checks.json": "af6ea4ba3e2cb444ff1c70d5a036e1bd94106c7089b29fdc973ab4aa9a6eb55f",
  "docs/hanja-special-batch9-2026-09-20/corrections.json": "56011259806c73e58524d6960324c552ac15f83fde29c9621e7b5ea567cdc3a5",
  "docs/hanja-special-batch9-2026-09-20/candidate-paths.json": "d57c0f2b258378a257d4b4e8124fa588cf2f381806331b8186437718532666bd",
  "docs/hanja-special-batch9-2026-09-20/review.json": "5b965b65d2e72d790055eaa9558a67abc4f5d8a69b35d72cf19eb1cc5df7b1d9"
}
export function validateSpecialBatch9DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH9_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch9 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch9DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch9DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch9 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch9 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch9 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch9 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch9 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch9DictionaryBundle(): SpecialBatch9DictionaryBundle {
  validateSpecialBatch9DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH9_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH9_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH9_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch9 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH9_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch9 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch9DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch9 dictionary frozen candidate mismatch')
    return { ...specialBatch9DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH9_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH9_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch9DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch9DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH9_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch9 dictionary published entry mismatch')
}
export function validateSpecialBatch9DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES) {
  const expected = buildSpecialBatch9DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH9_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch9 dictionary published bundle mismatch')
}
