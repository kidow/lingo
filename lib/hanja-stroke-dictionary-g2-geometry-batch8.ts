/** 瑛 暎 芮: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch8.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH8_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 8: 瑛 暎 芮 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch8DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH8_DICTIONARY_REFERENCES: readonly G2GeometryBatch8DictionaryReference[] = [
  {
    "glyph": "瑛",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "MM",
    "originalMediansSha256": "2224b8b560e27a65c67af3c255db10455de2ec8226b5be80e28b0b7e1c7202e2",
    "pathsSha256": "345c439f38c484c2ce7883e7cbad835b43fabdea5512b6d5221c6f492a3d50f9",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/745B.svg",
    "dictionarySha256": "52cf2235cac71b31f43f0bde7158e57e0edf063b0ce028a6bd05713695733308",
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
      null
    ]
  },
  {
    "glyph": "暎",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "Ja",
    "originalMediansSha256": "ed4bb514bb9555bd477a41a7fe49aab9e00781472d653f6dac8d21e158d275cb",
    "pathsSha256": "4d01b5026559026007e643229c4e14341d5213d16c0dfd0ac0f69efabb6fd3b2",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/668E.svg",
    "dictionarySha256": "964aeb1a1a43cc9066b0e9ed82ef415df240ed6bcf266872c880e69f43000b80",
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
      null
    ]
  },
  {
    "glyph": "芮",
    "strokes": 8,
    "originalStrokes": 7,
    "corpus": "MM",
    "originalMediansSha256": "5222012adc79019970ba3a87ec1c5e9daba6c552b7ed9d8898a68b7fc269613c",
    "pathsSha256": "e16f7867451429d1b5418b0d64f69871661e2b4f945b8ceef34de9ebd3050ff8",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82AE.svg",
    "dictionarySha256": "1e3094d923fbcd8e8af8327413faeaeac63e23ef3d95122db377f1004b56167a",
    "sourceStrokeIndices": [
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
export const G2_GEOMETRY_BATCH8_DICTIONARY_REVIEW_SHA256 = 'b99bf0aa35a3c8990b9645b914aaa37a78ce01ed064973e8792b45e3573489c8'
export const G2_GEOMETRY_BATCH8_DICTIONARY_DIRECTION_SHA256 = '40c757979621543458f23cac16ba6aae91571cb63581aa1ebc96523493de96b5'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH8_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch8DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch8DictionaryMetadata(ref: G2GeometryBatch8DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch8-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH8_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH8_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH8_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch8DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH8_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch8DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch8 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH8_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH8_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH8_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch8 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch8 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH8_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch8DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch8 dictionary entry mismatch')
    return { ...g2GeometryBatch8DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH8_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES = loadG2GeometryBatch8DictionaryBundle(reviewed)
