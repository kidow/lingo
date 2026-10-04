/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch217.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "琁",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "cb35fc397c0313ba762f6b495032d27ac5c2989aa4618cf0579baa0cbe4b0a12",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "pathsSha256": "9c179b32dc43e92bb03ed111ccf65b0e0eac05783765231e8d8d5a3981891de4",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7401.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7401.svg",
      "dictionarySvgSha256": "3d276b2cb1cd923477a2a7ffc0de65b7dc86cc8a29abf1f0debc757398b98154",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "b1b36c98375a514fbf0849ea267eb767830eb565b9b156b79508c9534c8125c2",
      "geometryReviewSha256": "b1b36c98375a514fbf0849ea267eb767830eb565b9b156b79508c9534c8125c2",
      "directionReviewSha256": "b1b36c98375a514fbf0849ea267eb767830eb565b9b156b79508c9534c8125c2"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u7401-k/u7401/u738b-01/cdp-8da6-02; individual glyph revisions unavailable; source SHA256 9997d6d94951d78d4bca88b76d2998387e604f4450d23dda6dcabe1a4c19d7fb",
      "editableSource": "/hanja-strokes/glyphwiki/7401.json",
      "modifications": "All 11 domestic directional/cumulative states, complete form and 99 progressive frames reviewed in Codex in-app browser. Exact whole u7401-k -> u7401 and only declared u738b-01/cdp-8da6-02; four archive records, no individual glyph revisions. Original 王 order is regrouped as raw0,2,1,3. Domestic7 joins original line ending167.7,80 to quadratic beginning167.7,80 without invented geometry. All12 original groups and12 primitives, four quadratic and one cubic path, polygons and engine defaults retained. Normalize200to100 and winding only; no bridges, point movement, splitting, width corrections or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval; private graphics RAM-only."
    },
    "paths": [
      "M7.45 20 L39.9 20 L39.9 22 L7.45 22 Z M39.9 20 L27.9 21 L33.9 15 Z",
      "M9.05 45.5 L38.3 45.5 L38.3 47.5 L9.05 47.5 Z M38.3 45.5 L26.3 46.5 L32.3 40.5 Z",
      "M24.8 20 L24.8 75.5 L18.8 75.5 L18.8 20 Z",
      "M7 76.95 L10.05 76.15 L13.15 75.25 L16.4 74.3 L19.7 73.35 L23.05 72.3 L26.5 71.25 L30.05 70.2 L33.7 69.1 L37.45 68.05 L41.35 67.05 L41.7 67.9 L38.15 69.85 L34.7 71.6 L31.25 73.25 L27.85 74.85 L24.5 76.3 L21.25 77.7 L18.05 79.05 L14.9 80.3 L11.85 81.55 L8.85 82.7 Z M8.85 82.7 L6.05 77.25 L7 76.95 Z M8.85 82.7 L11.2 80.3 L10.25 83.8 Z",
      "M57.65 9.4 L56.35 12.7 L54.9 15.95 L53.35 19.1 L51.65 22.15 L49.85 25.15 L47.9 28 L45.85 30.75 L43.6 33.4 L41.2 35.95 L38.65 38.25 L37.95 37.7 L39.75 34.75 L41.45 31.85 L43.1 28.95 L44.65 26 L46.15 23.05 L47.5 20.05 L48.8 17 L49.95 13.9 L51 10.75 L51.95 7.5 Z M51.8 8 L52.2 6.75 L57.65 9.4 Z M57.65 9.4 L58.8 10.8 L55.95 11.45 Z",
      "M47.2 24 L91.6 24 L91.6 26 L47.2 26 Z M91.6 24 L79.6 25 L85.6 19 Z",
      "M43.85 39 L83.85 39 L83.85 41 L43.85 41 Z M86.55 41.2 L85.85 42.25 L85.1 43.25 L84.25 44.35 L83.35 45.4 L82.35 46.5 L81.3 47.6 L80.15 48.75 L78.95 49.85 L77.65 51 L76.4 52.25 L75.7 51.7 L76.6 50.2 L77.3 48.65 L78 47.2 L78.6 45.8 L79.2 44.45 L79.7 43.2 L80.15 42 L80.55 40.85 L80.85 39.75 L81.1 38.75 Z M80.85 39 L83.85 36.5 L89.35 41 L86.85 42.5 L80.85 45 Z",
      "M66.85 39 L66.85 86 L60.85 86 L60.85 39 Z",
      "M63.85 62 L88.25 62 L88.25 64 L63.85 64 Z M88.25 62 L78.25 63 L83.25 57.5 Z",
      "M51.25 54.7 L50.55 60.2 L49.6 65.35 L48.4 70.15 L46.95 74.7 L45.25 78.85 L43.35 82.75 L41.15 86.2 L38.75 89.35 L36 92.05 L33.05 94.3 L32.45 93.65 L34.6 90.8 L36.55 87.75 L38.35 84.55 L39.95 81.05 L41.35 77.3 L42.5 73.3 L43.5 69 L44.3 64.4 L44.9 59.45 L45.25 54.25 Z M45.25 54.75 L45.35 53.15 L51.25 54.7 Z M51.25 54.7 L52.65 55.85 L50.05 57.1 Z",
      "M47.75 66.35 L49.45 70 L51.45 73.3 L53.75 76.15 L56.5 78.65 L59.75 80.8 L63.7 82.6 L68.35 84 L73.85 85 L80.3 85.6 L87.7 85.7 L87.7 92.3 L79.85 91.85 L72.9 90.85 L66.85 89.3 L61.65 87.3 L57.3 84.75 L53.7 81.8 L50.9 78.4 L48.85 74.7 L47.5 70.75 L46.85 66.55 Z M87.7 92.3 L87.7 85.7 L93.65 85.7 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.45 20 L39.9 20 L39.9 22 L7.45 22 Z M39.9 20 L27.9 21 L33.9 15 Z",
          "bounds": [
            7.45,
            15,
            39.9,
            22
          ],
          "direction": "right",
          "weight": 32.4825
        }
      ],
      [
        {
          "outline": "M9.05 45.5 L38.3 45.5 L38.3 47.5 L9.05 47.5 Z M38.3 45.5 L26.3 46.5 L32.3 40.5 Z",
          "bounds": [
            9.05,
            40.5,
            38.3,
            47.5
          ],
          "direction": "right",
          "weight": 29.2875
        }
      ],
      [
        {
          "outline": "M24.8 20 L24.8 75.5 L18.8 75.5 L18.8 20 Z",
          "bounds": [
            18.8,
            20,
            24.8,
            75.5
          ],
          "direction": "down",
          "weight": 53.5
        }
      ],
      [
        {
          "outline": "M7 76.95 L10.05 76.15 L13.15 75.25 L16.4 74.3 L19.7 73.35 L23.05 72.3 L26.5 71.25 L30.05 70.2 L33.7 69.1 L37.45 68.05 L41.35 67.05 L41.7 67.9 L38.15 69.85 L34.7 71.6 L31.25 73.25 L27.85 74.85 L24.5 76.3 L21.25 77.7 L18.05 79.05 L14.9 80.3 L11.85 81.55 L8.85 82.7 Z M8.85 82.7 L6.05 77.25 L7 76.95 Z M8.85 82.7 L11.2 80.3 L10.25 83.8 Z",
          "bounds": [
            6.05,
            67.05,
            41.7,
            83.8
          ],
          "direction": "curve",
          "weight": 36.300088,
          "revealPath": "M7.455 80 Q22.8975 75 41.535 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.65 9.4 L56.35 12.7 L54.9 15.95 L53.35 19.1 L51.65 22.15 L49.85 25.15 L47.9 28 L45.85 30.75 L43.6 33.4 L41.2 35.95 L38.65 38.25 L37.95 37.7 L39.75 34.75 L41.45 31.85 L43.1 28.95 L44.65 26 L46.15 23.05 L47.5 20.05 L48.8 17 L49.95 13.9 L51 10.75 L51.95 7.5 Z M51.8 8 L52.2 6.75 L57.65 9.4 Z M57.65 9.4 L58.8 10.8 L55.95 11.45 Z",
          "bounds": [
            37.95,
            6.75,
            58.8,
            38.25
          ],
          "direction": "curve",
          "weight": 34.310676,
          "revealPath": "M54.98999999999999 8 Q49.44 25 38.34 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.2 24 L91.6 24 L91.6 26 L47.2 26 Z M91.6 24 L79.6 25 L85.6 19 Z",
          "bounds": [
            47.2,
            19,
            91.6,
            26
          ],
          "direction": "right",
          "weight": 44.4
        }
      ],
      [
        {
          "outline": "M43.85 39 L83.85 39 L83.85 41 L43.85 41 Z",
          "bounds": [
            43.85,
            39,
            83.85,
            41
          ],
          "direction": "right",
          "weight": 39.96
        },
        {
          "outline": "M86.55 41.2 L85.85 42.25 L85.1 43.25 L84.25 44.35 L83.35 45.4 L82.35 46.5 L81.3 47.6 L80.15 48.75 L78.95 49.85 L77.65 51 L76.4 52.25 L75.7 51.7 L76.6 50.2 L77.3 48.65 L78 47.2 L78.6 45.8 L79.2 44.45 L79.7 43.2 L80.15 42 L80.55 40.85 L80.85 39.75 L81.1 38.75 Z M80.85 39 L83.85 36.5 L89.35 41 L86.85 42.5 L80.85 45 Z",
          "bounds": [
            75.7,
            36.5,
            89.35,
            52.25
          ],
          "direction": "curve",
          "weight": 14.295905,
          "revealPath": "M83.85 40 Q81.63 45 76.08 52",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.85 39 L66.85 86 L60.85 86 L60.85 39 Z",
          "bounds": [
            60.85,
            39,
            66.85,
            86
          ],
          "direction": "down",
          "weight": 45
        }
      ],
      [
        {
          "outline": "M63.85 62 L88.25 62 L88.25 64 L63.85 64 Z M88.25 62 L78.25 63 L83.25 57.5 Z",
          "bounds": [
            63.85,
            57.5,
            88.25,
            64
          ],
          "direction": "right",
          "weight": 24.42
        }
      ],
      [
        {
          "outline": "M51.25 54.7 L50.55 60.2 L49.6 65.35 L48.4 70.15 L46.95 74.7 L45.25 78.85 L43.35 82.75 L41.15 86.2 L38.75 89.35 L36 92.05 L33.05 94.3 L32.45 93.65 L34.6 90.8 L36.55 87.75 L38.35 84.55 L39.95 81.05 L41.35 77.3 L42.5 73.3 L43.5 69 L44.3 64.4 L44.9 59.45 L45.25 54.25 Z M45.25 54.75 L45.35 53.15 L51.25 54.7 Z M51.25 54.7 L52.65 55.85 L50.05 57.1 Z",
          "bounds": [
            32.45,
            53.15,
            52.65,
            94.3
          ],
          "direction": "curve",
          "weight": 42.912604,
          "revealPath": "M48.33 54 Q46.11 82 32.79 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.75 66.35 L49.45 70 L51.45 73.3 L53.75 76.15 L56.5 78.65 L59.75 80.8 L63.7 82.6 L68.35 84 L73.85 85 L80.3 85.6 L87.7 85.7 L87.7 92.3 L79.85 91.85 L72.9 90.85 L66.85 89.3 L61.65 87.3 L57.3 84.75 L53.7 81.8 L50.9 78.4 L48.85 74.7 L47.5 70.75 L46.85 66.55 Z M87.7 92.3 L87.7 85.7 L93.65 85.7 Z",
          "bounds": [
            46.85,
            66.35,
            93.65,
            92.3
          ],
          "direction": "curve",
          "weight": 46.588252,
          "revealPath": "M47.22 66 C50.55 80 60.540000000000006 89 87.735 89",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch217Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch217 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH217_STROKES = loadGlyphWikiBatch217Strokes(reviewed)

