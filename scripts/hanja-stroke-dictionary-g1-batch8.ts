/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH8_DICTIONARY_VERIFICATION, G1_BATCH8_DICTIONARY_GEOMETRY, G1_BATCH8_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH8_STROKES, g1Batch8DictionaryReference, g1Batch8DictionaryMetadata,
  type G1Batch8DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch8.ts'

const dir = 'docs/hanja-g1-batch8-2026-09-19/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH8_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH8_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch8-2026-09-19/originals.json": "14fa100e0bc7416f7e014375a8f67b101b56b40048131ddc7a5d0aff40abecea",
  "docs/hanja-g1-batch8-2026-09-19/observations.json": "d2c27e891519f970c1a10a20d35199127d573c30555d29fd8c1d36b7aac8a75d",
  "docs/hanja-g1-batch8-2026-09-19/proposals.json": "7d06140a41f85af9d37360615d31e5aaa252eed85328e6069cf9b904784948aa",
  "docs/hanja-g1-batch8-2026-09-19/source-checks.json": "233e300f3d872288e2ecf585dea2eef718706558484eb851e2bc0658faffe6ca",
  "docs/hanja-g1-batch8-2026-09-19/corrections.json": "ce5407060a2a3a4d684bf06b4218718a057632fd5c86bc4b69c95b20d3c720ef",
  "docs/hanja-g1-batch8-2026-09-19/candidate-paths.json": "d2c32e0c1dced0cac88246ba1af5156c84277af59a06a689f80f23dd9417c348",
  "docs/hanja-g1-batch8-2026-09-19/review.json": "cba5c888eaeccfd1cb82ea53db5bc86bd287e49af50be7b906011fa7451e9e38"
}
export function validateG1Batch8DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH8_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch8 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch8DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch8DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch8 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch8 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch8 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch8 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch8 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch8DictionaryBundle(): G1Batch8DictionaryBundle {
  validateG1Batch8DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH8_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH8_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH8_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch8 dictionary approved set mismatch')
  const characters = G1_BATCH8_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch8 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch8DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch8 dictionary frozen candidate mismatch')
    return { ...g1Batch8DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH8_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH8_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch8DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch8DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH8_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch8 dictionary published entry mismatch')
}
export function validateG1Batch8DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH8_STROKES) {
  const expected = buildG1Batch8DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH8_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch8 dictionary published bundle mismatch')
}
