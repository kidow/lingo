/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH8_DICTIONARY_VERIFICATION, SPECIAL_BATCH8_DICTIONARY_GEOMETRY, SPECIAL_BATCH8_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES, specialBatch8DictionaryReference, specialBatch8DictionaryMetadata,
  type SpecialBatch8DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch8.ts'

const dir = 'docs/hanja-special-batch8-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH8_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH8_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch8-2026-09-20/originals.json": "6200df176b282e8088656dde583f9a91b9dbfb77d56097dcea1be475932fd5a5",
  "docs/hanja-special-batch8-2026-09-20/observations.json": "0e88fd9dcbea02b718281f91f25fb5ef58040a8c3715310064178cf76aa07238",
  "docs/hanja-special-batch8-2026-09-20/proposals.json": "899a795d2817047ae16a7b56ddff63485c1a831200e919889d9ad410ffdcf92e",
  "docs/hanja-special-batch8-2026-09-20/source-checks.json": "34b2bd048291d5bc28e07eef60d5e2c79f8aca074047c757d297ed994002c61e",
  "docs/hanja-special-batch8-2026-09-20/corrections.json": "9250d0c5a9f197ccfa8401cec51a100fab7b5c640a50ff219fb768488d0d76bc",
  "docs/hanja-special-batch8-2026-09-20/candidate-paths.json": "d60389d7a316954e7f83b71113a5bc3b5ad113ffdfb8783d2346f06cbf674d5d",
  "docs/hanja-special-batch8-2026-09-20/review.json": "914fefde3599d8ec27774c36a66e5e9d05c96f2593d8a44a56f8a8d1b4ba2c59"
}
export function validateSpecialBatch8DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH8_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch8 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch8DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch8DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch8 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch8 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch8 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch8 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch8 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch8DictionaryBundle(): SpecialBatch8DictionaryBundle {
  validateSpecialBatch8DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH8_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH8_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH8_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch8 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH8_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch8 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch8DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch8 dictionary frozen candidate mismatch')
    return { ...specialBatch8DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH8_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH8_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch8DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch8DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH8_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch8 dictionary published entry mismatch')
}
export function validateSpecialBatch8DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES) {
  const expected = buildSpecialBatch8DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH8_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch8 dictionary published bundle mismatch')
}
