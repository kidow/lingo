/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch4.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_KANJIVG_BATCH4_PINS = [
  {
    "glyph": "饌",
    "strokes": 21,
    "geometrySource": "db6bdcad0d1a6784d75c0240af0af7dabec7b552e41596eb676723f909f2c480",
    "pathsSha256": "778f3d3f28b0ac4a277c7acc90e4aa09aa7b272cffeeb69fc0934f41382fb3eb",
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
      17,
      18,
      19,
      20,
      21
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/994C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/994C.svg",
      "dictionarySvgSha256": "b569e9b9420d07a86b30cf1905a8b30be37db50a35e12ba9960d3a12609d6acd",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21",
      "orderReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c",
      "geometryReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c",
      "directionReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0994c-Kaisho.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  },
  {
    "glyph": "鍼",
    "strokes": 17,
    "geometrySource": "8ff03c132efea9b1e34ab20ec1af43fbdd29a98c4a4ad2cde11da7900ae6659a",
    "pathsSha256": "4b49e6a10d98fe3502741197887af1eb401718a3415ce0fe1e4d8e263e98e89e",
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
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/937C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/937C.svg",
      "dictionarySvgSha256": "48116575cdfdc66295296bbd9392b1612052eab02a58396721b4c4aae786b556",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c",
      "geometryReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c",
      "directionReviewSha256": "55d64a62b86e2185938e69d095a317a3ef1e8a00314f1999b0e04271dde49c9c"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0937c.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadG1KanjiVGBatch4Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== G1_KANJIVG_BATCH4_PINS.length) throw new Error('G1 KanjiVG batch 4 count mismatch')
  return bundle.map((entry, i) => {
    const pin = G1_KANJIVG_BATCH4_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('G1 KanjiVG batch 4 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_G1_KANJIVG_BATCH4_STROKES = loadG1KanjiVGBatch4Strokes(reviewed)
