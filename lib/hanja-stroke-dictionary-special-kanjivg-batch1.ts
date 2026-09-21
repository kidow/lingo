/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch1.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH1_PINS = [
  {
    "glyph": "鵙",
    "strokes": 18,
    "geometrySource": "d72c179ce803eb2a6c13e39170ae060c007bb02c991e4c26ec504ca4f70210f4",
    "pathsSha256": "79cd1fc99c1ef76f588c7be175a3aafb45206f7c219c347988eed3a23d4fc417",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D59.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9D00/9D59.svg",
      "dictionarySvgSha256": "e026cbdb337f9a2411f41bb3b29b653a8d7a487de18a5047fc98eb1c5ba38da4",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
      "orderReviewSha256": "b194ff0a4d79daf122089f11c100e956a467a94d495d0db3fc4d981e968bde61",
      "geometryReviewSha256": "b194ff0a4d79daf122089f11c100e956a467a94d495d0db3fc4d981e968bde61",
      "directionReviewSha256": "b194ff0a4d79daf122089f11c100e956a467a94d495d0db3fc4d981e968bde61"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09d59.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadSpecialKanjiVGBatch1Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH1_PINS.length) throw new Error('Special II KanjiVG batch 2 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH1_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special II KanjiVG batch 2 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH1_STROKES = loadSpecialKanjiVGBatch1Strokes(reviewed)
