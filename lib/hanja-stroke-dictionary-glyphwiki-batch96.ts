/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch96.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "乫",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "2751755f287eea2a7363b5075995a53f2998b913508cee28b8bc6d995b13f267",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "pathsSha256": "cadbbcd912694be4b67c6ac1b391102c88f72c9567a056acdc13fa6a00758ba1",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E6B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4E00/4E6B.svg",
      "dictionarySvgSha256": "e42b1e23e4f59429956449366b9d73e97e15731cd7de93a9fffdd9ce0170fd31",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6",
      "orderReviewSha256": "7d08bb61c264adaae83b6a6abc52b1f8130c2641f20d2e6d8e12758f76856460",
      "geometryReviewSha256": "7d08bb61c264adaae83b6a6abc52b1f8130c2641f20d2e6d8e12758f76856460",
      "directionReviewSha256": "7d08bb61c264adaae83b6a6abc52b1f8130c2641f20d2e6d8e12758f76856460"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4e6b.json",
      "modifications": "Whole 乫 u4e6b from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Original raw groups0+1;2;3;4+5;6;7+8 match domestic6strokes and preserve all original polygons. Five original quadratics, original oblique line and continuous 力/乙 hooks retained. Winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M7.55 17.35 L48.2 17.35 L48.2 22.35 L7.55 22.35 Z M48.2 19.65 L48.35 22.25 L48.45 24.7 L48.45 27.1 L48.35 29.35 L48.2 31.5 L47.9 33.55 L47.55 35.5 L47.15 37.35 L46.6 39.1 L45.95 40.75 L41.35 38.75 L41.85 37.45 L42.3 36.05 L42.7 34.45 L43 32.8 L43.2 31 L43.35 29.05 L43.45 27 L43.45 24.8 L43.35 22.5 L43.2 20.05 Z M45.95 40.75 L45.2 42.05 L44.2 43.15 L43 44.05 L41.6 44.65 L40.1 45 L38.5 45.2 L36.85 45.2 L35.05 45 L33.1 44.7 L31.1 44.25 L32.3 39.4 L34.1 39.8 L35.7 40.05 L37.1 40.2 L38.3 40.2 L39.25 40.1 L40 39.9 L40.55 39.65 L40.9 39.4 L41.15 39.15 L41.35 38.75 Z",
      "M32.6 7.8 L32 13.95 L31.05 19.7 L29.7 25.1 L27.95 30.1 L25.8 34.7 L23.25 38.95 L20.35 42.8 L17 46.2 L13.3 49.2 L9.2 51.75 L6.8 47.4 L10.4 45.1 L13.65 42.5 L16.55 39.5 L19.15 36.15 L21.4 32.4 L23.3 28.2 L24.9 23.65 L26.15 18.7 L27.05 13.3 L27.65 7.45 Z",
      "M57.25 15.05 L62.25 15.05 L62.25 46 L57.25 46 Z",
      "M57.25 15.05 L88.4 15.05 L88.4 20.05 L57.25 20.05 Z M83.4 15.05 L88.4 15.05 L88.4 46 L83.4 46 Z",
      "M57.25 36 L88.4 36 L88.4 41 L57.25 41 Z",
      "M19.5 52.75 L74.75 52.75 L74.75 57.75 L19.5 57.75 Z M30.95 72.75 L73.4 51.9 L75.6 56.35 L33.15 77.25 Z M33.15 77.25 L28.45 79.7 L24.95 81.8 L22.75 83.55 L21.85 84.6 L21.8 84.35 L21.7 84.1 L23 84.65 L25.75 85.2 L29.85 85.6 L35.15 85.75 L35.15 90.75 L29.55 90.6 L25.05 90.15 L21.5 89.4 L18.75 88.1 L16.9 85.5 L17.4 82.3 L19.3 79.9 L22.15 77.7 L26 75.35 L30.95 72.75 Z M35.15 85.75 L81.1 85.75 L81.1 90.75 L35.15 90.75 Z M81.1 85.75 L81.55 85.7 L82 85.55 L82.45 85.3 L82.95 84.85 L83.5 84.25 L84.05 83.35 L84.6 82.25 L85.15 80.95 L85.7 79.4 L86.15 77.6 L91.05 78.85 L90.45 80.85 L89.85 82.7 L89.15 84.4 L88.35 85.9 L87.5 87.25 L86.45 88.4 L85.3 89.35 L84 90.1 L82.6 90.55 L81.1 90.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7.55 17.35 L48.2 17.35 L48.2 22.35 L7.55 22.35 Z",
          "bounds": [
            7.55,
            17.35,
            48.2,
            22.35
          ],
          "direction": "right",
          "weight": 35.6775
        },
        {
          "outline": "M48.2 19.65 L48.35 22.25 L48.45 24.7 L48.45 27.1 L48.35 29.35 L48.2 31.5 L47.9 33.55 L47.55 35.5 L47.15 37.35 L46.6 39.1 L45.95 40.75 L41.35 38.75 L41.85 37.45 L42.3 36.05 L42.7 34.45 L43 32.8 L43.2 31 L43.35 29.05 L43.45 27 L43.45 24.8 L43.35 22.5 L43.2 20.05 Z",
          "bounds": [
            41.35,
            19.65,
            48.45,
            40.75
          ],
          "direction": "curve",
          "weight": 19.97827,
          "revealPath": "M45.7275 19.8875 Q46.7325 32.7025 43.687792683213026 39.76137367971508",
          "revealWidth": 14
        },
        {
          "outline": "M45.95 40.75 L45.2 42.05 L44.2 43.15 L43 44.05 L41.6 44.65 L40.1 45 L38.5 45.2 L36.85 45.2 L35.05 45 L33.1 44.7 L31.1 44.25 L32.3 39.4 L34.1 39.8 L35.7 40.05 L37.1 40.2 L38.3 40.2 L39.25 40.1 L40 39.9 L40.55 39.65 L40.9 39.4 L41.15 39.15 L41.35 38.75 Z",
          "bounds": [
            31.1,
            38.75,
            45.95,
            45.2
          ],
          "direction": "curve",
          "weight": 12.161424,
          "revealPath": "M43.687792683213026 39.76137367971508 Q41.7075 44.3525 31.707500000000003 41.8525",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M32.6 7.8 L32 13.95 L31.05 19.7 L29.7 25.1 L27.95 30.1 L25.8 34.7 L23.25 38.95 L20.35 42.8 L17 46.2 L13.3 49.2 L9.2 51.75 L6.8 47.4 L10.4 45.1 L13.65 42.5 L16.55 39.5 L19.15 36.15 L21.4 32.4 L23.3 28.2 L24.9 23.65 L26.15 18.7 L27.05 13.3 L27.65 7.45 Z",
          "bounds": [
            6.8,
            7.45,
            32.6,
            51.75
          ],
          "direction": "curve",
          "weight": 47.411135,
          "revealPath": "M30.15 7.654999999999999 Q28.14 38.5275 8.04 49.595",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.25 15.05 L62.25 15.05 L62.25 46 L57.25 46 Z",
          "bounds": [
            57.25,
            15.05,
            62.25,
            46
          ],
          "direction": "down",
          "weight": 20.97
        }
      ],
      [
        {
          "outline": "M57.25 15.05 L88.4 15.05 L88.4 20.05 L57.25 20.05 Z",
          "bounds": [
            57.25,
            15.05,
            88.4,
            20.05
          ],
          "direction": "right",
          "weight": 26.13
        },
        {
          "outline": "M83.4 15.05 L88.4 15.05 L88.4 46 L83.4 46 Z",
          "bounds": [
            83.4,
            15.05,
            88.4,
            46
          ],
          "direction": "down",
          "weight": 20.97
        }
      ],
      [
        {
          "outline": "M57.25 36 L88.4 36 L88.4 41 L57.25 41 Z",
          "bounds": [
            57.25,
            36,
            88.4,
            41
          ],
          "direction": "right",
          "weight": 26.13
        }
      ],
      [
        {
          "outline": "M19.5 52.75 L74.75 52.75 L74.75 57.75 L19.5 57.75 Z",
          "bounds": [
            19.5,
            52.75,
            74.75,
            57.75
          ],
          "direction": "right",
          "weight": 52.7875
        },
        {
          "outline": "M30.95 72.75 L73.4 51.9 L75.6 56.35 L33.15 77.25 Z",
          "bounds": [
            30.95,
            51.9,
            75.6,
            77.25
          ],
          "direction": "curve",
          "weight": 44.809384,
          "revealPath": "M72.2875 55.25 L32.07342721437464 75.01636606852558",
          "revealWidth": 14
        },
        {
          "outline": "M33.15 77.25 L28.45 79.7 L24.95 81.8 L22.75 83.55 L21.85 84.6 L21.8 84.35 L21.7 84.1 L23 84.65 L25.75 85.2 L29.85 85.6 L35.15 85.75 L35.15 90.75 L29.55 90.6 L25.05 90.15 L21.5 89.4 L18.75 88.1 L16.9 85.5 L17.4 82.3 L19.3 79.9 L22.15 77.7 L26 75.35 L30.95 72.75 Z",
          "bounds": [
            16.9,
            72.75,
            35.15,
            90.75
          ],
          "direction": "curve",
          "weight": 13.586551,
          "revealPath": "M32.07342721437464 75.01636606852558 Q5.15 88.25 35.15 88.25",
          "revealWidth": 14
        },
        {
          "outline": "M35.15 85.75 L81.1 85.75 L81.1 90.75 L35.15 90.75 Z",
          "bounds": [
            35.15,
            85.75,
            81.1,
            90.75
          ],
          "direction": "right",
          "weight": 45.975
        },
        {
          "outline": "M81.1 85.75 L81.55 85.7 L82 85.55 L82.45 85.3 L82.95 84.85 L83.5 84.25 L84.05 83.35 L84.6 82.25 L85.15 80.95 L85.7 79.4 L86.15 77.6 L91.05 78.85 L90.45 80.85 L89.85 82.7 L89.15 84.4 L88.35 85.9 L87.5 87.25 L86.45 88.4 L85.3 89.35 L84 90.1 L82.6 90.55 L81.1 90.75 Z",
          "bounds": [
            81.1,
            77.6,
            91.05,
            90.75
          ],
          "direction": "curve",
          "weight": 12.5,
          "revealPath": "M81.125 88.25 Q86.125 88.25 88.625 78.25",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch96Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch96 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH96_STROKES = loadGlyphWikiBatch96Strokes(reviewed)
