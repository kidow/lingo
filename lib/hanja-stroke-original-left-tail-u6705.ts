import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU6705Context} from './hanja-stroke-start-caps-u6705.ts'

/** Provisional reveal-side partition; original source stays fourteen pens/fifteen masks. */
const LEFT="M75.8 91.5 L65.8 90 L65.8 88.5 L75.8 88.5 Z"
const BODY="M53.45 51.5 L88.05 51.5 L88.05 53.5 L53.45 53.5 Z M91.05 52.35 L91.2 57.4 L91.15 62.1 L91 66.45 L90.7 70.55 L90.3 74.3 L89.75 77.75 L89.05 80.95 L88.2 83.8 L87.15 86.4 L85.95 88.75 L80.8 85.65 L81.7 83.95 L82.5 81.9 L83.25 79.45 L83.85 76.65 L84.35 73.5 L84.75 70 L85 66.15 L85.15 61.95 L85.2 57.45 L85.05 52.6 Z M85.05 51.5 L88.05 49 L93.55 53.5 L91.05 55 L85.05 57.5 Z M85.95 88.75 L85.25 89.8 L84.5 90.75 L83.65 91.6 L82.7 92.35 L81.65 93 L80.6 93.55 L79.45 93.95 L78.25 94.25 L77.05 94.4 L75.8 94.5 L75.8 88.5 L76.5 88.45 L77.15 88.35 L77.7 88.2 L78.25 88.05 L78.7 87.8 L79.15 87.5 L79.6 87.15 L80 86.75 L80.4 86.25 L80.8 85.65 Z"
const BODY_WEIGHT=78.363543
const LEFT_CLOCK=10
const SHARE=BODY_WEIGHT/(BODY_WEIGHT+LEFT_CLOCK)
const CONTEXT=Object.freeze({id:'u6705-original-left-tail' as const})
export type ReviewedU6705TailContext=typeof CONTEXT
export type ReviewedU6705TailFrame=Readonly<{phase:'empty'|'body'|'tail'|'complete';bodyProgress:number;tailProgress:number;bodyOutline:string;tailOutline:typeof LEFT;tailRect:Readonly<{x:number;y:88.5;width:number;height:3}>;paintOriginalInkOnce:true;originalMaskCount:15;internalRevealPhases:2}>
export function reviewedU6705TailContext(strokes:HanjaOutlineStrokes):ReviewedU6705TailContext|null {
  return reviewedU6705Context(strokes)?CONTEXT:null
}
export function reviewedU6705TailFrame(context:ReviewedU6705TailContext|null,segment:HanjaOutlineSegment,progress:number):ReviewedU6705TailFrame {
  if(context!==CONTEXT||segment.revealPath!=="M53.4675 52.5 L88.095 52.5 Q88.95 78 83.4052272296235 87.21568881503018 Q80.8275 91.5 75.8275 91.5"||segment.weight!==BODY_WEIGHT||segment.revealWidth!==14||segment.direction!=='curve')throw new Error('Exact original 朅 pen11 tail context required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 朅 composite progress')
  const polygons=segment.outline.match(/M[^M]+/g)?.map(p=>p.trim())
  if(polygons?.length!==5||polygons[4]!==LEFT||segment.outline!==BODY+' '+LEFT||JSON.stringify(segment.bounds)!=="[53.45,49,93.55,94.5]")throw new Error('Original 朅 body and LEFT polygons required')
  // Body uses the original whole MLQQ guide and original weight. This explicit
  // internal phase clock is not a new source mask, guide, or official clock.
  const tailProgress=progress<=SHARE?0:Math.min(1,(progress-SHARE)/(1-SHARE))
  const bodyProgress=Math.min(1,progress/SHARE)
  return Object.freeze({phase:progress===0?'empty':progress===1?'complete':progress<=SHARE?'body':'tail',bodyProgress,tailProgress,bodyOutline:polygons.slice(0,4).join(' '),tailOutline:LEFT,tailRect:Object.freeze({x:75.8-LEFT_CLOCK*tailProgress,y:88.5 as const,width:LEFT_CLOCK*tailProgress,height:3 as const}),paintOriginalInkOnce:true,originalMaskCount:15,internalRevealPhases:2})
}
export const REVIEWED_U6705_LEFT_TAIL=Object.freeze({bodyWeight:BODY_WEIGHT,leftClock:LEFT_CLOCK,bodyShare:SHARE,originalLogicalPen:11,originalMaskCount:15,originalPolygonCount:37,derivedSourceMasks:0,originalLEFTFlag:14,originalLEFTVertices:LEFT,sourceFieldsUnchanged:true,bodyCoverageAndEveryPositiveTailPrefixProof:'docs/hanja-original-left-tail-u6705-11-preparation-2026-10-23/verify-tail.py',nativeApproval:false,runtimeApplied:false})

/** Target14 only: original terminal13 V lower region, then original H. */
const FIXED14={"outline":"M52.1 64.2 L52.1 90.15 L46.1 93.15 L46.1 63.2 Z M52.1 64.2 L53.6 65.2 L51.1 66.7 Z M49.1 82.15 L79.35 82.15 L79.35 84.15 L49.1 84.15 Z M79.35 82.15 L67.35 83.15 L73.35 77.15 Z","bounds":[46.1,63.2,79.35,93.15],"direction":"curve","weight":49.730587,"revealPath":"M49.124100000000006 63.72 L49.124100000000006 83.19 L79.3846875 83.19","revealWidth":14} as HanjaOutlineSegment
function exact14(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const keys=Reflect.ownKeys(b);return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&exact14(x.value,y.value)})}
export const REVIEWED_U6705_DOWN14=Object.freeze({vOutline:"M52.1 64.2 L52.1 90.15 L46.1 93.15 L46.1 63.2 Z M52.1 64.2 L53.6 65.2 L51.1 66.7 Z",hOutline:"M49.1 82.15 L79.35 82.15 L79.35 84.15 L49.1 84.15 Z M79.35 82.15 L67.35 83.15 L73.35 77.15 Z",firstVArc:19.47,downClock:4.15,cutY:89,sourceWeight:49.730587,sourceTerminalFlag:13,newInternalDisplayClock:true,sourceFieldsUnchanged:true,nativeApproval:false})
export function reviewedU6705Down14Frame(context:ReviewedU6705TailContext|null,segment:HanjaOutlineSegment,progress:number,L:number){
 if(context!==CONTEXT||!exact14(segment,FIXED14))throw Error('Exact original 朅14 source required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(L)||L<=23.62)throw Error('Invalid 朅14 frame')
 const d=progress*L,vArc=Math.min(d,19.47),downProgress=Math.max(0,Math.min(1,(d-19.47)/4.15)),hProgress=Math.max(0,Math.min(1,(d-23.62)/(L-23.62)))
 return Object.freeze({phase:progress===0?'empty':progress===1?'complete':d<=19.47?'V':d<=23.62?'down':'H',progress,L,d,vArc,vProgress:vArc/L,rho:Math.min(7,vArc),downProgress,hProgress})
}


