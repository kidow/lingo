/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch122.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "岺",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "5f241e783e9b49cdd7a157f3f91cfc87f862a5995bcf4175a4a21938869f02e5",
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
    "pathsSha256": "51cda501e742be520c8c73e2d0ac6821b03903c6bfeb2016b586d54c5822f4fd",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5CBA.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5C00/5CBA.svg",
      "dictionarySvgSha256": "4aedbfe5ab290cf983a1bddb0b628db483d3d24cdbf60bdfeaec3a987521ac06",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "b6a92f210168d11346fc55b0267862d5fed97a5e4eb9da06b87de0283d549b20",
      "geometryReviewSha256": "b6a92f210168d11346fc55b0267862d5fed97a5e4eb9da06b87de0283d549b20",
      "directionReviewSha256": "b6a92f210168d11346fc55b0267862d5fed97a5e4eb9da06b87de0283d549b20"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact historical versions u5c71-03@2,u4ee4@5,u4ebc-03@5,cdp-8a60-04@2,u5369-04@3",
      "editableSource": "/hanja-strokes/glyphwiki/5cba.json",
      "modifications": "Whole 岺 u5cba from pinned2016 archive with exact historical dependencies u5c71-03@2,u4ee4@5,u4ebc-03@5,u5369-04@3,cdp-8a60-04@2. Provider alias u5369-04@3 resolved to unchanged cdp-8a60-04@2 data. Scale200 to100 using default mincho new Kage(); retain original groups0;1+2;3;4;5;6;7+8;9 in domestic8stroke order. Preserve3quadratic primitives and every polygon vertex; normalize winding only. Default gothic rejected for unwanted upper attachment. No inferred points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M53 8.3 L53 31.05 L47 31.05 L47 7.3 Z M53 8.3 L54.5 9.3 L52 10.8 Z",
      "M21.95 14.35 L21.95 37.05 L15.95 40.05 L15.95 13.35 Z M21.95 14.35 L23.45 15.35 L20.95 16.85 Z M18.95 29.05 L81 29.05 L81 31.05 L18.95 31.05 Z",
      "M84 14.35 L84 34.05 L78 37.05 L78 13.35 Z M84 14.35 L85.5 15.35 L83 16.85 Z",
      "M52.95 36.15 L49.25 40 L45.35 43.65 L41.2 47.05 L36.8 50.25 L32.15 53.15 L27.35 55.85 L22.25 58.3 L16.95 60.45 L11.4 62.35 L5.6 63.9 L5.35 63.05 L10.7 60.55 L15.85 58 L20.75 55.35 L25.45 52.55 L29.85 49.6 L34.05 46.5 L38 43.2 L41.7 39.75 L45.15 36.1 L48.35 32.25 Z M48.05 32.65 L48.55 32.05 L52.95 36.15 Z M52.95 36.15 L53.45 37.9 L50.55 37.4 Z",
      "M49.65 34.95 L53.5 37.75 L57.35 40.45 L61.2 43.05 L65.15 45.4 L69.15 47.65 L73.2 49.65 L77.35 51.5 L81.65 53.15 L86 54.6 L90.45 55.9 L88.5 62.2 L83.9 60.55 L79.4 58.6 L75.05 56.5 L70.8 54.2 L66.75 51.65 L62.85 48.9 L59.1 45.95 L55.5 42.75 L52.1 39.3 L49 35.6 Z M88.5 62.2 L90.45 55.9 L94.35 57.1 Z",
      "M32 54.75 L66.5 54.75 L66.5 56.75 L32 56.75 Z M66.5 54.75 L54.5 55.75 L60.5 49.75 Z",
      "M19.8 65.25 L75.8 65.25 L75.8 67.25 L19.8 67.25 Z M78.8 66.25 L78.8 81.8 L72.8 81.8 L72.8 66.25 Z M72.8 65.25 L75.8 62.75 L81.3 67.25 L78.8 69.25 L72.8 66.25 Z M72.8 81.8 L78.8 81.8 L77.6 83.6 L75.8 84.8 L74 83.6 Z M78.8 81.8 L78.7 83.1 L78.5 84.35 L78.1 85.55 L77.45 86.65 L76.65 87.7 L75.65 88.5 L74.5 89.1 L73.3 89.5 L72.05 89.75 L70.8 89.8 L70.8 83.8 L71.4 83.8 L71.85 83.7 L72.15 83.6 L72.3 83.5 L72.4 83.45 L72.5 83.35 L72.55 83.2 L72.65 82.9 L72.75 82.45 L72.8 81.8 Z M70.8 86.8 L63.8 85.3 L63.8 83.8 L70.8 83.8 Z",
      "M46.8 65.25 L46.8 91.65 L40.8 94.65 L40.8 65.25 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M53 8.3 L53 31.05 L47 31.05 L47 7.3 Z M53 8.3 L54.5 9.3 L52 10.8 Z",
          "bounds": [
            47,
            7.3,
            54.5,
            31.05
          ],
          "direction": "down",
          "weight": 22.283363
        }
      ],
      [
        {
          "outline": "M21.95 14.35 L21.95 37.05 L15.95 40.05 L15.95 13.35 Z M21.95 14.35 L23.45 15.35 L20.95 16.85 Z",
          "bounds": [
            15.95,
            13.35,
            23.45,
            40.05
          ],
          "direction": "down",
          "weight": 16.219863
        },
        {
          "outline": "M18.95 29.05 L81 29.05 L81 31.05 L18.95 31.05 Z",
          "bounds": [
            18.95,
            29.05,
            81,
            31.05
          ],
          "direction": "right",
          "weight": 62.04
        }
      ],
      [
        {
          "outline": "M84 14.35 L84 34.05 L78 37.05 L78 13.35 Z M84 14.35 L85.5 15.35 L83 16.85 Z",
          "bounds": [
            78,
            13.35,
            85.5,
            37.05
          ],
          "direction": "down",
          "weight": 16.219863
        }
      ],
      [
        {
          "outline": "M52.95 36.15 L49.25 40 L45.35 43.65 L41.2 47.05 L36.8 50.25 L32.15 53.15 L27.35 55.85 L22.25 58.3 L16.95 60.45 L11.4 62.35 L5.6 63.9 L5.35 63.05 L10.7 60.55 L15.85 58 L20.75 55.35 L25.45 52.55 L29.85 49.6 L34.05 46.5 L38 43.2 L41.7 39.75 L45.15 36.1 L48.35 32.25 Z M48.05 32.65 L48.55 32.05 L52.95 36.15 Z M52.95 36.15 L53.45 37.9 L50.55 37.4 Z",
          "bounds": [
            5.35,
            32.05,
            53.45,
            63.9
          ],
          "direction": "curve",
          "weight": 54.29489,
          "revealPath": "M51 33.852 Q34 53.96825 5.5 63.47774999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.65 34.95 L53.5 37.75 L57.35 40.45 L61.2 43.05 L65.15 45.4 L69.15 47.65 L73.2 49.65 L77.35 51.5 L81.65 53.15 L86 54.6 L90.45 55.9 L88.5 62.2 L83.9 60.55 L79.4 58.6 L75.05 56.5 L70.8 54.2 L66.75 51.65 L62.85 48.9 L59.1 45.95 L55.5 42.75 L52.1 39.3 L49 35.6 Z M88.5 62.2 L90.45 55.9 L94.35 57.1 Z",
          "bounds": [
            49,
            34.95,
            94.35,
            62.2
          ],
          "direction": "curve",
          "weight": 47.148335,
          "revealPath": "M49 34.94925 Q66.5 52.1395 89.5 59.088750000000005",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M32 54.75 L66.5 54.75 L66.5 56.75 L32 56.75 Z M66.5 54.75 L54.5 55.75 L60.5 49.75 Z",
          "bounds": [
            32,
            49.75,
            66.5,
            56.75
          ],
          "direction": "right",
          "weight": 34.5
        }
      ],
      [
        {
          "outline": "M19.8 65.25 L75.8 65.25 L75.8 67.25 L19.8 67.25 Z",
          "bounds": [
            19.8,
            65.25,
            75.8,
            67.25
          ],
          "direction": "right",
          "weight": 56
        },
        {
          "outline": "M78.8 66.25 L78.8 81.8 L72.8 81.8 L72.8 66.25 Z M72.8 65.25 L75.8 62.75 L81.3 67.25 L78.8 69.25 L72.8 66.25 Z M72.8 81.8 L78.8 81.8 L77.6 83.6 L75.8 84.8 L74 83.6 Z",
          "bounds": [
            72.8,
            62.75,
            81.3,
            84.8
          ],
          "direction": "down",
          "weight": 15.566
        },
        {
          "outline": "M78.8 81.8 L78.7 83.1 L78.5 84.35 L78.1 85.55 L77.45 86.65 L76.65 87.7 L75.65 88.5 L74.5 89.1 L73.3 89.5 L72.05 89.75 L70.8 89.8 L70.8 83.8 L71.4 83.8 L71.85 83.7 L72.15 83.6 L72.3 83.5 L72.4 83.45 L72.5 83.35 L72.55 83.2 L72.65 82.9 L72.75 82.45 L72.8 81.8 Z M70.8 86.8 L63.8 85.3 L63.8 83.8 L70.8 83.8 Z",
          "bounds": [
            63.8,
            81.8,
            78.8,
            89.8
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M75.8 81.83500000000001 Q75.8 86.83500000000001 70.8 86.83500000000001",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.8 65.25 L46.8 91.65 L40.8 94.65 L40.8 65.25 Z",
          "bounds": [
            40.8,
            65.25,
            46.8,
            94.65
          ],
          "direction": "down",
          "weight": 26.894
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch122Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch122 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH122_STROKES = loadGlyphWikiBatch122Strokes(reviewed)
