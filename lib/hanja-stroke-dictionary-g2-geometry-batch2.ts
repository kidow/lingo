/** 董 藤 鄧: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch2.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH2_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 2: 董 藤 鄧 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY = {
  "Ko": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt",
    "sha256": "7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1387824
  },
  "Ja": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
    "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 21862957
  },
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2GeometryBatch2DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH2_DICTIONARY_REFERENCES: readonly G2GeometryBatch2DictionaryReference[] = [
  {
    "glyph": "董",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "MM",
    "originalMediansSha256": "f67022aec2715ebef53cb58eda90e1ed7ccab89726b62981826b0ac8d273b610",
    "pathsSha256": "3b0e516d713a6aa0910c2f0eb4da54edf0d22e799399dd07db3db0909542aa34",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8463.svg",
    "dictionarySha256": "1d186defcf4c4353f4d2afd90ac2f98baba066f425793fdb2b59997151b736e0",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      null,
      5,
      6,
      null,
      null,
      null,
      11,
      null,
      12
    ]
  },
  {
    "glyph": "藤",
    "strokes": 19,
    "originalStrokes": 18,
    "corpus": "MM",
    "originalMediansSha256": "27d434af195ad8ce9c38fe5dac60963606c16f4a33004b7f8fbc68452baeaaba",
    "pathsSha256": "4e561661511db1987b9518875e4fcbf3623e68aec786dfe1b4b68fc1754665a2",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85E4.svg",
    "dictionarySha256": "9295a4968010f08c54fb017f96142525f5877eb91bfe1bf6f8ff90e09ad779e0",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      4,
      5,
      null,
      null,
      null,
      null,
      10,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      18
    ]
  },
  {
    "glyph": "鄧",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "79df03eb81764ebb4a124983156623528cacb0d8de495299e45cb0f6453d72d3",
    "pathsSha256": "4a237b79844b596fcae8e1521bd1eebc567d4a2f381ac7bfa6d73de50426cec3",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9100/9127.svg",
    "dictionarySha256": "029dac824a668aa877a817f5bb28bb33b2091fb8f8876a4bd77c84110b72ef7c",
    "sourceStrokeIndices": [
      1,
      null,
      3,
      4,
      null,
      null,
      7,
      null,
      null,
      10,
      null,
      12,
      null,
      null,
      14
    ]
  }
]
export const G2_GEOMETRY_BATCH2_DICTIONARY_REVIEW_SHA256 = '15e557891038d9608a70680516d38339a6cf5f1e860757054f31768052b6367f'
export const G2_GEOMETRY_BATCH2_DICTIONARY_DIRECTION_SHA256 = 'edf1f8a652cc9aa6d70577eb2e2c757121d4e39f73ef2fee352d37d432443111'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH2_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch2DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch2DictionaryMetadata(ref: G2GeometryBatch2DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch2-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH2_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH2_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH2_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch2DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH2_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch2DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch2 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH2_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH2_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH2_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch2 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch2 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH2_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch2DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch2 dictionary entry mismatch')
    return { ...g2GeometryBatch2DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH2_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES = loadG2GeometryBatch2DictionaryBundle(reviewed)
