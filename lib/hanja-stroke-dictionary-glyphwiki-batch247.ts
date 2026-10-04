/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch247.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "菫",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "dcf24ded2269d664787752e73b3d5599e056e1e43106eade5a8e6bc448728345",
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
      11,
      12,
      10,
      13
    ],
    "pathsSha256": "9f9a46d47eb1d52b7428587cd428179b1ee9e8324d0c090911e7148259dd0557",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83eb.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83eb.svg",
      "dictionarySvgSha256": "331d1bcb98c09d4c8f34ad1f1d02474c475a720a672451e56d47c8f8e2c0ab86",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "36336f01234b8f7623fee5b4a78e64ea227b5067c1202d727de7789b2923ea18",
      "geometryReviewSha256": "36336f01234b8f7623fee5b4a78e64ea227b5067c1202d727de7789b2923ea18",
      "directionReviewSha256": "36336f01234b8f7623fee5b4a78e64ea227b5067c1202d727de7789b2923ea18"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u83eb-k/u83eb-ue0102/ufa5e-03/u8279-k03/cdp-8a6d; individual glyph revisions unavailable; source SHA256 7b377d11ed90e16613d290fd33e876ae8d01a893f6ae67f5e5b9dc5fadf48ab6",
      "editableSource": "/hanja-strokes/glyphwiki/83eb.json",
      "modifications": "All12 domestic directions/cumulative/full form and108 progressive frames reviewed in Codex in-app browser. Exact whole u83eb-k/u83eb-ue0102 and declared ufa5e-03/u8279-k03/cdp-8a6d from pinned archive. Original13 raw groups13 line drawing primitives,Q0/C0 and original coordinates/polygons/default mincho preserved. Domestic grass order swaps raw2/3. Domestic7 fold follows raw6 into raw7 at154,88.46. Domestic9/10 lower horizontal raw10/11 precede domestic11 central vertical raw9, established by all domestic cumulative states. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.45 15.85 L46.75 15.85 L46.75 17.85 L6.45 17.85 Z M46.75 15.85 L36.75 16.85 L41.75 11.35 Z",
      "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
      "M52.7 15.85 L93 15.85 L93 17.85 L52.7 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
      "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
      "M14 33 L86 33 L86 35 L14 35 Z M86 33 L76 34 L81 28.5 Z",
      "M25 43.2 L25 58.85 L19 61.85 L19 40.2 Z",
      "M22 43.2 L77 43.2 L77 45.2 L22 45.2 Z M80 44.2 L80 58.35 L74 61.35 L74 44.2 Z M74 43.2 L77 40.7 L82.5 45.2 L80 47.2 L74 44.2 Z",
      "M22 55.35 L77 55.35 L77 57.35 L22 57.35 Z",
      "M14.5 67.15 L85.5 67.15 L85.5 69.15 L14.5 69.15 Z M85.5 67.15 L75.5 68.15 L80.5 62.65 Z",
      "M20.5 78.25 L79 78.25 L79 80.25 L20.5 80.25 Z M79 78.25 L69 79.25 L74 73.75 Z",
      "M52.5 33.9 L52.5 92.75 L46.5 92.75 L46.5 33.9 Z",
      "M10 90.75 L92 90.75 L92 92.75 L10 92.75 Z M92 90.75 L80 91.75 L86 85.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.85 L46.75 15.85 L46.75 17.85 L6.45 17.85 Z M46.75 15.85 L36.75 16.85 L41.75 11.35 Z",
          "bounds": [
            6.45,
            11.35,
            46.75,
            17.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
          "bounds": [
            28.8,
            5.45,
            36.3,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M52.7 15.85 L93 15.85 L93 17.85 L52.7 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
          "bounds": [
            52.7,
            10.85,
            93,
            17.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
          "bounds": [
            64.65,
            5.45,
            72.15,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M14 33 L86 33 L86 35 L14 35 Z M86 33 L76 34 L81 28.5 Z",
          "bounds": [
            14,
            28.5,
            86,
            35
          ],
          "direction": "right",
          "weight": 72
        }
      ],
      [
        {
          "outline": "M25 43.2 L25 58.85 L19 61.85 L19 40.2 Z",
          "bounds": [
            19,
            40.2,
            25,
            61.85
          ],
          "direction": "down",
          "weight": 12.155
        }
      ],
      [
        {
          "outline": "M22 43.2 L77 43.2 L77 45.2 L22 45.2 Z",
          "bounds": [
            22,
            43.2,
            77,
            45.2
          ],
          "direction": "right",
          "weight": 55
        },
        {
          "outline": "M80 44.2 L80 58.35 L74 61.35 L74 44.2 Z M74 43.2 L77 40.7 L82.5 45.2 L80 47.2 L74 44.2 Z",
          "bounds": [
            74,
            40.7,
            82.5,
            61.35
          ],
          "direction": "down",
          "weight": 12.155
        }
      ],
      [
        {
          "outline": "M22 55.35 L77 55.35 L77 57.35 L22 57.35 Z",
          "bounds": [
            22,
            55.35,
            77,
            57.35
          ],
          "direction": "right",
          "weight": 55
        }
      ],
      [
        {
          "outline": "M14.5 67.15 L85.5 67.15 L85.5 69.15 L14.5 69.15 Z M85.5 67.15 L75.5 68.15 L80.5 62.65 Z",
          "bounds": [
            14.5,
            62.65,
            85.5,
            69.15
          ],
          "direction": "right",
          "weight": 71
        }
      ],
      [
        {
          "outline": "M20.5 78.25 L79 78.25 L79 80.25 L20.5 80.25 Z M79 78.25 L69 79.25 L74 73.75 Z",
          "bounds": [
            20.5,
            73.75,
            79,
            80.25
          ],
          "direction": "right",
          "weight": 58.5
        }
      ],
      [
        {
          "outline": "M52.5 33.9 L52.5 92.75 L46.5 92.75 L46.5 33.9 Z",
          "bounds": [
            46.5,
            33.9,
            52.5,
            92.75
          ],
          "direction": "down",
          "weight": 56.8425
        }
      ],
      [
        {
          "outline": "M10 90.75 L92 90.75 L92 92.75 L10 92.75 Z M92 90.75 L80 91.75 L86 85.75 Z",
          "bounds": [
            10,
            85.75,
            92,
            92.75
          ],
          "direction": "right",
          "weight": 82
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch247Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch247 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH247_STROKES = loadGlyphWikiBatch247Strokes(reviewed)
