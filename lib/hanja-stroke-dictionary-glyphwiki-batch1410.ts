import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** Historical preparation flags remain false; ROOT finite approval is separately pinned. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"Pinned2016 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; exact u727c/u725c-01/u5de0-02 closure, no latest substitution.","editableSource":"/hanja-strokes/glyphwiki/u727c.json","modifications":"Original15raw14drawingcalls32 filled polygons/full5 preserved, zero raw4 retained. Domestic11pens14masks. Five exact initial caps and three exact source-foot connected-prefix policies with explicit new inner display clock; no added connector or changed guide/width/weight. ROOT98 finite actual-component native scopes, official33 macroframes and13 static screens. No official microtiming, all-time or product AppUI/controller/storage approval."}}
const CORE: Omit<HanjaDictionaryStrokeData,'geometryLicense'>[] = [
  {
    "glyph": "牼",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "f74f1d38f89bcfb619cc7875fd3133807f6c4c2f80b05a7edc34c097e6c769a9",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      6,
      7,
      9,
      11,
      13,
      14,
      15
    ],
    "pathsSha256": "da302ff0497c4cc009d3e47abf22157019ef95fe748f277576e412f073acfe0a",
    "paths": [
      "M18.75 14.75 L18.15 19.05 L17.45 23.25 L16.6 27.3 L15.65 31.25 L14.6 35.1 L13.4 38.8 L12.1 42.35 L10.65 45.8 L9.05 49.05 L7.2 52.15 L6.4 51.8 L7.25 48.35 L8.15 44.9 L8.95 41.4 L9.75 37.8 L10.45 34.1 L11.1 30.3 L11.65 26.45 L12.1 22.45 L12.5 18.4 L12.8 14.2 Z M12.75 14.7 L12.9 13.1 L18.75 14.75 Z M18.75 14.75 L20.15 15.9 L17.55 17.15 Z",
      "M12.95 31 L41.65 31 L41.65 33 L12.95 33 Z M41.65 31 L29.65 32 L35.65 26 Z",
      "M29.1 7.5 L29.1 91.5 L23.1 94.5 L23.1 6.5 Z M29.1 7.5 L30.6 8.5 L28.1 10 Z",
      "M7.3 63 L10.1 62 L13.05 60.9 L16.1 59.8 L19.25 58.65 L22.5 57.45 L25.85 56.3 L29.35 55.05 L33 53.85 L36.75 52.7 L40.65 51.55 L41 52.4 L37.5 54.45 L34.05 56.3 L30.65 58.1 L27.35 59.75 L24.15 61.4 L21.05 62.9 L18.05 64.4 L15.15 65.85 L12.35 67.2 L9.7 68.55 Z M9.7 68.55 L6.4 63.4 L7.3 63 Z M9.7 68.55 L11.85 65.95 L11.2 69.5 Z",
      "M38.9 13 L93.1 13 L93.1 15 L38.9 15 Z M93.1 13 L81.1 14 L87.1 8 Z",
      "M55 23.45 L53.85 24.95 L52.7 26.45 L51.5 27.95 L50.2 29.5 L48.9 31.1 L47.5 32.7 L46.05 34.3 L44.5 35.95 L42.9 37.55 L41.25 39.25 L40.5 38.7 L41.6 36.6 L42.55 34.55 L43.55 32.6 L44.55 30.7 L45.55 28.8 L46.5 27.05 L47.4 25.3 L48.25 23.6 L49.1 21.95 L49.9 20.35 Z M49.6 20.75 L50.15 19.9 L55 23.45 Z M55 23.45 L55.75 25.1 L52.85 25.1 Z M41.05 37.95 L43.05 39.25 L45.05 40.55 L46.85 42 L48.55 43.5 L50.15 45.1 L51.7 46.7 L53.1 48.4 L54.4 50.15 L55.6 52 L56.75 53.85 L51.3 56.4 L50.6 54.65 L49.85 52.85 L49 51.1 L48 49.35 L46.95 47.6 L45.85 45.85 L44.6 44.1 L43.3 42.3 L41.95 40.45 L40.45 38.65 Z M56.75 53.85 L56.8 56.15 L55.3 57.85 L53 57.9 L51.3 56.4 Z",
      "M71.75 23.45 L70.6 24.95 L69.45 26.45 L68.25 27.95 L66.95 29.5 L65.65 31.1 L64.25 32.7 L62.8 34.3 L61.25 35.95 L59.65 37.55 L58 39.25 L57.25 38.7 L58.3 36.6 L59.3 34.55 L60.3 32.6 L61.3 30.7 L62.3 28.8 L63.2 27.05 L64.15 25.3 L65 23.6 L65.85 21.95 L66.6 20.35 Z M66.35 20.75 L66.9 19.9 L71.75 23.45 Z M71.75 23.45 L72.5 25.1 L69.55 25.1 Z M57.8 37.95 L59.8 39.25 L61.75 40.55 L63.6 42 L65.3 43.5 L66.9 45.1 L68.4 46.7 L69.85 48.4 L71.15 50.15 L72.35 52 L73.5 53.85 L68.05 56.4 L67.35 54.65 L66.6 52.85 L65.7 51.1 L64.75 49.35 L63.7 47.6 L62.55 45.85 L61.35 44.1 L60.05 42.3 L58.7 40.45 L57.2 38.65 Z M73.5 53.85 L73.55 56.15 L72.05 57.85 L69.75 57.9 L68.05 56.4 Z",
      "M88.5 23.45 L87.35 24.95 L86.15 26.45 L84.9 28 L83.6 29.55 L82.25 31.15 L80.8 32.75 L79.3 34.35 L77.7 36 L75.95 37.6 L74.25 39.25 L73.5 38.7 L74.65 36.6 L75.75 34.55 L76.85 32.55 L77.9 30.65 L78.9 28.8 L79.9 27 L80.85 25.25 L81.75 23.55 L82.6 21.9 L83.35 20.35 Z M83.1 20.75 L83.65 19.9 L88.5 23.45 Z M88.5 23.45 L89.25 25.1 L86.3 25.1 Z M74.05 37.9 L76.15 39.1 L78.2 40.3 L80.1 41.6 L81.95 43 L83.65 44.45 L85.3 46 L86.85 47.6 L88.3 49.2 L89.7 50.9 L90.95 52.65 L85.8 55.7 L84.95 54 L84 52.3 L82.95 50.6 L81.85 48.9 L80.65 47.25 L79.35 45.55 L78 43.85 L76.6 42.15 L75.1 40.4 L73.5 38.65 Z M90.95 52.65 L91.25 54.9 L89.9 56.75 L87.65 57.05 L85.8 55.7 Z",
      "M41.35 65.5 L90.6 65.5 L90.6 67.5 L41.35 67.5 Z M90.6 65.5 L78.6 66.5 L84.6 60.5 Z",
      "M69 65.5 L69 89.5 L63 89.5 L63 65.5 Z",
      "M37.45 87.5 L93.55 87.5 L93.55 89.5 L37.45 89.5 Z M93.55 87.5 L81.55 88.5 L87.55 82.5 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M18.75 14.75 L18.15 19.05 L17.45 23.25 L16.6 27.3 L15.65 31.25 L14.6 35.1 L13.4 38.8 L12.1 42.35 L10.65 45.8 L9.05 49.05 L7.2 52.15 L6.4 51.8 L7.25 48.35 L8.15 44.9 L8.95 41.4 L9.75 37.8 L10.45 34.1 L11.1 30.3 L11.65 26.45 L12.1 22.45 L12.5 18.4 L12.8 14.2 Z M12.75 14.7 L12.9 13.1 L18.75 14.75 Z M18.75 14.75 L20.15 15.9 L17.55 17.15 Z",
          "bounds": [
            6.4,
            13.1,
            20.15,
            52.15
          ],
          "direction": "curve",
          "weight": 39.055863,
          "revealPath": "M15.85 14 Q13.8 36 6.83 52",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M12.95 31 L41.65 31 L41.65 33 L12.95 33 Z M41.65 31 L29.65 32 L35.65 26 Z",
          "bounds": [
            12.95,
            26,
            41.65,
            33
          ],
          "direction": "right",
          "weight": 28.7
        }
      ],
      [
        {
          "outline": "M29.1 7.5 L29.1 91.5 L23.1 94.5 L23.1 6.5 Z M29.1 7.5 L30.6 8.5 L28.1 10 Z",
          "bounds": [
            23.1,
            6.5,
            30.6,
            94.5
          ],
          "direction": "down",
          "weight": 86
        }
      ],
      [
        {
          "outline": "M7.3 63 L10.1 62 L13.05 60.9 L16.1 59.8 L19.25 58.65 L22.5 57.45 L25.85 56.3 L29.35 55.05 L33 53.85 L36.75 52.7 L40.65 51.55 L41 52.4 L37.5 54.45 L34.05 56.3 L30.65 58.1 L27.35 59.75 L24.15 61.4 L21.05 62.9 L18.05 64.4 L15.15 65.85 L12.35 67.2 L9.7 68.55 Z M9.7 68.55 L6.4 63.4 L7.3 63 Z M9.7 68.55 L11.85 65.95 L11.2 69.5 Z",
          "bounds": [
            6.4,
            51.55,
            41,
            69.5
          ],
          "direction": "curve",
          "weight": 35.662866,
          "revealPath": "M8.059999999999999 66 Q22 60 40.86 52",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M38.9 13 L93.1 13 L93.1 15 L38.9 15 Z M93.1 13 L81.1 14 L87.1 8 Z",
          "bounds": [
            38.9,
            8,
            93.1,
            15
          ],
          "direction": "right",
          "weight": 54.175
        }
      ],
      [
        {
          "outline": "M55 23.45 L53.85 24.95 L52.7 26.45 L51.5 27.95 L50.2 29.5 L48.9 31.1 L47.5 32.7 L46.05 34.3 L44.5 35.95 L42.9 37.55 L41.25 39.25 L40.5 38.7 L41.6 36.6 L42.55 34.55 L43.55 32.6 L44.55 30.7 L45.55 28.8 L46.5 27.05 L47.4 25.3 L48.25 23.6 L49.1 21.95 L49.9 20.35 Z M49.6 20.75 L50.15 19.9 L55 23.45 Z M55 23.45 L55.75 25.1 L52.85 25.1 Z",
          "bounds": [
            40.5,
            19.9,
            55.75,
            39.25
          ],
          "direction": "curve",
          "weight": 21.117822,
          "revealPath": "M52.72 21.5 Q47.795 29.5 40.9 39",
          "revealWidth": 14
        },
        {
          "outline": "M41.05 37.95 L43.05 39.25 L45.05 40.55 L46.85 42 L48.55 43.5 L50.15 45.1 L51.7 46.7 L53.1 48.4 L54.4 50.15 L55.6 52 L56.75 53.85 L51.3 56.4 L50.6 54.65 L49.85 52.85 L49 51.1 L48 49.35 L46.95 47.6 L45.85 45.85 L44.6 44.1 L43.3 42.3 L41.95 40.45 L40.45 38.65 Z M56.75 53.85 L56.8 56.15 L55.3 57.85 L53 57.9 L51.3 56.4 Z",
          "bounds": [
            40.45,
            37.95,
            56.8,
            57.9
          ],
          "direction": "curve",
          "weight": 23.371774,
          "revealPath": "M40.4075 38 Q49.765 46 54.69 56.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M71.75 23.45 L70.6 24.95 L69.45 26.45 L68.25 27.95 L66.95 29.5 L65.65 31.1 L64.25 32.7 L62.8 34.3 L61.25 35.95 L59.65 37.55 L58 39.25 L57.25 38.7 L58.3 36.6 L59.3 34.55 L60.3 32.6 L61.3 30.7 L62.3 28.8 L63.2 27.05 L64.15 25.3 L65 23.6 L65.85 21.95 L66.6 20.35 Z M66.35 20.75 L66.9 19.9 L71.75 23.45 Z M71.75 23.45 L72.5 25.1 L69.55 25.1 Z",
          "bounds": [
            57.25,
            19.9,
            72.5,
            39.25
          ],
          "direction": "curve",
          "weight": 21.117822,
          "revealPath": "M69.465 21.5 Q64.53999999999999 29.5 57.645 39",
          "revealWidth": 14
        },
        {
          "outline": "M57.8 37.95 L59.8 39.25 L61.75 40.55 L63.6 42 L65.3 43.5 L66.9 45.1 L68.4 46.7 L69.85 48.4 L71.15 50.15 L72.35 52 L73.5 53.85 L68.05 56.4 L67.35 54.65 L66.6 52.85 L65.7 51.1 L64.75 49.35 L63.7 47.6 L62.55 45.85 L61.35 44.1 L60.05 42.3 L58.7 40.45 L57.2 38.65 Z M73.5 53.85 L73.55 56.15 L72.05 57.85 L69.75 57.9 L68.05 56.4 Z",
          "bounds": [
            57.2,
            37.95,
            73.55,
            57.9
          ],
          "direction": "curve",
          "weight": 23.371774,
          "revealPath": "M57.1525 38 Q66.51 46 71.435 56.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M88.5 23.45 L87.35 24.95 L86.15 26.45 L84.9 28 L83.6 29.55 L82.25 31.15 L80.8 32.75 L79.3 34.35 L77.7 36 L75.95 37.6 L74.25 39.25 L73.5 38.7 L74.65 36.6 L75.75 34.55 L76.85 32.55 L77.9 30.65 L78.9 28.8 L79.9 27 L80.85 25.25 L81.75 23.55 L82.6 21.9 L83.35 20.35 Z M83.1 20.75 L83.65 19.9 L88.5 23.45 Z M88.5 23.45 L89.25 25.1 L86.3 25.1 Z",
          "bounds": [
            73.5,
            19.9,
            89.25,
            39.25
          ],
          "direction": "curve",
          "weight": 21.397375,
          "revealPath": "M86.21 21.5 Q81.285 29.5 73.8975 39",
          "revealWidth": 14
        },
        {
          "outline": "M74.05 37.9 L76.15 39.1 L78.2 40.3 L80.1 41.6 L81.95 43 L83.65 44.45 L85.3 46 L86.85 47.6 L88.3 49.2 L89.7 50.9 L90.95 52.65 L85.8 55.7 L84.95 54 L84 52.3 L82.95 50.6 L81.85 48.9 L80.65 47.25 L79.35 45.55 L78 43.85 L76.6 42.15 L75.1 40.4 L73.5 38.65 Z M90.95 52.65 L91.25 54.9 L89.9 56.75 L87.65 57.05 L85.8 55.7 Z",
          "bounds": [
            73.5,
            37.9,
            91.25,
            57.05
          ],
          "direction": "curve",
          "weight": 23.550533,
          "revealPath": "M73.405 38 Q83.255 45.5 89.165 55.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M41.35 65.5 L90.6 65.5 L90.6 67.5 L41.35 67.5 Z M90.6 65.5 L78.6 66.5 L84.6 60.5 Z",
          "bounds": [
            41.35,
            60.5,
            90.6,
            67.5
          ],
          "direction": "right",
          "weight": 49.25
        }
      ],
      [
        {
          "outline": "M69 65.5 L69 89.5 L63 89.5 L63 65.5 Z",
          "bounds": [
            63,
            65.5,
            69,
            89.5
          ],
          "direction": "down",
          "weight": 22
        }
      ],
      [
        {
          "outline": "M37.45 87.5 L93.55 87.5 L93.55 89.5 L37.45 89.5 Z M93.55 87.5 L81.55 88.5 L87.55 82.5 Z",
          "bounds": [
            37.45,
            82.5,
            93.55,
            89.5
          ],
          "direction": "right",
          "weight": 56.145
        }
      ]
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/727c.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7200/727c.svg",
      "dictionarySvgSha256": "1d613dce62104d1a23f7a3d2346b735221b336821197d407ae313ccd0c3f85d6",
      "dictionaryDirectionStrokes": "Fresh official11 strokes ×.1/.5/.75=33 macroframes, static11 numbered pairs+whole2=13 screens. ROOT98 finite actual-component native scopes. No official microtiming or all-time/product AppUI approval.",
      "orderReviewSha256": "52eb77d51a1654bdd41e21020999679cdab32c12f90e76f358759185e47f5100",
      "directionReviewSha256": "3981f038ca698a3120fe7ae2fef754befb3ad978b98ad30de9248f8469f0d0d6",
      "geometryReviewSha256": "d166351f0b61968574ea7e87b2c174b3de08c538b075aa4bbab769d82db91240"
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
export function loadGlyphWikiBatch1410Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1410 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1410_STROKES:ReturnType<typeof loadGlyphWikiBatch1410Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1410_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1410_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1410_ASSIGNMENT_PROVISIONAL=true
export const GLYPHWIKI_BATCH1410_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u727c-activation-review.json","SHA256":"d166351f0b61968574ea7e87b2c174b3de08c538b075aa4bbab769d82db91240"})
