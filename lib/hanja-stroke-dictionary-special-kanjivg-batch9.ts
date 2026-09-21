/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch9.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH9_PINS = [
  {
    "glyph": "髢",
    "strokes": 13,
    "geometrySource": "feb8c4655b41b830ecfc543197437c67b286b7ae580f92f5e5ab5322232412bf",
    "pathsSha256": "63109cb1f052a75a03d61661be3fa85136e4c62f33800deb06926f495c3c3abb",
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
      13
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9AE2.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9A00/9AE2.svg",
      "dictionarySvgSha256": "0f338d96030608e50d6ae3a34717e9540be6b68edd2c2f0029a68728a4e87dff",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13",
      "orderReviewSha256": "8a8919ec9928055758445d94f3d08f5b51271c426726ec1b85c3347446e5fac7",
      "geometryReviewSha256": "8a8919ec9928055758445d94f3d08f5b51271c426726ec1b85c3347446e5fac7",
      "directionReviewSha256": "8a8919ec9928055758445d94f3d08f5b51271c426726ec1b85c3347446e5fac7"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09ae2.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 5
  }
] as const
export function loadSpecialKanjiVGBatch9Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH9_PINS.length) throw new Error('Special KanjiVG batch 9 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH9_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 9 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH9_STROKES = loadSpecialKanjiVGBatch9Strokes(reviewed)
