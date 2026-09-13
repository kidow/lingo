/** Only the three disputed directions use e-hanja; its other font forms are not substituted. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed.json' with { type: 'json' }

export const HANJA_DICTIONARY_SOURCE = {
  "id": "ehanja-crosschecked",
  "title": "e-hanja 쟁점 획 방향 교차검토",
  "url": "http://www.e-hanja.kr/",
  "scope": "Korean publisher order and prior per-stroke comparison, supplemented by three directly observed dictionary strokes. Not exam-body certification."
} as const
export const HANJA_DICTIONARY_GEOMETRY_SOURCE = {
  "name": "Make Me a Hanzi with two reviewed 紅 donor strokes",
  "url": "https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt",
  "sha256": "a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee"
} as const
export const DICTIONARY_REFERENCES: Readonly<Record<string, {
  strokes: number; pathsSha256: string; directions: string; svgUrl: string; svgSha256: string
  originalMediansSha256: string; moyaId: string
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
  }
}

export function dictionarySourceReference(glyph: string) {
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref) throw new Error('Unreviewed dictionary glyph: ' + glyph)
  return {
    orderUrl: 'https://www.moyaland.com/_new/hanja/item_01.php?it_id=' + ref.moyaId,
    dictionarySvgUrl: ref.svgUrl,
    dictionarySvgSha256: ref.svgSha256,
    dictionaryDirectionStrokes: ref.directions,
    orderReviewSha256: 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
    geometryReviewSha256: '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
    directionReviewSha256: 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
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
    || !Array.isArray(bundle.characters) || bundle.characters.length !== 2) throw new Error('Dictionary bundle source mismatch')
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
