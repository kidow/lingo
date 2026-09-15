/** AnimCJK-derived dictionary reviews are kept separate from the MM bundle. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-ja.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const HANJA_DICTIONARY_JA_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Per-glyph Korean dictionary crosschecks: complete sequences for 響·姉·隷·隣. Not exam-body certification."
} as const
export const HANJA_DICTIONARY_JA_GEOMETRY = {
  "name": "AnimCJK Japanese corpus with reviewed local corrections",
  "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
  "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8"
} as const
export const HANJA_DICTIONARY_JA_ENTRY = {
  "glyph": "響",
  "verifiedAt": "2026-09-13",
  "geometrySource": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
  "geometryCorrection": "dictionary-crosscheck-97ff-v1",
  "sourceStrokeIndices": [
    null,
    2,
    3,
    null,
    7,
    4,
    5,
    6,
    null,
    7,
    9,
    10,
    11,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  "pathsSha256": "3a998530d9324fb1bfe82cf03fa5b598ca2709a9a8952d256c0630700c901969",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97FF.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9700/97FF.svg",
    "dictionarySvgSha256": "7672fea6e57b2ab8b5858cebc1108fe27cdc2e8db6a45a1a39985d6c2b73e0d7",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22",
    "orderReviewSha256": "d3824f6af8659b9e1083d055593651e86a3a108f66e4181afa2de3c9676f3a13",
    "geometryReviewSha256": "d3824f6af8659b9e1083d055593651e86a3a108f66e4181afa2de3c9676f3a13",
    "directionReviewSha256": "782b37401cff2730119588fa8802a1070f929c1a50095bedc6230306bac671ce"
  }
} as const
export const HANJA_DICTIONARY_JA_ORIGINAL_SHA256 = '7caf6a90ffad284335bccf8063a872c59f8b84e0d1b9f8274d51c879694a7115'

export const HANJA_DICTIONARY_JA_SISTER_ENTRY = {
  "glyph": "姉",
  "verifiedAt": "2026-09-14",
  "geometrySource": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
  "geometryCorrection": "dictionary-crosscheck-59c9-v1",
  "sourceStrokeIndices": [
    1,
    2,
    3,
    null,
    5,
    6,
    7,
    null
  ],
  "pathsSha256": "5c9d0bb0ca7cab5e9199036f120c6d000821cfe5454d4c74dd8894a834648a49",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59C9.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59C9.svg",
    "dictionarySvgSha256": "3e7e7a2b2da8995f81ca9a5d4a47c251a17cce2ff1fd484e8ee924fef6da313d",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
    "orderReviewSha256": "7124909e47f7c97355c9062b21af650826e8ada189888388a848827796285161",
    "geometryReviewSha256": "7124909e47f7c97355c9062b21af650826e8ada189888388a848827796285161",
    "directionReviewSha256": "07555e6ee2488a0613b3978a26c8afc65853682b2d76fef0a2a59c7cc0113e64"
  }
} as const
export const HANJA_DICTIONARY_JA_SISTER_ORIGINAL_SHA256 = 'bf6e5cfafeebb78fe75178dc3d11d183a2893d8b61954dc00d9c90fb7515a009'
export const HANJA_DICTIONARY_JA_EXACT_ENTRIES = [
  {
    "glyph": "隷",
    "verifiedAt": "2026-09-15",
    "geometrySource": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "geometryCorrection": "dictionary-crosscheck-96b7-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "pathsSha256": "3eef7ef715035c1e4b076971983341ffad3909c057a8a4edf597878cd84be4c6",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96B7.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96B7.svg",
      "dictionarySvgSha256": "8861b0587d9bd368892ca7bf5de2d14fe8db5c1b87778abbd6b59b49b01a2eb2",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
      "orderReviewSha256": "72259e05c104d110bcb62e61c8570e46d8c3f6287504ab9c5c649983688799fe",
      "geometryReviewSha256": "72259e05c104d110bcb62e61c8570e46d8c3f6287504ab9c5c649983688799fe",
      "directionReviewSha256": "83841493a02738390f9927d03fc6593c7b9cbf323d393476b9ce877c7968af01"
    }
  },
  {
    "glyph": "隣",
    "verifiedAt": "2026-09-15",
    "geometrySource": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "geometryCorrection": "dictionary-crosscheck-96a3-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      null,
      16
    ],
    "pathsSha256": "6795173c8adf1060b643fea8f591b916bb81a2d91d7866b7bf04d1aa5c626117",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96A3.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96A3.svg",
      "dictionarySvgSha256": "d391cdc5917ca9c328fc2a7687ca4da8eaad10ebfdecb876d3a28858859cf8a6",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
      "orderReviewSha256": "72259e05c104d110bcb62e61c8570e46d8c3f6287504ab9c5c649983688799fe",
      "geometryReviewSha256": "72259e05c104d110bcb62e61c8570e46d8c3f6287504ab9c5c649983688799fe",
      "directionReviewSha256": "83841493a02738390f9927d03fc6593c7b9cbf323d393476b9ce877c7968af01"
    }
  }
] as const
const REVIEWED_ENTRIES = [HANJA_DICTIONARY_JA_ENTRY, HANJA_DICTIONARY_JA_SISTER_ENTRY, ...HANJA_DICTIONARY_JA_EXACT_ENTRIES] as const

export type DictionaryJaBundle = {
  verificationSource: typeof HANJA_DICTIONARY_JA_VERIFICATION
  geometrySource: typeof HANJA_DICTIONARY_JA_GEOMETRY
  characters: readonly Omit<HanjaDictionaryStrokeData, 'verificationSource'>[]
}
function same(value: unknown, expected: unknown): boolean {
  if (value === expected) return true
  if (Array.isArray(expected)) return Array.isArray(value)
    && value.length === expected.length && expected.every((e, i) => same(value[i], e))
  if (!value || !expected || typeof value !== 'object' || typeof expected !== 'object'
    || Array.isArray(value)) return false
  const actual = value as Record<string, unknown>, reference = expected as Record<string, unknown>
  return Object.keys(actual).length === Object.keys(reference).length
    && Object.entries(reference).every(([k, v]) => Object.hasOwn(actual, k) && same(actual[k], v))
}
export function loadJaDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Ja dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, HANJA_DICTIONARY_JA_VERIFICATION)
    || !same(bundle.geometrySource, HANJA_DICTIONARY_JA_GEOMETRY)
    || !Array.isArray(bundle.characters) || bundle.characters.length !== REVIEWED_ENTRIES.length) throw new Error('Ja dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, index: number) => {
    const reference = REVIEWED_ENTRIES[index]
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('Ja dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    if (!same(metadata, reference) || !Array.isArray(paths) || paths.length !== reference.sourceStrokeIndices.length
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path))) throw new Error('Ja dictionary entry mismatch')
    return { ...reference, paths: paths as string[], verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_JA_STROKES = loadJaDictionaryBundle(reviewed)
