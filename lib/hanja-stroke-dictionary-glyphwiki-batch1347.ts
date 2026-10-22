import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1347 미등록 후보. 원정적대응/공식 일부 거시방향만 확인; source진행/APP/runtime 미승인. */
const EXPECTED = [
  {
    "glyph": "寘",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "f45823d8902022914c4137621aa49e7b1a6260f2d79a34090dcd4c6acb305c55",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      5,
      6,
      7,
      8,
      10,
      11,
      12,
      13,
      15,
      16
    ],
    "paths": [
      "M53 7.15 L53 19.15 L47 19.15 L47 6.15 Z M53 7.15 L54.5 8.15 L52 9.65 Z",
      "M15.45 13.05 L15.75 15.65 L16 18.05 L16.05 20.35 L15.9 22.55 L15.55 24.55 L14.95 26.5 L14.15 28.25 L13.1 29.9 L11.8 31.35 L10.25 32.6 L7.35 27.35 L8.3 26.9 L9.25 26.3 L10.15 25.5 L11.05 24.5 L11.85 23.2 L12.55 21.7 L13.2 19.9 L13.8 17.9 L14.3 15.6 L14.55 13.1 Z M10.25 32.6 L7.95 32.85 L6.15 31.45 L5.95 29.15 L7.35 27.35 Z",
      "M15 17.15 L88.5 17.15 L88.5 19.15 L15 19.15 Z M90.95 19.8 L90.1 20.7 L89.2 21.6 L88.2 22.55 L87.1 23.5 L85.95 24.55 L84.7 25.6 L83.35 26.7 L81.9 27.85 L80.3 28.95 L78.8 30.25 L78.15 29.65 L79.35 28.05 L80.35 26.4 L81.3 24.9 L82.2 23.45 L83 22.05 L83.75 20.8 L84.45 19.6 L85.05 18.45 L85.55 17.4 L86 16.45 Z M85.5 17.15 L88.5 14.65 L94 19.15 L91.5 20.65 L85.5 23.15 Z",
      "M75 29.5 L70.95 30.05 L66.65 30.55 L62.1 31.05 L57.35 31.5 L52.35 31.95 L47.15 32.3 L41.7 32.6 L36.05 32.85 L30.15 33 L24 33 L23.95 32.1 L30 31.1 L35.8 30.2 L41.4 29.35 L46.75 28.55 L51.85 27.7 L56.75 26.9 L61.4 26.1 L65.8 25.25 L70 24.45 L73.95 23.6 Z M73.45 23.65 L79.5 28.65 L75 29.5 Z M79.5 28.65 L79.7 30.15 L75.95 28.3 Z",
      "M27 24.1 L27 34.5 L21 34.5 L21 23.1 Z M27 24.1 L28.5 25.1 L26 26.6 Z M21 34.5 L27 34.5 L25.8 36.3 L24 37.5 L22.2 36.3 Z M27 34.5 L26.95 35.1 L26.95 35.6 L27 35.95 L27 36.2 L27.1 36.35 L27.2 36.55 L27.4 36.75 L27.75 36.95 L28.3 37.1 L29 37.25 L29 41.75 L27.75 41.75 L26.6 41.6 L25.45 41.3 L24.35 40.8 L23.35 40.1 L22.55 39.2 L21.85 38.1 L21.4 36.95 L21.1 35.75 L21 34.5 Z M29 37.25 L30.55 37.9 L31.25 39.5 L30.55 41.05 L29 41.75 Z M29 37.25 L85 37.25 L85 41.75 L29 41.75 Z M85 37.25 L86.35 38.15 L87.25 39.5 L86.35 40.85 L85 41.75 Z M85 37.25 L82.75 37.25 L85 30.75 L86 30.75 Z",
      "M36.8 47 L36.8 73.2 L30.8 76.2 L30.8 44 Z",
      "M33.8 47 L75.65 47 L75.65 49 L33.8 49 Z M78.65 48 L78.65 73.2 L72.65 76.2 L72.65 48 Z M72.65 47 L75.65 44.5 L81.15 49 L78.65 51 L72.65 48 Z",
      "M33.8 54.9 L75.65 54.9 L75.65 56.9 L33.8 56.9 Z",
      "M33.8 62.75 L75.65 62.75 L75.65 64.75 L33.8 64.75 Z",
      "M33.8 71.2 L75.65 71.2 L75.65 73.2 L33.8 73.2 Z",
      "M20 46.1 L20 83.5 L14 86.5 L14 45.1 Z M20 46.1 L21.5 47.1 L19 48.6 Z M17 78 L93.5 78 L93.5 80 L17 80 Z M93.5 78 L83.5 79 L88.5 73.5 Z",
      "M45.75 86 L42.75 87.15 L39.6 88.25 L36.35 89.25 L32.95 90.2 L29.45 91.05 L25.85 91.9 L22.1 92.6 L18.2 93.25 L14.2 93.75 L10.05 94.1 L9.9 93.25 L13.8 91.9 L17.6 90.65 L21.3 89.45 L24.85 88.25 L28.25 87 L31.55 85.75 L34.7 84.5 L37.7 83.2 L40.55 81.9 L43.3 80.55 Z M42.85 80.75 L47.65 85.15 L45.75 86 Z M47.65 85.15 L47.75 86.75 L44.6 85.45 Z",
      "M58.05 82.7 L61.7 82.7 L65.25 82.9 L68.6 83.25 L71.75 83.75 L74.75 84.35 L77.6 85 L80.25 85.8 L82.75 86.65 L85.1 87.65 L87.3 88.7 L84.1 93.8 L82.45 92.65 L80.5 91.55 L78.4 90.45 L76.1 89.4 L73.55 88.4 L70.85 87.45 L67.9 86.5 L64.75 85.55 L61.45 84.6 L57.9 83.6 Z M87.3 88.7 L88.6 90.6 L88.25 92.85 L86.4 94.15 L84.1 93.8 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M53 7.15 L53 19.15 L47 19.15 L47 6.15 Z M53 7.15 L54.5 8.15 L52 9.65 Z",
          "bounds": [
            47,
            6.15,
            54.5,
            19.15
          ],
          "direction": "down",
          "weight": 11.47
        }
      ],
      [
        {
          "outline": "M15.45 13.05 L15.75 15.65 L16 18.05 L16.05 20.35 L15.9 22.55 L15.55 24.55 L14.95 26.5 L14.15 28.25 L13.1 29.9 L11.8 31.35 L10.25 32.6 L7.35 27.35 L8.3 26.9 L9.25 26.3 L10.15 25.5 L11.05 24.5 L11.85 23.2 L12.55 21.7 L13.2 19.9 L13.8 17.9 L14.3 15.6 L14.55 13.1 Z M10.25 32.6 L7.95 32.85 L6.15 31.45 L5.95 29.15 L7.35 27.35 Z",
          "bounds": [
            5.95,
            13.05,
            16.05,
            32.85
          ],
          "direction": "curve",
          "weight": 19.620064,
          "revealPath": "M15 12.6 Q15.5 26.29 7.5 30.73",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M15 17.15 L88.5 17.15 L88.5 19.15 L15 19.15 Z M90.95 19.8 L90.1 20.7 L89.2 21.6 L88.2 22.55 L87.1 23.5 L85.95 24.55 L84.7 25.6 L83.35 26.7 L81.9 27.85 L80.3 28.95 L78.8 30.25 L78.15 29.65 L79.35 28.05 L80.35 26.4 L81.3 24.9 L82.2 23.45 L83 22.05 L83.75 20.8 L84.45 19.6 L85.05 18.45 L85.55 17.4 L86 16.45 Z M85.5 17.15 L88.5 14.65 L94 19.15 L91.5 20.65 L85.5 23.15 Z",
          "bounds": [
            15,
            14.65,
            94,
            30.25
          ],
          "direction": "curve",
          "weight": 88.997922,
          "revealPath": "M15 18.15 L88.5 18.15 Q85.5 22.59 78.5 29.99",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75 29.5 L70.95 30.05 L66.65 30.55 L62.1 31.05 L57.35 31.5 L52.35 31.95 L47.15 32.3 L41.7 32.6 L36.05 32.85 L30.15 33 L24 33 L23.95 32.1 L30 31.1 L35.8 30.2 L41.4 29.35 L46.75 28.55 L51.85 27.7 L56.75 26.9 L61.4 26.1 L65.8 25.25 L70 24.45 L73.95 23.6 Z M73.45 23.65 L79.5 28.65 L75 29.5 Z M79.5 28.65 L79.7 30.15 L75.95 28.3 Z",
          "bounds": [
            23.95,
            23.6,
            79.7,
            33
          ],
          "direction": "curve",
          "weight": 51.364994,
          "revealPath": "M75 26.465 Q55 30.1325 24 32.5775",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27 24.1 L27 34.5 L21 34.5 L21 23.1 Z M27 24.1 L28.5 25.1 L26 26.6 Z M21 34.5 L27 34.5 L25.8 36.3 L24 37.5 L22.2 36.3 Z M27 34.5 L26.95 35.1 L26.95 35.6 L27 35.95 L27 36.2 L27.1 36.35 L27.2 36.55 L27.4 36.75 L27.75 36.95 L28.3 37.1 L29 37.25 L29 41.75 L27.75 41.75 L26.6 41.6 L25.45 41.3 L24.35 40.8 L23.35 40.1 L22.55 39.2 L21.85 38.1 L21.4 36.95 L21.1 35.75 L21 34.5 Z M29 37.25 L30.55 37.9 L31.25 39.5 L30.55 41.05 L29 41.75 Z M29 37.25 L85 37.25 L85 41.75 L29 41.75 Z M85 37.25 L86.35 38.15 L87.25 39.5 L86.35 40.85 L85 41.75 Z",
          "bounds": [
            21,
            23.1,
            87.25,
            41.75
          ],
          "direction": "curve",
          "weight": 73.963568,
          "revealPath": "M24 23.6125 L24 34.504999999999995 Q24 39.504999999999995 29 39.504999999999995 L85 39.504999999999995",
          "revealWidth": 14
        },
        {
          "outline": "M85 37.25 L82.75 37.25 L85 30.75 L86 30.75 Z",
          "bounds": [
            82.75,
            30.75,
            86,
            37.25
          ],
          "direction": "up",
          "weight": 6.5
        }
      ],
      [
        {
          "outline": "M36.8 47 L36.8 73.2 L30.8 76.2 L30.8 44 Z",
          "bounds": [
            30.8,
            44,
            36.8,
            76.2
          ],
          "direction": "down",
          "weight": 24.18105
        }
      ],
      [
        {
          "outline": "M33.8 47 L75.65 47 L75.65 49 L33.8 49 Z M78.65 48 L78.65 73.2 L72.65 76.2 L72.65 48 Z M72.65 47 L75.65 44.5 L81.15 49 L78.65 51 L72.65 48 Z",
          "bounds": [
            33.8,
            44.5,
            81.15,
            76.2
          ],
          "direction": "curve",
          "weight": 66.03105,
          "revealPath": "M33.825 48.02174999999999 L75.675 48.02174999999999 L75.675 72.2028",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M33.8 54.9 L75.65 54.9 L75.65 56.9 L33.8 56.9 Z",
          "bounds": [
            33.8,
            54.9,
            75.65,
            56.9
          ],
          "direction": "right",
          "weight": 41.85
        }
      ],
      [
        {
          "outline": "M33.8 62.75 L75.65 62.75 L75.65 64.75 L33.8 64.75 Z",
          "bounds": [
            33.8,
            62.75,
            75.65,
            64.75
          ],
          "direction": "right",
          "weight": 41.85
        }
      ],
      [
        {
          "outline": "M33.8 71.2 L75.65 71.2 L75.65 73.2 L33.8 73.2 Z",
          "bounds": [
            33.8,
            71.2,
            75.65,
            73.2
          ],
          "direction": "right",
          "weight": 41.85
        }
      ],
      [
        {
          "outline": "M20 46.1 L20 83.5 L14 86.5 L14 45.1 Z M20 46.1 L21.5 47.1 L19 48.6 Z",
          "bounds": [
            14,
            45.1,
            21.5,
            86.5
          ],
          "direction": "down",
          "weight": 33.415
        },
        {
          "outline": "M17 78 L93.5 78 L93.5 80 L17 80 Z M93.5 78 L83.5 79 L88.5 73.5 Z",
          "bounds": [
            17,
            73.5,
            93.5,
            80
          ],
          "direction": "right",
          "weight": 76.5
        }
      ],
      [
        {
          "outline": "M45.75 86 L42.75 87.15 L39.6 88.25 L36.35 89.25 L32.95 90.2 L29.45 91.05 L25.85 91.9 L22.1 92.6 L18.2 93.25 L14.2 93.75 L10.05 94.1 L9.9 93.25 L13.8 91.9 L17.6 90.65 L21.3 89.45 L24.85 88.25 L28.25 87 L31.55 85.75 L34.7 84.5 L37.7 83.2 L40.55 81.9 L43.3 80.55 Z M42.85 80.75 L47.65 85.15 L45.75 86 Z M47.65 85.15 L47.75 86.75 L44.6 85.45 Z",
          "bounds": [
            9.9,
            80.55,
            47.75,
            94.1
          ],
          "direction": "curve",
          "weight": 36.568484,
          "revealPath": "M45 83.1075 Q30.5 89.6275 10 93.7025",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M58.05 82.7 L61.7 82.7 L65.25 82.9 L68.6 83.25 L71.75 83.75 L74.75 84.35 L77.6 85 L80.25 85.8 L82.75 86.65 L85.1 87.65 L87.3 88.7 L84.1 93.8 L82.45 92.65 L80.5 91.55 L78.4 90.45 L76.1 89.4 L73.55 88.4 L70.85 87.45 L67.9 86.5 L64.75 85.55 L61.45 84.6 L57.9 83.6 Z M87.3 88.7 L88.6 90.6 L88.25 92.85 L86.4 94.15 L84.1 93.8 Z",
          "bounds": [
            57.9,
            82.7,
            88.6,
            94.15
          ],
          "direction": "curve",
          "weight": 30.832146,
          "revealPath": "M57.5 83.1075 Q76.5 85.5525 87 92.0725",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "022b4d857548a5c9f8481a660301f73eb7cc9983fbef81c14149ef6646d329e0",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5b00/5bd8.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5b00/5bd8.svg",
      "dictionarySvgSha256": "c23d8f411e21820e65a38decdf06b9abce22a8e7cd4a4cc45708d9c80d0fa071",
      "dictionaryDirectionStrokes": "ROOT정적13그룹/공식CSS시계3·5·7·11거시방향만;source진행·시작·terminal·전체native·APP·등록false.",
      "orderReviewSha256": "43fe1b5a028a5c471211b9bf5d7400fc33969fa40366708b552efd8bbcea24b5",
      "geometryReviewSha256": "0fd6908e0a5b13cc749958579a41cd8c6d43b547cd22302586faeb72444c7ae9"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u5bd8@12",
      "revision": "u5bd8@12 및 캡슐에고정한6record revision;2026-10-22 freshactualfull5",
      "editableSource": "/hanja-strokes/glyphwiki/u5bd8.json",
      "modifications": "1347 미등록 보정후보13p15m34. 원13mask의 actual21화면 중5·11 fullround coverageFAIL은 별도기록에보존했다. cached 보정1회로5의원UPquad1개만 up6.5로분리하고 body7P/guide/width14/weight73.963568을유지했다.11은원raw13V113·raw14H100을 독립cardinal2mask로복원했으며원P/좌표/순서/원13정적그룹/전체34P union불변, 새connector0이다. 다른11pen은byte동일. 원pureprojector/engine/compiler/factory재실행0; 새native/APP/runtime미승인."
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
export function loadGlyphWikiBatch1347Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1347 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1347_STROKES:ReturnType<typeof loadGlyphWikiBatch1347Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1347_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1347_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL=true
