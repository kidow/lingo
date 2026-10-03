/** Whole-glyph provider geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch215.json' with { type: 'json' }
import type { HanjaVariantStrokeData } from './hanja-stroke-variants.ts'
const EXPECTED = [
  {
    "glyph": "珷",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-04",
    "geometrySource": "9a6e6c2fd78b6428d6b17c15c2ee7c8f9bbb9aca5d8d35aee214995edba78891",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13
    ],
    "pathsSha256": "9620b83b52c69c847b47b5caf4ad0af4b4595253d4845ecc3104ce5b908721eb",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73f7.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7300/73f7.svg",
      "dictionarySvgSha256": "6246b2e197bef949ebacac6fe65f0330e92cbcc10d44cb2b59e7b1991323607e",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "496d1fd24c655b257b75c7f0ebc7c0965d759340e2c743f9dcea4e1a8934673d",
      "geometryReviewSha256": "496d1fd24c655b257b75c7f0ebc7c0965d759340e2c743f9dcea4e1a8934673d",
      "directionReviewSha256": "496d1fd24c655b257b75c7f0ebc7c0965d759340e2c743f9dcea4e1a8934673d"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016 latest-only snapshot a7dd7f3d911936770fa742e8c37d16bee7e2173c; archive SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62; exact whole u73f7-k/u73f7/u738b-01/u6b66/u6b62-06; individual glyph revisions unavailable; source SHA256 3ee515d3dac661d6ad34c96ef29ee9b1a81deb2b1b0db9528fb00e660fa6726c",
      "editableSource": "/hanja-strokes/glyphwiki/73f7.json",
      "modifications": "All12 dictionary directions/cumulative states, full form and108 progressive frames reviewed in Codex in-app browser. Catalog11 kept unchanged; dictionary IDs U73F7d1 through U73F7d12 establish12 replay strokes, reviewed as an explicitly separate dictionary playback variant. Exact whole u73f7-k/u73f7 and only declared u738b-01/u6b66/u6b62-06. Five archive records; individual glyph revisions unavailable. No radical transplant. Observed domestic 玉 order uses raw0,2,1,3. Original zero-output raw4 is retained with raw5 and creates no phantom stroke. Three Q and one C retain exact start/control/end points. Cubic end15 source terminal-hook decoration retained with no invented centerline. Normalize200to100 and polygon winding only. No bridge, trimming, reversal, source splitting or width corrections; geometry licensing and domestic evidence distinct from exam-body official approval."
    },
    "paths": [
      "M7 20 L37.5 20 L37.5 22 L7 22 Z M37.5 20 L25.5 21 L31.5 15 Z",
      "M8.5 45.5 L36 45.5 L36 47.5 L8.5 47.5 Z M36 45.5 L24 46.5 L30 40.5 Z",
      "M23.5 20 L23.5 75.5 L17.5 75.5 L17.5 20 Z",
      "M6.45 77 L9.35 76.15 L12.3 75.25 L15.3 74.3 L18.4 73.35 L21.55 72.35 L24.85 71.3 L28.15 70.2 L31.6 69.15 L35.15 68.05 L38.8 67.05 L39.15 67.9 L35.9 69.8 L32.65 71.6 L29.4 73.25 L26.25 74.8 L23.1 76.3 L20.05 77.7 L17.05 79 L14.1 80.3 L11.25 81.5 L8.45 82.65 Z M8.45 82.65 L5.5 77.3 L6.45 77 Z M8.45 82.65 L10.75 80.25 L9.85 83.75 Z",
      "M37.8 17.5 L65.5 17.5 L65.5 19.5 L37.8 19.5 Z M65.5 17.5 L53.5 18.5 L59.5 12.5 Z",
      "M32.4 32 L93.6 32 L93.6 34 L32.4 34 Z M93.6 32 L83.6 33 L88.6 27.5 Z",
      "M56.75 39 L56.75 83.5 L51.25 83.5 L51.25 38 Z M56.75 39 L58.1 40 L55.75 41.5 Z",
      "M54 56 L69.1 56 L69.1 58 L54 58 Z M69.1 56 L61.1 57 L65.1 52.5 Z",
      "M44.85 48.5 L44.85 86.5 L39.35 86.5 L39.35 47.5 Z M44.85 48.5 L46.2 49.5 L43.85 51 Z",
      "M33.3 85.45 L36.85 84.8 L40.45 84.05 L44.2 83.25 L48 82.35 L51.95 81.4 L56 80.4 L60.15 79.35 L64.4 78.25 L68.75 77.15 L73.25 76.05 L73.55 76.9 L69.4 78.95 L65.25 80.8 L61.15 82.45 L57.15 84.05 L53.2 85.5 L49.3 86.85 L45.5 88.1 L41.8 89.25 L38.15 90.3 L34.6 91.3 Z M34.6 91.3 L32.3 85.65 L33.3 85.45 Z M34.6 91.3 L37.2 89.2 L35.9 92.55 Z",
      "M73.9 9 L74.15 24 L74.95 37.4 L76.2 49.25 L77.85 59.45 L79.8 68.05 L82.1 75 L84.55 80.2 L87 83.7 L89.25 85.5 L91.05 86 L91.05 92 L86.5 90.85 L82.6 87.8 L79.35 83.2 L76.5 77.15 L74.05 69.65 L71.95 60.6 L70.25 50 L68.95 37.9 L68.15 24.2 L67.9 9 Z M67.9 9.5 L67.9 7.8 L73.9 9 Z M73.9 9 L75.4 10 L72.9 11.5 Z M91.05 86 L93.15 86.9 L94.05 89 L93.15 91.1 L91.05 92 Z M91.05 86.5 L88.05 86.5 L91.05 73.5 L92.05 73.5 Z",
      "M76.95 9.95 L78.25 10.9 L79.6 11.75 L80.85 12.7 L82.05 13.75 L83.15 14.9 L84.2 16.1 L85.15 17.4 L86.05 18.7 L86.9 20.15 L87.65 21.6 L81.95 23.5 L81.7 22.2 L81.35 20.9 L81 19.6 L80.5 18.3 L80 17 L79.4 15.7 L78.8 14.45 L78.05 13.15 L77.35 11.8 L76.35 10.65 Z M87.65 21.6 L87.5 23.85 L85.8 25.4 L83.5 25.2 L81.95 23.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M7 20 L37.5 20 L37.5 22 L7 22 Z M37.5 20 L25.5 21 L31.5 15 Z",
          "bounds": [
            7,
            15,
            37.5,
            22
          ],
          "direction": "right",
          "weight": 30.5
        }
      ],
      [
        {
          "outline": "M8.5 45.5 L36 45.5 L36 47.5 L8.5 47.5 Z M36 45.5 L24 46.5 L30 40.5 Z",
          "bounds": [
            8.5,
            40.5,
            36,
            47.5
          ],
          "direction": "right",
          "weight": 27.5
        }
      ],
      [
        {
          "outline": "M23.5 20 L23.5 75.5 L17.5 75.5 L17.5 20 Z",
          "bounds": [
            17.5,
            20,
            23.5,
            75.5
          ],
          "direction": "down",
          "weight": 53.5
        }
      ],
      [
        {
          "outline": "M6.45 77 L9.35 76.15 L12.3 75.25 L15.3 74.3 L18.4 73.35 L21.55 72.35 L24.85 71.3 L28.15 70.2 L31.6 69.15 L35.15 68.05 L38.8 67.05 L39.15 67.9 L35.9 69.8 L32.65 71.6 L29.4 73.25 L26.25 74.8 L23.1 76.3 L20.05 77.7 L17.05 79 L14.1 80.3 L11.25 81.5 L8.45 82.65 Z M8.45 82.65 L5.5 77.3 L6.45 77 Z M8.45 82.65 L10.75 80.25 L9.85 83.75 Z",
          "bounds": [
            5.5,
            67.05,
            39.15,
            83.75
          ],
          "direction": "curve",
          "weight": 34.354767,
          "revealPath": "M7 80 Q21.5 75 39 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M37.8 17.5 L65.5 17.5 L65.5 19.5 L37.8 19.5 Z M65.5 17.5 L53.5 18.5 L59.5 12.5 Z",
          "bounds": [
            37.8,
            12.5,
            65.5,
            19.5
          ],
          "direction": "right",
          "weight": 27.72
        }
      ],
      [
        {
          "outline": "M32.4 32 L93.6 32 L93.6 34 L32.4 34 Z M93.6 32 L83.6 33 L88.6 27.5 Z",
          "bounds": [
            32.4,
            27.5,
            93.6,
            34
          ],
          "direction": "right",
          "weight": 61.2
        }
      ],
      [
        {
          "outline": "M56.75 39 L56.75 83.5 L51.25 83.5 L51.25 38 Z M56.75 39 L58.1 40 L55.75 41.5 Z",
          "bounds": [
            51.25,
            38,
            58.1,
            83.5
          ],
          "direction": "down",
          "weight": 44
        }
      ],
      [
        {
          "outline": "M54 56 L69.1 56 L69.1 58 L54 58 Z M69.1 56 L61.1 57 L65.1 52.5 Z",
          "bounds": [
            54,
            52.5,
            69.1,
            58
          ],
          "direction": "right",
          "weight": 15.12
        }
      ],
      [
        {
          "outline": "M44.85 48.5 L44.85 86.5 L39.35 86.5 L39.35 47.5 Z M44.85 48.5 L46.2 49.5 L43.85 51 Z",
          "bounds": [
            39.35,
            47.5,
            46.2,
            86.5
          ],
          "direction": "down",
          "weight": 37.5
        }
      ],
      [
        {
          "outline": "M33.3 85.45 L36.85 84.8 L40.45 84.05 L44.2 83.25 L48 82.35 L51.95 81.4 L56 80.4 L60.15 79.35 L64.4 78.25 L68.75 77.15 L73.25 76.05 L73.55 76.9 L69.4 78.95 L65.25 80.8 L61.15 82.45 L57.15 84.05 L53.2 85.5 L49.3 86.85 L45.5 88.1 L41.8 89.25 L38.15 90.3 L34.6 91.3 Z M34.6 91.3 L32.3 85.65 L33.3 85.45 Z M34.6 91.3 L37.2 89.2 L35.9 92.55 Z",
          "bounds": [
            32.3,
            76.05,
            73.55,
            92.55
          ],
          "direction": "curve",
          "weight": 41.722915,
          "revealPath": "M33.480000000000004 88.5 Q51.48 84.5 73.44 76.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.9 9 L74.15 24 L74.95 37.4 L76.2 49.25 L77.85 59.45 L79.8 68.05 L82.1 75 L84.55 80.2 L87 83.7 L89.25 85.5 L91.05 86 L91.05 92 L86.5 90.85 L82.6 87.8 L79.35 83.2 L76.5 77.15 L74.05 69.65 L71.95 60.6 L70.25 50 L68.95 37.9 L68.15 24.2 L67.9 9 Z M67.9 9.5 L67.9 7.8 L73.9 9 Z M73.9 9 L75.4 10 L72.9 11.5 Z M91.05 86 L93.15 86.9 L94.05 89 L93.15 91.1 L91.05 92 Z M91.05 86.5 L88.05 86.5 L91.05 73.5 L92.05 73.5 Z",
          "bounds": [
            67.9,
            7.8,
            94.05,
            92
          ],
          "direction": "curve",
          "weight": 82.985996,
          "revealPath": "M70.92 8.5 C70.92 62 80.28 89 91.08 89",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M76.95 9.95 L78.25 10.9 L79.6 11.75 L80.85 12.7 L82.05 13.75 L83.15 14.9 L84.2 16.1 L85.15 17.4 L86.05 18.7 L86.9 20.15 L87.65 21.6 L81.95 23.5 L81.7 22.2 L81.35 20.9 L81 19.6 L80.5 18.3 L80 17 L79.4 15.7 L78.8 14.45 L78.05 13.15 L77.35 11.8 L76.35 10.65 Z M87.65 21.6 L87.5 23.85 L85.8 25.4 L83.5 25.2 L81.95 23.5 Z",
          "bounds": [
            76.35,
            9.95,
            87.65,
            25.4
          ],
          "direction": "curve",
          "weight": 16.643317,
          "revealPath": "M76.32 10 Q82.44 15.5 85.32 24",
          "revealWidth": 14
        }
      ]
    ],
    "variant": {
      "catalogStrokes": 11,
      "playbackStrokes": 12,
      "form": "사전"
    },
    "candidateSha256": "e0233165e42da6fe659177aa24e4816400d322ed8ee2ec4ad8b25ab2b3a187ce"
  }
] as const
export function loadGlyphWikiBatch215Strokes(bundle: unknown): readonly HanjaVariantStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch215 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH215_STROKES = loadGlyphWikiBatch215Strokes(reviewed)
