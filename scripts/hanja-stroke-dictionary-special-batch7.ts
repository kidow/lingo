/** Offline, fail-closed reconstruction of licensed special grade geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  SPECIAL_BATCH7_DICTIONARY_VERIFICATION, SPECIAL_BATCH7_DICTIONARY_GEOMETRY, SPECIAL_BATCH7_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES, specialBatch7DictionaryReference, specialBatch7DictionaryMetadata,
  type SpecialBatch7DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-special-batch7.ts'

const dir = 'docs/hanja-special-batch7-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof SPECIAL_BATCH7_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const SPECIAL_BATCH7_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-special-batch7-2026-09-20/originals.json": "22a7ef43e27e4616f0d5f36c6cee290b07a8aa5771faebb2d60f14da068763ea",
  "docs/hanja-special-batch7-2026-09-20/observations.json": "adb57d93ba6724eb23cfa3833b8adb661c4f66308a910007bc73d91731501e63",
  "docs/hanja-special-batch7-2026-09-20/proposals.json": "d8ca2593c18982d2cb558d5563b4aefbb8bfef970cfb9142150970365ec66e7c",
  "docs/hanja-special-batch7-2026-09-20/source-checks.json": "4cf403a8329dd3cd89654f9bd3f26a8cd37abd12b1ebef6407e239ed8dda45ac",
  "docs/hanja-special-batch7-2026-09-20/corrections.json": "b1d489f87fd6d2c9dea96de69caecf697c23e5a2b4f35d30a9321b36c8ded31a",
  "docs/hanja-special-batch7-2026-09-20/candidate-paths.json": "68a7fb543be67df9ea404c2f95f59b512f461319aa8e9d432ebb6547736b43c8",
  "docs/hanja-special-batch7-2026-09-20/review.json": "a7e46dac243b6f27e9e73e5463cb62f4af4f0362b8663e2e5b26d8645736ac89"
}
export function validateSpecialBatch7DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(SPECIAL_BATCH7_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('Special batch7 dictionary proof mismatch: ' + path)
  }
}
export function specialBatch7DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = specialBatch7DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('Special batch7 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('Special batch7 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('Special batch7 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('Special batch7 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('Special batch7 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildSpecialBatch7DictionaryBundle(): SpecialBatch7DictionaryBundle {
  validateSpecialBatch7DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof SPECIAL_BATCH7_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = SPECIAL_BATCH7_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, SPECIAL_BATCH7_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('Special batch7 dictionary approved set mismatch')
  const characters = SPECIAL_BATCH7_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('Special batch7 dictionary review incomplete: ' + ref.glyph)
    const geometry = specialBatch7DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('Special batch7 dictionary frozen candidate mismatch')
    return { ...specialBatch7DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: SPECIAL_BATCH7_DICTIONARY_VERIFICATION, geometrySources: SPECIAL_BATCH7_DICTIONARY_GEOMETRY, characters }
}
export function validateSpecialBatch7DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildSpecialBatch7DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: SPECIAL_BATCH7_DICTIONARY_VERIFICATION.id }))
    throw Error('Special batch7 dictionary published entry mismatch')
}
export function validateSpecialBatch7DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES) {
  const expected = buildSpecialBatch7DictionaryBundle().characters.map(e => ({ ...e, verificationSource: SPECIAL_BATCH7_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('Special batch7 dictionary published bundle mismatch')
}
