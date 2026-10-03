/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch186.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "挻",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "fadc5bd707614834463d2daedfba912f51a0ddbf5cb32ead85860c86b0c7f0d9",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      13,
      9,
      10,
      11,
      12,
      4,
      5,
      6,
      7,
      8
    ],
    "pathsSha256": "68fd12ffed12d2234c27ac1f20aa58b3bbc2ed7c568c9e94475c17eb61632093",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/633B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6300/633B.svg",
      "dictionarySvgSha256": "54e8c6a7731b90b06d87a980053006b01473e8e1f0a94fc408b787b0b6304c5d",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "6c09c3ed8ee132e296c9046f740c2eb38232dd572f777c51cc80558190f0eb88",
      "geometryReviewSha256": "6c09c3ed8ee132e296c9046f740c2eb38232dd572f777c51cc80558190f0eb88",
      "directionReviewSha256": "6c09c3ed8ee132e296c9046f740c2eb38232dd572f777c51cc80558190f0eb88"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u633b-g@1",
      "revision": "u633b-g@1; u624c-01@4; u5ef6-g02@2; u5ef4-g02@4; observed2026-10-03; source SHA256 7311e7f086ac6f44e3f12faa0d45c16cf08ad77dc06418c20292752a4e12d61d",
      "editableSource": "/hanja-strokes/glyphwiki/633b.json",
      "modifications": "Whole Chinese-source glyph and declared dependencies only; normalized200to100 and winding. Domestic source groups0;1;2;12;8;9;10,11;3,4;5,6;7. Original joins41.5,171;123,142;92,30;100,85 retained. All five quadratic primitives, original polygons, decorations and engine defaults retained. No bridges, invented coordinates, trimming or component substitutions. Korean-source alternative was rejected for discontinuous final sweep; no component was copied from it. Crosschecked10 cumulative states and90 progressive frames."
    },
    "paths": [
      "M8.35 26.5 L33.4 26.5 L33.4 28.5 L8.35 28.5 Z M33.4 26.5 L25.4 27.5 L29.4 23 Z",
      "M23.75 8 L23.75 85.5 L17.75 85.5 L17.75 7 Z M23.75 8 L25.25 9 L22.75 10.5 Z M17.75 85.5 L23.75 85.5 L22.55 87.3 L20.75 88.5 L18.95 87.3 Z M23.75 85.5 L23.65 86.75 L23.45 88 L23.05 89.2 L22.4 90.35 L21.6 91.35 L20.6 92.15 L19.45 92.8 L18.25 93.2 L17 93.4 L15.75 93.5 L15.75 87.5 L16.35 87.45 L16.8 87.35 L17.1 87.25 L17.25 87.2 L17.35 87.1 L17.45 87 L17.5 86.85 L17.6 86.55 L17.7 86.1 L17.75 85.5 Z M15.75 90.5 L9.75 89 L9.75 87.5 L15.75 87.5 Z",
      "M7.6 58.15 L10.15 56.8 L12.7 55.5 L15.2 54.15 L17.75 52.85 L20.3 51.5 L22.8 50.15 L25.35 48.85 L27.9 47.5 L30.5 46.3 L33.1 45.1 L33.65 45.85 L31.55 47.85 L29.35 49.75 L27.15 51.6 L24.85 53.35 L22.55 55.1 L20.2 56.8 L17.85 58.45 L15.45 60.1 L13 61.7 L10.6 63.3 Z M10.6 63.3 L6.7 58.65 L7.6 58.15 Z M10.6 63.3 L12.45 60.5 L12.2 64.1 Z",
      "M88.9 12.35 L86.25 13.5 L83.4 14.6 L80.4 15.65 L77.25 16.65 L73.9 17.55 L70.4 18.4 L66.7 19.2 L62.85 19.9 L58.8 20.5 L54.55 20.9 L54.4 20.05 L58.35 18.65 L62.2 17.3 L65.85 16.05 L69.3 14.75 L72.6 13.5 L75.7 12.25 L78.6 10.95 L81.3 9.7 L83.8 8.35 L86.15 7.05 Z M85.7 7.25 L90.25 11.65 L88.9 12.35 Z M90.25 11.65 L90.35 13.3 L87.3 12.05 Z",
      "M75.75 16 L75.75 72 L70.25 72 L70.25 16 Z",
      "M73 40.5 L91 40.5 L91 42.5 L73 42.5 Z M91 40.5 L81 41.5 L86 36 Z",
      "M64.25 34.5 L64.25 71 L58.75 73.75 L58.75 33.5 Z M58.75 68 L64.25 72 L60.5 76 L56 71 Z M64.25 34.5 L65.6 35.5 L63.25 37 Z M61.5 70 L93 70 L93 72 L61.5 72 Z M93 70 L81 71 L87 65 Z",
      "M31.5 14 L46 14 L46 16 L31.5 16 Z M48.6 15.5 L40.35 43.35 L33.7 44.45 L42.85 15 Z M43 14 L46 11.5 L51.5 16 L49 17.5 L43 20 Z M37.5 37.5 L37.5 42.5 L40.5 43.5 L36.5 47.5 L31.5 42.5 Z",
      "M37.5 41.5 L50 41.5 L50 43.5 L37.5 43.5 Z M52.95 42.9 L51.55 50.35 L49.8 57.3 L47.8 63.75 L45.5 69.65 L42.9 75.05 L39.95 79.9 L36.7 84.15 L33.2 87.9 L29.35 90.95 L25.2 93.35 L24.75 92.6 L28.15 89.5 L31.25 86.05 L34.1 82.2 L36.7 77.9 L39.05 73.15 L41.2 67.95 L43 62.2 L44.6 56 L45.95 49.3 L47 42.05 Z M47 41.5 L50 39 L55.5 43.5 L53 45 L47 47.5 Z",
      "M35 51.9 L37.45 59.1 L40.4 65.4 L44 70.75 L48.2 75.2 L53.05 78.8 L58.55 81.55 L64.8 83.55 L71.8 84.75 L79.6 85.1 L88.25 84.7 L88.7 91.25 L79.5 91.4 L71.05 90.6 L63.35 88.85 L56.5 86.25 L50.45 82.65 L45.3 78.2 L41.05 72.85 L37.75 66.7 L35.45 59.75 L34.1 52.05 Z M88.7 91.25 L88.25 84.7 L93.7 84.25 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M8.35 26.5 L33.4 26.5 L33.4 28.5 L8.35 28.5 Z M33.4 26.5 L25.4 27.5 L29.4 23 Z",
          "bounds": [
            8.35,
            23,
            33.4,
            28.5
          ],
          "direction": "right",
          "weight": 25.0125
        }
      ],
      [
        {
          "outline": "M23.75 8 L23.75 85.5 L17.75 85.5 L17.75 7 Z M23.75 8 L25.25 9 L22.75 10.5 Z M17.75 85.5 L23.75 85.5 L22.55 87.3 L20.75 88.5 L18.95 87.3 Z",
          "bounds": [
            17.75,
            7,
            25.25,
            88.5
          ],
          "direction": "down",
          "weight": 78
        },
        {
          "outline": "M23.75 85.5 L23.65 86.75 L23.45 88 L23.05 89.2 L22.4 90.35 L21.6 91.35 L20.6 92.15 L19.45 92.8 L18.25 93.2 L17 93.4 L15.75 93.5 L15.75 87.5 L16.35 87.45 L16.8 87.35 L17.1 87.25 L17.25 87.2 L17.35 87.1 L17.45 87 L17.5 86.85 L17.6 86.55 L17.7 86.1 L17.75 85.5 Z M15.75 90.5 L9.75 89 L9.75 87.5 L15.75 87.5 Z",
          "bounds": [
            9.75,
            85.5,
            23.75,
            93.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M20.75 85.5 Q20.75 90.5 15.75 90.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.6 58.15 L10.15 56.8 L12.7 55.5 L15.2 54.15 L17.75 52.85 L20.3 51.5 L22.8 50.15 L25.35 48.85 L27.9 47.5 L30.5 46.3 L33.1 45.1 L33.65 45.85 L31.55 47.85 L29.35 49.75 L27.15 51.6 L24.85 53.35 L22.55 55.1 L20.2 56.8 L17.85 58.45 L15.45 60.1 L13 61.7 L10.6 63.3 Z M10.6 63.3 L6.7 58.65 L7.6 58.15 Z M10.6 63.3 L12.45 60.5 L12.2 64.1 Z",
          "bounds": [
            6.7,
            45.1,
            33.65,
            64.1
          ],
          "direction": "curve",
          "weight": 29.181769,
          "revealPath": "M8.675 61 Q21.6125 53.5 33.4 45.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M88.9 12.35 L86.25 13.5 L83.4 14.6 L80.4 15.65 L77.25 16.65 L73.9 17.55 L70.4 18.4 L66.7 19.2 L62.85 19.9 L58.8 20.5 L54.55 20.9 L54.4 20.05 L58.35 18.65 L62.2 17.3 L65.85 16.05 L69.3 14.75 L72.6 13.5 L75.7 12.25 L78.6 10.95 L81.3 9.7 L83.8 8.35 L86.15 7.05 Z M85.7 7.25 L90.25 11.65 L88.9 12.35 Z M90.25 11.65 L90.35 13.3 L87.3 12.05 Z",
          "bounds": [
            54.4,
            7.05,
            90.35,
            20.9
          ],
          "direction": "curve",
          "weight": 35.25975,
          "revealPath": "M88 9.5 Q75.5 16 54.5 20.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.75 16 L75.75 72 L70.25 72 L70.25 16 Z",
          "bounds": [
            70.25,
            16,
            75.75,
            72
          ],
          "direction": "down",
          "weight": 54
        }
      ],
      [
        {
          "outline": "M73 40.5 L91 40.5 L91 42.5 L73 42.5 Z M91 40.5 L81 41.5 L86 36 Z",
          "bounds": [
            73,
            36,
            91,
            42.5
          ],
          "direction": "right",
          "weight": 18
        }
      ],
      [
        {
          "outline": "M64.25 34.5 L64.25 71 L58.75 73.75 L58.75 33.5 Z M58.75 68 L64.25 72 L60.5 76 L56 71 Z M64.25 34.5 L65.6 35.5 L63.25 37 Z",
          "bounds": [
            56,
            33.5,
            65.6,
            76
          ],
          "direction": "down",
          "weight": 37
        },
        {
          "outline": "M61.5 70 L93 70 L93 72 L61.5 72 Z M93 70 L81 71 L87 65 Z",
          "bounds": [
            61.5,
            65,
            93,
            72
          ],
          "direction": "right",
          "weight": 31.5
        }
      ],
      [
        {
          "outline": "M31.5 14 L46 14 L46 16 L31.5 16 Z",
          "bounds": [
            31.5,
            14,
            46,
            16
          ],
          "direction": "right",
          "weight": 14.5
        },
        {
          "outline": "M48.6 15.5 L40.35 43.35 L33.7 44.45 L42.85 15 Z M43 14 L46 11.5 L51.5 16 L49 17.5 L43 20 Z M37.5 37.5 L37.5 42.5 L40.5 43.5 L36.5 47.5 L31.5 42.5 Z",
          "bounds": [
            31.5,
            11.5,
            51.5,
            47.5
          ],
          "direction": "left",
          "weight": 28.783676
        }
      ],
      [
        {
          "outline": "M37.5 41.5 L50 41.5 L50 43.5 L37.5 43.5 Z",
          "bounds": [
            37.5,
            41.5,
            50,
            43.5
          ],
          "direction": "right",
          "weight": 12.5
        },
        {
          "outline": "M52.95 42.9 L51.55 50.35 L49.8 57.3 L47.8 63.75 L45.5 69.65 L42.9 75.05 L39.95 79.9 L36.7 84.15 L33.2 87.9 L29.35 90.95 L25.2 93.35 L24.75 92.6 L28.15 89.5 L31.25 86.05 L34.1 82.2 L36.7 77.9 L39.05 73.15 L41.2 67.95 L43 62.2 L44.6 56 L45.95 49.3 L47 42.05 Z M47 41.5 L50 39 L55.5 43.5 L53 45 L47 47.5 Z",
          "bounds": [
            24.75,
            39,
            55.5,
            93.35
          ],
          "direction": "curve",
          "weight": 56.349357,
          "revealPath": "M50 42.5 Q44.5 80.5 25 93",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M35 51.9 L37.45 59.1 L40.4 65.4 L44 70.75 L48.2 75.2 L53.05 78.8 L58.55 81.55 L64.8 83.55 L71.8 84.75 L79.6 85.1 L88.25 84.7 L88.7 91.25 L79.5 91.4 L71.05 90.6 L63.35 88.85 L56.5 86.25 L50.45 82.65 L45.3 78.2 L41.05 72.85 L37.75 66.7 L35.45 59.75 L34.1 52.05 Z M88.7 91.25 L88.25 84.7 L93.7 84.25 Z",
          "bounds": [
            34.1,
            51.9,
            93.7,
            91.4
          ],
          "direction": "curve",
          "weight": 65.178601,
          "revealPath": "M34.5 51.5 Q42 91.5 88.5 88",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch186Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch186 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH186_STROKES = loadGlyphWikiBatch186Strokes(reviewed)
