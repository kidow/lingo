/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch62.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "坰",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "31d0f7a41280c68dae8521831acdf5b6a642e911b108c1b50638215baad94fd2",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      7,
      8,
      10
    ],
    "pathsSha256": "b486a87e338279b82752d62950571dce76865bf6a48c634a646a5533ea09cf42",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5770.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5770.svg",
      "dictionarySvgSha256": "5dc753b0b6e40cadb0e74410dd949778a44d6cb89feaa1f71c0777b15d7c510b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "58b79c3017fca4b9ad840a86abbaec0fe8c180f0dd735060501b9a40c01a942a",
      "geometryReviewSha256": "58b79c3017fca4b9ad840a86abbaec0fe8c180f0dd735060501b9a40c01a942a",
      "directionReviewSha256": "58b79c3017fca4b9ad840a86abbaec0fe8c180f0dd735060501b9a40c01a942a"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u5770-k@7",
      "revision": "u5770-k@7; u5770-j@3; u571f-01@12; u518b-08@3; u5182-j@2; u53e3-j@20",
      "editableSource": "/hanja-strokes/glyphwiki/5770.json",
      "modifications": "Original filled polygons scaled200 to100; source outer bar/down/corner/left hook and inner bar/down kept as continuous domestic strokes5/7. Original quadratic reveals retained. Polygon traversal normalized to preserve filled union with every vertex and first vertex unchanged. No authored centerline."
    },
    "paths": [
      "M7.3 34 L37.5 34 L37.5 36 L7.3 36 Z M37.5 34 L25.5 35 L31.5 29 Z",
      "M25 9.5 L25 71.5 L19 71.5 L19 8.5 Z M25 9.5 L26.5 10.5 L24 12 Z",
      "M6.7 75.5 L9.1 74.75 L11.7 73.9 L14.4 72.95 L17.25 71.9 L20.25 70.75 L23.45 69.55 L26.75 68.25 L30.2 66.85 L33.9 65.5 L37.75 64.05 L38.15 64.9 L34.75 67.15 L31.4 69.25 L28.15 71.2 L25.05 72.95 L22.05 74.6 L19.15 76.15 L16.35 77.55 L13.7 78.85 L11.2 80.05 L8.8 81.1 Z M8.8 81.1 L5.75 75.85 L6.7 75.5 Z M8.8 81.1 L11.1 78.65 L10.25 82.2 Z",
      "M46 13 L46 90.5 L40 93.5 L40 10 Z",
      "M43 13 L88.45 13 L88.45 15 L43 15 Z M91.45 14 L91.45 85 L85.45 85 L85.45 14 Z M85.45 13 L88.45 10.5 L93.95 15 L91.45 17 L85.45 14 Z M85.45 85 L91.45 85 L90.25 86.8 L88.45 88 L86.65 86.8 Z M91.45 85 L91.4 86.25 L91.2 87.5 L90.8 88.7 L90.15 89.85 L89.35 90.85 L88.35 91.65 L87.2 92.3 L86 92.7 L84.75 92.9 L83.45 93 L83.45 87 L84.1 86.95 L84.55 86.85 L84.85 86.75 L85 86.7 L85.1 86.6 L85.15 86.5 L85.25 86.35 L85.35 86.05 L85.45 85.6 L85.45 85 Z M83.45 90 L74.45 88.5 L74.45 87 L83.45 87 Z",
      "M60.65 33.8 L60.65 69.65 L54.65 72.65 L54.65 30.8 Z",
      "M57.65 33.8 L73.8 33.8 L73.8 35.8 L57.65 35.8 Z M76.8 34.8 L76.8 66.65 L70.8 69.65 L70.8 34.8 Z M70.8 33.8 L73.8 31.3 L79.3 35.8 L76.8 37.8 L70.8 34.8 Z",
      "M57.65 61.65 L73.8 61.65 L73.8 63.65 L57.65 63.65 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.3 34 L37.5 34 L37.5 36 L7.3 36 Z M37.5 34 L25.5 35 L31.5 29 Z",
          "bounds": [
            7.3,
            29,
            37.5,
            36
          ],
          "direction": "right",
          "weight": 30.24
        }
      ],
      [
        {
          "outline": "M25 9.5 L25 71.5 L19 71.5 L19 8.5 Z M25 9.5 L26.5 10.5 L24 12 Z",
          "bounds": [
            19,
            8.5,
            26.5,
            71.5
          ],
          "direction": "down",
          "weight": 61.5
        }
      ],
      [
        {
          "outline": "M6.7 75.5 L9.1 74.75 L11.7 73.9 L14.4 72.95 L17.25 71.9 L20.25 70.75 L23.45 69.55 L26.75 68.25 L30.2 66.85 L33.9 65.5 L37.75 64.05 L38.15 64.9 L34.75 67.15 L31.4 69.25 L28.15 71.2 L25.05 72.95 L22.05 74.6 L19.15 76.15 L16.35 77.55 L13.7 78.85 L11.2 80.05 L8.8 81.1 Z M8.8 81.1 L5.75 75.85 L6.7 75.5 Z M8.8 81.1 L11.1 78.65 L10.25 82.2 Z",
          "bounds": [
            5.75,
            64.05,
            38.15,
            82.2
          ],
          "direction": "curve",
          "weight": 33.705127,
          "revealPath": "M7.3 78.5 Q19.48 74 37.96 64.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46 13 L46 90.5 L40 93.5 L40 10 Z",
          "bounds": [
            40,
            10,
            46,
            93.5
          ],
          "direction": "down",
          "weight": 78
        }
      ],
      [
        {
          "outline": "M43 13 L88.45 13 L88.45 15 L43 15 Z",
          "bounds": [
            43,
            13,
            88.45,
            15
          ],
          "direction": "right",
          "weight": 45.492
        },
        {
          "outline": "M91.45 14 L91.45 85 L85.45 85 L85.45 14 Z M85.45 13 L88.45 10.5 L93.95 15 L91.45 17 L85.45 14 Z M85.45 85 L91.45 85 L90.25 86.8 L88.45 88 L86.65 86.8 Z",
          "bounds": [
            85.45,
            10.5,
            93.95,
            88
          ],
          "direction": "down",
          "weight": 71
        },
        {
          "outline": "M91.45 85 L91.4 86.25 L91.2 87.5 L90.8 88.7 L90.15 89.85 L89.35 90.85 L88.35 91.65 L87.2 92.3 L86 92.7 L84.75 92.9 L83.45 93 L83.45 87 L84.1 86.95 L84.55 86.85 L84.85 86.75 L85 86.7 L85.1 86.6 L85.15 86.5 L85.25 86.35 L85.35 86.05 L85.45 85.6 L85.45 85 Z",
          "bounds": [
            83.45,
            85,
            91.45,
            93
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M88.49600000000001 85 Q88.49600000000001 90 83.49600000000001 90",
          "revealWidth": 14
        },
        {
          "outline": "M83.45 90 L74.45 88.5 L74.45 87 L83.45 87 Z",
          "bounds": [
            74.45,
            87,
            83.45,
            90
          ],
          "direction": "left",
          "weight": 9
        }
      ],
      [
        {
          "outline": "M60.65 33.8 L60.65 69.65 L54.65 72.65 L54.65 30.8 Z",
          "bounds": [
            54.65,
            30.8,
            60.65,
            72.65
          ],
          "direction": "down",
          "weight": 27.81
        }
      ],
      [
        {
          "outline": "M57.65 33.8 L73.8 33.8 L73.8 35.8 L57.65 35.8 Z",
          "bounds": [
            57.65,
            33.8,
            73.8,
            35.8
          ],
          "direction": "right",
          "weight": 16.1675
        },
        {
          "outline": "M76.8 34.8 L76.8 66.65 L70.8 69.65 L70.8 34.8 Z M70.8 33.8 L73.8 31.3 L79.3 35.8 L76.8 37.8 L70.8 34.8 Z",
          "bounds": [
            70.8,
            31.3,
            79.3,
            69.65
          ],
          "direction": "down",
          "weight": 27.81
        }
      ],
      [
        {
          "outline": "M57.65 61.65 L73.8 61.65 L73.8 63.65 L57.65 63.65 Z",
          "bounds": [
            57.65,
            61.65,
            73.8,
            63.65
          ],
          "direction": "right",
          "weight": 16.1675
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch62Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch62 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH62_STROKES = loadGlyphWikiBatch62Strokes(reviewed)
