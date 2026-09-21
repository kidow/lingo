/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch5.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH5_PINS = [
  {
    "glyph": "闍",
    "strokes": 17,
    "geometrySource": "2c44b29732a40e58d4ca40de8f0e165def7baef169dc87af7d0a5d6d1fd7ef0a",
    "pathsSha256": "db0da1f9921d8acb3cfd5556af2e738bf3bf37138c0c13350edc357a842167dd",
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
      17
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95CD.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9500/95CD.svg",
      "dictionarySvgSha256": "b1324c37dfb1c2a8ef6c870069fdcf583539c99f3b917805915f80693768b359",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "06de31816d0e64c9fe2ae22eb6a87ba067ed390a9c2e7a63c790484be0efe9aa",
      "geometryReviewSha256": "06de31816d0e64c9fe2ae22eb6a87ba067ed390a9c2e7a63c790484be0efe9aa",
      "directionReviewSha256": "06de31816d0e64c9fe2ae22eb6a87ba067ed390a9c2e7a63c790484be0efe9aa"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/095cd.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109, including the original stroke width 3. Source order preserved. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 2.7522935779816513
  }
] as const
export function loadSpecialKanjiVGBatch5Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH5_PINS.length) throw new Error('Special KanjiVG batch 5 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH5_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 5 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH5_STROKES = loadSpecialKanjiVGBatch5Strokes(reviewed)
