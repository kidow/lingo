/**
 * 薯 corrected pen15, source-bound mask prototype only. No product integration.
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
