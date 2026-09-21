/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch39.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "蔓",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "bfa61b6cd50745f8b3c8a8aa18fbc6e0c1647fd9de55ad4beff44708421ac66b",
  "geometryCorrection": "glyphwiki-equal-pivot-box-curve-reviewed-v1",
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
    12,
    13,
    14,
    15
  ],
  "strokeWidth": 3,
  "pathsSha256": "6333948fa700369e67a3e1b962951369000d81c1849f3723c53175d48578fe39",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8513.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/8513.svg",
    "dictionarySvgSha256": "102cdf0fa21175d819154d842f1aa645a21ebcd9de5aee0807f2532c2966ad7e",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
    "orderReviewSha256": "1b1ec07e341b79c67d415da6bc4edb4f269e53eb16b5871979247c7bd986cce4",
    "geometryReviewSha256": "1b1ec07e341b79c67d415da6bc4edb4f269e53eb16b5871979247c7bd986cce4",
    "directionReviewSha256": "1b1ec07e341b79c67d415da6bc4edb4f269e53eb16b5871979247c7bd986cce4"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u8513-k@14",
    "revision": "u8513-k@14; ufa5e-03@8; u66fc@18; u66fc-j@4; u2ff1-u65e5-u7f52@9; u65e5-03@6; u7f52-07@6; u53c8-07@3",
    "editableSource": "/hanja-strokes/glyphwiki/8513.json",
    "modifications": "Declared affine placement and exact equal-pivot floor arithmetic; 200-to-100 scaling; source-adjacent corner groups6+7,11+12,16+17; grass order3/4 exchange; width3. No invented coordinates, trimming, reversal or glyph substitution."
  }
} as const
const PATHS = [
  "M 6.5 15.1625 L 47.5 15.1625",
  "M 31.5 6.3875 L 31.5 23.6",
  "M 52.5 15.1625 L 93.5 15.1625",
  "M 68 6.3875 L 68 23.6",
  "M 26 27.39775 L 26 43.258",
  "M 26 27.39775 L 74 27.39775 L 74 43.258",
  "M 26 35.327875 L 74 35.327875",
  "M 26 43.258 L 74 43.258",
  "M 15.8475 50.4925 L 15.8475 62.313156",
  "M 15.8475 50.4925 L 83.6525 50.4925 L 83.6525 62.313156",
  "M 38.29 50.4925 L 38.29 62.313156",
  "M 61.21 50.4925 L 61.21 62.313156",
  "M 15.8475 62.313156 L 83.6525 62.313156",
  "M 17 69.918325 L 72.5 69.918325 Q 57 87.183738 9.5 91.391275",
  "M 29.5 69.773238 Q 46 87.03865 86 90.52075"
] as const

export function loadGlyphWikiBatch39Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch39 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch39 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH39_STROKES = loadGlyphWikiBatch39Strokes(reviewed)
