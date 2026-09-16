/** Seven grade 2 forms individually reviewed and corrected. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g2-batch10.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G2_BATCH10_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 2 batch 10: 7 characters individually checked; 7 corrected forms rechecked. Not exam-body certification."
} as const
export const G2_BATCH10_DICTIONARY_GEOMETRY = {
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
export type G2Batch10DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G2_BATCH10_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G2_BATCH10_DICTIONARY_REFERENCES: readonly G2Batch10DictionaryReference[] = [
  {"glyph":"欽","strokes":12,"corpus":"MM","originalMediansSha256":"6ed087d518ac72eb2787c31ba72af8368ede8f1c645ae196917f048a1d287344","pathsSha256":"12fc1ba7eb5e929a31fc3d69d0da164e1e6c1354f6d73f9aac726f320a43ba90","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6B00/6B3D.svg","dictionarySha256":"64115a301dd4780431b618cf9fa0de6e85e53cb47dac273d2270361361d7801f","sourceStrokeIndices":[1,2,3,4,5,6,null,8,9,10,11,null]},
  {"glyph":"噫","strokes":16,"corpus":"MM","originalMediansSha256":"55ce53a3fd819d0110e9665228d81bd9910eb1a6d550d4e63fd3217e255ffc35","pathsSha256":"6af272ae2953502d57f16e21a6b5976722742b35aa2723b7636b85e9e942ecbd","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/566B.svg","dictionarySha256":"8d539aed8ae58aec85a5957fca59bf113b621a9866425ddccbe114170f1bc9d3","sourceStrokeIndices":[1,2,3,null,5,6,7,8,9,10,null,null,13,14,15,null]},
  {"glyph":"熹","strokes":16,"corpus":"MM","originalMediansSha256":"b41a077cc21efd4ca24d1bcf73f37247e271a29d2d4a014478b8c1bd17163ada","pathsSha256":"95037be5ff672ee10f4a1b0f06f8b622c64a1dac9aa7cab88d1e41d1459191c6","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7100/71B9.svg","dictionarySha256":"84907d7a10d20c86b112cb767df5422d78e1daddc878a56d4b1f67f4998ca74c","sourceStrokeIndices":[1,2,3,null,5,null,null,null,9,10,null,null,13,null,15,16]},
  {"glyph":"憙","strokes":16,"corpus":"Ja","originalMediansSha256":"9a63317110f166dc3226adce150cb85c5b598d937eff0116db03fd13ba7d55d8","pathsSha256":"213a9651a55fcc49052a19662a6c001e83b2053fc58de4b12bf8a8e182e1ee0b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6100/6199.svg","dictionarySha256":"cff4402e151c1ea79ea60cbeb5d4d18986197aa5307f48dd6e1e94d81b39d7fe","sourceStrokeIndices":[1,2,3,4,5,6,null,null,9,10,11,12,13,null,15,null]},
  {"glyph":"嬉","strokes":15,"corpus":"MM","originalMediansSha256":"6ee01f5448d4cd7434a357e4c095c9901560d1b0b316d424be98286c35663036","pathsSha256":"d634d3a2e5bb6791e2395609b61362f2744b416f6b4057128716b0e8a8ea24b8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B09.svg","dictionarySha256":"09610ab07f78eccd8d370729e4f11188d9aa1b7d322606ff1ae6887245a2f560","sourceStrokeIndices":[1,2,3,4,5,6,7,null,null,null,null,12,13,14,15]},
  {"glyph":"羲","strokes":16,"corpus":"MM","originalMediansSha256":"53a2080973bf713bffec135dec3205d44613238dea7ae81f35c6a9f8437ac1d9","pathsSha256":"a8f81dfb05f7bd47fa05c168bf5a4da6f5dbd575bab62a2b69a7b350c48498db","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7F00/7FB2.svg","dictionarySha256":"bcdaac037f55f94d5957eeb92ad1ba24223af4b494f0524945cce617a7d8be4a","sourceStrokeIndices":[1,2,3,4,null,6,7,8,9,10,11,12,13,null,null,16]},
  {"glyph":"禧","strokes":17,"corpus":"Ja","originalMediansSha256":"45e5fdfa542db7ccc5afecfede8149936a69a8a0147046700996cefa91da5778","pathsSha256":"b559545d2736caedbbfeeebd15ae850e0b79f67a3ff6aad6fb03db7be87dba81","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79A7.svg","dictionarySha256":"587eeacdc5544c09c3bc13e3f67663f961376e1140a161256b4ba8065d1db787","sourceStrokeIndices":[1,2,3,null,null,6,7,8,9,10,11,null,null,null,15,16,17]},
]
export const G2_BATCH10_DICTIONARY_REVIEW_SHA256 = 'c888633aac14627e4dba92a15a421a53c4acc658092aefe64128a3da771d3fea'
export const G2_BATCH10_DICTIONARY_DIRECTION_SHA256 = '0a537e24763c09a5359e5d491e52abf6ff41108a566954e4af94e3fc3464b808'
const referencesByGlyph = new Map(G2_BATCH10_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g2Batch10DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g2Batch10DictionaryMetadata(ref: G2Batch10DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-16',
    geometrySource: G2_BATCH10_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g2-batch10-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G2_BATCH10_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G2_BATCH10_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G2_BATCH10_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G2Batch10DictionaryBundle = {
  verificationSource: typeof G2_BATCH10_DICTIONARY_VERIFICATION
  geometrySources: typeof G2_BATCH10_DICTIONARY_GEOMETRY
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
export function loadG2Batch10DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G2 batch10 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G2_BATCH10_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G2_BATCH10_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G2_BATCH10_DICTIONARY_REFERENCES.length) throw Error('G2 batch10 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G2 batch10 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G2_BATCH10_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g2Batch10DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G2 batch10 dictionary entry mismatch')
    return { ...g2Batch10DictionaryMetadata(reference), paths: paths as string[], verificationSource: G2_BATCH10_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G2_BATCH10_STROKES = loadG2Batch10DictionaryBundle(reviewed)
