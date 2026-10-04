/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch219.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "甛",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "fb872a02f687aede451ec34a1cb33c1dd1f20436da04a04880d00904b9391b67",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
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
    "pathsSha256": "bd4ca34ebe55e9617cc5d00cfaa17e18eec41ca05bd0cee6494c3cae10cac2df",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/751b.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7500/751b.svg",
      "dictionarySvgSha256": "f1d249f19b3703f0043fcfa9fc55fda2eafcfeaba0051430cfaa69046316fa50",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "601b3b666d5a7a94dd860c097df977a6198fafb3283ba415df525ad0aeaa52d5",
      "geometryReviewSha256": "601b3b666d5a7a94dd860c097df977a6198fafb3283ba415df525ad0aeaa52d5",
      "directionReviewSha256": "601b3b666d5a7a94dd860c097df977a6198fafb3283ba415df525ad0aeaa52d5"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u751b-k/u751b/u7518/u820c-02; individual glyph revisions unavailable; source SHA256 57ff37a2d3399ec72ca17cb6fe6f57ccccd3656d5bbf312f3c11c1f52b9dd467",
      "editableSource": "/hanja-strokes/glyphwiki/751b.json",
      "modifications": "All11 domestic direction/cumulative/full states and99 progressive frames reviewed in Codex in-app browser. Exact whole u751b-k -> u751b and only declared u7518/u820c-02; four archive records, no individual glyph revisions. Domestic10 joins original raw9 horizontal ending169.8,119 to raw10 vertical starting169.8,119. All12 original groups12 primitives, one quadratic curve, all points, polygons, ornaments and original engine defaults retained. Normalize200to100 and winding only; no invented points, bridges, splitting, trimming, reversal, width correction or radical transplant. Licensed geometry is separate from domestic dictionary evidence and exam-body approval. Private graphics RAM-only."
    },
    "paths": [
      "M6.15 26.5 L48.3 26.5 L48.3 28.5 L6.15 28.5 Z M48.3 26.5 L42.3 27.5 L45.3 23.5 Z",
      "M19.8 9 L19.8 91 L13.8 94 L13.8 8 Z M19.8 9 L21.3 10 L18.8 11.5 Z",
      "M40.65 9 L40.65 88 L34.65 91 L34.65 8 Z M40.65 9 L42.15 10 L39.65 11.5 Z",
      "M16.8 53.5 L37.65 53.5 L37.65 55.5 L16.8 55.5 Z",
      "M16.8 83 L37.65 83 L37.65 85 L16.8 85 Z",
      "M87 13.9 L83.5 15.4 L79.85 16.8 L76.1 18.1 L72.25 19.25 L68.25 20.3 L64.15 21.25 L59.95 22.05 L55.6 22.7 L51.15 23.15 L46.55 23.4 L46.4 22.55 L50.8 21.3 L55.05 20.05 L59.2 18.85 L63.2 17.6 L67.05 16.25 L70.75 14.85 L74.35 13.4 L77.8 11.85 L81.1 10.2 L84.25 8.5 Z M83.85 8.75 L88.45 13.15 L87 13.9 Z M88.45 13.15 L88.5 14.8 L85.45 13.55 Z",
      "M45.7 38 L93.7 38 L93.7 40 L45.7 40 Z M93.7 38 L81.7 39 L87.7 33 Z",
      "M72.7 17 L72.7 60.5 L66.7 60.5 L66.7 17 Z",
      "M57.5 58.5 L57.5 91.5 L51.5 94.5 L51.5 55.5 Z",
      "M54.5 58.5 L84.9 58.5 L84.9 60.5 L54.5 60.5 Z M87.9 59.5 L87.9 88.5 L81.9 91.5 L81.9 59.5 Z M81.9 58.5 L84.9 56 L90.4 60.5 L87.9 62.5 L81.9 59.5 Z",
      "M54.5 83.5 L84.9 83.5 L84.9 85.5 L54.5 85.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.15 26.5 L48.3 26.5 L48.3 28.5 L6.15 28.5 Z M48.3 26.5 L42.3 27.5 L45.3 23.5 Z",
          "bounds": [
            6.15,
            23.5,
            48.3,
            28.5
          ],
          "direction": "right",
          "weight": 42.195
        }
      ],
      [
        {
          "outline": "M19.8 9 L19.8 91 L13.8 94 L13.8 8 Z M19.8 9 L21.3 10 L18.8 11.5 Z",
          "bounds": [
            13.8,
            8,
            21.3,
            94
          ],
          "direction": "down",
          "weight": 75.5
        }
      ],
      [
        {
          "outline": "M40.65 9 L40.65 88 L34.65 91 L34.65 8 Z M40.65 9 L42.15 10 L39.65 11.5 Z",
          "bounds": [
            34.65,
            8,
            42.15,
            91
          ],
          "direction": "down",
          "weight": 75.5
        }
      ],
      [
        {
          "outline": "M16.8 53.5 L37.65 53.5 L37.65 55.5 L16.8 55.5 Z",
          "bounds": [
            16.8,
            53.5,
            37.65,
            55.5
          ],
          "direction": "right",
          "weight": 20.855
        }
      ],
      [
        {
          "outline": "M16.8 83 L37.65 83 L37.65 85 L16.8 85 Z",
          "bounds": [
            16.8,
            83,
            37.65,
            85
          ],
          "direction": "right",
          "weight": 20.855
        }
      ],
      [
        {
          "outline": "M87 13.9 L83.5 15.4 L79.85 16.8 L76.1 18.1 L72.25 19.25 L68.25 20.3 L64.15 21.25 L59.95 22.05 L55.6 22.7 L51.15 23.15 L46.55 23.4 L46.4 22.55 L50.8 21.3 L55.05 20.05 L59.2 18.85 L63.2 17.6 L67.05 16.25 L70.75 14.85 L74.35 13.4 L77.8 11.85 L81.1 10.2 L84.25 8.5 Z M83.85 8.75 L88.45 13.15 L87 13.9 Z M88.45 13.15 L88.5 14.8 L85.45 13.55 Z",
          "bounds": [
            46.4,
            8.5,
            88.5,
            23.4
          ],
          "direction": "curve",
          "weight": 41.378255,
          "revealPath": "M86.1 11 Q69.3 19.5 46.5 23",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.7 38 L93.7 38 L93.7 40 L45.7 40 Z M93.7 38 L81.7 39 L87.7 33 Z",
          "bounds": [
            45.7,
            33,
            93.7,
            40
          ],
          "direction": "right",
          "weight": 48
        }
      ],
      [
        {
          "outline": "M72.7 17 L72.7 60.5 L66.7 60.5 L66.7 17 Z",
          "bounds": [
            66.7,
            17,
            72.7,
            60.5
          ],
          "direction": "down",
          "weight": 41.5
        }
      ],
      [
        {
          "outline": "M57.5 58.5 L57.5 91.5 L51.5 94.5 L51.5 55.5 Z",
          "bounds": [
            51.5,
            55.5,
            57.5,
            94.5
          ],
          "direction": "down",
          "weight": 25
        }
      ],
      [
        {
          "outline": "M54.5 58.5 L84.9 58.5 L84.9 60.5 L54.5 60.5 Z",
          "bounds": [
            54.5,
            58.5,
            84.9,
            60.5
          ],
          "direction": "right",
          "weight": 30.4
        },
        {
          "outline": "M87.9 59.5 L87.9 88.5 L81.9 91.5 L81.9 59.5 Z M81.9 58.5 L84.9 56 L90.4 60.5 L87.9 62.5 L81.9 59.5 Z",
          "bounds": [
            81.9,
            56,
            90.4,
            91.5
          ],
          "direction": "down",
          "weight": 25
        }
      ],
      [
        {
          "outline": "M54.5 83.5 L84.9 83.5 L84.9 85.5 L54.5 85.5 Z",
          "bounds": [
            54.5,
            83.5,
            84.9,
            85.5
          ],
          "direction": "right",
          "weight": 30.4
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch219Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch219 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH219_STROKES = loadGlyphWikiBatch219Strokes(reviewed)

