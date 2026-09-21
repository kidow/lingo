/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch3.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_KANJIVG_BATCH3_PINS = [
  {
    "glyph": "餞",
    "strokes": 17,
    "geometrySource": "ad775ff904738a0498d0271ef1496620d36b7a92a127684bd6cee39b482e6f19",
    "pathsSha256": "af6726e97f86e1063f4a3a181eff6c804cbb5349b3306282c4587bd858bc7332",
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
      15,
      16,
      17
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/991E.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/991E.svg",
      "dictionarySvgSha256": "cd1b1bd9e12570066d7eaa4166e3b7fd872bab897f8c21503f76ecfca1f4517f",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "2cb00fda296069f62b1af00f676e65cca937eff4b78b55e125bd384a9ff4ee0c",
      "geometryReviewSha256": "2cb00fda296069f62b1af00f676e65cca937eff4b78b55e125bd384a9ff4ee0c",
      "directionReviewSha256": "2cb00fda296069f62b1af00f676e65cca937eff4b78b55e125bd384a9ff4ee0c"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0991e-Kaisho.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadG1KanjiVGBatch3Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== G1_KANJIVG_BATCH3_PINS.length) throw new Error('G1 KanjiVG batch 3 count mismatch')
  return bundle.map((entry, i) => {
    const pin = G1_KANJIVG_BATCH3_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('G1 KanjiVG batch 3 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_G1_KANJIVG_BATCH3_STROKES = loadG1KanjiVGBatch3Strokes(reviewed)
