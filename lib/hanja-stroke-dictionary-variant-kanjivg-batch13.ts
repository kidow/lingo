/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-variant-kanjivg-batch13.json' with { type: 'json' }
import type { HanjaVariantStrokeData } from './hanja-stroke-variants.ts'

export const VARIANT_KANJIVG_BATCH13_PINS = [
  {
    "glyph": "禦",
    "strokes": 17,
    "geometrySource": "c038f1f6cdae5dcd4cd10b629c551bfa0c2ce6479e34b6eb13db0a789df9fbe5",
    "pathsSha256": "daf398f1ee8dfb26136a57bd0f13e90a141a408659753be2bd4877303ab5e860",
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
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79A6.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79A6.svg",
      "dictionarySvgSha256": "72fedf2c08721aa31682dc6360ad70266ed5857497fc9c50551d1407a6b83fdd",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "2a2b1b59f27d514f437546c58609d164d4af5c2016c29ef4b29fb4e95a342f4d",
      "geometryReviewSha256": "2a2b1b59f27d514f437546c58609d164d4af5c2016c29ef4b29fb4e95a342f4d",
      "directionReviewSha256": "2a2b1b59f27d514f437546c58609d164d4af5c2016c29ef4b29fb4e95a342f4d"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/079a6.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 3.669724770642202,
    "variant": {
      "catalogStrokes": 16,
      "playbackStrokes": 17,
      "form": "사전"
    },
    "candidateSha256": "c038f1f6cdae5dcd4cd10b629c551bfa0c2ce6479e34b6eb13db0a789df9fbe5"
  }
] as const
export function loadVariantKanjiVGBatch13Strokes(bundle: typeof reviewed): readonly HanjaVariantStrokeData[] {
  if (bundle.length !== VARIANT_KANJIVG_BATCH13_PINS.length) throw new Error('Variant KanjiVG batch 13 count mismatch')
  return bundle.map((entry, i) => {
    const pin = VARIANT_KANJIVG_BATCH13_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.candidateSha256 !== pin.candidateSha256 || JSON.stringify(entry.variant) !== JSON.stringify(pin.variant)
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Variant KanjiVG batch 13 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_VARIANT_KANJIVG_BATCH13_STROKES = loadVariantKanjiVGBatch13Strokes(reviewed)
