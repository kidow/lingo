/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_BATCH8_DICTIONARY_VERIFICATION, G2_BATCH8_DICTIONARY_GEOMETRY, G2_BATCH8_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_BATCH8_STROKES, g2Batch8DictionaryReference, g2Batch8DictionaryMetadata,
  type G2Batch8DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-batch8.ts'

const dir = 'docs/hanja-g2-batch8-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH8_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_BATCH8_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch8-2026-09-16/initial-observations.json": "1281bb8bac6d2547c0ec55f151374cca8b17c0614d04512795b42784db855b53",
  "docs/hanja-g2-batch8-2026-09-16/originals.json": "a2142f7739d70ddb3ec33f49aec120c245383b36bacbf754afb533f137462b12",
  "docs/hanja-g2-batch8-2026-09-16/observations.json": "767b36903b30ba5da9d407b4b55f23639eb7c3bfbf6d34fb1693e72d47fdef0c",
  "docs/hanja-g2-batch8-2026-09-16/proposals.json": "fe72e6f264334584e5d7530461dea98082321972dba6ed7d779c6473bf4b8491",
  "docs/hanja-g2-batch8-2026-09-16/source-checks.json": "7dade14587468e6dce9eaeb995f232241b78ee01026fe54560cd5128f027ea80",
  "docs/hanja-g2-batch8-2026-09-16/corrections.json": "0a61960609a17e1687ac1b78696473316ccdf08f25b1f39b20a819e1e69dc957",
  "docs/hanja-g2-batch8-2026-09-16/candidate-paths.json": "2fe79be41904cede1263fd89034b6e79f5c379645f1ceb38414e93e894bd83f3",
  "docs/hanja-g2-batch8-2026-09-16/review.json": "bb7b203b04e2ed5d71a403dfec8bc2b216eb215a3a7b0c3a8341ace7c4a9caca"
}
export function validateG2Batch8DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_BATCH8_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 batch8 dictionary proof mismatch: ' + path)
  }
}
export function g2Batch8DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2Batch8DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 batch8 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 batch8 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 batch8 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 batch8 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 batch8 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2Batch8DictionaryBundle(): G2Batch8DictionaryBundle {
  validateG2Batch8DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_BATCH8_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_BATCH8_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_BATCH8_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 batch8 dictionary approved set mismatch')
  const characters = G2_BATCH8_DICTIONARY_REFERENCES.map(ref => {
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
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.strokes || new Set(source.strokes.map(s => s.xmlIndex)).size !== ref.strokes
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 batch8 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2Batch8DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 batch8 dictionary frozen candidate mismatch')
    return { ...g2Batch8DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_BATCH8_DICTIONARY_VERIFICATION, geometrySources: G2_BATCH8_DICTIONARY_GEOMETRY, characters }
}
export function validateG2Batch8DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2Batch8DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_BATCH8_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 batch8 dictionary published entry mismatch')
}
export function validateG2Batch8DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_BATCH8_STROKES) {
  const expected = buildG2Batch8DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_BATCH8_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 batch8 dictionary published bundle mismatch')
}
