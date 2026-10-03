/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch181.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "苾",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "75b974b6aaf00356aea139358a1df6ce6b236754d129c7d045f9c0704e1fe3c3",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      8,
      9
    ],
    "pathsSha256": "d8b19f927cdd39dcadf1b99377e191e000f649841801b5eebc8fddeae9698aee",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82FE.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82FE.svg",
      "dictionarySvgSha256": "e51a8c341116a080ce079fea5bd3712265afad0f7c71382da12d07f38a1454e2",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "9c8167cc249cd929a87233844e3e0204f1ba256cf247a3ff3d4f9bbbfe08e353",
      "geometryReviewSha256": "9c8167cc249cd929a87233844e3e0204f1ba256cf247a3ff3d4f9bbbfe08e353",
      "directionReviewSha256": "9c8167cc249cd929a87233844e3e0204f1ba256cf247a3ff3d4f9bbbfe08e353"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u82fe-k@6",
      "revision": "u82fe-k@6; koseki-345040@8; ufa5e-03@8; u5fc5-04@2; observed2026-10-03; source SHA256 b08829d596e7783f1a5350666e063cc8d11ee3fde76c4e0cd0274f89e53a75bc",
      "editableSource": "/hanja-strokes/glyphwiki/82fe.json",
      "modifications": "Whole Korean source and declared dependencies only; normalized200to100 and winding. Domestic grass order0,1,3,2. Domestic7 original line/curve/line joins67,168.45 and77,178.45. All five original quadratic trajectories and terminal hook retained. No invented coordinates, bridges, trimming or substituted components. Crosschecked9 cumulative states and81 progressive frames."
    },
    "paths": [
      "M6.45 18.6 L47.25 18.6 L47.25 20.6 L6.45 20.6 Z M47.25 18.6 L35.25 19.6 L41.25 13.6 Z",
      "M34.8 7.35 L34.8 30.35 L28.8 33.35 L28.8 6.35 Z M34.8 7.35 L36.3 8.35 L33.8 9.85 Z",
      "M52.2 18.6 L93 18.6 L93 20.6 L52.2 20.6 Z M93 18.6 L81 19.6 L87 13.6 Z",
      "M70.65 7.35 L70.65 30.35 L64.65 33.35 L64.65 6.35 Z M70.65 7.35 L72.15 8.35 L69.65 9.85 Z",
      "M39.65 32.7 L41.6 33.6 L43.5 34.65 L45.3 35.9 L47.05 37.3 L48.75 38.8 L50.35 40.5 L51.85 42.3 L53.3 44.2 L54.7 46.25 L56 48.4 L50.6 51.05 L49.75 48.95 L48.8 46.95 L47.8 45.05 L46.7 43.2 L45.6 41.45 L44.4 39.75 L43.2 38.1 L41.9 36.5 L40.55 34.95 L39.15 33.45 Z M56 48.4 L56.1 50.7 L54.65 52.4 L52.35 52.55 L50.6 51.05 Z",
      "M77.3 40.8 L72.3 48.5 L66.9 55.7 L61 62.35 L54.7 68.55 L48 74.2 L40.85 79.3 L33.3 83.9 L25.35 87.9 L16.95 91.35 L8.1 94.2 L7.85 93.35 L16.2 89.6 L24.1 85.5 L31.6 81.05 L38.7 76.2 L45.3 70.9 L51.55 65.15 L57.3 59 L62.65 52.4 L67.6 45.3 L72.15 37.8 Z M71.9 38.25 L72.4 37.35 L77.3 40.8 Z M77.3 40.8 L78.1 42.45 L75.2 42.45 Z",
      "M36.5 43.95 L36.5 84.2 L30.5 84.2 L30.5 42.95 Z M36.5 43.95 L38 44.95 L35.5 46.45 Z M30.5 84.2 L36.5 84.2 L35.3 86 L33.5 87.2 L31.7 86 Z M36.5 84.2 L36.5 84.8 L36.6 85.25 L36.7 85.55 L36.75 85.75 L36.85 85.85 L36.95 85.9 L37.1 86 L37.4 86.1 L37.85 86.15 L38.5 86.2 L38.5 92.2 L37.2 92.15 L35.95 91.9 L34.75 91.5 L33.6 90.9 L32.6 90.05 L31.8 89.05 L31.15 87.95 L30.75 86.75 L30.55 85.5 L30.5 84.2 Z M38.5 86.2 L40.6 87.1 L41.5 89.2 L40.6 91.3 L38.5 92.2 Z M38.5 86.2 L73 86.2 L73 92.2 L38.5 92.2 Z M73 86.2 L74.8 87.4 L76 89.2 L74.8 91 L73 92.2 Z M73 86.2 L70 86.2 L73 73.7 L74 73.7 Z",
      "M23.35 48.6 L23.2 52.2 L22.85 55.65 L22.25 58.9 L21.55 62.05 L20.65 65.05 L19.65 67.9 L18.5 70.6 L17.2 73.15 L15.8 75.55 L14.25 77.8 L9.65 73.9 L11.2 72.2 L12.7 70.3 L14.1 68.2 L15.45 65.9 L16.75 63.45 L17.95 60.8 L19.1 58 L20.2 55 L21.35 51.8 L22.45 48.45 Z M14.25 77.8 L12.2 78.8 L10 78.15 L9 76.1 L9.65 73.9 Z",
      "M76.65 52.65 L78.9 54.45 L80.95 56.4 L82.85 58.55 L84.55 60.8 L86.15 63.15 L87.55 65.65 L88.8 68.2 L89.9 70.9 L90.85 73.65 L91.65 76.45 L85.75 77.65 L85.3 75.05 L84.75 72.5 L84.1 70 L83.3 67.55 L82.35 65.1 L81.3 62.75 L80.1 60.4 L78.85 58.05 L77.45 55.65 L76 53.25 Z M91.65 76.45 L91.15 78.7 L89.25 80 L87.05 79.5 L85.75 77.65 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 18.6 L47.25 18.6 L47.25 20.6 L6.45 20.6 Z M47.25 18.6 L35.25 19.6 L41.25 13.6 Z",
          "bounds": [
            6.45,
            13.6,
            47.25,
            20.6
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M34.8 7.35 L34.8 30.35 L28.8 33.35 L28.8 6.35 Z M34.8 7.35 L36.3 8.35 L33.8 9.85 Z",
          "bounds": [
            28.8,
            6.35,
            36.3,
            33.35
          ],
          "direction": "down",
          "weight": 24.99
        }
      ],
      [
        {
          "outline": "M52.2 18.6 L93 18.6 L93 20.6 L52.2 20.6 Z M93 18.6 L81 19.6 L87 13.6 Z",
          "bounds": [
            52.2,
            13.6,
            93,
            20.6
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M70.65 7.35 L70.65 30.35 L64.65 33.35 L64.65 6.35 Z M70.65 7.35 L72.15 8.35 L69.65 9.85 Z",
          "bounds": [
            64.65,
            6.35,
            72.15,
            33.35
          ],
          "direction": "down",
          "weight": 24.99
        }
      ],
      [
        {
          "outline": "M39.65 32.7 L41.6 33.6 L43.5 34.65 L45.3 35.9 L47.05 37.3 L48.75 38.8 L50.35 40.5 L51.85 42.3 L53.3 44.2 L54.7 46.25 L56 48.4 L50.6 51.05 L49.75 48.95 L48.8 46.95 L47.8 45.05 L46.7 43.2 L45.6 41.45 L44.4 39.75 L43.2 38.1 L41.9 36.5 L40.55 34.95 L39.15 33.45 Z M56 48.4 L56.1 50.7 L54.65 52.4 L52.35 52.55 L50.6 51.05 Z",
          "bounds": [
            39.15,
            32.7,
            56.1,
            52.55
          ],
          "direction": "curve",
          "weight": 23.661995,
          "revealPath": "M39 32.8 Q48 38.900000000000006 54 51.099999999999994",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M77.3 40.8 L72.3 48.5 L66.9 55.7 L61 62.35 L54.7 68.55 L48 74.2 L40.85 79.3 L33.3 83.9 L25.35 87.9 L16.95 91.35 L8.1 94.2 L7.85 93.35 L16.2 89.6 L24.1 85.5 L31.6 81.05 L38.7 76.2 L45.3 70.9 L51.55 65.15 L57.3 59 L62.65 52.4 L67.6 45.3 L72.15 37.8 Z M71.9 38.25 L72.4 37.35 L77.3 40.8 Z M77.3 40.8 L78.1 42.45 L75.2 42.45 Z",
          "bounds": [
            7.85,
            37.35,
            78.1,
            94.2
          ],
          "direction": "curve",
          "weight": 86.619917,
          "revealPath": "M75 38.900000000000006 Q52 78.55 8 93.80000000000001",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M36.5 43.95 L36.5 84.2 L30.5 84.2 L30.5 42.95 Z M36.5 43.95 L38 44.95 L35.5 46.45 Z M30.5 84.2 L36.5 84.2 L35.3 86 L33.5 87.2 L31.7 86 Z",
          "bounds": [
            30.5,
            42.95,
            38,
            87.2
          ],
          "direction": "down",
          "weight": 40.75
        },
        {
          "outline": "M36.5 84.2 L36.5 84.8 L36.6 85.25 L36.7 85.55 L36.75 85.75 L36.85 85.85 L36.95 85.9 L37.1 86 L37.4 86.1 L37.85 86.15 L38.5 86.2 L38.5 92.2 L37.2 92.15 L35.95 91.9 L34.75 91.5 L33.6 90.9 L32.6 90.05 L31.8 89.05 L31.15 87.95 L30.75 86.75 L30.55 85.5 L30.5 84.2 Z M38.5 86.2 L40.6 87.1 L41.5 89.2 L40.6 91.3 L38.5 92.2 Z",
          "bounds": [
            30.5,
            84.2,
            41.5,
            92.2
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M33.5 84.225 Q33.5 89.225 38.5 89.225",
          "revealWidth": 14
        },
        {
          "outline": "M38.5 86.2 L73 86.2 L73 92.2 L38.5 92.2 Z M73 86.2 L74.8 87.4 L76 89.2 L74.8 91 L73 92.2 Z M73 86.2 L70 86.2 L73 73.7 L74 73.7 Z",
          "bounds": [
            38.5,
            73.7,
            76,
            92.2
          ],
          "direction": "right",
          "weight": 34.5
        }
      ],
      [
        {
          "outline": "M23.35 48.6 L23.2 52.2 L22.85 55.65 L22.25 58.9 L21.55 62.05 L20.65 65.05 L19.65 67.9 L18.5 70.6 L17.2 73.15 L15.8 75.55 L14.25 77.8 L9.65 73.9 L11.2 72.2 L12.7 70.3 L14.1 68.2 L15.45 65.9 L16.75 63.45 L17.95 60.8 L19.1 58 L20.2 55 L21.35 51.8 L22.45 48.45 Z M14.25 77.8 L12.2 78.8 L10 78.15 L9 76.1 L9.65 73.9 Z",
          "bounds": [
            9,
            48.45,
            23.35,
            78.8
          ],
          "direction": "curve",
          "weight": 31.361611,
          "revealPath": "M23 48.05 Q20 66.35 11 77.025",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M76.65 52.65 L78.9 54.45 L80.95 56.4 L82.85 58.55 L84.55 60.8 L86.15 63.15 L87.55 65.65 L88.8 68.2 L89.9 70.9 L90.85 73.65 L91.65 76.45 L85.75 77.65 L85.3 75.05 L84.75 72.5 L84.1 70 L83.3 67.55 L82.35 65.1 L81.3 62.75 L80.1 60.4 L78.85 58.05 L77.45 55.65 L76 53.25 Z M91.65 76.45 L91.15 78.7 L89.25 80 L87.05 79.5 L85.75 77.65 Z",
          "bounds": [
            76,
            52.65,
            91.65,
            80
          ],
          "direction": "curve",
          "weight": 29.001821,
          "revealPath": "M76 52.625 Q86 63.3 89 78.55",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch181Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch181 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH181_STROKES = loadGlyphWikiBatch181Strokes(reviewed)
