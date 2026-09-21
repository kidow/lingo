/** Whole-character domestic crosschecks; not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch7.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const SPECIAL_KANJIVG_BATCH7_PINS = [
  {
    "glyph": "飫",
    "strokes": 13,
    "geometrySource": "7f92e9d58061e6df90f65a5cead94b2f054fb6e5c58d7c28a3694a7449ec25db",
    "pathsSha256": "480a3be20dc12e13bdd97862066785c47606f2aecbd2c3d07b665b47bdd96b9d",
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
      13
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/98EB.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9800/98EB.svg",
      "dictionarySvgSha256": "bddd2594d25d37d401320531703b907dd20d2852acc225ad15357ba46b595733",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13",
      "orderReviewSha256": "865ba46ec017aaef2df86d4b921f9f9d3faecaf67ef1d265d75fdff279d10905",
      "geometryReviewSha256": "865ba46ec017aaef2df86d4b921f9f9d3faecaf67ef1d265d75fdff279d10905",
      "directionReviewSha256": "865ba46ec017aaef2df86d4b921f9f9d3faecaf67ef1d265d75fdff279d10905"
    },
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/098eb.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109 and reviewed 食 permutation. Rendered with the existing player stroke width 5. No curve flattening, reversal, new points, splitting or merging."
    },
    "strokeWidth": 5
  }
] as const
export function loadSpecialKanjiVGBatch7Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== SPECIAL_KANJIVG_BATCH7_PINS.length) throw new Error('Special KanjiVG batch 7 count mismatch')
  return bundle.map((entry, i) => {
    const pin = SPECIAL_KANJIVG_BATCH7_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-22' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.strokeWidth !== pin.strokeWidth
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || JSON.stringify(entry.sourceReference) !== JSON.stringify(pin.sourceReference)
      || JSON.stringify(entry.geometryLicense) !== JSON.stringify(pin.geometryLicense)) {
      throw new Error('Special KanjiVG batch 7 entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH7_STROKES = loadSpecialKanjiVGBatch7Strokes(reviewed)
