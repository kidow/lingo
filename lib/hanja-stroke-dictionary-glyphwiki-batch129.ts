/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch129.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "旽",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "f4050c1198fbd9547dbd5fcae84da18915eae251cc6a3ffb40f2ae37697d03e2",
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
    "pathsSha256": "4573e8282dc0dbebc3348835b980df51172cd46b3c9951fcbca8cd3bc9218a5b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65FD.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6500/65FD.svg",
      "dictionarySvgSha256": "bd26cf8e99a805915f5298e0acd46ca4c8cfd59aec473755207168c9caebb3e7",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "5936d9381e61e71ff3c2a6a18b523d24ae2dff750785d38e72b0a6e35ab40130",
      "geometryReviewSha256": "5936d9381e61e71ff3c2a6a18b523d24ae2dff750785d38e72b0a6e35ab40130",
      "directionReviewSha256": "5936d9381e61e71ff3c2a6a18b523d24ae2dff750785d38e72b0a6e35ab40130"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/65fd.json",
      "modifications": "Whole 旽 u65fd from pinned2016 GlyphWiki archive. Scale200 to100 using default mincho new Kage(). Original raw groups0;1+2;3;4;5;6+7;8;9 follow observed domestic8stroke order. Preserve2originalquadratic primitives, all polygon vertices and exact compound endpoints; winding normalized only. No invented points, bridges, trimming, custom widths or component substitution."
    },
    "paths": [
      "M15.45 17.75 L15.45 82.2 L9.45 85.2 L9.45 14.75 Z",
      "M12.45 17.75 L31.15 17.75 L31.15 19.75 L12.45 19.75 Z M34.15 18.75 L34.15 79.2 L28.15 82.2 L28.15 18.75 Z M28.15 17.75 L31.15 15.25 L36.65 19.75 L34.15 21.75 L28.15 18.75 Z",
      "M12.45 45.15 L31.15 45.15 L31.15 47.15 L12.45 47.15 Z",
      "M12.45 74.2 L31.15 74.2 L31.15 76.2 L12.45 76.2 Z",
      "M87.85 22.5 L83.15 23.55 L78.4 24.6 L73.55 25.65 L68.6 26.75 L63.6 27.8 L58.45 28.9 L53.25 29.95 L47.95 31 L42.5 32 L37 32.9 L36.75 32.05 L42.05 30.15 L47.25 28.4 L52.45 26.8 L57.5 25.2 L62.55 23.7 L67.45 22.25 L72.3 20.8 L77.1 19.4 L81.75 18.05 L86.35 16.7 Z M85.9 16.8 L91.6 21.55 L87.85 22.5 Z M91.6 21.55 L91.75 23.05 L88.15 21.4 Z",
      "M48.15 36.5 L48.15 70 L42.15 73 L42.15 35.5 Z M48.15 36.5 L49.65 37.5 L47.15 39 Z M45.15 62 L83.1 62 L83.1 64 L45.15 64 Z",
      "M86.1 36.5 L86.1 67 L80.1 70 L80.1 35.5 Z M86.1 36.5 L87.6 37.5 L85.1 39 Z",
      "M66.8 11.5 L66.8 83 L60.8 83 L60.8 10.5 Z M66.8 11.5 L68.3 12.5 L65.8 14 Z M60.8 83 L66.8 83 L65.6 84.8 L63.8 86 L62 84.8 Z M66.8 83 L66.8 83.6 L66.9 84.05 L67 84.35 L67.1 84.5 L67.15 84.6 L67.25 84.7 L67.4 84.75 L67.7 84.85 L68.15 84.95 L68.8 85 L68.8 91 L67.5 90.9 L66.25 90.7 L65.05 90.3 L63.9 89.65 L62.9 88.85 L62.1 87.85 L61.5 86.7 L61.05 85.5 L60.85 84.25 L60.8 83 Z M68.8 85 L70.9 85.9 L71.8 88 L70.9 90.1 L68.8 91 Z M68.8 85 L91.4 85 L91.4 91 L68.8 91 Z M91.4 85 L93.2 86.2 L94.4 88 L93.2 89.8 L91.4 91 Z M91.4 85 L88.4 85 L91.4 72.5 L92.4 72.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M15.45 17.75 L15.45 82.2 L9.45 85.2 L9.45 14.75 Z",
          "bounds": [
            9.45,
            14.75,
            15.45,
            85.2
          ],
          "direction": "down",
          "weight": 56.44
        }
      ],
      [
        {
          "outline": "M12.45 17.75 L31.15 17.75 L31.15 19.75 L12.45 19.75 Z",
          "bounds": [
            12.45,
            17.75,
            31.15,
            19.75
          ],
          "direction": "right",
          "weight": 18.711
        },
        {
          "outline": "M34.15 18.75 L34.15 79.2 L28.15 82.2 L28.15 18.75 Z M28.15 17.75 L31.15 15.25 L36.65 19.75 L34.15 21.75 L28.15 18.75 Z",
          "bounds": [
            28.15,
            15.25,
            36.65,
            82.2
          ],
          "direction": "down",
          "weight": 56.44
        }
      ],
      [
        {
          "outline": "M12.45 45.15 L31.15 45.15 L31.15 47.15 L12.45 47.15 Z",
          "bounds": [
            12.45,
            45.15,
            31.15,
            47.15
          ],
          "direction": "right",
          "weight": 18.711
        }
      ],
      [
        {
          "outline": "M12.45 74.2 L31.15 74.2 L31.15 76.2 L12.45 76.2 Z",
          "bounds": [
            12.45,
            74.2,
            31.15,
            76.2
          ],
          "direction": "right",
          "weight": 18.711
        }
      ],
      [
        {
          "outline": "M87.85 22.5 L83.15 23.55 L78.4 24.6 L73.55 25.65 L68.6 26.75 L63.6 27.8 L58.45 28.9 L53.25 29.95 L47.95 31 L42.5 32 L37 32.9 L36.75 32.05 L42.05 30.15 L47.25 28.4 L52.45 26.8 L57.5 25.2 L62.55 23.7 L67.45 22.25 L72.3 20.8 L77.1 19.4 L81.75 18.05 L86.35 16.7 Z M85.9 16.8 L91.6 21.55 L87.85 22.5 Z M91.6 21.55 L91.75 23.05 L88.15 21.4 Z",
          "bounds": [
            36.75,
            16.7,
            91.75,
            32.9
          ],
          "direction": "curve",
          "weight": 52.354668,
          "revealPath": "M87.61500000000001 19.5 Q64.155 25.5 36.9 32.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M48.15 36.5 L48.15 70 L42.15 73 L42.15 35.5 Z M48.15 36.5 L49.65 37.5 L47.15 39 Z",
          "bounds": [
            42.15,
            35.5,
            49.65,
            73
          ],
          "direction": "down",
          "weight": 27
        },
        {
          "outline": "M45.15 62 L83.1 62 L83.1 64 L45.15 64 Z",
          "bounds": [
            45.15,
            62,
            83.1,
            64
          ],
          "direction": "right",
          "weight": 37.95
        }
      ],
      [
        {
          "outline": "M86.1 36.5 L86.1 67 L80.1 70 L80.1 35.5 Z M86.1 36.5 L87.6 37.5 L85.1 39 Z",
          "bounds": [
            80.1,
            35.5,
            87.6,
            70
          ],
          "direction": "down",
          "weight": 27
        }
      ],
      [
        {
          "outline": "M66.8 11.5 L66.8 83 L60.8 83 L60.8 10.5 Z M66.8 11.5 L68.3 12.5 L65.8 14 Z M60.8 83 L66.8 83 L65.6 84.8 L63.8 86 L62 84.8 Z",
          "bounds": [
            60.8,
            10.5,
            68.3,
            86
          ],
          "direction": "down",
          "weight": 72
        },
        {
          "outline": "M66.8 83 L66.8 83.6 L66.9 84.05 L67 84.35 L67.1 84.5 L67.15 84.6 L67.25 84.7 L67.4 84.75 L67.7 84.85 L68.15 84.95 L68.8 85 L68.8 91 L67.5 90.9 L66.25 90.7 L65.05 90.3 L63.9 89.65 L62.9 88.85 L62.1 87.85 L61.5 86.7 L61.05 85.5 L60.85 84.25 L60.8 83 Z M68.8 85 L70.9 85.9 L71.8 88 L70.9 90.1 L68.8 91 Z",
          "bounds": [
            60.8,
            83,
            71.8,
            91
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M63.81 83 Q63.81 88 68.81 88",
          "revealWidth": 14
        },
        {
          "outline": "M68.8 85 L91.4 85 L91.4 91 L68.8 91 Z M91.4 85 L93.2 86.2 L94.4 88 L93.2 89.8 L91.4 91 Z M91.4 85 L88.4 85 L91.4 72.5 L92.4 72.5 Z",
          "bounds": [
            68.8,
            72.5,
            94.4,
            91
          ],
          "direction": "right",
          "weight": 22.6
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch129Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch129 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH129_STROKES = loadGlyphWikiBatch129Strokes(reviewed)
