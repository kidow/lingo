/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch70.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "杕",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "93145ed0703da3a3c5e117ee979bd6626485326d1683778ed17f64fc83808774",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "pathsSha256": "13d3794b0ae770db20a13b3cc35cc272708e2cb0aa82cf5ec8837baeddb8fb0b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6755.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/6755.svg",
      "dictionarySvgSha256": "11e8de663821f2bc9c5bc35749c25ff9ee05a66d653f9367e71552df2b7db0ed",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "7b38d20b1fc746e2a1723b239f19acec796e69f1ce40f16d0ce75354bb627db8",
      "geometryReviewSha256": "7b38d20b1fc746e2a1723b239f19acec796e69f1ce40f16d0ce75354bb627db8",
      "directionReviewSha256": "7b38d20b1fc746e2a1723b239f19acec796e69f1ce40f16d0ce75354bb627db8"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u6755-k@2",
      "revision": "u6755-k@2; u6755-j@2; u6728-01@14; u5927-02@1",
      "editableSource": "/hanja-strokes/glyphwiki/6755.json",
      "modifications": "Original whole-glyph polygons scaled200 to100 in unchanged seven-stroke order. Preserve all original 木 and 大 quadratic paths, including the exact vertical-to-curve connection of stroke6. Normalize polygon traversal with every vertex and first vertex preserved. No new centerline, bridge, point correction or component replacement."
    },
    "paths": [
      "M6.15 29.5 L42.75 29.5 L42.75 31.5 L6.15 31.5 Z M42.75 29.5 L32.75 30.5 L37.75 25 Z",
      "M28.15 8 L28.15 91 L22.15 94 L22.15 7 Z M28.15 8 L29.65 9 L27.15 10.5 Z",
      "M26.75 30.5 L26.65 31.05 L25.45 35.95 L24.1 40.75 L22.55 45.45 L20.8 50 L18.9 54.4 L16.85 58.7 L14.6 62.8 L12.15 66.8 L9.45 70.6 L6.5 74.25 L5.8 73.7 L7.85 69.6 L9.8 65.5 L11.65 61.35 L13.4 57.1 L15 52.8 L16.45 48.4 L17.75 43.95 L18.9 39.35 L19.9 34.7 L20.65 30.5 Z",
      "M26.75 42.75 L28.55 43.35 L30.35 43.85 L32.05 44.5 L33.7 45.25 L35.25 46.05 L36.75 47 L38.15 48 L39.5 49.1 L40.75 50.25 L41.95 51.55 L37.05 54.95 L36.4 53.75 L35.65 52.6 L34.8 51.4 L33.9 50.25 L32.9 49.1 L31.8 48 L30.6 46.85 L29.3 45.75 L27.9 44.6 L26.35 43.6 Z M41.95 51.55 L42.4 53.75 L41.2 55.7 L38.95 56.15 L37.05 54.95 Z",
      "M39.1 35 L92.45 35 L92.45 37 L39.1 37 Z M92.45 35 L82.45 36 L87.45 30.5 Z",
      "M68.8 7.5 L68.8 24 L62.8 24 L62.8 6.5 Z M68.8 7.5 L70.3 8.5 L67.8 10 Z M62.8 24 L68.8 24 L67.6 25.8 L65.8 27 L64 25.8 Z M68.8 24 L68.3 34.4 L67.1 44.1 L65.2 53.05 L62.65 61.3 L59.35 68.75 L55.35 75.45 L50.65 81.35 L45.25 86.4 L39.2 90.6 L32.5 93.9 L32.1 93.05 L38.15 89 L43.45 84.4 L48.15 79.2 L52.15 73.4 L55.5 66.95 L58.25 59.75 L60.35 51.9 L61.8 43.35 L62.6 34 L62.8 24 Z",
      "M68 36.45 L69.5 43.6 L71.15 50.3 L73 56.5 L75.1 62.25 L77.45 67.55 L80.05 72.35 L82.85 76.65 L85.95 80.55 L89.25 83.95 L92.85 86.9 L88.7 92.05 L84.85 88.35 L81.35 84.25 L78.25 79.7 L75.55 74.75 L73.15 69.4 L71.15 63.65 L69.55 57.45 L68.3 50.9 L67.45 43.9 L67.1 36.5 Z M88.7 92.05 L92.85 86.9 L94.15 87.95 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.15 29.5 L42.75 29.5 L42.75 31.5 L6.15 31.5 Z M42.75 29.5 L32.75 30.5 L37.75 25 Z",
          "bounds": [
            6.15,
            25,
            42.75,
            31.5
          ],
          "direction": "right",
          "weight": 36.575
        }
      ],
      [
        {
          "outline": "M28.15 8 L28.15 91 L22.15 94 L22.15 7 Z M28.15 8 L29.65 9 L27.15 10.5 Z",
          "bounds": [
            22.15,
            7,
            29.65,
            94
          ],
          "direction": "down",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M26.75 30.5 L26.65 31.05 L25.45 35.95 L24.1 40.75 L22.55 45.45 L20.8 50 L18.9 54.4 L16.85 58.7 L14.6 62.8 L12.15 66.8 L9.45 70.6 L6.5 74.25 L5.8 73.7 L7.85 69.6 L9.8 65.5 L11.65 61.35 L13.4 57.1 L15 52.8 L16.45 48.4 L17.75 43.95 L18.9 39.35 L19.9 34.7 L20.65 30.5 Z",
          "bounds": [
            5.8,
            30.5,
            26.75,
            74.25
          ],
          "direction": "curve",
          "weight": 46.916209,
          "revealPath": "M23.75 30.5 Q19 55 6.175 74",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.75 42.75 L28.55 43.35 L30.35 43.85 L32.05 44.5 L33.7 45.25 L35.25 46.05 L36.75 47 L38.15 48 L39.5 49.1 L40.75 50.25 L41.95 51.55 L37.05 54.95 L36.4 53.75 L35.65 52.6 L34.8 51.4 L33.9 50.25 L32.9 49.1 L31.8 48 L30.6 46.85 L29.3 45.75 L27.9 44.6 L26.35 43.6 Z M41.95 51.55 L42.4 53.75 L41.2 55.7 L38.95 56.15 L37.05 54.95 Z",
          "bounds": [
            26.35,
            42.75,
            42.4,
            56.15
          ],
          "direction": "curve",
          "weight": 18.31154,
          "revealPath": "M26.125 43 Q35.15 47 40.375 54.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M39.1 35 L92.45 35 L92.45 37 L39.1 37 Z M92.45 35 L82.45 36 L87.45 30.5 Z",
          "bounds": [
            39.1,
            30.5,
            92.45,
            37
          ],
          "direction": "right",
          "weight": 53.345
        }
      ],
      [
        {
          "outline": "M68.8 7.5 L68.8 24 L62.8 24 L62.8 6.5 Z M68.8 7.5 L70.3 8.5 L67.8 10 Z M62.8 24 L68.8 24 L67.6 25.8 L65.8 27 L64 25.8 Z",
          "bounds": [
            62.8,
            6.5,
            70.3,
            27
          ],
          "direction": "down",
          "weight": 17
        },
        {
          "outline": "M68.8 24 L68.3 34.4 L67.1 44.1 L65.2 53.05 L62.65 61.3 L59.35 68.75 L55.35 75.45 L50.65 81.35 L45.25 86.4 L39.2 90.6 L32.5 93.9 L32.1 93.05 L38.15 89 L43.45 84.4 L48.15 79.2 L52.15 73.4 L55.5 66.95 L58.25 59.75 L60.35 51.9 L61.8 43.35 L62.6 34 L62.8 24 Z",
          "bounds": [
            32.1,
            24,
            68.8,
            93.9
          ],
          "direction": "curve",
          "weight": 77.14485,
          "revealPath": "M65.815 24 Q65.815 77 32.3325 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68 36.45 L69.5 43.6 L71.15 50.3 L73 56.5 L75.1 62.25 L77.45 67.55 L80.05 72.35 L82.85 76.65 L85.95 80.55 L89.25 83.95 L92.85 86.9 L88.7 92.05 L84.85 88.35 L81.35 84.25 L78.25 79.7 L75.55 74.75 L73.15 69.4 L71.15 63.65 L69.55 57.45 L68.3 50.9 L67.45 43.9 L67.1 36.5 Z M88.7 92.05 L92.85 86.9 L94.15 87.95 Z",
          "bounds": [
            67.1,
            36.45,
            94.15,
            92.05
          ],
          "direction": "curve",
          "weight": 58.340608,
          "revealPath": "M67.5175 36 Q71.49 74 90.785 89.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch70Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch70 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH70_STROKES = loadGlyphWikiBatch70Strokes(reviewed)
