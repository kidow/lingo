/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_SHENG_DICTIONARY_VERIFICATION, G2_SHENG_DICTIONARY_GEOMETRY, G2_SHENG_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_SHENG_STROKES, g2ShengDictionaryReference, g2ShengDictionaryMetadata,
  type G2ShengDictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-sheng.ts'

const dir = 'docs/hanja-g2-sheng-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; corpus: keyof typeof G2_SHENG_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_SHENG_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-sheng-2026-09-16/initial-observations.json": "8b8617c280f9783b97ce7cfe7f87892a41ce0ec2c6cb35d957db81fe1bcd26a7",
  "docs/hanja-g2-sheng-2026-09-16/originals.json": "590456523f22d598430e2750ad2ba8c651817d4876a94b2040a28fae62684dcc",
  "docs/hanja-g2-sheng-2026-09-16/observations.json": "a2870dd0f073fd999842b68893ebbbbdbf75a26c282db3b9da0db3924d6df217",
  "docs/hanja-g2-sheng-2026-09-16/proposals.json": "d84c477fe4c856011dfa3f2bb532cd551de5cc5146ea92afaa93cfc6dce76899",
  "docs/hanja-g2-sheng-2026-09-16/source-checks.json": "eb8d630ece56d56b317e71b411b59a7521a7df9bd075cd63bca3708974bcf699",
  "docs/hanja-g2-sheng-2026-09-16/corrections.json": "dc04e6b31d0ddbc9d90bdaa4b4b0559c80b8f391cf46c21500689bbde338f2ac",
  "docs/hanja-g2-sheng-2026-09-16/count-basis.json": "a76704cb25b8b0175b07923f52c81f3c895542d592dc44f9b99d7b8c7e35ff22",
  "docs/hanja-g2-sheng-2026-09-16/candidate-paths.json": "f52a6b5762f88a447a4dd07f8f5549d1d0bd351d56c95fd129a003a28debff7f",
  "docs/hanja-g2-sheng-2026-09-16/review.json": "7909aeff700d14b30ed4bde8758faa874cbd97c6ffc05915fd6ecc03e9198eef"
}
export function validateG2ShengDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_SHENG_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 sheng dictionary proof mismatch: ' + path)
  }
}
export function g2ShengDictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2ShengDictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 sheng dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 sheng dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 sheng dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 sheng dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 sheng dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2ShengDictionaryBundle(): G2ShengDictionaryBundle {
  validateG2ShengDictionaryProofs()
  const basis = JSON.parse(read(dir + 'count-basis.json')) as {
    glyph: string; strokes: number; dictionaryStrokes: number; licensedOriginalStrokes: number
    wholeGlyphElevenStageSourceFound: boolean; dictionaryToRuntime: number[]; licensedToRuntime: number[]
    officialCount: { id: string; sha256: string }; officialComponent: { sha256: string; imageSha256: string; sourceRow: number }
  }
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')) as { characters: { glyph: string; strokes: number }[] }
  const character = catalog.characters.find(c => c.glyph === basis.glyph)
  if (!character || character.glyph !== '晟' || character.strokes !== 11 || basis.strokes !== 11
    || basis.dictionaryStrokes !== 10 || basis.licensedOriginalStrokes !== 10 || basis.wholeGlyphElevenStageSourceFound !== false
    || basis.officialCount.id !== '10026' || basis.officialCount.sha256 !== '64003376f3018606dd6ae15a7a36ec999d1d03c6d3332daa0e265871ba1f07ee'
    || basis.officialComponent.sha256 !== '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c'
    || basis.officialComponent.imageSha256 !== '74f22eccf1c38fe55f08879eabf9327f1a9934ea32f6e46136fe935782b81d24'
    || basis.officialComponent.sourceRow !== 19
    || !isDeepStrictEqual(basis.dictionaryToRuntime, [1,2,3,4,5,6,7,7,8,9,10])
    || !isDeepStrictEqual(basis.licensedToRuntime, [1,2,3,4,6,5,7,7,8,9,10])) throw Error('G2 sheng count basis mismatch')
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_SHENG_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_SHENG_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_SHENG_DICTIONARY_GEOMETRY) || originals.entries.length !== 1
    || new Set(originals.entries.map(e => e.glyph)).size !== 1 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 sheng dictionary approved set mismatch')
  const characters = G2_SHENG_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.strokes !== 10
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== 10 || !isDeepStrictEqual(source.strokes.map(s => s.xmlIndex), [7,8,9,10,1,2,3,4,5,6])
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 sheng dictionary review incomplete: ' + ref.glyph)
    const geometry = g2ShengDictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 sheng dictionary frozen candidate mismatch')
    return { ...g2ShengDictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_SHENG_DICTIONARY_VERIFICATION, geometrySources: G2_SHENG_DICTIONARY_GEOMETRY, characters }
}
export function validateG2ShengDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2ShengDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_SHENG_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 sheng dictionary published entry mismatch')
}
export function validateG2ShengDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_SHENG_STROKES) {
  const expected = buildG2ShengDictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_SHENG_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 sheng dictionary published bundle mismatch')
}
