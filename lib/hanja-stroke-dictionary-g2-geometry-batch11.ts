/** 鑽 蔡 葡: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch11.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH11_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 11: 鑽 蔡 葡 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch11DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH11_DICTIONARY_REFERENCES: readonly G2GeometryBatch11DictionaryReference[] = [
  {
    "glyph": "鑽",
    "strokes": 27,
    "originalStrokes": 26,
    "corpus": "MM",
    "originalMediansSha256": "8a3c64918e0f78f9fb376b393b151ce13e7a07b8c20aa65beb92d55e560c61f4",
    "pathsSha256": "d133f37b27972e5cbac263c7995c7b4371bc8f2d957de348b162d58a91846009",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9400/947D.svg",
    "dictionarySha256": "16431c7c80dc48445904b5308baad54b204eb455cbfd95d6aad2229c5c2fff60",
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
    "glyph": "蔡",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "57d1ae4b818bd4272bc9f16b9056274d571320b206042622b530b6230072bd79",
    "pathsSha256": "547cb2b51a56c4c3d753ff89f9ad98cb21f2a82f4e4a088e069eca98fc1ce17a",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8521.svg",
    "dictionarySha256": "a8c6a155a5ae8e36e619cce8963aed704f31f30b764d64196fa5f14f41e11d1b",
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
      null
    ]
  },
  {
    "glyph": "葡",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "MM",
    "originalMediansSha256": "9bcf7841804de742a4e1054eac13a5a1259fc7b63ca9f2ab4c46c4e8c36f52bf",
    "pathsSha256": "983948d47c1b3c8dc75a754e59527e568d1110d943f018678c2d58606861d112",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8461.svg",
    "dictionarySha256": "c9cd0b504f23fc15b35a37517d7007163f8e9231151a45c6603604fc4c26bd27",
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
  }
]
export const G2_GEOMETRY_BATCH11_DICTIONARY_REVIEW_SHA256 = '63fbc7126f6b78b52feef115546433448ebe9ab3a058f96e02a31bae58a62858'
export const G2_GEOMETRY_BATCH11_DICTIONARY_DIRECTION_SHA256 = '88e9e368995095b963874116adb8591f4244842ecd569500b381af2033df665e'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH11_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch11DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch11DictionaryMetadata(ref: G2GeometryBatch11DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch11-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH11_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH11_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH11_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch11DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH11_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch11DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch11 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH11_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH11_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH11_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch11 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch11 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH11_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch11DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch11 dictionary entry mismatch')
    return { ...g2GeometryBatch11DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH11_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES = loadG2GeometryBatch11DictionaryBundle(reviewed)
