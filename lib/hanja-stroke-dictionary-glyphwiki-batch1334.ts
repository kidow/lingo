import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

/** Unregistered source-cache candidate; provisional batch1334 after unregistered1333. */
const EXPECTED = [
  {
    "glyph": "噋",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-21",
    "geometrySource": "7e5d8febe587277af2971c453d1a2aea0283590b6bddb47ee2a034debcb5cfff",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      11,
      10,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "paths": [
      "M13.2 20.85 L13.2 73.1 L7.2 76.1 L7.2 17.85 Z",
      "M10.2 20.85 L26.7 20.85 L26.7 22.85 L10.2 22.85 Z M29.7 21.85 L29.7 70.1 L23.7 73.1 L23.7 21.85 Z M23.7 20.85 L26.7 18.35 L32.2 22.85 L29.7 24.85 L23.7 21.85 Z",
      "M10.2 65.1 L26.7 65.1 L26.7 67.1 L10.2 67.1 Z",
      "M51.4 7.5 L51.4 21 L45.4 21 L45.4 6.5 Z M51.4 7.5 L52.9 8.5 L50.4 10 Z",
      "M33.2 19 L65.05 19 L65.05 21 L33.2 21 Z M65.05 19 L53.05 20 L59.05 14 Z",
      "M43.05 27.5 L43.05 44 L37.05 47 L37.05 24.5 Z",
      "M40.05 27.5 L56.75 27.5 L56.75 29.5 L40.05 29.5 Z M59.75 28.5 L59.75 42.5 L53.75 45.5 L53.75 28.5 Z M53.75 27.5 L56.75 25 L62.25 29.5 L59.75 31.5 L53.75 28.5 Z",
      "M40.05 40.5 L56.75 40.5 L56.75 42.5 L40.05 42.5 Z",
      "M35.35 52.5 L58.2 52.5 L58.2 54.5 L35.35 54.5 Z M60.65 55.15 L59.55 56.45 L58.4 57.7 L57.3 58.85 L56.15 59.95 L55.05 61 L53.9 62 L52.8 62.9 L51.65 63.75 L50.45 64.5 L49.45 65.3 L48.8 64.65 L49.5 63.6 L50.1 62.4 L50.75 61.2 L51.4 59.95 L52.1 58.7 L52.75 57.4 L53.5 56.05 L54.2 54.65 L54.95 53.25 L55.7 51.8 Z M55.2 52.5 L58.2 50 L63.7 54.5 L61.2 56 L55.2 58.5 Z",
      "M52.1 61.5 L52.1 86 L46.1 86 L46.1 60.5 Z M52.1 61.5 L53.6 62.5 L51.1 64 Z M46.1 86 L52.1 86 L50.9 87.8 L49.1 89 L47.3 87.8 Z M52.1 86 L52.05 87.25 L51.85 88.5 L51.45 89.7 L50.8 90.85 L50 91.85 L49 92.65 L47.85 93.3 L46.65 93.7 L45.4 93.9 L44.1 94 L44.1 88 L44.75 87.95 L45.2 87.85 L45.5 87.75 L45.65 87.7 L45.75 87.6 L45.85 87.5 L45.9 87.35 L46 87.05 L46.1 86.6 L46.1 86 Z M44.1 91 L34.1 89.5 L34.1 88 L44.1 88 Z",
      "M34.15 73.45 L37.4 72.9 L40.6 72.3 L43.7 71.7 L46.75 71.1 L49.7 70.4 L52.6 69.75 L55.5 69.05 L58.3 68.35 L61.05 67.65 L63.8 67.05 L64.15 67.9 L61.75 69.45 L59.2 70.85 L56.55 72.15 L53.8 73.35 L50.95 74.5 L48 75.55 L44.95 76.55 L41.85 77.55 L38.65 78.45 L35.35 79.3 Z M35.35 79.3 L33.2 73.65 L34.15 73.45 Z M35.35 79.3 L38 77.25 L36.65 80.6 Z",
      "M77.35 7.9 L76.35 12.9 L75.25 17.7 L74.05 22.4 L72.7 26.9 L71.25 31.2 L69.7 35.4 L68 39.4 L66.15 43.2 L64.1 46.8 L61.9 50.2 L61.1 49.75 L62.4 46 L63.65 42.15 L64.9 38.2 L66.1 34.15 L67.2 30 L68.25 25.65 L69.15 21.2 L70 16.65 L70.75 11.9 L71.4 7 Z M71.35 7.5 L71.55 6 L77.35 7.9 Z M77.35 7.9 L78.65 9.15 L75.95 10.25 Z",
      "M69.25 30.5 L93.25 30.5 L93.25 32.5 L69.25 32.5 Z M93.25 30.5 L83.25 31.5 L88.25 26 Z",
      "M87.15 31.7 L86 41.2 L84.4 50 L82.35 58.1 L79.9 65.55 L76.95 72.25 L73.55 78.25 L69.7 83.45 L65.4 87.95 L60.7 91.6 L55.55 94.35 L55.1 93.6 L59.5 90.1 L63.5 86.05 L67.1 81.45 L70.3 76.3 L73.1 70.45 L75.5 64 L77.5 56.8 L79.15 49 L80.35 40.45 L81.2 31.25 Z",
      "M67.8 36.95 L69.25 44.2 L70.85 50.9 L72.7 57.15 L74.75 62.85 L77.1 68 L79.65 72.7 L82.5 76.85 L85.6 80.45 L88.95 83.6 L92.55 86.3 L88.75 91.65 L84.75 88.25 L81.2 84.35 L78 80 L75.2 75.2 L72.8 69.95 L70.8 64.25 L69.2 58.1 L67.95 51.5 L67.2 44.5 L66.9 37 Z M88.75 91.65 L92.55 86.3 L94.25 87.45 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M13.2 20.85 L13.2 73.1 L7.2 76.1 L7.2 17.85 Z",
          "bounds": [
            7.2,
            17.85,
            13.2,
            76.1
          ],
          "direction": "down",
          "weight": 44.28
        }
      ],
      [
        {
          "outline": "M10.2 20.85 L26.7 20.85 L26.7 22.85 L10.2 22.85 Z M29.7 21.85 L29.7 70.1 L23.7 73.1 L23.7 21.85 Z M23.7 20.85 L26.7 18.35 L32.2 22.85 L29.7 24.85 L23.7 21.85 Z",
          "bounds": [
            10.2,
            18.35,
            32.2,
            73.1
          ],
          "direction": "curve",
          "weight": 60.7955,
          "revealPath": "M10.229750000000001 21.86 L26.745250000000002 21.86 L26.745250000000002 66.14",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M10.2 65.1 L26.7 65.1 L26.7 67.1 L10.2 67.1 Z",
          "bounds": [
            10.2,
            65.1,
            26.7,
            67.1
          ],
          "direction": "right",
          "weight": 16.5155
        }
      ],
      [
        {
          "outline": "M51.4 7.5 L51.4 21 L45.4 21 L45.4 6.5 Z M51.4 7.5 L52.9 8.5 L50.4 10 Z",
          "bounds": [
            45.4,
            6.5,
            52.9,
            21
          ],
          "direction": "down",
          "weight": 13
        }
      ],
      [
        {
          "outline": "M33.2 19 L65.05 19 L65.05 21 L33.2 21 Z M65.05 19 L53.05 20 L59.05 14 Z",
          "bounds": [
            33.2,
            14,
            65.05,
            21
          ],
          "direction": "right",
          "weight": 31.878
        }
      ],
      [
        {
          "outline": "M43.05 27.5 L43.05 44 L37.05 47 L37.05 24.5 Z",
          "bounds": [
            37.05,
            24.5,
            43.05,
            47
          ],
          "direction": "down",
          "weight": 13
        }
      ],
      [
        {
          "outline": "M40.05 27.5 L56.75 27.5 L56.75 29.5 L40.05 29.5 Z M59.75 28.5 L59.75 42.5 L53.75 45.5 L53.75 28.5 Z M53.75 27.5 L56.75 25 L62.25 29.5 L59.75 31.5 L53.75 28.5 Z",
          "bounds": [
            40.05,
            25,
            62.25,
            45.5
          ],
          "direction": "curve",
          "weight": 29.6635,
          "revealPath": "M40.092 28.5 L56.7555 28.5 L56.7555 41.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M40.05 40.5 L56.75 40.5 L56.75 42.5 L40.05 42.5 Z",
          "bounds": [
            40.05,
            40.5,
            56.75,
            42.5
          ],
          "direction": "right",
          "weight": 16.6635
        }
      ],
      [
        {
          "outline": "M35.35 52.5 L58.2 52.5 L58.2 54.5 L35.35 54.5 Z",
          "bounds": [
            35.35,
            52.5,
            58.2,
            54.5
          ],
          "direction": "right",
          "weight": 22.82175
        },
        {
          "outline": "M60.65 55.15 L59.55 56.45 L58.4 57.7 L57.3 58.85 L56.15 59.95 L55.05 61 L53.9 62 L52.8 62.9 L51.65 63.75 L50.45 64.5 L49.45 65.3 L48.8 64.65 L49.5 63.6 L50.1 62.4 L50.75 61.2 L51.4 59.95 L52.1 58.7 L52.75 57.4 L53.5 56.05 L54.2 54.65 L54.95 53.25 L55.7 51.8 Z M55.2 52.5 L58.2 50 L63.7 54.5 L61.2 56 L55.2 58.5 Z",
          "bounds": [
            48.8,
            50,
            63.7,
            65.3
          ],
          "direction": "curve",
          "weight": 14.637816,
          "revealPath": "M58.204499999999996 53.5 Q53.49525 60.5 49.148250000000004 65",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M52.1 61.5 L52.1 86 L46.1 86 L46.1 60.5 Z M52.1 61.5 L53.6 62.5 L51.1 64 Z M46.1 86 L52.1 86 L50.9 87.8 L49.1 89 L47.3 87.8 Z M52.1 86 L52.05 87.25 L51.85 88.5 L51.45 89.7 L50.8 90.85 L50 91.85 L49 92.65 L47.85 93.3 L46.65 93.7 L45.4 93.9 L44.1 94 L44.1 88 L44.75 87.95 L45.2 87.85 L45.5 87.75 L45.65 87.7 L45.75 87.6 L45.85 87.5 L45.9 87.35 L46 87.05 L46.1 86.6 L46.1 86 Z",
          "bounds": [
            44.1,
            60.5,
            53.6,
            94
          ],
          "direction": "curve",
          "weight": 32.071068,
          "revealPath": "M49.148250000000004 61 L49.148250000000004 86 Q49.148250000000004 91 44.148250000000004 91",
          "revealWidth": 14
        },
        {
          "outline": "M44.1 91 L34.1 89.5 L34.1 88 L44.1 88 Z",
          "bounds": [
            34.1,
            88,
            44.1,
            91
          ],
          "direction": "left",
          "weight": 10
        }
      ],
      [
        {
          "outline": "M34.15 73.45 L37.4 72.9 L40.6 72.3 L43.7 71.7 L46.75 71.1 L49.7 70.4 L52.6 69.75 L55.5 69.05 L58.3 68.35 L61.05 67.65 L63.8 67.05 L64.15 67.9 L61.75 69.45 L59.2 70.85 L56.55 72.15 L53.8 73.35 L50.95 74.5 L48 75.55 L44.95 76.55 L41.85 77.55 L38.65 78.45 L35.35 79.3 Z M35.35 79.3 L33.2 73.65 L34.15 73.45 Z M35.35 79.3 L38 77.25 L36.65 80.6 Z",
          "bounds": [
            33.2,
            67.05,
            64.15,
            80.6
          ],
          "direction": "curve",
          "weight": 31.037998,
          "revealPath": "M34.296 76.5 Q51.32175 73 64.0005 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M77.35 7.9 L76.35 12.9 L75.25 17.7 L74.05 22.4 L72.7 26.9 L71.25 31.2 L69.7 35.4 L68 39.4 L66.15 43.2 L64.1 46.8 L61.9 50.2 L61.1 49.75 L62.4 46 L63.65 42.15 L64.9 38.2 L66.1 34.15 L67.2 30 L68.25 25.65 L69.15 21.2 L70 16.65 L70.75 11.9 L71.4 7 Z M71.35 7.5 L71.55 6 L77.35 7.9 Z M77.35 7.9 L78.65 9.15 L75.95 10.25 Z",
          "bounds": [
            61.1,
            6,
            78.65,
            50.2
          ],
          "direction": "curve",
          "weight": 44.91406,
          "revealPath": "M74.47469999999998 7 Q70.5831 32.5 61.5027 50",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M69.25 30.5 L93.25 30.5 L93.25 32.5 L69.25 32.5 Z M93.25 30.5 L83.25 31.5 L88.25 26 Z",
          "bounds": [
            69.25,
            26,
            93.25,
            32.5
          ],
          "direction": "right",
          "weight": 23.9982
        }
      ],
      [
        {
          "outline": "M87.15 31.7 L86 41.2 L84.4 50 L82.35 58.1 L79.9 65.55 L76.95 72.25 L73.55 78.25 L69.7 83.45 L65.4 87.95 L60.7 91.6 L55.55 94.35 L55.1 93.6 L59.5 90.1 L63.5 86.05 L67.1 81.45 L70.3 76.3 L73.1 70.45 L75.5 64 L77.5 56.8 L79.15 49 L80.35 40.45 L81.2 31.25 Z",
          "bounds": [
            55.1,
            31.25,
            87.15,
            94.35
          ],
          "direction": "curve",
          "weight": 68.842614,
          "revealPath": "M84.2037 31.5 Q80.3121 80 55.340999999999994 94",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M67.8 36.95 L69.25 44.2 L70.85 50.9 L72.7 57.15 L74.75 62.85 L77.1 68 L79.65 72.7 L82.5 76.85 L85.6 80.45 L88.95 83.6 L92.55 86.3 L88.75 91.65 L84.75 88.25 L81.2 84.35 L78 80 L75.2 75.2 L72.8 69.95 L70.8 64.25 L69.2 58.1 L67.95 51.5 L67.2 44.5 L66.9 37 Z M88.75 91.65 L92.55 86.3 L94.25 87.45 Z",
          "bounds": [
            66.9,
            36.95,
            94.25,
            91.65
          ],
          "direction": "curve",
          "weight": 57.458279,
          "revealPath": "M67.3401 36.5 Q70.9074 75 90.68969999999999 89",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "44065724992e86fea67367225d0c5704025633a50d70e9c43ec1b701a1593158",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/564b.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/5600/564b.svg",
      "dictionarySvgSha256": "47f79c87cf7b87f1797e85d07984a2b4ff3b037f7dbfeba9ab21aaa18bd263d3",
      "dictionaryDirectionStrokes": "기존static15 대응/source-order 후보만; conditional source-cache/unregistered. 실제APP/native/temporal/registry/runtime승인false, batch1334배정provisional. order/direction hash=static record; geometry hash=source preparation, not final native review.",
      "orderReviewSha256": "2b861f0e07247ceff1bc77470066f7c9f2deb7fdee2281bc8c667e3e3442df01",
      "geometryReviewSha256": "9b5b6032ca32e5981e5a3a5efc18c453dbf9b2c12860f55231e633ba321516b6",
      "directionReviewSha256": "2b861f0e07247ceff1bc77470066f7c9f2deb7fdee2281bc8c667e3e3442df01"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "Fixed base actualfull5/id5+selectedbody3; UNREGISTERED conditional/provisional batch1334, no final actual component/browser/runtime approval",
      "editableSource": "/hanja-strokes/glyphwiki/u564b.json",
      "modifications": "미등록 조건부 source-cache 후보이며batch1334배정은미등록1333梲를가정한provisional이다. 원970 base actualfull5와selectedbody3의id5를각파일SHA와groups/trace/defaults동일성에결박하며새header합성0/VS0자료혼합0이다. 새15p17m33/33polygon geometry4a57bb3f1bde763a5d97f895413748f2d1e05a528650e000e365c515c0ddd2e6의원필드를보존한다. 국내static대응에따른raw8바닥H를비연속HQ9보다앞에배치한sourceGroups를보존한다. HQ9 raw9H+raw11Q의source접점delta[0,0]도같은논리획독립2mask이며guide연결/새connector를만들지않는다. pen10은원Q14의마지막LEFT polygon만분리한body+tail이며bodyguide/폭14/weight32.071068은유지,원subset에따른activebodyminX34.1→44.1변경을표시한다. tail10추가로pen10합계42.071068/전체가중치배분변경이며player전체duration증가승인아니다. Q9m2 고유T1/2 K1/50 growingcap은별도표시정책이며기하변경0이다. 원HOLD/준비false이력불변, 최종actualcomponent/browser/native/APP/registry/runtime승인false이고review객체null이다. schema의ehanja-crosschecked/verifiedAt는기존static자료대응과준비일category이며새native완료승인이아니다. 新bundle작업의source/compiler/factory/engine/projection/derive/기하실행0이다."
    }
  }
] as unknown as readonly HanjaDictionaryStrokeData[]
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(EXPECTED)
function sameJSON(a:unknown,b:unknown):boolean {
 if(Object.is(a,b))return true
 if(Array.isArray(b))return Array.isArray(a)&&a.length===b.length&&Reflect.ownKeys(a).length===b.length+1&&b.every((v,i)=>Object.hasOwn(a,i)&&sameJSON(a[i],v))
 if(!b||typeof b!=='object'||!a||typeof a!=='object'||Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),record=a as Record<string,unknown>,expected=b as Record<string,unknown>
 return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&sameJSON(record[k],expected[k]))
}
export function loadGlyphWikiBatch1334Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[] {
 if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw new Error('Invalid GlyphWiki batch1334 reviewed bundle')
 return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1334_STROKES:ReturnType<typeof loadGlyphWikiBatch1334Strokes>=EXPECTED

export const GLYPHWIKI_BATCH1334_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1334_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1334_ASSIGNMENT_PROVISIONAL=true
