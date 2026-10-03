/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch195.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "茯",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "291e07916f1163b6f40d05920d866afbcdbe23dbc23930635a29e92b572f2f8b",
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
      10
    ],
    "pathsSha256": "637767c6b98a61bab97557945602e6a06b23fc03db26d32b6ccc03ffb8b2f0f6",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/832f.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/832f.svg",
      "dictionarySvgSha256": "eddd652919aef4918d4b541e3a345876a470ab5fe9f4ce5852047083b6552565",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "113cd54a689e55fbe58141ad6cff07b22bb8395137f437ba3c7c6a20e1975dbc",
      "geometryReviewSha256": "113cd54a689e55fbe58141ad6cff07b22bb8395137f437ba3c7c6a20e1975dbc",
      "directionReviewSha256": "113cd54a689e55fbe58141ad6cff07b22bb8395137f437ba3c7c6a20e1975dbc"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; whole u832f-k/u832f-ue0102/ufa5e-03/u8279-k03/u4f0f/u4ebb-01/u72ac-02; individual glyph revisions unavailable; source SHA256 ab31db7c0f7f5b8a5d404019832921d3c7d6eceed1b037e9063116539b0c9c0a",
      "editableSource": "/hanja-strokes/glyphwiki/832f.json",
      "modifications": "All10 domestic directional/cumulative states, complete form and90 progressive frames reviewed in Codex in-app browser. Exact whole u832f-k -> u832f-ue0102 and only declared ufa5e-03/u8279-k03/u4f0f/u4ebb-01/u72ac-02. No radical transplant. Domestic3/4 reorder original right horizontal before right vertical in four-stroke 艹. Original raw groups0;1;3;2;4;5;6;7;8;9. Domestic8 type7 original line-to-quadratic join123.012,108.55995000000001 is continuous. All four quadratic primitives, polygons and engine defaults retained. No invented points, bridges, trimming, component substitutions or width changes. Historical latest-only archive gives no individual glyph revisions and is not independent domestic evidence or exam-body official approval. Normalize200to100 and polygon winding."
    },
    "paths": [
      "M6.45 16.55 L46.75 16.55 L46.75 18.55 L6.45 18.55 Z M46.75 16.55 L36.75 17.55 L41.75 12.05 Z",
      "M34.8 6.65 L34.8 27 L28.8 30 L28.8 5.65 Z M34.8 6.65 L36.3 7.65 L33.8 9.15 Z",
      "M52.7 16.55 L93 16.55 L93 18.55 L52.7 18.55 Z M93 16.55 L81 17.55 L87 11.55 Z",
      "M70.65 6.65 L70.65 27 L64.65 30 L64.65 5.65 Z M70.65 6.65 L72.15 7.65 L69.65 9.15 Z",
      "M39 34.25 L36.4 38.15 L33.6 41.95 L30.75 45.65 L27.7 49.25 L24.6 52.75 L21.3 56.2 L17.9 59.5 L14.35 62.7 L10.6 65.7 L6.7 68.55 L6.1 67.9 L9.3 64.3 L12.45 60.75 L15.5 57.2 L18.5 53.65 L21.35 50.05 L24.1 46.35 L26.7 42.65 L29.2 38.85 L31.6 35.05 L33.9 31.15 Z M33.6 31.55 L34.15 30.7 L39 34.25 Z M39 34.25 L39.75 35.9 L36.85 35.85 Z",
      "M27.5 53.2 L27.5 91.05 L21.5 94.05 L21.5 52.2 Z M27.5 53.2 L29 54.2 L26.5 55.7 Z",
      "M37.2 50.4 L92 50.4 L92 52.4 L37.2 52.4 Z M92 50.4 L80 51.4 L86 45.4 Z",
      "M64.5 32.1 L64.5 54.25 L58.5 54.25 L58.5 31.1 Z M64.5 32.1 L66 33.1 L63.5 34.6 Z M58.5 54.25 L64.5 54.25 L63.3 56.05 L61.5 57.25 L59.7 56.05 Z M64.45 54.65 L63.3 60.45 L61.65 65.85 L59.5 70.9 L56.9 75.5 L53.8 79.7 L50.3 83.5 L46.3 86.85 L41.9 89.75 L37 92.1 L31.75 94 L31.4 93.15 L36.15 90.45 L40.4 87.5 L44.2 84.3 L47.55 80.85 L50.45 77.15 L52.9 73.15 L54.95 68.8 L56.55 64.15 L57.75 59.2 L58.5 53.85 Z",
      "M63.25 49.35 L64.85 54.75 L66.7 59.8 L68.8 64.45 L71.15 68.8 L73.85 72.85 L76.9 76.5 L80.25 79.9 L83.95 82.95 L87.95 85.75 L92.35 88.2 L89.15 94 L84.5 90.9 L80.2 87.5 L76.35 83.8 L72.95 79.75 L70 75.45 L67.5 70.8 L65.45 65.9 L63.9 60.7 L62.85 55.25 L62.35 49.5 Z M89.15 94 L92.35 88.2 L94.75 89.55 Z",
      "M70.85 33.1 L72.9 33.75 L74.9 34.3 L76.75 34.95 L78.5 35.65 L80.05 36.5 L81.55 37.4 L82.85 38.4 L84.1 39.55 L85.15 40.75 L86.05 42.1 L80.55 44.5 L80.3 43.6 L79.9 42.65 L79.35 41.65 L78.65 40.6 L77.7 39.55 L76.65 38.45 L75.35 37.3 L73.95 36.2 L72.35 35 L70.5 33.95 Z M86.05 42.1 L86.1 44.4 L84.5 46.05 L82.25 46.1 L80.55 44.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.55 L46.75 16.55 L46.75 18.55 L6.45 18.55 Z M46.75 16.55 L36.75 17.55 L41.75 12.05 Z",
          "bounds": [
            6.45,
            12.05,
            46.75,
            18.55
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.65 L34.8 27 L28.8 30 L28.8 5.65 Z M34.8 6.65 L36.3 7.65 L33.8 9.15 Z",
          "bounds": [
            28.8,
            5.65,
            36.3,
            30
          ],
          "direction": "down",
          "weight": 22.3125
        }
      ],
      [
        {
          "outline": "M52.7 16.55 L93 16.55 L93 18.55 L52.7 18.55 Z M93 16.55 L81 17.55 L87 11.55 Z",
          "bounds": [
            52.7,
            11.55,
            93,
            18.55
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.65 L70.65 27 L64.65 30 L64.65 5.65 Z M70.65 6.65 L72.15 7.65 L69.65 9.15 Z",
          "bounds": [
            64.65,
            5.65,
            72.15,
            30
          ],
          "direction": "down",
          "weight": 22.3125
        }
      ],
      [
        {
          "outline": "M39 34.25 L36.4 38.15 L33.6 41.95 L30.75 45.65 L27.7 49.25 L24.6 52.75 L21.3 56.2 L17.9 59.5 L14.35 62.7 L10.6 65.7 L6.7 68.55 L6.1 67.9 L9.3 64.3 L12.45 60.75 L15.5 57.2 L18.5 53.65 L21.35 50.05 L24.1 46.35 L26.7 42.65 L29.2 38.85 L31.6 35.05 L33.9 31.15 Z M33.6 31.55 L34.15 30.7 L39 34.25 Z M39 34.25 L39.75 35.9 L36.85 35.85 Z",
          "bounds": [
            6.1,
            30.7,
            39.75,
            68.55
          ],
          "direction": "curve",
          "weight": 47.020182,
          "revealPath": "M36.732749999999996 32.2875 Q24.522 52.38 6.432 68.2425",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27.5 53.2 L27.5 91.05 L21.5 94.05 L21.5 52.2 Z M27.5 53.2 L29 54.2 L26.5 55.7 Z",
          "bounds": [
            21.5,
            52.2,
            29,
            94.05
          ],
          "direction": "down",
          "weight": 39.8325
        }
      ],
      [
        {
          "outline": "M37.2 50.4 L92 50.4 L92 52.4 L37.2 52.4 Z M92 50.4 L80 51.4 L86 45.4 Z",
          "bounds": [
            37.2,
            45.4,
            92,
            52.4
          ],
          "direction": "right",
          "weight": 54.8328
        }
      ],
      [
        {
          "outline": "M64.5 32.1 L64.5 54.25 L58.5 54.25 L58.5 31.1 Z M64.5 32.1 L66 33.1 L63.5 34.6 Z M58.5 54.25 L64.5 54.25 L63.3 56.05 L61.5 57.25 L59.7 56.05 Z",
          "bounds": [
            58.5,
            31.1,
            66,
            57.25
          ],
          "direction": "down",
          "weight": 22.6728
        },
        {
          "outline": "M64.45 54.65 L63.3 60.45 L61.65 65.85 L59.5 70.9 L56.9 75.5 L53.8 79.7 L50.3 83.5 L46.3 86.85 L41.9 89.75 L37 92.1 L31.75 94 L31.4 93.15 L36.15 90.45 L40.4 87.5 L44.2 84.3 L47.55 80.85 L50.45 77.15 L52.9 73.15 L54.95 68.8 L56.55 64.15 L57.75 59.2 L58.5 53.85 Z",
          "bounds": [
            31.4,
            53.85,
            64.45,
            94
          ],
          "direction": "curve",
          "weight": 49.404913,
          "revealPath": "M61.506 54.27997500000001 Q57.76740000000001 82.97523749999999 31.597199999999997 93.6031125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M63.25 49.35 L64.85 54.75 L66.7 59.8 L68.8 64.45 L71.15 68.8 L73.85 72.85 L76.9 76.5 L80.25 79.9 L83.95 82.95 L87.95 85.75 L92.35 88.2 L89.15 94 L84.5 90.9 L80.2 87.5 L76.35 83.8 L72.95 79.75 L70 75.45 L67.5 70.8 L65.45 65.9 L63.9 60.7 L62.85 55.25 L62.35 49.5 Z M89.15 94 L92.35 88.2 L94.75 89.55 Z",
          "bounds": [
            62.35,
            49.35,
            94.75,
            94
          ],
          "direction": "curve",
          "weight": 50.630487,
          "revealPath": "M62.752199999999995 48.9660375 Q67.1139 78.01556249999999 90.7917 91.123275",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M70.85 33.1 L72.9 33.75 L74.9 34.3 L76.75 34.95 L78.5 35.65 L80.05 36.5 L81.55 37.4 L82.85 38.4 L84.1 39.55 L85.15 40.75 L86.05 42.1 L80.55 44.5 L80.3 43.6 L79.9 42.65 L79.35 41.65 L78.65 40.6 L77.7 39.55 L76.65 38.45 L75.35 37.3 L73.95 36.2 L72.35 35 L70.5 33.95 Z M86.05 42.1 L86.1 44.4 L84.5 46.05 L82.25 46.1 L80.55 44.5 Z",
          "bounds": [
            70.5,
            33.1,
            86.1,
            46.1
          ],
          "direction": "curve",
          "weight": 17.788443,
          "revealPath": "M70.2294 33.3784875 Q80.8221 37.6296375 83.9376 44.7148875",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch195Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch195 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH195_STROKES = loadGlyphWikiBatch195Strokes(reviewed)
