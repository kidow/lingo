/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch66.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "劤",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "a1a5cd22e2fea291a95db6f35d724477f27bdb2dc543864da39ca847ce96988e",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      7
    ],
    "pathsSha256": "d83325a3adea82a39113ce8f7d5e2e46a9d3ebcf1fe69b447d053a224ca35da4",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52A4.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5200/52A4.svg",
      "dictionarySvgSha256": "f084f49556cf373292e1d968d22309d2a05ac3d4a1f208b7d1f89aba1e0c5c79",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6",
      "orderReviewSha256": "49ec96b1574a5148ee1b97dbf744ce8ab84ffd34fd091b44812c43c5a6d1e80c",
      "geometryReviewSha256": "49ec96b1574a5148ee1b97dbf744ce8ab84ffd34fd091b44812c43c5a6d1e80c",
      "directionReviewSha256": "49ec96b1574a5148ee1b97dbf744ce8ab84ffd34fd091b44812c43c5a6d1e80c"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u52a4-k@4",
      "revision": "u52a4-k@4; u52a4-j@3; u65a4-01@2; u529b-02@4",
      "editableSource": "/hanja-strokes/glyphwiki/52a4.json",
      "modifications": "Original whole-glyph polygons scaled200 to100. Preserve exact line/quadratic continuity in strokes2 and6, the shared-point 力 corner and its consecutive quadratic curves with separate left terminal polygon. Normalize polygon traversal with all vertices and first vertices preserved. No new centerline, bridge, point correction or component replacement."
    },
    "paths": [
      "M47.1 15 L44.4 15.7 L41.65 16.4 L38.8 17.05 L35.9 17.65 L32.9 18.2 L29.9 18.7 L26.75 19.15 L23.6 19.55 L20.3 19.8 L16.95 19.9 L16.8 19.05 L19.95 17.95 L23.05 16.9 L26.05 15.95 L29 15 L31.9 14.1 L34.7 13.15 L37.45 12.2 L40.1 11.25 L42.65 10.3 L45.2 9.3 Z M44.7 9.45 L50 14 L47.1 15 Z M50 14 L50.15 15.55 L46.75 14.05 Z",
      "M19.9 18 L19.9 49 L13.9 49 L13.9 15 Z M13.9 49 L19.9 49 L18.7 50.8 L16.9 52 L15.1 50.8 Z M19.9 49 L19.65 54.9 L19.15 60.55 L18.5 65.8 L17.6 70.8 L16.5 75.45 L15.2 79.75 L13.65 83.7 L11.9 87.3 L9.85 90.5 L7.5 93.25 L6.8 92.7 L8.15 89.55 L9.45 86.2 L10.55 82.55 L11.55 78.7 L12.4 74.5 L13.05 70.05 L13.5 65.25 L13.8 60.15 L13.95 54.7 L13.9 49 Z",
      "M16.9 38 L52.75 38 L52.75 40 L16.9 40 Z M52.75 38 L40.75 39 L46.75 33 Z",
      "M38.35 38 L38.35 91.5 L32.35 94.5 L32.35 38 Z",
      "M51.6 31.5 L87.5 31.5 L87.5 33.5 L51.6 33.5 Z M90.5 32.5 L90.4 40.95 L90.25 48.75 L90 55.9 L89.6 62.3 L89.15 68.05 L88.55 73.15 L87.85 77.55 L87 81.35 L86 84.5 L84.75 87.15 L79.6 84.15 L80.4 82.4 L81.2 79.8 L81.95 76.45 L82.6 72.35 L83.15 67.45 L83.65 61.9 L84 55.6 L84.25 48.6 L84.4 40.9 L84.5 32.5 Z M84.5 31.5 L87.5 29 L93 33.5 L90.5 35 L84.5 37.5 Z M84.75 87.15 L84.1 88.2 L83.35 89.15 L82.5 90.05 L81.55 90.85 L80.55 91.5 L79.45 92.05 L78.35 92.45 L77.15 92.75 L75.9 92.9 L74.7 93 L74.7 87 L75.4 86.95 L76 86.85 L76.55 86.7 L77.1 86.55 L77.55 86.3 L78 86 L78.4 85.65 L78.8 85.25 L79.2 84.75 L79.6 84.15 Z M74.7 90 L66.7 88.5 L66.7 87 L74.7 87 Z",
      "M71.75 10 L71.75 32 L65.75 32 L65.75 9 Z M71.75 10 L73.25 11 L70.75 12.5 Z M65.75 32 L71.75 32 L70.55 33.8 L68.75 35 L66.95 33.8 Z M71.75 32 L71.35 41.3 L70.45 49.95 L69 58 L67.1 65.35 L64.6 72 L61.65 78 L58.1 83.25 L54.1 87.75 L49.55 91.5 L44.55 94.35 L44.1 93.6 L48.35 90 L52.15 85.95 L55.45 81.35 L58.3 76.2 L60.65 70.45 L62.6 64.05 L64.1 57 L65.1 49.35 L65.65 41 L65.75 32 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M47.1 15 L44.4 15.7 L41.65 16.4 L38.8 17.05 L35.9 17.65 L32.9 18.2 L29.9 18.7 L26.75 19.15 L23.6 19.55 L20.3 19.8 L16.95 19.9 L16.8 19.05 L19.95 17.95 L23.05 16.9 L26.05 15.95 L29 15 L31.9 14.1 L34.7 13.15 L37.45 12.2 L40.1 11.25 L42.65 10.3 L45.2 9.3 Z M44.7 9.45 L50 14 L47.1 15 Z M50 14 L50.15 15.55 L46.75 14.05 Z",
          "bounds": [
            16.8,
            9.3,
            50.15,
            19.9
          ],
          "direction": "curve",
          "weight": 30.656576,
          "revealPath": "M46.6375 12 Q33.3125 16.5 16.9125 19.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M19.9 18 L19.9 49 L13.9 49 L13.9 15 Z M13.9 49 L19.9 49 L18.7 50.8 L16.9 52 L15.1 50.8 Z",
          "bounds": [
            13.9,
            15,
            19.9,
            52
          ],
          "direction": "down",
          "weight": 30
        },
        {
          "outline": "M19.9 49 L19.65 54.9 L19.15 60.55 L18.5 65.8 L17.6 70.8 L16.5 75.45 L15.2 79.75 L13.65 83.7 L11.9 87.3 L9.85 90.5 L7.5 93.25 L6.8 92.7 L8.15 89.55 L9.45 86.2 L10.55 82.55 L11.55 78.7 L12.4 74.5 L13.05 70.05 L13.5 65.25 L13.8 60.15 L13.95 54.7 L13.9 49 Z",
          "bounds": [
            6.8,
            49,
            19.9,
            93.25
          ],
          "direction": "curve",
          "weight": 45.064608,
          "revealPath": "M16.9125 49 Q16.9125 79 7.175 93",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M16.9 38 L52.75 38 L52.75 40 L16.9 40 Z M52.75 38 L40.75 39 L46.75 33 Z",
          "bounds": [
            16.9,
            33,
            52.75,
            40
          ],
          "direction": "right",
          "weight": 35.875
        }
      ],
      [
        {
          "outline": "M38.35 38 L38.35 91.5 L32.35 94.5 L32.35 38 Z",
          "bounds": [
            32.35,
            38,
            38.35,
            94.5
          ],
          "direction": "down",
          "weight": 54
        }
      ],
      [
        {
          "outline": "M51.6 31.5 L87.5 31.5 L87.5 33.5 L51.6 33.5 Z",
          "bounds": [
            51.6,
            31.5,
            87.5,
            33.5
          ],
          "direction": "right",
          "weight": 35.88
        },
        {
          "outline": "M90.5 32.5 L90.4 40.95 L90.25 48.75 L90 55.9 L89.6 62.3 L89.15 68.05 L88.55 73.15 L87.85 77.55 L87 81.35 L86 84.5 L84.75 87.15 L79.6 84.15 L80.4 82.4 L81.2 79.8 L81.95 76.45 L82.6 72.35 L83.15 67.45 L83.65 61.9 L84 55.6 L84.25 48.6 L84.4 40.9 L84.5 32.5 Z M84.5 31.5 L87.5 29 L93 33.5 L90.5 35 L84.5 37.5 Z",
          "bounds": [
            79.6,
            29,
            93,
            87.15
          ],
          "direction": "curve",
          "weight": 53.434033,
          "revealPath": "M87.5 32.5 Q87.5 76.5 82.20138798937315 85.67067463377725",
          "revealWidth": 14
        },
        {
          "outline": "M84.75 87.15 L84.1 88.2 L83.35 89.15 L82.5 90.05 L81.55 90.85 L80.55 91.5 L79.45 92.05 L78.35 92.45 L77.15 92.75 L75.9 92.9 L74.7 93 L74.7 87 L75.4 86.95 L76 86.85 L76.55 86.7 L77.1 86.55 L77.55 86.3 L78 86 L78.4 85.65 L78.8 85.25 L79.2 84.75 L79.6 84.15 Z",
          "bounds": [
            74.7,
            84.15,
            84.75,
            93
          ],
          "direction": "curve",
          "weight": 8.661055,
          "revealPath": "M82.20138798937315 85.67067463377725 Q79.7 90 74.7 90",
          "revealWidth": 14
        },
        {
          "outline": "M74.7 90 L66.7 88.5 L66.7 87 L74.7 87 Z",
          "bounds": [
            66.7,
            87,
            74.7,
            90
          ],
          "direction": "left",
          "weight": 8
        }
      ],
      [
        {
          "outline": "M71.75 10 L71.75 32 L65.75 32 L65.75 9 Z M71.75 10 L73.25 11 L70.75 12.5 Z M65.75 32 L71.75 32 L70.55 33.8 L68.75 35 L66.95 33.8 Z",
          "bounds": [
            65.75,
            9,
            73.25,
            35
          ],
          "direction": "down",
          "weight": 22.5
        },
        {
          "outline": "M71.75 32 L71.35 41.3 L70.45 49.95 L69 58 L67.1 65.35 L64.6 72 L61.65 78 L58.1 83.25 L54.1 87.75 L49.55 91.5 L44.55 94.35 L44.1 93.6 L48.35 90 L52.15 85.95 L55.45 81.35 L58.3 76.2 L60.65 70.45 L62.6 64.05 L64.1 57 L65.1 49.35 L65.65 41 L65.75 32 Z",
          "bounds": [
            44.1,
            32,
            71.75,
            94.35
          ],
          "direction": "curve",
          "weight": 66.643181,
          "revealPath": "M68.78 32 Q68.78 79.5 44.34 94",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch66Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch66 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH66_STROKES = loadGlyphWikiBatch66Strokes(reviewed)
