import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1372 정적16대응후 미등록후보. 원HOLD와false준비이력보존. */
const EXPECTED = [
  {
    "glyph": "璔",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "57563017164e307f0cce968f5f6461743200830646fd18e24b9f519396260d58",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      2,
      4,
      5,
      6,
      8,
      9,
      11,
      13,
      14,
      12,
      15,
      16,
      18,
      19
    ],
    "paths": [
      "M6.8 20 L36.55 20 L36.55 22 L6.8 22 Z M36.55 20 L24.55 21 L30.55 15 Z",
      "M8.25 45.5 L35.1 45.5 L35.1 47.5 L8.25 47.5 Z M35.1 45.5 L23.1 46.5 L29.1 40.5 Z",
      "M22.95 20 L22.95 75.5 L16.95 75.5 L16.95 20 Z",
      "M6.25 77 L9.05 76.15 L11.95 75.25 L14.9 74.3 L17.9 73.35 L21 72.35 L24.15 71.3 L27.45 70.2 L30.8 69.15 L34.25 68.1 L37.8 67.05 L38.2 67.9 L35 69.8 L31.85 71.6 L28.7 73.25 L25.6 74.8 L22.6 76.3 L19.6 77.7 L16.7 79 L13.8 80.3 L11 81.5 L8.25 82.65 Z M8.25 82.65 L5.35 77.3 L6.25 77 Z M8.25 82.65 L10.6 80.2 L9.7 83.7 Z",
      "M55.15 18.1 L53.8 20.65 L52.3 23.15 L50.6 25.5 L48.75 27.75 L46.7 29.9 L44.5 31.9 L42.15 33.75 L39.6 35.45 L36.85 37 L33.95 38.35 L33.45 37.6 L35.75 35.45 L37.95 33.35 L39.95 31.3 L41.8 29.2 L43.55 27.05 L45.05 24.9 L46.45 22.7 L47.65 20.45 L48.7 18.15 L49.65 15.8 Z M49.45 16.25 L49.9 15.15 L55.15 18.1 Z M55.15 18.1 L56.15 19.6 L53.3 20 Z",
      "M54.3 11.5 L76.55 11.5 L76.55 13.5 L54.3 13.5 Z M76.55 11.5 L66.55 12.5 L71.55 7 Z M74.75 12.8 L76.3 15.3 L77.8 17.6 L79.35 19.8 L80.95 21.8 L82.6 23.6 L84.4 25.3 L86.3 26.85 L88.3 28.2 L90.4 29.45 L92.6 30.55 L89.5 36.4 L87.05 34.75 L84.75 32.95 L82.6 30.95 L80.7 28.85 L79 26.55 L77.5 24.15 L76.2 21.6 L75.15 18.9 L74.35 16.05 L73.9 13.1 Z M89.5 36.4 L92.6 30.55 L95.15 31.9 Z",
      "M46.65 33.2 L46.65 56.4 L40.65 59.4 L40.65 30.2 Z",
      "M43.65 33.2 L83.8 33.2 L83.8 35.2 L43.65 35.2 Z M86.8 34.2 L86.8 55.9 L80.8 58.9 L80.8 34.2 Z M80.8 33.2 L83.8 30.7 L89.3 35.2 L86.8 37.2 L80.8 34.2 Z",
      "M66.75 33.2 L66.75 54.9 L60.75 54.9 L60.75 33.2 Z",
      "M49.2 37.65 L50.25 38.4 L51.4 39 L52.5 39.75 L53.55 40.55 L54.5 41.4 L55.45 42.35 L56.3 43.4 L57.15 44.45 L57.9 45.6 L58.6 46.8 L52.95 48.85 L52.75 47.75 L52.5 46.7 L52.25 45.6 L51.9 44.55 L51.5 43.5 L51.05 42.45 L50.55 41.4 L50 40.35 L49.45 39.25 L48.6 38.35 Z M58.6 46.8 L58.45 49.1 L56.75 50.65 L54.5 50.5 L52.95 48.85 Z",
      "M79.25 40.8 L78.4 41.8 L77.5 42.85 L76.6 43.9 L75.65 44.95 L74.6 46 L73.55 47.05 L72.45 48.15 L71.3 49.25 L70.1 50.3 L68.95 51.5 L68.25 51 L69.05 49.55 L69.65 48.05 L70.3 46.6 L70.9 45.25 L71.5 43.9 L72.05 42.6 L72.6 41.3 L73.15 40.1 L73.65 38.9 L74.1 37.75 Z M73.85 38.15 L74.35 37.3 L79.25 40.8 Z M79.25 40.8 L80 42.45 L77.1 42.45 Z",
      "M43.65 52.9 L83.8 52.9 L83.8 54.9 L43.65 54.9 Z",
      "M51.25 62.45 L51.25 91.25 L45.25 94.25 L45.25 59.45 Z",
      "M48.25 62.45 L79.2 62.45 L79.2 64.45 L48.25 64.45 Z M82.2 63.45 L82.2 89.75 L76.2 92.75 L76.2 63.45 Z M76.2 62.45 L79.2 59.95 L84.7 64.45 L82.2 66.45 L76.2 63.45 Z",
      "M48.25 73.75 L79.2 73.75 L79.2 75.75 L48.25 75.75 Z",
      "M48.25 85.75 L79.2 85.75 L79.2 87.75 L48.25 87.75 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.8 20 L36.55 20 L36.55 22 L6.8 22 Z M36.55 20 L24.55 21 L30.55 15 Z",
          "bounds": [
            6.8,
            15,
            36.55,
            22
          ],
          "direction": "right",
          "weight": 29.7375
        }
      ],
      [
        {
          "outline": "M8.25 45.5 L35.1 45.5 L35.1 47.5 L8.25 47.5 Z M35.1 45.5 L23.1 46.5 L29.1 40.5 Z",
          "bounds": [
            8.25,
            40.5,
            35.1,
            47.5
          ],
          "direction": "right",
          "weight": 26.8125
        }
      ],
      [
        {
          "outline": "M22.95 20 L22.95 75.5 L16.95 75.5 L16.95 20 Z",
          "bounds": [
            16.95,
            20,
            22.95,
            75.5
          ],
          "direction": "down",
          "weight": 53.5
        }
      ],
      [
        {
          "outline": "M6.25 77 L9.05 76.15 L11.95 75.25 L14.9 74.3 L17.9 73.35 L21 72.35 L24.15 71.3 L27.45 70.2 L30.8 69.15 L34.25 68.1 L37.8 67.05 L38.2 67.9 L35 69.8 L31.85 71.6 L28.7 73.25 L25.6 74.8 L22.6 76.3 L19.6 77.7 L16.7 79 L13.8 80.3 L11 81.5 L8.25 82.65 Z M8.25 82.65 L5.35 77.3 L6.25 77 Z M8.25 82.65 L10.6 80.2 L9.7 83.7 Z",
          "bounds": [
            5.35,
            67.05,
            38.2,
            83.7
          ],
          "direction": "curve",
          "weight": 33.610861,
          "revealPath": "M6.825 80 Q20.9625 75 38.025 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M55.15 18.1 L53.8 20.65 L52.3 23.15 L50.6 25.5 L48.75 27.75 L46.7 29.9 L44.5 31.9 L42.15 33.75 L39.6 35.45 L36.85 37 L33.95 38.35 L33.45 37.6 L35.75 35.45 L37.95 33.35 L39.95 31.3 L41.8 29.2 L43.55 27.05 L45.05 24.9 L46.45 22.7 L47.65 20.45 L48.7 18.15 L49.65 15.8 Z M49.45 16.25 L49.9 15.15 L55.15 18.1 Z M55.15 18.1 L56.15 19.6 L53.3 20 Z",
          "bounds": [
            33.45,
            15.15,
            56.15,
            38.35
          ],
          "direction": "curve",
          "weight": 28.626212,
          "revealPath": "M52.6125 16.5 Q47.2125 29.5 33.7125 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M54.3 11.5 L76.55 11.5 L76.55 13.5 L54.3 13.5 Z M76.55 11.5 L66.55 12.5 L71.55 7 Z",
          "bounds": [
            54.3,
            7,
            76.55,
            13.5
          ],
          "direction": "right",
          "weight": 22.275
        },
        {
          "outline": "M74.75 12.8 L76.3 15.3 L77.8 17.6 L79.35 19.8 L80.95 21.8 L82.6 23.6 L84.4 25.3 L86.3 26.85 L88.3 28.2 L90.4 29.45 L92.6 30.55 L89.5 36.4 L87.05 34.75 L84.75 32.95 L82.6 30.95 L80.7 28.85 L79 26.55 L77.5 24.15 L76.2 21.6 L75.15 18.9 L74.35 16.05 L73.9 13.1 Z M89.5 36.4 L92.6 30.55 L95.15 31.9 Z",
          "bounds": [
            73.9,
            12.8,
            95.15,
            36.4
          ],
          "direction": "curve",
          "weight": 26.940038,
          "revealPath": "M74.2125 12.5 Q78.9375 27 91.0875 33.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.65 33.2 L46.65 56.4 L40.65 59.4 L40.65 30.2 Z",
          "bounds": [
            40.65,
            30.2,
            46.65,
            59.4
          ],
          "direction": "down",
          "weight": 19.670976
        }
      ],
      [
        {
          "outline": "M43.65 33.2 L83.8 33.2 L83.8 35.2 L43.65 35.2 Z M86.8 34.2 L86.8 55.9 L80.8 58.9 L80.8 34.2 Z M80.8 33.2 L83.8 30.7 L89.3 35.2 L86.8 37.2 L80.8 34.2 Z",
          "bounds": [
            43.65,
            30.7,
            89.3,
            58.9
          ],
          "direction": "curve",
          "weight": 59.833476,
          "revealPath": "M43.66875 34.230112 L83.83125 34.230112 L83.83125 53.90108799999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M66.75 33.2 L66.75 54.9 L60.75 54.9 L60.75 33.2 Z",
          "bounds": [
            60.75,
            33.2,
            66.75,
            54.9
          ],
          "direction": "down",
          "weight": 19.670976
        }
      ],
      [
        {
          "outline": "M49.2 37.65 L50.25 38.4 L51.4 39 L52.5 39.75 L53.55 40.55 L54.5 41.4 L55.45 42.35 L56.3 43.4 L57.15 44.45 L57.9 45.6 L58.6 46.8 L52.95 48.85 L52.75 47.75 L52.5 46.7 L52.25 45.6 L51.9 44.55 L51.5 43.5 L51.05 42.45 L50.55 41.4 L50 40.35 L49.45 39.25 L48.6 38.35 Z M58.6 46.8 L58.45 49.1 L56.75 50.65 L54.5 50.5 L52.95 48.85 Z",
          "bounds": [
            48.6,
            37.65,
            58.6,
            50.65
          ],
          "direction": "curve",
          "weight": 13.90175,
          "revealPath": "M48.545625 37.71639999999999 Q53.709375 42.04540000000001 56.291250000000005 49.26040000000001",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M79.25 40.8 L78.4 41.8 L77.5 42.85 L76.6 43.9 L75.65 44.95 L74.6 46 L73.55 47.05 L72.45 48.15 L71.3 49.25 L70.1 50.3 L68.95 51.5 L68.25 51 L69.05 49.55 L69.65 48.05 L70.3 46.6 L70.9 45.25 L71.5 43.9 L72.05 42.6 L72.6 41.3 L73.15 40.1 L73.65 38.9 L74.1 37.75 Z M73.85 38.15 L74.35 37.3 L79.25 40.8 Z M79.25 40.8 L80 42.45 L77.1 42.45 Z",
          "bounds": [
            68.25,
            37.3,
            80,
            51.5
          ],
          "direction": "curve",
          "weight": 14.940386,
          "revealPath": "M76.94624999999999 38.8708 Q73.50375 44.642799999999994 68.626875 51.28060000000001",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M43.65 52.9 L83.8 52.9 L83.8 54.9 L43.65 54.9 Z",
          "bounds": [
            43.65,
            52.9,
            83.8,
            54.9
          ],
          "direction": "right",
          "weight": 40.1625
        }
      ],
      [
        {
          "outline": "M51.25 62.45 L51.25 91.25 L45.25 94.25 L45.25 59.45 Z",
          "bounds": [
            45.25,
            59.45,
            51.25,
            94.25
          ],
          "direction": "down",
          "weight": 23.3376
        }
      ],
      [
        {
          "outline": "M48.25 62.45 L79.2 62.45 L79.2 64.45 L48.25 64.45 Z M82.2 63.45 L82.2 89.75 L76.2 92.75 L76.2 63.45 Z M76.2 62.45 L79.2 59.95 L84.7 64.45 L82.2 66.45 L76.2 63.45 Z",
          "bounds": [
            48.25,
            59.95,
            84.7,
            92.75
          ],
          "direction": "curve",
          "weight": 54.3201,
          "revealPath": "M48.25875 63.4512 L79.24125000000001 63.4512 L79.24125000000001 86.7888",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M48.25 73.75 L79.2 73.75 L79.2 75.75 L48.25 75.75 Z",
          "bounds": [
            48.25,
            73.75,
            79.2,
            75.75
          ],
          "direction": "right",
          "weight": 30.9825
        }
      ],
      [
        {
          "outline": "M48.25 85.75 L79.2 85.75 L79.2 87.75 L48.25 87.75 Z",
          "bounds": [
            48.25,
            85.75,
            79.2,
            87.75
          ],
          "direction": "right",
          "weight": 30.9825
        }
      ]
    ],
    "pathsSha256": "c27ab8eb47f98cad16c0b49007b48b66778d9e0b850a0d1eeb23e4f52857fe5e",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7494.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7400/7494.svg",
      "dictionarySvgSha256": "dfd3e1c9b7732d4c7bcb9395080c8ea0838784fe1c99dc2a95f7baae250614d5",
      "dictionaryDirectionStrokes": "ROOT whole2+國內16single及新pair8畫面全16靜態對應のみ。方向/時系列/動畫/actualAPP/runtime未承認。",
      "orderReviewSha256": "7679ed1d905f6d293d6208c26a9728e66f6c6fec6220406f59640e4a554ece8d",
      "geometryReviewSha256": "7679ed1d905f6d293d6208c26a9728e66f6c6fec6220406f59640e4a554ece8d"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u7494",
      "revision": "archive a7dd7f3d911936770fa742e8c37d16bee7e2173c 原selectedclosure8records+既存actualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u7494.json",
      "modifications": "1372 미등록후보. 원889 actualfull5/id3 원byte복제와 ROOT 정적16대응으로 FIRST순수투영1→즉시캐시. 原19raw19calls32P exactonce. logical6 H/Q는원gap[-4.725,0]·각mask/guide/폭/weight그대로독립2mask. HV8/14는원exactendpoint join만사용; 각원polygon 모든vertex가자기직선r14 capsule안이라는exact유리수충분조건(UA/AA 별도)으로분리불필요. logical7/13은원P전체bounds를쓰는원down cardinal, 原213/113 flags/좌표보존. 원guide/width/bodyweight/논리시간/connector 변경0. 原closed-min17>16 HOLD는정적대응자료로만분리하며native/APP/runtime미승인."
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
export function loadGlyphWikiBatch1372Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1372 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1372_STROKES:ReturnType<typeof loadGlyphWikiBatch1372Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1372_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1372_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1372_ASSIGNMENT_PROVISIONAL=true
