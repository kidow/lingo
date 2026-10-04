/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch248.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "菲",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "82c066247d58b01752673d5ff018d06ffc6273612a886c161fde639fc997d790",
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
      11,
      12
    ],
    "pathsSha256": "bef95f42cb61bbc3df93ecb5a92219b73f6ffdd2722da35114823f3d8987b797",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83f2.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/83f2.svg",
      "dictionarySvgSha256": "52d2f8c4ffd8aa859202b6d476c8c8983e8056ac8fe479f0ae41c48103a19897",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "b5b64219ad9362355798fcb886f93c770dc7ba580674f237f9aa2a7ded4530be",
      "geometryReviewSha256": "b5b64219ad9362355798fcb886f93c770dc7ba580674f237f9aa2a7ded4530be",
      "directionReviewSha256": "b5b64219ad9362355798fcb886f93c770dc7ba580674f237f9aa2a7ded4530be"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u83f2-k/ufa5e-03/u8279-k03/u975e-var-001; individual glyph revisions unavailable; source SHA256 5559c72ac83e5274eebd6dfc3ad0bb531f24076d45e452907003706e95798a41",
      "editableSource": "/hanja-strokes/glyphwiki/83f2.json",
      "modifications": "All12 domestic directions/cumulative/full form and108 progressive frames reviewed in Codex in-app browser. Exact whole u83f2-k and declared ufa5e-03/u8279-k03/u975e-var-001 from pinned archive. Original12 raw groups13 drawing primitives,Q2/C0 and original coordinates/polygons/default mincho preserved. Domestic grass order swaps raw2/3. Domestic5 follows continuous original line and quadratic at76.77,122.795; domestic8 preserves original upward-right quadratic. Normalize200to100/winding only; no inferred geometry, reversal, width changes, radical transplant or latest substitution."
    },
    "paths": [
      "M6.45 16.35 L46.75 16.35 L46.75 18.35 L6.45 18.35 Z M46.75 16.35 L36.75 17.35 L41.75 11.85 Z",
      "M34.8 6.6 L34.8 26.65 L28.8 29.65 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
      "M52.7 16.35 L93 16.35 L93 18.35 L52.7 18.35 Z M93 16.35 L81 17.35 L87 11.35 Z",
      "M70.65 6.6 L70.65 26.65 L64.65 29.65 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
      "M41.35 31.9 L41.35 61.35 L35.35 61.35 L35.35 30.9 Z M41.35 31.9 L42.85 32.9 L40.35 34.4 Z M35.35 61.35 L41.35 61.35 L40.15 63.15 L38.35 64.35 L36.55 63.15 Z M41.35 61.35 L40.9 66.3 L39.75 70.95 L37.95 75.2 L35.5 79.05 L32.45 82.5 L28.8 85.5 L24.6 88.05 L19.85 90.25 L14.55 91.95 L8.7 93.2 L8.45 92.3 L13.9 90.15 L18.75 87.8 L22.9 85.25 L26.45 82.5 L29.35 79.55 L31.7 76.4 L33.4 73.05 L34.6 69.45 L35.25 65.55 L35.35 61.35 Z",
      "M7.55 43.1 L38.35 43.1 L38.35 45.1 L7.55 45.1 Z",
      "M10.1 57.55 L38.35 57.55 L38.35 59.55 L10.1 59.55 Z",
      "M7.1 72.8 L10.2 72.45 L13.3 72.1 L16.3 71.75 L19.3 71.35 L22.3 71 L25.2 70.6 L28.1 70.25 L31 69.9 L33.85 69.6 L36.75 69.4 L36.95 70.25 L34.3 71.45 L31.6 72.5 L28.85 73.45 L26 74.35 L23.1 75.15 L20.2 75.95 L17.2 76.7 L14.2 77.4 L11.1 78.05 L8 78.7 Z M8 78.7 L6.1 72.95 L7.1 72.8 Z M8 78.7 L10.75 76.8 L9.2 80.05 Z",
      "M65.1 31.9 L65.1 90.55 L59.1 93.55 L59.1 30.9 Z M65.1 31.9 L66.6 32.9 L64.1 34.4 Z",
      "M62.1 43.1 L92.4 43.1 L92.4 45.1 L62.1 45.1 Z M92.4 43.1 L80.4 44.1 L86.4 38.1 Z",
      "M62.1 57.55 L88.35 57.55 L88.35 59.55 L62.1 59.55 Z M88.35 57.55 L76.35 58.55 L82.35 52.55 Z",
      "M62.1 72.35 L93.9 72.35 L93.9 74.35 L62.1 74.35 Z M93.9 72.35 L81.9 73.35 L87.9 67.35 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 16.35 L46.75 16.35 L46.75 18.35 L6.45 18.35 Z M46.75 16.35 L36.75 17.35 L41.75 11.85 Z",
          "bounds": [
            6.45,
            11.85,
            46.75,
            18.35
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.6 L34.8 26.65 L28.8 29.65 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
          "bounds": [
            28.8,
            5.6,
            36.3,
            29.65
          ],
          "direction": "down",
          "weight": 22.0575
        }
      ],
      [
        {
          "outline": "M52.7 16.35 L93 16.35 L93 18.35 L52.7 18.35 Z M93 16.35 L81 17.35 L87 11.35 Z",
          "bounds": [
            52.7,
            11.35,
            93,
            18.35
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.6 L70.65 26.65 L64.65 29.65 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
          "bounds": [
            64.65,
            5.6,
            72.15,
            29.65
          ],
          "direction": "down",
          "weight": 22.0575
        }
      ],
      [
        {
          "outline": "M41.35 31.9 L41.35 61.35 L35.35 61.35 L35.35 30.9 Z M41.35 31.9 L42.85 32.9 L40.35 34.4 Z M35.35 61.35 L41.35 61.35 L40.15 63.15 L38.35 64.35 L36.55 63.15 Z",
          "bounds": [
            35.35,
            30.9,
            42.85,
            64.35
          ],
          "direction": "down",
          "weight": 29.9625
        },
        {
          "outline": "M41.35 61.35 L40.9 66.3 L39.75 70.95 L37.95 75.2 L35.5 79.05 L32.45 82.5 L28.8 85.5 L24.6 88.05 L19.85 90.25 L14.55 91.95 L8.7 93.2 L8.45 92.3 L13.9 90.15 L18.75 87.8 L22.9 85.25 L26.45 82.5 L29.35 79.55 L31.7 76.4 L33.4 73.05 L34.6 69.45 L35.25 65.55 L35.35 61.35 Z",
          "bounds": [
            8.45,
            61.35,
            41.35,
            93.2
          ],
          "direction": "curve",
          "weight": 43.266335,
          "revealPath": "M38.385 61.3975 Q38.385 85.015 8.59 92.77",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.55 43.1 L38.35 43.1 L38.35 45.1 L7.55 45.1 Z",
          "bounds": [
            7.55,
            43.1,
            38.35,
            45.1
          ],
          "direction": "right",
          "weight": 30.805
        }
      ],
      [
        {
          "outline": "M10.1 57.55 L38.35 57.55 L38.35 59.55 L10.1 59.55 Z",
          "bounds": [
            10.1,
            57.55,
            38.35,
            59.55
          ],
          "direction": "right",
          "weight": 28.28
        }
      ],
      [
        {
          "outline": "M7.1 72.8 L10.2 72.45 L13.3 72.1 L16.3 71.75 L19.3 71.35 L22.3 71 L25.2 70.6 L28.1 70.25 L31 69.9 L33.85 69.6 L36.75 69.4 L36.95 70.25 L34.3 71.45 L31.6 72.5 L28.85 73.45 L26 74.35 L23.1 75.15 L20.2 75.95 L17.2 76.7 L14.2 77.4 L11.1 78.05 L8 78.7 Z M8 78.7 L6.1 72.95 L7.1 72.8 Z M8 78.7 L10.75 76.8 L9.2 80.05 Z",
          "bounds": [
            6.1,
            69.4,
            36.95,
            80.05
          ],
          "direction": "curve",
          "weight": 30.391645,
          "revealPath": "M7.075 75.85 Q23.235 73.3825 36.87 69.8575",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M65.1 31.9 L65.1 90.55 L59.1 93.55 L59.1 30.9 Z M65.1 31.9 L66.6 32.9 L64.1 34.4 Z",
          "bounds": [
            59.1,
            30.9,
            66.6,
            93.55
          ],
          "direction": "down",
          "weight": 60.63
        }
      ],
      [
        {
          "outline": "M62.1 43.1 L92.4 43.1 L92.4 45.1 L62.1 45.1 Z M92.4 43.1 L80.4 44.1 L86.4 38.1 Z",
          "bounds": [
            62.1,
            38.1,
            92.4,
            45.1
          ],
          "direction": "right",
          "weight": 30.3
        }
      ],
      [
        {
          "outline": "M62.1 57.55 L88.35 57.55 L88.35 59.55 L62.1 59.55 Z M88.35 57.55 L76.35 58.55 L82.35 52.55 Z",
          "bounds": [
            62.1,
            52.55,
            88.35,
            59.55
          ],
          "direction": "right",
          "weight": 26.26
        }
      ],
      [
        {
          "outline": "M62.1 72.35 L93.9 72.35 L93.9 74.35 L62.1 74.35 Z M93.9 72.35 L81.9 73.35 L87.9 67.35 Z",
          "bounds": [
            62.1,
            67.35,
            93.9,
            74.35
          ],
          "direction": "right",
          "weight": 31.815
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch248Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch248 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH248_STROKES = loadGlyphWikiBatch248Strokes(reviewed)
