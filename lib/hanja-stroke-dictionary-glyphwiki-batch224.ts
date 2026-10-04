/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch224.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "莉",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "18bf181ebef2e3e334cfed2ed7ebb20be19e7e1c4eb64232e32b4fd7051d235b",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "pathsSha256": "567a3a077db783d082dcf4fb50ce8ec6865330e5aef2e3b79c62c7816ed839ea",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8389.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8389.svg",
      "dictionarySvgSha256": "b1bcd6d554ce89f7b6e1b5e53d1e57356bf6e352ae6c13675c7a73f2409e3cf5",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "cff309081547943a022a3e18eb75c9104702ec5413025a7562d6cea199ebe7eb",
      "geometryReviewSha256": "cff309081547943a022a3e18eb75c9104702ec5413025a7562d6cea199ebe7eb",
      "directionReviewSha256": "cff309081547943a022a3e18eb75c9104702ec5413025a7562d6cea199ebe7eb"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u8389-k/u8389-ue0102/ufa5e-03/u8279-k03/u5229/u79be-01/u5202-02; individual glyph revisions unavailable; source SHA256 316ff41036149b3c106d5bba8a4444ac77b6a9a8bcc4fc806b981b3220d2f37a",
      "editableSource": "/hanja-strokes/glyphwiki/8389.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u8389-k and only declared u8389-ue0102/ufa5e-03/u8279-k03/u5229/u79be-01/u5202-02. Original11 groups12 primitives,Q4/C0, all coordinates, polygons and engine defaults preserved. Reorder grass raw3 before raw2 for observed domestic3/4. Domestic11 retains original connected line/Q left terminal hook at168.465,172.4. Normalize200to100 and winding only; no invented geometry, bridges, splitting, trimming, reversal, width changes or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.45 16.85 L46.75 16.85 L46.75 18.85 L6.45 18.85 Z M46.75 16.85 L36.75 17.85 L41.75 12.35 Z",
      "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
      "M52.7 16.85 L93 16.85 L93 18.85 L52.7 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
      "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
      "M48.9 38.55 L46.25 39.15 L43.3 39.75 L40 40.35 L36.4 40.95 L32.45 41.5 L28.15 42.05 L23.55 42.55 L18.6 43 L13.3 43.4 L7.7 43.65 L7.55 42.8 L13.05 41.5 L18.2 40.35 L23.05 39.3 L27.55 38.3 L31.65 37.35 L35.45 36.4 L38.9 35.45 L42 34.55 L44.75 33.65 L47.1 32.8 Z M46.65 32.95 L52.05 37.55 L48.9 38.55 Z M52.05 37.55 L52.2 39.1 L48.75 37.55 Z",
      "M6.4 53.1 L53.4 53.1 L53.4 55.1 L6.4 55.1 Z M53.4 53.1 L41.4 54.1 L47.4 48.1 Z",
      "M33.8 38.75 L33.8 91.1 L27.8 94.1 L27.8 38.75 Z",
      "M32.2 54.1 L31.8 55.1 L30.25 58.6 L28.5 61.95 L26.55 65.15 L24.35 68.25 L21.95 71.2 L19.35 74 L16.5 76.65 L13.5 79.15 L10.2 81.45 L6.65 83.5 L6.15 82.75 L9 79.95 L11.7 77.15 L14.2 74.35 L16.5 71.5 L18.6 68.6 L20.5 65.65 L22.2 62.6 L23.75 59.5 L25.05 56.35 L25.8 54.1 Z",
      "M32.6 61.45 L34.85 61.75 L37.05 61.95 L39.15 62.3 L41.1 62.7 L43 63.2 L44.75 63.7 L46.45 64.3 L48.05 65 L49.55 65.75 L51 66.55 L47.3 71.25 L46.4 70.35 L45.35 69.5 L44.2 68.6 L42.9 67.7 L41.45 66.8 L39.9 65.9 L38.2 65 L36.4 64.1 L34.5 63.15 L32.4 62.35 Z M51 66.55 L52.1 68.55 L51.5 70.75 L49.5 71.85 L47.3 71.25 Z",
      "M66.2 38.5 L66.2 79.2 L60.2 82.2 L60.2 37.5 Z M66.2 38.5 L67.7 39.5 L65.2 41 Z",
      "M87.2 33.25 L87.2 86.2 L81.2 86.2 L81.2 32.25 Z M87.2 33.25 L88.7 34.25 L86.2 35.75 Z M81.2 86.2 L87.2 86.2 L86 88 L84.2 89.2 L82.4 88 Z M87.2 86.2 L87.15 87.45 L86.9 88.7 L86.5 89.9 L85.9 91.05 L85.1 92.05 L84.05 92.85 L82.95 93.5 L81.75 93.9 L80.5 94.1 L79.2 94.2 L79.2 88.2 L79.85 88.15 L80.3 88.05 L80.6 87.95 L80.75 87.9 L80.85 87.8 L80.9 87.7 L81 87.55 L81.1 87.25 L81.2 86.8 L81.2 86.2 Z M79.2 91.2 L69.2 89.7 L69.2 88.2 L79.2 88.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.85 L46.75 16.85 L46.75 18.85 L6.45 18.85 Z M46.75 16.85 L36.75 17.85 L41.75 12.35 Z",
          "bounds": [
            6.45,
            12.35,
            46.75,
            18.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
          "bounds": [
            28.8,
            5.75,
            36.3,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M52.7 16.85 L93 16.85 L93 18.85 L52.7 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
          "bounds": [
            52.7,
            11.85,
            93,
            18.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
          "bounds": [
            64.65,
            5.75,
            72.15,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M48.9 38.55 L46.25 39.15 L43.3 39.75 L40 40.35 L36.4 40.95 L32.45 41.5 L28.15 42.05 L23.55 42.55 L18.6 43 L13.3 43.4 L7.7 43.65 L7.55 42.8 L13.05 41.5 L18.2 40.35 L23.05 39.3 L27.55 38.3 L31.65 37.35 L35.45 36.4 L38.9 35.45 L42 34.55 L44.75 33.65 L47.1 32.8 Z M46.65 32.95 L52.05 37.55 L48.9 38.55 Z M52.05 37.55 L52.2 39.1 L48.75 37.55 Z",
          "bounds": [
            7.55,
            32.8,
            52.2,
            43.65
          ],
          "direction": "curve",
          "weight": 41.589024,
          "revealPath": "M48.52 35.55 Q36.32 39.4 7.65 43.25",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.4 53.1 L53.4 53.1 L53.4 55.1 L6.4 55.1 Z M53.4 53.1 L41.4 54.1 L47.4 48.1 Z",
          "bounds": [
            6.4,
            48.1,
            53.4,
            55.1
          ],
          "direction": "right",
          "weight": 46.97
        }
      ],
      [
        {
          "outline": "M33.8 38.75 L33.8 91.1 L27.8 94.1 L27.8 38.75 Z",
          "bounds": [
            27.8,
            38.75,
            33.8,
            94.1
          ],
          "direction": "down",
          "weight": 52.85
        }
      ],
      [
        {
          "outline": "M32.2 54.1 L31.8 55.1 L30.25 58.6 L28.5 61.95 L26.55 65.15 L24.35 68.25 L21.95 71.2 L19.35 74 L16.5 76.65 L13.5 79.15 L10.2 81.45 L6.65 83.5 L6.15 82.75 L9 79.95 L11.7 77.15 L14.2 74.35 L16.5 71.5 L18.6 68.6 L20.5 65.65 L22.2 62.6 L23.75 59.5 L25.05 56.35 L25.8 54.1 Z",
          "bounds": [
            6.15,
            54.1,
            32.2,
            83.5
          ],
          "direction": "curve",
          "weight": 36.787327,
          "revealPath": "M29 54.1 Q22.9 71.25 6.43 83.15",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M32.6 61.45 L34.85 61.75 L37.05 61.95 L39.15 62.3 L41.1 62.7 L43 63.2 L44.75 63.7 L46.45 64.3 L48.05 65 L49.55 65.75 L51 66.55 L47.3 71.25 L46.4 70.35 L45.35 69.5 L44.2 68.6 L42.9 67.7 L41.45 66.8 L39.9 65.9 L38.2 65 L36.4 64.1 L34.5 63.15 L32.4 62.35 Z M51 66.55 L52.1 68.55 L51.5 70.75 L49.5 71.85 L47.3 71.25 Z",
          "bounds": [
            32.4,
            61.45,
            52.1,
            71.85
          ],
          "direction": "curve",
          "weight": 19.992311,
          "revealPath": "M32.05 61.8 Q43.64 64.6 50.35 69.85",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.2 38.5 L66.2 79.2 L60.2 82.2 L60.2 37.5 Z M66.2 38.5 L67.7 39.5 L65.2 41 Z",
          "bounds": [
            60.2,
            37.5,
            67.7,
            82.2
          ],
          "direction": "down",
          "weight": 42.7
        }
      ],
      [
        {
          "outline": "M87.2 33.25 L87.2 86.2 L81.2 86.2 L81.2 32.25 Z M87.2 33.25 L88.7 34.25 L86.2 35.75 Z M81.2 86.2 L87.2 86.2 L86 88 L84.2 89.2 L82.4 88 Z",
          "bounds": [
            81.2,
            32.25,
            88.7,
            89.2
          ],
          "direction": "down",
          "weight": 53.45
        },
        {
          "outline": "M87.2 86.2 L87.15 87.45 L86.9 88.7 L86.5 89.9 L85.9 91.05 L85.1 92.05 L84.05 92.85 L82.95 93.5 L81.75 93.9 L80.5 94.1 L79.2 94.2 L79.2 88.2 L79.85 88.15 L80.3 88.05 L80.6 87.95 L80.75 87.9 L80.85 87.8 L80.9 87.7 L81 87.55 L81.1 87.25 L81.2 86.8 L81.2 86.2 Z M79.2 91.2 L69.2 89.7 L69.2 88.2 L79.2 88.2 Z",
          "bounds": [
            69.2,
            86.2,
            87.2,
            94.2
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M84.2325 86.2 Q84.2325 91.2 79.2325 91.2",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch224Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch224 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH224_STROKES = loadGlyphWikiBatch224Strokes(reviewed)
