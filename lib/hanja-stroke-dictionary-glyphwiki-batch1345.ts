import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** Fixed1345 source; ROOT isolated component finite approval. Registration is owned by ROOT. */
const EXPECTED = [
  {
    "glyph": "銍",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "8cba140191310fb2d04a4b2ce7607d67f97f54b53ee5ce9d2df548e1b8029ad5",
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
      10,
      12,
      13,
      14,
      15
    ],
    "paths": [
      "M29.25 8.85 L27.75 13.05 L26.05 17.2 L24.2 21.2 L22.2 25.15 L20.05 28.95 L17.7 32.7 L15.25 36.3 L12.6 39.75 L9.75 43.1 L6.7 46.25 L6 45.7 L8.25 41.95 L10.4 38.25 L12.45 34.55 L14.45 30.8 L16.3 27 L18 23.1 L19.6 19.2 L21.05 15.25 L22.35 11.2 L23.55 7.05 Z M23.4 7.55 L23.8 6.3 L29.25 8.85 Z M29.25 8.85 L30.4 10.25 L27.6 10.95 Z",
      "M26.8 13.3 L28.85 14.15 L30.9 14.95 L32.75 15.85 L34.5 16.8 L36.15 17.85 L37.65 19 L39.05 20.2 L40.35 21.5 L41.5 22.85 L42.55 24.25 L37.2 27 L36.75 25.8 L36.15 24.6 L35.4 23.35 L34.55 22.05 L33.55 20.8 L32.4 19.5 L31.1 18.15 L29.65 16.8 L28.1 15.4 L26.35 14.1 Z M42.55 24.25 L42.7 26.55 L41.25 28.3 L39 28.45 L37.2 27 Z",
      "M16.65 34.5 L40.15 34.5 L40.15 36.5 L16.65 36.5 Z M40.15 34.5 L30.15 35.5 L35.15 30 Z",
      "M9.25 50.5 L42.65 50.5 L42.65 52.5 L9.25 52.5 Z M42.65 50.5 L30.65 51.5 L36.65 45.5 Z",
      "M29.15 34.5 L29.15 83 L23.15 83 L23.15 34.5 Z",
      "M10.7 60.05 L12.1 61.25 L13.55 62.45 L14.85 63.75 L16 65.15 L17 66.65 L17.95 68.2 L18.7 69.85 L19.4 71.6 L19.95 73.4 L20.35 75.25 L14.35 75.75 L14.4 74.2 L14.3 72.7 L14.15 71.25 L13.85 69.75 L13.5 68.25 L13.05 66.75 L12.45 65.25 L11.8 63.7 L11.05 62.15 L10.05 60.65 Z M20.35 75.25 L19.6 77.4 L17.6 78.45 L15.45 77.75 L14.35 75.75 Z",
      "M41.15 60.95 L40.4 62.45 L39.6 63.95 L38.75 65.45 L37.85 66.95 L36.95 68.4 L35.95 69.9 L34.9 71.35 L33.8 72.8 L32.6 74.2 L31.5 75.7 L30.7 75.25 L31.35 73.55 L31.85 71.8 L32.4 70.1 L32.9 68.4 L33.4 66.75 L33.9 65.15 L34.35 63.55 L34.75 62 L35.15 60.45 L35.5 58.95 Z M35.35 59.4 L35.8 58.2 L41.15 60.95 Z M41.15 60.95 L42.25 62.4 L39.4 63 Z",
      "M8.2 85.45 L11.5 84.8 L14.8 84.15 L18.1 83.4 L21.4 82.7 L24.7 81.9 L28.05 81.15 L31.4 80.3 L34.8 79.5 L38.2 78.75 L41.65 78.05 L41.95 78.9 L38.85 80.55 L35.65 82.05 L32.45 83.45 L29.2 84.75 L25.95 86 L22.7 87.15 L19.4 88.25 L16.15 89.3 L12.85 90.3 L9.6 91.3 Z M9.6 91.3 L7.2 85.65 L8.2 85.45 Z M9.6 91.3 L12.15 89.15 L10.9 92.5 Z",
      "M45.6 15.5 L92.65 15.5 L92.65 17.5 L45.6 17.5 Z M92.65 15.5 L80.65 16.5 L86.65 10.5 Z",
      "M67.4 18.9 L66.45 21.25 L65.35 23.7 L64.15 26.2 L62.85 28.75 L61.45 31.35 L59.95 34.05 L58.3 36.8 L56.5 39.55 L54.5 42.35 L52.35 45.2 L51.6 44.75 L52.85 41.45 L54.1 38.3 L55.35 35.3 L56.5 32.4 L57.6 29.55 L58.6 26.85 L59.55 24.25 L60.35 21.75 L61.1 19.35 L61.7 17 Z M61.55 17.5 L61.95 16.25 L67.4 18.9 Z M67.4 18.9 L68.55 20.3 L65.7 20.95 Z M45.5 43.45 L49 42.9 L52.6 42.35 L56.25 41.8 L60 41.2 L63.8 40.6 L67.7 40.05 L71.7 39.45 L75.75 38.9 L79.95 38.45 L84.2 38.05 L84.4 38.9 L80.35 40.3 L76.3 41.55 L72.35 42.7 L68.45 43.75 L64.65 44.8 L60.9 45.75 L57.25 46.7 L53.65 47.6 L50.1 48.5 L46.7 49.3 Z M46.7 49.3 L44.55 43.65 L45.5 43.45 Z M46.7 49.3 L49.35 47.25 L47.95 50.6 Z",
      "M75.7 25 L77.95 26.75 L80.1 28.55 L82 30.5 L83.75 32.5 L85.35 34.6 L86.85 36.75 L88.15 38.9 L89.3 41.15 L90.35 43.4 L91.2 45.75 L85.45 47.3 L84.95 45.25 L84.35 43.15 L83.6 41.05 L82.75 38.95 L81.75 36.8 L80.65 34.65 L79.4 32.5 L78.05 30.3 L76.55 28 L75.05 25.65 Z M91.2 45.75 L90.9 48 L89.1 49.4 L86.85 49.1 L85.45 47.3 Z",
      "M46.6 65.5 L89.2 65.5 L89.2 67.5 L46.6 67.5 Z M89.2 65.5 L77.2 66.5 L83.2 60.5 Z",
      "M69.7 50 L69.7 90.5 L63.7 90.5 L63.7 49 Z M69.7 50 L71.2 51 L68.7 52.5 Z",
      "M37.75 88.5 L94.1 88.5 L94.1 90.5 L37.75 90.5 Z M94.1 88.5 L82.1 89.5 L88.1 83.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M29.25 8.85 L27.75 13.05 L26.05 17.2 L24.2 21.2 L22.2 25.15 L20.05 28.95 L17.7 32.7 L15.25 36.3 L12.6 39.75 L9.75 43.1 L6.7 46.25 L6 45.7 L8.25 41.95 L10.4 38.25 L12.45 34.55 L14.45 30.8 L16.3 27 L18 23.1 L19.6 19.2 L21.05 15.25 L22.35 11.2 L23.55 7.05 Z M23.4 7.55 L23.8 6.3 L29.25 8.85 Z M29.25 8.85 L30.4 10.25 L27.6 10.95 Z",
          "bounds": [
            6,
            6.3,
            30.4,
            46.25
          ],
          "direction": "curve",
          "weight": 43.483274,
          "revealPath": "M26.575 7.5 Q19.975 29 6.3625 46",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M26.8 13.3 L28.85 14.15 L30.9 14.95 L32.75 15.85 L34.5 16.8 L36.15 17.85 L37.65 19 L39.05 20.2 L40.35 21.5 L41.5 22.85 L42.55 24.25 L37.2 27 L36.75 25.8 L36.15 24.6 L35.4 23.35 L34.55 22.05 L33.55 20.8 L32.4 19.5 L31.1 18.15 L29.65 16.8 L28.1 15.4 L26.35 14.1 Z M42.55 24.25 L42.7 26.55 L41.25 28.3 L39 28.45 L37.2 27 Z",
          "bounds": [
            26.35,
            13.3,
            42.7,
            28.45
          ],
          "direction": "curve",
          "weight": 19.765915,
          "revealPath": "M26.1625 13.5 Q36.475 19 40.6 27",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M16.65 34.5 L40.15 34.5 L40.15 36.5 L16.65 36.5 Z M40.15 34.5 L30.15 35.5 L35.15 30 Z",
          "bounds": [
            16.65,
            30,
            40.15,
            36.5
          ],
          "direction": "right",
          "weight": 23.5125
        }
      ],
      [
        {
          "outline": "M9.25 50.5 L42.65 50.5 L42.65 52.5 L9.25 52.5 Z M42.65 50.5 L30.65 51.5 L36.65 45.5 Z",
          "bounds": [
            9.25,
            45.5,
            42.65,
            52.5
          ],
          "direction": "right",
          "weight": 33.4125
        }
      ],
      [
        {
          "outline": "M29.15 34.5 L29.15 83 L23.15 83 L23.15 34.5 Z",
          "bounds": [
            23.15,
            34.5,
            29.15,
            83
          ],
          "direction": "down",
          "weight": 46.5
        }
      ],
      [
        {
          "outline": "M10.7 60.05 L12.1 61.25 L13.55 62.45 L14.85 63.75 L16 65.15 L17 66.65 L17.95 68.2 L18.7 69.85 L19.4 71.6 L19.95 73.4 L20.35 75.25 L14.35 75.75 L14.4 74.2 L14.3 72.7 L14.15 71.25 L13.85 69.75 L13.5 68.25 L13.05 66.75 L12.45 65.25 L11.8 63.7 L11.05 62.15 L10.05 60.65 Z M20.35 75.25 L19.6 77.4 L17.6 78.45 L15.45 77.75 L14.35 75.75 Z",
          "bounds": [
            10.05,
            60.05,
            20.35,
            78.45
          ],
          "direction": "curve",
          "weight": 18.550758,
          "revealPath": "M10.075 60 Q16.675 67 17.5 77",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M41.15 60.95 L40.4 62.45 L39.6 63.95 L38.75 65.45 L37.85 66.95 L36.95 68.4 L35.95 69.9 L34.9 71.35 L33.8 72.8 L32.6 74.2 L31.5 75.7 L30.7 75.25 L31.35 73.55 L31.85 71.8 L32.4 70.1 L32.9 68.4 L33.4 66.75 L33.9 65.15 L34.35 63.55 L34.75 62 L35.15 60.45 L35.5 58.95 Z M35.35 59.4 L35.8 58.2 L41.15 60.95 Z M41.15 60.95 L42.25 62.4 L39.4 63 Z",
          "bounds": [
            30.7,
            58.2,
            42.25,
            75.7
          ],
          "direction": "curve",
          "weight": 17.638895,
          "revealPath": "M38.5375 59.5 Q35.65 67.5 31.1125 75.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M8.2 85.45 L11.5 84.8 L14.8 84.15 L18.1 83.4 L21.4 82.7 L24.7 81.9 L28.05 81.15 L31.4 80.3 L34.8 79.5 L38.2 78.75 L41.65 78.05 L41.95 78.9 L38.85 80.55 L35.65 82.05 L32.45 83.45 L29.2 84.75 L25.95 86 L22.7 87.15 L19.4 88.25 L16.15 89.3 L12.85 90.3 L9.6 91.3 Z M9.6 91.3 L7.2 85.65 L8.2 85.45 Z M9.6 91.3 L12.15 89.15 L10.9 92.5 Z",
          "bounds": [
            7.2,
            78.05,
            41.95,
            92.5
          ],
          "direction": "curve",
          "weight": 34.876857,
          "revealPath": "M8.425 88.5 Q25.3375 84.5 41.8375 78.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.6 15.5 L92.65 15.5 L92.65 17.5 L45.6 17.5 Z M92.65 15.5 L80.65 16.5 L86.65 10.5 Z",
          "bounds": [
            45.6,
            10.5,
            92.65,
            17.5
          ],
          "direction": "right",
          "weight": 47.04
        }
      ],
      [
        {
          "outline": "M67.4 18.9 L66.45 21.25 L65.35 23.7 L64.15 26.2 L62.85 28.75 L61.45 31.35 L59.95 34.05 L58.3 36.8 L56.5 39.55 L54.5 42.35 L52.35 45.2 L51.6 44.75 L52.85 41.45 L54.1 38.3 L55.35 35.3 L56.5 32.4 L57.6 29.55 L58.6 26.85 L59.55 24.25 L60.35 21.75 L61.1 19.35 L61.7 17 Z M61.55 17.5 L61.95 16.25 L67.4 18.9 Z M67.4 18.9 L68.55 20.3 L65.7 20.95 Z",
          "bounds": [
            51.6,
            16.25,
            68.55,
            45.2
          ],
          "direction": "curve",
          "weight": 30.307715,
          "revealPath": "M64.74000000000001 17.5 Q60.82 29.5 52 45",
          "revealWidth": 14
        },
        {
          "outline": "M45.5 43.45 L49 42.9 L52.6 42.35 L56.25 41.8 L60 41.2 L63.8 40.6 L67.7 40.05 L71.7 39.45 L75.75 38.9 L79.95 38.45 L84.2 38.05 L84.4 38.9 L80.35 40.3 L76.3 41.55 L72.35 42.7 L68.45 43.75 L64.65 44.8 L60.9 45.75 L57.25 46.7 L53.65 47.6 L50.1 48.5 L46.7 49.3 Z M46.7 49.3 L44.55 43.65 L45.5 43.45 Z M46.7 49.3 L49.35 47.25 L47.95 50.6 Z",
          "bounds": [
            44.55,
            38.05,
            84.4,
            50.6
          ],
          "direction": "curve",
          "weight": 39.528017,
          "revealPath": "M45.63 46.5 Q63.27 43 84.34 38.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.7 25 L77.95 26.75 L80.1 28.55 L82 30.5 L83.75 32.5 L85.35 34.6 L86.85 36.75 L88.15 38.9 L89.3 41.15 L90.35 43.4 L91.2 45.75 L85.45 47.3 L84.95 45.25 L84.35 43.15 L83.6 41.05 L82.75 38.95 L81.75 36.8 L80.65 34.65 L79.4 32.5 L78.05 30.3 L76.55 28 L75.05 25.65 Z M91.2 45.75 L90.9 48 L89.1 49.4 L86.85 49.1 L85.45 47.3 Z",
          "bounds": [
            75.05,
            25,
            91.2,
            49.4
          ],
          "direction": "curve",
          "weight": 26.781307,
          "revealPath": "M75.03 25 Q85.32 35.5 88.75 48",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46.6 65.5 L89.2 65.5 L89.2 67.5 L46.6 67.5 Z M89.2 65.5 L77.2 66.5 L83.2 60.5 Z",
          "bounds": [
            46.6,
            60.5,
            89.2,
            67.5
          ],
          "direction": "right",
          "weight": 42.63
        }
      ],
      [
        {
          "outline": "M69.7 50 L69.7 90.5 L63.7 90.5 L63.7 49 Z M69.7 50 L71.2 51 L68.7 52.5 Z",
          "bounds": [
            63.7,
            49,
            71.2,
            90.5
          ],
          "direction": "down",
          "weight": 40
        }
      ],
      [
        {
          "outline": "M37.75 88.5 L94.1 88.5 L94.1 90.5 L37.75 90.5 Z M94.1 88.5 L82.1 89.5 L88.1 83.5 Z",
          "bounds": [
            37.75,
            83.5,
            94.1,
            90.5
          ],
          "direction": "right",
          "weight": 56.35
        }
      ]
    ],
    "pathsSha256": "ba2f8cddc3ade5b3becb33289fce2732069a065e6436e1553a84b021a0390376",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/928D.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9200/928D.svg",
      "dictionarySvgSha256": "a825b19bf56027716f27513367be4cf61a8dcbb258cbc8b746743f8ba022cc9e",
      "dictionaryDirectionStrokes": "전체14 정적대응29화면과 국내10 공식원미디어 유한방향8화면. 나머지 동적방향/제품APP/등록 승인false.",
      "orderReviewSha256": "9a72db130fa1c279a8fa3841256e777a158ae4c354b499f1cf5f8d2af741e686",
      "geometryReviewSha256": "023679bf9a2391f821a2e9d29d23103d472b5f2255523828fe8d7fd0e9925bb8",
      "directionReviewSha256": "46cf954f2e33dea2adf707dbc5fcc1a12f5b6b7f757663d65f3f1a511c23885e"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed actual full5/id3 u928d; unregistered1345 preparation.",
      "editableSource": "/hanja-strokes/glyphwiki/u928d.json",
      "modifications": "1345 미등록 준비: 원actualfull5 단일입력과 원34polygon·guide·폭·weight·bounds를 보존한14p15m34. 원raw10/11은 논리10의 독립2mask이며 새connector/outline변경0. mask-only 연결foot 삼각형은 별도정책후보이며 유한원미디어/실험관찰을 제품·전체필순·APP·런타임승인으로 상속하지 않는다."
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
export function loadGlyphWikiBatch1345Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1345 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1345_STROKES:ReturnType<typeof loadGlyphWikiBatch1345Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1345_NATIVE_APPROVAL=true
export const GLYPHWIKI_BATCH1345_RUNTIME_APPLIED=true
export const GLYPHWIKI_BATCH1345_ASSIGNMENT_PROVISIONAL=false
export const GLYPHWIKI_BATCH1345_ACTUAL_COMPONENT_REVIEW=Object.freeze({file:"docs/hanja-actual-component-profiles-2026-10-22/u928d-native-review.json",sha256:"87510ed0f06f3293f8c7eca5ee190d7f120434a5ff2e21c792ea2df872e1b36e",isolatedActualComponentFiniteApproved:true,actualAppUI:false,all14Autoplay:false})
