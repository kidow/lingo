import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU95e5Context,makeReviewedU95e5SourceContext} from './hanja-stroke-start-caps-u95e5.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGET=freeze({"id":"u95e5-6-3","pen":6,"mask":3,"kind":"original-terminal-u95e5","segment":{"outline":"M88.5 85.5 L88.4 86.75 L88.2 88 L87.8 89.2 L87.15 90.35 L86.35 91.35 L85.35 92.15 L84.2 92.8 L83 93.2 L81.75 93.4 L80.5 93.5 L80.5 87.5 L81.1 87.45 L81.55 87.35 L81.85 87.25 L82 87.2 L82.1 87.1 L82.2 87 L82.25 86.85 L82.35 86.55 L82.45 86.1 L82.5 85.5 Z M80.5 90.5 L70.5 89 L70.5 87.5 L80.5 87.5 Z","bounds":[70.5,85.5,88.5,93.5],"direction":"curve","weight":7.071068,"revealPath":"M85.5 85.5 Q85.5 90.5 80.5 90.5","revealWidth":14},"predecessor":{"outline":"M88.5 13.5 L88.5 85.5 L82.5 85.5 L82.5 13.5 Z M82.5 12.5 L85.5 10 L91 14.5 L88.5 16.5 L82.5 13.5 Z M82.5 85.5 L88.5 85.5 L87.3 87.3 L85.5 88.5 L83.7 87.3 Z","bounds":[82.5,10,91,88.5],"direction":"down","weight":72},"bodyOutline":"M88.5 85.5 L88.4 86.75 L88.2 88 L87.8 89.2 L87.15 90.35 L86.35 91.35 L85.35 92.15 L84.2 92.8 L83 93.2 L81.75 93.4 L80.5 93.5 L80.5 87.5 L81.1 87.45 L81.55 87.35 L81.85 87.25 L82 87.2 L82.1 87.1 L82.2 87 L82.25 86.85 L82.35 86.55 L82.45 86.1 L82.5 85.5 Z","tailOutline":"M80.5 90.5 L70.5 89 L70.5 87.5 L80.5 87.5 Z","bodyBounds":[80.5,85.5,88.5,93.5],"bodyAxis":"q-start-y-band","originY":85.5,"terminal":"LEFT","terminalClock":10,"bodyWeight":7.071068,"bodyShare":0.41421356882885124} as const)
const CONTEXT=Object.freeze({id:'u95e5-original-terminal'})
export type ReviewedU95e5TerminalContext=typeof CONTEXT
export type ReviewedU95e5TerminalPolicy=typeof TARGET
function same(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})}
export function reviewedU95e5TerminalContext(strokes:HanjaOutlineStrokes):ReviewedU95e5TerminalContext|null{return reviewedU95e5Context(strokes)?CONTEXT:null}
export function makeReviewedU95e5TerminalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU95e5TerminalContext|null{return makeReviewedU95e5SourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU95e5TerminalPolicy(context:ReviewedU95e5TerminalContext|null,pen:number,mask:number):ReviewedU95e5TerminalPolicy|null{return context===CONTEXT&&pen===5&&mask===2?TARGET:null}
/** New internal Q-start Y-prefix then original LEFT10, preserving all original source fields/outer clock. */
export function reviewedU95e5TerminalFrame(policy:ReviewedU95e5TerminalPolicy,segment:HanjaOutlineSegment,p:number,previousMaskProgress:number){
 if(policy!==TARGET||!same(segment,TARGET.segment))throw Error('Exact original 闥 terminal required')
 if(![p,previousMaskProgress].every(Number.isFinite)||p<0||p>1||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite 闥 progress required')
 if(p>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 闥 predecessor required')
 const bodyProgress=Math.min(1,p/policy.bodyShare),tailProgress=p<=policy.bodyShare?0:Math.min(1,(p-policy.bodyShare)/(1-policy.bodyShare))
 return Object.freeze({policyId:policy.id,phase:p===0?'empty' as const:p===1?'complete' as const:p<=policy.bodyShare?'body' as const:'tail' as const,bodyProgress,tailProgress,bodyOutline:policy.bodyOutline,tailOutline:policy.tailOutline,tailRect:Object.freeze({x:80.5-10*tailProgress,y:87.5,width:10*tailProgress,height:3}),visible:p>0,requiresExactPriorOriginalOpaqueInk:true as const,paintOriginalInkOnce:true as const,originalMaskCount:26,internalRevealPhases:2})
}
export function measureReviewedU95e5TerminalFrame(policy:ReviewedU95e5TerminalPolicy,segment:HanjaOutlineSegment,p:number,previousMaskProgress:number,path:SVGPathElement|null){
 const base=reviewedU95e5TerminalFrame(policy,segment,p,previousMaskProgress);let alpha=base.phase==='empty'?0:1,L:number|null=null,point:Readonly<{x:number;y:number}>|null=null
 if(base.phase==='body'){
  if(!path||path.getAttribute('d')!==segment.revealPath||path.getAttribute('pathLength')!==null)throw Error('Exact original 闥 Q measurement required')
  const d=path.getAttribute('d');L=path.getTotalLength();if(!Number.isFinite(L)||L<=0)throw Error('Finite 闥 Q length required')
  const start=path.getPointAtLength(0),end=path.getPointAtLength(L),value=path.getPointAtLength(base.bodyProgress*L)
  if(![start.x,start.y,end.x,end.y,value.x,value.y].every(Number.isFinite)||Math.abs(start.y-85.5)>1e-4||Math.abs(end.y-90.5)>1e-4||end.y<=start.y||path.getAttribute('d')!==d||path.getTotalLength()!==L)throw Error('Unchanged original monotone-Y 闥 Q required')
  point=Object.freeze({x:value.x,y:value.y});alpha=Math.max(0,Math.min(1,(value.y-start.y)/(end.y-start.y)))
 }
 return Object.freeze({...base,alpha,L,point,bodyRect:Object.freeze({x:80.5,y:85.5,width:8,height:8*alpha}),bodyOriginIsOriginalQStartY:true})
}
export const REVIEWED_U95E5_TERMINALS=freeze({targets:[TARGET],namespace:'u95e5-terminal',originalPens:21,originalMasks:26,originalPolygons:45,sourceFieldsUnchanged:true,originalOuterClockUnchanged:true,newInternalDisplayClock:true,previousMaskProgressAndExactDOMInkRequired:true,noNewGuide:true,nativeApproval:false,runtimeApplied:false,proof:{"originalBodyHorizontalSlabs":20,"eachOpenSlabOnePositiveInterval":true,"bodyTopSharedPriorVEndEdge":[[82.5,85.5],[88.5,85.5]],"priorOriginalCompletedP3Preserved":true,"bodyPrefixOriginOriginalQStartY":85.5,"allPositiveBodyPrefixConnected":true,"leftTailExtent":10,"positiveSharedBodyTailEdge":[[80.5,87.5],[80.5,90.5]],"allPositiveLeftPrefixConnected":true,"oldWholeHOLDReleased":false,"nativeApproval":false}})
