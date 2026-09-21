/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-kanjivg-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL2_KANJIVG_BATCH4_PINS = [
  {
    "glyph": "餉",
    "strokes": 15,
    "geometrySource": "6f6f8e5f72569ea76d9be61f9a9fb9ce62ca7b1507bd45759992b4a075278462",
    "pathsSha256": "89eb34e46557c0998f427f54c056c0c2080b46ecd3c60024ec070e1d727ac777",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      5,
      6,
      7,
      4,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9909.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9909.svg",
      "dictionarySvgSha256": "3de388cfe3154b9202696701734181c641d4718a4882857453550a00bc5f4470",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
      "orderReviewSha256": "887054205833275f085e7b5b80fbfc6553da48845a860e54d9c6e9008563771d",
      "geometryReviewSha256": "887054205833275f085e7b5b80fbfc6553da48845a860e54d9c6e9008563771d",
      "directionReviewSha256": "887054205833275f085e7b5b80fbfc6553da48845a860e54d9c6e9008563771d"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09909.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadSpecial2KanjiVGBatch4Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL2_KANJIVG_BATCH4_PINS.length) throw new Error('Special II KanjiVG batch 4 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL2_KANJIVG_BATCH4_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special II KanjiVG batch 4 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH4_STROKES = loadSpecial2KanjiVGBatch4Strokes(reviewed)
