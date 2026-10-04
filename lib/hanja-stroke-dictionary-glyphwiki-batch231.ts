/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch231.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "堧",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "ed6b9a423d0b7e40c0679bf0e8532a67222744483d0f5807a469392b43ee7f06",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      9,
      10,
      11,
      12,
      13
    ],
    "pathsSha256": "954df1a040ebf74e08e5bb449d13a267c63cc77907b55f8b1c611c5d19801948",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5827.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5827.svg",
      "dictionarySvgSha256": "bb9e0cc4cd04c6574ef9234719999238f56c53d28e352c717ad33612ff5290df",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "ac6caab42911070be9815031ddb0468658f216b55b5a381022512268434152e8",
      "geometryReviewSha256": "ac6caab42911070be9815031ddb0468658f216b55b5a381022512268434152e8",
      "directionReviewSha256": "ac6caab42911070be9815031ddb0468658f216b55b5a381022512268434152e8"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u5827-k/u5827/u571f-01/u800e-02/u800c-09/u800c-04; individual glyph revisions unavailable; source SHA256 d9dd980f190700d679eaf9dfa17e5e24239a4911f4616f185d7353514facbbd1",
      "editableSource": "/hanja-strokes/glyphwiki/5827.json",
      "modifications": "All12 domestic directions/cumulative/full form and108 progressive frames reviewed in Codex in-app browser. Exact whole u5827-k/u5827 and only declared u571f-01/u800e-02/u800c-09/u800c-04 from pinned archive. Original13 raw groups14 drawing primitives,Q5/C0 and coordinates/polygons/defaults preserved. Domestic7 groups6/7 are horizontal then vertical/Q left hook with exact172.06040000000002,49.256 and172.06040000000002,90.66399999999997 shared endpoints. Normalize200to100/winding only; no inferred geometry, reversal, width change or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M7.6 34 L36.95 34 L36.95 36 L7.6 36 Z M36.95 34 L24.95 35 L30.95 29 Z",
      "M24.85 9.5 L24.85 71.5 L18.85 71.5 L18.85 8.5 Z M24.85 9.5 L26.35 10.5 L23.85 12 Z",
      "M7 75.5 L9.35 74.75 L11.8 73.9 L14.45 72.95 L17.2 71.9 L20.15 70.75 L23.2 69.55 L26.45 68.25 L29.8 66.85 L33.4 65.5 L37.1 64.1 L37.55 64.85 L34.25 67.15 L31.05 69.25 L27.9 71.2 L24.85 72.95 L21.95 74.6 L19.15 76.1 L16.45 77.55 L13.9 78.85 L11.45 80 L9.1 81.1 Z M9.1 81.1 L6.05 75.85 L7 75.5 Z M9.1 81.1 L11.4 78.65 L10.6 82.15 Z",
      "M37.05 12.5 L93.7 12.5 L93.7 14.5 L37.05 14.5 Z M93.7 12.5 L81.7 13.5 L87.7 7.5 Z",
      "M67.55 13.5 L67.05 14.45 L66.5 15.45 L65.95 16.4 L65.35 17.4 L64.7 18.4 L64.1 19.45 L63.4 20.45 L62.7 21.5 L62 22.55 L61.2 23.6 L60.6 24.75 L59.75 24.45 L60.1 23.2 L60.2 21.9 L60.35 20.6 L60.5 19.4 L60.65 18.2 L60.8 17 L60.95 15.85 L61.1 14.75 L61.25 13.65 L61.25 13.5 Z",
      "M47.75 23.6 L47.75 50.3 L41.75 53.3 L41.75 20.6 Z",
      "M44.75 23.6 L86 23.6 L86 25.6 L44.75 25.6 Z M89 24.6 L89 45.3 L83 45.3 L83 24.6 Z M83 23.6 L86 21.1 L91.5 25.6 L89 27.6 L83 24.6 Z M83 45.3 L89 45.3 L87.8 47.1 L86 48.3 L84.2 47.1 Z M89 45.3 L88.95 46.6 L88.7 47.85 L88.3 49.05 L87.7 50.15 L86.9 51.2 L85.85 52 L84.75 52.6 L83.55 53 L82.3 53.25 L81 53.3 L81 47.3 L81.6 47.3 L82.1 47.2 L82.35 47.1 L82.55 47 L82.65 46.95 L82.7 46.85 L82.8 46.7 L82.9 46.4 L82.95 45.95 L83 45.3 Z M81 50.3 L75 48.8 L75 47.3 L81 47.3 Z",
      "M61.5 23.6 L61.5 48.8 L55.5 51.8 L55.5 23.6 Z",
      "M74.9 23.6 L74.9 48.3 L68.9 51.3 L68.9 23.6 Z",
      "M37.6 66 L93.75 66 L93.75 68 L37.6 68 Z M93.75 66 L81.75 67 L87.75 61 Z",
      "M67.6 53.6 L66.85 60 L65.6 65.95 L63.8 71.35 L61.45 76.3 L58.55 80.7 L55.15 84.55 L51.2 87.8 L46.85 90.45 L41.95 92.5 L36.65 93.9 L36.4 93.05 L41.2 90.75 L45.45 88.15 L49.15 85.25 L52.35 81.95 L55.05 78.25 L57.3 74.15 L59.05 69.65 L60.35 64.7 L61.2 59.25 L61.6 53.35 Z M61.55 53.85 L61.65 52.2 L67.6 53.6 Z M67.6 53.6 L69.05 54.7 L66.45 56.05 Z",
      "M66.25 67.3 L68.1 70.8 L70 73.95 L71.95 76.75 L74 79.2 L76.2 81.35 L78.5 83.1 L80.95 84.6 L83.55 85.75 L86.3 86.65 L89.2 87.25 L87.85 93.7 L84.35 92.6 L81.05 91.1 L78.05 89.3 L75.3 87.1 L72.85 84.6 L70.7 81.8 L68.9 78.7 L67.35 75.3 L66.15 71.6 L65.35 67.6 Z M87.85 93.7 L89.2 87.25 L93.75 88.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.6 34 L36.95 34 L36.95 36 L7.6 36 Z M36.95 34 L24.95 35 L30.95 29 Z",
          "bounds": [
            7.6,
            29,
            36.95,
            36
          ],
          "direction": "right",
          "weight": 29.34
        }
      ],
      [
        {
          "outline": "M24.85 9.5 L24.85 71.5 L18.85 71.5 L18.85 8.5 Z M24.85 9.5 L26.35 10.5 L23.85 12 Z",
          "bounds": [
            18.85,
            8.5,
            26.35,
            71.5
          ],
          "direction": "down",
          "weight": 61.5
        }
      ],
      [
        {
          "outline": "M7 75.5 L9.35 74.75 L11.8 73.9 L14.45 72.95 L17.2 71.9 L20.15 70.75 L23.2 69.55 L26.45 68.25 L29.8 66.85 L33.4 65.5 L37.1 64.1 L37.55 64.85 L34.25 67.15 L31.05 69.25 L27.9 71.2 L24.85 72.95 L21.95 74.6 L19.15 76.1 L16.45 77.55 L13.9 78.85 L11.45 80 L9.1 81.1 Z M9.1 81.1 L6.05 75.85 L7 75.5 Z M9.1 81.1 L11.4 78.65 L10.6 82.15 Z",
          "bounds": [
            6.05,
            64.1,
            37.55,
            82.15
          ],
          "direction": "curve",
          "weight": 32.877253,
          "revealPath": "M7.6125 78.5 Q19.43 74 37.36 64.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M37.05 12.5 L93.7 12.5 L93.7 14.5 L37.05 14.5 Z M93.7 12.5 L81.7 13.5 L87.7 7.5 Z",
          "bounds": [
            37.05,
            7.5,
            93.7,
            14.5
          ],
          "direction": "right",
          "weight": 56.6826
        }
      ],
      [
        {
          "outline": "M67.55 13.5 L67.05 14.45 L66.5 15.45 L65.95 16.4 L65.35 17.4 L64.7 18.4 L64.1 19.45 L63.4 20.45 L62.7 21.5 L62 22.55 L61.2 23.6 L60.6 24.75 L59.75 24.45 L60.1 23.2 L60.2 21.9 L60.35 20.6 L60.5 19.4 L60.65 18.2 L60.8 17 L60.95 15.85 L61.1 14.75 L61.25 13.65 L61.25 13.5 Z",
          "bounds": [
            59.75,
            13.5,
            67.55,
            24.75
          ],
          "direction": "curve",
          "weight": 11.795879,
          "revealPath": "M64.2292 13.54 Q62.5522 18.58 60.20439999999999 24.628",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.75 23.6 L47.75 50.3 L41.75 53.3 L41.75 20.6 Z",
          "bounds": [
            41.75,
            20.6,
            47.75,
            53.3
          ],
          "direction": "down",
          "weight": 27.216
        }
      ],
      [
        {
          "outline": "M44.75 23.6 L86 23.6 L86 25.6 L44.75 25.6 Z",
          "bounds": [
            44.75,
            23.6,
            86,
            25.6
          ],
          "direction": "right",
          "weight": 41.2542
        },
        {
          "outline": "M89 24.6 L89 45.3 L83 45.3 L83 24.6 Z M83 23.6 L86 21.1 L91.5 25.6 L89 27.6 L83 24.6 Z M83 45.3 L89 45.3 L87.8 47.1 L86 48.3 L84.2 47.1 Z",
          "bounds": [
            83,
            21.1,
            91.5,
            48.3
          ],
          "direction": "down",
          "weight": 20.704
        },
        {
          "outline": "M89 45.3 L88.95 46.6 L88.7 47.85 L88.3 49.05 L87.7 50.15 L86.9 51.2 L85.85 52 L84.75 52.6 L83.55 53 L82.3 53.25 L81 53.3 L81 47.3 L81.6 47.3 L82.1 47.2 L82.35 47.1 L82.55 47 L82.65 46.95 L82.7 46.85 L82.8 46.7 L82.9 46.4 L82.95 45.95 L83 45.3 Z M81 50.3 L75 48.8 L75 47.3 L81 47.3 Z",
          "bounds": [
            75,
            45.3,
            89,
            53.3
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M86.03020000000001 45.33199999999999 Q86.03020000000001 50.33199999999999 81.03020000000001 50.33199999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M61.5 23.6 L61.5 48.8 L55.5 51.8 L55.5 23.6 Z",
          "bounds": [
            55.5,
            23.6,
            61.5,
            51.8
          ],
          "direction": "down",
          "weight": 25.704
        }
      ],
      [
        {
          "outline": "M74.9 23.6 L74.9 48.3 L68.9 51.3 L68.9 23.6 Z",
          "bounds": [
            68.9,
            23.6,
            74.9,
            51.3
          ],
          "direction": "down",
          "weight": 25.2
        }
      ],
      [
        {
          "outline": "M37.6 66 L93.75 66 L93.75 68 L37.6 68 Z M93.75 66 L81.75 67 L87.75 61 Z",
          "bounds": [
            37.6,
            61,
            93.75,
            68
          ],
          "direction": "right",
          "weight": 56.16
        }
      ],
      [
        {
          "outline": "M67.6 53.6 L66.85 60 L65.6 65.95 L63.8 71.35 L61.45 76.3 L58.55 80.7 L55.15 84.55 L51.2 87.8 L46.85 90.45 L41.95 92.5 L36.65 93.9 L36.4 93.05 L41.2 90.75 L45.45 88.15 L49.15 85.25 L52.35 81.95 L55.05 78.25 L57.3 74.15 L59.05 69.65 L60.35 64.7 L61.2 59.25 L61.6 53.35 Z M61.55 53.85 L61.65 52.2 L67.6 53.6 Z M67.6 53.6 L69.05 54.7 L66.45 56.05 Z",
          "bounds": [
            36.4,
            52.2,
            69.05,
            93.9
          ],
          "direction": "curve",
          "weight": 49.282212,
          "revealPath": "M64.64 53 Q63.08 85.5 36.56 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.25 67.3 L68.1 70.8 L70 73.95 L71.95 76.75 L74 79.2 L76.2 81.35 L78.5 83.1 L80.95 84.6 L83.55 85.75 L86.3 86.65 L89.2 87.25 L87.85 93.7 L84.35 92.6 L81.05 91.1 L78.05 89.3 L75.3 87.1 L72.85 84.6 L70.7 81.8 L68.9 78.7 L67.35 75.3 L66.15 71.6 L65.35 67.6 Z M87.85 93.7 L89.2 87.25 L93.75 88.2 Z",
          "bounds": [
            65.35,
            67.3,
            93.75,
            93.7
          ],
          "direction": "curve",
          "weight": 32.798543,
          "revealPath": "M65.68 67 Q71.92 87 88.56 90.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch231Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch231 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH231_STROKES = loadGlyphWikiBatch231Strokes(reviewed)
