import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** false/provisional 상수는 준비이력이고 ROOT의 유한승인은 별도 review에 고정한다. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable","editableSource":"/hanja-strokes/glyphwiki/u9b4b.json","modifications":"actualfull5·closure3 고정. 원20raw22calls45P를 국내18획21mask로 대응. 원8 MLQL body7P/guide/폭/bodyweight 보존, 원UPquad를 독립UPmask로 이동해 원45Pexactonce 유지. UP시간은 새 microclock이며 원미세시간·제품UI 승인은 별개."}}
const CORE: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "魋",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "7ce15d54163cd6f8d167edfa8215992c98b3399c98bc5205f1fbd5e1ea5e66ae",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      5,
      7,
      6,
      8,
      9,
      10,
      12,
      13,
      14,
      15,
      16,
      18,
      19,
      17,
      20
    ],
    "paths": [
      "M30.65 10.05 L29.85 11.45 L29.05 12.85 L28.15 14.3 L27.25 15.7 L26.3 17.2 L25.3 18.65 L24.25 20.15 L23.15 21.65 L21.95 23.1 L20.8 24.7 L20 24.25 L20.65 22.45 L21.2 20.65 L21.75 18.85 L22.25 17.15 L22.8 15.5 L23.3 13.9 L23.8 12.3 L24.25 10.75 L24.7 9.25 L25.1 7.8 Z M24.9 8.25 L25.35 7.15 L30.65 10.05 Z M30.65 10.05 L31.65 11.55 L28.75 12 Z",
      "M15.25 23.5 L15.25 57 L9.25 60 L9.25 20.5 Z",
      "M12.25 23.5 L44.35 23.5 L44.35 25.5 L12.25 25.5 Z M47.35 24.5 L47.35 51 L41.35 54 L41.35 24.5 Z M41.35 23.5 L44.35 21 L49.85 25.5 L47.35 27.5 L41.35 24.5 Z",
      "M12.25 36.5 L44.35 36.5 L44.35 38.5 L12.25 38.5 Z",
      "M31.05 23.5 L31.05 51 L25.05 51 L25.05 23.5 Z",
      "M12.25 49 L44.35 49 L44.35 51 L12.25 51 Z",
      "M24.4 51.45 L24.2 58.4 L23.6 64.85 L22.65 70.75 L21.3 76.15 L19.6 80.95 L17.45 85.2 L15 88.9 L12.1 91.9 L8.85 94.25 L5.3 95.9 L4.9 95.05 L7.7 92.75 L10.15 90.05 L12.3 87 L14.1 83.5 L15.6 79.5 L16.8 74.95 L17.7 69.9 L18.25 64.35 L18.5 58.2 L18.4 51.5 Z M18.45 52 L18.4 50.35 L24.4 51.45 Z M24.4 51.45 L25.95 52.4 L23.45 53.95 Z",
      "M33.1 51.5 L33.1 84 L27.1 84 L27.1 50.5 Z M33.1 51.5 L34.6 52.5 L32.1 54 Z M27.1 84 L33.1 84 L31.9 85.8 L30.1 87 L28.3 85.8 Z M33.1 84 L33.05 84.6 L33.1 85.05 L33.15 85.4 L33.2 85.6 L33.3 85.8 L33.4 85.95 L33.6 86.1 L33.9 86.25 L34.4 86.4 L35.1 86.5 L35.1 91.5 L33.85 91.45 L32.65 91.3 L31.5 90.95 L30.4 90.4 L29.4 89.65 L28.55 88.75 L27.9 87.65 L27.45 86.5 L27.2 85.25 L27.1 84 Z M35.1 86.5 L36.85 87.25 L37.6 89 L36.85 90.75 L35.1 91.5 Z M35.1 86.5 L91.8 86.5 L91.8 91.5 L35.1 91.5 Z M91.8 86.5 L93.3 87.5 L94.3 89 L93.3 90.5 L91.8 91.5 Z M91.8 86.5 L89.3 86.5 L91.8 78 L92.8 78 Z",
      "M45.1 59.25 L44.4 61 L43.7 62.8 L42.95 64.6 L42.2 66.35 L41.35 68.1 L40.5 69.85 L39.6 71.55 L38.65 73.25 L37.6 74.95 L36.6 76.65 L35.8 76.3 L36.2 74.4 L36.5 72.45 L36.85 70.6 L37.25 68.7 L37.6 66.85 L37.95 65 L38.3 63.15 L38.65 61.3 L39 59.5 L39.3 57.7 Z M39.15 58.15 L39.5 56.85 L45.1 59.25 Z M45.1 59.25 L46.3 60.6 L43.5 61.4 Z M32.75 74.45 L34.05 74.3 L35.4 74.1 L36.75 73.9 L38.15 73.7 L39.6 73.5 L41.05 73.3 L42.55 73.15 L44.1 73 L45.7 72.85 L47.3 72.55 L47.55 73.4 L46.1 74.1 L44.75 74.9 L43.4 75.7 L42.05 76.4 L40.7 77.1 L39.4 77.8 L38.15 78.4 L36.9 79.05 L35.7 79.65 L34.5 80.2 Z M34.5 80.2 L31.8 74.75 L32.75 74.45 Z M34.5 80.2 L36.95 77.9 L35.9 81.35 Z",
      "M44 65.55 L45 66.55 L46.1 67.4 L47.1 68.4 L48.05 69.5 L48.95 70.65 L49.8 71.85 L50.6 73.15 L51.3 74.45 L51.95 75.85 L52.55 77.3 L46.7 78.7 L46.6 77.4 L46.4 76.1 L46.2 74.8 L45.9 73.55 L45.6 72.3 L45.25 71.05 L44.85 69.8 L44.45 68.55 L44 67.3 L43.3 66.15 Z M52.55 77.3 L52.15 79.55 L50.35 80.95 L48.05 80.55 L46.7 78.7 Z",
      "M68.85 9 L67.45 12.7 L66 16.2 L64.4 19.6 L62.7 22.9 L60.95 26.05 L59.05 29.05 L57.05 31.9 L54.95 34.6 L52.7 37.1 L50.3 39.4 L49.6 38.85 L51.2 36 L52.75 33.1 L54.25 30.2 L55.75 27.2 L57.15 24.1 L58.5 20.9 L59.8 17.65 L61 14.25 L62.1 10.75 L63.15 7.2 Z M63 7.65 L63.4 6.4 L68.85 9 Z M68.85 9 L70 10.45 L67.15 11.1 Z",
      "M63.5 25.1 L63.5 79.9 L57.5 82.9 L57.5 22.1 Z",
      "M84.5 10.65 L83.7 12 L82.85 13.35 L81.9 14.8 L80.95 16.3 L79.95 17.85 L78.85 19.45 L77.7 21.1 L76.5 22.75 L75.15 24.5 L73.85 26.3 L73.05 25.85 L73.85 23.8 L74.45 21.7 L75.15 19.75 L75.75 17.9 L76.4 16.1 L77 14.35 L77.55 12.7 L78.1 11.15 L78.55 9.65 L79 8.2 Z M78.8 8.65 L79.3 7.6 L84.5 10.65 Z M84.5 10.65 L85.45 12.2 L82.55 12.55 Z",
      "M60.5 25.1 L92.5 25.1 L92.5 27.1 L60.5 27.1 Z M92.5 25.1 L80.5 26.1 L86.5 20.1 Z",
      "M60.5 41.3 L91.7 41.3 L91.7 43.3 L60.5 43.3 Z M91.7 41.3 L79.7 42.3 L85.7 36.3 Z",
      "M60.5 57.95 L91.7 57.95 L91.7 59.95 L60.5 59.95 Z M91.7 57.95 L79.7 58.95 L85.7 52.95 Z",
      "M78.5 25.1 L78.5 78.4 L72.5 78.4 L72.5 25.1 Z",
      "M60.5 76.4 L94.1 76.4 L94.1 78.4 L60.5 78.4 Z M94.1 76.4 L82.1 77.4 L88.1 71.4 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M30.65 10.05 L29.85 11.45 L29.05 12.85 L28.15 14.3 L27.25 15.7 L26.3 17.2 L25.3 18.65 L24.25 20.15 L23.15 21.65 L21.95 23.1 L20.8 24.7 L20 24.25 L20.65 22.45 L21.2 20.65 L21.75 18.85 L22.25 17.15 L22.8 15.5 L23.3 13.9 L23.8 12.3 L24.25 10.75 L24.7 9.25 L25.1 7.8 Z M24.9 8.25 L25.35 7.15 L30.65 10.05 Z M30.65 10.05 L31.65 11.55 L28.75 12 Z",
          "bounds": [
            20,
            7.15,
            31.65,
            24.7
          ],
          "direction": "curve",
          "weight": 17.734782,
          "revealPath": "M28.07 8.5 Q25.01 16 20.42 24.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M15.25 23.5 L15.25 57 L9.25 60 L9.25 20.5 Z",
          "bounds": [
            9.25,
            20.5,
            15.25,
            60
          ],
          "direction": "down",
          "weight": 25.5
        }
      ],
      [
        {
          "outline": "M12.25 23.5 L44.35 23.5 L44.35 25.5 L12.25 25.5 Z",
          "bounds": [
            12.25,
            23.5,
            44.35,
            25.5
          ],
          "direction": "right",
          "weight": 32.13
        },
        {
          "outline": "M47.35 24.5 L47.35 51 L41.35 54 L41.35 24.5 Z M41.35 23.5 L44.35 21 L49.85 25.5 L47.35 27.5 L41.35 24.5 Z",
          "bounds": [
            41.35,
            21,
            49.85,
            54
          ],
          "direction": "down",
          "weight": 25.5
        }
      ],
      [
        {
          "outline": "M12.25 36.5 L44.35 36.5 L44.35 38.5 L12.25 38.5 Z",
          "bounds": [
            12.25,
            36.5,
            44.35,
            38.5
          ],
          "direction": "right",
          "weight": 32.13
        }
      ],
      [
        {
          "outline": "M31.05 23.5 L31.05 51 L25.05 51 L25.05 23.5 Z",
          "bounds": [
            25.05,
            23.5,
            31.05,
            51
          ],
          "direction": "down",
          "weight": 25.5
        }
      ],
      [
        {
          "outline": "M12.25 49 L44.35 49 L44.35 51 L12.25 51 Z",
          "bounds": [
            12.25,
            49,
            44.35,
            51
          ],
          "direction": "right",
          "weight": 32.13
        }
      ],
      [
        {
          "outline": "M24.4 51.45 L24.2 58.4 L23.6 64.85 L22.65 70.75 L21.3 76.15 L19.6 80.95 L17.45 85.2 L15 88.9 L12.1 91.9 L8.85 94.25 L5.3 95.9 L4.9 95.05 L7.7 92.75 L10.15 90.05 L12.3 87 L14.1 83.5 L15.6 79.5 L16.8 74.95 L17.7 69.9 L18.25 64.35 L18.5 58.2 L18.4 51.5 Z M18.45 52 L18.4 50.35 L24.4 51.45 Z M24.4 51.45 L25.95 52.4 L23.45 53.95 Z",
          "bounds": [
            4.9,
            50.35,
            25.95,
            95.9
          ],
          "direction": "curve",
          "weight": 47.398232,
          "revealPath": "M21.44 51 Q21.95 87 5.12 95.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M33.1 51.5 L33.1 84 L27.1 84 L27.1 50.5 Z M33.1 51.5 L34.6 52.5 L32.1 54 Z M27.1 84 L33.1 84 L31.9 85.8 L30.1 87 L28.3 85.8 Z M33.1 84 L33.05 84.6 L33.1 85.05 L33.15 85.4 L33.2 85.6 L33.3 85.8 L33.4 85.95 L33.6 86.1 L33.9 86.25 L34.4 86.4 L35.1 86.5 L35.1 91.5 L33.85 91.45 L32.65 91.3 L31.5 90.95 L30.4 90.4 L29.4 89.65 L28.55 88.75 L27.9 87.65 L27.45 86.5 L27.2 85.25 L27.1 84 Z M35.1 86.5 L36.85 87.25 L37.6 89 L36.85 90.75 L35.1 91.5 Z M35.1 86.5 L91.8 86.5 L91.8 91.5 L35.1 91.5 Z M91.8 86.5 L93.3 87.5 L94.3 89 L93.3 90.5 L91.8 91.5 Z",
          "bounds": [
            27.1,
            50.5,
            94.3,
            91.5
          ],
          "direction": "curve",
          "weight": 96.781068,
          "revealPath": "M30.11 51 L30.11 84 Q30.11 89 35.11 89 L91.82 89",
          "revealWidth": 14
        },
        {
          "outline": "M91.8 86.5 L89.3 86.5 L91.8 78 L92.8 78 Z",
          "bounds": [
            89.3,
            78,
            92.8,
            86.5
          ],
          "direction": "up",
          "weight": 8.5
        }
      ],
      [
        {
          "outline": "M45.1 59.25 L44.4 61 L43.7 62.8 L42.95 64.6 L42.2 66.35 L41.35 68.1 L40.5 69.85 L39.6 71.55 L38.65 73.25 L37.6 74.95 L36.6 76.65 L35.8 76.3 L36.2 74.4 L36.5 72.45 L36.85 70.6 L37.25 68.7 L37.6 66.85 L37.95 65 L38.3 63.15 L38.65 61.3 L39 59.5 L39.3 57.7 Z M39.15 58.15 L39.5 56.85 L45.1 59.25 Z M45.1 59.25 L46.3 60.6 L43.5 61.4 Z",
          "bounds": [
            35.8,
            56.85,
            46.3,
            76.65
          ],
          "direction": "curve",
          "weight": 19.486005,
          "revealPath": "M42.35 58 Q39.8 67.5 36.23 76.5",
          "revealWidth": 14
        },
        {
          "outline": "M32.75 74.45 L34.05 74.3 L35.4 74.1 L36.75 73.9 L38.15 73.7 L39.6 73.5 L41.05 73.3 L42.55 73.15 L44.1 73 L45.7 72.85 L47.3 72.55 L47.55 73.4 L46.1 74.1 L44.75 74.9 L43.4 75.7 L42.05 76.4 L40.7 77.1 L39.4 77.8 L38.15 78.4 L36.9 79.05 L35.7 79.65 L34.5 80.2 Z M34.5 80.2 L31.8 74.75 L32.75 74.45 Z M34.5 80.2 L36.95 77.9 L35.9 81.35 Z",
          "bounds": [
            31.8,
            72.55,
            47.55,
            81.35
          ],
          "direction": "curve",
          "weight": 14.972254,
          "revealPath": "M33.17 77.5 Q39.8 75.5 47.45 73",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M44 65.55 L45 66.55 L46.1 67.4 L47.1 68.4 L48.05 69.5 L48.95 70.65 L49.8 71.85 L50.6 73.15 L51.3 74.45 L51.95 75.85 L52.55 77.3 L46.7 78.7 L46.6 77.4 L46.4 76.1 L46.2 74.8 L45.9 73.55 L45.6 72.3 L45.25 71.05 L44.85 69.8 L44.45 68.55 L44 67.3 L43.3 66.15 Z M52.55 77.3 L52.15 79.55 L50.35 80.95 L48.05 80.55 L46.7 78.7 Z",
          "bounds": [
            43.3,
            65.55,
            52.55,
            80.95
          ],
          "direction": "curve",
          "weight": 15.490542,
          "revealPath": "M43.37 65.5 Q47.96 71 50 79.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68.85 9 L67.45 12.7 L66 16.2 L64.4 19.6 L62.7 22.9 L60.95 26.05 L59.05 29.05 L57.05 31.9 L54.95 34.6 L52.7 37.1 L50.3 39.4 L49.6 38.85 L51.2 36 L52.75 33.1 L54.25 30.2 L55.75 27.2 L57.15 24.1 L58.5 20.9 L59.8 17.65 L61 14.25 L62.1 10.75 L63.15 7.2 Z M63 7.65 L63.4 6.4 L68.85 9 Z M68.85 9 L70 10.45 L67.15 11.1 Z",
          "bounds": [
            49.6,
            6.4,
            70,
            39.4
          ],
          "direction": "curve",
          "weight": 35.421604,
          "revealPath": "M66.195 7.65 Q60.12 26.55 49.995000000000005 39.15",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M63.5 25.1 L63.5 79.9 L57.5 82.9 L57.5 22.1 Z",
          "bounds": [
            57.5,
            22.1,
            63.5,
            82.9
          ],
          "direction": "down",
          "weight": 51.3
        }
      ],
      [
        {
          "outline": "M84.5 10.65 L83.7 12 L82.85 13.35 L81.9 14.8 L80.95 16.3 L79.95 17.85 L78.85 19.45 L77.7 21.1 L76.5 22.75 L75.15 24.5 L73.85 26.3 L73.05 25.85 L73.85 23.8 L74.45 21.7 L75.15 19.75 L75.75 17.9 L76.4 16.1 L77 14.35 L77.55 12.7 L78.1 11.15 L78.55 9.65 L79 8.2 Z M78.8 8.65 L79.3 7.6 L84.5 10.65 Z M84.5 10.65 L85.45 12.2 L82.55 12.55 Z",
          "bounds": [
            73.05,
            7.6,
            85.45,
            26.3
          ],
          "direction": "curve",
          "weight": 19.098299,
          "revealPath": "M81.99000000000001 9 Q78.75 16.2 73.485 26.1",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M60.5 25.1 L92.5 25.1 L92.5 27.1 L60.5 27.1 Z M92.5 25.1 L80.5 26.1 L86.5 20.1 Z",
          "bounds": [
            60.5,
            20.1,
            92.5,
            27.1
          ],
          "direction": "right",
          "weight": 31.995
        }
      ],
      [
        {
          "outline": "M60.5 41.3 L91.7 41.3 L91.7 43.3 L60.5 43.3 Z M91.7 41.3 L79.7 42.3 L85.7 36.3 Z",
          "bounds": [
            60.5,
            36.3,
            91.7,
            43.3
          ],
          "direction": "right",
          "weight": 31.185
        }
      ],
      [
        {
          "outline": "M60.5 57.95 L91.7 57.95 L91.7 59.95 L60.5 59.95 Z M91.7 57.95 L79.7 58.95 L85.7 52.95 Z",
          "bounds": [
            60.5,
            52.95,
            91.7,
            59.95
          ],
          "direction": "right",
          "weight": 31.185
        }
      ],
      [
        {
          "outline": "M78.5 25.1 L78.5 78.4 L72.5 78.4 L72.5 25.1 Z",
          "bounds": [
            72.5,
            25.1,
            78.5,
            78.4
          ],
          "direction": "down",
          "weight": 51.3
        }
      ],
      [
        {
          "outline": "M60.5 76.4 L94.1 76.4 L94.1 78.4 L60.5 78.4 Z M94.1 76.4 L82.1 77.4 L88.1 71.4 Z",
          "bounds": [
            60.5,
            71.4,
            94.1,
            78.4
          ],
          "direction": "right",
          "weight": 33.615
        }
      ]
    ],
    "pathsSha256": "20f0ede8f69fa18eac505c1210d81a897efcca6f8757f2fd9f3c2f8622750c3a",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9b00/9b4b.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9b00/9b4b.svg",
      "dictionarySvgSha256": "03d5b532254a7b5b9d966f24f0752a56035357b84a48b50c2c0b0d5a266b424a",
      "dictionaryDirectionStrokes": "국내18 정적17화면·공식18macro54는 별도 원근거. 원45Pexactonce/원8body guide·폭·weight 보존. 새UPmicroclock과 원미세시간 동일성·모든프레임·제품UI 승인은 별개.",
      "orderReviewSha256": "130d54c2a3de9e4721d6498073997e55f760c16ddce5fbc4ad0e2c9ee5324507",
      "geometryReviewSha256": "0489f54c1c8cf09a7e574aa7536e8a26503e80da83e458f8c39c1051698b62aa",
      "directionReviewSha256": "45e004431ea96486811858f13407847ce6c99bdcded4d9e035280a877d5748b5"
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
export function loadGlyphWikiBatch1392Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1392 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1392_STROKES:ReturnType<typeof loadGlyphWikiBatch1392Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1392_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1392_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1392_ASSIGNMENT_PROVISIONAL=true

export const GLYPHWIKI_BATCH1392_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u9b4b-activation-review.json","SHA256":"0489f54c1c8cf09a7e574aa7536e8a26503e80da83e458f8c39c1051698b62aa"})
