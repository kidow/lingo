/** Offline, fail-closed reconstruction of licensed grade 2 geometry. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'
import {
  G2_LAN_LU_DICTIONARY_VERIFICATION, G2_LAN_LU_DICTIONARY_GEOMETRY, G2_LAN_LU_DICTIONARY_REFERENCES,
  HANJA_DICTIONARY_G2_LAN_LU_STROKES, g2LanLuDictionaryReference, g2LanLuDictionaryMetadata,
  type G2LanLuDictionaryBundle,
} from '../lib/hanja-stroke-dictionary-g2-lan-lu.ts'

const dir = 'docs/hanja-g2-lan-lu-2026-09-16/'
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
type Medians = Parameters<typeof normalizeMedians>[0]
type Original = {
  glyph: string; strokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_LAN_LU_DICTIONARY_GEOMETRY
  medians: Medians; originalMediansSha256: string; paths: string[]
  dictionary: { url: string; bytes: number; sha256: string }
}
type Recipe = { sourceStroke: number | null; derivedFromStroke?: number; path?: string; reason?: string }
type Observation = {
  glyph: string; decision: string; initialDecision: string; directions: string[]
  checks: Record<string, string>
  correctedReview?: { completed: boolean; reviewedStrokes: number; checks: Record<string, string> }
}
export const G2_LAN_LU_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g2-lan-lu-2026-09-16/initial-observations.json": "d7f5f580cf37acae9a184597dcd2b95ae6f361294b67801ef6a42a5b13662448",
  "docs/hanja-g2-lan-lu-2026-09-16/originals.json": "13c55acda47eb945ee2a86f57315a86fc99b295e1ad3ce7729c2e4519a55a6c3",
  "docs/hanja-g2-lan-lu-2026-09-16/observations.json": "f0539749fe19a676a5a1f5a5e08718c99da5311ac79820c67621e3d373b4ec50",
  "docs/hanja-g2-lan-lu-2026-09-16/proposals.json": "9b9a4c94feeae6b99e6c72ac6dadbc84ad635f618857a88ef8b80d3e87f4eea9",
  "docs/hanja-g2-lan-lu-2026-09-16/source-checks.json": "8c0e73887551c3f54057869d557c6bed9d67475684adeee518cb7057ed8b0626",
  "docs/hanja-g2-lan-lu-2026-09-16/corrections.json": "3d842be7bb7eb296d98a185d6ec7cd85705af394398f9f13cd91efd8a94e447a",
  "docs/hanja-g2-lan-lu-2026-09-16/count-basis.json": "6c55df78d778ea01114985b0ca1cbe362f8308dec657555f522b05fd6677c5ac",
  "docs/hanja-g2-lan-lu-2026-09-16/candidate-paths.json": "87da57e1e2d84e211726a1808ac57fe5f843173b912a1c4f94128e8bbd8edc17",
  "docs/hanja-g2-lan-lu-2026-09-16/review.json": "3e97656f5a542508e24b21e89c8ee71da39424cf521e2702cc013a3e7d3536bb"
}
export function validateG2LanLuDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(G2_LAN_LU_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected)
      throw Error('G2 lan-lu dictionary proof mismatch: ' + path)
  }
}
export function g2LanLuDictionaryGeometry(glyph: string, medians: Medians) {
  const ref = g2LanLuDictionaryReference(glyph)
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw Error('G2 lan-lu dictionary original mismatch: ' + glyph)
  const proposals = JSON.parse(read(dir + 'proposals.json')) as Record<string, Recipe[]>
  const recipe = proposals[glyph]
  if (!recipe || !isDeepStrictEqual(recipe.map(r => r.sourceStroke), ref.sourceStrokeIndices))
    throw Error('G2 lan-lu dictionary recipe mismatch')
  const corrections = JSON.parse(read(dir + 'corrections.json')) as { edits: { glyph: string; stroke: number; path: string; originalSourceStroke: number; originalPath: string }[] }
  const originalPaths = normalizeMedians(medians)
  const paths = recipe.map((r, i) => {
    if (r.sourceStroke !== null) {
      if (!Number.isInteger(r.sourceStroke) || r.sourceStroke < 1 || r.sourceStroke > originalPaths.length || r.path)
        throw Error('G2 lan-lu dictionary source index mismatch')
      return originalPaths[r.sourceStroke - 1]
    }
    const edit = corrections.edits.find(e => e.glyph === glyph && e.stroke === i + 1)
    if (!edit || edit.path !== r.path || !r.reason || r.derivedFromStroke !== edit.originalSourceStroke || originalPaths[r.derivedFromStroke! - 1] !== edit.originalPath) throw Error('G2 lan-lu dictionary authored path mismatch')
    return edit.path
  })
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256) throw Error('G2 lan-lu dictionary geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildG2LanLuDictionaryBundle(): G2LanLuDictionaryBundle {
  validateG2LanLuDictionaryProofs()
  const basis = JSON.parse(read(dir + 'count-basis.json')) as {
    officialGrass: { sha256: string; imageSha256: string; sourceRow: number; paragraph: string }
    entries: { glyph: string; strokes: number; dictionaryStrokes: number; licensedOriginalStrokes: number
      wholeCanonicalStageSourceFound: boolean; runtimeToDictionaryStroke: number[]; runtimeToLicensedStroke: number[] }[]
  }
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')) as { characters: { glyph: string; strokes: number }[] }
  if (basis.officialGrass.sha256 !== '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c'
    || basis.officialGrass.imageSha256 !== 'f59ff6fa3d75d2568251a6f8896aac4c649cfbcb0fd0ad4e34db607d0822d162'
    || basis.officialGrass.sourceRow !== 7 || !basis.officialGrass.paragraph.includes('4획')
    || !isDeepStrictEqual(basis.entries.map(e => [e.glyph,e.strokes,e.dictionaryStrokes]), [['藍',18,17],['蘆',20,19]]))
    throw Error('G2 lan-lu official grass basis mismatch')
  for (const entry of basis.entries) {
    const character = catalog.characters.find(c => c.glyph === entry.glyph)
    if (!character || character.strokes !== entry.strokes || entry.licensedOriginalStrokes !== entry.strokes
      || entry.wholeCanonicalStageSourceFound !== false
      || !isDeepStrictEqual(entry.runtimeToDictionaryStroke, [1,2,1,3,...Array.from({length:entry.strokes-4},(_,i)=>i+4)])
      || !isDeepStrictEqual(entry.runtimeToLicensedStroke, [2,1,4,3,...Array.from({length:entry.strokes-4},(_,i)=>i+5)]))
      throw Error('G2 lan-lu count or stage mapping mismatch')
  }
  const originals = JSON.parse(read(dir + 'originals.json')) as {
    sources: typeof G2_LAN_LU_DICTIONARY_GEOMETRY; entries: Original[]
  }
  const observations = JSON.parse(read(dir + 'observations.json')) as { status: string; entries: Observation[] }
  const sourceChecks = JSON.parse(read(dir + 'source-checks.json')) as { entries: {
    glyph: string; dictionary: Original['dictionary']
    strokes: { xmlIndex: number; delay: number; duration: number }[]
  }[] }
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  const approvedGlyphs = G2_LAN_LU_DICTIONARY_REFERENCES.map(r => r.glyph)
  if (!isDeepStrictEqual(originals.sources, G2_LAN_LU_DICTIONARY_GEOMETRY) || originals.entries.length !== 2
    || new Set(originals.entries.map(e => e.glyph)).size !== 2 || observations.status !== 'complete'
    || !isDeepStrictEqual(observations.entries.filter(e => e.decision === 'matched').map(e => e.glyph), approvedGlyphs)
    || !isDeepStrictEqual(frozen.entries.map(e => e.glyph), approvedGlyphs)) throw Error('G2 lan-lu dictionary approved set mismatch')
  const characters = G2_LAN_LU_DICTIONARY_REFERENCES.map(ref => {
    const original = originals.entries.find(e => e.glyph === ref.glyph)
    const observation = observations.entries.find(e => e.glyph === ref.glyph)
    const source = sourceChecks.entries.find(e => e.glyph === ref.glyph)
    const expectedChecks = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
    if (!original || original.corpus !== ref.corpus || original.strokes !== ref.strokes || original.dictionaryStrokes !== ref.dictionaryStrokes
      || original.originalMediansSha256 !== ref.originalMediansSha256
      || !isDeepStrictEqual(normalizeMedians(original.medians), original.paths)
      || original.dictionary.url !== ref.dictionaryUrl || original.dictionary.sha256 !== ref.dictionarySha256
      || !observation || observation.decision !== 'matched' || observation.directions.length !== ref.strokes
      || !isDeepStrictEqual(observation.checks, expectedChecks)
      || (observation.initialDecision !== 'matched' && (!observation.correctedReview?.completed
        || observation.correctedReview.reviewedStrokes !== ref.strokes
        || !isDeepStrictEqual(observation.correctedReview.checks, expectedChecks)))
      || !source || !isDeepStrictEqual(source.dictionary, original.dictionary)
      || source.strokes.length !== ref.dictionaryStrokes || !isDeepStrictEqual(source.strokes.map(s => s.xmlIndex),
        [ref.dictionaryStrokes-2,ref.dictionaryStrokes-1,ref.dictionaryStrokes,...Array.from({length:ref.dictionaryStrokes-3},(_,i)=>i+1)])
      || source.strokes.some((s, i, list) => s.duration <= 0 || s.delay < 0 || (i > 0 && s.delay < list[i - 1].delay + list[i - 1].duration)))
      throw Error('G2 lan-lu dictionary review incomplete: ' + ref.glyph)
    const geometry = g2LanLuDictionaryGeometry(ref.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, frozen.entries.find(e => e.glyph === ref.glyph)?.paths))
      throw Error('G2 lan-lu dictionary frozen candidate mismatch')
    return { ...g2LanLuDictionaryMetadata(ref), ...geometry }
  })
  return { verificationSource: G2_LAN_LU_DICTIONARY_VERIFICATION, geometrySources: G2_LAN_LU_DICTIONARY_GEOMETRY, characters }
}
export function validateG2LanLuDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildG2LanLuDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || found.paths.length !== expectedStrokes
    || !isDeepStrictEqual(entry, { ...found, verificationSource: G2_LAN_LU_DICTIONARY_VERIFICATION.id }))
    throw Error('G2 lan-lu dictionary published entry mismatch')
}
export function validateG2LanLuDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_G2_LAN_LU_STROKES) {
  const expected = buildG2LanLuDictionaryBundle().characters.map(e => ({ ...e, verificationSource: G2_LAN_LU_DICTIONARY_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw Error('G2 lan-lu dictionary published bundle mismatch')
}
