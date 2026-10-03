/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch205.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "寀",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "9691bed731b7eadd6e019a1858c140a21e66cc8f7de5c1484f9b14252fd18df7",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      12,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "pathsSha256": "a2c3b341577f4643ae7f6828334de414165393007e3192cb8e1c9beea528e85e",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5b00/5bc0.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5b00/5bc0.svg",
      "dictionarySvgSha256": "99750493a31add83d27f2e1c784534318302dc648d82fb577f00b050f7b169e3",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "ebd00a87ee7bedb3d3eced0533b4606f9a4230160918e8410d83b402940c36fb",
      "geometryReviewSha256": "ebd00a87ee7bedb3d3eced0533b4606f9a4230160918e8410d83b402940c36fb",
      "directionReviewSha256": "ebd00a87ee7bedb3d3eced0533b4606f9a4230160918e8410d83b402940c36fb"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u5bc0-k/u5bc0/u5b80-03/u5196-03; individual glyph revisions unavailable; source SHA256 c1bc7628fe36f217a43bf36ff17fcc24f705fe77e0e4c119251055e08a50d258",
      "editableSource": "/hanja-strokes/glyphwiki/5bc0.json",
      "modifications": "All11 domestic directional/cumulative states, complete form and99 progressive frames reviewed in Codex in-app browser. Exact whole u5bc0-k -> u5bc0 and only declared u5b80-03/u5196-03. Four historical archive records; individual glyph revisions unavailable. No radical transplant. Domestic3 original horizontal-to-curve join176,39.4085 is continuous. Original raw11 left descending stroke is reordered before raw5/6 dots as observed in the domestic dictionary. Raw groups0;1;2,3;4;11;5;6;7;8;9;10. All12 original source groups,12 draw primitives,eight quadratic paths, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Continuous structural primitives follow the observed domestic pen trajectory without added geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M53 7.2 L53 20.3 L47 20.3 L47 6.2 Z M53 7.2 L54.5 8.2 L52 9.7 Z",
      "M15.95 14.65 L16.25 17.2 L16.5 19.6 L16.55 21.9 L16.4 24.05 L16 26.1 L15.45 28 L14.65 29.75 L13.6 31.4 L12.3 32.8 L10.75 34.05 L7.85 28.8 L8.85 28.35 L9.8 27.8 L10.7 27 L11.55 26 L12.35 24.7 L13.1 23.2 L13.7 21.45 L14.3 19.45 L14.8 17.2 L15.05 14.7 Z M10.75 34.05 L8.45 34.3 L6.65 32.85 L6.45 30.6 L7.85 28.8 Z",
      "M16 18.7 L88 18.7 L88 20.7 L16 20.7 Z M90.45 21.35 L89.6 22.25 L88.7 23.15 L87.65 24.05 L86.6 25.05 L85.45 26.05 L84.15 27.1 L82.85 28.2 L81.4 29.3 L79.8 30.45 L78.3 31.75 L77.65 31.1 L78.85 29.5 L79.85 27.9 L80.8 26.35 L81.7 24.95 L82.5 23.6 L83.3 22.3 L83.95 21.1 L84.55 20 L85.05 18.95 L85.5 18 Z M85 18.7 L88 16.2 L93.5 20.7 L91 22.2 L85 24.7 Z",
      "M75.35 29.5 L70.85 30.6 L66.3 31.6 L61.6 32.5 L56.85 33.3 L51.95 34 L47 34.55 L41.9 35 L36.7 35.35 L31.4 35.5 L26 35.4 L25.95 34.55 L31.25 33.6 L36.4 32.65 L41.45 31.75 L46.4 30.8 L51.25 29.8 L55.95 28.75 L60.55 27.6 L65.05 26.4 L69.4 25.1 L73.65 23.75 Z M73.15 23.9 L78.7 28.5 L75.35 29.5 Z M78.7 28.5 L78.8 30.05 L75.35 28.45 Z",
      "M29.65 33.9 L28.55 36.5 L27.4 39.05 L26.1 41.5 L24.75 43.8 L23.25 46.05 L21.7 48.15 L20.05 50.15 L18.25 52.05 L16.35 53.75 L14.3 55.3 L13.65 54.65 L14.9 52.5 L16.15 50.4 L17.35 48.25 L18.5 46.1 L19.6 43.9 L20.6 41.65 L21.55 39.35 L22.45 36.95 L23.25 34.5 L23.95 32 Z M23.8 32.5 L24.2 31.25 L29.65 33.9 Z M29.65 33.9 L30.75 35.3 L27.9 35.95 Z",
      "M41.65 36.9 L43.25 37.8 L44.85 38.6 L46.35 39.45 L47.75 40.45 L49.05 41.45 L50.2 42.55 L51.3 43.7 L52.25 44.95 L53.1 46.25 L53.85 47.6 L48.15 49.5 L47.95 48.45 L47.7 47.35 L47.3 46.25 L46.75 45.1 L46.15 43.9 L45.4 42.7 L44.5 41.45 L43.55 40.15 L42.45 38.85 L41.15 37.65 Z M53.85 47.6 L53.65 49.9 L51.95 51.4 L49.65 51.2 L48.15 49.5 Z",
      "M67.65 36.35 L69.85 37.35 L72 38.3 L74 39.35 L75.9 40.45 L77.6 41.6 L79.2 42.8 L80.7 44.1 L82.05 45.4 L83.25 46.75 L84.35 48.2 L79.1 51.15 L78.6 49.9 L77.9 48.6 L77.05 47.3 L76.05 45.95 L74.95 44.55 L73.65 43.15 L72.25 41.7 L70.7 40.2 L69.05 38.65 L67.2 37.1 Z M84.35 48.2 L84.6 50.45 L83.2 52.3 L80.95 52.55 L79.1 51.15 Z",
      "M11 62 L90.5 62 L90.5 64 L11 64 Z M90.5 62 L78.5 63 L84.5 57 Z",
      "M53 54 L53 92 L47 95 L47 53 Z M53 54 L54.5 55 L52 56.5 Z",
      "M51.75 63 L50.45 64.65 L47.4 68.45 L44.05 72.05 L40.35 75.35 L36.35 78.4 L32 81.25 L27.35 83.85 L22.4 86.15 L17.15 88.2 L11.55 89.95 L5.6 91.4 L5.35 90.55 L10.9 88.2 L16.1 85.75 L20.95 83.2 L25.5 80.5 L29.7 77.7 L33.5 74.75 L37 71.6 L40.2 68.3 L43 64.9 L44.3 63 Z",
      "M52.65 63.1 L55.8 65.8 L59 68.4 L62.3 70.9 L65.75 73.3 L69.35 75.5 L73.1 77.55 L77.05 79.5 L81.2 81.25 L85.5 82.9 L90.05 84.35 L87.9 90.6 L83.25 88.7 L78.8 86.65 L74.55 84.4 L70.55 82 L66.75 79.4 L63.25 76.65 L59.95 73.7 L56.95 70.55 L54.25 67.2 L51.95 63.65 Z M87.9 90.6 L90.05 84.35 L93.7 85.6 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M53 7.2 L53 20.3 L47 20.3 L47 6.2 Z M53 7.2 L54.5 8.2 L52 9.7 Z",
          "bounds": [
            47,
            6.2,
            54.5,
            20.3
          ],
          "direction": "down",
          "weight": 12.6325
        }
      ],
      [
        {
          "outline": "M15.95 14.65 L16.25 17.2 L16.5 19.6 L16.55 21.9 L16.4 24.05 L16 26.1 L15.45 28 L14.65 29.75 L13.6 31.4 L12.3 32.8 L10.75 34.05 L7.85 28.8 L8.85 28.35 L9.8 27.8 L10.7 27 L11.55 26 L12.35 24.7 L13.1 23.2 L13.7 21.45 L14.3 19.45 L14.8 17.2 L15.05 14.7 Z M10.75 34.05 L8.45 34.3 L6.65 32.85 L6.45 30.6 L7.85 28.8 Z",
          "bounds": [
            6.45,
            14.65,
            16.55,
            34.3
          ],
          "direction": "curve",
          "weight": 19.473003,
          "revealPath": "M15.5 14.203 Q16 27.772750000000002 8 32.17375",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M16 18.7 L88 18.7 L88 20.7 L16 20.7 Z",
          "bounds": [
            16,
            18.7,
            88,
            20.7
          ],
          "direction": "right",
          "weight": 72
        },
        {
          "outline": "M90.45 21.35 L89.6 22.25 L88.7 23.15 L87.65 24.05 L86.6 25.05 L85.45 26.05 L84.15 27.1 L82.85 28.2 L81.4 29.3 L79.8 30.45 L78.3 31.75 L77.65 31.1 L78.85 29.5 L79.85 27.9 L80.8 26.35 L81.7 24.95 L82.5 23.6 L83.3 22.3 L83.95 21.1 L84.55 20 L85.05 18.95 L85.5 18 Z M85 18.7 L88 16.2 L93.5 20.7 L91 22.2 L85 24.7 Z",
          "bounds": [
            77.65,
            16.2,
            93.5,
            31.75
          ],
          "direction": "curve",
          "weight": 15.418615,
          "revealPath": "M88 19.70425 Q85 24.10525 78 31.440250000000002",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.35 29.5 L70.85 30.6 L66.3 31.6 L61.6 32.5 L56.85 33.3 L51.95 34 L47 34.55 L41.9 35 L36.7 35.35 L31.4 35.5 L26 35.4 L25.95 34.55 L31.25 33.6 L36.4 32.65 L41.45 31.75 L46.4 30.8 L51.25 29.8 L55.95 28.75 L60.55 27.6 L65.05 26.4 L69.4 25.1 L73.65 23.75 Z M73.15 23.9 L78.7 28.5 L75.35 29.5 Z M78.7 28.5 L78.8 30.05 L75.35 28.45 Z",
          "bounds": [
            25.95,
            23.75,
            78.8,
            35.5
          ],
          "direction": "curve",
          "weight": 49.731781,
          "revealPath": "M75 26.5 Q53 33 26 35",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M29.65 33.9 L28.55 36.5 L27.4 39.05 L26.1 41.5 L24.75 43.8 L23.25 46.05 L21.7 48.15 L20.05 50.15 L18.25 52.05 L16.35 53.75 L14.3 55.3 L13.65 54.65 L14.9 52.5 L16.15 50.4 L17.35 48.25 L18.5 46.1 L19.6 43.9 L20.6 41.65 L21.55 39.35 L22.45 36.95 L23.25 34.5 L23.95 32 Z M23.8 32.5 L24.2 31.25 L29.65 33.9 Z M29.65 33.9 L30.75 35.3 L27.9 35.95 Z",
          "bounds": [
            13.65,
            31.25,
            30.75,
            55.3
          ],
          "direction": "curve",
          "weight": 25.985573,
          "revealPath": "M27 32.5 Q22.5 46 14 55",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M41.65 36.9 L43.25 37.8 L44.85 38.6 L46.35 39.45 L47.75 40.45 L49.05 41.45 L50.2 42.55 L51.3 43.7 L52.25 44.95 L53.1 46.25 L53.85 47.6 L48.15 49.5 L47.95 48.45 L47.7 47.35 L47.3 46.25 L46.75 45.1 L46.15 43.9 L45.4 42.7 L44.5 41.45 L43.55 40.15 L42.45 38.85 L41.15 37.65 Z M53.85 47.6 L53.65 49.9 L51.95 51.4 L49.65 51.2 L48.15 49.5 Z",
          "bounds": [
            41.15,
            36.9,
            53.85,
            51.4
          ],
          "direction": "curve",
          "weight": 16.710775,
          "revealPath": "M41 37 Q49 42.5 51.5 50",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.65 36.35 L69.85 37.35 L72 38.3 L74 39.35 L75.9 40.45 L77.6 41.6 L79.2 42.8 L80.7 44.1 L82.05 45.4 L83.25 46.75 L84.35 48.2 L79.1 51.15 L78.6 49.9 L77.9 48.6 L77.05 47.3 L76.05 45.95 L74.95 44.55 L73.65 43.15 L72.25 41.7 L70.7 40.2 L69.05 38.65 L67.2 37.1 Z M84.35 48.2 L84.6 50.45 L83.2 52.3 L80.95 52.55 L79.1 51.15 Z",
          "bounds": [
            67.2,
            36.35,
            84.6,
            52.55
          ],
          "direction": "curve",
          "weight": 21.224985,
          "revealPath": "M67 36.5 Q78 43 82.5 51",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M11 62 L90.5 62 L90.5 64 L11 64 Z M90.5 62 L78.5 63 L84.5 57 Z",
          "bounds": [
            11,
            57,
            90.5,
            64
          ],
          "direction": "right",
          "weight": 79.5
        }
      ],
      [
        {
          "outline": "M53 54 L53 92 L47 95 L47 53 Z M53 54 L54.5 55 L52 56.5 Z",
          "bounds": [
            47,
            53,
            54.5,
            95
          ],
          "direction": "down",
          "weight": 40
        }
      ],
      [
        {
          "outline": "M51.75 63 L50.45 64.65 L47.4 68.45 L44.05 72.05 L40.35 75.35 L36.35 78.4 L32 81.25 L27.35 83.85 L22.4 86.15 L17.15 88.2 L11.55 89.95 L5.6 91.4 L5.35 90.55 L10.9 88.2 L16.1 85.75 L20.95 83.2 L25.5 80.5 L29.7 77.7 L33.5 74.75 L37 71.6 L40.2 68.3 L43 64.9 L44.3 63 Z",
          "bounds": [
            5.35,
            63,
            51.75,
            91.4
          ],
          "direction": "curve",
          "weight": 50.894499,
          "revealPath": "M48 63 Q35 82 5.5 91",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M52.65 63.1 L55.8 65.8 L59 68.4 L62.3 70.9 L65.75 73.3 L69.35 75.5 L73.1 77.55 L77.05 79.5 L81.2 81.25 L85.5 82.9 L90.05 84.35 L87.9 90.6 L83.25 88.7 L78.8 86.65 L74.55 84.4 L70.55 82 L66.75 79.4 L63.25 76.65 L59.95 73.7 L56.95 70.55 L54.25 67.2 L51.95 63.65 Z M87.9 90.6 L90.05 84.35 L93.7 85.6 Z",
          "bounds": [
            51.95,
            63.1,
            93.7,
            90.6
          ],
          "direction": "curve",
          "weight": 44.376232,
          "revealPath": "M52 63 Q65.5 79.5 89 87.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch205Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch205 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH205_STROKES = loadGlyphWikiBatch205Strokes(reviewed)

