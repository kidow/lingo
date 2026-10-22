import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** 1357 미등록 迪 후보. 원176/HOLD는 보존; 새native/APP/runtime 미승인. */
const EXPECTED = [
  {
    "glyph": "迪",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-22",
    "geometrySource": "21959f4bf65678002d7cd52a4e11e5a2d33322ee36083cc64c150d54fdc4b1ad",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      7,
      8,
      10,
      11,
      12,
      1,
      2,
      3,
      5
    ],
    "paths": [
      "M43.9 27.05 L43.9 76.7 L37.9 79.7 L37.9 24.05 Z",
      "M40.9 27.05 L86.55 27.05 L86.55 29.05 L40.9 29.05 Z M89.55 28.05 L89.55 76.2 L83.55 76.2 L83.55 28.05 Z M83.55 27.05 L86.55 24.55 L92.05 29.05 L89.55 31.05 L83.55 28.05 Z M89.55 76.2 L83.55 79.2 L83.55 76.2 Z",
      "M40.9 48.1 L86.55 48.1 L86.55 50.1 L40.9 50.1 Z",
      "M66.75 9.15 L66.75 73.2 L60.75 73.2 L60.75 8.15 Z M66.75 9.15 L68.25 10.15 L65.75 11.65 Z",
      "M40.9 71.2 L86.55 71.2 L86.55 73.2 L40.9 73.2 Z",
      "M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z",
      "M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z",
      "M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z",
      "M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M43.9 27.05 L43.9 76.7 L37.9 79.7 L37.9 24.05 Z",
          "bounds": [
            37.9,
            24.05,
            43.9,
            79.7
          ],
          "direction": "down",
          "weight": 44.1375
        }
      ],
      [
        {
          "outline": "M40.9 27.05 L86.55 27.05 L86.55 29.05 L40.9 29.05 Z M89.55 28.05 L89.55 76.2 L83.55 76.2 L83.55 28.05 Z M83.55 27.05 L86.55 24.55 L92.05 29.05 L89.55 31.05 L83.55 28.05 Z",
          "bounds": [
            40.9,
            24.55,
            92.05,
            76.2
          ],
          "direction": "curve",
          "weight": 89.7625,
          "revealPath": "M40.9375 28.075 L86.5625 28.075 L86.5625 72.2125",
          "revealWidth": 14
        },
        {
          "outline": "M89.55 76.2 L83.55 79.2 L83.55 76.2 Z",
          "bounds": [
            83.55,
            76.2,
            89.55,
            79.2
          ],
          "direction": "down",
          "weight": 3
        }
      ],
      [
        {
          "outline": "M40.9 48.1 L86.55 48.1 L86.55 50.1 L40.9 50.1 Z",
          "bounds": [
            40.9,
            48.1,
            86.55,
            50.1
          ],
          "direction": "right",
          "weight": 45.625
        }
      ],
      [
        {
          "outline": "M66.75 9.15 L66.75 73.2 L60.75 73.2 L60.75 8.15 Z M66.75 9.15 L68.25 10.15 L65.75 11.65 Z",
          "bounds": [
            60.75,
            8.15,
            68.25,
            73.2
          ],
          "direction": "down",
          "weight": 63.525
        }
      ],
      [
        {
          "outline": "M40.9 71.2 L86.55 71.2 L86.55 73.2 L40.9 73.2 Z",
          "bounds": [
            40.9,
            71.2,
            86.55,
            73.2
          ],
          "direction": "right",
          "weight": 45.625
        }
      ],
      [
        {
          "outline": "M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z",
          "bounds": [
            13.75,
            10.3,
            31,
            24.7
          ],
          "direction": "curve",
          "weight": 19.912308,
          "revealPath": "M13.5 10.5 Q23 15 29 23",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z",
          "bounds": [
            8.25,
            28.25,
            26.45,
            42.3
          ],
          "direction": "curve",
          "weight": 20.402206,
          "revealPath": "M8 28.5 Q17.5 32.5 24.5 40.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z",
          "bounds": [
            7,
            50,
            30.5,
            80.5
          ],
          "direction": "curve",
          "weight": 43.5,
          "revealPath": "M7 53.5 L25 53.5 L25 79",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z",
          "bounds": [
            6.05,
            76.6,
            27.75,
            92.6
          ],
          "direction": "curve",
          "weight": 23.16247,
          "revealPath": "M8 89.5 Q17.5 84 27.5 77",
          "revealWidth": 14
        },
        {
          "outline": "M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z",
          "bounds": [
            26.4,
            76.1,
            95,
            92
          ],
          "direction": "curve",
          "weight": 64.228109,
          "revealPath": "M26.5 76 C34 86 42 90.5 89.5 88.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "13ffbb202e80adb94b83a5409c039df3f519cba2c19fd77d2e9fd5082481b417",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FEA.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8F00/8FEA.svg",
      "dictionarySvgSha256": "b9e25008c4d6606baaa1fed851128b32131273ae0b9edffcc19fda9aacc91771",
      "dictionaryDirectionStrokes": "ROOT新9board 정적대응만;새source 공식시간/방향·시작cap·terminal·coverage·APP/등록 미승인.",
      "orderReviewSha256": "40891d072ac1449e7791c66719a978d91c334e73950b2ae90050c8b667b54fd7",
      "geometryReviewSha256": "40891d072ac1449e7791c66719a978d91c334e73950b2ae90050c8b667b54fd7"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://glyphwiki.org/wiki/u8fea-k@7",
      "revision": "고정 u8fea-k@7/u8fb6-j@2/u7531-07@2;2026-10-22 신규actualfull5 직접캡처",
      "editableSource": "/hanja-strokes/glyphwiki/u8fea-k.json",
      "modifications": "1357 미등록 source 후보. 고정public u8fea-k@7/u8fb6-j@2/u7531-07@2 한 closure의 신규 actualfull5/id3를 사용하며 옛header4/trace를 합성하지 않았다. ROOT9정적그룹의 순수projector FIRST1→즉시cache로 원20P를 보존했다. HV2(raw8/9), HV8(raw3/4)는 원endpoint exactjoin만 사용하고 QB9(raw5/6)는 gap[-2,-2]의 독립2mask다. 새connector/좌표/guide/폭/bodyweight/flag 수정·terminal분리 없이 원형이다. 새 source 시간/방향/초기cap/terminal/coverage/연결/APP/runtime는 미승인이고 batch176 HOLD는 보존한다. 이후 ROOT26 유효화면 중 HV2 원terminal23 잔여를 확인하여 원quad 하나를 원B.y와 원CD edge 교점으로 rectangle+triangle 두 fragment로만 분할했다. 원20P union은 그대로이고 표시fragment는21개다. 원bodyguide/width14/bodyweight89.7625는 유지하며 원triangle을 down weight3으로 표시한다. 다른8획은 동일하고 새native/APP/runtime 승인은 없다."
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
export function loadGlyphWikiBatch1357Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1357 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1357_STROKES:ReturnType<typeof loadGlyphWikiBatch1357Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1357_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1357_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1357_ASSIGNMENT_PROVISIONAL=true
