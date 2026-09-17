/** 澔 嬅 壎: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch25.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 25: 澔 嬅 壎 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch25-2026-09-17/originals.json#entries",
    "sha256": "35d9e01ddbde273790ea87f95a69fd7b91929d05d388cc73d5f1764d23d05684",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 4161
  }
} as const
export type G2GeometryBatch25DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES: readonly G2GeometryBatch25DictionaryReference[] = [
  {
    "glyph": "澔",
    "strokes": 15,
    "originalStrokes": 15,
    "corpus": "Components",
    "originalMediansSha256": "979fd8eaec82d88233258ee94e75dba0f180541b7300f7aa4b6a352d1c96905c",
    "pathsSha256": "29e205c0a6056e262b3422ed4ee269b67641af5ded094e468bb049a59217f911",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F94.svg",
    "dictionarySha256": "85c790270ff648c42561326867df98a42116ddcc3f8b93bafffe06d2f746d655",
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
    "glyph": "嬅",
    "strokes": 14,
    "originalStrokes": 14,
    "corpus": "Components",
    "originalMediansSha256": "6aea7a9a007a2e82b9be72b6f3e937ce99649bf8d5aff4f52e70cc84d64fb7eb",
    "pathsSha256": "5317284346507c3f7394a451286d7b65740ade8db708b92df23cbb18937f4e1d",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B05.svg",
    "dictionarySha256": "0a755b3b68936d7d99f7f0a50acc73541d46f04b47edd1a824b21eacab70e349",
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
      null
    ]
  },
  {
    "glyph": "壎",
    "strokes": 17,
    "originalStrokes": 17,
    "corpus": "Components",
    "originalMediansSha256": "b668fb65d9f7ea44470dcc5d0cc7cf9820486a87e496f915e56656916a4fbeba",
    "pathsSha256": "6f72fc30a83ddd1577f88d3ca695df5505f8622d66de3a8c9a012a29a7b9afbf",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/58CE.svg",
    "dictionarySha256": "ae9109dc7b4983580f95205c11ee0ca2f8b98ae16b9d37d89d7656ea617dd12b",
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
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH25_DICTIONARY_REVIEW_SHA256 = '3cb23440c6130f8c0476d49143dfa6d6f97b1ba28473559669ccbe7640f480d2'
export const G2_GEOMETRY_BATCH25_DICTIONARY_DIRECTION_SHA256 = 'eb7cac25ca1c701a81a341d849e019ed3112d01c3ab75a9f7e9786e72652c92c'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch25DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch25DictionaryMetadata(ref: G2GeometryBatch25DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch25-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH25_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH25_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH25_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch25DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch25DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch25 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH25_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch25 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch25 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH25_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch25DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch25 dictionary entry mismatch')
    return { ...g2GeometryBatch25DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH25_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES = loadG2GeometryBatch25DictionaryBundle(reviewed)
