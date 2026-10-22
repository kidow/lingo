import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** false/provisional 상수는 준비이력이며 ROOT의 유한승인은 별도 review에 고정한다. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016-05-02 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; individual revisions unavailable","editableSource":"/hanja-strokes/glyphwiki/u906d-k.json","modifications":"K actualfull5·closure8 고정. 원19raw/30P를 corrected15획17mask31조각으로 대응. 원30Punion 유지,3끝 원quad를 body+DOWNtail로 정확분할. 원guide/폭/bodyweight불변,3tail·15foot 새내부시계. 공식macro와 원미세시간동일·제품UI 승인은 별개."}}
const CORE: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "遭",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "850df31c2db7c9e6bed323edf04b2d233a57b6349ea38143835f4986719008fc",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      7,
      8,
      9,
      13,
      11,
      12,
      14,
      15,
      16,
      18,
      19,
      1,
      2,
      3,
      5
    ],
    "paths": [
      "M32.85 16.05 L93.6 16.05 L93.6 18.05 L32.85 18.05 Z M93.6 16.05 L81.6 17.05 L87.6 11.05 Z",
      "M44.05 25.6 L44.05 53.25 L38.05 56.25 L38.05 22.6 Z",
      "M41.05 25.6 L85.4 25.6 L85.4 27.6 L41.05 27.6 Z M88.4 26.6 L88.4 50.25 L82.4 50.25 L82.4 26.6 Z M82.4 25.6 L85.4 23.1 L90.9 27.6 L88.4 29.6 L82.4 26.6 Z M88.4 50.25 L82.4 53.25 L82.4 50.25 Z",
      "M41.05 35.45 L85.4 35.45 L85.4 37.45 L41.05 37.45 Z",
      "M58.7 7.5 L58.7 47.25 L52.7 47.25 L52.7 6.5 Z M58.7 7.5 L60.2 8.5 L57.7 10 Z",
      "M73.75 7.5 L73.75 47.25 L67.75 47.25 L67.75 6.5 Z M73.75 7.5 L75.25 8.5 L72.75 10 Z",
      "M41.05 45.25 L85.4 45.25 L85.4 47.25 L41.05 47.25 Z",
      "M50.1 53.75 L50.1 80.85 L44.1 83.85 L44.1 50.75 Z",
      "M47.1 53.75 L79.7 53.75 L79.7 55.75 L47.1 55.75 Z M82.7 54.75 L82.7 79.35 L76.7 82.35 L76.7 54.75 Z M76.7 53.75 L79.7 51.25 L85.2 55.75 L82.7 57.75 L76.7 54.75 Z",
      "M47.1 64.25 L79.7 64.25 L79.7 66.25 L47.1 66.25 Z",
      "M47.1 75.35 L79.7 75.35 L79.7 77.35 L47.1 77.35 Z",
      "M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z",
      "M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z",
      "M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z",
      "M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M32.85 16.05 L93.6 16.05 L93.6 18.05 L32.85 18.05 Z M93.6 16.05 L81.6 17.05 L87.6 11.05 Z",
          "bounds": [
            32.85,
            11.05,
            93.6,
            18.05
          ],
          "direction": "right",
          "weight": 60.775
        }
      ],
      [
        {
          "outline": "M44.05 25.6 L44.05 53.25 L38.05 56.25 L38.05 22.6 Z",
          "bounds": [
            38.05,
            22.6,
            44.05,
            56.25
          ],
          "direction": "down",
          "weight": 19.621875
        }
      ],
      [
        {
          "outline": "M41.05 25.6 L85.4 25.6 L85.4 27.6 L41.05 27.6 Z M88.4 26.6 L88.4 50.25 L82.4 50.25 L82.4 26.6 Z M82.4 25.6 L85.4 23.1 L90.9 27.6 L88.4 29.6 L82.4 26.6 Z",
          "bounds": [
            41.05,
            23.1,
            90.9,
            50.25
          ],
          "direction": "curve",
          "weight": 63.951875,
          "revealPath": "M41.085 26.6484375 L85.415 26.6484375 L85.415 46.2703125",
          "revealWidth": 14
        },
        {
          "outline": "M88.4 50.25 L82.4 53.25 L82.4 50.25 Z",
          "bounds": [
            82.4,
            50.25,
            88.4,
            53.25
          ],
          "direction": "down",
          "weight": 3
        }
      ],
      [
        {
          "outline": "M41.05 35.45 L85.4 35.45 L85.4 37.45 L41.05 37.45 Z",
          "bounds": [
            41.05,
            35.45,
            85.4,
            37.45
          ],
          "direction": "right",
          "weight": 44.33
        }
      ],
      [
        {
          "outline": "M58.7 7.5 L58.7 47.25 L52.7 47.25 L52.7 6.5 Z M58.7 7.5 L60.2 8.5 L57.7 10 Z",
          "bounds": [
            52.7,
            6.5,
            60.2,
            47.25
          ],
          "direction": "down",
          "weight": 39.24375
        }
      ],
      [
        {
          "outline": "M73.75 7.5 L73.75 47.25 L67.75 47.25 L67.75 6.5 Z M73.75 7.5 L75.25 8.5 L72.75 10 Z",
          "bounds": [
            67.75,
            6.5,
            75.25,
            47.25
          ],
          "direction": "down",
          "weight": 39.24375
        }
      ],
      [
        {
          "outline": "M41.05 45.25 L85.4 45.25 L85.4 47.25 L41.05 47.25 Z",
          "bounds": [
            41.05,
            45.25,
            85.4,
            47.25
          ],
          "direction": "right",
          "weight": 44.33
        }
      ],
      [
        {
          "outline": "M50.1 53.75 L50.1 80.85 L44.1 83.85 L44.1 50.75 Z",
          "bounds": [
            44.1,
            50.75,
            50.1,
            83.85
          ],
          "direction": "down",
          "weight": 21.58065
        }
      ],
      [
        {
          "outline": "M47.1 53.75 L79.7 53.75 L79.7 55.75 L47.1 55.75 Z M82.7 54.75 L82.7 79.35 L76.7 82.35 L76.7 54.75 Z M76.7 53.75 L79.7 51.25 L85.2 55.75 L82.7 57.75 L76.7 54.75 Z",
          "bounds": [
            47.1,
            51.25,
            85.2,
            82.35
          ],
          "direction": "curve",
          "weight": 54.197104,
          "revealPath": "M47.120523065 54.78205 L79.736976935 54.78205 L79.736976935 76.36269999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M47.1 64.25 L79.7 64.25 L79.7 66.25 L47.1 66.25 Z",
          "bounds": [
            47.1,
            64.25,
            79.7,
            66.25
          ],
          "direction": "right",
          "weight": 32.616454
        }
      ],
      [
        {
          "outline": "M47.1 75.35 L79.7 75.35 L79.7 77.35 L47.1 77.35 Z",
          "bounds": [
            47.1,
            75.35,
            79.7,
            77.35
          ],
          "direction": "right",
          "weight": 32.616454
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
    "pathsSha256": "d7b06f5b36b3a4bc72c736f897fed51c2de1949873936369358df8f0298ba551",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/906D.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/906D.svg",
      "dictionarySvgSha256": "a0c16b59c881757d3704faa7765c6edde1b7243e96fff24b63541cee36084c7e",
      "dictionaryDirectionStrokes": "국내15 정적대응은 초기 오판4/5/6 교정 후 확정, 공식15macro45 별도. K 원30Punion 보존/3tail 새분할 및15foot 새내부시계. 모든시점·원미세시간·제품UI 승인은 별개.",
      "orderReviewSha256": "034da9edc9fa82ec75728c87caf0cdd1ec59fa4045808568721f1d620a6257f6",
      "geometryReviewSha256": "294375e7ae2371b1e21079d225d019febd2bf8cd1b911e148a8e9be29c14b57b",
      "directionReviewSha256": "618452d8216232806b48675a2c7521815d7129e970d4126981e3144cd65158b3"
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
export function loadGlyphWikiBatch1391Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1391 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1391_STROKES:ReturnType<typeof loadGlyphWikiBatch1391Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1391_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1391_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1391_ASSIGNMENT_PROVISIONAL=true

export const GLYPHWIKI_BATCH1391_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u906d-activation-review.json","SHA256":"294375e7ae2371b1e21079d225d019febd2bf8cd1b911e148a8e9be29c14b57b"})
