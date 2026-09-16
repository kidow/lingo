/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_XI_DICTIONARY_VERIFICATION, G2_XI_DICTIONARY_GEOMETRY, G2_XI_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_XI_STROKES, g2XiDictionaryReference, g2XiDictionaryMetadata,
  type G2XiDictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-xi.ts'

const dir = 'docs/hanja-g2-xi-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_XI_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_XI_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-xi-2026-09-16/initial-observations.json": "389a7bdbd087106f235486d101dfe8e48f3fd89ae93d3735c0e63fd55dfae31d",
  "docs/hanja-g2-xi-2026-09-16/originals.json": "8d1d230095d2efef4566d71fa49e7d3e2adbc58a15f904507f8f9de582539e34",
  "docs/hanja-g2-xi-2026-09-16/observations.json": "908569c2b9c74f33194c5f3efb342ac7b1cf40eeeedd139ac37f5531d2287c0d",
  "docs/hanja-g2-xi-2026-09-16/proposals.json": "5fed0e6abf9372528e981dee6daf24a512146911088d73768a7f54822ff131c7",
  "docs/hanja-g2-xi-2026-09-16/source-checks.json": "391b96abe2d11d3b2f9fd46a62081ac3e3bcb2529124d19b200a528712dc6b32",
  "docs/hanja-g2-xi-2026-09-16/corrections.json": "684480a8043aac0142950356e11ea72fc42115a6e16941ca8a2c495e8d6a899f",
  "docs/hanja-g2-xi-2026-09-16/count-basis.json": "79a9e0e5b38f72fa7d247fe751ab1d6e83c05998f9350b9c4b111dd92ea60b7b",
  "docs/hanja-g2-xi-2026-09-16/candidate-paths.json": "2336db6854289318ac655d6f8f32ea4e839af4f8ea40a8386d6fc5b4ac908222",
  "docs/hanja-g2-xi-2026-09-16/review.json": "7bf581eba3ca995cf8f044925a4950b23bfe43faff66ae17b87f6880225150ec"
}
export function validateG2XiDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_XI_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 xi dictionary proof mismatch: ' + path)
  }
}
export function g2XiDictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2XiDictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 xi dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 xi dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 xi dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 xi dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 xi dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2XiDictionaryBundle(): G2XiDictionaryBundle {
  validateG2XiDictionaryProofs()
  const basis = JSON.parse(read(dir + 'count-basis.json')) as {
    glyph: string; strokes: number; sourceGlyph: string; sourceStrokes: number; sourceRow: number; correctionId: string
  }
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')) as { characters: {
    glyph: string; strokes: number; sourceGlyph?: string; sourceStrokes?: number; sourceRow?: number; strokeCountCorrection?: string
  }[] }
  const character = catalog.characters.find(c => c.glyph === basis.glyph)
  if (!character || character.strokes !== basis.strokes || character.sourceGlyph !== basis.sourceGlyph
    || character.sourceStrokes !== basis.sourceStrokes || character.sourceRow !== basis.sourceRow
    || character.strokeCountCorrection !== basis.correctionId) throw Error('G2 xi count basis mismatch')
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_XI_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_XI_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_XI_DICTIONARY_GEOMETRY) || originals.entries.length !== 1
    || new Set(originals.entries.map(e => e.glyph)).size !== 1 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 xi dictionary approved set mismatch')
  const characters = G2_XI_DICTIONARY_REFERENCES.map(ref => {
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
      throw Error('G2 xi dictionary review incomplete: ' + ref.glyph)
    const geometry = g2XiDictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 xi dictionary frozen candidate mismatch')
    return { ...g2XiDictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_XI_DICTIONARY_VERIFICATION, geometrySources: G2_XI_DICTIONARY_GEOMETRY, characters }
}
export function validateG2XiDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2XiDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_XI_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 xi dictionary published entry mismatch')
}
export function validateG2XiDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_XI_STROKES) {
  const expected = buildG2XiDictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_XI_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 xi dictionary published bundle mismatch')
}
