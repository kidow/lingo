/** 塏 璟 琯: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch14.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH14_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 14: 塏 璟 琯 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch14-2026-09-16/originals.json#components",
    "sha256": "73e788c55d231dda353085e30fd7e93df152dd314a88ca6f8ebda5af78237747",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1196
  }
} as const
export type G2GeometryBatch14DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH14_DICTIONARY_REFERENCES: readonly G2GeometryBatch14DictionaryReference[] = [
  {
    "glyph": "塏",
    "strokes": 13,
    "originalStrokes": 13,
    "corpus": "Components",
    "originalMediansSha256": "36734cdabac9d43d6c32629e30d7c7cd85743562621dde079c14cee48dd1846c",
    "pathsSha256": "2f287a1ebfe5f6a203938018c9aa1c0e5cf72bf7a1c4270a44f91c199735e165",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/584F.svg",
    "dictionarySha256": "8e3ea80d6aaaaf71dc76dfd339c065930756d6e91b555d03398aebd56c5c4f9e",
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
    "glyph": "璟",
    "strokes": 16,
    "originalStrokes": 16,
    "corpus": "ZhHans",
    "originalMediansSha256": "2322a107d4de1bcfd7168637581d7fd220a6546f82d1a098918489e5248aa5ab",
    "pathsSha256": "d52099774e67b0159c74b6a4676260bd2784e2516ee760d02f6ae3693514b53c",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/749F.svg",
    "dictionarySha256": "36b35819523827c87beb318296c696404a7b420d94a59bd69b0fb4305317f421",
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
      null
    ]
  },
  {
    "glyph": "琯",
    "strokes": 12,
    "originalStrokes": 12,
    "corpus": "ZhHans",
    "originalMediansSha256": "a27ec4a027079c014be1dac2694fb4ae5748e4792b25c4cdef5c24252a949866",
    "pathsSha256": "82b23f87b62df1848c7271275d6f4ea13a7380e829558df519ba88dcfc5f99c9",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/742F.svg",
    "dictionarySha256": "4c27392f1cdd5e1281b56cdad1a69ab5164df2012e6639eae3c4c4d6bb6b0799",
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
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH14_DICTIONARY_REVIEW_SHA256 = '65e67c1b3ff717d99cf0155dffeba52d0c01990d25facd65603a8b265a10218b'
export const G2_GEOMETRY_BATCH14_DICTIONARY_DIRECTION_SHA256 = '4aeab89b80e79b4013accba5eb336e1e36986110558fd20054c4e6422c03216d'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH14_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch14DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch14DictionaryMetadata(ref: G2GeometryBatch14DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch14-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH14_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH14_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH14_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch14DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH14_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch14DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch14 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH14_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH14_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH14_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch14 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch14 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH14_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch14DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch14 dictionary entry mismatch')
    return { ...g2GeometryBatch14DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH14_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES = loadG2GeometryBatch14DictionaryBundle(reviewed)
