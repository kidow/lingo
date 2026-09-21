/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch2.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_KANJIVG_BATCH2_PINS = [
  {
    "glyph": "餠",
    "strokes": 17,
    "geometrySource": "30af1e89aecf5bfeff18b0091ddd12379c82431e2a18ce19375a1fbaa616e6e0",
    "pathsSha256": "95d1a0f153a41a879a9e7db81a922433ea359ef5365ed7d0760a42b6fe1cf689",
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
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9920.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9920.svg",
      "dictionarySvgSha256": "c93d33e6cb442a2215c43945b4125c9bce040249c9b60f8b1b85af6da818a956",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "orderReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428",
      "geometryReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428",
      "directionReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09920-Kaisho.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  },
  {
    "glyph": "鰒",
    "strokes": 20,
    "geometrySource": "77446b0bd59ceec4af0562e7ed523b8decbabd9b5fcbc47041c6fb047d6325da",
    "pathsSha256": "7a4b287101986c076f6b67a9af14add235888e2cb513a3debe70001a0fa1249f",
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
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C12.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9C00/9C12.svg",
      "dictionarySvgSha256": "25e84f8e380479f42e450f5babb98fbe189681dcf3954d99f59a5b497576016b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      "orderReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428",
      "geometryReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428",
      "directionReviewSha256": "e5c1cd338771a6841dd091df86eed608c359393e5a37b645b28e5560100a0428"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09c12-Kaisho.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform scaling by 100/109 and individually reviewed stroke reordering. No curve flattening, reversal, new points, splitting or merging."
    }
  }
] as const
export function loadG1KanjiVGBatch2Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== G1_KANJIVG_BATCH2_PINS.length) throw new Error('G1 KanjiVG batch 2 count mismatch')
  return bundle.map((entry, i) => {
    const pin = G1_KANJIVG_BATCH2_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('G1 KanjiVG batch 2 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_G1_KANJIVG_BATCH2_STROKES = loadG1KanjiVGBatch2Strokes(reviewed)
