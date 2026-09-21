/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch6.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH6_PINS = [
  {
    "glyph": "魴",
    "strokes": 15,
    "geometrySource": "a8d4e571b17b7c64dde6d6220aaf4ab829165bf9ff438e027593810e1481716e",
    "pathsSha256": "951ba02af76d2ff58665527f79b5ca0794d9d4653a7d98f48d338d8830009601",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      6,
      5,
      7,
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
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B74.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9B00/9B74.svg",
      "dictionarySvgSha256": "ddf7556fb58b4eb2cf1ed4d96ae37dcde2e3b65edb00b002e89423d40d7092c9",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
      "orderReviewSha256": "4d84aa09ef877f50e1973dd4451502db9d49121434ad3db21cedbf03e2bec2c7",
      "geometryReviewSha256": "4d84aa09ef877f50e1973dd4451502db9d49121434ad3db21cedbf03e2bec2c7",
      "directionReviewSha256": "4d84aa09ef877f50e1973dd4451502db9d49121434ad3db21cedbf03e2bec2c7"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09b74.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109, including the original stroke width 3. Reviewed 5/6 permutation applied. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 2.7522935779816513
  }
] as const
export function loadSpecialKanjiVGBatch6Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH6_PINS.length) throw new Error('Special KanjiVG batch 6 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH6_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 6 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH6_STROKES = loadSpecialKanjiVGBatch6Strokes(reviewed)
