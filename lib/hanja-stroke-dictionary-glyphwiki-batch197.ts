/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch197.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "茴",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "e69e18abce2d22f087ac11bfd60f82296d9cd606c65dfa4da0d4715fc47d2859",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      9,
      10,
      11,
      12,
      8
    ],
    "pathsSha256": "4479ff56114ac02a46f09b882c347e849fae550719936c916b79e1003f10e3bd",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8334.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8334.svg",
      "dictionarySvgSha256": "d23f8319cef157b7bfe4c412e8077d9e1874bce08f13a861e56ceab04d4c609b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10",
      "orderReviewSha256": "6097621b71443907f84cf8827f2e730c6b3f0a7f94029cacca9fb2dda676c611",
      "geometryReviewSha256": "6097621b71443907f84cf8827f2e730c6b3f0a7f94029cacca9fb2dda676c611",
      "directionReviewSha256": "6097621b71443907f84cf8827f2e730c6b3f0a7f94029cacca9fb2dda676c611"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u8334-k/koseki-346600/ufa5e-03/u8279-k03/u56de; individual glyph revisions unavailable; source SHA256 1ec700228204e4afce318d543fa5b4e10a23d72ac2e9b65002c6a50684ad1994",
      "editableSource": "/hanja-strokes/glyphwiki/8334.json",
      "modifications": "All10 domestic directional/cumulative states, complete form and90 progressive frames reviewed in Codex in-app browser. Exact whole u8334-k -> koseki-346600 and only declared ufa5e-03/u8279-k03/u56de. Five historical archive records; no individual glyph revisions supplied. No radical transplant. Domestic3/4 reorder original right horizontal before right vertical. Domestic6 original horizontal/vertical join166,76.12 and domestic8 join127,104.24 are exactly continuous. Domestic10 is original outer bottom closure. Raw groups0;1;3;2;4;5,6;8;9,10;11;7. All12 original line primitives, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Group continuous original structural line segments according to the observed pen trajectory, without adding geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M6.45 17.4 L46.75 17.4 L46.75 19.4 L6.45 19.4 Z M46.75 17.4 L36.75 18.4 L41.75 12.9 Z",
      "M34.8 6.6 L34.8 28.7 L28.8 31.7 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
      "M52.7 17.4 L93 17.4 L93 19.4 L52.7 19.4 Z M93 17.4 L81 18.4 L87 12.4 Z",
      "M70.65 6.6 L70.65 28.7 L64.65 31.7 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
      "M20.5 37.05 L20.5 90.7 L14.5 93.7 L14.5 34.05 Z",
      "M17.5 37.05 L83 37.05 L83 39.05 L17.5 39.05 Z M86 38.05 L86 90.2 L80 93.2 L80 38.05 Z M80 37.05 L83 34.55 L88.5 39.05 L86 41.05 L80 38.05 Z",
      "M39.5 51.1 L39.5 79.6 L33.5 82.6 L33.5 48.1 Z",
      "M36.5 51.1 L63.5 51.1 L63.5 53.1 L36.5 53.1 Z M66.5 52.1 L66.5 76.6 L60.5 79.6 L60.5 52.1 Z M60.5 51.1 L63.5 48.6 L69 53.1 L66.5 55.1 L60.5 52.1 Z",
      "M36.5 71.6 L63.5 71.6 L63.5 73.6 L36.5 73.6 Z",
      "M17.5 87.2 L83 87.2 L83 89.2 L17.5 89.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 17.4 L46.75 17.4 L46.75 19.4 L6.45 19.4 Z M46.75 17.4 L36.75 18.4 L41.75 12.9 Z",
          "bounds": [
            6.45,
            12.9,
            46.75,
            19.4
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.6 L34.8 28.7 L28.8 31.7 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
          "bounds": [
            28.8,
            5.6,
            36.3,
            31.7
          ],
          "direction": "down",
          "weight": 24.0975
        }
      ],
      [
        {
          "outline": "M52.7 17.4 L93 17.4 L93 19.4 L52.7 19.4 Z M93 17.4 L81 18.4 L87 12.4 Z",
          "bounds": [
            52.7,
            12.4,
            93,
            19.4
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.6 L70.65 28.7 L64.65 31.7 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
          "bounds": [
            64.65,
            5.6,
            72.15,
            31.7
          ],
          "direction": "down",
          "weight": 24.0975
        }
      ],
      [
        {
          "outline": "M20.5 37.05 L20.5 90.7 L14.5 93.7 L14.5 34.05 Z",
          "bounds": [
            14.5,
            34.05,
            20.5,
            93.7
          ],
          "direction": "down",
          "weight": 50.16
        }
      ],
      [
        {
          "outline": "M17.5 37.05 L83 37.05 L83 39.05 L17.5 39.05 Z",
          "bounds": [
            17.5,
            37.05,
            83,
            39.05
          ],
          "direction": "right",
          "weight": 65.5
        },
        {
          "outline": "M86 38.05 L86 90.2 L80 93.2 L80 38.05 Z M80 37.05 L83 34.55 L88.5 39.05 L86 41.05 L80 38.05 Z",
          "bounds": [
            80,
            34.55,
            88.5,
            93.2
          ],
          "direction": "down",
          "weight": 50.16
        }
      ],
      [
        {
          "outline": "M39.5 51.1 L39.5 79.6 L33.5 82.6 L33.5 48.1 Z",
          "bounds": [
            33.5,
            48.1,
            39.5,
            82.6
          ],
          "direction": "down",
          "weight": 20.52
        }
      ],
      [
        {
          "outline": "M36.5 51.1 L63.5 51.1 L63.5 53.1 L36.5 53.1 Z",
          "bounds": [
            36.5,
            51.1,
            63.5,
            53.1
          ],
          "direction": "right",
          "weight": 27
        },
        {
          "outline": "M66.5 52.1 L66.5 76.6 L60.5 79.6 L60.5 52.1 Z M60.5 51.1 L63.5 48.6 L69 53.1 L66.5 55.1 L60.5 52.1 Z",
          "bounds": [
            60.5,
            48.6,
            69,
            79.6
          ],
          "direction": "down",
          "weight": 20.52
        }
      ],
      [
        {
          "outline": "M36.5 71.6 L63.5 71.6 L63.5 73.6 L36.5 73.6 Z",
          "bounds": [
            36.5,
            71.6,
            63.5,
            73.6
          ],
          "direction": "right",
          "weight": 27
        }
      ],
      [
        {
          "outline": "M17.5 87.2 L83 87.2 L83 89.2 L17.5 89.2 Z",
          "bounds": [
            17.5,
            87.2,
            83,
            89.2
          ],
          "direction": "right",
          "weight": 65.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch197Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch197 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH197_STROKES = loadGlyphWikiBatch197Strokes(reviewed)
