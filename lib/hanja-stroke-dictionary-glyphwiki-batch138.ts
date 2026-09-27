/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch138.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "炘",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "07167370e1de002ce0e129fb41c7c2bc819816b8578e5b8850884ad134f72cbc",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "pathsSha256": "d12da7c47a45987e30364eac722f0cbace4893ebdd2cbb2e87c6f416c0155df1",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7098.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7098.svg",
      "dictionarySvgSha256": "1a63168dfc47ca7439bd34c9dc6dccf107e4de7a20d098237e695dcd8b81c025",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "ab784edbd0756e34c77ca1b4617d15bf87e06768b84c280114ce4d3a0daeab72",
      "geometryReviewSha256": "ab784edbd0756e34c77ca1b4617d15bf87e06768b84c280114ce4d3a0daeab72",
      "directionReviewSha256": "ab784edbd0756e34c77ca1b4617d15bf87e06768b84c280114ce4d3a0daeab72"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/7098.json",
      "modifications": "Whole 炘 u7098 and its declared dependencies from the pinned 2016 GlyphWiki snapshot. Scale 200 to 100 using default mincho new Kage(). Original raw groups 0;1;2;3;5;6;7;8 follow domestic eight-stroke order; omit empty metadata group 4. Preserve all six original quadratic primitives, original polygon vertices and exact continuous third/sixth stroke endpoints. Normalize winding only. No invented points, bridges, trimming, custom widths or component substitution."
    },
    "paths": [
      "M12.65 26.9 L13.55 30.1 L14.25 33.15 L14.65 36.1 L14.9 38.95 L14.9 41.65 L14.7 44.25 L14.3 46.7 L13.7 49.05 L12.9 51.3 L11.85 53.35 L6.85 50.05 L7.85 48.7 L8.7 47.15 L9.5 45.35 L10.15 43.35 L10.7 41.15 L11.1 38.75 L11.4 36.15 L11.55 33.35 L11.7 30.3 L11.75 27.05 Z M11.85 53.35 L9.95 54.65 L7.7 54.25 L6.45 52.3 L6.85 50.05 Z",
      "M41.3 27.85 L40 29 L38.65 30.25 L37.2 31.55 L35.6 32.85 L33.95 34.25 L32.2 35.7 L30.35 37.2 L28.4 38.7 L26.25 40.2 L24.05 41.8 L23.45 41.15 L25.1 39 L26.65 36.95 L28.15 35 L29.65 33.15 L31.05 31.4 L32.35 29.7 L33.6 28.15 L34.75 26.6 L35.85 25.2 L36.85 23.85 Z M36.5 24.2 L37 23.65 L41.3 27.85 Z M41.3 27.85 L41.75 29.6 L38.9 29.05 Z",
      "M26.75 9.5 L26.75 47.5 L20.75 47.5 L20.75 8.5 Z M26.75 9.5 L28.25 10.5 L25.75 12 Z M20.75 47.5 L26.75 47.5 L25.55 49.3 L23.75 50.5 L21.95 49.3 Z M26.75 47.5 L26.4 53.75 L25.7 59.7 L24.6 65.25 L23.1 70.45 L21.25 75.25 L19 79.65 L16.35 83.65 L13.3 87.2 L9.9 90.3 L6.1 92.85 L5.55 92.1 L8.6 88.9 L11.25 85.5 L13.6 81.85 L15.6 77.9 L17.3 73.7 L18.65 69.15 L19.7 64.25 L20.35 59 L20.75 53.4 L20.75 47.5 Z",
      "M23.95 60.5 L26.25 62.1 L28.4 63.8 L30.4 65.5 L32.15 67.25 L33.8 69 L35.25 70.8 L36.6 72.6 L37.75 74.4 L38.75 76.25 L39.6 78.15 L33.85 79.95 L33.45 78.35 L32.95 76.7 L32.25 75 L31.45 73.25 L30.45 71.4 L29.3 69.5 L28 67.55 L26.6 65.5 L25.05 63.35 L23.35 61.15 Z M39.6 78.15 L39.35 80.4 L37.6 81.9 L35.35 81.7 L33.85 79.95 Z",
      "M86.05 14.95 L83.55 15.7 L80.8 16.45 L77.8 17.15 L74.6 17.9 L71.15 18.6 L67.4 19.25 L63.45 19.9 L59.25 20.5 L54.75 21 L50 21.4 L49.85 20.55 L54.4 19.15 L58.7 17.85 L62.75 16.7 L66.55 15.55 L70.1 14.45 L73.4 13.4 L76.4 12.35 L79.15 11.35 L81.65 10.35 L83.9 9.35 Z M83.4 9.55 L88.5 14 L86.05 14.95 Z M88.5 14 L88.6 15.55 L85.35 14.15 Z",
      "M52.9 19.5 L52.9 53.5 L46.9 53.5 L46.9 16.5 Z M46.9 53.5 L52.9 53.5 L51.7 55.3 L49.9 56.5 L48.1 55.3 Z M52.9 53.5 L52.55 59.4 L51.85 64.9 L50.7 70.05 L49.2 74.85 L47.25 79.2 L44.95 83.2 L42.25 86.7 L39.15 89.8 L35.65 92.35 L31.85 94.35 L31.35 93.6 L34.5 90.85 L37.25 87.9 L39.65 84.7 L41.7 81.25 L43.4 77.5 L44.8 73.4 L45.8 68.95 L46.55 64.15 L46.9 59 L46.9 53.5 Z",
      "M49.9 41 L94.3 41 L94.3 43 L49.9 43 Z M94.3 41 L82.3 42 L88.3 36 Z",
      "M77.35 41 L77.35 91 L71.35 94 L71.35 41 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M12.65 26.9 L13.55 30.1 L14.25 33.15 L14.65 36.1 L14.9 38.95 L14.9 41.65 L14.7 44.25 L14.3 46.7 L13.7 49.05 L12.9 51.3 L11.85 53.35 L6.85 50.05 L7.85 48.7 L8.7 47.15 L9.5 45.35 L10.15 43.35 L10.7 41.15 L11.1 38.75 L11.4 36.15 L11.55 33.35 L11.7 30.3 L11.75 27.05 Z M11.85 53.35 L9.95 54.65 L7.7 54.25 L6.45 52.3 L6.85 50.05 Z",
          "bounds": [
            6.45,
            26.9,
            14.9,
            54.65
          ],
          "direction": "curve",
          "weight": 26.740725,
          "revealPath": "M12.135 26.5 Q14.82 43.5 8.555 53",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M41.3 27.85 L40 29 L38.65 30.25 L37.2 31.55 L35.6 32.85 L33.95 34.25 L32.2 35.7 L30.35 37.2 L28.4 38.7 L26.25 40.2 L24.05 41.8 L23.45 41.15 L25.1 39 L26.65 36.95 L28.15 35 L29.65 33.15 L31.05 31.4 L32.35 29.7 L33.6 28.15 L34.75 26.6 L35.85 25.2 L36.85 23.85 Z M36.5 24.2 L37 23.65 L41.3 27.85 Z M41.3 27.85 L41.75 29.6 L38.9 29.05 Z",
          "bounds": [
            23.45,
            23.65,
            41.75,
            41.8
          ],
          "direction": "curve",
          "weight": 22.39004,
          "revealPath": "M39.4325 25.5 Q33.615 32 23.77 41.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.75 9.5 L26.75 47.5 L20.75 47.5 L20.75 8.5 Z M26.75 9.5 L28.25 10.5 L25.75 12 Z M20.75 47.5 L26.75 47.5 L25.55 49.3 L23.75 50.5 L21.95 49.3 Z",
          "bounds": [
            20.75,
            8.5,
            28.25,
            50.5
          ],
          "direction": "down",
          "weight": 38.5
        },
        {
          "outline": "M26.75 47.5 L26.4 53.75 L25.7 59.7 L24.6 65.25 L23.1 70.45 L21.25 75.25 L19 79.65 L16.35 83.65 L13.3 87.2 L9.9 90.3 L6.1 92.85 L5.55 92.1 L8.6 88.9 L11.25 85.5 L13.6 81.85 L15.6 77.9 L17.3 73.7 L18.65 69.15 L19.7 64.25 L20.35 59 L20.75 53.4 L20.75 47.5 Z",
          "bounds": [
            5.55,
            47.5,
            26.75,
            92.85
          ],
          "direction": "curve",
          "weight": 48.429433,
          "revealPath": "M23.77 47.5 Q23.77 79 5.87 92.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M23.95 60.5 L26.25 62.1 L28.4 63.8 L30.4 65.5 L32.15 67.25 L33.8 69 L35.25 70.8 L36.6 72.6 L37.75 74.4 L38.75 76.25 L39.6 78.15 L33.85 79.95 L33.45 78.35 L32.95 76.7 L32.25 75 L31.45 73.25 L30.45 71.4 L29.3 69.5 L28 67.55 L26.6 65.5 L25.05 63.35 L23.35 61.15 Z M39.6 78.15 L39.35 80.4 L37.6 81.9 L35.35 81.7 L33.85 79.95 Z",
          "bounds": [
            23.35,
            60.5,
            39.6,
            81.9
          ],
          "direction": "curve",
          "weight": 24.340219,
          "revealPath": "M23.3225 60.5 Q34.0625 70.5 37.195 80.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M86.05 14.95 L83.55 15.7 L80.8 16.45 L77.8 17.15 L74.6 17.9 L71.15 18.6 L67.4 19.25 L63.45 19.9 L59.25 20.5 L54.75 21 L50 21.4 L49.85 20.55 L54.4 19.15 L58.7 17.85 L62.75 16.7 L66.55 15.55 L70.1 14.45 L73.4 13.4 L76.4 12.35 L79.15 11.35 L81.65 10.35 L83.9 9.35 Z M83.4 9.55 L88.5 14 L86.05 14.95 Z M88.5 14 L88.6 15.55 L85.35 14.15 Z",
          "bounds": [
            49.85,
            9.35,
            88.6,
            21.4
          ],
          "direction": "curve",
          "weight": 36.642467,
          "revealPath": "M85.46 12 Q73.805 16.5 49.94 21",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M52.9 19.5 L52.9 53.5 L46.9 53.5 L46.9 16.5 Z M46.9 53.5 L52.9 53.5 L51.7 55.3 L49.9 56.5 L48.1 55.3 Z",
          "bounds": [
            46.9,
            16.5,
            52.9,
            56.5
          ],
          "direction": "down",
          "weight": 33
        },
        {
          "outline": "M52.9 53.5 L52.55 59.4 L51.85 64.9 L50.7 70.05 L49.2 74.85 L47.25 79.2 L44.95 83.2 L42.25 86.7 L39.15 89.8 L35.65 92.35 L31.85 94.35 L31.35 93.6 L34.5 90.85 L37.25 87.9 L39.65 84.7 L41.7 81.25 L43.4 77.5 L44.8 73.4 L45.8 68.95 L46.55 64.15 L46.9 59 L46.9 53.5 Z",
          "bounds": [
            31.35,
            53.5,
            52.9,
            94.35
          ],
          "direction": "curve",
          "weight": 44.448726,
          "revealPath": "M49.94 53.5 Q49.94 83 31.625 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.9 41 L94.3 41 L94.3 43 L49.9 43 Z M94.3 41 L82.3 42 L88.3 36 Z",
          "bounds": [
            49.9,
            36,
            94.3,
            43
          ],
          "direction": "right",
          "weight": 44.4
        }
      ],
      [
        {
          "outline": "M77.35 41 L77.35 91 L71.35 94 L71.35 41 Z",
          "bounds": [
            71.35,
            41,
            77.35,
            94
          ],
          "direction": "down",
          "weight": 50.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch138Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch138 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH138_STROKES = loadGlyphWikiBatch138Strokes(reviewed)
