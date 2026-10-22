import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** Preparation flags stay false; ROOT finite native approval is separately pinned. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; fixed closure3; no current-latest claim","editableSource":"/hanja-strokes/glyphwiki/u9654.json","modifications":"原11raw12calls25P/guide/幅/weight保全。国内9画10mask、caps6+source-foot6m2の新表示clock。ROOT76有限画面、公式microclock/全frame/APPUI承認ではない。"}}
const CORE: Omit<HanjaDictionaryStrokeData,'geometryLicense'>[] = [
  {
    "glyph": "陔",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "a48741d80ae5f1cb1f9d3e3faafa8ee78fe51c4ad647da0378ee74789900b8aa",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      4,
      5,
      6,
      7,
      9,
      10,
      11
    ],
    "pathsSha256": "813d3c503239e259972ebdca78a30a318f780e8efa508a399fce044ba6b0e6ce",
    "paths": [
      "M14.5 13 L36 13 L36 15 L14.5 15 Z M38.8 14.9 L37.9 17.1 L36.85 19.3 L35.65 21.6 L34.4 23.85 L33 26.2 L31.45 28.55 L29.8 30.95 L28 33.4 L26 35.8 L23.85 38.2 L23.1 37.75 L24.4 34.8 L25.7 32 L26.95 29.3 L28.15 26.75 L29.2 24.25 L30.2 21.85 L31.1 19.5 L31.9 17.25 L32.55 15.1 L33.15 13.05 Z M33 13 L36 10.5 L41.5 15 L39 16.5 L33 19 Z",
      "M24.15 37.5 L27 39.55 L29.45 41.8 L31.55 44.15 L33.3 46.65 L34.75 49.25 L35.9 51.9 L36.65 54.7 L37.05 57.5 L37.1 60.4 L36.8 63.35 L30.35 61.85 L30.9 59.75 L31.15 57.6 L31.2 55.45 L30.95 53.25 L30.4 50.95 L29.6 48.6 L28.5 46.15 L27.1 43.6 L25.45 40.95 L23.5 38.15 Z M30.35 61.85 L36.8 63.35 L28.85 68.5 Z M36.5 63.25 L36.15 64.5 L35.7 65.65 L35.05 66.75 L34.3 67.75 L33.35 68.6 L32.35 69.3 L31.2 69.85 L30 70.2 L28.75 70.4 L27.5 70.5 L27.45 64.5 L28.1 64.45 L28.65 64.35 L29.05 64.25 L29.4 64.1 L29.65 63.9 L29.85 63.7 L30.1 63.4 L30.3 63.05 L30.5 62.55 L30.65 61.95 Z M27.5 67.5 L22.5 66 L22.5 64.5 L27.5 64.5 Z",
      "M17.5 13 L17.5 91.5 L11.5 94.5 L11.5 10 Z",
      "M67.5 8 L67.5 23.5 L61.5 23.5 L61.5 7 Z M67.5 8 L69 9 L66.5 10.5 Z",
      "M38 21.5 L93.5 21.5 L93.5 23.5 L38 23.5 Z M93.5 21.5 L81.5 22.5 L87.5 16.5 Z",
      "M65.45 26.75 L64.35 28.5 L63.15 30.2 L61.9 31.9 L60.5 33.6 L59.05 35.3 L57.55 36.95 L55.9 38.6 L54.15 40.2 L52.25 41.75 L50.3 43.3 L49.65 42.65 L51 40.6 L52.25 38.6 L53.5 36.65 L54.65 34.75 L55.75 32.9 L56.8 31.05 L57.75 29.25 L58.6 27.5 L59.35 25.8 L60.05 24.1 Z M59.85 24.55 L60.35 23.55 L65.45 26.75 Z M65.45 26.75 L66.35 28.35 L63.4 28.55 Z M39.6 35.75 L41.85 36.45 L44.05 37.25 L46.15 38.2 L48.1 39.3 L50 40.55 L51.8 41.95 L53.45 43.45 L55 45.05 L56.5 46.8 L57.85 48.7 L52.65 51.65 L51.75 49.95 L50.8 48.25 L49.75 46.65 L48.6 45.1 L47.3 43.6 L45.9 42.15 L44.4 40.7 L42.8 39.3 L41.1 37.9 L39.25 36.6 Z M57.85 48.7 L58.1 50.95 L56.7 52.8 L54.45 53.05 L52.65 51.65 Z",
      "M82.7 36.05 L78.95 41.25 L74.95 46.25 L70.65 50.95 L66.15 55.4 L61.45 59.55 L56.45 63.45 L51.25 67.05 L45.8 70.3 L40.1 73.3 L34.2 75.9 L33.75 75.05 L39.2 71.65 L44.4 68.05 L49.35 64.35 L54.1 60.45 L58.6 56.35 L62.9 52.1 L66.95 47.55 L70.75 42.85 L74.35 37.9 L77.7 32.75 Z M77.4 33.2 L77.95 32.35 L82.7 36.05 Z M82.7 36.05 L83.45 37.7 L80.5 37.6 Z",
      "M89.1 54.15 L84.4 59.95 L79.45 65.3 L74.3 70.35 L68.85 74.95 L63.15 79.15 L57.25 82.95 L51.05 86.4 L44.65 89.35 L38 91.85 L31.1 93.9 L30.85 93.05 L37.3 90.1 L43.5 86.95 L49.45 83.5 L55.2 79.8 L60.65 75.75 L65.85 71.4 L70.8 66.7 L75.55 61.65 L80 56.3 L84.25 50.6 Z M83.95 51 L84.5 50.3 L89.1 54.15 Z M89.1 54.15 L89.7 55.85 L86.8 55.6 Z",
      "M70.1 71.8 L72.65 72.6 L75.1 73.6 L77.4 74.75 L79.65 76.15 L81.8 77.65 L83.85 79.25 L85.8 81.05 L87.65 82.9 L89.45 84.95 L91.15 87.05 L86.15 90.4 L84.9 88.3 L83.55 86.35 L82.1 84.4 L80.6 82.6 L79 80.8 L77.3 79.1 L75.5 77.45 L73.65 75.85 L71.7 74.25 L69.7 72.6 Z M91.15 87.05 L91.55 89.3 L90.3 91.2 L88.05 91.65 L86.15 90.4 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M14.5 13 L36 13 L36 15 L14.5 15 Z M38.8 14.9 L37.9 17.1 L36.85 19.3 L35.65 21.6 L34.4 23.85 L33 26.2 L31.45 28.55 L29.8 30.95 L28 33.4 L26 35.8 L23.85 38.2 L23.1 37.75 L24.4 34.8 L25.7 32 L26.95 29.3 L28.15 26.75 L29.2 24.25 L30.2 21.85 L31.1 19.5 L31.9 17.25 L32.55 15.1 L33.15 13.05 Z M33 13 L36 10.5 L41.5 15 L39 16.5 L33 19 Z",
          "bounds": [
            14.5,
            10.5,
            41.5,
            38.2
          ],
          "direction": "curve",
          "weight": 48.560118,
          "revealPath": "M14.5 14 L36 14 Q32.5 24.5 23.5 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M24.15 37.5 L27 39.55 L29.45 41.8 L31.55 44.15 L33.3 46.65 L34.75 49.25 L35.9 51.9 L36.65 54.7 L37.05 57.5 L37.1 60.4 L36.8 63.35 L30.35 61.85 L30.9 59.75 L31.15 57.6 L31.2 55.45 L30.95 53.25 L30.4 50.95 L29.6 48.6 L28.5 46.15 L27.1 43.6 L25.45 40.95 L23.5 38.15 Z M30.35 61.85 L36.8 63.35 L28.85 68.5 Z M36.5 63.25 L36.15 64.5 L35.7 65.65 L35.05 66.75 L34.3 67.75 L33.35 68.6 L32.35 69.3 L31.2 69.85 L30 70.2 L28.75 70.4 L27.5 70.5 L27.45 64.5 L28.1 64.45 L28.65 64.35 L29.05 64.25 L29.4 64.1 L29.65 63.9 L29.85 63.7 L30.1 63.4 L30.3 63.05 L30.5 62.55 L30.65 61.95 Z M27.5 67.5 L22.5 66 L22.5 64.5 L27.5 64.5 Z",
          "bounds": [
            22.5,
            37.5,
            37.1,
            70.5
          ],
          "direction": "curve",
          "weight": 34.904276,
          "revealPath": "M23.5 37.5 Q36.5 50 33.6141240075107 62.625707467140664 Q32.5 67.5 27.5 67.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M17.5 13 L17.5 91.5 L11.5 94.5 L11.5 10 Z",
          "bounds": [
            11.5,
            10,
            17.5,
            94.5
          ],
          "direction": "down",
          "weight": 79
        }
      ],
      [
        {
          "outline": "M67.5 8 L67.5 23.5 L61.5 23.5 L61.5 7 Z M67.5 8 L69 9 L66.5 10.5 Z",
          "bounds": [
            61.5,
            7,
            69,
            23.5
          ],
          "direction": "down",
          "weight": 15
        }
      ],
      [
        {
          "outline": "M38 21.5 L93.5 21.5 L93.5 23.5 L38 23.5 Z M93.5 21.5 L81.5 22.5 L87.5 16.5 Z",
          "bounds": [
            38,
            16.5,
            93.5,
            23.5
          ],
          "direction": "right",
          "weight": 55.5
        }
      ],
      [
        {
          "outline": "M65.45 26.75 L64.35 28.5 L63.15 30.2 L61.9 31.9 L60.5 33.6 L59.05 35.3 L57.55 36.95 L55.9 38.6 L54.15 40.2 L52.25 41.75 L50.3 43.3 L49.65 42.65 L51 40.6 L52.25 38.6 L53.5 36.65 L54.65 34.75 L55.75 32.9 L56.8 31.05 L57.75 29.25 L58.6 27.5 L59.35 25.8 L60.05 24.1 Z M59.85 24.55 L60.35 23.55 L65.45 26.75 Z M65.45 26.75 L66.35 28.35 L63.4 28.55 Z",
          "bounds": [
            49.65,
            23.55,
            66.35,
            43.3
          ],
          "direction": "curve",
          "weight": 22.203603,
          "revealPath": "M63 25 Q58.5 34 50 43",
          "revealWidth": 14
        },
        {
          "outline": "M39.6 35.75 L41.85 36.45 L44.05 37.25 L46.15 38.2 L48.1 39.3 L50 40.55 L51.8 41.95 L53.45 43.45 L55 45.05 L56.5 46.8 L57.85 48.7 L52.65 51.65 L51.75 49.95 L50.8 48.25 L49.75 46.65 L48.6 45.1 L47.3 43.6 L45.9 42.15 L44.4 40.7 L42.8 39.3 L41.1 37.9 L39.25 36.6 Z M57.85 48.7 L58.1 50.95 L56.7 52.8 L54.45 53.05 L52.65 51.65 Z",
          "bounds": [
            39.25,
            35.75,
            58.1,
            53.05
          ],
          "direction": "curve",
          "weight": 23.005434,
          "revealPath": "M39 36 Q50 41 56 51.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M82.7 36.05 L78.95 41.25 L74.95 46.25 L70.65 50.95 L66.15 55.4 L61.45 59.55 L56.45 63.45 L51.25 67.05 L45.8 70.3 L40.1 73.3 L34.2 75.9 L33.75 75.05 L39.2 71.65 L44.4 68.05 L49.35 64.35 L54.1 60.45 L58.6 56.35 L62.9 52.1 L66.95 47.55 L70.75 42.85 L74.35 37.9 L77.7 32.75 Z M77.4 33.2 L77.95 32.35 L82.7 36.05 Z M82.7 36.05 L83.45 37.7 L80.5 37.6 Z",
          "bounds": [
            33.75,
            32.35,
            83.45,
            75.9
          ],
          "direction": "curve",
          "weight": 62.325757,
          "revealPath": "M80.5 34 Q63 61 34 75.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M89.1 54.15 L84.4 59.95 L79.45 65.3 L74.3 70.35 L68.85 74.95 L63.15 79.15 L57.25 82.95 L51.05 86.4 L44.65 89.35 L38 91.85 L31.1 93.9 L30.85 93.05 L37.3 90.1 L43.5 86.95 L49.45 83.5 L55.2 79.8 L60.65 75.75 L65.85 71.4 L70.8 66.7 L75.55 61.65 L80 56.3 L84.25 50.6 Z M83.95 51 L84.5 50.3 L89.1 54.15 Z M89.1 54.15 L89.7 55.85 L86.8 55.6 Z",
          "bounds": [
            30.85,
            50.3,
            89.7,
            93.9
          ],
          "direction": "curve",
          "weight": 69.701148,
          "revealPath": "M87 52 Q65 82 31 93.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M70.1 71.8 L72.65 72.6 L75.1 73.6 L77.4 74.75 L79.65 76.15 L81.8 77.65 L83.85 79.25 L85.8 81.05 L87.65 82.9 L89.45 84.95 L91.15 87.05 L86.15 90.4 L84.9 88.3 L83.55 86.35 L82.1 84.4 L80.6 82.6 L79 80.8 L77.3 79.1 L75.5 77.45 L73.65 75.85 L71.7 74.25 L69.7 72.6 Z M91.15 87.05 L91.55 89.3 L90.3 91.2 L88.05 91.65 L86.15 90.4 Z",
          "bounds": [
            69.7,
            71.8,
            91.55,
            91.65
          ],
          "direction": "curve",
          "weight": 26.907248,
          "revealPath": "M69.5 72 Q81.5 78 89.5 90",
          "revealWidth": 14
        }
      ]
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9654.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9600/9654.svg",
      "dictionarySvgSha256": "fdf3bae2f3def045766346792d9f6b0fff50cdd72269566a49f88b2b7b94590f",
      "dictionaryDirectionStrokes": "公式9macro27/静的26は別根拠。原11raw12calls25P/guide/幅/weight保全、caps6+foot1 ROOT76有限観察。新foot clockと公式微細clockの同等性、APPUI/controller/storage/全時間の承認なし。",
      "orderReviewSha256": "05357130bc0b5f5c0ab44c517f3937b3902574a10ccb6e5351ba6f74a66b9986",
      "geometryReviewSha256": "fb8d11e274c7fcc2157db3d85b66d4b10f8b7711dea506f517f7c082d683eca0",
      "directionReviewSha256": "89db11fe58bc1855e11128e641509c224e6b08021b34e308d715ccb2020b5438"
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
export function loadGlyphWikiBatch1401Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1401 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1401_STROKES:ReturnType<typeof loadGlyphWikiBatch1401Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1401_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1401_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1401_ASSIGNMENT_PROVISIONAL=true
export const GLYPHWIKI_BATCH1401_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u9654-activation-review.json","SHA256":"fb8d11e274c7fcc2157db3d85b66d4b10f8b7711dea506f517f7c082d683eca0"})
