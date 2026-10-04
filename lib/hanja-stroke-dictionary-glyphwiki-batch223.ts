/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch223.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "荻",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "bdd0dafb103f70477aad1778141affece288e9255321b6b51f2a6fdcd0a5b594",
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
      9,
      10,
      11
    ],
    "pathsSha256": "97b8e0d3c6348683507f88f15911dd3694dc8882e86bc16f24b066ef940aea9d",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/837b.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/837b.svg",
      "dictionarySvgSha256": "ddd36060995099585dcd27aa3edded853f89c81aae791101d0b019dff1b79c40",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "f8cbd5c5fb92aca6dbbbd57e4d51ca065d6f112f75f745ebf526b1e713a9937c",
      "geometryReviewSha256": "f8cbd5c5fb92aca6dbbbd57e4d51ca065d6f112f75f745ebf526b1e713a9937c",
      "directionReviewSha256": "f8cbd5c5fb92aca6dbbbd57e4d51ca065d6f112f75f745ebf526b1e713a9937c"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u837b-k/u837b-var-001/u8279-k03/u72c4/u72ad-01/u706b-02; individual glyph revisions unavailable; source SHA256 15e7f21d5590378c8d23838f53e864f787169b0eca92f4d72f355760a9471ae7",
      "editableSource": "/hanja-strokes/glyphwiki/837b.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u837b-k and only declared u837b-var-001/u8279-k03/u72c4/u72ad-01/u706b-02. Original11 groups13 primitives,Q7/C1, all coordinates, polygons and engine defaults preserved. Reorder grass raw3 before raw2 for observed domestic3/4. Domestic6 retains original connected C/Q terminal hook at60.99648069999707,174.83209984523938; domestic10 retains connected line/Q at129.3534,94.9. Normalize200to100 and winding only; no invented geometry, bridges, splitting, trimming, reversal, width changes or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.45 17.45 L46.75 17.45 L46.75 19.45 L6.45 19.45 Z M46.75 17.45 L36.75 18.45 L41.75 12.95 Z",
      "M34.8 7.65 L34.8 27.8 L28.8 30.8 L28.8 6.65 Z M34.8 7.65 L36.3 8.65 L33.8 10.15 Z",
      "M52.7 17.45 L93 17.45 L93 19.45 L52.7 19.45 Z M93 17.45 L81 18.45 L87 12.45 Z",
      "M70.65 7.65 L70.65 27.8 L64.65 30.8 L64.65 6.65 Z M70.65 7.65 L72.15 8.65 L69.65 10.15 Z",
      "M40.35 35.25 L37.65 38.55 L34.85 41.65 L31.85 44.55 L28.7 47.25 L25.4 49.8 L21.95 52.1 L18.35 54.2 L14.6 56.1 L10.7 57.7 L6.65 59.05 L6.3 58.2 L9.85 56 L13.3 53.75 L16.6 51.45 L19.75 49 L22.75 46.5 L25.6 43.8 L28.3 41 L30.85 38.05 L33.2 34.95 L35.5 31.75 Z M35.2 32.15 L35.7 31.4 L40.35 35.25 Z M40.35 35.25 L41 36.9 L38.1 36.7 Z",
      "M10.1 32.95 L18.65 37.65 L25.2 43.65 L30.05 50.2 L33.45 57.05 L35.55 63.85 L36.5 70.4 L36.55 76.4 L35.85 81.65 L34.6 86 L32.75 89.35 L28.2 85.45 L29.3 83.7 L30.45 80.4 L31.25 75.95 L31.5 70.65 L30.9 64.75 L29.35 58.5 L26.65 52.15 L22.55 45.8 L16.95 39.75 L9.65 33.7 Z M32.75 89.35 L30.7 90.35 L28.5 89.65 L27.5 87.6 L28.2 85.45 Z M32.75 89.35 L31.9 90.25 L31 91.05 L30.1 91.8 L29.05 92.4 L28 92.95 L26.9 93.4 L25.8 93.75 L24.6 94 L23.4 94.15 L22.2 94.2 L22.2 88.2 L22.95 88.15 L23.65 88.05 L24.3 87.95 L24.95 87.75 L25.5 87.5 L26.1 87.2 L26.65 86.85 L27.15 86.45 L27.7 86 L28.2 85.45 Z M22.2 91.2 L15.2 89.7 L15.2 88.2 L22.2 88.2 Z",
      "M33.6 58.7 L31.75 61.4 L29.75 64 L27.5 66.5 L25.1 68.85 L22.5 71.1 L19.75 73.25 L16.75 75.25 L13.6 77.15 L10.25 78.85 L6.7 80.35 L6.25 79.6 L9.25 77.25 L12.1 74.95 L14.8 72.65 L17.3 70.35 L19.65 68 L21.75 65.65 L23.7 63.2 L25.45 60.75 L27 58.3 L28.4 55.75 Z",
      "M48.8 45.7 L49.65 48 L50.4 50.25 L50.85 52.4 L51.05 54.5 L51 56.5 L50.6 58.5 L49.95 60.4 L49 62.15 L47.7 63.75 L46.15 65.2 L42.85 60.2 L43.95 59.6 L44.95 58.85 L45.8 57.95 L46.55 56.9 L47.2 55.65 L47.65 54.15 L48 52.45 L48.2 50.5 L48.25 48.3 L47.95 45.95 Z M46.15 65.2 L43.9 65.6 L42 64.35 L41.6 62.1 L42.85 60.2 Z",
      "M90.55 50.75 L89.15 51.65 L87.6 52.6 L85.9 53.55 L84 54.6 L81.95 55.65 L79.75 56.8 L77.3 57.95 L74.7 59.1 L71.85 60.3 L68.85 61.45 L68.4 60.7 L71 58.7 L73.4 56.85 L75.65 55.2 L77.8 53.6 L79.75 52.1 L81.5 50.75 L83.1 49.45 L84.5 48.25 L85.7 47.15 L86.75 46.1 Z M86.35 46.45 L86.8 46.1 L90.55 50.75 Z M90.55 50.75 L90.7 52.55 L88 51.55 Z",
      "M67.65 33.25 L67.65 47.45 L61.65 47.45 L61.65 32.25 Z M67.65 33.25 L69.15 34.25 L66.65 35.75 Z M61.65 47.45 L67.65 47.45 L66.45 49.25 L64.65 50.45 L62.85 49.25 Z M67.65 47.45 L67.2 54.75 L66.05 61.55 L64.3 67.75 L61.9 73.4 L58.85 78.45 L55.15 82.85 L50.8 86.6 L45.9 89.7 L40.45 92.05 L34.45 93.7 L34.2 92.85 L39.7 90.3 L44.55 87.4 L48.75 84.05 L52.3 80.3 L55.3 76.1 L57.7 71.4 L59.55 66.2 L60.8 60.5 L61.5 54.25 L61.65 47.45 Z",
      "M67.1 48.65 L67.8 54.45 L68.85 59.75 L70.3 64.65 L72.1 69.15 L74.3 73.2 L76.9 76.85 L79.9 80.15 L83.3 83.05 L87.2 85.65 L91.5 87.85 L88.55 93.8 L83.8 90.9 L79.55 87.6 L75.9 83.95 L72.75 79.85 L70.2 75.45 L68.2 70.7 L66.8 65.65 L65.95 60.25 L65.75 54.55 L66.2 48.6 Z M88.55 93.8 L91.5 87.85 L94.2 89.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 17.45 L46.75 17.45 L46.75 19.45 L6.45 19.45 Z M46.75 17.45 L36.75 18.45 L41.75 12.95 Z",
          "bounds": [
            6.45,
            12.95,
            46.75,
            19.45
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 7.65 L34.8 27.8 L28.8 30.8 L28.8 6.65 Z M34.8 7.65 L36.3 8.65 L33.8 10.15 Z",
          "bounds": [
            28.8,
            6.65,
            36.3,
            30.8
          ],
          "direction": "down",
          "weight": 22.185
        }
      ],
      [
        {
          "outline": "M52.7 17.45 L93 17.45 L93 19.45 L52.7 19.45 Z M93 17.45 L81 18.45 L87 12.45 Z",
          "bounds": [
            52.7,
            12.45,
            93,
            19.45
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 7.65 L70.65 27.8 L64.65 30.8 L64.65 6.65 Z M70.65 7.65 L72.15 8.65 L69.65 10.15 Z",
          "bounds": [
            64.65,
            6.65,
            72.15,
            30.8
          ],
          "direction": "down",
          "weight": 22.185
        }
      ],
      [
        {
          "outline": "M40.35 35.25 L37.65 38.55 L34.85 41.65 L31.85 44.55 L28.7 47.25 L25.4 49.8 L21.95 52.1 L18.35 54.2 L14.6 56.1 L10.7 57.7 L6.65 59.05 L6.3 58.2 L9.85 56 L13.3 53.75 L16.6 51.45 L19.75 49 L22.75 46.5 L25.6 43.8 L28.3 41 L30.85 38.05 L33.2 34.95 L35.5 31.75 Z M35.2 32.15 L35.7 31.4 L40.35 35.25 Z M40.35 35.25 L41 36.9 L38.1 36.7 Z",
          "bounds": [
            6.3,
            31.4,
            41,
            59.05
          ],
          "direction": "curve",
          "weight": 40.747382,
          "revealPath": "M38.233799999999995 33.1 Q25.960275000000003 50.25 6.491925 58.65",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M10.1 32.95 L18.65 37.65 L25.2 43.65 L30.05 50.2 L33.45 57.05 L35.55 63.85 L36.5 70.4 L36.55 76.4 L35.85 81.65 L34.6 86 L32.75 89.35 L28.2 85.45 L29.3 83.7 L30.45 80.4 L31.25 75.95 L31.5 70.65 L30.9 64.75 L29.35 58.5 L26.65 52.15 L22.55 45.8 L16.95 39.75 L9.65 33.7 Z M32.75 89.35 L30.7 90.35 L28.5 89.65 L27.5 87.6 L28.2 85.45 Z",
          "bounds": [
            9.65,
            32.95,
            36.55,
            90.35
          ],
          "direction": "curve",
          "weight": 58.250084,
          "revealPath": "M9.454500000000001 33.1 C39.503475 49.9 35.69445 81.4 30.498240349998536 87.41604992261969",
          "revealWidth": 14
        },
        {
          "outline": "M32.75 89.35 L31.9 90.25 L31 91.05 L30.1 91.8 L29.05 92.4 L28 92.95 L26.9 93.4 L25.8 93.75 L24.6 94 L23.4 94.15 L22.2 94.2 L22.2 88.2 L22.95 88.15 L23.65 88.05 L24.3 87.95 L24.95 87.75 L25.5 87.5 L26.1 87.2 L26.65 86.85 L27.15 86.45 L27.7 86 L28.2 85.45 Z M22.2 91.2 L15.2 89.7 L15.2 88.2 L22.2 88.2 Z",
          "bounds": [
            15.2,
            85.45,
            32.75,
            94.2
          ],
          "direction": "curve",
          "weight": 9.093014,
          "revealPath": "M30.498240349998536 87.41604992261969 Q27.22995 91.2 22.22995 91.2",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M33.6 58.7 L31.75 61.4 L29.75 64 L27.5 66.5 L25.1 68.85 L22.5 71.1 L19.75 73.25 L16.75 75.25 L13.6 77.15 L10.25 78.85 L6.7 80.35 L6.25 79.6 L9.25 77.25 L12.1 74.95 L14.8 72.65 L17.3 70.35 L19.65 68 L21.75 65.65 L23.7 63.2 L25.45 60.75 L27 58.3 L28.4 55.75 Z",
          "bounds": [
            6.25,
            55.75,
            33.6,
            80.35
          ],
          "direction": "curve",
          "weight": 33.468196,
          "revealPath": "M31.038975 57.25 Q23.420924999999997 70.55 6.491925 80",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M48.8 45.7 L49.65 48 L50.4 50.25 L50.85 52.4 L51.05 54.5 L51 56.5 L50.6 58.5 L49.95 60.4 L49 62.15 L47.7 63.75 L46.15 65.2 L42.85 60.2 L43.95 59.6 L44.95 58.85 L45.8 57.95 L46.55 56.9 L47.2 55.65 L47.65 54.15 L48 52.45 L48.2 50.5 L48.25 48.3 L47.95 45.95 Z M46.15 65.2 L43.9 65.6 L42 64.35 L41.6 62.1 L42.85 60.2 Z",
          "bounds": [
            41.6,
            45.7,
            51.05,
            65.6
          ],
          "direction": "curve",
          "weight": 18.867648,
          "revealPath": "M48.260025000000006 45.35 Q51.742349999999995 57.95 43.28527499999999 63.55",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M90.55 50.75 L89.15 51.65 L87.6 52.6 L85.9 53.55 L84 54.6 L81.95 55.65 L79.75 56.8 L77.3 57.95 L74.7 59.1 L71.85 60.3 L68.85 61.45 L68.4 60.7 L71 58.7 L73.4 56.85 L75.65 55.2 L77.8 53.6 L79.75 52.1 L81.5 50.75 L83.1 49.45 L84.5 48.25 L85.7 47.15 L86.75 46.1 Z M86.35 46.45 L86.8 46.1 L90.55 50.75 Z M90.55 50.75 L90.7 52.55 L88 51.55 Z",
          "bounds": [
            68.4,
            46.1,
            90.7,
            61.45
          ],
          "direction": "curve",
          "weight": 24.160271,
          "revealPath": "M89.052975 48.15 Q83.083275 53.05 68.6565 61.1",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.65 33.25 L67.65 47.45 L61.65 47.45 L61.65 32.25 Z M67.65 33.25 L69.15 34.25 L66.65 35.75 Z M61.65 47.45 L67.65 47.45 L66.45 49.25 L64.65 50.45 L62.85 49.25 Z",
          "bounds": [
            61.65,
            32.25,
            69.15,
            50.45
          ],
          "direction": "down",
          "weight": 14.7
        },
        {
          "outline": "M67.65 47.45 L67.2 54.75 L66.05 61.55 L64.3 67.75 L61.9 73.4 L58.85 78.45 L55.15 82.85 L50.8 86.6 L45.9 89.7 L40.45 92.05 L34.45 93.7 L34.2 92.85 L39.7 90.3 L44.55 87.4 L48.75 84.05 L52.3 80.3 L55.3 76.1 L57.7 71.4 L59.55 66.2 L60.8 60.5 L61.5 54.25 L61.65 47.45 Z",
          "bounds": [
            34.2,
            47.45,
            67.65,
            93.7
          ],
          "direction": "curve",
          "weight": 54.982731,
          "revealPath": "M64.6767 47.45 Q64.6767 84.2 34.330725 93.3",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.1 48.65 L67.8 54.45 L68.85 59.75 L70.3 64.65 L72.1 69.15 L74.3 73.2 L76.9 76.85 L79.9 80.15 L83.3 83.05 L87.2 85.65 L91.5 87.85 L88.55 93.8 L83.8 90.9 L79.55 87.6 L75.9 83.95 L72.75 79.85 L70.2 75.45 L68.2 70.7 L66.8 65.65 L65.95 60.25 L65.75 54.55 L66.2 48.6 Z M88.55 93.8 L91.5 87.85 L94.2 89.2 Z",
          "bounds": [
            65.75,
            48.6,
            94.2,
            93.8
          ],
          "direction": "curve",
          "weight": 48.682403,
          "revealPath": "M66.6666 48.15 Q66.16912500000001 78.95 90.04792499999999 90.85",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch223Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch223 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH223_STROKES = loadGlyphWikiBatch223Strokes(reviewed)
