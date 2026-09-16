/** 熙: fourteen reviewed dictionary-crosschecked strokes; two licensed paths corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-xi.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_XI_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 熙: all 14 strokes individually checked; 2 corrected paths rechecked. Not exam-body certification."
} as const
export const G2_XI_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2XiDictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G2_XI_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_XI_DICTIONARY_REFERENCES: readonly G2XiDictionaryReference[] = [
  {
    "glyph": "熙",
    "strokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "7ae801f183e55567a95c5b39140f9762f3604ac2125143c2a1066b0347c62b08",
    "pathsSha256": "038e09e6e71a96d1adec4788921b84dd0ae9506006c317a1db41dbf4aa45c8af",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/7199.svg",
    "dictionarySha256": "8568e7bbe38db81f6760f482d9142c8303cb4eafd583f1111bbbfe47609edd8c",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      null,
      5,
      6,
      7,
      null,
      9,
      10,
      11,
      12,
      13,
      14
    ]
  }
]
export const G2_XI_DICTIONARY_REVIEW_SHA256 = '7bf581eba3ca995cf8f044925a4950b23bfe43faff66ae17b87f6880225150ec'
export const G2_XI_DICTIONARY_DIRECTION_SHA256 = '908569c2b9c74f33194c5f3efb342ac7b1cf40eeeedd139ac37f5531d2287c0d'
const referencesByGlyph = new Map(G2_XI_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2XiDictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2XiDictionaryMetadata(ref: G2XiDictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_XI_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-xi-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_XI_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_XI_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_XI_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2XiDictionaryBundle = {
  verificationSource: typeof G2_XI_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_XI_DICTIONARY_GEOMETRY
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
export function loadG2XiDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 xi dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_XI_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_XI_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_XI_DICTIONARY_REFERENCES.length) throw Error('G2 xi dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 xi dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_XI_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2XiDictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 xi dictionary entry mismatch')
    return { ...g2XiDictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_XI_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_XI_STROKES = loadG2XiDictionaryBundle(reviewed)
