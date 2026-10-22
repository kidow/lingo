import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** Immutable provisional1341 bundle; actual finite authorization lives in runtime review, product APP UI remains unverified. */
const EXPECTED = [
  {
    "glyph": "嘑",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "e93a6fc4f6d1ecbb63ffab952b4ae2c39eb9aeed5c3a65f5de9f083fd41ebed7",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      6,
      5,
      7,
      8,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "paths": [
      "M16.2 20.85 L16.2 73.1 L10.2 76.1 L10.2 17.85 Z",
      "M13.2 20.85 L30.5 20.85 L30.5 22.85 L13.2 22.85 Z M33.5 21.85 L33.5 70.1 L27.5 73.1 L27.5 21.85 Z M27.5 20.85 L30.5 18.35 L36 22.85 L33.5 24.85 L27.5 21.85 Z",
      "M13.2 65.1 L30.5 65.1 L30.5 67.1 L13.2 67.1 Z",
      "M65.4 8 L65.4 25 L59.4 25 L59.4 7 Z M65.4 8 L66.9 9 L64.4 10.5 Z",
      "M62.4 15 L88.95 15 L88.95 17 L62.4 17 Z M88.95 15 L76.95 16 L82.95 10 Z",
      "M42.5 23 L88.35 23 L88.35 25 L42.5 25 Z M91.1 25.25 L90.35 26.35 L89.6 27.5 L88.8 28.65 L88 29.8 L87.15 30.9 L86.3 32.05 L85.4 33.2 L84.5 34.35 L83.5 35.45 L82.7 36.7 L81.9 36.25 L82.4 34.9 L82.7 33.45 L83.05 32.05 L83.4 30.65 L83.8 29.3 L84.15 27.95 L84.55 26.6 L84.9 25.3 L85.3 24 L85.65 22.7 Z M85.35 23 L88.35 20.5 L93.85 25 L91.35 26.5 L85.35 29 Z",
      "M45.5 23 L45.5 50 L39.5 50 L39.5 20 Z M39.5 50 L45.5 50 L44.3 51.8 L42.5 53 L40.7 51.8 Z M45.5 50 L45.25 56.35 L44.75 62.3 L44 67.85 L43.05 72.95 L41.8 77.6 L40.35 81.85 L38.6 85.6 L36.6 88.9 L34.3 91.65 L31.8 93.8 L31.15 93.15 L32.8 90.5 L34.3 87.55 L35.6 84.25 L36.75 80.65 L37.7 76.6 L38.45 72.1 L39.05 67.2 L39.4 61.9 L39.55 56.15 L39.5 50 Z",
      "M42.95 36.5 L81.1 32.5 L81.3 34.45 L43.15 38.45 Z M81.1 32.5 L69.25 34.75 L74.6 28.15 Z",
      "M63.75 26 L63.75 38.5 L57.75 38.5 L57.75 25 Z M63.75 26 L65.25 27 L62.75 28.5 Z M57.75 38.5 L63.75 38.5 L62.55 40.3 L60.75 41.5 L58.95 40.3 Z M63.75 38.5 L63.8 39.1 L63.85 39.55 L63.95 39.85 L64.05 40 L64.1 40.1 L64.2 40.2 L64.4 40.25 L64.7 40.35 L65.15 40.45 L65.75 40.5 L65.75 46.5 L64.45 46.4 L63.2 46.2 L62 45.8 L60.9 45.15 L59.9 44.35 L59.05 43.35 L58.45 42.2 L58.05 41 L57.8 39.75 L57.75 38.5 Z M65.75 40.5 L67.85 41.4 L68.75 43.5 L67.85 45.6 L65.75 46.5 Z M65.75 40.5 L88.95 40.5 L88.95 46.5 L65.75 46.5 Z M88.95 40.5 L90.75 41.7 L91.95 43.5 L90.75 45.3 L88.95 46.5 Z M88.95 40.5 L85.95 40.5 L88.95 28 L89.95 28 Z",
      "M82.6 53.5 L79.55 54.1 L76.4 54.7 L73.2 55.2 L69.9 55.6 L66.5 56 L63 56.25 L59.4 56.5 L55.7 56.6 L51.95 56.6 L48.05 56.4 L48 55.55 L51.75 54.7 L55.45 53.95 L59 53.25 L62.45 52.5 L65.8 51.8 L69.05 51.05 L72.2 50.25 L75.25 49.45 L78.2 48.6 L81.05 47.7 Z M80.55 47.85 L86.2 52.55 L82.6 53.5 Z M86.2 52.55 L86.35 54.05 L82.8 52.4 Z",
      "M49.8 59.35 L51.1 60 L52.45 60.5 L53.75 61.05 L55 61.7 L56.15 62.4 L57.25 63.15 L58.3 63.95 L59.25 64.8 L60.15 65.75 L61 66.7 L55.75 69.6 L55.45 68.75 L55.1 67.85 L54.7 66.95 L54.2 66 L53.6 65.05 L52.95 64.05 L52.2 63.05 L51.35 62.05 L50.45 61 L49.35 60.1 Z M61 66.7 L61.2 69 L59.8 70.8 L57.55 71 L55.75 69.6 Z",
      "M87.75 60.65 L86.7 61.7 L85.6 62.85 L84.45 64 L83.25 65.2 L81.95 66.45 L80.6 67.7 L79.15 69.05 L77.6 70.4 L76 71.8 L74.35 73.25 L73.65 72.7 L74.85 70.85 L75.9 68.95 L76.95 67.2 L77.95 65.55 L78.9 63.95 L79.8 62.45 L80.65 61 L81.45 59.65 L82.2 58.35 L82.9 57.1 Z M82.6 57.5 L83.15 56.8 L87.75 60.65 Z M87.75 60.65 L88.35 62.35 L85.45 62.1 Z",
      "M45.3 73.5 L93.35 73.5 L93.35 75.5 L45.3 75.5 Z M93.35 73.5 L81.35 74.5 L87.35 68.5 Z",
      "M71.5 56.5 L71.5 86.5 L65.5 86.5 L65.5 55.5 Z M71.5 56.5 L73 57.5 L70.5 59 Z M65.5 86.5 L71.5 86.5 L70.3 88.3 L68.5 89.5 L66.7 88.3 Z M71.5 86.5 L71.4 87.75 L71.2 89 L70.8 90.2 L70.2 91.35 L69.35 92.35 L68.35 93.15 L67.2 93.8 L66 94.2 L64.75 94.4 L63.5 94.5 L63.5 88.5 L64.1 88.45 L64.55 88.35 L64.85 88.25 L65 88.2 L65.1 88.1 L65.2 88 L65.3 87.85 L65.35 87.55 L65.45 87.1 L65.5 86.5 Z M63.5 91.5 L53.5 90 L53.5 88.5 L63.5 88.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M16.2 20.85 L16.2 73.1 L10.2 76.1 L10.2 17.85 Z",
          "bounds": [
            10.2,
            17.85,
            16.2,
            76.1
          ],
          "direction": "down",
          "weight": 44.28
        }
      ],
      [
        {
          "outline": "M13.2 20.85 L30.5 20.85 L30.5 22.85 L13.2 22.85 Z",
          "bounds": [
            13.2,
            20.85,
            30.5,
            22.85
          ],
          "direction": "right",
          "weight": 17.2927
        },
        {
          "outline": "M33.5 21.85 L33.5 70.1 L27.5 73.1 L27.5 21.85 Z M27.5 20.85 L30.5 18.35 L36 22.85 L33.5 24.85 L27.5 21.85 Z",
          "bounds": [
            27.5,
            18.35,
            36,
            73.1
          ],
          "direction": "down",
          "weight": 44.28
        }
      ],
      [
        {
          "outline": "M13.2 65.1 L30.5 65.1 L30.5 67.1 L13.2 67.1 Z",
          "bounds": [
            13.2,
            65.1,
            30.5,
            67.1
          ],
          "direction": "right",
          "weight": 17.2927
        }
      ],
      [
        {
          "outline": "M65.4 8 L65.4 25 L59.4 25 L59.4 7 Z M65.4 8 L66.9 9 L64.4 10.5 Z",
          "bounds": [
            59.4,
            7,
            66.9,
            25
          ],
          "direction": "down",
          "weight": 16.5
        }
      ],
      [
        {
          "outline": "M62.4 15 L88.95 15 L88.95 17 L62.4 17 Z M88.95 15 L76.95 16 L82.95 10 Z",
          "bounds": [
            62.4,
            10,
            88.95,
            17
          ],
          "direction": "right",
          "weight": 26.52
        }
      ],
      [
        {
          "outline": "M42.5 23 L88.35 23 L88.35 25 L42.5 25 Z",
          "bounds": [
            42.5,
            23,
            88.35,
            25
          ],
          "direction": "right",
          "weight": 45.8575
        },
        {
          "outline": "M91.1 25.25 L90.35 26.35 L89.6 27.5 L88.8 28.65 L88 29.8 L87.15 30.9 L86.3 32.05 L85.4 33.2 L84.5 34.35 L83.5 35.45 L82.7 36.7 L81.9 36.25 L82.4 34.9 L82.7 33.45 L83.05 32.05 L83.4 30.65 L83.8 29.3 L84.15 27.95 L84.55 26.6 L84.9 25.3 L85.3 24 L85.65 22.7 Z M85.35 23 L88.35 20.5 L93.85 25 L91.35 26.5 L85.35 29 Z",
          "bounds": [
            81.9,
            20.5,
            93.85,
            36.7
          ],
          "direction": "curve",
          "weight": 13.899137,
          "revealPath": "M88.3975 24 Q85.635 30 82.32 36.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.5 23 L45.5 50 L39.5 50 L39.5 20 Z M39.5 50 L45.5 50 L44.3 51.8 L42.5 53 L40.7 51.8 Z M45.5 50 L45.25 56.35 L44.75 62.3 L44 67.85 L43.05 72.95 L41.8 77.6 L40.35 81.85 L38.6 85.6 L36.6 88.9 L34.3 91.65 L31.8 93.8 L31.15 93.15 L32.8 90.5 L34.3 87.55 L35.6 84.25 L36.75 80.65 L37.7 76.6 L38.45 72.1 L39.05 67.2 L39.4 61.9 L39.55 56.15 L39.5 50 Z",
          "bounds": [
            31.15,
            20,
            45.5,
            93.8
          ],
          "direction": "curve",
          "weight": 70.881539,
          "revealPath": "M42.54 24 L42.54 50 Q42.54 82.5 31.490000000000002 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M42.95 36.5 L81.1 32.5 L81.3 34.45 L43.15 38.45 Z M81.1 32.5 L69.25 34.75 L74.6 28.15 Z",
          "bounds": [
            42.95,
            28.15,
            81.3,
            38.45
          ],
          "direction": "curve",
          "weight": 38.331775,
          "revealPath": "M43.0925 37.5 L81.215 33.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M63.75 26 L63.75 38.5 L57.75 38.5 L57.75 25 Z M63.75 26 L65.25 27 L62.75 28.5 Z M57.75 38.5 L63.75 38.5 L62.55 40.3 L60.75 41.5 L58.95 40.3 Z M63.75 38.5 L63.8 39.1 L63.85 39.55 L63.95 39.85 L64.05 40 L64.1 40.1 L64.2 40.2 L64.4 40.25 L64.7 40.35 L65.15 40.45 L65.75 40.5 L65.75 46.5 L64.45 46.4 L63.2 46.2 L62 45.8 L60.9 45.15 L59.9 44.35 L59.05 43.35 L58.45 42.2 L58.05 41 L57.8 39.75 L57.75 38.5 Z M65.75 40.5 L67.85 41.4 L68.75 43.5 L67.85 45.6 L65.75 46.5 Z M65.75 40.5 L88.95 40.5 L88.95 46.5 L65.75 46.5 Z M88.95 40.5 L90.75 41.7 L91.95 43.5 L90.75 45.3 L88.95 46.5 Z",
          "bounds": [
            57.75,
            25,
            91.95,
            46.5
          ],
          "direction": "curve",
          "weight": 43.248568,
          "revealPath": "M60.772499999999994 25.5 L60.772499999999994 38.5 Q60.772499999999994 43.5 65.7725 43.5 L88.95 43.5",
          "revealWidth": 14
        },
        {
          "outline": "M88.95 40.5 L85.95 40.5 L88.95 28 L89.95 28 Z",
          "bounds": [
            85.95,
            28,
            89.95,
            40.5
          ],
          "direction": "up",
          "weight": 12.5
        }
      ],
      [
        {
          "outline": "M82.6 53.5 L79.55 54.1 L76.4 54.7 L73.2 55.2 L69.9 55.6 L66.5 56 L63 56.25 L59.4 56.5 L55.7 56.6 L51.95 56.6 L48.05 56.4 L48 55.55 L51.75 54.7 L55.45 53.95 L59 53.25 L62.45 52.5 L65.8 51.8 L69.05 51.05 L72.2 50.25 L75.25 49.45 L78.2 48.6 L81.05 47.7 Z M80.55 47.85 L86.2 52.55 L82.6 53.5 Z M86.2 52.55 L86.35 54.05 L82.8 52.4 Z",
          "bounds": [
            48,
            47.7,
            86.35,
            56.6
          ],
          "direction": "curve",
          "weight": 34.693732,
          "revealPath": "M82.32 50.5 Q67.4025 54.5 48.065 56",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M49.8 59.35 L51.1 60 L52.45 60.5 L53.75 61.05 L55 61.7 L56.15 62.4 L57.25 63.15 L58.3 63.95 L59.25 64.8 L60.15 65.75 L61 66.7 L55.75 69.6 L55.45 68.75 L55.1 67.85 L54.7 66.95 L54.2 66 L53.6 65.05 L52.95 64.05 L52.2 63.05 L51.35 62.05 L50.45 61 L49.35 60.1 Z M61 66.7 L61.2 69 L59.8 70.8 L57.55 71 L55.75 69.6 Z",
          "bounds": [
            49.35,
            59.35,
            61.2,
            71
          ],
          "direction": "curve",
          "weight": 14.103298,
          "revealPath": "M49.17 59.5 Q55.8 63.5 59.114999999999995 69.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M87.75 60.65 L86.7 61.7 L85.6 62.85 L84.45 64 L83.25 65.2 L81.95 66.45 L80.6 67.7 L79.15 69.05 L77.6 70.4 L76 71.8 L74.35 73.25 L73.65 72.7 L74.85 70.85 L75.9 68.95 L76.95 67.2 L77.95 65.55 L78.9 63.95 L79.8 62.45 L80.65 61 L81.45 59.65 L82.2 58.35 L82.9 57.1 Z M82.6 57.5 L83.15 56.8 L87.75 60.65 Z M87.75 60.65 L88.35 62.35 L85.45 62.1 Z",
          "bounds": [
            73.65,
            56.8,
            88.35,
            73.25
          ],
          "direction": "curve",
          "weight": 18.570622,
          "revealPath": "M85.635 58.5 Q81.215 64.5 74.0325 73",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.3 73.5 L93.35 73.5 L93.35 75.5 L45.3 75.5 Z M93.35 73.5 L81.35 74.5 L87.35 68.5 Z",
          "bounds": [
            45.3,
            68.5,
            93.35,
            75.5
          ],
          "direction": "right",
          "weight": 48.0675
        }
      ],
      [
        {
          "outline": "M71.5 56.5 L71.5 86.5 L65.5 86.5 L65.5 55.5 Z M71.5 56.5 L73 57.5 L70.5 59 Z M65.5 86.5 L71.5 86.5 L70.3 88.3 L68.5 89.5 L66.7 88.3 Z M71.5 86.5 L71.4 87.75 L71.2 89 L70.8 90.2 L70.2 91.35 L69.35 92.35 L68.35 93.15 L67.2 93.8 L66 94.2 L64.75 94.4 L63.5 94.5 L63.5 88.5 L64.1 88.45 L64.55 88.35 L64.85 88.25 L65 88.2 L65.1 88.1 L65.2 88 L65.3 87.85 L65.35 87.55 L65.45 87.1 L65.5 86.5 Z",
          "bounds": [
            63.5,
            55.5,
            73,
            94.5
          ],
          "direction": "curve",
          "weight": 37.571068,
          "revealPath": "M68.5075 56 L68.5075 86.5 Q68.5075 91.5 63.50749999999999 91.5",
          "revealWidth": 14
        },
        {
          "outline": "M63.5 91.5 L53.5 90 L53.5 88.5 L63.5 88.5 Z",
          "bounds": [
            53.5,
            88.5,
            63.5,
            91.5
          ],
          "direction": "left",
          "weight": 10
        }
      ]
    ],
    "pathsSha256": "7bdbaf2f6b1c3ed5276665ebae96329e3a017f766967615ad2d9cfb8fdaee816",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5611.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/5611.svg",
      "dictionarySvgSha256": "64d6e35371c5f6262cfbc23c8ec1a3cb03369df73841ee079b518572c9dd1afe",
      "dictionaryDirectionStrokes": "원국내 정적대응/HQ6·UP9·LEFT14 과거실패 보존. 새14p18m40·HQ6/ordinaryUP9/LEFT14 실제component승인 대기. 제품UI/공식temporal/전체자동재생false.",
      "orderReviewSha256": "343664c70675762ba430a4b2b2712d57c8e4a62b948c89b94755800eae7b26c5",
      "geometryReviewSha256": "343664c70675762ba430a4b2b2712d57c8e4a62b948c89b94755800eae7b26c5",
      "directionReviewSha256": "343664c70675762ba430a4b2b2712d57c8e4a62b948c89b94755800eae7b26c5"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed base actual full5/id3; corrected18mask provisional1341 preparation.",
      "editableSource": "/hanja-strokes/glyphwiki/u5611.json",
      "modifications": "batch1341 미등록18mask 갱신. 원1030 base actualfull5/id3 및 14논리획·원40polygon union은 그대로다. 고정 후보fixture geometry1fa8bb9250960fa6aa09664ba76147f42a799005f38d8dbf34abdb580aa977db의 9m2 UP12.5/14m2 LEFT10은 원끝quad만 독립표시하며 원bodyguide·폭·bodyweight·나머지12획을 보존한다. 9/14 bodyoutline과bounds는 원quad분리 범위만 변경했고 tailweight추가로 해당획 내부비율이 바뀐다. 새투영/derive/engine호출0이며 고정fixture복제뿐이다. 원HQ6/UP9/LEFT14 실패와 초기16mask 준비false는 역사로 보존한다. 새18mask 후보 native/실제component/runtime승인 대기false·제품UI/controller/storage/전체자동재생false."
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
export function loadGlyphWikiBatch1341Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1341 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1341_STROKES:ReturnType<typeof loadGlyphWikiBatch1341Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1341_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1341_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1341_ASSIGNMENT_PROVISIONAL=true
