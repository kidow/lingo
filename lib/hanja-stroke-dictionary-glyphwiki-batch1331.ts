import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const EXPECTED: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "潗",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-21",
    "geometrySource": "ea8e204237067ef5a357b21ae496bb68962558ac394638b8d7c67055378aba3d",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      5,
      6,
      7,
      9,
      10,
      11,
      8,
      12,
      13,
      14,
      15,
      16
    ],
    "paths": [
      "M13.9 9.75 L15.75 10.2 L17.55 10.65 L19.3 11.15 L20.95 11.8 L22.45 12.55 L23.9 13.35 L25.3 14.3 L26.55 15.3 L27.7 16.4 L28.75 17.65 L23.6 20.75 L23.15 19.7 L22.6 18.7 L21.95 17.65 L21.15 16.65 L20.25 15.6 L19.15 14.6 L18 13.55 L16.65 12.5 L15.2 11.45 L13.55 10.55 Z M28.75 17.65 L29.05 19.9 L27.7 21.75 L25.45 22.05 L23.6 20.75 Z",
      "M6.65 32.7 L8.65 33.2 L10.6 33.6 L12.4 34.15 L14.1 34.75 L15.7 35.5 L17.2 36.3 L18.6 37.25 L19.85 38.3 L21 39.45 L22 40.75 L16.75 43.6 L16.4 42.65 L15.9 41.65 L15.25 40.65 L14.45 39.65 L13.5 38.65 L12.4 37.6 L11.15 36.55 L9.7 35.55 L8.15 34.45 L6.35 33.55 Z M22 40.75 L22.25 43 L20.8 44.8 L18.55 45 L16.75 43.6 Z",
      "M7.4 66.2 L10.1 66.8 L12.65 67.9 L14.85 69.45 L16.8 71.45 L18.45 73.85 L19.75 76.6 L20.7 79.65 L21.35 83.05 L21.65 86.75 L21.7 90.7 L15.7 90.25 L16 86.75 L16 83.5 L15.8 80.6 L15.3 78 L14.6 75.7 L13.7 73.6 L12.5 71.75 L11.05 70.05 L9.25 68.5 L7.1 67.05 Z M21.7 90.7 L20.65 92.75 L18.45 93.45 L16.45 92.4 L15.7 90.25 Z M13.75 74.25 L14.4 72.6 L15.35 70.45 L16.55 67.8 L18.05 64.55 L19.85 60.8 L21.95 56.4 L24.35 51.45 L27.1 45.95 L30.25 39.9 L33.75 33.3 L34.55 33.65 L31.95 40.65 L29.6 47.05 L27.4 52.8 L25.45 57.9 L23.75 62.4 L22.35 66.35 L21.2 69.65 L20.4 72.35 L19.85 74.35 L19.6 75.7 Z",
      "M54.3 9.5 L52.9 12.55 L51.35 15.6 L49.55 18.65 L47.6 21.6 L45.5 24.55 L43.15 27.4 L40.65 30.25 L37.95 33.05 L35.05 35.7 L31.85 38.3 L31.25 37.65 L33.65 34.4 L35.95 31.3 L38.1 28.2 L40.1 25.15 L41.95 22.15 L43.65 19.15 L45.15 16.2 L46.5 13.25 L47.7 10.3 L48.7 7.4 Z M48.5 7.85 L48.95 6.7 L54.3 9.5 Z M54.3 9.5 L55.35 10.95 L52.5 11.5 Z",
      "M48.95 20.5 L48.95 58 L42.95 61 L42.95 20.5 Z",
      "M75.3 10.4 L74.3 11.7 L73.3 12.9 L72.2 14.15 L71.1 15.35 L69.95 16.5 L68.75 17.6 L67.5 18.7 L66.2 19.75 L64.8 20.75 L63.5 21.8 L62.85 21.15 L63.8 19.8 L64.6 18.35 L65.4 16.95 L66.15 15.55 L66.9 14.2 L67.6 12.8 L68.3 11.45 L68.95 10.1 L69.55 8.75 L70.1 7.4 Z M69.85 7.85 L70.35 6.95 L75.3 10.4 Z M75.3 10.4 L76.1 12 L73.2 12.05 Z",
      "M45.95 20.5 L90.2 20.5 L90.2 22.5 L45.95 22.5 Z M90.2 20.5 L78.2 21.5 L84.2 15.5 Z",
      "M45.95 31 L86.75 31 L86.75 33 L45.95 33 Z M86.75 31 L76.75 32 L81.75 26.5 Z",
      "M45.95 41 L86.75 41 L86.75 43 L45.95 43 Z M86.75 41 L76.75 42 L81.75 36.5 Z",
      "M67.35 20.5 L67.35 54.5 L61.35 54.5 L61.35 20.5 Z",
      "M45.95 52.5 L91.95 52.5 L91.95 54.5 L45.95 54.5 Z M91.95 52.5 L81.95 53.5 L86.95 48 Z",
      "M33.85 65 L93.1 65 L93.1 67 L33.85 67 Z M93.1 65 L81.1 66 L87.1 60 Z",
      "M67.35 56.5 L67.35 92 L61.35 95 L61.35 55.5 Z M67.35 56.5 L68.85 57.5 L66.35 59 Z",
      "M63.15 66 L62.4 67.3 L60.55 70.4 L58.4 73.3 L56 76.1 L53.4 78.7 L50.5 81.2 L47.35 83.5 L44 85.65 L40.35 87.6 L36.45 89.35 L32.3 90.9 L31.95 90.05 L35.6 87.7 L39 85.3 L42.15 82.9 L45.05 80.5 L47.7 78 L50.05 75.45 L52.2 72.85 L54.05 70.2 L55.65 67.45 L56.35 66 Z",
      "M67.85 66.15 L70.25 68.4 L72.55 70.55 L74.8 72.6 L77.05 74.45 L79.3 76.2 L81.55 77.75 L83.85 79.15 L86.2 80.4 L88.55 81.5 L90.95 82.45 L88.3 88.5 L85.7 87.1 L83.2 85.5 L80.75 83.75 L78.45 81.8 L76.25 79.7 L74.15 77.45 L72.15 75.05 L70.3 72.45 L68.6 69.65 L67.1 66.65 Z M88.3 88.5 L90.95 82.45 L94 83.8 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M13.9 9.75 L15.75 10.2 L17.55 10.65 L19.3 11.15 L20.95 11.8 L22.45 12.55 L23.9 13.35 L25.3 14.3 L26.55 15.3 L27.7 16.4 L28.75 17.65 L23.6 20.75 L23.15 19.7 L22.6 18.7 L21.95 17.65 L21.15 16.65 L20.25 15.6 L19.15 14.6 L18 13.55 L16.65 12.5 L15.2 11.45 L13.55 10.55 Z M28.75 17.65 L29.05 19.9 L27.7 21.75 L25.45 22.05 L23.6 20.75 Z",
          "bounds": [
            13.55,
            9.75,
            29.05,
            22.05
          ],
          "direction": "curve",
          "weight": 17.245069,
          "revealPath": "M13.28 10 Q22.78 13.5 26.96 20.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.65 32.7 L8.65 33.2 L10.6 33.6 L12.4 34.15 L14.1 34.75 L15.7 35.5 L17.2 36.3 L18.6 37.25 L19.85 38.3 L21 39.45 L22 40.75 L16.75 43.6 L16.4 42.65 L15.9 41.65 L15.25 40.65 L14.45 39.65 L13.5 38.65 L12.4 37.6 L11.15 36.55 L9.7 35.55 L8.15 34.45 L6.35 33.55 Z M22 40.75 L22.25 43 L20.8 44.8 L18.55 45 L16.75 43.6 Z",
          "bounds": [
            6.35,
            32.7,
            22.25,
            45
          ],
          "direction": "curve",
          "weight": 17.548037,
          "revealPath": "M6.06 33 Q16.32 36.5 20.12 43.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.4 66.2 L10.1 66.8 L12.65 67.9 L14.85 69.45 L16.8 71.45 L18.45 73.85 L19.75 76.6 L20.7 79.65 L21.35 83.05 L21.65 86.75 L21.7 90.7 L15.7 90.25 L16 86.75 L16 83.5 L15.8 80.6 L15.3 78 L14.6 75.7 L13.7 73.6 L12.5 71.75 L11.05 70.05 L9.25 68.5 L7.1 67.05 Z M21.7 90.7 L20.65 92.75 L18.45 93.45 L16.45 92.4 L15.7 90.25 Z",
          "bounds": [
            7.1,
            66.2,
            21.7,
            93.45
          ],
          "direction": "curve",
          "weight": 28.089471,
          "revealPath": "M6.82 66.5 Q20.12 71 18.6 92",
          "revealWidth": 14
        },
        {
          "outline": "M13.75 74.25 L14.4 72.6 L15.35 70.45 L16.55 67.8 L18.05 64.55 L19.85 60.8 L21.95 56.4 L24.35 51.45 L27.1 45.95 L30.25 39.9 L33.75 33.3 L34.55 33.65 L31.95 40.65 L29.6 47.05 L27.4 52.8 L25.45 57.9 L23.75 62.4 L22.35 66.35 L21.2 69.65 L20.4 72.35 L19.85 74.35 L19.6 75.7 Z",
          "bounds": [
            13.75,
            33.3,
            34.55,
            75.7
          ],
          "direction": "curve",
          "weight": 45.031105,
          "revealPath": "M16.7 75 Q18.22 69 34.18 33.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M54.3 9.5 L52.9 12.55 L51.35 15.6 L49.55 18.65 L47.6 21.6 L45.5 24.55 L43.15 27.4 L40.65 30.25 L37.95 33.05 L35.05 35.7 L31.85 38.3 L31.25 37.65 L33.65 34.4 L35.95 31.3 L38.1 28.2 L40.1 25.15 L41.95 22.15 L43.65 19.15 L45.15 16.2 L46.5 13.25 L47.7 10.3 L48.7 7.4 Z M48.5 7.85 L48.95 6.7 L54.3 9.5 Z M54.3 9.5 L55.35 10.95 L52.5 11.5 Z",
          "bounds": [
            31.25,
            6.7,
            55.35,
            38.3
          ],
          "direction": "curve",
          "weight": 36.125,
          "revealPath": "M51.7 8 Q45.95 23.5 31.575000000000003 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M48.95 20.5 L48.95 58 L42.95 61 L42.95 20.5 Z",
          "bounds": [
            42.95,
            20.5,
            48.95,
            61
          ],
          "direction": "down",
          "weight": 32
        }
      ],
      [
        {
          "outline": "M75.3 10.4 L74.3 11.7 L73.3 12.9 L72.2 14.15 L71.1 15.35 L69.95 16.5 L68.75 17.6 L67.5 18.7 L66.2 19.75 L64.8 20.75 L63.5 21.8 L62.85 21.15 L63.8 19.8 L64.6 18.35 L65.4 16.95 L66.15 15.55 L66.9 14.2 L67.6 12.8 L68.3 11.45 L68.95 10.1 L69.55 8.75 L70.1 7.4 Z M69.85 7.85 L70.35 6.95 L75.3 10.4 Z M75.3 10.4 L76.1 12 L73.2 12.05 Z",
          "bounds": [
            62.85,
            6.95,
            76.1,
            21.8
          ],
          "direction": "curve",
          "weight": 16.265012,
          "revealPath": "M72.975 8.5 Q68.95 15.5 63.2 21.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.95 20.5 L90.2 20.5 L90.2 22.5 L45.95 22.5 Z M90.2 20.5 L78.2 21.5 L84.2 15.5 Z",
          "bounds": [
            45.95,
            15.5,
            90.2,
            22.5
          ],
          "direction": "right",
          "weight": 44.275
        }
      ],
      [
        {
          "outline": "M45.95 31 L86.75 31 L86.75 33 L45.95 33 Z M86.75 31 L76.75 32 L81.75 26.5 Z",
          "bounds": [
            45.95,
            26.5,
            86.75,
            33
          ],
          "direction": "right",
          "weight": 40.825
        }
      ],
      [
        {
          "outline": "M45.95 41 L86.75 41 L86.75 43 L45.95 43 Z M86.75 41 L76.75 42 L81.75 36.5 Z",
          "bounds": [
            45.95,
            36.5,
            86.75,
            43
          ],
          "direction": "right",
          "weight": 40.825
        }
      ],
      [
        {
          "outline": "M67.35 20.5 L67.35 54.5 L61.35 54.5 L61.35 20.5 Z",
          "bounds": [
            61.35,
            20.5,
            67.35,
            54.5
          ],
          "direction": "down",
          "weight": 32
        }
      ],
      [
        {
          "outline": "M45.95 52.5 L91.95 52.5 L91.95 54.5 L45.95 54.5 Z M91.95 52.5 L81.95 53.5 L86.95 48 Z",
          "bounds": [
            45.95,
            48,
            91.95,
            54.5
          ],
          "direction": "right",
          "weight": 46
        }
      ],
      [
        {
          "outline": "M33.85 65 L93.1 65 L93.1 67 L33.85 67 Z M93.1 65 L81.1 66 L87.1 60 Z",
          "bounds": [
            33.85,
            60,
            93.1,
            67
          ],
          "direction": "right",
          "weight": 59.225
        }
      ],
      [
        {
          "outline": "M67.35 56.5 L67.35 92 L61.35 95 L61.35 55.5 Z M67.35 56.5 L68.85 57.5 L66.35 59 Z",
          "bounds": [
            61.35,
            55.5,
            68.85,
            95
          ],
          "direction": "down",
          "weight": 37.5
        }
      ],
      [
        {
          "outline": "M63.15 66 L62.4 67.3 L60.55 70.4 L58.4 73.3 L56 76.1 L53.4 78.7 L50.5 81.2 L47.35 83.5 L44 85.65 L40.35 87.6 L36.45 89.35 L32.3 90.9 L31.95 90.05 L35.6 87.7 L39 85.3 L42.15 82.9 L45.05 80.5 L47.7 78 L50.05 75.45 L52.2 72.85 L54.05 70.2 L55.65 67.45 L56.35 66 Z",
          "bounds": [
            31.95,
            66,
            63.15,
            90.9
          ],
          "direction": "curve",
          "weight": 36.90542,
          "revealPath": "M59.75 66 Q52.275000000000006 81 32.15 90.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.85 66.15 L70.25 68.4 L72.55 70.55 L74.8 72.6 L77.05 74.45 L79.3 76.2 L81.55 77.75 L83.85 79.15 L86.2 80.4 L88.55 81.5 L90.95 82.45 L88.3 88.5 L85.7 87.1 L83.2 85.5 L80.75 83.75 L78.45 81.8 L76.25 79.7 L74.15 77.45 L72.15 75.05 L70.3 72.45 L68.6 69.65 L67.1 66.65 Z M88.3 88.5 L90.95 82.45 L94 83.8 Z",
          "bounds": [
            67.1,
            66.15,
            94,
            88.5
          ],
          "direction": "curve",
          "weight": 29.717514,
          "revealPath": "M67.225 66 Q77 80 89.65 85.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "4b601562bf339a8c1286beb5759c8d83a6ddaf4f543ed5a16d46760f15468a34",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F57.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6F00/6F57.svg",
      "dictionarySvgSha256": "f47f7bed7e88a0c521a020905135e9fffae2ec09a5440285041a94c55a5e8527",
      "dictionaryDirectionStrokes": "static 1–15; temporal/direction animation not observed",
      "orderReviewSha256": "d4499b58b615c130ee105af34243aac8aab9938d21b3038d5a0ca029f1cc56d4",
      "geometryReviewSha256": "d4499b58b615c130ee105af34243aac8aab9938d21b3038d5a0ca029f1cc56d4",
      "directionReviewSha256": "d4499b58b615c130ee105af34243aac8aab9938d21b3038d5a0ca029f1cc56d4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed15p16m30 existing actual full5/id3; source-only independent QQ3 and source-specific frozen two-Q component limited acceptance",
      "editableSource": "/hanja-strokes/glyphwiki/u6f57-k.json",
      "modifications": "원902 u6f57-k actual full5/id3를 그대로 고정한16raw/16calls/30polygon의 cached15p16m30을 등록한다. sourceGroups[[0],[1],[2,3],[4],[5],[6],[8],[9],[10],[7],[11],[12],[13],[14],[15]]이며 raw2/3 물 QQ gap[-3.8000000000000043,-34]는 논리3 독립2mask/connector0로 보존하고 비연속[5,11] 폐합을 사용하지 않는다. 모든polygon/guide/width14/weight 및다른14획은동일하며sourcecompiler/factory/projection/derive/engine0. 새APP정책은3m1/3m2만초기arc7 source-specific인증과sameSVG/g/defs/document·측정NOpathLength/dash1·동일framep/L/endpoint/rho·visibility-last를사용한다. ROOT source15static/fine45/coarse135와 actualcomponent변경pen3 local12/rho6/boundary3/coverage2/coarse9/natural3시작끝, ordinary14×9parity126·기존childbyte불변을결합한한정승인이다. actualnatural1–8시작끝만관찰했고9–15자연0/all15Replayfalse/domesticTemporalDirectionAnimation0이다. local100 두Q는near1partial이고whole15/prefix4exact1fullroundalwaysmask와구분한다. 공식시간/필순추가근거또는실제appcontroller/storage/routes검증으로확대하지않으며과거HOLD/준비false는불변이다."
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
export function loadGlyphWikiBatch1331Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1331 reviewed bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1331_STROKES:ReturnType<typeof loadGlyphWikiBatch1331Strokes>=EXPECTED
