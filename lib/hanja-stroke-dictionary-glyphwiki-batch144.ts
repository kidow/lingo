/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch144.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芦",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "05e651bf93c21b39fab0419277d533015292c6d2ff9afd4beb8bb5b7ed4a8f77",
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
    "pathsSha256": "329fa29401458349d15c874b49945713d41594e326b148336c512548e44352ba",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A6.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A6.svg",
      "dictionarySvgSha256": "54292964d4c27ad8f7feef384abbe119b0e5316a65bfda0764ef163254c2abd7",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "cb00701d37cd650249255c58edafbd9f5bd04246d5425a9ddfd2afd7aab364f4",
      "geometryReviewSha256": "cb00701d37cd650249255c58edafbd9f5bd04246d5425a9ddfd2afd7aab364f4",
      "directionReviewSha256": "cb00701d37cd650249255c58edafbd9f5bd04246d5425a9ddfd2afd7aab364f4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u82a6-k@13",
      "revision": "u82a6-k@13; ufa5e-03@8; u6236-j@2; observed2026-09-27; source SHA256 7a3b76b5747a26b11d7448a1eef6124447e64d8064f66869b1bd64771c40815c",
      "editableSource": "/hanja-strokes/glyphwiki/82a6.json",
      "modifications": "Whole 芦 u82a6-k@13 with exactly declared ufa5e-03@8 and u6236-j@2. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;6,7;8;5. Preserve both original quadratic primitives and all polygon vertices; normalize winding only. Original horizontal and vertical meeting at (164,92.14) form the domestic sixth bend; move the complete falling stroke last. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 16.05 L47.5 16.05 L47.5 18.05 L6.5 18.05 Z M47.5 16.05 L35.5 17.05 L41.5 11.05 Z",
      "M35 6.85 L35 25.9 L29 28.9 L29 5.85 Z M35 6.85 L36.5 7.85 L34 9.35 Z",
      "M52.5 16.05 L93.5 16.05 L93.5 18.05 L52.5 18.05 Z M93.5 16.05 L81.5 17.05 L87.5 11.05 Z",
      "M71 6.85 L71 25.9 L65 28.9 L65 5.85 Z M71 6.85 L72.5 7.85 L70 9.35 Z",
      "M80.35 30.9 L75.35 32.25 L70.25 33.5 L65.05 34.55 L59.7 35.5 L54.3 36.3 L48.75 37 L43.15 37.5 L37.4 37.8 L31.55 37.9 L25.6 37.8 L25.6 36.9 L31.4 36.05 L37.15 35.15 L42.75 34.2 L48.2 33.25 L53.55 32.15 L58.8 30.95 L63.9 29.65 L68.9 28.3 L73.8 26.8 L78.55 25.15 Z M78.05 25.3 L83.45 29.9 L80.35 30.9 Z M83.45 29.9 L83.55 31.45 L80.15 29.9 Z",
      "M25.6 45.05 L82 45.05 L82 47.05 L25.6 47.05 Z M85 46.05 L85 66.65 L79 69.65 L79 46.05 Z M79 45.05 L82 42.55 L87.5 47.05 L85 49.05 L79 46.05 Z",
      "M27.65 61.65 L82 61.65 L82 63.65 L27.65 63.65 Z",
      "M28.6 36.35 L28.6 62.65 L22.6 62.65 L22.6 33.35 Z M22.6 62.65 L28.6 62.65 L27.4 64.45 L25.6 65.65 L23.8 64.45 Z M28.6 62.65 L28.25 67.15 L27.55 71.45 L26.45 75.45 L24.95 79.2 L23.1 82.6 L20.85 85.75 L18.25 88.5 L15.3 90.95 L12 93 L8.4 94.65 L7.95 93.85 L10.95 91.45 L13.55 88.9 L15.85 86.3 L17.8 83.5 L19.4 80.55 L20.65 77.45 L21.6 74.1 L22.25 70.5 L22.6 66.7 L22.6 62.65 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 16.05 L47.5 16.05 L47.5 18.05 L6.5 18.05 Z M47.5 16.05 L35.5 17.05 L41.5 11.05 Z",
          "bounds": [
            6.5,
            11.05,
            47.5,
            18.05
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 6.85 L35 25.9 L29 28.9 L29 5.85 Z M35 6.85 L36.5 7.85 L34 9.35 Z",
          "bounds": [
            29,
            5.85,
            36.5,
            28.9
          ],
          "direction": "down",
          "weight": 21.0375
        }
      ],
      [
        {
          "outline": "M52.5 16.05 L93.5 16.05 L93.5 18.05 L52.5 18.05 Z M93.5 16.05 L81.5 17.05 L87.5 11.05 Z",
          "bounds": [
            52.5,
            11.05,
            93.5,
            18.05
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 6.85 L71 25.9 L65 28.9 L65 5.85 Z M71 6.85 L72.5 7.85 L70 9.35 Z",
          "bounds": [
            65,
            5.85,
            72.5,
            28.9
          ],
          "direction": "down",
          "weight": 21.0375
        }
      ],
      [
        {
          "outline": "M80.35 30.9 L75.35 32.25 L70.25 33.5 L65.05 34.55 L59.7 35.5 L54.3 36.3 L48.75 37 L43.15 37.5 L37.4 37.8 L31.55 37.9 L25.6 37.8 L25.6 36.9 L31.4 36.05 L37.15 35.15 L42.75 34.2 L48.2 33.25 L53.55 32.15 L58.8 30.95 L63.9 29.65 L68.9 28.3 L73.8 26.8 L78.55 25.15 Z M78.05 25.3 L83.45 29.9 L80.35 30.9 Z M83.45 29.9 L83.55 31.45 L80.15 29.9 Z",
          "bounds": [
            25.6,
            25.15,
            83.55,
            37.9
          ],
          "direction": "curve",
          "weight": 55.145952,
          "revealPath": "M79.95 27.9 Q55.35 35.8 25.625 37.379999999999995",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.6 45.05 L82 45.05 L82 47.05 L25.6 47.05 Z",
          "bounds": [
            25.6,
            45.05,
            82,
            47.05
          ],
          "direction": "right",
          "weight": 56.375
        },
        {
          "outline": "M85 46.05 L85 66.65 L79 69.65 L79 46.05 Z M79 45.05 L82 42.55 L87.5 47.05 L85 49.05 L79 46.05 Z",
          "bounds": [
            79,
            42.55,
            87.5,
            69.65
          ],
          "direction": "down",
          "weight": 16.59
        }
      ],
      [
        {
          "outline": "M27.65 61.65 L82 61.65 L82 63.65 L27.65 63.65 Z",
          "bounds": [
            27.65,
            61.65,
            82,
            63.65
          ],
          "direction": "right",
          "weight": 54.325
        }
      ],
      [
        {
          "outline": "M28.6 36.35 L28.6 62.65 L22.6 62.65 L22.6 33.35 Z M22.6 62.65 L28.6 62.65 L27.4 64.45 L25.6 65.65 L23.8 64.45 Z",
          "bounds": [
            22.6,
            33.35,
            28.6,
            65.65
          ],
          "direction": "down",
          "weight": 25.28
        },
        {
          "outline": "M28.6 62.65 L28.25 67.15 L27.55 71.45 L26.45 75.45 L24.95 79.2 L23.1 82.6 L20.85 85.75 L18.25 88.5 L15.3 90.95 L12 93 L8.4 94.65 L7.95 93.85 L10.95 91.45 L13.55 88.9 L15.85 86.3 L17.8 83.5 L19.4 80.55 L20.65 77.45 L21.6 74.1 L22.25 70.5 L22.6 66.7 L22.6 62.65 Z",
          "bounds": [
            7.95,
            62.65,
            28.6,
            94.65
          ],
          "direction": "curve",
          "weight": 36.085878,
          "revealPath": "M25.625 62.66 Q25.625 84.78 8.2 94.26",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch144Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch144 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH144_STROKES = loadGlyphWikiBatch144Strokes(reviewed)
