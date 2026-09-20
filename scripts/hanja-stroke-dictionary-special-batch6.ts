/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH6_DICTIONARY_VERIFICATION, SPECIAL_BATCH6_DICTIONARY_GEOMETRY, SPECIAL_BATCH6_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES, specialBatch6DictionaryReference, specialBatch6DictionaryMetadata,
  type SpecialBatch6DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch6.ts'

const dir = 'docs/hanja-special-batch6-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH6_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH6_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch6-2026-09-20/originals.json": "79ec1f9ea3dd14aea96959b2722f5e71c051e668bba9b1367063d28bad668d44",
  "docs/hanja-special-batch6-2026-09-20/observations.json": "57aba2a686714bce464fbfa2962edbac1334782e8eafa0bae7849acd4eb77612",
  "docs/hanja-special-batch6-2026-09-20/proposals.json": "f2e98994a8e330d0ea76386b4d87059e71c713d8e88ed10cbd2fbe218a95e68c",
  "docs/hanja-special-batch6-2026-09-20/source-checks.json": "776fe249d7dadb9aa1d037469d3a1d490ea5a55b3272dce6cff2cfa0cf5b63ca",
  "docs/hanja-special-batch6-2026-09-20/corrections.json": "28ddc9f8322a57832d50079923a78244ccce5daff4248e6b9ceab1ec06ab6676",
  "docs/hanja-special-batch6-2026-09-20/candidate-paths.json": "0a7c4f95228a0ff42c15bbce15efa6285eaf9cf5303a5b3b0fb0d5733fc53f5e",
  "docs/hanja-special-batch6-2026-09-20/review.json": "d166f4d095fb0f281ce05ccfe7e322a15cfc51855923ed9530ce081a88568825"
}
export function validateSpecialBatch6DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH6_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch6 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch6DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch6DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch6 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch6 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch6 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch6 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch6 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch6DictionaryBundle(): SpecialBatch6DictionaryBundle {
  validateSpecialBatch6DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH6_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH6_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH6_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch6 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH6_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch6 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch6DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch6 dictionary frozen candidate mismatch')
    return { ...specialBatch6DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH6_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH6_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch6DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch6DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH6_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch6 dictionary published entry mismatch')
}
export function validateSpecialBatch6DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES) {
  const expected = buildSpecialBatch6DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH6_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch6 dictionary published bundle mismatch')
}
