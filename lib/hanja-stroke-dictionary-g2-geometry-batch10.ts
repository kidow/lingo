/** 苑 芝 遮: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch10.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH10_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 10: 苑 芝 遮 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY = {
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
export type G2GeometryBatch10DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH10_DICTIONARY_REFERENCES: readonly G2GeometryBatch10DictionaryReference[] = [
  {
    "glyph": "苑",
    "strokes": 9,
    "originalStrokes": 8,
    "corpus": "MM",
    "originalMediansSha256": "0c29e834d15693076e39dafd21a733efd7136b881ec487646b87e4a145060e55",
    "pathsSha256": "fd444b27e92e17c1d8a5972427612741826c8b9ff6674834e999a00263dfbde2",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82D1.svg",
    "dictionarySha256": "01b14a107b9288b5c524fc692039645bf7b41fbe20f81d7d0cd7b4ef60375f4e",
    "sourceStrokeIndices": [
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
    "glyph": "芝",
    "strokes": 8,
    "originalStrokes": 6,
    "corpus": "MM",
    "originalMediansSha256": "710cb6053ac8c0bbaf1ffb0459b9b813aa196375c13149804ec8aafb365d85cf",
    "pathsSha256": "f9e7f87a589562a8982625cd2601e951f624e80c065c02a5629c897d1f57a090",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/829D.svg",
    "dictionarySha256": "3506422ba5963da4997c0428695388021038bfc2f3e572479c276177d0d088bb",
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
  },
  {
    "glyph": "遮",
    "strokes": 15,
    "originalStrokes": 14,
    "corpus": "MM",
    "originalMediansSha256": "c0a2696c6d3de93729e71d51a86d21e4bf484535fbd3322c07c58b0a826af07f",
    "pathsSha256": "706a6549e19841ad1d812339b4204d892fad756d5adc3f37cc94ce0469dda4b0",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/906E.svg",
    "dictionarySha256": "3b2cdf26512a32a62ca8a4497913c6743ba6f2f3f541b52a70d9974b07561b04",
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
  }
]
export const G2_GEOMETRY_BATCH10_DICTIONARY_REVIEW_SHA256 = '0355d26d2104fecefd46983c934e1739604fe00d9ad34236e8552850cfadd532'
export const G2_GEOMETRY_BATCH10_DICTIONARY_DIRECTION_SHA256 = '7c1aa4dd1ca5385f2e59ec8810c28a002e8d35d49cef59b21344805afe161f1e'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH10_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch10DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch10DictionaryMetadata(ref: G2GeometryBatch10DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch10-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH10_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH10_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH10_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch10DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH10_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch10DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch10 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH10_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH10_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH10_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch10 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch10 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH10_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch10DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch10 dictionary entry mismatch')
    return { ...g2GeometryBatch10DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH10_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES = loadG2GeometryBatch10DictionaryBundle(reviewed)
