/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_BATCH6_DICTIONARY_VERIFICATION, G2_BATCH6_DICTIONARY_GEOMETRY, G2_BATCH6_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_BATCH6_STROKES, g2Batch6DictionaryReference, g2Batch6DictionaryMetadata,
  type G2Batch6DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-batch6.ts'

const dir = 'docs/hanja-g2-batch6-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH6_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_BATCH6_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch6-2026-09-16/initial-observations.json": "2c5f17b064fb34d82d96feaf79c885fcc9318610472b7e77860ad30d5255658e",
  "docs/hanja-g2-batch6-2026-09-16/originals.json": "4468413a64c50ee7715fa375a1b87cf98f4b731809e6374f374fc521ba6dcfa4",
  "docs/hanja-g2-batch6-2026-09-16/observations.json": "67a1e289d3c225df447bc8212e6ec7b52c07b8f84db1e29c5465d1eac262dd8d",
  "docs/hanja-g2-batch6-2026-09-16/proposals.json": "8cd900a3896a2e26a2b764fda4371cd9cfbe863792c0ebd2cbc19198262e6c7f",
  "docs/hanja-g2-batch6-2026-09-16/source-checks.json": "b0b28aad8a1bbf463103cae07fa32282e0741a754605e4e42be500dd1a099699",
  "docs/hanja-g2-batch6-2026-09-16/corrections.json": "0ce4eaaed79a3f34b30fccf95acfa9dd4e3a4832a91817817c006b399625f082",
  "docs/hanja-g2-batch6-2026-09-16/candidate-paths.json": "407e2c9c04fe0ece730cbc79f1ac66f9486c5d1a80b8720d06acb2c640cbf0cc",
  "docs/hanja-g2-batch6-2026-09-16/review.json": "fc08a6c004bbee5012d6225a4c14404a9e777d6c8090c40bea9aec2e6f5a9309"
}
export function validateG2Batch6DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_BATCH6_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 batch6 dictionary proof mismatch: ' + path)
  }
}
export function g2Batch6DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2Batch6DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 batch6 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 batch6 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 batch6 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 batch6 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 batch6 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2Batch6DictionaryBundle(): G2Batch6DictionaryBundle {
  validateG2Batch6DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_BATCH6_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_BATCH6_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_BATCH6_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 batch6 dictionary approved set mismatch')
  const characters = G2_BATCH6_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 batch6 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2Batch6DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 batch6 dictionary frozen candidate mismatch')
    return { ...g2Batch6DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_BATCH6_DICTIONARY_VERIFICATION, geometrySources: G2_BATCH6_DICTIONARY_GEOMETRY, characters }
}
export function validateG2Batch6DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2Batch6DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_BATCH6_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 batch6 dictionary published entry mismatch')
}
export function validateG2Batch6DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_BATCH6_STROKES) {
  const expected = buildG2Batch6DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_BATCH6_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 batch6 dictionary published bundle mismatch')
}
