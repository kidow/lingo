/** Offline proof and geometry reconstruction. Vendor SVG paths are never imported. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { HANJA_TEXTBOOK_STROKES } from '../lib/hanja-stroke-textbook.ts'
import { jaDictionaryGeometry, validateJaDictionaryProofs, validateJaDictionaryReview, validateJaDictionaryBundle } from './hanja-stroke-dictionary-ja.ts'
import {
  HANJA_DICTIONARY_SOURCE, HANJA_DICTIONARY_GEOMETRY_SOURCE, HANJA_DICTIONARY_STROKES,
  DICTIONARY_REFERENCES, dictionarySourceReference, dictionaryStrokeIndices,
  type DictionaryBundle, type HanjaDictionaryStrokeData,
} from '../lib/hanja-stroke-dictionary.ts'

type Medians = Parameters<typeof normalizeMedians>[0]
export type DictionaryCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
export const DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  'docs/hanja-g3ii-rabbit-2026-09-13/originals.json': '565eeffffd60e07c6f054b5652a60bfc8b810310272cdc98a309986717dd9310',
  'docs/hanja-g3ii-rabbit-2026-09-13/corrections.json': '8afb1f4404a4514522a3e5501fab168969d32e06011de4fdc43d648baeeaebc2',
  'docs/hanja-g3ii-rabbit-2026-09-13/candidate-paths.json': '48e3ca61a982cb1507f0262fcadd963a95747d5cba7d9e5d84a2644b18b94a58',
  'docs/hanja-g3ii-rabbit-2026-09-13/observations.json': '63ab3c17716ef3da6e7be9fe62e3835e6c744ad468ae364030676d63dcc340fc',
  'docs/hanja-g3ii-rabbit-2026-09-13/review.json': 'b294d7b3ff0402827c92ccc52ff9d6aa56055ad1456660b820b43aa30daa4003',
  'docs/hanja-g3ii-rabbit-2026-09-13/sources.json': 'e68b9a19a03aa8d351f4b0f521d5706aa56f02548745d218ee52ef58c7cb4a28',
  'docs/hanja-g3ii-rabbit-2026-09-13/form-resolution.json': '2e178b02c53a5aaa75bc06a92912ae8eeb5737a1bcafd40848332d9f61514be0',
  'docs/hanja-g3ii-batch13-2026-09-13/root-rabbit-review.json': '3937bb9fe3f924fabe44293cea1d1548fb7b6793a92b80bc037c8b30570a74ef',
  'docs/hanja-g3ii-walk-4-2026-09-13/originals.json': '3337ca1ca0844e46e7b699002952e803418ee888f2a60956492ccd209ce98b07',
  'docs/hanja-g3ii-walk-4-2026-09-13/corrections.json': '27f6b9df64985cd49251b6dbb7efa66bb0ca1e0edef136545ef11d164dc82975',
  'docs/hanja-g3ii-walk-4-2026-09-13/observations.json': '487824b99172ff33f512773f5f83c23e86c2a20d3eb927b77b547e1672352a31',
  'docs/hanja-g3ii-walk-4-2026-09-13/candidate-paths.json': '33d6443543b1b4809af7406016641316e90e9d3ffd638e7c823d9459ec6306f8',
  'docs/hanja-g3ii-walk-4-2026-09-13/review.json': '9acf5db467609f2bb6d2fd23dca75b61fddf5f897be7b0b477a1e895f48c4a87',
  'docs/hanja-g3ii-bun-ja-2026-09-13/originals.json': '3029c0edf3131c63cf41b133f2d6d5ed3505bf9fc89a6cca595e82783db74908',
  'docs/hanja-g3ii-bun-ja-2026-09-13/corrections.json': 'e912e95a5fc05ae9db5d579762ea5ded9d50814b0cb24b98fd4554e5fb20f829',
  'docs/hanja-g3ii-bun-ja-2026-09-13/observations.json': '8a614fbbec1a255e1bba7c7e1c6dfe14e0e3528e0f2527a16e84dc246a25d915',
  'docs/hanja-g3ii-bun-ja-2026-09-13/candidate-paths.json': 'd97147c9fccaec3fe45681f8015c622f4253478855ba85a02dc470833961c24b',
  'docs/hanja-g3ii-bun-ja-2026-09-13/review.json': 'e05ddc52b19c21c05c5c59d8f3b0c232d4fc6cb0f18d4a032f5dc781ad2626b2',
  'docs/hanja-g3ii-sam-pung-2026-09-13/originals.json': '4ee5ef9597f2c656ce8f0792f6d3e3db9735385f57786f3f5459b9e5f3cda257',
  'docs/hanja-g3ii-sam-pung-2026-09-13/candidate-paths.json': '15a69cc6e275966fa173125d8a96281085b8ee266f76405e62d13f6bad84ee41',
  'docs/hanja-g3ii-sam-pung-2026-09-13/review.json': 'e5929e944b1a1f9f044f5f4cf6abdba00f1eadc7c993cef27803fa26de37915b',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/sources.json': '9c446f8e8475b71c657b884300b648dd508d27432e410aadaaba13d5010f1f98',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/observations.json': 'a87ee0996533aa8a45f48c17712a609c1023f9e32d732a20e0c369e9f22efb32',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/review.json': 'a03a988581ae438f9db5e08fe6846854f0d343b1b2f2d89552a70a39b7409314',
  'docs/hanja-g3ii-direction-3-2026-09-13/direction-review.json': 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/candidate-paths.json': 'f180a3b12dba2e4e260adad2d2fd67804e3e7f97671f934a6c9b4b2ac27c507d',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/originals.json': '1af04d53757249d03adfed126e40659ba96d82046213a179eb8594d607380d84',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/donors.json': 'b83dbee67088e4b0163672f171453355b899e266ec83d27e8036ade902eb35bf',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/review.json': '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-a.json': 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/source-matrix.json': 'd278ec44ac5c0f3535fa0b91ce69446b9aad375ad1ac1094d0b58952155233ee',
  'docs/hanja-g3ii-missing-17-2026-09-13/research-provenance.json': 'fbd7dcdd659bacd098b80849e57e4743dc7dc0b4302c2be63bebf889d0833a46',
}
export function validateDictionaryProofs(readProof: (path: string) => string = read) {
  validateJaDictionaryProofs(readProof)
  for (const [path, expected] of Object.entries(DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected) throw new Error('Dictionary proof mismatch: ' + path)
  }
}
const oldDir = 'docs/hanja-g3ii-gyeol-mun-2026-09-13/'
const fullReviewDir = 'docs/hanja-g3ii-sam-pung-2026-09-13/'
const bunJaDir = 'docs/hanja-g3ii-bun-ja-2026-09-13/'
const walkFourDir = 'docs/hanja-g3ii-walk-4-2026-09-13/'
const rabbitDir = 'docs/hanja-g3ii-rabbit-2026-09-13/'
type OriginalSource = { name: string; sha256: string; entries: { glyph: string; medians: Medians }[] }
type Donor = { glyph: string; paths: string[]; hash: string; [key: string]: unknown }
function originals() {
  const sources = JSON.parse(read(oldDir + 'originals.json')) as OriginalSource[]
  const source = sources.find(s => s.name === 'MM')
  const fullSource = JSON.parse(read(fullReviewDir + 'originals.json')) as OriginalSource
  const bunJaSource = JSON.parse(read(bunJaDir + 'originals.json')) as OriginalSource
  const walkFourSource = JSON.parse(read(walkFourDir + 'originals.json')) as OriginalSource
  const rabbitSource = JSON.parse(read(rabbitDir + 'originals.json')) as OriginalSource
  if (!source || source.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || fullSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || bunJaSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || walkFourSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || rabbitSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256) throw new Error('Dictionary corpus mismatch')
  return [...source.entries, ...fullSource.entries, ...bunJaSource.entries, ...walkFourSource.entries, ...rabbitSource.entries]
}
const points = (path: string) => {
  if (!/^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)) throw new Error('Dictionary path syntax')
  return [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
}
const bounds = (paths: readonly string[]) => {
  const p = paths.flatMap(points)
  return [Math.min(...p.map(p => p[0])), Math.min(...p.map(p => p[1])), Math.max(...p.map(p => p[0])), Math.max(...p.map(p => p[1]))]
}
export function dictionaryGeometry(glyph: string, medians: Medians) {
  if (glyph === '響') return jaDictionaryGeometry(glyph, medians)
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw new Error('Dictionary original medians mismatch: ' + glyph)
  let paths = normalizeMedians(medians)
  if (glyph === '紋') {
    const snapshot = (JSON.parse(read(oldDir + 'donors.json')) as Donor[]).find(d => d.glyph === '紅')
    if (!snapshot) throw new Error('Dictionary donor missing')
    const { hash: expected, ...donor } = snapshot
    if (hash(donor) !== expected || hash(HANJA_TEXTBOOK_STROKES.find(d => d.glyph === '紅')) !== expected) throw new Error('Dictionary reviewed donor mismatch')
    const from = bounds(snapshot.paths.slice(0, 6)), to = bounds(paths.slice(0, 6))
    const sx = (to[2] - to[0]) / (from[2] - from[0]), sy = (to[3] - to[1]) / (from[3] - from[1])
    if (!(sx > 0 && sy > 0)) throw new Error('Dictionary donor reflection')
    const round = (n: number) => Math.round(n * 10) / 10
    paths = paths.map((p, i) => i === 3 || i === 4
      ? points(snapshot.paths[i]).map(([x, y], j) => (j ? 'L' : 'M')
        + round(to[0] + (x - from[0]) * sx) + ' ' + round(to[1] + (y - from[1]) * sy)).join(' ')
      : p)
  }
  if (glyph === '慈') {
    const corrections = JSON.parse(read(bunJaDir + 'corrections.json')) as { glyph: string; entries: { stroke: number; path: string }[] }
    if (corrections.glyph !== glyph || !isDeepStrictEqual(corrections.entries.map(e => e.stroke), [4, 7, 11])) throw new Error('Dictionary correction set mismatch')
    paths = paths.map((path, i) => corrections.entries.find(e => e.stroke === i + 1)?.path ?? path)
  }
  if (ref.wholeGlyphReview === 'walk-four' || ref.wholeGlyphReview === 'rabbit') {
    const correctionDir = ref.wholeGlyphReview === 'rabbit' ? rabbitDir : walkFourDir
    const corrections = JSON.parse(read(correctionDir + 'corrections.json')) as { entries: {
      glyph: string; sourceStrokeIndices: (number | null)[]; authored: { stroke: number; path: string }[]
    }[] }
    const recipe = corrections.entries.find(e => e.glyph === glyph)
    const indices = dictionaryStrokeIndices(glyph)
    if (!recipe || !isDeepStrictEqual(recipe.sourceStrokeIndices, indices)
      || !isDeepStrictEqual(recipe.authored.map(e => e.stroke), indices.flatMap((n, i) => n === null ? [i + 1] : []))) throw new Error('Dictionary correction set mismatch')
    paths = indices.map((n, i) => n === null ? recipe.authored.find(e => e.stroke === i + 1)!.path : paths[n - 1])
  }
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256
    || paths.flatMap(points).some(p => p.some(n => !Number.isFinite(n) || n < 0 || n > 100))) throw new Error('Dictionary reconstructed geometry mismatch: ' + glyph)
  return { paths, pathsSha256: hash(paths) }
}
export function buildDictionaryBundle(candidates?: readonly DictionaryCandidate[]): DictionaryBundle {
  validateDictionaryProofs()
  const expectedOriginals = originals()
  const input = candidates ?? expectedOriginals.map(e => ({ character: e.glyph, medians: e.medians }))
  const byGlyph = new Map(input.map(e => [e.character, e]))
  const count = Object.keys(DICTIONARY_REFERENCES).length
  if (byGlyph.size !== count || input.length !== count || input.some(e => !Object.hasOwn(DICTIONARY_REFERENCES, e.character))) throw new Error('Dictionary candidate set mismatch')
  const frozen = [oldDir, fullReviewDir, bunJaDir, walkFourDir, rabbitDir].flatMap(dir => (JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }).entries)
  return {
    verificationSource: HANJA_DICTIONARY_SOURCE, geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE,
    characters: Object.keys(DICTIONARY_REFERENCES).map(glyph => {
      const paths = dictionaryGeometry(glyph, byGlyph.get(glyph)!.medians)
      if (!isDeepStrictEqual(paths.paths, frozen.find(e => e.glyph === glyph)?.paths)) throw new Error('Dictionary frozen candidate mismatch')
      return {
        glyph, verifiedAt: '2026-09-13', geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256,
        geometryCorrection: 'dictionary-crosscheck-' + glyph.codePointAt(0)!.toString(16) + '-v1',
        sourceStrokeIndices: dictionaryStrokeIndices(glyph), ...paths, sourceReference: dictionarySourceReference(glyph),
      }
    }),
  }
}
export function validateDictionaryReview(review: HanjaDictionaryStrokeData, expectedStrokes: number) {
  if (review.glyph === '響') return validateJaDictionaryReview(review, expectedStrokes)
  const expected = buildDictionaryBundle().characters.find(e => e.glyph === review.glyph)
  if (!expected || expected.paths.length !== expectedStrokes
    || !isDeepStrictEqual(review, { ...expected, verificationSource: HANJA_DICTIONARY_SOURCE.id })) throw new Error('Dictionary published entry mismatch')
}
export function validateDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_STROKES) {
  validateJaDictionaryBundle()
  const expected = buildDictionaryBundle().characters.map(e => ({ ...e, verificationSource: HANJA_DICTIONARY_SOURCE.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Dictionary published bundle mismatch')
}
