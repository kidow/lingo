/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch110.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "侐",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "9030288cbf59df052f850261ea0e22256045da7c5d5e30771d4c4b8d93cbe61a",
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
    "pathsSha256": "56e19955c08423db60717f00f90e9cb9153bdc51f2c629ccc0cb06dee94758cd",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F90.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F90.svg",
      "dictionarySvgSha256": "57bd9e048ee6430132a528901a834115d5aff6a3d17695a7339c788a57b3c069",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "eee18545207b26632cf7988c1ab7059f8db758829acdc263c21cdeab075f30f5",
      "geometryReviewSha256": "eee18545207b26632cf7988c1ab7059f8db758829acdc263c21cdeab075f30f5",
      "directionReviewSha256": "eee18545207b26632cf7988c1ab7059f8db758829acdc263c21cdeab075f30f5"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4f90.json",
      "modifications": "Whole 侐 u4f90 from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups0;1;2;3;4+5;6;7;8 match domestic8strokes; original horizontal and vertical of stroke5 share endpoint161.6,55. Two original quadratics and all polygon vertices preserved; winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M35.3 9.3 L33.05 14.95 L30.65 20.45 L28.2 25.85 L25.6 31.15 L22.9 36.3 L20.1 41.35 L17.2 46.3 L14.2 51.1 L11.1 55.8 L7.85 60.35 L3.8 57.4 L6.95 52.95 L10 48.4 L12.95 43.7 L15.8 38.9 L18.5 33.95 L21.15 28.9 L23.7 23.7 L26.1 18.45 L28.4 13.05 L30.65 7.5 Z",
      "M19.55 37.1 L24.55 37.1 L24.55 93.05 L19.55 93.05 Z",
      "M66.25 12.05 L65.35 13.9 L64.4 15.7 L63.45 17.45 L62.45 19.2 L61.45 20.9 L60.4 22.6 L59.3 24.25 L58.2 25.85 L57.05 27.45 L55.9 29 L51.9 25.95 L53 24.5 L54.1 23 L55.15 21.45 L56.15 19.9 L57.15 18.3 L58.15 16.7 L59.05 15.05 L60 13.35 L60.85 11.65 L61.7 9.9 Z",
      "M39.9 25 L44.9 25 L44.9 92.5 L39.9 92.5 Z",
      "M39.9 25 L83.3 25 L83.3 30 L39.9 30 Z M78.3 25 L83.3 25 L83.3 92.5 L78.3 92.5 Z",
      "M52.85 25 L57.85 25 L57.85 92.5 L52.85 92.5 Z",
      "M65.8 25 L70.8 25 L70.8 92.5 L65.8 92.5 Z",
      "M31.35 87.5 L93.25 87.5 L93.25 92.5 L31.35 92.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M35.3 9.3 L33.05 14.95 L30.65 20.45 L28.2 25.85 L25.6 31.15 L22.9 36.3 L20.1 41.35 L17.2 46.3 L14.2 51.1 L11.1 55.8 L7.85 60.35 L3.8 57.4 L6.95 52.95 L10 48.4 L12.95 43.7 L15.8 38.9 L18.5 33.95 L21.15 28.9 L23.7 23.7 L26.1 18.45 L28.4 13.05 L30.65 7.5 Z",
          "bounds": [
            3.8,
            7.5,
            35.3,
            60.35
          ],
          "direction": "curve",
          "weight": 57.319703,
          "revealPath": "M32.995000000000005 8.425 Q22.06 36.64 5.86 58.915",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M19.55 37.1 L24.55 37.1 L24.55 93.05 L19.55 93.05 Z",
          "bounds": [
            19.55,
            37.1,
            24.55,
            93.05
          ],
          "direction": "down",
          "weight": 55.935
        }
      ],
      [
        {
          "outline": "M66.25 12.05 L65.35 13.9 L64.4 15.7 L63.45 17.45 L62.45 19.2 L61.45 20.9 L60.4 22.6 L59.3 24.25 L58.2 25.85 L57.05 27.45 L55.9 29 L51.9 25.95 L53 24.5 L54.1 23 L55.15 21.45 L56.15 19.9 L57.15 18.3 L58.15 16.7 L59.05 15.05 L60 13.35 L60.85 11.65 L61.7 9.9 Z",
          "bounds": [
            51.9,
            9.9,
            66.25,
            29
          ],
          "direction": "curve",
          "weight": 19.335367,
          "revealPath": "M64 11 Q59.68 20 53.92 27.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M39.9 25 L44.9 25 L44.9 92.5 L39.9 92.5 Z",
          "bounds": [
            39.9,
            25,
            44.9,
            92.5
          ],
          "direction": "down",
          "weight": 62.5
        }
      ],
      [
        {
          "outline": "M39.9 25 L83.3 25 L83.3 30 L39.9 30 Z",
          "bounds": [
            39.9,
            25,
            83.3,
            30
          ],
          "direction": "right",
          "weight": 38.4
        },
        {
          "outline": "M78.3 25 L83.3 25 L83.3 92.5 L78.3 92.5 Z",
          "bounds": [
            78.3,
            25,
            83.3,
            92.5
          ],
          "direction": "down",
          "weight": 62.5
        }
      ],
      [
        {
          "outline": "M52.85 25 L57.85 25 L57.85 92.5 L52.85 92.5 Z",
          "bounds": [
            52.85,
            25,
            57.85,
            92.5
          ],
          "direction": "down",
          "weight": 62.5
        }
      ],
      [
        {
          "outline": "M65.8 25 L70.8 25 L70.8 92.5 L65.8 92.5 Z",
          "bounds": [
            65.8,
            25,
            70.8,
            92.5
          ],
          "direction": "down",
          "weight": 62.5
        }
      ],
      [
        {
          "outline": "M31.35 87.5 L93.25 87.5 L93.25 92.5 L31.35 92.5 Z",
          "bounds": [
            31.35,
            87.5,
            93.25,
            92.5
          ],
          "direction": "right",
          "weight": 61.92
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch110Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch110 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH110_STROKES = loadGlyphWikiBatch110Strokes(reviewed)
