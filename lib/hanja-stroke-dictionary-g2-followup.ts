/** The six held grade 2 forms enter playback only after their complete corrected reviews. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-followup.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_FOLLOWUP_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 batch 1 followup: six corrected characters individually rechecked. Not exam-body certification."
} as const
export const G2_FOLLOWUP_DICTIONARY_GEOMETRY = {
  "MM": {
    "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
    "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 30778076
  },
  "Ja": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt",
    "sha256": "2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 21862957
  }
} as const
export type G2FollowupDictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G2_FOLLOWUP_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_FOLLOWUP_DICTIONARY_REFERENCES: readonly G2FollowupDictionaryReference[] = [
  {"glyph":"迦","strokes":9,"corpus":"Ja","originalMediansSha256":"12e01004f2b15483dfd7358d23682e5c6bc59009beac3e00abedd15732ce3bed","pathsSha256":"2ff97563e80d3833acf5df4ef0e9820dc41ba2f527a62d431c8a5e4078bf1aa0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FE6.svg","dictionarySha256":"835b821e69fa7570a3971e0817cfad95ac00fed2e78113c6e6452492ae9077b9","sourceStrokeIndices":[1,2,3,4,5,6,7,null,null]},
  {"glyph":"甄","strokes":14,"corpus":"Ja","originalMediansSha256":"956f139db1aadafc6422a5fd334d4d5514ce8a0c27c2c11e871c2717d0a8c6f9","pathsSha256":"740f4e83cf43147446ba41e14568e2c95bbbeb80ee81fcd299ba17e36aae115e","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/7504.svg","dictionarySha256":"1e0fd4c213b8f390410489d120f84d9b1aa305d3a1bc44912a882a701f412c0e","sourceStrokeIndices":[1,2,3,null,null,6,7,8,9,10,11,12,13,14]},
  {"glyph":"雇","strokes":12,"corpus":"MM","originalMediansSha256":"19a1a3febd1a0e7fba290e3b90dc5e76dbd53660587766249551ad3bd1b0be22","pathsSha256":"39c753d9d192eff6da2a38ee901a2fb0dcfebfa9ad438334e816d7ed14353cda","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96C7.svg","dictionarySha256":"90c55a8e46f5fb0e55c2a5b944d94e2aab4510dafd8dcdb0e22880481bbe183f","sourceStrokeIndices":[null,2,3,null,5,6,null,8,9,10,11,12]},
  {"glyph":"膠","strokes":15,"corpus":"MM","originalMediansSha256":"8641152f4ecfbb500362f32d3bb4439cb0818689426a0f45ac0bcc7fc9922033","pathsSha256":"dda3e029a4e38805c939bea2dd202fa8f755f8dca4571041d1066dde3e5eee47","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/81A0.svg","dictionarySha256":"aaf9a2dc43b37b623e42931b84036ee7804efad7e57b2c7b9e10fb1f2187a12d","sourceStrokeIndices":[1,2,3,4,5,null,null,8,null,null,11,12,13,14,15]},
  {"glyph":"絞","strokes":12,"corpus":"MM","originalMediansSha256":"469b9ee603f056a073ce800c44396b4ff95bb7054a9ebac7298370b1c7aafc71","pathsSha256":"7c00802ec98335b4ea2f6975dc685b771da95ec37d1cabff09188a4e9c72f6de","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D5E.svg","dictionarySha256":"c29cdef955b2f8ea7aa30721f21322999eaacffb4df266596f3203cefb220367","sourceStrokeIndices":[1,2,3,null,null,null,null,8,9,10,11,12]},
  {"glyph":"窟","strokes":13,"corpus":"MM","originalMediansSha256":"9d7b4eb6fe8726528003aea3e290141bc420e51cfdf4e6bd648815e6459d2f4e","pathsSha256":"42bd10f73a2298b3ba404723054c8e2c08992a7747c90c4ed06491e97f5d6ea0","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7A9F.svg","dictionarySha256":"635709c2d377d6ac81cfc3a7890c2da136702fafe19d15111fb3bd4579caca4e","sourceStrokeIndices":[null,2,null,4,null,6,7,8,11,9,10,12,13]},
]
export const G2_FOLLOWUP_DICTIONARY_REVIEW_SHA256 = 'c7fb7ed673daff9ede9dde19dca864928370663222064188bb7b099951d5b50a'
export const G2_FOLLOWUP_DICTIONARY_DIRECTION_SHA256 = 'ea544352924ace9d47850f067ac8b3add08eb72fcc6b791c17be17c0df8357ad'
const referencesByGlyph = new Map(G2_FOLLOWUP_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2FollowupDictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2FollowupDictionaryMetadata(ref: G2FollowupDictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-15',
    geometrySource: G2_FOLLOWUP_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-batch1-followup-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_FOLLOWUP_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_FOLLOWUP_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_FOLLOWUP_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2FollowupDictionaryBundle = {
  verificationSource: typeof G2_FOLLOWUP_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_FOLLOWUP_DICTIONARY_GEOMETRY
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
export function loadG2FollowupDictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 followup dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_FOLLOWUP_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_FOLLOWUP_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_FOLLOWUP_DICTIONARY_REFERENCES.length) throw Error('G2 followup dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 followup dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_FOLLOWUP_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2FollowupDictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 followup dictionary entry mismatch')
    return { ...g2FollowupDictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_FOLLOWUP_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_FOLLOWUP_STROKES = loadG2FollowupDictionaryBundle(reviewed)
