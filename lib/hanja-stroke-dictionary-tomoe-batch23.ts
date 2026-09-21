/** Complete domestic visual crosscheck of Tomoe handwriting; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-tomoe-batch23.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const TOMOE_BATCH23_PIN = {
  "glyph": "饐",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "6f30a4f42f24dc611f1a3e4d7a220c5009bb0323f237f01f50e3be3dfefb11f8",
  "geometryCorrection": "tomoe-uniform-normalize-reviewed-order-v1",
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
  "strokeWidth": 2.6,
  "pathsSha256": "eb65c91e652759be7453640ad992bc78793577f5c9c1b0487e7ab68185472a15",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9950.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/9950.svg",
    "dictionarySvgSha256": "6a749ea2d9907180c4e89f9cab68d3da33c966adce47b4fdbc77a2bac73892c4",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21",
    "orderReviewSha256": "1c6671e4e834a72d1cea1a7b267267a1028862b6066b6f8a7bc38f92ac71ccb1",
    "geometryReviewSha256": "1c6671e4e834a72d1cea1a7b267267a1028862b6066b6f8a7bc38f92ac71ccb1",
    "directionReviewSha256": "1c6671e4e834a72d1cea1a7b267267a1028862b6066b6f8a7bc38f92ac71ccb1"
  },
  "geometryLicense": {
    "spdx": "LGPL-2.1",
    "attribution": "Tomoe project contributors",
    "url": "/hanja-strokes/tomoe/COPYING.original",
    "sourceUrl": "https://raw.githubusercontent.com/l4u/tomoe/9d054a1f490368e0d45e0aff6430ce3598ab92c5/data/handwriting-ja.xml",
    "revision": "9d054a1f490368e0d45e0aff6430ce3598ab92c5",
    "editableSource": "/hanja-strokes/tomoe/9950.xml",
    "modifications": "Uniform normalizeMedians; source order 1,2,3,5,6,7,4,8,9,10-21; width 2.6. No new, removed, reversed, split or merged points."
  }
} as const

export function loadTomoeBatch23Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('Tomoe batch23 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(TOMOE_BATCH23_PIN)
      || !Array.isArray(paths) || paths.length !== 21
      || !paths.every(path => /^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path))) {
      throw new Error('Tomoe batch23 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_TOMOE_BATCH23_STROKES = loadTomoeBatch23Strokes(reviewed)
