import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const EXPECTED: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "貶",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-21",
    "geometrySource": "9ad81f32e107c0c429c07c9753977fdd4a6ca747320e2ac4b8962dd16a0d9ffb",
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
      10,
      11,
      12,
      13
    ],
    "paths": [
      "M14.7 13.8 L14.7 69.5 L8.7 72.5 L8.7 10.8 Z",
      "M11.7 13.8 L33.6 13.8 L33.6 15.8 L11.7 15.8 Z M36.6 14.8 L36.6 68 L30.6 71 L30.6 14.8 Z M30.6 13.8 L33.6 11.3 L39.1 15.8 L36.6 17.8 L30.6 14.8 Z",
      "M11.7 30.8 L33.6 30.8 L33.6 32.8 L11.7 32.8 Z",
      "M11.7 47.85 L33.6 47.85 L33.6 49.85 L11.7 49.85 Z",
      "M11.7 66 L33.6 66 L33.6 68 L11.7 68 Z",
      "M21.25 74.8 L20.2 76.9 L19.05 79 L17.8 81.05 L16.45 83.05 L14.95 85 L13.35 86.9 L11.6 88.8 L9.75 90.6 L7.75 92.3 L5.55 93.95 L4.9 93.35 L6.35 91.1 L7.75 88.9 L9.05 86.8 L10.3 84.7 L11.45 82.65 L12.5 80.65 L13.45 78.65 L14.25 76.65 L15 74.65 L15.6 72.7 Z M15.45 73.15 L15.9 72 L21.25 74.8 Z M21.25 74.8 L22.3 76.3 L19.4 76.8 Z",
      "M26.55 72.3 L28.05 73.25 L29.6 74.15 L31.05 75.15 L32.4 76.25 L33.7 77.45 L34.85 78.7 L35.95 80 L36.95 81.4 L37.9 82.9 L38.7 84.4 L33.1 86.5 L32.75 85.15 L32.35 83.8 L31.85 82.45 L31.25 81.1 L30.6 79.75 L29.85 78.4 L29.05 77.05 L28.15 75.65 L27.15 74.25 L26 73 Z M38.7 84.4 L38.6 86.7 L36.95 88.25 L34.65 88.15 L33.1 86.5 Z",
      "M89.25 13.9 L85.3 15.5 L81.2 17 L76.95 18.35 L72.6 19.6 L68.15 20.7 L63.55 21.65 L58.8 22.5 L53.9 23.2 L48.9 23.65 L43.75 23.9 L43.65 23.05 L48.6 21.8 L53.4 20.55 L58.1 19.3 L62.65 18 L67 16.6 L71.25 15.15 L75.35 13.6 L79.25 12 L83.05 10.3 L86.7 8.45 Z M86.25 8.7 L91 13.1 L89.25 13.9 Z M91 13.1 L91.05 14.7 L87.95 13.4 Z",
      "M71.3 23.1 L71.3 41.1 L65.3 41.1 L65.3 22.1 Z M71.3 23.1 L72.8 24.1 L70.3 25.6 Z",
      "M43.2 39.1 L86.9 39.1 L86.9 41.1 L43.2 41.1 Z",
      "M89.55 41.55 L86.95 45.7 L84.25 49.7 L81.35 53.65 L78.3 57.45 L75.1 61.1 L71.75 64.7 L68.25 68.15 L64.55 71.45 L60.65 74.6 L56.55 77.55 L55.95 76.85 L59.35 73.2 L62.65 69.55 L65.85 65.85 L68.9 62.15 L71.85 58.4 L74.6 54.6 L77.25 50.7 L79.75 46.75 L82.1 42.75 L84.3 38.65 Z M83.9 39.1 L86.9 36.6 L92.4 41.1 L89.9 42.6 L83.9 45.1 Z",
      "M40.2 85.9 L41.15 84.9 L42.15 83.7 L43.2 82.2 L44.35 80.45 L45.5 78.45 L46.7 76.25 L48 73.8 L49.3 71.15 L50.75 68.3 L52.3 65.25 L53.15 65.5 L52.55 68.9 L51.8 72.1 L51 75 L50.2 77.7 L49.35 80.2 L48.5 82.5 L47.6 84.6 L46.7 86.5 L45.8 88.2 L44.8 89.7 Z M44.8 89.7 L39.55 86.7 L40.2 85.9 Z M44.8 89.7 L45.55 86.45 L46.6 89.9 Z M52.75 65.8 L54.05 70 L55.5 73.6 L57.2 76.5 L59.3 78.8 L61.9 80.6 L65.2 81.95 L69.45 82.85 L74.75 83.35 L81.3 83.35 L89.2 82.85 L89.65 89.45 L81.4 89.65 L74.35 89.25 L68.4 88.3 L63.45 86.75 L59.4 84.55 L56.3 81.7 L54.1 78.35 L52.7 74.6 L52 70.45 L51.85 65.95 Z M89.65 89.45 L89.2 82.85 L94.7 82.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M14.7 13.8 L14.7 69.5 L8.7 72.5 L8.7 10.8 Z",
          "bounds": [
            8.7,
            10.8,
            14.7,
            72.5
          ],
          "direction": "down",
          "weight": 52.2054
        }
      ],
      [
        {
          "outline": "M11.7 13.8 L33.6 13.8 L33.6 15.8 L11.7 15.8 Z M36.6 14.8 L36.6 68 L30.6 71 L30.6 14.8 Z M30.6 13.8 L33.6 11.3 L39.1 15.8 L36.6 17.8 L30.6 14.8 Z",
          "bounds": [
            11.7,
            11.3,
            39.1,
            71
          ],
          "direction": "curve",
          "weight": 74.0754,
          "revealPath": "M11.745 14.818999999999999 L33.615 14.818999999999999 L33.615 67.0244",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M11.7 30.8 L33.6 30.8 L33.6 32.8 L11.7 32.8 Z",
          "bounds": [
            11.7,
            30.8,
            33.6,
            32.8
          ],
          "direction": "right",
          "weight": 21.87
        }
      ],
      [
        {
          "outline": "M11.7 47.85 L33.6 47.85 L33.6 49.85 L11.7 49.85 Z",
          "bounds": [
            11.7,
            47.85,
            33.6,
            49.85
          ],
          "direction": "right",
          "weight": 21.87
        }
      ],
      [
        {
          "outline": "M11.7 66 L33.6 66 L33.6 68 L11.7 68 Z",
          "bounds": [
            11.7,
            66,
            33.6,
            68
          ],
          "direction": "right",
          "weight": 21.87
        }
      ],
      [
        {
          "outline": "M21.25 74.8 L20.2 76.9 L19.05 79 L17.8 81.05 L16.45 83.05 L14.95 85 L13.35 86.9 L11.6 88.8 L9.75 90.6 L7.75 92.3 L5.55 93.95 L4.9 93.35 L6.35 91.1 L7.75 88.9 L9.05 86.8 L10.3 84.7 L11.45 82.65 L12.5 80.65 L13.45 78.65 L14.25 76.65 L15 74.65 L15.6 72.7 Z M15.45 73.15 L15.9 72 L21.25 74.8 Z M21.25 74.8 L22.3 76.3 L19.4 76.8 Z",
          "bounds": [
            4.9,
            72,
            22.3,
            93.95
          ],
          "direction": "curve",
          "weight": 24.363089,
          "revealPath": "M18.63 73.31 Q14.58 83.98 5.265 93.68",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.55 72.3 L28.05 73.25 L29.6 74.15 L31.05 75.15 L32.4 76.25 L33.7 77.45 L34.85 78.7 L35.95 80 L36.95 81.4 L37.9 82.9 L38.7 84.4 L33.1 86.5 L32.75 85.15 L32.35 83.8 L31.85 82.45 L31.25 81.1 L30.6 79.75 L29.85 78.4 L29.05 77.05 L28.15 75.65 L27.15 74.25 L26 73 Z M38.7 84.4 L38.6 86.7 L36.95 88.25 L34.65 88.15 L33.1 86.5 Z",
          "bounds": [
            26,
            72.3,
            38.7,
            88.25
          ],
          "direction": "curve",
          "weight": 17.960607,
          "revealPath": "M25.92 72.34 Q33.21 78.16 36.45 86.89",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M89.25 13.9 L85.3 15.5 L81.2 17 L76.95 18.35 L72.6 19.6 L68.15 20.7 L63.55 21.65 L58.8 22.5 L53.9 23.2 L48.9 23.65 L43.75 23.9 L43.65 23.05 L48.6 21.8 L53.4 20.55 L58.1 19.3 L62.65 18 L67 16.6 L71.25 15.15 L75.35 13.6 L79.25 12 L83.05 10.3 L86.7 8.45 Z M86.25 8.7 L91 13.1 L89.25 13.9 Z M91 13.1 L91.05 14.7 L87.95 13.4 Z",
          "bounds": [
            43.65,
            8.45,
            91.05,
            23.9
          ],
          "direction": "curve",
          "weight": 46.436537,
          "revealPath": "M88.4425 11 Q69.3475 20 43.72 23.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M71.3 23.1 L71.3 41.1 L65.3 41.1 L65.3 22.1 Z M71.3 23.1 L72.8 24.1 L70.3 25.6 Z",
          "bounds": [
            65.3,
            22.1,
            72.8,
            41.1
          ],
          "direction": "down",
          "weight": 17.5225
        }
      ],
      [
        {
          "outline": "M43.2 39.1 L86.9 39.1 L86.9 41.1 L43.2 41.1 Z",
          "bounds": [
            43.2,
            39.1,
            86.9,
            41.1
          ],
          "direction": "right",
          "weight": 43.7175
        }
      ],
      [
        {
          "outline": "M89.55 41.55 L86.95 45.7 L84.25 49.7 L81.35 53.65 L78.3 57.45 L75.1 61.1 L71.75 64.7 L68.25 68.15 L64.55 71.45 L60.65 74.6 L56.55 77.55 L55.95 76.85 L59.35 73.2 L62.65 69.55 L65.85 65.85 L68.9 62.15 L71.85 58.4 L74.6 54.6 L77.25 50.7 L79.75 46.75 L82.1 42.75 L84.3 38.65 Z M83.9 39.1 L86.9 36.6 L92.4 41.1 L89.9 42.6 L83.9 45.1 Z",
          "bounds": [
            55.95,
            36.6,
            92.4,
            77.55
          ],
          "direction": "curve",
          "weight": 48.1112,
          "revealPath": "M86.935 40.135000000000005 Q75.3775 60.9175 56.2825 77.2175",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40.2 85.9 L41.15 84.9 L42.15 83.7 L43.2 82.2 L44.35 80.45 L45.5 78.45 L46.7 76.25 L48 73.8 L49.3 71.15 L50.75 68.3 L52.3 65.25 L53.15 65.5 L52.55 68.9 L51.8 72.1 L51 75 L50.2 77.7 L49.35 80.2 L48.5 82.5 L47.6 84.6 L46.7 86.5 L45.8 88.2 L44.8 89.7 Z M44.8 89.7 L39.55 86.7 L40.2 85.9 Z M44.8 89.7 L45.55 86.45 L46.6 89.9 Z",
          "bounds": [
            39.55,
            65.25,
            53.15,
            89.9
          ],
          "direction": "curve",
          "weight": 25.141751,
          "revealPath": "M42.2125 88.22 Q47.2375 82.1075 52.765 65.4",
          "revealWidth": 14
        },
        {
          "outline": "M52.75 65.8 L54.05 70 L55.5 73.6 L57.2 76.5 L59.3 78.8 L61.9 80.6 L65.2 81.95 L69.45 82.85 L74.75 83.35 L81.3 83.35 L89.2 82.85 L89.65 89.45 L81.4 89.65 L74.35 89.25 L68.4 88.3 L63.45 86.75 L59.4 84.55 L56.3 81.7 L54.1 78.35 L52.7 74.6 L52 70.45 L51.85 65.95 Z M89.65 89.45 L89.2 82.85 L94.7 82.5 Z",
          "bounds": [
            51.85,
            65.8,
            94.7,
            89.65
          ],
          "direction": "curve",
          "weight": 42.598551,
          "revealPath": "M52.2625 65.4 C54.2725 81.2925 60.3025 88.22 89.4475 86.1825",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "9c14cbceee7346fa21c0a1263632bad6702e7f75d32dc78340914c678295ba7c",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8c00/8cb6.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8c00/8cb6.svg",
      "dictionarySvgSha256": "bcd0534ce2461385484e4e28f679f4205507fc14a13aea89fae9f97a8a5b3432",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12",
      "orderReviewSha256": "9b0c2c5497475ccb13530f5ce949339a2deccd5a60e922d3184d183244ebded4",
      "geometryReviewSha256": "9b0c2c5497475ccb13530f5ce949339a2deccd5a60e922d3184d183244ebded4",
      "directionReviewSha256": "9b0c2c5497475ccb13530f5ce949339a2deccd5a60e922d3184d183244ebded4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed12p13m25 original full5-header/selected-body3 inner5 identity; reviewed exact QC12 frozen component",
      "editableSource": "/hanja-strokes/glyphwiki/u8cb6.json",
      "modifications": "原982 source/engineheader actualfull5·동일 selectedwhole body3와 strict inner5(./경로·lowercase Sha256)/outer6 identity를 보존한다. 첫9획은 원baseline12p12m25와 동일하고, 원raw10/11은 별획으로, raw12Q/13C는 gap[-1.005,0](display[-.5025,0])를 가진 독립2mask로 구성한 고정12p13m25 literal이다. 모든원mask필드/25polygon/좌표·path·guide·width·weight·flags를 그대로 보존하고 새connector/꼬리분리/engine·factory호출을 하지 않는다. 대상12m1Q/12m2C만 source-specific초기arc7 exactcert와 sameSVG/g/defs/document NOpathLength측정·dash1·동일p/L/endpoint/rho·visibility-last/p0empty/p1prefixwhole fullroundalwaysmask 정책을 사용한다. ROOT standalone전체12방향과 actualfrozencomponent whole12/prefix3·6·9/local12/rho6실제delta1e-6/QCboundary6/방향12@75한개 controlled29·coverage2·coarse9·natural시작끝2를 구분한다. requested Q/C local100 .9999999999999997/.999999999999999 partial과 whole12 exact1은 별도다. helper DOMmetrics는 독립거리 bridge가 아니며 모든RAF·실제appcontroller/storage/routes를 검증하지 않았다. 원source/HOLD/NOTICE/역사snapshot/harness false는 보존하고 미사용 expectedSegments 잔여瀷5개는 실제貶기하근거로 사용하지 않는다. 새source/compiler/cachedpositive/fixture/derive/engine/build0이다."
    }
  }
]
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(EXPECTED)
function sameJSON(a:unknown,b:unknown):boolean {
 if(Object.is(a,b))return true
 if(Array.isArray(b))return Array.isArray(a)&&a.length===b.length&&Reflect.ownKeys(a).length===b.length+1&&b.every((v,i)=>Object.hasOwn(a,i)&&sameJSON(a[i],v))
 if(!b||typeof b!=='object'||!a||typeof a!=='object'||Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),record=a as Record<string,unknown>,expected=b as Record<string,unknown>
 return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&sameJSON(record[k],expected[k]))
}
export function loadGlyphWikiBatch1328Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1328 reviewed bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1328_STROKES:ReturnType<typeof loadGlyphWikiBatch1328Strokes>=EXPECTED
