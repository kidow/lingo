/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch194.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "茨",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "311352bd9ad99084ce71b73d891c031b12a03c5d67384505376dc773e87da56f",
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
    "pathsSha256": "120cfc02e813b7e8038098027799f6dd6153f71236b299c4a3764768207023c0",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8328.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8328.svg",
      "dictionarySvgSha256": "7f19d3d1e3be666b92b3282fd31c3d319eb874fb02f657c55b4c3601bed896d7",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "9c6736d902b33beaedd0f367e681709488370019a6f170f1b6e9c28a95db7dff",
      "geometryReviewSha256": "9c6736d902b33beaedd0f367e681709488370019a6f170f1b6e9c28a95db7dff",
      "directionReviewSha256": "9c6736d902b33beaedd0f367e681709488370019a6f170f1b6e9c28a95db7dff"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; whole u8328-k/u8328-ue0104/ufa5e-03/u8279-k03, individual glyph revisions unavailable for archive records; exact original declared u6b21-var-002@3 and u6b20-02-var-002@2 captured read-only in browser; source SHA256 a33832250fab3c6b204cbb120ea1f59803d5919b816fa33bfafacf9d6722c903",
      "editableSource": "/hanja-strokes/glyphwiki/8328.json",
      "modifications": "All10 domestic directional/cumulative states, complete form and90 progressive frames reviewed in Codex in-app browser. Exact whole u8328-k -> u8328-ue0104 with only declared ufa5e-03/u8279-k03/u6b21-var-002@3/u6b20-02-var-002@2. Both literal pinned revisions read from original revision edit pages; no latest substitution. Domestic3/4 reorder original right horizontal before right vertical in four-stroke 艹. Original raw groups0;1;3;2;4;5;6;7,8;9;10. Domestic8 original join172.48,92.565 is continuous. All five quadratic primitives, polygons and engine defaults retained. No invented points, bridges, trimming, radical transplant or width changes. Historical geometry is not independent domestic evidence or exam-body official approval. Normalize200to100 and polygon winding."
    },
    "paths": [
      "M6.45 16.85 L46.75 16.85 L46.75 18.85 L6.45 18.85 Z M46.75 16.85 L36.75 17.85 L41.75 12.35 Z",
      "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
      "M52.7 16.85 L93 16.85 L93 18.85 L52.7 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
      "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
      "M9 42.6 L37.5 42.6 L37.5 44.6 L9 44.6 Z M37.5 42.6 L25.5 43.6 L31.5 37.6 Z",
      "M7.8 75.4 L11.5 73.95 L15.2 72.45 L18.95 70.85 L22.7 69.2 L26.45 67.45 L30.25 65.65 L34.05 63.75 L37.9 61.85 L41.75 59.9 L45.75 57.95 L46.2 58.7 L42.8 61.5 L39.25 64.15 L35.7 66.6 L32.1 68.95 L28.45 71.2 L24.8 73.35 L21.15 75.4 L17.5 77.3 L13.8 79.15 L10.1 80.9 Z M10.1 80.9 L6.85 75.75 L7.8 75.4 Z M10.1 80.9 L12.3 78.4 L11.6 81.9 Z",
      "M58.75 30 L57.35 33.1 L55.7 36.1 L53.9 39 L51.8 41.8 L49.55 44.5 L47.05 47.05 L44.35 49.55 L41.4 51.9 L38.25 54.05 L34.8 56.05 L34.3 55.35 L37.05 52.6 L39.65 49.9 L42.05 47.2 L44.25 44.55 L46.25 41.85 L48 39.15 L49.6 36.4 L50.95 33.6 L52.15 30.8 L53.1 28 Z M52.9 28.45 L53.35 27.25 L58.75 30 Z M58.75 30 L59.8 31.45 L56.95 32 Z",
      "M46.25 45.25 L86.2 45.25 L86.2 47.25 L46.25 47.25 Z M88.4 48.3 L87.3 49.2 L86.05 50.1 L84.7 51.1 L83.25 52.1 L81.65 53.15 L79.95 54.25 L78.1 55.4 L76.1 56.6 L73.95 57.75 L71.75 59.05 L71.2 58.35 L73 56.55 L74.7 54.75 L76.25 53.1 L77.75 51.55 L79.1 50.1 L80.35 48.75 L81.45 47.5 L82.45 46.3 L83.3 45.2 L84.05 44.2 Z M83.2 45.25 L86.2 42.75 L91.7 47.25 L89.2 48.75 L83.2 51.25 Z",
      "M62.75 46.25 L62.2 54.05 L60.85 61.2 L58.7 67.75 L55.7 73.65 L51.9 78.85 L47.3 83.3 L42 87.1 L35.95 90.1 L29.2 92.4 L21.75 93.9 L21.55 93 L28.6 90.6 L34.8 87.7 L40.2 84.35 L44.8 80.5 L48.6 76.15 L51.65 71.3 L54 65.95 L55.65 60 L56.55 53.45 L56.75 46.25 Z",
      "M61.5 58.05 L62.55 62.15 L63.95 65.85 L65.7 69.3 L67.85 72.5 L70.45 75.4 L73.5 78.15 L77 80.65 L80.95 82.95 L85.45 85.05 L90.45 86.95 L88.15 93.15 L82.8 90.75 L78.05 88.05 L73.8 85.15 L70.1 81.95 L66.95 78.5 L64.4 74.8 L62.45 70.9 L61.15 66.8 L60.5 62.5 L60.6 58.1 Z M88.15 93.15 L90.45 86.95 L93.9 88.25 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.85 L46.75 16.85 L46.75 18.85 L6.45 18.85 Z M46.75 16.85 L36.75 17.85 L41.75 12.35 Z",
          "bounds": [
            6.45,
            12.35,
            46.75,
            18.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.75 L34.8 27.45 L28.8 30.45 L28.8 5.75 Z M34.8 6.75 L36.3 7.75 L33.8 9.25 Z",
          "bounds": [
            28.8,
            5.75,
            36.3,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M52.7 16.85 L93 16.85 L93 18.85 L52.7 18.85 Z M93 16.85 L81 17.85 L87 11.85 Z",
          "bounds": [
            52.7,
            11.85,
            93,
            18.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.75 L70.65 27.45 L64.65 30.45 L64.65 5.75 Z M70.65 6.75 L72.15 7.75 L69.65 9.25 Z",
          "bounds": [
            64.65,
            5.75,
            72.15,
            30.45
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M9 42.6 L37.5 42.6 L37.5 44.6 L9 44.6 Z M37.5 42.6 L25.5 43.6 L31.5 37.6 Z",
          "bounds": [
            9,
            37.6,
            37.5,
            44.6
          ],
          "direction": "right",
          "weight": 28.5
        }
      ],
      [
        {
          "outline": "M7.8 75.4 L11.5 73.95 L15.2 72.45 L18.95 70.85 L22.7 69.2 L26.45 67.45 L30.25 65.65 L34.05 63.75 L37.9 61.85 L41.75 59.9 L45.75 57.95 L46.2 58.7 L42.8 61.5 L39.25 64.15 L35.7 66.6 L32.1 68.95 L28.45 71.2 L24.8 73.35 L21.15 75.4 L17.5 77.3 L13.8 79.15 L10.1 80.9 Z M10.1 80.9 L6.85 75.75 L7.8 75.4 Z M10.1 80.9 L12.3 78.4 L11.6 81.9 Z",
          "bounds": [
            6.85,
            57.95,
            46.2,
            81.9
          ],
          "direction": "curve",
          "weight": 42.50353,
          "revealPath": "M8.5 78.37 Q27.5 70.4425 46 58.3625",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M58.75 30 L57.35 33.1 L55.7 36.1 L53.9 39 L51.8 41.8 L49.55 44.5 L47.05 47.05 L44.35 49.55 L41.4 51.9 L38.25 54.05 L34.8 56.05 L34.3 55.35 L37.05 52.6 L39.65 49.9 L42.05 47.2 L44.25 44.55 L46.25 41.85 L48 39.15 L49.6 36.4 L50.95 33.6 L52.15 30.8 L53.1 28 Z M52.9 28.45 L53.35 27.25 L58.75 30 Z M58.75 30 L59.8 31.45 L56.95 32 Z",
          "bounds": [
            34.3,
            27.25,
            59.8,
            56.05
          ],
          "direction": "curve",
          "weight": 34.670997,
          "revealPath": "M56.105 28.54 Q50.56999999999999 44.0175 34.58 55.72",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.25 45.25 L86.2 45.25 L86.2 47.25 L46.25 47.25 Z",
          "bounds": [
            46.25,
            45.25,
            86.2,
            47.25
          ],
          "direction": "right",
          "weight": 39.975
        },
        {
          "outline": "M88.4 48.3 L87.3 49.2 L86.05 50.1 L84.7 51.1 L83.25 52.1 L81.65 53.15 L79.95 54.25 L78.1 55.4 L76.1 56.6 L73.95 57.75 L71.75 59.05 L71.2 58.35 L73 56.55 L74.7 54.75 L76.25 53.1 L77.75 51.55 L79.1 50.1 L80.35 48.75 L81.45 47.5 L82.45 46.3 L83.3 45.2 L84.05 44.2 Z M83.2 45.25 L86.2 42.75 L91.7 47.25 L89.2 48.75 L83.2 51.25 Z",
          "bounds": [
            71.2,
            42.75,
            91.7,
            59.05
          ],
          "direction": "curve",
          "weight": 19.314422,
          "revealPath": "M86.24 46.2825 Q81.935 50.8125 71.48 58.74",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M62.75 46.25 L62.2 54.05 L60.85 61.2 L58.7 67.75 L55.7 73.65 L51.9 78.85 L47.3 83.3 L42 87.1 L35.95 90.1 L29.2 92.4 L21.75 93.9 L21.55 93 L28.6 90.6 L34.8 87.7 L40.2 84.35 L44.8 80.5 L48.6 76.15 L51.65 71.3 L54 65.95 L55.65 60 L56.55 53.45 L56.75 46.25 Z",
          "bounds": [
            21.55,
            46.25,
            62.75,
            93.9
          ],
          "direction": "curve",
          "weight": 60.667595,
          "revealPath": "M59.795 46.2825 Q59.795 85.165 21.665 93.47",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M61.5 58.05 L62.55 62.15 L63.95 65.85 L65.7 69.3 L67.85 72.5 L70.45 75.4 L73.5 78.15 L77 80.65 L80.95 82.95 L85.45 85.05 L90.45 86.95 L88.15 93.15 L82.8 90.75 L78.05 88.05 L73.8 85.15 L70.1 81.95 L66.95 78.5 L64.4 74.8 L62.45 70.9 L61.15 66.8 L60.5 62.5 L60.6 58.1 Z M88.15 93.15 L90.45 86.95 L93.9 88.25 Z",
          "bounds": [
            60.5,
            58.05,
            93.9,
            93.15
          ],
          "direction": "curve",
          "weight": 43.061588,
          "revealPath": "M61.025000000000006 57.6075 Q62.255 79.88 89.315 90.0725",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch194Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch194 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH194_STROKES = loadGlyphWikiBatch194Strokes(reviewed)
