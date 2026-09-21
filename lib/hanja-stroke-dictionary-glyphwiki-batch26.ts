/** Reviewed GlyphWiki centerlines; domestic dictionary comparison, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch26.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

export const GLYPHWIKI_BATCH26_PIN = {
  "glyph": "芥",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "147de57b3713c23a721c007db8fbcf88449b671e46465862aa3e6f557a7bffa1",
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
  "pathsSha256": "507dd659b5b76a3afe7e3bc7e99ec25b0499d874ee799c423559c4df59433565",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A5.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A5.svg",
    "dictionarySvgSha256": "8489a453d62c7f589d4fb27a16625562589ec25fbd3d52d782ad00e42bd86c7b",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
    "orderReviewSha256": "c26d9d239d305db1f99ece025961ae81f75b6db791d84846f1f4cae491b38dff",
    "geometryReviewSha256": "c26d9d239d305db1f99ece025961ae81f75b6db791d84846f1f4cae491b38dff",
    "directionReviewSha256": "c26d9d239d305db1f99ece025961ae81f75b6db791d84846f1f4cae491b38dff"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u82a5-k@11",
    "revision": "u82a5-k@11; koseki-343300@11; ufa5e-03@8; u4ecb-j@3; u201a2-03@2",
    "editableSource": "/hanja-strokes/glyphwiki/82a5.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; swap3/4; width4. No new points, splitting, joining or reversal."
  }
} as const

export function loadGlyphWikiBatch26Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch26 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(GLYPHWIKI_BATCH26_PIN)
      || !Array.isArray(paths) || paths.length !== 8
      || !paths.every(path => /^M [\d.]+ [\d.]+(?: [LQ] (?:[\d.]+ )*[\d.]+)+$/.test(path))) {
      throw new Error('GlyphWiki batch26 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH26_STROKES = loadGlyphWikiBatch26Strokes(reviewed)
