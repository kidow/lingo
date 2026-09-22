/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch72.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芃",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "27691e57cb91b159cf35782a35d7834e7d52b6ebdcefe8a6cc3f798f283595a8",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      8
    ],
    "pathsSha256": "dad8512538c066331829e39123b728b6896e49beb6430277c6b3d7a804ec9d51",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8283.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/8283.svg",
      "dictionarySvgSha256": "d6ece0e6b040d2fcc79c186535a0288c850400fb4ca56cf0f183bae8b272ab92",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "ff21c2b81a7b038a8ec0fe6e040ffdbd5ba99f7aa33249c3f58b08090c893afc",
      "geometryReviewSha256": "ff21c2b81a7b038a8ec0fe6e040ffdbd5ba99f7aa33249c3f58b08090c893afc",
      "directionReviewSha256": "ff21c2b81a7b038a8ec0fe6e040ffdbd5ba99f7aa33249c3f58b08090c893afc"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/8283.json",
      "modifications": "Whole-glyph polygons and original curves from the pinned 2016 GlyphWiki backup scaled200 to100; grass strokes3/4 reordered to domestic order, original horizontal and connected corner grouped as stroke6, original upward hook revealed last. All vertices retained with normalized winding. No new path, bridge, trim, point edit or component substitution."
    },
    "paths": [
      "M6.45 18.4 L46.75 18.4 L46.75 20.4 L6.45 20.4 Z M46.75 18.4 L36.75 19.4 L41.75 13.9 Z",
      "M34.8 6.95 L34.8 30.3 L28.8 33.3 L28.8 5.95 Z M34.8 6.95 L36.3 7.95 L33.8 9.45 Z",
      "M52.7 18.4 L93 18.4 L93 20.4 L52.7 20.4 Z M93 18.4 L81 19.4 L87 13.4 Z",
      "M70.65 6.95 L70.65 30.3 L64.65 33.3 L64.65 5.95 Z M70.65 6.95 L72.15 7.95 L69.65 9.45 Z",
      "M33 39.35 L33 64.5 L27 64.5 L27 36.35 Z M27 64.5 L33 64.5 L31.8 66.3 L30 67.5 L28.2 66.3 Z M33 64.5 L32.6 69.25 L31.7 73.65 L30.3 77.7 L28.4 81.4 L26.05 84.65 L23.2 87.5 L19.9 89.9 L16.2 91.8 L12.1 93.25 L7.6 94.25 L7.35 93.35 L11.4 91.5 L14.95 89.45 L18 87.2 L20.55 84.75 L22.65 82.05 L24.35 79.15 L25.6 75.95 L26.45 72.45 L26.9 68.65 L27 64.5 Z",
      "M30 39.35 L68 39.35 L68 41.35 L30 41.35 Z M71 40.35 L71 84.3 L65 84.3 L65 40.35 Z M65 39.35 L68 36.85 L73.5 41.35 L71 43.35 L65 40.35 Z M65 84.3 L71 84.3 L69.8 86.1 L68 87.3 L66.2 86.1 Z M71 84.3 L71 84.95 L71.1 85.4 L71.2 85.7 L71.25 85.85 L71.35 85.95 L71.45 86 L71.6 86.1 L71.9 86.2 L72.35 86.3 L73 86.3 L73 92.3 L71.7 92.25 L70.45 92.05 L69.25 91.6 L68.1 91 L67.1 90.2 L66.3 89.2 L65.65 88.05 L65.25 86.85 L65.05 85.6 L65 84.3 Z M73 86.3 L75.1 87.2 L76 89.3 L75.1 91.4 L73 92.3 Z M73 86.3 L90.5 86.3 L90.5 92.3 L73 92.3 Z M90.5 86.3 L92.3 87.5 L93.5 89.3 L92.3 91.1 L90.5 92.3 Z M90.5 86.3 L87.5 86.3 L90.5 73.8 L91.5 73.8 Z",
      "M37.6 56.65 L40.2 57.3 L42.7 58.1 L45.05 59 L47.3 60.05 L49.35 61.15 L51.3 62.4 L53.1 63.8 L54.75 65.25 L56.3 66.8 L57.7 68.5 L52.65 71.75 L51.8 70.25 L50.8 68.8 L49.7 67.35 L48.4 65.9 L46.9 64.5 L45.3 63.1 L43.55 61.7 L41.6 60.3 L39.55 58.85 L37.25 57.5 Z M57.7 68.5 L58.05 70.75 L56.8 72.65 L54.55 73 L52.65 71.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 18.4 L46.75 18.4 L46.75 20.4 L6.45 20.4 Z M46.75 18.4 L36.75 19.4 L41.75 13.9 Z",
          "bounds": [
            6.45,
            13.9,
            46.75,
            20.4
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.95 L34.8 30.3 L28.8 33.3 L28.8 5.95 Z M34.8 6.95 L36.3 7.95 L33.8 9.45 Z",
          "bounds": [
            28.8,
            5.95,
            36.3,
            33.3
          ],
          "direction": "down",
          "weight": 25.3725
        }
      ],
      [
        {
          "outline": "M52.7 18.4 L93 18.4 L93 20.4 L52.7 20.4 Z M93 18.4 L81 19.4 L87 13.4 Z",
          "bounds": [
            52.7,
            13.4,
            93,
            20.4
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.95 L70.65 30.3 L64.65 33.3 L64.65 5.95 Z M70.65 6.95 L72.15 7.95 L69.65 9.45 Z",
          "bounds": [
            64.65,
            5.95,
            72.15,
            33.3
          ],
          "direction": "down",
          "weight": 25.3725
        }
      ],
      [
        {
          "outline": "M33 39.35 L33 64.5 L27 64.5 L27 36.35 Z M27 64.5 L33 64.5 L31.8 66.3 L30 67.5 L28.2 66.3 Z",
          "bounds": [
            27,
            36.35,
            33,
            67.5
          ],
          "direction": "down",
          "weight": 24.15
        },
        {
          "outline": "M33 64.5 L32.6 69.25 L31.7 73.65 L30.3 77.7 L28.4 81.4 L26.05 84.65 L23.2 87.5 L19.9 89.9 L16.2 91.8 L12.1 93.25 L7.6 94.25 L7.35 93.35 L11.4 91.5 L14.95 89.45 L18 87.2 L20.55 84.75 L22.65 82.05 L24.35 79.15 L25.6 75.95 L26.45 72.45 L26.9 68.65 L27 64.5 Z",
          "bounds": [
            7.35,
            64.5,
            33,
            94.25
          ],
          "direction": "curve",
          "weight": 36.962219,
          "revealPath": "M30 64.5 Q30 87.615 7.5 93.825",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M30 39.35 L68 39.35 L68 41.35 L30 41.35 Z",
          "bounds": [
            30,
            39.35,
            68,
            41.35
          ],
          "direction": "right",
          "weight": 38
        },
        {
          "outline": "M71 40.35 L71 84.3 L65 84.3 L65 40.35 Z M65 39.35 L68 36.85 L73.5 41.35 L71 43.35 L65 40.35 Z M65 84.3 L71 84.3 L69.8 86.1 L68 87.3 L66.2 86.1 Z",
          "bounds": [
            65,
            36.85,
            73.5,
            87.3
          ],
          "direction": "down",
          "weight": 43.99
        },
        {
          "outline": "M71 84.3 L71 84.95 L71.1 85.4 L71.2 85.7 L71.25 85.85 L71.35 85.95 L71.45 86 L71.6 86.1 L71.9 86.2 L72.35 86.3 L73 86.3 L73 92.3 L71.7 92.25 L70.45 92.05 L69.25 91.6 L68.1 91 L67.1 90.2 L66.3 89.2 L65.65 88.05 L65.25 86.85 L65.05 85.6 L65 84.3 Z M73 86.3 L75.1 87.2 L76 89.3 L75.1 91.4 L73 92.3 Z",
          "bounds": [
            65,
            84.3,
            76,
            92.3
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M68 84.34 Q68 89.34 73 89.34",
          "revealWidth": 14
        },
        {
          "outline": "M73 86.3 L90.5 86.3 L90.5 92.3 L73 92.3 Z M90.5 86.3 L92.3 87.5 L93.5 89.3 L92.3 91.1 L90.5 92.3 Z",
          "bounds": [
            73,
            86.3,
            93.5,
            92.3
          ],
          "direction": "right",
          "weight": 17.5
        },
        {
          "outline": "M90.5 86.3 L87.5 86.3 L90.5 73.8 L91.5 73.8 Z",
          "bounds": [
            87.5,
            73.8,
            91.5,
            86.3
          ],
          "direction": "up",
          "weight": 12.5
        }
      ],
      [
        {
          "outline": "M37.6 56.65 L40.2 57.3 L42.7 58.1 L45.05 59 L47.3 60.05 L49.35 61.15 L51.3 62.4 L53.1 63.8 L54.75 65.25 L56.3 66.8 L57.7 68.5 L52.65 71.75 L51.8 70.25 L50.8 68.8 L49.7 67.35 L48.4 65.9 L46.9 64.5 L45.3 63.1 L43.55 61.7 L41.6 60.3 L39.55 58.85 L37.25 57.5 Z M57.7 68.5 L58.05 70.75 L56.8 72.65 L54.55 73 L52.65 71.75 Z",
          "bounds": [
            37.25,
            56.65,
            58.05,
            73
          ],
          "direction": "curve",
          "weight": 23.894771,
          "revealPath": "M37 56.91 Q50 62.085 56 71.4",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch72Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch72 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH72_STROKES = loadGlyphWikiBatch72Strokes(reviewed)
