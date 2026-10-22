import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** 고정13p15m35 원캐시복제. false상수는source준비역사; 현재ROOT유한승인은별도review참조. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable","editableSource":"/hanja-strokes/glyphwiki/u7d8e.json","modifications":"고정13p15m35 fixture를그대로제품복제. 원QQ1/2 독립mask와gap/H-L11/H-Q12/원35P/guide/width/weight 유지. 기하/분할0. 표시만 QQ2 contact-axis/11HJB/cap3 고유정책. 새내부공간배분이며공식미세시간동일성미증명."}}
const EXPECTED: readonly HanjaDictionaryStrokeData[] = [
  {
    ...GEOMETRY_LICENSE,
    "glyph": "綎",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "4b7a32064ee8ddd7cf07d28da9a8931acbec0946c8bd1d28a13b32ec9c453de8",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      5,
      6,
      7,
      8,
      17,
      14,
      15,
      16,
      9,
      11,
      13
    ],
    "paths": [
      "M26 9.65 L24.95 11.6 L23.85 13.55 L22.75 15.45 L21.6 17.4 L20.4 19.25 L19.2 21.15 L17.9 22.95 L16.6 24.75 L15.2 26.5 L13.75 28.2 L12.95 27.75 L13.7 25.65 L14.45 23.55 L15.2 21.5 L15.95 19.45 L16.75 17.4 L17.5 15.4 L18.3 13.35 L19.05 11.3 L19.75 9.3 L20.45 7.25 Z M20.25 7.7 L20.75 6.6 L26 9.65 Z M26 9.65 L26.95 11.15 L24.05 11.5 Z M7.2 22.4 L8.8 23.3 L10.45 24.15 L11.95 25.2 L13.4 26.4 L14.75 27.65 L16 29.05 L17.15 30.55 L18.15 32.15 L19.1 33.85 L19.95 35.6 L14.25 37.5 L13.9 35.9 L13.45 34.35 L12.9 32.85 L12.3 31.4 L11.6 29.95 L10.8 28.55 L9.95 27.15 L8.95 25.8 L7.9 24.4 L6.65 23.15 Z M19.95 35.6 L19.75 37.9 L18.05 39.4 L15.75 39.2 L14.25 37.5 Z",
      "M35.3 21.25 L33.4 24.8 L31.4 28.35 L29.35 31.85 L27.25 35.3 L25.15 38.75 L22.95 42.15 L20.7 45.5 L18.4 48.8 L15.95 52.05 L13.4 55.2 L12.65 54.75 L14.35 51.05 L16.1 47.45 L17.9 43.85 L19.65 40.25 L21.45 36.7 L23.2 33.1 L24.9 29.5 L26.6 25.85 L28.3 22.25 L29.95 18.6 Z M29.7 19.05 L30.2 18.05 L35.3 21.25 Z M35.3 21.25 L36.25 22.8 L33.3 23.05 Z M7.25 53.45 L9.85 53.2 L12.4 52.9 L14.95 52.6 L17.5 52.25 L20.05 51.9 L22.6 51.5 L25.1 51.1 L27.6 50.7 L30.15 50.35 L32.7 50.05 L33 50.9 L30.7 52.15 L28.35 53.3 L25.95 54.25 L23.5 55.2 L21.05 56 L18.5 56.8 L15.95 57.5 L13.35 58.2 L10.75 58.8 L8.1 59.35 Z M8.1 59.35 L6.25 53.6 L7.25 53.45 Z M8.1 59.35 L10.85 57.45 L9.3 60.7 Z",
      "M26.7 39.05 L28.05 40.15 L29.45 41.3 L30.75 42.6 L31.95 44 L33.05 45.55 L34.1 47.25 L35.05 49 L35.9 50.85 L36.7 52.8 L37.4 54.85 L31.55 56.15 L31.25 54.3 L30.95 52.45 L30.55 50.7 L30.05 49 L29.55 47.35 L29 45.7 L28.35 44.15 L27.65 42.6 L26.95 41.1 L26.05 39.65 Z M37.4 54.85 L37 57.1 L35.15 58.45 L32.9 58 L31.55 56.15 Z",
      "M25.15 53.5 L25.15 91.5 L19.15 94.5 L19.15 53.5 Z",
      "M17.25 64.25 L16.8 67.05 L16.2 69.8 L15.5 72.5 L14.7 75.2 L13.75 77.85 L12.7 80.45 L11.5 82.95 L10.15 85.45 L8.65 87.85 L6.9 90.2 L6.15 89.75 L6.9 87.05 L7.7 84.4 L8.4 81.8 L9.1 79.2 L9.7 76.6 L10.2 74.05 L10.6 71.45 L10.9 68.9 L11.15 66.3 L11.3 63.7 Z M11.25 64.2 L11.4 62.6 L17.25 64.25 Z M17.25 64.25 L18.65 65.4 L16.05 66.65 Z",
      "M27 61.05 L28.35 62.25 L29.7 63.55 L30.95 65 L32.1 66.6 L33.15 68.3 L34.1 70.1 L35 72.05 L35.8 74.1 L36.5 76.25 L37.15 78.45 L31.25 79.55 L31 77.45 L30.7 75.45 L30.35 73.5 L29.95 71.65 L29.5 69.85 L28.95 68.15 L28.4 66.45 L27.75 64.8 L27.1 63.2 L26.35 61.65 Z M37.15 78.45 L36.65 80.7 L34.75 81.95 L32.5 81.45 L31.25 79.55 Z",
      "M89.15 16.95 L86.6 17.7 L83.95 18.4 L81.2 19.05 L78.3 19.7 L75.35 20.3 L72.25 20.9 L69.05 21.4 L65.75 21.85 L62.3 22.2 L58.75 22.4 L58.55 21.55 L61.9 20.35 L65.15 19.25 L68.3 18.2 L71.35 17.2 L74.25 16.2 L77.05 15.25 L79.75 14.25 L82.3 13.3 L84.75 12.3 L87.1 11.35 Z M86.6 11.5 L91.8 16 L89.15 16.95 Z M91.8 16 L91.9 17.55 L88.6 16.1 Z",
      "M57.25 42 L93.8 42 L93.8 44 L57.25 44 Z M93.8 42 L81.8 43 L87.8 37 Z",
      "M77.35 18.5 L77.35 74.5 L71.35 74.5 L71.35 18.5 Z",
      "M57.7 73 L91.9 73 L91.9 75 L57.7 75 Z M91.9 73 L79.9 74 L85.9 68 Z",
      "M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z",
      "M43 43.5 L55.8 43.5 L55.8 45.5 L43 45.5 Z M58.8 44.7 L57.85 52.35 L56.55 59.45 L54.85 65.95 L52.75 71.85 L50.2 77.15 L47.3 81.85 L44 85.95 L40.3 89.3 L36.2 92 L31.75 93.9 L31.4 93.05 L35.15 90.4 L38.5 87.3 L41.5 83.8 L44.1 79.8 L46.4 75.3 L48.4 70.2 L50 64.6 L51.3 58.4 L52.2 51.6 L52.8 44.25 Z M52.8 43.5 L55.8 41 L61.3 45.5 L58.8 47 L52.8 49.5 Z",
      "M40.65 57.4 L42.7 63.8 L45.3 69.25 L48.5 73.9 L52.3 77.7 L56.7 80.75 L61.8 83.05 L67.6 84.7 L74.2 85.6 L81.55 85.75 L89.7 85.2 L90.3 91.75 L81.55 92 L73.55 91.45 L66.35 90.05 L59.85 87.8 L54.25 84.7 L49.45 80.75 L45.6 76.05 L42.65 70.55 L40.7 64.4 L39.75 57.55 Z M90.3 91.75 L89.7 85.2 L95.05 84.7 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M26 9.65 L24.95 11.6 L23.85 13.55 L22.75 15.45 L21.6 17.4 L20.4 19.25 L19.2 21.15 L17.9 22.95 L16.6 24.75 L15.2 26.5 L13.75 28.2 L12.95 27.75 L13.7 25.65 L14.45 23.55 L15.2 21.5 L15.95 19.45 L16.75 17.4 L17.5 15.4 L18.3 13.35 L19.05 11.3 L19.75 9.3 L20.45 7.25 Z M20.25 7.7 L20.75 6.6 L26 9.65 Z M26 9.65 L26.95 11.15 L24.05 11.5 Z",
          "bounds": [
            12.95,
            6.6,
            26.95,
            28.2
          ],
          "direction": "curve",
          "weight": 22.394321,
          "revealPath": "M23.45 8 Q18.9 18.5 13.375 28",
          "revealWidth": 14
        },
        {
          "outline": "M7.2 22.4 L8.8 23.3 L10.45 24.15 L11.95 25.2 L13.4 26.4 L14.75 27.65 L16 29.05 L17.15 30.55 L18.15 32.15 L19.1 33.85 L19.95 35.6 L14.25 37.5 L13.9 35.9 L13.45 34.35 L12.9 32.85 L12.3 31.4 L11.6 29.95 L10.8 28.55 L9.95 27.15 L8.95 25.8 L7.9 24.4 L6.65 23.15 Z M19.95 35.6 L19.75 37.9 L18.05 39.4 L15.75 39.2 L14.25 37.5 Z",
          "bounds": [
            6.65,
            22.4,
            19.95,
            39.4
          ],
          "direction": "curve",
          "weight": 19.035559,
          "revealPath": "M6.55 22.5 Q14.35 28 17.6 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M35.3 21.25 L33.4 24.8 L31.4 28.35 L29.35 31.85 L27.25 35.3 L25.15 38.75 L22.95 42.15 L20.7 45.5 L18.4 48.8 L15.95 52.05 L13.4 55.2 L12.65 54.75 L14.35 51.05 L16.1 47.45 L17.9 43.85 L19.65 40.25 L21.45 36.7 L23.2 33.1 L24.9 29.5 L26.6 25.85 L28.3 22.25 L29.95 18.6 Z M29.7 19.05 L30.2 18.05 L35.3 21.25 Z M35.3 21.25 L36.25 22.8 L33.3 23.05 Z",
          "bounds": [
            12.65,
            18.05,
            36.25,
            55.2
          ],
          "direction": "curve",
          "weight": 40.660554,
          "revealPath": "M32.875 19.5 Q23.775 38 13.05 55",
          "revealWidth": 14
        },
        {
          "outline": "M7.25 53.45 L9.85 53.2 L12.4 52.9 L14.95 52.6 L17.5 52.25 L20.05 51.9 L22.6 51.5 L25.1 51.1 L27.6 50.7 L30.15 50.35 L32.7 50.05 L33 50.9 L30.7 52.15 L28.35 53.3 L25.95 54.25 L23.5 55.2 L21.05 56 L18.5 56.8 L15.95 57.5 L13.35 58.2 L10.75 58.8 L8.1 59.35 Z M8.1 59.35 L6.25 53.6 L7.25 53.45 Z M8.1 59.35 L10.85 57.45 L9.3 60.7 Z",
          "bounds": [
            6.25,
            50.05,
            33,
            60.7
          ],
          "direction": "curve",
          "weight": 26.366752,
          "revealPath": "M7.2 56.5 Q20.85 54.5 32.875 50.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.7 39.05 L28.05 40.15 L29.45 41.3 L30.75 42.6 L31.95 44 L33.05 45.55 L34.1 47.25 L35.05 49 L35.9 50.85 L36.7 52.8 L37.4 54.85 L31.55 56.15 L31.25 54.3 L30.95 52.45 L30.55 50.7 L30.05 49 L29.55 47.35 L29 45.7 L28.35 44.15 L27.65 42.6 L26.95 41.1 L26.05 39.65 Z M37.4 54.85 L37 57.1 L35.15 58.45 L32.9 58 L31.55 56.15 Z",
          "bounds": [
            26.05,
            39.05,
            37.4,
            58.45
          ],
          "direction": "curve",
          "weight": 20.025,
          "revealPath": "M26.05 39 Q32.225 45.5 34.825 57",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.15 53.5 L25.15 91.5 L19.15 94.5 L19.15 53.5 Z",
          "bounds": [
            19.15,
            53.5,
            25.15,
            94.5
          ],
          "direction": "down",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M17.25 64.25 L16.8 67.05 L16.2 69.8 L15.5 72.5 L14.7 75.2 L13.75 77.85 L12.7 80.45 L11.5 82.95 L10.15 85.45 L8.65 87.85 L6.9 90.2 L6.15 89.75 L6.9 87.05 L7.7 84.4 L8.4 81.8 L9.1 79.2 L9.7 76.6 L10.2 74.05 L10.6 71.45 L10.9 68.9 L11.15 66.3 L11.3 63.7 Z M11.25 64.2 L11.4 62.6 L17.25 64.25 Z M17.25 64.25 L18.65 65.4 L16.05 66.65 Z",
          "bounds": [
            6.15,
            62.6,
            18.65,
            90.2
          ],
          "direction": "curve",
          "weight": 27.624084,
          "revealPath": "M14.35 63.5 Q13.05 77.5 6.55 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27 61.05 L28.35 62.25 L29.7 63.55 L30.95 65 L32.1 66.6 L33.15 68.3 L34.1 70.1 L35 72.05 L35.8 74.1 L36.5 76.25 L37.15 78.45 L31.25 79.55 L31 77.45 L30.7 75.45 L30.35 73.5 L29.95 71.65 L29.5 69.85 L28.95 68.15 L28.4 66.45 L27.75 64.8 L27.1 63.2 L26.35 61.65 Z M37.15 78.45 L36.65 80.7 L34.75 81.95 L32.5 81.45 L31.25 79.55 Z",
          "bounds": [
            26.35,
            61.05,
            37.15,
            81.95
          ],
          "direction": "curve",
          "weight": 21.125,
          "revealPath": "M26.375 61 Q32.225 68 34.5 80.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M89.15 16.95 L86.6 17.7 L83.95 18.4 L81.2 19.05 L78.3 19.7 L75.35 20.3 L72.25 20.9 L69.05 21.4 L65.75 21.85 L62.3 22.2 L58.75 22.4 L58.55 21.55 L61.9 20.35 L65.15 19.25 L68.3 18.2 L71.35 17.2 L74.25 16.2 L77.05 15.25 L79.75 14.25 L82.3 13.3 L84.75 12.3 L87.1 11.35 Z M86.6 11.5 L91.8 16 L89.15 16.95 Z M91.8 16 L91.9 17.55 L88.6 16.1 Z",
          "bounds": [
            58.55,
            11.35,
            91.9,
            22.4
          ],
          "direction": "curve",
          "weight": 30.975888,
          "revealPath": "M88.6 14 Q76.25 18.5 58.675 22",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.25 42 L93.8 42 L93.8 44 L57.25 44 Z M93.8 42 L81.8 43 L87.8 37 Z",
          "bounds": [
            57.25,
            37,
            93.8,
            44
          ],
          "direction": "right",
          "weight": 36.575
        }
      ],
      [
        {
          "outline": "M77.35 18.5 L77.35 74.5 L71.35 74.5 L71.35 18.5 Z",
          "bounds": [
            71.35,
            18.5,
            77.35,
            74.5
          ],
          "direction": "down",
          "weight": 54
        }
      ],
      [
        {
          "outline": "M57.7 73 L91.9 73 L91.9 75 L57.7 75 Z M91.9 73 L79.9 74 L85.9 68 Z",
          "bounds": [
            57.7,
            68,
            91.9,
            75
          ],
          "direction": "right",
          "weight": 34.2
        }
      ],
      [
        {
          "outline": "M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z",
          "bounds": [
            36.8,
            13,
            58.45,
            50.55
          ],
          "direction": "curve",
          "weight": 45.873738,
          "revealPath": "M36.825 16.5 L52.975 16.5 L43 44.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M43 43.5 L55.8 43.5 L55.8 45.5 L43 45.5 Z M58.8 44.7 L57.85 52.35 L56.55 59.45 L54.85 65.95 L52.75 71.85 L50.2 77.15 L47.3 81.85 L44 85.95 L40.3 89.3 L36.2 92 L31.75 93.9 L31.4 93.05 L35.15 90.4 L38.5 87.3 L41.5 83.8 L44.1 79.8 L46.4 75.3 L48.4 70.2 L50 64.6 L51.3 58.4 L52.2 51.6 L52.8 44.25 Z M52.8 43.5 L55.8 41 L61.3 45.5 L58.8 47 L52.8 49.5 Z",
          "bounds": [
            31.4,
            41,
            61.3,
            93.9
          ],
          "direction": "curve",
          "weight": 67.486235,
          "revealPath": "M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40.65 57.4 L42.7 63.8 L45.3 69.25 L48.5 73.9 L52.3 77.7 L56.7 80.75 L61.8 83.05 L67.6 84.7 L74.2 85.6 L81.55 85.75 L89.7 85.2 L90.3 91.75 L81.55 92 L73.55 91.45 L66.35 90.05 L59.85 87.8 L54.25 84.7 L49.45 80.75 L45.6 76.05 L42.65 70.55 L40.7 64.4 L39.75 57.55 Z M90.3 91.75 L89.7 85.2 L95.05 84.7 Z",
          "bounds": [
            39.75,
            57.4,
            95.05,
            92
          ],
          "direction": "curve",
          "weight": 58.989538,
          "revealPath": "M40.15 57 Q45.85 92.5 90.025 88.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "995ef47f7e4c888fd79492b1e2717862c697421f3152d3022f7b0a6756e32250",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D8E.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D8E.svg",
      "dictionarySvgSha256": "bac035241f678de2858085183d7b70052840313c5e0315f74ebac4beba0020a9",
      "dictionaryDirectionStrokes": "기존13획정적대응과공식1/2 macro7화면. 새표시의공식미세방향/시간동일성미증명.",
      "orderReviewSha256": "bcebc8d979a3c2bee98a4275c8e0ee14e6ada25b0bf0290c802d277884fef361",
      "geometryReviewSha256": "128c94dc054b02292d8f6f048c3d992e4915148beee87c6ed3869c14004c2d2a",
      "directionReviewSha256": "bcebc8d979a3c2bee98a4275c8e0ee14e6ada25b0bf0290c802d277884fef361"
    }
  }
]

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
export function loadGlyphWikiBatch1376Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1376 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1376_STROKES:ReturnType<typeof loadGlyphWikiBatch1376Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1376_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1376_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1376_ASSIGNMENT_PROVISIONAL=true

/** Immutable historical native-approval revision SHA; current metadata maintenance is recorded separately. */
export const GLYPHWIKI_BATCH1376_APPROVAL_REVIEW=Object.freeze({path:"docs/hanja-actual-component-profiles-2026-10-22/u7d8e-activation-review.json",SHA256:"128c94dc054b02292d8f6f048c3d992e4915148beee87c6ed3869c14004c2d2a"})
