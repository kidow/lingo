/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch142.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芟",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "8879cd35969f9e761c114f1ea82d5737da6f87043a0b5799e5329c3b3987e5d4",
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
    "pathsSha256": "e7bf0dafbd7880d9932054c7ed4c3ec5a8e2b11011063d9e150b4db5bb3c75e4",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/829F.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/829F.svg",
      "dictionarySvgSha256": "525d3f84f4e2d1ff314a12563d43200a2581670a273ab980672ffac3ece5821f",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "3df792756686d931432417dd4f36a03260681183a82dcc614dbb1453593b34a5",
      "geometryReviewSha256": "3df792756686d931432417dd4f36a03260681183a82dcc614dbb1453593b34a5",
      "directionReviewSha256": "3df792756686d931432417dd4f36a03260681183a82dcc614dbb1453593b34a5"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u829f-k@10",
      "revision": "u829f-k@10; ufa5e-03@8; u6bb3-j@2; observed2026-09-27; source SHA256 0b28dd9786506fad1a382ecf06f808069ecea3f22c76370be103698c328fa3fc",
      "editableSource": "/hanja-strokes/glyphwiki/829f.json",
      "modifications": "Whole 芟 u829f-k@10 with exactly declared ufa5e-03@8 and u6bb3-j@2. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5+6;7+8;9. Preserve all four original quadratic primitives, all polygon vertices and exact compound endpoints; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 17.35 L47.5 17.35 L47.5 19.35 L6.5 19.35 Z M47.5 17.35 L35.5 18.35 L41.5 12.35 Z",
      "M35 7.25 L35 27.95 L29 30.95 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
      "M52.5 17.35 L93.5 17.35 L93.5 19.35 L52.5 19.35 Z M93.5 17.35 L81.5 18.35 L87.5 12.35 Z",
      "M71 7.25 L71 27.95 L65 30.95 L65 6.25 Z M71 7.25 L72.5 8.25 L70 9.75 Z",
      "M35 33.95 L35 42.35 L29 42.35 L29 30.95 Z M29 42.35 L35 42.35 L33.8 44.15 L32 45.35 L30.2 44.15 Z M34.95 42.45 L34.4 45.7 L33.3 48.75 L31.6 51.5 L29.45 54 L26.85 56.2 L23.75 58.15 L20.25 59.9 L16.35 61.35 L11.95 62.6 L7.1 63.5 L6.85 62.65 L11.35 60.8 L15.3 58.9 L18.75 56.95 L21.7 55 L24.1 52.95 L26 50.85 L27.4 48.75 L28.35 46.65 L28.85 44.5 L29 42.25 Z",
      "M32 33.95 L66 33.95 L66 35.95 L32 35.95 Z M69 34.95 L69 51.45 L63 51.45 L63 34.95 Z M63 33.95 L66 31.45 L71.5 35.95 L69 37.95 L63 34.95 Z M63 51.45 L69 51.45 L67.8 53.25 L66 54.45 L64.2 53.25 Z M69 51.45 L68.95 52.05 L68.95 52.55 L69 52.9 L69 53.15 L69.1 53.3 L69.2 53.5 L69.4 53.7 L69.75 53.9 L70.3 54.05 L71 54.2 L71 58.7 L69.75 58.7 L68.6 58.55 L67.45 58.25 L66.35 57.75 L65.35 57.05 L64.55 56.1 L63.85 55.05 L63.4 53.9 L63.1 52.7 L63 51.45 Z M71 54.2 L72.55 54.85 L73.25 56.45 L72.55 58 L71 58.7 Z M71 54.2 L89 54.2 L89 58.7 L71 58.7 Z M89 54.2 L90.35 55.1 L91.25 56.45 L90.35 57.8 L89 58.7 Z M89 54.2 L86.75 54.2 L89 47.7 L90 47.7 Z",
      "M16.5 62.85 L71.5 62.85 L71.5 64.85 L16.5 64.85 Z M74 65.45 L70.2 70.25 L65.8 74.6 L60.75 78.5 L55.05 82 L48.75 85.1 L41.85 87.75 L34.3 90.05 L26.2 91.9 L17.4 93.3 L8.05 94.25 L7.9 93.35 L17.1 91.45 L25.55 89.3 L33.4 86.9 L40.5 84.2 L46.95 81.25 L52.7 78 L57.75 74.45 L62.15 70.6 L65.9 66.55 L68.95 62.2 Z M68.5 62.85 L71.5 60.35 L77 64.85 L74.5 66.35 L68.5 68.85 Z",
      "M28.65 64 L32.35 67.85 L36.45 71.4 L41 74.6 L46 77.5 L51.5 80.05 L57.55 82.2 L64.15 84.05 L71.3 85.6 L79 86.75 L87.3 87.55 L86.65 94.1 L78.1 92.95 L70.1 91.35 L62.7 89.4 L55.85 87.05 L49.6 84.3 L43.9 81.1 L38.9 77.55 L34.5 73.6 L30.8 69.25 L27.9 64.5 Z M86.65 94.1 L87.3 87.55 L92.6 88.05 Z"
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
          "outline": "M35 7.25 L35 27.95 L29 30.95 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
          "bounds": [
            29,
            6.25,
            36.5,
            30.95
          ],
          "direction": "down",
          "weight": 22.695
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
          "outline": "M35 33.95 L35 42.35 L29 42.35 L29 30.95 Z M29 42.35 L35 42.35 L33.8 44.15 L32 45.35 L30.2 44.15 Z",
          "bounds": [
            29,
            30.95,
            35,
            45.35
          ],
          "direction": "down",
          "weight": 7.4
        },
        {
          "outline": "M34.95 42.45 L34.4 45.7 L33.3 48.75 L31.6 51.5 L29.45 54 L26.85 56.2 L23.75 58.15 L20.25 59.9 L16.35 61.35 L11.95 62.6 L7.1 63.5 L6.85 62.65 L11.35 60.8 L15.3 58.9 L18.75 56.95 L21.7 55 L24.1 52.95 L26 50.85 L27.4 48.75 L28.35 46.65 L28.85 44.5 L29 42.25 Z",
          "bounds": [
            6.85,
            42.25,
            34.95,
            63.5
          ],
          "direction": "curve",
          "weight": 32.470269,
          "revealPath": "M32 42.39 Q31.5 56.45 7 63.11",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M32 33.95 L66 33.95 L66 35.95 L32 35.95 Z",
          "bounds": [
            32,
            33.95,
            66,
            35.95
          ],
          "direction": "right",
          "weight": 34
        },
        {
          "outline": "M69 34.95 L69 51.45 L63 51.45 L63 34.95 Z M63 33.95 L66 31.45 L71.5 35.95 L69 37.95 L63 34.95 Z M63 51.45 L69 51.45 L67.8 53.25 L66 54.45 L64.2 53.25 Z",
          "bounds": [
            63,
            31.45,
            71.5,
            54.45
          ],
          "direction": "down",
          "weight": 16.46
        },
        {
          "outline": "M69 51.45 L68.95 52.05 L68.95 52.55 L69 52.9 L69 53.15 L69.1 53.3 L69.2 53.5 L69.4 53.7 L69.75 53.9 L70.3 54.05 L71 54.2 L71 58.7 L69.75 58.7 L68.6 58.55 L67.45 58.25 L66.35 57.75 L65.35 57.05 L64.55 56.1 L63.85 55.05 L63.4 53.9 L63.1 52.7 L63 51.45 Z M71 54.2 L72.55 54.85 L73.25 56.45 L72.55 58 L71 58.7 Z",
          "bounds": [
            63,
            51.45,
            73.25,
            58.7
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M66 51.45 Q66 56.45 71 56.45",
          "revealWidth": 14
        },
        {
          "outline": "M71 54.2 L89 54.2 L89 58.7 L71 58.7 Z M89 54.2 L90.35 55.1 L91.25 56.45 L90.35 57.8 L89 58.7 Z M89 54.2 L86.75 54.2 L89 47.7 L90 47.7 Z",
          "bounds": [
            71,
            47.7,
            91.25,
            58.7
          ],
          "direction": "right",
          "weight": 18
        }
      ],
      [
        {
          "outline": "M16.5 62.85 L71.5 62.85 L71.5 64.85 L16.5 64.85 Z",
          "bounds": [
            16.5,
            62.85,
            71.5,
            64.85
          ],
          "direction": "right",
          "weight": 55
        },
        {
          "outline": "M74 65.45 L70.2 70.25 L65.8 74.6 L60.75 78.5 L55.05 82 L48.75 85.1 L41.85 87.75 L34.3 90.05 L26.2 91.9 L17.4 93.3 L8.05 94.25 L7.9 93.35 L17.1 91.45 L25.55 89.3 L33.4 86.9 L40.5 84.2 L46.95 81.25 L52.7 78 L57.75 74.45 L62.15 70.6 L65.9 66.55 L68.95 62.2 Z M68.5 62.85 L71.5 60.35 L77 64.85 L74.5 66.35 L68.5 68.85 Z",
          "bounds": [
            7.9,
            60.35,
            77,
            94.25
          ],
          "direction": "curve",
          "weight": 70.21717,
          "revealPath": "M71.5 63.85 Q56 87.53 8 93.82",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.65 64 L32.35 67.85 L36.45 71.4 L41 74.6 L46 77.5 L51.5 80.05 L57.55 82.2 L64.15 84.05 L71.3 85.6 L79 86.75 L87.3 87.55 L86.65 94.1 L78.1 92.95 L70.1 91.35 L62.7 89.4 L55.85 87.05 L49.6 84.3 L43.9 81.1 L38.9 77.55 L34.5 73.6 L30.8 69.25 L27.9 64.5 Z M86.65 94.1 L87.3 87.55 L92.6 88.05 Z",
          "bounds": [
            27.9,
            64,
            92.6,
            94.1
          ],
          "direction": "curve",
          "weight": 64.888675,
          "revealPath": "M28 63.85 Q43.5 86.78999999999999 87 90.86",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch142Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch142 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH142_STROKES = loadGlyphWikiBatch142Strokes(reviewed)
