import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1356 미등록후보. 정적14그룹만 확인; native/APP/runtime 미승인. */
const EXPECTED = [
  {
    "glyph": "戩",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "851e13bba4d836c5fba365d19e04ce0e68184a5134ece558df8b8e0a37006515",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      5,
      7,
      8,
      9,
      10,
      12,
      13,
      14,
      16,
      17,
      15
    ],
    "paths": [
      "M9.1 11.5 L54.85 11.5 L54.85 13.5 L9.1 13.5 Z M54.85 11.5 L42.85 12.5 L48.85 6.5 Z",
      "M23.4 14.7 L22.75 17.1 L22.05 19.55 L21.35 22 L20.65 24.4 L19.9 26.85 L19.1 29.25 L18.25 31.65 L17.4 34 L16.4 36.35 L15.3 38.65 L14.45 38.45 L14.55 35.9 L14.8 33.35 L15.1 30.85 L15.4 28.35 L15.75 25.9 L16.1 23.4 L16.45 20.9 L16.8 18.45 L17.2 15.95 L17.55 13.5 Z M17.45 14 L17.7 12.55 L23.4 14.7 Z M23.4 14.7 L24.7 15.95 L21.95 16.95 Z M10.35 36.15 L11.85 36.15 L13.45 36.15 L15.15 36.1 L16.85 36.05 L18.65 35.95 L20.55 35.9 L22.5 35.8 L24.5 35.75 L26.6 35.7 L28.75 35.55 L28.95 36.45 L26.9 37.15 L24.95 37.95 L23.05 38.65 L21.15 39.25 L19.35 39.85 L17.6 40.35 L15.85 40.85 L14.2 41.3 L12.6 41.75 L11.05 42.1 Z M11.05 42.1 L9.35 36.3 L10.35 36.15 Z M11.05 42.1 L13.85 40.25 L12.2 43.5 Z",
      "M23.55 23.7 L24.75 25.15 L26 26.55 L27.15 28.05 L28.2 29.55 L29.2 31.1 L30.1 32.7 L31 34.3 L31.75 35.9 L32.5 37.55 L33.2 39.2 L27.4 40.75 L27.15 39.2 L26.8 37.6 L26.45 35.95 L26.05 34.35 L25.6 32.7 L25.15 31.05 L24.6 29.35 L24.05 27.65 L23.5 25.9 L22.8 24.2 Z M33.2 39.2 L32.85 41.45 L31.05 42.9 L28.8 42.55 L27.4 40.75 Z",
      "M45.7 14.7 L45.05 17.1 L44.35 19.55 L43.65 22 L42.95 24.4 L42.2 26.85 L41.4 29.25 L40.55 31.65 L39.7 34 L38.7 36.35 L37.6 38.65 L36.7 38.45 L36.85 35.9 L37.1 33.35 L37.35 30.85 L37.7 28.35 L38.05 25.9 L38.4 23.4 L38.75 20.9 L39.1 18.45 L39.45 15.95 L39.8 13.5 Z M39.7 14 L40 12.55 L45.7 14.7 Z M45.7 14.7 L47 15.95 L44.25 16.95 Z M33.4 36.15 L34.85 36.15 L36.4 36.15 L38 36.1 L39.7 36.05 L41.4 36 L43.2 35.9 L45.05 35.8 L47 35.75 L49 35.7 L51.05 35.55 L51.25 36.45 L49.3 37.15 L47.45 37.95 L45.65 38.6 L43.85 39.25 L42.1 39.8 L40.4 40.35 L38.75 40.85 L37.2 41.3 L35.65 41.75 L34.15 42.1 Z M34.15 42.1 L32.4 36.3 L33.4 36.15 Z M34.15 42.1 L36.95 40.25 L35.3 43.5 Z",
      "M45.85 23.7 L47.05 25.15 L48.3 26.55 L49.45 28.05 L50.5 29.55 L51.5 31.1 L52.4 32.7 L53.25 34.3 L54.05 35.9 L54.8 37.55 L55.5 39.2 L49.7 40.75 L49.45 39.2 L49.1 37.6 L48.75 35.95 L48.35 34.35 L47.9 32.7 L47.45 31.05 L46.9 29.35 L46.35 27.65 L45.8 25.9 L45.1 24.2 Z M55.5 39.2 L55.15 41.45 L53.35 42.9 L51.1 42.55 L49.7 40.75 Z",
      "M6.05 47.5 L57.9 47.5 L57.9 49.5 L6.05 49.5 Z M57.9 47.5 L45.9 48.5 L51.9 42.5 Z",
      "M19.35 57.3 L19.35 91.7 L13.35 94.7 L13.35 54.3 Z",
      "M16.35 57.3 L47.6 57.3 L47.6 59.3 L16.35 59.3 Z M50.6 58.3 L50.6 88.2 L44.6 91.2 L44.6 58.3 Z M44.6 57.3 L47.6 54.8 L53.1 59.3 L50.6 61.3 L44.6 58.3 Z",
      "M16.35 71.3 L47.6 71.3 L47.6 73.3 L16.35 73.3 Z",
      "M16.35 86.2 L47.6 86.2 L47.6 88.2 L16.35 88.2 Z",
      "M56.5 36.5 L93.7 33.5 L93.85 35.45 L56.65 38.45 Z M93.7 33.5 L81.8 35.45 L87.3 29 Z",
      "M70.4 7.5 L70.95 28.3 L72.5 45.25 L74.75 58.6 L77.5 68.85 L80.5 76.25 L83.55 81.35 L86.35 84.5 L88.65 86.15 L90.35 86.85 L91.2 87 L91.2 93 L88.8 92.65 L85.8 91.4 L82.35 88.95 L78.7 84.9 L75.15 78.95 L71.8 70.75 L68.85 59.9 L66.55 46 L64.95 28.65 L64.4 7.5 Z M64.4 8 L64.4 6.3 L70.4 7.5 Z M70.4 7.5 L71.9 8.5 L69.4 10 Z M91.2 87 L93.3 87.9 L94.2 90 L93.3 92.1 L91.2 93 Z M91.2 87.5 L88.2 87.5 L91.2 74.5 L92.2 74.5 Z",
      "M89.1 48.9 L86.3 56.05 L83.15 62.65 L79.65 68.7 L75.9 74.2 L71.8 79.1 L67.35 83.4 L62.65 87.15 L57.65 90.25 L52.35 92.65 L46.8 94.4 L46.5 93.55 L51.55 90.95 L56.25 87.95 L60.65 84.55 L64.75 80.7 L68.55 76.35 L72.1 71.5 L75.35 66.15 L78.3 60.3 L81 53.9 L83.45 47 Z M83.25 47.45 L83.7 46.25 L89.1 48.9 Z M89.1 48.9 L90.2 50.35 L87.35 50.95 Z",
      "M75.4 10.35 L77.1 11.15 L78.75 11.85 L80.35 12.75 L81.85 13.7 L83.25 14.75 L84.55 15.9 L85.8 17.15 L86.95 18.45 L88 19.9 L88.95 21.35 L83.5 23.85 L83.05 22.55 L82.55 21.25 L81.95 19.95 L81.25 18.65 L80.45 17.4 L79.55 16.1 L78.55 14.85 L77.45 13.6 L76.3 12.3 L74.95 11.1 Z M88.95 21.35 L89 23.65 L87.5 25.35 L85.2 25.4 L83.5 23.85 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M9.1 11.5 L54.85 11.5 L54.85 13.5 L9.1 13.5 Z M54.85 11.5 L42.85 12.5 L48.85 6.5 Z",
          "bounds": [
            9.1,
            6.5,
            54.85,
            13.5
          ],
          "direction": "right",
          "weight": 45.75
        }
      ],
      [
        {
          "outline": "M23.4 14.7 L22.75 17.1 L22.05 19.55 L21.35 22 L20.65 24.4 L19.9 26.85 L19.1 29.25 L18.25 31.65 L17.4 34 L16.4 36.35 L15.3 38.65 L14.45 38.45 L14.55 35.9 L14.8 33.35 L15.1 30.85 L15.4 28.35 L15.75 25.9 L16.1 23.4 L16.45 20.9 L16.8 18.45 L17.2 15.95 L17.55 13.5 Z M17.45 14 L17.7 12.55 L23.4 14.7 Z M23.4 14.7 L24.7 15.95 L21.95 16.95 Z",
          "bounds": [
            14.45,
            12.55,
            24.7,
            38.65
          ],
          "direction": "curve",
          "weight": 25.60335,
          "revealPath": "M20.593 13.62 Q18.0005 26.42 14.8895 38.58",
          "revealWidth": 14
        },
        {
          "outline": "M10.35 36.15 L11.85 36.15 L13.45 36.15 L15.15 36.1 L16.85 36.05 L18.65 35.95 L20.55 35.9 L22.5 35.8 L24.5 35.75 L26.6 35.7 L28.75 35.55 L28.95 36.45 L26.9 37.15 L24.95 37.95 L23.05 38.65 L21.15 39.25 L19.35 39.85 L17.6 40.35 L15.85 40.85 L14.2 41.3 L12.6 41.75 L11.05 42.1 Z M11.05 42.1 L9.35 36.3 L10.35 36.15 Z M11.05 42.1 L13.85 40.25 L12.2 43.5 Z",
          "bounds": [
            9.35,
            35.55,
            28.95,
            43.5
          ],
          "direction": "curve",
          "weight": 18.938309,
          "revealPath": "M10.223 39.22 Q18.25975 38.260000000000005 28.889 36.019999999999996",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M23.55 23.7 L24.75 25.15 L26 26.55 L27.15 28.05 L28.2 29.55 L29.2 31.1 L30.1 32.7 L31 34.3 L31.75 35.9 L32.5 37.55 L33.2 39.2 L27.4 40.75 L27.15 39.2 L26.8 37.6 L26.45 35.95 L26.05 34.35 L25.6 32.7 L25.15 31.05 L24.6 29.35 L24.05 27.65 L23.5 25.9 L22.8 24.2 Z M33.2 39.2 L32.85 41.45 L31.05 42.9 L28.8 42.55 L27.4 40.75 Z",
          "bounds": [
            22.8,
            23.7,
            33.2,
            42.9
          ],
          "direction": "curve",
          "weight": 19.534992,
          "revealPath": "M22.92625 23.54 Q28.11125 31.86 30.70375 41.46",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.7 14.7 L45.05 17.1 L44.35 19.55 L43.65 22 L42.95 24.4 L42.2 26.85 L41.4 29.25 L40.55 31.65 L39.7 34 L38.7 36.35 L37.6 38.65 L36.7 38.45 L36.85 35.9 L37.1 33.35 L37.35 30.85 L37.7 28.35 L38.05 25.9 L38.4 23.4 L38.75 20.9 L39.1 18.45 L39.45 15.95 L39.8 13.5 Z M39.7 14 L40 12.55 L45.7 14.7 Z M45.7 14.7 L47 15.95 L44.25 16.95 Z",
          "bounds": [
            36.7,
            12.55,
            47,
            38.65
          ],
          "direction": "curve",
          "weight": 25.60335,
          "revealPath": "M42.88849999999999 13.62 Q40.296 26.42 37.185 38.58",
          "revealWidth": 14
        },
        {
          "outline": "M33.4 36.15 L34.85 36.15 L36.4 36.15 L38 36.1 L39.7 36.05 L41.4 36 L43.2 35.9 L45.05 35.8 L47 35.75 L49 35.7 L51.05 35.55 L51.25 36.45 L49.3 37.15 L47.45 37.95 L45.65 38.6 L43.85 39.25 L42.1 39.8 L40.4 40.35 L38.75 40.85 L37.2 41.3 L35.65 41.75 L34.15 42.1 Z M34.15 42.1 L32.4 36.3 L33.4 36.15 Z M34.15 42.1 L36.95 40.25 L35.3 43.5 Z",
          "bounds": [
            32.4,
            35.55,
            51.25,
            43.5
          ],
          "direction": "curve",
          "weight": 18.172217,
          "revealPath": "M33.29625 39.22 Q41.07375 38.260000000000005 51.1845 36.019999999999996",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.85 23.7 L47.05 25.15 L48.3 26.55 L49.45 28.05 L50.5 29.55 L51.5 31.1 L52.4 32.7 L53.25 34.3 L54.05 35.9 L54.8 37.55 L55.5 39.2 L49.7 40.75 L49.45 39.2 L49.1 37.6 L48.75 35.95 L48.35 34.35 L47.9 32.7 L47.45 31.05 L46.9 29.35 L46.35 27.65 L45.8 25.9 L45.1 24.2 Z M55.5 39.2 L55.15 41.45 L53.35 42.9 L51.1 42.55 L49.7 40.75 Z",
          "bounds": [
            45.1,
            23.7,
            55.5,
            42.9
          ],
          "direction": "curve",
          "weight": 19.534992,
          "revealPath": "M45.22175 23.54 Q50.40675 31.86 52.99925 41.46",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.05 47.5 L57.9 47.5 L57.9 49.5 L6.05 49.5 Z M57.9 47.5 L45.9 48.5 L51.9 42.5 Z",
          "bounds": [
            6.05,
            42.5,
            57.9,
            49.5
          ],
          "direction": "right",
          "weight": 51.85
        }
      ],
      [
        {
          "outline": "M19.35 57.3 L19.35 91.7 L13.35 94.7 L13.35 54.3 Z",
          "bounds": [
            13.35,
            54.3,
            19.35,
            94.7
          ],
          "direction": "down",
          "weight": 28.9
        }
      ],
      [
        {
          "outline": "M16.35 57.3 L47.6 57.3 L47.6 59.3 L16.35 59.3 Z M50.6 58.3 L50.6 88.2 L44.6 91.2 L44.6 58.3 Z M44.6 57.3 L47.6 54.8 L53.1 59.3 L50.6 61.3 L44.6 58.3 Z",
          "bounds": [
            16.35,
            54.8,
            53.1,
            91.2
          ],
          "direction": "curve",
          "weight": 60.193,
          "revealPath": "M16.353500000000004 58.3 L47.6465 58.3 L47.6465 87.2",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M16.35 71.3 L47.6 71.3 L47.6 73.3 L16.35 73.3 Z",
          "bounds": [
            16.35,
            71.3,
            47.6,
            73.3
          ],
          "direction": "right",
          "weight": 31.293
        }
      ],
      [
        {
          "outline": "M16.35 86.2 L47.6 86.2 L47.6 88.2 L16.35 88.2 Z",
          "bounds": [
            16.35,
            86.2,
            47.6,
            88.2
          ],
          "direction": "right",
          "weight": 31.293
        }
      ],
      [
        {
          "outline": "M56.5 36.5 L93.7 33.5 L93.85 35.45 L56.65 38.45 Z M93.7 33.5 L81.8 35.45 L87.3 29 Z",
          "bounds": [
            56.5,
            29,
            93.85,
            38.45
          ],
          "direction": "curve",
          "weight": 37.315788,
          "revealPath": "M56.615 37.5 L93.81 34.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M70.4 7.5 L70.95 28.3 L72.5 45.25 L74.75 58.6 L77.5 68.85 L80.5 76.25 L83.55 81.35 L86.35 84.5 L88.65 86.15 L90.35 86.85 L91.2 87 L91.2 93 L88.8 92.65 L85.8 91.4 L82.35 88.95 L78.7 84.9 L75.15 78.95 L71.8 70.75 L68.85 59.9 L66.55 46 L64.95 28.65 L64.4 7.5 Z M64.4 8 L64.4 6.3 L70.4 7.5 Z M70.4 7.5 L71.9 8.5 L69.4 10 Z M91.2 87 L93.3 87.9 L94.2 90 L93.3 92.1 L91.2 93 Z M91.2 87.5 L88.2 87.5 L91.2 74.5 L92.2 74.5 Z",
          "bounds": [
            64.4,
            6.3,
            94.2,
            93
          ],
          "direction": "curve",
          "weight": 86.341445,
          "revealPath": "M67.42750000000001 7 C67.42750000000001 84.5 87.3225 90 91.215 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M89.1 48.9 L86.3 56.05 L83.15 62.65 L79.65 68.7 L75.9 74.2 L71.8 79.1 L67.35 83.4 L62.65 87.15 L57.65 90.25 L52.35 92.65 L46.8 94.4 L46.5 93.55 L51.55 90.95 L56.25 87.95 L60.65 84.55 L64.75 80.7 L68.55 76.35 L72.1 71.5 L75.35 66.15 L78.3 60.3 L81 53.9 L83.45 47 Z M83.25 47.45 L83.7 46.25 L89.1 48.9 Z M89.1 48.9 L90.2 50.35 L87.35 50.95 Z",
          "bounds": [
            46.5,
            46.25,
            90.2,
            94.4
          ],
          "direction": "curve",
          "weight": 61.200442,
          "revealPath": "M86.4575 47.5 Q73.91499999999999 84.5 46.6675 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.4 10.35 L77.1 11.15 L78.75 11.85 L80.35 12.75 L81.85 13.7 L83.25 14.75 L84.55 15.9 L85.8 17.15 L86.95 18.45 L88 19.9 L88.95 21.35 L83.5 23.85 L83.05 22.55 L82.55 21.25 L81.95 19.95 L81.25 18.65 L80.45 17.4 L79.55 16.1 L78.55 14.85 L77.45 13.6 L76.3 12.3 L74.95 11.1 Z M88.95 21.35 L89 23.65 L87.5 25.35 L85.2 25.4 L83.5 23.85 Z",
          "bounds": [
            74.95,
            10.35,
            89,
            25.4
          ],
          "direction": "curve",
          "weight": 18.135658,
          "revealPath": "M74.78 10.5 Q82.9975 15.5 86.89 24",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "6061762bd5cf9a1c014e0917a9307bca7ab28d8550c9206e396c9a2133386786",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6229.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6200/6229.svg",
      "dictionarySvgSha256": "53cf6dd4a44eeecb5de026b2f2fd6a55982b0e9cdcff5021b47267186f05f2a3",
      "dictionaryDirectionStrokes": "ROOT14그룹 정적대응만. 방향·시간·초기cap·terminal coverage·APP/runtime 미승인.",
      "orderReviewSha256": "a384ef6a7ebe4c2c3ee1d2c787316981876f9e9c11020175f20e98da1ad44257",
      "geometryReviewSha256": "a384ef6a7ebe4c2c3ee1d2c787316981876f9e9c11020175f20e98da1ad44257"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u6229",
      "revision": "archive a7dd7f3d911936770fa742e8c37d16bee7e2173c의 원9records/whole4 유지",
      "editableSource": "/hanja-strokes/glyphwiki/u6229.json",
      "modifications": "1356 미등록 후보. 원base actualfull5/id3의 17raw17calls38P를 국내14 정적대응으로 순열. QQ2/4는 각각 독립2mask와 원gap 유지; raw10H→11V만 exact endpoint HV. 마지막3은 raw16/17/15. 원P/guide/폭/weight와 UP12 terminal 유지; 새connector/clip/tail분리0."
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
export function loadGlyphWikiBatch1356Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1356 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1356_STROKES:ReturnType<typeof loadGlyphWikiBatch1356Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1356_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1356_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1356_ASSIGNMENT_PROVISIONAL=true
