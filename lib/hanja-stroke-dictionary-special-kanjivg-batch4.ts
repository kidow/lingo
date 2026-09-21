/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH4_PINS = [
  {
    "glyph": "麕",
    "strokes": 19,
    "geometrySource": "928d17627811a45d7887db8c53c74d01c09a47ca7b177250109c755328a82012",
    "pathsSha256": "f6a0dca4ac08565cb9d01de9a075d5c939375053f148723aa08836b39bf2da0c",
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
      18,
      19
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E95.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E95.svg",
      "dictionarySvgSha256": "f373ee7256295fafbc71b036c613dfdfa226c9a8d7b9771496beff0f9c28c70e",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19",
      "orderReviewSha256": "97f1a371703760cabb093eca9a46c0ed206c9b2fbc75b63e4d1a05a9099574a1",
      "geometryReviewSha256": "97f1a371703760cabb093eca9a46c0ed206c9b2fbc75b63e4d1a05a9099574a1",
      "directionReviewSha256": "97f1a371703760cabb093eca9a46c0ed206c9b2fbc75b63e4d1a05a9099574a1"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09e95.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109, including the original stroke width 3. Source order preserved. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 2.7522935779816513
  }
] as const
export function loadSpecialKanjiVGBatch4Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH4_PINS.length) throw new Error('Special KanjiVG batch 4 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH4_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 4 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH4_STROKES = loadSpecialKanjiVGBatch4Strokes(reviewed)
