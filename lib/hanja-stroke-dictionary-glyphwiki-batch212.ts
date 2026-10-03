/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch212.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "梡",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "668a07d4c534b256831079cec9dd6ceb409e6bc591da898134423122cd914bfa",
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
      10,
      11,
      12
    ],
    "pathsSha256": "3e98fa9fc16e3d20ab1a5a9e2a1454073e7baa25d0e3708089312d544070cfaa",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68a1.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6800/68a1.svg",
      "dictionarySvgSha256": "4841e3dcc6bd9993f8c67cc67ca8107db3629494e60f92f9b383ac925afa474e",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "fece3a12403e7aeeef407c1fb820b64a39265d8d0012403d9f96d42bd8c95507",
      "geometryReviewSha256": "fece3a12403e7aeeef407c1fb820b64a39265d8d0012403d9f96d42bd8c95507",
      "directionReviewSha256": "fece3a12403e7aeeef407c1fb820b64a39265d8d0012403d9f96d42bd8c95507"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u68a1-k/u68a1/u6728-01/u5b8c-02/u5b80-08-var-001/u5196-08-var-001; individual glyph revisions unavailable; source SHA256 1d4aae98d9d03a0589bdf73d4c666d636f5b8fe88567a3c90455924e4b2937ce",
      "editableSource": "/hanja-strokes/glyphwiki/68a1.json",
      "modifications": "All11 domestic directional/cumulative states, complete form and99 progressive frames reviewed in Codex in-app browser. Exact whole u68a1-k -> u68a1 and only declared u6728-01/u5b8c-02/u5b80-08-var-001/u5196-08-var-001. Six historical archive records; individual glyph revisions unavailable. No radical transplant. Domestic7 original line-to-curve join176.5805,44.31 is continuous. Domestic11 original line/curve/line joins144.425,167 and154.425,177 are continuous; its original end5 terminal-hook outline is preserved. No new centerline introduced for source cap decorations. All12 original source groups,14 draw primitives,six quadratic paths, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Continuous original structural primitives follow the observed domestic pen trajectory without added geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M6.4 29.5 L41.45 29.5 L41.45 31.5 L6.4 31.5 Z M41.45 29.5 L29.45 30.5 L35.45 24.5 Z",
      "M27.6 8 L27.6 91.5 L21.6 94.5 L21.6 7 Z M27.6 8 L29.1 9 L26.6 10.5 Z",
      "M26.25 30.5 L26.15 31 L25 35.95 L23.7 40.75 L22.2 45.4 L20.55 49.95 L18.7 54.35 L16.7 58.65 L14.55 62.8 L12.2 66.8 L9.6 70.6 L6.75 74.2 L6 73.75 L7.95 69.65 L9.8 65.5 L11.6 61.35 L13.25 57.15 L14.75 52.85 L16.15 48.45 L17.4 43.95 L18.5 39.4 L19.45 34.7 L20.2 30.5 Z",
      "M26.15 42.8 L27.85 43.35 L29.6 43.9 L31.25 44.5 L32.85 45.25 L34.35 46.1 L35.8 47 L37.15 48.05 L38.45 49.15 L39.65 50.3 L40.8 51.55 L35.8 54.9 L35.2 53.7 L34.5 52.5 L33.75 51.35 L32.9 50.2 L31.95 49.1 L30.9 47.95 L29.75 46.85 L28.55 45.7 L27.25 44.55 L25.75 43.6 Z M40.8 51.55 L41.25 53.8 L40 55.7 L37.75 56.15 L35.8 54.9 Z",
      "M70.55 8.3 L70.55 22.75 L64.55 22.75 L64.55 7.3 Z M70.55 8.3 L72.05 9.3 L69.55 10.8 Z",
      "M51.15 16.6 L51.25 18.9 L51.35 21.2 L51.25 23.4 L51.05 25.5 L50.7 27.55 L50.2 29.5 L49.65 31.4 L48.9 33.2 L48.1 34.95 L47.1 36.55 L42.4 32.85 L43.4 31.8 L44.35 30.6 L45.25 29.3 L46.1 27.85 L46.9 26.3 L47.65 24.6 L48.4 22.8 L49.05 20.85 L49.75 18.75 L50.25 16.5 Z M47.1 36.55 L45.1 37.65 L42.9 37.1 L41.8 35.1 L42.4 32.85 Z",
      "M49.85 21.15 L88.25 21.15 L88.25 23.15 L49.85 23.15 Z M91 23.4 L90.25 24.5 L89.45 25.6 L88.65 26.7 L87.8 27.85 L86.9 29 L85.95 30.15 L84.95 31.35 L83.9 32.5 L82.75 33.65 L81.75 34.9 L81 34.45 L81.65 33 L82.15 31.45 L82.65 30 L83.15 28.55 L83.6 27.2 L84.05 25.85 L84.45 24.55 L84.85 23.3 L85.2 22.05 L85.55 20.9 Z M85.25 21.15 L88.25 18.65 L93.75 23.15 L91.25 24.65 L85.25 27.15 Z",
      "M50.75 36.5 L86.35 36.5 L86.35 38.5 L50.75 38.5 Z M86.35 36.5 L74.35 37.5 L80.35 31.5 Z",
      "M43.45 51.5 L92.2 51.5 L92.2 53.5 L43.45 53.5 Z M92.2 51.5 L80.2 52.5 L86.2 46.5 Z",
      "M61.55 52.5 L61.55 52.5 L61.05 58.55 L60 64.25 L58.5 69.5 L56.45 74.4 L53.9 78.8 L50.85 82.8 L47.3 86.35 L43.3 89.4 L38.8 91.9 L33.85 93.9 L33.5 93.05 L37.85 90.25 L41.65 87.25 L45 84 L47.85 80.45 L50.25 76.65 L52.2 72.5 L53.7 68 L54.75 63.2 L55.35 58 L55.5 52.5 Z",
      "M75.2 51.5 L75.2 83.5 L69.2 83.5 L69.2 51.5 Z M69.2 83.5 L75.2 83.5 L74 85.3 L72.2 86.5 L70.4 85.3 Z M75.2 83.5 L75.2 84.1 L75.3 84.55 L75.4 84.85 L75.5 85 L75.55 85.1 L75.65 85.2 L75.8 85.25 L76.1 85.35 L76.55 85.45 L77.2 85.5 L77.2 91.5 L75.9 91.4 L74.65 91.2 L73.45 90.8 L72.3 90.15 L71.3 89.35 L70.5 88.35 L69.9 87.2 L69.5 86 L69.25 84.75 L69.2 83.5 Z M77.2 85.5 L79.3 86.4 L80.2 88.5 L79.3 90.6 L77.2 91.5 Z M77.2 85.5 L91.2 85.5 L91.2 91.5 L77.2 91.5 Z M91.2 85.5 L93 86.7 L94.2 88.5 L93 90.3 L91.2 91.5 Z M91.2 85.5 L88.2 85.5 L91.2 73 L92.2 73 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.4 29.5 L41.45 29.5 L41.45 31.5 L6.4 31.5 Z M41.45 29.5 L29.45 30.5 L35.45 24.5 Z",
          "bounds": [
            6.4,
            24.5,
            41.45,
            31.5
          ],
          "direction": "right",
          "weight": 35.035
        }
      ],
      [
        {
          "outline": "M27.6 8 L27.6 91.5 L21.6 94.5 L21.6 7 Z M27.6 8 L29.1 9 L26.6 10.5 Z",
          "bounds": [
            21.6,
            7,
            29.1,
            94.5
          ],
          "direction": "down",
          "weight": 85.5
        }
      ],
      [
        {
          "outline": "M26.25 30.5 L26.15 31 L25 35.95 L23.7 40.75 L22.2 45.4 L20.55 49.95 L18.7 54.35 L16.7 58.65 L14.55 62.8 L12.2 66.8 L9.6 70.6 L6.75 74.2 L6 73.75 L7.95 69.65 L9.8 65.5 L11.6 61.35 L13.25 57.15 L14.75 52.85 L16.15 48.45 L17.4 43.95 L18.5 39.4 L19.45 34.7 L20.2 30.5 Z",
          "bounds": [
            6,
            30.5,
            26.25,
            74.2
          ],
          "direction": "curve",
          "weight": 46.644048,
          "revealPath": "M23.25 30.5 Q18.7 55 6.415 74",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.15 42.8 L27.85 43.35 L29.6 43.9 L31.25 44.5 L32.85 45.25 L34.35 46.1 L35.8 47 L37.15 48.05 L38.45 49.15 L39.65 50.3 L40.8 51.55 L35.8 54.9 L35.2 53.7 L34.5 52.5 L33.75 51.35 L32.9 50.2 L31.95 49.1 L30.9 47.95 L29.75 46.85 L28.55 45.7 L27.25 44.55 L25.75 43.6 Z M40.8 51.55 L41.25 53.8 L40 55.7 L37.75 56.15 L35.8 54.9 Z",
          "bounds": [
            25.75,
            42.8,
            41.25,
            56.15
          ],
          "direction": "curve",
          "weight": 17.848599,
          "revealPath": "M25.525 43 Q34.17 47 39.175 54.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M70.55 8.3 L70.55 22.75 L64.55 22.75 L64.55 7.3 Z M70.55 8.3 L72.05 9.3 L69.55 10.8 Z",
          "bounds": [
            64.55,
            7.3,
            72.05,
            22.75
          ],
          "direction": "down",
          "weight": 13.95
        }
      ],
      [
        {
          "outline": "M51.15 16.6 L51.25 18.9 L51.35 21.2 L51.25 23.4 L51.05 25.5 L50.7 27.55 L50.2 29.5 L49.65 31.4 L48.9 33.2 L48.1 34.95 L47.1 36.55 L42.4 32.85 L43.4 31.8 L44.35 30.6 L45.25 29.3 L46.1 27.85 L46.9 26.3 L47.65 24.6 L48.4 22.8 L49.05 20.85 L49.75 18.75 L50.25 16.5 Z M47.1 36.55 L45.1 37.65 L42.9 37.1 L41.8 35.1 L42.4 32.85 Z",
          "bounds": [
            41.8,
            16.5,
            51.35,
            37.65
          ],
          "direction": "curve",
          "weight": 21.011317,
          "revealPath": "M50.755187500000005 16.08 Q49.892312499999996 28.23 43.8521875 35.925",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.85 21.15 L88.25 21.15 L88.25 23.15 L49.85 23.15 Z",
          "bounds": [
            49.85,
            21.15,
            88.25,
            23.15
          ],
          "direction": "right",
          "weight": 38.397938
        },
        {
          "outline": "M91 23.4 L90.25 24.5 L89.45 25.6 L88.65 26.7 L87.8 27.85 L86.9 29 L85.95 30.15 L84.95 31.35 L83.9 32.5 L82.75 33.65 L81.75 34.9 L81 34.45 L81.65 33 L82.15 31.45 L82.65 30 L83.15 28.55 L83.6 27.2 L84.05 25.85 L84.45 24.55 L84.85 23.3 L85.2 22.05 L85.55 20.9 Z M85.25 21.15 L88.25 18.65 L93.75 23.15 L91.25 24.65 L85.25 27.15 Z",
          "bounds": [
            81,
            18.65,
            93.75,
            34.9
          ],
          "direction": "curve",
          "weight": 14.327576,
          "revealPath": "M88.29025 22.155 Q85.701625 27.825 81.38725 34.71",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.75 36.5 L86.35 36.5 L86.35 38.5 L50.75 38.5 Z M86.35 36.5 L74.35 37.5 L80.35 31.5 Z",
          "bounds": [
            50.75,
            31.5,
            86.35,
            38.5
          ],
          "direction": "right",
          "weight": 35.5875
        }
      ],
      [
        {
          "outline": "M43.45 51.5 L92.2 51.5 L92.2 53.5 L43.45 53.5 Z M92.2 51.5 L80.2 52.5 L86.2 46.5 Z",
          "bounds": [
            43.45,
            46.5,
            92.2,
            53.5
          ],
          "direction": "right",
          "weight": 48.75
        }
      ],
      [
        {
          "outline": "M61.55 52.5 L61.55 52.5 L61.05 58.55 L60 64.25 L58.5 69.5 L56.45 74.4 L53.9 78.8 L50.85 82.8 L47.3 86.35 L43.3 89.4 L38.8 91.9 L33.85 93.9 L33.5 93.05 L37.85 90.25 L41.65 87.25 L45 84 L47.85 80.45 L50.25 76.65 L52.2 72.5 L53.7 68 L54.75 63.2 L55.35 58 L55.5 52.5 Z",
          "bounds": [
            33.5,
            52.5,
            61.55,
            93.9
          ],
          "direction": "curve",
          "weight": 47.949389,
          "revealPath": "M58.5625 52.5 Q58.075 82.5 33.7 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.2 51.5 L75.2 83.5 L69.2 83.5 L69.2 51.5 Z M69.2 83.5 L75.2 83.5 L74 85.3 L72.2 86.5 L70.4 85.3 Z",
          "bounds": [
            69.2,
            51.5,
            75.2,
            86.5
          ],
          "direction": "down",
          "weight": 31
        },
        {
          "outline": "M75.2 83.5 L75.2 84.1 L75.3 84.55 L75.4 84.85 L75.5 85 L75.55 85.1 L75.65 85.2 L75.8 85.25 L76.1 85.35 L76.55 85.45 L77.2 85.5 L77.2 91.5 L75.9 91.4 L74.65 91.2 L73.45 90.8 L72.3 90.15 L71.3 89.35 L70.5 88.35 L69.9 87.2 L69.5 86 L69.25 84.75 L69.2 83.5 Z M77.2 85.5 L79.3 86.4 L80.2 88.5 L79.3 90.6 L77.2 91.5 Z",
          "bounds": [
            69.2,
            83.5,
            80.2,
            91.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M72.2125 83.5 Q72.2125 88.5 77.2125 88.5",
          "revealWidth": 14
        },
        {
          "outline": "M77.2 85.5 L91.2 85.5 L91.2 91.5 L77.2 91.5 Z M91.2 85.5 L93 86.7 L94.2 88.5 L93 90.3 L91.2 91.5 Z M91.2 85.5 L88.2 85.5 L91.2 73 L92.2 73 Z",
          "bounds": [
            77.2,
            73,
            94.2,
            91.5
          ],
          "direction": "right",
          "weight": 14.0125
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch212Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch212 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH212_STROKES = loadGlyphWikiBatch212Strokes(reviewed)
