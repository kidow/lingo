/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch160.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "杋",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-30",
    "geometrySource": "181f1ad1b7a59f7f7bda0f6e4215c51ebb223f6b6394ec93182b47b7d44a3110",
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
    "pathsSha256": "c92bbe79b58bef2b119bc285a95cbd1793be6ef5522351b7ae79ea20c8e99ea4",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/674B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/674B.svg",
      "dictionarySvgSha256": "cc5c94112d9007a7cca2c2c2f7c386659ad74f62cd6e6e30119cc2174552d66a",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "b38c5f864508072039b041ca9fa464d3713c8f34f8397951da7772aba88868f8",
      "geometryReviewSha256": "b38c5f864508072039b041ca9fa464d3713c8f34f8397951da7772aba88868f8",
      "directionReviewSha256": "b38c5f864508072039b041ca9fa464d3713c8f34f8397951da7772aba88868f8"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u674b-g@3",
      "revision": "u674b-k@2 alias; u674b-g@3; u6728-01@14; u51e1-g02@2; u4e36-j@2; observed2026-09-30; source SHA256 a58b4ec23c95409aadc39e3ecfa425f08a574a2d395ce7ec8c101a1ffe47e7ea",
      "editableSource": "/hanja-strokes/glyphwiki/674b.json",
      "modifications": "Whole 杋 u674b-g@3 via u674b-k@2 with only declared u6728-01@14, u51e1-g02@2, u4e36-j@2. Default mincho new Kage(); scale200to100. Preserve original polygon vertices and continuous trajectories; normalize winding only. Domestic groups0;1;2;3;4;5,6;7. No direction reversal, invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 29.5 L45 29.5 L45 31.5 L6.5 31.5 Z M45 29.5 L33 30.5 L39 24.5 Z",
      "M29.5 8 L29.5 91 L23.5 94 L23.5 7 Z M29.5 8 L31 9 L28.5 10.5 Z",
      "M28 30.5 L27.9 31.05 L26.65 36 L25.2 40.8 L23.6 45.45 L21.8 50 L19.8 54.45 L17.65 58.7 L15.25 62.85 L12.7 66.85 L9.9 70.65 L6.85 74.25 L6.1 73.7 L8.3 69.6 L10.4 65.5 L12.35 61.3 L14.2 57.1 L15.9 52.75 L17.45 48.4 L18.85 43.9 L20.05 39.3 L21.15 34.65 L21.9 30.5 Z",
      "M28.1 42.75 L30 43.3 L31.9 43.85 L33.7 44.45 L35.4 45.2 L37 46.05 L38.6 46.95 L40.05 47.95 L41.45 49.05 L42.75 50.25 L44 51.5 L39.15 55.05 L38.45 53.85 L37.65 52.65 L36.8 51.45 L35.8 50.3 L34.7 49.15 L33.55 48 L32.25 46.9 L30.85 45.75 L29.4 44.6 L27.75 43.6 Z M44 51.5 L44.5 53.7 L43.35 55.7 L41.15 56.2 L39.15 55.05 Z",
      "M53.75 13.5 L53.75 47.5 L47.75 47.5 L47.75 10.5 Z M47.75 47.5 L53.75 47.5 L52.55 49.3 L50.75 50.5 L48.95 49.3 Z M53.75 47.5 L53.4 53.6 L52.65 59.45 L51.5 64.95 L50 70.15 L48.05 75 L45.75 79.55 L43.05 83.7 L39.95 87.5 L36.4 90.9 L32.5 93.8 L31.9 93.15 L35.05 89.55 L37.85 85.85 L40.3 81.95 L42.4 77.8 L44.15 73.45 L45.55 68.8 L46.6 63.9 L47.35 58.7 L47.7 53.25 L47.75 47.5 Z",
      "M50.75 13.5 L77.55 13.5 L77.55 15.5 L50.75 15.5 Z M80.55 14.5 L80.55 82.5 L74.55 82.5 L74.55 14.5 Z M74.55 13.5 L77.55 11 L83.05 15.5 L80.55 17.5 L74.55 14.5 Z M74.55 82.5 L80.55 82.5 L79.35 84.3 L77.55 85.5 L75.75 84.3 Z M80.55 82.5 L80.6 83.1 L80.65 83.55 L80.75 83.85 L80.85 84 L80.9 84.1 L81 84.2 L81.2 84.25 L81.5 84.35 L81.95 84.45 L82.55 84.5 L82.55 90.5 L81.25 90.4 L80 90.2 L78.8 89.8 L77.7 89.15 L76.7 88.35 L75.85 87.35 L75.25 86.2 L74.85 85 L74.6 83.75 L74.55 82.5 Z M82.55 84.5 L84.65 85.4 L85.55 87.5 L84.65 89.6 L82.55 90.5 Z M82.55 84.5 L91.2 84.5 L91.2 90.5 L82.55 90.5 Z M91.2 84.5 L93 85.7 L94.2 87.5 L93 89.3 L91.2 90.5 Z M91.2 84.5 L88.2 84.5 L91.2 72 L92.2 72 Z",
      "M52.65 32.05 L55.25 33.15 L57.7 34.45 L59.95 35.95 L62 37.55 L63.9 39.35 L65.6 41.25 L67.15 43.25 L68.55 45.45 L69.7 47.7 L70.7 50.1 L64.95 51.8 L64.4 49.75 L63.7 47.75 L62.85 45.8 L61.85 43.9 L60.65 42 L59.3 40.15 L57.8 38.35 L56.1 36.5 L54.2 34.65 L52.2 32.8 Z M70.7 50.1 L70.4 52.35 L68.65 53.8 L66.4 53.55 L64.95 51.8 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 29.5 L45 29.5 L45 31.5 L6.5 31.5 Z M45 29.5 L33 30.5 L39 24.5 Z",
          "bounds": [
            6.5,
            24.5,
            45,
            31.5
          ],
          "direction": "right",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M29.5 8 L29.5 91 L23.5 94 L23.5 7 Z M29.5 8 L31 9 L28.5 10.5 Z",
          "bounds": [
            23.5,
            7,
            31,
            94
          ],
          "direction": "down",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M28 30.5 L27.9 31.05 L26.65 36 L25.2 40.8 L23.6 45.45 L21.8 50 L19.8 54.45 L17.65 58.7 L15.25 62.85 L12.7 66.85 L9.9 70.65 L6.85 74.25 L6.1 73.7 L8.3 69.6 L10.4 65.5 L12.35 61.3 L14.2 57.1 L15.9 52.75 L17.45 48.4 L18.85 43.9 L20.05 39.3 L21.15 34.65 L21.9 30.5 Z",
          "bounds": [
            6.1,
            30.5,
            28,
            74.25
          ],
          "direction": "curve",
          "weight": 47.270498,
          "revealPath": "M25 30.5 Q20 55 6.5 74",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.1 42.75 L30 43.3 L31.9 43.85 L33.7 44.45 L35.4 45.2 L37 46.05 L38.6 46.95 L40.05 47.95 L41.45 49.05 L42.75 50.25 L44 51.5 L39.15 55.05 L38.45 53.85 L37.65 52.65 L36.8 51.45 L35.8 50.3 L34.7 49.15 L33.55 48 L32.25 46.9 L30.85 45.75 L29.4 44.6 L27.75 43.6 Z M44 51.5 L44.5 53.7 L43.35 55.7 L41.15 56.2 L39.15 55.05 Z",
          "bounds": [
            27.75,
            42.75,
            44.5,
            56.2
          ],
          "direction": "curve",
          "weight": 18.901058,
          "revealPath": "M27.5 43 Q37 47 42.5 54.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.75 13.5 L53.75 47.5 L47.75 47.5 L47.75 10.5 Z M47.75 47.5 L53.75 47.5 L52.55 49.3 L50.75 50.5 L48.95 49.3 Z",
          "bounds": [
            47.75,
            10.5,
            53.75,
            50.5
          ],
          "direction": "down",
          "weight": 33
        },
        {
          "outline": "M53.75 47.5 L53.4 53.6 L52.65 59.45 L51.5 64.95 L50 70.15 L48.05 75 L45.75 79.55 L43.05 83.7 L39.95 87.5 L36.4 90.9 L32.5 93.8 L31.9 93.15 L35.05 89.55 L37.85 85.85 L40.3 81.95 L42.4 77.8 L44.15 73.45 L45.55 68.8 L46.6 63.9 L47.35 58.7 L47.7 53.25 L47.75 47.5 Z",
          "bounds": [
            31.9,
            47.5,
            53.75,
            93.8
          ],
          "direction": "curve",
          "weight": 49.590076,
          "revealPath": "M50.7625 47.5 Q50.7625 78 32.2375 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.75 13.5 L77.55 13.5 L77.55 15.5 L50.75 15.5 Z",
          "bounds": [
            50.75,
            13.5,
            77.55,
            15.5
          ],
          "direction": "right",
          "weight": 26.8125
        },
        {
          "outline": "M80.55 14.5 L80.55 82.5 L74.55 82.5 L74.55 14.5 Z M74.55 13.5 L77.55 11 L83.05 15.5 L80.55 17.5 L74.55 14.5 Z M74.55 82.5 L80.55 82.5 L79.35 84.3 L77.55 85.5 L75.75 84.3 Z",
          "bounds": [
            74.55,
            11,
            83.05,
            85.5
          ],
          "direction": "down",
          "weight": 68
        },
        {
          "outline": "M80.55 82.5 L80.6 83.1 L80.65 83.55 L80.75 83.85 L80.85 84 L80.9 84.1 L81 84.2 L81.2 84.25 L81.5 84.35 L81.95 84.45 L82.55 84.5 L82.55 90.5 L81.25 90.4 L80 90.2 L78.8 89.8 L77.7 89.15 L76.7 88.35 L75.85 87.35 L75.25 86.2 L74.85 85 L74.6 83.75 L74.55 82.5 Z M82.55 84.5 L84.65 85.4 L85.55 87.5 L84.65 89.6 L82.55 90.5 Z",
          "bounds": [
            74.55,
            82.5,
            85.55,
            90.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M77.575 82.5 Q77.575 87.5 82.575 87.5",
          "revealWidth": 14
        },
        {
          "outline": "M82.55 84.5 L91.2 84.5 L91.2 90.5 L82.55 90.5 Z M91.2 84.5 L93 85.7 L94.2 87.5 L93 89.3 L91.2 90.5 Z M91.2 84.5 L88.2 84.5 L91.2 72 L92.2 72 Z",
          "bounds": [
            82.55,
            72,
            94.2,
            90.5
          ],
          "direction": "right",
          "weight": 8.65
        }
      ],
      [
        {
          "outline": "M52.65 32.05 L55.25 33.15 L57.7 34.45 L59.95 35.95 L62 37.55 L63.9 39.35 L65.6 41.25 L67.15 43.25 L68.55 45.45 L69.7 47.7 L70.7 50.1 L64.95 51.8 L64.4 49.75 L63.7 47.75 L62.85 45.8 L61.85 43.9 L60.65 42 L59.3 40.15 L57.8 38.35 L56.1 36.5 L54.2 34.65 L52.2 32.8 Z M70.7 50.1 L70.4 52.35 L68.65 53.8 L66.4 53.55 L64.95 51.8 Z",
          "bounds": [
            52.2,
            32.05,
            70.7,
            53.8
          ],
          "direction": "curve",
          "weight": 25.930187,
          "revealPath": "M52.0178125 32.19 Q64.485625 39.71 68.26375 52.4",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch160Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch160 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH160_STROKES = loadGlyphWikiBatch160Strokes(reviewed)
