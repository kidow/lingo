/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch227.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "莩",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "ef71dcad9d0d63fb216b5f63ef41db0d80fb59c9b278b1a6182795698a2806ab",
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
      10,
      13,
      12
    ],
    "pathsSha256": "8f1bdbf3eacc0f014fab1805253e67654aaefcc7756249b3e5ada345cdf303b9",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83a9.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83a9.svg",
      "dictionarySvgSha256": "24db9431325732ebfcb91926f83dc63ca87328c3a201feaab603e0bbfe1aaacc",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "23db941e26ecb68376634561d511034b95382b742ba044c7068a393c5720e2f1",
      "geometryReviewSha256": "23db941e26ecb68376634561d511034b95382b742ba044c7068a393c5720e2f1",
      "directionReviewSha256": "23db941e26ecb68376634561d511034b95382b742ba044c7068a393c5720e2f1"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u83a9-k/u83a9-ue0102/ufa5e-03/u8279-k03/u5b5a; individual glyph revisions unavailable; source SHA256 643c2dff9bf99ffdacde3b5bf9d010def9531da300697c2ed66ee5606f40172b",
      "editableSource": "/hanja-strokes/glyphwiki/83a9.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u83a9-k and only declared u83a9-ue0102/ufa5e-03/u8279-k03/u5b5a. Original13 raw groups include one type0 non-drawing separator at8; it is retained in source/proof and explicitly verified empty, not counted as a stroke. Preserve all12 nonempty source groups13 primitives,Q6/C0, original coordinates/polygons/defaults. Reorder grass raw3/raw2 for domestic3/4; domestic9 original connected raw9 line/raw10 Q at133,108.75; domestic10 original raw12 line/Q hook at101,172.25; domestic11 raw11 horizontal. Normalize200to100/winding only; no invented geometry, bridges, splitting, trimming, reversal, width changes or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.45 15.75 L46.75 15.75 L46.75 17.75 L6.45 17.75 Z M46.75 15.75 L36.75 16.75 L41.75 11.25 Z",
      "M34.8 6.75 L34.8 25.4 L28.8 28.4 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
      "M52.7 15.75 L93 15.75 L93 17.75 L52.7 17.75 Z M93 15.75 L81 16.75 L87 10.75 Z",
      "M70.65 6.75 L70.65 25.4 L64.65 28.4 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
      "M83.35 33.4 L78.75 33.85 L73.9 34.3 L68.85 34.75 L63.6 35.25 L58.1 35.75 L52.45 36.25 L46.55 36.75 L40.4 37.2 L34.1 37.6 L27.55 37.9 L27.4 37.05 L33.85 35.7 L40.1 34.55 L46.1 33.5 L51.95 32.5 L57.6 31.55 L63 30.65 L68.2 29.8 L73.2 29 L78 28.2 L82.6 27.45 Z M82.1 27.5 L88.4 32.75 L83.35 33.4 Z M88.4 32.75 L88.6 34.2 L84.8 32.2 Z",
      "M31.75 36.15 L30.55 39.35 L29.15 42.45 L27.6 45.4 L25.8 48.2 L23.8 50.85 L21.6 53.3 L19.2 55.65 L16.6 57.8 L13.8 59.75 L10.75 61.45 L10.2 60.75 L12.6 58.3 L14.8 55.85 L16.8 53.4 L18.65 50.9 L20.35 48.35 L21.8 45.75 L23.15 43.05 L24.25 40.3 L25.2 37.45 L25.95 34.55 Z M25.8 35 L26.2 33.7 L31.75 36.15 Z M31.75 36.15 L32.9 37.5 L30.1 38.3 Z",
      "M45.15 38.1 L46.95 38.95 L48.7 39.7 L50.35 40.6 L51.9 41.65 L53.3 42.75 L54.6 43.95 L55.75 45.3 L56.8 46.7 L57.7 48.2 L58.45 49.8 L52.7 51.5 L52.45 50.25 L52.15 49.05 L51.7 47.8 L51.1 46.55 L50.4 45.3 L49.55 44 L48.55 42.75 L47.45 41.4 L46.2 40.05 L44.7 38.85 Z M58.45 49.8 L58.15 52.1 L56.4 53.55 L54.15 53.25 L52.7 51.5 Z",
      "M67.6 36.85 L70.45 37.45 L73.15 38.1 L75.65 38.9 L78 39.8 L80.15 40.8 L82.1 41.9 L83.9 43.1 L85.55 44.4 L87 45.85 L88.25 47.4 L83.15 50.5 L82.5 49.3 L81.7 48.05 L80.65 46.8 L79.4 45.55 L77.9 44.25 L76.2 42.95 L74.3 41.7 L72.2 40.35 L69.85 39 L67.3 37.7 Z M88.25 47.4 L88.6 49.65 L87.25 51.5 L85 51.85 L83.15 50.5 Z",
      "M30.5 53.35 L66.5 53.35 L66.5 55.35 L30.5 55.35 Z M68.3 56.75 L66.55 57.8 L64.8 58.85 L63.1 59.85 L61.35 60.8 L59.6 61.7 L57.85 62.6 L56.1 63.45 L54.3 64.2 L52.5 64.9 L50.7 65.6 L50.25 64.85 L51.65 63.6 L53.05 62.25 L54.45 60.95 L55.9 59.7 L57.35 58.4 L58.8 57.15 L60.25 55.85 L61.75 54.55 L63.2 53.25 L64.7 51.95 Z M63.5 53.35 L66.5 50.85 L72 55.35 L69.5 56.85 L63.5 59.35 Z",
      "M53.5 65 L53.5 86.1 L47.5 86.1 L47.5 64 Z M53.5 65 L55 66 L52.5 67.5 Z M47.5 86.1 L53.5 86.1 L52.3 87.9 L50.5 89.1 L48.7 87.9 Z M53.5 86.1 L53.4 87.4 L53.2 88.65 L52.8 89.85 L52.15 90.95 L51.35 91.95 L50.35 92.8 L49.2 93.4 L48 93.8 L46.75 94.05 L45.5 94.1 L45.5 88.1 L46.1 88.05 L46.55 88 L46.85 87.9 L47 87.8 L47.1 87.75 L47.2 87.65 L47.25 87.45 L47.35 87.15 L47.45 86.7 L47.5 86.1 Z M45.5 91.1 L35.5 89.6 L35.5 88.1 L45.5 88.1 Z",
      "M9 71.75 L92 71.75 L92 73.75 L9 73.75 Z M92 71.75 L80 72.75 L86 66.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.75 L46.75 15.75 L46.75 17.75 L6.45 17.75 Z M46.75 15.75 L36.75 16.75 L41.75 11.25 Z",
          "bounds": [
            6.45,
            11.25,
            46.75,
            17.75
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.75 L34.8 25.4 L28.8 28.4 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
          "bounds": [
            28.8,
            5.75,
            36.3,
            28.4
          ],
          "direction": "down",
          "weight": 20.655
        }
      ],
      [
        {
          "outline": "M52.7 15.75 L93 15.75 L93 17.75 L52.7 17.75 Z M93 15.75 L81 16.75 L87 10.75 Z",
          "bounds": [
            52.7,
            10.75,
            93,
            17.75
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.75 L70.65 25.4 L64.65 28.4 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
          "bounds": [
            64.65,
            5.75,
            72.15,
            28.4
          ],
          "direction": "down",
          "weight": 20.655
        }
      ],
      [
        {
          "outline": "M83.35 33.4 L78.75 33.85 L73.9 34.3 L68.85 34.75 L63.6 35.25 L58.1 35.75 L52.45 36.25 L46.55 36.75 L40.4 37.2 L34.1 37.6 L27.55 37.9 L27.4 37.05 L33.85 35.7 L40.1 34.55 L46.1 33.5 L51.95 32.5 L57.6 31.55 L63 30.65 L68.2 29.8 L73.2 29 L78 28.2 L82.6 27.45 Z M82.1 27.5 L88.4 32.75 L83.35 33.4 Z M88.4 32.75 L88.6 34.2 L84.8 32.2 Z",
          "bounds": [
            27.4,
            27.45,
            88.6,
            37.9
          ],
          "direction": "curve",
          "weight": 56.451445,
          "revealPath": "M83.5 30.375 Q60.5 33.375 27.5 37.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M31.75 36.15 L30.55 39.35 L29.15 42.45 L27.6 45.4 L25.8 48.2 L23.8 50.85 L21.6 53.3 L19.2 55.65 L16.6 57.8 L13.8 59.75 L10.75 61.45 L10.2 60.75 L12.6 58.3 L14.8 55.85 L16.8 53.4 L18.65 50.9 L20.35 48.35 L21.8 45.75 L23.15 43.05 L24.25 40.3 L25.2 37.45 L25.95 34.55 Z M25.8 35 L26.2 33.7 L31.75 36.15 Z M31.75 36.15 L32.9 37.5 L30.1 38.3 Z",
          "bounds": [
            10.2,
            33.7,
            32.9,
            61.45
          ],
          "direction": "curve",
          "weight": 32.114055,
          "revealPath": "M29 34.875 Q24.5 51 10.5 61.125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.15 38.1 L46.95 38.95 L48.7 39.7 L50.35 40.6 L51.9 41.65 L53.3 42.75 L54.6 43.95 L55.75 45.3 L56.8 46.7 L57.7 48.2 L58.45 49.8 L52.7 51.5 L52.45 50.25 L52.15 49.05 L51.7 47.8 L51.1 46.55 L50.4 45.3 L49.55 44 L48.55 42.75 L47.45 41.4 L46.2 40.05 L44.7 38.85 Z M58.45 49.8 L58.15 52.1 L56.4 53.55 L54.15 53.25 L52.7 51.5 Z",
          "bounds": [
            44.7,
            38.1,
            58.45,
            53.55
          ],
          "direction": "curve",
          "weight": 18.021255,
          "revealPath": "M44.5 38.25 Q53.5 43.5 56 52.125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.6 36.85 L70.45 37.45 L73.15 38.1 L75.65 38.9 L78 39.8 L80.15 40.8 L82.1 41.9 L83.9 43.1 L85.55 44.4 L87 45.85 L88.25 47.4 L83.15 50.5 L82.5 49.3 L81.7 48.05 L80.65 46.8 L79.4 45.55 L77.9 44.25 L76.2 42.95 L74.3 41.7 L72.2 40.35 L69.85 39 L67.3 37.7 Z M88.25 47.4 L88.6 49.65 L87.25 51.5 L85 51.85 L83.15 50.5 Z",
          "bounds": [
            67.3,
            36.85,
            88.6,
            51.85
          ],
          "direction": "curve",
          "weight": 23.505651,
          "revealPath": "M67 37.125 Q81.5 42 86.5 50.25",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M30.5 53.35 L66.5 53.35 L66.5 55.35 L30.5 55.35 Z",
          "bounds": [
            30.5,
            53.35,
            66.5,
            55.35
          ],
          "direction": "right",
          "weight": 36
        },
        {
          "outline": "M68.3 56.75 L66.55 57.8 L64.8 58.85 L63.1 59.85 L61.35 60.8 L59.6 61.7 L57.85 62.6 L56.1 63.45 L54.3 64.2 L52.5 64.9 L50.7 65.6 L50.25 64.85 L51.65 63.6 L53.05 62.25 L54.45 60.95 L55.9 59.7 L57.35 58.4 L58.8 57.15 L60.25 55.85 L61.75 54.55 L63.2 53.25 L64.7 51.95 Z M63.5 53.35 L66.5 50.85 L72 55.35 L69.5 56.85 L63.5 59.35 Z",
          "bounds": [
            50.25,
            50.85,
            72,
            65.6
          ],
          "direction": "curve",
          "weight": 19.345946,
          "revealPath": "M66.5 54.375 Q58.5 60.375 50.5 65.25",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.5 65 L53.5 86.1 L47.5 86.1 L47.5 64 Z M53.5 65 L55 66 L52.5 67.5 Z M47.5 86.1 L53.5 86.1 L52.3 87.9 L50.5 89.1 L48.7 87.9 Z",
          "bounds": [
            47.5,
            64,
            55,
            89.1
          ],
          "direction": "down",
          "weight": 21.625
        },
        {
          "outline": "M53.5 86.1 L53.4 87.4 L53.2 88.65 L52.8 89.85 L52.15 90.95 L51.35 91.95 L50.35 92.8 L49.2 93.4 L48 93.8 L46.75 94.05 L45.5 94.1 L45.5 88.1 L46.1 88.05 L46.55 88 L46.85 87.9 L47 87.8 L47.1 87.75 L47.2 87.65 L47.25 87.45 L47.35 87.15 L47.45 86.7 L47.5 86.1 Z M45.5 91.1 L35.5 89.6 L35.5 88.1 L45.5 88.1 Z",
          "bounds": [
            35.5,
            86.1,
            53.5,
            94.1
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M50.5 86.125 Q50.5 91.125 45.5 91.125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M9 71.75 L92 71.75 L92 73.75 L9 73.75 Z M92 71.75 L80 72.75 L86 66.75 Z",
          "bounds": [
            9,
            66.75,
            92,
            73.75
          ],
          "direction": "right",
          "weight": 83
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch227Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch227 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH227_STROKES = loadGlyphWikiBatch227Strokes(reviewed)
