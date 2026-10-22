import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** false/provisional 상수는 준비이력이며 현재 ROOT 유한승인은 별도 review에 고정한다. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable","editableSource":"/hanja-strokes/glyphwiki/u8810.json","modifications":"base actualfull5/id3·selected closure 고정. 원23raw/46P를 국내20획23독립mask로 대응하며 원P·guide·폭·weight와 원mask 경계를 유지. 고유초기arc9/15m2 source-foot 표시정책의107 유한화면 승인.15m2 새내부시계, 공식 미세시간·전체시점·제품UI 승인 아님."}}
const CORE: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "蠐",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "5746fb2d2f9cd7c6731a889c5f03df04c05a4dd6a3f3af0eb7bcd64e81bcb4e3",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      13,
      14,
      15,
      10,
      12,
      16,
      17,
      19,
      20,
      22,
      23,
      21
    ],
    "paths": [
      "M13.9 26.5 L13.9 62 L8.4 64.75 L8.4 23.75 Z",
      "M11.15 26.5 L33.65 26.5 L33.65 28.5 L11.15 28.5 Z M36.4 27.5 L36.4 56 L30.9 58.75 L30.9 27.5 Z M30.9 26.5 L33.65 24 L38.9 28.5 L36.4 30.25 L30.9 27.5 Z",
      "M11.15 54 L33.65 54 L33.65 56 L11.15 56 Z",
      "M24.9 7.5 L24.9 80 L19.9 80 L19.9 6.5 Z M24.9 7.5 L26.15 8.5 L23.9 10 Z",
      "M6.65 83.5 L9.35 82.6 L12 81.6 L14.6 80.65 L17.25 79.6 L19.8 78.55 L22.35 77.45 L24.9 76.35 L27.45 75.25 L30 74.15 L32.6 73.1 L33.1 73.85 L31 75.75 L28.8 77.55 L26.5 79.2 L24.15 80.8 L21.75 82.3 L19.25 83.8 L16.75 85.2 L14.15 86.55 L11.5 87.85 L8.85 89.1 Z M8.85 89.1 L5.7 83.85 L6.65 83.5 Z M8.85 89.1 L11.1 86.6 L10.35 90.1 Z",
      "M28.5 62.6 L30.1 64.25 L31.6 66 L32.95 67.8 L34.15 69.75 L35.2 71.75 L36.15 73.85 L36.95 76 L37.6 78.2 L38.1 80.45 L38.5 82.8 L32.5 83.15 L32.5 81.15 L32.35 79.1 L32.15 77.1 L31.8 75.15 L31.4 73.15 L30.85 71.2 L30.2 69.2 L29.5 67.2 L28.7 65.15 L27.75 63.15 Z M38.5 82.8 L37.7 84.95 L35.65 85.95 L33.5 85.2 L32.5 83.15 Z",
      "M68.5 7.75 L68.5 20.65 L62.5 20.65 L62.5 6.75 Z M68.5 7.75 L70 8.75 L67.5 10.25 Z",
      "M38.4 18.65 L92.55 18.65 L92.55 20.65 L38.4 20.65 Z M92.55 18.65 L80.55 19.65 L86.55 13.65 Z",
      "M57.75 20.95 L58.5 21.75 L59.45 22.45 L60.35 23.2 L61.2 24 L62 24.8 L62.75 25.7 L63.45 26.6 L64.15 27.55 L64.8 28.5 L65.45 29.55 L59.8 31.55 L59.65 30.6 L59.5 29.6 L59.3 28.6 L59.05 27.6 L58.8 26.6 L58.55 25.55 L58.25 24.55 L57.95 23.5 L57.6 22.45 L57.05 21.55 Z M65.45 29.55 L65.3 31.8 L63.65 33.35 L61.35 33.25 L59.8 31.55 Z",
      "M75.35 24.45 L74.55 25.6 L73.75 26.75 L72.95 27.9 L72.05 29 L71.15 30.1 L70.2 31.2 L69.25 32.3 L68.2 33.35 L67.15 34.35 L66.2 35.45 L65.45 34.95 L66.05 33.65 L66.5 32.25 L67 30.9 L67.45 29.55 L67.9 28.25 L68.35 26.95 L68.75 25.7 L69.15 24.4 L69.55 23.15 L69.9 21.9 Z M69.7 22.35 L70.2 21.3 L75.35 24.45 Z M75.35 24.45 L76.3 25.95 L73.4 26.3 Z",
      "M68.25 32.95 L68.25 51.4 L62.75 54.15 L62.75 31.95 Z M68.25 32.95 L69.6 33.95 L67.25 35.45 Z",
      "M39.35 27.75 L55.75 27.75 L55.75 29.75 L39.35 29.75 Z M58.75 28.75 L58.75 31.4 L58.75 33.85 L58.7 36.1 L58.6 38.15 L58.55 39.95 L58.45 41.55 L58.35 42.95 L58.2 44.15 L58.05 45.2 L57.8 46.15 L52.05 44.35 L52.15 44 L52.25 43.3 L52.35 42.35 L52.45 41.1 L52.55 39.65 L52.65 37.9 L52.7 35.95 L52.75 33.8 L52.75 31.35 L52.75 28.75 Z M52.75 27.75 L55.75 25.25 L61.25 29.75 L58.75 31.25 L52.75 33.75 Z M57.8 46.15 L57.35 47.35 L56.8 48.45 L56.1 49.5 L55.25 50.4 L54.3 51.25 L53.25 51.9 L52.1 52.4 L50.9 52.75 L49.7 52.95 L48.4 53 L48.4 47 L49.05 46.95 L49.65 46.9 L50.1 46.75 L50.45 46.6 L50.75 46.4 L51.05 46.15 L51.3 45.85 L51.6 45.45 L51.85 44.95 L52.05 44.35 Z M48.4 50 L43.4 48.5 L43.4 47 L48.4 47 Z",
      "M50.4 28.65 L50.2 31.95 L49.7 35.05 L48.95 38 L47.95 40.75 L46.7 43.3 L45.2 45.6 L43.4 47.7 L41.35 49.5 L39.1 51.05 L36.6 52.25 L36.1 51.45 L37.9 49.55 L39.45 47.6 L40.8 45.65 L41.95 43.6 L42.85 41.45 L43.6 39.2 L44.1 36.8 L44.4 34.3 L44.5 31.65 L44.4 28.8 Z",
      "M90.4 27.95 L89.15 28.3 L87.85 28.65 L86.5 28.95 L85.15 29.3 L83.75 29.6 L82.3 29.9 L80.75 30.2 L79.2 30.45 L77.6 30.6 L76 31 L75.7 30.15 L77.15 29.4 L78.5 28.5 L79.8 27.7 L81.1 26.9 L82.35 26.1 L83.55 25.35 L84.7 24.6 L85.8 23.9 L86.85 23.2 L87.9 22.5 Z M87.45 22.7 L92.2 27.1 L90.4 27.95 Z M92.2 27.1 L92.3 28.75 L89.15 27.4 Z",
      "M78.6 29.6 L78.6 47.3 L73.1 47.3 L73.1 26.85 Z M69.6 46.1 L71.1 45.75 L72.6 45.4 L74.15 45.05 L75.7 44.65 L77.25 44.25 L78.8 43.85 L80.45 43.45 L82.05 43.05 L83.75 42.7 L85.4 42.2 L85.75 43 L84.35 43.95 L82.95 45 L81.55 46 L80.15 46.9 L78.75 47.8 L77.3 48.65 L75.9 49.45 L74.5 50.25 L73.05 51 L71.65 51.75 Z M71.65 51.75 L68.7 46.4 L69.6 46.1 Z M71.65 51.75 L73.95 49.3 L73.1 52.8 Z",
      "M83.4 28.7 L84.4 31.8 L85.35 34.7 L86.25 37.3 L87.25 39.65 L88.25 41.75 L89.3 43.6 L90.35 45.2 L91.5 46.5 L92.6 47.55 L93.7 48.4 L89.5 53.45 L88.05 51.85 L86.75 50 L85.65 48 L84.7 45.8 L83.95 43.45 L83.3 40.9 L82.85 38.15 L82.5 35.25 L82.4 32.15 L82.5 28.8 Z M89.5 53.45 L93.7 48.4 L94.95 49.4 Z",
      "M53.1 55.5 L53.1 71.25 L47.1 71.25 L47.1 54.5 Z M53.1 55.5 L54.6 56.5 L52.1 58 Z M47.1 71.25 L53.1 71.25 L51.9 73.05 L50.1 74.25 L48.3 73.05 Z M53.1 71.25 L52.85 74.75 L52.4 78 L51.7 81 L50.8 83.75 L49.7 86.25 L48.35 88.5 L46.75 90.45 L45 92.05 L43 93.25 L40.85 94.1 L40.4 93.3 L41.85 91.8 L43.1 90.2 L44.15 88.5 L45.05 86.65 L45.8 84.6 L46.4 82.4 L46.8 79.95 L47.1 77.3 L47.2 74.4 L47.1 71.25 Z",
      "M50.1 62.35 L81.1 62.35 L81.1 64.35 L50.1 64.35 Z",
      "M50.1 74.2 L81.1 74.2 L81.1 76.2 L50.1 76.2 Z",
      "M84.1 55.5 L84.1 91.3 L78.1 94.3 L78.1 54.5 Z M84.1 55.5 L85.6 56.5 L83.1 58 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M13.9 26.5 L13.9 62 L8.4 64.75 L8.4 23.75 Z",
          "bounds": [
            8.4,
            23.75,
            13.9,
            64.75
          ],
          "direction": "down",
          "weight": 27.5
        }
      ],
      [
        {
          "outline": "M11.15 26.5 L33.65 26.5 L33.65 28.5 L11.15 28.5 Z",
          "bounds": [
            11.15,
            26.5,
            33.65,
            28.5
          ],
          "direction": "right",
          "weight": 22.475
        },
        {
          "outline": "M36.4 27.5 L36.4 56 L30.9 58.75 L30.9 27.5 Z M30.9 26.5 L33.65 24 L38.9 28.5 L36.4 30.25 L30.9 27.5 Z",
          "bounds": [
            30.9,
            24,
            38.9,
            58.75
          ],
          "direction": "down",
          "weight": 27.5
        }
      ],
      [
        {
          "outline": "M11.15 54 L33.65 54 L33.65 56 L11.15 56 Z",
          "bounds": [
            11.15,
            54,
            33.65,
            56
          ],
          "direction": "right",
          "weight": 22.475
        }
      ],
      [
        {
          "outline": "M24.9 7.5 L24.9 80 L19.9 80 L19.9 6.5 Z M24.9 7.5 L26.15 8.5 L23.9 10 Z",
          "bounds": [
            19.9,
            6.5,
            26.15,
            80
          ],
          "direction": "down",
          "weight": 72
        }
      ],
      [
        {
          "outline": "M6.65 83.5 L9.35 82.6 L12 81.6 L14.6 80.65 L17.25 79.6 L19.8 78.55 L22.35 77.45 L24.9 76.35 L27.45 75.25 L30 74.15 L32.6 73.1 L33.1 73.85 L31 75.75 L28.8 77.55 L26.5 79.2 L24.15 80.8 L21.75 82.3 L19.25 83.8 L16.75 85.2 L14.15 86.55 L11.5 87.85 L8.85 89.1 Z M8.85 89.1 L5.7 83.85 L6.65 83.5 Z M8.85 89.1 L11.1 86.6 L10.35 90.1 Z",
          "bounds": [
            5.7,
            73.1,
            33.1,
            90.1
          ],
          "direction": "curve",
          "weight": 28.689382,
          "revealPath": "M7.3125 86.5 Q21.2625 81 32.8875 73.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.5 62.6 L30.1 64.25 L31.6 66 L32.95 67.8 L34.15 69.75 L35.2 71.75 L36.15 73.85 L36.95 76 L37.6 78.2 L38.1 80.45 L38.5 82.8 L32.5 83.15 L32.5 81.15 L32.35 79.1 L32.15 77.1 L31.8 75.15 L31.4 73.15 L30.85 71.2 L30.2 69.2 L29.5 67.2 L28.7 65.15 L27.75 63.15 Z M38.5 82.8 L37.7 84.95 L35.65 85.95 L33.5 85.2 L32.5 83.15 Z",
          "bounds": [
            27.75,
            62.6,
            38.5,
            85.95
          ],
          "direction": "curve",
          "weight": 23.325147,
          "revealPath": "M27.85 62.5 Q34.825 72 35.6 84.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68.5 7.75 L68.5 20.65 L62.5 20.65 L62.5 6.75 Z M68.5 7.75 L70 8.75 L67.5 10.25 Z",
          "bounds": [
            62.5,
            6.75,
            70,
            20.65
          ],
          "direction": "down",
          "weight": 12.406563
        }
      ],
      [
        {
          "outline": "M38.4 18.65 L92.55 18.65 L92.55 20.65 L38.4 20.65 Z M92.55 18.65 L80.55 19.65 L86.55 13.65 Z",
          "bounds": [
            38.4,
            13.65,
            92.55,
            20.65
          ],
          "direction": "right",
          "weight": 54.1025
        }
      ],
      [
        {
          "outline": "M57.75 20.95 L58.5 21.75 L59.45 22.45 L60.35 23.2 L61.2 24 L62 24.8 L62.75 25.7 L63.45 26.6 L64.15 27.55 L64.8 28.5 L65.45 29.55 L59.8 31.55 L59.65 30.6 L59.5 29.6 L59.3 28.6 L59.05 27.6 L58.8 26.6 L58.55 25.55 L58.25 24.55 L57.95 23.5 L57.6 22.45 L57.05 21.55 Z M65.45 29.55 L65.3 31.8 L63.65 33.35 L61.35 33.25 L59.8 31.55 Z",
          "bounds": [
            57.05,
            20.95,
            65.45,
            33.35
          ],
          "direction": "curve",
          "weight": 12.632138,
          "revealPath": "M57.125 20.8875 Q60.81 25.5125 63.155 31.9875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.35 24.45 L74.55 25.6 L73.75 26.75 L72.95 27.9 L72.05 29 L71.15 30.1 L70.2 31.2 L69.25 32.3 L68.2 33.35 L67.15 34.35 L66.2 35.45 L65.45 34.95 L66.05 33.65 L66.5 32.25 L67 30.9 L67.45 29.55 L67.9 28.25 L68.35 26.95 L68.75 25.7 L69.15 24.4 L69.55 23.15 L69.9 21.9 Z M69.7 22.35 L70.2 21.3 L75.35 24.45 Z M75.35 24.45 L76.3 25.95 L73.4 26.3 Z",
          "bounds": [
            65.45,
            21.3,
            76.3,
            35.45
          ],
          "direction": "curve",
          "weight": 14.33279,
          "revealPath": "M72.87 22.7375 Q69.85499999999999 29.2125 65.83500000000001 35.225",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68.25 32.95 L68.25 51.4 L62.75 54.15 L62.75 31.95 Z M68.25 32.95 L69.6 33.95 L67.25 35.45 Z",
          "bounds": [
            62.75,
            31.95,
            69.6,
            54.15
          ],
          "direction": "down",
          "weight": 20.35
        }
      ],
      [
        {
          "outline": "M39.35 27.75 L55.75 27.75 L55.75 29.75 L39.35 29.75 Z",
          "bounds": [
            39.35,
            27.75,
            55.75,
            29.75
          ],
          "direction": "right",
          "weight": 16.415
        },
        {
          "outline": "M58.75 28.75 L58.75 31.4 L58.75 33.85 L58.7 36.1 L58.6 38.15 L58.55 39.95 L58.45 41.55 L58.35 42.95 L58.2 44.15 L58.05 45.2 L57.8 46.15 L52.05 44.35 L52.15 44 L52.25 43.3 L52.35 42.35 L52.45 41.1 L52.55 39.65 L52.65 37.9 L52.7 35.95 L52.75 33.8 L52.75 31.35 L52.75 28.75 Z M52.75 27.75 L55.75 25.25 L61.25 29.75 L58.75 31.25 L52.75 33.75 Z M57.8 46.15 L57.35 47.35 L56.8 48.45 L56.1 49.5 L55.25 50.4 L54.3 51.25 L53.25 51.9 L52.1 52.4 L50.9 52.75 L49.7 52.95 L48.4 53 L48.4 47 L49.05 46.95 L49.65 46.9 L50.1 46.75 L50.45 46.6 L50.75 46.4 L51.05 46.15 L51.3 45.85 L51.6 45.45 L51.85 44.95 L52.05 44.35 Z M48.4 50 L43.4 48.5 L43.4 47 L48.4 47 Z",
          "bounds": [
            43.4,
            25.25,
            61.25,
            53
          ],
          "direction": "curve",
          "weight": 24.598406,
          "revealPath": "M55.785 28.75 Q55.785 42.625 54.95043416726748 45.25859793698108 Q53.44 50.025 48.44 50.025",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.4 28.65 L50.2 31.95 L49.7 35.05 L48.95 38 L47.95 40.75 L46.7 43.3 L45.2 45.6 L43.4 47.7 L41.35 49.5 L39.1 51.05 L36.6 52.25 L36.1 51.45 L37.9 49.55 L39.45 47.6 L40.8 45.65 L41.95 43.6 L42.85 41.45 L43.6 39.2 L44.1 36.8 L44.4 34.3 L44.5 31.65 L44.4 28.8 Z",
          "bounds": [
            36.1,
            28.65,
            50.4,
            52.25
          ],
          "direction": "curve",
          "weight": 25.631595,
          "revealPath": "M47.41 28.75 Q47.745 44.475 36.355000000000004 51.875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M90.4 27.95 L89.15 28.3 L87.85 28.65 L86.5 28.95 L85.15 29.3 L83.75 29.6 L82.3 29.9 L80.75 30.2 L79.2 30.45 L77.6 30.6 L76 31 L75.7 30.15 L77.15 29.4 L78.5 28.5 L79.8 27.7 L81.1 26.9 L82.35 26.1 L83.55 25.35 L84.7 24.6 L85.8 23.9 L86.85 23.2 L87.9 22.5 Z M87.45 22.7 L92.2 27.1 L90.4 27.95 Z M92.2 27.1 L92.3 28.75 L89.15 27.4 Z",
          "bounds": [
            75.7,
            22.5,
            92.3,
            31
          ],
          "direction": "curve",
          "weight": 14.813937,
          "revealPath": "M89.62 25.05 Q83.59 27.825 75.88499999999999 30.6",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M78.6 29.6 L78.6 47.3 L73.1 47.3 L73.1 26.85 Z",
          "bounds": [
            73.1,
            26.85,
            78.6,
            47.3
          ],
          "direction": "down",
          "weight": 15.725
        },
        {
          "outline": "M69.6 46.1 L71.1 45.75 L72.6 45.4 L74.15 45.05 L75.7 44.65 L77.25 44.25 L78.8 43.85 L80.45 43.45 L82.05 43.05 L83.75 42.7 L85.4 42.2 L85.75 43 L84.35 43.95 L82.95 45 L81.55 46 L80.15 46.9 L78.75 47.8 L77.3 48.65 L75.9 49.45 L74.5 50.25 L73.05 51 L71.65 51.75 Z M71.65 51.75 L68.7 46.4 L69.6 46.1 Z M71.65 51.75 L73.95 49.3 L73.1 52.8 Z",
          "bounds": [
            68.7,
            42.2,
            85.75,
            52.8
          ],
          "direction": "curve",
          "weight": 16.715075,
          "revealPath": "M70.19 49.1 Q77.89500000000001 46.325 85.6 42.625",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M83.4 28.7 L84.4 31.8 L85.35 34.7 L86.25 37.3 L87.25 39.65 L88.25 41.75 L89.3 43.6 L90.35 45.2 L91.5 46.5 L92.6 47.55 L93.7 48.4 L89.5 53.45 L88.05 51.85 L86.75 50 L85.65 48 L84.7 45.8 L83.95 43.45 L83.3 40.9 L82.85 38.15 L82.5 35.25 L82.4 32.15 L82.5 28.8 Z M89.5 53.45 L93.7 48.4 L94.95 49.4 Z",
          "bounds": [
            82.4,
            28.7,
            94.95,
            53.45
          ],
          "direction": "curve",
          "weight": 24.278653,
          "revealPath": "M82.92 28.2875 Q84.93 45.4 91.63 50.95",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.1 55.5 L53.1 71.25 L47.1 71.25 L47.1 54.5 Z M53.1 55.5 L54.6 56.5 L52.1 58 Z M47.1 71.25 L53.1 71.25 L51.9 73.05 L50.1 74.25 L48.3 73.05 Z M53.1 71.25 L52.85 74.75 L52.4 78 L51.7 81 L50.8 83.75 L49.7 86.25 L48.35 88.5 L46.75 90.45 L45 92.05 L43 93.25 L40.85 94.1 L40.4 93.3 L41.85 91.8 L43.1 90.2 L44.15 88.5 L45.05 86.65 L45.8 84.6 L46.4 82.4 L46.8 79.95 L47.1 77.3 L47.2 74.4 L47.1 71.25 Z",
          "bounds": [
            40.4,
            54.5,
            54.6,
            94.1
          ],
          "direction": "curve",
          "weight": 40.648973,
          "revealPath": "M50.148624999999996 55 L50.148624999999996 71.28 Q50.148624999999996 88.44 40.64635 93.72",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.1 62.35 L81.1 62.35 L81.1 64.35 L50.1 64.35 Z",
          "bounds": [
            50.1,
            62.35,
            81.1,
            64.35
          ],
          "direction": "right",
          "weight": 30.959025
        }
      ],
      [
        {
          "outline": "M50.1 74.2 L81.1 74.2 L81.1 76.2 L50.1 76.2 Z",
          "bounds": [
            50.1,
            74.2,
            81.1,
            76.2
          ],
          "direction": "right",
          "weight": 30.959025
        }
      ],
      [
        {
          "outline": "M84.1 55.5 L84.1 91.3 L78.1 94.3 L78.1 54.5 Z M84.1 55.5 L85.6 56.5 L83.1 58 Z",
          "bounds": [
            78.1,
            54.5,
            85.6,
            94.3
          ],
          "direction": "down",
          "weight": 37.84
        }
      ]
    ],
    "pathsSha256": "a5adbb8fa5223a503999a25d4233e548dd12c7d3cdf663c80213ca091ab4bcca",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8810.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/8810.svg",
      "dictionarySvgSha256": "06255f0e0c05eded36399bd7cc691585306ef2d9365a8e974912d319b239a213",
      "dictionaryDirectionStrokes": "全20 정적대응17·공식20macro60. 고유10정책 isolated actualcomponent107 유한화면. 원source/guide/폭/weight 보존,15m2 새내부시계. 원미세시간·전체시점·제품UI 승인 아님.",
      "orderReviewSha256": "5cde918cf80db8c4e4dc643b982b0a7832e66622b16beba7933cf12463cae5a3",
      "geometryReviewSha256": "c8cb0b3cf2f5c51322230227d9b5184390e35eaaca7b408f1291be8c05cf4024",
      "directionReviewSha256": "321c6fc6669cb31bbe1731ae1a5aa2b2e48162e8726403f1561e90cd09c8358f"
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
export function loadGlyphWikiBatch1388Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1388 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1388_STROKES:ReturnType<typeof loadGlyphWikiBatch1388Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1388_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1388_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1388_ASSIGNMENT_PROVISIONAL=true

export const GLYPHWIKI_BATCH1388_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u8810-activation-review.json","SHA256":"c8cb0b3cf2f5c51322230227d9b5184390e35eaaca7b408f1291be8c05cf4024"})
