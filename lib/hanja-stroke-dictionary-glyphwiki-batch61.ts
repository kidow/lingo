/** Filled GlyphWiki geometry crosschecked with a domestic dictionary, not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch61.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "玘",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "c6a5224d4be20d185e530e8af41df8084d06895e50986a6dfcd293a8ff30813d",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "pathsSha256": "2a47eef5da190bfe0eda34f7c1fe90b1a4c10850b321f8ad7117920bdba26a48",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7398.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/7398.svg",
      "dictionarySvgSha256": "fef92a5a8d7b76db04fa2a699402d75738cb9ff677eac64f4e91798fbb993a2b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "6269623f729487e19115dce643de667df515539beab3abd001f6851c43a9edd7",
      "geometryReviewSha256": "6269623f729487e19115dce643de667df515539beab3abd001f6851c43a9edd7",
      "directionReviewSha256": "6269623f729487e19115dce643de667df515539beab3abd001f6851c43a9edd7"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u7398-k@7",
      "revision": "u7398-k@7; u7398-j@3; u248e9-01@10; u5df1-02@5",
      "editableSource": "/hanja-strokes/glyphwiki/7398.json",
      "modifications": "Original whole-glyph Mincho polygons scaled200 to100. Keep domestic horizontal-horizontal-vertical-rising 王 order. Reveal exact original curves and separate upward hook polygon. Normalize polygon winding without changing any vertex so joined SVG subpaths preserve the original independently filled polygons. No coordinate/component/width edits."
    },
    "paths": [
      "M8.15 17 L43.65 17 L43.65 19 L8.15 19 Z M43.65 17 L31.65 18 L37.65 12 Z",
      "M9.3 43 L42.5 43 L42.5 45 L9.3 45 Z M42.5 43 L30.5 44 L36.5 38 Z",
      "M27.45 17 L27.45 73.5 L21.45 73.5 L21.45 17 Z",
      "M7.85 74.45 L11.15 73.7 L14.55 72.9 L17.95 72.05 L21.5 71.15 L25.05 70.2 L28.7 69.2 L32.4 68.15 L36.2 67.1 L40.1 66.05 L44.1 65.05 L44.4 65.9 L40.75 67.85 L37.15 69.6 L33.5 71.25 L29.95 72.75 L26.4 74.2 L22.9 75.55 L19.45 76.85 L16.05 78.05 L12.7 79.2 L9.4 80.25 Z M9.4 80.25 L6.85 74.7 L7.85 74.45 Z M9.4 80.25 L11.9 78 L10.75 81.45 Z",
      "M46.9 14 L84 14 L84 16 L46.9 16 Z M87 15 L87 48.5 L81 51.5 L81 15 Z M81 14 L84 11.5 L89.5 16 L87 18 L81 15 Z",
      "M51.55 43.5 L84 43.5 L84 45.5 L51.55 45.5 Z",
      "M54.55 43.5 L54.55 81.5 L48.55 81.5 L48.55 40.5 Z M48.55 81.5 L54.55 81.5 L53.35 83.3 L51.55 84.5 L49.75 83.3 Z M54.55 81.5 L54.6 82.1 L54.65 82.55 L54.75 82.85 L54.85 83 L54.9 83.1 L55 83.2 L55.2 83.25 L55.5 83.35 L55.95 83.45 L56.55 83.5 L56.55 89.5 L55.25 89.4 L54 89.2 L52.8 88.8 L51.7 88.15 L50.7 87.35 L49.85 86.35 L49.25 85.2 L48.85 84 L48.6 82.75 L48.55 81.5 Z M56.55 83.5 L58.65 84.4 L59.55 86.5 L58.65 88.6 L56.55 89.5 Z M56.55 83.5 L90.2 83.5 L90.2 89.5 L56.55 89.5 Z M90.2 83.5 L92 84.7 L93.2 86.5 L92 88.3 L90.2 89.5 Z M90.2 83.5 L87.2 83.5 L90.2 71 L91.2 71 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M8.15 17 L43.65 17 L43.65 19 L8.15 19 Z M43.65 17 L31.65 18 L37.65 12 Z",
          "bounds": [
            8.15,
            12,
            43.65,
            19
          ],
          "direction": "right",
          "weight": 35.5325
        }
      ],
      [
        {
          "outline": "M9.3 43 L42.5 43 L42.5 45 L9.3 45 Z M42.5 43 L30.5 44 L36.5 38 Z",
          "bounds": [
            9.3,
            38,
            42.5,
            45
          ],
          "direction": "right",
          "weight": 33.2025
        }
      ],
      [
        {
          "outline": "M27.45 17 L27.45 73.5 L21.45 73.5 L21.45 17 Z",
          "bounds": [
            21.45,
            17,
            27.45,
            73.5
          ],
          "direction": "down",
          "weight": 54.5
        }
      ],
      [
        {
          "outline": "M7.85 74.45 L11.15 73.7 L14.55 72.9 L17.95 72.05 L21.5 71.15 L25.05 70.2 L28.7 69.2 L32.4 68.15 L36.2 67.1 L40.1 66.05 L44.1 65.05 L44.4 65.9 L40.75 67.85 L37.15 69.6 L33.5 71.25 L29.95 72.75 L26.4 74.2 L22.9 75.55 L19.45 76.85 L16.05 78.05 L12.7 79.2 L9.4 80.25 Z M9.4 80.25 L6.85 74.7 L7.85 74.45 Z M9.4 80.25 L11.9 78 L10.75 81.45 Z",
          "bounds": [
            6.85,
            65.05,
            44.4,
            81.45
          ],
          "direction": "curve",
          "weight": 38.056448,
          "revealPath": "M8.155 77.5 Q25.0475 73 44.27 65.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.9 14 L84 14 L84 16 L46.9 16 Z",
          "bounds": [
            46.9,
            14,
            84,
            16
          ],
          "direction": "right",
          "weight": 37.08
        },
        {
          "outline": "M87 15 L87 48.5 L81 51.5 L81 15 Z M81 14 L84 11.5 L89.5 16 L87 18 L81 15 Z",
          "bounds": [
            81,
            11.5,
            89.5,
            51.5
          ],
          "direction": "down",
          "weight": 29.5
        }
      ],
      [
        {
          "outline": "M51.55 43.5 L84 43.5 L84 45.5 L51.55 45.5 Z",
          "bounds": [
            51.55,
            43.5,
            84,
            45.5
          ],
          "direction": "right",
          "weight": 32.445
        }
      ],
      [
        {
          "outline": "M54.55 43.5 L54.55 81.5 L48.55 81.5 L48.55 40.5 Z M48.55 81.5 L54.55 81.5 L53.35 83.3 L51.55 84.5 L49.75 83.3 Z",
          "bounds": [
            48.55,
            40.5,
            54.55,
            84.5
          ],
          "direction": "down",
          "weight": 37
        },
        {
          "outline": "M54.55 81.5 L54.6 82.1 L54.65 82.55 L54.75 82.85 L54.85 83 L54.9 83.1 L55 83.2 L55.2 83.25 L55.5 83.35 L55.95 83.45 L56.55 83.5 L56.55 89.5 L55.25 89.4 L54 89.2 L52.8 88.8 L51.7 88.15 L50.7 87.35 L49.85 86.35 L49.25 85.2 L48.85 84 L48.6 82.75 L48.55 81.5 Z M56.55 83.5 L58.65 84.4 L59.55 86.5 L58.65 88.6 L56.55 89.5 Z",
          "bounds": [
            48.55,
            81.5,
            59.55,
            89.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M51.575 81.5 Q51.575 86.5 56.575 86.5",
          "revealWidth": 14
        },
        {
          "outline": "M56.55 83.5 L90.2 83.5 L90.2 89.5 L56.55 89.5 Z M90.2 83.5 L92 84.7 L93.2 86.5 L92 88.3 L90.2 89.5 Z",
          "bounds": [
            56.55,
            83.5,
            93.2,
            89.5
          ],
          "direction": "right",
          "weight": 33.625
        },
        {
          "outline": "M90.2 83.5 L87.2 83.5 L90.2 71 L91.2 71 Z",
          "bounds": [
            87.2,
            71,
            91.2,
            83.5
          ],
          "direction": "up",
          "weight": 12.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch61Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch61 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH61_STROKES = loadGlyphWikiBatch61Strokes(reviewed)
