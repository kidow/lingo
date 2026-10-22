import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** false/provisional 상수는 준비이력이며 ROOT 유한승인은 별도 review에 고정한다. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable","editableSource":"/hanja-strokes/glyphwiki/u85fb-k.json","modifications":"K actualfull5/id3·closure9 고정. 원24raw/37P를 국내20획21mask로 대응하며 원P·guide·폭·weight와 QQ7 독립mask를 유지. 고유MQ5/첫직선3/foot7m2 표시정책의93 유한화면 승인. 7m2는 별도 내부시계이며 공식 미세시간·전체시점·제품UI 승인이 아님."}}
const CORE: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "藻",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "1b5ce33f51c726d26faef42b926bee63287ad89d1163e1612aac989ad61e7f5c",
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
      10,
      12,
      13,
      14,
      16,
      17,
      18,
      20,
      21,
      22,
      23,
      24
    ],
    "paths": [
      "M6.45 14.6 L46.75 14.6 L46.75 16.6 L6.45 16.6 Z M46.75 14.6 L36.75 15.6 L41.75 10.1 Z",
      "M34.8 6.35 L34.8 23.5 L28.8 26.5 L28.8 5.35 Z M34.8 6.35 L36.3 7.35 L33.8 8.85 Z",
      "M52.7 14.6 L93 14.6 L93 16.6 L52.7 16.6 Z M93 14.6 L81 15.6 L87 9.6 Z",
      "M70.65 6.35 L70.65 23.5 L64.65 26.5 L64.65 5.35 Z M70.65 6.35 L72.15 7.35 L69.65 8.85 Z",
      "M13.85 28.45 L15.7 28.8 L17.45 29 L19.15 29.35 L20.75 29.75 L22.25 30.2 L23.65 30.75 L24.95 31.4 L26.2 32.1 L27.35 32.95 L28.4 33.85 L23.65 37.5 L23.3 36.75 L22.75 36 L22.15 35.15 L21.35 34.35 L20.4 33.5 L19.35 32.65 L18.1 31.8 L16.75 30.9 L15.3 30 L13.6 29.3 Z M28.4 33.85 L28.95 36.05 L27.85 38.05 L25.65 38.6 L23.65 37.5 Z",
      "M6.65 46.25 L8.6 46.6 L10.5 46.8 L12.25 47.15 L13.9 47.55 L15.45 48 L16.9 48.55 L18.25 49.2 L19.5 49.9 L20.65 50.75 L21.7 51.75 L16.8 55.2 L16.5 54.5 L16.05 53.75 L15.45 53 L14.65 52.15 L13.7 51.35 L12.55 50.5 L11.25 49.6 L9.8 48.75 L8.2 47.85 L6.4 47.1 Z M21.7 51.75 L22.15 53.95 L20.95 55.9 L18.7 56.4 L16.8 55.2 Z",
      "M7.4 72.2 L10 72.65 L12.45 73.35 L14.65 74.5 L16.6 75.95 L18.25 77.75 L19.65 79.9 L20.65 82.35 L21.35 85 L21.7 87.95 L21.7 91.05 L15.75 90.5 L16 87.95 L16.05 85.65 L15.9 83.55 L15.45 81.65 L14.8 79.95 L13.9 78.35 L12.75 76.9 L11.25 75.5 L9.4 74.2 L7.15 73.05 Z M21.7 91.05 L20.6 93.05 L18.45 93.75 L16.45 92.7 L15.75 90.5 Z M13.8 78.15 L14.5 76.8 L15.45 75.15 L16.65 73.1 L18.15 70.65 L19.95 67.7 L22.05 64.35 L24.45 60.6 L27.2 56.35 L30.3 51.75 L33.75 46.7 L34.55 47.15 L31.95 52.7 L29.5 57.7 L27.3 62.2 L25.35 66.2 L23.65 69.75 L22.25 72.8 L21.1 75.4 L20.3 77.5 L19.75 79.05 L19.55 80.05 Z",
      "M53.6 28.45 L53.6 42.15 L47.6 45.15 L47.6 25.45 Z",
      "M50.6 28.45 L76.4 28.45 L76.4 30.45 L50.6 30.45 Z M79.4 29.45 L79.4 42.15 L73.4 45.15 L73.4 29.45 Z M73.4 28.45 L76.4 25.95 L81.9 30.45 L79.4 32.45 L73.4 29.45 Z",
      "M50.6 40.15 L76.4 40.15 L76.4 42.15 L50.6 42.15 Z",
      "M42.65 46.95 L42.65 61.95 L36.65 64.95 L36.65 43.95 Z",
      "M39.65 46.95 L57.55 46.95 L57.55 48.95 L39.65 48.95 Z M60.55 47.95 L60.55 61.45 L54.55 64.45 L54.55 47.95 Z M54.55 46.95 L57.55 44.45 L63.05 48.95 L60.55 50.95 L54.55 47.95 Z",
      "M39.65 58.45 L57.55 58.45 L57.55 60.45 L39.65 60.45 Z",
      "M72.7 46.95 L72.7 61.95 L66.7 64.95 L66.7 43.95 Z",
      "M69.7 46.95 L87.4 46.95 L87.4 48.95 L69.7 48.95 Z M90.4 47.95 L90.4 61.45 L84.4 64.45 L84.4 47.95 Z M84.4 46.95 L87.4 44.45 L92.9 48.95 L90.4 50.95 L84.4 47.95 Z",
      "M69.7 58.45 L87.4 58.45 L87.4 60.45 L69.7 60.45 Z",
      "M33.55 69.95 L93.05 69.95 L93.05 71.95 L33.55 71.95 Z M93.05 69.95 L83.05 70.95 L88.05 65.45 Z",
      "M65.55 63.7 L65.55 91.15 L59.55 94.15 L59.55 62.7 Z M65.55 63.7 L67.05 64.7 L64.55 66.2 Z",
      "M63.65 70.95 L62 72.8 L59.55 75.45 L56.95 77.95 L54.05 80.25 L51 82.45 L47.75 84.45 L44.25 86.35 L40.55 88.05 L36.65 89.55 L32.5 90.85 L28.15 91.95 L27.85 91.05 L31.8 89.1 L35.55 87.1 L39.05 85.1 L42.35 83.05 L45.4 80.9 L48.25 78.7 L50.85 76.4 L53.2 74.05 L55.35 71.65 L55.8 70.95 Z",
      "M65.05 71.05 L67.55 72.9 L69.95 74.75 L72.4 76.5 L74.85 78.2 L77.4 79.8 L80.05 81.35 L82.75 82.8 L85.55 84.1 L88.45 85.35 L91.4 86.55 L88.85 92.6 L85.75 91 L82.8 89.35 L79.95 87.55 L77.25 85.65 L74.7 83.6 L72.3 81.5 L70 79.25 L67.9 76.85 L66 74.35 L64.4 71.65 Z M88.85 92.6 L91.4 86.55 L94.55 87.85 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M6.45 14.6 L46.75 14.6 L46.75 16.6 L6.45 16.6 Z M46.75 14.6 L36.75 15.6 L41.75 10.1 Z",
          "bounds": [
            6.45,
            10.1,
            46.75,
            16.6
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M34.8 6.35 L34.8 23.5 L28.8 26.5 L28.8 5.35 Z M34.8 6.35 L36.3 7.35 L33.8 8.85 Z",
          "bounds": [
            28.8,
            5.35,
            36.3,
            26.5
          ],
          "direction": "down",
          "weight": 19.125
        }
      ],
      [
        {
          "outline": "M52.7 14.6 L93 14.6 L93 16.6 L52.7 16.6 Z M93 14.6 L81 15.6 L87 9.6 Z",
          "bounds": [
            52.7,
            9.6,
            93,
            16.6
          ],
          "direction": "right",
          "weight": 40.2975
        }
      ],
      [
        {
          "outline": "M70.65 6.35 L70.65 23.5 L64.65 26.5 L64.65 5.35 Z M70.65 6.35 L72.15 7.35 L69.65 8.85 Z",
          "bounds": [
            64.65,
            5.35,
            72.15,
            26.5
          ],
          "direction": "down",
          "weight": 19.125
        }
      ],
      [
        {
          "outline": "M13.85 28.45 L15.7 28.8 L17.45 29 L19.15 29.35 L20.75 29.75 L22.25 30.2 L23.65 30.75 L24.95 31.4 L26.2 32.1 L27.35 32.95 L28.4 33.85 L23.65 37.5 L23.3 36.75 L22.75 36 L22.15 35.15 L21.35 34.35 L20.4 33.5 L19.35 32.65 L18.1 31.8 L16.75 30.9 L15.3 30 L13.6 29.3 Z M28.4 33.85 L28.95 36.05 L27.85 38.05 L25.65 38.6 L23.65 37.5 Z",
          "bounds": [
            13.6,
            28.45,
            28.95,
            38.6
          ],
          "direction": "curve",
          "weight": 15.917327,
          "revealPath": "M13.28 28.75 Q22.78 31.4625 26.96 36.8875",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M6.65 46.25 L8.6 46.6 L10.5 46.8 L12.25 47.15 L13.9 47.55 L15.45 48 L16.9 48.55 L18.25 49.2 L19.5 49.9 L20.65 50.75 L21.7 51.75 L16.8 55.2 L16.5 54.5 L16.05 53.75 L15.45 53 L14.65 52.15 L13.7 51.35 L12.55 50.5 L11.25 49.6 L9.8 48.75 L8.2 47.85 L6.4 47.1 Z M21.7 51.75 L22.15 53.95 L20.95 55.9 L18.7 56.4 L16.8 55.2 Z",
          "bounds": [
            6.4,
            46.25,
            22.15,
            56.4
          ],
          "direction": "curve",
          "weight": 16.245076,
          "revealPath": "M6.06 46.575 Q16.32 49.2875 20.12 54.7125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M7.4 72.2 L10 72.65 L12.45 73.35 L14.65 74.5 L16.6 75.95 L18.25 77.75 L19.65 79.9 L20.65 82.35 L21.35 85 L21.7 87.95 L21.7 91.05 L15.75 90.5 L16 87.95 L16.05 85.65 L15.9 83.55 L15.45 81.65 L14.8 79.95 L13.9 78.35 L12.75 76.9 L11.25 75.5 L9.4 74.2 L7.15 73.05 Z M21.7 91.05 L20.6 93.05 L18.45 93.75 L16.45 92.7 L15.75 90.5 Z",
          "bounds": [
            7.15,
            72.2,
            21.7,
            93.75
          ],
          "direction": "curve",
          "weight": 23.00706,
          "revealPath": "M6.82 72.5375 Q20.12 76.025 18.6 92.3",
          "revealWidth": 14
        },
        {
          "outline": "M13.8 78.15 L14.5 76.8 L15.45 75.15 L16.65 73.1 L18.15 70.65 L19.95 67.7 L22.05 64.35 L24.45 60.6 L27.2 56.35 L30.3 51.75 L33.75 46.7 L34.55 47.15 L31.95 52.7 L29.5 57.7 L27.3 62.2 L25.35 66.2 L23.65 69.75 L22.25 72.8 L21.1 75.4 L20.3 77.5 L19.75 79.05 L19.55 80.05 Z",
          "bounds": [
            13.8,
            46.7,
            34.55,
            80.05
          ],
          "direction": "curve",
          "weight": 36.605694,
          "revealPath": "M16.7 79.125 Q18.22 74.475 34.18 46.9625",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.6 28.45 L53.6 42.15 L47.6 45.15 L47.6 25.45 Z",
          "bounds": [
            47.6,
            25.45,
            53.6,
            45.15
          ],
          "direction": "down",
          "weight": 11.718
        }
      ],
      [
        {
          "outline": "M50.6 28.45 L76.4 28.45 L76.4 30.45 L50.6 30.45 Z M79.4 29.45 L79.4 42.15 L73.4 45.15 L73.4 29.45 Z M73.4 28.45 L76.4 25.95 L81.9 30.45 L79.4 32.45 L73.4 29.45 Z",
          "bounds": [
            50.6,
            25.95,
            81.9,
            45.15
          ],
          "direction": "curve",
          "weight": 37.50915,
          "revealPath": "M50.610675 29.478500000000004 L76.401825 29.478500000000004 L76.401825 41.19649999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M50.6 40.15 L76.4 40.15 L76.4 42.15 L50.6 42.15 Z",
          "bounds": [
            50.6,
            40.15,
            76.4,
            42.15
          ],
          "direction": "right",
          "weight": 25.79115
        }
      ],
      [
        {
          "outline": "M42.65 46.95 L42.65 61.95 L36.65 64.95 L36.65 43.95 Z",
          "bounds": [
            36.65,
            43.95,
            42.65,
            64.95
          ],
          "direction": "down",
          "weight": 11.50875
        }
      ],
      [
        {
          "outline": "M39.65 46.95 L57.55 46.95 L57.55 48.95 L39.65 48.95 Z M60.55 47.95 L60.55 61.45 L54.55 64.45 L54.55 47.95 Z M54.55 46.95 L57.55 44.45 L63.05 48.95 L60.55 50.95 L54.55 47.95 Z",
          "bounds": [
            39.65,
            44.45,
            63.05,
            64.45
          ],
          "direction": "curve",
          "weight": 29.41335,
          "revealPath": "M39.6702 47.989375 L57.5748 47.989375 L57.5748 59.498125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M39.65 58.45 L57.55 58.45 L57.55 60.45 L39.65 60.45 Z",
          "bounds": [
            39.65,
            58.45,
            57.55,
            60.45
          ],
          "direction": "right",
          "weight": 17.9046
        }
      ],
      [
        {
          "outline": "M72.7 46.95 L72.7 61.95 L66.7 64.95 L66.7 43.95 Z",
          "bounds": [
            66.7,
            43.95,
            72.7,
            64.95
          ],
          "direction": "down",
          "weight": 11.50875
        }
      ],
      [
        {
          "outline": "M69.7 46.95 L87.4 46.95 L87.4 48.95 L69.7 48.95 Z M90.4 47.95 L90.4 61.45 L84.4 64.45 L84.4 47.95 Z M84.4 46.95 L87.4 44.45 L92.9 48.95 L90.4 50.95 L84.4 47.95 Z",
          "bounds": [
            69.7,
            44.45,
            92.9,
            64.45
          ],
          "direction": "curve",
          "weight": 29.2002,
          "revealPath": "M69.728025 47.989375 L87.41947499999998 47.989375 L87.41947499999998 59.498125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M69.7 58.45 L87.4 58.45 L87.4 60.45 L69.7 60.45 Z",
          "bounds": [
            69.7,
            58.45,
            87.4,
            60.45
          ],
          "direction": "right",
          "weight": 17.69145
        }
      ],
      [
        {
          "outline": "M33.55 69.95 L93.05 69.95 L93.05 71.95 L33.55 71.95 Z M93.05 69.95 L83.05 70.95 L88.05 65.45 Z",
          "bounds": [
            33.55,
            65.45,
            93.05,
            71.95
          ],
          "direction": "right",
          "weight": 59.535
        }
      ],
      [
        {
          "outline": "M65.55 63.7 L65.55 91.15 L59.55 94.15 L59.55 62.7 Z M65.55 63.7 L67.05 64.7 L64.55 66.2 Z",
          "bounds": [
            59.55,
            62.7,
            67.05,
            94.15
          ],
          "direction": "down",
          "weight": 29.45
        }
      ],
      [
        {
          "outline": "M63.65 70.95 L62 72.8 L59.55 75.45 L56.95 77.95 L54.05 80.25 L51 82.45 L47.75 84.45 L44.25 86.35 L40.55 88.05 L36.65 89.55 L32.5 90.85 L28.15 91.95 L27.85 91.05 L31.8 89.1 L35.55 87.1 L39.05 85.1 L42.35 83.05 L45.4 80.9 L48.25 78.7 L50.85 76.4 L53.2 74.05 L55.35 71.65 L55.8 70.95 Z",
          "bounds": [
            27.85,
            70.95,
            63.65,
            91.95
          ],
          "direction": "curve",
          "weight": 37.691709,
          "revealPath": "M59.6475 70.9875 Q49.3575 84.1625 28.0425 91.525",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M65.05 71.05 L67.55 72.9 L69.95 74.75 L72.4 76.5 L74.85 78.2 L77.4 79.8 L80.05 81.35 L82.75 82.8 L85.55 84.1 L88.45 85.35 L91.4 86.55 L88.85 92.6 L85.75 91 L82.8 89.35 L79.95 87.55 L77.25 85.65 L74.7 83.6 L72.3 81.5 L70 79.25 L67.9 76.85 L66 74.35 L64.4 71.65 Z M88.85 92.6 L91.4 86.55 L94.55 87.85 Z",
          "bounds": [
            64.4,
            71.05,
            94.55,
            92.6
          ],
          "direction": "curve",
          "weight": 31.744852,
          "revealPath": "M64.425 70.9875 Q74.715 83 90.15 89.5875",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "47983ec4aafd9534c992d7edea949767f8fe35adefc41b26b03b91608f52c873",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85FB.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/8500/85FB.svg",
      "dictionarySvgSha256": "392c80a88cf16f4c95180a827debede506bc442eac8beef0c601adb9c0b30fb1",
      "dictionaryDirectionStrokes": "全20 정적대응11·공식20macro60. 고유9정책 isolated actualcomponent93 유한화면. 원source/guide/폭/weight 보존, foot7m2 새내부시계. 원미세시간·전체시점·제품UI 승인 아님.",
      "orderReviewSha256": "2338326021ffdad6c558a70cbda1eacd85bb9d272d966ca0b1e0347ed9f27ae0",
      "geometryReviewSha256": "a7e81c783765c2f25821f7944b4e1fd799574853d991989312c897d9cec72f53",
      "directionReviewSha256": "bc2a63c171f249ac9708f374daa69177131d4d91507c75e716c2243ff5305df7"
    }
  }
]
const EXPECTED: readonly HanjaDictionaryStrokeData[] = CORE.map(entry=>({...entry,...GEOMETRY_LICENSE}))
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(CORE);freezeDeep(GEOMETRY_LICENSE);freezeDeep(EXPECTED)
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
export function loadGlyphWikiBatch1386Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1386 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1386_STROKES:ReturnType<typeof loadGlyphWikiBatch1386Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1386_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1386_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1386_ASSIGNMENT_PROVISIONAL=true

export const GLYPHWIKI_BATCH1386_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u85fb-activation-review.json","SHA256":"a7e81c783765c2f25821f7944b4e1fd799574853d991989312c897d9cec72f53"})
