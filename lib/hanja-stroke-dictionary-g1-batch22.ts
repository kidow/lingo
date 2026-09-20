/** Three grade 1 forms (batch 22) individually reviewed, with no corrections. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch22.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH22_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 3 approved and 0 held; 0 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH22_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  },
  "Ja": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
    "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 21862957
  },
  "Ko": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt",
    "sha256": "7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1387824
  }
} as const
export type G1Batch22DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH22_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH22_DICTIONARY_REFERENCES: readonly G1Batch22DictionaryReference[] = [
  {"glyph":"恰","strokes":9,"corpus":"MM","originalMediansSha256":"63a48d290dabbf4d29cb331d96a76fa7b30441bb8afb2afe43a6d1bdd1e7b5c3","pathsSha256":"bc3e87a40cb16a635197ec69453e57e9a76370b3eeec795b70be4a95d4ed1f96","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/6070.svg","dictionarySha256":"584bb9169ace23651fa3b9ffe94da40697332787cc30baae5eeada298ec796f6","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"犧","strokes":20,"corpus":"MM","originalMediansSha256":"80c233e8a0721b57b413751cb1a05b55c6bd0b1a150244885d2d9fadc9dc821e","pathsSha256":"484842042b2904abd6b239cdbf7aa4565986c3483e91bfba60b6fc34cfd222fb","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/72A7.svg","dictionarySha256":"55849d9cefd43be7ee4a3dfe54871b1eaa06a8df8b327cb1b4fe50b41ca2a8af","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  {"glyph":"詰","strokes":13,"corpus":"MM","originalMediansSha256":"5fd90fff4e74f54e9b2988a6b65f5b985645d17fdd1087de2218ee48277b1101","pathsSha256":"baac972289e2767fce8bec3e0b3de0dd24ea2803156ee82a3e978fed82b63262","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A70.svg","dictionarySha256":"fc93f71c03a683280f478d08b71248bfb5345e4697b891aed0d46a20c5bdc0ca","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
]
export const G1_BATCH22_DICTIONARY_REVIEW_SHA256 = 'b5e03a179b557ea54917f9eaa5123c0edbb32f4f57204f383e16cdb5470d967f'
export const G1_BATCH22_DICTIONARY_DIRECTION_SHA256 = '73521efc524b8dfa70a9b8b33eb528acb0c2fdd1188be8e29073df2b0251d74e'
const referencesByGlyph = new Map(G1_BATCH22_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch22DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch22DictionaryMetadata(ref: G1Batch22DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH22_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch22-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH22_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH22_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH22_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch22DictionaryBundle = {
  verificationSource: typeof G1_BATCH22_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH22_DICTIONARY_GEOMETRY
  characters: readonly Omit<HanjaDictionaryStrokeData, 'verificationSource'>[]
}
function same(value: unknown, expected: unknown): boolean {
  if (value === expected) return true
  if (Array.isArray(expected)) return Array.isArray(value) && value.length === expected.length
    && expected.every((e, i) => same(value[i], e))
  if (!value || !expected || typeof value !== 'object' || typeof expected !== 'object' || Array.isArray(value)) return false
  const actual = value as Record<string, unknown>, reference = expected as Record<string, unknown>
  return Object.keys(actual).length === Object.keys(reference).length
    && Object.entries(reference).every(([k, v]) => Object.hasOwn(actual, k) && same(actual[k], v))
}
export function loadG1Batch22DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch22 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH22_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH22_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH22_DICTIONARY_REFERENCES.length) throw Error('G1 batch22 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch22 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH22_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch22DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch22 dictionary entry mismatch')
    return { ...g1Batch22DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH22_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH22_STROKES = loadG1Batch22DictionaryBundle(reviewed)
