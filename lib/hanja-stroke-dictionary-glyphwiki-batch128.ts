/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch128.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "斨",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "d784fc961c1e974f63ae994fe3bac64a52aff30afbe29ad46b7fac4c619c09b9",
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
    "pathsSha256": "8149625fe4a22f3f460250e18d9e43e1849e95378aab12b6b1c345edfb31fe96",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65A8.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65A8.svg",
      "dictionarySvgSha256": "7b6038e0efcee3f8871c3a60babb0db5cb8ac563273e50606f93c9ecae6365b7",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "8cfbe4fb98f1155b7e0d7e3d3ed6616030bbd65e3ce6a57f3173ac84ff40bec2",
      "geometryReviewSha256": "8cfbe4fb98f1155b7e0d7e3d3ed6616030bbd65e3ce6a57f3173ac84ff40bec2",
      "directionReviewSha256": "8cfbe4fb98f1155b7e0d7e3d3ed6616030bbd65e3ce6a57f3173ac84ff40bec2"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/65a8.json",
      "modifications": "Whole 斨 u65a8 from pinned2016 GlyphWiki archive. Scale200 to100 using default mincho new Kage(). Original raw groups0;2+3;1;4;5;6;7;8 follow directly observed domestic8stroke order; only second/third strokes reordered. Preserve3originalquadratic primitives, all polygon vertices and exact compound endpoints; winding normalized only. No invented points, bridges, trimming, custom widths or component substitution."
    },
    "paths": [
      "M35.6 7 L35.6 91 L29.6 94 L29.6 6 Z M35.6 7 L37.1 8 L34.6 9.5 Z",
      "M17.3 12.5 L17.3 43 L11.3 46 L11.3 11.5 Z M17.3 12.5 L18.8 13.5 L16.3 15 Z M14.3 35 L32.6 35 L32.6 37 L14.3 37 Z",
      "M6.9 54 L32.6 54 L32.6 56 L6.9 56 Z",
      "M19.8 54 L19.8 63 L13.8 63 L13.8 54 Z M13.8 63 L19.8 63 L18.6 64.8 L16.8 66 L15 64.8 Z M19.8 63 L19.5 66.85 L19.05 70.6 L18.3 74.2 L17.35 77.65 L16.2 80.9 L14.8 84 L13.15 86.9 L11.25 89.6 L9.1 92.05 L6.75 94.25 L6.05 93.7 L7.6 90.95 L9 88.2 L10.25 85.4 L11.3 82.5 L12.15 79.55 L12.85 76.5 L13.4 73.3 L13.7 70 L13.85 66.55 L13.8 63 Z",
      "M86.75 14.95 L84.4 15.7 L81.85 16.45 L79.05 17.15 L76.05 17.9 L72.85 18.55 L69.4 19.25 L65.7 19.9 L61.8 20.5 L57.6 21 L53.2 21.4 L53 20.55 L57.2 19.15 L61.2 17.85 L64.95 16.7 L68.45 15.55 L71.75 14.5 L74.75 13.4 L77.55 12.35 L80.1 11.35 L82.4 10.35 L84.45 9.4 Z M84 9.6 L88.95 14 L86.75 14.95 Z M88.95 14 L89.05 15.6 L85.8 14.25 Z",
      "M56.1 19.5 L56.1 53.5 L50.1 53.5 L50.1 16.5 Z M50.1 53.5 L56.1 53.5 L54.9 55.3 L53.1 56.5 L51.3 55.3 Z M56.1 53.5 L55.75 59.35 L55.1 64.9 L54 70.05 L52.6 74.8 L50.8 79.15 L48.65 83.15 L46.1 86.65 L43.2 89.75 L39.95 92.3 L36.35 94.35 L35.85 93.6 L38.7 90.85 L41.25 87.9 L43.45 84.75 L45.3 81.3 L46.9 77.55 L48.15 73.45 L49.1 69 L49.75 64.2 L50.1 59 L50.1 53.5 Z",
      "M53.1 41 L94.3 41 L94.3 43 L53.1 43 Z M94.3 41 L82.3 42 L88.3 36 Z",
      "M78.75 41 L78.75 91 L72.75 94 L72.75 41 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M35.6 7 L35.6 91 L29.6 94 L29.6 6 Z M35.6 7 L37.1 8 L34.6 9.5 Z",
          "bounds": [
            29.6,
            6,
            37.1,
            94
          ],
          "direction": "down",
          "weight": 86
        }
      ],
      [
        {
          "outline": "M17.3 12.5 L17.3 43 L11.3 46 L11.3 11.5 Z M17.3 12.5 L18.8 13.5 L16.3 15 Z",
          "bounds": [
            11.3,
            11.5,
            18.8,
            46
          ],
          "direction": "down",
          "weight": 24
        },
        {
          "outline": "M14.3 35 L32.6 35 L32.6 37 L14.3 37 Z",
          "bounds": [
            14.3,
            35,
            32.6,
            37
          ],
          "direction": "right",
          "weight": 18.315
        }
      ],
      [
        {
          "outline": "M6.9 54 L32.6 54 L32.6 56 L6.9 56 Z",
          "bounds": [
            6.9,
            54,
            32.6,
            56
          ],
          "direction": "right",
          "weight": 25.74
        }
      ],
      [
        {
          "outline": "M19.8 54 L19.8 63 L13.8 63 L13.8 54 Z M13.8 63 L19.8 63 L18.6 64.8 L16.8 66 L15 64.8 Z",
          "bounds": [
            13.8,
            54,
            19.8,
            66
          ],
          "direction": "down",
          "weight": 8
        },
        {
          "outline": "M19.8 63 L19.5 66.85 L19.05 70.6 L18.3 74.2 L17.35 77.65 L16.2 80.9 L14.8 84 L13.15 86.9 L11.25 89.6 L9.1 92.05 L6.75 94.25 L6.05 93.7 L7.6 90.95 L9 88.2 L10.25 85.4 L11.3 82.5 L12.15 79.55 L12.85 76.5 L13.4 73.3 L13.7 70 L13.85 66.55 L13.8 63 Z",
          "bounds": [
            6.05,
            63,
            19.8,
            94.25
          ],
          "direction": "curve",
          "weight": 32.696422,
          "revealPath": "M16.805 63 Q16.805 82 6.41 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M86.75 14.95 L84.4 15.7 L81.85 16.45 L79.05 17.15 L76.05 17.9 L72.85 18.55 L69.4 19.25 L65.7 19.9 L61.8 20.5 L57.6 21 L53.2 21.4 L53 20.55 L57.2 19.15 L61.2 17.85 L64.95 16.7 L68.45 15.55 L71.75 14.5 L74.75 13.4 L77.55 12.35 L80.1 11.35 L82.4 10.35 L84.45 9.4 Z M84 9.6 L88.95 14 L86.75 14.95 Z M88.95 14 L89.05 15.6 L85.8 14.25 Z",
          "bounds": [
            53,
            9.4,
            89.05,
            21.4
          ],
          "direction": "curve",
          "weight": 34.166674,
          "revealPath": "M86.08 12 Q75.265 16.5 53.12 21",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M56.1 19.5 L56.1 53.5 L50.1 53.5 L50.1 16.5 Z M50.1 53.5 L56.1 53.5 L54.9 55.3 L53.1 56.5 L51.3 55.3 Z",
          "bounds": [
            50.1,
            16.5,
            56.1,
            56.5
          ],
          "direction": "down",
          "weight": 33
        },
        {
          "outline": "M56.1 53.5 L55.75 59.35 L55.1 64.9 L54 70.05 L52.6 74.8 L50.8 79.15 L48.65 83.15 L46.1 86.65 L43.2 89.75 L39.95 92.3 L36.35 94.35 L35.85 93.6 L38.7 90.85 L41.25 87.9 L43.45 84.75 L45.3 81.3 L46.9 77.55 L48.15 73.45 L49.1 69 L49.75 64.2 L50.1 59 L50.1 53.5 Z",
          "bounds": [
            35.85,
            53.5,
            56.1,
            94.35
          ],
          "direction": "curve",
          "weight": 43.921294,
          "revealPath": "M53.12 53.5 Q53.12 83 36.125 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.1 41 L94.3 41 L94.3 43 L53.1 43 Z M94.3 41 L82.3 42 L88.3 36 Z",
          "bounds": [
            53.1,
            36,
            94.3,
            43
          ],
          "direction": "right",
          "weight": 41.2
        }
      ],
      [
        {
          "outline": "M78.75 41 L78.75 91 L72.75 94 L72.75 41 Z",
          "bounds": [
            72.75,
            41,
            78.75,
            94
          ],
          "direction": "down",
          "weight": 50.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch128Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch128 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH128_STROKES = loadGlyphWikiBatch128Strokes(reviewed)
