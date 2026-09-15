/** Reconstruct the exact reviewed Ja-derived candidate; never import vendor SVG paths. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import {
  HANJA_DICTIONARY_JA_GEOMETRY, HANJA_DICTIONARY_JA_VERIFICATION, HANJA_DICTIONARY_JA_ENTRY,
  HANJA_DICTIONARY_JA_ORIGINAL_SHA256, HANJA_DICTIONARY_JA_STROKES, type DictionaryJaBundle,
  HANJA_DICTIONARY_JA_SISTER_ENTRY, HANJA_DICTIONARY_JA_SISTER_ORIGINAL_SHA256,
  HANJA_DICTIONARY_JA_EXACT_ENTRIES,
} from '../lib/hanja-stroke-dictionary-ja.ts'
import type { HanjaDictionaryStrokeData } from '../lib/hanja-stroke-dictionary.ts'

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const dir = 'docs/hanja-g3ii-hyang-2026-09-13/'
export const JA_DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  "docs/hanja-g3-exact-forms-2026-09-15/sources.json": "6bce6974350e29afd5ade6b06593c599c5f7c5e5798ad97008cdd67faec522ef",
  "docs/hanja-g3-exact-forms-2026-09-15/observations.json": "83841493a02738390f9927d03fc6593c7b9cbf323d393476b9ce877c7968af01",
  "docs/hanja-g3-exact-forms-2026-09-15/proposals.json": "b09a7eddf9ce279096dce6b91699f1aabb178d543c8f1db14b064f365e6f9302",
  "docs/hanja-g3-exact-forms-2026-09-15/review.json": "72259e05c104d110bcb62e61c8570e46d8c3f6287504ab9c5c649983688799fe",
  "docs/hanja-g3-exact-forms-2026-09-15/candidate-paths.json": "2f7fe0a93563164411027fb6cd8877aac179490ed46a47c6cd0312606c1855ce",
  "docs/hanja-g3-exact-forms-2026-09-15/form-review.json": "f745da1a16033105722a33464226e02cb9aab5214bd3d0e767ac955a25dc071d",
  "docs/hanja-g4-held-11-2026-09-14/sources.json": "0217a3f6fd4ff7a1f80cdd59790ad8f7f7b36f2f966dd042e14608895e7152c5",
  "docs/hanja-g4-corrections-2026-09-14/review.json": "7124909e47f7c97355c9062b21af650826e8ada189888388a848827796285161",
  "docs/hanja-g4-corrections-2026-09-14/corrections.json": "f831a97b4022c74da77874eae77af091731e92ff785fb42ac290059c39550c5b",
  "docs/hanja-g4-corrections-2026-09-14/candidate-paths.json": "3cb9e302f27c307a1dab8c1e5c10bfc30d5725a2d04e96b02f08628c0b29fb14",
  "docs/hanja-g4-chaek-hoe-ja-2026-09-14/originals.json": "3e276896444d11514c1f4c92b7ad0a200c0aeef1f68352387397a2b8399fc76a",
  "docs/hanja-g4-chaek-hoe-ja-2026-09-14/observations.json": "07555e6ee2488a0613b3978a26c8afc65853682b2d76fef0a2a59c7cc0113e64",
  "docs/hanja-g3ii-hyang-2026-09-13/originals.json": "596d94bad4f521b975f3e811c03cbe10f767d4c07a3c9d4debf1bfa066a2d135",
  "docs/hanja-g3ii-hyang-2026-09-13/prior-candidate.json": "db83fc6edd98a73a485d0e9c5a286933684cece1df36e811e70ce6cc9123e470",
  "docs/hanja-g3ii-hyang-2026-09-13/corrections.json": "3e9881a3d794fcffd48ea283b282d891c2e99a2519a1a501ff9481a0423fe458",
  "docs/hanja-g3ii-hyang-2026-09-13/observations.json": "782b37401cff2730119588fa8802a1070f929c1a50095bedc6230306bac671ce",
  "docs/hanja-g3ii-hyang-2026-09-13/candidate-paths.json": "35d4ce7381e32440ec962d8d1e1ec8879bc31478f224ed2974f916de3bddc038",
  "docs/hanja-g3ii-hyang-2026-09-13/review.json": "d3824f6af8659b9e1083d055593651e86a3a108f66e4181afa2de3c9676f3a13",
  "docs/hanja-g3ii-dictionary-12-2026-09-13/sources.json": "9c446f8e8475b71c657b884300b648dd508d27432e410aadaaba13d5010f1f98"
}
export function validateJaDictionaryProofs(readProof: (path: string) => string = read) {
  for (const [path, expected] of Object.entries(JA_DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected) throw new Error('Ja dictionary proof mismatch: ' + path)
  }
}
export function jaDictionaryGeometry(glyph: string, medians: Parameters<typeof normalizeMedians>[0]) {
  const exact = HANJA_DICTIONARY_JA_EXACT_ENTRIES.find(e => e.glyph === glyph)
  if (exact) {
    const source = JSON.parse(read('docs/hanja-g3-exact-forms-2026-09-15/sources.json')) as {
      geometry: { sha256: string }; originals: { glyph: string; medians: Parameters<typeof normalizeMedians>[0] }[]
    }
    const original = source.originals.find(e => e.glyph === glyph)
    if (source.geometry.sha256 !== HANJA_DICTIONARY_JA_GEOMETRY.sha256
      || !original || hash(medians) !== hash(original.medians)) throw new Error('Ja dictionary original mismatch')
    const proposals = JSON.parse(read('docs/hanja-g3-exact-forms-2026-09-15/proposals.json')) as Record<string,
      { sourceStroke: number | null; points?: number[][] }[]>
    const recipe = proposals[glyph]
    if (!recipe || !isDeepStrictEqual(recipe.map(s => s.sourceStroke), exact.sourceStrokeIndices)
      || recipe.some(s => s.points && (s.points.length < 2
        || s.points.some(p => p.length !== 2 || p.some(n => !Number.isFinite(n) || n < 0 || n > 100)))))
      throw new Error('Ja dictionary recipe mismatch')
    const originalPaths = normalizeMedians(medians)
    const paths = recipe.map(s => s.points
      ? s.points.map(([x,y],i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ')
      : s.sourceStroke === null ? '' : originalPaths[s.sourceStroke - 1])
    if (paths.length !== exact.sourceStrokeIndices.length || hash(paths) !== exact.pathsSha256)
      throw new Error('Ja dictionary reconstructed geometry mismatch')
    return { paths, pathsSha256: hash(paths) }
  }
  if (glyph === '姉') {
    if (hash(medians) !== HANJA_DICTIONARY_JA_SISTER_ORIGINAL_SHA256) throw new Error('Ja dictionary original mismatch')
    const corrections = JSON.parse(read('docs/hanja-g4-corrections-2026-09-14/corrections.json')) as {
      entries: { glyph: string; sourceStrokeIndices: (number | null)[]; authored: { stroke: number; path: string }[] }[]
    }
    const recipe = corrections.entries.find(e => e.glyph === glyph)
    const indices = HANJA_DICTIONARY_JA_SISTER_ENTRY.sourceStrokeIndices
    if (!recipe || !isDeepStrictEqual(recipe.sourceStrokeIndices, indices)
      || !isDeepStrictEqual(recipe.authored.map(e => e.stroke), [4, 8])) throw new Error('Ja dictionary recipe mismatch')
    const originalPaths = normalizeMedians(medians)
    const paths = indices.map((n, i) => n === null ? recipe.authored.find(e => e.stroke === i + 1)!.path : originalPaths[n - 1])
    if (paths.length !== 8 || hash(paths) !== HANJA_DICTIONARY_JA_SISTER_ENTRY.pathsSha256) throw new Error('Ja dictionary reconstructed geometry mismatch')
    return { paths, pathsSha256: hash(paths) }
  }
  if (glyph !== '響' || hash(medians) !== HANJA_DICTIONARY_JA_ORIGINAL_SHA256) throw new Error('Ja dictionary original mismatch')
  const recipe = JSON.parse(read(dir + 'corrections.json')) as {
    glyph: string; geometrySource: string; originalMediansSha256: string;
    strokes: { sourceStroke: number | null; points: [number, number][] }[]
  }
  if (recipe.glyph !== glyph || recipe.geometrySource !== HANJA_DICTIONARY_JA_GEOMETRY.sha256
    || recipe.originalMediansSha256 !== HANJA_DICTIONARY_JA_ORIGINAL_SHA256
    || !isDeepStrictEqual(recipe.strokes.map(s => s.sourceStroke), HANJA_DICTIONARY_JA_ENTRY.sourceStrokeIndices)
    || recipe.strokes.some(s => s.points.length < 2 || s.points.some(p => p.length !== 2 || p.some(n => !Number.isFinite(n) || n < 0 || n > 100)))) throw new Error('Ja dictionary recipe mismatch')
  const paths = normalizeMedians(recipe.strokes.map(s => s.points.map(([x, y]) => [x, -y])))
  if (paths.length !== 22 || hash(paths) !== HANJA_DICTIONARY_JA_ENTRY.pathsSha256) throw new Error('Ja dictionary reconstructed geometry mismatch')
  return { paths, pathsSha256: hash(paths) }
}
export function buildJaDictionaryBundle(): DictionaryJaBundle {
  validateJaDictionaryProofs()
  const original = JSON.parse(read(dir + 'originals.json')) as {
    sha256: string; entries: { glyph: string; medians: Parameters<typeof normalizeMedians>[0] }[]
  }
  if (original.sha256 !== HANJA_DICTIONARY_JA_GEOMETRY.sha256 || original.entries.length !== 1
    || original.entries[0].glyph !== '響') throw new Error('Ja dictionary corpus mismatch')
  const geometry = jaDictionaryGeometry('響', original.entries[0].medians)
  const frozen = JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  if (frozen.entries.length !== 1 || frozen.entries[0].glyph !== '響'
    || !isDeepStrictEqual(geometry.paths, frozen.entries[0].paths)) throw new Error('Ja dictionary frozen candidate mismatch')
  const g4Originals = JSON.parse(read('docs/hanja-g4-chaek-hoe-ja-2026-09-14/originals.json')) as {
    sources: { name: string; sourceSha256: string; entries: { glyph: string; medians: Parameters<typeof normalizeMedians>[0] }[] }[]
  }
  const sisterSource = g4Originals.sources.find(s => s.name === 'AnimCJK Japanese')
  if (sisterSource?.sourceSha256 !== HANJA_DICTIONARY_JA_GEOMETRY.sha256
    || sisterSource.entries.length !== 1 || sisterSource.entries[0].glyph !== '姉') throw new Error('Ja dictionary corpus mismatch')
  const sisterGeometry = jaDictionaryGeometry('姉', sisterSource.entries[0].medians)
  const sisterFrozen = JSON.parse(read('docs/hanja-g4-corrections-2026-09-14/candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }
  if (!isDeepStrictEqual(sisterGeometry.paths, sisterFrozen.entries.find(e => e.glyph === '姉')?.paths)) throw new Error('Ja dictionary frozen candidate mismatch')
  const exactSource = JSON.parse(read('docs/hanja-g3-exact-forms-2026-09-15/sources.json')) as {
    originals: { glyph: string; medians: Parameters<typeof normalizeMedians>[0] }[]
  }
  const exactFrozen = JSON.parse(read('docs/hanja-g3-exact-forms-2026-09-15/candidate-paths.json')) as {
    entries: { glyph: string; paths: string[] }[]
  }
  const exactCharacters = HANJA_DICTIONARY_JA_EXACT_ENTRIES.map(entry => {
    const original = exactSource.originals.find(e => e.glyph === entry.glyph)
    if (!original) throw new Error('Ja dictionary original missing')
    const geometry = jaDictionaryGeometry(entry.glyph, original.medians)
    if (!isDeepStrictEqual(geometry.paths, exactFrozen.entries.find(e => e.glyph === entry.glyph)?.paths))
      throw new Error('Ja dictionary frozen candidate mismatch')
    return { ...entry, ...geometry }
  })
  return {
    verificationSource: HANJA_DICTIONARY_JA_VERIFICATION, geometrySource: HANJA_DICTIONARY_JA_GEOMETRY,
    characters: [{ ...HANJA_DICTIONARY_JA_ENTRY, ...geometry }, { ...HANJA_DICTIONARY_JA_SISTER_ENTRY, ...sisterGeometry }, ...exactCharacters],
  }
}
export function validateJaDictionaryReview(entry: HanjaDictionaryStrokeData, expectedStrokes: number) {
  const found = buildJaDictionaryBundle().characters.find(e => e.glyph === entry.glyph)
  if (!found || expectedStrokes !== found.paths.length
    || !isDeepStrictEqual(entry, { ...found, verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id })) throw new Error('Ja dictionary published entry mismatch')
}
export function validateJaDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_JA_STROKES) {
  const expected = buildJaDictionaryBundle().characters.map(e => ({ ...e, verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Ja dictionary published bundle mismatch')
}
