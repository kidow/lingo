/** Per-glyph dictionary comparisons; source artwork is never used as runtime geometry. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed.json' with { type: 'json' }

export const HANJA_DICTIONARY_SOURCE = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 필순·방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Per-glyph Korean dictionary crosschecks: three disputed directions for 訣·紋, and complete sequences for 森·楓. Not exam-body certification."
} as const
export const HANJA_DICTIONARY_GEOMETRY_SOURCE = {
  "name": "Make Me a Hanzi with two reviewed 紅 donor strokes",
  "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
  "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee"
} as const
export const DICTIONARY_REFERENCES: Readonly<Record<string, {
  strokes: number; pathsSha256: string; directions: string; svgUrl: string; svgSha256: string
  originalMediansSha256: string; moyaId?: string; wholeGlyphReview?: true
}>> = {
  "訣": {
    "strokes": 11,
    "pathsSha256": "435af55f848a05e34f914caa7f44a6bf374ea4c433fdc8bdf8b1c30bc9e56b1b",
    "directions": "11",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8A23.svg",
    "svgSha256": "cb6e1872d42392cb31a33836fe73c904fe4e98819cce659db79e5911bf946ef5",
    "originalMediansSha256": "66e8fe7d0f7224d87475494186f5bd059a5ef2c005b64400ffa63fee0a0a4038",
    "moyaId": "1426211138"
  },
  "紋": {
    "strokes": 10,
    "pathsSha256": "b56229e19c76d38f7416ed5889b5dbc8e0cc58686e8b9fce55831bc306457d3b",
    "directions": "4,5",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D0B.svg",
    "svgSha256": "a91427c241f313eaf0b6b344db307ef3987a9c41d70b1c2e13277bebd7f1a4c8",
    "originalMediansSha256": "dd79b6482e1b27ae8a00dfb7268caf50e507f7e029825fad1f43fefbddb044c6",
    "moyaId": "1427260631"
  },
  "森": {
    "strokes": 12,
    "pathsSha256": "506e9158f1a5e4e060cf3e9637cc09355fb88fd4913eb0bd997e4c87ab59eff7",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68EE.svg",
    "svgSha256": "85260a980be04cd745afdbc54a084f7808b96911c983d47e51e02939658fb110",
    "originalMediansSha256": "cd04eb332edb46b081760204fb4d800b914a7c6441a58d5206a55e6d02753f5e",
    "wholeGlyphReview": true
  },
  "楓": {
    "strokes": 13,
    "pathsSha256": "85cc8a6a9ec86dd5059c29fa134d5b44166704faae207527fde30509b957cb3a",
    "directions": "1,2,3,4,5,6,7,8,9,10,11,12,13",
    "svgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6900/6953.svg",
    "svgSha256": "fc7b9d8244d4fe80acf1602ed6ddbf64fa26d0a4c1ee1cd3b93a53f1753633ab",
    "originalMediansSha256": "4656865eb5d853903ecaee3ba3b7a8ceae22c0960a0f36e4560cda3af0d9a8a4",
    "wholeGlyphReview": true
  }
}

export function dictionarySourceReference(glyph: string) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref) throw new Error('Unreviewed dictionary glyph: ' + glyph)
  return {
    orderUrl: ref.wholeGlyphReview ? ref.svgUrl : 'https://www.moyaland.com/_new/hanja/item_01.php?it_id=' + ref.moyaId,
    dictionarySvgUrl: ref.svgUrl,
    dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: ref.wholeGlyphReview ? 'a03a988581ae438f9db5e08fe6846854f0d343b1b2f2d89552a70a39b7409314' : 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
    geometryReviewSha256: ref.wholeGlyphReview ? 'e5929e944b1a1f9f044f5f4cf6abdba00f1eadc7c993cef27803fa26de37915b' : '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
    directionReviewSha256: ref.wholeGlyphReview ? 'a87ee0996533aa8a45f48c17712a609c1023f9e32d732a20e0c369e9f22efb32' : 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
  }
}

export type HanjaDictionaryStrokeData = {
  glyph: string
  verificationSource: 'ehanja-crosschecked'
  verifiedAt: string
  geometrySource: string
  geometryCorrection: string
  sourceStrokeIndices: readonly (number | null)[]
  pathsSha256: string
  paths: readonly string[]
  sourceReference: ReturnType<typeof dictionarySourceReference>
  sourceImage?: never
  sourceRow?: never
  sourceWholeImage?: never
  geometryAuthored?: never
  strokeOrder?: never
}
export type DictionaryBundle = {
  verificationSource: typeof HANJA_DICTIONARY_SOURCE
  geometrySource: typeof HANJA_DICTIONARY_GEOMETRY_SOURCE
  characters: readonly Omit<HanjaDictionaryStrokeData, 'verificationSource'>[]
}
function sameFields(value: unknown, expected: Readonly<Record<string, string>>) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const actual = value as Record<string, unknown>
  return Object.keys(actual).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, entry]) => Object.hasOwn(actual, key) && actual[key] === entry)
}
export function dictionaryStrokeIndices(glyph: string) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref) throw new Error('Unreviewed dictionary glyph: ' + glyph)
  return Array.from({ length: ref.strokes }, (_, i) => glyph === '紋' && (i === 3 || i === 4) ? null : i + 1)
}
/** Structural checks are browser-safe; prebuild also reconstructs every path and pins every proof. */
export function loadDictionaryBundle(bundle: DictionaryBundle): readonly HanjaDictionaryStrokeData[] {
  if (!bundle || !sameFields(bundle.verificationSource, HANJA_DICTIONARY_SOURCE)
    || !sameFields(bundle.geometrySource, HANJA_DICTIONARY_GEOMETRY_SOURCE)
    || !Array.isArray(bundle.characters) || bundle.characters.length !== Object.keys(DICTIONARY_REFERENCES).length) throw new Error('Dictionary bundle source mismatch')
  const seen = new Set<string>()
  return bundle.characters.map(entry => {
    const ref = entry && Object.hasOwn(DICTIONARY_REFERENCES, entry.glyph) ? DICTIONARY_REFERENCES[entry.glyph] : undefined
    if (!ref || seen.has(entry.glyph) || entry.verifiedAt !== '2026-09-13'
      || entry.geometrySource !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
      || entry.geometryCorrection !== 'dictionary-crosscheck-' + entry.glyph.codePointAt(0)!.toString(16) + '-v1'
      || entry.pathsSha256 !== ref.pathsSha256 || !Array.isArray(entry.paths) || entry.paths.length !== ref.strokes
      || !entry.paths.every((path: unknown) => typeof path === 'string' && /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path))
      || !Array.isArray(entry.sourceStrokeIndices) || entry.sourceStrokeIndices.length !== ref.strokes
      || entry.sourceStrokeIndices.some((stroke: unknown, i: number) => stroke !== dictionaryStrokeIndices(entry.glyph)[i])
      || !sameFields(entry.sourceReference, dictionarySourceReference(entry.glyph))
      || entry.sourceImage !== undefined || entry.sourceRow !== undefined || entry.sourceWholeImage !== undefined
      || entry.geometryAuthored !== undefined || entry.strokeOrder !== undefined) throw new Error('Dictionary bundle entry mismatch')
    seen.add(entry.glyph)
    return { ...entry, verificationSource: HANJA_DICTIONARY_SOURCE.id }
  })
}
export const HANJA_DICTIONARY_STROKES = loadDictionaryBundle(reviewed as DictionaryBundle)
