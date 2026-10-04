/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch221.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "耈",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "26f6eea3d710ff7e52b43b1b4bbf0cbdce800f4efad501bd12af3aa303462c7b",
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
      12,
      13
    ],
    "pathsSha256": "69e41e6ae24192ec03e68b4af7f8e97b9b8b446008a5990da8754a599e894b3f",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8008.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8000/8008.svg",
      "dictionarySvgSha256": "4827cf32dc44c5615e7fbbc051c45aa6b43531b7684eafe103b86825c3af212b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "8d514498f67f508785e8af8f48b8aedf284f6209d1c094ff3059231ce76d96c2",
      "geometryReviewSha256": "8d514498f67f508785e8af8f48b8aedf284f6209d1c094ff3059231ce76d96c2",
      "directionReviewSha256": "8d514498f67f508785e8af8f48b8aedf284f6209d1c094ff3059231ce76d96c2"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u8008/u8001-03/u53e5/u52f9-05/u53e3; individual glyph revisions unavailable; source SHA256 c1ec740481d1c95774d9cb18a8ab207714c6242d923abcaf174b0d8881d9d7fb",
      "editableSource": "/hanja-strokes/glyphwiki/8008.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u8008 and only declared u8001-03/u53e5/u52f9-05/u53e3; five archive records, no individual glyph revisions. Domestic6 retains original line/Q/line with upward terminal ornament. Domestic8 joins raw7 horizontal to raw8 Q/Q at170.96,125.675; domestic10 joins raw10 horizontal to raw11 vertical at121.1936,140.1668. All13 original groups16 primitives,Q6/C0, all points, polygons, ornaments and original engine defaults retained. Normalize200to100 and winding only; no invented points, bridges, splitting, trimming, reversal, width correction or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M16 16 L65.5 16 L65.5 18 L16 18 Z M65.5 16 L53.5 17 L59.5 11 Z",
      "M48 7.7 L48 28.25 L42 28.25 L42 6.7 Z M48 7.7 L49.5 8.7 L47 10.2 Z",
      "M7.5 27.1 L92.5 27.1 L92.5 29.1 L7.5 29.1 Z M92.5 27.1 L80.5 28.1 L86.5 22.1 Z",
      "M78.25 11.9 L72.55 17.15 L66.5 22.15 L60.1 26.95 L53.4 31.5 L46.4 35.8 L39 39.85 L31.3 43.7 L23.25 47.25 L14.85 50.5 L6.15 53.45 L5.8 52.6 L14.15 48.75 L22.15 44.8 L29.8 40.75 L37.15 36.55 L44.15 32.2 L50.8 27.65 L57.1 22.9 L63.1 18 L68.7 12.95 L74 7.65 Z M73.65 8 L74.15 7.5 L78.25 11.9 Z M78.25 11.9 L78.6 13.65 L75.8 12.95 Z",
      "M77.55 39.1 L74.65 39.95 L71.55 40.75 L68.15 41.55 L64.5 42.35 L60.6 43.15 L56.45 43.9 L52 44.6 L47.3 45.3 L42.3 45.85 L37.05 46.35 L36.9 45.5 L41.95 44 L46.75 42.65 L51.3 41.4 L55.6 40.2 L59.6 39 L63.35 37.85 L66.8 36.75 L70 35.65 L72.85 34.55 L75.5 33.5 Z M75 33.65 L80.2 38.15 L77.55 39.1 Z M80.2 38.15 L80.3 39.7 L77 38.25 Z",
      "M40 34.85 L40 48.95 L34 48.95 L34 33.85 Z M40 34.85 L41.5 35.85 L39 37.35 Z M34 48.95 L40 48.95 L38.8 50.75 L37 51.95 L35.2 50.75 Z M40 48.95 L39.95 49.55 L39.95 50.05 L40 50.4 L40 50.65 L40.1 50.8 L40.2 51 L40.4 51.2 L40.75 51.4 L41.3 51.55 L42 51.7 L42 56.2 L40.75 56.2 L39.6 56.05 L38.45 55.75 L37.35 55.25 L36.35 54.55 L35.55 53.65 L34.85 52.55 L34.4 51.4 L34.1 50.2 L34 48.95 Z M42 51.7 L43.55 52.35 L44.25 53.95 L43.55 55.5 L42 56.2 Z M42 51.7 L86.5 51.7 L86.5 56.2 L42 56.2 Z M86.5 51.7 L87.85 52.6 L88.75 53.95 L87.85 55.3 L86.5 56.2 Z M86.5 51.7 L84.25 51.7 L86.5 45.2 L87.5 45.2 Z",
      "M34.4 58.45 L32.65 60.6 L30.7 62.7 L28.55 64.7 L26.15 66.65 L23.6 68.5 L20.8 70.35 L17.8 72.1 L14.6 73.75 L11.1 75.3 L7.4 76.7 L7 75.9 L10.2 73.65 L13.2 71.45 L16 69.35 L18.6 67.25 L20.95 65.2 L23.1 63.15 L25 61.1 L26.7 59.1 L28.15 57.1 L29.4 55.15 Z M29.1 55.55 L29.65 54.75 L34.4 58.45 Z M34.4 58.45 L35.1 60.15 L32.15 60 Z",
      "M25.95 61.8 L85.45 61.8 L85.45 63.8 L25.95 63.8 Z M88.45 62.75 L88.45 67.25 L88.3 71.35 L87.95 75.15 L87.45 78.55 L86.7 81.65 L85.8 84.4 L84.6 86.85 L83.15 88.95 L81.35 90.65 L79.25 91.95 L76.8 86.45 L77.7 85.9 L78.55 85.05 L79.4 83.8 L80.25 82.15 L80.95 80 L81.55 77.45 L82 74.4 L82.3 71 L82.45 67.15 L82.45 62.9 Z M82.45 61.8 L85.45 59.3 L90.95 63.8 L88.45 65.3 L82.45 67.8 Z M79.25 91.95 L78.2 92.35 L77.15 92.75 L76.1 93.1 L75.05 93.4 L73.95 93.65 L72.9 93.85 L71.8 94.05 L70.7 94.15 L69.55 94.2 L68.45 94.25 L68.45 88.25 L69.35 88.2 L70.2 88.15 L71.05 88.1 L71.9 87.95 L72.7 87.8 L73.55 87.6 L74.35 87.35 L75.2 87.1 L76 86.8 L76.8 86.45 Z M68.45 91.25 L58.45 89.75 L58.45 88.25 L68.45 88.25 Z",
      "M34.6 69.05 L34.6 84.2 L28.6 87.2 L28.6 66.05 Z",
      "M31.6 69.05 L60.55 69.05 L60.55 71.05 L31.6 71.05 Z M63.55 70.05 L63.55 83.7 L57.55 86.7 L57.55 70.05 Z M57.55 69.05 L60.55 66.55 L66.05 71.05 L63.55 73.05 L57.55 70.05 Z",
      "M31.6 80.7 L60.55 80.7 L60.55 82.7 L31.6 82.7 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M16 16 L65.5 16 L65.5 18 L16 18 Z M65.5 16 L53.5 17 L59.5 11 Z",
          "bounds": [
            16,
            11,
            65.5,
            18
          ],
          "direction": "right",
          "weight": 49.5
        }
      ],
      [
        {
          "outline": "M48 7.7 L48 28.25 L42 28.25 L42 6.7 Z M48 7.7 L49.5 8.7 L47 10.2 Z",
          "bounds": [
            42,
            6.7,
            49.5,
            28.25
          ],
          "direction": "down",
          "weight": 20.025
        }
      ],
      [
        {
          "outline": "M7.5 27.1 L92.5 27.1 L92.5 29.1 L7.5 29.1 Z M92.5 27.1 L80.5 28.1 L86.5 22.1 Z",
          "bounds": [
            7.5,
            22.1,
            92.5,
            29.1
          ],
          "direction": "right",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M78.25 11.9 L72.55 17.15 L66.5 22.15 L60.1 26.95 L53.4 31.5 L46.4 35.8 L39 39.85 L31.3 43.7 L23.25 47.25 L14.85 50.5 L6.15 53.45 L5.8 52.6 L14.15 48.75 L22.15 44.8 L29.8 40.75 L37.15 36.55 L44.15 32.2 L50.8 27.65 L57.1 22.9 L63.1 18 L68.7 12.95 L74 7.65 Z M73.65 8 L74.15 7.5 L78.25 11.9 Z M78.25 11.9 L78.6 13.65 L75.8 12.95 Z",
          "bounds": [
            5.8,
            7.5,
            78.6,
            53.45
          ],
          "direction": "curve",
          "weight": 82.898022,
          "revealPath": "M76.5 9.455 Q49.5 36.6 6 53.065",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M77.55 39.1 L74.65 39.95 L71.55 40.75 L68.15 41.55 L64.5 42.35 L60.6 43.15 L56.45 43.9 L52 44.6 L47.3 45.3 L42.3 45.85 L37.05 46.35 L36.9 45.5 L41.95 44 L46.75 42.65 L51.3 41.4 L55.6 40.2 L59.6 39 L63.35 37.85 L66.8 36.75 L70 35.65 L72.85 34.55 L75.5 33.5 Z M75 33.65 L80.2 38.15 L77.55 39.1 Z M80.2 38.15 L80.3 39.7 L77 38.25 Z",
          "bounds": [
            36.9,
            33.5,
            80.3,
            46.35
          ],
          "direction": "curve",
          "weight": 41.180628,
          "revealPath": "M77 36.155 Q63.5 41.05 37 45.945",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40 34.85 L40 48.95 L34 48.95 L34 33.85 Z M40 34.85 L41.5 35.85 L39 37.35 Z M34 48.95 L40 48.95 L38.8 50.75 L37 51.95 L35.2 50.75 Z",
          "bounds": [
            34,
            33.85,
            41.5,
            51.95
          ],
          "direction": "down",
          "weight": 14.58
        },
        {
          "outline": "M40 48.95 L39.95 49.55 L39.95 50.05 L40 50.4 L40 50.65 L40.1 50.8 L40.2 51 L40.4 51.2 L40.75 51.4 L41.3 51.55 L42 51.7 L42 56.2 L40.75 56.2 L39.6 56.05 L38.45 55.75 L37.35 55.25 L36.35 54.55 L35.55 53.65 L34.85 52.55 L34.4 51.4 L34.1 50.2 L34 48.95 Z M42 51.7 L43.55 52.35 L44.25 53.95 L43.55 55.5 L42 56.2 Z",
          "bounds": [
            34,
            48.95,
            44.25,
            56.2
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M37 48.955 Q37 53.955 42 53.955",
          "revealWidth": 14
        },
        {
          "outline": "M42 51.7 L86.5 51.7 L86.5 56.2 L42 56.2 Z M86.5 51.7 L87.85 52.6 L88.75 53.95 L87.85 55.3 L86.5 56.2 Z M86.5 51.7 L84.25 51.7 L86.5 45.2 L87.5 45.2 Z",
          "bounds": [
            42,
            45.2,
            88.75,
            56.2
          ],
          "direction": "right",
          "weight": 44.5
        }
      ],
      [
        {
          "outline": "M34.4 58.45 L32.65 60.6 L30.7 62.7 L28.55 64.7 L26.15 66.65 L23.6 68.5 L20.8 70.35 L17.8 72.1 L14.6 73.75 L11.1 75.3 L7.4 76.7 L7 75.9 L10.2 73.65 L13.2 71.45 L16 69.35 L18.6 67.25 L20.95 65.2 L23.1 63.15 L25 61.1 L26.7 59.1 L28.15 57.1 L29.4 55.15 Z M29.1 55.55 L29.65 54.75 L34.4 58.45 Z M34.4 58.45 L35.1 60.15 L32.15 60 Z",
          "bounds": [
            7,
            54.75,
            35.1,
            76.7
          ],
          "direction": "curve",
          "weight": 31.934433,
          "revealPath": "M32.2 56.405 Q25 67.195 7.24 76.325",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.95 61.8 L85.45 61.8 L85.45 63.8 L25.95 63.8 Z",
          "bounds": [
            25.95,
            61.8,
            85.45,
            63.8
          ],
          "direction": "right",
          "weight": 59.52
        },
        {
          "outline": "M88.45 62.75 L88.45 67.25 L88.3 71.35 L87.95 75.15 L87.45 78.55 L86.7 81.65 L85.8 84.4 L84.6 86.85 L83.15 88.95 L81.35 90.65 L79.25 91.95 L76.8 86.45 L77.7 85.9 L78.55 85.05 L79.4 83.8 L80.25 82.15 L80.95 80 L81.55 77.45 L82 74.4 L82.3 71 L82.45 67.15 L82.45 62.9 Z M82.45 61.8 L85.45 59.3 L90.95 63.8 L88.45 65.3 L82.45 67.8 Z",
          "bounds": [
            76.8,
            59.3,
            90.95,
            91.95
          ],
          "direction": "curve",
          "weight": 27.408481,
          "revealPath": "M85.48 62.8375 Q85.96 85.6625 78.04145218132514 89.2172807815806",
          "revealWidth": 14
        },
        {
          "outline": "M79.25 91.95 L78.2 92.35 L77.15 92.75 L76.1 93.1 L75.05 93.4 L73.95 93.65 L72.9 93.85 L71.8 94.05 L70.7 94.15 L69.55 94.2 L68.45 94.25 L68.45 88.25 L69.35 88.2 L70.2 88.15 L71.05 88.1 L71.9 87.95 L72.7 87.8 L73.55 87.6 L74.35 87.35 L75.2 87.1 L76 86.8 L76.8 86.45 Z M68.45 91.25 L58.45 89.75 L58.45 88.25 L68.45 88.25 Z",
          "bounds": [
            58.45,
            86.45,
            79.25,
            94.25
          ],
          "direction": "curve",
          "weight": 9.778268,
          "revealPath": "M78.04145218132514 89.2172807815806 Q73.48 91.265 68.48 91.265",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M34.6 69.05 L34.6 84.2 L28.6 87.2 L28.6 66.05 Z",
          "bounds": [
            28.6,
            66.05,
            34.6,
            87.2
          ],
          "direction": "down",
          "weight": 11.6532
        }
      ],
      [
        {
          "outline": "M31.6 69.05 L60.55 69.05 L60.55 71.05 L31.6 71.05 Z",
          "bounds": [
            31.6,
            69.05,
            60.55,
            71.05
          ],
          "direction": "right",
          "weight": 28.9536
        },
        {
          "outline": "M63.55 70.05 L63.55 83.7 L57.55 86.7 L57.55 70.05 Z M57.55 69.05 L60.55 66.55 L66.05 71.05 L63.55 73.05 L57.55 70.05 Z",
          "bounds": [
            57.55,
            66.55,
            66.05,
            86.7
          ],
          "direction": "down",
          "weight": 11.6532
        }
      ],
      [
        {
          "outline": "M31.6 80.7 L60.55 80.7 L60.55 82.7 L31.6 82.7 Z",
          "bounds": [
            31.6,
            80.7,
            60.55,
            82.7
          ],
          "direction": "right",
          "weight": 28.9536
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch221Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch221 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH221_STROKES = loadGlyphWikiBatch221Strokes(reviewed)
