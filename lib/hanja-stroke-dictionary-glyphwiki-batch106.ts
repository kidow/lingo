/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch106.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "怭",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "490eb17327f16d6c28aaa7ae1505a1626117b5ea53504e94df0c2690440b0d38",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      2,
      3,
      1,
      6,
      8,
      5,
      4,
      7
    ],
    "pathsSha256": "384a3fd78f443c373b6f88fd5102d1c229bcd14deaa38e5b11c06059369b1cab",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/602D.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6000/602D.svg",
      "dictionarySvgSha256": "045b9b6e9a804cfd67ef3fa9cd86301865c8096538d1b16e74abe5a0197d7657",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "f0b0bfc0850739bbd566bb4c00338d1f7a220436a91a35ad07a374defabbe4f4",
      "geometryReviewSha256": "f0b0bfc0850739bbd566bb4c00338d1f7a220436a91a35ad07a374defabbe4f4",
      "directionReviewSha256": "f0b0bfc0850739bbd566bb4c00338d1f7a220436a91a35ad07a374defabbe4f4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/602d.json",
      "modifications": "Whole 怭 u602d from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups1;2;0;5;7;4;3;6 reordered to domestic8strokes. Eight original quadratics, continuous four-part hook and all polygon vertices preserved; winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M16.8 28.35 L16.5 31.35 L16.15 34.15 L15.7 36.85 L15.2 39.35 L14.6 41.7 L14 43.9 L13.3 45.9 L12.55 47.8 L11.7 49.5 L10.75 51.1 L6.55 48.35 L7.3 47.15 L7.95 45.75 L8.6 44.15 L9.2 42.4 L9.8 40.4 L10.3 38.25 L10.75 35.95 L11.2 33.45 L11.55 30.75 L11.85 27.9 Z",
      "M27.95 25 L29.25 26.6 L30.45 28.2 L31.6 29.85 L32.65 31.55 L33.6 33.25 L34.45 34.95 L35.2 36.7 L35.9 38.45 L36.5 40.25 L37 42.1 L32.15 43.3 L31.7 41.7 L31.2 40.15 L30.6 38.6 L29.9 37.1 L29.15 35.55 L28.35 34.05 L27.4 32.6 L26.4 31.1 L25.3 29.65 L24.15 28.2 Z",
      "M18.95 7.5 L23.95 7.5 L23.95 93.45 L18.95 93.45 Z",
      "M50.5 6.7 L53.55 8.05 L56.4 9.5 L59.1 11 L61.65 12.55 L64 14.2 L66.15 15.95 L68.1 17.75 L69.95 19.65 L71.55 21.6 L72.95 23.6 L68.75 26.35 L67.55 24.6 L66.2 22.95 L64.65 21.35 L62.9 19.75 L61 18.25 L58.85 16.75 L56.55 15.3 L54.1 13.9 L51.4 12.55 L48.55 11.25 Z",
      "M87.9 13.7 L84.55 23.65 L80.75 33.2 L76.45 42.4 L71.65 51.2 L66.4 59.6 L60.65 67.65 L54.4 75.3 L47.65 82.55 L40.45 89.45 L32.75 95.95 L29.65 92 L37.1 85.7 L44.1 79.05 L50.6 72 L56.65 64.6 L62.25 56.85 L67.35 48.65 L72 40.15 L76.15 31.2 L79.85 21.9 L83.1 12.25 Z",
      "M51.9 26 L56.9 26 L56.9 83.5 L51.9 83.5 Z M56.9 83.5 L56.95 84.15 L57 84.65 L57.15 85.05 L57.3 85.3 L57.4 85.45 L57.6 85.6 L57.85 85.75 L58.2 85.85 L58.7 85.95 L59.4 86 L59.4 91 L58.15 90.9 L57 90.7 L55.85 90.3 L54.8 89.75 L53.9 89 L53.1 88.05 L52.55 87 L52.15 85.9 L51.95 84.7 L51.9 83.5 Z M59.4 86 L78.7 86 L78.7 91 L59.4 91 Z M78.7 86 L79.15 85.95 L79.55 85.8 L80 85.55 L80.5 85.1 L81.05 84.5 L81.6 83.6 L82.2 82.5 L82.75 81.2 L83.25 79.65 L83.75 77.85 L88.6 79.1 L88.05 81.1 L87.4 82.95 L86.7 84.65 L85.95 86.15 L85.05 87.5 L84.05 88.65 L82.9 89.6 L81.6 90.35 L80.15 90.8 L78.7 91 Z",
      "M44.05 39.75 L44.35 43.55 L44.5 47.25 L44.45 50.85 L44.25 54.25 L43.9 57.55 L43.4 60.75 L42.7 63.8 L41.8 66.7 L40.75 69.45 L39.55 72.1 L35.1 69.85 L36.15 67.55 L37.05 65.1 L37.85 62.5 L38.45 59.75 L38.95 56.9 L39.3 53.85 L39.45 50.65 L39.5 47.35 L39.4 43.85 L39.1 40.2 Z",
      "M81.95 38.9 L83.9 41.45 L85.7 44.05 L87.3 46.75 L88.7 49.45 L89.95 52.3 L91 55.15 L91.9 58.1 L92.6 61.1 L93.15 64.15 L93.5 67.25 L88.5 67.7 L88.2 64.85 L87.7 62.1 L87.1 59.4 L86.3 56.75 L85.3 54.15 L84.2 51.65 L82.9 49.15 L81.45 46.75 L79.85 44.35 L78.1 42.05 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M16.8 28.35 L16.5 31.35 L16.15 34.15 L15.7 36.85 L15.2 39.35 L14.6 41.7 L14 43.9 L13.3 45.9 L12.55 47.8 L11.7 49.5 L10.75 51.1 L6.55 48.35 L7.3 47.15 L7.95 45.75 L8.6 44.15 L9.2 42.4 L9.8 40.4 L10.3 38.25 L10.75 35.95 L11.2 33.45 L11.55 30.75 L11.85 27.9 Z",
          "bounds": [
            6.55,
            27.9,
            16.8,
            51.1
          ],
          "direction": "curve",
          "weight": 22.341586,
          "revealPath": "M14.36 28.14 Q12.94 43.215 8.68 49.7475",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27.95 25 L29.25 26.6 L30.45 28.2 L31.6 29.85 L32.65 31.55 L33.6 33.25 L34.45 34.95 L35.2 36.7 L35.9 38.45 L36.5 40.25 L37 42.1 L32.15 43.3 L31.7 41.7 L31.2 40.15 L30.6 38.6 L29.9 37.1 L29.15 35.55 L28.35 34.05 L27.4 32.6 L26.4 31.1 L25.3 29.65 L24.15 28.2 Z",
          "bounds": [
            24.15,
            25,
            37,
            43.3
          ],
          "direction": "curve",
          "weight": 18.197714,
          "revealPath": "M26.075 26.6325 Q32.465 34.17 34.595 42.7125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M18.95 7.5 L23.95 7.5 L23.95 93.45 L18.95 93.45 Z",
          "bounds": [
            18.95,
            7.5,
            23.95,
            93.45
          ],
          "direction": "down",
          "weight": 85.9275
        }
      ],
      [
        {
          "outline": "M50.5 6.7 L53.55 8.05 L56.4 9.5 L59.1 11 L61.65 12.55 L64 14.2 L66.15 15.95 L68.1 17.75 L69.95 19.65 L71.55 21.6 L72.95 23.6 L68.75 26.35 L67.55 24.6 L66.2 22.95 L64.65 21.35 L62.9 19.75 L61 18.25 L58.85 16.75 L56.55 15.3 L54.1 13.9 L51.4 12.55 L48.55 11.25 Z",
          "bounds": [
            48.55,
            6.7,
            72.95,
            26.35
          ],
          "direction": "curve",
          "weight": 26.680002,
          "revealPath": "M49.540000000000006 9 Q64.79 15.5 70.89 25",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M87.9 13.7 L84.55 23.65 L80.75 33.2 L76.45 42.4 L71.65 51.2 L66.4 59.6 L60.65 67.65 L54.4 75.3 L47.65 82.55 L40.45 89.45 L32.75 95.95 L29.65 92 L37.1 85.7 L44.1 79.05 L50.6 72 L56.65 64.6 L62.25 56.85 L67.35 48.65 L72 40.15 L76.15 31.2 L79.85 21.9 L83.1 12.25 Z",
          "bounds": [
            29.65,
            12.25,
            87.9,
            95.95
          ],
          "direction": "curve",
          "weight": 97.511046,
          "revealPath": "M85.53 13 Q70.28 63 31.240000000000002 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M51.9 26 L56.9 26 L56.9 83.5 L51.9 83.5 Z",
          "bounds": [
            51.9,
            26,
            56.9,
            83.5
          ],
          "direction": "down",
          "weight": 57.5
        },
        {
          "outline": "M56.9 83.5 L56.95 84.15 L57 84.65 L57.15 85.05 L57.3 85.3 L57.4 85.45 L57.6 85.6 L57.85 85.75 L58.2 85.85 L58.7 85.95 L59.4 86 L59.4 91 L58.15 90.9 L57 90.7 L55.85 90.3 L54.8 89.75 L53.9 89 L53.1 88.05 L52.55 87 L52.15 85.9 L51.95 84.7 L51.9 83.5 Z",
          "bounds": [
            51.9,
            83.5,
            59.4,
            91
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M54.42 83.5 Q54.42 88.5 59.42 88.5",
          "revealWidth": 14
        },
        {
          "outline": "M59.4 86 L78.7 86 L78.7 91 L59.4 91 Z",
          "bounds": [
            59.4,
            86,
            78.7,
            91
          ],
          "direction": "right",
          "weight": 19.28
        },
        {
          "outline": "M78.7 86 L79.15 85.95 L79.55 85.8 L80 85.55 L80.5 85.1 L81.05 84.5 L81.6 83.6 L82.2 82.5 L82.75 81.2 L83.25 79.65 L83.75 77.85 L88.6 79.1 L88.05 81.1 L87.4 82.95 L86.7 84.65 L85.95 86.15 L85.05 87.5 L84.05 88.65 L82.9 89.6 L81.6 90.35 L80.15 90.8 L78.7 91 Z",
          "bounds": [
            78.7,
            77.85,
            88.6,
            91
          ],
          "direction": "curve",
          "weight": 12.5,
          "revealPath": "M78.7 88.5 Q83.7 88.5 86.2 78.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M44.05 39.75 L44.35 43.55 L44.5 47.25 L44.45 50.85 L44.25 54.25 L43.9 57.55 L43.4 60.75 L42.7 63.8 L41.8 66.7 L40.75 69.45 L39.55 72.1 L35.1 69.85 L36.15 67.55 L37.05 65.1 L37.85 62.5 L38.45 59.75 L38.95 56.9 L39.3 53.85 L39.45 50.65 L39.5 47.35 L39.4 43.85 L39.1 40.2 Z",
          "bounds": [
            35.1,
            39.75,
            44.5,
            72.1
          ],
          "direction": "curve",
          "weight": 31.292697,
          "revealPath": "M41.61 40 Q43.44 59 37.34 71",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M81.95 38.9 L83.9 41.45 L85.7 44.05 L87.3 46.75 L88.7 49.45 L89.95 52.3 L91 55.15 L91.9 58.1 L92.6 61.1 L93.15 64.15 L93.5 67.25 L88.5 67.7 L88.2 64.85 L87.7 62.1 L87.1 59.4 L86.3 56.75 L85.3 54.15 L84.2 51.65 L82.9 49.15 L81.45 46.75 L79.85 44.35 L78.1 42.05 Z",
          "bounds": [
            78.1,
            38.9,
            93.5,
            67.7
          ],
          "direction": "curve",
          "weight": 29.147219,
          "revealPath": "M80.04 40.5 Q89.8 52.5 91.02 67.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch106Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch106 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH106_STROKES = loadGlyphWikiBatch106Strokes(reviewed)
