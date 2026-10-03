/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch180.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "苞",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "d34b72c376a3b602595f3ed3673fd32c69ca9b406bb5033f393effe51772fb6b",
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
      11
    ],
    "pathsSha256": "fb7feeb0f8ca9353d1e5340d4eb416fec5f50eb1ef1d1ea0be183603837e8c5a",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82DE.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82DE.svg",
      "dictionarySvgSha256": "dbda51066ea6be2428cc4937663a1cb02fd91ce27df4a488641ac12437771414",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "8f450b91e3841a6ce8baad7e0859cc393ac4630a439313f5ac326f8087757955",
      "geometryReviewSha256": "8f450b91e3841a6ce8baad7e0859cc393ac4630a439313f5ac326f8087757955",
      "directionReviewSha256": "8f450b91e3841a6ce8baad7e0859cc393ac4630a439313f5ac326f8087757955"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u82de-k@10",
      "revision": "u82de-k@10; u8279-03-var-010@2; u5305-k@6; observed2026-10-03; source SHA256 9c30d17dbd8b48feb12e38a7c5b90f9ef25f0cde1636d038dc33b4e087d7317c",
      "editableSource": "/hanja-strokes/glyphwiki/82de.json",
      "modifications": "Whole Korean source and declared dependencies only; normalized200to100 and winding. Domestic grass order0,1,3,2. Domestic6 original horizontal/curve join162,76.92; domestic7 corner116,101.24000000000001; domestic9 original line/curve/line joins52,167.24 and62,177.24. No invented coordinates, bridges, trimming or substituted components. Crosschecked9 cumulative states and81 progressive frames."
    },
    "paths": [
      "M6.5 17.35 L47.5 17.35 L47.5 19.35 L6.5 19.35 Z M47.5 17.35 L35.5 18.35 L41.5 12.35 Z",
      "M35 7.25 L35 23.5 L29 26.5 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
      "M52.5 17.35 L93.5 17.35 L93.5 19.35 L52.5 19.35 Z M93.5 17.35 L81.5 18.35 L87.5 12.35 Z",
      "M71 7.25 L71 27.95 L65 30.95 L65 6.25 Z M71 7.25 L72.5 8.25 L70 9.75 Z",
      "M36.55 29.8 L34.65 33.6 L32.5 37.35 L30.1 40.95 L27.45 44.4 L24.55 47.7 L21.4 50.9 L18 53.95 L14.35 56.8 L10.45 59.5 L6.25 62 L5.7 61.25 L9.25 58 L12.6 54.8 L15.75 51.55 L18.65 48.3 L21.3 44.95 L23.7 41.6 L25.9 38.15 L27.85 34.7 L29.55 31.1 L31 27.5 Z M30.8 27.95 L31.3 26.85 L36.55 29.8 Z M36.55 29.8 L37.55 31.3 L34.7 31.7 Z",
      "M29 37.45 L81 37.45 L81 39.45 L29 39.45 Z M83.95 38.5 L83.85 43.6 L83.65 48.3 L83.4 52.6 L83.1 56.5 L82.75 60.1 L82.35 63.25 L81.85 66.1 L81.3 68.55 L80.65 70.7 L79.9 72.55 L74.5 69.85 L75 68.7 L75.5 67.05 L75.95 64.95 L76.4 62.35 L76.8 59.4 L77.15 56 L77.45 52.2 L77.65 48 L77.85 43.4 L78 38.4 Z M78 37.45 L81 34.95 L86.5 39.45 L84 40.95 L78 43.45 Z M79.9 72.55 L79.3 73.65 L78.55 74.65 L77.75 75.6 L76.85 76.4 L75.85 77.1 L74.8 77.7 L73.65 78.15 L72.45 78.45 L71.25 78.6 L70 78.7 L70 72.7 L70.65 72.65 L71.25 72.55 L71.8 72.4 L72.3 72.25 L72.7 72 L73.1 71.75 L73.45 71.4 L73.85 70.95 L74.2 70.45 L74.5 69.85 Z M70 75.7 L60 74.2 L60 72.7 L70 72.7 Z",
      "M26 49.6 L58 49.6 L58 51.6 L26 51.6 Z M61 50.6 L61 70.55 L55 73.55 L55 50.6 Z M55 49.6 L58 47.1 L63.5 51.6 L61 53.6 L55 50.6 Z",
      "M26 65.55 L58 65.55 L58 67.55 L26 67.55 Z",
      "M29 49.6 L29 83.6 L23 83.6 L23 46.6 Z M23 83.6 L29 83.6 L27.8 85.4 L26 86.6 L24.2 85.4 Z M29 83.6 L29 84.2 L29.1 84.65 L29.2 84.95 L29.25 85.15 L29.35 85.2 L29.45 85.3 L29.6 85.4 L29.9 85.5 L30.35 85.55 L31 85.6 L31 91.6 L29.7 91.55 L28.45 91.3 L27.25 90.9 L26.1 90.3 L25.1 89.45 L24.3 88.45 L23.65 87.35 L23.25 86.1 L23.05 84.9 L23 83.6 Z M31 85.6 L33.1 86.5 L34 88.6 L33.1 90.7 L31 91.6 Z M31 85.6 L91 85.6 L91 91.6 L31 91.6 Z M91 85.6 L92.8 86.8 L94 88.6 L92.8 90.4 L91 91.6 Z M91 85.6 L88 85.6 L91 73.1 L92 73.1 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 17.35 L47.5 17.35 L47.5 19.35 L6.5 19.35 Z M47.5 17.35 L35.5 18.35 L41.5 12.35 Z",
          "bounds": [
            6.5,
            12.35,
            47.5,
            19.35
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 7.25 L35 23.5 L29 26.5 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
          "bounds": [
            29,
            6.25,
            36.5,
            26.5
          ],
          "direction": "down",
          "weight": 18.245
        }
      ],
      [
        {
          "outline": "M52.5 17.35 L93.5 17.35 L93.5 19.35 L52.5 19.35 Z M93.5 17.35 L81.5 18.35 L87.5 12.35 Z",
          "bounds": [
            52.5,
            12.35,
            93.5,
            19.35
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 7.25 L71 27.95 L65 30.95 L65 6.25 Z M71 7.25 L72.5 8.25 L70 9.75 Z",
          "bounds": [
            65,
            6.25,
            72.5,
            30.95
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M36.55 29.8 L34.65 33.6 L32.5 37.35 L30.1 40.95 L27.45 44.4 L24.55 47.7 L21.4 50.9 L18 53.95 L14.35 56.8 L10.45 59.5 L6.25 62 L5.7 61.25 L9.25 58 L12.6 54.8 L15.75 51.55 L18.65 48.3 L21.3 44.95 L23.7 41.6 L25.9 38.15 L27.85 34.7 L29.55 31.1 L31 27.5 Z M30.8 27.95 L31.3 26.85 L36.55 29.8 Z M36.55 29.8 L37.55 31.3 L34.7 31.7 Z",
          "bounds": [
            5.7,
            26.85,
            37.55,
            62
          ],
          "direction": "curve",
          "weight": 43.614603,
          "revealPath": "M34 28.2 Q26 47.58 6 61.64",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M29 37.45 L81 37.45 L81 39.45 L29 39.45 Z",
          "bounds": [
            29,
            37.45,
            81,
            39.45
          ],
          "direction": "right",
          "weight": 52
        },
        {
          "outline": "M83.95 38.5 L83.85 43.6 L83.65 48.3 L83.4 52.6 L83.1 56.5 L82.75 60.1 L82.35 63.25 L81.85 66.1 L81.3 68.55 L80.65 70.7 L79.9 72.55 L74.5 69.85 L75 68.7 L75.5 67.05 L75.95 64.95 L76.4 62.35 L76.8 59.4 L77.15 56 L77.45 52.2 L77.65 48 L77.85 43.4 L78 38.4 Z M78 37.45 L81 34.95 L86.5 39.45 L84 40.95 L78 43.45 Z",
          "bounds": [
            74.5,
            34.95,
            86.5,
            72.55
          ],
          "direction": "curve",
          "weight": 32.982089,
          "revealPath": "M81 38.46 Q80.5 64.68 77.23281965018677 71.22624135544397",
          "revealWidth": 14
        },
        {
          "outline": "M79.9 72.55 L79.3 73.65 L78.55 74.65 L77.75 75.6 L76.85 76.4 L75.85 77.1 L74.8 77.7 L73.65 78.15 L72.45 78.45 L71.25 78.6 L70 78.7 L70 72.7 L70.65 72.65 L71.25 72.55 L71.8 72.4 L72.3 72.25 L72.7 72 L73.1 71.75 L73.45 71.4 L73.85 70.95 L74.2 70.45 L74.5 69.85 Z M70 75.7 L60 74.2 L60 72.7 L70 72.7 Z",
          "bounds": [
            60,
            69.85,
            79.9,
            78.7
          ],
          "direction": "curve",
          "weight": 8.504599,
          "revealPath": "M77.23281965018677 71.22624135544397 Q75 75.7 70 75.7",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26 49.6 L58 49.6 L58 51.6 L26 51.6 Z",
          "bounds": [
            26,
            49.6,
            58,
            51.6
          ],
          "direction": "right",
          "weight": 32
        },
        {
          "outline": "M61 50.6 L61 70.55 L55 73.55 L55 50.6 Z M55 49.6 L58 47.1 L63.5 51.6 L61 53.6 L55 50.6 Z",
          "bounds": [
            55,
            47.1,
            63.5,
            73.55
          ],
          "direction": "down",
          "weight": 15.96
        }
      ],
      [
        {
          "outline": "M26 65.55 L58 65.55 L58 67.55 L26 67.55 Z",
          "bounds": [
            26,
            65.55,
            58,
            67.55
          ],
          "direction": "right",
          "weight": 32
        }
      ],
      [
        {
          "outline": "M29 49.6 L29 83.6 L23 83.6 L23 46.6 Z M23 83.6 L29 83.6 L27.8 85.4 L26 86.6 L24.2 85.4 Z",
          "bounds": [
            23,
            46.6,
            29,
            86.6
          ],
          "direction": "down",
          "weight": 33
        },
        {
          "outline": "M29 83.6 L29 84.2 L29.1 84.65 L29.2 84.95 L29.25 85.15 L29.35 85.2 L29.45 85.3 L29.6 85.4 L29.9 85.5 L30.35 85.55 L31 85.6 L31 91.6 L29.7 91.55 L28.45 91.3 L27.25 90.9 L26.1 90.3 L25.1 89.45 L24.3 88.45 L23.65 87.35 L23.25 86.1 L23.05 84.9 L23 83.6 Z M31 85.6 L33.1 86.5 L34 88.6 L33.1 90.7 L31 91.6 Z",
          "bounds": [
            23,
            83.6,
            34,
            91.6
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M26 83.62 Q26 88.62 31 88.62",
          "revealWidth": 14
        },
        {
          "outline": "M31 85.6 L91 85.6 L91 91.6 L31 91.6 Z M91 85.6 L92.8 86.8 L94 88.6 L92.8 90.4 L91 91.6 Z M91 85.6 L88 85.6 L91 73.1 L92 73.1 Z",
          "bounds": [
            31,
            73.1,
            94,
            91.6
          ],
          "direction": "right",
          "weight": 60
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch180Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch180 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH180_STROKES = loadGlyphWikiBatch180Strokes(reviewed)
