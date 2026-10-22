import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** 1374 고정17획 cache 제품복제. 준비false와 별도ROOT유한승인기록을 구분한다. */
const EXPECTED=[
  {
    "glyph": "隮",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "a05d2fd334eb73181167cd13097d1d5aedb1e65ba9141c90836b49023bb3f204",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      4,
      5,
      6,
      10,
      11,
      12,
      7,
      9,
      13,
      14,
      16,
      17,
      19,
      20,
      18
    ],
    "paths": [
      "M13.05 13 L32.4 13 L32.4 15 L13.05 15 Z M35.25 14.85 L34.4 17 L33.45 19.25 L32.35 21.5 L31.2 23.8 L29.9 26.15 L28.5 28.5 L27 30.9 L25.35 33.35 L23.5 35.8 L21.5 38.2 L20.75 37.75 L21.85 34.85 L23 32.05 L24.1 29.4 L25.1 26.8 L26.05 24.3 L26.95 21.9 L27.7 19.6 L28.4 17.35 L29 15.2 L29.5 13.1 Z M29.4 13 L32.4 10.5 L37.9 15 L35.4 16.5 L29.4 19 Z",
      "M21.8 37.55 L24.4 39.6 L26.65 41.85 L28.6 44.25 L30.2 46.75 L31.55 49.3 L32.55 51.95 L33.25 54.7 L33.65 57.5 L33.75 60.35 L33.45 63.25 L27 61.9 L27.5 59.75 L27.75 57.6 L27.8 55.4 L27.6 53.15 L27.15 50.85 L26.45 48.5 L25.45 46.1 L24.25 43.55 L22.8 40.95 L21.15 38.15 Z M27 61.9 L33.45 63.25 L25.55 68.9 Z M33.15 63.2 L32.85 64.4 L32.4 65.6 L31.8 66.7 L31.05 67.7 L30.1 68.6 L29.1 69.3 L27.95 69.85 L26.75 70.2 L25.5 70.4 L24.2 70.5 L24.25 64.5 L24.85 64.45 L25.4 64.35 L25.8 64.25 L26.1 64.1 L26.35 63.95 L26.55 63.7 L26.75 63.45 L26.95 63.1 L27.15 62.6 L27.3 61.95 Z M24.25 67.5 L19.25 66 L19.25 64.5 L24.25 64.5 Z",
      "M16.05 13 L16.05 91.5 L10.05 94.5 L10.05 10 Z",
      "M66.5 7.75 L66.5 20.65 L60.5 20.65 L60.5 6.75 Z M66.5 7.75 L68 8.75 L65.5 10.25 Z",
      "M34.8 18.65 L92.15 18.65 L92.15 20.65 L34.8 20.65 Z M92.15 18.65 L80.15 19.65 L86.15 13.65 Z",
      "M55.25 20.95 L56.05 21.75 L57.05 22.4 L57.95 23.15 L58.85 23.95 L59.65 24.75 L60.45 25.65 L61.2 26.55 L61.9 27.5 L62.6 28.45 L63.25 29.5 L57.65 31.65 L57.5 30.65 L57.3 29.65 L57.05 28.65 L56.8 27.65 L56.55 26.6 L56.25 25.6 L55.9 24.55 L55.55 23.55 L55.2 22.45 L54.6 21.55 Z M63.25 29.5 L63.15 31.75 L61.55 33.35 L59.25 33.3 L57.65 31.65 Z",
      "M73.75 24.5 L72.95 25.65 L72.1 26.8 L71.2 27.9 L70.3 29.05 L69.4 30.15 L68.4 31.25 L67.4 32.3 L66.3 33.35 L65.2 34.35 L64.2 35.45 L63.45 34.95 L64.15 33.65 L64.65 32.25 L65.15 30.85 L65.65 29.55 L66.15 28.2 L66.65 26.9 L67.1 25.65 L67.55 24.35 L67.95 23.1 L68.35 21.85 Z M68.15 22.3 L68.65 21.3 L73.75 24.5 Z M73.75 24.5 L74.65 26.05 L71.75 26.3 Z",
      "M66.25 32.95 L66.25 51.4 L60.75 54.15 L60.75 31.95 Z M66.25 32.95 L67.6 33.95 L65.25 35.45 Z",
      "M35.8 27.75 L53.2 27.75 L53.2 29.75 L35.8 29.75 Z M56.2 28.75 L56.15 31.4 L56.15 33.85 L56.1 36.1 L56.05 38.15 L55.95 39.95 L55.85 41.55 L55.75 42.95 L55.6 44.2 L55.4 45.25 L55.15 46.2 L49.45 44.3 L49.5 44 L49.65 43.3 L49.75 42.35 L49.85 41.1 L49.95 39.65 L50.05 37.9 L50.1 35.95 L50.15 33.8 L50.15 31.35 L50.2 28.75 Z M50.2 27.75 L53.2 25.25 L58.7 29.75 L56.2 31.25 L50.2 33.75 Z M55.15 46.2 L54.65 47.4 L54.1 48.5 L53.4 49.55 L52.55 50.45 L51.6 51.25 L50.55 51.9 L49.4 52.4 L48.2 52.75 L46.95 52.95 L45.7 53 L45.7 47 L46.35 46.95 L46.9 46.9 L47.4 46.75 L47.75 46.6 L48.1 46.4 L48.4 46.15 L48.65 45.8 L48.95 45.4 L49.2 44.9 L49.45 44.3 Z M45.7 50 L37.7 48.5 L37.7 47 L45.7 47 Z",
      "M47.3 28.65 L47.1 31.95 L46.6 35.1 L45.85 38.05 L44.8 40.8 L43.45 43.35 L41.85 45.65 L39.95 47.7 L37.85 49.55 L35.45 51.05 L32.85 52.25 L32.35 51.45 L34.3 49.55 L36 47.6 L37.45 45.6 L38.7 43.55 L39.65 41.4 L40.4 39.15 L40.95 36.8 L41.3 34.3 L41.4 31.6 L41.3 28.8 Z",
      "M89.75 28 L88.45 28.3 L87.1 28.65 L85.7 29 L84.25 29.3 L82.75 29.65 L81.2 29.95 L79.65 30.2 L78 30.45 L76.3 30.65 L74.6 31 L74.35 30.15 L75.85 29.4 L77.3 28.5 L78.7 27.65 L80.1 26.85 L81.4 26.05 L82.7 25.3 L83.95 24.6 L85.15 23.85 L86.3 23.15 L87.4 22.45 Z M86.9 22.65 L91.8 27.1 L89.75 28 Z M91.8 27.1 L91.9 28.7 L88.7 27.35 Z",
      "M77.25 29.6 L77.25 47.3 L71.75 47.3 L71.75 26.85 Z M67.95 46.05 L69.55 45.75 L71.1 45.35 L72.75 45 L74.35 44.6 L76 44.2 L77.7 43.8 L79.35 43.4 L81.1 43.05 L82.85 42.7 L84.6 42.2 L84.95 43 L83.45 44 L81.95 45.05 L80.45 46 L78.95 46.95 L77.45 47.85 L75.95 48.7 L74.4 49.5 L72.9 50.3 L71.4 51.05 L69.9 51.75 Z M69.9 51.75 L67 46.4 L67.95 46.05 Z M69.9 51.75 L72.25 49.35 L71.3 52.85 Z",
      "M82.45 28.7 L83.45 31.8 L84.45 34.65 L85.4 37.25 L86.4 39.65 L87.45 41.75 L88.55 43.55 L89.7 45.15 L90.85 46.45 L92 47.5 L93.2 48.35 L89.15 53.5 L87.6 51.9 L86.2 50.1 L85.05 48.05 L84.05 45.85 L83.2 43.5 L82.5 40.95 L82 38.2 L81.6 35.25 L81.45 32.15 L81.55 28.8 Z M89.15 53.5 L93.2 48.35 L94.6 49.4 Z",
      "M50.2 55.5 L50.2 71.25 L44.2 71.25 L44.2 54.5 Z M50.2 55.5 L51.7 56.5 L49.2 58 Z M44.2 71.25 L50.2 71.25 L49 73.05 L47.2 74.25 L45.4 73.05 Z M50.2 71.25 L49.95 74.75 L49.45 78 L48.75 81 L47.8 83.8 L46.6 86.3 L45.2 88.55 L43.55 90.45 L41.7 92.05 L39.6 93.3 L37.35 94.1 L36.95 93.3 L38.5 91.75 L39.85 90.15 L41 88.45 L41.95 86.6 L42.75 84.6 L43.4 82.35 L43.85 79.95 L44.15 77.3 L44.25 74.4 L44.2 71.25 Z",
      "M47.2 62.35 L80 62.35 L80 64.35 L47.2 64.35 Z",
      "M47.2 74.2 L80 74.2 L80 76.2 L47.2 76.2 Z",
      "M83 55.5 L83 91.3 L77 94.3 L77 54.5 Z M83 55.5 L84.5 56.5 L82 58 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M13.05 13 L32.4 13 L32.4 15 L13.05 15 Z M35.25 14.85 L34.4 17 L33.45 19.25 L32.35 21.5 L31.2 23.8 L29.9 26.15 L28.5 28.5 L27 30.9 L25.35 33.35 L23.5 35.8 L21.5 38.2 L20.75 37.75 L21.85 34.85 L23 32.05 L24.1 29.4 L25.1 26.8 L26.05 24.3 L26.95 21.9 L27.7 19.6 L28.4 17.35 L29 15.2 L29.5 13.1 Z M29.4 13 L32.4 10.5 L37.9 15 L35.4 16.5 L29.4 19 Z",
          "bounds": [
            13.05,
            10.5,
            37.9,
            38.2
          ],
          "direction": "curve",
          "weight": 45.855896,
          "revealPath": "M13.05 14 L32.4 14 Q29.25 24.5 21.15 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M21.8 37.55 L24.4 39.6 L26.65 41.85 L28.6 44.25 L30.2 46.75 L31.55 49.3 L32.55 51.95 L33.25 54.7 L33.65 57.5 L33.75 60.35 L33.45 63.25 L27 61.9 L27.5 59.75 L27.75 57.6 L27.8 55.4 L27.6 53.15 L27.15 50.85 L26.45 48.5 L25.45 46.1 L24.25 43.55 L22.8 40.95 L21.15 38.15 Z M27 61.9 L33.45 63.25 L25.55 68.9 Z M33.15 63.2 L32.85 64.4 L32.4 65.6 L31.8 66.7 L31.05 67.7 L30.1 68.6 L29.1 69.3 L27.95 69.85 L26.75 70.2 L25.5 70.4 L24.2 70.5 L24.25 64.5 L24.85 64.45 L25.4 64.35 L25.8 64.25 L26.1 64.1 L26.35 63.95 L26.55 63.7 L26.75 63.45 L26.95 63.1 L27.15 62.6 L27.3 61.95 Z",
          "bounds": [
            21.15,
            37.55,
            33.75,
            70.5
          ],
          "direction": "curve",
          "weight": 34.454427,
          "revealPath": "M21.15 37.5 Q32.85 50 30.257474960263423 62.602552276497256 Q29.25 67.5 24.25 67.5",
          "revealWidth": 14
        },
        {
          "outline": "M24.25 67.5 L19.25 66 L19.25 64.5 L24.25 64.5 Z",
          "bounds": [
            19.25,
            64.5,
            24.25,
            67.5
          ],
          "direction": "left",
          "weight": 5
        }
      ],
      [
        {
          "outline": "M16.05 13 L16.05 91.5 L10.05 94.5 L10.05 10 Z",
          "bounds": [
            10.05,
            10,
            16.05,
            94.5
          ],
          "direction": "down",
          "weight": 79
        }
      ],
      [
        {
          "outline": "M66.5 7.75 L66.5 20.65 L60.5 20.65 L60.5 6.75 Z M66.5 7.75 L68 8.75 L65.5 10.25 Z",
          "bounds": [
            60.5,
            6.75,
            68,
            20.65
          ],
          "direction": "down",
          "weight": 12.406563
        }
      ],
      [
        {
          "outline": "M34.8 18.65 L92.15 18.65 L92.15 20.65 L34.8 20.65 Z M92.15 18.65 L80.15 19.65 L86.15 13.65 Z",
          "bounds": [
            34.8,
            13.65,
            92.15,
            20.65
          ],
          "direction": "right",
          "weight": 57.3325
        }
      ],
      [
        {
          "outline": "M55.25 20.95 L56.05 21.75 L57.05 22.4 L57.95 23.15 L58.85 23.95 L59.65 24.75 L60.45 25.65 L61.2 26.55 L61.9 27.5 L62.6 28.45 L63.25 29.5 L57.65 31.65 L57.5 30.65 L57.3 29.65 L57.05 28.65 L56.8 27.65 L56.55 26.6 L56.25 25.6 L55.9 24.55 L55.55 23.55 L55.2 22.45 L54.6 21.55 Z M63.25 29.5 L63.15 31.75 L61.55 33.35 L59.25 33.3 L57.65 31.65 Z",
          "bounds": [
            54.6,
            20.95,
            63.25,
            33.35
          ],
          "direction": "curve",
          "weight": 12.807892,
          "revealPath": "M54.625 20.8875 Q58.53 25.5125 61.015 31.9875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.75 24.5 L72.95 25.65 L72.1 26.8 L71.2 27.9 L70.3 29.05 L69.4 30.15 L68.4 31.25 L67.4 32.3 L66.3 33.35 L65.2 34.35 L64.2 35.45 L63.45 34.95 L64.15 33.65 L64.65 32.25 L65.15 30.85 L65.65 29.55 L66.15 28.2 L66.65 26.9 L67.1 25.65 L67.55 24.35 L67.95 23.1 L68.35 21.85 Z M68.15 22.3 L68.65 21.3 L73.75 24.5 Z M73.75 24.5 L74.65 26.05 L71.75 26.3 Z",
          "bounds": [
            63.45,
            21.3,
            74.65,
            35.45
          ],
          "direction": "curve",
          "weight": 14.543544,
          "revealPath": "M71.31 22.7375 Q68.11500000000001 29.2125 63.855 35.225",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.25 32.95 L66.25 51.4 L60.75 54.15 L60.75 31.95 Z M66.25 32.95 L67.6 33.95 L65.25 35.45 Z",
          "bounds": [
            60.75,
            31.95,
            67.6,
            54.15
          ],
          "direction": "down",
          "weight": 20.35
        }
      ],
      [
        {
          "outline": "M35.8 27.75 L53.2 27.75 L53.2 29.75 L35.8 29.75 Z M56.2 28.75 L56.15 31.4 L56.15 33.85 L56.1 36.1 L56.05 38.15 L55.95 39.95 L55.85 41.55 L55.75 42.95 L55.6 44.2 L55.4 45.25 L55.15 46.2 L49.45 44.3 L49.5 44 L49.65 43.3 L49.75 42.35 L49.85 41.1 L49.95 39.65 L50.05 37.9 L50.1 35.95 L50.15 33.8 L50.15 31.35 L50.2 28.75 Z M50.2 27.75 L53.2 25.25 L58.7 29.75 L56.2 31.25 L50.2 33.75 Z M55.15 46.2 L54.65 47.4 L54.1 48.5 L53.4 49.55 L52.55 50.45 L51.6 51.25 L50.55 51.9 L49.4 52.4 L48.2 52.75 L46.95 52.95 L45.7 53 L45.7 47 L46.35 46.95 L46.9 46.9 L47.4 46.75 L47.75 46.6 L48.1 46.4 L48.4 46.15 L48.65 45.8 L48.95 45.4 L49.2 44.9 L49.45 44.3 Z",
          "bounds": [
            35.8,
            25.25,
            58.7,
            53
          ],
          "direction": "curve",
          "weight": 42.073161,
          "revealPath": "M35.81 28.75 L53.205 28.75 Q53.205 42.625 52.31170356089969 45.28511816874943 Q50.72 50.025 45.72 50.025",
          "revealWidth": 14
        },
        {
          "outline": "M45.7 50 L37.7 48.5 L37.7 47 L45.7 47 Z",
          "bounds": [
            37.7,
            47,
            45.7,
            50
          ],
          "direction": "left",
          "weight": 8
        }
      ],
      [
        {
          "outline": "M47.3 28.65 L47.1 31.95 L46.6 35.1 L45.85 38.05 L44.8 40.8 L43.45 43.35 L41.85 45.65 L39.95 47.7 L37.85 49.55 L35.45 51.05 L32.85 52.25 L32.35 51.45 L34.3 49.55 L36 47.6 L37.45 45.6 L38.7 43.55 L39.65 41.4 L40.4 39.15 L40.95 36.8 L41.3 34.3 L41.4 31.6 L41.3 28.8 Z",
          "bounds": [
            32.35,
            28.65,
            47.3,
            52.25
          ],
          "direction": "curve",
          "weight": 25.923095,
          "revealPath": "M44.33 28.75 Q44.685 44.475 32.615 51.875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M89.75 28 L88.45 28.3 L87.1 28.65 L85.7 29 L84.25 29.3 L82.75 29.65 L81.2 29.95 L79.65 30.2 L78 30.45 L76.3 30.65 L74.6 31 L74.35 30.15 L75.85 29.4 L77.3 28.5 L78.7 27.65 L80.1 26.85 L81.4 26.05 L82.7 25.3 L83.95 24.6 L85.15 23.85 L86.3 23.15 L87.4 22.45 Z M86.9 22.65 L91.8 27.1 L89.75 28 Z M91.8 27.1 L91.9 28.7 L88.7 27.35 Z",
          "bounds": [
            74.35,
            22.45,
            91.9,
            31
          ],
          "direction": "curve",
          "weight": 15.577244,
          "revealPath": "M89.06 25.05 Q82.67 27.825 74.505 30.6",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M77.25 29.6 L77.25 47.3 L71.75 47.3 L71.75 26.85 Z",
          "bounds": [
            71.75,
            26.85,
            77.25,
            47.3
          ],
          "direction": "down",
          "weight": 15.725
        },
        {
          "outline": "M67.95 46.05 L69.55 45.75 L71.1 45.35 L72.75 45 L74.35 44.6 L76 44.2 L77.7 43.8 L79.35 43.4 L81.1 43.05 L82.85 42.7 L84.6 42.2 L84.95 43 L83.45 44 L81.95 45.05 L80.45 46 L78.95 46.95 L77.45 47.85 L75.95 48.7 L74.4 49.5 L72.9 50.3 L71.4 51.05 L69.9 51.75 Z M69.9 51.75 L67 46.4 L67.95 46.05 Z M69.9 51.75 L72.25 49.35 L71.3 52.85 Z",
          "bounds": [
            67,
            42.2,
            84.95,
            52.85
          ],
          "direction": "curve",
          "weight": 17.566859,
          "revealPath": "M68.47 49.1 Q76.63499999999999 46.325 84.8 42.625",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M82.45 28.7 L83.45 31.8 L84.45 34.65 L85.4 37.25 L86.4 39.65 L87.45 41.75 L88.55 43.55 L89.7 45.15 L90.85 46.45 L92 47.5 L93.2 48.35 L89.15 53.5 L87.6 51.9 L86.2 50.1 L85.05 48.05 L84.05 45.85 L83.2 43.5 L82.5 40.95 L82 38.2 L81.6 35.25 L81.45 32.15 L81.55 28.8 Z M89.15 53.5 L93.2 48.35 L94.6 49.4 Z",
          "bounds": [
            81.45,
            28.7,
            94.6,
            53.5
          ],
          "direction": "curve",
          "weight": 24.470019,
          "revealPath": "M81.96000000000001 28.2875 Q84.09 45.4 91.19 50.95",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.2 55.5 L50.2 71.25 L44.2 71.25 L44.2 54.5 Z M50.2 55.5 L51.7 56.5 L49.2 58 Z M44.2 71.25 L50.2 71.25 L49 73.05 L47.2 74.25 L45.4 73.05 Z M50.2 71.25 L49.95 74.75 L49.45 78 L48.75 81 L47.8 83.8 L46.6 86.3 L45.2 88.55 L43.55 90.45 L41.7 92.05 L39.6 93.3 L37.35 94.1 L36.95 93.3 L38.5 91.75 L39.85 90.15 L41 88.45 L41.95 86.6 L42.75 84.6 L43.4 82.35 L43.85 79.95 L44.15 77.3 L44.25 74.4 L44.2 71.25 Z",
          "bounds": [
            36.95,
            54.5,
            51.7,
            94.1
          ],
          "direction": "curve",
          "weight": 40.87573,
          "revealPath": "M47.232124999999996 55 L47.232124999999996 71.28 Q47.232124999999996 88.44 37.16255 93.72",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.2 62.35 L80 62.35 L80 64.35 L47.2 64.35 Z",
          "bounds": [
            47.2,
            62.35,
            80,
            64.35
          ],
          "direction": "right",
          "weight": 32.807325
        }
      ],
      [
        {
          "outline": "M47.2 74.2 L80 74.2 L80 76.2 L47.2 76.2 Z",
          "bounds": [
            47.2,
            74.2,
            80,
            76.2
          ],
          "direction": "right",
          "weight": 32.807325
        }
      ],
      [
        {
          "outline": "M83 55.5 L83 91.3 L77 94.3 L77 54.5 Z M83 55.5 L84.5 56.5 L82 58 Z",
          "bounds": [
            77,
            54.5,
            84.5,
            94.3
          ],
          "direction": "down",
          "weight": 37.84
        }
      ]
    ],
    "pathsSha256": "da22d21d8619dee861e5513511aa39ed9f336cb65594693cf5dfd7fbbbd1b8aa",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96ae.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/96ae.svg",
      "dictionarySvgSha256": "6202e04dc7496e55c310edb1a182acddb096ce2341b8649cd142f7ed3855044b",
      "dictionaryDirectionStrokes": "ROOT 원공식17획방향비교/순서·경계보정 기록을 보존. 기존12m2 고정start-nib FAIL은유지하며 새contact-foot 내부clock의원시간동일성미승인.",
      "orderReviewSha256": "02ff30be0d5871124736afe49e635b64eb93589ce8906f69ac15c475bed3b47d",
      "geometryReviewSha256": "cb15dde1e5e3e4afe29cddaaab7d2ad27eff8866e7b2ad535ce52b9ed5bcf5a6"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable",
      "editableSource": "/hanja-strokes/glyphwiki/u96ae.json",
      "modifications": "고정2016 공개보관 u96ae 원실제full5 한 파일을 사용한다. 선택body3와 실제full5의 groups/trace/defaults가 동일하며 header/trace 재조립이나 최신variant혼합은 없다. 기존고정compiler FIRST1 후 즉시17p20m42 cache를 저장했으며 그모든mask필드를 제품으로 복제한다. 기존LEFT2·UP9 원quad와 독립12m2 gap·원42P/guide/폭/bodyweight/순서를 유지한다. 12m2만 원cardinal-P1과 양의교집합인 seed부터 contact-foot를 성장시키고 원Q native arc-x frontier로 표시하는 고유정책을 사용한다. 새내부면적clock이며 원공식시간동일성·전시간연속성·zero-area native승인을 주장하지 않는다. 원857 HOLD/source준비false는 역사로 보존한다."
    }
  }
] as unknown as readonly HanjaDictionaryStrokeData[]
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(EXPECTED)
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
export function loadGlyphWikiBatch1374Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1374 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1374_STROKES:ReturnType<typeof loadGlyphWikiBatch1374Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1374_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1374_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1374_ASSIGNMENT_PROVISIONAL=true
