/** Eleven grade 1 forms (batch 24) individually reviewed, including 3 corrected forms. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-batch24.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_BATCH24_DICTIONARY_VERIFICATION = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Grade 1 batch 8: 50 characters individually checked, 11 approved and 5 held; 3 corrected forms rechecked. Not exam-body certification."
} as const
export const G1_BATCH24_DICTIONARY_GEOMETRY = {
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
export type G1Batch24DictionaryReference = {
  glyph: string; strokes: number; corpus: keyof typeof G1_BATCH24_DICTIONARY_GEOMETRY
  originalMediansSha256: string; pathsSha256: string; dictionaryUrl: string; dictionarySha256: string
  sourceStrokeIndices: readonly (number | null)[]
}
export const G1_BATCH24_DICTIONARY_REFERENCES: readonly G1Batch24DictionaryReference[] = [
  {"glyph":"疼","strokes":10,"corpus":"Ja","originalMediansSha256":"8f7743722571836c5bcfec6d7b743c1c9a496a512b6c8614609580e4aa8fc5b3","pathsSha256":"e122195a66c4ebd352ed903e697af6bc9a55e68d11bf1a502a2c4bd95b087b0b","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/75BC.svg","dictionarySha256":"4c656717735f77da89aebd3cd824da16943241c420e963105a9d0754fbf91fec","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"碌","strokes":13,"corpus":"Ja","originalMediansSha256":"ce856292d3b1b2c898da8a988a352a87d170dd89f1745a798a0f534c832b8e33","pathsSha256":"20bdffeaca7f136d2ed6c6bb91a317d2ca2d73fd9bd22d3a9902a94f65a322c4","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/788C.svg","dictionarySha256":"e3002a14092db1a3b3b47ab1e369310acf0a14283f3d1d99b9895649a1c57215","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"贖","strokes":22,"corpus":"Ja","originalMediansSha256":"fdc0eca131579c092a34fa966d7f5027043ed651b32f833acc4e2c4ef52b2c58","pathsSha256":"1c9569f6efed48d83cab9dec7b4ab4cebd00f58be3abc5f2301fbff149d50016","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8D00/8D16.svg","dictionarySha256":"1476e01ee2397c47b22e2596c5dd1ca4c00a25dfd01d8d3db5297d3b06f5d26b","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]},
  {"glyph":"猜","strokes":11,"corpus":"Ja","originalMediansSha256":"ec8058e18dd27c66613b4f237a2505bac41fed05bbac302f466fb82e6b931f69","pathsSha256":"ae0a86fc046226431db80a36eebc2b7e5534b44bb61c0a3b2b6cf896e0771b9c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/731C.svg","dictionarySha256":"e355e20b4ddc2da9559a65acdef8c14e4bc5d39bfa6918da3056dc51fba63242","sourceStrokeIndices":[1,2,3,4,6,5,7,8,9,10,11]},
  {"glyph":"揄","strokes":12,"corpus":"Ja","originalMediansSha256":"00199c356d9174103d0a7008227a4a2682df9fc0f448684bcfb6357cf28a096b","pathsSha256":"42c2905d88444c355839bacfaf834f3b3c1b6fb8e4688709ad1859c30313978f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/63C4.svg","dictionarySha256":"6012355ba65ed3cfb3b341bda9ca49e7240737e5b93914038e04b177a53ed900","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12]},
  {"glyph":"癒","strokes":18,"corpus":"Ja","originalMediansSha256":"bbf8ae4e407208b9e627127e1c5ac2a307ebea1e150867bcdd7a4eeeb296481d","pathsSha256":"8c5c4df65dd1e26733eb04237c13d07502d1e023c662561a220fddbbdddd91fe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7652.svg","dictionarySha256":"f64617e326bfa1cc002b81c1a071eae0ae0c406f3607c09a71035ec215e4cff2","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
  {"glyph":"睛","strokes":13,"corpus":"Ja","originalMediansSha256":"9f78c00533cc0d7614aedf6b6a002ffad625758b3be5469f2873b64d5709c592","pathsSha256":"a5f9933b3b60a10b4c9fe73f15d89a5c12a38fcb6f2babf803cac8638311ab7c","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/775B.svg","dictionarySha256":"774ffda580b7386e746b2d3a59e57e001db4ef94238c9557432634714c1a93f2","sourceStrokeIndices":[1,2,3,4,5,6,8,7,9,10,11,12,13]},
  {"glyph":"嗔","strokes":13,"corpus":"Ja","originalMediansSha256":"c72e32de9ccffb43f163b882218726b68a02b516a87f3c3ce33dbffbad0b82ea","pathsSha256":"16ad3c87414128e7b3d494ad4830a305c45dee129e4a574e95ec8409f2add12f","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/55D4.svg","dictionarySha256":"08351bd7fec2126ea517aba76af3c905f7a392701a6f93f6d3c77734ba1571ff","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13]},
  {"glyph":"瘠","strokes":15,"corpus":"Ja","originalMediansSha256":"4f09997e0ee548a878459a210feb94c9cb43521f1080c334c53d39227b769f1a","pathsSha256":"c326cdcbffb862de9630fa9f7113bce918b4dce415d4150fc78f0b7c28cbc8d8","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/7600/7620.svg","dictionarySha256":"6d5d10093b8cb8ca592dd29aadd3b2a39dff35c0b30df3f47996384f009fb65e","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  {"glyph":"脊","strokes":10,"corpus":"Ja","originalMediansSha256":"af2a3729e41a2e95bb86eb30343970a6a5bf37eb99f240fb3581de3eae2ba482","pathsSha256":"c82ad0a12583c89fe231104bc3495a8cacc2093262abb76eac67992e53f09dfe","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8100/810A.svg","dictionarySha256":"cb6e252dff668c7df9b787836f54b9361885b71b1d9826a4303e5a0ed0abda30","sourceStrokeIndices":[1,2,3,4,5,6,7,8,9,10]},
  {"glyph":"凸","strokes":5,"corpus":"Ja","originalMediansSha256":"10b9595c2175b537b10e7f5bb24dd8793c71086032000dca933753766d1e1b6a","pathsSha256":"96c308339c71ec48039b7545a16ec3de02509b26125717e6356317f7b6a9e529","dictionaryUrl":"http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/51F8.svg","dictionarySha256":"3f0d88d9f0ccfc37dc6dd0fd8b3f2deabe123cda8ef864d4c3c8085507002f26","sourceStrokeIndices":[2,1,3,4,5]},
]
export const G1_BATCH24_DICTIONARY_REVIEW_SHA256 = '5b3c180ede3228b86446fe2a23b7fb2e70a94c82b3d7c10fd1d94a8abf729f83'
export const G1_BATCH24_DICTIONARY_DIRECTION_SHA256 = '1c0d6f2978ede90aca0afbbd2821e83d772ac3dccc2c3fef1cec59259623e37c'
const referencesByGlyph = new Map(G1_BATCH24_DICTIONARY_REFERENCES.map(r => [r.glyph, r]))
export const g1Batch24DictionaryReference = (glyph: string) => referencesByGlyph.get(glyph)

export function g1Batch24DictionaryMetadata(ref: G1Batch24DictionaryReference): Omit<HanjaDictionaryStrokeData, 'paths' | 'verificationSource'> {
  return {
    glyph: ref.glyph, verifiedAt: '2026-09-20',
    geometrySource: G1_BATCH24_DICTIONARY_GEOMETRY[ref.corpus].sha256,
    geometryCorrection: 'dictionary-g1-batch24-' + ref.glyph.codePointAt(0)!.toString(16) + '-v1',
    sourceStrokeIndices: ref.sourceStrokeIndices, pathsSha256: ref.pathsSha256,
    sourceReference: {
      orderUrl: ref.dictionaryUrl, dictionarySvgUrl: ref.dictionaryUrl, dictionarySvgSha256: ref.dictionarySha256,
      dictionaryDirectionStrokes: Array.from({ length: ref.strokes }, (_, i) => i + 1).join(','),
      orderReviewSha256: G1_BATCH24_DICTIONARY_REVIEW_SHA256, geometryReviewSha256: G1_BATCH24_DICTIONARY_REVIEW_SHA256,
      directionReviewSha256: G1_BATCH24_DICTIONARY_DIRECTION_SHA256,
    },
  }
}
export type G1Batch24DictionaryBundle = {
  verificationSource: typeof G1_BATCH24_DICTIONARY_VERIFICATION
  geometrySources: typeof G1_BATCH24_DICTIONARY_GEOMETRY
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
export function loadG1Batch24DictionaryBundle(value: unknown): readonly HanjaDictionaryStrokeData[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('G1 batch24 dictionary bundle mismatch')
  const bundle = value as Record<string, unknown>
  if (Object.keys(bundle).length !== 3 || !same(bundle.verificationSource, G1_BATCH24_DICTIONARY_VERIFICATION)
    || !same(bundle.geometrySources, G1_BATCH24_DICTIONARY_GEOMETRY) || !Array.isArray(bundle.characters)
    || bundle.characters.length !== G1_BATCH24_DICTIONARY_REFERENCES.length) throw Error('G1 batch24 dictionary bundle mismatch')
  return bundle.characters.map((entry: unknown, i: number) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw Error('G1 batch24 dictionary entry mismatch')
    const { paths, ...metadata } = entry as Record<string, unknown>
    const reference = G1_BATCH24_DICTIONARY_REFERENCES[i]
    if (!same(metadata, g1Batch24DictionaryMetadata(reference)) || !Array.isArray(paths) || paths.length !== reference.strokes
      || !paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)
        && path.match(/-?\d+(?:\.\d+)?/g)!.every(n => Number.isFinite(+n) && +n >= 0 && +n <= 100)))
      throw Error('G1 batch24 dictionary entry mismatch')
    return { ...g1Batch24DictionaryMetadata(reference), paths: paths as string[], verificationSource: G1_BATCH24_DICTIONARY_VERIFICATION.id }
  })
}
export const HANJA_DICTIONARY_G1_BATCH24_STROKES = loadG1Batch24DictionaryBundle(reviewed)
