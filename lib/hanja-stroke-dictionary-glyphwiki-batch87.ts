/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch87.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "秊",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "06d48a0fa3907e8834660c07410b6f4533e4998acc6013fbe23951dae729472e",
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
    "pathsSha256": "88f2155c95e9e2312301109a4c835a6e34a92a681551a2ddc86b542aea907d32",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79CA.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/79CA.svg",
      "dictionarySvgSha256": "46a082878b097dc62b270614d85f5e5f7d4d37d4e29133f9c912aa73a31528fc",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "b75b8aedd1eda6d5a8a2bee80ae5bdfab41c3c72c4449e281d6d3f7ec79bad4a",
      "geometryReviewSha256": "b75b8aedd1eda6d5a8a2bee80ae5bdfab41c3c72c4449e281d6d3f7ec79bad4a",
      "directionReviewSha256": "b75b8aedd1eda6d5a8a2bee80ae5bdfab41c3c72c4449e281d6d3f7ec79bad4a"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/79ca.json",
      "modifications": "Whole 秊 u79ca source from the pinned 2016 GlyphWiki backup scaled200 to100. All eight original groups remain in domestic order. All four original quadratic trajectories and polygon vertices retained with normalized winding. No new point, bridge, trim, coordinate correction or component replacement."
    },
    "paths": [
      "M73.8 12.05 L69.55 12.8 L65 13.45 L60.2 14.1 L55.15 14.65 L49.75 15.2 L44.1 15.65 L38.15 16.05 L31.9 16.4 L25.4 16.6 L18.55 16.65 L18.5 15.75 L25.25 14.7 L31.65 13.7 L37.8 12.8 L43.65 11.9 L49.2 11 L54.5 10.05 L59.45 9.15 L64.1 8.15 L68.45 7.2 L72.5 6.2 Z M72 6.3 L77.9 11.15 L73.8 12.05 Z M77.9 11.15 L78.05 12.65 L74.4 10.9 Z",
      "M12.2 23.7 L90.2 23.7 L90.2 25.7 L12.2 25.7 Z M90.2 23.7 L78.2 24.7 L84.2 18.7 Z",
      "M53.7 12.5 L53.7 44.65 L47.7 47.65 L47.7 12.5 Z",
      "M51.8 24.7 L49.45 26.8 L46.4 29.5 L43.15 32.1 L39.7 34.5 L36.1 36.75 L32.3 38.85 L28.3 40.75 L24.1 42.55 L19.75 44.1 L15.15 45.5 L10.4 46.6 L10.1 45.75 L14.5 43.7 L18.7 41.65 L22.7 39.55 L26.55 37.4 L30.15 35.15 L33.55 32.85 L36.75 30.4 L39.75 27.9 L42.55 25.3 L43.1 24.7 Z",
      "M53.8 24.65 L57.75 26.85 L61.55 28.95 L65.2 30.95 L68.75 32.75 L72.25 34.35 L75.65 35.75 L78.95 36.95 L82.2 37.95 L85.4 38.75 L88.5 39.35 L87.05 45.8 L83.65 44.8 L80.3 43.55 L76.9 42.05 L73.5 40.4 L70.1 38.5 L66.7 36.35 L63.3 34 L59.9 31.4 L56.55 28.55 L53.25 25.35 Z M87.05 45.8 L88.5 39.35 L92.95 40.35 Z",
      "M77.6 51.45 L72 52.4 L66.15 53.25 L60.15 54.1 L53.85 54.8 L47.35 55.45 L40.65 56.05 L33.7 56.55 L26.55 56.95 L19.15 57.15 L11.5 57.25 L11.45 56.35 L19 55.25 L26.3 54.25 L33.35 53.25 L40.2 52.3 L46.85 51.25 L53.2 50.2 L59.35 49.1 L65.25 48 L70.95 46.8 L76.4 45.6 Z M75.9 45.7 L81.85 50.6 L77.6 51.45 Z M81.85 50.6 L82 52.1 L78.35 50.3 Z",
      "M7 67.15 L93 67.15 L93 69.15 L7 69.15 Z M93 67.15 L81 68.15 L87 62.15 Z",
      "M53 53.1 L53 90.95 L47 93.95 L47 53.1 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M73.8 12.05 L69.55 12.8 L65 13.45 L60.2 14.1 L55.15 14.65 L49.75 15.2 L44.1 15.65 L38.15 16.05 L31.9 16.4 L25.4 16.6 L18.55 16.65 L18.5 15.75 L25.25 14.7 L31.65 13.7 L37.8 12.8 L43.65 11.9 L49.2 11 L54.5 10.05 L59.45 9.15 L64.1 8.15 L68.45 7.2 L72.5 6.2 Z M72 6.3 L77.9 11.15 L73.8 12.05 Z M77.9 11.15 L78.05 12.65 L74.4 10.9 Z",
          "bounds": [
            18.5,
            6.2,
            78.05,
            16.65
          ],
          "direction": "curve",
          "weight": 55.550862,
          "revealPath": "M73.65 9.055 Q53.175 13.53 18.5625 16.215",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M12.2 23.7 L90.2 23.7 L90.2 25.7 L12.2 25.7 Z M90.2 23.7 L78.2 24.7 L84.2 18.7 Z",
          "bounds": [
            12.2,
            18.7,
            90.2,
            25.7
          ],
          "direction": "right",
          "weight": 78
        }
      ],
      [
        {
          "outline": "M53.7 12.5 L53.7 44.65 L47.7 47.65 L47.7 12.5 Z",
          "bounds": [
            47.7,
            12.5,
            53.7,
            47.65
          ],
          "direction": "down",
          "weight": 32.6675
        }
      ],
      [
        {
          "outline": "M51.8 24.7 L49.45 26.8 L46.4 29.5 L43.15 32.1 L39.7 34.5 L36.1 36.75 L32.3 38.85 L28.3 40.75 L24.1 42.55 L19.75 44.1 L15.15 45.5 L10.4 46.6 L10.1 45.75 L14.5 43.7 L18.7 41.65 L22.7 39.55 L26.55 37.4 L30.15 35.15 L33.55 32.85 L36.75 30.4 L39.75 27.9 L42.55 25.3 L43.1 24.7 Z",
          "bounds": [
            10.1,
            24.7,
            51.8,
            46.6
          ],
          "direction": "curve",
          "weight": 42.826311,
          "revealPath": "M47.325 24.7175 Q33.675 38.59 10.275 46.1975",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.8 24.65 L57.75 26.85 L61.55 28.95 L65.2 30.95 L68.75 32.75 L72.25 34.35 L75.65 35.75 L78.95 36.95 L82.2 37.95 L85.4 38.75 L88.5 39.35 L87.05 45.8 L83.65 44.8 L80.3 43.55 L76.9 42.05 L73.5 40.4 L70.1 38.5 L66.7 36.35 L63.3 34 L59.9 31.4 L56.55 28.55 L53.25 25.35 Z M87.05 45.8 L88.5 39.35 L92.95 40.35 Z",
          "bounds": [
            53.25,
            24.65,
            92.95,
            45.8
          ],
          "direction": "curve",
          "weight": 38.967104,
          "revealPath": "M53.175 24.7175 Q71.7 39.0375 87.7875 42.6175",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M77.6 51.45 L72 52.4 L66.15 53.25 L60.15 54.1 L53.85 54.8 L47.35 55.45 L40.65 56.05 L33.7 56.55 L26.55 56.95 L19.15 57.15 L11.5 57.25 L11.45 56.35 L19 55.25 L26.3 54.25 L33.35 53.25 L40.2 52.3 L46.85 51.25 L53.2 50.2 L59.35 49.1 L65.25 48 L70.95 46.8 L76.4 45.6 Z M75.9 45.7 L81.85 50.6 L77.6 51.45 Z M81.85 50.6 L82 52.1 L78.35 50.3 Z",
          "bounds": [
            11.45,
            45.6,
            82,
            57.25
          ],
          "direction": "curve",
          "weight": 66.528617,
          "revealPath": "M77.5 48.44 Q50 54.11 11.5 56.81",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7 67.15 L93 67.15 L93 69.15 L7 69.15 Z M93 67.15 L81 68.15 L87 62.15 Z",
          "bounds": [
            7,
            62.15,
            93,
            69.15
          ],
          "direction": "right",
          "weight": 86
        }
      ],
      [
        {
          "outline": "M53 53.1 L53 90.95 L47 93.95 L47 53.1 Z",
          "bounds": [
            47,
            53.1,
            53,
            93.95
          ],
          "direction": "down",
          "weight": 38.34
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch87Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch87 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH87_STROKES = loadGlyphWikiBatch87Strokes(reviewed)
