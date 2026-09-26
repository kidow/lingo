/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch94.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "宂",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "0a617204b3d3d337e325034e05cfb1635c5a173e384b98b9b6b2842cd3a51860",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5
    ],
    "pathsSha256": "f46116c8169c57d501acc238308458769f4819558ce64a31d38d28ea08fe095b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B82.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5B00/5B82.svg",
      "dictionarySvgSha256": "18f828769bfe6a8af0b94ede7d410997e77d9e4d0fc75e117e3cbb25ad59615f",
      "dictionaryDirectionStrokes": "1,2,3,4,5",
      "orderReviewSha256": "24e306b731dbfeaca11dc09f900645efdd30d532aedeef74b1d773e53b71d3d1",
      "geometryReviewSha256": "24e306b731dbfeaca11dc09f900645efdd30d532aedeef74b1d773e53b71d3d1",
      "directionReviewSha256": "24e306b731dbfeaca11dc09f900645efdd30d532aedeef74b1d773e53b71d3d1"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/5b82.json",
      "modifications": "Whole 宂 u5b82 from the pinned 2016 GlyphWiki backup scaled200 to100, using original default gothic preset (new Kage(); k.kShotai=k.kGothic). Original groups2+3 form domestic roof stroke3; all other groups retain domestic order. Five original quadratic primitives and all polygon vertices preserved, winding normalized. No custom widths, invented points, bridges, trims or component substitutions."
    },
    "paths": [
      "M49.25 7.7 L54.25 7.7 L54.25 27.25 L49.25 27.25 Z",
      "M21.95 17.75 L22 21.4 L21.85 24.8 L21.5 28 L21 30.95 L20.35 33.7 L19.5 36.25 L18.45 38.55 L17.2 40.6 L15.7 42.45 L14 44 L10.9 40.1 L12.05 39.05 L13.1 37.75 L14 36.2 L14.85 34.4 L15.55 32.3 L16.1 29.95 L16.55 27.35 L16.85 24.45 L17 21.3 L16.95 17.85 Z",
      "M19.95 22.7 L89.75 22.7 L89.75 27.7 L19.95 27.7 Z M89.5 26.3 L88.9 27.55 L88.2 28.9 L87.45 30.35 L86.6 31.85 L85.65 33.4 L84.7 35.05 L83.6 36.8 L82.5 38.6 L81.25 40.5 L80 42.45 L75.8 39.7 L77.1 37.75 L78.25 35.9 L79.35 34.15 L80.4 32.5 L81.35 30.9 L82.25 29.35 L83.05 27.95 L83.75 26.6 L84.4 25.35 L85 24.15 Z",
      "M36.5 39.5 L41.5 39.5 L41.5 55.5 L36.5 55.5 Z M41.5 55.5 L41.15 61.45 L40.2 67.05 L38.6 72.25 L36.35 77 L33.45 81.4 L29.9 85.3 L25.75 88.75 L20.95 91.75 L15.6 94.3 L9.7 96.35 L8.25 91.6 L13.75 89.65 L18.6 87.35 L22.8 84.7 L26.45 81.7 L29.5 78.3 L32 74.55 L33.95 70.45 L35.35 65.9 L36.2 60.9 L36.5 55.5 Z",
      "M60.5 39.5 L65.5 39.5 L65.5 84.5 L60.5 84.5 Z M65.5 84.5 L65.5 85.15 L65.6 85.65 L65.7 86.05 L65.85 86.3 L66 86.45 L66.15 86.6 L66.4 86.75 L66.8 86.85 L67.3 86.95 L68 87 L68 92 L66.75 91.9 L65.55 91.7 L64.45 91.3 L63.4 90.75 L62.45 90 L61.7 89.05 L61.15 88 L60.75 86.9 L60.55 85.7 L60.5 84.5 Z M68 87 L84.5 87 L84.5 92 L68 92 Z M84.5 87 L84.95 86.95 L85.35 86.8 L85.8 86.55 L86.3 86.1 L86.85 85.5 L87.4 84.6 L88 83.5 L88.55 82.2 L89.05 80.65 L89.55 78.85 L94.4 80.1 L93.85 82.1 L93.2 83.95 L92.5 85.65 L91.75 87.15 L90.85 88.5 L89.85 89.65 L88.7 90.6 L87.4 91.35 L85.95 91.8 L84.5 92 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M49.25 7.7 L54.25 7.7 L54.25 27.25 L49.25 27.25 Z",
          "bounds": [
            49.25,
            7.7,
            54.25,
            27.25
          ],
          "direction": "down",
          "weight": 17.05
        }
      ],
      [
        {
          "outline": "M21.95 17.75 L22 21.4 L21.85 24.8 L21.5 28 L21 30.95 L20.35 33.7 L19.5 36.25 L18.45 38.55 L17.2 40.6 L15.7 42.45 L14 44 L10.9 40.1 L12.05 39.05 L13.1 37.75 L14 36.2 L14.85 34.4 L15.55 32.3 L16.1 29.95 L16.55 27.35 L16.85 24.45 L17 21.3 L16.95 17.85 Z",
          "bounds": [
            10.9,
            17.75,
            22,
            44
          ],
          "direction": "curve",
          "weight": 25.24837,
          "revealPath": "M19.4925 17.82 Q19.96 36.135 12.48 42.075",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M19.95 22.7 L89.75 22.7 L89.75 27.7 L19.95 27.7 Z",
          "bounds": [
            19.95,
            22.7,
            89.75,
            27.7
          ],
          "direction": "right",
          "weight": 67.32
        },
        {
          "outline": "M89.5 26.3 L88.9 27.55 L88.2 28.9 L87.45 30.35 L86.6 31.85 L85.65 33.4 L84.7 35.05 L83.6 36.8 L82.5 38.6 L81.25 40.5 L80 42.45 L75.8 39.7 L77.1 37.75 L78.25 35.9 L79.35 34.15 L80.4 32.5 L81.35 30.9 L82.25 29.35 L83.05 27.95 L83.75 26.6 L84.4 25.35 L85 24.15 Z",
          "bounds": [
            75.8,
            24.15,
            89.5,
            42.45
          ],
          "direction": "curve",
          "weight": 18.393697,
          "revealPath": "M87.28 25.245 Q84.475 31.185 77.93 41.085",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M36.5 39.5 L41.5 39.5 L41.5 55.5 L36.5 55.5 Z",
          "bounds": [
            36.5,
            39.5,
            41.5,
            55.5
          ],
          "direction": "down",
          "weight": 16
        },
        {
          "outline": "M41.5 55.5 L41.15 61.45 L40.2 67.05 L38.6 72.25 L36.35 77 L33.45 81.4 L29.9 85.3 L25.75 88.75 L20.95 91.75 L15.6 94.3 L9.7 96.35 L8.25 91.6 L13.75 89.65 L18.6 87.35 L22.8 84.7 L26.45 81.7 L29.5 78.3 L32 74.55 L33.95 70.45 L35.35 65.9 L36.2 60.9 L36.5 55.5 Z",
          "bounds": [
            8.25,
            55.5,
            41.5,
            96.35
          ],
          "direction": "curve",
          "weight": 48.808298,
          "revealPath": "M39 55.5 Q39 85 9 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M60.5 39.5 L65.5 39.5 L65.5 84.5 L60.5 84.5 Z",
          "bounds": [
            60.5,
            39.5,
            65.5,
            84.5
          ],
          "direction": "down",
          "weight": 45
        },
        {
          "outline": "M65.5 84.5 L65.5 85.15 L65.6 85.65 L65.7 86.05 L65.85 86.3 L66 86.45 L66.15 86.6 L66.4 86.75 L66.8 86.85 L67.3 86.95 L68 87 L68 92 L66.75 91.9 L65.55 91.7 L64.45 91.3 L63.4 90.75 L62.45 90 L61.7 89.05 L61.15 88 L60.75 86.9 L60.55 85.7 L60.5 84.5 Z",
          "bounds": [
            60.5,
            84.5,
            68,
            92
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M63 84.5 Q63 89.5 68 89.5",
          "revealWidth": 14
        },
        {
          "outline": "M68 87 L84.5 87 L84.5 92 L68 92 Z",
          "bounds": [
            68,
            87,
            84.5,
            92
          ],
          "direction": "right",
          "weight": 16.5
        },
        {
          "outline": "M84.5 87 L84.95 86.95 L85.35 86.8 L85.8 86.55 L86.3 86.1 L86.85 85.5 L87.4 84.6 L88 83.5 L88.55 82.2 L89.05 80.65 L89.55 78.85 L94.4 80.1 L93.85 82.1 L93.2 83.95 L92.5 85.65 L91.75 87.15 L90.85 88.5 L89.85 89.65 L88.7 90.6 L87.4 91.35 L85.95 91.8 L84.5 92 Z",
          "bounds": [
            84.5,
            78.85,
            94.4,
            92
          ],
          "direction": "curve",
          "weight": 12.5,
          "revealPath": "M84.5 89.5 Q89.5 89.5 92 79.5",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch94Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch94 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH94_STROKES = loadGlyphWikiBatch94Strokes(reviewed)
