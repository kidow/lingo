/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch155.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "坵",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "785b148026dbb13e7d01f53c0b022587bc340b9e0b14abef8d4e556c09d390c4",
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
    "pathsSha256": "9822e1d655958e03cce412019b4818b42a5ad06fa04227e83de8b5a642066d80",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5775.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5700/5775.svg",
      "dictionarySvgSha256": "140d87a7e661bc19f8fc54b71a2bb76f9e8c812fd04987240e372284cc31adc7",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "190821bd5904014ddc0bba22c77dc5c7ff11f56ec21815e336bc6f2f50d8cbf7",
      "geometryReviewSha256": "190821bd5904014ddc0bba22c77dc5c7ff11f56ec21815e336bc6f2f50d8cbf7",
      "directionReviewSha256": "190821bd5904014ddc0bba22c77dc5c7ff11f56ec21815e336bc6f2f50d8cbf7"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u5775-j@3",
      "revision": "u5775-k@7 alias; u5775-j@3; u571f-01@12; u4e18-02@3; observed2026-09-27; source SHA256 f62fdf50a766fa5d5a9ae67d6f94b65ce34bd5d817d3a4572699bf719f091996",
      "editableSource": "/hanja-strokes/glyphwiki/5775.json",
      "modifications": "Whole 坵 u5775-j@3 via Korean alias u5775-k@7 with exactly declared u571f-01@12 and u4e18-02@3. Default mincho new Kage(); scale200to100. Original eight-stroke order retained. Preserve original rising third-stroke and left-falling fourth-stroke quadratics and all polygon vertices; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components. Incomplete2016archive not used."
    },
    "paths": [
      "M7.65 34 L39.7 34 L39.7 36 L7.65 36 Z M39.7 34 L27.7 35 L33.7 29 Z",
      "M26.25 9.5 L26.25 71.5 L20.25 71.5 L20.25 8.5 Z M26.25 9.5 L27.75 10.5 L25.25 12 Z",
      "M7.15 75.5 L9.7 74.7 L12.4 73.85 L15.3 72.9 L18.3 71.85 L21.5 70.75 L24.85 69.5 L28.35 68.2 L32 66.85 L35.9 65.45 L39.95 64.05 L40.35 64.9 L36.7 67.2 L33.15 69.3 L29.7 71.2 L26.4 73 L23.2 74.65 L20.1 76.15 L17.15 77.55 L14.35 78.85 L11.65 80.05 L9.1 81.15 Z M9.1 81.15 L6.2 75.8 L7.15 75.5 Z M9.1 81.15 L11.45 78.75 L10.55 82.25 Z",
      "M82 15.95 L78.6 17 L75.2 18 L71.75 18.95 L68.25 19.9 L64.75 20.8 L61.2 21.65 L57.6 22.45 L54 23.25 L50.3 23.9 L46.6 24.4 L46.35 23.55 L49.8 22.05 L53.25 20.65 L56.65 19.35 L60.1 18.05 L63.45 16.75 L66.85 15.45 L70.15 14.2 L73.5 12.9 L76.75 11.6 L80 10.3 Z M79.55 10.5 L84.8 15 L82 15.95 Z M84.8 15 L84.9 16.55 L81.55 15.1 Z",
      "M49.5 23 L49.5 89.5 L43.5 89.5 L43.5 20 Z",
      "M46.5 43.5 L91 43.5 L91 45.5 L46.5 45.5 Z M91 43.5 L79 44.5 L85 38.5 Z",
      "M74.5 43.5 L74.5 89.5 L68.5 89.5 L68.5 43.5 Z",
      "M30 87.5 L93.5 87.5 L93.5 89.5 L30 89.5 Z M93.5 87.5 L81.5 88.5 L87.5 82.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.65 34 L39.7 34 L39.7 36 L7.65 36 Z M39.7 34 L27.7 35 L33.7 29 Z",
          "bounds": [
            7.65,
            29,
            39.7,
            36
          ],
          "direction": "right",
          "weight": 32.04
        }
      ],
      [
        {
          "outline": "M26.25 9.5 L26.25 71.5 L20.25 71.5 L20.25 8.5 Z M26.25 9.5 L27.75 10.5 L25.25 12 Z",
          "bounds": [
            20.25,
            8.5,
            27.75,
            71.5
          ],
          "direction": "down",
          "weight": 61.5
        }
      ],
      [
        {
          "outline": "M7.15 75.5 L9.7 74.7 L12.4 73.85 L15.3 72.9 L18.3 71.85 L21.5 70.75 L24.85 69.5 L28.35 68.2 L32 66.85 L35.9 65.45 L39.95 64.05 L40.35 64.9 L36.7 67.2 L33.15 69.3 L29.7 71.2 L26.4 73 L23.2 74.65 L20.1 76.15 L17.15 77.55 L14.35 78.85 L11.65 80.05 L9.1 81.15 Z M9.1 81.15 L6.2 75.8 L7.15 75.5 Z M9.1 81.15 L11.45 78.75 L10.55 82.25 Z",
          "bounds": [
            6.2,
            64.05,
            40.35,
            82.25
          ],
          "direction": "curve",
          "weight": 35.373369,
          "revealPath": "M7.675 78.5 Q20.58 74 40.16 64.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M82 15.95 L78.6 17 L75.2 18 L71.75 18.95 L68.25 19.9 L64.75 20.8 L61.2 21.65 L57.6 22.45 L54 23.25 L50.3 23.9 L46.6 24.4 L46.35 23.55 L49.8 22.05 L53.25 20.65 L56.65 19.35 L60.1 18.05 L63.45 16.75 L66.85 15.45 L70.15 14.2 L73.5 12.9 L76.75 11.6 L80 10.3 Z M79.55 10.5 L84.8 15 L82 15.95 Z M84.8 15 L84.9 16.55 L81.55 15.1 Z",
          "bounds": [
            46.35,
            10.3,
            84.9,
            24.4
          ],
          "direction": "curve",
          "weight": 36.687873,
          "revealPath": "M81.5 13 Q64.5 19 46.5 24",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.5 23 L49.5 89.5 L43.5 89.5 L43.5 20 Z",
          "bounds": [
            43.5,
            20,
            49.5,
            89.5
          ],
          "direction": "down",
          "weight": 64.5
        }
      ],
      [
        {
          "outline": "M46.5 43.5 L91 43.5 L91 45.5 L46.5 45.5 Z M91 43.5 L79 44.5 L85 38.5 Z",
          "bounds": [
            46.5,
            38.5,
            91,
            45.5
          ],
          "direction": "right",
          "weight": 44.5
        }
      ],
      [
        {
          "outline": "M74.5 43.5 L74.5 89.5 L68.5 89.5 L68.5 43.5 Z",
          "bounds": [
            68.5,
            43.5,
            74.5,
            89.5
          ],
          "direction": "down",
          "weight": 44
        }
      ],
      [
        {
          "outline": "M30 87.5 L93.5 87.5 L93.5 89.5 L30 89.5 Z M93.5 87.5 L81.5 88.5 L87.5 82.5 Z",
          "bounds": [
            30,
            82.5,
            93.5,
            89.5
          ],
          "direction": "right",
          "weight": 63.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch155Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch155 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH155_STROKES = loadGlyphWikiBatch155Strokes(reviewed)
