/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch204.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "堈",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "6bb73f6fb522e343b0865378e0649d36317b1a887e7db34ec7b7bd3a0688c003",
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
      11,
      12,
      13
    ],
    "pathsSha256": "d175edcd8810e95fc4ca6e1e6b7262c9c4bb0140f1693a39494f9bedf677fb6c",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5808.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5800/5808.svg",
      "dictionarySvgSha256": "81247b3f2b965b56637628532d21c7ab03e8551fe094a5369125e7bed8fada07",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "50384a0c6de6b29a436991462b3c591a5551a4af1b894b7e73850f1d4c892083",
      "geometryReviewSha256": "50384a0c6de6b29a436991462b3c591a5551a4af1b894b7e73850f1d4c892083",
      "directionReviewSha256": "50384a0c6de6b29a436991462b3c591a5551a4af1b894b7e73850f1d4c892083"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u5808-k/u5808/u571f-01/u5ca1-08/u5182; individual glyph revisions unavailable; source SHA256 61ac80ffa8f13b6211d5ea9d4bbfcbcad51959e4ce08f3ae8c138b1e1584e2f6",
      "editableSource": "/hanja-strokes/glyphwiki/5808.json",
      "modifications": "All11 domestic directional/cumulative states, complete form and99 progressive frames reviewed in Codex in-app browser. Exact whole u5808-k -> u5808 and only declared u571f-01/u5ca1-08/u5182. Five historical archive records; individual glyph revisions unavailable. No radical transplant. Domestic5 original horizontal-to-vertical join177.5084,27.42 and vertical-to-hook join177.5084,171.7 are continuous. Domestic10 original down-to-right join105.97,144 is continuous. Raw groups0;1;2;3;4,5;6;7;8;9;10,11;12. All13 original source groups,14 draw primitives,four quadratic paths, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Continuous structural primitives follow the observed domestic pen trajectory without added geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M7.5 34 L36.3 34 L36.3 36 L7.5 36 Z M36.3 34 L26.3 35 L31.3 29.5 Z",
      "M24.5 9.5 L24.5 71.5 L18.5 71.5 L18.5 8.5 Z M24.5 9.5 L26 10.5 L23.5 12 Z",
      "M6.85 75.5 L9.15 74.75 L11.6 73.9 L14.15 72.95 L16.9 71.9 L19.75 70.75 L22.8 69.55 L25.95 68.25 L29.3 66.9 L32.8 65.5 L36.45 64.1 L36.9 64.85 L33.65 67.15 L30.5 69.25 L27.45 71.15 L24.45 72.95 L21.6 74.6 L18.85 76.1 L16.25 77.55 L13.7 78.8 L11.3 80 L9.05 81.1 Z M9.05 81.1 L5.9 75.85 L6.85 75.5 Z M9.05 81.1 L11.3 78.6 L10.5 82.15 Z",
      "M44.45 12.7 L44.45 91.5 L38.95 94.25 L38.95 9.95 Z",
      "M41.7 12.7 L88.75 12.7 L88.75 14.7 L41.7 14.7 Z M91.5 13.7 L91.5 85.85 L86 85.85 L86 13.7 Z M86 12.7 L88.75 10.2 L94 14.7 L91.5 16.45 L86 13.7 Z M86 85.85 L91.5 85.85 L90.4 87.5 L88.75 88.6 L87.1 87.5 Z M91.5 85.85 L91.4 87.05 L91.25 88.2 L90.9 89.35 L90.4 90.4 L89.7 91.4 L88.8 92.2 L87.8 92.85 L86.7 93.25 L85.55 93.5 L84.35 93.6 L84.35 88.1 L84.85 88.05 L85.15 88 L85.4 87.9 L85.5 87.85 L85.55 87.75 L85.65 87.65 L85.75 87.4 L85.85 87.05 L85.95 86.5 L86 85.85 Z M84.35 90.85 L76.65 89.45 L76.65 88.1 L84.35 88.1 Z",
      "M51.4 17 L52.95 18.2 L54.45 19.35 L55.85 20.6 L57.15 21.95 L58.3 23.35 L59.35 24.85 L60.25 26.4 L61.1 28.05 L61.8 29.75 L62.35 31.5 L56.45 32.5 L56.35 31.1 L56.15 29.65 L55.85 28.2 L55.45 26.75 L54.9 25.25 L54.3 23.8 L53.6 22.25 L52.8 20.75 L51.9 19.15 L50.8 17.65 Z M62.35 31.5 L61.8 33.7 L59.9 34.95 L57.7 34.45 L56.45 32.5 Z",
      "M79.5 19.1 L78.65 20.65 L77.75 22.25 L76.75 23.9 L75.7 25.7 L74.55 27.5 L73.3 29.4 L71.95 31.4 L70.5 33.45 L68.95 35.55 L67.3 37.7 L66.5 37.25 L67.45 34.7 L68.35 32.25 L69.2 29.95 L70.05 27.75 L70.85 25.65 L71.6 23.7 L72.3 21.8 L72.9 20.05 L73.5 18.35 L73.95 16.8 Z M73.8 17.25 L74.25 16.15 L79.5 19.1 Z M79.5 19.1 L80.5 20.6 L77.6 21 Z",
      "M45.7 36.5 L84.2 36.5 L84.2 38.5 L45.7 38.5 Z M84.2 36.5 L72.2 37.5 L78.2 31.5 Z",
      "M68.25 36.5 L68.25 73 L62.25 73 L62.25 36.5 Z",
      "M55.7 47.5 L55.7 79 L50.2 81.75 L50.2 46.5 Z M55.7 47.5 L57.1 48.5 L54.7 50 Z M52.95 71 L77.5 71 L77.5 73 L52.95 73 Z",
      "M80.25 47.5 L80.25 76 L74.75 78.75 L74.75 46.5 Z M80.25 47.5 L81.6 48.5 L79.25 50 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.5 34 L36.3 34 L36.3 36 L7.5 36 Z M36.3 34 L26.3 35 L31.3 29.5 Z",
          "bounds": [
            7.5,
            29.5,
            36.3,
            36
          ],
          "direction": "right",
          "weight": 28.8
        }
      ],
      [
        {
          "outline": "M24.5 9.5 L24.5 71.5 L18.5 71.5 L18.5 8.5 Z M24.5 9.5 L26 10.5 L23.5 12 Z",
          "bounds": [
            18.5,
            8.5,
            26,
            71.5
          ],
          "direction": "down",
          "weight": 61.5
        }
      ],
      [
        {
          "outline": "M6.85 75.5 L9.15 74.75 L11.6 73.9 L14.15 72.95 L16.9 71.9 L19.75 70.75 L22.8 69.55 L25.95 68.25 L29.3 66.9 L32.8 65.5 L36.45 64.1 L36.9 64.85 L33.65 67.15 L30.5 69.25 L27.45 71.15 L24.45 72.95 L21.6 74.6 L18.85 76.1 L16.25 77.55 L13.7 78.8 L11.3 80 L9.05 81.1 Z M9.05 81.1 L5.9 75.85 L6.85 75.5 Z M9.05 81.1 L11.3 78.6 L10.5 82.15 Z",
          "bounds": [
            5.9,
            64.1,
            36.9,
            82.15
          ],
          "direction": "curve",
          "weight": 32.382711,
          "revealPath": "M7.5 78.5 Q19.1 74 36.7 64.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M44.45 12.7 L44.45 91.5 L38.95 94.25 L38.95 9.95 Z",
          "bounds": [
            38.95,
            9.95,
            44.45,
            94.25
          ],
          "direction": "down",
          "weight": 79.17
        }
      ],
      [
        {
          "outline": "M41.7 12.7 L88.75 12.7 L88.75 14.7 L41.7 14.7 Z",
          "bounds": [
            41.7,
            12.7,
            88.75,
            14.7
          ],
          "direction": "right",
          "weight": 47.0084
        },
        {
          "outline": "M91.5 13.7 L91.5 85.85 L86 85.85 L86 13.7 Z M86 12.7 L88.75 10.2 L94 14.7 L91.5 16.45 L86 13.7 Z M86 85.85 L91.5 85.85 L90.4 87.5 L88.75 88.6 L87.1 87.5 Z",
          "bounds": [
            86,
            10.2,
            94,
            88.6
          ],
          "direction": "down",
          "weight": 72.14
        },
        {
          "outline": "M91.5 85.85 L91.4 87.05 L91.25 88.2 L90.9 89.35 L90.4 90.4 L89.7 91.4 L88.8 92.2 L87.8 92.85 L86.7 93.25 L85.55 93.5 L84.35 93.6 L84.35 88.1 L84.85 88.05 L85.15 88 L85.4 87.9 L85.5 87.85 L85.55 87.75 L85.65 87.65 L85.75 87.4 L85.85 87.05 L85.95 86.5 L86 85.85 Z M84.35 90.85 L76.65 89.45 L76.65 88.1 L84.35 88.1 Z",
          "bounds": [
            76.65,
            85.85,
            91.5,
            93.6
          ],
          "direction": "curve",
          "weight": 6.643841,
          "revealPath": "M88.7542 85.85 Q88.7542 90.85 84.3792 90.85",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M51.4 17 L52.95 18.2 L54.45 19.35 L55.85 20.6 L57.15 21.95 L58.3 23.35 L59.35 24.85 L60.25 26.4 L61.1 28.05 L61.8 29.75 L62.35 31.5 L56.45 32.5 L56.35 31.1 L56.15 29.65 L55.85 28.2 L55.45 26.75 L54.9 25.25 L54.3 23.8 L53.6 22.25 L52.8 20.75 L51.9 19.15 L50.8 17.65 Z M62.35 31.5 L61.8 33.7 L59.9 34.95 L57.7 34.45 L56.45 32.5 Z",
          "bounds": [
            50.8,
            17,
            62.35,
            34.95
          ],
          "direction": "curve",
          "weight": 18.756769,
          "revealPath": "M50.755 17 Q58.0025 24 59.675 33.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M79.5 19.1 L78.65 20.65 L77.75 22.25 L76.75 23.9 L75.7 25.7 L74.55 27.5 L73.3 29.4 L71.95 31.4 L70.5 33.45 L68.95 35.55 L67.3 37.7 L66.5 37.25 L67.45 34.7 L68.35 32.25 L69.2 29.95 L70.05 27.75 L70.85 25.65 L71.6 23.7 L72.3 21.8 L72.9 20.05 L73.5 18.35 L73.95 16.8 Z M73.8 17.25 L74.25 16.15 L79.5 19.1 Z M79.5 19.1 L80.5 20.6 L77.6 21 Z",
          "bounds": [
            66.5,
            16.15,
            80.5,
            37.7
          ],
          "direction": "curve",
          "weight": 22.376354,
          "revealPath": "M76.9575 17.5 Q73.6125 25.5 66.9225 37.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.7 36.5 L84.2 36.5 L84.2 38.5 L45.7 38.5 Z M84.2 36.5 L72.2 37.5 L78.2 31.5 Z",
          "bounds": [
            45.7,
            31.5,
            84.2,
            38.5
          ],
          "direction": "right",
          "weight": 38.4675
        }
      ],
      [
        {
          "outline": "M68.25 36.5 L68.25 73 L62.25 73 L62.25 36.5 Z",
          "bounds": [
            62.25,
            36.5,
            68.25,
            73
          ],
          "direction": "down",
          "weight": 34.5
        }
      ],
      [
        {
          "outline": "M55.7 47.5 L55.7 79 L50.2 81.75 L50.2 46.5 Z M55.7 47.5 L57.1 48.5 L54.7 50 Z",
          "bounds": [
            50.2,
            46.5,
            57.1,
            81.75
          ],
          "direction": "down",
          "weight": 25
        },
        {
          "outline": "M52.95 71 L77.5 71 L77.5 73 L52.95 73 Z",
          "bounds": [
            52.95,
            71,
            77.5,
            73
          ],
          "direction": "right",
          "weight": 24.53
        }
      ],
      [
        {
          "outline": "M80.25 47.5 L80.25 76 L74.75 78.75 L74.75 46.5 Z M80.25 47.5 L81.6 48.5 L79.25 50 Z",
          "bounds": [
            74.75,
            46.5,
            81.6,
            78.75
          ],
          "direction": "down",
          "weight": 25
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch204Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch204 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH204_STROKES = loadGlyphWikiBatch204Strokes(reviewed)

