/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch183.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "昰",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "5a7bd74603a30f7982d4baaa66c362f6725c2d02130f5f55f9b952c77ee6439a",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "pathsSha256": "a66eccc9f3806ab480c97c44ae83df62810e68ca2b9dfeaa385b4dea96e6c3d7",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6630.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6600/6630.svg",
      "dictionarySvgSha256": "2caa2097172e88691779932c43fb18e107d362d292c5dfe328260302e3add9a8",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "2a59505748ef6821843b2aa9b335c78a419dfa791604f9fd07c6a800b046896c",
      "geometryReviewSha256": "2a59505748ef6821843b2aa9b335c78a419dfa791604f9fd07c6a800b046896c",
      "directionReviewSha256": "2a59505748ef6821843b2aa9b335c78a419dfa791604f9fd07c6a800b046896c"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u6630-k@6",
      "revision": "u6630-k@6; u6630-j@3; u65e5-03@6; u6b63-j@2; observed2026-10-03; source SHA256 a45d712aaa1416df5435963f79e51648e059cdaa243cc5ddb00a76365238e5c5",
      "editableSource": "/hanja-strokes/glyphwiki/6630.json",
      "modifications": "Whole Korean-source alias and declared dependencies only; normalized200to100 and winding. Domestic source groups0;1,2;3;4;5;6;7;8;9. Domestic2 original horizontal/vertical corner151.5,25.09 retained without an invented bridge. All original polygon vertices, stroke decorations and engine defaults retained. No invented coordinates, trimming or substituted components. Crosschecked9 cumulative states and81 progressive frames."
    },
    "paths": [
      "M27.25 11.5 L27.25 44.05 L21.25 47.05 L21.25 8.5 Z",
      "M24.25 11.5 L75.75 11.5 L75.75 13.5 L24.25 13.5 Z M78.75 12.5 L78.75 42.55 L72.75 45.55 L72.75 12.5 Z M72.75 11.5 L75.75 9 L81.25 13.5 L78.75 15.5 L72.75 12.5 Z",
      "M24.25 25.05 L75.75 25.05 L75.75 27.05 L24.25 27.05 Z",
      "M24.25 38.55 L75.75 38.55 L75.75 40.55 L24.25 40.55 Z",
      "M11.75 51.3 L88.2 51.3 L88.2 53.3 L11.75 53.3 Z M88.2 51.3 L76.2 52.3 L82.2 46.3 Z",
      "M53.95 51.3 L53.95 89.2 L47.95 89.2 L47.95 51.3 Z",
      "M50.95 68.2 L82.8 68.2 L82.8 70.2 L50.95 70.2 Z M82.8 68.2 L70.8 69.2 L76.8 63.2 Z",
      "M29.95 64 L29.95 89.2 L23.95 89.2 L23.95 63 Z M29.95 64 L31.45 65 L28.95 66.5 Z",
      "M7.85 87.2 L92.1 87.2 L92.1 89.2 L7.85 89.2 Z M92.1 87.2 L80.1 88.2 L86.1 82.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M27.25 11.5 L27.25 44.05 L21.25 47.05 L21.25 8.5 Z",
          "bounds": [
            21.25,
            8.5,
            27.25,
            47.05
          ],
          "direction": "down",
          "weight": 27.02
        }
      ],
      [
        {
          "outline": "M24.25 11.5 L75.75 11.5 L75.75 13.5 L24.25 13.5 Z",
          "bounds": [
            24.25,
            11.5,
            75.75,
            13.5
          ],
          "direction": "right",
          "weight": 51.5
        },
        {
          "outline": "M78.75 12.5 L78.75 42.55 L72.75 45.55 L72.75 12.5 Z M72.75 11.5 L75.75 9 L81.25 13.5 L78.75 15.5 L72.75 12.5 Z",
          "bounds": [
            72.75,
            9,
            81.25,
            45.55
          ],
          "direction": "down",
          "weight": 27.02
        }
      ],
      [
        {
          "outline": "M24.25 25.05 L75.75 25.05 L75.75 27.05 L24.25 27.05 Z",
          "bounds": [
            24.25,
            25.05,
            75.75,
            27.05
          ],
          "direction": "right",
          "weight": 51.5
        }
      ],
      [
        {
          "outline": "M24.25 38.55 L75.75 38.55 L75.75 40.55 L24.25 40.55 Z",
          "bounds": [
            24.25,
            38.55,
            75.75,
            40.55
          ],
          "direction": "right",
          "weight": 51.5
        }
      ],
      [
        {
          "outline": "M11.75 51.3 L88.2 51.3 L88.2 53.3 L11.75 53.3 Z M88.2 51.3 L76.2 52.3 L82.2 46.3 Z",
          "bounds": [
            11.75,
            46.3,
            88.2,
            53.3
          ],
          "direction": "right",
          "weight": 76.44
        }
      ],
      [
        {
          "outline": "M53.95 51.3 L53.95 89.2 L47.95 89.2 L47.95 51.3 Z",
          "bounds": [
            47.95,
            51.3,
            53.95,
            89.2
          ],
          "direction": "down",
          "weight": 35.88
        }
      ],
      [
        {
          "outline": "M50.95 68.2 L82.8 68.2 L82.8 70.2 L50.95 70.2 Z M82.8 68.2 L70.8 69.2 L76.8 63.2 Z",
          "bounds": [
            50.95,
            63.2,
            82.8,
            70.2
          ],
          "direction": "right",
          "weight": 31.85
        }
      ],
      [
        {
          "outline": "M29.95 64 L29.95 89.2 L23.95 89.2 L23.95 63 Z M29.95 64 L31.45 65 L28.95 66.5 Z",
          "bounds": [
            23.95,
            63,
            31.45,
            89.2
          ],
          "direction": "down",
          "weight": 24.7
        }
      ],
      [
        {
          "outline": "M7.85 87.2 L92.1 87.2 L92.1 89.2 L7.85 89.2 Z M92.1 87.2 L80.1 88.2 L86.1 82.2 Z",
          "bounds": [
            7.85,
            82.2,
            92.1,
            89.2
          ],
          "direction": "right",
          "weight": 84.28
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch183Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch183 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH183_STROKES = loadGlyphWikiBatch183Strokes(reviewed)
