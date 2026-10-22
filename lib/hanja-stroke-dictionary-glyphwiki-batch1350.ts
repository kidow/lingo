import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1350 미등록 후보. ROOT정적16그룹만 확인, source/native/APP/runtime 미승인. */
const EXPECTED = [
  {
    "glyph": "縝",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "87005e8833f494a91873becf17b3eb0c7656d03ced147045c4e7f51635c2cde3",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      14,
      15,
      16,
      17,
      19,
      20
    ],
    "paths": [
      "M27.1 9.7 L25.95 11.65 L24.8 13.6 L23.65 15.55 L22.4 17.45 L21.15 19.3 L19.85 21.2 L18.55 23 L17.15 24.8 L15.65 26.5 L14.1 28.2 L13.35 27.75 L14.15 25.6 L15 23.5 L15.85 21.45 L16.7 19.4 L17.55 17.35 L18.4 15.3 L19.25 13.3 L20.05 11.25 L20.85 9.2 L21.65 7.15 Z M21.45 7.6 L21.9 6.6 L27.1 9.7 Z M27.1 9.7 L28 11.25 L25.1 11.55 Z M7.05 22.35 L8.75 23.25 L10.5 24.15 L12.1 25.15 L13.65 26.3 L15.05 27.6 L16.4 29 L17.6 30.5 L18.7 32.1 L19.7 33.8 L20.6 35.55 L14.95 37.55 L14.55 35.95 L14.05 34.45 L13.45 32.95 L12.8 31.45 L12 30.05 L11.1 28.6 L10.15 27.2 L9.05 25.8 L7.9 24.4 L6.55 23.15 Z M20.6 35.55 L20.45 37.85 L18.75 39.4 L16.5 39.25 L14.95 37.55 Z",
      "M37.15 21.3 L35.05 24.9 L32.95 28.4 L30.75 31.9 L28.5 35.35 L26.25 38.8 L23.9 42.2 L21.5 45.55 L19.05 48.85 L16.45 52.1 L13.75 55.25 L13 54.7 L14.85 51.05 L16.8 47.4 L18.75 43.8 L20.7 40.2 L22.6 36.6 L24.5 33 L26.4 29.4 L28.25 25.8 L30.05 22.15 L31.85 18.5 Z M31.6 18.95 L32.1 18 L37.15 21.3 Z M37.15 21.3 L38 22.9 L35.1 23.05 Z M7.15 53.45 L9.95 53.2 L12.75 52.9 L15.5 52.6 L18.25 52.25 L21 51.9 L23.75 51.5 L26.45 51.1 L29.15 50.7 L31.85 50.35 L34.6 50.05 L34.85 50.9 L32.4 52.15 L29.85 53.3 L27.25 54.3 L24.6 55.2 L21.9 56.05 L19.2 56.8 L16.45 57.55 L13.65 58.2 L10.85 58.8 L7.95 59.4 Z M7.95 59.4 L6.2 53.55 L7.15 53.45 Z M7.95 59.4 L10.75 57.5 L9.15 60.75 Z",
      "M28.05 39 L29.5 40.1 L31 41.25 L32.35 42.55 L33.6 43.95 L34.8 45.5 L35.9 47.15 L36.9 48.95 L37.8 50.8 L38.65 52.75 L39.4 54.8 L33.55 56.25 L33.25 54.35 L32.85 52.5 L32.4 50.75 L31.9 49.05 L31.35 47.4 L30.7 45.75 L30 44.2 L29.2 42.65 L28.4 41.1 L27.4 39.65 Z M39.4 54.8 L39 57.05 L37.2 58.45 L34.95 58.05 L33.55 56.25 Z",
      "M26.2 53.5 L26.2 91.5 L20.2 94.5 L20.2 53.5 Z",
      "M17.7 64.25 L17.2 67.05 L16.6 69.85 L15.85 72.55 L15 75.25 L14 77.85 L12.85 80.45 L11.6 83 L10.15 85.5 L8.55 87.9 L6.75 90.2 L6 89.75 L6.85 87.05 L7.75 84.35 L8.55 81.75 L9.3 79.15 L9.95 76.6 L10.5 74 L10.95 71.4 L11.3 68.85 L11.6 66.25 L11.75 63.65 Z M11.7 64.15 L11.85 62.6 L17.7 64.25 Z M17.7 64.25 L19.1 65.4 L16.45 66.65 Z",
      "M28.4 61.05 L29.8 62.25 L31.25 63.5 L32.55 64.95 L33.75 66.55 L34.9 68.25 L35.9 70.05 L36.85 72 L37.7 74.05 L38.45 76.2 L39.15 78.45 L33.25 79.6 L32.95 77.5 L32.65 75.5 L32.25 73.55 L31.8 71.7 L31.25 69.9 L30.7 68.15 L30.05 66.5 L29.35 64.85 L28.6 63.2 L27.75 61.65 Z M39.15 78.45 L38.65 80.65 L36.75 81.95 L34.55 81.45 L33.25 79.6 Z",
      "M82.85 13.95 L80.2 14.7 L77.45 15.4 L74.5 16.05 L71.45 16.65 L68.25 17.2 L64.9 17.7 L61.45 18.15 L57.8 18.55 L54 18.8 L50.05 18.9 L49.9 18.05 L53.7 16.95 L57.3 15.9 L60.8 14.95 L64.15 14 L67.3 13.05 L70.35 12.15 L73.2 11.2 L75.9 10.25 L78.45 9.3 L80.8 8.3 Z M80.35 8.5 L85.6 13 L82.85 13.95 Z M85.6 13 L85.7 14.55 L82.35 13.1 Z",
      "M53 8 L53 22 L47 22 L47 7 Z M53 8 L54.5 9 L52 10.5 Z M47 22 L53 22 L51.8 23.8 L50 25 L48.2 23.8 Z M53 22 L52.95 22.6 L53 23.05 L53.05 23.4 L53.1 23.6 L53.15 23.8 L53.3 23.95 L53.45 24.1 L53.8 24.25 L54.3 24.4 L55 24.5 L55 29.5 L53.75 29.45 L52.55 29.3 L51.4 28.95 L50.3 28.4 L49.3 27.65 L48.45 26.75 L47.8 25.65 L47.35 24.5 L47.1 23.25 L47 22 Z M55 24.5 L56.75 25.25 L57.5 27 L56.75 28.75 L55 29.5 Z M55 24.5 L88.35 24.5 L88.35 29.5 L55 29.5 Z M88.35 24.5 L89.85 25.5 L90.85 27 L89.85 28.5 L88.35 29.5 Z M88.35 24.5 L85.85 24.5 L88.35 16 L89.35 16 Z",
      "M59.95 36.45 L59.95 68.1 L54.45 70.85 L54.45 33.7 Z",
      "M57.2 36.45 L83.65 36.45 L83.65 38.45 L57.2 38.45 Z M86.65 37.45 L86.65 68.1 L80.65 71.1 L80.65 37.45 Z M80.65 36.45 L83.65 33.95 L89.15 38.45 L86.65 40.45 L80.65 37.45 Z",
      "M57.2 46.1 L83.65 46.1 L83.65 48.1 L57.2 48.1 Z",
      "M57.2 55.8 L83.65 55.8 L83.65 57.8 L57.2 57.8 Z",
      "M57.2 66.1 L83.65 66.1 L83.65 68.1 L57.2 68.1 Z",
      "M48.2 35 L48.2 80 L42.7 82.75 L42.7 34 Z M48.2 35 L49.55 36 L47.2 37.5 Z M45.45 74.5 L93.9 74.5 L93.9 76.5 L45.45 76.5 Z M93.9 74.5 L81.9 75.5 L87.9 69.5 Z",
      "M61.05 83.15 L58.85 84.6 L56.55 86 L54.15 87.3 L51.7 88.55 L49.1 89.7 L46.4 90.75 L43.55 91.75 L40.65 92.6 L37.6 93.35 L34.45 93.9 L34.2 93.05 L37 91.55 L39.7 90.1 L42.3 88.7 L44.75 87.35 L47.15 85.9 L49.4 84.5 L51.55 83 L53.6 81.5 L55.5 80 L57.3 78.45 Z M56.95 78.75 L57.35 78.4 L61.05 83.15 Z M61.05 83.15 L61.2 84.95 L58.45 83.9 Z",
      "M69.25 80.15 L71.95 80.35 L74.55 80.7 L77.05 81.2 L79.45 81.85 L81.8 82.65 L84 83.5 L86.1 84.55 L88.1 85.65 L90.05 86.9 L91.85 88.25 L87.75 92.65 L86.45 91.3 L85 90 L83.45 88.75 L81.8 87.55 L80 86.35 L78.05 85.25 L76 84.15 L73.8 83.1 L71.5 82.05 L69.05 81 Z M91.85 88.25 L92.75 90.35 L92 92.5 L89.9 93.4 L87.75 92.65 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M27.1 9.7 L25.95 11.65 L24.8 13.6 L23.65 15.55 L22.4 17.45 L21.15 19.3 L19.85 21.2 L18.55 23 L17.15 24.8 L15.65 26.5 L14.1 28.2 L13.35 27.75 L14.15 25.6 L15 23.5 L15.85 21.45 L16.7 19.4 L17.55 17.35 L18.4 15.3 L19.25 13.3 L20.05 11.25 L20.85 9.2 L21.65 7.15 Z M21.45 7.6 L21.9 6.6 L27.1 9.7 Z M27.1 9.7 L28 11.25 L25.1 11.55 Z",
          "bounds": [
            13.35,
            6.6,
            28,
            28.2
          ],
          "direction": "curve",
          "weight": 22.753516,
          "revealPath": "M24.6 8 Q19.7 18.5 13.75 28",
          "revealWidth": 14
        },
        {
          "outline": "M7.05 22.35 L8.75 23.25 L10.5 24.15 L12.1 25.15 L13.65 26.3 L15.05 27.6 L16.4 29 L17.6 30.5 L18.7 32.1 L19.7 33.8 L20.6 35.55 L14.95 37.55 L14.55 35.95 L14.05 34.45 L13.45 32.95 L12.8 31.45 L12 30.05 L11.1 28.6 L10.15 27.2 L9.05 25.8 L7.9 24.4 L6.55 23.15 Z M20.6 35.55 L20.45 37.85 L18.75 39.4 L16.5 39.25 L14.95 37.55 Z",
          "bounds": [
            6.55,
            22.35,
            20.6,
            39.4
          ],
          "direction": "curve",
          "weight": 19.541238,
          "revealPath": "M6.4 22.5 Q14.8 28 18.3 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M37.15 21.3 L35.05 24.9 L32.95 28.4 L30.75 31.9 L28.5 35.35 L26.25 38.8 L23.9 42.2 L21.5 45.55 L19.05 48.85 L16.45 52.1 L13.75 55.25 L13 54.7 L14.85 51.05 L16.8 47.4 L18.75 43.8 L20.7 40.2 L22.6 36.6 L24.5 33 L26.4 29.4 L28.25 25.8 L30.05 22.15 L31.85 18.5 Z M31.6 18.95 L32.1 18 L37.15 21.3 Z M37.15 21.3 L38 22.9 L35.1 23.05 Z",
          "bounds": [
            13,
            18,
            38,
            55.25
          ],
          "direction": "curve",
          "weight": 41.425505,
          "revealPath": "M34.75 19.5 Q24.95 38 13.4 55",
          "revealWidth": 14
        },
        {
          "outline": "M7.15 53.45 L9.95 53.2 L12.75 52.9 L15.5 52.6 L18.25 52.25 L21 51.9 L23.75 51.5 L26.45 51.1 L29.15 50.7 L31.85 50.35 L34.6 50.05 L34.85 50.9 L32.4 52.15 L29.85 53.3 L27.25 54.3 L24.6 55.2 L21.9 56.05 L19.2 56.8 L16.45 57.55 L13.65 58.2 L10.85 58.8 L7.95 59.4 Z M7.95 59.4 L6.2 53.55 L7.15 53.45 Z M7.95 59.4 L10.75 57.5 L9.15 60.75 Z",
          "bounds": [
            6.2,
            50.05,
            34.85,
            60.75
          ],
          "direction": "curve",
          "weight": 28.293506,
          "revealPath": "M7.1 56.5 Q21.8 54.5 34.75 50.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.05 39 L29.5 40.1 L31 41.25 L32.35 42.55 L33.6 43.95 L34.8 45.5 L35.9 47.15 L36.9 48.95 L37.8 50.8 L38.65 52.75 L39.4 54.8 L33.55 56.25 L33.25 54.35 L32.85 52.5 L32.4 50.75 L31.9 49.05 L31.35 47.4 L30.7 45.75 L30 44.2 L29.2 42.65 L28.4 41.1 L27.4 39.65 Z M39.4 54.8 L39 57.05 L37.2 58.45 L34.95 58.05 L33.55 56.25 Z",
          "bounds": [
            27.4,
            39,
            39.4,
            58.45
          ],
          "direction": "curve",
          "weight": 20.329843,
          "revealPath": "M27.4 39 Q34.05 45.5 36.85 57",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.2 53.5 L26.2 91.5 L20.2 94.5 L20.2 53.5 Z",
          "bounds": [
            20.2,
            53.5,
            26.2,
            94.5
          ],
          "direction": "down",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M17.7 64.25 L17.2 67.05 L16.6 69.85 L15.85 72.55 L15 75.25 L14 77.85 L12.85 80.45 L11.6 83 L10.15 85.5 L8.55 87.9 L6.75 90.2 L6 89.75 L6.85 87.05 L7.75 84.35 L8.55 81.75 L9.3 79.15 L9.95 76.6 L10.5 74 L10.95 71.4 L11.3 68.85 L11.6 66.25 L11.75 63.65 Z M11.7 64.15 L11.85 62.6 L17.7 64.25 Z M17.7 64.25 L19.1 65.4 L16.45 66.65 Z",
          "bounds": [
            6,
            62.6,
            19.1,
            90.2
          ],
          "direction": "curve",
          "weight": 27.79946,
          "revealPath": "M14.8 63.5 Q13.4 77.5 6.4 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.4 61.05 L29.8 62.25 L31.25 63.5 L32.55 64.95 L33.75 66.55 L34.9 68.25 L35.9 70.05 L36.85 72 L37.7 74.05 L38.45 76.2 L39.15 78.45 L33.25 79.6 L32.95 77.5 L32.65 75.5 L32.25 73.55 L31.8 71.7 L31.25 69.9 L30.7 68.15 L30.05 66.5 L29.35 64.85 L28.6 63.2 L27.75 61.65 Z M39.15 78.45 L38.65 80.65 L36.75 81.95 L34.55 81.45 L33.25 79.6 Z",
          "bounds": [
            27.75,
            61.05,
            39.15,
            81.95
          ],
          "direction": "curve",
          "weight": 21.373172,
          "revealPath": "M27.75 61 Q34.05 68 36.5 80.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M82.85 13.95 L80.2 14.7 L77.45 15.4 L74.5 16.05 L71.45 16.65 L68.25 17.2 L64.9 17.7 L61.45 18.15 L57.8 18.55 L54 18.8 L50.05 18.9 L49.9 18.05 L53.7 16.95 L57.3 15.9 L60.8 14.95 L64.15 14 L67.3 13.05 L70.35 12.15 L73.2 11.2 L75.9 10.25 L78.45 9.3 L80.8 8.3 Z M80.35 8.5 L85.6 13 L82.85 13.95 Z M85.6 13 L85.7 14.55 L82.35 13.1 Z",
          "bounds": [
            49.9,
            8.3,
            85.7,
            18.9
          ],
          "direction": "curve",
          "weight": 33.178794,
          "revealPath": "M82.325 11 Q69.7 15.5 50.005 18.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53 8 L53 22 L47 22 L47 7 Z M53 8 L54.5 9 L52 10.5 Z M47 22 L53 22 L51.8 23.8 L50 25 L48.2 23.8 Z M53 22 L52.95 22.6 L53 23.05 L53.05 23.4 L53.1 23.6 L53.15 23.8 L53.3 23.95 L53.45 24.1 L53.8 24.25 L54.3 24.4 L55 24.5 L55 29.5 L53.75 29.45 L52.55 29.3 L51.4 28.95 L50.3 28.4 L49.3 27.65 L48.45 26.75 L47.8 25.65 L47.35 24.5 L47.1 23.25 L47 22 Z M55 24.5 L56.75 25.25 L57.5 27 L56.75 28.75 L55 29.5 Z M55 24.5 L88.35 24.5 L88.35 29.5 L55 29.5 Z M88.35 24.5 L89.85 25.5 L90.85 27 L89.85 28.5 L88.35 29.5 Z",
          "bounds": [
            47,
            7,
            90.85,
            29.5
          ],
          "direction": "curve",
          "weight": 54.951068,
          "revealPath": "M50.005 7.5 L50.005 22 Q50.005 27 55.005 27 L88.385 27",
          "revealWidth": 14
        },
        {
          "outline": "M88.35 24.5 L85.85 24.5 L88.35 16 L89.35 16 Z",
          "bounds": [
            85.85,
            16,
            89.35,
            24.5
          ],
          "direction": "up",
          "weight": 8.5
        }
      ],
      [
        {
          "outline": "M59.95 36.45 L59.95 68.1 L54.45 70.85 L54.45 33.7 Z",
          "bounds": [
            54.45,
            33.7,
            59.95,
            70.85
          ],
          "direction": "down",
          "weight": 29.67
        }
      ],
      [
        {
          "outline": "M57.2 36.45 L83.65 36.45 L83.65 38.45 L57.2 38.45 Z M86.65 37.45 L86.65 68.1 L80.65 71.1 L80.65 37.45 Z M80.65 36.45 L83.65 33.95 L89.15 38.45 L86.65 40.45 L80.65 37.45 Z",
          "bounds": [
            57.2,
            33.95,
            89.15,
            71.1
          ],
          "direction": "curve",
          "weight": 56.1219,
          "revealPath": "M57.23155 37.45 L83.68345 37.45 L83.68345 67.12",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.2 46.1 L83.65 46.1 L83.65 48.1 L57.2 48.1 Z",
          "bounds": [
            57.2,
            46.1,
            83.65,
            48.1
          ],
          "direction": "right",
          "weight": 26.4519
        }
      ],
      [
        {
          "outline": "M57.2 55.8 L83.65 55.8 L83.65 57.8 L57.2 57.8 Z",
          "bounds": [
            57.2,
            55.8,
            83.65,
            57.8
          ],
          "direction": "right",
          "weight": 26.4519
        }
      ],
      [
        {
          "outline": "M57.2 66.1 L83.65 66.1 L83.65 68.1 L57.2 68.1 Z",
          "bounds": [
            57.2,
            66.1,
            83.65,
            68.1
          ],
          "direction": "right",
          "weight": 26.4519
        }
      ],
      [
        {
          "outline": "M48.2 35 L48.2 80 L42.7 82.75 L42.7 34 Z M48.2 35 L49.55 36 L47.2 37.5 Z",
          "bounds": [
            42.7,
            34,
            49.55,
            82.75
          ],
          "direction": "down",
          "weight": 41
        },
        {
          "outline": "M45.45 74.5 L93.9 74.5 L93.9 76.5 L45.45 76.5 Z M93.9 74.5 L81.9 75.5 L87.9 69.5 Z",
          "bounds": [
            45.45,
            69.5,
            93.9,
            76.5
          ],
          "direction": "right",
          "weight": 48.48
        }
      ],
      [
        {
          "outline": "M61.05 83.15 L58.85 84.6 L56.55 86 L54.15 87.3 L51.7 88.55 L49.1 89.7 L46.4 90.75 L43.55 91.75 L40.65 92.6 L37.6 93.35 L34.45 93.9 L34.2 93.05 L37 91.55 L39.7 90.1 L42.3 88.7 L44.75 87.35 L47.15 85.9 L49.4 84.5 L51.55 83 L53.6 81.5 L55.5 80 L57.3 78.45 Z M56.95 78.75 L57.35 78.4 L61.05 83.15 Z M61.05 83.15 L61.2 84.95 L58.45 83.9 Z",
          "bounds": [
            34.2,
            78.4,
            61.2,
            93.9
          ],
          "direction": "curve",
          "weight": 28.400044,
          "revealPath": "M59.6 80.5 Q49.5 88.5 34.35 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M69.25 80.15 L71.95 80.35 L74.55 80.7 L77.05 81.2 L79.45 81.85 L81.8 82.65 L84 83.5 L86.1 84.55 L88.1 85.65 L90.05 86.9 L91.85 88.25 L87.75 92.65 L86.45 91.3 L85 90 L83.45 88.75 L81.8 87.55 L80 86.35 L78.05 85.25 L76 84.15 L73.8 83.1 L71.5 82.05 L69.05 81 Z M91.85 88.25 L92.75 90.35 L92 92.5 L89.9 93.4 L87.75 92.65 Z",
          "bounds": [
            69.05,
            80.15,
            92.75,
            93.4
          ],
          "direction": "curve",
          "weight": 24.793717,
          "revealPath": "M68.69 80.5 Q82.325 83.5 90.91 91.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "3205c11e5410f97c7b94d96dbfc87e85cf3701054d1e460492ab149a6e0b99c9",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7e00/7e1d.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7e00/7e1d.svg",
      "dictionarySvgSha256": "1c314223d6b90c7853c949deb5cc6f0ffeca50ac4c9e35da77be64601f52e6ac",
      "dictionaryDirectionStrokes": "ROOT16정적board 대응만;공식방향/시간/시작/terminal/coverage/APP/등록미승인.",
      "orderReviewSha256": "880ac1208a0f8193d700e2c470e3e0a9edf68fb2651af6521c86010fcb5ce212",
      "geometryReviewSha256": "880ac1208a0f8193d700e2c470e3e0a9edf68fb2651af6521c86010fcb5ce212"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u7e1d@13",
      "revision": "u7e1d@13 및capsule원4record 고정;2026-10-22 freshactualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u7e1d.json",
      "modifications": "1350 미등록후보. current base full5/id3의20raw22calls46P를ROOT 정적16그룹에따라기존순수projector본문을1회실행해즉시캐시했다. QQ1/2의원gap과각2mask를보존,raw12H→13V만원endpoint동일한기존접합을사용했다. logical8/raw10의원UP2006/5 마지막quad1만별upmask로분배하고다른7P/bodyguide·폭14/bodyweight54.951068을유지했다. tail8.5추가는내부weight배분변화이며획당재생시간증가주장아님. logical14/raw17V1000/113·18H2/0은각cardinal로원foot전체복원했다. 새좌표/guide/connector/폭변경없음. 방향/시간/시작/coverage/native/APP/runtime미승인."
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
export function loadGlyphWikiBatch1350Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1350 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1350_STROKES:ReturnType<typeof loadGlyphWikiBatch1350Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1350_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1350_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1350_ASSIGNMENT_PROVISIONAL=true
