/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch97.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "伋",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "6173f462903c2376a06cdb10c9d3e9f47d078ede8409d7ba7b2401b0ecd7201c",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "pathsSha256": "a8c8b836c91d9e0ad0945951b3370a1f23c250816bac1b41ea16980cd3731bed",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F0B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F0B.svg",
      "dictionarySvgSha256": "dbe813302344f284ab72cb091bea75ec50ed863fa8fc0b4b922cbaf603fa08e5",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6",
      "orderReviewSha256": "a2b4353813f0f8de745418035842a509811a47d88077978c2320bf1a02f98ad4",
      "geometryReviewSha256": "a2b4353813f0f8de745418035842a509811a47d88077978c2320bf1a02f98ad4",
      "directionReviewSha256": "a2b4353813f0f8de745418035842a509811a47d88077978c2320bf1a02f98ad4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4f0b.json",
      "modifications": "Whole 伋 u4f0b from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups0;1;2;3+4;5+6;7 match domestic6strokes. Long falling stroke3 precedes upper fold4. Four original quadratics, original oblique line and all polygon vertices preserved, winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M36.4 8.4 L34.1 14.1 L31.7 19.65 L29.15 25.1 L26.5 30.45 L23.8 35.65 L20.95 40.75 L17.95 45.75 L14.9 50.6 L11.75 55.35 L8.45 59.95 L4.4 57 L7.6 52.5 L10.7 47.85 L13.7 43.15 L16.6 38.25 L19.4 33.3 L22.05 28.2 L24.65 22.95 L27.1 17.6 L29.5 12.15 L31.75 6.55 Z",
      "M20.45 36.5 L25.45 36.5 L25.45 93 L20.45 93 Z",
      "M55.3 14.5 L54.9 26.05 L54 36.8 L52.7 46.8 L50.9 56.05 L48.7 64.55 L46 72.35 L42.8 79.35 L39.15 85.6 L35.05 91.1 L30.4 95.85 L27.1 92.1 L31.25 87.85 L35 82.85 L38.35 77.05 L41.35 70.5 L43.9 63.15 L46.05 54.95 L47.75 46 L49.05 36.25 L49.9 25.75 L50.35 14.45 Z",
      "M39 12 L82.5 12 L82.5 17 L39 17 Z M71.45 45.95 L78 11.55 L82.9 12.5 L76.35 46.9 Z",
      "M48.3 41.5 L88.15 41.5 L88.15 46.5 L48.3 46.5 Z M88.05 44.6 L85.65 52.4 L82.75 59.65 L79.2 66.25 L75.15 72.3 L70.5 77.7 L65.3 82.5 L59.55 86.7 L53.25 90.2 L46.45 93.1 L39.1 95.4 L37.85 90.55 L44.75 88.45 L51.05 85.75 L56.85 82.45 L62.15 78.65 L66.9 74.25 L71.15 69.25 L74.95 63.7 L78.2 57.5 L80.95 50.75 L83.2 43.35 Z",
      "M56.25 43.25 L58.6 50.1 L61.2 56.4 L64.05 62.1 L67.15 67.2 L70.5 71.75 L74.1 75.75 L77.95 79.15 L82.05 82 L86.4 84.3 L91 86.1 L89.5 90.85 L84.3 88.85 L79.45 86.25 L74.85 83.05 L70.6 79.3 L66.65 74.95 L63 70 L59.65 64.5 L56.65 58.45 L53.9 51.85 L51.45 44.7 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M36.4 8.4 L34.1 14.1 L31.7 19.65 L29.15 25.1 L26.5 30.45 L23.8 35.65 L20.95 40.75 L17.95 45.75 L14.9 50.6 L11.75 55.35 L8.45 59.95 L4.4 57 L7.6 52.5 L10.7 47.85 L13.7 43.15 L16.6 38.25 L19.4 33.3 L22.05 28.2 L24.65 22.95 L27.1 17.6 L29.5 12.15 L31.75 6.55 Z",
          "bounds": [
            4.4,
            6.55,
            36.4,
            59.95
          ],
          "direction": "curve",
          "weight": 58.007167,
          "revealPath": "M34.0875 7.5 Q22.95 36 6.45 58.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M20.45 36.5 L25.45 36.5 L25.45 93 L20.45 93 Z",
          "bounds": [
            20.45,
            36.5,
            25.45,
            93
          ],
          "direction": "down",
          "weight": 56.5
        }
      ],
      [
        {
          "outline": "M55.3 14.5 L54.9 26.05 L54 36.8 L52.7 46.8 L50.9 56.05 L48.7 64.55 L46 72.35 L42.8 79.35 L39.15 85.6 L35.05 91.1 L30.4 95.85 L27.1 92.1 L31.25 87.85 L35 82.85 L38.35 77.05 L41.35 70.5 L43.9 63.15 L46.05 54.95 L47.75 46 L49.05 36.25 L49.9 25.75 L50.35 14.45 Z",
          "bounds": [
            27.1,
            14.45,
            55.3,
            95.85
          ],
          "direction": "curve",
          "weight": 83.068993,
          "revealPath": "M52.85 14.5 Q51.825 73.5 28.7625 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M39 12 L82.5 12 L82.5 17 L39 17 Z",
          "bounds": [
            39,
            12,
            82.5,
            17
          ],
          "direction": "right",
          "weight": 41
        },
        {
          "outline": "M71.45 45.95 L78 11.55 L82.9 12.5 L76.35 46.9 Z",
          "bounds": [
            71.45,
            11.55,
            82.9,
            46.9
          ],
          "direction": "curve",
          "weight": 30.033838,
          "revealPath": "M80.0125 14.5 L74.375 44",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M48.3 41.5 L88.15 41.5 L88.15 46.5 L48.3 46.5 Z",
          "bounds": [
            48.3,
            41.5,
            88.15,
            46.5
          ],
          "direction": "right",
          "weight": 34.85
        },
        {
          "outline": "M88.05 44.6 L85.65 52.4 L82.75 59.65 L79.2 66.25 L75.15 72.3 L70.5 77.7 L65.3 82.5 L59.55 86.7 L53.25 90.2 L46.45 93.1 L39.1 95.4 L37.85 90.55 L44.75 88.45 L51.05 85.75 L56.85 82.45 L62.15 78.65 L66.9 74.25 L71.15 69.25 L74.95 63.7 L78.2 57.5 L80.95 50.75 L83.2 43.35 Z",
          "bounds": [
            37.85,
            43.35,
            88.05,
            95.4
          ],
          "direction": "curve",
          "weight": 68.000901,
          "revealPath": "M85.65 44 Q75.4 83.5 38.5 93",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M56.25 43.25 L58.6 50.1 L61.2 56.4 L64.05 62.1 L67.15 67.2 L70.5 71.75 L74.1 75.75 L77.95 79.15 L82.05 82 L86.4 84.3 L91 86.1 L89.5 90.85 L84.3 88.85 L79.45 86.25 L74.85 83.05 L70.6 79.3 L66.65 74.95 L63 70 L59.65 64.5 L56.65 58.45 L53.9 51.85 L51.45 44.7 Z",
          "bounds": [
            51.45,
            43.25,
            91,
            90.85
          ],
          "direction": "curve",
          "weight": 57.483042,
          "revealPath": "M53.875 44 Q65.15 80.5 90.2625 88.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch97Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch97 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH97_STROKES = loadGlyphWikiBatch97Strokes(reviewed)
