/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch158.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "阼",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-30",
    "geometrySource": "604b9c1895b9812f951bdb20fee1d40e420cfa43610f50ed1f77547a38f423ca",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "pathsSha256": "8614568cab9c2c5242652dd082cfa2cba74f9dbb728abba2999b7733847528e9",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/963C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/963C.svg",
      "dictionarySvgSha256": "321e4b5d195dcd1abb10aed0d0fc240279bbc684b548990bb526f7241e1358f0",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "f28f28e4ee62332bfc3cf85fccff297eae736aecb411cbb3c0d8bde066f25c6f",
      "geometryReviewSha256": "f28f28e4ee62332bfc3cf85fccff297eae736aecb411cbb3c0d8bde066f25c6f",
      "directionReviewSha256": "f28f28e4ee62332bfc3cf85fccff297eae736aecb411cbb3c0d8bde066f25c6f"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u963c-j@2",
      "revision": "u963c-j@2; u961d-01@11; u4e4d-02@3; observed2026-09-30; source SHA256 534ad4238047178b76847bb67129ecc7667f1d258eed08c4c8578921e47fc755",
      "editableSource": "/hanja-strokes/glyphwiki/963c.json",
      "modifications": "Whole 阼 u963c-j@2 with only declared u961d-01@11 and u4e4d-02@3. Default mincho new Kage(); scale200to100. Preserve original polygon vertices and continuous source trajectories; normalize winding only. Group original first horizontal and falling curve as domestic stroke1. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M15.2 13 L37.8 13 L37.8 15 L15.2 15 Z M40.6 14.95 L39.65 17.15 L38.55 19.35 L37.3 21.6 L36 23.9 L34.5 26.25 L32.95 28.6 L31.2 31 L29.35 33.4 L27.25 35.85 L25 38.25 L24.3 37.7 L25.7 34.8 L27.05 31.95 L28.4 29.3 L29.65 26.7 L30.8 24.2 L31.85 21.8 L32.8 19.45 L33.6 17.2 L34.35 15.05 L34.95 13 Z M34.8 13 L37.8 10.5 L43.3 15 L40.8 16.5 L34.8 19 Z",
      "M25.3 37.5 L28.25 39.55 L30.8 41.75 L33 44.15 L34.85 46.6 L36.4 49.2 L37.55 51.9 L38.35 54.65 L38.8 57.5 L38.8 60.45 L38.5 63.4 L32.05 61.85 L32.6 59.75 L32.9 57.65 L32.9 55.5 L32.6 53.25 L32.05 51 L31.2 48.6 L30.05 46.15 L28.55 43.65 L26.75 40.95 L24.7 38.15 Z M32.05 61.85 L38.5 63.4 L30.5 68.25 Z M38.2 63.3 L37.8 64.55 L37.35 65.7 L36.7 66.8 L35.9 67.75 L35 68.6 L33.95 69.3 L32.8 69.85 L31.6 70.2 L30.4 70.4 L29.1 70.5 L29.1 64.5 L29.75 64.45 L30.3 64.35 L30.7 64.25 L31 64.1 L31.3 63.9 L31.5 63.7 L31.75 63.4 L31.95 63.05 L32.15 62.55 L32.35 61.9 Z M29.1 67.5 L24.1 66 L24.1 64.5 L29.1 64.5 Z",
      "M18.2 13 L18.2 91.5 L12.2 94.5 L12.2 10 Z",
      "M58.2 8.05 L57.1 12.4 L55.85 16.8 L54.4 21.15 L52.8 25.5 L51 29.85 L49.05 34.2 L46.9 38.5 L44.5 42.8 L41.95 47 L39.1 51.2 L38.3 50.75 L40.25 46.15 L42.1 41.6 L43.9 37.15 L45.55 32.7 L47.05 28.35 L48.4 24 L49.6 19.7 L50.65 15.4 L51.55 11.15 L52.3 6.9 Z M52.25 7.4 L52.5 5.95 L58.2 8.05 Z M58.2 8.05 L59.5 9.3 L56.75 10.3 Z",
      "M51.05 23.5 L94.05 23.5 L94.05 25.5 L51.05 25.5 Z M94.05 23.5 L82.05 24.5 L88.05 18.5 Z",
      "M66.45 23.5 L66.45 91.5 L60.45 94.5 L60.45 23.5 Z",
      "M63.45 45 L90.85 45 L90.85 47 L63.45 47 Z M90.85 45 L78.85 46 L84.85 40 Z",
      "M63.45 66.5 L91.9 66.5 L91.9 68.5 L63.45 68.5 Z M91.9 66.5 L79.9 67.5 L85.9 61.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M15.2 13 L37.8 13 L37.8 15 L15.2 15 Z",
          "bounds": [
            15.2,
            13,
            37.8,
            15
          ],
          "direction": "right",
          "weight": 22.575
        },
        {
          "outline": "M40.6 14.95 L39.65 17.15 L38.55 19.35 L37.3 21.6 L36 23.9 L34.5 26.25 L32.95 28.6 L31.2 31 L29.35 33.4 L27.25 35.85 L25 38.25 L24.3 37.7 L25.7 34.8 L27.05 31.95 L28.4 29.3 L29.65 26.7 L30.8 24.2 L31.85 21.8 L32.8 19.45 L33.6 17.2 L34.35 15.05 L34.95 13 Z M34.8 13 L37.8 10.5 L43.3 15 L40.8 16.5 L34.8 19 Z",
          "bounds": [
            24.3,
            10.5,
            43.3,
            38.25
          ],
          "direction": "curve",
          "weight": 27.354444,
          "revealPath": "M37.8 14 Q34.125 24.5 24.675 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.3 37.5 L28.25 39.55 L30.8 41.75 L33 44.15 L34.85 46.6 L36.4 49.2 L37.55 51.9 L38.35 54.65 L38.8 57.5 L38.8 60.45 L38.5 63.4 L32.05 61.85 L32.6 59.75 L32.9 57.65 L32.9 55.5 L32.6 53.25 L32.05 51 L31.2 48.6 L30.05 46.15 L28.55 43.65 L26.75 40.95 L24.7 38.15 Z M32.05 61.85 L38.5 63.4 L30.5 68.25 Z",
          "bounds": [
            24.7,
            37.5,
            38.8,
            68.25
          ],
          "direction": "curve",
          "weight": 27.288094,
          "revealPath": "M24.675 37.5 Q38.325 50 35.29186476237662 62.63806349009741",
          "revealWidth": 14
        },
        {
          "outline": "M38.2 63.3 L37.8 64.55 L37.35 65.7 L36.7 66.8 L35.9 67.75 L35 68.6 L33.95 69.3 L32.8 69.85 L31.6 70.2 L30.4 70.4 L29.1 70.5 L29.1 64.5 L29.75 64.45 L30.3 64.35 L30.7 64.25 L31 64.1 L31.3 63.9 L31.5 63.7 L31.75 63.4 L31.95 63.05 L32.15 62.55 L32.35 61.9 Z M29.1 67.5 L24.1 66 L24.1 64.5 L29.1 64.5 Z",
          "bounds": [
            24.1,
            61.9,
            38.2,
            70.5
          ],
          "direction": "curve",
          "weight": 7.852939,
          "revealPath": "M35.29186476237662 62.63806349009741 Q34.125 67.5 29.125 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M18.2 13 L18.2 91.5 L12.2 94.5 L12.2 10 Z",
          "bounds": [
            12.2,
            10,
            18.2,
            94.5
          ],
          "direction": "down",
          "weight": 79
        }
      ],
      [
        {
          "outline": "M58.2 8.05 L57.1 12.4 L55.85 16.8 L54.4 21.15 L52.8 25.5 L51 29.85 L49.05 34.2 L46.9 38.5 L44.5 42.8 L41.95 47 L39.1 51.2 L38.3 50.75 L40.25 46.15 L42.1 41.6 L43.9 37.15 L45.55 32.7 L47.05 28.35 L48.4 24 L49.6 19.7 L50.65 15.4 L51.55 11.15 L52.3 6.9 Z M52.25 7.4 L52.5 5.95 L58.2 8.05 Z M58.2 8.05 L59.5 9.3 L56.75 10.3 Z",
          "bounds": [
            38.3,
            5.95,
            59.5,
            51.2
          ],
          "direction": "curve",
          "weight": 47.049324,
          "revealPath": "M55.3875 7 Q51.0875 29 38.725 51",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M51.05 23.5 L94.05 23.5 L94.05 25.5 L51.05 25.5 Z M94.05 23.5 L82.05 24.5 L88.05 18.5 Z",
          "bounds": [
            51.05,
            18.5,
            94.05,
            25.5
          ],
          "direction": "right",
          "weight": 43
        }
      ],
      [
        {
          "outline": "M66.45 23.5 L66.45 91.5 L60.45 94.5 L60.45 23.5 Z",
          "bounds": [
            60.45,
            23.5,
            66.45,
            94.5
          ],
          "direction": "down",
          "weight": 68.5
        }
      ],
      [
        {
          "outline": "M63.45 45 L90.85 45 L90.85 47 L63.45 47 Z M90.85 45 L78.85 46 L84.85 40 Z",
          "bounds": [
            63.45,
            40,
            90.85,
            47
          ],
          "direction": "right",
          "weight": 27.4125
        }
      ],
      [
        {
          "outline": "M63.45 66.5 L91.9 66.5 L91.9 68.5 L63.45 68.5 Z M91.9 66.5 L79.9 67.5 L85.9 61.5 Z",
          "bounds": [
            63.45,
            61.5,
            91.9,
            68.5
          ],
          "direction": "right",
          "weight": 28.4875
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch158Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch158 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH158_STROKES = loadGlyphWikiBatch158Strokes(reviewed)
