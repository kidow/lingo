/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch169.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "唜",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "53e28a9d8567b6c0f910989fbf31204b709284999a25cccae789aab931aec349",
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
      10
    ],
    "pathsSha256": "3a7b870b95926e71378df684306dc0fd572d667ff1988f70f77cba5784e1e101",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/551C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5500/551C.svg",
      "dictionarySvgSha256": "1a57aabeaedbedfd875a767a9880ad3be64e6dbac30077fe01265b8de2be2fd0",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "f302aa29df2d5cca17ca05a48dcfca6cfe519882d13c6dc490f52db97f0fe92f",
      "geometryReviewSha256": "f302aa29df2d5cca17ca05a48dcfca6cfe519882d13c6dc490f52db97f0fe92f",
      "directionReviewSha256": "f302aa29df2d5cca17ca05a48dcfca6cfe519882d13c6dc490f52db97f0fe92f"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u551c-k@9",
      "revision": "u551c-k@9; u672b-j@2; u20b9f-04@8; u53e3-j@20; u4e03-j@2; observed2026-10-03; source SHA256 ceef6e0a26bd8c787a69586a924cf6e9af8bcd851082ef50b26f2776a7714c18",
      "editableSource": "/hanja-strokes/glyphwiki/551c.json",
      "modifications": "Whole 唜 u551c-k@9 with only declared u672b-j@2, u20b9f-04@8, u53e3-j@20 and u4e03-j@2. Default mincho new Kage(); scale200to100. Preserve original polygon vertices and original draw trace; normalize winding only. Domestic groups0;1;2;3;4;5;6,7;8;9;10. Domestic stroke9 confirmed down-left: reverse only original line reveal endpoints, without changing its outline. Last source terminal polygon reveals upward independently. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M7.5 16.2 L92.5 16.2 L92.5 18.2 L7.5 18.2 Z M92.5 16.2 L80.5 17.2 L86.5 11.2 Z",
      "M15 30 L85 30 L85 32 L15 32 Z M85 30 L73 31 L79 25 Z",
      "M53 7.2 L53 56.8 L47 59.8 L47 6.2 Z M53 7.2 L54.5 8.2 L52 9.7 Z",
      "M52.2 31 L50.15 33 L46.9 36.1 L43.45 39 L39.7 41.75 L35.75 44.35 L31.55 46.75 L27.15 49 L22.5 51.05 L17.6 52.95 L12.5 54.6 L7.1 56 L6.85 55.15 L11.8 52.8 L16.55 50.5 L21.1 48.1 L25.35 45.65 L29.4 43.1 L33.15 40.45 L36.7 37.75 L39.95 34.9 L43 31.95 L43.85 31 Z",
      "M53.15 31.05 L56.2 33.3 L59.25 35.5 L62.5 37.65 L65.85 39.7 L69.4 41.65 L73.1 43.55 L77.05 45.3 L81.2 47 L85.5 48.6 L90.05 50.05 L87.9 56.3 L83.25 54.4 L78.85 52.4 L74.65 50.3 L70.7 48.05 L67 45.65 L63.5 43.15 L60.3 40.5 L57.35 37.75 L54.75 34.8 L52.5 31.65 Z M87.9 56.3 L90.05 50.05 L93.7 51.3 Z",
      "M15.85 65.8 L15.85 91.65 L9.85 94.65 L9.85 62.8 Z",
      "M12.85 65.8 L40.1 65.8 L40.1 67.8 L12.85 67.8 Z M43.1 66.8 L43.1 88.65 L37.1 91.65 L37.1 66.8 Z M37.1 65.8 L40.1 63.3 L45.6 67.8 L43.1 69.8 L37.1 66.8 Z",
      "M12.85 83.65 L40.1 83.65 L40.1 85.65 L12.85 85.65 Z",
      "M43.9 75.7 L93.8 68.85 L94.05 70.8 L44.15 77.7 Z M93.8 68.85 L82.05 71.45 L87.15 64.7 Z",
      "M66.2 60.2 L66.2 85.5 L60.2 85.5 L60.2 59.2 Z M66.2 60.2 L67.7 61.2 L65.2 62.7 Z M60.2 85.5 L66.2 85.5 L65 87.3 L63.2 88.5 L61.4 87.3 Z M66.2 85.5 L66.2 86.1 L66.3 86.55 L66.4 86.85 L66.45 87 L66.55 87.1 L66.65 87.2 L66.8 87.25 L67.1 87.35 L67.55 87.45 L68.2 87.5 L68.2 93.5 L66.9 93.4 L65.65 93.2 L64.45 92.8 L63.3 92.15 L62.3 91.35 L61.5 90.35 L60.85 89.2 L60.45 88 L60.25 86.75 L60.2 85.5 Z M68.2 87.5 L70.3 88.4 L71.2 90.5 L70.3 92.6 L68.2 93.5 Z M68.2 87.5 L88.7 87.5 L88.7 93.5 L68.2 93.5 Z M88.7 87.5 L90.5 88.7 L91.7 90.5 L90.5 92.3 L88.7 93.5 Z M88.7 87.5 L85.7 87.5 L88.7 75 L89.7 75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.5 16.2 L92.5 16.2 L92.5 18.2 L7.5 18.2 Z M92.5 16.2 L80.5 17.2 L86.5 11.2 Z",
          "bounds": [
            7.5,
            11.2,
            92.5,
            18.2
          ],
          "direction": "right",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M15 30 L85 30 L85 32 L15 32 Z M85 30 L73 31 L79 25 Z",
          "bounds": [
            15,
            25,
            85,
            32
          ],
          "direction": "right",
          "weight": 70
        }
      ],
      [
        {
          "outline": "M53 7.2 L53 56.8 L47 59.8 L47 6.2 Z M53 7.2 L54.5 8.2 L52 9.7 Z",
          "bounds": [
            47,
            6.2,
            54.5,
            59.8
          ],
          "direction": "down",
          "weight": 51.6
        }
      ],
      [
        {
          "outline": "M52.2 31 L50.15 33 L46.9 36.1 L43.45 39 L39.7 41.75 L35.75 44.35 L31.55 46.75 L27.15 49 L22.5 51.05 L17.6 52.95 L12.5 54.6 L7.1 56 L6.85 55.15 L11.8 52.8 L16.55 50.5 L21.1 48.1 L25.35 45.65 L29.4 43.1 L33.15 40.45 L36.7 37.75 L39.95 34.9 L43 31.95 L43.85 31 Z",
          "bounds": [
            6.85,
            31,
            52.2,
            56
          ],
          "direction": "curve",
          "weight": 47.813806,
          "revealPath": "M48 31 Q33.5 46.6 7 55.6",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.15 31.05 L56.2 33.3 L59.25 35.5 L62.5 37.65 L65.85 39.7 L69.4 41.65 L73.1 43.55 L77.05 45.3 L81.2 47 L85.5 48.6 L90.05 50.05 L87.9 56.3 L83.25 54.4 L78.85 52.4 L74.65 50.3 L70.7 48.05 L67 45.65 L63.5 43.15 L60.3 40.5 L57.35 37.75 L54.75 34.8 L52.5 31.65 Z M87.9 56.3 L90.05 50.05 L93.7 51.3 Z",
          "bounds": [
            52.5,
            31.05,
            93.7,
            56.3
          ],
          "direction": "curve",
          "weight": 42.721072,
          "revealPath": "M52.5 31 Q65.5 45.1 89 53.2",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M15.85 65.8 L15.85 91.65 L9.85 94.65 L9.85 62.8 Z",
          "bounds": [
            9.85,
            62.8,
            15.85,
            94.65
          ],
          "direction": "down",
          "weight": 17.82
        }
      ],
      [
        {
          "outline": "M12.85 65.8 L40.1 65.8 L40.1 67.8 L12.85 67.8 Z",
          "bounds": [
            12.85,
            65.8,
            40.1,
            67.8
          ],
          "direction": "right",
          "weight": 27.26
        },
        {
          "outline": "M43.1 66.8 L43.1 88.65 L37.1 91.65 L37.1 66.8 Z M37.1 65.8 L40.1 63.3 L45.6 67.8 L43.1 69.8 L37.1 66.8 Z",
          "bounds": [
            37.1,
            63.3,
            45.6,
            91.65
          ],
          "direction": "down",
          "weight": 17.82
        }
      ],
      [
        {
          "outline": "M12.85 83.65 L40.1 83.65 L40.1 85.65 L12.85 85.65 Z",
          "bounds": [
            12.85,
            83.65,
            40.1,
            85.65
          ],
          "direction": "right",
          "weight": 27.26
        }
      ],
      [
        {
          "outline": "M43.9 75.7 L93.8 68.85 L94.05 70.8 L44.15 77.7 Z M93.8 68.85 L82.05 71.45 L87.15 64.7 Z",
          "bounds": [
            43.9,
            64.7,
            94.05,
            77.7
          ],
          "direction": "curve",
          "weight": 50.352931,
          "revealPath": "M93.94 69.8475 L44.06 76.7325",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.2 60.2 L66.2 85.5 L60.2 85.5 L60.2 59.2 Z M66.2 60.2 L67.7 61.2 L65.2 62.7 Z M60.2 85.5 L66.2 85.5 L65 87.3 L63.2 88.5 L61.4 87.3 Z",
          "bounds": [
            60.2,
            59.2,
            67.7,
            88.5
          ],
          "direction": "down",
          "weight": 25.78
        },
        {
          "outline": "M66.2 85.5 L66.2 86.1 L66.3 86.55 L66.4 86.85 L66.45 87 L66.55 87.1 L66.65 87.2 L66.8 87.25 L67.1 87.35 L67.55 87.45 L68.2 87.5 L68.2 93.5 L66.9 93.4 L65.65 93.2 L64.45 92.8 L63.3 92.15 L62.3 91.35 L61.5 90.35 L60.85 89.2 L60.45 88 L60.25 86.75 L60.2 85.5 Z M68.2 87.5 L70.3 88.4 L71.2 90.5 L70.3 92.6 L68.2 93.5 Z",
          "bounds": [
            60.2,
            85.5,
            71.2,
            93.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M63.2 85.5025 Q63.2 90.5025 68.2 90.5025",
          "revealWidth": 14
        },
        {
          "outline": "M68.2 87.5 L88.7 87.5 L88.7 93.5 L68.2 93.5 Z M88.7 87.5 L90.5 88.7 L91.7 90.5 L90.5 92.3 L88.7 93.5 Z",
          "bounds": [
            68.2,
            87.5,
            91.7,
            93.5
          ],
          "direction": "right",
          "weight": 20.52
        },
        {
          "outline": "M88.7 87.5 L85.7 87.5 L88.7 75 L89.7 75 Z",
          "bounds": [
            85.7,
            75,
            89.7,
            87.5
          ],
          "direction": "up",
          "weight": 12.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch169Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch169 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH169_STROKES = loadGlyphWikiBatch169Strokes(reviewed)
