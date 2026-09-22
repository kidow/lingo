/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch53.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "萄",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "491bf641c6313f6b8cb8064de6ee06ef2d12261e2305539d9937cabddd73919d",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      12,
      13,
      5,
      6,
      7,
      8,
      9,
      11
    ],
    "pathsSha256": "fe2792d46ad81bb80f1ca6726adef3b48b3a81d8ca482a70ae07f3fe6da298ad",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8404.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/8404.svg",
      "dictionarySvgSha256": "4c9fcfd1302891cca5ab31040a66772a661abc91c97da781a1c5b4550df0911b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "096a3c64a33f1e413da4106cfa22df44edeb60582ec48e909b02b34ca1ebafe6",
      "geometryReviewSha256": "096a3c64a33f1e413da4106cfa22df44edeb60582ec48e909b02b34ca1ebafe6",
      "directionReviewSha256": "096a3c64a33f1e413da4106cfa22df44edeb60582ec48e909b02b34ca1ebafe6"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u8404-k@8",
      "revision": "u8404-k@8; u8404-ue0102@9; ufa5e-03@8",
      "editableSource": "/hanja-strokes/glyphwiki/8404.json",
      "modifications": "Original whole glyph rendered with the engine-defined Kage(1) Gothic preset, scaled 200 to 100. Grass 3/4 order exchanged; outer 勹 moved before 缶; exact original endpoints grouped for corners. Original quadratic hook retained. No source coordinate, component or custom width edits."
    },
    "paths": [
      "M6.5 15.75 L47.5 15.75 L47.5 18.75 L6.5 18.75 Z",
      "M30.5 6.75 L30.5 27.4 L33.5 27.4 L33.5 6.75 Z",
      "M52.5 15.75 L93.5 15.75 L93.5 18.75 L52.5 18.75 Z",
      "M66.5 6.75 L66.5 27.4 L69.5 27.4 L69.5 6.75 Z",
      "M29.9 23.9 L28.6 28 L27.15 32.05 L25.5 35.95 L23.65 39.75 L21.65 43.45 L19.5 47.1 L17.15 50.6 L14.6 54 L11.95 57.3 L9.05 60.5 L6.9 58.45 L9.65 55.35 L12.25 52.15 L14.7 48.85 L16.95 45.45 L19.05 42 L21 38.4 L22.75 34.7 L24.35 30.9 L25.75 27.05 L27.05 23.05 Z",
      "M24.5 33 L85 33 L85 36 L24.5 36 Z M84.95 34.45 L85 43.95 L84.9 52.55 L84.65 60.3 L84.2 67.15 L83.65 73.15 L82.95 78.3 L82.1 82.6 L81.1 86.1 L79.85 88.75 L78.25 90.7 L76.3 88.4 L77.25 87.25 L78.25 85.05 L79.2 81.9 L80 77.8 L80.7 72.85 L81.25 66.95 L81.65 60.15 L81.9 52.5 L82 43.95 L82 34.5 Z M78.25 90.7 L77.55 91.2 L76.75 91.6 L75.95 91.85 L75.05 92.05 L74.15 92.1 L73.15 92.15 L72.1 92.05 L71 91.9 L69.85 91.7 L68.6 91.45 L69.35 88.5 L70.45 88.75 L71.45 88.95 L72.4 89.05 L73.25 89.15 L74 89.1 L74.65 89.05 L75.2 88.95 L75.65 88.8 L76 88.6 L76.3 88.4 Z",
      "M37.3 38.65 L36.05 41 L34.75 43.2 L33.35 45.4 L31.9 47.5 L30.4 49.5 L28.85 51.45 L27.2 53.35 L25.55 55.2 L23.8 56.9 L21.95 58.6 L20 56.35 L21.7 54.75 L23.4 53.1 L25 51.35 L26.55 49.55 L28.05 47.7 L29.45 45.75 L30.85 43.75 L32.2 41.65 L33.45 39.5 L34.65 37.3 Z",
      "M29.5 46.5 L68 46.5 L68 49.5 L29.5 49.5 Z",
      "M17.5 59 L75 59 L75 62 L17.5 62 Z",
      "M44.5 46.5 L44.5 80 L47.5 80 L47.5 46.5 Z",
      "M26 64 L26 81.2 L29 81.2 L29 64 Z M26 77 L65.5 77 L65.5 80 L26 80 Z",
      "M62.5 64 L62.5 81.2 L65.5 81.2 L65.5 64 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 15.75 L47.5 15.75 L47.5 18.75 L6.5 18.75 Z",
          "bounds": [
            6.5,
            15.75,
            47.5,
            18.75
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M30.5 6.75 L30.5 27.4 L33.5 27.4 L33.5 6.75 Z",
          "bounds": [
            30.5,
            6.75,
            33.5,
            27.4
          ],
          "direction": "down",
          "weight": 20.655
        }
      ],
      [
        {
          "outline": "M52.5 15.75 L93.5 15.75 L93.5 18.75 L52.5 18.75 Z",
          "bounds": [
            52.5,
            15.75,
            93.5,
            18.75
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M66.5 6.75 L66.5 27.4 L69.5 27.4 L69.5 6.75 Z",
          "bounds": [
            66.5,
            6.75,
            69.5,
            27.4
          ],
          "direction": "down",
          "weight": 20.655
        }
      ],
      [
        {
          "outline": "M29.9 23.9 L28.6 28 L27.15 32.05 L25.5 35.95 L23.65 39.75 L21.65 43.45 L19.5 47.1 L17.15 50.6 L14.6 54 L11.95 57.3 L9.05 60.5 L6.9 58.45 L9.65 55.35 L12.25 52.15 L14.7 48.85 L16.95 45.45 L19.05 42 L21 38.4 L22.75 34.7 L24.35 30.9 L25.75 27.05 L27.05 23.05 Z",
          "bounds": [
            6.9,
            23.05,
            29.9,
            60.5
          ],
          "direction": "curve",
          "weight": 41.427648,
          "revealPath": "M28.5 23.5 Q22.5 44 8 59.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M24.5 33 L85 33 L85 36 L24.5 36 Z",
          "bounds": [
            24.5,
            33,
            85,
            36
          ],
          "direction": "right",
          "weight": 59
        },
        {
          "outline": "M84.95 34.45 L85 43.95 L84.9 52.55 L84.65 60.3 L84.2 67.15 L83.65 73.15 L82.95 78.3 L82.1 82.6 L81.1 86.1 L79.85 88.75 L78.25 90.7 L76.3 88.4 L77.25 87.25 L78.25 85.05 L79.2 81.9 L80 77.8 L80.7 72.85 L81.25 66.95 L81.65 60.15 L81.9 52.5 L82 43.95 L82 34.5 Z",
          "bounds": [
            76.3,
            34.45,
            85,
            90.7
          ],
          "direction": "curve",
          "weight": 55.426777,
          "revealPath": "M83.5 34.5 Q84 84 77.30466383879212 89.57944680100655",
          "revealWidth": 14
        },
        {
          "outline": "M78.25 90.7 L77.55 91.2 L76.75 91.6 L75.95 91.85 L75.05 92.05 L74.15 92.1 L73.15 92.15 L72.1 92.05 L71 91.9 L69.85 91.7 L68.6 91.45 L69.35 88.5 L70.45 88.75 L71.45 88.95 L72.4 89.05 L73.25 89.15 L74 89.1 L74.65 89.05 L75.2 88.95 L75.65 88.8 L76 88.6 L76.3 88.4 Z",
          "bounds": [
            68.6,
            88.4,
            78.25,
            92.15
          ],
          "direction": "curve",
          "weight": 8.315306,
          "revealPath": "M77.30466383879212 89.57944680100655 Q75 91.5 69 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M37.3 38.65 L36.05 41 L34.75 43.2 L33.35 45.4 L31.9 47.5 L30.4 49.5 L28.85 51.45 L27.2 53.35 L25.55 55.2 L23.8 56.9 L21.95 58.6 L20 56.35 L21.7 54.75 L23.4 53.1 L25 51.35 L26.55 49.55 L28.05 47.7 L29.45 45.75 L30.85 43.75 L32.2 41.65 L33.45 39.5 L34.65 37.3 Z",
          "bounds": [
            20,
            37.3,
            37.3,
            58.6
          ],
          "direction": "curve",
          "weight": 24.601829,
          "revealPath": "M36 38 Q30 49.5 21 57.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M29.5 46.5 L68 46.5 L68 49.5 L29.5 49.5 Z",
          "bounds": [
            29.5,
            46.5,
            68,
            49.5
          ],
          "direction": "right",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M17.5 59 L75 59 L75 62 L17.5 62 Z",
          "bounds": [
            17.5,
            59,
            75,
            62
          ],
          "direction": "right",
          "weight": 57.5
        }
      ],
      [
        {
          "outline": "M44.5 46.5 L44.5 80 L47.5 80 L47.5 46.5 Z",
          "bounds": [
            44.5,
            46.5,
            47.5,
            80
          ],
          "direction": "down",
          "weight": 30.5
        }
      ],
      [
        {
          "outline": "M26 64 L26 81.2 L29 81.2 L29 64 Z",
          "bounds": [
            26,
            64,
            29,
            81.2
          ],
          "direction": "down",
          "weight": 14.5
        },
        {
          "outline": "M26 77 L65.5 77 L65.5 80 L26 80 Z",
          "bounds": [
            26,
            77,
            65.5,
            80
          ],
          "direction": "right",
          "weight": 36.5
        }
      ],
      [
        {
          "outline": "M62.5 64 L62.5 81.2 L65.5 81.2 L65.5 64 Z",
          "bounds": [
            62.5,
            64,
            65.5,
            81.2
          ],
          "direction": "down",
          "weight": 14.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch53Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch53 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH53_STROKES = loadGlyphWikiBatch53Strokes(reviewed)
