/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_BATCH4_DICTIONARY_VERIFICATION, G2_BATCH4_DICTIONARY_GEOMETRY, G2_BATCH4_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_BATCH4_STROKES, g2Batch4DictionaryReference, g2Batch4DictionaryMetadata,
  type G2Batch4DictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-batch4.ts'

const dir = 'docs/hanja-g2-batch4-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH4_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_BATCH4_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-batch4-2026-09-16/initial-observations.json": "b4f3fd6091f6a344bde8f0e919c34f2d5bc967e883eae2b8c2681b9b45b68a18",
  "docs/hanja-g2-batch4-2026-09-16/originals.json": "2e2c063f61b7c7abae449335c3c8ce656aa3ca55611f96a5fcf282cd3d68adf8",
  "docs/hanja-g2-batch4-2026-09-16/observations.json": "528b18571292610b23478db692b5e0ea831629d51fbea7da61355c1e23b5a989",
  "docs/hanja-g2-batch4-2026-09-16/proposals.json": "557156d1916047646fd2ee4c81fa3c3750d24a66216a6a2c46ff285070cbbeac",
  "docs/hanja-g2-batch4-2026-09-16/source-checks.json": "0a1e8f3fe2e4c62a8127d0c38ce745ffc0f1380c7612a2c17321786d8d4dd75b",
  "docs/hanja-g2-batch4-2026-09-16/corrections.json": "99f620da740cca55e7d4516d7d15fb1ffc87360a7738f2c161a85fcbed71024f",
  "docs/hanja-g2-batch4-2026-09-16/candidate-paths.json": "b8573d87d512b36d197be79a0a829aaf604060aa70ca04a157c252d05dbbfba1",
  "docs/hanja-g2-batch4-2026-09-16/review.json": "e8cb3b64ff92f3641131f278006625d0436127d037d7f4f32406791d8bb3f281"
}
export function validateG2Batch4DictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_BATCH4_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 batch4 dictionary proof mismatch: ' + path)
  }
}
export function g2Batch4DictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2Batch4DictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 batch4 dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 batch4 dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 batch4 dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || !r.derivedFromStroke) throw Error('G2 batch4 dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 batch4 dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2Batch4DictionaryBundle(): G2Batch4DictionaryBundle {
  validateG2Batch4DictionaryProofs()
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_BATCH4_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_BATCH4_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_BATCH4_DICTIONARY_GEOMETRY) || originals.entries.length !== 50
    || new Set(originals.entries.map(e => e.glyph)).size !== 50 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 batch4 dictionary approved set mismatch')
  const characters = G2_BATCH4_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 batch4 dictionary review incomplete: ' + ref.glyph)
    const geometry = g2Batch4DictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 batch4 dictionary frozen candidate mismatch')
    return { ...g2Batch4DictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_BATCH4_DICTIONARY_VERIFICATION, geometrySources: G2_BATCH4_DICTIONARY_GEOMETRY, characters }
}
export function validateG2Batch4DictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2Batch4DictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_BATCH4_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 batch4 dictionary published entry mismatch')
}
export function validateG2Batch4DictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_BATCH4_STROKES) {
  const expected = buildG2Batch4DictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_BATCH4_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 batch4 dictionary published bundle mismatch')
}
