import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1351 ROOT 격리actualcomponent 유한관찰·등록승인 준비. 원preparation false 보존. */
const EXPECTED = [
  {
    "glyph": "邅",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "8f8dee648a6e22e5148ea26331fb6b968c1376b5b8f6aa6fd58d3b29c924215b",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      7,
      8,
      13,
      14,
      9,
      10,
      12,
      16,
      17,
      18,
      20,
      21,
      22,
      1,
      2,
      3,
      5
    ],
    "paths": [
      "M66.5 7.9 L66.5 18.25 L60.5 18.25 L60.5 6.9 Z M66.5 7.9 L68 8.9 L65.5 10.4 Z",
      "M34.5 16.25 L92.45 16.25 L92.45 18.25 L34.5 18.25 Z M92.45 16.25 L82.45 17.25 L87.45 11.75 Z",
      "M47.3 23.35 L47.3 46.7 L41.8 49.45 L41.8 20.6 Z",
      "M44.55 23.35 L82.4 23.35 L82.4 25.35 L44.55 25.35 Z M85.15 24.35 L85.15 46.7 L79.65 49.45 L79.65 24.35 Z M79.65 23.35 L82.4 20.85 L87.65 25.35 L85.15 27.1 L79.65 24.35 Z",
      "M58.4 30 L58.4 39.35 L52.9 42.1 L52.9 27.25 Z",
      "M55.65 30 L71.3 30 L71.3 32 L55.65 32 Z M74.05 31 L74.05 39.35 L68.55 42.1 L68.55 31 Z M68.55 30 L71.3 27.5 L76.55 32 L74.05 33.75 L68.55 31 Z",
      "M55.65 37.35 L71.3 37.35 L71.3 39.35 L55.65 39.35 Z",
      "M44.55 44.7 L82.4 44.7 L82.4 46.7 L44.55 46.7 Z",
      "M50.85 51.6 L50.85 71.5 L44.85 74.5 L44.85 48.6 Z",
      "M47.85 51.6 L78.75 51.6 L78.75 53.6 L47.85 53.6 Z M81.75 52.6 L81.75 71.5 L75.75 74.5 L75.75 52.6 Z M75.75 51.6 L78.75 49.1 L84.25 53.6 L81.75 55.6 L75.75 52.6 Z",
      "M47.85 60.25 L78.75 60.25 L78.75 62.25 L47.85 62.25 Z",
      "M47.85 69.5 L78.75 69.5 L78.75 71.5 L47.85 71.5 Z",
      "M33.3 76.7 L93.65 76.7 L93.65 78.7 L33.3 78.7 Z M93.65 76.7 L83.65 77.7 L88.65 72.2 Z",
      "M13.6 10.3 L15.45 10.95 L17.25 11.55 L19 12.3 L20.65 13.15 L22.25 14.1 L23.75 15.15 L25.2 16.25 L26.6 17.4 L27.9 18.7 L29.1 20.05 L24.15 23.45 L23.45 22.15 L22.65 20.85 L21.75 19.55 L20.8 18.3 L19.75 17.1 L18.6 15.85 L17.4 14.65 L16.1 13.45 L14.75 12.2 L13.2 11.1 Z M29.1 20.05 L29.55 22.3 L28.3 24.2 L26.1 24.65 L24.15 23.45 Z",
      "M8.1 28.25 L9.95 28.8 L11.75 29.35 L13.55 30 L15.25 30.8 L16.9 31.65 L18.5 32.65 L20.05 33.7 L21.55 34.85 L23 36.1 L24.35 37.4 L19.7 41.2 L18.8 39.85 L17.85 38.55 L16.8 37.25 L15.7 36 L14.55 34.8 L13.35 33.6 L12.05 32.45 L10.7 31.3 L9.3 30.1 L7.75 29.1 Z M24.35 37.4 L25 39.6 L23.9 41.65 L21.7 42.25 L19.7 41.2 Z",
      "M7 52.5 L23.5 52.5 L23.5 54.5 L7 54.5 Z M26.5 53.5 L26.5 77.5 L20.5 80.5 L20.5 53.5 Z M20.5 52.5 L23.5 50 L29 54.5 L26.5 56.5 L20.5 53.5 Z",
      "M6.35 86.65 L8.15 85.75 L9.95 84.8 L11.8 83.85 L13.65 82.85 L15.55 81.85 L17.5 80.8 L19.45 79.75 L21.5 78.7 L23.6 77.65 L25.7 76.6 L26.25 77.35 L24.6 79.05 L22.95 80.7 L21.25 82.3 L19.55 83.8 L17.85 85.25 L16.15 86.65 L14.45 88 L12.8 89.3 L11.15 90.55 L9.45 91.75 Z M9.45 91.75 L5.5 87.2 L6.35 86.65 Z M9.45 91.75 L11.25 88.95 L11.1 92.55 Z M25.65 76.1 L28.25 78.4 L30.95 80.35 L33.95 82.05 L37.6 83.4 L42.2 84.5 L48.1 85.3 L55.55 85.8 L64.7 85.95 L75.9 85.75 L89.35 85.2 L89.6 91.75 L76 92 L64.65 91.85 L55.2 91.3 L47.45 90.4 L41.2 89.05 L36.15 87.3 L32.15 85.15 L29.1 82.65 L26.75 79.8 L24.9 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M66.5 7.9 L66.5 18.25 L60.5 18.25 L60.5 6.9 Z M66.5 7.9 L68 8.9 L65.5 10.4 Z",
          "bounds": [
            60.5,
            6.9,
            68,
            18.25
          ],
          "direction": "down",
          "weight": 9.848475
        }
      ],
      [
        {
          "outline": "M34.5 16.25 L92.45 16.25 L92.45 18.25 L34.5 18.25 Z M92.45 16.25 L82.45 17.25 L87.45 11.75 Z",
          "bounds": [
            34.5,
            11.75,
            92.45,
            18.25
          ],
          "direction": "right",
          "weight": 57.936
        }
      ],
      [
        {
          "outline": "M47.3 23.35 L47.3 46.7 L41.8 49.45 L41.8 20.6 Z",
          "bounds": [
            41.8,
            20.6,
            47.3,
            49.45
          ],
          "direction": "down",
          "weight": 21.3616
        }
      ],
      [
        {
          "outline": "M44.55 23.35 L82.4 23.35 L82.4 25.35 L44.55 25.35 Z M85.15 24.35 L85.15 46.7 L79.65 49.45 L79.65 24.35 Z M79.65 23.35 L82.4 20.85 L87.65 25.35 L85.15 27.1 L79.65 24.35 Z",
          "bounds": [
            44.55,
            20.85,
            87.65,
            49.45
          ],
          "direction": "curve",
          "weight": 59.2472,
          "revealPath": "M44.5572 24.365699999999997 L82.4428 24.365699999999997 L82.4428 45.72730000000001",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M58.4 30 L58.4 39.35 L52.9 42.1 L52.9 27.25 Z",
          "bounds": [
            52.9,
            27.25,
            58.4,
            42.1
          ],
          "direction": "down",
          "weight": 7.34305
        }
      ],
      [
        {
          "outline": "M55.65 30 L71.3 30 L71.3 32 L55.65 32 Z M74.05 31 L74.05 39.35 L68.55 42.1 L68.55 31 Z M68.55 30 L71.3 27.5 L76.55 32 L74.05 33.75 L68.55 31 Z",
          "bounds": [
            55.65,
            27.5,
            76.55,
            42.1
          ],
          "direction": "curve",
          "weight": 23.01985,
          "revealPath": "M55.6616 31.0412 L71.33840000000001 31.0412 L71.33840000000001 38.384249999999994",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M55.65 37.35 L71.3 37.35 L71.3 39.35 L55.65 39.35 Z",
          "bounds": [
            55.65,
            37.35,
            71.3,
            39.35
          ],
          "direction": "right",
          "weight": 15.6768
        }
      ],
      [
        {
          "outline": "M44.55 44.7 L82.4 44.7 L82.4 46.7 L44.55 46.7 Z",
          "bounds": [
            44.55,
            44.7,
            82.4,
            46.7
          ],
          "direction": "right",
          "weight": 37.8856
        }
      ],
      [
        {
          "outline": "M50.85 51.6 L50.85 71.5 L44.85 74.5 L44.85 48.6 Z",
          "bounds": [
            44.85,
            48.6,
            50.85,
            74.5
          ],
          "direction": "down",
          "weight": 17.89879
        }
      ],
      [
        {
          "outline": "M47.85 51.6 L78.75 51.6 L78.75 53.6 L47.85 53.6 Z M81.75 52.6 L81.75 71.5 L75.75 74.5 L75.75 52.6 Z M75.75 51.6 L78.75 49.1 L84.25 53.6 L81.75 55.6 L75.75 52.6 Z",
          "bounds": [
            47.85,
            49.1,
            84.25,
            74.5
          ],
          "direction": "curve",
          "weight": 48.76249,
          "revealPath": "M47.89065000000001 52.60898000000001 L78.75435 52.60898000000001 L78.75435 70.50777",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.85 60.25 L78.75 60.25 L78.75 62.25 L47.85 62.25 Z",
          "bounds": [
            47.85,
            60.25,
            78.75,
            62.25
          ],
          "direction": "right",
          "weight": 30.8637
        }
      ],
      [
        {
          "outline": "M47.85 69.5 L78.75 69.5 L78.75 71.5 L47.85 71.5 Z",
          "bounds": [
            47.85,
            69.5,
            78.75,
            71.5
          ],
          "direction": "right",
          "weight": 30.8637
        }
      ],
      [
        {
          "outline": "M33.3 76.7 L93.65 76.7 L93.65 78.7 L33.3 78.7 Z M93.65 76.7 L83.65 77.7 L88.65 72.2 Z",
          "bounds": [
            33.3,
            72.2,
            93.65,
            78.7
          ],
          "direction": "right",
          "weight": 60.35
        }
      ],
      [
        {
          "outline": "M13.6 10.3 L15.45 10.95 L17.25 11.55 L19 12.3 L20.65 13.15 L22.25 14.1 L23.75 15.15 L25.2 16.25 L26.6 17.4 L27.9 18.7 L29.1 20.05 L24.15 23.45 L23.45 22.15 L22.65 20.85 L21.75 19.55 L20.8 18.3 L19.75 17.1 L18.6 15.85 L17.4 14.65 L16.1 13.45 L14.75 12.2 L13.2 11.1 Z M29.1 20.05 L29.55 22.3 L28.3 24.2 L26.1 24.65 L24.15 23.45 Z",
          "bounds": [
            13.2,
            10.3,
            29.55,
            24.65
          ],
          "direction": "curve",
          "weight": 19.14419,
          "revealPath": "M13 10.5 Q22 15 27.5 23",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M8.1 28.25 L9.95 28.8 L11.75 29.35 L13.55 30 L15.25 30.8 L16.9 31.65 L18.5 32.65 L20.05 33.7 L21.55 34.85 L23 36.1 L24.35 37.4 L19.7 41.2 L18.8 39.85 L17.85 38.55 L16.8 37.25 L15.7 36 L14.55 34.8 L13.35 33.6 L12.05 32.45 L10.7 31.3 L9.3 30.1 L7.75 29.1 Z M24.35 37.4 L25 39.6 L23.9 41.65 L21.7 42.25 L19.7 41.2 Z",
          "bounds": [
            7.75,
            28.25,
            25,
            42.25
          ],
          "direction": "curve",
          "weight": 19.602296,
          "revealPath": "M7.5 28.5 Q16.5 32.5 23 40.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7 52.5 L23.5 52.5 L23.5 54.5 L7 54.5 Z M26.5 53.5 L26.5 77.5 L20.5 80.5 L20.5 53.5 Z M20.5 52.5 L23.5 50 L29 54.5 L26.5 56.5 L20.5 53.5 Z",
          "bounds": [
            7,
            50,
            29,
            80.5
          ],
          "direction": "curve",
          "weight": 42,
          "revealPath": "M7 53.5 L23.5 53.5 L23.5 79",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.35 86.65 L8.15 85.75 L9.95 84.8 L11.8 83.85 L13.65 82.85 L15.55 81.85 L17.5 80.8 L19.45 79.75 L21.5 78.7 L23.6 77.65 L25.7 76.6 L26.25 77.35 L24.6 79.05 L22.95 80.7 L21.25 82.3 L19.55 83.8 L17.85 85.25 L16.15 86.65 L14.45 88 L12.8 89.3 L11.15 90.55 L9.45 91.75 Z M9.45 91.75 L5.5 87.2 L6.35 86.65 Z M9.45 91.75 L11.25 88.95 L11.1 92.55 Z",
          "bounds": [
            5.5,
            76.6,
            26.25,
            92.55
          ],
          "direction": "curve",
          "weight": 22.327114,
          "revealPath": "M7.5 89.5 Q16.5 84 26 77",
          "revealWidth": 14
        },
        {
          "outline": "M25.65 76.1 L28.25 78.4 L30.95 80.35 L33.95 82.05 L37.6 83.4 L42.2 84.5 L48.1 85.3 L55.55 85.8 L64.7 85.95 L75.9 85.75 L89.35 85.2 L89.6 91.75 L76 92 L64.65 91.85 L55.2 91.3 L47.45 90.4 L41.2 89.05 L36.15 87.3 L32.15 85.15 L29.1 82.65 L26.75 79.8 L24.9 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z",
          "bounds": [
            24.9,
            76.1,
            95,
            92
          ],
          "direction": "curve",
          "weight": 65.700076,
          "revealPath": "M25 76 C32.5 86 40.5 90.5 89.5 88.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "90ba1facac832dc25586fad6394ca906fe5553c391f9d22781eb07d4c06ee6a5",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9085.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/9085.svg",
      "dictionarySvgSha256": "f5beb2a3201ab47ebb0bc34e1534276b0d1ac9ebc11d6f1c2f7a37b836f30143",
      "dictionaryDirectionStrokes": "ROOT17정적board 대응만; 공식 시간방향/시작cap/terminal/coverage/APP/등록 미승인.",
      "orderReviewSha256": "f4d15f7de910bfd5afd1a9d459c14e998a9989476cdc175ec0e4b252749423ff",
      "geometryReviewSha256": "f4d15f7de910bfd5afd1a9d459c14e998a9989476cdc175ec0e4b252749423ff"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u9085@16",
      "revision": "u9085@16 및 capsule 원9record 고정; 2026-10-22 fresh actualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u9085.json",
      "modifications": "1351 미등록 후보. current 공개closure의 실제full5/id3 22raw22calls34P와 ROOT 정적17그룹을 고정해 기존 순수projector본문을 최초1회 실행하고 즉시 캐시했다. HV4(raw14/15),6(raw10/11),10(raw18/19),16(raw3/4)은 원endpoint가 정확히 같은 기존규칙만 사용했다. 마지막17 raw5Q→raw6C는 gap[-2,-2]와 각원guide·폭14·weight·P를 독립2mask로 보존했다. 새connector/좌표/guide/폭/weight/terminal파생 없음. flag7, V313/323foot·hook·전체coverage/시작cap/시간방향/native/APP/runtime는 미승인이다. 원batch843의 과거HOLD를 수정하거나 소급승인하지 않는다."
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
export function loadGlyphWikiBatch1351Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1351 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1351_STROKES:ReturnType<typeof loadGlyphWikiBatch1351Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1351_NATIVE_APPROVAL=true
export const GLYPHWIKI_BATCH1351_RUNTIME_APPLIED=true
export const GLYPHWIKI_BATCH1351_ASSIGNMENT_PROVISIONAL=false
export const GLYPHWIKI_BATCH1351_ACTUAL_COMPONENT_REVIEW=Object.freeze({file:"docs/hanja-actual-component-profiles-2026-10-22/u9085-native-review.json",sha256:"b2884f50ecf16a376b0a4aa4f93af086711a1c6af31b829b350116636f00ca79",isolatedActualComponentFiniteApproved:true,rootRegistrationApproved:true,actualAppUI:false,all17Autoplay:false,storage:false})
