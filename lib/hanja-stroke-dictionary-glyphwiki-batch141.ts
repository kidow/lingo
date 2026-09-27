/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch141.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芚",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "9d4f04d318fc56d5ea3ddc3079e119ad7890f2ecf56a31ffb36c472922fb3a3d",
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
    "pathsSha256": "693ae84981cee38fff99f1a599cc6ed831d01ea6bf5f67ac4a2c5b47dff7cd97",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/829A.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/829A.svg",
      "dictionarySvgSha256": "ae85d8619ef2d52e0bed42f00e16a996c56d4131d4c28040ff380699cb64f193",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "c254674febc939e429fe114cede2dc5f81bd46c3954ae69e09517bece5843385",
      "geometryReviewSha256": "c254674febc939e429fe114cede2dc5f81bd46c3954ae69e09517bece5843385",
      "directionReviewSha256": "c254674febc939e429fe114cede2dc5f81bd46c3954ae69e09517bece5843385"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u829a-ue0102@9",
      "revision": "u829a-ue0102@9; ufa5e-03@8; u5c6f-j@3; alias u829a-k@13; observed2026-09-27; source SHA256 b2731ba1a8fb3a2bceb031ebfafcc0b244c2bb2b858cc94c44fabbe229f41d3a",
      "editableSource": "/hanja-strokes/glyphwiki/829a.json",
      "modifications": "Whole 芚 u829a-ue0102@9 and its declared ufa5e-03@8 and u5c6f-j@3, via provider alias u829a-k@13. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5+6;7;8. Preserve both original quadratic primitives, all polygon vertices and exact compound endpoints; normalize winding only. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.5 17.35 L47.5 17.35 L47.5 19.35 L6.5 19.35 Z M47.5 17.35 L35.5 18.35 L41.5 12.35 Z",
      "M35 7.25 L35 27.95 L29 30.95 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
      "M52.5 17.35 L93.5 17.35 L93.5 19.35 L52.5 19.35 Z M93.5 17.35 L81.5 18.35 L87.5 12.35 Z",
      "M71 7.25 L71 27.95 L65 30.95 L65 6.25 Z M71 7.25 L72.5 8.25 L70 9.75 Z",
      "M82.9 37.9 L75.95 38.7 L68.9 39.4 L61.7 40.05 L54.4 40.65 L46.9 41.15 L39.3 41.6 L31.55 42 L23.7 42.3 L15.65 42.45 L7.5 42.45 L7.45 41.55 L15.55 40.55 L23.5 39.6 L31.3 38.7 L39 37.85 L46.55 36.95 L53.9 36 L61.15 35.05 L68.3 34.05 L75.25 33.05 L82.05 32 Z M81.6 32.05 L87.85 37.25 L82.9 37.9 Z M87.85 37.25 L88.05 38.7 L84.25 36.7 Z",
      "M23.5 47.65 L23.5 76.65 L17.5 79.65 L17.5 46.65 Z M23.5 47.65 L25 48.65 L22.5 50.15 Z M20.5 68.65 L77.5 68.65 L77.5 70.65 L20.5 70.65 Z",
      "M80.5 47.65 L80.5 73.65 L74.5 76.65 L74.5 46.65 Z M80.5 47.65 L82 48.65 L79.5 50.15 Z",
      "M51.5 26.7 L51.5 84 L45.5 84 L45.5 25.7 Z M51.5 26.7 L53 27.7 L50.5 29.2 Z M45.5 84 L51.5 84 L50.3 85.8 L48.5 87 L46.7 85.8 Z M51.5 84 L51.5 84.6 L51.6 85.05 L51.7 85.35 L51.75 85.55 L51.85 85.6 L51.95 85.7 L52.1 85.8 L52.4 85.9 L52.85 85.95 L53.5 86 L53.5 92 L52.2 91.95 L50.95 91.7 L49.75 91.3 L48.6 90.7 L47.6 89.85 L46.8 88.85 L46.15 87.75 L45.75 86.5 L45.55 85.3 L45.5 84 Z M53.5 86 L55.6 86.9 L56.5 89 L55.6 91.1 L53.5 92 Z M53.5 86 L90.5 86 L90.5 92 L53.5 92 Z M90.5 86 L92.3 87.2 L93.5 89 L92.3 90.8 L90.5 92 Z M90.5 86 L87.5 86 L90.5 73.5 L91.5 73.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.5 17.35 L47.5 17.35 L47.5 19.35 L6.5 19.35 Z M47.5 17.35 L35.5 18.35 L41.5 12.35 Z",
          "bounds": [
            6.5,
            12.35,
            47.5,
            19.35
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M35 7.25 L35 27.95 L29 30.95 L29 6.25 Z M35 7.25 L36.5 8.25 L34 9.75 Z",
          "bounds": [
            29,
            6.25,
            36.5,
            30.95
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M52.5 17.35 L93.5 17.35 L93.5 19.35 L52.5 19.35 Z M93.5 17.35 L81.5 18.35 L87.5 12.35 Z",
          "bounds": [
            52.5,
            12.35,
            93.5,
            19.35
          ],
          "direction": "right",
          "weight": 41
        }
      ],
      [
        {
          "outline": "M71 7.25 L71 27.95 L65 30.95 L65 6.25 Z M71 7.25 L72.5 8.25 L70 9.75 Z",
          "bounds": [
            65,
            6.25,
            72.5,
            30.95
          ],
          "direction": "down",
          "weight": 22.695
        }
      ],
      [
        {
          "outline": "M82.9 37.9 L75.95 38.7 L68.9 39.4 L61.7 40.05 L54.4 40.65 L46.9 41.15 L39.3 41.6 L31.55 42 L23.7 42.3 L15.65 42.45 L7.5 42.45 L7.45 41.55 L15.55 40.55 L23.5 39.6 L31.3 38.7 L39 37.85 L46.55 36.95 L53.9 36 L61.15 35.05 L68.3 34.05 L75.25 33.05 L82.05 32 Z M81.6 32.05 L87.85 37.25 L82.9 37.9 Z M87.85 37.25 L88.05 38.7 L84.25 36.7 Z",
          "bounds": [
            7.45,
            32,
            88.05,
            42.45
          ],
          "direction": "curve",
          "weight": 75.834043,
          "revealPath": "M83 34.905 Q48.5 39.644999999999996 7.5 42.015",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M23.5 47.65 L23.5 76.65 L17.5 79.65 L17.5 46.65 Z M23.5 47.65 L25 48.65 L22.5 50.15 Z",
          "bounds": [
            17.5,
            46.65,
            25,
            79.65
          ],
          "direction": "down",
          "weight": 22.515
        },
        {
          "outline": "M20.5 68.65 L77.5 68.65 L77.5 70.65 L20.5 70.65 Z",
          "bounds": [
            20.5,
            68.65,
            77.5,
            70.65
          ],
          "direction": "right",
          "weight": 57
        }
      ],
      [
        {
          "outline": "M80.5 47.65 L80.5 73.65 L74.5 76.65 L74.5 46.65 Z M80.5 47.65 L82 48.65 L79.5 50.15 Z",
          "bounds": [
            74.5,
            46.65,
            82,
            76.65
          ],
          "direction": "down",
          "weight": 22.515
        }
      ],
      [
        {
          "outline": "M51.5 26.7 L51.5 84 L45.5 84 L45.5 25.7 Z M51.5 26.7 L53 27.7 L50.5 29.2 Z M45.5 84 L51.5 84 L50.3 85.8 L48.5 87 L46.7 85.8 Z",
          "bounds": [
            45.5,
            25.7,
            53,
            87
          ],
          "direction": "down",
          "weight": 57.805
        },
        {
          "outline": "M51.5 84 L51.5 84.6 L51.6 85.05 L51.7 85.35 L51.75 85.55 L51.85 85.6 L51.95 85.7 L52.1 85.8 L52.4 85.9 L52.85 85.95 L53.5 86 L53.5 92 L52.2 91.95 L50.95 91.7 L49.75 91.3 L48.6 90.7 L47.6 89.85 L46.8 88.85 L46.15 87.75 L45.75 86.5 L45.55 85.3 L45.5 84 Z M53.5 86 L55.6 86.9 L56.5 89 L55.6 91.1 L53.5 92 Z",
          "bounds": [
            45.5,
            84,
            56.5,
            92
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M48.5 84.02 Q48.5 89.02 53.5 89.02",
          "revealWidth": 14
        },
        {
          "outline": "M53.5 86 L90.5 86 L90.5 92 L53.5 92 Z M90.5 86 L92.3 87.2 L93.5 89 L92.3 90.8 L90.5 92 Z M90.5 86 L87.5 86 L90.5 73.5 L91.5 73.5 Z",
          "bounds": [
            53.5,
            73.5,
            93.5,
            92
          ],
          "direction": "right",
          "weight": 37
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch141Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch141 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH141_STROKES = loadGlyphWikiBatch141Strokes(reviewed)
