/** 埰 爀 瀅: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch24.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH24_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 24: 埰 爀 瀅 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY = {
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
  },
  "ZhHans": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHans.txt",
    "sha256": "5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 22561924
  },
  "ZhHant": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHant.txt",
    "sha256": "731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 2988095
  },
  "Components": {
    "url": "docs/hanja-g2-geometry-batch24-2026-09-17/originals.json#entries",
    "sha256": "597f65d0d250e39f4ef0916828d0ae8ee09f618ea2d6b3b1015c4d433e9e5274",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 5144
  }
} as const
export type G2GeometryBatch24DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH24_DICTIONARY_REFERENCES: readonly G2GeometryBatch24DictionaryReference[] = [
  {
    "glyph": "埰",
    "strokes": 11,
    "originalStrokes": 11,
    "corpus": "Components",
    "originalMediansSha256": "f60d9b85f298b6bf85a6eba6c153cd45748cc12edd84edd29aab1a2c10f08e2b",
    "pathsSha256": "1a51c6a0a7997e23f306f3c461198870e882e3170049f7628e38921179727d30",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/57F0.svg",
    "dictionarySha256": "1efb7c6b0fb7b666c823e9280c99716605e5387225ae97dc530add7142bd09f8",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "爀",
    "strokes": 18,
    "originalStrokes": 18,
    "corpus": "Components",
    "originalMediansSha256": "4ed42220edc8d4a4b38ac97c6ae85957309ddc7d34bb5d9873d7949e2923a30f",
    "pathsSha256": "e5d725fcf2e3f77e24e99f3f7db2121cc87b81845e56c7e561d0cba4c4a0d510",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/7200.svg",
    "dictionarySha256": "0338fef98e84f074200bee46dc1d59b4ec51114df37c54428e975feabbd4a80d",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "瀅",
    "strokes": 18,
    "originalStrokes": 18,
    "corpus": "Components",
    "originalMediansSha256": "27f0c7dccbf12bc10ad6026164fb4f07fb2336c3f7dc789547446e978952ce6b",
    "pathsSha256": "1686f4e8f0bf4ec8cdad999c35202d98136b8642766b5553f88ac3e465ad162e",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7005.svg",
    "dictionarySha256": "73a34f92cb40274362cde993879d373958cc9acad838428f03280206777e22c5",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH24_DICTIONARY_REVIEW_SHA256 = '3dc216a475e18481acee50d3b76480a025d9489a57a477681a610f018be102ad'
export const G2_GEOMETRY_BATCH24_DICTIONARY_DIRECTION_SHA256 = 'ea6d2e24f93db778ddea34b888e607f6a4a9d80e15f5ffa84724414465bb6df8'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH24_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch24DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch24DictionaryMetadata(ref: G2GeometryBatch24DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch24-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH24_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH24_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH24_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch24DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH24_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch24DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch24 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH24_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH24_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH24_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch24 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch24 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH24_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch24DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch24 dictionary entry mismatch')
    return { ...g2GeometryBatch24DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH24_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES = loadG2GeometryBatch24DictionaryBundle(reviewed)
