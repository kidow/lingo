import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1348 ROOT 격리actualcomponent 유한검토/등록승인. 원준비false이력은보존. */
const EXPECTED = [
  {
    "glyph": "禛",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "cdbb5fbf4acfe66d2b988cffbae0ee5a961a3bd2e035804e9e0440995740c755",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      11,
      12,
      13,
      14,
      16,
      17
    ],
    "paths": [
      "M10.2 15 L36.6 15 L36.6 17 L10.2 17 Z M36.6 15 L24.6 16 L30.6 10 Z",
      "M6.2 33 L41 33 L41 35 L6.2 35 Z M41 33 L29 34 L35 28 Z",
      "M25.1 33 L25.1 91.75 L20.1 94.25 L20.1 33 Z",
      "M15.35 44 L15.35 60 L9.85 60 L9.85 43 Z M15.35 44 L16.7 45 L14.35 46.5 Z M9.85 60 L15.35 60 L14.25 61.65 L12.6 62.75 L10.95 61.65 Z M15.35 60 L15.1 64.1 L14.75 67.95 L14.3 71.5 L13.65 74.75 L12.85 77.65 L11.95 80.3 L10.8 82.6 L9.55 84.6 L8.1 86.15 L6.45 87.3 L5.9 86.65 L6.7 85.1 L7.4 83.35 L8.05 81.45 L8.6 79.25 L9.1 76.8 L9.45 74 L9.7 70.95 L9.85 67.6 L9.9 63.95 L9.85 60 Z",
      "M36.15 44 L36.15 77.6 L30.65 80.35 L30.65 43 Z M36.15 44 L37.5 45 L35.15 46.5 Z",
      "M83 13.95 L80.4 14.7 L77.65 15.4 L74.8 16.05 L71.75 16.65 L68.6 17.2 L65.3 17.7 L61.8 18.15 L58.2 18.55 L54.45 18.8 L50.55 18.9 L50.4 18.05 L54.15 16.95 L57.75 15.9 L61.2 14.95 L64.5 14 L67.65 13.1 L70.6 12.15 L73.45 11.2 L76.1 10.25 L78.65 9.3 L81 8.3 Z M80.5 8.5 L85.75 13 L83 13.95 Z M85.75 13 L85.85 14.55 L82.5 13.1 Z",
      "M53.5 8 L53.5 22 L47.5 22 L47.5 7 Z M53.5 8 L55 9 L52.5 10.5 Z M47.5 22 L53.5 22 L52.3 23.8 L50.5 25 L48.7 23.8 Z M53.5 22 L53.45 22.6 L53.5 23.05 L53.55 23.4 L53.6 23.6 L53.65 23.8 L53.75 23.95 L53.95 24.1 L54.3 24.25 L54.8 24.4 L55.5 24.5 L55.5 29.5 L54.25 29.45 L53.05 29.3 L51.9 28.95 L50.8 28.4 L49.8 27.65 L48.95 26.75 L48.3 25.65 L47.85 24.5 L47.6 23.25 L47.5 22 Z M55.5 24.5 L57.25 25.25 L58 27 L57.25 28.75 L55.5 29.5 Z M55.5 24.5 L88.5 24.5 L88.5 29.5 L55.5 29.5 Z M88.5 24.5 L90 25.5 L91 27 L90 28.5 L88.5 29.5 Z M88.5 24.5 L86 24.5 L88.5 16 L89.5 16 Z",
      "M60.4 36.45 L60.4 68.1 L54.9 70.85 L54.9 33.7 Z",
      "M57.65 36.45 L83.8 36.45 L83.8 38.45 L57.65 38.45 Z M86.8 37.45 L86.8 68.1 L80.8 71.1 L80.8 37.45 Z M80.8 36.45 L83.8 33.95 L89.3 38.45 L86.8 40.45 L80.8 37.45 Z",
      "M57.65 46.1 L83.8 46.1 L83.8 48.1 L57.65 48.1 Z",
      "M57.65 55.8 L83.8 55.8 L83.8 57.8 L57.65 57.8 Z",
      "M57.65 66.1 L83.8 66.1 L83.8 68.1 L57.65 68.1 Z",
      "M48.75 35 L48.75 80 L43.25 82.75 L43.25 34 Z M48.75 35 L50.1 36 L47.75 37.5 Z M46 74.5 L94 74.5 L94 76.5 L46 76.5 Z M94 74.5 L82 75.5 L88 69.5 Z",
      "M61.45 83.15 L59.3 84.6 L57 86 L54.65 87.3 L52.15 88.55 L49.6 89.7 L46.9 90.75 L44.15 91.75 L41.25 92.6 L38.25 93.35 L35.1 93.9 L34.85 93.05 L37.6 91.55 L40.25 90.1 L42.85 88.75 L45.3 87.35 L47.65 85.9 L49.9 84.5 L52 83 L54.05 81.5 L55.95 80 L57.7 78.45 Z M57.3 78.75 L57.75 78.4 L61.45 83.15 Z M61.45 83.15 L61.6 84.95 L58.9 83.9 Z",
      "M69.55 80.15 L72.25 80.35 L74.8 80.7 L77.3 81.2 L79.7 81.85 L81.95 82.65 L84.15 83.55 L86.25 84.55 L88.25 85.65 L90.15 86.9 L91.95 88.25 L87.85 92.65 L86.55 91.3 L85.15 90 L83.6 88.7 L81.95 87.5 L80.15 86.35 L78.25 85.25 L76.25 84.15 L74.05 83.1 L71.8 82.05 L69.35 81 Z M91.95 88.25 L92.85 90.35 L92.05 92.5 L89.95 93.4 L87.85 92.65 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M10.2 15 L36.6 15 L36.6 17 L10.2 17 Z M36.6 15 L24.6 16 L30.6 10 Z",
          "bounds": [
            10.2,
            10,
            36.6,
            17
          ],
          "direction": "right",
          "weight": 26.4
        }
      ],
      [
        {
          "outline": "M6.2 33 L41 33 L41 35 L6.2 35 Z M41 33 L29 34 L35 28 Z",
          "bounds": [
            6.2,
            28,
            41,
            35
          ],
          "direction": "right",
          "weight": 34.8
        }
      ],
      [
        {
          "outline": "M25.1 33 L25.1 91.75 L20.1 94.25 L20.1 33 Z",
          "bounds": [
            20.1,
            33,
            25.1,
            94.25
          ],
          "direction": "down",
          "weight": 59
        }
      ],
      [
        {
          "outline": "M15.35 44 L15.35 60 L9.85 60 L9.85 43 Z M15.35 44 L16.7 45 L14.35 46.5 Z M9.85 60 L15.35 60 L14.25 61.65 L12.6 62.75 L10.95 61.65 Z M15.35 60 L15.1 64.1 L14.75 67.95 L14.3 71.5 L13.65 74.75 L12.85 77.65 L11.95 80.3 L10.8 82.6 L9.55 84.6 L8.1 86.15 L6.45 87.3 L5.9 86.65 L6.7 85.1 L7.4 83.35 L8.05 81.45 L8.6 79.25 L9.1 76.8 L9.45 74 L9.7 70.95 L9.85 67.6 L9.9 63.95 L9.85 60 Z",
          "bounds": [
            5.9,
            43,
            16.7,
            87.3
          ],
          "direction": "curve",
          "weight": 44.248153,
          "revealPath": "M12.6 43.5 L12.6 60 Q12.6 81 6.2 87",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M36.15 44 L36.15 77.6 L30.65 80.35 L30.65 43 Z M36.15 44 L37.5 45 L35.15 46.5 Z",
          "bounds": [
            30.65,
            43,
            37.5,
            80.35
          ],
          "direction": "down",
          "weight": 35.5
        }
      ],
      [
        {
          "outline": "M83 13.95 L80.4 14.7 L77.65 15.4 L74.8 16.05 L71.75 16.65 L68.6 17.2 L65.3 17.7 L61.8 18.15 L58.2 18.55 L54.45 18.8 L50.55 18.9 L50.4 18.05 L54.15 16.95 L57.75 15.9 L61.2 14.95 L64.5 14 L67.65 13.1 L70.6 12.15 L73.45 11.2 L76.1 10.25 L78.65 9.3 L81 8.3 Z M80.5 8.5 L85.75 13 L83 13.95 Z M85.75 13 L85.85 14.55 L82.5 13.1 Z",
          "bounds": [
            50.4,
            8.3,
            85.85,
            18.9
          ],
          "direction": "curve",
          "weight": 32.867157,
          "revealPath": "M82.5 11 Q70 15.5 50.5 18.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.5 8 L53.5 22 L47.5 22 L47.5 7 Z M53.5 8 L55 9 L52.5 10.5 Z M47.5 22 L53.5 22 L52.3 23.8 L50.5 25 L48.7 23.8 Z M53.5 22 L53.45 22.6 L53.5 23.05 L53.55 23.4 L53.6 23.6 L53.65 23.8 L53.75 23.95 L53.95 24.1 L54.3 24.25 L54.8 24.4 L55.5 24.5 L55.5 29.5 L54.25 29.45 L53.05 29.3 L51.9 28.95 L50.8 28.4 L49.8 27.65 L48.95 26.75 L48.3 25.65 L47.85 24.5 L47.6 23.25 L47.5 22 Z M55.5 24.5 L57.25 25.25 L58 27 L57.25 28.75 L55.5 29.5 Z M55.5 24.5 L88.5 24.5 L88.5 29.5 L55.5 29.5 Z M88.5 24.5 L90 25.5 L91 27 L90 28.5 L88.5 29.5 Z",
          "bounds": [
            47.5,
            7,
            91,
            29.5
          ],
          "direction": "curve",
          "weight": 54.571068,
          "revealPath": "M50.5 7.5 L50.5 22 Q50.5 27 55.5 27 L88.5 27",
          "revealWidth": 14
        },
        {
          "outline": "M88.5 24.5 L86 24.5 L88.5 16 L89.5 16 Z",
          "bounds": [
            86,
            16,
            89.5,
            24.5
          ],
          "direction": "up",
          "weight": 8.5
        }
      ],
      [
        {
          "outline": "M60.4 36.45 L60.4 68.1 L54.9 70.85 L54.9 33.7 Z",
          "bounds": [
            54.9,
            33.7,
            60.4,
            70.85
          ],
          "direction": "down",
          "weight": 29.67
        }
      ],
      [
        {
          "outline": "M57.65 36.45 L83.8 36.45 L83.8 38.45 L57.65 38.45 Z M86.8 37.45 L86.8 68.1 L80.8 71.1 L80.8 37.45 Z M80.8 36.45 L83.8 33.95 L89.3 38.45 L86.8 40.45 L80.8 37.45 Z",
          "bounds": [
            57.65,
            33.95,
            89.3,
            71.1
          ],
          "direction": "curve",
          "weight": 55.86,
          "revealPath": "M57.655 37.45 L83.845 37.45 L83.845 67.12",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.65 46.1 L83.8 46.1 L83.8 48.1 L57.65 48.1 Z",
          "bounds": [
            57.65,
            46.1,
            83.8,
            48.1
          ],
          "direction": "right",
          "weight": 26.19
        }
      ],
      [
        {
          "outline": "M57.65 55.8 L83.8 55.8 L83.8 57.8 L57.65 57.8 Z",
          "bounds": [
            57.65,
            55.8,
            83.8,
            57.8
          ],
          "direction": "right",
          "weight": 26.19
        }
      ],
      [
        {
          "outline": "M57.65 66.1 L83.8 66.1 L83.8 68.1 L57.65 68.1 Z",
          "bounds": [
            57.65,
            66.1,
            83.8,
            68.1
          ],
          "direction": "right",
          "weight": 26.19
        }
      ],
      [
        {
          "outline": "M48.75 35 L48.75 80 L43.25 82.75 L43.25 34 Z M48.75 35 L50.1 36 L47.75 37.5 Z",
          "bounds": [
            43.25,
            34,
            50.1,
            82.75
          ],
          "direction": "down",
          "weight": 41
        },
        {
          "outline": "M46 74.5 L94 74.5 L94 76.5 L46 76.5 Z M94 74.5 L82 75.5 L88 69.5 Z",
          "bounds": [
            46,
            69.5,
            94,
            76.5
          ],
          "direction": "right",
          "weight": 48
        }
      ],
      [
        {
          "outline": "M61.45 83.15 L59.3 84.6 L57 86 L54.65 87.3 L52.15 88.55 L49.6 89.7 L46.9 90.75 L44.15 91.75 L41.25 92.6 L38.25 93.35 L35.1 93.9 L34.85 93.05 L37.6 91.55 L40.25 90.1 L42.85 88.75 L45.3 87.35 L47.65 85.9 L49.9 84.5 L52 83 L54.05 81.5 L55.95 80 L57.7 78.45 Z M57.3 78.75 L57.75 78.4 L61.45 83.15 Z M61.45 83.15 L61.6 84.95 L58.9 83.9 Z",
          "bounds": [
            34.85,
            78.4,
            61.6,
            93.9
          ],
          "direction": "curve",
          "weight": 28.178006,
          "revealPath": "M60 80.5 Q50 88.5 35 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M69.55 80.15 L72.25 80.35 L74.8 80.7 L77.3 81.2 L79.7 81.85 L81.95 82.65 L84.15 83.55 L86.25 84.55 L88.25 85.65 L90.15 86.9 L91.95 88.25 L87.85 92.65 L86.55 91.3 L85.15 90 L83.6 88.7 L81.95 87.5 L80.15 86.35 L78.25 85.25 L76.25 84.15 L74.05 83.1 L71.8 82.05 L69.35 81 Z M91.95 88.25 L92.85 90.35 L92.05 92.5 L89.95 93.4 L87.85 92.65 Z",
          "bounds": [
            69.35,
            80.15,
            92.85,
            93.4
          ],
          "direction": "curve",
          "weight": 24.596748,
          "revealPath": "M69 80.5 Q82.5 83.5 91 91.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "a1d7b3cc88d17de689a99c20542e01cb5990a0e7dcf065a97ea1e226d8b25f4f",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/799b.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/799b.svg",
      "dictionarySvgSha256": "fc271c0404db71f52c2790c271d4aee2ef71196a2019a84475922889661272f7",
      "dictionaryDirectionStrokes": "ROOT정적15그룹만;공식방향·시간·source진행·시작·terminal·전체native·APP·등록false.",
      "orderReviewSha256": "a9fabf5667ea22094b373a2cadcda67c05f0a15a9ac2dc186b5796d7a24577e4",
      "geometryReviewSha256": "a9fabf5667ea22094b373a2cadcda67c05f0a15a9ac2dc186b5796d7a24577e4"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u799b@13",
      "revision": "u799b@13 및캡슐에고정한5record revision;2026-10-22 freshactualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u799b.json",
      "modifications": "1348 미등록 후보 준비. 고정current public closure의actualfull5/id3 17raw20calls38P와ROOT정적15그룹을기존8067pureprojector성공1회로보존했다. raw9/10(HV),14/15(VH)는원endpoint가정확같은기존연속규칙만사용했다. 새connector·guide·좌표·폭·weight·tail생성0. 공식시간방향/시작cap·foot·terminal·coverage·전체native/APP/runtime미승인. 원38P/필순/좌표를그대로유지한cached파생1회로7UP의원마지막quad(width5/jump17)를body뒤mask로분리했다. body의guide·폭14·weight54.571068은그대로이며tailweight8.5를내부mask배분에추가했다(획당고정재생시간증가아님). 13VH의원V1000/113와H2/0을각cardinalmask(weight41/48)로복원해기존foot전부를유지했다. 다른13획은deep불변. 최초15mask캐시는baselineStrokes와해시로보존. 이번17mask의sourcefinite/native/APP/runtime는미승인이다."
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
export function loadGlyphWikiBatch1348Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1348 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1348_STROKES:ReturnType<typeof loadGlyphWikiBatch1348Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1348_NATIVE_APPROVAL=true
export const GLYPHWIKI_BATCH1348_RUNTIME_APPLIED=true
export const GLYPHWIKI_BATCH1348_ASSIGNMENT_PROVISIONAL=false
export const GLYPHWIKI_BATCH1348_ACTUAL_COMPONENT_REVIEW=Object.freeze({file:"docs/hanja-actual-component-profiles-2026-10-22/u799b-native-review.json",sha256:"efa149f6df511726ed9038322d4b33b52bbb83ebb7230841da8d179fc7f14719",isolatedActualComponentFiniteApproved:true,rootRegistrationApproved:true,actualAppUI:false,all15Autoplay:false,storage:false})
