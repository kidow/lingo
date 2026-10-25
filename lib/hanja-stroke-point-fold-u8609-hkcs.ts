/** 蘉 folds6/14: zero-diameter source-bound point window; authored clock, native pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609FoldContext,reviewedU8609FoldPolicy,measureReviewedU8609FoldFrame,type ReviewedU8609FoldContext,type ReviewedU8609FoldPolicy} from './hanja-stroke-fold-u8609-hkcs.ts'
export type ReviewedU8609PointFoldContext=ReviewedU8609FoldContext
export type ReviewedU8609PointFoldPolicy=Readonly<{id:string;kind:'u8609-hkcs-original-point-fold';spec:ReviewedU8609FoldPolicy['spec'];segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment}>
const MAP=new WeakMap<ReviewedU8609FoldPolicy,ReviewedU8609PointFoldPolicy>(),BASE=new WeakMap<ReviewedU8609PointFoldPolicy,ReviewedU8609FoldPolicy>()
export function makeReviewedU8609PointFoldContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU8609PointFoldContext|null{return makeReviewedU8609FoldContext(proof,identity,strokes)}
export function reviewedU8609PointFoldPolicy(context:ReviewedU8609PointFoldContext|null,pen:number,mask:number):ReviewedU8609PointFoldPolicy|null{
 const base=reviewedU8609FoldPolicy(context,pen,mask);if(!base)return null
 const prior=MAP.get(base);if(prior)return prior
 const policy=Object.freeze({id:'u8609-hkcs-point-fold-'+base.spec.pen+'-'+base.spec.mask,kind:'u8609-hkcs-original-point-fold' as const,spec:base.spec,segment:base.segment,priorSegment:base.priorSegment});MAP.set(base,policy);BASE.set(policy,base);return policy
}
export type ReviewedU8609PointFoldFrame=Readonly<{status:'empty'|'partial'|'complete';outline:string|null;rect:Readonly<{x:number;y:number;width:number;height:number}>;progress:number;originalPDirect:boolean;clock:'authored-common-kernel-point-window';sourceQSeam:string;priorOpaqueRequired:true}>
export function measureReviewedU8609PointFoldFrame(policy:ReviewedU8609PointFoldPolicy,segment:HanjaOutlineSegment,priorSegment:HanjaOutlineSegment,p:number,priorOpaque:boolean):ReviewedU8609PointFoldFrame{
 const base=BASE.get(policy);if(!base)throw Error('Exact reviewed 蘉 point-fold policy required')
 measureReviewedU8609FoldFrame(base,segment,priorSegment,p,priorOpaque)
 const [x0,y0,x1,y1]=policy.segment.bounds,[ax,ay]=policy.spec.anchor
 const rect=Object.freeze(p===1?{x:x0,y:y0,width:x1-x0,height:y1-y0}:{x:ax-(ax-x0)*p,y:ay-(ay-y0)*p,width:(x1-x0)*p,height:(y1-y0)*p})
 return Object.freeze({status:p===0?'empty':p===1?'complete':'partial',outline:p===0?null:segment.outline,rect,progress:p,originalPDirect:p===1,clock:'authored-common-kernel-point-window',sourceQSeam:policy.spec.qSeam,priorOpaqueRequired:true})
}
export const REVIEWED_U8609_POINT_FOLD_INPUT_SHA256=Object.freeze({"lib/hanja-stroke-fold-u8609-hkcs.ts":"1aa519ae7d0c68d8b3a8824b9ecb72189368229b332dcde956f95602abcce06d","docs/hanja-source-original-u8609-hkcs-2026-10-26/6-14-point-fold-proof.json":"174e7cab198ab42446bfd0d94bff8f523bff496fd66a9d880eb98c74409b000b","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-6-14-point-folds.py":"7350256dd270ce4e4954d7c6b4c67d76d5257a95df291fefdb49667a47e65b6d"})
export const REVIEWED_U8609_POINT_FOLD_SOURCE=Object.freeze({sourcePAndQUnchanged:true,authorClockNotPublisherTiming:true,initialDiameterZero:true,priorOpaqueRequired:true,sharedRendererConnected:false,nativeApproval:false,runtimeApplied:false})
