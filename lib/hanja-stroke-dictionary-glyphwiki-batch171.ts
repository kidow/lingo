/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch171.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "竗",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-03",
    "geometrySource": "2b0e6e871295afc9a37d96537a708778fe96dcf4d508c59fe784b65bbe55668f",
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
      9
    ],
    "pathsSha256": "051c9ab431c66fc8329eec20555c1fa9873fa90e88a3d08b71c8bd206a42121b",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AD7.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7A00/7AD7.svg",
      "dictionarySvgSha256": "af909fb2f8abcaa4269bb163c7a80a00c00c8341d010c63c3d9cb82214fefee5",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9",
      "orderReviewSha256": "bd1192af56be96e87b4ee57373a9ad749f341084780e5185581527af258f72a9",
      "geometryReviewSha256": "bd1192af56be96e87b4ee57373a9ad749f341084780e5185581527af258f72a9",
      "directionReviewSha256": "bd1192af56be96e87b4ee57373a9ad749f341084780e5185581527af258f72a9"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス",
      "sourceUrl": "https://glyphwiki.org/wiki/u7ad7-k@5",
      "revision": "u7ad7-k@5; u7ad7-j@2; u7acb-01@5; u5c11-02@3; observed2026-10-03; source SHA256 1e2e109e1c569d62f0332ef1ca8372300bbdebb92bd77b2262b7102d7a24e489",
      "editableSource": "/hanja-strokes/glyphwiki/7ad7.json",
      "modifications": "Whole 竗 u7ad7-k@5 alias u7ad7-j@2 with only declared u7acb-01@5 and u5c11-02@3. Default mincho new Kage(); scale200to100. Preserve original polygon vertices and continuous pen geometry; normalize winding only. Domestic groups0;1;2;3;4;5;6;7;8. Identity order and original directions. No invented points, bridges, trimming, custom widths or substituted components."
    },
    "paths": [
      "M28.2 9.5 L28.2 30 L22.2 30 L22.2 8.5 Z M28.2 9.5 L29.7 10.5 L27.2 12 Z",
      "M7.15 28 L45.15 28 L45.15 30 L7.15 30 Z M45.15 28 L33.15 29 L39.15 23 Z",
      "M14.35 34.35 L15.7 37.3 L16.9 40.4 L17.95 43.5 L18.85 46.65 L19.7 49.85 L20.4 53.1 L21.05 56.35 L21.55 59.65 L22 62.95 L22.4 66.3 L16.4 66.65 L16.35 63.4 L16.25 60.2 L16.05 56.95 L15.8 53.75 L15.5 50.6 L15.15 47.4 L14.75 44.2 L14.3 41 L13.9 37.8 L13.5 34.6 Z M22.4 66.3 L21.6 68.45 L19.55 69.45 L17.4 68.7 L16.4 66.65 Z",
      "M38.5 34.9 L37.95 37.55 L37.3 40.45 L36.6 43.55 L35.75 46.9 L34.85 50.5 L33.8 54.35 L32.7 58.45 L31.45 62.75 L30.05 67.3 L28.45 72.1 L27.6 71.85 L28.2 66.9 L28.85 62.2 L29.5 57.75 L30.1 53.6 L30.7 49.7 L31.2 46.05 L31.65 42.65 L32 39.5 L32.35 36.65 L32.6 34.05 Z M32.5 34.55 L32.75 33.05 L38.5 34.9 Z M38.5 34.9 L39.85 36.1 L37.15 37.25 Z",
      "M7 79 L10.7 77.75 L14.4 76.5 L18.15 75.25 L22 74 L25.85 72.7 L29.7 71.4 L33.65 70.15 L37.7 68.9 L41.75 67.7 L45.9 66.55 L46.25 67.4 L42.45 69.45 L38.65 71.4 L34.9 73.2 L31.1 74.95 L27.35 76.65 L23.65 78.3 L19.95 79.95 L16.35 81.55 L12.7 83.1 L9.15 84.6 Z M9.15 84.6 L6.05 79.35 L7 79 Z M9.15 84.6 L11.4 82.15 L10.6 85.65 Z",
      "M69.95 8 L69.95 57.5 L63.95 57.5 L63.95 7 Z M69.95 8 L71.45 9 L68.95 10.5 Z M63.95 57.5 L69.95 57.5 L68.75 59.3 L66.95 60.5 L65.15 59.3 Z M69.95 57.5 L69.9 58.75 L69.65 60 L69.25 61.2 L68.65 62.35 L67.85 63.35 L66.8 64.15 L65.7 64.8 L64.5 65.2 L63.25 65.4 L61.95 65.5 L61.95 59.5 L62.6 59.45 L63.05 59.35 L63.35 59.25 L63.5 59.2 L63.6 59.1 L63.65 59 L63.75 58.85 L63.85 58.55 L63.95 58.1 L63.95 57.5 Z M61.95 62.5 L51.95 61 L51.95 59.5 L61.95 59.5 Z",
      "M57 28.55 L56.15 31.65 L55.1 34.7 L53.95 37.65 L52.65 40.55 L51.15 43.4 L49.5 46.15 L47.7 48.85 L45.75 51.45 L43.6 53.9 L41.2 56.25 L40.5 55.7 L42.05 52.8 L43.5 49.95 L44.9 47.15 L46.15 44.35 L47.3 41.55 L48.35 38.75 L49.25 35.95 L50 33.1 L50.65 30.25 L51.15 27.35 Z M51.05 27.85 L51.35 26.45 L57 28.55 Z M57 28.55 L58.3 29.85 L55.55 30.8 Z",
      "M75.6 25.9 L78.05 27.25 L80.3 28.7 L82.4 30.25 L84.4 31.95 L86.25 33.75 L87.95 35.6 L89.55 37.55 L91.05 39.6 L92.35 41.7 L93.6 43.9 L88.1 46.3 L87.3 44.3 L86.4 42.3 L85.4 40.3 L84.25 38.35 L83 36.4 L81.6 34.5 L80.1 32.55 L78.55 30.65 L76.85 28.65 L75.05 26.65 Z M93.6 43.9 L93.6 46.15 L92.05 47.85 L89.8 47.9 L88.1 46.3 Z",
      "M87.1 53.15 L83.85 59.3 L80.15 65.05 L76 70.35 L71.35 75.2 L66.25 79.6 L60.7 83.55 L54.75 87 L48.3 90 L41.4 92.45 L34.05 94.4 L33.8 93.55 L40.75 90.7 L47.15 87.55 L53.1 84.15 L58.55 80.4 L63.55 76.35 L68.05 71.9 L72.15 67.15 L75.75 62.05 L78.9 56.55 L81.6 50.75 Z M81.4 51.2 L81.85 50.1 L87.1 53.15 Z M87.1 53.15 L88.05 54.65 L85.15 55.05 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M28.2 9.5 L28.2 30 L22.2 30 L22.2 8.5 Z M28.2 9.5 L29.7 10.5 L27.2 12 Z",
          "bounds": [
            22.2,
            8.5,
            29.7,
            30
          ],
          "direction": "down",
          "weight": 20
        }
      ],
      [
        {
          "outline": "M7.15 28 L45.15 28 L45.15 30 L7.15 30 Z M45.15 28 L33.15 29 L39.15 23 Z",
          "bounds": [
            7.15,
            23,
            45.15,
            30
          ],
          "direction": "right",
          "weight": 38
        }
      ],
      [
        {
          "outline": "M14.35 34.35 L15.7 37.3 L16.9 40.4 L17.95 43.5 L18.85 46.65 L19.7 49.85 L20.4 53.1 L21.05 56.35 L21.55 59.65 L22 62.95 L22.4 66.3 L16.4 66.65 L16.35 63.4 L16.25 60.2 L16.05 56.95 L15.8 53.75 L15.5 50.6 L15.15 47.4 L14.75 44.2 L14.3 41 L13.9 37.8 L13.5 34.6 Z M22.4 66.3 L21.6 68.45 L19.55 69.45 L17.4 68.7 L16.4 66.65 Z",
          "bounds": [
            13.5,
            34.35,
            22.4,
            69.45
          ],
          "direction": "curve",
          "weight": 34.474483,
          "revealPath": "M13.8 34 Q18.55 50 19.5 68",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M38.5 34.9 L37.95 37.55 L37.3 40.45 L36.6 43.55 L35.75 46.9 L34.85 50.5 L33.8 54.35 L32.7 58.45 L31.45 62.75 L30.05 67.3 L28.45 72.1 L27.6 71.85 L28.2 66.9 L28.85 62.2 L29.5 57.75 L30.1 53.6 L30.7 49.7 L31.2 46.05 L31.65 42.65 L32 39.5 L32.35 36.65 L32.6 34.05 Z M32.5 34.55 L32.75 33.05 L38.5 34.9 Z M38.5 34.9 L39.85 36.1 L37.15 37.25 Z",
          "bounds": [
            27.6,
            33.05,
            39.85,
            72.1
          ],
          "direction": "curve",
          "weight": 38.752548,
          "revealPath": "M35.65 34 Q33.75 47 28.05 72",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7 79 L10.7 77.75 L14.4 76.5 L18.15 75.25 L22 74 L25.85 72.7 L29.7 71.4 L33.65 70.15 L37.7 68.9 L41.75 67.7 L45.9 66.55 L46.25 67.4 L42.45 69.45 L38.65 71.4 L34.9 73.2 L31.1 74.95 L27.35 76.65 L23.65 78.3 L19.95 79.95 L16.35 81.55 L12.7 83.1 L9.15 84.6 Z M9.15 84.6 L6.05 79.35 L7 79 Z M9.15 84.6 L11.4 82.15 L10.6 85.65 Z",
          "bounds": [
            6.05,
            66.55,
            46.25,
            85.65
          ],
          "direction": "curve",
          "weight": 41.295588,
          "revealPath": "M7.625 82 Q26.15 75 46.1 67",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M69.95 8 L69.95 57.5 L63.95 57.5 L63.95 7 Z M69.95 8 L71.45 9 L68.95 10.5 Z M63.95 57.5 L69.95 57.5 L68.75 59.3 L66.95 60.5 L65.15 59.3 Z",
          "bounds": [
            63.95,
            7,
            71.45,
            60.5
          ],
          "direction": "down",
          "weight": 50
        },
        {
          "outline": "M69.95 57.5 L69.9 58.75 L69.65 60 L69.25 61.2 L68.65 62.35 L67.85 63.35 L66.8 64.15 L65.7 64.8 L64.5 65.2 L63.25 65.4 L61.95 65.5 L61.95 59.5 L62.6 59.45 L63.05 59.35 L63.35 59.25 L63.5 59.2 L63.6 59.1 L63.65 59 L63.75 58.85 L63.85 58.55 L63.95 58.1 L63.95 57.5 Z M61.95 62.5 L51.95 61 L51.95 59.5 L61.95 59.5 Z",
          "bounds": [
            51.95,
            57.5,
            69.95,
            65.5
          ],
          "direction": "curve",
          "weight": 7.071068,
          "revealPath": "M66.985 57.5 Q66.985 62.5 61.985 62.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57 28.55 L56.15 31.65 L55.1 34.7 L53.95 37.65 L52.65 40.55 L51.15 43.4 L49.5 46.15 L47.7 48.85 L45.75 51.45 L43.6 53.9 L41.2 56.25 L40.5 55.7 L42.05 52.8 L43.5 49.95 L44.9 47.15 L46.15 44.35 L47.3 41.55 L48.35 38.75 L49.25 35.95 L50 33.1 L50.65 30.25 L51.15 27.35 Z M51.05 27.85 L51.35 26.45 L57 28.55 Z M57 28.55 L58.3 29.85 L55.55 30.8 Z",
          "bounds": [
            40.5,
            26.45,
            58.3,
            56.25
          ],
          "direction": "curve",
          "weight": 31.455884,
          "revealPath": "M54.205 27.5 Q51.01 43 40.8925 56",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.6 25.9 L78.05 27.25 L80.3 28.7 L82.4 30.25 L84.4 31.95 L86.25 33.75 L87.95 35.6 L89.55 37.55 L91.05 39.6 L92.35 41.7 L93.6 43.9 L88.1 46.3 L87.3 44.3 L86.4 42.3 L85.4 40.3 L84.25 38.35 L83 36.4 L81.6 34.5 L80.1 32.55 L78.55 30.65 L76.85 28.65 L75.05 26.65 Z M93.6 43.9 L93.6 46.15 L92.05 47.85 L89.8 47.9 L88.1 46.3 Z",
          "bounds": [
            75.05,
            25.9,
            93.6,
            47.9
          ],
          "direction": "curve",
          "weight": 26.320098,
          "revealPath": "M74.9725 26 Q86.155 34.5 91.48 46.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M87.1 53.15 L83.85 59.3 L80.15 65.05 L76 70.35 L71.35 75.2 L66.25 79.6 L60.7 83.55 L54.75 87 L48.3 90 L41.4 92.45 L34.05 94.4 L33.8 93.55 L40.75 90.7 L47.15 87.55 L53.1 84.15 L58.55 80.4 L63.55 76.35 L68.05 71.9 L72.15 67.15 L75.75 62.05 L78.9 56.55 L81.6 50.75 Z M81.4 51.2 L81.85 50.1 L87.1 53.15 Z M87.1 53.15 L88.05 54.65 L85.15 55.05 Z",
          "bounds": [
            33.8,
            50.1,
            88.05,
            94.4
          ],
          "direction": "curve",
          "weight": 66.070759,
          "revealPath": "M84.5575 51.5 Q70.7125 83 33.97 94",
          "revealWidth": 14
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch171Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch171 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH171_STROKES = loadGlyphWikiBatch171Strokes(reviewed)
