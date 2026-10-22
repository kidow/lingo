/**
 * 薯 corrected pen15: historical primitive plus strict isolated component binding below.
 * Original M=(69,136.6725) is strict interior of target P and prior raw14 P.
 * P is convex. H=P∩{y<=M.y}; three fan triangles share M and exactly tile H.
 * A single outer H homothety avoids internal triangle AA seams. For every real
 * 0<u<=1 it is nested inside H and connected to the already inked prior P.
 * After H completes, P∩{y<=M.y+u(maxY-M.y)} is convex, nested and contains H.
 * p=0 emits no path; p=1 uses original P directly. No new glyph ink/connector.
 * Total original weight remains 17.766375. Only the new mask's internal clock
 * allocates area(H)/area(P)=2029/21040 to the head phase. This is not old timing.
 * Ideal source geometry proof is separate from UA raster/AA and brush shape.
 */
export type U85afCapPoint = readonly [number, number]
export type U85afSourceCapContext = Readonly<{ kind: 'source-cap-u85af-prototype'; sourceFields: unknown }>
export type U85afSourceCapFrame = Readonly<{
  phase: 'empty' | 'head' | 'body' | 'original'
  progress: number
  maskPath: string | null
  maskPoints: readonly U85afCapPoint[]
  originalInkDirect: boolean
  originalInkPath: string
  coordinateUnits: 'original-source-200'
  productCoordinateScale: 0.5
  originalWeight: 17.766375
}>
const EXPECTED_SOURCE = {
  "sourceRoot": "u85af-k",
  "bodyFileSHA256": "ff35daefae38ee8a4b1c86ce484d65323c2b091b93a457a207713527c955326f",
  "correctedSourceOrderModuleSHA256": "cad610af2f9d6793a7987063a23ae55a5e7cd324e7e6aec83651b998b29774f5",
  "correctedGeometrySHA256": "3f6487e78a2610278918da4b685c1be48f13ea755898d1eb0fb5eb70eb71544a",
  "targetLogicalPen": 15,
  "targetRawOneBased": 15,
  "priorLogicalPen": 13,
  "priorRawOneBased": 14,
  "targetGroup": {
    "raw": [
      1,
      12,
      113,
      69,
      136.6725,
      69,
      172.20525,
      null,
      null,
      null,
      null
    ],
    "polygons": [
      [
        {
          "x": 75,
          "y": 134.6,
          "off": 0
        },
        {
          "x": 75,
          "y": 181.2,
          "off": 0
        },
        {
          "x": 63,
          "y": 187.2,
          "off": 0
        },
        {
          "x": 63,
          "y": 128.6,
          "off": 0
        }
      ]
    ]
  },
  "targetTrace": [
    {
      "kind": "cdDrawLine",
      "args": [
        69,
        136.6725,
        69,
        172.20525,
        12,
        113
      ],
      "polygons": [
        [
          {
            "x": 75,
            "y": 134.6,
            "off": 0
          },
          {
            "x": 75,
            "y": 181.2,
            "off": 0
          },
          {
            "x": 63,
            "y": 187.2,
            "off": 0
          },
          {
            "x": 63,
            "y": 128.6,
            "off": 0
          }
        ]
      ]
    }
  ],
  "priorGroup": {
    "raw": [
      2,
      0,
      7,
      172,
      82.47,
      112,
      124.02525,
      11,
      155.9445,
      null,
      null
    ],
    "polygons": [
      [
        {
          "x": 174.5,
          "y": 87.9,
          "off": 0
        },
        {
          "x": 161.9,
          "y": 95.9,
          "off": 0
        },
        {
          "x": 148.5,
          "y": 103.7,
          "off": 0
        },
        {
          "x": 134.2,
          "y": 111.2,
          "off": 0
        },
        {
          "x": 119.1,
          "y": 118.5,
          "off": 0
        },
        {
          "x": 103.3,
          "y": 125.6,
          "off": 0
        },
        {
          "x": 86.5,
          "y": 132.4,
          "off": 0
        },
        {
          "x": 69,
          "y": 139,
          "off": 0
        },
        {
          "x": 50.6,
          "y": 145.3,
          "off": 0
        },
        {
          "x": 31.3,
          "y": 151.2,
          "off": 0
        },
        {
          "x": 11.2,
          "y": 156.8,
          "off": 0
        },
        {
          "x": 10.7,
          "y": 155,
          "off": 0
        },
        {
          "x": 30.1,
          "y": 147.6,
          "off": 0
        },
        {
          "x": 48.8,
          "y": 140.2,
          "off": 0
        },
        {
          "x": 66.6,
          "y": 132.9,
          "off": 0
        },
        {
          "x": 83.6,
          "y": 125.4,
          "off": 0
        },
        {
          "x": 99.7,
          "y": 117.8,
          "off": 0
        },
        {
          "x": 115,
          "y": 110.2,
          "off": 0
        },
        {
          "x": 129.5,
          "y": 102.3,
          "off": 0
        },
        {
          "x": 143.1,
          "y": 94.4,
          "off": 0
        },
        {
          "x": 155.8,
          "y": 86.3,
          "off": 0
        },
        {
          "x": 167.7,
          "y": 78.1,
          "off": 0
        }
      ],
      [
        {
          "x": 166.9,
          "y": 78.6,
          "off": 0
        },
        {
          "x": 174.5,
          "y": 87.9,
          "off": 0
        },
        {
          "x": 174.9,
          "y": 87.7,
          "off": 0
        }
      ],
      [
        {
          "x": 174.9,
          "y": 87.7,
          "off": 0
        },
        {
          "x": 175.1,
          "y": 91.2,
          "off": 0
        },
        {
          "x": 169.6,
          "y": 88.9,
          "off": 0
        }
      ]
    ]
  },
  "priorTrace": [
    {
      "kind": "cdDrawCurve",
      "args": [
        172,
        82.47,
        112,
        124.02525,
        11,
        155.9445,
        0,
        7
      ],
      "polygons": [
        [
          {
            "x": 174.5,
            "y": 87.9,
            "off": 0
          },
          {
            "x": 161.9,
            "y": 95.9,
            "off": 0
          },
          {
            "x": 148.5,
            "y": 103.7,
            "off": 0
          },
          {
            "x": 134.2,
            "y": 111.2,
            "off": 0
          },
          {
            "x": 119.1,
            "y": 118.5,
            "off": 0
          },
          {
            "x": 103.3,
            "y": 125.6,
            "off": 0
          },
          {
            "x": 86.5,
            "y": 132.4,
            "off": 0
          },
          {
            "x": 69,
            "y": 139,
            "off": 0
          },
          {
            "x": 50.6,
            "y": 145.3,
            "off": 0
          },
          {
            "x": 31.3,
            "y": 151.2,
            "off": 0
          },
          {
            "x": 11.2,
            "y": 156.8,
            "off": 0
          },
          {
            "x": 10.7,
            "y": 155,
            "off": 0
          },
          {
            "x": 30.1,
            "y": 147.6,
            "off": 0
          },
          {
            "x": 48.8,
            "y": 140.2,
            "off": 0
          },
          {
            "x": 66.6,
            "y": 132.9,
            "off": 0
          },
          {
            "x": 83.6,
            "y": 125.4,
            "off": 0
          },
          {
            "x": 99.7,
            "y": 117.8,
            "off": 0
          },
          {
            "x": 115,
            "y": 110.2,
            "off": 0
          },
          {
            "x": 129.5,
            "y": 102.3,
            "off": 0
          },
          {
            "x": 143.1,
            "y": 94.4,
            "off": 0
          },
          {
            "x": 155.8,
            "y": 86.3,
            "off": 0
          },
          {
            "x": 167.7,
            "y": 78.1,
            "off": 0
          }
        ],
        [
          {
            "x": 166.9,
            "y": 78.6,
            "off": 0
          },
          {
            "x": 174.5,
            "y": 87.9,
            "off": 0
          },
          {
            "x": 174.9,
            "y": 87.7,
            "off": 0
          }
        ],
        [
          {
            "x": 174.9,
            "y": 87.7,
            "off": 0
          },
          {
            "x": 175.1,
            "y": 91.2,
            "off": 0
          },
          {
            "x": 169.6,
            "y": 88.9,
            "off": 0
          }
        ]
      ]
    }
  ],
  "oldMask": {
    "direction": "down",
    "weight": 17.766375,
    "bounds": [
      31.5,
      64.3,
      37.5,
      93.6
    ]
  }
}
function freeze<T>(v:T):T { if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v)} return v }
freeze(EXPECTED_SOURCE)
function same(a:unknown,b:unknown):boolean {
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object')return false
 if(Array.isArray(b)){
  if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false
  return b.every((v,i)=>{const d=Object.getOwnPropertyDescriptor(a,String(i));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&same(d.value,v)})
 }
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const ks=Object.keys(b),o=b as Record<string,unknown>
 return Reflect.ownKeys(a).length===ks.length&&ks.every(k=>{const d=Object.getOwnPropertyDescriptor(a,k);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&same(d.value,o[k])})
}
const M:U85afCapPoint=freeze([69,136.6725] as const)
const P=freeze([[75,134.6],[75,181.2],[63,187.2],[63,128.6]] as const)
const H=freeze([[75,134.6],[75,136.6725],[63,136.6725],[63,128.6]] as const)
const FAN=freeze([[M,P[3],P[0]],[M,P[0],H[1]],[M,H[2],P[3]]] as const)
const HEAD_FRACTION=2029/21040
const path=(ps:readonly U85afCapPoint[])=>ps.length?ps.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ')+' Z':''
const INK_PATH=path(P)
const CONTEXT:U85afSourceCapContext=freeze({kind:'source-cap-u85af-prototype',sourceFields:EXPECTED_SOURCE})
export const U85AF_SOURCE_CAP_PROOF=freeze({
 sourceRoot:'u85af-k',targetLogicalPen:15,targetRawOneBased:15,priorLogicalPen:13,priorRawOneBased:14,
 body3OnlyAuthority:true,actualFull5Claim:false,fullSourceAdapterRequiredBeforeProductUse:true,
 seed:M,originalTarget:P,head:H,fan:FAN,headFraction:[2029,21040],
 doubledAreasScale400:{head:'19478400',target:'201984000',fan:['9739200','1989600','7749600']},
 originalGuide:[69,136.6725,69,172.20525],originalTypeFlags:[1,12,113],
 originalMask:{direction:'down',weight:17.766375,bounds:[31.5,64.3,37.5,93.6]},
 originalGuideWidthWeightAndPUnchanged:true,newMaskInternalClock:true,newGlyphConnector:false,
 nativeApproval:false,runtimeApplied:false
})
export function makeU85afSourceCapContext(input:unknown):U85afSourceCapContext|null {
 if(arguments.length!==1||!same(input,EXPECTED_SOURCE))return null
 return CONTEXT
}
export function frameU85afSourceCap(context:U85afSourceCapContext,progress:number):U85afSourceCapFrame|null {
 if(arguments.length!==2||context!==CONTEXT||!Number.isFinite(progress)||progress<0||progress>1)return null
 let phase:U85afSourceCapFrame['phase'],points:readonly U85afCapPoint[],maskPath:string|null
 if(progress===0){phase='empty';points=[];maskPath=''}
 else if(progress===1){phase='original';points=[];maskPath=null}
 else if(progress<=HEAD_FRACTION){
  phase='head';const u=progress/HEAD_FRACTION
  points=progress===HEAD_FRACTION?H:H.map(v=>[M[0]+u*(v[0]-M[0]),M[1]+u*(v[1]-M[1])] as const)
  maskPath=path(points)
 }else{
  phase='body';const u=(progress-HEAD_FRACTION)/(1-HEAD_FRACTION),y=M[1]+u*(P[2][1]-M[1])
  // This is mask geometry only. Ink remains the one unchanged original P.
  points=[[63,128.6],[75,128.6],[75,y],[63,y]];maskPath=path(points)
 }
 return freeze({phase,progress,maskPath,maskPoints:points,originalInkDirect:phase==='original',originalInkPath:INK_PATH,coordinateUnits:'original-source-200',productCoordinateScale:0.5,originalWeight:17.766375})
}

