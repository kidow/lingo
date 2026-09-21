/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch27.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "芙",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "fc4bf204c22695e4340e7b5dba3edc464796885c43132eaa1243f5f20dfbf693",
  "geometryCorrection": "glyphwiki-declared-affine-reviewed-order-v1",
  "sourceStrokeIndices": [
    1,
    2,
    4,
    3,
    5,
    6,
    7,
    8
  ],
  "strokeWidth": 4,
  "pathsSha256": "f082f3bbc08debef6e54fba048f6ac071b3bcf38ec749cf92f646c77f6c60ee1",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8299.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8299.svg",
    "dictionarySvgSha256": "ff6bd7da0c041df9071d56395bb6f88c62df8a9f7d02d2527dec1a6094ab8dc7",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
    "orderReviewSha256": "e38afc72c00dcc83db7e6c943792a5a7b727e9395e43d46a0d8f9a12dda31532",
    "geometryReviewSha256": "e38afc72c00dcc83db7e6c943792a5a7b727e9395e43d46a0d8f9a12dda31532",
    "directionReviewSha256": "e38afc72c00dcc83db7e6c943792a5a7b727e9395e43d46a0d8f9a12dda31532"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u8299-k@11",
    "revision": "u8299-k@11; ufa5e-03@8; u592b-j@2",
    "editableSource": "/hanja-strokes/glyphwiki/8299.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; swap3/4; width4. No new points, splitting, joining or reversal."
  }
} as const
const PATHS = [
  "M 6.4675 19.4025 L 47.2625 19.4025",
  "M 31.84 6.4675 L 31.84 31.84",
  "M 52.2375 19.4025 L 93.0325 19.4025",
  "M 67.66 6.4675 L 67.66 31.84",
  "M 14 43.26 L 86 43.26",
  "M 9 61.5 L 91 61.5",
  "M 50 29.2 L 50 55.8 Q 50 82.4 7.5 93.8",
  "M 53 61.5 Q 60.5 81.26 87.5 90.76"
] as const

export function loadGlyphWikiBatch27Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch27 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch27 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH27_STROKES = loadGlyphWikiBatch27Strokes(reviewed)
