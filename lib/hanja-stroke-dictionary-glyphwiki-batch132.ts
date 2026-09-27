/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch132.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "昄",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "360a64587621fbe25125982dcd65a1dfef569eb08639f0728dea5574c484dc8d",
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
    "pathsSha256": "e95011a504d56759c11fc6123a8e3da43458405373379ae211601c6fb355c28d",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6604.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6604.svg",
      "dictionarySvgSha256": "9098730275ef629095eae0fae487a977327e83e5e29c5ecac27984be04200bb2",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "66c9a2d9516144510ae10472ecd8a20c74569a49cb8bb997592add619af58bdf",
      "geometryReviewSha256": "66c9a2d9516144510ae10472ecd8a20c74569a49cb8bb997592add619af58bdf",
      "directionReviewSha256": "66c9a2d9516144510ae10472ecd8a20c74569a49cb8bb997592add619af58bdf"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u6604-g@3",
      "revision": "u6604-g@3; u65e5-01@10; u53cd-g02@4; observed2026-09-27; source SHA256 4919696adba146caaf22872fe5d239b294801c67563f6c43a82c8150e91f4606",
      "editableSource": "/hanja-strokes/glyphwiki/6604.json",
      "modifications": "Whole 昄 u6604-g@3 with its declared u65e5-01@10 and u53cd-g02@4, observed2026-09-27. Scale200 to100 using default mincho new Kage(). Original raw groups0;1+2;3;4;9;5;6+7;8 follow observed domestic8stroke order; move original falling roof before descending side. Preserve4originalquadratic primitives, all polygon vertices and exact compound endpoints; winding normalized only. No invented points, bridges, trimming, custom widths or component substitution."
    },
    "paths": [
      "M15.1 18 L15.1 82 L9.1 85 L9.1 15 Z",
      "M12.1 18 L32.45 18 L32.45 20 L12.1 20 Z M35.45 19 L35.45 77 L29.45 80 L29.45 19 Z M29.45 18 L32.45 15.5 L37.95 20 L35.45 22 L29.45 19 Z",
      "M12.1 46 L32.45 46 L32.45 48 L12.1 48 Z",
      "M12.1 74 L32.45 74 L32.45 76 L12.1 76 Z",
      "M88.45 12.45 L84.85 13.65 L81.1 14.7 L77.3 15.6 L73.35 16.35 L69.3 17 L65.15 17.45 L60.9 17.75 L56.55 17.85 L52.05 17.75 L47.5 17.4 L47.5 16.55 L52 15.85 L56.3 15.2 L60.55 14.45 L64.6 13.7 L68.55 12.8 L72.35 11.85 L76 10.75 L79.55 9.55 L82.95 8.3 L86.2 6.9 Z M85.75 7.05 L90.75 11.5 L88.45 12.45 Z M90.75 11.5 L90.85 13.1 L87.6 11.7 Z",
      "M50.5 16 L50.5 48 L44.5 48 L44.5 13 Z M44.5 48 L50.5 48 L49.3 49.8 L47.5 51 L45.7 49.8 Z M50.5 48.05 L49.95 54.25 L49.1 60.1 L47.85 65.55 L46.3 70.65 L44.35 75.4 L42.05 79.75 L39.45 83.7 L36.45 87.25 L33.1 90.3 L29.4 92.85 L28.85 92.1 L31.8 88.9 L34.4 85.5 L36.7 81.9 L38.7 78 L40.45 73.8 L41.85 69.3 L42.95 64.45 L43.8 59.25 L44.3 53.75 L44.5 47.9 Z",
      "M47.5 33.5 L84.75 33.5 L84.75 35.5 L47.5 35.5 Z M87.7 34.95 L85.7 44.2 L83 52.75 L79.55 60.55 L75.35 67.6 L70.4 73.85 L64.75 79.35 L58.4 84 L51.4 87.85 L43.7 90.8 L35.35 92.9 L35.15 92.05 L43.05 89.05 L50.15 85.45 L56.55 81.3 L62.2 76.5 L67.15 71.1 L71.45 65.05 L75 58.35 L77.95 50.95 L80.2 42.85 L81.75 34 Z M81.75 33.5 L84.75 31 L90.25 35.5 L87.75 37 L81.75 39.5 Z",
      "M58.7 34.95 L60.35 42.8 L62.3 50.1 L64.65 56.75 L67.4 62.8 L70.55 68.25 L74.15 73.15 L78.15 77.4 L82.55 81.15 L87.45 84.35 L92.75 87 L89.95 92.95 L84.15 89.65 L78.9 85.75 L74.2 81.3 L70.1 76.25 L66.55 70.7 L63.6 64.55 L61.2 57.95 L59.45 50.8 L58.3 43.15 L57.8 35 Z M89.95 92.95 L92.75 87 L95.65 88.35 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M15.1 18 L15.1 82 L9.1 85 L9.1 15 Z",
          "bounds": [
            9.1,
            15,
            15.1,
            85
          ],
          "direction": "down",
          "weight": 56
        }
      ],
      [
        {
          "outline": "M12.1 18 L32.45 18 L32.45 20 L12.1 20 Z",
          "bounds": [
            12.1,
            18,
            32.45,
            20
          ],
          "direction": "right",
          "weight": 20.37
        },
        {
          "outline": "M35.45 19 L35.45 77 L29.45 80 L29.45 19 Z M29.45 18 L32.45 15.5 L37.95 20 L35.45 22 L29.45 19 Z",
          "bounds": [
            29.45,
            15.5,
            37.95,
            80
          ],
          "direction": "down",
          "weight": 56
        }
      ],
      [
        {
          "outline": "M12.1 46 L32.45 46 L32.45 48 L12.1 48 Z",
          "bounds": [
            12.1,
            46,
            32.45,
            48
          ],
          "direction": "right",
          "weight": 20.37
        }
      ],
      [
        {
          "outline": "M12.1 74 L32.45 74 L32.45 76 L12.1 76 Z",
          "bounds": [
            12.1,
            74,
            32.45,
            76
          ],
          "direction": "right",
          "weight": 20.37
        }
      ],
      [
        {
          "outline": "M88.45 12.45 L84.85 13.65 L81.1 14.7 L77.3 15.6 L73.35 16.35 L69.3 17 L65.15 17.45 L60.9 17.75 L56.55 17.85 L52.05 17.75 L47.5 17.4 L47.5 16.55 L52 15.85 L56.3 15.2 L60.55 14.45 L64.6 13.7 L68.55 12.8 L72.35 11.85 L76 10.75 L79.55 9.55 L82.95 8.3 L86.2 6.9 Z M85.75 7.05 L90.75 11.5 L88.45 12.45 Z M90.75 11.5 L90.85 13.1 L87.6 11.7 Z",
          "bounds": [
            47.5,
            6.9,
            90.85,
            17.85
          ],
          "direction": "curve",
          "weight": 40.982119,
          "revealPath": "M87.81 9.5 Q70.47 16.5 47.52 17",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.5 16 L50.5 48 L44.5 48 L44.5 13 Z M44.5 48 L50.5 48 L49.3 49.8 L47.5 51 L45.7 49.8 Z",
          "bounds": [
            44.5,
            13,
            50.5,
            51
          ],
          "direction": "down",
          "weight": 31
        },
        {
          "outline": "M50.5 48.05 L49.95 54.25 L49.1 60.1 L47.85 65.55 L46.3 70.65 L44.35 75.4 L42.05 79.75 L39.45 83.7 L36.45 87.25 L33.1 90.3 L29.4 92.85 L28.85 92.1 L31.8 88.9 L34.4 85.5 L36.7 81.9 L38.7 78 L40.45 73.8 L41.85 69.3 L42.95 64.45 L43.8 59.25 L44.3 53.75 L44.5 47.9 Z",
          "bounds": [
            28.85,
            47.9,
            50.5,
            92.85
          ],
          "direction": "curve",
          "weight": 48.138754,
          "revealPath": "M47.52 48 Q46.5 79 29.159999999999997 92.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.5 33.5 L84.75 33.5 L84.75 35.5 L47.5 35.5 Z",
          "bounds": [
            47.5,
            33.5,
            84.75,
            35.5
          ],
          "direction": "right",
          "weight": 37.23
        },
        {
          "outline": "M87.7 34.95 L85.7 44.2 L83 52.75 L79.55 60.55 L75.35 67.6 L70.4 73.85 L64.75 79.35 L58.4 84 L51.4 87.85 L43.7 90.8 L35.35 92.9 L35.15 92.05 L43.05 89.05 L50.15 85.45 L56.55 81.3 L62.2 76.5 L67.15 71.1 L71.45 65.05 L75 58.35 L77.95 50.95 L80.2 42.85 L81.75 34 Z M81.75 33.5 L84.75 31 L90.25 35.5 L87.75 37 L81.75 39.5 Z",
          "bounds": [
            35.15,
            31,
            90.25,
            92.9
          ],
          "direction": "curve",
          "weight": 76.231758,
          "revealPath": "M84.75 34.5 Q77.61 81.5 35.28 92.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M58.7 34.95 L60.35 42.8 L62.3 50.1 L64.65 56.75 L67.4 62.8 L70.55 68.25 L74.15 73.15 L78.15 77.4 L82.55 81.15 L87.45 84.35 L92.75 87 L89.95 92.95 L84.15 89.65 L78.9 85.75 L74.2 81.3 L70.1 76.25 L66.55 70.7 L63.6 64.55 L61.2 57.95 L59.45 50.8 L58.3 43.15 L57.8 35 Z M89.95 92.95 L92.75 87 L95.65 88.35 Z",
          "bounds": [
            57.8,
            34.95,
            95.65,
            92.95
          ],
          "direction": "curve",
          "weight": 64.64652,
          "revealPath": "M58.23 34.5 Q62.31 76.5 91.38 90",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch132Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch132 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH132_STROKES = loadGlyphWikiBatch132Strokes(reviewed)