/** Current isolated component binding: exact fresh-full5 derived whole geometry. */
const WHOLE_STROKES=freeze([[{"outline":"M6.5 14.25 L47 14.25 L47 16.25 L6.5 16.25 Z M47 14.25 L37 15.25 L42 9.75 Z","bounds":[6.5,9.75,47,16.25],"direction":"right","weight":40.5}],[{"outline":"M35 7.55 L35 21.65 L29 24.65 L29 6.55 Z M35 7.55 L36.5 8.55 L34 10.05 Z","bounds":[29,6.55,36.5,24.65],"direction":"down","weight":16.065}],[{"outline":"M53 14.25 L93.5 14.25 L93.5 16.25 L53 16.25 Z M93.5 14.25 L81.5 15.25 L87.5 9.25 Z","bounds":[53,9.25,93.5,16.25],"direction":"right","weight":40.5}],[{"outline":"M71 7.55 L71 21.65 L65 24.65 L65 6.55 Z M71 7.55 L72.5 8.55 L70 10.05 Z","bounds":[65,6.55,72.5,24.65],"direction":"down","weight":16.065}],[{"outline":"M20.9 24.45 L20.9 40.1 L14.9 43.1 L14.9 21.45 Z","bounds":[14.9,21.45,20.9,43.1],"direction":"down","weight":12.142969}],[{"outline":"M17.9 24.45 L82.05 24.45 L82.05 26.45 L17.9 26.45 Z M85.05 25.45 L85.05 38.6 L79.05 41.6 L79.05 25.45 Z M79.05 24.45 L82.05 21.95 L87.55 26.45 L85.05 28.45 L79.05 25.45 Z","bounds":[17.9,21.95,87.55,41.6],"direction":"curve","weight":76.312969,"revealPath":"M17.915 25.489359375 L82.085 25.489359375 L82.085 37.632328125","revealWidth":14}],[{"outline":"M42.3 24.45 L42.3 38.6 L36.3 38.6 L36.3 24.45 Z","bounds":[36.3,24.45,42.3,38.6],"direction":"down","weight":12.142969}],[{"outline":"M63.65 24.45 L63.65 38.6 L57.65 38.6 L57.65 24.45 Z","bounds":[57.65,24.45,63.65,38.6],"direction":"down","weight":12.142969}],[{"outline":"M17.9 36.6 L82.05 36.6 L82.05 38.6 L17.9 38.6 Z","bounds":[17.9,36.6,82.05,38.6],"direction":"right","weight":64.17}],[{"outline":"M18.5 46.85 L71.5 46.85 L71.5 48.85 L18.5 48.85 Z M71.5 46.85 L61.5 47.85 L66.5 42.35 Z","bounds":[18.5,42.35,71.5,48.85],"direction":"right","weight":53}],[{"outline":"M49.5 39.6 L49.5 59.05 L43.5 59.05 L43.5 38.6 Z M49.5 39.6 L51 40.6 L48.5 42.1 Z","bounds":[43.5,38.6,51,59.05],"direction":"down","weight":18.970875}],[{"outline":"M9.5 57.05 L94.5 57.05 L94.5 59.05 L9.5 59.05 Z M94.5 57.05 L84.5 58.05 L89.5 52.55 Z","bounds":[9.5,52.55,94.5,59.05],"direction":"right","weight":85}],[{"outline":"M87.25 43.95 L80.95 47.95 L74.25 51.85 L67.1 55.6 L59.55 59.25 L51.65 62.8 L43.25 66.2 L34.5 69.5 L25.3 72.65 L15.65 75.6 L5.6 78.4 L5.35 77.5 L15.05 73.8 L24.4 70.1 L33.3 66.45 L41.8 62.7 L49.85 58.9 L57.5 55.1 L64.75 51.15 L71.55 47.2 L77.9 43.15 L83.85 39.05 Z M83.45 39.3 L87.45 43.85 L87.25 43.95 Z M87.45 43.85 L87.55 45.6 L84.8 44.45 Z","bounds":[5.35,39.05,87.55,78.4],"direction":"curve","weight":88.486584,"revealPath":"M86 41.235 Q56 62.012625 5.5 77.97225","revealWidth":14}],[{"outline":"M56.1 60.2 L58.05 60.6 L59.95 60.8 L61.7 61.1 L63.3 61.35 L64.75 61.7 L66.05 62.05 L67.25 62.4 L68.35 62.85 L69.35 63.35 L70.35 64.05 L65.7 67.85 L65.7 67.55 L65.4 67.05 L64.9 66.45 L64.15 65.8 L63.25 65.1 L62.1 64.35 L60.8 63.55 L59.35 62.7 L57.7 61.8 L55.85 61.05 Z M70.35 64.05 L70.95 66.25 L69.95 68.25 L67.75 68.9 L65.7 67.85 Z","bounds":[55.85,60.2,70.95,68.9],"direction":"curve","weight":15.037863,"revealPath":"M55.5 60.507 Q66 63.518249999999995 69 67.13175000000001","revealWidth":14}],[{"outline":"M37.5 67.3 L37.5 90.6 L31.5 93.6 L31.5 64.3 Z","bounds":[31.5,64.3,37.5,93.6],"direction":"down","weight":17.766375}],[{"outline":"M34.5 67.3 L77.5 67.3 L77.5 69.3 L34.5 69.3 Z M80.5 68.3 L80.5 89.1 L74.5 92.1 L74.5 68.3 Z M74.5 67.3 L77.5 64.8 L83 69.3 L80.5 71.3 L74.5 68.3 Z","bounds":[34.5,64.8,83,92.1],"direction":"curve","weight":60.766375,"revealPath":"M34.5 68.33625 L77.5 68.33625 L77.5 86.102625","revealWidth":14}],[{"outline":"M34.5 76.35 L77.5 76.35 L77.5 78.35 L34.5 78.35 Z","bounds":[34.5,76.35,77.5,78.35],"direction":"right","weight":43}],[{"outline":"M34.5 85.1 L77.5 85.1 L77.5 87.1 L34.5 87.1 Z","bounds":[34.5,85.1,77.5,87.1],"direction":"right","weight":43}]])
export const REVIEWED_U85AF_SOURCE=freeze({root:'u85af-k',pens:18,masks:18,polygons:32,geometrySHA256:'3f6487e78a2610278918da4b685c1be48f13ea755898d1eb0fb5eb70eb71544a',actualFull5File:'docs/hanja-public-glyphwiki-engine-capture-u85af-2026-10-22/engine-whole-u85af-k.json',actualFull5SHA256:'de0d33d6a729f5533e86a1483307a7b9e838e4353638786192ed644a6ce0f925',headerSynthesized:false,oldCorrectedGeometryExact:true,newMaskInternalClock:true,nativeApproval:false,runtimeApplied:false})
const WHOLE_CONTEXT=freeze({kind:'source-cap-u85af-whole',geometrySHA256:REVIEWED_U85AF_SOURCE.geometrySHA256})
const TARGET=WHOLE_STROKES[14][0]
const POLICY=freeze({id:'u85af-15-1',kind:'source-cap-u85af',segment:TARGET,phaseShare:HEAD_FRACTION})
const PROTOTYPE_CONTEXT=makeU85afSourceCapContext(EXPECTED_SOURCE)!
const U85AF_FRAMES=new WeakSet<object>()
export type ReviewedU85afPolicy=typeof POLICY
export type ReviewedU85afFrame=Readonly<{policy:ReviewedU85afPolicy;p:number;phase:'empty'|'head'|'body'|'full';maskPath:string;bodyProgress:number;full:boolean}>
export function reviewedU85afContext(strokes:unknown){return arguments.length===1&&same(strokes,WHOLE_STROKES)?WHOLE_CONTEXT:null}
export function reviewedU85afPolicy(context:unknown,stroke:number,mask:number):ReviewedU85afPolicy|null{return arguments.length===3&&context===WHOLE_CONTEXT&&stroke===14&&mask===0?POLICY:null}
export function measureReviewedU85afFrame(policy:ReviewedU85afPolicy,p:number):ReviewedU85afFrame|null{
 if(arguments.length!==2||policy!==POLICY)return null
 const f=frameU85afSourceCap(PROTOTYPE_CONTEXT,p);if(!f)return null
 const d=f.maskPoints.length?path(f.maskPoints.map(v=>[v[0]/2,v[1]/2] as const)):''
 const frame=freeze({policy,p,phase:f.phase==='original'?'full' as const:f.phase,maskPath:d,bodyProgress:p<=HEAD_FRACTION?0:p===1?1:(p-HEAD_FRACTION)/(1-HEAD_FRACTION),full:p===1});U85AF_FRAMES.add(frame);return frame
}
export function commitReviewedU85afMask(nodes:{ink:SVGPathElement|null;clip:SVGPathElement|null},frame:ReviewedU85afFrame|null):boolean{
 const ink=nodes.ink,clip=nodes.clip;ink?.setAttribute('visibility','hidden');clip?.setAttribute('visibility','hidden')
 if(!ink||!clip||!frame||frame.policy!==POLICY||!U85AF_FRAMES.has(frame))return false
 const svg=ink.ownerSVGElement,doc=ink.ownerDocument,g=ink.parentElement,cp=clip.parentElement,defs=cp?.parentElement,owner=ink.getAttribute('data-owner')
 const all=[ink,clip,g,cp,defs,svg]
 if(!svg||!doc||!owner||!g||!cp||!defs||all.some(n=>!n||!n.isConnected||n.ownerDocument!==doc||(n!==svg&&(n as SVGElement).ownerSVGElement!==svg)))return false
 if(g.getAttribute('data-stroke-start-gate')!==POLICY.id||g.getAttribute('data-stroke-reveal-progress')!==String(frame.p))return false
 if(clip.getAttribute('data-u85af-clip')!=='true'||ink.getAttribute('data-u85af-ink')!=='true'||ink.getAttribute('d')!==TARGET.outline||cp.getAttribute('id')!==owner+'-u85af-cap'||cp.getAttribute('clipPathUnits')!=='userSpaceOnUse'||defs.parentElement!==g)return false
 for(const n of all){if(n!.getAttribute('transform')!==null)return false;const s=doc.defaultView?.getComputedStyle(n!);if(!s||s.transform!=='none'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false}
 clip.setAttribute('d',frame.maskPath)
 if(frame.full)ink.removeAttribute('clip-path');else ink.setAttribute('clip-path','url(#'+owner+'-u85af-cap)')
 ink.setAttribute('data-growing-progress',String(frame.p));ink.setAttribute('data-u85af-phase',frame.phase);ink.setAttribute('data-u85af-body-progress',String(frame.bodyProgress));ink.setAttribute('data-u85af-UA-read','false')
 for(const k of['length','distance','end-x','end-y','radius'])ink.removeAttribute('data-growing-'+k)
 clip.setAttribute('visibility',frame.p>0&&!frame.full?'visible':'hidden')
 ink.setAttribute('visibility',frame.p>0?'visible':'hidden') // visibility is the last ink write
 return true
}
