/** Three grade 1 forms (batch 23) individually reviewed, including 2 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch23.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH23_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 3 approved and 0 held; 2 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH23_DICTIONARY_GEOMETRY = {
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
  },
  "Ko": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt",
    "sha256": "7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 1387824
  },
  "Hant": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHant.txt",
    "sha256": "731fe26345833745dc7d37c8213f3ca91585aa0ee18179c0ccda91be41ff6aec",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 2988095
  },
  "Hans": {
    "url": "https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsZhHans.txt",
    "sha256": "5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798",
    "license": "Arphic Public License; reviewed subset and license in public/hanja-strokes/",
    "bytes": 22561924
  }
} as const
export type G1Batch23DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH23_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH23_DICTIONARY_REFERENCES: readonly G1Batch23DictionaryReference[] = [
  {"glyph":"洑","strokes":9,"corpus":"Hans","originalMediansSha256":"52a25eacb01d7cf71a558cf335b53d0dbfbb3362e97a23b68738d0cdf2b9d971","pathsSha256":"fcd73dfe6e73953c8356d84356cb4504a63640a27b9d8235addd6d42278bf3ac","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6D00/6D11.svg","dictionarySha256":"d4a5b9f75ed79f2ab0642863a9acba6c1270aeb956726eef8e4cd75b2d6e597b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9]},
  {"glyph":"藉","strokes":18,"corpus":"Hant","originalMediansSha256":"417655eab9af13b5015490f7865e9fa91e460f21fd037fa7274c7193485b461c","pathsSha256":"7ccd2c1f9c07a0ef1afa4ef71a8613efe7c54b5b84c01098a371835e6f475ba8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85C9.svg","dictionarySha256":"281b67afa86c5883d1772b7f5190af5a8fbadd03fb11322c389387a45c7a8d56","sourceStrokeIndices":[2,1,3,4,null,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"蕉","strokes":16,"corpus":"Hant","originalMediansSha256":"388caee2f7918f6b2f92a505ce7b13ca7947c28a770ae557b044e65c32f9e0b8","pathsSha256":"05597ce29f491b0c61f9233f2edc0e44ac0e139de2299c238096d3c27ee0f6df","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8549.svg","dictionarySha256":"ae6f92346681fe7540eb8ec780e2ec0caff70f150753d2d06c31a12e92d39b80","sourceStrokeIndices":[2,1,3,4,5,6,null,8,9,10,11,12,13,14,15,16]},
]
export const G1_BATCH23_DICTIONARY_REVIEW_SHA256 = '9f1a9cd59514282714516a13d5216ec2d9e7caf471c116b8ef40e5991d218d78'
export const G1_BATCH23_DICTIONARY_DIRECTION_SHA256 = '179395840136157a19661df17ecde2e07fce4075a41f1fd7b5fb2f8f8055c60d'
const referencesByGlyph = new Map(G1_BATCH23_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch23DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch23DictionaryMetadata(ref: G1Batch23DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH23_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch23-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH23_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH23_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH23_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch23DictionaryBundle = {
  verificationSource: typeof G1_BATCH23_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH23_DICTIONARY_GEOMETRY
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
export function loadG1Batch23DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch23 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH23_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH23_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH23_DICTIONARY_REFERENCES.length) throw Error('G1 batch23 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch23 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH23_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch23DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch23 dictionary entry mismatch')
    return { ...g1Batch23DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH23_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH23_STROKES = loadG1Batch23DictionaryBundle(reviewed)
