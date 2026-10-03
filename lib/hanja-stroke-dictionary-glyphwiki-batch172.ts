/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch172.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "柶",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "41090478ece2975b53b61a6cb5ba24d90007ee8b2de29679ad25d3c79603b822",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "pathsSha256": "e61f99c934f472f6c0c43ea93e0c22103662a3e0bbc657508d9d5895b0258eac",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67F6.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6700/67F6.svg",
      "dictionarySvgSha256": "64e86be23a8596dbe55dcf268eb6f0df903ae90bd5e93785fe5ca12ade76c478",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "d7fb3c2e042643df648ab0b717b5254663f2b4554abc8f8ebab7f80245b23b43",
      "geometryReviewSha256": "d7fb3c2e042643df648ab0b717b5254663f2b4554abc8f8ebab7f80245b23b43",
      "directionReviewSha256": "d7fb3c2e042643df648ab0b717b5254663f2b4554abc8f8ebab7f80245b23b43"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u67f6-k@6",
      "revision": "u67f6-k@6; u67f6@13; u6728-01@14; u56db-02@6; u56db-j@2; observed2026-10-03; source SHA256 5ed37eac857ef31a8ab971fd04b9d9d81e09538441b3467d0570fb319e48ab48",
      "editableSource": "/hanja-strokes/glyphwiki/67f6.json",
      "modifications": "Whole 柶 u67f6-k@6 alias u67f6@13 with only declared u6728-01@14, u56db-02@6 and u56db-j@2. Default mincho new Kage(); scale200to100 and winding normalization. Preserve original vertices and continuous pen geometry. Domestic groups0;1;2;3;4;5+6;7;8;9. Original order and directions. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.35 29.5 L38.1 29.5 L38.1 31.5 L6.35 31.5 Z M38.1 29.5 L26.1 30.5 L32.1 24.5 Z",
      "M25.85 8 L25.85 91 L19.85 94 L19.85 7 Z M25.85 8 L27.35 9 L24.85 10.5 Z",
      "M24.6 30.5 L24.55 30.95 L23.5 35.9 L22.3 40.65 L20.9 45.35 L19.4 49.9 L17.7 54.3 L15.9 58.6 L13.9 62.75 L11.7 66.75 L9.35 70.55 L6.75 74.2 L5.95 73.75 L7.65 69.65 L9.3 65.55 L10.9 61.4 L12.35 57.2 L13.7 52.9 L14.95 48.5 L16.05 44 L17.05 39.45 L17.9 34.75 L18.55 30.5 Z",
      "M24.3 42.8 L25.9 43.4 L27.5 43.95 L29 44.6 L30.45 45.35 L31.85 46.15 L33.2 47.1 L34.45 48.1 L35.65 49.2 L36.8 50.4 L37.85 51.65 L32.7 54.75 L32.15 53.55 L31.55 52.4 L30.9 51.25 L30.15 50.1 L29.35 49 L28.4 47.9 L27.45 46.8 L26.35 45.7 L25.2 44.55 L23.9 43.6 Z M37.85 51.65 L38.15 53.9 L36.8 55.75 L34.55 56.1 L32.7 54.75 Z",
      "M46.2 14 L46.2 90.6 L40.2 93.6 L40.2 11 Z",
      "M43.2 14 L88.25 14 L88.25 16 L43.2 16 Z M91.25 15 L91.25 87.6 L85.25 90.6 L85.25 15 Z M85.25 14 L88.25 11.5 L93.75 16 L91.25 18 L85.25 15 Z",
      "M61.15 14 L61.15 27.9 L55.65 27.9 L55.65 14 Z M55.65 27.9 L61.15 27.9 L60.05 29.55 L58.4 30.65 L56.75 29.55 Z M61.15 27.9 L60.9 33.5 L60.35 38.8 L59.5 43.75 L58.4 48.4 L57 52.7 L55.35 56.65 L53.35 60.3 L51.1 63.5 L48.55 66.35 L45.7 68.7 L45.1 68.1 L47.2 65.2 L49.05 62.15 L50.7 58.85 L52.15 55.3 L53.3 51.5 L54.25 47.4 L55 43 L55.45 38.3 L55.7 33.25 L55.65 27.9 Z",
      "M72.9 14 L72.9 53.85 L67.4 53.85 L67.4 14 Z M67.4 53.85 L72.9 53.85 L71.8 55.5 L70.15 56.6 L68.5 55.5 Z M72.9 53.85 L73 54.5 L73.1 54.95 L73.2 55.3 L73.35 55.45 L73.45 55.55 L73.6 55.65 L73.75 55.7 L74.1 55.8 L74.55 55.85 L75.15 55.85 L75.15 61.85 L73.9 61.75 L72.65 61.5 L71.45 61.1 L70.35 60.45 L69.4 59.65 L68.6 58.65 L68 57.5 L67.65 56.35 L67.45 55.1 L67.4 53.85 Z M75.15 55.85 L77.25 56.75 L78.15 58.85 L77.25 60.95 L75.15 61.85 Z M75.15 55.85 L82.55 55.85 L82.55 61.85 L75.15 61.85 Z M82.55 55.85 L84.35 57.05 L85.55 58.85 L84.35 60.65 L82.55 61.85 Z M82.55 55.85 L79.55 55.85 L82.55 43.35 L83.55 43.35 Z",
      "M43.2 82.6 L88.25 82.6 L88.25 84.6 L43.2 84.6 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.35 29.5 L38.1 29.5 L38.1 31.5 L6.35 31.5 Z M38.1 29.5 L26.1 30.5 L32.1 24.5 Z",
          "bounds": [
            6.35,
            24.5,
            38.1,
            31.5
          ],
          "direction": "right",
          "weight": 31.7625
        }
      ],
      [
        {
          "outline": "M25.85 8 L25.85 91 L19.85 94 L19.85 7 Z M25.85 8 L27.35 9 L24.85 10.5 Z",
          "bounds": [
            19.85,
            7,
            27.35,
            94
          ],
          "direction": "down",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M24.6 30.5 L24.55 30.95 L23.5 35.9 L22.3 40.65 L20.9 45.35 L19.4 49.9 L17.7 54.3 L15.9 58.6 L13.9 62.75 L11.7 66.75 L9.35 70.55 L6.75 74.2 L5.95 73.75 L7.65 69.65 L9.3 65.55 L10.9 61.4 L12.35 57.2 L13.7 52.9 L14.95 48.5 L16.05 44 L17.05 39.45 L17.9 34.75 L18.55 30.5 Z",
          "bounds": [
            5.95,
            30.5,
            24.6,
            74.2
          ],
          "direction": "curve",
          "weight": 46.099825,
          "revealPath": "M21.625 30.5 Q17.5 55 6.3625 74",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M24.3 42.8 L25.9 43.4 L27.5 43.95 L29 44.6 L30.45 45.35 L31.85 46.15 L33.2 47.1 L34.45 48.1 L35.65 49.2 L36.8 50.4 L37.85 51.65 L32.7 54.75 L32.15 53.55 L31.55 52.4 L30.9 51.25 L30.15 50.1 L29.35 49 L28.4 47.9 L27.45 46.8 L26.35 45.7 L25.2 44.55 L23.9 43.6 Z M37.85 51.65 L38.15 53.9 L36.8 55.75 L34.55 56.1 L32.7 54.75 Z",
          "bounds": [
            23.9,
            42.8,
            38.15,
            56.1
          ],
          "direction": "curve",
          "weight": 16.893508,
          "revealPath": "M23.6875 43 Q31.525 47 36.0625 54.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.2 14 L46.2 90.6 L40.2 93.6 L40.2 11 Z",
          "bounds": [
            40.2,
            11,
            46.2,
            93.6
          ],
          "direction": "down",
          "weight": 68.625
        }
      ],
      [
        {
          "outline": "M43.2 14 L88.25 14 L88.25 16 L43.2 16 Z",
          "bounds": [
            43.2,
            14,
            88.25,
            16
          ],
          "direction": "right",
          "weight": 45.085
        },
        {
          "outline": "M91.25 15 L91.25 87.6 L85.25 90.6 L85.25 15 Z M85.25 14 L88.25 11.5 L93.75 16 L91.25 18 L85.25 15 Z",
          "bounds": [
            85.25,
            11.5,
            93.75,
            90.6
          ],
          "direction": "down",
          "weight": 68.625
        }
      ],
      [
        {
          "outline": "M61.15 14 L61.15 27.9 L55.65 27.9 L55.65 14 Z M55.65 27.9 L61.15 27.9 L60.05 29.55 L58.4 30.65 L56.75 29.55 Z",
          "bounds": [
            55.65,
            14,
            61.15,
            30.65
          ],
          "direction": "down",
          "weight": 12.9375
        },
        {
          "outline": "M61.15 27.9 L60.9 33.5 L60.35 38.8 L59.5 43.75 L58.4 48.4 L57 52.7 L55.35 56.65 L53.35 60.3 L51.1 63.5 L48.55 66.35 L45.7 68.7 L45.1 68.1 L47.2 65.2 L49.05 62.15 L50.7 58.85 L52.15 55.3 L53.3 51.5 L54.25 47.4 L55 43 L55.45 38.3 L55.7 33.25 L55.65 27.9 Z",
          "bounds": [
            45.1,
            27.9,
            61.15,
            68.7
          ],
          "direction": "curve",
          "weight": 42.540631,
          "revealPath": "M58.44750000000001 27.9375 Q58.44750000000001 56.0625 45.43 68.4375",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M72.9 14 L72.9 53.85 L67.4 53.85 L67.4 14 Z M67.4 53.85 L72.9 53.85 L71.8 55.5 L70.15 56.6 L68.5 55.5 Z",
          "bounds": [
            67.4,
            14,
            72.9,
            56.6
          ],
          "direction": "down",
          "weight": 38.875
        },
        {
          "outline": "M72.9 53.85 L73 54.5 L73.1 54.95 L73.2 55.3 L73.35 55.45 L73.45 55.55 L73.6 55.65 L73.75 55.7 L74.1 55.8 L74.55 55.85 L75.15 55.85 L75.15 61.85 L73.9 61.75 L72.65 61.5 L71.45 61.1 L70.35 60.45 L69.4 59.65 L68.6 58.65 L68 57.5 L67.65 56.35 L67.45 55.1 L67.4 53.85 Z M75.15 55.85 L77.25 56.75 L78.15 58.85 L77.25 60.95 L75.15 61.85 Z",
          "bounds": [
            67.4,
            53.85,
            78.15,
            61.85
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M70.195 53.875 Q70.195 58.875 75.195 58.875",
          "revealWidth": 14
        },
        {
          "outline": "M75.15 55.85 L82.55 55.85 L82.55 61.85 L75.15 61.85 Z M82.55 55.85 L84.35 57.05 L85.55 58.85 L84.35 60.65 L82.55 61.85 Z M82.55 55.85 L79.55 55.85 L82.55 43.35 L83.55 43.35 Z",
          "bounds": [
            75.15,
            43.35,
            85.55,
            61.85
          ],
          "direction": "right",
          "weight": 7.3825
        }
      ],
      [
        {
          "outline": "M43.2 82.6 L88.25 82.6 L88.25 84.6 L43.2 84.6 Z",
          "bounds": [
            43.2,
            82.6,
            88.25,
            84.6
          ],
          "direction": "right",
          "weight": 45.085
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch172Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch172 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH172_STROKES = loadGlyphWikiBatch172Strokes(reviewed)

