/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH23_DICTIONARY_VERIFICATION, G1_BATCH23_DICTIONARY_GEOMETRY, G1_BATCH23_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH23_STROKES, g1Batch23DictionaryReference, g1Batch23DictionaryMetadata,
  type G1Batch23DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch23.ts'

const dir = 'docs/hanja-g1-batch23-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH23_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH23_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch23-2026-09-20/originals.json": "00a85b6a7aca238c5a07aa535e41f2ffbbdded044d25159a53efb26d340fe7ad",
  "docs/hanja-g1-batch23-2026-09-20/observations.json": "179395840136157a19661df17ecde2e07fce4075a41f1fd7b5fb2f8f8055c60d",
  "docs/hanja-g1-batch23-2026-09-20/proposals.json": "b52d6339868e72bca397c00e04478545eb84ae7f90f5850123c49ddecfc1d6df",
  "docs/hanja-g1-batch23-2026-09-20/source-checks.json": "98983feee8922ba02e6f8ed56c9521538e64db640b2168cea2baf3ab8253a14c",
  "docs/hanja-g1-batch23-2026-09-20/corrections.json": "3bcc299afbaa54381f69c17e808af376a9ec3334f84a808eb1b7ab09dc3a693b",
  "docs/hanja-g1-batch23-2026-09-20/candidate-paths.json": "5e7ea153799d0716a4b9d07e593e703a3052e3b9ef0378ac86e33093d7121626",
  "docs/hanja-g1-batch23-2026-09-20/review.json": "9f1a9cd59514282714516a13d5216ec2d9e7caf471c116b8ef40e5991d218d78"
}
export function validateG1Batch23DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH23_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch23 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch23DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch23DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch23 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch23 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch23 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch23 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch23 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch23DictionaryBundle(): G1Batch23DictionaryBundle {
  validateG1Batch23DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH23_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH23_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH23_DICTIONARY_GEOMETRY) || originals.entries.length !== 3
    || new Set(originals.entries.map(e => e.glyph)).size !== 3 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch23 dictionary approved set mismatch')
  const characters = G1_BATCH23_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch23 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch23DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch23 dictionary frozen candidate mismatch')
    return { ...g1Batch23DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH23_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH23_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch23DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch23DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH23_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch23 dictionary published entry mismatch')
}
export function validateG1Batch23DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH23_STROKES) {
  const expected = buildG1Batch23DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH23_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch23 dictionary published bundle mismatch')
}
