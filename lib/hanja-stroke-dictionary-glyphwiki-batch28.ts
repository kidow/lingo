/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch28.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "茸",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "b5003702c68bf6be08c30f4a662b653862367f6e4753c0df75f201412841c43f",
  "geometryCorrection": "glyphwiki-declared-affine-connection-lines-reviewed-order-v1",
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
    10
  ],
  "strokeWidth": 4,
  "pathsSha256": "cc9d18ecbf806ab62aaa37ee063682cd76e0e6bbfe8c9357af0a7d1454039466",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8338.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8338.svg",
    "dictionarySvgSha256": "e12d21174007c3aec31d1339573b11e57e42eaafdc7bf1b1c5f3d3fd619390f2",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
    "orderReviewSha256": "cca9d75da6603c8f1b757614ca6e515bf6504e0c701629a481a782aa0d2e939a",
    "geometryReviewSha256": "cca9d75da6603c8f1b757614ca6e515bf6504e0c701629a481a782aa0d2e939a",
    "directionReviewSha256": "cca9d75da6603c8f1b757614ca6e515bf6504e0c701629a481a782aa0d2e939a"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u8338-k@7",
    "revision": "u8338-k@7; ufa5e-03@8; u8033-j@2",
    "editableSource": "/hanja-strokes/glyphwiki/8338.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; swap3/4; width4; documented connection caps 2/32 as straight centerlines. No new points, splitting, joining or reversal."
  }
} as const
const PATHS = [
  "M 6.5 18.355 L 47.5 18.355",
  "M 32 6.785 L 32 29.48",
  "M 52.5 18.355 L 93.5 18.355",
  "M 68 6.785 L 68 29.48",
  "M 10 34.3875 L 90 34.3875",
  "M 28.5 34.3875 L 28.5 78.7575",
  "M 28.5 48.54 L 69.5 48.54",
  "M 28.5 62.31 L 69.5 62.31",
  "M 10.5 80.67 Q 38 78.375 92.5 73.02",
  "M 69.5 34.3875 L 69.5 92.145"
] as const

export function loadGlyphWikiBatch28Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch28 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch28 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH28_STROKES = loadGlyphWikiBatch28Strokes(reviewed)
