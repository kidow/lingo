/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch148.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芩",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "97b6df2bff0a7dcaeb6c31a39db5edb72358197637fb81c3d958aa8d929df48b",
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
    "pathsSha256": "f0980401df2fc741635beb63100c16b10c377d4240030c382d3acc0fcc217b5f",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A9.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82A9.svg",
      "dictionarySvgSha256": "aa63354d8cb51e8578c5184d7970fee7b49e5c0ccc07f55367267a006557723c",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "f9b0c3f98f734c77733eae9827750e061f4c93bab656fb20eef4d8cfab87f9a4",
      "geometryReviewSha256": "f9b0c3f98f734c77733eae9827750e061f4c93bab656fb20eef4d8cfab87f9a4",
      "directionReviewSha256": "f9b0c3f98f734c77733eae9827750e061f4c93bab656fb20eef4d8cfab87f9a4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/koseki-343390@13",
      "revision": "koseki-343390@13; u4eca-j@5; u201a2-03@2; u2a70a-var-003@1; ufa5e-03@8; alias u82a9-k@13; observed2026-09-27; source SHA256 78881731d50f8e5d2cfc76ca3bd71f90b33899478b9c3d034bae42e510e5f957",
      "editableSource": "/hanja-strokes/glyphwiki/82a9.json",
      "modifications": "Whole 芩 koseki-343390@13 via provider alias u82a9-k@13, with exactly declared ufa5e-03@8, u4eca-j@5, u201a2-03@2 and u2a70a-var-003@1. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5;6;7,8. Preserve both quadratic primitives, exact final diagonal line endpoints, and all polygon vertices; normalize winding only. Original horizontal and diagonal meet exactly and form the domestic eighth stroke. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 17.5 L47.5 17.5 L47.5 19.5 L6.5 19.5 Z M47.5 17.5 L35.5 18.5 L41.5 12.5 Z",
      "M35 6.65 L35 28.9 L29 31.9 L29 5.65 Z M35 6.65 L36.5 7.65 L34 9.15 Z",
      "M52.5 17.5 L93.5 17.5 L93.5 19.5 L52.5 19.5 Z M93.5 17.5 L81.5 18.5 L87.5 12.5 Z",
      "M71 6.65 L71 28.9 L65 31.9 L65 5.65 Z M71 6.65 L72.5 7.65 L70 9.15 Z",
      "M53.15 27.25 L49.45 31.9 L45.55 36.35 L41.35 40.45 L36.95 44.3 L32.35 47.9 L27.45 51.2 L22.35 54.2 L17.05 56.85 L11.45 59.2 L5.65 61.15 L5.3 60.35 L10.65 57.5 L15.75 54.5 L20.65 51.4 L25.3 48.05 L29.7 44.55 L33.9 40.85 L37.85 36.9 L41.55 32.75 L45 28.4 L48.25 23.8 Z M47.95 24.2 L48.45 23.45 L53.15 27.25 Z M53.15 27.25 L53.8 28.9 L50.9 28.7 Z",
      "M49.65 26.5 L53.55 30.05 L57.45 33.4 L61.35 36.55 L65.25 39.5 L69.3 42.25 L73.4 44.7 L77.55 47 L81.8 49 L86.15 50.8 L90.6 52.35 L88.35 58.6 L83.7 56.55 L79.2 54.3 L74.85 51.8 L70.65 49.05 L66.6 46.05 L62.65 42.8 L58.95 39.25 L55.35 35.5 L52.05 31.45 L48.95 27.1 Z M88.35 58.6 L90.6 52.35 L94.1 53.65 Z",
      "M29.7 53.4 L68.5 53.4 L68.5 55.4 L29.7 55.4 Z M68.5 53.4 L56.5 54.4 L62.5 48.4 Z",
      "M21.35 66 L75.4 66 L75.4 68 L21.35 68 Z M78.4 67.5 L61.65 93.05 L55 92.25 L71.75 67 Z M72.4 66 L75.4 63.5 L80.9 68 L78.4 69.5 L72.4 72 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 17.5 L47.5 17.5 L47.5 19.5 L6.5 19.5 Z M47.5 17.5 L35.5 18.5 L41.5 12.5 Z",
          "bounds": [
            6.5,
            12.5,
            47.5,
            19.5
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 6.65 L35 28.9 L29 31.9 L29 5.65 Z M35 6.65 L36.5 7.65 L34 9.15 Z",
          "bounds": [
            29,
            5.65,
            36.5,
            31.9
          ],
          "direction": "down",
          "weight": 24.225
        }
      ],
      [
        {
          "outline": "M52.5 17.5 L93.5 17.5 L93.5 19.5 L52.5 19.5 Z M93.5 17.5 L81.5 18.5 L87.5 12.5 Z",
          "bounds": [
            52.5,
            12.5,
            93.5,
            19.5
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 6.65 L71 28.9 L65 31.9 L65 5.65 Z M71 6.65 L72.5 7.65 L70 9.15 Z",
          "bounds": [
            65,
            5.65,
            72.5,
            31.9
          ],
          "direction": "down",
          "weight": 24.225
        }
      ],
      [
        {
          "outline": "M53.15 27.25 L49.45 31.9 L45.55 36.35 L41.35 40.45 L36.95 44.3 L32.35 47.9 L27.45 51.2 L22.35 54.2 L17.05 56.85 L11.45 59.2 L5.65 61.15 L5.3 60.35 L10.65 57.5 L15.75 54.5 L20.65 51.4 L25.3 48.05 L29.7 44.55 L33.9 40.85 L37.85 36.9 L41.55 32.75 L45 28.4 L48.25 23.8 Z M47.95 24.2 L48.45 23.45 L53.15 27.25 Z M53.15 27.25 L53.8 28.9 L50.9 28.7 Z",
          "bounds": [
            5.3,
            23.45,
            53.8,
            61.15
          ],
          "direction": "curve",
          "weight": 57.801704,
          "revealPath": "M51 25.1341 Q34 49.339600000000004 5.5 60.7822",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.65 26.5 L53.55 30.05 L57.45 33.4 L61.35 36.55 L65.25 39.5 L69.3 42.25 L73.4 44.7 L77.55 47 L81.8 49 L86.15 50.8 L90.6 52.35 L88.35 58.6 L83.7 56.55 L79.2 54.3 L74.85 51.8 L70.65 49.05 L66.6 46.05 L62.65 42.8 L58.95 39.25 L55.35 35.5 L52.05 31.45 L48.95 27.1 Z M88.35 58.6 L90.6 52.35 L94.1 53.65 Z",
          "bounds": [
            48.95,
            26.5,
            94.1,
            58.6
          ],
          "direction": "curve",
          "weight": 49.839291,
          "revealPath": "M49 26.4544 Q66.5 47.1391 89.5 55.501",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M29.7 53.4 L68.5 53.4 L68.5 55.4 L29.7 55.4 Z M68.5 53.4 L56.5 54.4 L62.5 48.4 Z",
          "bounds": [
            29.7,
            48.4,
            68.5,
            55.4
          ],
          "direction": "right",
          "weight": 38.7875
        }
      ],
      [
        {
          "outline": "M21.35 66 L75.4 66 L75.4 68 L21.35 68 Z",
          "bounds": [
            21.35,
            66,
            75.4,
            68
          ],
          "direction": "right",
          "weight": 54.0125
        },
        {
          "outline": "M78.4 67.5 L61.65 93.05 L55 92.25 L71.75 67 Z M72.4 66 L75.4 63.5 L80.9 68 L78.4 69.5 L72.4 72 Z",
          "bounds": [
            55,
            63.5,
            80.9,
            93.05
          ],
          "direction": "curve",
          "weight": 30.811583,
          "revealPath": "M75.4 67.00472500000001 L58.3625 92.67722499999999",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch148Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch148 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH148_STROKES = loadGlyphWikiBatch148Strokes(reviewed)
