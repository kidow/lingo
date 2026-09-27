/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch149.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "芹",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "c59481cb47605276ea0db903ceb340a0cf9943c7d4087be83e123d5774079533",
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
    "pathsSha256": "0a5b466729b6d36cb9201d750bd0b4465868b513607b6481696772de6633f147",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82B9.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8200/82B9.svg",
      "dictionarySvgSha256": "e67d3f554fd13434e34f5f8cf8ae55f197aaa639b3aaa9559f83b0527ef044a3",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8",
      "orderReviewSha256": "93d34de8d3764eeaf0a607da0d701fb6abb5c03e61c68b1f1495efff84f4d5e3",
      "geometryReviewSha256": "93d34de8d3764eeaf0a607da0d701fb6abb5c03e61c68b1f1495efff84f4d5e3",
      "directionReviewSha256": "93d34de8d3764eeaf0a607da0d701fb6abb5c03e61c68b1f1495efff84f4d5e3"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u82b9-ue0102@11",
      "revision": "u82b9-ue0102@11; ufa5e-03@8; u65a4-j@4; alias u82b9-k@11; observed2026-09-27; source SHA256 5bf3e0f896cab12d7ba7775a4f27b4bcf461f7f998631b2b5b6e107ccfc0c48e",
      "editableSource": "/hanja-strokes/glyphwiki/82b9.json",
      "modifications": "Whole 芹 u82b9-ue0102@11 via provider alias u82b9-k@11, with exactly declared ufa5e-03@8 and u65a4-j@4. Default mincho new Kage(); scale 200 to 100. Domestic order uses original raw groups 0;1;3;2;4;5;6;7. Preserve both original quadratics and all polygon vertices; normalize winding only. Sixth stroke retains its exactly connected original line and quadratic. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M6.45 15.85 L47.25 15.85 L47.25 17.85 L6.45 17.85 Z M47.25 15.85 L35.25 16.85 L41.25 10.85 Z",
      "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
      "M52.2 15.85 L93 15.85 L93 17.85 L52.2 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
      "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
      "M75.75 36.8 L72.15 37.55 L68.25 38.25 L64.05 38.95 L59.45 39.6 L54.6 40.25 L49.35 40.85 L43.8 41.45 L37.9 41.95 L31.65 42.4 L25.05 42.7 L24.9 41.8 L31.4 40.5 L37.5 39.3 L43.3 38.15 L48.75 37.1 L53.9 36.05 L58.65 35 L63.05 34 L67.15 33 L70.85 32 L74.25 31 Z M73.75 31.15 L79.45 35.85 L75.75 36.8 Z M79.45 35.85 L79.6 37.4 L76.05 35.7 Z",
      "M28 40.9 L28 59.5 L22 59.5 L22 37.9 Z M22 59.5 L28 59.5 L26.8 61.3 L25 62.5 L23.2 61.3 Z M28 59.5 L27.65 64.3 L26.9 68.85 L25.7 73.05 L24.15 77 L22.2 80.6 L19.85 83.85 L17.1 86.75 L14 89.25 L10.5 91.35 L6.7 93 L6.25 92.2 L9.45 89.75 L12.3 87.2 L14.7 84.5 L16.8 81.6 L18.5 78.5 L19.85 75.2 L20.9 71.7 L21.6 67.9 L21.95 63.85 L22 59.5 Z",
      "M25 55.2 L92.5 55.2 L92.5 57.2 L25 57.2 Z M92.5 55.2 L80.5 56.2 L86.5 50.2 Z",
      "M63.5 55.2 L63.5 91.85 L57.5 94.85 L57.5 55.2 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.85 L47.25 15.85 L47.25 17.85 L6.45 17.85 Z M47.25 15.85 L35.25 16.85 L41.25 10.85 Z",
          "bounds": [
            6.45,
            10.85,
            47.25,
            17.85
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M34.8 6.45 L34.8 25.85 L28.8 28.85 L28.8 5.45 Z M34.8 6.45 L36.3 7.45 L33.8 8.95 Z",
          "bounds": [
            28.8,
            5.45,
            36.3,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M52.2 15.85 L93 15.85 L93 17.85 L52.2 17.85 Z M93 15.85 L81 16.85 L87 10.85 Z",
          "bounds": [
            52.2,
            10.85,
            93,
            17.85
          ],
          "direction": "right",
          "weight": 40.795
        }
      ],
      [
        {
          "outline": "M70.65 6.45 L70.65 25.85 L64.65 28.85 L64.65 5.45 Z M70.65 6.45 L72.15 7.45 L69.65 8.95 Z",
          "bounds": [
            64.65,
            5.45,
            72.15,
            28.85
          ],
          "direction": "down",
          "weight": 21.42
        }
      ],
      [
        {
          "outline": "M75.75 36.8 L72.15 37.55 L68.25 38.25 L64.05 38.95 L59.45 39.6 L54.6 40.25 L49.35 40.85 L43.8 41.45 L37.9 41.95 L31.65 42.4 L25.05 42.7 L24.9 41.8 L31.4 40.5 L37.5 39.3 L43.3 38.15 L48.75 37.1 L53.9 36.05 L58.65 35 L63.05 34 L67.15 33 L70.85 32 L74.25 31 Z M73.75 31.15 L79.45 35.85 L75.75 36.8 Z M79.45 35.85 L79.6 37.4 L76.05 35.7 Z",
          "bounds": [
            24.9,
            31,
            79.6,
            42.7
          ],
          "direction": "curve",
          "weight": 51.202488,
          "revealPath": "M75.5 33.82 Q58.5 38.230000000000004 25 42.2725",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28 40.9 L28 59.5 L22 59.5 L22 37.9 Z M22 59.5 L28 59.5 L26.8 61.3 L25 62.5 L23.2 61.3 Z",
          "bounds": [
            22,
            37.9,
            28,
            62.5
          ],
          "direction": "down",
          "weight": 17.64
        },
        {
          "outline": "M28 59.5 L27.65 64.3 L26.9 68.85 L25.7 73.05 L24.15 77 L22.2 80.6 L19.85 83.85 L17.1 86.75 L14 89.25 L10.5 91.35 L6.7 93 L6.25 92.2 L9.45 89.75 L12.3 87.2 L14.7 84.5 L16.8 81.6 L18.5 78.5 L19.85 75.2 L20.9 71.7 L21.6 67.9 L21.95 63.85 L22 59.5 Z",
          "bounds": [
            6.25,
            59.5,
            28,
            93
          ],
          "direction": "curve",
          "weight": 37.897304,
          "revealPath": "M25 59.545 Q25 83.065 6.5 92.62",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25 55.2 L92.5 55.2 L92.5 57.2 L25 57.2 Z M92.5 55.2 L80.5 56.2 L86.5 50.2 Z",
          "bounds": [
            25,
            50.2,
            92.5,
            57.2
          ],
          "direction": "right",
          "weight": 67.5
        }
      ],
      [
        {
          "outline": "M63.5 55.2 L63.5 91.85 L57.5 94.85 L57.5 55.2 Z",
          "bounds": [
            57.5,
            55.2,
            63.5,
            94.85
          ],
          "direction": "down",
          "weight": 37.1175
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch149Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch149 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH149_STROKES = loadGlyphWikiBatch149Strokes(reviewed)
