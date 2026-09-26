/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch101.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "佖",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "b32a263bbf79048f3d7c5fbb171d745a20d9de2b1724f6157392618dd916fa6f",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      5,
      7,
      4,
      3,
      6
    ],
    "pathsSha256": "f66e89d89115ee3979b5c88cf3a685cc7565410c2d833ab5f9625f1c7523302d",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F56.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F56.svg",
      "dictionarySvgSha256": "d6ccde41c1fd8895cd98a3f2b918ca2f7c173b9aa273dc3d67681cfb3a115116",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "30d3a66b9a3079ae7675b282afb0212a18319f0091949cf745118e87af73798c",
      "geometryReviewSha256": "30d3a66b9a3079ae7675b282afb0212a18319f0091949cf745118e87af73798c",
      "directionReviewSha256": "30d3a66b9a3079ae7675b282afb0212a18319f0091949cf745118e87af73798c"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4f56.json",
      "modifications": "Whole 佖 u4f56 from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups0;1;4;6;3;2;5 reordered to domestic7strokes: upper dot, long falling curve, hook, left dot, right dot after 亻. Seven original quadratics and all polygon vertices preserved, winding normalized. Hook primitives are continuous. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M34.45 9.25 L32.25 14.85 L30 20.35 L27.65 25.7 L25.15 30.95 L22.6 36.1 L19.9 41.15 L17.15 46.05 L14.25 50.8 L11.25 55.5 L8.15 60.05 L4.1 57.15 L7.1 52.75 L10 48.2 L12.8 43.5 L15.55 38.7 L18.15 33.8 L20.65 28.8 L23.1 23.65 L25.4 18.35 L27.6 13 L29.75 7.5 Z",
      "M19.15 36.95 L24.15 36.95 L24.15 92.6 L19.15 92.6 Z",
      "M48 6.15 L51.25 7.5 L54.3 8.95 L57.15 10.45 L59.85 12.05 L62.35 13.7 L64.6 15.4 L66.75 17.2 L68.65 19.05 L70.35 21.05 L71.9 23.05 L67.75 25.9 L66.5 24.2 L65 22.5 L63.35 20.9 L61.5 19.3 L59.45 17.75 L57.2 16.3 L54.75 14.85 L52.05 13.45 L49.2 12.1 L46.15 10.8 Z",
      "M87.8 13.25 L84.25 23.2 L80.2 32.75 L75.6 41.95 L70.5 50.75 L64.85 59.2 L58.75 67.2 L52.1 74.85 L44.95 82.15 L37.25 89 L29.05 95.5 L26.1 91.45 L34.05 85.15 L41.5 78.5 L48.4 71.45 L54.85 64.05 L60.8 56.25 L66.25 48.1 L71.2 39.6 L75.65 30.65 L79.6 21.4 L83.05 11.7 Z",
      "M49.8 25.5 L54.8 25.5 L54.8 83 L49.8 83 Z M54.8 83 L54.8 83.65 L54.9 84.15 L55 84.55 L55.15 84.8 L55.3 84.95 L55.45 85.1 L55.7 85.25 L56.1 85.35 L56.6 85.45 L57.3 85.5 L57.3 90.5 L56.05 90.4 L54.85 90.2 L53.75 89.8 L52.7 89.25 L51.75 88.5 L51 87.55 L50.45 86.5 L50.05 85.4 L49.85 84.2 L49.8 83 Z M57.3 85.5 L78.5 85.5 L78.5 90.5 L57.3 90.5 Z M78.5 85.5 L78.95 85.45 L79.35 85.3 L79.8 85.05 L80.3 84.6 L80.85 84 L81.4 83.1 L82 82 L82.55 80.7 L83.05 79.15 L83.55 77.35 L88.4 78.6 L87.85 80.6 L87.2 82.45 L86.5 84.15 L85.75 85.65 L84.85 87 L83.85 88.15 L82.7 89.1 L81.4 89.85 L79.95 90.3 L78.5 90.5 Z",
      "M41.1 39.2 L41.45 43.05 L41.55 46.75 L41.55 50.35 L41.3 53.75 L40.95 57.1 L40.35 60.25 L39.6 63.3 L38.7 66.25 L37.55 69 L36.25 71.65 L31.9 69.3 L33 67 L34 64.55 L34.8 61.95 L35.5 59.25 L36 56.35 L36.35 53.35 L36.55 50.15 L36.55 46.85 L36.45 43.35 L36.15 39.75 Z",
      "M81.45 38.35 L83.55 40.9 L85.45 43.5 L87.15 46.15 L88.65 48.9 L90 51.75 L91.15 54.6 L92.1 57.55 L92.85 60.55 L93.4 63.65 L93.75 66.75 L88.8 67.2 L88.45 64.4 L87.95 61.6 L87.25 58.95 L86.45 56.3 L85.4 53.7 L84.2 51.2 L82.85 48.7 L81.3 46.3 L79.6 43.95 L77.7 41.6 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M34.45 9.25 L32.25 14.85 L30 20.35 L27.65 25.7 L25.15 30.95 L22.6 36.1 L19.9 41.15 L17.15 46.05 L14.25 50.8 L11.25 55.5 L8.15 60.05 L4.1 57.15 L7.1 52.75 L10 48.2 L12.8 43.5 L15.55 38.7 L18.15 33.8 L20.65 28.8 L23.1 23.65 L25.4 18.35 L27.6 13 L29.75 7.5 Z",
          "bounds": [
            4.1,
            7.5,
            34.45,
            60.05
          ],
          "direction": "curve",
          "weight": 56.547384,
          "revealPath": "M32.1125 8.3875 Q21.65 36.46 6.15 58.6225",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M19.15 36.95 L24.15 36.95 L24.15 92.6 L19.15 92.6 Z",
          "bounds": [
            19.15,
            36.95,
            24.15,
            92.6
          ],
          "direction": "down",
          "weight": 55.6525
        }
      ],
      [
        {
          "outline": "M48 6.15 L51.25 7.5 L54.3 8.95 L57.15 10.45 L59.85 12.05 L62.35 13.7 L64.6 15.4 L66.75 17.2 L68.65 19.05 L70.35 21.05 L71.9 23.05 L67.75 25.9 L66.5 24.2 L65 22.5 L63.35 20.9 L61.5 19.3 L59.45 17.75 L57.2 16.3 L54.75 14.85 L52.05 13.45 L49.2 12.1 L46.15 10.8 Z",
          "bounds": [
            46.15,
            6.15,
            71.9,
            25.9
          ],
          "direction": "curve",
          "weight": 27.812992,
          "revealPath": "M47.099999999999994 8.5 Q63.349999999999994 15 69.85 24.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M87.8 13.25 L84.25 23.2 L80.2 32.75 L75.6 41.95 L70.5 50.75 L64.85 59.2 L58.75 67.2 L52.1 74.85 L44.95 82.15 L37.25 89 L29.05 95.5 L26.1 91.45 L34.05 85.15 L41.5 78.5 L48.4 71.45 L54.85 64.05 L60.8 56.25 L66.25 48.1 L71.2 39.6 L75.65 30.65 L79.6 21.4 L83.05 11.7 Z",
          "bounds": [
            26.1,
            11.7,
            87.8,
            95.5
          ],
          "direction": "curve",
          "weight": 99.537041,
          "revealPath": "M85.45 12.5 Q69.2 62.5 27.6 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.8 25.5 L54.8 25.5 L54.8 83 L49.8 83 Z",
          "bounds": [
            49.8,
            25.5,
            54.8,
            83
          ],
          "direction": "down",
          "weight": 57.5
        },
        {
          "outline": "M54.8 83 L54.8 83.65 L54.9 84.15 L55 84.55 L55.15 84.8 L55.3 84.95 L55.45 85.1 L55.7 85.25 L56.1 85.35 L56.6 85.45 L57.3 85.5 L57.3 90.5 L56.05 90.4 L54.85 90.2 L53.75 89.8 L52.7 89.25 L51.75 88.5 L51 87.55 L50.45 86.5 L50.05 85.4 L49.85 84.2 L49.8 83 Z",
          "bounds": [
            49.8,
            83,
            57.3,
            90.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M52.3 83 Q52.3 88 57.3 88",
          "revealWidth": 14
        },
        {
          "outline": "M57.3 85.5 L78.5 85.5 L78.5 90.5 L57.3 90.5 Z",
          "bounds": [
            57.3,
            85.5,
            78.5,
            90.5
          ],
          "direction": "right",
          "weight": 21.2
        },
        {
          "outline": "M78.5 85.5 L78.95 85.45 L79.35 85.3 L79.8 85.05 L80.3 84.6 L80.85 84 L81.4 83.1 L82 82 L82.55 80.7 L83.05 79.15 L83.55 77.35 L88.4 78.6 L87.85 80.6 L87.2 82.45 L86.5 84.15 L85.75 85.65 L84.85 87 L83.85 88.15 L82.7 89.1 L81.4 89.85 L79.95 90.3 L78.5 90.5 Z",
          "bounds": [
            78.5,
            77.35,
            88.4,
            90.5
          ],
          "direction": "curve",
          "weight": 12.5,
          "revealPath": "M78.5 88 Q83.5 88 86 78",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M41.1 39.2 L41.45 43.05 L41.55 46.75 L41.55 50.35 L41.3 53.75 L40.95 57.1 L40.35 60.25 L39.6 63.3 L38.7 66.25 L37.55 69 L36.25 71.65 L31.9 69.3 L33 67 L34 64.55 L34.8 61.95 L35.5 59.25 L36 56.35 L36.35 53.35 L36.55 50.15 L36.55 46.85 L36.45 43.35 L36.15 39.75 Z",
          "bounds": [
            31.9,
            39.2,
            41.55,
            71.65
          ],
          "direction": "curve",
          "weight": 31.332132,
          "revealPath": "M38.650000000000006 39.5 Q40.599999999999994 58.5 34.1 70.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M81.45 38.35 L83.55 40.9 L85.45 43.5 L87.15 46.15 L88.65 48.9 L90 51.75 L91.15 54.6 L92.1 57.55 L92.85 60.55 L93.4 63.65 L93.75 66.75 L88.8 67.2 L88.45 64.4 L87.95 61.6 L87.25 58.95 L86.45 56.3 L85.4 53.7 L84.2 51.2 L82.85 48.7 L81.3 46.3 L79.6 43.95 L77.7 41.6 Z",
          "bounds": [
            77.7,
            38.35,
            93.75,
            67.2
          ],
          "direction": "curve",
          "weight": 29.426009,
          "revealPath": "M79.6 40 Q90 52 91.3 67",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch101Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch101 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH101_STROKES = loadGlyphWikiBatch101Strokes(reviewed)
