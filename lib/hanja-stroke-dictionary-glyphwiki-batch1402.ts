import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** Preparation flags stay false; ROOT finite native approval is separately pinned. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; fixed closure3; no current-latest claim","editableSource":"/hanja-strokes/glyphwiki/u5092.json","modifications":"Original14 raw/14 calls/35P and guides, widths, weights preserved. Domestic12 pens/14 masks, caps10 plus source-foot7m2/8m2 with explicit new display clocks. ROOT109 finite screens; no official microtiming, all-frame, APPUI/controller/storage approval."}}
const CORE: Omit<HanjaDictionaryStrokeData,'geometryLicense'>[] = [
  {
    "glyph": "傒",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "d5e00f0c85a059e09203ca4694fd2ba4dc6bc516342577d9e673884677035ab3",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      9,
      11,
      12,
      13,
      14
    ],
    "pathsSha256": "6ff2f1415e5586281e2e55006e097fb41b6f6533ee1e24693ad2838c7363d67f",
    "paths": [
      "M37.1 9.1 L34.55 14.65 L31.9 20.1 L29.1 25.4 L26.15 30.6 L23.1 35.65 L19.9 40.6 L16.55 45.35 L13.1 50 L9.45 54.5 L5.6 58.75 L4.85 58.2 L7.9 53.35 L10.9 48.5 L13.8 43.6 L16.65 38.6 L19.4 33.55 L22.05 28.4 L24.6 23.15 L27.05 17.8 L29.35 12.35 L31.55 6.8 Z M31.4 7.25 L31.85 6.15 L37.1 9.1 Z M37.1 9.1 L38.1 10.6 L35.25 11 Z",
      "M25.75 37 L25.75 91.5 L19.75 94.5 L19.75 36 Z M25.75 37 L27.25 38 L24.75 39.5 Z",
      "M84.95 12 L81.35 12.8 L77.75 13.6 L74.05 14.3 L70.3 14.95 L66.5 15.6 L62.65 16.15 L58.7 16.6 L54.75 17 L50.7 17.3 L46.55 17.4 L46.45 16.55 L50.4 15.4 L54.25 14.4 L58.1 13.4 L61.9 12.4 L65.6 11.45 L69.3 10.45 L72.9 9.4 L76.45 8.4 L79.9 7.3 L83.3 6.2 Z M82.85 6.35 L88.4 11 L84.95 12 Z M88.4 11 L88.55 12.55 L85.05 10.95 Z",
      "M50.7 15.35 L49.75 17.85 L48.7 20.3 L47.6 22.75 L46.45 25.15 L45.2 27.5 L43.85 29.75 L42.45 32 L40.9 34.15 L39.25 36.25 L37.5 38.2 L36.7 37.75 L37.65 35.3 L38.55 32.85 L39.5 30.5 L40.45 28.1 L41.3 25.7 L42.15 23.3 L42.95 20.9 L43.65 18.5 L44.35 16.05 L44.95 13.6 Z M44.8 14.05 L45.2 12.8 L50.7 15.35 Z M50.7 15.35 L51.85 16.7 L49 17.45 Z",
      "M60.55 18 L61.55 18.85 L62.65 19.6 L63.7 20.45 L64.7 21.3 L65.65 22.25 L66.5 23.25 L67.3 24.3 L68 25.4 L68.7 26.55 L69.25 27.7 L63.5 29.35 L63.4 28.35 L63.25 27.3 L63.05 26.25 L62.8 25.2 L62.5 24.15 L62.1 23.05 L61.7 21.95 L61.2 20.85 L60.65 19.65 L59.9 18.65 Z M69.25 27.7 L69 30 L67.2 31.4 L64.95 31.1 L63.5 29.35 Z",
      "M78.35 15.9 L80 16.9 L81.65 17.8 L83.2 18.85 L84.7 20 L86.05 21.25 L87.35 22.5 L88.6 23.9 L89.7 25.3 L90.75 26.8 L91.7 28.4 L86.2 30.8 L85.75 29.35 L85.2 27.95 L84.55 26.5 L83.85 25.1 L83.05 23.7 L82.2 22.3 L81.2 20.85 L80.2 19.45 L79.1 18 L77.8 16.65 Z M91.7 28.4 L91.75 30.7 L90.15 32.35 L87.9 32.35 L86.2 30.8 Z",
      "M63.85 32.25 L62.75 33.3 L61.65 34.35 L60.5 35.45 L59.35 36.6 L58.1 37.75 L56.85 39 L55.55 40.25 L54.15 41.55 L52.7 42.85 L51.3 44.25 L50.6 43.7 L51.55 41.95 L52.4 40.2 L53.3 38.55 L54.15 36.9 L55.05 35.4 L55.9 33.9 L56.75 32.45 L57.6 31.05 L58.4 29.75 L59.2 28.45 Z M58.9 28.85 L59.4 28.2 L63.85 32.25 Z M63.85 32.25 L64.35 34 L61.5 33.55 Z M43.65 39.75 L45.2 40.15 L46.8 40.5 L48.35 40.95 L49.8 41.5 L51.25 42.2 L52.6 43 L53.9 43.85 L55.15 44.8 L56.35 45.85 L57.5 47 L52.6 50.5 L52 49.4 L51.35 48.3 L50.65 47.25 L49.85 46.25 L49 45.25 L48.05 44.25 L47 43.25 L45.9 42.3 L44.7 41.35 L43.35 40.55 Z M57.5 47 L57.95 49.25 L56.75 51.2 L54.55 51.7 L52.6 50.5 Z",
      "M78.6 37.35 L76.55 39.4 L74.45 41.45 L72.35 43.45 L70.2 45.5 L68 47.55 L65.8 49.55 L63.5 51.55 L61.15 53.55 L58.75 55.45 L56.2 57.3 L55.6 56.65 L57.4 54.1 L59.25 51.65 L61.15 49.25 L63.05 46.9 L64.9 44.6 L66.8 42.3 L68.65 40.05 L70.5 37.8 L72.35 35.55 L74.15 33.35 Z M73.8 33.7 L74.3 33.15 L78.6 37.35 Z M78.6 37.35 L79.05 39.1 L76.15 38.55 Z M39.35 56.95 L44.35 56.7 L49.25 56.45 L54.1 56.15 L58.8 55.9 L63.45 55.6 L68.05 55.3 L72.55 55.05 L76.95 54.8 L81.25 54.6 L85.55 54.55 L85.65 55.4 L81.55 56.5 L77.3 57.45 L72.95 58.3 L68.5 59.1 L63.95 59.8 L59.3 60.5 L54.55 61.15 L49.75 61.8 L44.8 62.35 L39.8 62.95 Z M39.8 62.95 L38.35 57 L39.35 56.95 Z M39.8 62.95 L42.7 61.2 L40.9 64.35 Z",
      "M76.35 47.85 L78.15 48.6 L79.95 49.3 L81.7 50.1 L83.3 51.05 L84.85 52.05 L86.3 53.1 L87.7 54.25 L89 55.45 L90.2 56.75 L91.35 58.1 L86.2 61.3 L85.6 60 L84.9 58.7 L84.1 57.45 L83.2 56.15 L82.25 54.9 L81.15 53.65 L80 52.4 L78.75 51.1 L77.4 49.8 L75.9 48.6 Z M91.35 58.1 L91.65 60.4 L90.35 62.25 L88.1 62.6 L86.2 61.3 Z",
      "M36.6 71 L92.55 71 L92.55 73 L36.6 73 Z M92.55 71 L80.55 72 L86.55 66 Z",
      "M66.75 62.8 L65.7 68 L64.15 72.8 L62 77.2 L59.35 81.1 L56.15 84.6 L52.5 87.55 L48.35 90.05 L43.75 92.05 L38.7 93.5 L33.25 94.4 L33.05 93.55 L38.15 91.7 L42.7 89.55 L46.7 87.2 L50.2 84.55 L53.15 81.6 L55.6 78.4 L57.55 74.85 L59.1 70.95 L60.15 66.75 L60.8 62.15 Z M60.75 62.65 L60.9 61.1 L66.75 62.8 Z M66.75 62.8 L68.15 64 L65.45 65.2 Z",
      "M65.45 72.2 L67.35 74.5 L69.3 76.6 L71.25 78.55 L73.3 80.3 L75.5 81.9 L77.8 83.3 L80.25 84.55 L82.85 85.6 L85.55 86.55 L88.5 87.3 L86.7 93.65 L83.45 92.45 L80.4 91 L77.55 89.4 L74.95 87.55 L72.55 85.55 L70.4 83.3 L68.5 80.95 L66.9 78.35 L65.6 75.6 L64.65 72.6 Z M86.7 93.65 L88.5 87.3 L92.5 88.45 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M37.1 9.1 L34.55 14.65 L31.9 20.1 L29.1 25.4 L26.15 30.6 L23.1 35.65 L19.9 40.6 L16.55 45.35 L13.1 50 L9.45 54.5 L5.6 58.75 L4.85 58.2 L7.9 53.35 L10.9 48.5 L13.8 43.6 L16.65 38.6 L19.4 33.55 L22.05 28.4 L24.6 23.15 L27.05 17.8 L29.35 12.35 L31.55 6.8 Z M31.4 7.25 L31.85 6.15 L37.1 9.1 Z M37.1 9.1 L38.1 10.6 L35.25 11 Z",
          "bounds": [
            4.85,
            6.15,
            38.1,
            58.75
          ],
          "direction": "curve",
          "weight": 58.823657,
          "revealPath": "M34.5625 7.5 Q22.75 36 5.25 58.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.75 37 L25.75 91.5 L19.75 94.5 L19.75 36 Z M25.75 37 L27.25 38 L24.75 39.5 Z",
          "bounds": [
            19.75,
            36,
            27.25,
            94.5
          ],
          "direction": "down",
          "weight": 56.5
        }
      ],
      [
        {
          "outline": "M84.95 12 L81.35 12.8 L77.75 13.6 L74.05 14.3 L70.3 14.95 L66.5 15.6 L62.65 16.15 L58.7 16.6 L54.75 17 L50.7 17.3 L46.55 17.4 L46.45 16.55 L50.4 15.4 L54.25 14.4 L58.1 13.4 L61.9 12.4 L65.6 11.45 L69.3 10.45 L72.9 9.4 L76.45 8.4 L79.9 7.3 L83.3 6.2 Z M82.85 6.35 L88.4 11 L84.95 12 Z M88.4 11 L88.55 12.55 L85.05 10.95 Z",
          "bounds": [
            46.45,
            6.2,
            88.55,
            17.4
          ],
          "direction": "curve",
          "weight": 38.945516,
          "revealPath": "M84.64 9 Q66.82 14 46.525 17",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.7 15.35 L49.75 17.85 L48.7 20.3 L47.6 22.75 L46.45 25.15 L45.2 27.5 L43.85 29.75 L42.45 32 L40.9 34.15 L39.25 36.25 L37.5 38.2 L36.7 37.75 L37.65 35.3 L38.55 32.85 L39.5 30.5 L40.45 28.1 L41.3 25.7 L42.15 23.3 L42.95 20.9 L43.65 18.5 L44.35 16.05 L44.95 13.6 Z M44.8 14.05 L45.2 12.8 L50.7 15.35 Z M50.7 15.35 L51.85 16.7 L49 17.45 Z",
          "bounds": [
            36.7,
            12.8,
            51.85,
            38.2
          ],
          "direction": "curve",
          "weight": 26.355115,
          "revealPath": "M48.01 14 Q44.05 27 37.12 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M60.55 18 L61.55 18.85 L62.65 19.6 L63.7 20.45 L64.7 21.3 L65.65 22.25 L66.5 23.25 L67.3 24.3 L68 25.4 L68.7 26.55 L69.25 27.7 L63.5 29.35 L63.4 28.35 L63.25 27.3 L63.05 26.25 L62.8 25.2 L62.5 24.15 L62.1 23.05 L61.7 21.95 L61.2 20.85 L60.65 19.65 L59.9 18.65 Z M69.25 27.7 L69 30 L67.2 31.4 L64.95 31.1 L63.5 29.35 Z",
          "bounds": [
            59.9,
            18,
            69.25,
            31.4
          ],
          "direction": "curve",
          "weight": 13.857305,
          "revealPath": "M59.89 18 Q64.84 23 66.82 30",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M78.35 15.9 L80 16.9 L81.65 17.8 L83.2 18.85 L84.7 20 L86.05 21.25 L87.35 22.5 L88.6 23.9 L89.7 25.3 L90.75 26.8 L91.7 28.4 L86.2 30.8 L85.75 29.35 L85.2 27.95 L84.55 26.5 L83.85 25.1 L83.05 23.7 L82.2 22.3 L81.2 20.85 L80.2 19.45 L79.1 18 L77.8 16.65 Z M91.7 28.4 L91.75 30.7 L90.15 32.35 L87.9 32.35 L86.2 30.8 Z",
          "bounds": [
            77.8,
            15.9,
            91.75,
            32.35
          ],
          "direction": "curve",
          "weight": 19.134639,
          "revealPath": "M77.71 16 Q85.63 22 89.59 31",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M63.85 32.25 L62.75 33.3 L61.65 34.35 L60.5 35.45 L59.35 36.6 L58.1 37.75 L56.85 39 L55.55 40.25 L54.15 41.55 L52.7 42.85 L51.3 44.25 L50.6 43.7 L51.55 41.95 L52.4 40.2 L53.3 38.55 L54.15 36.9 L55.05 35.4 L55.9 33.9 L56.75 32.45 L57.6 31.05 L58.4 29.75 L59.2 28.45 Z M58.9 28.85 L59.4 28.2 L63.85 32.25 Z M63.85 32.25 L64.35 34 L61.5 33.55 Z",
          "bounds": [
            50.6,
            28.2,
            64.35,
            44.25
          ],
          "direction": "curve",
          "weight": 17.736744,
          "revealPath": "M61.87 30 Q56.92 36 50.98 44",
          "revealWidth": 14
        },
        {
          "outline": "M43.65 39.75 L45.2 40.15 L46.8 40.5 L48.35 40.95 L49.8 41.5 L51.25 42.2 L52.6 43 L53.9 43.85 L55.15 44.8 L56.35 45.85 L57.5 47 L52.6 50.5 L52 49.4 L51.35 48.3 L50.65 47.25 L49.85 46.25 L49 45.25 L48.05 44.25 L47 43.25 L45.9 42.3 L44.7 41.35 L43.35 40.55 Z M57.5 47 L57.95 49.25 L56.75 51.2 L54.55 51.7 L52.6 50.5 Z",
          "bounds": [
            43.35,
            39.75,
            57.95,
            51.7
          ],
          "direction": "curve",
          "weight": 16.298371,
          "revealPath": "M43.06 40 Q50.98 43 55.93 50",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M78.6 37.35 L76.55 39.4 L74.45 41.45 L72.35 43.45 L70.2 45.5 L68 47.55 L65.8 49.55 L63.5 51.55 L61.15 53.55 L58.75 55.45 L56.2 57.3 L55.6 56.65 L57.4 54.1 L59.25 51.65 L61.15 49.25 L63.05 46.9 L64.9 44.6 L66.8 42.3 L68.65 40.05 L70.5 37.8 L72.35 35.55 L74.15 33.35 Z M73.8 33.7 L74.3 33.15 L78.6 37.35 Z M78.6 37.35 L79.05 39.1 L76.15 38.55 Z",
          "bounds": [
            55.6,
            33.15,
            79.05,
            57.3
          ],
          "direction": "curve",
          "weight": 30.269194,
          "revealPath": "M76.72 35 Q66.82 46 55.93 57",
          "revealWidth": 14
        },
        {
          "outline": "M39.35 56.95 L44.35 56.7 L49.25 56.45 L54.1 56.15 L58.8 55.9 L63.45 55.6 L68.05 55.3 L72.55 55.05 L76.95 54.8 L81.25 54.6 L85.55 54.55 L85.65 55.4 L81.55 56.5 L77.3 57.45 L72.95 58.3 L68.5 59.1 L63.95 59.8 L59.3 60.5 L54.55 61.15 L49.75 61.8 L44.8 62.35 L39.8 62.95 Z M39.8 62.95 L38.35 57 L39.35 56.95 Z M39.8 62.95 L42.7 61.2 L40.9 64.35 Z",
          "bounds": [
            38.35,
            54.55,
            85.65,
            64.35
          ],
          "direction": "curve",
          "weight": 46.797873,
          "revealPath": "M39.1 60 Q64.84 58 85.63 55",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M76.35 47.85 L78.15 48.6 L79.95 49.3 L81.7 50.1 L83.3 51.05 L84.85 52.05 L86.3 53.1 L87.7 54.25 L89 55.45 L90.2 56.75 L91.35 58.1 L86.2 61.3 L85.6 60 L84.9 58.7 L84.1 57.45 L83.2 56.15 L82.25 54.9 L81.15 53.65 L80 52.4 L78.75 51.1 L77.4 49.8 L75.9 48.6 Z M91.35 58.1 L91.65 60.4 L90.35 62.25 L88.1 62.6 L86.2 61.3 Z",
          "bounds": [
            75.9,
            47.85,
            91.65,
            62.6
          ],
          "direction": "curve",
          "weight": 19.002621,
          "revealPath": "M75.73 48 Q84.64 53 89.59 61",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M36.6 71 L92.55 71 L92.55 73 L36.6 73 Z M92.55 71 L80.55 72 L86.55 66 Z",
          "bounds": [
            36.6,
            66,
            92.55,
            73
          ],
          "direction": "right",
          "weight": 55.935
        }
      ],
      [
        {
          "outline": "M66.75 62.8 L65.7 68 L64.15 72.8 L62 77.2 L59.35 81.1 L56.15 84.6 L52.5 87.55 L48.35 90.05 L43.75 92.05 L38.7 93.5 L33.25 94.4 L33.05 93.55 L38.15 91.7 L42.7 89.55 L46.7 87.2 L50.2 84.55 L53.15 81.6 L55.6 78.4 L57.55 74.85 L59.1 70.95 L60.15 66.75 L60.8 62.15 Z M60.75 62.65 L60.9 61.1 L66.75 62.8 Z M66.75 62.8 L68.15 64 L65.45 65.2 Z",
          "bounds": [
            33.05,
            61.1,
            68.15,
            94.4
          ],
          "direction": "curve",
          "weight": 44.338201,
          "revealPath": "M63.849999999999994 62 Q60.88 88 33.16 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M65.45 72.2 L67.35 74.5 L69.3 76.6 L71.25 78.55 L73.3 80.3 L75.5 81.9 L77.8 83.3 L80.25 84.55 L82.85 85.6 L85.55 86.55 L88.5 87.3 L86.7 93.65 L83.45 92.45 L80.4 91 L77.55 89.4 L74.95 87.55 L72.55 85.55 L70.4 83.3 L68.5 80.95 L66.9 78.35 L65.6 75.6 L64.65 72.6 Z M86.7 93.65 L88.5 87.3 L92.5 88.45 Z",
          "bounds": [
            64.65,
            72.2,
            92.5,
            93.65
          ],
          "direction": "curve",
          "weight": 29.338079,
          "revealPath": "M64.84 72 Q71.77 86 87.61 90.5",
          "revealWidth": 14
        }
      ]
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5092.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5000/5092.svg",
      "dictionarySvgSha256": "62fca9865335de4abdb2fc3a39d4b5a9ed707091f67588f30394b5a88349551d",
      "dictionaryDirectionStrokes": "Official12 macro36 and static32 are separate evidence. Original14raw14calls35P/guides/widths/weights preserved. Caps10 plus foot2, ROOT109 finite screens. New source-foot clocks do not establish official microtiming equivalence or all-time APPUI/controller/storage approval.",
      "orderReviewSha256": "7f2a9f02a28c6ee9015055c59b217ac7908442ce50f913280987c7bc2999d19a",
      "geometryReviewSha256": "986c4c5ae2db06cba2d7bef53b549d519a6dd268f69f6c7b2b4de4a1c9489168",
      "directionReviewSha256": "c6e5369aad12b4e3dac4470f367ae598a8272633e515488085deb2b6652605a2"
    }
  }
]
const EXPECTED: readonly HanjaDictionaryStrokeData[] = CORE.map(entry=>({...entry,...GEOMETRY_LICENSE}))
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(CORE);freezeDeep(GEOMETRY_LICENSE);freezeDeep(EXPECTED)
function sameJSON(a:unknown,b:unknown):boolean {
 if(Object.is(a,b))return true
 if(!b||typeof b!=='object'||!a||typeof a!=='object')return false
 if(Array.isArray(b)){
  if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false
  return b.every((value,index)=>{const d=Object.getOwnPropertyDescriptor(a,String(index));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,value)})
 }
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),expected=b as Record<string,unknown>
 return Reflect.ownKeys(a).length===keys.length&&keys.every(key=>{const d=Object.getOwnPropertyDescriptor(a,key);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,expected[key])})
}
export function loadGlyphWikiBatch1402Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1402 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1402_STROKES:ReturnType<typeof loadGlyphWikiBatch1402Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1402_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1402_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1402_ASSIGNMENT_PROVISIONAL=true
export const GLYPHWIKI_BATCH1402_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u5092-activation-review.json","SHA256":"986c4c5ae2db06cba2d7bef53b549d519a6dd268f69f6c7b2b4de4a1c9489168"})
