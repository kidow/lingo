/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch64.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "旴",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "14b7eeb4056d834a02a1121a4978a07c49d405f4287cd6287accf87a1739420d",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      5,
      6,
      7,
      8
    ],
    "pathsSha256": "8ee25ffd46415a408cc99ea871467f16364ca7c4a659d7f920bb77548fc2737f",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65F4.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65F4.svg",
      "dictionarySvgSha256": "765057b4be229e0971a373111879c5de20ac521583fb49b565e8f6da875b3a24",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "c659927665d5a767d71a257c5ac3254afa8a58a7f1f0dae2ab1f2929ff182103",
      "geometryReviewSha256": "c659927665d5a767d71a257c5ac3254afa8a58a7f1f0dae2ab1f2929ff182103",
      "directionReviewSha256": "c659927665d5a767d71a257c5ac3254afa8a58a7f1f0dae2ab1f2929ff182103"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u65f4-k@8",
      "revision": "u65f4-k@8; u65f4-j@3; u65e5-01@10; u4e8e-02@6",
      "editableSource": "/hanja-strokes/glyphwiki/65f4.json",
      "modifications": "Original whole-glyph polygons scaled200 to100. Group the shared-point 日 upper bar/down; retain the exact 于 vertical-to-quadratic connection and separate left terminal polygon. Normalize polygon traversal with all vertices and first vertices preserved. No new centerline, bridge, point correction or component replacement."
    },
    "paths": [
      "M15.15 18 L15.15 82 L9.15 85 L9.15 15 Z",
      "M12.15 18 L31.75 18 L31.75 20 L12.15 20 Z M34.75 19 L34.75 79 L28.75 82 L28.75 19 Z M28.75 18 L31.75 15.5 L37.25 20 L34.75 22 L28.75 19 Z",
      "M12.15 46 L31.75 46 L31.75 48 L12.15 48 Z",
      "M12.15 74 L31.75 74 L31.75 76 L12.15 76 Z",
      "M40.85 15.5 L89.25 15.5 L89.25 17.5 L40.85 17.5 Z M89.25 15.5 L77.25 16.5 L83.25 10.5 Z",
      "M38.4 48.5 L93.5 48.5 L93.5 50.5 L38.4 50.5 Z M93.5 48.5 L81.5 49.5 L87.5 43.5 Z",
      "M67.1 15.5 L67.1 86 L61.1 86 L61.1 15.5 Z M61.1 86 L67.1 86 L65.9 87.8 L64.1 89 L62.3 87.8 Z M67.1 86 L67.05 87.25 L66.8 88.5 L66.4 89.7 L65.8 90.85 L65 91.85 L64 92.65 L62.85 93.3 L61.65 93.7 L60.4 93.9 L59.1 94 L59.1 88 L59.75 87.95 L60.2 87.85 L60.5 87.75 L60.65 87.7 L60.75 87.6 L60.8 87.5 L60.9 87.35 L61 87.05 L61.1 86.6 L61.1 86 Z M59.1 91 L49.1 89.5 L49.1 88 L59.1 88 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M15.15 18 L15.15 82 L9.15 85 L9.15 15 Z",
          "bounds": [
            9.15,
            15,
            15.15,
            85
          ],
          "direction": "down",
          "weight": 56
        }
      ],
      [
        {
          "outline": "M12.15 18 L31.75 18 L31.75 20 L12.15 20 Z",
          "bounds": [
            12.15,
            18,
            31.75,
            20
          ],
          "direction": "right",
          "weight": 19.635
        },
        {
          "outline": "M34.75 19 L34.75 79 L28.75 82 L28.75 19 Z M28.75 18 L31.75 15.5 L37.25 20 L34.75 22 L28.75 19 Z",
          "bounds": [
            28.75,
            15.5,
            37.25,
            82
          ],
          "direction": "down",
          "weight": 56
        }
      ],
      [
        {
          "outline": "M12.15 46 L31.75 46 L31.75 48 L12.15 48 Z",
          "bounds": [
            12.15,
            46,
            31.75,
            48
          ],
          "direction": "right",
          "weight": 19.635
        }
      ],
      [
        {
          "outline": "M12.15 74 L31.75 74 L31.75 76 L12.15 76 Z",
          "bounds": [
            12.15,
            74,
            31.75,
            76
          ],
          "direction": "right",
          "weight": 19.635
        }
      ],
      [
        {
          "outline": "M40.85 15.5 L89.25 15.5 L89.25 17.5 L40.85 17.5 Z M89.25 15.5 L77.25 16.5 L83.25 10.5 Z",
          "bounds": [
            40.85,
            10.5,
            89.25,
            17.5
          ],
          "direction": "right",
          "weight": 48.3875
        }
      ],
      [
        {
          "outline": "M38.4 48.5 L93.5 48.5 L93.5 50.5 L38.4 50.5 Z M93.5 48.5 L81.5 49.5 L87.5 43.5 Z",
          "bounds": [
            38.4,
            43.5,
            93.5,
            50.5
          ],
          "direction": "right",
          "weight": 55.125
        }
      ],
      [
        {
          "outline": "M67.1 15.5 L67.1 86 L61.1 86 L61.1 15.5 Z M61.1 86 L67.1 86 L65.9 87.8 L64.1 89 L62.3 87.8 Z",
          "bounds": [
            61.1,
            15.5,
            67.1,
            89
          ],
          "direction": "down",
          "weight": 69.5
        },
        {
          "outline": "M67.1 86 L67.05 87.25 L66.8 88.5 L66.4 89.7 L65.8 90.85 L65 91.85 L64 92.65 L62.85 93.3 L61.65 93.7 L60.4 93.9 L59.1 94 L59.1 88 L59.75 87.95 L60.2 87.85 L60.5 87.75 L60.65 87.7 L60.75 87.6 L60.8 87.5 L60.9 87.35 L61 87.05 L61.1 86.6 L61.1 86 Z",
          "bounds": [
            59.1,
            86,
            67.1,
            94
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M64.1375 86 Q64.1375 91 59.1375 91",
          "revealWidth": 14
        },
        {
          "outline": "M59.1 91 L49.1 89.5 L49.1 88 L59.1 88 Z",
          "bounds": [
            49.1,
            88,
            59.1,
            91
          ],
          "direction": "left",
          "weight": 10
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch64Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch64 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH64_STROKES = loadGlyphWikiBatch64Strokes(reviewed)
