/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch108.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "佌",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "9be67a4b43f4f74b25dee375756a9286ece13182eabadfb1ef5c36d8639c89b8",
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
    "pathsSha256": "235198e29f9e048da9bcb67a60072649a21d143b0d194f91ff1e22736162658b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F4C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F4C.svg",
      "dictionarySvgSha256": "1f6c2593c55d511c4df9a8f096d235ef3474c319e57b3a8c893f2826dfa774c0",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "ac0b6e906fa3d302fb2abe0c9499fda194e57cb085591188e208f61b7a2986ed",
      "geometryReviewSha256": "ac0b6e906fa3d302fb2abe0c9499fda194e57cb085591188e208f61b7a2986ed",
      "directionReviewSha256": "ac0b6e906fa3d302fb2abe0c9499fda194e57cb085591188e208f61b7a2986ed"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4f4c.json",
      "modifications": "Whole 佌 u4f4c from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Original8stroke order0;1;2;3;4;5;6;7 retained. Five original quadratics, continuous four-part final hook and all polygon vertices preserved; winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M33.25 8.35 L31.1 14 L28.85 19.6 L26.5 25.05 L24.05 30.4 L21.45 35.6 L18.8 40.7 L16.05 45.7 L13.2 50.55 L10.25 55.25 L7.15 59.9 L3.05 57.05 L6 52.55 L8.9 47.95 L11.7 43.2 L14.4 38.35 L17 33.35 L19.5 28.25 L21.9 23 L24.2 17.65 L26.45 12.2 L28.55 6.6 Z",
      "M18 36.5 L23 36.5 L23 93 L18 93 Z",
      "M49.3 10 L54.3 10 L54.3 83.5 L49.3 83.5 Z",
      "M49.3 40.5 L66.85 40.5 L66.85 45.5 L49.3 45.5 Z",
      "M33.7 28.5 L38.7 28.5 L38.7 89 L33.7 89 Z",
      "M26.15 89.1 L30.05 87.7 L33.95 86.3 L37.9 84.85 L41.8 83.4 L45.7 81.9 L49.65 80.4 L53.55 78.85 L57.45 77.3 L61.4 75.75 L65.3 74.15 L67.2 78.8 L63.25 80.4 L59.3 81.95 L55.4 83.5 L51.45 85.05 L47.5 86.55 L43.55 88.05 L39.65 89.55 L35.7 91 L31.75 92.4 L27.8 93.85 Z",
      "M91.35 32.95 L89.95 34.75 L88.5 36.55 L86.85 38.4 L85.15 40.25 L83.3 42.1 L81.35 44 L79.3 45.95 L77.15 47.9 L74.85 49.9 L72.45 51.9 L69.3 48.05 L71.6 46.1 L73.85 44.15 L75.95 42.25 L77.9 40.4 L79.8 38.6 L81.55 36.8 L83.15 35.05 L84.65 33.3 L86.05 31.65 L87.35 30 Z",
      "M68.35 9.5 L73.35 9.5 L73.35 84 L68.35 84 Z M73.35 84 L73.4 84.65 L73.5 85.15 L73.6 85.55 L73.75 85.8 L73.9 85.95 L74.05 86.1 L74.3 86.25 L74.65 86.35 L75.2 86.45 L75.85 86.5 L75.85 91.5 L74.65 91.4 L73.45 91.2 L72.35 90.8 L71.3 90.25 L70.35 89.5 L69.6 88.55 L69 87.5 L68.65 86.4 L68.45 85.2 L68.35 84 Z M75.85 86.5 L86.1 86.5 L86.1 91.5 L75.85 91.5 Z M86.1 86.5 L86.55 86.45 L86.95 86.3 L87.4 86.05 L87.9 85.6 L88.45 85 L89 84.1 L89.6 83 L90.15 81.7 L90.65 80.15 L91.15 78.35 L96 79.6 L95.45 81.6 L94.8 83.45 L94.1 85.15 L93.35 86.65 L92.45 88 L91.45 89.15 L90.3 90.1 L89 90.85 L87.55 91.3 L86.1 91.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M33.25 8.35 L31.1 14 L28.85 19.6 L26.5 25.05 L24.05 30.4 L21.45 35.6 L18.8 40.7 L16.05 45.7 L13.2 50.55 L10.25 55.25 L7.15 59.9 L3.05 57.05 L6 52.55 L8.9 47.95 L11.7 43.2 L14.4 38.35 L17 33.35 L19.5 28.25 L21.9 23 L24.2 17.65 L26.45 12.2 L28.55 6.6 Z",
          "bounds": [
            3.05,
            6.6,
            33.25,
            59.9
          ],
          "direction": "curve",
          "weight": 57.152271,
          "revealPath": "M30.915 7.5 Q20.52 36 5.12 58.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M18 36.5 L23 36.5 L23 93 L18 93 Z",
          "bounds": [
            18,
            36.5,
            23,
            93
          ],
          "direction": "down",
          "weight": 56.5
        }
      ],
      [
        {
          "outline": "M49.3 10 L54.3 10 L54.3 83.5 L49.3 83.5 Z",
          "bounds": [
            49.3,
            10,
            54.3,
            83.5
          ],
          "direction": "down",
          "weight": 71
        }
      ],
      [
        {
          "outline": "M49.3 40.5 L66.85 40.5 L66.85 45.5 L49.3 45.5 Z",
          "bounds": [
            49.3,
            40.5,
            66.85,
            45.5
          ],
          "direction": "right",
          "weight": 15.015
        }
      ],
      [
        {
          "outline": "M33.7 28.5 L38.7 28.5 L38.7 89 L33.7 89 Z",
          "bounds": [
            33.7,
            28.5,
            38.7,
            89
          ],
          "direction": "down",
          "weight": 58
        }
      ],
      [
        {
          "outline": "M26.15 89.1 L30.05 87.7 L33.95 86.3 L37.9 84.85 L41.8 83.4 L45.7 81.9 L49.65 80.4 L53.55 78.85 L57.45 77.3 L61.4 75.75 L65.3 74.15 L67.2 78.8 L63.25 80.4 L59.3 81.95 L55.4 83.5 L51.45 85.05 L47.5 86.55 L43.55 88.05 L39.65 89.55 L35.7 91 L31.75 92.4 L27.8 93.85 Z",
          "bounds": [
            26.15,
            74.15,
            67.2,
            93.85
          ],
          "direction": "curve",
          "weight": 42.03728,
          "revealPath": "M27.002499999999998 91.5 Q46.6375 84.5 66.2725 76.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M91.35 32.95 L89.95 34.75 L88.5 36.55 L86.85 38.4 L85.15 40.25 L83.3 42.1 L81.35 44 L79.3 45.95 L77.15 47.9 L74.85 49.9 L72.45 51.9 L69.3 48.05 L71.6 46.1 L73.85 44.15 L75.95 42.25 L77.9 40.4 L79.8 38.6 L81.55 36.8 L83.15 35.05 L84.65 33.3 L86.05 31.65 L87.35 30 Z",
          "bounds": [
            69.3,
            30,
            91.35,
            51.9
          ],
          "direction": "curve",
          "weight": 26.148813,
          "revealPath": "M89.3725 31.5 Q83.02 40 70.8925 50",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68.35 9.5 L73.35 9.5 L73.35 84 L68.35 84 Z",
          "bounds": [
            68.35,
            9.5,
            73.35,
            84
          ],
          "direction": "down",
          "weight": 74.5
        },
        {
          "outline": "M73.35 84 L73.4 84.65 L73.5 85.15 L73.6 85.55 L73.75 85.8 L73.9 85.95 L74.05 86.1 L74.3 86.25 L74.65 86.35 L75.2 86.45 L75.85 86.5 L75.85 91.5 L74.65 91.4 L73.45 91.2 L72.35 90.8 L71.3 90.25 L70.35 89.5 L69.6 88.55 L69 87.5 L68.65 86.4 L68.45 85.2 L68.35 84 Z",
          "bounds": [
            68.35,
            84,
            75.85,
            91.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M70.8925 84 Q70.8925 89 75.8925 89",
          "revealWidth": 14
        },
        {
          "outline": "M75.85 86.5 L86.1 86.5 L86.1 91.5 L75.85 91.5 Z",
          "bounds": [
            75.85,
            86.5,
            86.1,
            91.5
          ],
          "direction": "right",
          "weight": 10.2125
        },
        {
          "outline": "M86.1 86.5 L86.55 86.45 L86.95 86.3 L87.4 86.05 L87.9 85.6 L88.45 85 L89 84.1 L89.6 83 L90.15 81.7 L90.65 80.15 L91.15 78.35 L96 79.6 L95.45 81.6 L94.8 83.45 L94.1 85.15 L93.35 86.65 L92.45 88 L91.45 89.15 L90.3 90.1 L89 90.85 L87.55 91.3 L86.1 91.5 Z",
          "bounds": [
            86.1,
            78.35,
            96,
            91.5
          ],
          "direction": "curve",
          "weight": 12.5,
          "revealPath": "M86.105 89 Q91.105 89 93.605 79",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch108Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch108 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH108_STROKES = loadGlyphWikiBatch108Strokes(reviewed)
