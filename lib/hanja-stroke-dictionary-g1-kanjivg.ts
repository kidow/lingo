/** Three grade 1 forms individually crosschecked against e-hanja, not exam-body certification. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const G1_KANJIVG_PINS = [
  {
    "glyph": "饉",
    "strokes": 20,
    "geometrySource": "eb82eb7fe7458a0230d96a47bf50dc02a6f63299934bf7d9b3687cc6128e6e98",
    "pathsSha256": "f0ec1de43a03804920ef54894d88a6dee551107490641bfda24ffee2ddcce326",
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
      18,
      19,
      17,
      20
    ],
    "dictionarySvgSha256": "6a0ecf700c20aafb69509e9992ddc19f5b1c7ff6057ca39450802ba6087f410a"
  },
  {
    "glyph": "睹",
    "strokes": 14,
    "geometrySource": "f7a3b53261e9f113c945162d38f7d2e77705340838a4d53a7774781001586192",
    "pathsSha256": "b807efddae9198531eda0d069941f864650a6527ee793f2bb78c6f633b0ec0c8",
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
      14
    ],
    "dictionarySvgSha256": "7c99d0e9f5136fa724c31324296ee1fce8b9d0d11a6eae28f23a2cdebe298541"
  },
  {
    "glyph": "燐",
    "strokes": 16,
    "geometrySource": "359b146dc59fb3e440540ffa68c3e61a1d6da42b4ff08eb40193d2a83950867a",
    "pathsSha256": "acd6365285d927b973950d2ad161f552c7b2e3a3f1dbd96da6201a39b39f068e",
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
      16
    ],
    "dictionarySvgSha256": "87086fbd31b009fd2346f7d24b9354e7b69747d95912356b981e8eee9309030e"
  }
] as const

export function loadG1KanjiVGStrokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (bundle.length !== G1_KANJIVG_PINS.length) throw new Error('G1 KanjiVG bundle count mismatch')
  return bundle.map((entry, i) => {
    const pin = G1_KANJIVG_PINS[i]
    if (!pin || entry.glyph !== pin.glyph || entry.verificationSource !== 'ehanja-crosschecked'
      || entry.verifiedAt !== '2026-09-21' || entry.geometrySource !== pin.geometrySource
      || entry.geometryCorrection !== 'kanjivg-uniform-scale-100-over-109-reviewed-order-v1'
      || entry.pathsSha256 !== pin.pathsSha256 || entry.paths.length !== pin.strokes
      || !entry.paths.every(path => /^M[\s\d.-]/.test(path))
      || JSON.stringify(entry.sourceStrokeIndices) !== JSON.stringify(pin.sourceStrokeIndices)
      || entry.sourceReference.dictionarySvgSha256 !== pin.dictionarySvgSha256
      || entry.sourceReference.orderReviewSha256 !== 'b3c58a510feb917159fb1e25ee6f5200f0bb85ead690b36512cf853426f9af12'
      || entry.sourceReference.geometryReviewSha256 !== 'b3c58a510feb917159fb1e25ee6f5200f0bb85ead690b36512cf853426f9af12'
      || entry.sourceReference.directionReviewSha256 !== 'b3c58a510feb917159fb1e25ee6f5200f0bb85ead690b36512cf853426f9af12'
      || entry.geometryLicense.spdx !== 'CC-BY-SA-3.0'
      || entry.geometryLicense.revision !== '422b5538595676da918c288a4230cb5e22a1ee7e') {
      throw new Error('G1 KanjiVG bundle entry mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}

export const HANJA_DICTIONARY_G1_KANJIVG_STROKES = loadG1KanjiVGStrokes(reviewed)
