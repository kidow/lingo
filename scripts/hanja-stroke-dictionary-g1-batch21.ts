/** Offline, fail-closed reconstruction of licensed special grade II geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G1_BATCH21_DICTIONARY_VERIFICATION, G1_BATCH21_DICTIONARY_GEOMETRY, G1_BATCH21_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G1_BATCH21_STROKES, g1Batch21DictionaryReference, g1Batch21DictionaryMetadata,
  type G1Batch21DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g1-batch21.ts'

const dir = 'docs/hanja-g1-batch21-2026-09-20/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH21_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; checks: Record<string, string> }
}
export const G1_BATCH21_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g1-batch21-2026-09-20/originals.json": "12f4c13876dba89f55d7e8fcbe9aa0fe162801e23943639f12342671e87f7f42",
  "docs/hanja-g1-batch21-2026-09-20/observations.json": "a53d1ed4f6140d9020f991039292f991fd749f1307618f78a104d940f6059033",
  "docs/hanja-g1-batch21-2026-09-20/proposals.json": "43b393ccf9a8a30d5c12d40d3aa2044995ee15d2fccd91476d3275b7ddff5b9b",
  "docs/hanja-g1-batch21-2026-09-20/source-checks.json": "f871f0f9dd4ddcbeaa6938aa346b0195998adf34b3d896b6dc3b7e05c6bdca76",
  "docs/hanja-g1-batch21-2026-09-20/corrections.json": "055167efafe495adeaf8127ec7a362d5da075359e3a6b28bb48bb104517914b4",
  "docs/hanja-g1-batch21-2026-09-20/candidate-paths.json": "d570e352e8f60ce78c18ee80fc563c0692e29dd6f2a3407be445e5a3d32341e2",
  "docs/hanja-g1-batch21-2026-09-20/review.json": "4ba19c6bb9f8eb074b44c5ea372c0c7b5f4aebcfa7123a339a6356981b78e4f0"
}
export function validateG1Batch21DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G1_BATCH21_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G1 batch21 dictionary proof mismatch: ' + path)
  }
}
export function g1Batch21DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g1Batch21DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G1 batch21 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G1 batch21 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G1 batch21 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G1 batch21 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G1 batch21 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG1Batch21DictionaryBundle(): G1Batch21DictionaryBundle {
  validateG1Batch21DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G1_BATCH21_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G1_BATCH21_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G1_BATCH21_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G1 batch21 dictionary approved set mismatch')
  const characters = G1_BATCH21_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G1 batch21 dictionary review incomplete: ' + ref.glyph)
    const geometry = g1Batch21DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G1 batch21 dictionary frozen candidate mismatch')
    return { ...g1Batch21DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G1_BATCH21_DICTIONARY_VERIFICATION, geometrySources: G1_BATCH21_DICTIONARY_GEOMETRY, characters }
}
export function validateG1Batch21DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG1Batch21DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G1_BATCH21_DICTIONARY_VERIFICATION.id }))
    throw Error('G1 batch21 dictionary published entry mismatch')
}
export function validateG1Batch21DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G1_BATCH21_STROKES) {
  const expected = buildG1Batch21DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G1_BATCH21_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G1 batch21 dictionary published bundle mismatch')
}
