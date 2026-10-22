import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** Fixed source-only1349; native component approval and registration pending. */
const EXPECTED = [
  {
    "glyph": "絰",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "d62badf7a5f2d7eba4f528a0c96419bad7200acf3cf07e790d83b60c7a6b0806",
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
      12,
      13,
      14,
      15
    ],
    "paths": [
      "M27.9 9.75 L26.75 11.7 L25.55 13.65 L24.35 15.55 L23.1 17.45 L21.8 19.35 L20.45 21.2 L19.1 23.05 L17.65 24.8 L16.1 26.55 L14.55 28.2 L13.8 27.75 L14.65 25.6 L15.5 23.5 L16.4 21.4 L17.3 19.35 L18.2 17.35 L19.1 15.3 L19.95 13.25 L20.8 11.2 L21.65 9.15 L22.5 7.1 Z M22.25 7.55 L22.75 6.55 L27.9 9.75 Z M27.9 9.75 L28.8 11.3 L25.9 11.55 Z M7.2 22.35 L9 23.25 L10.8 24.1 L12.45 25.15 L14 26.3 L15.45 27.55 L16.85 28.95 L18.1 30.45 L19.25 32.05 L20.25 33.75 L21.2 35.55 L15.55 37.6 L15.1 36 L14.6 34.5 L14 33 L13.25 31.5 L12.45 30.05 L11.55 28.65 L10.5 27.25 L9.35 25.85 L8.15 24.4 L6.75 23.1 Z M21.2 35.55 L21.05 37.8 L19.4 39.4 L17.1 39.25 L15.55 37.6 Z",
      "M38.3 21.35 L36.15 24.9 L33.95 28.45 L31.7 31.95 L29.4 35.4 L27.05 38.85 L24.65 42.25 L22.15 45.6 L19.6 48.9 L16.95 52.1 L14.15 55.25 L13.45 54.7 L15.4 51.05 L17.4 47.4 L19.4 43.8 L21.45 40.2 L23.45 36.6 L25.45 33 L27.4 29.35 L29.3 25.75 L31.2 22.1 L33.05 18.45 Z M32.8 18.9 L33.3 18 L38.3 21.35 Z M38.3 21.35 L39.15 22.95 L36.2 23.05 Z M7.4 53.45 L10.3 53.2 L13.2 52.9 L16.05 52.6 L18.9 52.25 L21.75 51.9 L24.55 51.5 L27.35 51.1 L30.15 50.7 L32.95 50.35 L35.8 50.05 L36.05 50.9 L33.45 52.15 L30.85 53.3 L28.15 54.3 L25.4 55.2 L22.6 56.05 L19.8 56.8 L16.95 57.55 L14.05 58.2 L11.1 58.8 L8.15 59.4 Z M8.15 59.4 L6.4 53.55 L7.4 53.45 Z M8.15 59.4 L10.95 57.5 L9.35 60.75 Z",
      "M28.95 39 L30.45 40.1 L32 41.2 L33.4 42.5 L34.7 43.95 L35.9 45.5 L37.05 47.15 L38.05 48.9 L39 50.75 L39.85 52.75 L40.65 54.8 L34.8 56.25 L34.5 54.35 L34.1 52.55 L33.6 50.8 L33.05 49.05 L32.45 47.4 L31.8 45.8 L31.05 44.2 L30.25 42.65 L29.4 41.1 L28.35 39.65 Z M40.65 54.8 L40.25 57.05 L38.45 58.45 L36.2 58.05 L34.8 56.25 Z",
      "M26.95 53.5 L26.95 91.5 L20.95 94.5 L20.95 53.5 Z",
      "M18.2 64.3 L17.7 67.1 L17.05 69.85 L16.25 72.55 L15.4 75.25 L14.35 77.9 L13.2 80.5 L11.9 83.05 L10.45 85.5 L8.8 87.9 L6.95 90.2 L6.15 89.75 L7.1 87 L8 84.35 L8.85 81.75 L9.65 79.15 L10.3 76.55 L10.9 74 L11.4 71.4 L11.75 68.8 L12.05 66.25 L12.2 63.65 Z M12.15 64.15 L12.3 62.6 L18.2 64.3 Z M18.2 64.3 L19.55 65.45 L16.95 66.65 Z",
      "M29.35 61.05 L30.8 62.2 L32.25 63.5 L33.6 64.95 L34.85 66.5 L36 68.2 L37.05 70.05 L38 71.95 L38.9 74 L39.7 76.15 L40.35 78.4 L34.5 79.6 L34.2 77.5 L33.85 75.5 L33.45 73.6 L32.95 71.75 L32.4 69.95 L31.8 68.2 L31.1 66.5 L30.35 64.85 L29.6 63.2 L28.65 61.65 Z M40.35 78.4 L39.9 80.65 L38 81.95 L35.8 81.5 L34.5 79.6 Z",
      "M40.75 15 L93.2 15 L93.2 17 L40.75 17 Z M93.2 15 L81.2 16 L87.2 10 Z",
      "M65.95 16 L65.7 16.8 L64.7 19.7 L63.7 22.55 L62.65 25.45 L61.55 28.35 L60.45 31.25 L59.3 34.15 L58.1 37.05 L56.8 39.9 L55.45 42.8 L53.95 45.6 L53.1 45.35 L53.65 42.2 L54.25 39.05 L54.95 36 L55.65 33 L56.4 29.95 L57.1 26.95 L57.85 24 L58.55 21.05 L59.25 18.1 L59.7 16 Z M44.1 43.45 L47.9 43.2 L51.7 42.9 L55.55 42.6 L59.5 42.25 L63.5 41.85 L67.55 41.45 L71.7 41.05 L75.9 40.65 L80.15 40.3 L84.5 40.05 L84.65 40.9 L80.5 42.2 L76.35 43.3 L72.2 44.3 L68.15 45.2 L64.15 46.05 L60.15 46.85 L56.25 47.55 L52.35 48.25 L48.5 48.85 L44.75 49.4 Z M44.75 49.4 L43.15 43.55 L44.1 43.45 Z M44.75 49.4 L47.55 47.6 L45.9 50.8 Z",
      "M72.75 24 L75.2 25.75 L77.5 27.65 L79.6 29.75 L81.6 31.95 L83.5 34.3 L85.3 36.75 L86.95 39.25 L88.5 41.9 L89.95 44.65 L91.3 47.5 L85.7 49.65 L84.75 46.95 L83.7 44.3 L82.55 41.65 L81.3 39.15 L79.95 36.65 L78.55 34.2 L77.05 31.8 L75.45 29.4 L73.8 27.05 L72.15 24.65 Z M91.3 47.5 L91.25 49.75 L89.6 51.35 L87.3 51.3 L85.7 49.65 Z",
      "M44.15 64.65 L90.15 64.65 L90.15 66.65 L44.15 66.65 Z M90.15 64.65 L78.15 65.65 L84.15 59.65 Z",
      "M70.15 49.65 L70.15 89.35 L64.15 89.35 L64.15 48.65 Z M70.15 49.65 L71.65 50.65 L69.15 52.15 Z",
      "M40.05 87.35 L94.25 87.35 L94.25 89.35 L40.05 89.35 Z M94.25 87.35 L82.25 88.35 L88.25 82.35 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M27.9 9.75 L26.75 11.7 L25.55 13.65 L24.35 15.55 L23.1 17.45 L21.8 19.35 L20.45 21.2 L19.1 23.05 L17.65 24.8 L16.1 26.55 L14.55 28.2 L13.8 27.75 L14.65 25.6 L15.5 23.5 L16.4 21.4 L17.3 19.35 L18.2 17.35 L19.1 15.3 L19.95 13.25 L20.8 11.2 L21.65 9.15 L22.5 7.1 Z M22.25 7.55 L22.75 6.55 L27.9 9.75 Z M27.9 9.75 L28.8 11.3 L25.9 11.55 Z",
          "bounds": [
            13.8,
            6.55,
            28.8,
            28.2
          ],
          "direction": "curve",
          "weight": 22.940824,
          "revealPath": "M25.425 8 Q20.35 18.5 14.1875 28",
          "revealWidth": 14
        },
        {
          "outline": "M7.2 22.35 L9 23.25 L10.8 24.1 L12.45 25.15 L14 26.3 L15.45 27.55 L16.85 28.95 L18.1 30.45 L19.25 32.05 L20.25 33.75 L21.2 35.55 L15.55 37.6 L15.1 36 L14.6 34.5 L14 33 L13.25 31.5 L12.45 30.05 L11.55 28.65 L10.5 27.25 L9.35 25.85 L8.15 24.4 L6.75 23.1 Z M21.2 35.55 L21.05 37.8 L19.4 39.4 L17.1 39.25 L15.55 37.6 Z",
          "bounds": [
            6.75,
            22.35,
            21.2,
            39.4
          ],
          "direction": "curve",
          "weight": 19.80292,
          "revealPath": "M6.575 22.5 Q15.275 28 18.9 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M38.3 21.35 L36.15 24.9 L33.95 28.45 L31.7 31.95 L29.4 35.4 L27.05 38.85 L24.65 42.25 L22.15 45.6 L19.6 48.9 L16.95 52.1 L14.15 55.25 L13.45 54.7 L15.4 51.05 L17.4 47.4 L19.4 43.8 L21.45 40.2 L23.45 36.6 L25.45 33 L27.4 29.35 L29.3 25.75 L31.2 22.1 L33.05 18.45 Z M32.8 18.9 L33.3 18 L38.3 21.35 Z M38.3 21.35 L39.15 22.95 L36.2 23.05 Z",
          "bounds": [
            13.45,
            18,
            39.15,
            55.25
          ],
          "direction": "curve",
          "weight": 41.82359,
          "revealPath": "M35.9375 19.5 Q25.7875 38 13.825 55",
          "revealWidth": 14
        },
        {
          "outline": "M7.4 53.45 L10.3 53.2 L13.2 52.9 L16.05 52.6 L18.9 52.25 L21.75 51.9 L24.55 51.5 L27.35 51.1 L30.15 50.7 L32.95 50.35 L35.8 50.05 L36.05 50.9 L33.45 52.15 L30.85 53.3 L28.15 54.3 L25.4 55.2 L22.6 56.05 L19.8 56.8 L16.95 57.55 L14.05 58.2 L11.1 58.8 L8.15 59.4 Z M8.15 59.4 L6.4 53.55 L7.4 53.45 Z M8.15 59.4 L10.95 57.5 L9.35 60.75 Z",
          "bounds": [
            6.4,
            50.05,
            36.05,
            60.75
          ],
          "direction": "curve",
          "weight": 29.259296,
          "revealPath": "M7.3 56.5 Q22.525 54.5 35.9375 50.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M28.95 39 L30.45 40.1 L32 41.2 L33.4 42.5 L34.7 43.95 L35.9 45.5 L37.05 47.15 L38.05 48.9 L39 50.75 L39.85 52.75 L40.65 54.8 L34.8 56.25 L34.5 54.35 L34.1 52.55 L33.6 50.8 L33.05 49.05 L32.45 47.4 L31.8 45.8 L31.05 44.2 L30.25 42.65 L29.4 41.1 L28.35 39.65 Z M40.65 54.8 L40.25 57.05 L38.45 58.45 L36.2 58.05 L34.8 56.25 Z",
          "bounds": [
            28.35,
            39,
            40.65,
            58.45
          ],
          "direction": "curve",
          "weight": 20.488903,
          "revealPath": "M28.325 39 Q35.2125 45.5 38.1125 57",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.95 53.5 L26.95 91.5 L20.95 94.5 L20.95 53.5 Z",
          "bounds": [
            20.95,
            53.5,
            26.95,
            94.5
          ],
          "direction": "down",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M18.2 64.3 L17.7 67.1 L17.05 69.85 L16.25 72.55 L15.4 75.25 L14.35 77.9 L13.2 80.5 L11.9 83.05 L10.45 85.5 L8.8 87.9 L6.95 90.2 L6.15 89.75 L7.1 87 L8 84.35 L8.85 81.75 L9.65 79.15 L10.3 76.55 L10.9 74 L11.4 71.4 L11.75 68.8 L12.05 66.25 L12.2 63.65 Z M12.15 64.15 L12.3 62.6 L18.2 64.3 Z M18.2 64.3 L19.55 65.45 L16.95 66.65 Z",
          "bounds": [
            6.15,
            62.6,
            19.55,
            90.2
          ],
          "direction": "curve",
          "weight": 27.891576,
          "revealPath": "M15.275 63.5 Q13.825 77.5 6.575 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M29.35 61.05 L30.8 62.2 L32.25 63.5 L33.6 64.95 L34.85 66.5 L36 68.2 L37.05 70.05 L38 71.95 L38.9 74 L39.7 76.15 L40.35 78.4 L34.5 79.6 L34.2 77.5 L33.85 75.5 L33.45 73.6 L32.95 71.75 L32.4 69.95 L31.8 68.2 L31.1 66.5 L30.35 64.85 L29.6 63.2 L28.65 61.65 Z M40.35 78.4 L39.9 80.65 L38 81.95 L35.8 81.5 L34.5 79.6 Z",
          "bounds": [
            28.65,
            61.05,
            40.35,
            81.95
          ],
          "direction": "curve",
          "weight": 21.502998,
          "revealPath": "M28.6875 61 Q35.2125 68 37.75 80.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40.75 15 L93.2 15 L93.2 17 L40.75 17 Z M93.2 15 L81.2 16 L87.2 10 Z",
          "bounds": [
            40.75,
            10,
            93.2,
            17
          ],
          "direction": "right",
          "weight": 52.48
        }
      ],
      [
        {
          "outline": "M65.95 16 L65.7 16.8 L64.7 19.7 L63.7 22.55 L62.65 25.45 L61.55 28.35 L60.45 31.25 L59.3 34.15 L58.1 37.05 L56.8 39.9 L55.45 42.8 L53.95 45.6 L53.1 45.35 L53.65 42.2 L54.25 39.05 L54.95 36 L55.65 33 L56.4 29.95 L57.1 26.95 L57.85 24 L58.55 21.05 L59.25 18.1 L59.7 16 Z",
          "bounds": [
            53.1,
            16,
            65.95,
            45.6
          ],
          "direction": "curve",
          "weight": 30.925207,
          "revealPath": "M62.84 16 Q58.68 30.5 53.56 45.5",
          "revealWidth": 14
        },
        {
          "outline": "M44.1 43.45 L47.9 43.2 L51.7 42.9 L55.55 42.6 L59.5 42.25 L63.5 41.85 L67.55 41.45 L71.7 41.05 L75.9 40.65 L80.15 40.3 L84.5 40.05 L84.65 40.9 L80.5 42.2 L76.35 43.3 L72.2 44.3 L68.15 45.2 L64.15 46.05 L60.15 46.85 L56.25 47.55 L52.35 48.25 L48.5 48.85 L44.75 49.4 Z M44.75 49.4 L43.15 43.55 L44.1 43.45 Z M44.75 49.4 L47.55 47.6 L45.9 50.8 Z",
          "bounds": [
            43.15,
            40.05,
            84.65,
            50.8
          ],
          "direction": "curve",
          "weight": 41.080526,
          "revealPath": "M43.96 46.5 Q63.16 44.5 84.6 40.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M72.75 24 L75.2 25.75 L77.5 27.65 L79.6 29.75 L81.6 31.95 L83.5 34.3 L85.3 36.75 L86.95 39.25 L88.5 41.9 L89.95 44.65 L91.3 47.5 L85.7 49.65 L84.75 46.95 L83.7 44.3 L82.55 41.65 L81.3 39.15 L79.95 36.65 L78.55 34.2 L77.05 31.8 L75.45 29.4 L73.8 27.05 L72.15 24.65 Z M91.3 47.5 L91.25 49.75 L89.6 51.35 L87.3 51.3 L85.7 49.65 Z",
          "bounds": [
            72.15,
            24,
            91.3,
            51.35
          ],
          "direction": "curve",
          "weight": 31.042577,
          "revealPath": "M72.12 24 Q83 34.5 89.08 50",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M44.15 64.65 L90.15 64.65 L90.15 66.65 L44.15 66.65 Z M90.15 64.65 L78.15 65.65 L84.15 59.65 Z",
          "bounds": [
            44.15,
            59.65,
            90.15,
            66.65
          ],
          "direction": "right",
          "weight": 46.0192
        }
      ],
      [
        {
          "outline": "M70.15 49.65 L70.15 89.35 L64.15 89.35 L64.15 48.65 Z M70.15 49.65 L71.65 50.65 L69.15 52.15 Z",
          "bounds": [
            64.15,
            48.65,
            71.65,
            89.35
          ],
          "direction": "down",
          "weight": 39.1875
        }
      ],
      [
        {
          "outline": "M40.05 87.35 L94.25 87.35 L94.25 89.35 L40.05 89.35 Z M94.25 87.35 L82.25 88.35 L88.25 82.35 Z",
          "bounds": [
            40.05,
            82.35,
            94.25,
            89.35
          ],
          "direction": "right",
          "weight": 54.2144
        }
      ]
    ],
    "pathsSha256": "f4f470ef39e34e2d670b93f668aec06f444621888c61a8124b44c0190d8111a1",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D70.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7D00/7D70.svg",
      "dictionarySvgSha256": "95d97dcaab705dd94962ddebf33c7dc8927cc125894f31cf6561f112847c206d",
      "dictionaryDirectionStrokes": "정적12그룹과공식CSS1·2·8거시방향만;진행/연결/전체native/APP/등록false.",
      "orderReviewSha256": "62933210274886f4a88d30326227649829a2514242c38334baa02f8ef1674bf8",
      "geometryReviewSha256": "5baccae8f5bf1b95781d8ee2a3d089a986a478a9f86fa03a2b6583fb8b633894"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u7d70@11",
      "revision": "u7d70@11 및고정closure7record;2026-10-22 actualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u7d70.json",
      "modifications": "1349 미등록12p15m33. 고정actualfull5/id3의15raw15call33P를 기존8066byte pureprojector로FIRST1 투영하고 즉시cache에고정했다. 세QQ pair는논리1·2·8 각각독립2mask이며 원P/guide/폭/weight/flags모두그대로다. guidejoin/새connector/원sourcecompiler/engine실행0. 정적12대응5화면과공식CSS clock1·2·8의12유한화면만있으며진행정책/초기cap/연결/coverage/APP/runtime승인false."
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
export function loadGlyphWikiBatch1349Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1349 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1349_STROKES:ReturnType<typeof loadGlyphWikiBatch1349Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1349_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1349_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1349_ASSIGNMENT_PROVISIONAL=true
