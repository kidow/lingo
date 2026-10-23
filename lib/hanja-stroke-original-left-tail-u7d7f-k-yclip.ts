import type {HanjaOutlineSegment} from './hanja-stroke-outline'
import {reviewedU7d7fKTailFrame,type ReviewedU7d7fKTailContext} from './hanja-stroke-original-left-tail-u7d7f-k.ts'

/** Original two P, Q, weight and outer clock are unchanged. The body uses an
 * internal monotone-Y display prefix; original LEFT follows on its existing clock. */
export function measureReviewedU7d7fKYTailFrame(context:ReviewedU7d7fKTailContext|null,segment:HanjaOutlineSegment,progress:number,path:SVGPathElement|null){
 const original=reviewedU7d7fKTailFrame(context,segment,progress)
 let alpha=original.phase==='empty'?0:1,L:number|null=null,point:Readonly<{x:number;y:number}>|null=null
 if(original.phase==='body'){
  if(!path||path.getAttribute('d')!==segment.revealPath||path.getAttribute('pathLength')!==null)throw Error('Exact original 絿 Q measurement required')
  const d=path.getAttribute('d');L=path.getTotalLength()
  if(!Number.isFinite(L)||L<=0)throw Error('Finite original 絿 Q length required')
  const start=path.getPointAtLength(0),end=path.getPointAtLength(L),value=path.getPointAtLength(original.bodyProgress*L)
  if(![start.x,start.y,end.x,end.y,value.x,value.y].every(Number.isFinite)||end.y<=start.y||path.getAttribute('d')!==d||path.getTotalLength()!==L)throw Error('Unchanged original monotone-Y 絿 Q required')
  point=Object.freeze({x:value.x,y:value.y})
  alpha=Math.max(0,Math.min(1,(value.y-start.y)/(end.y-start.y)))
 }
 return Object.freeze({...original,bodyRect:Object.freeze({x:62.65,y:86,width:8,height:8*alpha}),L,point,alpha})
}
export const REVIEWED_U7D7F_K_YCLIP=Object.freeze({originalLogicalPen:8,originalMask:2,bodyBounds:Object.freeze([62.65,86,70.65,94]),bodyAxis:'y',rootEdge:Object.freeze([64.65,86,70.65,86]),rootPositiveRectangle:Object.freeze([67,86,68,86.1]),originalMaskCount:16,originalPolygonCount:38,sourceFieldsUnchanged:true,internalDisplayClockChanged:true,originalOuterClockUnchanged:true,nativeApproval:false,runtimeApplied:false})
