/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch178.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "茁",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "64cfb8f852e31ecbff7e1a3c54bd7ef16d510e4a14db350d1fc4f16c9dad7407",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "pathsSha256": "c49745f47bf0353b3f4177ecd4e43738f85a232907ddbaa0d578a9564cb1d3a2",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8301.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8300/8301.svg",
      "dictionarySvgSha256": "8cf93f2ab7b2a305bd957f59938985596b781d8bff72fa9bf16afe7ff09f6156",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "ac58b0c61a601e19fd6fcc4ee3fff268de1d4b09783e14cb14139d1b796eca42",
      "geometryReviewSha256": "ac58b0c61a601e19fd6fcc4ee3fff268de1d4b09783e14cb14139d1b796eca42",
      "directionReviewSha256": "ac58b0c61a601e19fd6fcc4ee3fff268de1d4b09783e14cb14139d1b796eca42"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u8301-k@9",
      "revision": "u8301-k@9; ufa5e-03@8; u51fa-j@2; observed2026-10-03; source SHA256 970e007fd0983ae130ad6dde17f8f1a3271b3bb1bbc912872c12345921ba87c9",
      "editableSource": "/hanja-strokes/glyphwiki/8301.json",
      "modifications": "Whole Korean source and declared dependencies only; normalized200to100 and winding. Domestic grass order0,1,3,2. Original continuous corners40,112.25 and31,173 grouped. No invented coordinates, bridges, trimming or substituted components. Crosschecked9 cumulative states and81 progressive frames."
    },
    "paths": [
      "M6.5 18 L47.5 18 L47.5 20 L6.5 20 Z M47.5 18 L35.5 19 L41.5 13 Z",
      "M35 7.5 L35 29.1 L29 32.1 L29 6.5 Z M35 7.5 L36.5 8.5 L34 10 Z",
      "M52.5 18 L93.5 18 L93.5 20 L52.5 20 Z M93.5 18 L81.5 19 L87.5 13 Z",
      "M71 7.5 L71 29.1 L65 32.1 L65 6.5 Z M71 7.5 L72.5 8.5 L70 10 Z",
      "M53 30.75 L53 87.1 L47 87.1 L47 29.75 Z M53 30.75 L54.5 31.75 L52 33.25 Z",
      "M23 36 L23 57.1 L17 60.1 L17 35 Z M23 36 L24.5 37 L22 38.5 Z M20 55.1 L80 55.1 L80 57.1 L20 57.1 Z",
      "M83 36 L83 57.1 L77 60.1 L77 35 Z M83 36 L84.5 37 L82 38.5 Z",
      "M18.5 65.25 L18.5 91 L12.5 94 L12.5 64.25 Z M18.5 65.25 L20 66.25 L17.5 67.75 Z M15.5 85.5 L84.5 85.5 L84.5 87.5 L15.5 87.5 Z",
      "M87.5 65.25 L87.5 89.5 L81.5 92.5 L81.5 64.25 Z M87.5 65.25 L89 66.25 L86.5 67.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 18 L47.5 18 L47.5 20 L6.5 20 Z M47.5 18 L35.5 19 L41.5 13 Z",
          "bounds": [
            6.5,
            13,
            47.5,
            20
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 7.5 L35 29.1 L29 32.1 L29 6.5 Z M35 7.5 L36.5 8.5 L34 10 Z",
          "bounds": [
            29,
            6.5,
            36.5,
            32.1
          ],
          "direction": "down",
          "weight": 23.5875
        }
      ],
      [
        {
          "outline": "M52.5 18 L93.5 18 L93.5 20 L52.5 20 Z M93.5 18 L81.5 19 L87.5 13 Z",
          "bounds": [
            52.5,
            13,
            93.5,
            20
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 7.5 L71 29.1 L65 32.1 L65 6.5 Z M71 7.5 L72.5 8.5 L70 10 Z",
          "bounds": [
            65,
            6.5,
            72.5,
            32.1
          ],
          "direction": "down",
          "weight": 23.5875
        }
      ],
      [
        {
          "outline": "M53 30.75 L53 87.1 L47 87.1 L47 29.75 Z M53 30.75 L54.5 31.75 L52 33.25 Z",
          "bounds": [
            47,
            29.75,
            54.5,
            87.1
          ],
          "direction": "down",
          "weight": 55.875
        }
      ],
      [
        {
          "outline": "M23 36 L23 57.1 L17 60.1 L17 35 Z M23 36 L24.5 37 L22 38.5 Z",
          "bounds": [
            17,
            35,
            24.5,
            60.1
          ],
          "direction": "down",
          "weight": 20.625
        },
        {
          "outline": "M20 55.1 L80 55.1 L80 57.1 L20 57.1 Z",
          "bounds": [
            20,
            55.1,
            80,
            57.1
          ],
          "direction": "right",
          "weight": 60
        }
      ],
      [
        {
          "outline": "M83 36 L83 57.1 L77 60.1 L77 35 Z M83 36 L84.5 37 L82 38.5 Z",
          "bounds": [
            77,
            35,
            84.5,
            60.1
          ],
          "direction": "down",
          "weight": 20.625
        }
      ],
      [
        {
          "outline": "M18.5 65.25 L18.5 91 L12.5 94 L12.5 64.25 Z M18.5 65.25 L20 66.25 L17.5 67.75 Z",
          "bounds": [
            12.5,
            64.25,
            20,
            94
          ],
          "direction": "down",
          "weight": 21.75
        },
        {
          "outline": "M15.5 85.5 L84.5 85.5 L84.5 87.5 L15.5 87.5 Z",
          "bounds": [
            15.5,
            85.5,
            84.5,
            87.5
          ],
          "direction": "right",
          "weight": 69
        }
      ],
      [
        {
          "outline": "M87.5 65.25 L87.5 89.5 L81.5 92.5 L81.5 64.25 Z M87.5 65.25 L89 66.25 L86.5 67.75 Z",
          "bounds": [
            81.5,
            64.25,
            89,
            92.5
          ],
          "direction": "down",
          "weight": 21.75
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch178Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch178 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH178_STROKES = loadGlyphWikiBatch178Strokes(reviewed)
