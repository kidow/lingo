/** GlyphWiki geometry crosschecked with the domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch29.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const PIN = {
  "glyph": "芒",
  "verificationSource": "ehanja-crosschecked",
  "verifiedAt": "2026-09-22",
  "geometrySource": "3e1d238659423d2050c735b625041c457705294cdfa44bbdc11592ff010620ae",
  "geometryCorrection": "glyphwiki-declared-affine-default-bend-reviewed-order-v1",
  "sourceStrokeIndices": [
    1,
    2,
    4,
    3,
    5,
    6,
    7
  ],
  "strokeWidth": 4,
  "pathsSha256": "c9f2dc6029e4a7203a5fad67d3a49814ba0273e416c577103446d313a65274fa",
  "sourceReference": {
    "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8292.svg",
    "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8292.svg",
    "dictionarySvgSha256": "ff2615e629c42728ba9ff1649f0ac924732d749f643739f3829be880ed713e7e",
    "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
    "orderReviewSha256": "767376fbb8814635c8c32b5948220c5a7477ec5e3d4f79e2f194a0eaa664e84b",
    "geometryReviewSha256": "767376fbb8814635c8c32b5948220c5a7477ec5e3d4f79e2f194a0eaa664e84b",
    "directionReviewSha256": "767376fbb8814635c8c32b5948220c5a7477ec5e3d4f79e2f194a0eaa664e84b"
  },
  "geometryLicense": {
    "spdx": "LicenseRef-GlyphWiki",
    "attribution": "GlyphWiki contributors",
    "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
    "sourceUrl": "https://glyphwiki.org/wiki/u8292-k@14",
    "revision": "u8292-k@14; ufa5e-03@8; u4ea1-j@4",
    "editableSource": "/hanja-strokes/glyphwiki/8292.json",
    "modifications": "Source-declared affine placement; 200-to-100 scaling; swap3/4; width4; connected vertical and engine-default rounded type3 turn. No manual points, splitting, joining or reversal."
  }
} as const
const PATHS = [
  "M 6.5 19.7325 L 47.5 19.7325",
  "M 32 7.5775 L 32 31.42",
  "M 52.5 19.7325 L 93.5 19.7325",
  "M 68 7.5775 L 68 31.42",
  "M 50 32 L 50 44.95",
  "M 9.15 44.95 L 90.85 44.95",
  "M 23.4 44.95 L 23.4 79.85 Q 23.4 84.85 28.4 84.85 L 83.25 84.85"
] as const

export function loadGlyphWikiBatch29Strokes(bundle: typeof reviewed): readonly HanjaDictionaryStrokeData[] {
  if (!Array.isArray(bundle) || bundle.length !== 1) throw new Error('GlyphWiki batch29 count mismatch')
  return bundle.map(entry => {
    const { paths, ...metadata } = entry
    if (JSON.stringify(metadata) !== JSON.stringify(PIN) || JSON.stringify(paths) !== JSON.stringify(PATHS)) {
      throw new Error('GlyphWiki batch29 reviewed data mismatch')
    }
    return { ...entry, verificationSource: 'ehanja-crosschecked' as const }
  })
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH29_STROKES = loadGlyphWikiBatch29Strokes(reviewed)
