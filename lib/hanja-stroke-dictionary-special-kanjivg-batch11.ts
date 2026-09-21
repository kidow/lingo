/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch11.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH11_PINS = [
  {
    "glyph": "餔",
    "strokes": 16,
    "geometrySource": "d3ee84f52456dd10ebf07fc9bacea98733b6f309eae7038cbbe3ba19d221d1ca",
    "pathsSha256": "619287eb24361bd0b50bbc396fc6aee61172020b2619b1f0dfd542e94eae6217",
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
      16
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9914.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9914.svg",
      "dictionarySvgSha256": "606b2b57ac9bc60326709ad6404cf797caf4d4b8279b4c1a65dbc666f8821c76",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
      "orderReviewSha256": "2a73599ab4778734582debe5d35ba2f49f4f2c9e358b98cbd2d695d7a9e2fb93",
      "geometryReviewSha256": "2a73599ab4778734582debe5d35ba2f49f4f2c9e358b98cbd2d695d7a9e2fb93",
      "directionReviewSha256": "2a73599ab4778734582debe5d35ba2f49f4f2c9e358b98cbd2d695d7a9e2fb93"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09914.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; domestic-reviewed stroke permutation. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 4.6
  }
] as const
export function loadSpecialKanjiVGBatch11Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH11_PINS.length) throw new Error('Special KanjiVG batch 11 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH11_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 11 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH11_STROKES = loadSpecialKanjiVGBatch11Strokes(reviewed)
