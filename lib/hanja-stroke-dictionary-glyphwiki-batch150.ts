/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch150.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芼",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "dc88e20b948b01ae13a41c82a79bce82a4d9cadffd6569d073b37da95fa45ff9",
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
    "pathsSha256": "f323a5e4d89ba57ccb4acba98a8207d236a55e8356b2a5a8838e0b0b26e41aee",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82BC.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82BC.svg",
      "dictionarySvgSha256": "468720301a0d81423d9d8dd0b98294428748635a1f7c44f16c7825e9de753c71",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "71e305a1269bf6670ba03b0c751351526925794b4d5c1381a6a900a45c1ac374",
      "geometryReviewSha256": "71e305a1269bf6670ba03b0c751351526925794b4d5c1381a6a900a45c1ac374",
      "directionReviewSha256": "71e305a1269bf6670ba03b0c751351526925794b4d5c1381a6a900a45c1ac374"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u82bc-k@11",
      "revision": "u82bc-k@11; u8279-03-var-009@2; u6bdb-j@2; observed2026-09-27; source SHA256 1a1d31d11fa9d2e6989e6c3d07237710292a94ecaf7fde8ae7f8f112f69d78f1",
      "editableSource": "/hanja-strokes/glyphwiki/82bc.json",
      "modifications": "Whole 芼 u82bc-k@11 with exactly declared u8279-03-var-009@2 and u6bdb-j@2. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5;6;7. Preserve both original quadratics, two slanted original lines as exact SVG L reveal trajectories, connected final line-curve-line and all polygon vertices including terminal hook; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 17.9 L47.5 17.9 L47.5 19.9 L6.5 19.9 Z M47.5 17.9 L35.5 18.9 L41.5 12.9 Z",
      "M35 7.1 L35 29.2 L29 32.2 L29 6.1 Z M35 7.1 L36.5 8.1 L34 9.6 Z",
      "M52.5 17.9 L93.5 17.9 L93.5 19.9 L52.5 19.9 Z M93.5 17.9 L81.5 18.9 L87.5 12.9 Z",
      "M71 7.1 L71 24.5 L65 27.5 L65 6.1 Z M71 7.1 L72.5 8.1 L70 9.6 Z",
      "M74.4 32.7 L69 34.15 L63.4 35.55 L57.65 36.85 L51.7 38.05 L45.55 39.2 L39.2 40.25 L32.7 41.15 L26 42 L19.1 42.65 L12.05 43.15 L11.9 42.25 L18.85 40.8 L25.6 39.35 L32.15 37.95 L38.5 36.5 L44.65 35.05 L50.65 33.5 L56.45 31.95 L62 30.35 L67.4 28.7 L72.6 26.95 Z M72.1 27.1 L77.55 31.7 L74.4 32.7 Z M77.55 31.7 L77.7 33.2 L74.25 31.7 Z",
      "M11.9 55.55 L83.9 48.4 L84.05 50.4 L12.05 57.5 Z M83.9 48.4 L72.05 50.6 L77.4 44.05 Z",
      "M7.9 71.35 L90.9 63.8 L91.05 65.8 L8.05 73.3 Z M90.9 63.8 L79 65.9 L84.45 59.4 Z",
      "M47.5 36.55 L47.5 83.9 L41.5 83.9 L41.5 36.55 Z M41.5 83.9 L47.5 83.9 L46.3 85.7 L44.5 86.9 L42.7 85.7 Z M47.5 83.9 L47.5 84.55 L47.6 85 L47.7 85.3 L47.75 85.45 L47.85 85.55 L47.95 85.6 L48.1 85.7 L48.4 85.8 L48.85 85.9 L49.5 85.9 L49.5 91.9 L48.2 91.85 L46.95 91.65 L45.75 91.2 L44.6 90.6 L43.6 89.8 L42.8 88.8 L42.15 87.65 L41.75 86.45 L41.55 85.2 L41.5 83.9 Z M49.5 85.9 L51.6 86.8 L52.5 88.9 L51.6 91 L49.5 91.9 Z M49.5 85.9 L88.5 85.9 L88.5 91.9 L49.5 91.9 Z M88.5 85.9 L90.3 87.1 L91.5 88.9 L90.3 90.7 L88.5 91.9 Z M88.5 85.9 L85.5 85.9 L88.5 73.4 L89.5 73.4 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 17.9 L47.5 17.9 L47.5 19.9 L6.5 19.9 Z M47.5 17.9 L35.5 18.9 L41.5 12.9 Z",
          "bounds": [
            6.5,
            12.9,
            47.5,
            19.9
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 7.1 L35 29.2 L29 32.2 L29 6.1 Z M35 7.1 L36.5 8.1 L34 9.6 Z",
          "bounds": [
            29,
            6.1,
            36.5,
            32.2
          ],
          "direction": "down",
          "weight": 24.0975
        }
      ],
      [
        {
          "outline": "M52.5 17.9 L93.5 17.9 L93.5 19.9 L52.5 19.9 Z M93.5 17.9 L81.5 18.9 L87.5 12.9 Z",
          "bounds": [
            52.5,
            12.9,
            93.5,
            19.9
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 7.1 L71 24.5 L65 27.5 L65 6.1 Z M71 7.1 L72.5 8.1 L70 9.6 Z",
          "bounds": [
            65,
            6.1,
            72.5,
            27.5
          ],
          "direction": "down",
          "weight": 19.3725
        }
      ],
      [
        {
          "outline": "M74.4 32.7 L69 34.15 L63.4 35.55 L57.65 36.85 L51.7 38.05 L45.55 39.2 L39.2 40.25 L32.7 41.15 L26 42 L19.1 42.65 L12.05 43.15 L11.9 42.25 L18.85 40.8 L25.6 39.35 L32.15 37.95 L38.5 36.5 L44.65 35.05 L50.65 33.5 L56.45 31.95 L62 30.35 L67.4 28.7 L72.6 26.95 Z M72.1 27.1 L77.55 31.7 L74.4 32.7 Z M77.55 31.7 L77.7 33.2 L74.25 31.7 Z",
          "bounds": [
            11.9,
            26.95,
            77.7,
            43.15
          ],
          "direction": "curve",
          "weight": 63.355436,
          "revealPath": "M74 29.689999999999998 Q47.5 37.985 12 42.725",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M11.9 55.55 L83.9 48.4 L84.05 50.4 L12.05 57.5 Z M83.9 48.4 L72.05 50.6 L77.4 44.05 Z",
          "bounds": [
            11.9,
            44.05,
            84.05,
            57.5
          ],
          "direction": "curve",
          "weight": 72.350205,
          "revealPath": "M12 56.55 L84 49.44",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.9 71.35 L90.9 63.8 L91.05 65.8 L8.05 73.3 Z M90.9 63.8 L79 65.9 L84.45 59.4 Z",
          "bounds": [
            7.9,
            59.4,
            91.05,
            73.3
          ],
          "direction": "curve",
          "weight": 83.338617,
          "revealPath": "M8 72.35 L91 64.845",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.5 36.55 L47.5 83.9 L41.5 83.9 L41.5 36.55 Z M41.5 83.9 L47.5 83.9 L46.3 85.7 L44.5 86.9 L42.7 85.7 Z",
          "bounds": [
            41.5,
            36.55,
            47.5,
            86.9
          ],
          "direction": "down",
          "weight": 46.35
        },
        {
          "outline": "M47.5 83.9 L47.5 84.55 L47.6 85 L47.7 85.3 L47.75 85.45 L47.85 85.55 L47.95 85.6 L48.1 85.7 L48.4 85.8 L48.85 85.9 L49.5 85.9 L49.5 91.9 L48.2 91.85 L46.95 91.65 L45.75 91.2 L44.6 90.6 L43.6 89.8 L42.8 88.8 L42.15 87.65 L41.75 86.45 L41.55 85.2 L41.5 83.9 Z M49.5 85.9 L51.6 86.8 L52.5 88.9 L51.6 91 L49.5 91.9 Z",
          "bounds": [
            41.5,
            83.9,
            52.5,
            91.9
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M44.5 83.94 Q44.5 88.94 49.5 88.94",
          "revealWidth": 14
        },
        {
          "outline": "M49.5 85.9 L88.5 85.9 L88.5 91.9 L49.5 91.9 Z M88.5 85.9 L90.3 87.1 L91.5 88.9 L90.3 90.7 L88.5 91.9 Z M88.5 85.9 L85.5 85.9 L88.5 73.4 L89.5 73.4 Z",
          "bounds": [
            49.5,
            73.4,
            91.5,
            91.9
          ],
          "direction": "right",
          "weight": 39
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch150Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch150 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH150_STROKES = loadGlyphWikiBatch150Strokes(reviewed)
