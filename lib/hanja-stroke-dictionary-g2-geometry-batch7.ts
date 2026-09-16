/** 荀 艾 惹: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch7.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH7_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 7: 荀 艾 惹 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch7DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH7_DICTIONARY_REFERENCES: readonly G2GeometryBatch7DictionaryReference[] = [
  {
    "glyph": "荀",
    "strokes": 10,
    "originalStrokes": 9,
    "corpus": "MM",
    "originalMediansSha256": "aa6693507d7804d2deaab0706e651d4aba8216328b7819926087b205335e680e",
    "pathsSha256": "2e93112c9338cc83b440ab9309717e273a5c4d66b857783076f353fcbdfd8008",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8340.svg",
    "dictionarySha256": "442a54434dbcda8ea0d5279496ad3ed9202cf6b7d3e052290d7bd756ffbb3175",
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
      null
    ]
  },
  {
    "glyph": "艾",
    "strokes": 6,
    "originalStrokes": 5,
    "corpus": "MM",
    "originalMediansSha256": "99d55f52d1427379d8f67ed12ee706f756d107cbce94cbf46fc0ab0483520f3b",
    "pathsSha256": "1b19257873d964a0d997f33658660f723945fc0fbf7a7209f3c4abf1eae667c8",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/827E.svg",
    "dictionarySha256": "25048abd634e4c558e3f590433bbc20340085a197817f771c067aae917f34fdd",
    "sourceStrokeIndices": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "glyph": "惹",
    "strokes": 13,
    "originalStrokes": 12,
    "corpus": "MM",
    "originalMediansSha256": "768f09390671c845ac21b0c2e716c17ba750be53c44fb7d53533457450090a78",
    "pathsSha256": "d63805564ed8031180d62ff90a85f527cef1092705dff537eec186d96accabd9",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/60F9.svg",
    "dictionarySha256": "93d55f4abaa001fba51d1d5060f4d19126fad6e1be9b2f4ba16ed15c523348b3",
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
      9,
      null,
      11,
      null
    ]
  }
]
export const G2_GEOMETRY_BATCH7_DICTIONARY_REVIEW_SHA256 = '4bebeaf8e86fea5782da1ad5c28fe59e5940dfde9874c787a3cec5674cc67a84'
export const G2_GEOMETRY_BATCH7_DICTIONARY_DIRECTION_SHA256 = 'c81aeecff46ebbb0c7791abbf05c282dcbcacefdf8fa3c263526588ab61919eb'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH7_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch7DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch7DictionaryMetadata(ref: G2GeometryBatch7DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch7-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH7_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH7_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH7_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch7DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH7_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch7DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch7 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH7_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH7_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH7_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch7 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch7 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH7_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch7DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch7 dictionary entry mismatch')
    return { ...g2GeometryBatch7DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH7_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES = loadG2GeometryBatch7DictionaryBundle(reviewed)
