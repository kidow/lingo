/** 藍·蘆: whole dictionary playback plus the explicit official four-stroke grass guideline. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-lan-lu.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_LAN_LU_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 藍·蘆: whole dictionary playback plus the official four-stroke grass guideline; all 38 resulting paths checked and 6 local corrections rechecked. Not exam-body certification."
} as const
export const G2_LAN_LU_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  }
} as const
export type G2LanLuDictionaryReference = {
  glyph: string; strokes: number; dictionaryStrokes: number; corpus: keyof typeof G2_LAN_LU_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_LAN_LU_DICTIONARY_REFERENCES: readonly G2LanLuDictionaryReference[] = [
  {
    "glyph": "藍",
    "strokes": 18,
    "dictionaryStrokes": 17,
    "corpus": "MM",
    "originalMediansSha256": "70882eb6ab7765c87e1699e295caf01193cd4709fb858b839a3ba403ac736de3",
    "pathsSha256": "c2fd3310ec26a40196e5e4dbea242cd1ffc7398fc8541147107f9d97bb09f312",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85CD.svg",
    "dictionarySha256": "9af6e563c3301f2b67e5fac22f04d22dee329029fcfd6df1628e465b45140ab5",
    "sourceStrokeIndices": [
      2,
      1,
      4,
      3,
      5,
      6,
      null,
      8,
      9,
      10,
      11,
      12,
      null,
      14,
      null,
      16,
      17,
      18
    ]
  },
  {
    "glyph": "蘆",
    "strokes": 20,
    "dictionaryStrokes": 19,
    "corpus": "MM",
    "originalMediansSha256": "15a07bb42ac2c1343b70c82e2582598be36c1b17104a2079e7a4531d6fcecd53",
    "pathsSha256": "e3a0fff9bb287900565eb17b35aef64bf6ca82f7f9cd9afb406815e9b331625a",
    "dictionaryUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8600/8606.svg",
    "dictionarySha256": "9667870575a6206f480fc9ec5973b3af72ce1a007a14adb958305b0d457fbfa7",
    "sourceStrokeIndices": [
      2,
      1,
      null,
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      null,
      14,
      15,
      16,
      null,
      18,
      19,
      20
    ]
  }
]
export const G2_LAN_LU_DICTIONARY_REVIEW_SHA256 = '3e97656f5a542508e24b21e89c8ee71da39424cf521e2702cc013a3e7d3536bb'
export const G2_LAN_LU_DICTIONARY_DIRECTION_SHA256 = 'f0539749fe19a676a5a1f5a5e08718c99da5311ac79820c67621e3d373b4ec50'
const referencesByGlyph = new Map(G2_LAN_LU_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2LanLuDictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2LanLuDictionaryMetadata(ref: G2LanLuDictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_LAN_LU_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-lan-lu-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: "https://www.hanja.re.kr/kccpt/exam/otherData.do", dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.dictionaryStrokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_LAN_LU_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_LAN_LU_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_LAN_LU_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2LanLuDictionaryBundle = {
  verificationSource: typeof G2_LAN_LU_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_LAN_LU_DICTIONARY_GEOMETRY
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
export function loadG2LanLuDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 lan-lu dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_LAN_LU_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_LAN_LU_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_LAN_LU_DICTIONARY_REFERENCES.length) throw Error('G2 lan-lu dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 lan-lu dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_LAN_LU_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2LanLuDictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 lan-lu dictionary entry mismatch')
    return { ...g2LanLuDictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_LAN_LU_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_LAN_LU_STROKES = loadG2LanLuDictionaryBundle(reviewed)
