/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH7_DICTIONARY_VERIFICATION, G1_BATCH7_DICTIONARY_GEOMETRY, G1_BATCH7_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH7_STROKES, g1Batch7DictionaryReference, g1Batch7DictionaryMetadata,
  type G1Batch7DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch7.ts'

const dir = 'docs/hanja-g1-batch7-2026-09-18/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH7_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH7_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch7-2026-09-18/originals.json": "8a6a72c2b644b1d19e6f09f20c5020cfab1086fa69b35d068f3e35b3e6a5cf75",
  "docs/hanja-g1-batch7-2026-09-18/observations.json": "ebcf68bdf39d5eb5589b1a419c0fed9a777d1a7dbcc9cd27dd474bfae7c6c1c1",
  "docs/hanja-g1-batch7-2026-09-18/proposals.json": "0a3113a26715e09a56f02b2fb345a3eda6cba7b367e38349e6aa1983a1f360e9",
  "docs/hanja-g1-batch7-2026-09-18/source-checks.json": "e6c7a9bea82bd8ab511d467ccc4bb4e950b9d5573b8391891c62ccfdba050d39",
  "docs/hanja-g1-batch7-2026-09-18/corrections.json": "09d48ccff48326747260bfe82cdbc11fa141d5c4439bef085ef661afdba1a796",
  "docs/hanja-g1-batch7-2026-09-18/candidate-paths.json": "3f79124e54338e2112e199b262e257aaebb82cead1daa7b88cfccd6e96166380",
  "docs/hanja-g1-batch7-2026-09-18/review.json": "a6d7d54888c027e47eeb339c5857306d132c21b110187e0e18f1d80a01f0a600"
}
export function validateG1Batch7DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH7_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch7 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch7DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch7DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch7 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch7 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch7 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch7 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch7 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch7DictionaryBundle(): G1Batch7DictionaryBundle {
  validateG1Batch7DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH7_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH7_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH7_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch7 dictionary approved set mismatch')
  const characters = G1_BATCH7_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch7 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch7DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch7 dictionary frozen candidate mismatch')
    return { ...g1Batch7DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH7_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH7_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch7DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch7DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH7_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch7 dictionary published entry mismatch')
}
export function validateG1Batch7DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH7_STROKES) {
  const expected = buildG1Batch7DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH7_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch7 dictionary published bundle mismatch')
}
