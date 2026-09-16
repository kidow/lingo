/** 磻 裵 倂: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch18.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH18_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 18: 磻 裵 倂 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch18-2026-09-16/originals.json#entries",
    "sha256": "680df6cb2aeb99c60c63dc533d72260ebf0bbcfae78a705a2ab3356c0c1f6221",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 4032
  }
} as const
export type G2GeometryBatch18DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH18_DICTIONARY_REFERENCES: readonly G2GeometryBatch18DictionaryReference[] = [
  {
    "glyph": "磻",
    "strokes": 17,
    "originalStrokes": 17,
    "corpus": "Components",
    "originalMediansSha256": "1674952bbe54d5e5c025b29323755cde13cf38f321816bf98408509449bfe3b1",
    "pathsSha256": "ed1f0ccbf037cff6f0f1b423c0a8f76b871da7d4d86f603c698af651742972c5",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/78FB.svg",
    "dictionarySha256": "08bdda16e9a2f5b2b8375dfc28a1d50850b950bcfac1b30441364bed02ee6a7f",
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
  },
  {
    "glyph": "裵",
    "strokes": 14,
    "originalStrokes": 14,
    "corpus": "Components",
    "originalMediansSha256": "462cf18dc6d7dba3380e7a48d0e5be1d9e94f467d92ca3e3d60f9c284339b9a9",
    "pathsSha256": "950b7bcc2b3ac73000dd8c940454678df1b563364541f8d6188936e543051752",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/88F5.svg",
    "dictionarySha256": "5e58aa948489ee6b573897883198067af0a1d442408b9b5d31b07b99da545756",
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
    "glyph": "倂",
    "strokes": 10,
    "originalStrokes": 10,
    "corpus": "Components",
    "originalMediansSha256": "c841e1ad73a4891a5862602484978b25cf4c958c7f3d37bb0f496adfed08d53c",
    "pathsSha256": "99b3fb21a1560babb649287d394c564a428b22efcfca13122ee316ca835464c5",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5002.svg",
    "dictionarySha256": "1f49ff90eb3f601532a94c143453c8dbb31f1e41542ea6f8fd9d2bbf8ea67f54",
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
  }
]
export const G2_GEOMETRY_BATCH18_DICTIONARY_REVIEW_SHA256 = 'ec673eed3f7c48223852f103b518b49d88f5f948afbe0d3a830b56144e14a506'
export const G2_GEOMETRY_BATCH18_DICTIONARY_DIRECTION_SHA256 = '5e86df668d2a2311cb1f0c871f744796699eb096d9573baadd00c1eb1b00722e'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH18_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch18DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch18DictionaryMetadata(ref: G2GeometryBatch18DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch18-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH18_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH18_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH18_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch18DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH18_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch18DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch18 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH18_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH18_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH18_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch18 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch18 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH18_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch18DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch18 dictionary entry mismatch')
    return { ...g2GeometryBatch18DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH18_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES = loadG2GeometryBatch18DictionaryBundle(reviewed)
