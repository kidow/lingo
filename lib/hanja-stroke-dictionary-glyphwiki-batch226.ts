/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch226.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "莘",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "00f139a5d0994ce892cdf3b5cc85ac336d58f6881bff8a4c64f10c711129b3fd",
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
    "pathsSha256": "029ca9ca4468ef804c8cc40510d5835044357259cdf28eca43486fcb06b0bbaf",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8398.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8398.svg",
      "dictionarySvgSha256": "8529a1ec971e584910d0e52c9cfaab18d1089ad7e7321d6f70c20b91a64ac519",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "fd914a5812beab96128c6af4fc42834ae8e9f8bd5822e9c4a239ef7e7b3f4fa8",
      "geometryReviewSha256": "fd914a5812beab96128c6af4fc42834ae8e9f8bd5822e9c4a239ef7e7b3f4fa8",
      "directionReviewSha256": "fd914a5812beab96128c6af4fc42834ae8e9f8bd5822e9c4a239ef7e7b3f4fa8"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u8398-k/koseki-348740/ufa5e-03/u8279-k03/u8f9b; individual glyph revisions unavailable; source SHA256 29cec508e3c968d9b15a53e2706a4516a1e796bb8aafa6d33b00aca31cf4dbfb",
      "editableSource": "/hanja-strokes/glyphwiki/8398.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u8398-k and only declared koseki-348740/ufa5e-03/u8279-k03/u8f9b. Original11 groups11 primitives,Q2/C0 and all coordinates/polygons/defaults preserved. Reorder grass raw3 before raw2 for domestic3/4. Normalize200to100 and winding only; no invented geometry, bridging, splitting, trimming, reversal, width changes or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.45 15.85 L46.75 15.85 L46.75 17.85 L6.45 17.85 Z M46.75 15.85 L36.75 16.85 L41.75 11.35 Z",
      "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
      "M52.7 15.85 L93 15.85 L93 17.85 L52.7 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
      "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
      "M53 28.25 L53 39.6 L47 39.6 L47 27.25 Z M53 28.25 L54.5 29.25 L52 30.75 Z",
      "M14 37.6 L86 37.6 L86 39.6 L14 39.6 Z M86 37.6 L74 38.6 L80 32.6 Z",
      "M27.65 40.4 L29.3 41.4 L30.95 42.35 L32.5 43.4 L33.9 44.55 L35.25 45.75 L36.45 47.1 L37.6 48.5 L38.65 49.95 L39.55 51.5 L40.35 53.1 L34.65 55 L34.35 53.6 L33.95 52.25 L33.45 50.85 L32.85 49.5 L32.15 48.1 L31.35 46.75 L30.45 45.35 L29.5 43.95 L28.4 42.45 L27.1 41.15 Z M40.35 53.1 L40.15 55.4 L38.45 56.9 L36.15 56.7 L34.65 55 Z",
      "M72.8 43.2 L71.75 44.6 L70.6 46 L69.4 47.45 L68.15 48.95 L66.8 50.45 L65.4 52 L63.9 53.6 L62.3 55.15 L60.55 56.75 L58.85 58.4 L58.1 57.8 L59.3 55.75 L60.4 53.7 L61.5 51.8 L62.55 49.9 L63.5 48.15 L64.45 46.4 L65.35 44.75 L66.2 43.15 L66.95 41.6 L67.65 40.1 Z M67.4 40.55 L67.9 39.65 L72.8 43.2 Z M72.8 43.2 L73.55 44.85 L70.65 44.85 Z",
      "M7.5 57.1 L92.5 57.1 L92.5 59.1 L7.5 59.1 Z M92.5 57.1 L80.5 58.1 L86.5 52.1 Z",
      "M12.5 71.35 L87.5 71.35 L87.5 73.35 L12.5 73.35 Z M87.5 71.35 L75.5 72.35 L81.5 66.35 Z",
      "M53 57.1 L53 90.75 L47 93.75 L47 57.1 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.85 L46.75 15.85 L46.75 17.85 L6.45 17.85 Z M46.75 15.85 L36.75 16.85 L41.75 11.35 Z",
          "bounds": [
            6.45,
            11.35,
            46.75,
            17.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
          "bounds": [
            28.8,
            5.45,
            36.3,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M52.7 15.85 L93 15.85 L93 17.85 L52.7 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
          "bounds": [
            52.7,
            10.85,
            93,
            17.85
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
          "bounds": [
            64.65,
            5.45,
            72.15,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M53 28.25 L53 39.6 L47 39.6 L47 27.25 Z M53 28.25 L54.5 29.25 L52 30.75 Z",
          "bounds": [
            47,
            27.25,
            54.5,
            39.6
          ],
          "direction": "down",
          "weight": 10.875
        }
      ],
      [
        {
          "outline": "M14 37.6 L86 37.6 L86 39.6 L14 39.6 Z M86 37.6 L74 38.6 L80 32.6 Z",
          "bounds": [
            14,
            32.6,
            86,
            39.6
          ],
          "direction": "right",
          "weight": 72
        }
      ],
      [
        {
          "outline": "M27.65 40.4 L29.3 41.4 L30.95 42.35 L32.5 43.4 L33.9 44.55 L35.25 45.75 L36.45 47.1 L37.6 48.5 L38.65 49.95 L39.55 51.5 L40.35 53.1 L34.65 55 L34.35 53.6 L33.95 52.25 L33.45 50.85 L32.85 49.5 L32.15 48.1 L31.35 46.75 L30.45 45.35 L29.5 43.95 L28.4 42.45 L27.1 41.15 Z M40.35 53.1 L40.15 55.4 L38.45 56.9 L36.15 56.7 L34.65 55 Z",
          "bounds": [
            27.1,
            40.4,
            40.35,
            56.9
          ],
          "direction": "curve",
          "weight": 18.601075,
          "revealPath": "M27 40.5 Q35 46.5 38 55.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M72.8 43.2 L71.75 44.6 L70.6 46 L69.4 47.45 L68.15 48.95 L66.8 50.45 L65.4 52 L63.9 53.6 L62.3 55.15 L60.55 56.75 L58.85 58.4 L58.1 57.8 L59.3 55.75 L60.4 53.7 L61.5 51.8 L62.55 49.9 L63.5 48.15 L64.45 46.4 L65.35 44.75 L66.2 43.15 L66.95 41.6 L67.65 40.1 Z M67.4 40.55 L67.9 39.65 L72.8 43.2 Z M72.8 43.2 L73.55 44.85 L70.65 44.85 Z",
          "bounds": [
            58.1,
            39.65,
            73.55,
            58.4
          ],
          "direction": "curve",
          "weight": 20.706657,
          "revealPath": "M70.5 41.25 Q66 48.75 58.5 58.125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.5 57.1 L92.5 57.1 L92.5 59.1 L7.5 59.1 Z M92.5 57.1 L80.5 58.1 L86.5 52.1 Z",
          "bounds": [
            7.5,
            52.1,
            92.5,
            59.1
          ],
          "direction": "right",
          "weight": 85
        }
      ],
      [
        {
          "outline": "M12.5 71.35 L87.5 71.35 L87.5 73.35 L12.5 73.35 Z M87.5 71.35 L75.5 72.35 L81.5 66.35 Z",
          "bounds": [
            12.5,
            66.35,
            87.5,
            73.35
          ],
          "direction": "right",
          "weight": 75
        }
      ],
      [
        {
          "outline": "M53 57.1 L53 90.75 L47 93.75 L47 57.1 Z",
          "bounds": [
            47,
            57.1,
            53,
            93.75
          ],
          "direction": "down",
          "weight": 34.125
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch226Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch226 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH226_STROKES = loadGlyphWikiBatch226Strokes(reviewed)
