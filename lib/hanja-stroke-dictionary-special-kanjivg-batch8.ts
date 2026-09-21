/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch8.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH8_PINS = [
  {
    "glyph": "隰",
    "strokes": 17,
    "geometrySource": "9ce16c32eb78a5bdef7aa5a63cd35d1f28e76225ecac39f0d5de38aabc0efca7",
    "pathsSha256": "a9fd21534e27b8d2e3af058aae6499ea64c79658ac2adabb34be7295e7ad3366",
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
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96B0.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96B0.svg",
      "dictionarySvgSha256": "1be8e3044667fdbc4af53446cf5b1b211dd474a6938b213490a3019dd8c4a625",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b",
      "geometryReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b",
      "directionReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/096b0.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 2.7522935779816513
  },
  {
    "glyph": "阨",
    "strokes": 7,
    "geometrySource": "012ae78580f7805747c4b2a31354f390170093c03684ab9cb7d957d436b7d579",
    "pathsSha256": "a56706d5da81ec0c3a155e3ffdf4b49d3c99665a83ff512cee0e959b6e629a4f",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9628.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9628.svg",
      "dictionarySvgSha256": "1d207e38f478585ad81355f29a6b55134967035ff1390b12304c975c1760ec0d",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b",
      "geometryReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b",
      "directionReviewSha256": "faeaa3e20265ebb2fa382e085e54c410f551f647a4c6314a37e7748c7c3db08b"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09628.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109; original stroke order. Per-glyph rendering width reviewed against the exact domestic reference. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 5
  }
] as const
export function loadSpecialKanjiVGBatch8Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH8_PINS.length) throw new Error('Special KanjiVG batch 8 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH8_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 8 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH8_STROKES = loadSpecialKanjiVGBatch8Strokes(reviewed)
