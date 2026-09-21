/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch5.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_KANJIVG_BATCH5_PINS = [
  {
    "glyph": "眈",
    "strokes": 9,
    "geometrySource": "d37cd9cf87ca196ffc18d3be86b9e60bb0a0794bc43ecae5626ae10666f4dc38",
    "pathsSha256": "01f4a812e22ed7acbd040e4c07f7768bb5a1313b8d1b6783f17dd6c0e7ff49d4",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7708.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7708.svg",
      "dictionarySvgSha256": "421eea9e7049ed607e5734f04e843411bfac1d97eb40112e791069ea48806290",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "12aa686cf8437c9c4c22e258b7c9850567c237b00a5540815823cd8a16fdcf15",
      "geometryReviewSha256": "12aa686cf8437c9c4c22e258b7c9850567c237b00a5540815823cd8a16fdcf15",
      "directionReviewSha256": "12aa686cf8437c9c4c22e258b7c9850567c237b00a5540815823cd8a16fdcf15"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/07708.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadG1KanjiVGBatch5Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== G1_KANJIVG_BATCH5_PINS.length) throw new Error('G1 KanjiVG batch 5 count mismatch')
  return bundle.map((entry, i) => {
    const pin = G1_KANJIVG_BATCH5_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('G1 KanjiVG batch 5 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_G1_KANJIVG_BATCH5_STROKES = loadG1KanjiVGBatch5Strokes(reviewed)
