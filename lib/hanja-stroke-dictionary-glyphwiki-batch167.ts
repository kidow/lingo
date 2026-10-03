/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch167.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "珖",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "70c8f5ff2b8c8141d84d6810d5b3cc9a67c763d310c446e5adf2da4a56149164",
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
    "pathsSha256": "5db879e11ef3646007ed0cf8f4085a6ed7265a9d60ba23569d8a3e7bf781c5ed",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73D6.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73D6.svg",
      "dictionarySvgSha256": "d91619c514ecff43b1724590ac29a67585b7c6e31bf14b47cd7bd3a289ba9eb8",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "7db1cef1bd3ddf86175df170b03a9dbfdb6bb0ebd0b12bd2574dafe2fb425587",
      "geometryReviewSha256": "7db1cef1bd3ddf86175df170b03a9dbfdb6bb0ebd0b12bd2574dafe2fb425587",
      "directionReviewSha256": "7db1cef1bd3ddf86175df170b03a9dbfdb6bb0ebd0b12bd2574dafe2fb425587"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u73d6-k@5",
      "revision": "u73d6-k@5; u73d6@9; u248e9-01@10; u5149-02@5; u5149-02-var-005@2; observed2026-10-03; source SHA256 cca8111aa87bbd0f6fd1244fe2d9f07525b4ad3c0ec49ec133e2f7b2b5ac9245",
      "editableSource": "/hanja-strokes/glyphwiki/73d6.json",
      "modifications": "Whole 珖 u73d6-k@5 alias u73d6@9 with only declared u248e9-01@10 and u5149-02@5 alias u5149-02-var-005@2. Default mincho new Kage(); scale200to100. Preserve original polygon vertices and continuous trajectories; normalize winding only. Domestic groups0;1;2;3;4;5;6;7;8;9. Last source terminal polygon reveals upward independently. No direction reversal, invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M7.45 17 L39.9 17 L39.9 19 L7.45 19 Z M39.9 17 L27.9 18 L33.9 12 Z",
      "M8.5 43 L38.85 43 L38.85 45 L8.5 45 Z M38.85 43 L28.85 44 L33.85 38.5 Z",
      "M25.35 17 L25.35 73.5 L19.35 73.5 L19.35 17 Z",
      "M7.05 74.45 L10.1 73.7 L13.2 72.9 L16.3 72.05 L19.55 71.15 L22.8 70.2 L26.15 69.2 L29.55 68.15 L33 67.1 L36.6 66.05 L40.25 65.05 L40.6 65.9 L37.3 67.8 L34 69.6 L30.75 71.2 L27.5 72.75 L24.25 74.2 L21.05 75.55 L17.9 76.8 L14.8 78 L11.75 79.15 L8.75 80.2 Z M8.75 80.2 L6.1 74.75 L7.05 74.45 Z M8.75 80.2 L11.2 77.95 L10.15 81.4 Z",
      "M66.8 9.5 L66.8 50 L60.8 50 L60.8 8.5 Z M66.8 9.5 L68.3 10.5 L65.8 12 Z",
      "M41.25 17.95 L43.25 19.15 L45.15 20.55 L46.9 22.15 L48.5 23.95 L50 25.95 L51.3 28.05 L52.45 30.3 L53.5 32.75 L54.4 35.3 L55.15 37.95 L49.25 39.05 L48.9 36.65 L48.4 34.3 L47.85 32.1 L47.15 30 L46.35 27.95 L45.45 26 L44.4 24.1 L43.25 22.25 L42.05 20.45 L40.7 18.65 Z M55.15 37.95 L54.65 40.2 L52.75 41.45 L50.5 40.95 L49.25 39.05 Z",
      "M86.85 19.15 L85.75 21.25 L84.55 23.45 L83.25 25.65 L81.9 27.9 L80.45 30.2 L78.95 32.55 L77.35 34.95 L75.6 37.35 L73.75 39.8 L71.75 42.2 L70.95 41.75 L72.1 38.8 L73.3 36.05 L74.45 33.35 L75.6 30.75 L76.7 28.2 L77.75 25.8 L78.75 23.4 L79.7 21.1 L80.55 18.9 L81.35 16.7 Z M81.15 17.2 L81.65 16.1 L86.85 19.15 Z M86.85 19.15 L87.8 20.65 L84.95 21.05 Z",
      "M35.7 48 L93.5 48 L93.5 50 L35.7 50 Z M93.5 48 L83.5 49 L88.5 43.5 Z",
      "M60.3 52.6 L59.55 59 L58.35 65 L56.65 70.5 L54.5 75.55 L51.8 80.1 L48.7 84.15 L45.05 87.7 L41 90.7 L36.5 93.1 L31.55 94.9 L31.2 94.05 L35.55 91.45 L39.4 88.5 L42.8 85.3 L45.75 81.75 L48.2 77.85 L50.25 73.6 L51.9 68.9 L53.1 63.8 L53.9 58.3 L54.3 52.35 Z M54.25 52.8 L54.35 51.2 L60.3 52.6 Z M60.3 52.6 L61.75 53.7 L59.15 55.05 Z",
      "M73.3 48 L73.3 84.5 L67.3 84.5 L67.3 48 Z M67.3 84.5 L73.3 84.5 L72.1 86.3 L70.3 87.5 L68.5 86.3 Z M73.3 84.5 L73.3 85.1 L73.4 85.55 L73.5 85.85 L73.55 86 L73.65 86.1 L73.75 86.2 L73.9 86.25 L74.2 86.35 L74.65 86.45 L75.3 86.5 L75.3 92.5 L74 92.4 L72.75 92.2 L71.55 91.8 L70.4 91.15 L69.4 90.35 L68.6 89.35 L67.95 88.2 L67.55 87 L67.35 85.75 L67.3 84.5 Z M75.3 86.5 L77.35 87.4 L78.3 89.5 L77.35 91.6 L75.3 92.5 Z M75.3 86.5 L90.25 86.5 L90.25 92.5 L75.3 92.5 Z M90.25 86.5 L92.05 87.7 L93.25 89.5 L92.05 91.3 L90.25 92.5 Z M90.25 86.5 L87.25 86.5 L90.25 74 L91.25 74 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.45 17 L39.9 17 L39.9 19 L7.45 19 Z M39.9 17 L27.9 18 L33.9 12 Z",
          "bounds": [
            7.45,
            12,
            39.9,
            19
          ],
          "direction": "right",
          "weight": 32.4825
        }
      ],
      [
        {
          "outline": "M8.5 43 L38.85 43 L38.85 45 L8.5 45 Z M38.85 43 L28.85 44 L33.85 38.5 Z",
          "bounds": [
            8.5,
            38.5,
            38.85,
            45
          ],
          "direction": "right",
          "weight": 30.3525
        }
      ],
      [
        {
          "outline": "M25.35 17 L25.35 73.5 L19.35 73.5 L19.35 17 Z",
          "bounds": [
            19.35,
            17,
            25.35,
            73.5
          ],
          "direction": "down",
          "weight": 54.5
        }
      ],
      [
        {
          "outline": "M7.05 74.45 L10.1 73.7 L13.2 72.9 L16.3 72.05 L19.55 71.15 L22.8 70.2 L26.15 69.2 L29.55 68.15 L33 67.1 L36.6 66.05 L40.25 65.05 L40.6 65.9 L37.3 67.8 L34 69.6 L30.75 71.2 L27.5 72.75 L24.25 74.2 L21.05 75.55 L17.9 76.8 L14.8 78 L11.75 79.15 L8.75 80.2 Z M8.75 80.2 L6.1 74.75 L7.05 74.45 Z M8.75 80.2 L11.2 77.95 L10.15 81.4 Z",
          "bounds": [
            6.1,
            65.05,
            40.6,
            81.4
          ],
          "direction": "curve",
          "weight": 35.128197,
          "revealPath": "M7.455 77.5 Q22.8975 73 40.47 65.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.8 9.5 L66.8 50 L60.8 50 L60.8 8.5 Z M66.8 9.5 L68.3 10.5 L65.8 12 Z",
          "bounds": [
            60.8,
            8.5,
            68.3,
            50
          ],
          "direction": "down",
          "weight": 40
        }
      ],
      [
        {
          "outline": "M41.25 17.95 L43.25 19.15 L45.15 20.55 L46.9 22.15 L48.5 23.95 L50 25.95 L51.3 28.05 L52.45 30.3 L53.5 32.75 L54.4 35.3 L55.15 37.95 L49.25 39.05 L48.9 36.65 L48.4 34.3 L47.85 32.1 L47.15 30 L46.35 27.95 L45.45 26 L44.4 24.1 L43.25 22.25 L42.05 20.45 L40.7 18.65 Z M55.15 37.95 L54.65 40.2 L52.75 41.45 L50.5 40.95 L49.25 39.05 Z",
          "bounds": [
            40.7,
            17.95,
            55.15,
            41.45
          ],
          "direction": "curve",
          "weight": 25.002688,
          "revealPath": "M40.6 18 Q49.78 25.5 52.48 40",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M86.85 19.15 L85.75 21.25 L84.55 23.45 L83.25 25.65 L81.9 27.9 L80.45 30.2 L78.95 32.55 L77.35 34.95 L75.6 37.35 L73.75 39.8 L71.75 42.2 L70.95 41.75 L72.1 38.8 L73.3 36.05 L74.45 33.35 L75.6 30.75 L76.7 28.2 L77.75 25.8 L78.75 23.4 L79.7 21.1 L80.55 18.9 L81.35 16.7 Z M81.15 17.2 L81.65 16.1 L86.85 19.15 Z M86.85 19.15 L87.8 20.65 L84.95 21.05 Z",
          "bounds": [
            70.95,
            16.1,
            87.8,
            42.2
          ],
          "direction": "curve",
          "weight": 27.71663,
          "revealPath": "M84.34 17.5 Q79.48 28.5 71.38 42",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M35.7 48 L93.5 48 L93.5 50 L35.7 50 Z M93.5 48 L83.5 49 L88.5 43.5 Z",
          "bounds": [
            35.7,
            43.5,
            93.5,
            50
          ],
          "direction": "right",
          "weight": 57.78
        }
      ],
      [
        {
          "outline": "M60.3 52.6 L59.55 59 L58.35 65 L56.65 70.5 L54.5 75.55 L51.8 80.1 L48.7 84.15 L45.05 87.7 L41 90.7 L36.5 93.1 L31.55 94.9 L31.2 94.05 L35.55 91.45 L39.4 88.5 L42.8 85.3 L45.75 81.75 L48.2 77.85 L50.25 73.6 L51.9 68.9 L53.1 63.8 L53.9 58.3 L54.3 52.35 Z M54.25 52.8 L54.35 51.2 L60.3 52.6 Z M60.3 52.6 L61.75 53.7 L59.15 55.05 Z",
          "bounds": [
            31.2,
            51.2,
            61.75,
            94.9
          ],
          "direction": "curve",
          "weight": 49.780482,
          "revealPath": "M57.34 52 Q55.72 84.5 31.42 94.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.3 48 L73.3 84.5 L67.3 84.5 L67.3 48 Z M67.3 84.5 L73.3 84.5 L72.1 86.3 L70.3 87.5 L68.5 86.3 Z",
          "bounds": [
            67.3,
            48,
            73.3,
            87.5
          ],
          "direction": "down",
          "weight": 35.5
        },
        {
          "outline": "M73.3 84.5 L73.3 85.1 L73.4 85.55 L73.5 85.85 L73.55 86 L73.65 86.1 L73.75 86.2 L73.9 86.25 L74.2 86.35 L74.65 86.45 L75.3 86.5 L75.3 92.5 L74 92.4 L72.75 92.2 L71.55 91.8 L70.4 91.15 L69.4 90.35 L68.6 89.35 L67.95 88.2 L67.55 87 L67.35 85.75 L67.3 84.5 Z M75.3 86.5 L77.35 87.4 L78.3 89.5 L77.35 91.6 L75.3 92.5 Z",
          "bounds": [
            67.3,
            84.5,
            78.3,
            92.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M70.3 84.5 Q70.3 89.5 75.3 89.5",
          "revealWidth": 14
        },
        {
          "outline": "M75.3 86.5 L90.25 86.5 L90.25 92.5 L75.3 92.5 Z M90.25 86.5 L92.05 87.7 L93.25 89.5 L92.05 91.3 L90.25 92.5 Z",
          "bounds": [
            75.3,
            86.5,
            93.25,
            92.5
          ],
          "direction": "right",
          "weight": 14.98
        },
        {
          "outline": "M90.25 86.5 L87.25 86.5 L90.25 74 L91.25 74 Z",
          "bounds": [
            87.25,
            74,
            91.25,
            86.5
          ],
          "direction": "up",
          "weight": 12.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch167Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch167 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH167_STROKES = loadGlyphWikiBatch167Strokes(reviewed)
