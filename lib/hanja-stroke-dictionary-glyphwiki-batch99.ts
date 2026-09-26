/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch99.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "邙",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "42041581f90f84dbd73d071a541da242fd194a4ff29eb2499335be629306d4e8",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "pathsSha256": "da3ffd0f4eba90ca32729b09d92b70b6f4b40f05d219a5dcf8941e0897b36f35",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9099.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9099.svg",
      "dictionarySvgSha256": "acd5bde471d7a908944d785d6ecc1eb20262d899afda69776427291269227035",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6",
      "orderReviewSha256": "056de99fe483e2f572da05b939aabaf2da34f5977dce9cbe13a22e931b3e7b7f",
      "geometryReviewSha256": "056de99fe483e2f572da05b939aabaf2da34f5977dce9cbe13a22e931b3e7b7f",
      "directionReviewSha256": "056de99fe483e2f572da05b939aabaf2da34f5977dce9cbe13a22e931b3e7b7f"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/9099.json",
      "modifications": "Whole 邙 Korean variant u9099-k from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups0;1;2;3+4;5;6 match domestic6strokes. Three quadratics, one cubic, continuous hook and all polygon vertices preserved, winding normalized. Generic u9099 rejected for left attachment mismatch; no component substitution, invented points, bridges, trims or custom widths."
    },
    "paths": [
      "M28 9.05 L33 9.05 L33 28.25 L28 28.25 Z",
      "M6.85 23.25 L54.15 23.25 L54.15 28.25 L6.85 28.25 Z",
      "M12.6 23.25 L17.6 23.25 L17.6 72.35 L12.6 72.35 Z M17.6 72.35 L17.6 73.05 L17.7 73.55 L17.8 73.9 L17.95 74.15 L18.1 74.35 L18.25 74.45 L18.5 74.6 L18.9 74.75 L19.4 74.8 L20.1 74.85 L20.1 79.85 L18.85 79.8 L17.65 79.6 L16.55 79.2 L15.5 78.65 L14.55 77.85 L13.8 76.95 L13.25 75.9 L12.85 74.75 L12.65 73.6 L12.6 72.35 Z M20.1 74.85 L49.75 74.85 L49.75 79.85 L20.1 79.85 Z",
      "M59.5 11.5 L90.5 11.5 L90.5 16.5 L59.5 16.5 Z M90.3 14.9 L89.2 17.5 L88 20.15 L86.7 22.85 L85.3 25.6 L83.8 28.45 L82.15 31.3 L80.4 34.25 L78.55 37.25 L76.6 40.25 L74.55 43.4 L70.4 40.55 L72.45 37.55 L74.35 34.55 L76.15 31.65 L77.85 28.8 L79.4 26 L80.9 23.3 L82.25 20.65 L83.5 18.05 L84.65 15.5 L85.65 13.05 Z",
      "M73.45 39.15 L78.95 42 L83.35 45.35 L86.75 49.1 L89.25 53.05 L90.85 57.1 L91.75 61.1 L92.05 64.95 L91.8 68.5 L91.2 71.7 L90.25 74.4 L85.7 72.4 L86.35 70.4 L86.85 67.85 L87.05 64.95 L86.8 61.85 L86.1 58.55 L84.75 55.3 L82.75 52.1 L80 49.05 L76.3 46.25 L71.5 43.8 Z M90.25 74.4 L89.5 75.7 L88.5 76.8 L87.25 77.7 L85.9 78.3 L84.4 78.65 L82.8 78.85 L81.15 78.85 L79.35 78.65 L77.4 78.35 L75.35 77.9 L76.6 73.05 L78.35 73.45 L79.95 73.7 L81.4 73.85 L82.55 73.85 L83.55 73.75 L84.3 73.55 L84.85 73.3 L85.2 73.05 L85.45 72.75 L85.7 72.4 Z",
      "M59.5 11.5 L64.5 11.5 L64.5 93 L59.5 93 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M28 9.05 L33 9.05 L33 28.25 L28 28.25 Z",
          "bounds": [
            28,
            9.05,
            33,
            28.25
          ],
          "direction": "down",
          "weight": 16.7425
        }
      ],
      [
        {
          "outline": "M6.85 23.25 L54.15 23.25 L54.15 28.25 L6.85 28.25 Z",
          "bounds": [
            6.85,
            23.25,
            54.15,
            28.25
          ],
          "direction": "right",
          "weight": 47.3
        }
      ],
      [
        {
          "outline": "M12.6 23.25 L17.6 23.25 L17.6 72.35 L12.6 72.35 Z",
          "bounds": [
            12.6,
            23.25,
            17.6,
            72.35
          ],
          "direction": "down",
          "weight": 46.585
        },
        {
          "outline": "M17.6 72.35 L17.6 73.05 L17.7 73.55 L17.8 73.9 L17.95 74.15 L18.1 74.35 L18.25 74.45 L18.5 74.6 L18.9 74.75 L19.4 74.8 L20.1 74.85 L20.1 79.85 L18.85 79.8 L17.65 79.6 L16.55 79.2 L15.5 78.65 L14.55 77.85 L13.8 76.95 L13.25 75.9 L12.85 74.75 L12.65 73.6 L12.6 72.35 Z",
          "bounds": [
            12.6,
            72.35,
            20.1,
            79.85
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M15.1 72.3775 Q15.1 77.3775 20.1 77.3775",
          "revealWidth": 14
        },
        {
          "outline": "M20.1 74.85 L49.75 74.85 L49.75 79.85 L20.1 79.85 Z",
          "bounds": [
            20.1,
            74.85,
            49.75,
            79.85
          ],
          "direction": "right",
          "weight": 29.65
        }
      ],
      [
        {
          "outline": "M59.5 11.5 L90.5 11.5 L90.5 16.5 L59.5 16.5 Z",
          "bounds": [
            59.5,
            11.5,
            90.5,
            16.5
          ],
          "direction": "right",
          "weight": 26
        },
        {
          "outline": "M90.3 14.9 L89.2 17.5 L88 20.15 L86.7 22.85 L85.3 25.6 L83.8 28.45 L82.15 31.3 L80.4 34.25 L78.55 37.25 L76.6 40.25 L74.55 43.4 L70.4 40.55 L72.45 37.55 L74.35 34.55 L76.15 31.65 L77.85 28.8 L79.4 26 L80.9 23.3 L82.25 20.65 L83.5 18.05 L84.65 15.5 L85.65 13.05 Z",
          "bounds": [
            70.4,
            13.05,
            90.3,
            43.4
          ],
          "direction": "curve",
          "weight": 32.003906,
          "revealPath": "M88 14 Q83 26.5 72.5 42",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.45 39.15 L78.95 42 L83.35 45.35 L86.75 49.1 L89.25 53.05 L90.85 57.1 L91.75 61.1 L92.05 64.95 L91.8 68.5 L91.2 71.7 L90.25 74.4 L85.7 72.4 L86.35 70.4 L86.85 67.85 L87.05 64.95 L86.8 61.85 L86.1 58.55 L84.75 55.3 L82.75 52.1 L80 49.05 L76.3 46.25 L71.5 43.8 Z",
          "bounds": [
            71.5,
            39.15,
            92.05,
            74.4
          ],
          "direction": "curve",
          "weight": 35.476717,
          "revealPath": "M72.5 41.5 C91.5 49.5 91 66.5 87.99363055707225 73.41464971873383",
          "revealWidth": 14
        },
        {
          "outline": "M90.25 74.4 L89.5 75.7 L88.5 76.8 L87.25 77.7 L85.9 78.3 L84.4 78.65 L82.8 78.85 L81.15 78.85 L79.35 78.65 L77.4 78.35 L75.35 77.9 L76.6 73.05 L78.35 73.45 L79.95 73.7 L81.4 73.85 L82.55 73.85 L83.55 73.75 L84.3 73.55 L84.85 73.3 L85.2 73.05 L85.45 72.75 L85.7 72.4 Z",
          "bounds": [
            75.35,
            72.4,
            90.25,
            78.85
          ],
          "direction": "curve",
          "weight": 12.173572,
          "revealPath": "M87.99363055707225 73.41464971873383 Q86 78 76 75.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M59.5 11.5 L64.5 11.5 L64.5 93 L59.5 93 Z",
          "bounds": [
            59.5,
            11.5,
            64.5,
            93
          ],
          "direction": "down",
          "weight": 79
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch99Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch99 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH99_STROKES = loadGlyphWikiBatch99Strokes(reviewed)
