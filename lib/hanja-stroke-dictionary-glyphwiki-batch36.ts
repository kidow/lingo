/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch36.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "萃",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "40a4dbb2a790cf2bbfdcab1fdd4f7c4d07c8b0181ffb6e911a9c3605ab844b95",
  "geometryCorrection": "glyphwiki-whole-quadratics-reviewed-v1",
  "sourceStrokeIndices": [
    1,
    2,
    4,
    3,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ],
  "strokeWidth": 2,
  "pathsSha256": "a01c7b08ed4ed6e0b92dd843a6ff0083e7bf9a8d4cb595aaaf940d80c3f7d9e3",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8403.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8403.svg",
    "dictionarySvgSha256": "743d6de09f0081d15567bc86b4c058c3e1e2cf6740e3ae698981c0556cdaf873",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
    "orderReviewSha256": "e5cc4b5ccc8ee031ab5965e7cdf256b5403e0c78884df2721d9bf003c0594656",
    "geometryReviewSha256": "e5cc4b5ccc8ee031ab5965e7cdf256b5403e0c78884df2721d9bf003c0594656",
    "directionReviewSha256": "e5cc4b5ccc8ee031ab5965e7cdf256b5403e0c78884df2721d9bf003c0594656"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u8403-k@8",
    "revision": "u8403-k@8; u8403-ue0103@11; ufa5e-03@8; u5352-j@2; u20143-03@1; u4ea0-03@7; u5341-04@2",
    "editableSource": "/hanja-strokes/glyphwiki/8403.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; grass order3/4 exchange; uniform width2. All12 raw primitives remain separate. No invented coordinates, grouping, trimming, reversal or glyph substitution."
  }
} as const
const PATHS = [
  "M 6.4675 15.71 L 47.2625 15.71",
  "M 31.84 5.57 L 31.84 25.46",
  "M 52.2375 15.71 L 93.0325 15.71",
  "M 67.66 5.57 L 67.66 25.46",
  "M 50.25 25.4503 L 50.25 36.4874",
  "M 10.922625 36.4874 L 89.577375 36.4874",
  "M 33.335 39.125 Q 27.8625 56.0025 11.445 67.385",
  "M 28.8575 47.76 Q 40.3 51.685 47.7625 58.3575",
  "M 69.6525 39.5175 Q 62.6875 54.825 46.27 65.4225",
  "M 64.18 50.115 Q 77.115 55.2175 83.5825 62.2825",
  "M 8.298313 73.665 L 92.699188 73.665",
  "M 50.49875 65.815 L 50.49875 92.819"
] as const

export function loadGlyphWikiBatch36Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch36 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch36 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH36_STROKES = loadGlyphWikiBatch36Strokes(reviewed)
