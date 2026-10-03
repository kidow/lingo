/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch185.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "倧",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "142dbe84cafacd25937496fd8c64858d774e6e1aebeccbc91c8e7eeb217b3826",
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
      11
    ],
    "pathsSha256": "ed830ee3e69d0d2c67e1ca149791c8d52599ec0052af7a2ca9aefc560fccd1c7",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5027.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5027.svg",
      "dictionarySvgSha256": "a9e4770a99f91ad963d09cef48581f9a74539772202cf90cf35b7a7a96feb315",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "4ae72c6589d0d0f383c7943531a3053af53e18d3e2e6e025b14d94fdbf36042a",
      "geometryReviewSha256": "4ae72c6589d0d0f383c7943531a3053af53e18d3e2e6e025b14d94fdbf36042a",
      "directionReviewSha256": "4ae72c6589d0d0f383c7943531a3053af53e18d3e2e6e025b14d94fdbf36042a"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u5027-k@5",
      "revision": "u5027-k@5; u5027-j@3; u4ebb-01@12; u5b97-02@4; observed2026-10-03; source SHA256 a9bac5eff473efbe3e5e16a3ddede2204bc129e788c0c48992c2e9e56cd1b146",
      "editableSource": "/hanja-strokes/glyphwiki/5027.json",
      "modifications": "Whole Korean-source alias and declared dependencies only; normalized200to100 and winding. Domestic source groups0;1;2;3;4,5;6;7;8;9;10. Domestic5 original horizontal/curve corner177.03,42 and domestic8 vertical/hook corner124.60499999999999,172 retained without invented bridges. All six quadratic primitives, source polygon vertices, decorations and engine defaults retained. No invented coordinates, trimming or substituted components. Crosschecked10 cumulative states and90 progressive frames."
    },
    "paths": [
      "M35.8 9 L33.4 14.6 L30.9 20 L28.25 25.35 L25.55 30.55 L22.65 35.6 L19.7 40.55 L16.55 45.35 L13.3 50 L9.85 54.45 L6.25 58.75 L5.5 58.2 L8.3 53.4 L11.05 48.55 L13.75 43.6 L16.4 38.65 L18.95 33.6 L21.4 28.45 L23.75 23.2 L26 17.85 L28.15 12.4 L30.2 6.85 Z M30 7.35 L30.45 6.2 L35.8 9 Z M35.8 9 L36.85 10.5 L33.95 11 Z",
      "M25.15 37 L25.15 91.5 L19.15 94.5 L19.15 36 Z M25.15 37 L26.65 38 L24.15 39.5 Z",
      "M65.3 7.5 L65.3 21.5 L59.3 21.5 L59.3 6.5 Z M65.3 7.5 L66.8 8.5 L64.3 10 Z",
      "M40.1 15.85 L40.8 17.8 L41.45 19.75 L41.95 21.7 L42.25 23.7 L42.45 25.65 L42.45 27.6 L42.35 29.55 L42.1 31.45 L41.7 33.4 L41.15 35.3 L35.65 32.9 L36.4 31.5 L37.05 30.1 L37.6 28.55 L38.1 27 L38.5 25.35 L38.8 23.65 L39.05 21.9 L39.2 20 L39.35 18.05 L39.25 16.05 Z M41.15 35.3 L39.5 36.85 L37.2 36.85 L35.65 35.2 L35.65 32.9 Z",
      "M40.15 20 L88.5 20 L88.5 22 L40.15 22 Z M91.4 21.7 L90.8 23.15 L90.15 24.6 L89.4 26.05 L88.65 27.45 L87.75 28.85 L86.85 30.25 L85.85 31.65 L84.75 33 L83.55 34.3 L82.45 35.7 L81.7 35.25 L82.4 33.65 L82.9 32 L83.4 30.4 L83.85 28.85 L84.25 27.35 L84.65 25.85 L84.95 24.4 L85.2 23 L85.4 21.6 L85.6 20.25 Z M85.5 20 L88.5 17.5 L94 22 L91.5 23.5 L85.5 26 Z",
      "M45.4 38 L82.1 38 L82.1 40 L45.4 40 Z M82.1 38 L70.1 39 L76.1 33 Z",
      "M37.8 54.5 L90.25 54.5 L90.25 56.5 L37.8 56.5 Z M90.25 54.5 L78.25 55.5 L84.25 49.5 Z",
      "M65.3 54.5 L65.3 86 L59.3 86 L59.3 54.5 Z M59.3 86 L65.3 86 L64.1 87.8 L62.3 89 L60.5 87.8 Z M65.3 86 L65.2 87.25 L65 88.5 L64.6 89.7 L63.95 90.85 L63.15 91.85 L62.15 92.65 L61 93.3 L59.8 93.7 L58.55 93.9 L57.3 94 L57.3 88 L57.9 87.95 L58.35 87.85 L58.65 87.75 L58.8 87.7 L58.9 87.6 L59 87.5 L59.05 87.35 L59.15 87.05 L59.25 86.6 L59.3 86 Z M57.3 91 L49.3 89.5 L49.3 88 L57.3 88 Z",
      "M51.4 67.7 L49.85 70.35 L48.25 72.95 L46.45 75.5 L44.55 77.95 L42.5 80.4 L40.3 82.75 L37.95 85.05 L35.5 87.25 L32.8 89.35 L29.95 91.3 L29.35 90.65 L31.5 87.95 L33.55 85.4 L35.55 82.85 L37.4 80.3 L39.15 77.8 L40.75 75.25 L42.25 72.75 L43.6 70.2 L44.85 67.7 L45.95 65.15 Z M45.75 65.6 L46.25 64.55 L51.4 67.7 Z M51.4 67.7 L52.3 69.25 L49.4 69.55 Z",
      "M73.45 65.45 L75.75 66.85 L77.95 68.45 L80 70.15 L82 72 L83.85 73.9 L85.6 75.95 L87.25 78.05 L88.8 80.2 L90.3 82.45 L91.7 84.8 L86.3 87.45 L85.3 85.2 L84.2 82.95 L83.05 80.8 L81.8 78.65 L80.5 76.5 L79.1 74.45 L77.6 72.4 L76.05 70.35 L74.45 68.25 L72.85 66.15 Z M91.7 84.8 L91.8 87.1 L90.3 88.8 L88.05 88.95 L86.3 87.45 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M35.8 9 L33.4 14.6 L30.9 20 L28.25 25.35 L25.55 30.55 L22.65 35.6 L19.7 40.55 L16.55 45.35 L13.3 50 L9.85 54.45 L6.25 58.75 L5.5 58.2 L8.3 53.4 L11.05 48.55 L13.75 43.6 L16.4 38.65 L18.95 33.6 L21.4 28.45 L23.75 23.2 L26 17.85 L28.15 12.4 L30.2 6.85 Z M30 7.35 L30.45 6.2 L35.8 9 Z M35.8 9 L36.85 10.5 L33.95 11 Z",
          "bounds": [
            5.5,
            6.2,
            36.85,
            58.75
          ],
          "direction": "curve",
          "weight": 57.848306,
          "revealPath": "M33.1925 7.5 Q22.19 36 5.89 58.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.15 37 L25.15 91.5 L19.15 94.5 L19.15 36 Z M25.15 37 L26.65 38 L24.15 39.5 Z",
          "bounds": [
            19.15,
            36,
            26.65,
            94.5
          ],
          "direction": "down",
          "weight": 56.5
        }
      ],
      [
        {
          "outline": "M65.3 7.5 L65.3 21.5 L59.3 21.5 L59.3 6.5 Z M65.3 7.5 L66.8 8.5 L64.3 10 Z",
          "bounds": [
            59.3,
            6.5,
            66.8,
            21.5
          ],
          "direction": "down",
          "weight": 13.5
        }
      ],
      [
        {
          "outline": "M40.1 15.85 L40.8 17.8 L41.45 19.75 L41.95 21.7 L42.25 23.7 L42.45 25.65 L42.45 27.6 L42.35 29.55 L42.1 31.45 L41.7 33.4 L41.15 35.3 L35.65 32.9 L36.4 31.5 L37.05 30.1 L37.6 28.55 L38.1 27 L38.5 25.35 L38.8 23.65 L39.05 21.9 L39.2 20 L39.35 18.05 L39.25 16.05 Z M41.15 35.3 L39.5 36.85 L37.2 36.85 L35.65 35.2 L35.65 32.9 Z",
          "bounds": [
            35.65,
            15.85,
            42.45,
            36.85
          ],
          "direction": "curve",
          "weight": 20.076199,
          "revealPath": "M39.585 15.5 Q41.915 26 37.8375 35.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40.15 20 L88.5 20 L88.5 22 L40.15 22 Z",
          "bounds": [
            40.15,
            20,
            88.5,
            22
          ],
          "direction": "right",
          "weight": 48.3475
        },
        {
          "outline": "M91.4 21.7 L90.8 23.15 L90.15 24.6 L89.4 26.05 L88.65 27.45 L87.75 28.85 L86.85 30.25 L85.85 31.65 L84.75 33 L83.55 34.3 L82.45 35.7 L81.7 35.25 L82.4 33.65 L82.9 32 L83.4 30.4 L83.85 28.85 L84.25 27.35 L84.65 25.85 L84.95 24.4 L85.2 23 L85.4 21.6 L85.6 20.25 Z M85.5 20 L88.5 17.5 L94 22 L91.5 23.5 L85.5 26 Z",
          "bounds": [
            81.7,
            17.5,
            94,
            35.7
          ],
          "direction": "curve",
          "weight": 15.852636,
          "revealPath": "M88.515 21 Q86.7675 28 82.1075 35.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.4 38 L82.1 38 L82.1 40 L45.4 40 Z M82.1 38 L70.1 39 L76.1 33 Z",
          "bounds": [
            45.4,
            33,
            82.1,
            40
          ],
          "direction": "right",
          "weight": 36.6975
        }
      ],
      [
        {
          "outline": "M37.8 54.5 L90.25 54.5 L90.25 56.5 L37.8 56.5 Z M90.25 54.5 L78.25 55.5 L84.25 49.5 Z",
          "bounds": [
            37.8,
            49.5,
            90.25,
            56.5
          ],
          "direction": "right",
          "weight": 52.425
        }
      ],
      [
        {
          "outline": "M65.3 54.5 L65.3 86 L59.3 86 L59.3 54.5 Z M59.3 86 L65.3 86 L64.1 87.8 L62.3 89 L60.5 87.8 Z",
          "bounds": [
            59.3,
            54.5,
            65.3,
            89
          ],
          "direction": "down",
          "weight": 30.5
        },
        {
          "outline": "M65.3 86 L65.2 87.25 L65 88.5 L64.6 89.7 L63.95 90.85 L63.15 91.85 L62.15 92.65 L61 93.3 L59.8 93.7 L58.55 93.9 L57.3 94 L57.3 88 L57.9 87.95 L58.35 87.85 L58.65 87.75 L58.8 87.7 L58.9 87.6 L59 87.5 L59.05 87.35 L59.15 87.05 L59.25 86.6 L59.3 86 Z M57.3 91 L49.3 89.5 L49.3 88 L57.3 88 Z",
          "bounds": [
            49.3,
            86,
            65.3,
            94
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M62.302499999999995 86 Q62.302499999999995 91 57.302499999999995 91",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M51.4 67.7 L49.85 70.35 L48.25 72.95 L46.45 75.5 L44.55 77.95 L42.5 80.4 L40.3 82.75 L37.95 85.05 L35.5 87.25 L32.8 89.35 L29.95 91.3 L29.35 90.65 L31.5 87.95 L33.55 85.4 L35.55 82.85 L37.4 80.3 L39.15 77.8 L40.75 75.25 L42.25 72.75 L43.6 70.2 L44.85 67.7 L45.95 65.15 Z M45.75 65.6 L46.25 64.55 L51.4 67.7 Z M51.4 67.7 L52.3 69.25 L49.4 69.55 Z",
          "bounds": [
            29.35,
            64.55,
            52.3,
            91.3
          ],
          "direction": "curve",
          "weight": 31.535766,
          "revealPath": "M48.905 66 Q42.4975 79.5 29.682499999999997 91",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.45 65.45 L75.75 66.85 L77.95 68.45 L80 70.15 L82 72 L83.85 73.9 L85.6 75.95 L87.25 78.05 L88.8 80.2 L90.3 82.45 L91.7 84.8 L86.3 87.45 L85.3 85.2 L84.2 82.95 L83.05 80.8 L81.8 78.65 L80.5 76.5 L79.1 74.45 L77.6 72.4 L76.05 70.35 L74.45 68.25 L72.85 66.15 Z M91.7 84.8 L91.8 87.1 L90.3 88.8 L88.05 88.95 L86.3 87.45 Z",
          "bounds": [
            72.85,
            65.45,
            91.8,
            88.95
          ],
          "direction": "curve",
          "weight": 27.737277,
          "revealPath": "M72.7875 65.5 Q83.2725 74.5 89.68 87.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch185Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch185 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH185_STROKES = loadGlyphWikiBatch185Strokes(reviewed)
