/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch33.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "菖",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "20d4a29fb62e504220afcdc80a26d529ecae0c5d6c805e98bc4ec61c73726ccf",
  "geometryCorrection": "glyphwiki-source-declared-box-corners-reviewed-order-v1",
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
  "strokeWidth": 4,
  "pathsSha256": "7d8b2c9e54c5725e542f0d6fe05f2927b1903789ac5e2e9129a638302fcce339",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83d6.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83d6.svg",
    "dictionarySvgSha256": "0f78404394f347781bad6c8bd4fe7565abc33f0e40ee140ed12d60429a785439",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
    "orderReviewSha256": "8cccfbb791078cafbf8c3a0db6ad05c82d005f01b49c056d27f2dc6604f91018",
    "geometryReviewSha256": "8cccfbb791078cafbf8c3a0db6ad05c82d005f01b49c056d27f2dc6604f91018",
    "directionReviewSha256": "8cccfbb791078cafbf8c3a0db6ad05c82d005f01b49c056d27f2dc6604f91018"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u83d6-k@6",
    "revision": "u83d6-k@6; u83d6-ue0102@11; ufa5e-03@8; u660c-j@2; u65e5-03@6; u65e5-04@4",
    "editableSource": "/hanja-strokes/glyphwiki/83d6.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; exact source-adjacent corner groups6+7 and11+12; reviewed group order; width4. No invented coordinates, trimming, reversal or glyph substitution."
  }
} as const
const PATHS = [
  "M 6.5 16.8075 L 47.5 16.8075",
  "M 32 6.6025 L 32 26.62",
  "M 52.5 16.8075 L 93.5 16.8075",
  "M 68 6.6025 L 68 26.62",
  "M 25.75 31.044 L 25.75 53.108",
  "M 25.75 31.044 L 73.25 31.044 L 73.25 53.108",
  "M 25.75 42.076 L 73.25 42.076",
  "M 25.75 53.108 L 73.25 53.108",
  "M 18.03 64.496 L 18.03 87.344",
  "M 18.03 64.496 L 80.47 64.496 L 80.47 87.344",
  "M 18.03 75.92 L 80.47 75.92",
  "M 18.03 87.344 L 80.47 87.344"
] as const

export function loadGlyphWikiBatch33Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch33 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch33 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH33_STROKES = loadGlyphWikiBatch33Strokes(reviewed)
