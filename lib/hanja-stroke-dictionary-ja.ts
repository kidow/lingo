/** AnimCJK-derived dictionary reviews are kept separate from the MM bundle. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-ja.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const HANJA_DICTIONARY_JA_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Per-glyph Korean dictionary crosscheck: complete sequence for 響. Not exam-body certification."
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
    || !Array.isArray(bundle.characters) || bundle.characters.length !== 1) throw new Error('Ja dictionary bundle mismatch')
  const entry = bundle.characters[0]
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('Ja dictionary entry mismatch')
  const { paths, ...metadata } = entry as Record<string, unknown>
  if (!same(metadata, HANJA_DICTIONARY_JA_ENTRY) || !Array.isArray(paths) || paths.length !== 22
    || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path))) throw new Error('Ja dictionary entry mismatch')
  return [{ ...HANJA_DICTIONARY_JA_ENTRY, paths: paths as string[], verificationSource: HANJA_DICTIONARY_JA_VERIFICATION.id }]
}
export const HANJA_DICTIONARY_JA_STROKES = loadJaDictionaryBundle(reviewed)
