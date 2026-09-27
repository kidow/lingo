/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch147.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芷",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "0d2c2c311cc0f4c8abd75076f255a7f30d50849345e5aebb3b60db6819e2139c",
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
    "pathsSha256": "7ac0323f106c6fb1cf014aeead32c687545320f894b9aab63d5fabaf6d035e9b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82B7.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82B7.svg",
      "dictionarySvgSha256": "d863689b03e15308d28cf51dc779a87148b395bbabfc74eb2edd247b1b923c4d",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "3da88d5e7a275d9b2c2f2e32164a4d2bd50068fb9a47da77b2e9f40fd7d8e9d5",
      "geometryReviewSha256": "3da88d5e7a275d9b2c2f2e32164a4d2bd50068fb9a47da77b2e9f40fd7d8e9d5",
      "directionReviewSha256": "3da88d5e7a275d9b2c2f2e32164a4d2bd50068fb9a47da77b2e9f40fd7d8e9d5"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/koseki-343550@11",
      "revision": "koseki-343550@11; ufa5e-03@8; u6b62-j@2; alias u82b7-k@15; observed2026-09-27; source SHA256 7dbeafc07b29c59234fd2a0c834b4e9073da58cf9cda9273c02a03d019710da0",
      "editableSource": "/hanja-strokes/glyphwiki/82b7.json",
      "modifications": "Whole 芷 koseki-343550@11 via provider alias u82b7-k@15 with exactly declared ufa5e-03@8 and u6b62-j@2. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5;6;7. Preserve all eight original line primitives and all polygon vertices; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 18.5 L47.5 18.5 L47.5 20.5 L6.5 20.5 Z M47.5 18.5 L35.5 19.5 L41.5 13.5 Z",
      "M35 7 L35 30.5 L29 33.5 L29 6 Z M35 7 L36.5 8 L34 9.5 Z",
      "M52.5 18.5 L93.5 18.5 L93.5 20.5 L52.5 20.5 Z M93.5 18.5 L81.5 19.5 L87.5 13.5 Z",
      "M71 7 L71 30.5 L65 33.5 L65 6 Z M71 7 L72.5 8 L70 9.5 Z",
      "M55 33.85 L55 89.9 L49 89.9 L49 32.85 Z M55 33.85 L56.5 34.85 L54 36.35 Z",
      "M52 57.55 L87.5 57.55 L87.5 59.55 L52 59.55 Z M87.5 57.55 L75.5 58.55 L81.5 52.55 Z",
      "M30 53.5 L30 89.9 L24 89.9 L24 52.5 Z M30 53.5 L31.5 54.5 L29 56 Z",
      "M8 87.9 L91 87.9 L91 89.9 L8 89.9 Z M91 87.9 L79 88.9 L85 82.9 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 18.5 L47.5 18.5 L47.5 20.5 L6.5 20.5 Z M47.5 18.5 L35.5 19.5 L41.5 13.5 Z",
          "bounds": [
            6.5,
            13.5,
            47.5,
            20.5
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 7 L35 30.5 L29 33.5 L29 6 Z M35 7 L36.5 8 L34 9.5 Z",
          "bounds": [
            29,
            6,
            36.5,
            33.5
          ],
          "direction": "down",
          "weight": 25.5
        }
      ],
      [
        {
          "outline": "M52.5 18.5 L93.5 18.5 L93.5 20.5 L52.5 20.5 Z M93.5 18.5 L81.5 19.5 L87.5 13.5 Z",
          "bounds": [
            52.5,
            13.5,
            93.5,
            20.5
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 7 L71 30.5 L65 33.5 L65 6 Z M71 7 L72.5 8 L70 9.5 Z",
          "bounds": [
            65,
            6,
            72.5,
            33.5
          ],
          "direction": "down",
          "weight": 25.5
        }
      ],
      [
        {
          "outline": "M55 33.85 L55 89.9 L49 89.9 L49 32.85 Z M55 33.85 L56.5 34.85 L54 36.35 Z",
          "bounds": [
            49,
            32.85,
            56.5,
            89.9
          ],
          "direction": "down",
          "weight": 55.545
        }
      ],
      [
        {
          "outline": "M52 57.55 L87.5 57.55 L87.5 59.55 L52 59.55 Z M87.5 57.55 L75.5 58.55 L81.5 52.55 Z",
          "bounds": [
            52,
            52.55,
            87.5,
            59.55
          ],
          "direction": "right",
          "weight": 35.5
        }
      ],
      [
        {
          "outline": "M30 53.5 L30 89.9 L24 89.9 L24 52.5 Z M30 53.5 L31.5 54.5 L29 56 Z",
          "bounds": [
            24,
            52.5,
            31.5,
            89.9
          ],
          "direction": "down",
          "weight": 35.88
        }
      ],
      [
        {
          "outline": "M8 87.9 L91 87.9 L91 89.9 L8 89.9 Z M91 87.9 L79 88.9 L85 82.9 Z",
          "bounds": [
            8,
            82.9,
            91,
            89.9
          ],
          "direction": "right",
          "weight": 83
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch147Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch147 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH147_STROKES = loadGlyphWikiBatch147Strokes(reviewed)
