/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch151.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芾",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "809eb9d92840f02b4ddf60965c7d8f1ba9ac3c66f9a505523c0e4cb2345556fb",
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
    "pathsSha256": "ba9c13597b7bc2c71f8bcf245bfbf7104708d268b1d8d2c7edb81f8ba441c8d6",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82BE.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82BE.svg",
      "dictionarySvgSha256": "7f2ba3bbb99a8a16c8109b2c50c7121624db03c8f764ade53b68b9321b8003b3",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "3f9a503e575f6f0d05302d40dc651f1332fcdd30074cd2f50147f896496d48b9",
      "geometryReviewSha256": "3f9a503e575f6f0d05302d40dc651f1332fcdd30074cd2f50147f896496d48b9",
      "directionReviewSha256": "3f9a503e575f6f0d05302d40dc651f1332fcdd30074cd2f50147f896496d48b9"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/koseki-343620@10",
      "revision": "koseki-343620@10; ufa5e-03@8; u5dff-j@2; alias u82be-k@4; observed2026-09-27; source SHA256 dfa91b4d3554f1071323ada12f3f96a2a63fa3cc393596cd602ae28177e6ebc2",
      "editableSource": "/hanja-strokes/glyphwiki/82be.json",
      "modifications": "Whole 芾 koseki-343620@10 via provider alias u82be-k@4 with exactly declared ufa5e-03@8 and u5dff-j@2. Default mincho new Kage(); scale 200 to 100. Domestic order groups original raw 0;1;3;2;4;5;6+7;8. Domestic seventh stroke follows original connected horizontal, vertical and quadratic hook. Preserve original quadratic and all polygon vertices; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.45 16.85 L47.25 16.85 L47.25 18.85 L6.45 18.85 Z M47.25 16.85 L35.25 17.85 L41.25 11.85 Z",
      "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
      "M52.2 16.85 L93 16.85 L93 18.85 L52.2 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
      "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
      "M7 40.25 L93 40.25 L93 42.25 L7 42.25 Z M93 40.25 L81 41.25 L87 35.25 Z",
      "M24.5 53.75 L24.5 82.85 L18.5 85.85 L18.5 50.75 Z",
      "M21.5 53.75 L78.5 53.75 L78.5 55.75 L21.5 55.75 Z M81.5 54.75 L81.5 77.85 L75.5 77.85 L75.5 54.75 Z M75.5 53.75 L78.5 51.25 L84 55.75 L81.5 57.75 L75.5 54.75 Z M75.5 77.85 L81.5 77.85 L80.3 79.65 L78.5 80.85 L76.7 79.65 Z M81.5 77.85 L81.4 79.15 L81.2 80.4 L80.8 81.6 L80.15 82.7 L79.35 83.7 L78.35 84.55 L77.2 85.15 L76 85.55 L74.75 85.8 L73.5 85.85 L73.5 79.85 L74.1 79.8 L74.55 79.75 L74.85 79.65 L75 79.55 L75.1 79.5 L75.2 79.4 L75.25 79.2 L75.35 78.9 L75.45 78.45 L75.5 77.85 Z M73.5 82.85 L67.5 81.35 L67.5 79.85 L73.5 79.85 Z",
      "M53 28.25 L53 90.75 L47 93.75 L47 27.25 Z M53 28.25 L54.5 29.25 L52 30.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.85 L47.25 16.85 L47.25 18.85 L6.45 18.85 Z M47.25 16.85 L35.25 17.85 L41.25 11.85 Z",
          "bounds": [
            6.45,
            11.85,
            47.25,
            18.85
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
          "bounds": [
            28.8,
            5.75,
            36.3,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M52.2 16.85 L93 16.85 L93 18.85 L52.2 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
          "bounds": [
            52.2,
            11.85,
            93,
            18.85
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
          "bounds": [
            64.65,
            5.75,
            72.15,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M7 40.25 L93 40.25 L93 42.25 L7 42.25 Z M93 40.25 L81 41.25 L87 35.25 Z",
          "bounds": [
            7,
            35.25,
            93,
            42.25
          ],
          "direction": "right",
          "weight": 86
        }
      ],
      [
        {
          "outline": "M24.5 53.75 L24.5 82.85 L18.5 85.85 L18.5 50.75 Z",
          "bounds": [
            18.5,
            50.75,
            24.5,
            85.85
          ],
          "direction": "down",
          "weight": 29.625
        }
      ],
      [
        {
          "outline": "M21.5 53.75 L78.5 53.75 L78.5 55.75 L21.5 55.75 Z",
          "bounds": [
            21.5,
            53.75,
            78.5,
            55.75
          ],
          "direction": "right",
          "weight": 57
        },
        {
          "outline": "M81.5 54.75 L81.5 77.85 L75.5 77.85 L75.5 54.75 Z M75.5 53.75 L78.5 51.25 L84 55.75 L81.5 57.75 L75.5 54.75 Z M75.5 77.85 L81.5 77.85 L80.3 79.65 L78.5 80.85 L76.7 79.65 Z",
          "bounds": [
            75.5,
            51.25,
            84,
            80.85
          ],
          "direction": "down",
          "weight": 23.125
        },
        {
          "outline": "M81.5 77.85 L81.4 79.15 L81.2 80.4 L80.8 81.6 L80.15 82.7 L79.35 83.7 L78.35 84.55 L77.2 85.15 L76 85.55 L74.75 85.8 L73.5 85.85 L73.5 79.85 L74.1 79.8 L74.55 79.75 L74.85 79.65 L75 79.55 L75.1 79.5 L75.2 79.4 L75.25 79.2 L75.35 78.9 L75.45 78.45 L75.5 77.85 Z M73.5 82.85 L67.5 81.35 L67.5 79.85 L73.5 79.85 Z",
          "bounds": [
            67.5,
            77.85,
            81.5,
            85.85
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M78.5 77.875 Q78.5 82.875 73.5 82.875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53 28.25 L53 90.75 L47 93.75 L47 27.25 Z M53 28.25 L54.5 29.25 L52 30.75 Z",
          "bounds": [
            47,
            27.25,
            54.5,
            93.75
          ],
          "direction": "down",
          "weight": 64.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch151Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch151 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH151_STROKES = loadGlyphWikiBatch151Strokes(reviewed)
