/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch249.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "菴",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "9ce319ced1648d1e6bb5cb18266fda7cd34d78062c0e6791691d914eaaffe2a1",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      9,
      10,
      12,
      13,
      14
    ],
    "pathsSha256": "8689f81374db811becb0c90f91a088b29941b3ffb854d2f7d79e25562e0e5dc4",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83f4.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83f4.svg",
      "dictionarySvgSha256": "5df786e4bb6238774959f9dac55797f6cce2f80db4d1190a2ccbc55ea3b12c79",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "c5acb4bebbc79f47e2219e36149fc200a41adbd8a1f7b272f611691866358f04",
      "geometryReviewSha256": "c5acb4bebbc79f47e2219e36149fc200a41adbd8a1f7b272f611691866358f04",
      "directionReviewSha256": "c5acb4bebbc79f47e2219e36149fc200a41adbd8a1f7b272f611691866358f04"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u83f4-k/koseki-353110/ufa5e-03/u8279-k03/u5944; individual glyph revisions unavailable; source SHA256 f6ad8fcd9a8c19c23b5d017face72b379ae79bce9e11734ecc4afe39e1cb7958",
      "editableSource": "/hanja-strokes/glyphwiki/83f4.json",
      "modifications": "All12 domestic directions/cumulative/full form and108 progressive frames reviewed in Codex in-app browser. Exact whole u83f4-k and declared koseki-353110/ufa5e-03/u8279-k03/u5944 from pinned archive. Original14 raw groups contain one non-drawing marker at raw7 and15 drawing primitives,Q3/C0. Original coordinates/polygons/default mincho preserved. Domestic grass order swaps raw2/3; domestic9 follows continuous raw9/10 at140,113.375. Domestic12 preserves original down/curve/right hook at99,172.675 and109,182.675. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution."
    },
    "paths": [
      "M6.45 16.35 L46.75 16.35 L46.75 18.35 L6.45 18.35 Z M46.75 16.35 L36.75 17.35 L41.75 11.85 Z",
      "M34.8 6.6 L34.8 26.65 L28.8 29.65 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
      "M52.7 16.35 L93 16.35 L93 18.35 L52.7 18.35 Z M93 16.35 L81 17.35 L87 11.35 Z",
      "M70.65 6.6 L70.65 26.65 L64.65 29.65 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
      "M11 36.3 L89.5 36.3 L89.5 38.3 L11 38.3 Z M89.5 36.3 L77.5 37.3 L83.5 31.3 Z",
      "M53.05 26.95 L50.5 31.9 L47.55 36.65 L44.15 41.05 L40.35 45.15 L36.1 49 L31.4 52.5 L26.35 55.7 L20.85 58.6 L14.95 61.1 L8.65 63.25 L8.3 62.45 L14.15 59.4 L19.6 56.25 L24.6 52.95 L29.15 49.45 L33.25 45.8 L36.95 41.95 L40.2 37.95 L43.05 33.7 L45.5 29.25 L47.5 24.6 Z M47.3 25.1 L47.8 24 L53.05 26.95 Z M53.05 26.95 L54.05 28.45 L51.15 28.85 Z",
      "M55.15 37.75 L58.05 39.75 L61 41.75 L64.05 43.7 L67.2 45.65 L70.55 47.55 L74.05 49.4 L77.7 51.15 L81.55 52.85 L85.55 54.5 L89.7 56.1 L87.25 62.2 L83 60.25 L78.95 58.2 L75.15 56.05 L71.5 53.8 L68.05 51.5 L64.85 49.1 L61.85 46.6 L59.1 44 L56.65 41.25 L54.5 38.35 Z M87.25 62.2 L89.7 56.1 L93 57.4 Z",
      "M32 55.65 L32 84.7 L26 87.7 L26 52.65 Z",
      "M29 55.65 L70 55.65 L70 57.65 L29 57.65 Z M73 56.65 L73 80.7 L67 83.7 L67 56.65 Z M67 55.65 L70 53.15 L75.5 57.65 L73 59.65 L67 56.65 Z",
      "M29 66.4 L70 66.4 L70 68.4 L29 68.4 Z",
      "M29 76.7 L70 76.7 L70 78.7 L29 78.7 Z",
      "M52.5 46.85 L52.5 86.3 L46.5 86.3 L46.5 45.85 Z M52.5 46.85 L54 47.85 L51.5 49.35 Z M46.5 86.3 L52.5 86.3 L51.3 88.1 L49.5 89.3 L47.7 88.1 Z M52.5 86.3 L52.5 86.95 L52.55 87.4 L52.6 87.7 L52.7 87.9 L52.75 88.05 L52.85 88.15 L53.05 88.25 L53.35 88.4 L53.85 88.5 L54.5 88.55 L54.5 94.05 L53.2 94 L52 93.85 L50.8 93.45 L49.7 92.9 L48.7 92.1 L47.85 91.1 L47.25 90 L46.8 88.85 L46.55 87.6 L46.5 86.3 Z M54.5 88.55 L56.4 89.4 L57.25 91.3 L56.4 93.25 L54.5 94.05 Z M54.5 88.55 L89.5 88.55 L89.5 94.05 L54.5 94.05 Z M89.5 88.55 L91.15 89.65 L92.25 91.3 L91.15 92.95 L89.5 94.05 Z M89.5 88.55 L86.75 88.55 L89.5 78.05 L90.5 78.05 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.35 L46.75 16.35 L46.75 18.35 L6.45 18.35 Z M46.75 16.35 L36.75 17.35 L41.75 11.85 Z",
          "bounds": [
            6.45,
            11.85,
            46.75,
            18.35
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.6 L34.8 26.65 L28.8 29.65 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
          "bounds": [
            28.8,
            5.6,
            36.3,
            29.65
          ],
          "direction": "down",
          "weight": 22.0575
        }
      ],
      [
        {
          "outline": "M52.7 16.35 L93 16.35 L93 18.35 L52.7 18.35 Z M93 16.35 L81 17.35 L87 11.35 Z",
          "bounds": [
            52.7,
            11.35,
            93,
            18.35
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.6 L70.65 26.65 L64.65 29.65 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
          "bounds": [
            64.65,
            5.6,
            72.15,
            29.65
          ],
          "direction": "down",
          "weight": 22.0575
        }
      ],
      [
        {
          "outline": "M11 36.3 L89.5 36.3 L89.5 38.3 L11 38.3 Z M89.5 36.3 L77.5 37.3 L83.5 31.3 Z",
          "bounds": [
            11,
            31.3,
            89.5,
            38.3
          ],
          "direction": "right",
          "weight": 78.5
        }
      ],
      [
        {
          "outline": "M53.05 26.95 L50.5 31.9 L47.55 36.65 L44.15 41.05 L40.35 45.15 L36.1 49 L31.4 52.5 L26.35 55.7 L20.85 58.6 L14.95 61.1 L8.65 63.25 L8.3 62.45 L14.15 59.4 L19.6 56.25 L24.6 52.95 L29.15 49.45 L33.25 45.8 L36.95 41.95 L40.2 37.95 L43.05 33.7 L45.5 29.25 L47.5 24.6 Z M47.3 25.1 L47.8 24 L53.05 26.95 Z M53.05 26.95 L54.05 28.45 L51.15 28.85 Z",
          "bounds": [
            8.3,
            24,
            54.05,
            63.25
          ],
          "direction": "curve",
          "weight": 56.329956,
          "revealPath": "M50.5 25.3375 Q40 50.5 8.5 62.875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M55.15 37.75 L58.05 39.75 L61 41.75 L64.05 43.7 L67.2 45.65 L70.55 47.55 L74.05 49.4 L77.7 51.15 L81.55 52.85 L85.55 54.5 L89.7 56.1 L87.25 62.2 L83 60.25 L78.95 58.2 L75.15 56.05 L71.5 53.8 L68.05 51.5 L64.85 49.1 L61.85 46.6 L59.1 44 L56.65 41.25 L54.5 38.35 Z M87.25 62.2 L89.7 56.1 L93 57.4 Z",
          "bounds": [
            54.5,
            37.75,
            93,
            62.2
          ],
          "direction": "curve",
          "weight": 40.200777,
          "revealPath": "M54.5 37.7125 Q67 50.5 88.5 59.1625",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M32 55.65 L32 84.7 L26 87.7 L26 52.65 Z",
          "bounds": [
            26,
            52.65,
            32,
            87.7
          ],
          "direction": "down",
          "weight": 21.0375
        }
      ],
      [
        {
          "outline": "M29 55.65 L70 55.65 L70 57.65 L29 57.65 Z",
          "bounds": [
            29,
            55.65,
            70,
            57.65
          ],
          "direction": "right",
          "weight": 41
        },
        {
          "outline": "M73 56.65 L73 80.7 L67 83.7 L67 56.65 Z M67 55.65 L70 53.15 L75.5 57.65 L73 59.65 L67 56.65 Z",
          "bounds": [
            67,
            53.15,
            75.5,
            83.7
          ],
          "direction": "down",
          "weight": 21.0375
        }
      ],
      [
        {
          "outline": "M29 66.4 L70 66.4 L70 68.4 L29 68.4 Z",
          "bounds": [
            29,
            66.4,
            70,
            68.4
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M29 76.7 L70 76.7 L70 78.7 L29 78.7 Z",
          "bounds": [
            29,
            76.7,
            70,
            78.7
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M52.5 46.85 L52.5 86.3 L46.5 86.3 L46.5 45.85 Z M52.5 46.85 L54 47.85 L51.5 49.35 Z M46.5 86.3 L52.5 86.3 L51.3 88.1 L49.5 89.3 L47.7 88.1 Z",
          "bounds": [
            46.5,
            45.85,
            54,
            89.3
          ],
          "direction": "down",
          "weight": 39.9625
        },
        {
          "outline": "M52.5 86.3 L52.5 86.95 L52.55 87.4 L52.6 87.7 L52.7 87.9 L52.75 88.05 L52.85 88.15 L53.05 88.25 L53.35 88.4 L53.85 88.5 L54.5 88.55 L54.5 94.05 L53.2 94 L52 93.85 L50.8 93.45 L49.7 92.9 L48.7 92.1 L47.85 91.1 L47.25 90 L46.8 88.85 L46.55 87.6 L46.5 86.3 Z M54.5 88.55 L56.4 89.4 L57.25 91.3 L56.4 93.25 L54.5 94.05 Z",
          "bounds": [
            46.5,
            86.3,
            57.25,
            94.05
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M49.5 86.3375 Q49.5 91.3375 54.5 91.3375",
          "revealWidth": 14
        },
        {
          "outline": "M54.5 88.55 L89.5 88.55 L89.5 94.05 L54.5 94.05 Z M89.5 88.55 L91.15 89.65 L92.25 91.3 L91.15 92.95 L89.5 94.05 Z M89.5 88.55 L86.75 88.55 L89.5 78.05 L90.5 78.05 Z",
          "bounds": [
            54.5,
            78.05,
            92.25,
            94.05
          ],
          "direction": "right",
          "weight": 35
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch249Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch249 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH249_STROKES = loadGlyphWikiBatch249Strokes(reviewed)
