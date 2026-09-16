/** 鈗 鎰 曺: whole-glyph dictionary order, direction, boundary and connection review. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-geometry-batch22.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 geometry batch 22: 鈗 鎰 曺 full dictionary sequences individually checked; split boundaries, direction, order, and corrected connections rechecked. Not exam-body certification."
} as const
export const G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY = {
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
    "url": "docs/hanja-g2-geometry-batch22-2026-09-17/originals.json#entries",
    "sha256": "d6fb154dbfd349d250b8e885ca2c5276fca6b199e87ec2ffa3394878f0039c19",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 4151
  }
} as const
export type G2GeometryBatch22DictionaryReference = {
  glyph: string; strokes: number; originalStrokes: number; corpus: keyof typeof G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES: readonly G2GeometryBatch22DictionaryReference[] = [
  {
    "glyph": "鈗",
    "strokes": 12,
    "originalStrokes": 12,
    "corpus": "Components",
    "originalMediansSha256": "eea40ff9fe31c2e9e1355dd34fbdad42fd30d751ce3da0bb7ba99b7c2e493f9c",
    "pathsSha256": "fe1c5304f90b6a2dc05a8124bf5b904628d00fe09a9113319b72282a7f887c83",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/9217.svg",
    "dictionarySha256": "4a527419432b8ecb55b770fa9203fb73c0234911ae2cb5dfbb4bea8a0c8bf7d8",
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
  },
  {
    "glyph": "鎰",
    "strokes": 18,
    "originalStrokes": 18,
    "corpus": "Components",
    "originalMediansSha256": "90b0a2af906b3cecc54ae9a45784e13f049b18d9528ec3ce0b73e1a2257dbb95",
    "pathsSha256": "dbf083eef118c8fee0ae283622dd89d5b8853eaa8269cf22dd7db4487da16986",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/93B0.svg",
    "dictionarySha256": "e733a7095971a8b1ebde1ee208b062447b4a94e1cd902c4da7d97614f82f967e",
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
    "glyph": "曺",
    "strokes": 10,
    "originalStrokes": 10,
    "corpus": "Components",
    "originalMediansSha256": "c0ca38a96c5672c9ebc538b775544576aee5d5ff58324d78fdbe769d694438d9",
    "pathsSha256": "3e1783388ba8fc45687858f67b0b4da09e9613eb0679adfd9bc9b35b58c08bc6",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/66FA.svg",
    "dictionarySha256": "6417e65745b2b3b064cf23ef7d4576545eb806986b666dad50cd72f2f96dda78",
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
export const G2_GEOMETRY_BATCH22_DICTIONARY_REVIEW_SHA256 = '014840d70dd4ef3a792b7d171f88bdd79603e5de2601c71648c039e0536a884d'
export const G2_GEOMETRY_BATCH22_DICTIONARY_DIRECTION_SHA256 = 'd8ab219f945a99189a465c604cb24732ee7382c381a528b09d2a79484b4d6a79'
const referencesByGlyph = new Map(G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2GeometryBatch22DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2GeometryBatch22DictionaryMetadata(ref: G2GeometryBatch22DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-17',
    geometrySource: G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-geometry-batch22-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_GEOMETRY_BATCH22_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_GEOMETRY_BATCH22_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_GEOMETRY_BATCH22_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2GeometryBatch22DictionaryBundle = {
  verificationSource: typeof G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY
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
export function loadG2GeometryBatch22DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 geometry-batch22 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_GEOMETRY_BATCH22_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES.length) throw Error('G2 geometry-batch22 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 geometry-batch22 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_GEOMETRY_BATCH22_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2GeometryBatch22DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 geometry-batch22 dictionary entry mismatch')
    return { ...g2GeometryBatch22DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_GEOMETRY_BATCH22_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES = loadG2GeometryBatch22DictionaryBundle(reviewed)
