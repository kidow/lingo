/** 縫 蓬 芬: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch5.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 5: 縫 蓬 芬 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch5DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES: readonly G2GeometryBatch5DictionaryReference[] = [
  {
    "glyph": "縫",
    "strokes": 17,
    "originalStrokes": 16,
    "corpus": "MM",
    "originalMediansSha256": "ad96611459c03310081784fff30a97099e3fb4c102e457d280b779c45299e2f4",
    "pathsSha256": "2a80a7508f9a1f3fa57f05553332452ec7e292077eccac8366cf62b1f9fd2dac",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E2B.svg",
    "dictionarySha256": "21ef4b234ddf8cd01d0ef8f7c624df9565b4ed0d151620ad4c386076a30720f1",
    "sourceStrokeIndices": [
      null,
      null,
      3,
      null,
      null,
      null,
      7,
      null,
      null,
      10,
      11,
      12,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "蓬",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "Ja",
    "originalMediansSha256": "3881c872f25c677b666bb4f09bd256890da4e68fca93b57a4cb12ccaf8038a49",
    "pathsSha256": "8778152a790b21cdf23c5d26cd3c050c236807b9ea5767fc84cc0ccbbc8bd9a7",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/84EC.svg",
    "dictionarySha256": "1228a854d76ece8c5806015b06639b99070bb94ac250fd1e0f0d468819d13a68",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      null,
      null,
      null,
      null,
      7,
      8,
      9,
      null,
      11,
      12,
      null,
      null
    ]
  },
  {
    "glyph": "芬",
    "strokes": 8,
    "originalStrokes": 7,
    "corpus": "MM",
    "originalMediansSha256": "36e64cba61b962c001333e372cf37860a325bde3008864ac4be88e17878a9085",
    "pathsSha256": "6c46301f1b61fe8bba9ca7a2f814976fd1dd3a363556b1299d2416f73f634419",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82AC.svg",
    "dictionarySha256": "27c4839fe6cc5acf6677e80690e5cfda1ac2d28b0cb6d76687b332b0a622cb07",
    "sourceStrokeIndices": [
      null,
      2,
      null,
      3,
      null,
      null,
      null,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH5_DICTIONARY_REVIEW_SHA256 = 'e61b4fc9caba4b50c3141584f3d01bca31e285fcfed87d02e9dcf678f671cb4d'
export const G2_GEOMETRY_BATCH5_DICTIONARY_DIRECTION_SHA256 = 'f602af76e2a00ca80c0d463c0dcd3831ffa8b75e60025c425ab005e388879269'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch5DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch5DictionaryMetadata(ref: G2GeometryBatch5DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch5-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH5_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH5_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH5_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch5DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch5DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch5 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH5_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch5 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch5 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH5_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch5DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch5 dictionary entry mismatch')
    return { ...g2GeometryBatch5DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH5_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES = loadG2GeometryBatch5DictionaryBundle(reviewed)
