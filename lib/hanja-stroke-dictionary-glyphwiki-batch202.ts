/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch202.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "荑",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "ce425c42450ab04e4f3067413febb8bfabd5fa17a8697820d9e33823e7008a16",
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
      11,
      12,
      13
    ],
    "pathsSha256": "ea24205eda974bb4bc642be3b62087670e43602aac050e782e8be29ad9045d00",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8351.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8351.svg",
      "dictionarySvgSha256": "5bc18284fe51d6ce35ac3fc54ed08974470f0c3213e3d694b2659814fead969e",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "c89f4ec7beaf9a0027c3bee3b3adb20829d9280c33422a2a215e1b15bfd7085b",
      "geometryReviewSha256": "c89f4ec7beaf9a0027c3bee3b3adb20829d9280c33422a2a215e1b15bfd7085b",
      "directionReviewSha256": "c89f4ec7beaf9a0027c3bee3b3adb20829d9280c33422a2a215e1b15bfd7085b"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u8351-k/koseki-346970/ufa5e-03/u8279-k03/u5937; individual glyph revisions unavailable; source SHA256 9015e481cd7599d725a496fdaf05de590094a2754aabdbca4b6f05abbd1d7327",
      "editableSource": "/hanja-strokes/glyphwiki/8351.json",
      "modifications": "All10 domestic directional/cumulative states, complete form and90 progressive frames reviewed in Codex in-app browser. Exact whole u8351-k -> koseki-346970 and only declared ufa5e-03/u8279-k03/u5937. Five historical archive records; individual glyph revisions unavailable. No radical transplant. Domestic3/4 reorder original right horizontal before right vertical. Domestic6 original line join156,88.495 is continuous. Domestic8 original raw8/9/10 joins38,130.63 and171,130.63, followed by the original continuous two-curve hook. Domestic9 original type7 line-to-curve join100,112.345 is continuous. Raw groups0;1;3;2;4;5,6;7;8,9,10;11;12. All13 original source groups,15 draw primitives,four quadratic paths, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Continuous structural primitives follow the observed domestic pen trajectory without added geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M6.45 15.5 L46.75 15.5 L46.75 17.5 L6.45 17.5 Z M46.75 15.5 L36.75 16.5 L41.75 11 Z",
      "M34.8 7.3 L34.8 24.3 L28.8 27.3 L28.8 6.3 Z M34.8 7.3 L36.3 8.3 L33.8 9.8 Z",
      "M52.7 15.5 L93 15.5 L93 17.5 L52.7 17.5 Z M93 15.5 L81 16.5 L87 10.5 Z",
      "M70.65 7.3 L70.65 24.3 L64.65 27.3 L64.65 6.3 Z M70.65 7.3 L72.15 8.3 L69.65 9.8 Z",
      "M7.5 34.5 L92.5 34.5 L92.5 36.5 L7.5 36.5 Z M92.5 34.5 L80.5 35.5 L86.5 29.5 Z",
      "M14 43.2 L78 43.2 L78 45.2 L14 45.2 Z M81 44.2 L81 56.95 L75 59.95 L75 44.2 Z M75 43.2 L78 40.7 L83.5 45.2 L81 47.2 L75 44.2 Z",
      "M22 53.95 L78 53.95 L78 55.95 L22 55.95 Z",
      "M25.15 54.85 L21.15 68.55 L14.55 69.75 L20.2 50.3 Z M19 64.3 L85.5 64.3 L85.5 66.3 L19 66.3 Z M88.45 65.75 L88.25 67.05 L88.05 68.3 L87.85 69.45 L87.65 70.5 L87.45 71.45 L87.25 72.35 L87.05 73.15 L86.8 73.85 L86.6 74.55 L86.3 75.15 L80.9 72.6 L81 72.4 L81.1 72.05 L81.25 71.55 L81.4 70.9 L81.6 70.2 L81.75 69.35 L81.95 68.35 L82.1 67.3 L82.3 66.15 L82.5 64.85 Z M82.5 64.3 L85.5 61.8 L91 66.3 L88.5 67.8 L82.5 70.3 Z M86.3 75.15 L85.75 76.3 L85.05 77.3 L84.25 78.25 L83.35 79.1 L82.35 79.8 L81.3 80.4 L80.15 80.85 L78.95 81.15 L77.75 81.35 L76.5 81.4 L76.5 75.4 L77.15 75.4 L77.75 75.3 L78.3 75.15 L78.75 74.95 L79.15 74.75 L79.55 74.45 L79.9 74.15 L80.25 73.7 L80.55 73.2 L80.9 72.6 Z M76.5 78.4 L66.5 76.9 L66.5 75.4 L76.5 75.4 Z",
      "M53 26.45 L53 56.15 L47 56.15 L47 25.45 Z M53 26.45 L54.5 27.45 L52 28.95 Z M47 56.15 L53 56.15 L51.8 57.95 L50 59.15 L48.2 57.95 Z M53 56.15 L52.35 62.4 L50.8 68.2 L48.3 73.45 L44.9 78.15 L40.6 82.3 L35.5 85.85 L29.6 88.8 L22.9 91.25 L15.4 93.1 L7.05 94.35 L6.9 93.45 L14.9 91.25 L22 88.7 L28.2 85.85 L33.45 82.65 L37.85 79.1 L41.3 75.2 L43.9 71 L45.7 66.45 L46.75 61.55 L47 56.15 Z",
      "M52.55 65.2 L54.75 68.8 L57.15 72 L59.75 74.95 L62.7 77.55 L66 79.9 L69.65 81.95 L73.65 83.75 L78.05 85.25 L82.85 86.5 L88.05 87.5 L86.9 94 L81.3 92.6 L76.15 90.85 L71.4 88.8 L67.1 86.4 L63.3 83.7 L59.9 80.65 L57.05 77.3 L54.7 73.65 L52.9 69.7 L51.7 65.5 Z M86.9 94 L88.05 87.5 L92.8 88.35 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.5 L46.75 15.5 L46.75 17.5 L6.45 17.5 Z M46.75 15.5 L36.75 16.5 L41.75 11 Z",
          "bounds": [
            6.45,
            11,
            46.75,
            17.5
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 7.3 L34.8 24.3 L28.8 27.3 L28.8 6.3 Z M34.8 7.3 L36.3 8.3 L33.8 9.8 Z",
          "bounds": [
            28.8,
            6.3,
            36.3,
            27.3
          ],
          "direction": "down",
          "weight": 18.9975
        }
      ],
      [
        {
          "outline": "M52.7 15.5 L93 15.5 L93 17.5 L52.7 17.5 Z M93 15.5 L81 16.5 L87 10.5 Z",
          "bounds": [
            52.7,
            10.5,
            93,
            17.5
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 7.3 L70.65 24.3 L64.65 27.3 L64.65 6.3 Z M70.65 7.3 L72.15 8.3 L69.65 9.8 Z",
          "bounds": [
            64.65,
            6.3,
            72.15,
            27.3
          ],
          "direction": "down",
          "weight": 18.9975
        }
      ],
      [
        {
          "outline": "M7.5 34.5 L92.5 34.5 L92.5 36.5 L7.5 36.5 Z M92.5 34.5 L80.5 35.5 L86.5 29.5 Z",
          "bounds": [
            7.5,
            29.5,
            92.5,
            36.5
          ],
          "direction": "right",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M14 43.2 L78 43.2 L78 45.2 L14 45.2 Z",
          "bounds": [
            14,
            43.2,
            78,
            45.2
          ],
          "direction": "right",
          "weight": 64
        },
        {
          "outline": "M81 44.2 L81 56.95 L75 59.95 L75 44.2 Z M75 43.2 L78 40.7 L83.5 45.2 L81 47.2 L75 44.2 Z",
          "bounds": [
            75,
            40.7,
            83.5,
            59.95
          ],
          "direction": "down",
          "weight": 10.7325
        }
      ],
      [
        {
          "outline": "M22 53.95 L78 53.95 L78 55.95 L22 55.95 Z",
          "bounds": [
            22,
            53.95,
            78,
            55.95
          ],
          "direction": "right",
          "weight": 56
        }
      ],
      [
        {
          "outline": "M25.15 54.85 L21.15 68.55 L14.55 69.75 L20.2 50.3 Z",
          "bounds": [
            14.55,
            50.3,
            25.15,
            69.75
          ],
          "direction": "left",
          "weight": 10.761609
        },
        {
          "outline": "M19 64.3 L85.5 64.3 L85.5 66.3 L19 66.3 Z",
          "bounds": [
            19,
            64.3,
            85.5,
            66.3
          ],
          "direction": "right",
          "weight": 66.5
        },
        {
          "outline": "M88.45 65.75 L88.25 67.05 L88.05 68.3 L87.85 69.45 L87.65 70.5 L87.45 71.45 L87.25 72.35 L87.05 73.15 L86.8 73.85 L86.6 74.55 L86.3 75.15 L80.9 72.6 L81 72.4 L81.1 72.05 L81.25 71.55 L81.4 70.9 L81.6 70.2 L81.75 69.35 L81.95 68.35 L82.1 67.3 L82.3 66.15 L82.5 64.85 Z M82.5 64.3 L85.5 61.8 L91 66.3 L88.5 67.8 L82.5 70.3 Z",
          "bounds": [
            80.9,
            61.8,
            91,
            75.15
          ],
          "direction": "curve",
          "weight": 8.795752,
          "revealPath": "M85.5 65.315 Q84.5 72.07249999999999 83.63309337856488 73.91034203744245",
          "revealWidth": 14
        },
        {
          "outline": "M86.3 75.15 L85.75 76.3 L85.05 77.3 L84.25 78.25 L83.35 79.1 L82.35 79.8 L81.3 80.4 L80.15 80.85 L78.95 81.15 L77.75 81.35 L76.5 81.4 L76.5 75.4 L77.15 75.4 L77.75 75.3 L78.3 75.15 L78.75 74.95 L79.15 74.75 L79.55 74.45 L79.9 74.15 L80.25 73.7 L80.55 73.2 L80.9 72.6 Z M76.5 78.4 L66.5 76.9 L66.5 75.4 L76.5 75.4 Z",
          "bounds": [
            66.5,
            72.6,
            86.3,
            81.4
          ],
          "direction": "curve",
          "weight": 8.445764,
          "revealPath": "M83.63309337856488 73.91034203744245 Q81.5 78.4325 76.5 78.4325",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53 26.45 L53 56.15 L47 56.15 L47 25.45 Z M53 26.45 L54.5 27.45 L52 28.95 Z M47 56.15 L53 56.15 L51.8 57.95 L50 59.15 L48.2 57.95 Z",
          "bounds": [
            47,
            25.45,
            54.5,
            59.15
          ],
          "direction": "down",
          "weight": 30.21
        },
        {
          "outline": "M53 56.15 L52.35 62.4 L50.8 68.2 L48.3 73.45 L44.9 78.15 L40.6 82.3 L35.5 85.85 L29.6 88.8 L22.9 91.25 L15.4 93.1 L7.05 94.35 L6.9 93.45 L14.9 91.25 L22 88.7 L28.2 85.85 L33.45 82.65 L37.85 79.1 L41.3 75.2 L43.9 71 L45.7 66.45 L46.75 61.55 L47 56.15 Z",
          "bounds": [
            6.9,
            56.15,
            53,
            94.35
          ],
          "direction": "curve",
          "weight": 57.227672,
          "revealPath": "M50 56.1725 Q50 86.3825 7 93.935",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M52.55 65.2 L54.75 68.8 L57.15 72 L59.75 74.95 L62.7 77.55 L66 79.9 L69.65 81.95 L73.65 83.75 L78.05 85.25 L82.85 86.5 L88.05 87.5 L86.9 94 L81.3 92.6 L76.15 90.85 L71.4 88.8 L67.1 86.4 L63.3 83.7 L59.9 80.65 L57.05 77.3 L54.7 73.65 L52.9 69.7 L51.7 65.5 Z M86.9 94 L88.05 87.5 L92.8 88.35 Z",
          "bounds": [
            51.7,
            65.2,
            92.8,
            94
          ],
          "direction": "curve",
          "weight": 43.90702,
          "revealPath": "M52 64.91749999999999 Q59.5 85.5875 87.5 90.755",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch202Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch202 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH202_STROKES = loadGlyphWikiBatch202Strokes(reviewed)
