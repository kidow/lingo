import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** 1369 정적19그룹 미등록후보;source/public 준비이력false 보존. */
const EXPECTED=[
  {
    "glyph": "藩",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "f6d274f2baa8559c9a1e6553b383e16f5a3c7363946e55aa1bca5863cbb1f16d",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      20,
      21,
      19
    ],
    "paths": [
      "M6.45 15.3 L46.75 15.3 L46.75 17.3 L6.45 17.3 Z M46.75 15.3 L36.75 16.3 L41.75 10.8 Z",
      "M34.8 6.6 L34.8 24.6 L28.8 27.6 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
      "M52.7 15.3 L93 15.3 L93 17.3 L52.7 17.3 Z M93 15.3 L81 16.3 L87 10.3 Z",
      "M70.65 6.6 L70.65 24.6 L64.65 27.6 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
      "M15.4 31.9 L17.3 32.2 L19.15 32.4 L20.9 32.7 L22.5 33.05 L24.05 33.5 L25.5 34 L26.85 34.55 L28.15 35.2 L29.35 35.95 L30.4 36.8 L25.85 40.7 L25.45 40 L24.9 39.25 L24.25 38.45 L23.4 37.65 L22.4 36.85 L21.25 36 L19.95 35.2 L18.5 34.35 L16.95 33.45 L15.15 32.75 Z M30.4 36.8 L31.1 39 L30.1 41.05 L27.9 41.75 L25.85 40.7 Z",
      "M7.85 48.75 L9.9 49.05 L11.85 49.25 L13.7 49.55 L15.4 49.9 L17 50.3 L18.5 50.8 L19.85 51.4 L21.15 52.05 L22.35 52.85 L23.4 53.75 L18.65 57.45 L18.35 56.8 L17.9 56.1 L17.25 55.3 L16.4 54.55 L15.35 53.7 L14.15 52.9 L12.8 52.05 L11.25 51.2 L9.55 50.35 L7.65 49.65 Z M23.4 53.75 L24 55.95 L22.85 57.95 L20.65 58.55 L18.65 57.45 Z",
      "M8.65 73.3 L11.35 73.75 L13.85 74.4 L16.15 75.4 L18.15 76.75 L19.9 78.45 L21.3 80.5 L22.4 82.8 L23.1 85.4 L23.5 88.15 L23.5 91.15 L17.55 90.55 L17.85 88.2 L17.85 86.05 L17.7 84.15 L17.25 82.4 L16.6 80.8 L15.65 79.3 L14.35 77.85 L12.75 76.55 L10.8 75.25 L8.4 74.2 Z M23.5 91.15 L22.4 93.15 L20.2 93.85 L18.2 92.75 L17.55 90.55 Z M15.55 78.85 L16.25 77.55 L17.25 76 L18.5 74.05 L20.05 71.75 L21.9 69 L24.1 65.8 L26.6 62.25 L29.45 58.3 L32.65 53.95 L36.3 49.2 L37.05 49.7 L34.25 54.95 L31.7 59.7 L29.4 64 L27.35 67.8 L25.55 71.15 L24.05 74.05 L22.9 76.5 L22 78.5 L21.4 80 L21.2 80.9 Z",
      "M83.15 32.5 L79.1 33 L74.9 33.5 L70.5 34.05 L65.95 34.55 L61.25 35.05 L56.4 35.55 L51.35 36.05 L46.15 36.5 L40.8 36.85 L35.3 37.1 L35.15 36.2 L40.55 34.95 L45.8 33.85 L50.9 32.8 L55.85 31.8 L60.6 30.85 L65.25 29.95 L69.7 29.1 L74 28.2 L78.15 27.4 L82.15 26.55 Z M81.65 26.65 L87.8 31.7 L83.15 32.5 Z M87.8 31.7 L87.95 33.2 L84.25 31.3 Z",
      "M44.55 36.15 L45.55 36.65 L46.65 37 L47.7 37.45 L48.7 38 L49.7 38.6 L50.6 39.3 L51.45 40.1 L52.25 40.95 L53 41.9 L53.65 42.95 L48.05 45.05 L47.95 44.25 L47.8 43.45 L47.6 42.6 L47.3 41.8 L47 40.95 L46.55 40.15 L46.1 39.3 L45.55 38.45 L44.95 37.55 L44.1 36.9 Z M53.65 42.95 L53.55 45.2 L51.9 46.8 L49.65 46.7 L48.05 45.05 Z",
      "M82.95 38.1 L81.95 39.05 L80.9 39.95 L79.8 40.85 L78.7 41.75 L77.5 42.65 L76.25 43.5 L74.95 44.35 L73.55 45.2 L72.1 45.95 L70.75 46.9 L70.15 46.2 L71.25 45 L72.2 43.65 L73.1 42.4 L74 41.2 L74.8 40 L75.6 38.85 L76.3 37.7 L76.95 36.6 L77.6 35.55 L78.15 34.5 Z M77.85 34.9 L78.35 34.2 L82.95 38.1 Z M82.95 38.1 L83.5 39.8 L80.6 39.5 Z",
      "M35.8 46.3 L92.95 46.3 L92.95 48.3 L35.8 48.3 Z M92.95 46.3 L80.95 47.3 L86.95 41.3 Z",
      "M66.5 32.25 L66.5 62.9 L60.5 65.9 L60.5 32.25 Z",
      "M63.6 47.3 L61.8 49.2 L59.5 51.55 L57.1 53.75 L54.5 55.8 L51.8 57.7 L48.95 59.5 L45.95 61.15 L42.8 62.65 L39.55 63.95 L36.1 65.05 L32.5 65.95 L32.15 65.1 L35.35 63.3 L38.4 61.55 L41.25 59.75 L44 57.9 L46.6 56 L49 54 L51.3 51.95 L53.4 49.85 L55.35 47.65 L55.6 47.3 Z",
      "M66.5 46.9 L69.3 48.4 L71.95 49.9 L74.5 51.35 L77 52.7 L79.4 53.95 L81.75 55.05 L84.05 56 L86.3 56.9 L88.45 57.6 L90.6 58.25 L88.4 64.45 L86.15 63.45 L83.85 62.25 L81.55 60.95 L79.25 59.5 L77 57.9 L74.7 56.2 L72.45 54.3 L70.2 52.3 L68 50.05 L65.9 47.6 Z M88.4 64.45 L90.6 58.25 L94.2 59.5 Z",
      "M46.3 65.7 L46.3 91.3 L40.3 94.3 L40.3 62.7 Z",
      "M43.3 65.7 L84.3 65.7 L84.3 67.7 L43.3 67.7 Z M87.3 66.7 L87.3 89.8 L81.3 92.8 L81.3 66.7 Z M81.3 65.7 L84.3 63.2 L89.8 67.7 L87.3 69.7 L81.3 66.7 Z",
      "M43.3 75.55 L83.75 75.55 L83.75 77.55 L43.3 77.55 Z",
      "M66.5 65.7 L66.5 87.8 L60.5 87.8 L60.5 65.7 Z",
      "M43.3 85.8 L84.3 85.8 L84.3 87.8 L43.3 87.8 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 15.3 L46.75 15.3 L46.75 17.3 L6.45 17.3 Z M46.75 15.3 L36.75 16.3 L41.75 10.8 Z",
          "bounds": [
            6.45,
            10.8,
            46.75,
            17.3
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.6 L34.8 24.6 L28.8 27.6 L28.8 5.6 Z M34.8 6.6 L36.3 7.6 L33.8 9.1 Z",
          "bounds": [
            28.8,
            5.6,
            36.3,
            27.6
          ],
          "direction": "down",
          "weight": 20.0175
        }
      ],
      [
        {
          "outline": "M52.7 15.3 L93 15.3 L93 17.3 L52.7 17.3 Z M93 15.3 L81 16.3 L87 10.3 Z",
          "bounds": [
            52.7,
            10.3,
            93,
            17.3
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.6 L70.65 24.6 L64.65 27.6 L64.65 5.6 Z M70.65 6.6 L72.15 7.6 L69.65 9.1 Z",
          "bounds": [
            64.65,
            5.6,
            72.15,
            27.6
          ],
          "direction": "down",
          "weight": 20.0175
        }
      ],
      [
        {
          "outline": "M15.4 31.9 L17.3 32.2 L19.15 32.4 L20.9 32.7 L22.5 33.05 L24.05 33.5 L25.5 34 L26.85 34.55 L28.15 35.2 L29.35 35.95 L30.4 36.8 L25.85 40.7 L25.45 40 L24.9 39.25 L24.25 38.45 L23.4 37.65 L22.4 36.85 L21.25 36 L19.95 35.2 L18.5 34.35 L16.95 33.45 L15.15 32.75 Z M30.4 36.8 L31.1 39 L30.1 41.05 L27.9 41.75 L25.85 40.7 Z",
          "bounds": [
            15.15,
            31.9,
            31.1,
            41.75
          ],
          "direction": "curve",
          "weight": 16.250442,
          "revealPath": "M14.8225 32.234 Q24.76 34.8009 29.1325 39.9347",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.85 48.75 L9.9 49.05 L11.85 49.25 L13.7 49.55 L15.4 49.9 L17 50.3 L18.5 50.8 L19.85 51.4 L21.15 52.05 L22.35 52.85 L23.4 53.75 L18.65 57.45 L18.35 56.8 L17.9 56.1 L17.25 55.3 L16.4 54.55 L15.35 53.7 L14.15 52.9 L12.8 52.05 L11.25 51.2 L9.55 50.35 L7.65 49.65 Z M23.4 53.75 L24 55.95 L22.85 57.95 L20.65 58.55 L18.65 57.45 Z",
          "bounds": [
            7.65,
            48.75,
            24,
            58.55
          ],
          "direction": "curve",
          "weight": 16.601546,
          "revealPath": "M7.27 49.102199999999996 Q18.002499999999998 51.6691 21.9775 56.8029",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M8.65 73.3 L11.35 73.75 L13.85 74.4 L16.15 75.4 L18.15 76.75 L19.9 78.45 L21.3 80.5 L22.4 82.8 L23.1 85.4 L23.5 88.15 L23.5 91.15 L17.55 90.55 L17.85 88.2 L17.85 86.05 L17.7 84.15 L17.25 82.4 L16.6 80.8 L15.65 79.3 L14.35 77.85 L12.75 76.55 L10.8 75.25 L8.4 74.2 Z M23.5 91.15 L22.4 93.15 L20.2 93.85 L18.2 92.75 L17.55 90.55 Z",
          "bounds": [
            8.4,
            73.3,
            23.5,
            93.85
          ],
          "direction": "curve",
          "weight": 22.396374,
          "revealPath": "M8.065000000000001 73.6711 Q21.9775 76.9714 20.3875 92.37280000000001",
          "revealWidth": 14
        },
        {
          "outline": "M15.55 78.85 L16.25 77.55 L17.25 76 L18.5 74.05 L20.05 71.75 L21.9 69 L24.1 65.8 L26.6 62.25 L29.45 58.3 L32.65 53.95 L36.3 49.2 L37.05 49.7 L34.25 54.95 L31.7 59.7 L29.4 64 L27.35 67.8 L25.55 71.15 L24.05 74.05 L22.9 76.5 L22 78.5 L21.4 80 L21.2 80.9 Z",
          "bounds": [
            15.55,
            49.2,
            37.05,
            80.9
          ],
          "direction": "curve",
          "weight": 35.506301,
          "revealPath": "M18.4 79.905 Q19.99 75.50459999999998 36.685 49.46889999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M83.15 32.5 L79.1 33 L74.9 33.5 L70.5 34.05 L65.95 34.55 L61.25 35.05 L56.4 35.55 L51.35 36.05 L46.15 36.5 L40.8 36.85 L35.3 37.1 L35.15 36.2 L40.55 34.95 L45.8 33.85 L50.9 32.8 L55.85 31.8 L60.6 30.85 L65.25 29.95 L69.7 29.1 L74 28.2 L78.15 27.4 L82.15 26.55 Z M81.65 26.65 L87.8 31.7 L83.15 32.5 Z M87.8 31.7 L87.95 33.2 L84.25 31.3 Z",
          "bounds": [
            35.15,
            26.55,
            87.95,
            37.1
          ],
          "direction": "curve",
          "weight": 48.473219,
          "revealPath": "M83.175 29.46 Q62.962500000000006 32.88 35.2425 36.68",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M44.55 36.15 L45.55 36.65 L46.65 37 L47.7 37.45 L48.7 38 L49.7 38.6 L50.6 39.3 L51.45 40.1 L52.25 40.95 L53 41.9 L53.65 42.95 L48.05 45.05 L47.95 44.25 L47.8 43.45 L47.6 42.6 L47.3 41.8 L47 40.95 L46.55 40.15 L46.1 39.3 L45.55 38.45 L44.95 37.55 L44.1 36.9 Z M53.65 42.95 L53.55 45.2 L51.9 46.8 L49.65 46.7 L48.05 45.05 Z",
          "bounds": [
            44.1,
            36.15,
            53.65,
            46.8
          ],
          "direction": "curve",
          "weight": 11.812576,
          "revealPath": "M43.905 36.3 Q49.102500000000006 39.34 51.412499999999994 45.42",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M82.95 38.1 L81.95 39.05 L80.9 39.95 L79.8 40.85 L78.7 41.75 L77.5 42.65 L76.25 43.5 L74.95 44.35 L73.55 45.2 L72.1 45.95 L70.75 46.9 L70.15 46.2 L71.25 45 L72.2 43.65 L73.1 42.4 L74 41.2 L74.8 40 L75.6 38.85 L76.3 37.7 L76.95 36.6 L77.6 35.55 L78.15 34.5 Z M77.85 34.9 L78.35 34.2 L82.95 38.1 Z M82.95 38.1 L83.5 39.8 L80.6 39.5 Z",
          "bounds": [
            70.15,
            34.2,
            83.5,
            46.9
          ],
          "direction": "curve",
          "weight": 14.875,
          "revealPath": "M80.865 35.92 Q76.8225 41.23999999999999 70.47 46.56",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M35.8 46.3 L92.95 46.3 L92.95 48.3 L35.8 48.3 Z M92.95 46.3 L80.95 47.3 L86.95 41.3 Z",
          "bounds": [
            35.8,
            41.3,
            92.95,
            48.3
          ],
          "direction": "right",
          "weight": 57.1725
        }
      ],
      [
        {
          "outline": "M66.5 32.25 L66.5 62.9 L60.5 65.9 L60.5 32.25 Z",
          "bounds": [
            60.5,
            32.25,
            66.5,
            65.9
          ],
          "direction": "down",
          "weight": 31.16
        }
      ],
      [
        {
          "outline": "M63.6 47.3 L61.8 49.2 L59.5 51.55 L57.1 53.75 L54.5 55.8 L51.8 57.7 L48.95 59.5 L45.95 61.15 L42.8 62.65 L39.55 63.95 L36.1 65.05 L32.5 65.95 L32.15 65.1 L35.35 63.3 L38.4 61.55 L41.25 59.75 L44 57.9 L46.6 56 L49 54 L51.3 51.95 L53.4 49.85 L55.35 47.65 L55.6 47.3 Z",
          "bounds": [
            32.15,
            47.3,
            63.6,
            65.95
          ],
          "direction": "curve",
          "weight": 32.701879,
          "revealPath": "M59.4975 47.32 Q49.68000000000001 59.1 32.355 65.56",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.5 46.9 L69.3 48.4 L71.95 49.9 L74.5 51.35 L77 52.7 L79.4 53.95 L81.75 55.05 L84.05 56 L86.3 56.9 L88.45 57.6 L90.6 58.25 L88.4 64.45 L86.15 63.45 L83.85 62.25 L81.55 60.95 L79.25 59.5 L77 57.9 L74.7 56.2 L72.45 54.3 L70.2 52.3 L68 50.05 L65.9 47.6 Z M88.4 64.45 L90.6 58.25 L94.2 59.5 Z",
          "bounds": [
            65.9,
            46.9,
            94.2,
            64.45
          ],
          "direction": "curve",
          "weight": 27.73333,
          "revealPath": "M65.85 46.94 Q78.555 57.58 89.5275 61.38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.3 65.7 L46.3 91.3 L40.3 94.3 L40.3 62.7 Z",
          "bounds": [
            40.3,
            62.7,
            46.3,
            94.3
          ],
          "direction": "down",
          "weight": 20.14
        }
      ],
      [
        {
          "outline": "M43.3 65.7 L84.3 65.7 L84.3 67.7 L43.3 67.7 Z M87.3 66.7 L87.3 89.8 L81.3 92.8 L81.3 66.7 Z M81.3 65.7 L84.3 63.2 L89.8 67.7 L87.3 69.7 L81.3 66.7 Z",
          "bounds": [
            43.3,
            63.2,
            89.8,
            92.8
          ],
          "direction": "curve",
          "weight": 61.1425,
          "revealPath": "M43.3275 66.7 L84.33 66.7 L84.33 86.84",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M43.3 75.55 L83.75 75.55 L83.75 77.55 L43.3 77.55 Z",
          "bounds": [
            43.3,
            75.55,
            83.75,
            77.55
          ],
          "direction": "right",
          "weight": 40.425
        }
      ],
      [
        {
          "outline": "M66.5 65.7 L66.5 87.8 L60.5 87.8 L60.5 65.7 Z",
          "bounds": [
            60.5,
            65.7,
            66.5,
            87.8
          ],
          "direction": "down",
          "weight": 20.14
        }
      ],
      [
        {
          "outline": "M43.3 85.8 L84.3 85.8 L84.3 87.8 L43.3 87.8 Z",
          "bounds": [
            43.3,
            85.8,
            84.3,
            87.8
          ],
          "direction": "right",
          "weight": 41.0025
        }
      ]
    ],
    "pathsSha256": "7bd8ee09eaebad909bcbb9c291cba13f04b49ca151612b4aebcb4240542ba722",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85e9.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85e9.svg",
      "dictionarySvgSha256": "53d6ab9b54ab0852d30281b972bf0df88ddb3f21493b59ed7146d13a55f15e79",
      "dictionaryDirectionStrokes": "ROOT19그룹 정적대응만. 공식방향/QQ7연결·시작/끝/coverage·APP·등록 미승인.",
      "orderReviewSha256": "7360199b855431cbcf3f678c26dab5acc52d67ecba007c52e2ad3c83cd58a8a0",
      "geometryReviewSha256": "7360199b855431cbcf3f678c26dab5acc52d67ecba007c52e2ad3c83cd58a8a0"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c;individual revisions unavailable",
      "editableSource": "/hanja-strokes/glyphwiki/u85e9-k.json",
      "modifications": "원2016공개보관 u85e9-k actualfull5 원21raw/21calls/36P를 ROOT 정적19그룹으로 최초순수투영1회·즉시캐시. 원36P/flags/guide/width/weight 보존, terminal분리0. 7획 raw7/8 QQ는 원gap[-3.9750000000000014,-24.935600000000022]의 독립2mask, connector0. 16획 raw17H/raw18V는 원정확끝점에서만 연결하며 각 원P는 해당원선분 r7 capsule 안에 있음(실제raster승인X). 15획 raw16 flag113 단일quad는 전체원bounds의down mask 그대로. 전체배열은 국내대응 순열이며 17=raw20/18=raw21/19=raw19. 원자료 시간·연결/native/APP/runtime 미승인."
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
export function loadGlyphWikiBatch1369Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1369 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1369_STROKES:ReturnType<typeof loadGlyphWikiBatch1369Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1369_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1369_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1369_ASSIGNMENT_PROVISIONAL=true
