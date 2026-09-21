/** Exact-glyph textbook review; publisher evidence is not exam-body certification. */
import reviewed from '../public/hanja-strokes/textbook-kanjivg-reviewed.json' with { type: 'json' }
import type { HanjaTextbookStrokeData } from './hanja-strokes.ts'

export const TEXTBOOK_KANJIVG_PINS = [
  {
    "glyph": "鄰",
    "verificationSource": "vivasam-high-2022",
    "verifiedAt": "2026-09-21",
    "geometrySource": "67651a1c9cf4f3ead3f1ce10323a1b2f46d623021d93bbd785bd213a120dd222",
    "geometryCorrection": "kanjivg-uniform-scale-100-over-109-reviewed-order-v1",
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
      15
    ],
    "pathsSha256": "96bfa7cde1d8ba8e4c4797c18f87d211b374834a05f88c3bca315c81e9da8aec",
    "sourceReference": {
      "manifestSha256": "32853d2396dc4fe38362b9e51a828144d7e48889f60e28d850cae9fa2335620c",
      "manifestRow": "0480",
      "glyph": "鄰",
      "videoFilename": "0480.mp4"
    },
    "sourceVideo": {
      "url": "https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/media/video/0480.mp4",
      "bytes": 716208,
      "sha256": "1a600b93e1b94e04928f2162bcc717110d6c95606beb6ee4237b868fcad37544"
    },
    "reviewSha256": "b6f7e352a2b0bc354b9828e7ee896670e29595c13505543ffdafc1c885f63797",
    "observationsSha256": "cc1dbf808d693133f3920aedb8ea0d451d6ef17307ccb2b042b7b5d685ee821f",
    "geometryLicense": {
      "spdx": "CC-BY-SA-3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/",
      "attribution": "KanjiVG © Ulrich Apel and contributors",
      "sourceUrl": "https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/09130.svg",
      "revision": "422b5538595676da918c288a4230cb5e22a1ee7e",
      "modifications": "Uniform coordinate scaling by 100/109. Source order and curves preserved; no reversal, new points, splitting or merging. Rendered at reviewed runtime stroke width 5."
    }
  }
] as const

export function loadTextbookKanjiVGStrokes(bundle: typeof reviewed): readonly HanjaTextbookStrokeData[] {
  if (bundle.length !== TEXTBOOK_KANJIVG_PINS.length) throw new Error('Textbook KanjiVG count mismatch')
  return bundle.map((entry, index) => {
    const pin = TEXTBOOK_KANJIVG_PINS[index]
    const { paths, ...metadata } = entry
    if (!pin || JSON.stringify(metadata) !== JSON.stringify(pin)
      || paths.length !== pin.sourceStrokeIndices.length
      || !paths.every(path => /^M[\s\d.-]/.test(path))) {
      throw new Error('Textbook KanjiVG entry mismatch')
    }
    return { ...entry, verificationSource: 'vivasam-high-2022' as const }
  })
}
export const HANJA_TEXTBOOK_KANJIVG_STROKES = loadTextbookKanjiVGStrokes(reviewed)
