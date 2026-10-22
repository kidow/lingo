import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1346 미등록 후보. 정적대응만 확인됐으며 native/APP/runtime 미승인. */
const EXPECTED = [
  {
    "glyph": "蒲",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "d68ccc524850ad24229d3f2ab9b000a9aedc7999ed4c9a528a7cd20871daffe7",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      3,
      5,
      6,
      7,
      9,
      11,
      12,
      14,
      15,
      10,
      16
    ],
    "paths": [
      "M6.05 14.4 L46.95 14.4 L46.95 16.4 L6.05 16.4 Z M46.95 14.4 L34.95 15.4 L40.95 9.4 Z",
      "M34.8 5.95 L34.8 23.45 L28.8 26.45 L28.8 4.95 Z M34.8 5.95 L36.3 6.95 L33.8 8.45 Z",
      "M53 14.4 L93.9 14.4 L93.9 16.4 L53 16.4 Z M93.9 14.4 L81.9 15.4 L87.9 9.4 Z",
      "M71.15 5.95 L71.15 23.45 L65.15 26.45 L65.15 4.95 Z M71.15 5.95 L72.65 6.95 L70.15 8.45 Z",
      "M14.2 31.95 L16.15 32.3 L18.05 32.45 L19.8 32.75 L21.5 33.1 L23.05 33.5 L24.55 34 L25.95 34.6 L27.25 35.25 L28.45 36 L29.55 36.85 L25.05 40.8 L24.6 40.1 L24.05 39.3 L23.35 38.55 L22.45 37.75 L21.4 36.9 L20.25 36.1 L18.9 35.25 L17.4 34.4 L15.8 33.5 L14 32.85 Z M29.55 36.85 L30.25 39 L29.25 41.05 L27.1 41.8 L25.05 40.8 Z",
      "M6.45 48.75 L8.55 49.05 L10.55 49.2 L12.45 49.5 L14.2 49.85 L15.85 50.25 L17.35 50.75 L18.75 51.35 L20.05 52 L21.25 52.8 L22.35 53.7 L17.65 57.45 L17.35 56.8 L16.85 56.1 L16.15 55.3 L15.3 54.55 L14.2 53.7 L12.95 52.9 L11.55 52.05 L9.95 51.2 L8.2 50.3 L6.25 49.6 Z M22.35 53.7 L22.95 55.9 L21.9 57.9 L19.65 58.5 L17.65 57.45 Z",
      "M7.25 73.2 L10.05 73.6 L12.6 74.25 L14.95 75.25 L17 76.6 L18.75 78.3 L20.25 80.3 L21.35 82.6 L22.05 85.2 L22.45 87.95 L22.45 90.95 L16.5 90.35 L16.8 88 L16.85 85.9 L16.65 84 L16.2 82.25 L15.5 80.65 L14.5 79.15 L13.2 77.75 L11.55 76.4 L9.5 75.15 L7.05 74.05 Z M22.45 90.95 L21.35 92.95 L19.15 93.65 L17.15 92.5 L16.5 90.35 Z M14.45 78.7 L15.2 77.4 L16.2 75.85 L17.45 73.9 L19.05 71.6 L20.95 68.85 L23.2 65.7 L25.75 62.15 L28.65 58.2 L31.95 53.9 L35.65 49.2 L36.4 49.7 L33.55 54.9 L30.9 59.65 L28.55 63.95 L26.4 67.75 L24.6 71.1 L23.05 73.95 L21.8 76.4 L20.9 78.4 L20.3 79.9 L20.1 80.75 Z",
      "M35.5 40.75 L93.75 40.75 L93.75 42.75 L35.5 42.75 Z M93.75 40.75 L81.75 41.75 L87.75 35.75 Z",
      "M45.8 51 L45.8 91.35 L39.8 94.35 L39.8 48 Z",
      "M42.8 51 L84.4 51 L84.4 53 L42.8 53 Z M87.4 52 L87.4 86.4 L81.4 86.4 L81.4 52 Z M81.4 51 L84.4 48.5 L89.9 53 L87.4 55 L81.4 52 Z M81.4 86.4 L87.4 86.4 L86.2 88.2 L84.4 89.4 L82.6 88.2 Z M87.4 86.4 L87.3 87.7 L87.1 88.95 L86.7 90.15 L86.05 91.25 L85.25 92.3 L84.25 93.1 L83.1 93.7 L81.9 94.1 L80.65 94.35 L79.4 94.4 L79.4 88.4 L80 88.35 L80.45 88.3 L80.75 88.2 L80.9 88.1 L81 88.05 L81.1 87.95 L81.15 87.75 L81.25 87.5 L81.35 87 L81.4 86.4 Z M79.4 91.4 L74.4 89.9 L74.4 88.4 L79.4 88.4 Z",
      "M42.8 61.55 L84.4 61.55 L84.4 63.55 L42.8 63.55 Z",
      "M42.8 72.15 L84.4 72.15 L84.4 74.15 L42.8 74.15 Z",
      "M66.6 30.6 L66.6 90.65 L60.6 93.65 L60.6 29.6 Z M66.6 30.6 L68.1 31.6 L65.6 33.1 Z",
      "M70.9 30.45 L72.3 30.65 L73.7 30.65 L75.1 30.75 L76.45 31 L77.75 31.3 L79.05 31.7 L80.3 32.2 L81.55 32.75 L82.7 33.45 L83.85 34.2 L79.65 38.45 L79.05 37.65 L78.45 36.85 L77.75 36.1 L76.95 35.35 L76.15 34.6 L75.2 33.9 L74.2 33.2 L73.15 32.5 L72 31.8 L70.75 31.35 Z M83.85 34.2 L84.7 36.3 L83.9 38.45 L81.75 39.3 L79.65 38.45 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.05 14.4 L46.95 14.4 L46.95 16.4 L6.05 16.4 Z M46.95 14.4 L34.95 15.4 L40.95 9.4 Z",
          "bounds": [
            6.05,
            9.4,
            46.95,
            16.4
          ],
          "direction": "right",
          "weight": 40.905
        }
      ],
      [
        {
          "outline": "M34.8 5.95 L34.8 23.45 L28.8 26.45 L28.8 4.95 Z M34.8 5.95 L36.3 6.95 L33.8 8.45 Z",
          "bounds": [
            28.8,
            4.95,
            36.3,
            26.45
          ],
          "direction": "down",
          "weight": 19.5075
        }
      ],
      [
        {
          "outline": "M53 14.4 L93.9 14.4 L93.9 16.4 L53 16.4 Z M93.9 14.4 L81.9 15.4 L87.9 9.4 Z",
          "bounds": [
            53,
            9.4,
            93.9,
            16.4
          ],
          "direction": "right",
          "weight": 40.905
        }
      ],
      [
        {
          "outline": "M71.15 5.95 L71.15 23.45 L65.15 26.45 L65.15 4.95 Z M71.15 5.95 L72.65 6.95 L70.15 8.45 Z",
          "bounds": [
            65.15,
            4.95,
            72.65,
            26.45
          ],
          "direction": "down",
          "weight": 19.5075
        }
      ],
      [
        {
          "outline": "M14.2 31.95 L16.15 32.3 L18.05 32.45 L19.8 32.75 L21.5 33.1 L23.05 33.5 L24.55 34 L25.95 34.6 L27.25 35.25 L28.45 36 L29.55 36.85 L25.05 40.8 L24.6 40.1 L24.05 39.3 L23.35 38.55 L22.45 37.75 L21.4 36.9 L20.25 36.1 L18.9 35.25 L17.4 34.4 L15.8 33.5 L14 32.85 Z M29.55 36.85 L30.25 39 L29.25 41.05 L27.1 41.8 L25.05 40.8 Z",
          "bounds": [
            14,
            31.95,
            30.25,
            41.8
          ],
          "direction": "curve",
          "weight": 16.551771,
          "revealPath": "M13.6325 32.3 Q23.82 34.855000000000004 28.3025 39.965",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.45 48.75 L8.55 49.05 L10.55 49.2 L12.45 49.5 L14.2 49.85 L15.85 50.25 L17.35 50.75 L18.75 51.35 L20.05 52 L21.25 52.8 L22.35 53.7 L17.65 57.45 L17.35 56.8 L16.85 56.1 L16.15 55.3 L15.3 54.55 L14.2 53.7 L12.95 52.9 L11.55 52.05 L9.95 51.2 L8.2 50.3 L6.25 49.6 Z M22.35 53.7 L22.95 55.9 L21.9 57.9 L19.65 58.5 L17.65 57.45 Z",
          "bounds": [
            6.25,
            48.75,
            22.95,
            58.5
          ],
          "direction": "curve",
          "weight": 16.913995,
          "revealPath": "M5.89 49.09 Q16.8925 51.645 20.9675 56.755",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.25 73.2 L10.05 73.6 L12.6 74.25 L14.95 75.25 L17 76.6 L18.75 78.3 L20.25 80.3 L21.35 82.6 L22.05 85.2 L22.45 87.95 L22.45 90.95 L16.5 90.35 L16.8 88 L16.85 85.9 L16.65 84 L16.2 82.25 L15.5 80.65 L14.5 79.15 L13.2 77.75 L11.55 76.4 L9.5 75.15 L7.05 74.05 Z M22.45 90.95 L21.35 92.95 L19.15 93.65 L17.15 92.5 L16.5 90.35 Z",
          "bounds": [
            7.05,
            73.2,
            22.45,
            93.65
          ],
          "direction": "curve",
          "weight": 22.496628,
          "revealPath": "M6.705 73.545 Q20.9675 76.83 19.3375 92.16",
          "revealWidth": 14
        },
        {
          "outline": "M14.45 78.7 L15.2 77.4 L16.2 75.85 L17.45 73.9 L19.05 71.6 L20.95 68.85 L23.2 65.7 L25.75 62.15 L28.65 58.2 L31.95 53.9 L35.65 49.2 L36.4 49.7 L33.55 54.9 L30.9 59.65 L28.55 63.95 L26.4 67.75 L24.6 71.1 L23.05 73.95 L21.8 76.4 L20.9 78.4 L20.3 79.9 L20.1 80.75 Z",
          "bounds": [
            14.45,
            49.2,
            36.4,
            80.75
          ],
          "direction": "curve",
          "weight": 35.625301,
          "revealPath": "M17.3 79.75 Q18.93 75.37 36.045 49.455",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M35.5 40.75 L93.75 40.75 L93.75 42.75 L35.5 42.75 Z M93.75 40.75 L81.75 41.75 L87.75 35.75 Z",
          "bounds": [
            35.5,
            35.75,
            93.75,
            42.75
          ],
          "direction": "right",
          "weight": 58.24
        }
      ],
      [
        {
          "outline": "M45.8 51 L45.8 91.35 L39.8 94.35 L39.8 48 Z",
          "bounds": [
            39.8,
            48,
            45.8,
            94.35
          ],
          "direction": "down",
          "weight": 40.88
        }
      ],
      [
        {
          "outline": "M42.8 51 L84.4 51 L84.4 53 L42.8 53 Z M87.4 52 L87.4 86.4 L81.4 86.4 L81.4 52 Z M81.4 51 L84.4 48.5 L89.9 53 L87.4 55 L81.4 52 Z M81.4 86.4 L87.4 86.4 L86.2 88.2 L84.4 89.4 L82.6 88.2 Z M87.4 86.4 L87.3 87.7 L87.1 88.95 L86.7 90.15 L86.05 91.25 L85.25 92.3 L84.25 93.1 L83.1 93.7 L81.9 94.1 L80.65 94.35 L79.4 94.4 L79.4 88.4 L80 88.35 L80.45 88.3 L80.75 88.2 L80.9 88.1 L81 88.05 L81.1 87.95 L81.15 87.75 L81.25 87.5 L81.35 87 L81.4 86.4 Z M79.4 91.4 L74.4 89.9 L74.4 88.4 L79.4 88.4 Z",
          "bounds": [
            42.8,
            48.5,
            89.9,
            94.4
          ],
          "direction": "curve",
          "weight": 83.091068,
          "revealPath": "M42.8 52.01000000000001 L84.4 52.01000000000001 L84.4 86.43 Q84.4 91.43 79.4 91.43",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M42.8 61.55 L84.4 61.55 L84.4 63.55 L42.8 63.55 Z",
          "bounds": [
            42.8,
            61.55,
            84.4,
            63.55
          ],
          "direction": "right",
          "weight": 41.6
        }
      ],
      [
        {
          "outline": "M42.8 72.15 L84.4 72.15 L84.4 74.15 L42.8 74.15 Z",
          "bounds": [
            42.8,
            72.15,
            84.4,
            74.15
          ],
          "direction": "right",
          "weight": 41.6
        }
      ],
      [
        {
          "outline": "M66.6 30.6 L66.6 90.65 L60.6 93.65 L60.6 29.6 Z M66.6 30.6 L68.1 31.6 L65.6 33.1 Z",
          "bounds": [
            60.6,
            29.6,
            68.1,
            93.65
          ],
          "direction": "down",
          "weight": 62.05
        }
      ],
      [
        {
          "outline": "M70.9 30.45 L72.3 30.65 L73.7 30.65 L75.1 30.75 L76.45 31 L77.75 31.3 L79.05 31.7 L80.3 32.2 L81.55 32.75 L82.7 33.45 L83.85 34.2 L79.65 38.45 L79.05 37.65 L78.45 36.85 L77.75 36.1 L76.95 35.35 L76.15 34.6 L75.2 33.9 L74.2 33.2 L73.15 32.5 L72 31.8 L70.75 31.35 Z M83.85 34.2 L84.7 36.3 L83.9 38.45 L81.75 39.3 L79.65 38.45 Z",
          "bounds": [
            70.75,
            30.45,
            84.7,
            39.3
          ],
          "direction": "curve",
          "weight": 14.103734,
          "revealPath": "M70.36 30.84 Q77.64 32.3 82.84 37.41",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "9c0f6d418e1a849e8e028f17bce96666f01a9f3294cc255c0cfcb90c324c43d1",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/84B2.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8400/84B2.svg",
      "dictionarySvgSha256": "641feb2c3bf4631af11d5f716983aa2911b4979316999852064d1983efc28ef7",
      "dictionaryDirectionStrokes": "ROOT14정적group/草3·4및중앙V번호대응만;공식방향·시간·水QQ연결성·전체native/APP/등록false.",
      "orderReviewSha256": "9ead216ad22e61b204e69de5934593dcf224f79f8929149e133be59ee10bcbbb",
      "geometryReviewSha256": "9ead216ad22e61b204e69de5934593dcf224f79f8929149e133be59ee10bcbbb"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "원b985 K actualfull5 고정;미등록1346 정적후보",
      "editableSource": "/hanja-strokes/glyphwiki/u84b2-k.json",
      "modifications": "1346 미등록 후보 준비. 원K actual full5/id3의16raw17calls30P와 ROOT정적14그룹만으로 기존8067byte순수projector를성공1회실행했다. 水7은원QQ2독립mask/gap[-4.075,-24.82] 그대로이며새connector·좌표·폭·tail/foot분할0. 정확raw12/13만원trajectory접합,草3/4및甫raw10→dom13순서는정적관찰근거. 방향/시간/시작/연결성/completion/coverage/APP/runtime미승인."
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
export function loadGlyphWikiBatch1346Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1346 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1346_STROKES:ReturnType<typeof loadGlyphWikiBatch1346Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1346_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1346_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1346_ASSIGNMENT_PROVISIONAL=true
