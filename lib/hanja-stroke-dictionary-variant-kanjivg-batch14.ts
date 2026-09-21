/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-variant-kanjivg-batch14.json' with { type: 'json' }
import type { HanjaVariantStrokeData } from './hanja-stroke-variants.ts'

export const VARIANT_KANJIVG_BATCH14_PINS = [
  {
    "glyph": "祉",
    "strokes": 8,
    "geometrySource": "debd31d0f7f05a35fb57be809f239a06a15e4af7e820ff2e61aee021f0493122",
    "pathsSha256": "96797ecb1fbb7e9cf9fae55fa7b8b9c7b4b45896f0cb6bdc6e9318772c2600e0",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/7949.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/7949.svg",
      "dictionarySvgSha256": "f274b55896c7fc70fa312ed5fda3b25891bd1b7ac8bf5118290f092c87c87dd1",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "4f36900f1ce6b265452bec18f7ed9c599d507797eab379d467cd4b2afb72adc7",
      "geometryReviewSha256": "4f36900f1ce6b265452bec18f7ed9c599d507797eab379d467cd4b2afb72adc7",
      "directionReviewSha256": "4f36900f1ce6b265452bec18f7ed9c599d507797eab379d467cd4b2afb72adc7"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/07949.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 5,
    "variant": {
      "catalogStrokes": 9,
      "playbackStrokes": 8,
      "form": "사전"
    },
    "candidateSha256": "debd31d0f7f05a35fb57be809f239a06a15e4af7e820ff2e61aee021f0493122"
  }
] as const
export function loadVariantKanjiVGBatch14Strokes(bundle: typeof reviewed): readonly HanjaVariantStrokeData[] {
  if (bundle.length !== VARIANT_KANJIVG_BATCH14_PINS.length) throw new Error('Variant KanjiVG batch 14 count mismatch')
  return bundle.map((entry, i) => {
    const pin = VARIANT_KANJIVG_BATCH14_PINS[i]
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
      throw new Error('Variant KanjiVG batch 14 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_VARIANT_KANJIVG_BATCH14_STROKES = loadVariantKanjiVGBatch14Strokes(reviewed)
