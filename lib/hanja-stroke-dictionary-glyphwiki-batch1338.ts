import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** Immutable provisional1338 bundle; actual finite authorization lives in runtime review, product APP UI remains unverified. */
const EXPECTED = [
  {
    "glyph": "湺",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-21",
    "geometrySource": "fc68bf08baeb8c28a20055a65857fd59785abb6ce0680fe2b0031a10413f05b5",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      6,
      7,
      8,
      9,
      11,
      12,
      13,
      14,
      15
    ],
    "paths": [
      "M13.75 9.75 L15.5 10.25 L17.25 10.65 L18.9 11.2 L20.5 11.85 L21.95 12.55 L23.35 13.4 L24.65 14.3 L25.85 15.35 L26.95 16.45 L27.95 17.7 L22.75 20.65 L22.35 19.65 L21.85 18.65 L21.25 17.6 L20.5 16.6 L19.65 15.55 L18.65 14.55 L17.55 13.55 L16.35 12.5 L15 11.45 L13.45 10.6 Z M27.95 17.7 L28.2 19.95 L26.85 21.8 L24.55 22.05 L22.75 20.65 Z",
      "M6.9 32.7 L8.8 33.2 L10.65 33.65 L12.4 34.15 L14.05 34.8 L15.55 35.55 L17 36.35 L18.3 37.3 L19.55 38.35 L20.65 39.5 L21.6 40.75 L16.25 43.5 L15.95 42.55 L15.5 41.6 L14.9 40.6 L14.2 39.6 L13.3 38.6 L12.25 37.55 L11.1 36.55 L9.75 35.5 L8.3 34.45 L6.6 33.55 Z M21.6 40.75 L21.75 43.05 L20.3 44.8 L18 44.95 L16.25 43.5 Z",
      "M7.65 66.2 L10.25 66.85 L12.6 67.95 L14.75 69.5 L16.65 71.5 L18.2 73.9 L19.4 76.65 L20.35 79.7 L20.95 83.05 L21.25 86.75 L21.25 90.7 L15.3 90.25 L15.55 86.75 L15.6 83.5 L15.4 80.6 L14.95 77.95 L14.3 75.65 L13.45 73.55 L12.35 71.7 L10.95 70.05 L9.3 68.5 L7.35 67.05 Z M21.25 90.7 L20.25 92.7 L18.05 93.45 L16.05 92.45 L15.3 90.25 Z M13.45 74.25 L14.1 72.65 L14.95 70.5 L16.1 67.85 L17.55 64.6 L19.25 60.8 L21.25 56.45 L23.6 51.5 L26.2 46 L29.15 39.9 L32.5 33.3 L33.35 33.65 L30.9 40.65 L28.65 47 L26.6 52.75 L24.8 57.85 L23.2 62.4 L21.9 66.3 L20.8 69.6 L20.05 72.3 L19.5 74.35 L19.3 75.7 Z",
      "M50.9 9.5 L49.3 14.95 L47.6 20.25 L45.85 25.4 L44 30.5 L42.05 35.45 L40.05 40.3 L37.9 45 L35.7 49.55 L33.3 53.95 L30.8 58.2 L29.95 57.8 L31.6 53.2 L33.25 48.5 L34.9 43.75 L36.5 38.95 L38.05 34 L39.6 29 L41.05 23.9 L42.45 18.7 L43.8 13.4 L45.05 8 Z M44.95 8.5 L45.3 7.15 L50.9 9.5 Z M50.9 9.5 L52.1 10.85 L49.3 11.7 Z",
      "M43.95 37.05 L43.95 90.15 L37.95 93.15 L37.95 36.05 Z M43.95 37.05 L45.45 38.05 L42.95 39.55 Z",
      "M59 12.5 L59 47 L53 50 L53 9.5 Z",
      "M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z",
      "M56 39 L83.7 39 L83.7 41 L56 41 Z",
      "M47 55.5 L92 55.5 L92 57.5 L47 57.5 Z M92 55.5 L80 56.5 L86 50.5 Z",
      "M72.3 39 L72.3 90 L66.3 93 L66.3 39 Z",
      "M70.3 56.5 L70 57.4 L68.45 61.4 L66.7 65.25 L64.75 68.95 L62.65 72.45 L60.4 75.75 L57.9 78.9 L55.3 81.85 L52.45 84.6 L49.45 87.1 L46.2 89.3 L45.6 88.65 L48.15 85.7 L50.5 82.75 L52.75 79.75 L54.85 76.65 L56.85 73.45 L58.65 70.1 L60.3 66.65 L61.8 63.1 L63.1 59.4 L64 56.5 Z",
      "M72.45 56.8 L74.3 59.75 L76.1 62.65 L77.9 65.4 L79.8 68 L81.7 70.5 L83.75 72.85 L85.8 75.05 L88 77.15 L90.3 79.1 L92.65 80.9 L88.45 86.05 L86.05 83.7 L83.8 81.3 L81.65 78.7 L79.7 76 L77.9 73.2 L76.25 70.25 L74.75 67.15 L73.45 63.95 L72.4 60.6 L71.6 57.1 Z M88.45 86.05 L92.65 80.9 L93.9 81.95 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M13.75 9.75 L15.5 10.25 L17.25 10.65 L18.9 11.2 L20.5 11.85 L21.95 12.55 L23.35 13.4 L24.65 14.3 L25.85 15.35 L26.95 16.45 L27.95 17.7 L22.75 20.65 L22.35 19.65 L21.85 18.65 L21.25 17.6 L20.5 16.6 L19.65 15.55 L18.65 14.55 L17.55 13.55 L16.35 12.5 L15 11.45 L13.45 10.6 Z M27.95 17.7 L28.2 19.95 L26.85 21.8 L24.55 22.05 L22.75 20.65 Z",
          "bounds": [
            13.45,
            9.75,
            28.2,
            22.05
          ],
          "direction": "curve",
          "weight": 16.679676,
          "revealPath": "M13.16 10 Q22.16 13.5 26.12 20.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.9 32.7 L8.8 33.2 L10.65 33.65 L12.4 34.15 L14.05 34.8 L15.55 35.55 L17 36.35 L18.3 37.3 L19.55 38.35 L20.65 39.5 L21.6 40.75 L16.25 43.5 L15.95 42.55 L15.5 41.6 L14.9 40.6 L14.2 39.6 L13.3 38.6 L12.25 37.55 L11.1 36.55 L9.75 35.5 L8.3 34.45 L6.6 33.55 Z M21.6 40.75 L21.75 43.05 L20.3 44.8 L18 44.95 L16.25 43.5 Z",
          "bounds": [
            6.6,
            32.7,
            21.75,
            44.95
          ],
          "direction": "curve",
          "weight": 16.960908,
          "revealPath": "M6.32 33 Q16.04 36.5 19.64 43.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.65 66.2 L10.25 66.85 L12.6 67.95 L14.75 69.5 L16.65 71.5 L18.2 73.9 L19.4 76.65 L20.35 79.7 L20.95 83.05 L21.25 86.75 L21.25 90.7 L15.3 90.25 L15.55 86.75 L15.6 83.5 L15.4 80.6 L14.95 77.95 L14.3 75.65 L13.45 73.55 L12.35 71.7 L10.95 70.05 L9.3 68.5 L7.35 67.05 Z M21.25 90.7 L20.25 92.7 L18.05 93.45 L16.05 92.45 L15.3 90.25 Z",
          "bounds": [
            7.35,
            66.2,
            21.25,
            93.45
          ],
          "direction": "curve",
          "weight": 27.83515,
          "revealPath": "M7.04 66.5 Q19.64 71 18.2 92",
          "revealWidth": 14
        },
        {
          "outline": "M13.45 74.25 L14.1 72.65 L14.95 70.5 L16.1 67.85 L17.55 64.6 L19.25 60.8 L21.25 56.45 L23.6 51.5 L26.2 46 L29.15 39.9 L32.5 33.3 L33.35 33.65 L30.9 40.65 L28.65 47 L26.6 52.75 L24.8 57.85 L23.2 62.4 L21.9 66.3 L20.8 69.6 L20.05 72.3 L19.5 74.35 L19.3 75.7 Z",
          "bounds": [
            13.45,
            33.3,
            33.35,
            75.7
          ],
          "direction": "curve",
          "weight": 44.682028,
          "revealPath": "M16.4 75 Q17.84 69 32.96 33.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.9 9.5 L49.3 14.95 L47.6 20.25 L45.85 25.4 L44 30.5 L42.05 35.45 L40.05 40.3 L37.9 45 L35.7 49.55 L33.3 53.95 L30.8 58.2 L29.95 57.8 L31.6 53.2 L33.25 48.5 L34.9 43.75 L36.5 38.95 L38.05 34 L39.6 29 L41.05 23.9 L42.45 18.7 L43.8 13.4 L45.05 8 Z M44.95 8.5 L45.3 7.15 L50.9 9.5 Z M50.9 9.5 L52.1 10.85 L49.3 11.7 Z",
          "bounds": [
            29.95,
            7.15,
            52.1,
            58.2
          ],
          "direction": "curve",
          "weight": 52.790763,
          "revealPath": "M48.123400000000004 8.3125 Q40.9792 36.1 30.3952 58.0375",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M43.95 37.05 L43.95 90.15 L37.95 93.15 L37.95 36.05 Z M43.95 37.05 L45.45 38.05 L42.95 39.55 Z",
          "bounds": [
            37.95,
            36.05,
            45.45,
            93.15
          ],
          "direction": "down",
          "weight": 55.0875
        }
      ],
      [
        {
          "outline": "M59 12.5 L59 47 L53 50 L53 9.5 Z",
          "bounds": [
            53,
            9.5,
            59,
            50
          ],
          "direction": "down",
          "weight": 26.5
        }
      ],
      [
        {
          "outline": "M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z",
          "bounds": [
            56,
            10,
            89.2,
            47
          ],
          "direction": "curve",
          "weight": 54.22,
          "revealPath": "M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M56 39 L83.7 39 L83.7 41 L56 41 Z",
          "bounds": [
            56,
            39,
            83.7,
            41
          ],
          "direction": "right",
          "weight": 27.72
        }
      ],
      [
        {
          "outline": "M47 55.5 L92 55.5 L92 57.5 L47 57.5 Z M92 55.5 L80 56.5 L86 50.5 Z",
          "bounds": [
            47,
            50.5,
            92,
            57.5
          ],
          "direction": "right",
          "weight": 45
        }
      ],
      [
        {
          "outline": "M72.3 39 L72.3 90 L66.3 93 L66.3 39 Z",
          "bounds": [
            66.3,
            39,
            72.3,
            93
          ],
          "direction": "down",
          "weight": 51.5
        }
      ],
      [
        {
          "outline": "M70.3 56.5 L70 57.4 L68.45 61.4 L66.7 65.25 L64.75 68.95 L62.65 72.45 L60.4 75.75 L57.9 78.9 L55.3 81.85 L52.45 84.6 L49.45 87.1 L46.2 89.3 L45.6 88.65 L48.15 85.7 L50.5 82.75 L52.75 79.75 L54.85 76.65 L56.85 73.45 L58.65 70.1 L60.3 66.65 L61.8 63.1 L63.1 59.4 L64 56.5 Z",
          "bounds": [
            45.6,
            56.5,
            70.3,
            89.3
          ],
          "direction": "curve",
          "weight": 38.82509,
          "revealPath": "M67.18 56.5 Q60.7 76.5 45.94 89",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M72.45 56.8 L74.3 59.75 L76.1 62.65 L77.9 65.4 L79.8 68 L81.7 70.5 L83.75 72.85 L85.8 75.05 L88 77.15 L90.3 79.1 L92.65 80.9 L88.45 86.05 L86.05 83.7 L83.8 81.3 L81.65 78.7 L79.7 76 L77.9 73.2 L76.25 70.25 L74.75 67.15 L73.45 63.95 L72.4 60.6 L71.6 57.1 Z M88.45 86.05 L92.65 80.9 L93.9 81.95 Z",
          "bounds": [
            71.6,
            56.8,
            93.9,
            86.05
          ],
          "direction": "curve",
          "weight": 32.854808,
          "revealPath": "M71.86 56.5 Q78.34 73.5 90.58 83.5",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "ebbaff6ad885a1d8948aefed07bac60570bcd55fc79f56fbcbdbe9638ad4eae7",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6e00/6e7a.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/6e00/6e7a.svg",
      "dictionarySvgSha256": "837c0c31d8ac6b4a729f8ef241ed170928b5c0e5e2a7f4af8b8d6c6e7e09dd50",
      "dictionaryDirectionStrokes": "공식국내 정적대응/source유한검토/실제component38 유한표시만. temporal·공식방향·제품전체UI/controller/storage/routes·자동재생전체 승인false.",
      "orderReviewSha256": "846f5f57f0f7a277c955b9cf8384dba79f6e3d202a2047ff9f7fe27abc13277a",
      "geometryReviewSha256": "ec17ac9bd20bb291591b206669aa570ce32ddb991ba6f0643b1ca1f77c2f744e",
      "directionReviewSha256": "846f5f57f0f7a277c955b9cf8384dba79f6e3d202a2047ff9f7fe27abc13277a"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed base full5/id3 + exact selectedbody3; provisional1338 finite-only ROOT authorization.",
      "editableSource": "/hanja-strokes/glyphwiki/u6e7a.json",
      "modifications": "미등록 준비 batch1338: 부모1337 실제5753/225. 원1087 actualfull5/id3+same-selected body3 정확결박/header·root혼합0. 캐시12p13m23 geometry643e371661c0557ea3338b28d58e94490385f0dac495b6738fdd3991d2d8d1d6의 원23polygon/순서/outline/guide/폭/weight/bounds 불변. empty raw5는 fullproof/trace에 보존. QQ3 gap/독립mask·HV7 exactjoin만 유지. 표시정책4MQ growingcaps+HV7 originalP sourceclip. ROOT의 공식국내 정적대응/source유한검토/실제component38 관찰 한정등록 승인일 뿐 제품StrokePlayback/controller/routes/storage/자동재생전체/공식temporal 승인false. 원HOLD/NOTICE/source/frozen 준비false 불변. bundle 역사flags는 미등록false이며 정식상태는runtime1338 review/resume에서 기록."
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
export function loadGlyphWikiBatch1338Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1338 provisional bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1338_STROKES:ReturnType<typeof loadGlyphWikiBatch1338Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1338_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1338_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1338_ASSIGNMENT_PROVISIONAL=true
