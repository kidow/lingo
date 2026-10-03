/** Whole historical geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch206.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "崍",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "a75a6e2baec972b17bb6c6c9878ea8105982fc9a53c357313d583852b6cd3546",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      12,
      6,
      7,
      8
    ],
    "pathsSha256": "f61b75dd9e1ad5d764c0ffe0305e0a652195c9021cdddf9926f91120590251c7",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5d00/5d0d.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5d00/5d0d.svg",
      "dictionarySvgSha256": "c61592414fcfe0143634ee875dc33426adeaf80dcedb532fc6bc424cf5469afd",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11",
      "orderReviewSha256": "6c1cb600d78b92b00ba70540c0c30693e9af1f52620887d60005520fe55f0bd2",
      "geometryReviewSha256": "6c1cb600d78b92b00ba70540c0c30693e9af1f52620887d60005520fe55f0bd2",
      "directionReviewSha256": "6c1cb600d78b92b00ba70540c0c30693e9af1f52620887d60005520fe55f0bd2"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u5d0d-k/u5d0d/u5c71-01/u4f86-02; individual glyph revisions unavailable; source SHA256 0a7637087671aff487112eee02982331e602936d2c93091047ca4285e1b75b45",
      "editableSource": "/hanja-strokes/glyphwiki/5d0d.json",
      "modifications": "All11 domestic directional/cumulative states, complete form and99 progressive frames reviewed in Codex in-app browser. Exact whole u5d0d-k -> u5d0d and only declared u5c71-01/u4f86-02. Four historical archive records; individual glyph revisions unavailable. No radical transplant. Domestic2 original down-to-right join19.47,147 is continuous. Original raw8/9/10/11 small-person strokes precede raw5 center vertical and raw6/7 final curves in the observed domestic order. Raw groups0;1,2;3;4;8;9;10;11;5;6;7. All12 original source groups,12 draw primitives,six quadratic paths, polygons and engine defaults retained. Normalize200to100 and winding; no invented points, bridges, trimming, primitive splitting or width changes. Continuous structural primitives follow the observed domestic pen trajectory without added geometry. Licensed geometry is separate from domestic dictionary evidence and exam-body official approval. Private graphics stay RAM-only."
    },
    "paths": [
      "M25.1 11 L25.1 74.5 L19.1 74.5 L19.1 10 Z M25.1 11 L26.6 12 L24.1 13.5 Z",
      "M12.7 26 L12.7 80.5 L6.7 83.5 L6.7 25 Z M12.7 26 L14.2 27 L11.7 28.5 Z M9.7 72.5 L35.4 72.5 L35.4 74.5 L9.7 74.5 Z",
      "M38.4 26 L38.4 76.5 L32.4 79.5 L32.4 25 Z M38.4 26 L39.9 27 L37.4 28.5 Z",
      "M41.6 22 L92.35 22 L92.35 24 L41.6 24 Z M92.35 22 L80.35 23 L86.35 17 Z",
      "M55.7 29.35 L54.85 33.85 L53.9 38.15 L52.8 42.2 L51.55 46.1 L50.2 49.8 L48.7 53.25 L47 56.5 L45.2 59.5 L43.15 62.25 L40.95 64.75 L40.25 64.2 L41.55 61.3 L42.8 58.25 L44.05 55.15 L45.15 51.85 L46.2 48.4 L47.1 44.8 L47.95 41 L48.65 37.05 L49.25 32.9 L49.75 28.6 Z M49.65 29.05 L49.85 27.55 L55.7 29.35 Z M55.7 29.35 L57.05 30.55 L54.35 31.7 Z",
      "M51.4 40.55 L52.7 41.75 L54.05 42.85 L55.3 44 L56.45 45.15 L57.55 46.35 L58.5 47.55 L59.45 48.8 L60.3 50.05 L61.05 51.3 L61.75 52.6 L56.05 54.5 L55.85 53.35 L55.55 52.15 L55.2 50.95 L54.8 49.65 L54.3 48.35 L53.75 46.95 L53.1 45.55 L52.4 44.1 L51.7 42.6 L50.75 41.15 Z M61.75 52.6 L61.55 54.85 L59.85 56.4 L57.6 56.2 L56.05 54.5 Z",
      "M85.15 29.8 L84.4 34.05 L83.6 38.05 L82.65 41.8 L81.6 45.3 L80.4 48.5 L79.1 51.45 L77.65 54.15 L76.05 56.55 L74.3 58.6 L72.4 60.25 L71.7 59.7 L72.75 57.5 L73.75 55.2 L74.7 52.75 L75.55 50.05 L76.4 47.2 L77.1 44.05 L77.75 40.7 L78.3 37.1 L78.8 33.25 L79.15 29.15 Z M79.1 29.6 L79.3 28.1 L85.15 29.8 Z M85.15 29.8 L86.5 31 L83.85 32.2 Z",
      "M81.35 43 L82.7 44 L84.1 45 L85.4 46.15 L86.7 47.45 L87.9 48.8 L89.05 50.25 L90.1 51.8 L91.15 53.45 L92.15 55.2 L93.1 57 L87.5 59.15 L87 57.4 L86.45 55.7 L85.85 54.05 L85.25 52.45 L84.55 50.85 L83.9 49.35 L83.15 47.9 L82.4 46.45 L81.65 45 L80.75 43.65 Z M93.1 57 L93 59.3 L91.4 60.85 L89.1 60.8 L87.5 59.15 Z",
      "M70 7.5 L70 91.5 L64 94.5 L64 6.5 Z M70 7.5 L71.5 8.5 L69 10 Z",
      "M69.9 48.3 L67.95 53.8 L65.65 59.1 L62.9 64.05 L59.8 68.75 L56.35 73.2 L52.45 77.3 L48.25 81.05 L43.6 84.55 L38.6 87.65 L33.2 90.35 L32.75 89.6 L37.55 86.05 L41.95 82.4 L46.05 78.65 L49.7 74.65 L53 70.5 L55.95 66.2 L58.55 61.65 L60.75 56.85 L62.6 51.9 L64.1 46.65 Z",
      "M67.55 47.8 L69.8 52.65 L72 57.25 L74.25 61.55 L76.6 65.55 L79.05 69.25 L81.55 72.65 L84.25 75.75 L87 78.55 L89.85 81.1 L92.85 83.35 L88.85 88.6 L85.7 85.75 L82.75 82.65 L79.95 79.25 L77.4 75.6 L75.05 71.7 L72.9 67.5 L71 63.1 L69.25 58.35 L67.8 53.35 L66.7 48.1 Z M88.85 88.6 L92.85 83.35 L94.3 84.45 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M25.1 11 L25.1 74.5 L19.1 74.5 L19.1 10 Z M25.1 11 L26.6 12 L24.1 13.5 Z",
          "bounds": [
            19.1,
            10,
            26.6,
            74.5
          ],
          "direction": "down",
          "weight": 63
        }
      ],
      [
        {
          "outline": "M12.7 26 L12.7 80.5 L6.7 83.5 L6.7 25 Z M12.7 26 L14.2 27 L11.7 28.5 Z",
          "bounds": [
            6.7,
            25,
            14.2,
            83.5
          ],
          "direction": "down",
          "weight": 48
        },
        {
          "outline": "M9.7 72.5 L35.4 72.5 L35.4 74.5 L9.7 74.5 Z",
          "bounds": [
            9.7,
            72.5,
            35.4,
            74.5
          ],
          "direction": "right",
          "weight": 25.665
        }
      ],
      [
        {
          "outline": "M38.4 26 L38.4 76.5 L32.4 79.5 L32.4 25 Z M38.4 26 L39.9 27 L37.4 28.5 Z",
          "bounds": [
            32.4,
            25,
            39.9,
            79.5
          ],
          "direction": "down",
          "weight": 48
        }
      ],
      [
        {
          "outline": "M41.6 22 L92.35 22 L92.35 24 L41.6 24 Z M92.35 22 L80.35 23 L86.35 17 Z",
          "bounds": [
            41.6,
            17,
            92.35,
            24
          ],
          "direction": "right",
          "weight": 50.75
        }
      ],
      [
        {
          "outline": "M55.7 29.35 L54.85 33.85 L53.9 38.15 L52.8 42.2 L51.55 46.1 L50.2 49.8 L48.7 53.25 L47 56.5 L45.2 59.5 L43.15 62.25 L40.95 64.75 L40.25 64.2 L41.55 61.3 L42.8 58.25 L44.05 55.15 L45.15 51.85 L46.2 48.4 L47.1 44.8 L47.95 41 L48.65 37.05 L49.25 32.9 L49.75 28.6 Z M49.65 29.05 L49.85 27.55 L55.7 29.35 Z M55.7 29.35 L57.05 30.55 L54.35 31.7 Z",
          "bounds": [
            40.25,
            27.55,
            57.05,
            64.75
          ],
          "direction": "curve",
          "weight": 38.004637,
          "revealPath": "M52.8025 28.5 Q49.7575 51.5 40.6225 64.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M51.4 40.55 L52.7 41.75 L54.05 42.85 L55.3 44 L56.45 45.15 L57.55 46.35 L58.5 47.55 L59.45 48.8 L60.3 50.05 L61.05 51.3 L61.75 52.6 L56.05 54.5 L55.85 53.35 L55.55 52.15 L55.2 50.95 L54.8 49.65 L54.3 48.35 L53.75 46.95 L53.1 45.55 L52.4 44.1 L51.7 42.6 L50.75 41.15 Z M61.75 52.6 L61.55 54.85 L59.85 56.4 L57.6 56.2 L56.05 54.5 Z",
          "bounds": [
            50.75,
            40.55,
            61.75,
            56.4
          ],
          "direction": "curve",
          "weight": 16.872574,
          "revealPath": "M50.7725 40.5 Q56.8625 47.5 59.4 55",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M85.15 29.8 L84.4 34.05 L83.6 38.05 L82.65 41.8 L81.6 45.3 L80.4 48.5 L79.1 51.45 L77.65 54.15 L76.05 56.55 L74.3 58.6 L72.4 60.25 L71.7 59.7 L72.75 57.5 L73.75 55.2 L74.7 52.75 L75.55 50.05 L76.4 47.2 L77.1 44.05 L77.75 40.7 L78.3 37.1 L78.8 33.25 L79.15 29.15 Z M79.1 29.6 L79.3 28.1 L85.15 29.8 Z M85.15 29.8 L86.5 31 L83.85 32.2 Z",
          "bounds": [
            71.7,
            28.1,
            86.5,
            60.25
          ],
          "direction": "curve",
          "weight": 32.619358,
          "revealPath": "M82.2375 29 Q79.7 51 72.0875 60",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M81.35 43 L82.7 44 L84.1 45 L85.4 46.15 L86.7 47.45 L87.9 48.8 L89.05 50.25 L90.1 51.8 L91.15 53.45 L92.15 55.2 L93.1 57 L87.5 59.15 L87 57.4 L86.45 55.7 L85.85 54.05 L85.25 52.45 L84.55 50.85 L83.9 49.35 L83.15 47.9 L82.4 46.45 L81.65 45 L80.75 43.65 Z M93.1 57 L93 59.3 L91.4 60.85 L89.1 60.8 L87.5 59.15 Z",
          "bounds": [
            80.75,
            43,
            93.1,
            60.85
          ],
          "direction": "curve",
          "weight": 19.371951,
          "revealPath": "M80.715 43 Q86.805 49 90.865 59.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M70 7.5 L70 91.5 L64 94.5 L64 6.5 Z M70 7.5 L71.5 8.5 L69 10 Z",
          "bounds": [
            64,
            6.5,
            71.5,
            94.5
          ],
          "direction": "down",
          "weight": 86
        }
      ],
      [
        {
          "outline": "M69.9 48.3 L67.95 53.8 L65.65 59.1 L62.9 64.05 L59.8 68.75 L56.35 73.2 L52.45 77.3 L48.25 81.05 L43.6 84.55 L38.6 87.65 L33.2 90.35 L32.75 89.6 L37.55 86.05 L41.95 82.4 L46.05 78.65 L49.7 74.65 L53 70.5 L55.95 66.2 L58.55 61.65 L60.75 56.85 L62.6 51.9 L64.1 46.65 Z",
          "bounds": [
            32.75,
            46.65,
            69.9,
            90.35
          ],
          "direction": "curve",
          "weight": 54.428118,
          "revealPath": "M67.0125 47.5 Q59.4 75 33.01 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.55 47.8 L69.8 52.65 L72 57.25 L74.25 61.55 L76.6 65.55 L79.05 69.25 L81.55 72.65 L84.25 75.75 L87 78.55 L89.85 81.1 L92.85 83.35 L88.85 88.6 L85.7 85.75 L82.75 82.65 L79.95 79.25 L77.4 75.6 L75.05 71.7 L72.9 67.5 L71 63.1 L69.25 58.35 L67.8 53.35 L66.7 48.1 Z M88.85 88.6 L92.85 83.35 L94.3 84.45 Z",
          "bounds": [
            66.7,
            47.8,
            94.3,
            88.6
          ],
          "direction": "curve",
          "weight": 45.290085,
          "revealPath": "M67.0125 47.5 Q75.1325 74 90.865 86",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch206Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch206 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH206_STROKES = loadGlyphWikiBatch206Strokes(reviewed)

